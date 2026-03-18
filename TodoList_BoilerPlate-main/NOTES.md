# Notes de réalisation - Test technique Alternance Metasense

## Temps de travail

* Comme je suis habitué à structurer des projets Full-Stack, j’ai pu avancer rapidement sur l’architecture tout en me concentrant sur la qualité de l’interface et du code.

## Choix techniques

### Architecture Front-End

* L’approche adoptée est du **"Vanilla JS"** pur, sans framework, afin de correspondre à une approche de boilerplate léger.
* La logique a été divisée en fonctions claires (`fetchTasks`, `addTask`, `toggleTask`, `deleteTask`) afin de faciliter la lisibilité et l’évolutivité.
* **Filtrage et tri** : Ils sont gérés **côté client**. Pourquoi ? Étant donné que le chargement initial récupère toutes les tâches (API `/tasks`), l’expérience utilisateur (UX) est beaucoup plus fluide en traitant les filtres dynamiquement en mémoire (`getProcessedTasks()`). Cela évite des appels réseau inutiles à chaque clic sur l’interface et procure une sensation de réactivité immédiate.
* **Sécurité** : Pour prévenir les attaques XSS potentielles liées aux entrées utilisateur, une fonction `escapeHTML` est utilisée avant l’injection dans le DOM via `innerHTML`.

### UI / UX

* Le design est basé sur une interface moderne : "Glassmorphism" subtil, ombres douces et bordures arrondies (border-radius cohérent).

* **Google Fonts (Inter)** et **FontAwesome** ont été intégrés pour une typographie propre et des icônes explicites.

* **Animations CSS** :

  * `keyframes slideIn` pour une apparition naturelle des éléments de liste.
  * Transitions fluides (`all 0.3s ease`) sur les états de survol (boutons, inputs).

* **Mode sombre (Dark Mode)** : Implémenté via des variables CSS (Custom Properties) modifiées par l’attribut `data-theme` sur la balise `<html>`. Le choix est persisté dans `localStorage` pour le confort de l’utilisateur.

### Back-End (Express)

* Ajout des routes manquantes (`PUT` et `DELETE`) en respectant les standards REST.

* **Gestion des erreurs et validation** :

  * Vérification stricte des entrées afin d’empêcher l’ajout de tâches avec un nom vide. Code `400 Bad Request` renvoyé avec un message d’erreur.
  * Vérification de l’existence des IDs (`404 Not Found`) avant modification ou suppression.

* **Tri des données** : Le tri par date de création exploite le fait astucieux que `Date.now()` a été utilisé comme générateur d’ID dans le boilerplate. L’ID représente donc nativement le timestamp de création.

## Conclusion

* En conclusion, le projet comporte moins d’ajouts optionnels très complexes en volume (pas de base de données externe ni de Drag & Drop), mais se concentre à 100 % sur un code résilient et une base solide.
