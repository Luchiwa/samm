# samm

SAMM est une progressive web app visant à aider l'utilisateur à réduire ses addictions.

Description de l'application :

Les catégories d'addictions traitées dans un premier temps sont l'alcool et le tabac, la version actuelle permet simplement de créer les comptes utilisateurs, de suivre leurs addictions en leur initialisant un compteur.
L'utilisateur peut saisir ses "rechutes" par catégorie en saisissant un prix et ainsi réinitialiser le compteur de la catégorie d'addiction concernée.
L'utilisateur dispose d'un score de santé (visant à implémenter la gamification par la suite).

Les prochaines features seront les suivantes :
- Pouvoir saisir les "rechutes" à posteriori.
- Implémenter un système de succés basé sur la non consommation des produits concernés et sur des conseils de santé. Par exemple : "Félicitations, 3 jours sans fumer, le goût et l'odorat retrouvés", ceux-ci donneront des points au score de l'utilisateur, les succés peuvent être annulé en cas de rechute.
- Implémenter un système d'échec basé sur l'argent dépensé depuis l'utilisation de l'application, par exemple : "200 € perdu dans le tabac, vous auriez pu acheté ceci :" et afficher une photo d'un produit d'une valeur équivalente à 200€ en sponsorisant l'entreprise qui le commercialise. Les échecs n'influenceront pas le score de l'utilisateur. Cette feature permettra de monétiser l'application.

Les features éloignées :
- Elaborer des statistiques de consommation de l'utilisateur, et lui donner des "quêtes" pertinentes qui lui attribueront des points à son score personnel, par exemple, "Votre moyenne de consommation de cigarettes est d'environs une tout les 5 heures, votre quête est de ne pas fumer pendant 8H".
- Création d'un chat interne à l'application, permettant de créer des communautés d'utilisateur par addiction traitée.
- Traiter d'autres catégories d'addiction, par exemple différents types de drogues, jeux d'argent, sexe etc...
- Mise en place de relatios avec des addictologues 

Documentation technique : 

Le projet SAMM comporte deux partis :
- un projet API développé en PHP dans le répertoire "samm_api".
- un projet Web Front (PWA) développé totalement en javascript avec le framework jQuery dans le répertoire "samm_web".

Installation sur un serveur local :
- Un dossier tools est à disposition pour importer la structure de la base de données sur votre serveur local.
- Mettre à jour les identifiants de base de données dans le projet API dans le fichier "config/database.php"
- Mettre à jour le chemin des API dans le projet front, dans le fichier "js/samm.js"






