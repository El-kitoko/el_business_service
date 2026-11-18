# M Business — Babouches pour elle

Boutique statique responsive inspirée du parcours de la vidéo de référence : sélection animée, fiche produit, prix, pointure et commande WhatsApp.

## Mise à jour du catalogue

Modifier `assets/catalog.js`. Chaque modèle possède `name`, `detail`, `size`, `image` et `price`. Remplacer `price: null` par le prix réel (nombre en dollars ou texte formaté). Les photos sont dans `assets/products/`.

## Commandes et paiements

Le bouton WhatsApp ouvre une conversation avec le numéro principal `+243 817 100 414` et préremplit le nom du modèle, sa pointure et le lien public de sa photo. Les navigateurs ne permettent pas à un lien `wa.me` d'attacher directement une image au message. Sur mobile compatible, le bouton « Partager la photo avec le message » ouvre le menu de partage avec l'image en pièce jointe ; l'acheteur choisit WhatsApp puis le contact M Business.

La page affiche également les coordonnées M-Pesa et Airtel Money fournies.

Le site ne collecte pas de données de paiement et ne stocke pas de données client. Aucun secret Supabase n'est nécessaire pour cette version.
