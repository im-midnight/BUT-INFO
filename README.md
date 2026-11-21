# MENU BUT INFO

Site de révision des cours de BUT Informatique. L'accueil liste les matières, et chaque matière a ses pages de cours, de TD et de TP.

Le site est en HTML, CSS et JavaScript natifs, sans framework ni bibliothèque. Les deux seuls scripts externes sont MathJax pour les formules et Umami pour les stats.

## Structure

```
BUT-INFO/
├── index.html           l'accueil : recherche, filtres, grille des matières
├── theme.html           la page Thème (bouton pinceau en haut des pages)
├── css/
│   ├── themes.css       toutes les couleurs : 12 thèmes, mode sombre, high contrast
│   ├── style.css        la mise en forme commune à toutes les pages
│   └── politique.css    pages politique et mentions légales
├── js/
│   ├── script.js        les données (matières + pages) et l'accueil
│   ├── site.js          thème, barre du haut, précédent/suivant, code
│   └── theme.js         la page Thème
└── pages/               une page HTML par cours, TD ou TP
```

## Lancer le projet

Ouvrir `index.html` dans un navigateur suffit, les liens sont relatifs.

Si vous préférez passer par un serveur local :

```bash
python -m http.server 8000
```

puis aller sur `http://localhost:8000`.

## Ajouter une matière

Ajouter un objet dans le tableau `matieres` de `js/script.js` :

```js
{
  id: "architecture",
  titre: "R305 - Architecture",
  description: "Processeur, mémoire, assembleur et systèmes.",
  lien: "pages/architecture/indexArchi.html",
  semestre: "S3",
},
```

La carte s'ajoute à la grille de l'accueil, dans l'ordre du tableau.

Les semestres du filtre sont dans le tableau `semestres` du même fichier. Un semestre qui n'a encore aucune matière affiche « pas encore commencé » avec un bouton pour revenir en arrière. Le jour où le S4 commence, on met `semestre: "S4"` sur ses matières et le message disparaît.

## Ajouter une page de cours

1. Créer la page dans `pages/`, en partant d'une copie d'une page existante. Le `<head>` doit contenir ces quatre lignes, avec le bon nombre de `../` :

```html
<link rel="stylesheet" href="../../css/themes.css">
<link rel="stylesheet" href="../../css/style.css">
<script src="../../js/site.js"></script>
<script src="../../js/script.js" defer></script>
```

2. Ajouter la page dans le tableau `pages` de `js/script.js` :

```js
{
  titre: "Les registres",
  lien: "pages/architecture/registres.html",
  matiere: "architecture",
  type: "Cours",
  sections: ["Rôle d'un registre", "Les registres du x86"],
},
```

| Champ | Rôle |
|---|---|
| `titre` | nom affiché dans la recherche et le fil d'Ariane |
| `lien` | chemin depuis la racine du site |
| `matiere` | l'`id` de la matière |
| `type` | `"Cours"`, `"TD"` ou `"TP"` (sert au filtre) |
| `parent` | facultatif, la page sommaire au-dessus (par exemple la liste des TP) |
| `sommaire` | facultatif, `true` si la page ne fait que lister d'autres pages |
| `sections` | facultatif, les titres des `<h2>` dans l'ordre, pour que la recherche tombe directement sur la bonne partie |

On n'écrit pas la barre du haut, le fil d'Ariane, les liens précédent / suivant ni le pied de page dans la page : `js/site.js` les ajoute au chargement.

Le style commun gère déjà les classes qu'on utilise partout (`loi-card`, `terme`, `def-bloc`, `#tooltip`, `menu-card`, `btn-lien`), ainsi que les tableaux et le code. Si une page a besoin d'un style à elle, on le met dans un petit `<style>` après les liens. Les couleurs passent par les variables, sinon elles ne suivent pas le thème.

## Encadrés

```html
<div class="a-retenir"><p>Le plus important de la partie.</p></div>
<div class="astuce"><p>Une remarque ou un exemple.</p></div>
<div class="piege"><p>Une erreur classique.</p></div>
```

`a-retenir` ajoute lui-même le titre « À retenir ».

## Code

Chaque bloc `<pre><code>` reçoit un bouton Copier et la coloration syntaxique (Java, Kotlin, Python, HTML/JSP). Le langage est deviné à partir du code. On peut le forcer avec `<pre data-lang="python">`, ou couper la couleur avec `data-lang="aucun"`.

Dans le code, il faut écrire `&lt;` et `&gt;` à la place de `<` et `>` (par exemple `List&lt;Etudiant&gt;`). Sinon le navigateur les prend pour des balises et le texte disparaît.

## Thèmes

Toutes les couleurs sont dans `css/themes.css`. Le thème choisi est posé sur `<html>` :

| Attribut | Valeurs |
|---|---|
| `data-theme` | `bleu` (par défaut), `emeraude`, `amethyste`, `orange`, `framboise`, `turquoise`, `ble`, `lagon`, `dragee`, `pastel`, `sauge`, `ardoise` |
| `data-mode` | `clair` ou `sombre` |
| `data-hc` | `on` pour le high contrast |
| `data-syntaxe` | `off` pour couper la coloration du code |

Le choix est gardé dans le `localStorage` du navigateur.

Pour ajouter un thème, on copie un bloc `[data-theme="..."]` dans `css/themes.css`, on change les couleurs, puis on l'ajoute dans la liste `THEMES` de `js/theme.js`. Sa version sombre est calculée à partir de `--teinte` et `--barre`.

## Responsive

Le site doit rester lisible du téléphone (320 px) au grand écran (2560 px), sans défilement horizontal. Le contenu des cours garde une largeur de lecture fixe et reste centré. Sur téléphone, le fil d'Ariane devient un simple lien retour. Les grilles utilisent `auto-fill` / `auto-fit` plutôt que des largeurs fixes en pixels.

## Règles du projet

- Les matières et les pages viennent des tableaux de `js/script.js`, jamais d'une carte écrite en dur dans l'accueil.
- Aucune couleur en dehors de `css/themes.css` : on utilise les variables (`var(--primaire)`, `var(--texte)`...).
- Aucune dépendance externe en plus de MathJax et Umami.
- Chaque nouvelle page se vérifie sur téléphone et en mode sombre.
