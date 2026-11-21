import { describe, it, expect } from "vitest";
import { catSVG } from "../../src/ui/illustrations.js";

// The cat's name is typed by the user and lands in an SVG attribute: it must be escaped.
describe("catSVG : nom du chat échappé", () => {
  const evil = '"><img src=x onerror=1>';

  it("un label piégé ne crée ni balise ni sortie d'attribut", () => {
    const out = catSVG("content", { label: evil });
    expect(out).not.toContain("<img");
    // The whole payload must stay inside aria-label, fully escaped.
    expect(out).toContain('aria-label="&quot;&gt;&lt;img src=x onerror=1&gt;"');
  });

  it("un id piégé est échappé aussi", () => {
    const out = catSVG("content", { id: evil });
    expect(out).not.toContain("<img");
    expect(out).toContain('id="&quot;&gt;&lt;img');
  });

  it("un nom normal apparaît tel quel", () => {
    expect(catSVG("content", { label: "Doudou" })).toContain('aria-label="Doudou"');
  });

  it("sans label, le texte par défaut reste", () => {
    expect(catSVG()).toContain('aria-label="Illustration de Doudou, chat tigré roux"');
  });
});
