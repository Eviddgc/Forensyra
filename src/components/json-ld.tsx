type Ld = Record<string, unknown>;

/**
 * Renders one or more schema.org JSON-LD blocks. `<` is escaped so the payload
 * can never break out of the script tag.
 */
export function JsonLd({ data }: { data: Ld | Ld[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(block).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
