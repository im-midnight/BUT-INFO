# MENU BUT INFO

Site de révision des cours de BUT Informatique. L'accueil liste les matières, chaque matière a ses pages de cours, de TD et de TP.

HTML, CSS et JavaScript natifs. Pas de framework, pas de bibliothèque. Les seuls scripts externes sont MathJax (formules) et Umami (stats).

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

Ouvrir `index.html` dans un navigateur. Les liens sont relatifs, aucun serveur n'est nécessaire.

Avec un serveur local, si besoin :

```bash
python -m http.server 8000
```

Puis aller sur `http://localhost:8000`.

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

La carte apparaît toute seule dans la grille. L'ordre du tableau est l'ordre d'affichage.

Les semestres du filtre sont dans le tableau `semestres` du même fichier. Tant qu'aucune matière n'a ce semestre, le filtre affiche « pas encore commencé » avec un bouton pour revenir en arrière. Pour ouvrir le S4, il suffit de mettre `semestre: "S4"` sur ses matières.

## Ajouter une page de cours

1. Créer la page dans `pages/`. Le plus simple est de copier une page qui existe déjà. Dans le `<head>`, il faut ces quatre lignes (avec le bon nombre de `../`) :

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

La barre du haut, le fil d'Ariane, les liens précédent / suivant et le pied de page sont ajoutés tout seuls par `js/site.js`. Pas besoin de les écrire dans la page.

Le style commun gère déjà les classes qu'on utilise partout : `loi-card`, `terme`, `def-bloc`, `#tooltip`, `menu-card`, `btn-lien`, les tableaux et le code. Si une page a besoin d'un style à elle, on le met dans un petit `<style>` après les liens, avec les variables de couleur (jamais de couleur en dur, sinon elle ne suit pas le thème).

## Encadrés

```html
<div class="a-retenir"><p>Le plus important de la partie.</p></div>
<div class="astuce"><p>Une remarque ou un exemple.</p></div>
<div class="piege"><p>Une erreur classique.</p></div>
```

`a-retenir` affiche tout seul le titre « À retenir ».

## Code

Les blocs `<pre><code>` reçoivent automatiquement un bouton Copier et la coloration syntaxique (Java, Kotlin, Python, HTML/JSP). Le langage est deviné. Pour le forcer : `<pre data-lang="python">`, ou `data-lang="aucun"` pour ne rien colorer.

Attention, dans le code il faut écrire `&lt;` et `&gt;` à la place de `<` et `>` (par exemple `List&lt;Etudiant&gt;`), sinon le navigateur les prend pour des balises.

## Thèmes

Toutes les couleurs sont dans `css/themes.css`. Le thème choisi est posé sur `<html>` :

| Attribut | Valeurs |
|---|---|
| `data-theme` | `bleu` (par défaut), `emeraude`, `amethyste`, `orange`, `framboise`, `turquoise`, `ble`, `lagon`, `dragee`, `pastel`, `sauge`, `ardoise` |
| `data-mode` | `clair` ou `sombre` |
| `data-hc` | `on` pour le high contrast |
| `data-syntaxe` | `off` pour couper la coloration du code |

Le choix est gardé dans le `localStorage` du navigateur.

Pour ajouter un thème : copier un bloc `[data-theme="..."]` dans `css/themes.css`, changer les couleurs, puis l'ajouter dans la liste `THEMES` de `js/theme.js`. Le mode sombre est calculé tout seul à partir de `--teinte` et `--barre`.

## Responsive

Tout doit rester lisible du téléphone (320 px) au grand écran (1920 px), sans défilement horizontal. Sur téléphone, le fil d'Ariane est remplacé par un simple lien retour. Les grilles utilisent `auto-fill` / `auto-fit`, pas de largeur fixe en pixels.

## Règles du projet

- Les matières et les pages viennent des tableaux de `js/script.js`, jamais d'une carte écrite en dur dans l'accueil.
- Aucune couleur en dehors de `css/themes.css` : on utilise les variables (`var(--primaire)`, `var(--texte)`...).
- Aucune dépendance externe en plus de MathJax et Umami.
- Vérifier chaque nouvelle page sur téléphone et en mode sombre.
