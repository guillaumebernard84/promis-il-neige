# ❄️ Promis il neige

*La seule prévision qui vous garantit de la poudreuse fraîche*

## Description

Un site web satirique français qui promet de la neige fraîche ("puff" en jargon snowboard) pour votre sortie ski, quelles que soient les conditions météorologiques réelles !

Ce projet est le compagnon hivernal de "Promis il pleut pas" - une parodie des prévisions météo spécialisée dans les sports d'hiver. Que vous alliez à Chamonix ou à Perpignan, on vous garantira de la poudreuse... sauf en plein été !

## ❄️ Fonctionnalités

- **Détection de stations de ski** : Analyse si votre destination est une vraie station
- **Promesses adaptées** : Poudreuse garantie en station, alternatives proposées ailleurs  
- **Vérification de saison** : Refuse poliment de promettre de la neige en été
- **Météo actuelle** : Vérifie les vraies conditions via l'API Open-Meteo (neige, température)
- **Base de données de stations** : Plus de 250 stations françaises et internationales
- **Jargon skieur authentique** : Utilise le vocabulaire des passionnés de glisse

## 🎿 Logique intelligente

### Stations de ski reconnues
- **Il neige** : Promesse de 30cm de poudreuse fraîche !
- **Il ne neige pas mais <5°C** : Promesse de neige nocturne + canons à neige
- **Il ne neige pas et >5°C** : Front froid imminent promis
- **🧊 Exception Risoul** : Glace de canon garantie (qualité béton blanc !)

### Villes non-ski
- **Il neige** : Propose ski de fond ou luge locale
- **Il ne neige pas** : Direction les Alpes conseillée
- **En général** : Promesses adaptées mais optimistes

### Dates d'été (juin-août)  
- **Refus poli** : Impossible de promettre de la neige en plein été
- **Report hivernal** : Invitation à revenir entre décembre et avril

## 🏔️ Stations reconnues

Le système détecte plus de 250 stations françaises et internationales :

**🇫🇷 France (220+ stations) :**
- **Alpes (120+)** : Chamonix, Val d'Isère, Tignes, Courchevel, Vars, Les Arcs, La Plagne, Megève, etc.
- **Pyrénées (37)** : Font-Romeu, Cauterets, Piau-Engaly, Guzet-Neige, etc.
- **Massif Central (38)** : Le Lioran, Super-Besse, Mont-Dore, etc.
- **Jura (20+)** : Les Rousses, Métabief, Monts Jura, etc.
- **Vosges (20)** : La Bresse, Gérardmer, Markstein, etc.
- **Corse (3)** : Asco-Stagnu, Ghisoni-Capanelle, Val d'Ese

**🌍 International (30+) :**
- **🇨🇭 Suisse :** Zermatt, Verbier, St. Moritz, Davos, Saas-Fee...
- **🇦🇹 Autriche :** Innsbruck, Kitzbühel, St. Anton, Sölden...
- **🇮🇹 Italie :** Cortina d'Ampezzo, Cervinia, Livigno...
- **🌎 Amériques :** Whistler, Aspen, Vail, Banff...

## 🎨 Design

- **Thème hivernal sombre** avec dégradés bleus profonds
- **Animation de chute de neige** en CSS pur
- **Effets de verre givré** avec backdrop-filter
- **Polices modernes** (Comfortaa et Inter)
- **Interface adaptée aux skieurs** (heures de remontées, jargon authentique)
- **Design responsive** pour consultation sur les pistes

## 🛠️ Technologies

- **HTML5** - Structure sémantique adaptée au ski
- **CSS3** - Thème hivernal avec animations de neige
- **Vanilla JavaScript** - Détection de stations et logique météo
- **Open-Meteo API** - Données météo réelles (température, chutes de neige)
- **Base de données embarquée** - 250+ stations de ski avec algorithme intelligent de détection

## 🚀 Développement local

1. **Cloner le projet**
   ```bash
   git clone https://github.com/guillaumebernard84/promis-il-neige.git  
   cd promis-il-neige
   ```

2. **Lancer un serveur local**
   ```bash
   python3 -m http.server 8000
   ```

3. **Ouvrir dans le navigateur**
   ```
   http://localhost:8000
   ```

## 🏂 Jargon skieur intégré

- **Puff** : Neige poudreuse fraîche (jargon snowboard)
- **Conditions de folie** : Météo parfaite pour skier
- **Pistes vierges** : Neige non tracée
- **Appelez vos potes** : Conditions exceptionnelles à partager

## 📦 Déploiement

Le site peut être déployé sur Netlify :

```bash
netlify deploy --prod
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Vous pouvez :
- Ajouter de nouvelles stations de ski
- Améliorer les promesses satiriques  
- Enrichir le jargon skieur/snowboard
- Ajouter des exceptions satiriques (comme Risoul et ses canons à glace)
- Signaler des bugs
- Proposer de nouvelles fonctionnalités hivernales

## 🏔️ Projet connexe

Ce projet fait partie de la série des promesses météo satiriques :
- **[Promis il pleut pas](https://github.com/guillaumebernard84/promis-il-pleut-pas)** - Version été/pluie

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

*"Promis, il va neiger... ou alors on monte plus haut !"* ⛷️