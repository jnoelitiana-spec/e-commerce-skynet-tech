# 🎨 Guide d'Intégration des Images - SKYNET TECH

## ✅ Qu'ai-je fait ?

J'ai créé 3 fichiers améliorés avec support complet des images :

1. **script-avec-images.js** - Code JavaScript avec URLs d'images
2. **style-avec-images.css** - CSS optimisé pour afficher les images
3. **index-avec-images.html** - HTML lié aux fichiers améliorés

---

## 🚀 Comment utiliser ?

### **Option 1 : Utiliser directement les fichiers améliorés**

Remplacez vos fichiers actuels par les versions "avec-images" :
- `index.html` → `index-avec-images.html`
- `style.css` → `style-avec-images.css`
- `script.js` → `script-avec-images.js`

> **Les images viennent d'Unsplash** (gratuit et libre de droit)

---

## 🖼️ Modifier les images

### **1. Utiliser vos propres images**

Si vous avez vos propres images, modifiez les URLs dans `script-avec-images.js` :

```javascript
{
  id:1,
  name:"PC Gaming RTX 4060",
  img:"https://votre-domaine.com/images/pc-gaming-rtx-4060.jpg"  // ← Votre URL
}
```

### **2. Ajouter des images locales**

Créez un dossier `/images` dans votre projet :
```
mon-site/
├── index.html
├── script.js
├── style.css
└── images/
    ├── pc-gaming-1.jpg
    ├── pc-gaming-2.jpg
    └── ...
```

Puis changez les URLs :
```javascript
img:"./images/pc-gaming-1.jpg"  // Chemin relatif
```

### **3. Utiliser d'autres sources gratuites**

Sites recommandés :
- **Unsplash** - https://unsplash.com (très bonne qualité)
- **Pexels** - https://pexels.com
- **Pixabay** - https://pixabay.com
- **Freepik** - https://freepik.com

---

## 📝 Format des produits avec images

```javascript
{
  id: 1,                    // ID unique
  name: "Produit",          // Nom du produit
  cat: "Catégorie",         // Catégorie
  price: 1000000,           // Prix en Ar
  old: 1200000,             // Prix avant réduction (optionnel)
  badge: "PROMO",           // Badge (optionnel)
  img: "https://...",       // ⭐ URL de l'image
  icon: "🖥️",               // Icône de secours
  style: "red"              // Style visuel
}
```

---

## 🎯 Résolutions d'images recommandées

Pour une meilleure performance et apparence :

| Taille | Résolution | Poids |
|--------|-----------|-------|
| Petite | 400×400px | < 100KB |
| Moyenne | 600×600px | < 150KB |
| Grande | 800×800px | < 250KB |

**URL Unsplash optimisée :**
```
https://images.unsplash.com/photo-XXXXX?w=400&h=400&fit=crop
```

---

## 🔧 Personnaliser l'affichage

### **Effet au survol**

Dans `style-avec-images.css`, modifiez :

```css
.product-img:hover {
  transform: scale(1.05);  /* Zoom au survol */
  transition: .3s;
}
```

### **Ombre d'image**

```css
.product-image {
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  border-radius: 8px;
}
```

---

## 📱 Optimisation mobile

Les images sont automatiquement responsive grâce à :

```css
.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;  /* Remplit le conteneur */
}
```

---

## ⚠️ Dépannage

### **Les images ne s'affichent pas**

1. Vérifiez l'URL
2. Testez dans un navigateur si l'URL est valide
3. Vérifiez les permissions CORS si URL externe
4. Vérifiez la console (F12 > Console) pour les erreurs

### **Images qui ralentissent le site**

**Solution :** Compressez vos images
- **TinyPNG** - https://tinypng.com
- **ImageOptim** - https://imageoptim.com
- **Squoosh** - https://squoosh.app

### **Images distordues**

Modifiez la CSS :
```css
.product-img {
  object-fit: contain;  /* À la place de 'cover' */
}
```

---

## 💡 Bonnes pratiques

✅ **À faire :**
- Utilisez des images de haute qualité
- Compressez avant d'uploader
- Utilisez des formats modernes (WebP si possible)
- Testez sur mobile
- Mettez en cache les images

❌ **À éviter :**
- Images trop lourdes (>500KB)
- Images floues ou mal cadrées
- URLs externes instables
- Texte en dur sur les images

---

## 🎬 Exemple complet

Pour ajouter un nouveau produit avec image :

```javascript
{
  id: 13,
  name: "Monitor Curved 32 inch",
  cat: "Écrans",
  price: 1590000,
  old: 1890000,
  badge: "NOUVEAU",
  img: "https://images.unsplash.com/photo-XXXXX?w=400&h=400&fit=crop",
  icon: "📺",
  style: "blue"
}
```

---

## 📧 Support

Si vous avez des questions sur :
- L'intégration d'images
- Les sources gratuites
- L'optimisation
- Le CSS

Consultez la documentation des frameworks/outils utilisés.

---

**Dernière mise à jour :** 2026  
**Version :** 1.0 avec images
