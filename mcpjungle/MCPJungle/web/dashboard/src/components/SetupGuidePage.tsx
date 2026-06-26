import { useTranslation } from "react-i18next";
import { CopyButton } from "@/components/CopyButton";

const JSON_EXAMPLE = `{
  "name": "context7",
  "transport": "streamable_http",
  "url": "https://mcp.context7.com/mcp"
}`;

export function SetupGuidePage() {
  const { t } = useTranslation();
  return (
    <section className="setup-guide">
      <p className="setup-guide-intro">{t("setupGuide.intro")}</p>

      <article className="setup-guide-card">
        <h3>{t("setupGuide.remote.title")}</h3>
        <p>{t("setupGuide.remote.body")}</p>
        <div className="setup-guide-example">
          <code>https://mcp.context7.com/mcp</code>
          <CopyButton ariaLabel="Copy URL" title="Copy" value="https://mcp.context7.com/mcp" />
        </div>
        <p className="setup-guide-fields">{t("setupGuide.remote.fields")}</p>
      </article>

      <article className="setup-guide-card">
        <h3>{t("setupGuide.local.title")}</h3>
        <p>{t("setupGuide.local.body")}</p>
        <div className="setup-guide-example">
          <code>npx -y @modelcontextprotocol/server-filesystem /host</code>
          <CopyButton ariaLabel="Copy command" title="Copy" value="npx -y @modelcontextprotocol/server-filesystem /host" />
        </div>
        <p className="setup-guide-fields">{t("setupGuide.local.fields")}</p>
        <p className="setup-guide-note">{t("setupGuide.local.note")}</p>
      </article>

      <article className="setup-guide-card">
        <h3>{t("setupGuide.json.title")}</h3>
        <p>{t("setupGuide.json.body")}</p>
        <div className="setup-guide-example">
          <pre><code>{JSON_EXAMPLE}</code></pre>
          <CopyButton ariaLabel="Copy JSON" title="Copy" value={JSON_EXAMPLE} />
        </div>
      </article>
    </section>
  );
}
