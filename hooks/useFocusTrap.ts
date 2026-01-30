import { RefObject, useEffect } from 'react'

export function useFocusTrap(
  active: boolean,
  containerRef: RefObject<HTMLElement | null>,
  includeRef?: RefObject<HTMLElement | null>,
  returnFocusRef?: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    if (!active || !containerRef?.current) return

    const container = containerRef.current

    const getFocusableInside = () =>
      Array.from(
        container.querySelectorAll<HTMLElement>(
          'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled'))

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      const inside = getFocusableInside()
      const includeEl = includeRef?.current
      // build combined list: include external element (if any) + inside elements, deduped
      const list: HTMLElement[] = []
      const seen = new Set<HTMLElement>()
      if (includeEl) {
        list.push(includeEl)
        seen.add(includeEl)
      }
      for (const el of inside) {
        if (!seen.has(el)) {
          list.push(el)
          seen.add(el)
        }
      }

      if (list.length === 0) return

      const first = list[0]
      const last = list[list.length - 1]
      const activeEl = document.activeElement as HTMLElement | null

      if (e.shiftKey) {
        if (activeEl === first || activeEl === null) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (activeEl === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    // autofocus first focusable in container (prefer includeRef if it's intended as the opener)
    const insideFocusable = getFocusableInside()
    const firstToFocus = insideFocusable[0] ?? includeRef?.current
    if (firstToFocus) setTimeout(() => firstToFocus.focus(), 0)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      const returnTo = returnFocusRef?.current ?? includeRef?.current
      if (returnTo) returnTo.focus()
    }
  }, [active, containerRef, includeRef, returnFocusRef])
}
