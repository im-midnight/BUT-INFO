// =====================================================================
// DONNÉES DU SITE
// C'est le seul fichier à modifier pour ajouter une matière ou une page.
// =====================================================================

// ── Matières : une carte sur l'accueil pour chacune ──────────────────
const matieres = [
  {
    id: "dev-web",
    titre: "R301 - Développement web",
    description: "Syntaxe Java, servlets, JSP.",
    lien: "pages/web/indexWeb.html",
    semestre: "S3",
  },
  {
    id: "dev-efficace",
    titre: "R302 - Algos corrects et efficaces (Dev. efficace)",
    description: "Complexité, triplets de Hoare, invariants de boucle.",
    lien: "pages/algos_corrects_efficaces/cours.html",
    semestre: "S3",
  },
  {
    id: "analyse",
    titre: "R303 - Analyse",
    description: "Rien n'a encore été ajouté.",
    lien: "pages/analyse/indexAnalyse.html",
    semestre: "S3",
  },
  {
    id: "qualite-dev",
    titre: "R304 - Qualité de développement",
    description: "Design patterns en Kotlin, avec leurs diagrammes UML.",
    lien: "pages/designPattern/DP.html",
    semestre: "S3",
  },
  {
    id: "prog-systeme",
    titre: "R305 - Programmation système",
    description: "Rien n'a encore été ajouté.",
    lien: "pages/progSysteme/indexProgSysteme.html",
    semestre: "S3",
  },
  {
    id: "reseaux",
    titre: "R306 - Architecture des réseaux",
    description: "Rien n'a encore été ajouté.",
    lien: "pages/reseaux/indexReseaux.html",
    semestre: "S3",
  },
  {
    id: "sql",
    titre: "R307 - SQL dans un langage de programmation",
    description: "Rien n'a encore été ajouté.",
    lien: "pages/sql/indexSql.html",
    semestre: "S3",
  },
  {
    id: "probabilites",
    titre: "R308 - Probabilités",
    description: "Dénombrement, probabilités conditionnelles, lois usuelles.",
    lien: "pages/math/proba/indexProba.html",
    semestre: "S3",
  },
  {
    id: "crypto",
    titre: "R309 - Cryptographie et sécurité",
    description: "Arithmétique modulaire et TP de chiffrement.",
    lien: "pages/math/crypto/indexCrypto.html",
    semestre: "S3",
  },
];

// ── Semestres affichés dans le filtre ───────────────────────────────
// Un semestre sans aucune matière affiche « pas encore commencé ».
const semestres = ["S3", "S4"];

// ── Pages : servent à la recherche, au fil d'Ariane et à « précédent / suivant »
// matiere   : l'id d'une matière ci-dessus
// type      : "Cours", "TD" ou "TP"
// parent    : (facultatif) page sommaire au-dessus, par exemple la liste des TP
// sommaire  : (facultatif) true si la page ne fait que lister d'autres pages
// sections  : (facultatif) titres des <h2> de la page, dans l'ordre, pour la recherche
// L'ordre du tableau donne l'ordre « précédent / suivant » dans une matière.
const pages = [
  // R301
  {
    titre: "Syntaxe Java",
    lien: "pages/web/syntaxe_java.html",
    matiere: "dev-web",
    type: "Cours",
    sections: [
      "Le cycle de vie d'un programme", "La structure minimale",
      "Les variables et le typage statique", "Boucles et conditions",
      "Programmation orientée objet, classes, héritage et interfaces",
      "Les structures de données et leurs méthodes", "Parcourir des structures de données",
      "La gestion des erreurs (exceptions)",
    ],
  },
  {
    titre: "Introduction aux servlets",
    lien: "pages/web/servlet.html",
    matiere: "dev-web",
    type: "Cours",
    sections: [
      "Qu'est-ce qu'une servlet ?", "Pourquoi la servlet ne parle pas directement au client ?",
      "Le cycle de vie d'une servlet", "Que produit une servlet ?",
    ],
  },
  { titre: "TD", lien: "pages/web/TD/td.html", matiere: "dev-web", type: "TD", sommaire: true },
  {
    titre: "Révision Java et pattern DAO",
    lien: "pages/web/TD/Java/td-java.html",
    matiere: "dev-web",
    type: "TD",
    parent: "pages/web/TD/td.html",
    sections: [
      "Gestion des étudiants", "Pattern DAO : approche classique",
      "Pattern DAO : approche Optional", "Synthèse des notions clés",
    ],
  },
  {
    titre: "Les servlets",
    lien: "pages/web/TD/servelet/td-servelet.html",
    matiere: "dev-web",
    type: "TD",
    parent: "pages/web/TD/td.html",
    sections: [
      "Les annotations @WebServlet et @WebInitParam", "Où ranger quoi : l'arborescence du projet",
      "Le cycle de vie : CycleServlet", "Les annotations : TestWebServlet",
      "Un formulaire", "Une redirection", "Les cookies : pré-remplir le login",
      "Les sessions : garder l'utilisateur connecté", "Synthèse",
    ],
  },
  {
    titre: "Les JSP",
    lien: "pages/web/TD/Jsp/td-jsp.html",
    matiere: "dev-web",
    type: "TD",
    parent: "pages/web/TD/td.html",
    sections: [
      "Toutes les balises d'une page JSP", "Les objets implicites utilisables dans les scriptlets",
    ],
  },

  // R302
  {
    titre: "Conception d'algorithmes corrects et efficaces",
    lien: "pages/algos_corrects_efficaces/cours.html",
    matiere: "dev-efficace",
    type: "Cours",
    sections: [
      "Introduction et étapes de développement", "Complexité et ordres de grandeur",
      "Spécification et triplet de Hoare", "Preuve de terminaison",
      "Construction des boucles et invariant", "Choix des structures de données",
      "Synthèse des notions clés",
    ],
  },

  // R304
  {
    titre: "Design patterns en Kotlin",
    lien: "pages/designPattern/DP.html",
    matiere: "qualite-dev",
    type: "Cours",
    sections: [
      "Qu'est-ce qu'un design pattern ?", "Fabrique (Factory)", "Singleton",
      "DAO (Data Access Object)", "Patron de méthode (Template method)", "Stratégie (Strategy)",
      "Itérateur (Iterator)", "Observateur (Observer)", "Composite", "Délégation (Delegate)",
      "Adaptateur (Adapter)", "Entrepôt de données (Repository)", "Modèle-Vue-Contrôleur (MVC)",
      "Design patterns combinés dans les TP", "Composite + Délégation : les salaires (TP5)",
      "Singleton + Entrepôt : le spatioport (TP5)", "DAO + Entrepôt : NetPrime (TP6)",
      "DAO + Entrepôt : les fruits (TP8)", "Fabrique + Composite + Stratégie : tarification des vols (TP7)",
      "Composite : recettes de cocktails (TP7)", "Stratégie + Itérateur : tables de hachage (TP9)",
      "Itérateur : deux implémentations de File (TP1)", "Synthèse",
    ],
  },

  // R308
  {
    titre: "Les 4 lois de probabilité",
    lien: "pages/math/proba/cours.html",
    matiere: "probabilites",
    type: "Cours",
    sections: [
      "La loi binomiale", "La loi de Poisson", "La loi exponentielle", "La loi uniforme", "Synthèse",
    ],
  },
  {
    titre: "Quelle loi pour quel problème ?",
    lien: "pages/math/proba/application.html",
    matiere: "probabilites",
    type: "TD",
  },
  {
    titre: "Dénombrement",
    lien: "pages/math/proba/Dénombrement.html",
    matiere: "probabilites",
    type: "Cours",
    sections: [
      "Logique des ensembles et règles de comptage", "Les 3 modèles de tirages",
      "Espace probabilisé et équiprobabilité", "Variables aléatoires discrètes et fonction de répartition",
      "Espérance, variance et écart-type",
    ],
  },
  {
    titre: "Probabilités conditionnelles",
    lien: "pages/math/proba/PobaCondi.html",
    matiere: "probabilites",
    type: "Cours",
    sections: [
      "Approche intuitive : population et sous-population", "Définition de la probabilité conditionnelle",
      "Représentation par un arbre", "Indépendance et incompatibilité",
      "Théorème des probabilités composées", "Théorème des probabilités totales",
      "Synthèse : quel outil selon le problème ?",
    ],
  },

  // R309
  {
    titre: "Arithmétique",
    lien: "pages/math/crypto/cours.html",
    matiere: "crypto",
    type: "Cours",
    sections: [
      "La division euclidienne", "Le PGCD", "L'algorithme d'Euclide", "Le PPCM",
      "Bézout et l'algorithme d'Euclide étendu", "Lemme de Gauss, lemme d'Euclide et nombres premiers",
      "Les congruences et le modulo", "L'inverse modulaire", "Synthèse",
    ],
  },
  { titre: "TP", lien: "pages/math/crypto/tp.html", matiere: "crypto", type: "TP", sommaire: true },
  {
    titre: "Exercice 1 : nombres premiers",
    lien: "pages/math/crypto/tp/ex1.html",
    matiere: "crypto",
    type: "TP",
    parent: "pages/math/crypto/tp.html",
    sections: ["Le test de primalité et la borne racine de n", "Liste, proportion et raréfaction", "Synthèse des méthodes"],
  },
  {
    titre: "Exercice 2 : Euclide et Bézout",
    lien: "pages/math/crypto/tp/ex2.html",
    matiere: "crypto",
    type: "TP",
    parent: "pages/math/crypto/tp.html",
    sections: [
      "Algorithme d'Euclide et remontée de Bézout", "Inversibilité dans Z/3315Z",
      "Résolution de l'équation de congruence", "Algorithme d'Euclide étendu en Python", "Synthèse",
    ],
  },
  {
    titre: "Exercice 3 : congruences",
    lien: "pages/math/crypto/tp/ex3.html",
    matiere: "crypto",
    type: "TP",
    parent: "pages/math/crypto/tp.html",
    sections: ["Divisibilité de 7^n + 1 par 8", "Reste de la division de 100^1000 par 13", "Synthèse"],
  },
  {
    titre: "Exercice 4 : chiffrement affine",
    lien: "pages/math/crypto/tp/ex4.html",
    matiere: "crypto",
    type: "TP",
    parent: "pages/math/crypto/tp.html",
    sections: [
      "Dictionnaire de correspondance dans Z/31Z", "Fonction de chiffrement chiff_affine",
      "Fonction de déchiffrement dechiff_affine", "Échange de clé : Diffie-Hellman", "Synthèse",
    ],
  },
  {
    titre: "Exercice 5 : logarithme discret",
    lien: "pages/math/crypto/tp/ex5.html",
    matiere: "crypto",
    type: "TP",
    parent: "pages/math/crypto/tp.html",
    sections: [
      "Principe général", "Trouver un générateur aléatoire", "Fonction log_discret",
      "Algorithme de Shanks : pas de bébé, pas de géant", "Exemple détaillé : bsgs(3, 11, 43)", "Synthèse",
    ],
  },
];


// =====================================================================
// ACCUEIL : grille des matières, recherche et filtres
// (ne s'exécute que sur index.html)
// =====================================================================

document.addEventListener("DOMContentLoaded", () => {
  const grille = document.getElementById("liste-matieres");
  if (!grille) return;

  const champ = document.getElementById("recherche-champ");
  const formulaire = document.getElementById("recherche");
  const listeSuggestions = document.getElementById("suggestions");
  const boutonEffacer = document.getElementById("recherche-effacer");
  const zoneResultats = document.getElementById("resultats");
  const filtresSemestre = document.getElementById("filtre-semestre");
  const filtresType = document.getElementById("filtre-type");

  const nomMatiere = Object.fromEntries(matieres.map((m) => [m.id, m.titre]));
  const semestreMatiere = Object.fromEntries(matieres.map((m) => [m.id, m.semestre]));

  // ── Grille ────────────────────────────────────────────────────────
  // Une ligne par matière : code (R301), nom, résumé et nombre de pages
  function creerCarte({ id, titre, description, lien }) {
    const [, code = "", nomCourt = titre] = titre.match(/^(R\d+)\s*-\s*(.*)$/) || [];
    const nbPages = pages.filter((p) => p.matiere === id && !p.sommaire).length;

    const item = document.createElement("li");
    const carte = document.createElement("a");
    carte.className = nbPages ? "carte" : "carte carte--vide";
    carte.id = `matiere-${id}`;
    carte.href = lien;

    const numero = document.createElement("span");
    numero.className = "carte__code";
    numero.textContent = code;

    const nom = document.createElement("h2");
    nom.className = "carte__titre";
    nom.textContent = nomCourt;

    const resume = document.createElement("p");
    resume.className = "carte__texte";
    resume.textContent = description;

    const compte = document.createElement("span");
    compte.className = "carte__compte";
    compte.textContent = nbPages ? `${nbPages} page${nbPages > 1 ? "s" : ""}` : "";

    carte.append(numero, nom, resume, compte);
    item.append(carte);
    return item;
  }

  grille.replaceChildren(...matieres.map(creerCarte));

  // ── Filtres (générés à partir des données) ────────────────────────
  function creerPuce(nom, valeur, texte, coche) {
    const label = document.createElement("label");
    label.className = "puce";
    label.innerHTML = `<input type="radio" name="${nom}" value="${valeur}"${coche ? " checked" : ""}><span>${texte}</span>`;
    return label;
  }

  filtresSemestre.append(creerPuce("semestre", "", "Tous", true));
  semestres.forEach((s) => filtresSemestre.append(creerPuce("semestre", s, s, false)));

  filtresType.append(creerPuce("type", "", "Tous", true));
  ["Cours", "TD", "TP"].forEach((t) => filtresType.append(creerPuce("type", t, t, false)));

  const filtreActif = (nom) => document.querySelector(`input[name="${nom}"]:checked`).value;

  // ── Index de recherche ────────────────────────────────────────────
  const normaliser = (texte) =>
    texte.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

  const index = [];
  pages.filter((p) => !p.sommaire).forEach((p) => {
    const lieu = nomMatiere[p.matiere] || "";
    index.push({ titre: p.titre, lieu, lien: p.lien, type: p.type, matiere: p.matiere, poids: 3 });
    (p.sections || []).forEach((section, i) => {
      index.push({
        titre: section,
        lieu: `${p.titre}, ${lieu.split(" - ")[0]}`,
        lien: `${p.lien}#section-${i + 1}`,
        type: p.type,
        matiere: p.matiere,
        poids: 1,
      });
    });
  });
  index.forEach((e) => {
    e.cleTitre = normaliser(e.titre);
    e.cleLieu = normaliser(e.lieu);
  });

  function chercher(requete) {
    const mots = normaliser(requete).split(/[\s,;:'’]+/).filter(Boolean);
    const semestre = filtreActif("semestre");
    const type = filtreActif("type");

    return index
      .filter((e) => (!type || e.type === type) && (!semestre || semestreMatiere[e.matiere] === semestre))
      .map((e) => {
        if (!mots.length) return { e, score: e.poids };
        let score = 0;
        for (const mot of mots) {
          const debutMot = new RegExp(`(^|[^a-z0-9])${mot.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`);
          if (e.cleTitre.startsWith(mot)) score += 6;
          else if (debutMot.test(e.cleTitre)) score += 4;
          else if (e.cleTitre.includes(mot)) score += 2;
          else if (e.cleLieu.includes(mot)) score += 1;
          else return null;
        }
        return { e, score: score + e.poids };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.e);
  }

  // Met en évidence les mots tapés, sans tenir compte des accents
  function surligner(texte, requete) {
    const mots = normaliser(requete).split(/[\s,;:'’]+/).filter(Boolean);
    const cle = normaliser(texte);
    const zones = [];
    mots.forEach((mot) => {
      let i = cle.indexOf(mot);
      while (i !== -1) {
        zones.push([i, i + mot.length]);
        i = cle.indexOf(mot, i + mot.length);
      }
    });
    zones.sort((a, b) => a[0] - b[0]);
    let html = "";
    let pos = 0;
    zones.forEach(([debut, fin]) => {
      if (debut < pos) return;
      html += echapper(texte.slice(pos, debut)) + "<mark>" + echapper(texte.slice(debut, fin)) + "</mark>";
      pos = fin;
    });
    return html + echapper(texte.slice(pos));
  }

  function echapper(texte) {
    return texte.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }

  // ── Suggestions pendant la frappe ─────────────────────────────────
  let selection = -1;

  function fermerSuggestions() {
    listeSuggestions.hidden = true;
    champ.setAttribute("aria-expanded", "false");
    champ.removeAttribute("aria-activedescendant");
    selection = -1;
  }

  function afficherSuggestions() {
    const requete = champ.value.trim();
    boutonEffacer.hidden = !champ.value;
    if (!requete) {
      fermerSuggestions();
      return;
    }

    const trouves = chercher(requete);
    listeSuggestions.innerHTML = "";

    if (!trouves.length) {
      listeSuggestions.innerHTML = `<li class="suggestions__vide" role="presentation">Aucun cours ne correspond à « ${echapper(requete)} ».</li>`;
    } else {
      trouves.slice(0, 7).forEach((e, i) => {
        const li = document.createElement("li");
        li.className = "suggestion";
        li.id = `suggestion-${i}`;
        li.setAttribute("role", "option");
        li.dataset.lien = e.lien;
        li.innerHTML = `<span><span class="suggestion__titre">${surligner(e.titre, requete)}</span><span class="suggestion__lieu">${echapper(e.lieu)}</span></span><span class="type">${e.type}</span>`;
        listeSuggestions.append(li);
      });
      if (trouves.length > 7) {
        const li = document.createElement("li");
        li.className = "suggestion suggestions__tout";
        li.id = "suggestion-tout";
        li.setAttribute("role", "option");
        li.dataset.tout = "1";
        li.textContent = `Voir les ${trouves.length} résultats`;
        listeSuggestions.append(li);
      }
    }

    listeSuggestions.hidden = false;
    champ.setAttribute("aria-expanded", "true");
    selection = -1;
  }

  function choisirSuggestion(li) {
    if (!li) return;
    if (li.dataset.tout) {
      afficherResultats();
      return;
    }
    window.location.href = li.dataset.lien;
  }

  function deplacerSelection(sens) {
    const options = [...listeSuggestions.querySelectorAll('[role="option"]')];
    if (!options.length) return;
    selection = (selection + sens + options.length) % options.length;
    options.forEach((o, i) => o.setAttribute("aria-selected", i === selection ? "true" : "false"));
    champ.setAttribute("aria-activedescendant", options[selection].id);
    options[selection].scrollIntoView({ block: "nearest" });
  }

  // ── Liste complète des résultats ──────────────────────────────────
  function afficherResultats() {
    fermerSuggestions();
    const requete = champ.value.trim();
    const semestre = filtreActif("semestre");

    // Semestre sans aucune matière : il n'a pas encore commencé
    if (semestre && !matieres.some((m) => m.semestre === semestre)) {
      afficherSemestreAVenir(semestre);
      return;
    }
    semestrePrecedent = semestre;

    // Sans recherche ni type : on garde la grille des matières, filtrée par semestre
    if (!requete && !filtreActif("type")) {
      zoneResultats.hidden = true;
      grille.hidden = false;
      matieres.forEach((m) => {
        document.getElementById(`matiere-${m.id}`).parentElement.hidden = Boolean(semestre) && m.semestre !== semestre;
      });
      return;
    }

    const trouves = requete ? chercher(requete) : chercher("").filter((e) => e.poids > 1);
    grille.hidden = true;
    zoneResultats.hidden = false;
    zoneResultats.innerHTML = "";

    const compte = document.createElement("p");
    compte.className = "resultats__compte";
    compte.setAttribute("role", "status");
    const pluriel = trouves.length > 1 ? "s" : "";
    compte.textContent = requete
      ? `${trouves.length} résultat${pluriel} pour « ${requete} »`
      : `${trouves.length} page${pluriel}`;
    zoneResultats.append(compte);

    if (!trouves.length) {
      const vide = document.createElement("div");
      vide.className = "resultats__vide";
      vide.innerHTML = `<p>Rien trouvé. Vérifie l'orthographe, essaie un mot plus court ou retire un filtre.</p>`;
      const bouton = document.createElement("button");
      bouton.type = "button";
      bouton.className = "lien-bouton";
      bouton.textContent = "Tout réinitialiser";
      bouton.addEventListener("click", reinitialiser);
      vide.append(bouton);
      zoneResultats.append(vide);
      return;
    }

    const liste = document.createElement("ol");
    trouves.forEach((e) => {
      const li = document.createElement("li");
      li.innerHTML = `<a class="resultat" href="${encodeURI(e.lien)}"><span><span class="resultat__titre">${requete ? surligner(e.titre, requete) : echapper(e.titre)}</span><span class="resultat__lieu">${echapper(e.lieu)}</span></span><span class="type">${e.type}</span></a>`;
      liste.append(li);
    });
    zoneResultats.append(liste);
  }

  // Mémorise le dernier semestre valide pour pouvoir y revenir
  let semestrePrecedent = "";

  function afficherSemestreAVenir(semestre) {
    grille.hidden = true;
    zoneResultats.hidden = false;
    zoneResultats.innerHTML = "";

    const vide = document.createElement("div");
    vide.className = "resultats__vide";
    vide.setAttribute("role", "status");
    const texte = document.createElement("p");
    texte.textContent = `Le ${semestre} n'a pas encore commencé. On ajoutera les cours dès qu'ils seront prêts.`;

    const bouton = document.createElement("button");
    bouton.type = "button";
    bouton.className = "lien-bouton";
    bouton.textContent = "Revenir en arrière";
    bouton.addEventListener("click", () => {
      document.querySelector(`input[name="semestre"][value="${semestrePrecedent}"]`).checked = true;
      afficherResultats();
      document.querySelector('input[name="semestre"]:checked').focus();
    });

    vide.append(texte, bouton);
    zoneResultats.append(vide);
  }

  function reinitialiser() {
    champ.value = "";
    document.querySelectorAll('.filtres input[value=""]').forEach((i) => (i.checked = true));
    boutonEffacer.hidden = true;
    afficherResultats();
    champ.focus();
  }

  // ── Événements ────────────────────────────────────────────────────
  champ.addEventListener("input", afficherSuggestions);
  champ.addEventListener("focus", () => champ.value.trim() && afficherSuggestions());

  champ.addEventListener("keydown", (ev) => {
    if (ev.key === "ArrowDown") {
      ev.preventDefault();
      if (listeSuggestions.hidden) afficherSuggestions();
      deplacerSelection(1);
    } else if (ev.key === "ArrowUp") {
      ev.preventDefault();
      deplacerSelection(-1);
    } else if (ev.key === "Escape") {
      if (!listeSuggestions.hidden) fermerSuggestions();
      else reinitialiser();
    } else if (ev.key === "Enter" && selection >= 0) {
      ev.preventDefault();
      choisirSuggestion(listeSuggestions.querySelectorAll('[role="option"]')[selection]);
    }
  });

  listeSuggestions.addEventListener("mousedown", (ev) => {
    ev.preventDefault();
    choisirSuggestion(ev.target.closest('[role="option"]'));
  });

  formulaire.addEventListener("submit", (ev) => {
    ev.preventDefault();
    afficherResultats();
  });

  boutonEffacer.addEventListener("click", reinitialiser);

  document.querySelectorAll(".filtres input").forEach((input) =>
    input.addEventListener("change", afficherResultats)
  );

  document.addEventListener("click", (ev) => {
    if (!formulaire.contains(ev.target)) fermerSuggestions();
  });

  // « / » pour aller directement dans la recherche
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "/" && document.activeElement !== champ && !/input|textarea/i.test(document.activeElement.tagName)) {
      ev.preventDefault();
      champ.focus();
    }
  });
});
