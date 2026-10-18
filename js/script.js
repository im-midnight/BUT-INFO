const matieres = [
  // Pour ajouter une matière : ajouter un objet ici, sans toucher au HTML ni au CSS.
  {
    id: "mathematiques",
    titre: "Mathématiques",
    description: "Probabilités, lois usuelles et chaînes de Markov.",
    lien: "math/indexMath.html",
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
