import type {
  ArticleSchema,
  BreadcrumbListSchema,
  SoftwareApplicationSchema,
  WebSiteSchema,
} from "./structured-data";

type JsonLdSchema =
  | ArticleSchema
  | BreadcrumbListSchema
  | SoftwareApplicationSchema
  | WebSiteSchema;

interface JsonLdScriptProps {
  schema: JsonLdSchema;
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
