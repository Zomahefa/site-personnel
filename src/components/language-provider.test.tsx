import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LanguageProvider, useI18n } from "@/components/language-provider";

function Probe() {
  const { locale, toggleLocale, c } = useI18n();
  return (
    <button type="button" onClick={toggleLocale}>
      {locale} · {c.hero.kicker} · {c.nav[0].label}
    </button>
  );
}

function renderProbe() {
  return render(
    <LanguageProvider>
      <Probe />
    </LanguageProvider>,
  );
}

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  document.documentElement.lang = "fr";
});

describe("sélecteur de langue", () => {
  it("démarre en français", () => {
    renderProbe();
    expect(screen.getByRole("button")).toHaveTextContent(
      "fr · Ingénieur logiciel · Projets",
    );
  });

  it("bascule tout le contenu en anglais puis revient en français", async () => {
    renderProbe();
    const button = screen.getByRole("button");

    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toHaveTextContent("en · Software engineer · Work");
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toHaveTextContent("fr · Ingénieur logiciel · Projets");
    });
  });

  it("mémorise la langue choisie", async () => {
    renderProbe();
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(window.localStorage.getItem("zm_locale")).toBe("en");
    });

    cleanup();
    renderProbe();

    await waitFor(() => {
      expect(screen.getByRole("button")).toHaveTextContent("en · Software engineer");
    });
  });

  it("met à jour l'attribut lang du document", async () => {
    renderProbe();
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(document.documentElement.lang).toBe("en");
    });
  });
});
