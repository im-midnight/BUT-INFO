const matieres = [
  // Pour ajouter une matière : ajouter un objet ici, sans toucher au HTML ni au CSS.
  {
    id: "mathematiques",
    titre: "Mathématiques",
    description: "Probabilités, lois usuelles et chaînes de Markov.",
    lien: "mathematiques.html",
    icone: "∑",
  },
];

function creerCarte({ id, titre, description, lien, icone }) {
  const item = document.createElement("li");
  const carte = document.createElement("a");
  carte.className = "carte";
  carte.id = `matiere-${id}`;
  carte.href = lien;

  const pictogramme = document.createElement("span");
  pictogramme.className = "carte__icone";
  pictogramme.setAttribute("aria-hidden", "true");
  pictogramme.textContent = icone;

  const nom = document.createElement("h2");
  nom.className = "carte__titre";
  nom.textContent = titre;

  const resume = document.createElement("p");
  resume.className = "carte__texte";
  resume.textContent = description;

  carte.append(pictogramme, nom, resume);
  item.append(carte);
  return item;
}

document.getElementById("liste-matieres").append(...matieres.map(creerCarte));
