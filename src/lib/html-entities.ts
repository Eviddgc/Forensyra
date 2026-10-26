/**
 * Decode the entities that remark-html emits when it sanitises Markdown.
 *
 * Sanitising turns characters such as `&` into numeric references (`&#x26;`).
 * Browsers render those correctly inside HTML, but any plain-text consumer
 * (table of contents, heading ids) must decode them or the raw entity leaks
 * into the UI.
 */
const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  apos: "'",
  copy: "©",
  gt: ">",
  hellip: "…",
  ldquo: "“",
  lsquo: "‘",
  lt: "<",
  mdash: "—",
  nbsp: " ",
  ndash: "–",
  quot: '"',
  rdquo: "”",
  reg: "®",
  rsquo: "’",
  trade: "™",
};

export function decodeHtmlEntities(value: string): string {
  return value.replace(
    /&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]+);/gi,
    (entity, body: string) => {
      if (body[0] === "#") {
        const hexadecimal = body[1]?.toLowerCase() === "x";
        const codePoint = Number.parseInt(
          body.slice(hexadecimal ? 2 : 1),
          hexadecimal ? 16 : 10,
        );
        if (!Number.isNaN(codePoint)) {
          try {
            return String.fromCodePoint(codePoint);
          } catch {
            // Out-of-range numeric reference — leave it untouched.
          }
        }
        return entity;
      }
      return NAMED_ENTITIES[body.toLowerCase()] ?? entity;
    },
  );
}
