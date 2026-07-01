import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { content, type Lang, type Content } from "./content";

const STORAGE_KEY = "lang";

type LangCtx = { lang: Lang; setLang: (l: Lang) => void };

const LanguageContext = createContext<LangCtx>({
  lang: "ru",
  setLang: () => {},
});

function readInitialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "kz" || saved === "ru") return saved;
  } catch {
    /* localStorage may be unavailable */
  }
  return "ru"; // default — Russian
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

/** Current language + setter. */
export function useLang(): LangCtx {
  return useContext(LanguageContext);
}

/** Content bundle for the active language. */
export function useContent(): Content {
  return content[useLang().lang];
}
