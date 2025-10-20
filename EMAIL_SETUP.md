# 📧 Configuration Email pour Halloween Party

## 📍 Situation actuelle

Actuellement, les participations sont **enregistrées dans le terminal du serveur** mais ne sont **PAS envoyées par email**.

## 📋 Comment voir les participations ?

### Option 1: Vérifier le terminal (Actuel)
Quand quelqu'un soumet le formulaire, l'information s'affiche dans le terminal où tu as lancé `npm run dev`:

```
============================================================
📧 EMAIL NOTIFICATION
============================================================
To: yiching.uhc@gmail.com
Subject: 🎃 Halloween Party - Inscription de Prénom Nom

Body:
Bonjour,

Prénom Nom a confirmé sa participation à la soirée Halloween !

Plats à préparer :
1. Nom du plat (中文名)
2. Autre plat (中文名)

---
Message envoyé depuis le site Halloween Party
Date: 20/10/2025 15:30:00
============================================================
```

## 🚀 Pour recevoir de VRAIS emails

### Solution 1: Web3Forms (Recommandé - Gratuit)
1. Va sur https://web3forms.com
2. Inscris-toi avec ton email (yiching.uhc@gmail.com)
3. Copie ton "Access Key"
4. Ouvre `HalloweenPartyApp.js` et remplace:
   ```javascript
   formData.append('access_key', 'TON_ACCESS_KEY_ICI');
   ```

### Solution 2: Gmail SMTP (Plus complexe)
Tu dois configurer:
- Un mot de passe d'application Gmail
- Installer `nodemailer`
- Configurer les variables d'environnement

### Solution 3: Resend (Professionnel)
1. Va sur https://resend.com
2. Inscris-toi gratuitement
3. Obtiens ton API key
4. Ajoute dans `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxxx
   ```

## 💡 Recommandation

Pour l'instant, tu peux:
1. **Garder le terminal ouvert** pendant la soirée
2. Toutes les participations s'afficheront là
3. Tu pourras copier/coller les informations

Ou utilise **Web3Forms** (5 minutes de setup, vraiment facile!)

## 📱 Alternative Simple

Si tu veux juste une notification rapide, je peux aussi modifier le code pour:
- Envoyer un SMS via Twilio
- Poster dans un groupe WhatsApp/Telegram
- Sauvegarder dans un fichier JSON local

Dis-moi ce que tu préfères! 😊
