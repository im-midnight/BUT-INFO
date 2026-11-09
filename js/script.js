const matieres = [
  // Pour ajouter une matière : ajouter un objet ici, sans toucher au HTML ni au CSS.
  {
    id: "dev-web",
    titre: "R301 - Développement web",
    description: "Syntaxe Java, Servlets...",
    lien: "pages/web/indexWeb.html",
  },

  {
    id: "dev-web",
    titre: "R302 - Algos corrects et efficaces (Dev. efficace)",
    description: "Cours",
    lien: "pages/algos_corrects_efficaces/cours.html",
  },

  {
    id: "mathematiques",
    titre: "R308 - Probabilités",
    description: "Probabilités, lois usuelles.",
    lien: "pages/math/proba/indexProba.html",
  },
  {
    id: "crypto",
    titre: "R309 -Cryptographie et sécurité",
    description: "Cryptographie et sécurité",
    lien: "pages/math/crypto/indexCrypto.html",
  },

];

function creerCarte({ id, titre, description, lien }) {
  const item = document.createElement("li");
  const carte = document.createElement("a");
  carte.className = "carte";
  carte.id = `matiere-${id}`;
  carte.href = lien;

  const nom = document.createElement("h2");
  nom.className = "carte__titre";
  nom.textContent = titre;

  const resume = document.createElement("p");
  resume.className = "carte__texte";
  resume.textContent = description;

  carte.append(nom, resume);
  item.append(carte);
  return item;
}

document.getElementById("liste-matieres").append(...matieres.map(creerCarte));
