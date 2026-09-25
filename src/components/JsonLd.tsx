/**
 * Structured data for search engines and AI answer engines.
 *
 * `<` is escaped because JSON.stringify does not sanitise strings that could
 * close the script tag — the approach the Next.js JSON-LD guide recommends.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: the only way to emit a JSON-LD script body
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
