# MENU BUT INFO

Site de révision des cours de BUT Informatique. L'accueil liste les matières, et chaque matière a ses pages de cours, de TD et de TP.

Le site est en HTML, CSS et JavaScript natifs, sans framework ni bibliothèque. Les deux seuls scripts externes sont MathJax pour les formules et Umami pour les stats.

## Structure

```
BUT-INFO/
├── index.html           l'accueil : recherche, filtres, liste des matières
├── 404.html             page affichée quand une adresse n'existe pas
├── robots.txt           règles pour les robots de Google
├── sitemap.xml          liste des pages pour Google (sans les matières vides)
├── google…html          fichier de vérification de Search Console (ne pas toucher)
├── vercel.json          redirections des anciennes adresses
├── assets/
│   ├── css/
│   │   ├── themes.css   toutes les couleurs : 12 thèmes, mode sombre, high contrast
│   │   ├── style.css    la mise en forme commune à toutes les pages
│   │   └── politique.css  pages politique et mentions légales
│   ├── js/
│   │   ├── script.js    les données (matières + pages) et l'accueil
│   │   ├── site.js      thème, barre du haut, précédent/suivant, code
│   │   └── theme.js     la page Thème
│   ├── img/             icônes du site (favicon…) et image de partage
│   └── site.webmanifest nom et icônes du site pour les téléphones
└── pages/
    ├── site/            Thème, politique de confidentialité, mentions légales
    └── …                une page HTML par cours, TD ou TP, rangée par matière
```

Les fichiers restés à la racine doivent y être : Google et les hébergeurs vont chercher `robots.txt`, `sitemap.xml`, `404.html` et le fichier de vérification à cet endroit précis.

## Lancer le projet

Ouvrir `index.html` dans un navigateur suffit, les liens sont relatifs.

Si vous préférez passer par un serveur local :

```bash
python -m http.server 8000
```

puis aller sur `http://localhost:8000`.

## Ajouter une matière

Ajouter un objet dans le tableau `matieres` de `assets/js/script.js` :

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

1. Créer la page dans `pages/`, en partant d'une copie d'une page existante. Le `<head>` doit contenir ces lignes, avec le bon nombre de `../` (le petit script en ligne pose le thème avant l'affichage, `site.js` fait le reste en `defer`) :

```html
<link rel="stylesheet" href="../../assets/css/themes.css">
<link rel="stylesheet" href="../../assets/css/style.css">
<script>
  (function () { var r = { theme: "bleu", mode: "clair", hc: false, syntaxe: true }; try { Object.assign(r, JSON.parse(localStorage.getItem("butinfo-reglages") || "{}")); } catch (e) {} var h = document.documentElement; h.dataset.theme = r.theme; h.dataset.mode = r.mode; h.dataset.syntaxe = r.syntaxe ? "on" : "off"; if (r.hc) h.dataset.hc = "on"; })();
</script>
<script src="../../assets/js/site.js" defer></script>
<script src="../../assets/js/script.js" defer></script>
```

Une page avec des formules ajoute MathJax (copier le bloc d'une page de maths, version `tex-chtml.js`). Une page sans formule ne le charge pas. Les images vont en WebP avec `width`, `height` et `loading="lazy"`.

2. Ajouter la page dans le tableau `pages` de `assets/js/script.js` :

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

On n'écrit pas la barre du haut, le fil d'Ariane, les liens précédent / suivant ni le pied de page dans la page : `assets/js/site.js` les ajoute au chargement.

3. Pour Google, compléter le `<head>` juste après `<title>`, puis ajouter l'adresse de la page dans `sitemap.xml` avec la date du jour :

```html
<title>Les registres (R305) | BUT Info Nantes</title>
<meta name="description" content="Une ou deux phrases qui disent ce qu'on trouve dans la page, 160 caractères au plus.">
<link rel="canonical" href="https://butinfo-iutnantes.vercel.app/pages/architecture/registres.html">
<link rel="icon" href="../../assets/img/favicon.ico" sizes="48x48">
<link rel="icon" href="../../assets/img/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="../../assets/img/apple-touch-icon.png">
<link rel="manifest" href="../../assets/site.webmanifest">
```

Les pages existantes ont aussi des balises `og:` (aperçu quand on partage le lien) et un fil d'Ariane en JSON-LD : on peut les recopier d'une page voisine en changeant le titre, la description et les adresses. Une page sans contenu (matière vide) prend `<meta name="robots" content="noindex">` et ne va pas dans le sitemap ; on retire ces deux choses le jour où le premier cours arrive.

Le style commun gère déjà les classes qu'on utilise partout (`loi-card`, `terme`, `def-bloc`, `#tooltip`, `menu-card`, `btn-lien`, `consigne` pour la phrase d'aide sous le titre), ainsi que les tableaux et le code. Le texte des parties de cours est en serif, comme les formules MathJax ; les titres et l'interface restent en sans-serif. Si une page a besoin d'un style à elle, on le met dans un petit `<style>` après les liens. Les couleurs passent par les variables, sinon elles ne suivent pas le thème.

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

Toutes les couleurs sont dans `assets/css/themes.css`. Le thème choisi est posé sur `<html>` :

| Attribut | Valeurs |
|---|---|
| `data-theme` | `bleu` (par défaut), `emeraude`, `amethyste`, `orange`, `framboise`, `turquoise`, `ble`, `lagon`, `dragee`, `pastel`, `sauge`, `ardoise` |
| `data-mode` | `clair` ou `sombre` |
| `data-hc` | `on` pour le high contrast |
| `data-syntaxe` | `off` pour couper la coloration du code |

Le choix est gardé dans le `localStorage` du navigateur.

Pour ajouter un thème, on copie un bloc `[data-theme="..."]` dans `assets/css/themes.css`, on change les couleurs, puis on l'ajoute dans la liste `THEMES` de `assets/js/theme.js`. Sa version sombre est calculée à partir de `--teinte` et `--barre`.

## Responsive

Le site doit rester lisible du téléphone (320 px) au grand écran (2560 px), sans défilement horizontal. Le contenu des cours garde une largeur de lecture fixe et reste centré. Sur téléphone, le fil d'Ariane devient un simple lien retour. Les grilles utilisent `auto-fill` / `auto-fit` plutôt que des largeurs fixes en pixels.

## Règles du projet

- Les matières et les pages viennent des tableaux de `assets/js/script.js`. La liste écrite dans `index.html` n'est qu'une copie pour Google, que le JavaScript remplace au chargement : quand on ajoute une matière, on y recopie une ligne `<li>` existante en changeant le texte et le lien.
- Aucune couleur en dehors de `assets/css/themes.css` : on utilise les variables (`var(--primaire)`, `var(--texte)`...).
- Aucune dépendance externe en plus de MathJax et Umami.
- Chaque nouvelle page se vérifie sur téléphone et en mode sombre.
