// =====================================================================
// SITE.JS : chargé dans le <head> de toutes les pages
//   1. applique le thème enregistré (avant l'affichage, pas de flash)
//   2. ajoute la barre du haut, le fil d'Ariane et le bouton Thème
//   3. ajoute « précédent / suivant » et le pied de page
//   4. code : coloration syntaxique et bouton Copier
// Les données (matières, pages) viennent de assets/js/script.js.
// =====================================================================

const ButInfo = (() => {
  // site.js est dans assets/js/ : la racine du site est deux dossiers au-dessus
  const racine = new URL("../..", document.currentScript.src).href;
  const CLE = "butinfo-reglages";
  const DEFAUT = { theme: "bleu", mode: "clair", hc: false, syntaxe: true };


  // ███ 1. THÈME █████████████████████████████████████████████████████

  function lire() {
    try {
      return { ...DEFAUT, ...JSON.parse(localStorage.getItem(CLE) || "{}") };
    } catch {
      return { ...DEFAUT };
    }
  }

  function appliquer(r) {
    const html = document.documentElement;
    html.dataset.theme = r.theme;
    html.dataset.mode = r.mode;
    html.dataset.syntaxe = r.syntaxe ? "on" : "off";
    if (r.hc) html.dataset.hc = "on";
    else delete html.dataset.hc;
  }

  // Change le thème avec un fondu
  function changer(modifs) {
    const r = { ...lire(), ...modifs };
    try {
      localStorage.setItem(CLE, JSON.stringify(r));
    } catch {
      /* navigation privée : le thème ne sera pas retenu */
    }

    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduit) {
      appliquer(r);
    } else if (document.startViewTransition) {
      document.startViewTransition(() => appliquer(r));
    } else {
      const html = document.documentElement;
      html.classList.add("fondu-theme");
      appliquer(r);
      setTimeout(() => html.classList.remove("fondu-theme"), 500);
    }
    return r;
  }

  appliquer(lire());

  // Un changement fait dans un autre onglet s'applique ici aussi
  window.addEventListener("storage", (ev) => ev.key === CLE && appliquer(lire()));


  // ███ 2. BARRE DU HAUT █████████████████████████████████████████████

  const ICONE_PINCEAU = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M20.6 2.3a1.5 1.5 0 0 1 2.1 2.1l-8.4 8.4-2.1-2.1z" fill="currentColor"/>
    <path d="M11.4 11.5l2.1 2.1-1.4 1.4-2.1-2.1z" fill="currentColor"/>
    <path d="M9.2 13.9l1.9 1.9c.5 3.3-2.2 6.3-6.6 6.3-1 0-2-.2-3-.6 1.7-.9 2.3-2.2 2.5-3.8.3-2.6 2.6-4.3 5.2-3.8z" fill="currentColor"/>
  </svg>`;

  const ICONE_RETOUR = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  function boutonTheme() {
    const slot = document.createElement("div");
    slot.className = "slot-theme";
    slot.innerHTML = `<a class="btn-theme" href="${racine}pages/site/theme.html" aria-label="Thème">${ICONE_PINCEAU}</a>`;
    return slot;
  }

  // Chemin de la page actuelle, relatif à la racine du site
  function cheminActuel() {
    const href = decodeURIComponent(location.href.split(/[?#]/)[0]).normalize("NFC");
    const base = decodeURIComponent(racine).normalize("NFC");
    const rel = href.startsWith(base) ? href.slice(base.length) : "";
    return rel === "" ? "index.html" : rel;
  }

  const meme = (a, b) => a && b && a.normalize("NFC") === b.normalize("NFC");
  const codeMatiere = (titre) => titre.split(/\s*-\s*/)[0];

  // Construit la liste des étapes du fil d'Ariane : [{ titre, lien, court }]
  function etapes(chemin) {
    const liste = [{ titre: "BUT INFO2", lien: "index.html", court: "Accueil" }];
    const lesMatieres = typeof matieres !== "undefined" ? matieres : [];
    const lesPages = typeof pages !== "undefined" ? pages : [];

    const matiere = lesMatieres.find((m) => meme(m.lien, chemin));
    if (matiere) {
      liste.push({ titre: matiere.titre, court: codeMatiere(matiere.titre) });
      return liste;
    }

    const page = lesPages.find((p) => meme(p.lien, chemin));
    if (page) {
      const m = lesMatieres.find((x) => x.id === page.matiere);
      if (m && !meme(m.lien, page.lien)) {
        liste.push({ titre: m.titre, lien: m.lien, court: codeMatiere(m.titre) });
      }
      const parent = page.parent && lesPages.find((p) => meme(p.lien, page.parent));
      if (parent) liste.push({ titre: parent.titre, lien: parent.lien, court: parent.titre });
      liste.push({ titre: page.titre });
      return liste;
    }

    if (chemin === "pages/site/theme.html") {
      liste.push({ titre: "Thème" });
      return liste;
    }

    const titre = (document.querySelector("h1") || {}).textContent || document.title;
    liste.push({ titre: titre.trim() });
    return liste;
  }

  function barreDuHaut(chemin) {
    const liste = etapes(chemin);
    const barre = document.createElement("header");
    barre.className = "barre-site";

    const nav = document.createElement("nav");
    nav.className = "fil-ariane";
    nav.setAttribute("aria-label", "Fil d'Ariane");

    const ol = document.createElement("ol");
    liste.forEach((e, i) => {
      const li = document.createElement("li");
      if (i === liste.length - 1) {
        const span = document.createElement("span");
        span.setAttribute("aria-current", "page");
        span.textContent = e.titre;
        li.append(span);
      } else {
        const a = document.createElement("a");
        a.href = racine + e.lien;
        a.textContent = e.titre;
        li.append(a);
      }
      ol.append(li);
    });

    // Téléphone : un seul lien vers le niveau du dessus
    const dessus = liste[liste.length - 2];
    const retour = document.createElement("a");
    retour.className = "retour-mobile";
    retour.href = racine + dessus.lien;
    retour.innerHTML = `${ICONE_RETOUR}<span></span>`;
    retour.querySelector("span").textContent = dessus.court || dessus.titre;

    nav.append(ol, retour);
    barre.append(nav, boutonTheme());
    return barre;
  }


  // ███ 3. PRÉCÉDENT / SUIVANT ET PIED DE PAGE ███████████████████████

  function navigationCours(chemin) {
    if (typeof pages === "undefined") return null;
    const page = pages.find((p) => meme(p.lien, chemin));
    if (!page || page.sommaire) return null;

    const voisines = pages.filter(
      (p) => p.matiere === page.matiere && !p.sommaire && (p.parent || "") === (page.parent || "")
    );
    const i = voisines.indexOf(page);
    const avant = voisines[i - 1];
    const apres = voisines[i + 1];
    if (!avant && !apres) return null;

    const nav = document.createElement("nav");
    nav.className = "navigation-cours";
    nav.setAttribute("aria-label", "Pages de la même matière");
    if (avant) nav.append(lienVoisin(avant, "Précédent", "precedent"));
    if (apres) nav.append(lienVoisin(apres, "Suivant", "suivant"));
    return nav;
  }

  function lienVoisin(p, texte, classe) {
    const a = document.createElement("a");
    a.className = classe;
    a.href = racine + p.lien;
    a.rel = classe === "suivant" ? "next" : "prev";
    a.innerHTML = `<small></small><span></span>`;
    a.querySelector("small").textContent = texte;
    a.querySelector("span").textContent = p.titre;
    return a;
  }

  function piedDePage() {
    const pied = document.createElement("footer");
    pied.className = "pied";
    pied.innerHTML = `<div class="pied__contenu">
      <ul>
        <li><a href="${racine}pages/site/politique.html">Politique de confidentialité</a></li>
        <li><a href="${racine}pages/site/mentions-legales.html">Crédits et mentions légales</a></li>
      </ul>
      <p>© 2026 Les étudiants en BUT Info 2 - Tous droits réservés</p>
    </div>`;
    return pied;
  }

  // Pages sommaire : toute la ligne est cliquable, et le lien « Accéder »
  // prend le nom de la page pour les lecteurs d'écran.
  function liensSommaire() {
    document.querySelectorAll(".menu-card").forEach((carte) => {
      const titre = carte.querySelector("h2");
      const lien = carte.querySelector(".btn-lien");
      if (titre && lien && !lien.hasAttribute("aria-label")) {
        lien.setAttribute("aria-label", titre.textContent.trim());
      }
    });
  }

  // Ancres sur les titres de section, utilisées par la recherche (#section-1, #section-2…)
  function ancres() {
    document.querySelectorAll("body > h2, body > * h2").forEach((h2, i) => {
      const id = `section-${i + 1}`;
      if (!h2.id) h2.id = id;
      else if (!document.getElementById(id)) {
        const repere = document.createElement("span");
        repere.id = id;
        h2.before(repere);
      }
    });
    if (location.hash) {
      const cible = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (cible) cible.scrollIntoView();
    }
  }


  // ███ 4. CODE ██████████████████████████████████████████████████████

  const MOTS_JAVA = new Set(
    ("abstract assert boolean break byte case catch char class const continue default do double else enum " +
      "extends final finally float for if implements import instanceof int interface long native new package " +
      "private protected public return short static super switch synchronized this throw throws transient try " +
      "void volatile while var val fun object companion data sealed open override lateinit init when is in " +
      "constructor internal typealias null true false record get set").split(" ")
  );

  const MOTS_PYTHON = new Set(
    ("and as assert async await break class continue def del elif else except False finally for from global if " +
      "import in is lambda None nonlocal not or pass raise return True try while with yield self").split(" ")
  );

  const MOTS_GO = new Set(
    ("break case chan const continue default defer else fallthrough for func go goto if import interface map " +
      "package range return select struct switch type var true false nil iota").split(" ")
  );

  const REGLES = {
    go: [
      ["sx-commentaire", /\/\/[^\n]*|\/\*[\s\S]*?\*\//y],
      ["sx-chaine", /"(?:\\.|[^"\\\n])*"|`[^`]*`|'(?:\\.|[^'\\\n])+'/y],
      ["sx-nombre", /\b\d[\d_]*(?:\.\d+)?\b/y],
      ["mot", /[A-Za-z_]\w*/y],
    ],
    java: [
      ["sx-commentaire", /\/\/[^\n]*|\/\*[\s\S]*?\*\//y],
      ["sx-chaine", /"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])'/y],
      ["sx-annotation", /@\w+/y],
      ["sx-nombre", /\b\d[\d_]*(?:\.\d+)?[fFdDlL]?\b/y],
      ["mot", /[A-Za-z_]\w*/y],
    ],
    python: [
      ["sx-commentaire", /#[^\n]*/y],
      ["sx-chaine", /[fFrRbB]?("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')/y],
      ["sx-annotation", /@\w+/y],
      ["sx-nombre", /\b\d+(?:\.\d+)?\b/y],
      ["mot", /[A-Za-z_]\w*/y],
    ],
    balises: [
      ["sx-commentaire", /<!--[\s\S]*?-->|<%--[\s\S]*?--%>/y],
      ["sx-balise", /<%[=!@]?|%>|<\/?[\w:.-]+|\/?>/y],
      ["sx-chaine", /"[^"\n]*"|'[^'\n]*'/y],
      ["sx-type", /\$\{[^}\n]*\}/y],
    ],
  };

  function langage(texte, pre) {
    const force = pre.dataset.lang || (pre.querySelector("code[class*='language-']") || {}).className;
    if (force) {
      if (/py/.test(force)) return "python";
      if (/\bgo(lang)?\b|language-go/.test(force)) return "go";
      if (/html|jsp|xml/.test(force)) return "balises";
      if (/aucun|none|text/.test(force)) return null;
      return "java";
    }
    if (/[├└│]/.test(texte)) return null;
    if (/^\s*</.test(texte) || /<%/.test(texte)) return "balises";
    if (/^\s*package \w+\s*$/m.test(texte) || /^\s*func \w*\(/m.test(texte) || /\bgo \w+\(/.test(texte)) return "go";
    if (/^\s*(def|class) \w+.*:\s*$/m.test(texte) || /^\s*(import|from) \w+/m.test(texte) && !/;\s*$/m.test(texte)) return "python";
    if (/^\s*#/m.test(texte) && !/[{};]/.test(texte)) return "python";
    if (/^\s*(for|while|if) .*:\s*$/m.test(texte) && !/[{}]/.test(texte)) return "python";
    return "java";
  }

  // Découpe le texte en morceaux colorés : [[début, fin, classe], …]
  function decouper(texte, lang) {
    const regles = REGLES[lang];
    const mots = lang === "python" ? MOTS_PYTHON : lang === "go" ? MOTS_GO : MOTS_JAVA;
    const morceaux = [];
    let i = 0;
    while (i < texte.length) {
      let trouve = false;
      for (const [classe, regex] of regles) {
        regex.lastIndex = i;
        const m = regex.exec(texte);
        if (!m || !m[0]) continue;
        let c = classe;
        if (classe === "mot") {
          const suite = texte.slice(i + m[0].length).match(/^\s*\(/);
          const avant = texte.slice(Math.max(0, i - 6), i);
          if (mots.has(m[0])) c = "sx-mot";
          else if (/^[A-Z]/.test(m[0])) c = "sx-type";
          else if (suite || /(def|fun|func)\s+$/.test(avant)) c = "sx-fonction";
          else c = null;
        }
        if (c) morceaux.push([i, i + m[0].length, c]);
        i += m[0].length;
        trouve = true;
        break;
      }
      if (!trouve) i++;
    }
    return morceaux;
  }

  // Applique les couleurs sans toucher aux balises déjà présentes (<mark>, <strong>…)
  function colorer(pre) {
    const texte = pre.textContent;
    const lang = langage(texte, pre);
    if (!lang) return;
    const morceaux = decouper(texte, lang);
    if (!morceaux.length) return;

    const noeuds = [];
    const parcours = document.createTreeWalker(pre, NodeFilter.SHOW_TEXT);
    let pos = 0;
    while (parcours.nextNode()) {
      const n = parcours.currentNode;
      noeuds.push([n, pos]);
      pos += n.nodeValue.length;
    }

    let k = 0;
    noeuds.forEach(([noeud, debut]) => {
      const fin = debut + noeud.nodeValue.length;
      while (k < morceaux.length && morceaux[k][1] <= debut) k++;
      let j = k;
      const fragment = document.createDocumentFragment();
      let curseur = debut;
      while (j < morceaux.length && morceaux[j][0] < fin) {
        const [a, b, classe] = morceaux[j];
        const de = Math.max(a, debut);
        const a_ = Math.min(b, fin);
        if (de > curseur) fragment.append(noeud.nodeValue.slice(curseur - debut, de - debut));
        const span = document.createElement("span");
        span.className = classe;
        span.textContent = noeud.nodeValue.slice(de - debut, a_ - debut);
        fragment.append(span);
        curseur = a_;
        if (b > fin) break;
        j++;
      }
      if (curseur === debut) return;
      if (curseur < fin) fragment.append(noeud.nodeValue.slice(curseur - debut));
      noeud.replaceWith(fragment);
    });
  }

  const ICONE_COPIER = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="8" y="8" width="12" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" fill="none" stroke="currentColor" stroke-width="2"/></svg>`;
  const ICONE_OK = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  async function copierTexte(texte) {
    try {
      await navigator.clipboard.writeText(texte);
      return true;
    } catch {
      const zone = document.createElement("textarea");
      zone.value = texte;
      zone.style.position = "fixed";
      zone.style.opacity = "0";
      document.body.append(zone);
      zone.select();
      const ok = document.execCommand("copy");
      zone.remove();
      return ok;
    }
  }

  function preparerCode(racineCode = document) {
    racineCode.querySelectorAll("pre").forEach((pre) => {
      if (pre.closest(".bloc-code")) return;
      colorer(pre);

      const bloc = document.createElement("div");
      bloc.className = "bloc-code";
      pre.before(bloc);
      bloc.append(pre);

      const bouton = document.createElement("button");
      bouton.type = "button";
      bouton.className = "btn-copier";
      bouton.innerHTML = `${ICONE_COPIER}<span>Copier</span>`;
      bouton.setAttribute("aria-label", "Copier le code");
      bouton.addEventListener("click", async () => {
        const ok = await copierTexte(pre.textContent.replace(/\s+$/, ""));
        bouton.classList.toggle("copie", ok);
        bouton.innerHTML = ok ? `${ICONE_OK}<span>Copié</span>` : `${ICONE_COPIER}<span>Échec</span>`;
        setTimeout(() => {
          bouton.classList.remove("copie");
          bouton.innerHTML = `${ICONE_COPIER}<span>Copier</span>`;
        }, 1800);
      });
      bloc.append(bouton);
    });
  }


  // ███ MISE EN PLACE ████████████████████████████████████████████████

  document.addEventListener("DOMContentLoaded", () => {
    const chemin = cheminActuel();
    const body = document.body;

    if (body.classList.contains("accueil")) {
      const slot = document.querySelector("[data-bouton-theme]");
      if (slot) slot.replaceWith(boutonTheme());
    } else {
      body.prepend(barreDuHaut(chemin));
      const nav = navigationCours(chemin);
      if (nav) body.append(nav);
      if (!body.querySelector(".pied, body > footer")) body.append(piedDePage());
      ancres();
      liensSommaire();
    }

    preparerCode();
  });

  return { racine, lire, changer, preparerCode };
})();
