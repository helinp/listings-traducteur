
# Convertisseur de Listings de la Communauté Française (Enseignement)
[![Démo en ligne](https://img.shields.io/badge/Démo%20en%20ligne-helinp.github.io%2Flistings--traducteur-blue)](https://helinp.github.io/listings-traducteur/)

**Proof of Concept** — application web pour rendre humainement lisible les listings PDF de la Communauté française basé sur la [circulaire 5776](http://www.enseignement.be/index.php?page=26823&do_id=6007).

## Démo

➡️ [Accéder à l'outil en ligne](https://helinp.github.io/listings-traducteur/)

## Fonctionnalités

- Lecture locale des listings PDF (aucune donnée envoyée).
- Décodage des colonnes et codes du listing.
- Calculs pour WESH-DIMONA.

## Utilisation

1. Ouvrir la [démo en ligne](https://helinp.github.io/listings-traducteur/).
2. Importer un fichier PDF conforme à la circulaire 5776.
3. Lire les résultats extraits directement.

> ⚠️ **Note importante** :  
> Le projet utilise des modules JavaScript (`import`).  
> **L’exécution locale (`index.html`) sans serveur ne fonctionne pas** sur la plupart des navigateurs modernes à cause des restrictions CORS sur les modules ES.  
> **Utilisez la démo en ligne** ou servez le projet via un serveur local (ex : `npx serve`, `python -m http.server`, etc).

## Maintenance

- Seuls les sauts d’index sont actuellement mis à jour.

## TODO

- Nettoyage du code et refactorisation.
- Amélioration de l'interface utilisateur.
- Implémentation de l'accès aux valeurs originales.
- Développement et intégration de tests.
- Renforcement du contrôle des données entrantes.
- Intégration de DataTables pour améliorer la visualisation des données.
- Ajout de la gestion de la colonne "Code Social (CS)".
- Compilation Tailwind CSS.

## Confidentialité

Traitement 100% local, aucune donnée transmise.

## Disclaimer

Ce projet est développé à des fins éducatives et pour faciliter le travail des directions. 

L'utilisateur final est seul responsable de la vérification de l'exactitude des données traduites et de leur utilisation conforme aux directives et réglementations en vigueur.

## Licence

Ce projet est mis à disposition sous les termes de la Licence Publique Générale GNU v3 (GPLv3). Pour plus d'informations sur cette licence, visitez le site officiel : [GPLv3 License](https://www.gnu.org/licenses/gpl-3.0.html).

