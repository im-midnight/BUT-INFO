// =====================================================================
// PAGE THÈME : liste des palettes et réglages
// Pour ajouter une palette : la déclarer dans css/themes.css,
// puis l'ajouter dans le bon groupe ci-dessous.
// =====================================================================

const THEMES = {
  blanc: [
    { id: "bleu", nom: "Bleu" },
    { id: "emeraude", nom: "Émeraude" },
    { id: "amethyste", nom: "Améthyste" },
    { id: "orange", nom: "Orange" },
    { id: "framboise", nom: "Framboise" },
    { id: "turquoise", nom: "Turquoise" },
  ],
  teinte: [
    { id: "ble", nom: "Blé" },
    { id: "lagon", nom: "Lagon" },
    { id: "dragee", nom: "Dragée" },
    { id: "pastel", nom: "Pastel" },
    { id: "sauge", nom: "Sauge" },
    { id: "ardoise", nom: "Ardoise" },
  ],
};

document.addEventListener("DOMContentLoaded", () => {
  const COCHE = `<svg class="nuance__coche" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  // ── Nuanciers ─────────────────────────────────────────────────────
  Object.entries(THEMES).forEach(([groupe, liste]) => {
    const zone = document.querySelector(`[data-groupe="${groupe}"]`);
    liste.forEach((t) => {
      const bouton = document.createElement("button");
      bouton.type = "button";
      bouton.className = "nuance";
      bouton.setAttribute("role", "radio");
      bouton.dataset.valeur = t.id;
      bouton.innerHTML = `<span class="nuance__apercu" data-theme="${t.id}" aria-hidden="true">
          <i class="a-barre"></i><i class="a-titre"></i><i class="a-texte"></i><i class="a-bouton"></i><i class="a-pied"></i>
        </span>
        <span class="nuance__nom">${t.nom}${COCHE}</span>`;
      bouton.addEventListener("click", () => {
        ButInfo.changer({ theme: t.id });
        majInterface();
      });
      zone.append(bouton);
    });
  });

  // Flèches du clavier dans un groupe de couleurs
  document.querySelectorAll(".nuancier").forEach((groupe) => {
    groupe.addEventListener("keydown", (ev) => {
      const tous = [...document.querySelectorAll(".nuance")];
      const i = tous.indexOf(document.activeElement);
      if (i < 0) return;
      const sens = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[ev.key];
      if (!sens) return;
      ev.preventDefault();
      const cible = tous[(i + sens + tous.length) % tous.length];
      cible.focus();
      cible.click();
    });
  });

  // ── Clair / sombre ────────────────────────────────────────────────
  document.querySelectorAll(".segment button").forEach((b) =>
    b.addEventListener("click", () => {
      ButInfo.changer({ mode: b.dataset.choix });
      majInterface();
    })
  );

  // ── Interrupteurs ─────────────────────────────────────────────────
  const hc = document.getElementById("choix-hc");
  const syntaxe = document.getElementById("choix-syntaxe");

  hc.addEventListener("click", () => {
    ButInfo.changer({ hc: !ButInfo.lire().hc });
    majInterface();
  });

  syntaxe.addEventListener("click", () => {
    ButInfo.changer({ syntaxe: !ButInfo.lire().syntaxe });
    majInterface();
  });

  document.querySelectorAll(".interrupteur").forEach((ligne) =>
    ligne.addEventListener("click", (ev) => {
      if (ev.target.closest("button")) return;
      ligne.querySelector("button").click();
    })
  );

  document.getElementById("reinitialiser").addEventListener("click", () => {
    ButInfo.changer({ theme: "bleu", mode: "clair", hc: false, syntaxe: true });
    majInterface();
  });

  // ── État de l'interface ───────────────────────────────────────────
  function majInterface() {
    const r = ButInfo.lire();

    document.querySelectorAll(".nuance").forEach((b) => {
      const actif = b.dataset.valeur === r.theme;
      b.setAttribute("aria-checked", actif ? "true" : "false");
      b.tabIndex = actif ? 0 : -1;
      b.querySelector(".nuance__apercu").dataset.mode = r.mode;
    });

    document.querySelectorAll(".segment button").forEach((b) =>
      b.setAttribute("aria-pressed", b.dataset.choix === r.mode ? "true" : "false")
    );

    hc.setAttribute("aria-checked", r.hc ? "true" : "false");
    syntaxe.setAttribute("aria-checked", r.syntaxe ? "true" : "false");

    // High contrast actif : le reste est grisé et ne réagit plus
    ["reglage-couleurs", "reglage-mode"].forEach((id) => {
      const section = document.getElementById(id);
      section.classList.toggle("desactive", r.hc);
      section.inert = r.hc;
    });
  }

  majInterface();
});
