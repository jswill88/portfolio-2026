interface TypedStringProps {
  name: string;
  elementType?: keyof JSX.IntrinsicElements;
}

export function TypedString({ name, elementType = "span" }: TypedStringProps) {
  const Element = elementType;

  return (
    <>
      {name.split("").map((letter, i) => (
        <Element key={i} className={String(i)}>
          {letter}
        </Element>
      ))}
    </>
  );
}
