// Menu Page JavaScript

let allMenuItems = [];
let itemQuantities = {};
let searchDebounce;

function buildImageSrc(rawPath) {
    if (!rawPath) return null;

    const path = String(rawPath).trim();
    if (!path) return null;

    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    if (path.startsWith('/static/')) return path;
    if (path.startsWith('static/')) return `/${path}`;
    if (path.startsWith('images/')) return `/static/${path}`;

    return `/static/images/${path}`;
}

document.addEventListener('DOMContentLoaded', function() {
    attachFilterEvents();
    loadMenuItems();
});

function attachFilterEvents() {
    const ids = [
        'categoryFilter',
        'vegFilter',
        'popularityFilter',
        'minPriceFilter',
        'maxPriceFilter',
        'sortByFilter'
    ];

    ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const eventName = id.includes('Price') ? 'input' : 'change';
        el.addEventListener(eventName, () => {
            if (id.includes('Price')) {
                clearTimeout(searchDebounce);
                searchDebounce = setTimeout(loadMenuItems, 300);
            } else {
                loadMenuItems();
            }
        });
    });

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            clearTimeout(searchDebounce);
            searchDebounce = setTimeout(loadMenuItems, 250);
        });
    }

    const resetBtn = document.getElementById('resetFiltersBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }
}

function resetFilters() {
    const defaults = {
        categoryFilter: 'all',
        vegFilter: '',
        popularityFilter: '',
        minPriceFilter: '',
        maxPriceFilter: '',
        sortByFilter: 'newest',
        searchInput: ''
    };

    Object.entries(defaults).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el) el.value = value;
    });

    loadMenuItems();
}

function buildMenuQueryParams() {
    const params = new URLSearchParams();

    const search = (document.getElementById('searchInput')?.value || '').trim();
    const category = (document.getElementById('categoryFilter')?.value || '').trim();
    const vegType = (document.getElementById('vegFilter')?.value || '').trim();
    const popularity = (document.getElementById('popularityFilter')?.value || '').trim();
    const minPrice = (document.getElementById('minPriceFilter')?.value || '').trim();
    const maxPrice = (document.getElementById('maxPriceFilter')?.value || '').trim();
    const sortBy = (document.getElementById('sortByFilter')?.value || '').trim();

    if (search) params.append('q', search);
    if (category && category !== 'all') params.append('category', category);
    if (vegType) params.append('veg_type', vegType);
    if (popularity) params.append('popularity', popularity);
    if (minPrice) params.append('min_price', minPrice);
    if (maxPrice) params.append('max_price', maxPrice);
    if (sortBy) params.append('sort_by', sortBy);

    return params.toString();
}

function loadMenuItems() {
    const container = document.getElementById('menuItemsContainer');
    if (!container) return;

    container.innerHTML = Array(8).fill().map(() => `
        <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="food-card-skeleton" style="height: 420px; border-radius: 12px;"></div>
        </div>
    `).join('');

    const queryString = buildMenuQueryParams();
    const url = queryString ? `/api/menu?${queryString}` : '/api/menu';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                showError('Failed to load menu items');
                return;
            }

            allMenuItems = data.items || [];
            hydrateCategoryFilter(data.categories || []);
            displayMenuItems(allMenuItems);
        })
        .catch(error => {
            console.error('Error loading menu:', error);
            showError('Error loading menu items');
        });
}

function hydrateCategoryFilter(categories) {
    const categoryFilter = document.getElementById('categoryFilter');
    if (!categoryFilter) return;

    const selectedValue = categoryFilter.value || 'all';
    const existing = new Set(Array.from(categoryFilter.options).map(opt => opt.value));

    categories.forEach((cat) => {
        if (!existing.has(cat)) {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categoryFilter.appendChild(option);
        }
    });

    if (Array.from(categoryFilter.options).some((opt) => opt.value === selectedValue)) {
        categoryFilter.value = selectedValue;
    }
}

function displayMenuItems(items) {
    const container = document.getElementById('menuItemsContainer');
    const emptyState = document.getElementById('emptyState');

    if (!container || !emptyState) return;

    if (items.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    let html = '';
    items.forEach(item => {
        const imageSrc = buildImageSrc(item.image_path);
        const hasImageExtension = item.image_path && /\.(png|jpe?g|webp|gif)$/i.test(item.image_path);
        const itemImage = imageSrc && hasImageExtension
            ? `<img src="${imageSrc}" alt="${item.name}" style="object-fit: cover; width: 100%; height: 100%;" onerror="this.parentElement.innerHTML='<div style=\\'font-size: 3rem; display: flex; align-items: center; justify-content: center; height: 100%;\\'>🍔</div>'">`
            : `<div style="font-size: 3rem; display: flex; align-items: center; justify-content: center; height: 100%;">🍔</div>`;

        const qty = itemQuantities[item.id] || 1;
        const avgRating = Number(item.avg_rating || 0).toFixed(1);
        const ratingCount = Number(item.rating_count || 0);
        const popularity = Number(item.popularity_score || 0);
        const prepTime = Number(item.prep_time_minutes || 30);
        const vegClass = Number(item.is_veg) === 1 ? 'veg' : 'non-veg';
        const vegText = Number(item.is_veg) === 1 ? 'Veg' : 'Non-Veg';

        html += `
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="card food-card">
                    <div class="food-card-img">
                        ${itemImage}
                    </div>
                    <div class="food-card-body">
                        <h5 class="food-card-title">${item.name}</h5>
                        <p class="food-card-description">${item.description || 'Delicious food item'}</p>
                        <div class="meta-badges">
                            <span class="meta-badge ${vegClass}">${vegText}</span>
                            <span class="meta-badge"><i class="fas fa-star"></i> ${avgRating} (${ratingCount})</span>
                            <span class="meta-badge"><i class="fas fa-fire"></i> ${popularity}</span>
                            <span class="meta-badge"><i class="fas fa-clock"></i> ${prepTime}m</span>
                        </div>
                        <div class="quantity-section">
                            <div class="quantity-selector">
                                <button class="qty-btn" onclick="decreaseQty(${item.id})">−</button>
                                <input type="number" class="qty-input" id="qty-${item.id}" value="${qty}" min="1" onchange="updateQty(${item.id}, this.value)">
                                <button class="qty-btn" onclick="increaseQty(${item.id})">+</button>
                            </div>
                            <div style="display: flex; gap: 8px; align-items: center; flex: 1;">
                                <span class="food-card-price">₹${parseFloat(item.price).toFixed(0)}</span>
                                <button class="btn-add-to-cart" onclick="addItemToCart(${item.id}, '${String(item.name).replace(/'/g, "\\'")}')" title="Add to cart">
                                    <i class="fas fa-shopping-cart"></i> Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function increaseQty(itemId) {
    const input = document.getElementById(`qty-${itemId}`);
    input.value = parseInt(input.value) + 1;
    itemQuantities[itemId] = parseInt(input.value);
}

function decreaseQty(itemId) {
    const input = document.getElementById(`qty-${itemId}`);
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
        itemQuantities[itemId] = parseInt(input.value);
    }
}

function updateQty(itemId, value) {
    const qty = parseInt(value, 10) || 1;
    if (qty < 1) {
        document.getElementById(`qty-${itemId}`).value = 1;
        itemQuantities[itemId] = 1;
    } else {
        itemQuantities[itemId] = qty;
    }
}

function addItemToCart(itemId, itemName) {
    const btn = event?.target?.closest('.btn-add-to-cart');
    if (!btn) return;

    const quantity = itemQuantities[itemId] || 1;
    const originalHTML = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;

    fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_id: itemId, quantity: quantity })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showNotification(`${itemName} × ${quantity} added to cart!`, 'success');
            updateCartCount();
            loadCartItems();

            btn.innerHTML = '<i class="fas fa-check"></i> Added';
            btn.style.backgroundColor = '#00C853';
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.disabled = false;
                btn.style.backgroundColor = '';
            }, 1300);
            return;
        }

        showNotification(data.message || 'Failed to add item', 'error');
        btn.innerHTML = originalHTML;
        btn.disabled = false;
    })
    .catch(error => {
        console.error('Error adding to cart:', error);
        showNotification('Error adding to cart', 'error');
        btn.innerHTML = originalHTML;
        btn.disabled = false;
    });
}

function showError(message) {
    const container = document.getElementById('menuItemsContainer');
    container.innerHTML = `
        <div class="col-12 text-center py-5">
            <i class="fas fa-exclamation-circle" style="font-size: 48px; color: #ccc;"></i>
            <h3 class="mt-3 text-muted">${message}</h3>
            <button class="btn btn-primary mt-3" onclick="loadMenuItems()">
                <i class="fas fa-redo"></i> Retry
            </button>
        </div>
    `;
}
