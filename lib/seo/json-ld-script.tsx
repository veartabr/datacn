interface JsonLdScriptProps {
  schema: Record<string, unknown>;
}

export function JsonLdScript({ schema }: JsonLdScriptProps) {
  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON.stringify on controlled schema objects is safe
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      type="application/ld+json"
    />
  );
}
