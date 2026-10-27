import { describe, expect, it } from "vitest";
import { contentByLocale, type Locale } from "@/lib/content";

/**
 * Vérifie que les deux langues exposent exactement la même structure :
 * mêmes clés, mêmes longueurs de listes, aucun texte vide.
 * Un oubli de traduction fait échouer la suite avant la mise en ligne.
 */
function collectShape(value: unknown, path = ""): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      collectShape(item, `${path}[${index}]`),
    );
  }

  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).flatMap(
      ([key, child]) => collectShape(child, path ? `${path}.${key}` : key),
    );
  }

  return [path];
}

function collectEmptyStrings(
  value: unknown,
  path = "",
): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      collectEmptyStrings(item, `${path}[${index}]`),
    );
  }

  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).flatMap(
      ([key, child]) =>
        collectEmptyStrings(child, path ? `${path}.${key}` : key),
    );
  }

  if (typeof value === "string" && value.trim() === "") {
    return [path];
  }

  return [];
}

const locales: Locale[] = ["fr", "en"];

describe("contenu bilingue", () => {
  it("expose la même structure en français et en anglais", () => {
    const reference = collectShape(contentByLocale.fr).sort();
    const translated = collectShape(contentByLocale.en).sort();

    expect(translated).toEqual(reference);
  });

  it("ne contient aucun texte vide", () => {
    for (const locale of locales) {
      expect(
        collectEmptyStrings(contentByLocale[locale]),
        `textes vides en ${locale}`,
      ).toEqual([]);
    }
  });

  it("traduit réellement les libellés principaux", () => {
    expect(contentByLocale.fr.hero.kicker).toBe("Ingénieur logiciel");
    expect(contentByLocale.en.hero.kicker).toBe("Software engineer");
    expect(contentByLocale.fr.footer.taglineLine2).toContain("testeur QA");
    expect(contentByLocale.en.footer.taglineLine2).toContain("QA tester");
  });

  it("conserve les trois témoignages clients dans les deux langues", () => {
    for (const locale of locales) {
      const items = contentByLocale[locale].testimonials.items;
      expect(items).toHaveLength(3);
      expect(items.map((item) => item.name)).toEqual([
        "Quincaillerie Boutique de l'Évolution",
        "Tsena Fandrosoana",
        "Boulangerie Ando",
      ]);
      expect(items.every((item) => item.phone.length > 0)).toBe(true);
      expect(items.every((item) => item.quote.length > 40)).toBe(true);
    }
  });
});
