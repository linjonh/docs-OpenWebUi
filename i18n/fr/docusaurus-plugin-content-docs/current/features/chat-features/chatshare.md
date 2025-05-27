---
sidebar_position: 4
title: "🗨️ Partage de Chat"
---

### Activer le partage communautaire

Pour activer le partage communautaire, suivez ces étapes :

1. Accédez à la page **Panneau d'administration** en tant qu'**Administrateur**.
2. Cliquez sur l'onglet **Paramètres**.
3. Activez l'option **Activer le partage communautaire** dans l'onglet **Paramètres généraux**.

:::note
**Note :** Seuls les administrateurs peuvent activer l'option **Activer le partage communautaire**. Si cette option est désactivée, les utilisateurs et les administrateurs ne verront pas l'option **Partager avec la communauté Open WebUI** pour partager leurs chats. Le partage communautaire doit être activé par un administrateur pour que les utilisateurs puissent partager des chats avec la communauté Open WebUI.
:::

Cela activera le partage communautaire pour tous les utilisateurs de votre instance Open WebUI.

### Partager des chats

Pour partager un chat :

1. Sélectionnez la conversation de chat que vous souhaitez partager.
2. Cliquez sur les 3 points qui apparaissent lorsque le curseur de la souris survole le chat souhaité.
3. Ensuite, cliquez sur l'option **Partager**.
4. Sélectionnez soit **Partager avec la communauté Open WebUI** (si l'option **Activer le partage communautaire** est activée par un **Administrateur**), soit **Copier le lien**.

#### Partager avec la communauté Open WebUI

Lorsque vous sélectionnez `Partager avec la communauté Open WebUI` :

* Un nouvel onglet s'ouvrira, vous permettant de télécharger votre chat en tant qu'instantané sur le site Web de la communauté Open WebUI (https://openwebui.com/chats/upload).
* Vous pouvez contrôler qui peut consulter votre chat téléchargé en choisissant parmi les paramètres d'accès suivants :
  * **Privé** : Seul vous pouvez accéder à ce chat.
  * **Public** : Tout le monde sur Internet peut voir les messages affichés dans l'instantané du chat.
  * **Public, historique complet** : Tout le monde sur Internet peut voir l'intégralité de l'historique de régénération de votre chat.

:::note
Note : Vous pouvez modifier le niveau de permission de vos chats partagés sur la plateforme communautaire à tout moment depuis votre compte openwebui.com.

**Actuellement, les chats partagés sur le site communautaire ne peuvent pas être trouvés via la recherche. Cependant, des mises à jour sont prévues pour permettre aux chats publics d'être découverts par le public si leur permission est définie sur `Public` ou `Public, historique complet`.**
:::

Exemple d'un chat partagé sur le site Web de la plateforme communautaire : https://openwebui.com/c/iamg30/5e3c569f-905e-4d68-a96d-8a99cc65c90f

#### Copier un lien de partage

Lorsque vous sélectionnez `Copier le lien`, un lien de partage unique est généré et peut être partagé avec d'autres.

**Considérations importantes :**

* Le chat partagé inclura uniquement les messages existants au moment de la création du lien. Les nouveaux messages envoyés dans le chat après la génération du lien ne seront pas inclus, sauf si le lien est supprimé et mis à jour avec un nouveau lien.
* Le lien de partage généré agit comme un instantané statique du chat au moment de sa création.
* Pour consulter le chat partagé, les utilisateurs doivent :
  1. Avoir un compte sur l'instance Open WebUI où le lien a été généré.
  2. Être connecté à leur compte sur cette instance.
* Si un utilisateur tente d'accéder au lien partagé sans être connecté, il sera redirigé vers la page de connexion pour se connecter avant de pouvoir consulter le chat partagé.

### Consulter des chats partagés

Pour consulter un chat partagé :

1. Assurez-vous d'être connecté à un compte sur l'instance Open WebUI où le chat a été partagé.
2. Cliquez sur le lien partagé qui vous a été fourni.
3. Le chat s'affichera en format lecture seule.
4. Si l'administrateur de l'instance Open WebUI à partir de laquelle le lien partagé a été généré a configuré la synthèse vocale, il peut y avoir un bouton audio pour que les messages soient lus à haute voix pour vous (situationnel).

### Mettre à jour des chats partagés

Pour mettre à jour un chat partagé :

1. Sélectionnez la conversation de chat que vous souhaitez partager.
2. Cliquez sur les 3 points qui apparaissent lorsque le curseur de la souris survole le chat souhaité.
3. Cliquez sur l'option **Partager**.
4. La fenêtre modale **Partager le chat** devrait apparaître différemment si vous avez déjà partagé un chat auparavant.

La fenêtre modale **Partager le chat** inclut les options suivantes :

* **avant** : Ouvre un nouvel onglet pour consulter le chat partagé précédemment via le lien de partage.
* **supprimer ce lien** : Supprime le lien de partage du chat et affiche la fenêtre modale initiale de partage.
* **Partager avec la communauté Open WebUI** : Ouvre un nouvel onglet pour https://openwebui.com/chats/upload avec le chat prêt à être partagé en tant qu'instantané.
* **Mettre à jour et copier le lien** : Met à jour l'instantané du chat du lien de partage précédemment partagé et le copie dans le presse-papiers de votre appareil.

### Supprimer des chats partagés

Pour supprimer un lien de chat partagé :

1. Sélectionnez la conversation de chat pour laquelle vous souhaitez supprimer le lien partagé.
2. Cliquez sur les 3 points qui apparaissent lorsque le curseur de la souris survole le chat souhaité.
3. Cliquez sur l'option **Partager**.
4. La fenêtre modale **Partager le chat** devrait apparaître différemment si vous avez déjà partagé un chat auparavant.
5. Cliquez sur **supprimer ce lien**.

Une fois supprimé, le lien partagé ne sera plus valide et les utilisateurs ne pourront pas consulter le chat partagé.

:::note
**Note :** Les chats partagés sur la plateforme communautaire ne peuvent pas être supprimés. Pour modifier le niveau d'accès d'un chat partagé sur la plateforme communautaire :
:::

1. Connectez-vous à votre compte Open WebUI sur openwebui.com.
2. Cliquez sur votre nom d'utilisateur en haut à droite du site.
3. Cliquez sur **Discussions**.
4. Cliquez sur la discussion pour laquelle vous souhaitez modifier les autorisations d'accès.
5. Faites défiler jusqu'en bas de la discussion et mettez à jour son niveau d'autorisation.
6. Cliquez sur le bouton **Mettre à jour la discussion**.
