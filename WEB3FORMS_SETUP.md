# 🚀 Configuration Web3Forms - Guide Rapide (5 minutes)

## ✅ Étape 1: S'inscrire sur Web3Forms

1. **Va sur** https://web3forms.com
2. **Clique sur** "Get Started" ou "Create Access Key"
3. **Entre ton email:** `yiching.uhc@gmail.com`
4. **Vérifie ton email** et clique sur le lien de confirmation
5. **Copie ton Access Key** (commence par quelque chose comme `abcd1234-...`)

## ✅ Étape 2: Configurer le projet

1. **Ouvre le fichier** `.env.local` (dans le dossier Halloween)
2. **Remplace** `YOUR_ACCESS_KEY_HERE` par ton vrai Access Key:
   ```
   NEXT_PUBLIC_WEB3FORMS_KEY=ton-access-key-ici
   ```
3. **Sauvegarde** le fichier

## ✅ Étape 3: Redémarrer le serveur

Dans le terminal:
1. **Arrête** le serveur (Ctrl+C)
2. **Relance** avec: `npm run dev`
3. **C'est tout!** 🎉

## 📧 Comment ça marche?

Maintenant, quand quelqu'un soumet le formulaire:
- ✅ Un email est envoyé à **yiching.uhc@gmail.com**
- ✅ Les données sont sauvegardées dans **participations.json**
- ✅ Les infos s'affichent dans le **terminal**

## 🎯 Email que tu recevras:

```
De: Halloween Party App
À: yiching.uhc@gmail.com
Sujet: 🎃 Halloween Party - Inscription de Prénom Nom

🎃 Nouvelle inscription pour la soirée Halloween!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 PARTICIPANT
   Nom: Nom
   Prénom: Prénom

🍽️ PLATS À PRÉPARER (3)
   1. Croquettes fantômes (鬼魂炸丸子)
   2. Doigts de zombie (僵尸手指)
   3. Cupcakes fantômes (幽灵纸杯蛋糕)

📅 Date d'inscription: 20/10/2025 15:30:25

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## 💰 C'est gratuit?

Oui! Web3Forms offre:
- ✅ **250 emails/mois gratuits**
- ✅ Pas de carte de crédit requise
- ✅ Configuration en 5 minutes
- ✅ Emails instantanés

## ⚠️ Si tu ne configures pas Web3Forms

Pas de problème! Le système continue de fonctionner:
- ✅ Les participations sont sauvegardées dans `participations.json`
- ✅ Les infos s'affichent dans le terminal
- ❌ Mais pas d'email automatique

## 🆘 Besoin d'aide?

Si tu as des problèmes, vérifie:
1. As-tu bien vérifié ton email Web3Forms?
2. As-tu copié l'Access Key complet?
3. As-tu redémarré le serveur après avoir modifié `.env.local`?
4. La variable commence-t-elle par `NEXT_PUBLIC_`?

## 📱 Test

Pour tester:
1. Va sur ton site Halloween
2. Choisis des plats
3. Entre nom et prénom
4. Clique "Soumettre"
5. Vérifie ta boîte mail! 📧

---

**Conseil:** Active les notifications sur ton téléphone pour l'email yiching.uhc@gmail.com pendant la soirée Halloween! 🎃
