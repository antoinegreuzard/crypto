# Cryptographie Simple

Ce projet propose une interface web pour chiffrer et déchiffrer des textes en utilisant divers algorithmes de cryptographie. Voici une description complète de ce projet, ainsi que les instructions pour le configurer et l'utiliser.

## Fonctionnalités

- **Chiffrement et Déchiffrement** : Possibilité de chiffrer et déchiffrer du texte en utilisant différents algorithmes.
- **Algorithmes disponibles** :
  - Chiffrement par substitution
  - Chiffrement César
  - Chiffrement de Vigenère
  - Chiffrement Rivest Cipher 4 (RC4)
  - Chiffrement avec XOR
  - Hashage avec SHA-256

## Structure du projet

- `index.html` : Fichier HTML principal contenant l'interface utilisateur.
- `src/main.ts` : Fichier TypeScript contenant la logique de chiffrement et de déchiffrement.
- `src/cipher/modern.ts` : Fichier contenant les implémentations des algorithmes modernes (RC4, XOR, SHA-256).
- `src/cipher/poly.ts` : Fichier contenant l'implémentation du chiffre de Vigenère.
- `src/cipher/subs.ts` : Fichier contenant les implémentations des chiffres par substitution et César.
- `styles.scss` : Fichier de style SCSS pour la mise en page.

## Installation

1. **Cloner le dépôt** :
    ```sh
    git clone [https://github.com/antoinegreuzard/crypto.git](https://github.com/antoinegreuzard/crypto.git)
    cd cryptographie-simple
    ```

2. **Installer les dépendances** :
    ```sh
    pnpm install
    ```

3. **Lancer le projet en mode développement** :
    ```sh
    pnpm run dev
    ```

4. **Construire le projet pour la production** :
    ```sh
    pnpm run build
    ```

5. **Prévisualiser la version construite** :
    ```sh
    pnpm run preview
    ```

## Utilisation

1. Ouvrez votre navigateur web et accédez à l'interface via `http://localhost:3000` après avoir lancé le projet en mode développement.
2. Saisissez le texte que vous souhaitez chiffrer ou déchiffrer dans le champ de texte.
3. Sélectionnez l'algorithme de chiffrement/déchiffrement dans le menu déroulant.
4. Selon l'algorithme sélectionné, entrez les informations supplémentaires requises (décalage pour César, clé de chiffrement pour Vigenère, RC4, XOR).
5. Cliquez sur "Chiffrer" pour chiffrer le texte ou "Déchiffrer" pour déchiffrer le texte.
6. Le résultat s'affichera dans la section "Résultat".

## Dépendances

- **TypeScript** : Un sur-ensemble de JavaScript qui ajoute des types statiques.
- **Vite** : Un outil de construction rapide pour les projets web modernes.
- **ESLint** : Un outil pour identifier et signaler les motifs trouvés dans ECMAScript/JavaScript.
- **Prettier** : Un formatteur de code.
- **TailwindCSS** : Un framework CSS utilitaire pour une conception rapide et réactive.
- **Sass** : Un langage de script préprocesseur qui est interprété ou compilé en CSS.

## Scripts NPM

- `dev` : Lance le serveur de développement Vite.
- `build` : Compile le TypeScript et construit le projet pour la production.
- `preview` : Lance un serveur de prévisualisation pour la version construite.
- `lint` : Exécute ESLint pour vérifier le code.
- `lint:fix` : Exécute ESLint avec l'option de correction automatique.
- `prettier:check` : Vérifie si le code est formaté avec Prettier.
- `prettier:write` : Formatte le code avec Prettier.

## Contribuer

Les contributions sont les bienvenues ! Si vous avez des idées d'améliorations ou trouvez des bugs, n'hésitez pas à ouvrir une issue ou une pull request.

---

Merci d'avoir utilisé ce projet de cryptographie simple. Si vous avez des questions ou des commentaires, veuillez les soumettre dans la section Issues du dépôt GitHub.
