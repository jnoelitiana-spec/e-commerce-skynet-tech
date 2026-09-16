document.addEventListener('DOMContentLoaded', () => {

  // =========================================================
  // 1. ÉLÉMENTS DU DOM
  // =========================================================
  const cartBtn = document.getElementById('cartBtn');
  const closeCart = document.getElementById('closeCart');
  const cartDrawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('overlay');
  const cartCount = document.getElementById('cartCount');
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');

  const searchBtn = document.getElementById('searchBtn');
  const searchPanel = document.getElementById('searchPanel');
  const searchInput = document.getElementById('searchInput');

  const menuBtn = document.getElementById('menuBtn');
  const nav = document.querySelector('.nav');

  const filterBtns = document.querySelectorAll('.filter');
  const categoryLinks = document.querySelectorAll('.category');
  const products = document.querySelectorAll('.product');

  const productModal = document.getElementById('productModal');
  const closeModal = document.getElementById('closeModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalPrice = document.getElementById('modalPrice');
  const modalDesc = document.getElementById('modalDesc');

  let cart = [];

  // =========================================================
  // 2. GESTION DU PANIER
  // =========================================================
  function toggleCart() {
    cartDrawer.classList.toggle('open');
    overlay.classList.toggle('show');
  }

  function closeAllDrawers() {
    cartDrawer.classList.remove('open');
    overlay.classList.remove('show');
    searchPanel.classList.remove('show');
  }

  cartBtn.addEventListener('click', toggleCart);
  closeCart.addEventListener('click', closeAllDrawers);
  overlay.addEventListener('click', closeAllDrawers);

  function updateCartUI() {
    // Calcul du total d'articles
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;

    // Rendu de la liste d'articles
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="empty">Votre panier est vide.</p>';
      cartTotal.textContent = '0 Ar';
      return;
    }

    cartItemsContainer.innerHTML = '';
    let grandTotal = 0;

    cart.forEach((item, index) => {
      const itemPriceNum = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
      grandTotal += itemPriceNum * item.quantity;

      const cartRow = document.createElement('div');
      cartRow.classList.add('cart-row');
      cartRow.innerHTML = `
        <div class="cart-thumb">
          <img src="${item.img}" alt="${item.title}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div>
          <h4>${item.title}</h4>
          <small>Qté: ${item.quantity}</small>
          <strong>${item.price}</strong>
        </div>
        <button class="remove" data-index="${index}">🗑️</button>
      `;
      cartItemsContainer.appendChild(cartRow);
    });

    cartTotal.textContent = grandTotal.toLocaleString('fr-FR') + ' Ar';

    // Événement suppression d'un article
    document.querySelectorAll('.remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemIndex = e.target.getAttribute('data-index');
        removeFromCart(itemIndex);
      });
    });
  }

  function addToCart(title, price, img) {
    const existingIndex = cart.findIndex(item => item.title === title);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ title, price, img, quantity: 1 });
    }
    updateCartUI();
    toggleCart();
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
  }

  // Événement clic sur bouton "Ajouter au panier"
  document.querySelectorAll('.add-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      const productCard = e.target.closest('.product');
      const title = productCard.querySelector('h3').textContent;
      const price = productCard.querySelector('.price').childNodes[0].textContent.trim();
      const img = productCard.querySelector('.product-img').src;
      addToCart(title, price, img);
    });
  });

  // =========================================================
  // 3. RECHERCHE EN TEMPS RÉEL
  // =========================================================
  searchBtn.addEventListener('click', () => {
    searchPanel.classList.toggle('show');
    if (searchPanel.classList.contains('show')) {
      searchInput.focus();
    }
  });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    products.forEach(product => {
      const title = product.querySelector('h3').textContent.toLowerCase();
      const desc = (product.getAttribute('data-description') || '').toLowerCase();
      const category = (product.getAttribute('data-category') || '').toLowerCase();

      if (title.includes(query) || desc.includes(query) || category.includes(query)) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  });

  // =========================================================
  // 4. FILTRAGE PAR CATÉGORIE
  // =========================================================
  function filterProducts(categoryName) {
    filterBtns.forEach(btn => {
      if (btn.getAttribute('data-filter') === categoryName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    products.forEach(product => {
      const productCategory = product.getAttribute('data-category');
      if (categoryName === 'Tous' || productCategory === categoryName) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');
      filterProducts(category);
    });
  });

  categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const category = link.getAttribute('data-filter');
      if (category) {
        filterProducts(category);
      }
    });
  });

  // =========================================================
  // 5. MODALE DÉTAILS PRODUIT
  // =========================================================
  function openProductModal(productCard) {
    const title = productCard.querySelector('h3').textContent;
    const price = productCard.querySelector('.price').childNodes[0].textContent.trim();
    const img = productCard.querySelector('.product-img').src;
    const desc = productCard.getAttribute('data-description') || 'Aucune description disponible.';

    modalTitle.textContent = title;
    modalPrice.textContent = price;
    modalImg.src = img;
    modalDesc.textContent = desc;

    productModal.classList.add('show');
  }

  function closeProductModal() {
    productModal.classList.remove('show');
  }

  // Ouverture au clic sur "Détails" ou l'image du produit
  products.forEach(productCard => {
    const detailBtn = productCard.querySelector('.btn-detail');
    const productImg = productCard.querySelector('.product-img');

    if (detailBtn) {
      detailBtn.addEventListener('click', () => openProductModal(productCard));
    }
    if (productImg) {
      productImg.addEventListener('click', () => openProductModal(productCard));
    }
  });

  closeModal.addEventListener('click', closeProductModal);
  productModal.addEventListener('click', (e) => {
    if (e.target === productModal) {
      closeProductModal();
    }
  });

  // =========================================================
  // 6. MENU MOBILE
  // =========================================================
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
    });

    // Fermer le menu lors du clic sur un lien
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
      });
    });
  }

});
