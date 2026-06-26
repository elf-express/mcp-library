import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import zhTW from "./locales/zh-TW.json";

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "zh-TW", label: "繁體中文" },
] as const;

void i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      "zh-TW": { translation: zhTW },
    },
    lng: localStorage.getItem("mcpjungle-lang") ?? "en",
    fallbackLng: "en",
    supportedLngs: ["en", "zh-TW"],
    interpolation: { escapeValue: false },
  });

export default i18n;
