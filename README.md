# MENU BUT INFO

Page d'accueil qui liste les matières du BUT Informatique. Chaque matière est une carte qui mène vers sa propre page.

HTML, CSS et JavaScript natifs. Pas de framework, pas de bibliothèque, pas de CDN.

## Structure

```
menu-but-info/
├── index.html           le sommaire
├── css/
│   └── style.css        palette, grille, cartes
├── js/
│   └── script.js        tableau des matières + génération des cartes
└── pages/               une page HTML par matière
    └── mathematiques.html
```

## Lancer le projet

Ouvrir `index.html` dans un navigateur. Les liens sont relatifs, aucun serveur n'est nécessaire.

Avec un serveur local, si besoin :

```bash
python -m http.server 8000
```

Puis aller sur `http://localhost:8000`.

## Ajouter une matière

1. Créer la page dans `pages/` (par exemple `pages/architecture.html`).
2. Ajouter un objet dans le tableau `matieres` de `js/script.js` :

```js
{
  id: "architecture",
  titre: "Architecture",
  description: "Processeur, mémoire, assembleur et systèmes.",
  lien: "pages/architecture.html",
  icone: "▣",
},
```

Le HTML et le CSS ne changent pas : la carte apparaît toute seule dans la grille.

| Champ | Rôle |
|---|---|
| `id` | identifiant unique, en minuscules, sans accent ni espace |
| `titre` | nom affiché sur la carte |
| `description` | une phrase courte |
| `lien` | chemin relatif vers la page de la matière |
| `icone` | un caractère ou symbole court |

L'ordre du tableau est l'ordre d'affichage.

## Thème

Deux couleurs seulement, déclarées en haut de `css/style.css` :

| Variable | Clair | Sombre |
|---|---|---|
| `--fond` | `#fffffe` | `#2b2c34` |
| `--texte` | `#2b2c34` | `#fffffe` |

Les bordures, le survol et le texte secondaire sont dérivés de ces deux variables avec `color-mix`. Le thème sombre suit le réglage de l'appareil. Pour le désactiver, supprimer le bloc `@media (prefers-color-scheme: dark)`.

## Responsive

La grille est en `repeat(auto-fill, minmax(min(100%, 18rem), 1fr))` : le nombre de colonnes s'adapte à la largeur. Pour des cartes plus larges ou plus étroites, changer le `18rem`.

Aucune largeur fixe en pixels et aucun défilement horizontal, de 320 px à 1920 px.

## Règles du projet

- Toutes les matières viennent du tableau `matieres`, jamais d'une carte écrite en dur dans le HTML.
- Aucune couleur en dehors de `--fond` et `--texte`.
- Aucune dépendance externe.
