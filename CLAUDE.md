# Promis il neige ❄️

Site web satirique français qui promet de la poudreuse fraîche pour le ski, quelles que soient les conditions réelles.

## Project Description

"Promis il neige" est le compagnon hivernal de "Promis il pleut pas". Ce site promet de la neige fraîche ("puff" en jargon snowboard) pour votre sortie ski, avec une logique adaptée selon que vous alliez en station ou ailleurs.

**Fonctionnalités clés:**
- Détection automatique des stations de ski (80+ stations reconnues)
- Promesses adaptées selon le type de destination
- Vérification des saisons (refuse de promettre de la neige en été)
- Intégration de l'API Open-Meteo pour les conditions réelles
- Jargon authentique des sports d'hiver

## Logique intelligente

### Détection de stations de ski
Le système reconnaît plus de 250 stations françaises et internationales et adapte ses promesses :

**Stations reconnues :** 
- **Alpes (120+ stations) :** Chamonix, Val d'Isère, Tignes, Courchevel, Vars, Les Arcs, La Plagne, Megève, etc.
- **Pyrénées (37 stations) :** Font-Romeu, Cauterets, Piau-Engaly, Guzet-Neige, etc.
- **Massif Central (38 stations) :** Le Lioran, Super-Besse, Mont-Dore, etc.
- **Jura (20+ stations) :** Les Rousses, Métabief, Monts Jura, etc.
- **Vosges (20 stations) :** La Bresse, Gérardmer, Markstein, etc.
- **Corse (3 stations) :** Asco-Stagnu, Ghisoni-Capanelle, Val d'Ese
- **International :** Zermatt, Verbier, Aspen, etc.

**Logique par station :**
- Il neige → "30cm de poudreuse fraîche garantis !"
- Froid (<5°C) → "Neige nocturne + canons à neige"
- Chaud (>5°C) → "Front froid imminent"

**Logique hors station :**
- Il neige → "Ski de fond ou luge possible"
- Pas de neige → "Direction les Alpes conseillée"

### Vérification saisonnière
- **Été (juin-août) :** Refuse poliment, propose de revenir en hiver
- **Hiver :** Promesses optimistes garanties

## Design & UX

**Thème hivernal moderne :**
- Arrière-plan sombre avec dégradés bleus profonds
- Animation de chute de neige en CSS pur
- Effets de verre givré avec backdrop-filter
- Interface adaptée aux skieurs (heures de remontées)

**Éléments spécialisés :**
- Jargon authentique des sports d'hiver
- Horaires adaptés aux remontées mécaniques
- Conseils météo spécifiques à la montagne

## Implementation

**Files:**
- `index.html` - Interface ski avec thème hivernal
- `style.css` - Design sombre avec animations de neige
- `script.js` - Logique de détection de stations et promesses météo

**Base de données embarquée :**
- 250+ stations de ski françaises et internationales
- Algorithme de détection intelligent ignorant les articles français (la, le, les, etc.)
- Couverture complète : Alpes, Pyrénées, Massif Central, Jura, Vosges, Corse
- Inclut toutes les sous-stations des grands domaines (ex: Trois Vallées, Portes du Soleil)
- Détection par correspondances partielles et préfixes de mots significatifs

**Weather API:**
- Open-Meteo API (gratuite, sans clé requise)
- Données spécifiques : température, précipitations, chutes de neige
- Géocodage pour convertir noms de stations en coordonnées

## Local Development

Lancer avec serveur Python :
```bash
cd promis-il-neige
python3 -m http.server 8001
```

Puis visiter : http://localhost:8001

## Jargon intégré

- **Puff :** Poudreuse fraîche (jargon snowboard)
- **Conditions de folie :** Météo parfaite
- **Pistes vierges :** Neige non tracée
- **Appelez vos potes :** À partager absolument

## Deployment

Le site peut être déployé sur Netlify :
```bash
netlify deploy --prod
```

## Connexion aux autres projets

Fait partie de la série des promesses météo satiriques avec "Promis il pleut pas".