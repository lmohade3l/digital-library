import translations from "../translation/fa.json";

interface Translations {
    [key: string]: string;
}

const typedTranslations: Translations = translations;

export const t = (key: string): string => {
    return typedTranslations[key] || key;
};
