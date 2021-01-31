import React, {
  createContext,
  FunctionComponent,
  useContext,
  useState,
} from "react";

import ro from "../../lang/ro.json";
import en from "../../lang/en.json";

interface LanguageContextInterface {
  lang: "ro" | "en";
  setLang: (lang: "ro" | "en") => void;
  internationalization: Record<string, string> | {};
  getMessage: (id: string) => string;
}

const LanguageContext = createContext<LanguageContextInterface>({
  lang: "en",
  setLang: () => ({}),
  internationalization: {},
  getMessage: () => "",
});

export const LanguageProvider: FunctionComponent = ({ children }) => {
  const [lang, setLang] = useState<"ro" | "en">(
    (localStorage.getItem("lang") as "ro") || "en"
  );

  const internationalization = { en, ro }[lang];

  const getMessage = (id: string) => {
    const typeCasted = internationalization as Record<string, string>;
    return typeCasted[id] || id;
  };

  const handleLang = (lang: "en" | "ro") => {
    setLang(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <LanguageContext.Provider
      value={{ lang, setLang: handleLang, internationalization, getMessage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
