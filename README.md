# TicTacToe

TicTacToe jouable contre un adversaire informatique, avec choix du niveau de difficulté et du pion.

---

## Prérequis

- [Node.js](https://nodejs.org/) version 18 ou supérieure
- npm (inclus avec Node.js)

---

## Installation et lancement

```bash
# Cloner le projet
git clone https://github.com/dev-x7k2/tictactoe.git
cd tictactoe

# Installer les dépendances
npm install

# Lancer l'application
npm run dev
```

L'application est accessible sur `http://localhost:5173`.

---

## Comment jouer

1. **Choisir la difficulté** - Facile (coups aléatoires) ou Difficile (adversaire intelligent)
2. **Choisir son pion** - X ou O
3. **Jouer** - Cliquer sur une case pour poser son pion
4. **Rejouer** - Cliquer sur "Rejouer" en fin de partie, sans recharger la page

---

## Configuration

Toute la configuration du jeu se trouve dans `src/config.ts` :

```typescript
export const GRID_SIZE = 3; // Taille de la grille (ex: 4 pour une grille 4x4)
export const WIN_LENGTH = 3; // Nombre de pions alignés pour gagner
```

Pour passer en grille 4x4 avec 4 alignements requis, modifier uniquement ces deux valeurs :

```typescript
export const GRID_SIZE = 4;
export const WIN_LENGTH = 4;
```

Aucune autre modification n'est nécessaire.

---

## Stack technique

| Technologie | Justification |
|-------------|---------------|
| React | Séparation naturelle state/rendu, composants réutilisables |
| TypeScript | Lisibilité et robustesse du code, typage explicite |
| Vite | Démarrage rapide, configuration minimale |

---

## Architecture

```
src/
├── core/
│   ├── board.ts        - Création du plateau, validation des coups
│   ├── rules.ts        - Détection victoire/match nul (N x N configurable)
│   └── opponent.ts     - Logique adversaire (aléatoire et heuristique)
├── components/
│   ├── Board.tsx
│   ├── Cell.tsx
│   ├── DifficultyPicker.tsx
│   ├── PiecePicker.tsx
│   └── GameStatus.tsx
├── hooks/
│   └── useGame.ts      - State management avec useReducer
├── config.ts           - Paramètres configurables (GRID_SIZE, WIN_LENGTH)
└── App.tsx
```

Le state du jeu est centralisé dans `useGame.ts` via `useReducer`. Ce pattern suit la même logique que Redux sans le boilerplate, avec des transitions d'état explicites et atomiques.