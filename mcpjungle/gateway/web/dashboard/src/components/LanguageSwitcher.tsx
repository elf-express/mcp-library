import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "@/i18n";

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  return (
    <label className="language-switcher">
      <span className="language-switcher-label">{t("common.language")}</span>
      <select
        className="table-filter form-input compact-select"
        onChange={(event) => {
          localStorage.setItem("mcpjungle-lang", event.target.value);
          void i18n.changeLanguage(event.target.value);
        }}
        value={i18n.resolvedLanguage}
      >
        {SUPPORTED_LANGUAGES.map((lng) => (
          <option key={lng.code} value={lng.code}>
            {lng.label}
          </option>
        ))}
      </select>
    </label>
  );
}
