// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SchemaObj = Record<string, any>;

interface Props {
  schema: SchemaObj | SchemaObj[];
}

export function JsonLd({ schema }: Props) {
  const schemas = Array.isArray(schema) ? schema : [schema];
  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}
