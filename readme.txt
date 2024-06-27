=== AC Formations ===
Contributors: Bertrand Delanlssays
Tags: formations, Digiforma, shortcode, API
Requires at least: 5.0
Tested up to: 6.6
Stable tag: 1.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Extension conçue pour intégrer l'API de Digiforma. 
Cette extension permet de remonter automatiquement certaines informations des formations 
depuis Digiforma et de les afficher de manière dynamique sur le site.

== Description ==

L'extension AC Formations permet de se connecter à l'API de Digiforma 
et de récupérer des informations sur les formations pour les afficher sur votre site WordPress. 
Vous pouvez utiliser des shortcodes pour afficher différentes informations sur les formations.

== Installation ==

1. Téléchargez et extrayez l'archive ZIP.
2. Téléversez le dossier `ac-formations` dans le répertoire `/wp-content/plugins/`.
3. Activez l'extension via le menu 'Extensions' dans WordPress.
4. Configurez le token API dans les réglages de l'extension.

== Configuration de l'extension ==

1. Allez dans `Réglages` > `AC Formations`.
2. Entrez votre token API Digiforma dans le champ "Token".
3. Cliquez sur "Enregistrer les modifications".

== Utilisation des Shortcodes ==

Pour utiliser les shortcodes, ajoutez-les simplement dans vos pages 
ou articles WordPress avec l'attribut `id` de la formation souhaitée.

=== Shortcodes Disponibles ===

1. **Informations sur la formation** : `[formation_infos]`
   - Affiche les informations suivantes : date de création, date de mise à jour et version du programme.

2. **Prochaines dates de formation** : `[formation_nextdates]`
   - Affiche les prochaines dates de formation.

3. **Taux de satisfaction** : `[formation_satisfaction]`
   - Affiche le taux de satisfaction des apprenants et le nombre d'avis.

4. **Document PDF** : `[formation_document]`
   - Affiche le lien de téléchargement du document PDF de la formation.


Vous devez placer l'ID Digiforma de la formation dans l'élément contenant. 
Par exemple pour la formation "1248970" :

<div id="formation-1248970">
    [formation_infos]
    [formation_nextdates]
    [formation_satisfaction]
    [formation_document]
</div>

== Changelog ==

= 1.0 =

Version initiale.

== License ==

This plugin is licensed under the GPLv2 or later.