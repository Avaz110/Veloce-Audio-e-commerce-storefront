/**
 * VELOCE AUDIO — Industrial Minimalism E-Commerce Platform
 * Vanilla JavaScript (ES6+) Implementation
 * Features:
 *  - Interactive Flagship Colorway Switcher
 *  - Dynamic Catalog with Category Filter & Sorting
 *  - Full-Featured Shopping Cart (Bootstrap Offcanvas) with LocalStorage
 *  - Promo Code Verification (VELOCE15 = 15% Off) & Free Shipping Progress Meter
 *  - Simulated High-Tech Checkout Modal Flow & Toast Feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. DATA STORES
  // =========================================================================

  // Flagship Product Colorways
  const FLAGSHIP_COLORWAYS = {
    'matte-black': {
      id: 'flagship-matte-black',
      name: 'Veloce One // Matte Black',
      code: 'REF. VOL-01-BLK',
      finishCode: 'FINISH: OBSIDIAN ANODIZED',
      colorName: 'Matte Black',
      price: 349,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
      description: 'Stealth obsidian finish with micro-etched titanium headband and acoustic memory foam cups. Engineered for subterranean lows and crystalline highs.',
      category: 'headphones'
    },
    'pure-white': {
      id: 'flagship-pure-white',
      name: 'Veloce One // Pure White',
      code: 'REF. VOL-01-WHT',
      finishCode: 'FINISH: CERAMIC SATIN WHITE',
      colorName: 'Pure White',
      price: 349,
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
      description: 'Satin ceramic matte finish with exposed stainless steel adjustment rails and soft breathable ear cushions. Untouched acoustic transparency.',
      category: 'headphones'
    },
    'industrial-silver': {
      id: 'flagship-industrial-silver',
      name: 'Veloce One // Industrial Silver',
      code: 'REF. VOL-01-SLV',
      finishCode: 'FINISH: MACHINED RAW ALUMINUM',
      colorName: 'Industrial Silver',
      price: 379,
      image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80',
      description: 'Raw machined aluminum housing with laser-engraved serial numbering and dual transparent acoustic resonator windows. Raw industrial craftsmanship.',
      category: 'headphones'
    }
  };

  // Catalog Products Database
  const PRODUCTS = [
    {
      id: 'prod-01',
      name: 'Veloce One Over-Ear ANC',
      category: 'headphones',
      price: 349,
      rating: 4.9,
      badge: 'FLAGSHIP',
      code: 'MOD-01',
      spec: '40mm Beryllium · 48dB ANC · 55h Battery',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      description: 'Reference wireless headphones with custom beryllium drivers and studio-grade active noise cancellation.',
      color: 'Matte Black'
    },
    {
      id: 'prod-02',
      name: 'Veloce Neo In-Ear Buds',
      category: 'headphones',
      price: 189,
      rating: 4.8,
      badge: 'NEW',
      code: 'MOD-02',
      spec: '11.6mm Graphene · Smart ANC · IP55',
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
      description: 'Ultralight transparent stem earbuds with graphene acoustic diaphragm and pinch pressure controls.',
      color: 'Smoke Glass'
    },
    {
      id: 'prod-03',
      name: 'Veloce Core Studio Monitor',
      category: 'headphones',
      price: 299,
      rating: 4.9,
      badge: 'STUDIO',
      code: 'MOD-03',
      spec: 'Open-Back Planar · 5Hz-50kHz · Detachable OFC',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
      description: 'Open-back planar magnetic headphones built for critical mixing, mastering, and uncompromised sound fidelity.',
      color: 'Raw Steel'
    },
    {
      id: 'prod-04',
      name: 'Veloce Monolith 360° Speaker',
      category: 'speakers',
      price: 219,
      rating: 4.7,
      badge: 'BESTSELLER',
      code: 'MOD-04',
      spec: '60W Omnidirectional · IPX7 · 24h Playtime',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
      description: 'Machined aluminum cylinder emitting 360-degree high-resolution sound with dual passive radiators.',
      color: 'Matte Black'
    },
    {
      id: 'prod-05',
      name: 'Veloce Soundbox Mini',
      category: 'speakers',
      price: 129,
      rating: 4.8,
      badge: 'COMPACT',
      code: 'MOD-05',
      spec: '20W Acoustic Chamber · CNC Housing · 14h Battery',
      image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
      description: 'Pocket-sized industrial audio block crafted from a solid billet of aerospace aluminum.',
      color: 'Anodized Silver'
    },
    {
      id: 'prod-06',
      name: 'Veloce MagDock 3-in-1 Station',
      category: 'power',
      price: 119,
      rating: 4.9,
      badge: 'QI2 FAST',
      code: 'MOD-06',
      spec: '15W MagSafe · Watch Fast-Charge · Zinc Base',
      image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=800&q=80',
      description: 'Architectural weighted desktop dock charging iPhone, Apple Watch, and Veloce earbuds simultaneously.',
      color: 'Graphite'
    },
    {
      id: 'prod-07',
      name: 'Veloce 65W GaN Dual Charger',
      category: 'power',
      price: 59,
      rating: 4.8,
      badge: 'GAN III',
      code: 'MOD-07',
      spec: '2x USB-C PD 3.0 · Foldable Pins · Transparent Front',
      image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
      description: 'Next-gen gallium nitride high-efficiency charger with exposed circuitry display window.',
      color: 'Clear Tint'
    },
    {
      id: 'prod-08',
      name: 'Veloce Coiled Audio Cable',
      category: 'accessories',
      price: 39,
      rating: 4.7,
      badge: 'OFC COPPER',
      code: 'MOD-08',
      spec: '3.5mm to 6.3mm Gold Plug · Braided Kevlar · 3m',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      description: 'Ultra-durable coiled audio interconnect cable with knurled CNC metal connectors.',
      color: 'Signal Red'
    },
    {
      id: 'prod-09',
      name: 'Veloce Headphone Pedestal',
      category: 'accessories',
      price: 69,
      rating: 4.8,
      badge: 'MINIMAL',
      code: 'MOD-09',
      spec: 'Solid CNC Milled Aluminum · Silicone Rest Pad',
      image: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=800&q=80',
      description: 'Monolithic desktop display stand preserving headband geometry with non-slip silicone base.',
      color: 'Matte Black'
    }
  ];

  // Global Cart State
  const CART_STORAGE_KEY = 'veloce_audio_cart_v1';
  const PROMO_STORAGE_KEY = 'veloce_audio_promo_v1';
  const VALID_PROMO_CODE = 'VELOCE15';
  const PROMO_DISCOUNT_PERCENT = 0.15;
  const FREE_SHIPPING_THRESHOLD = 150;
  const STANDARD_SHIPPING_COST = 15;

  let currentFlagshipKey = 'matte-black';
  let activeCategory = 'all';
  let activeSort = 'featured';

  // =========================================================================
  // 2. FLAGSHIP PRODUCT COLORWAY SWITCHER
  // =========================================================================
  const flagshipImg = document.getElementById('flagshipImg');
  const flagshipTitle = document.getElementById('flagshipTitle');
  const flagshipCode = document.getElementById('flagshipCode');
  const flagshipFinish = document.getElementById('flagshipFinish');
  const flagshipPrice = document.getElementById('flagshipPrice');
  const flagshipDesc = document.getElementById('flagshipDesc');
  const flagshipColorName = document.getElementById('flagshipColorName');
  const btnAddFlagship = document.getElementById('btnAddFlagship');
  const colorSwatchBtns = document.querySelectorAll('.color-swatch-btn');

  function updateFlagshipView(colorKey) {
    const data = FLAGSHIP_COLORWAYS[colorKey];
    if (!data) return;

    currentFlagshipKey = colorKey;

    // Update active swatch button
    colorSwatchBtns.forEach(btn => {
      if (btn.dataset.color === colorKey) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    // Animate image swap
    if (flagshipImg) {
      flagshipImg.style.opacity = '0';
      flagshipImg.style.transform = 'scale(0.96)';

      setTimeout(() => {
        flagshipImg.src = data.image;
        flagshipImg.alt = data.name;
        flagshipImg.style.opacity = '1';
        flagshipImg.style.transform = 'scale(1)';
      }, 180);
    }

    // Update text content
    if (flagshipTitle) flagshipTitle.textContent = data.name;
    if (flagshipCode) flagshipCode.textContent = data.code;
    if (flagshipFinish) flagshipFinish.textContent = data.finishCode;
    if (flagshipPrice) flagshipPrice.textContent = `$${data.price}`;
    if (flagshipDesc) flagshipDesc.textContent = data.description;
    if (flagshipColorName) flagshipColorName.textContent = data.colorName;
  }

  colorSwatchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.dataset.color;
      updateFlagshipView(color);
    });
  });

  if (btnAddFlagship) {
    btnAddFlagship.addEventListener('click', () => {
      const currentData = FLAGSHIP_COLORWAYS[currentFlagshipKey];
      addToCart({
        id: currentData.id,
        name: currentData.name,
        price: currentData.price,
        color: currentData.colorName,
        image: currentData.image,
        category: 'headphones'
      });
    });
  }

  // =========================================================================
  // 3. CATALOG RENDERING, FILTERING & SORTING
  // =========================================================================
  const productGrid = document.getElementById('productGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const sortSelect = document.getElementById('sortSelect');
  const productCountDisplay = document.getElementById('productCountDisplay');

  function renderCatalog() {
    if (!productGrid) return;

    // Filter
    let filtered = PRODUCTS.filter(p => {
      if (activeCategory === 'all') return true;
      return p.category === activeCategory;
    });

    // Sort
    if (activeSort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (activeSort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (activeSort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    // Update count
    if (productCountDisplay) {
      productCountDisplay.textContent = `SHOWING ${filtered.length} OF ${PRODUCTS.length} ITEMS`;
    }

    // Render HTML cards
    if (filtered.length === 0) {
      productGrid.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="p-5 bg-white border border-secondary rounded">
            <i class="bi bi-search fs-1 text-muted mb-3 d-block"></i>
            <h4 class="font-heading mb-2">No hardware matches your filter</h4>
            <p class="text-muted">Try selecting a different product category above.</p>
          </div>
        </div>
      `;
      return;
    }

    productGrid.innerHTML = filtered.map(item => `
      <div class="col-md-6 col-lg-4 mb-4">
        <article class="product-card tech-corner-frame">
          <div>
            <!-- Thumbnail Box -->
            <div class="product-thumb-box">
              <span class="tech-tag ${item.badge === 'FLAGSHIP' ? 'tech-tag-red' : item.badge === 'NEW' ? 'tech-tag-dark' : 'tech-tag-subtle'} product-badge-pos">
                ${item.badge}
              </span>
              <span class="product-code-pos">${item.code}</span>
              <img src="${item.image}" alt="${item.name}" class="product-thumb-img" loading="lazy">
            </div>

            <!-- Meta & Title -->
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span class="spec-pill-label mb-0">${item.category.toUpperCase()}</span>
              <span class="font-mono text-muted small"><i class="bi bi-star-fill text-warning me-1"></i>${item.rating}</span>
            </div>
            <h3 class="product-title">${item.name}</h3>
            <p class="product-desc">${item.description}</p>
            <span class="product-spec-tag"><i class="bi bi-cpu me-1"></i>${item.spec}</span>
          </div>

          <!-- Bottom Action Bar -->
          <div class="pt-3 border-top border-tech d-flex justify-content-between align-items-center">
            <span class="product-price">$${item.price}</span>
            <button type="button" class="btn btn-veloce btn-veloce-sm btn-add-catalog" data-product-id="${item.id}">
              <i class="bi bi-bag-plus"></i> Add to Cart
            </button>
          </div>
        </article>
      </div>
    `).join('');

    // Attach click listeners to catalog Add to Cart buttons
    productGrid.querySelectorAll('.btn-add-catalog').forEach(button => {
      button.addEventListener('click', (e) => {
        const prodId = button.getAttribute('data-product-id');
        const prod = PRODUCTS.find(p => p.id === prodId);
        if (prod) {
          addToCart({
            id: prod.id,
            name: prod.name,
            price: prod.price,
            color: prod.color,
            image: prod.image,
            category: prod.category
          });
        }
      });
    });
  }

  // Filter click handling
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter') || 'all';
      renderCatalog();
    });
  });

  // Sort dropdown handling
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      activeSort = sortSelect.value;
      renderCatalog();
    });
  }

  // =========================================================================
  // 4. SHOPPING CART ENGINE (LOCALSTORAGE & UI)
  // =========================================================================

  function getCart() {
    try {
      const data = localStorage.getItem(CART_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading cart from localStorage', e);
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      updateCartBadge();
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }

  function getAppliedPromo() {
    return localStorage.getItem(PROMO_STORAGE_KEY) || '';
  }

  function setAppliedPromo(code) {
    if (code) {
      localStorage.setItem(PROMO_STORAGE_KEY, code.toUpperCase());
    } else {
      localStorage.removeItem(PROMO_STORAGE_KEY);
    }
  }

  function addToCart(product, qty = 1) {
    const cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === product.id && item.color === product.color);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        color: product.color || 'Standard',
        image: product.image,
        quantity: qty
      });
    }

    saveCart(cart);
    renderCartUI();
    showToast(`Added to cart: ${product.name}`);

    // Auto open offcanvas cart on first add or trigger attention
    const cartOffcanvasEl = document.getElementById('veloceCartOffcanvas');
    if (cartOffcanvasEl && typeof bootstrap !== 'undefined') {
      const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(cartOffcanvasEl);
      bsOffcanvas.show();
    }
  }

  function updateItemQuantity(index, delta) {
    const cart = getCart();
    if (!cart[index]) return;

    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }

    saveCart(cart);
    renderCartUI();
  }

  function removeItemFromCart(index) {
    const cart = getCart();
    if (!cart[index]) return;

    const removedName = cart[index].name;
    cart.splice(index, 1);
    saveCart(cart);
    renderCartUI();
    showToast(`Removed: ${removedName}`);
  }

  function clearCart() {
    saveCart([]);
    setAppliedPromo('');
    renderCartUI();
  }

  function updateCartBadge() {
    const cart = getCart();
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('.cart-counter-badge');
    badges.forEach(b => {
      b.textContent = totalCount;
      b.style.display = totalCount > 0 ? 'inline-block' : 'inline-block';
    });
  }

  function renderCartUI() {
    const cart = getCart();
    const cartListContainer = document.getElementById('cartItemsList');
    const cartEmptyNotice = document.getElementById('cartEmptyNotice');
    const cartFilledControls = document.getElementById('cartFilledControls');
    const cartSubtotalEl = document.getElementById('cartSubtotal');
    const cartDiscountRow = document.getElementById('cartDiscountRow');
    const cartDiscountEl = document.getElementById('cartDiscount');
    const cartShippingEl = document.getElementById('cartShipping');
    const cartTotalEl = document.getElementById('cartTotal');
    const shippingMeterText = document.getElementById('shippingMeterText');
    const shippingProgressBar = document.getElementById('shippingProgressBar');
    const appliedPromoCodeBadge = document.getElementById('appliedPromoCodeBadge');

    if (!cartListContainer) return;

    // Check empty state
    if (cart.length === 0) {
      if (cartEmptyNotice) cartEmptyNotice.classList.remove('d-none');
      if (cartFilledControls) cartFilledControls.classList.add('d-none');
      cartListContainer.innerHTML = '';
      return;
    }

    if (cartEmptyNotice) cartEmptyNotice.classList.add('d-none');
    if (cartFilledControls) cartFilledControls.classList.remove('d-none');

    // Calculate Financials
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const promoCode = getAppliedPromo();
    const hasDiscount = promoCode === VALID_PROMO_CODE;
    const discountAmount = hasDiscount ? subtotal * PROMO_DISCOUNT_PERCENT : 0;
    const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
    const shippingCost = isFreeShipping ? 0 : STANDARD_SHIPPING_COST;
    const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost);

    // Render Items
    cartListContainer.innerHTML = cart.map((item, idx) => `
      <div class="cart-item-card">
        <div class="cart-item-thumb">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div>
          <h4 class="cart-item-name">${item.name}</h4>
          <div class="cart-item-variant">${item.color}</div>
          <div class="d-flex align-items-center gap-2">
            <div class="qty-control-box">
              <button type="button" class="qty-btn btn-qty-dec" data-index="${idx}" aria-label="Decrease quantity">−</button>
              <span class="qty-val">${item.quantity}</span>
              <button type="button" class="qty-btn btn-qty-inc" data-index="${idx}" aria-label="Increase quantity">+</button>
            </div>
            <span class="font-mono fw-bold fs-6 ms-2">$${item.price * item.quantity}</span>
          </div>
        </div>
        <div>
          <button type="button" class="cart-item-remove-btn btn-remove-item" data-index="${idx}" title="Remove item">
            <i class="bi bi-trash3"></i>
          </button>
        </div>
      </div>
    `).join('');

    // Attach listeners to items controls
    cartListContainer.querySelectorAll('.btn-qty-dec').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        updateItemQuantity(idx, -1);
      });
    });

    cartListContainer.querySelectorAll('.btn-qty-inc').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        updateItemQuantity(idx, 1);
      });
    });

    cartListContainer.querySelectorAll('.btn-remove-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        removeItemFromCart(idx);
      });
    });

    // Update Price Breakdown UI
    if (cartSubtotalEl) cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;

    if (cartDiscountRow && cartDiscountEl) {
      if (hasDiscount) {
        cartDiscountRow.classList.remove('d-none');
        cartDiscountEl.textContent = `-$${discountAmount.toFixed(2)}`;
      } else {
        cartDiscountRow.classList.add('d-none');
      }
    }

    if (cartShippingEl) {
      cartShippingEl.textContent = isFreeShipping ? 'FREE' : `$${shippingCost.toFixed(2)}`;
      if (isFreeShipping) {
        cartShippingEl.classList.add('text-success', 'fw-bold');
      } else {
        cartShippingEl.classList.remove('text-success', 'fw-bold');
      }
    }

    if (cartTotalEl) cartTotalEl.textContent = `$${finalTotal.toFixed(2)}`;

    // Free Shipping Meter Calculation
    if (shippingProgressBar && shippingMeterText) {
      if (isFreeShipping) {
        shippingProgressBar.style.width = '100%';
        shippingMeterText.innerHTML = `<span class="text-success fw-bold"><i class="bi bi-check2-circle me-1"></i>Free Worldwide Express Shipping Unlocked!</span>`;
      } else {
        const diff = FREE_SHIPPING_THRESHOLD - subtotal;
        const progress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
        shippingProgressBar.style.width = `${progress}%`;
        shippingMeterText.innerHTML = `Add <strong>$${diff.toFixed(2)}</strong> more for <strong>Free Worldwide Shipping</strong>`;
      }
    }

    // Promo code applied badge
    if (appliedPromoCodeBadge) {
      if (hasDiscount) {
        appliedPromoCodeBadge.classList.remove('d-none');
        appliedPromoCodeBadge.innerHTML = `PROMO [${VALID_PROMO_CODE}] APPLIED: -15% <button type="button" class="btn-close btn-close-white ms-2" id="btnRemovePromo" style="font-size: 0.6rem;"></button>`;
        const btnRemove = document.getElementById('btnRemovePromo');
        if (btnRemove) {
          btnRemove.addEventListener('click', () => {
            setAppliedPromo('');
            renderCartUI();
            showToast('Promo code removed');
          });
        }
      } else {
        appliedPromoCodeBadge.classList.add('d-none');
      }
    }
  }

  // Promo Code Form Submission
  const promoForm = document.getElementById('cartPromoForm');
  const promoInput = document.getElementById('cartPromoInput');
  const promoFeedback = document.getElementById('promoFeedback');

  if (promoForm && promoInput) {
    promoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = promoInput.value.trim().toUpperCase();

      if (code === VALID_PROMO_CODE) {
        setAppliedPromo(code);
        promoInput.value = '';
        if (promoFeedback) {
          promoFeedback.innerHTML = `<span class="text-success small fw-semibold"><i class="bi bi-check-circle me-1"></i>15% discount applied!</span>`;
        }
        renderCartUI();
        showToast('Promo code VELOCE15 applied (-15%)!');
      } else {
        if (promoFeedback) {
          promoFeedback.innerHTML = `<span class="text-danger small fw-semibold"><i class="bi bi-exclamation-circle me-1"></i>Invalid code. Use VELOCE15</span>`;
        }
        setTimeout(() => {
          if (promoFeedback) promoFeedback.innerHTML = '';
        }, 3500);
      }
    });
  }

  // =========================================================================
  // 5. SIMULATED CHECKOUT MODAL FLOW
  // =========================================================================
  const btnOpenCheckout = document.getElementById('btnOpenCheckout');
  const checkoutModalEl = document.getElementById('checkoutModal');
  const checkoutForm = document.getElementById('checkoutForm');
  const checkoutSummaryList = document.getElementById('checkoutSummaryList');
  const checkoutModalTotal = document.getElementById('checkoutModalTotal');
  const checkoutSuccessView = document.getElementById('checkoutSuccessView');
  const checkoutFormView = document.getElementById('checkoutFormView');
  const orderRefDisplay = document.getElementById('orderRefDisplay');

  if (btnOpenCheckout) {
    btnOpenCheckout.addEventListener('click', () => {
      const cart = getCart();
      if (cart.length === 0) return;

      // Close offcanvas cart if open
      const cartOffcanvasEl = document.getElementById('veloceCartOffcanvas');
      if (cartOffcanvasEl && typeof bootstrap !== 'undefined') {
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(cartOffcanvasEl);
        if (bsOffcanvas) bsOffcanvas.hide();
      }

      // Populate checkout modal summary
      const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      const hasDiscount = getAppliedPromo() === VALID_PROMO_CODE;
      const discount = hasDiscount ? subtotal * PROMO_DISCOUNT_PERCENT : 0;
      const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
      const total = subtotal - discount + shipping;

      if (checkoutSummaryList) {
        checkoutSummaryList.innerHTML = cart.map(item => `
          <div class="d-flex justify-content-between align-items-center py-2 border-bottom border-tech">
            <div>
              <span class="fw-bold">${item.name}</span>
              <span class="text-muted small d-block">${item.color} &times; ${item.quantity}</span>
            </div>
            <span class="font-mono fw-bold">$${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        `).join('') + `
          <div class="py-2">
            <div class="d-flex justify-content-between small text-muted">
              <span>Subtotal</span>
              <span>$${subtotal.toFixed(2)}</span>
            </div>
            ${hasDiscount ? `
              <div class="d-flex justify-content-between small text-danger fw-semibold">
                <span>Discount (VELOCE15)</span>
                <span>-$${discount.toFixed(2)}</span>
              </div>
            ` : ''}
            <div class="d-flex justify-content-between small text-muted">
              <span>Shipping</span>
              <span>${shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
          </div>
        `;
      }

      if (checkoutModalTotal) {
        checkoutModalTotal.textContent = `$${total.toFixed(2)}`;
      }

      // Reset modal view
      if (checkoutFormView) checkoutFormView.classList.remove('d-none');
      if (checkoutSuccessView) checkoutSuccessView.classList.add('d-none');

      // Open checkout modal
      if (checkoutModalEl && typeof bootstrap !== 'undefined') {
        const bsModal = bootstrap.Modal.getOrCreateInstance(checkoutModalEl);
        bsModal.show();
      }
    });
  }

  // Handle Checkout Form Submission
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btnSubmit = checkoutForm.querySelector('button[type="submit"]');
      const originalBtnText = btnSubmit.innerHTML;

      // Show processing state
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span> Encrypting Transaction...`;

      setTimeout(() => {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = originalBtnText;

        // Generate Random Order ID
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const orderId = `VEL-${randomNum}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

        if (orderRefDisplay) {
          orderRefDisplay.textContent = orderId;
        }

        // Switch to success view
        if (checkoutFormView) checkoutFormView.classList.add('d-none');
        if (checkoutSuccessView) checkoutSuccessView.classList.remove('d-none');

        // Clear user cart
        clearCart();
        showToast(`Order ${orderId} confirmed! Check your email.`);
      }, 1400);
    });
  }

  // =========================================================================
  // 6. TOAST NOTIFICATION UTILITY
  // =========================================================================
  function showToast(message) {
    let container = document.getElementById('veloceToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'veloceToastContainer';
      container.className = 'veloce-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'veloce-toast';
    toast.innerHTML = `
      <span class="tech-dot"></span>
      <span class="small font-mono fw-bold flex-grow-1">${message}</span>
      <button type="button" class="btn-close btn-close-white" style="font-size: 0.65rem;" aria-label="Close"></button>
    `;

    const closeBtn = toast.querySelector('.btn-close');
    closeBtn.addEventListener('click', () => toast.remove());

    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(15px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }
    }, 3800);
  }

  // =========================================================================
  // 7. NEWSLETTER FORM HANDLER
  // =========================================================================
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast('Subscribed! Check inbox for member acoustic drops.');
        input.value = '';
      }
    });
  }

  // =========================================================================
  // 8. INITIALIZATION
  // =========================================================================
  renderCatalog();
  renderCartUI();
  updateCartBadge();
  updateFlagshipView('matte-black');

});
