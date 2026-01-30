import { useEffect } from 'react'

export function useScrollLock(active: boolean) {
  useEffect(() => {
    const prev = document.documentElement.style.overflow
    if (active) document.documentElement.style.overflow = 'hidden'
    else document.documentElement.style.overflow = prev || ''

    return () => {
      document.documentElement.style.overflow = prev || ''
    }
  }, [active])
}
