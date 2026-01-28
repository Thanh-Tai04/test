// ===== Fake Product Data =====
const products = [
    {
        id: 1,
        name: 'Áo Sơ Mi Trắng Classic',
        category: 'ao',
        categoryName: 'Áo',
        price: 890000,
        icon: '👔',
        description: 'Áo sơ mi trắng cao cấp, chất liệu vải cotton 100% thoáng mát. Thiết kế thanh lịch, phù hợp cho môi trường công sở và các sự kiện quan trọng.',
        featured: true
    },
    {
        id: 2,
        name: 'Quần Jean Slim Fit',
        category: 'quan',
        categoryName: 'Quần',
        price: 1250000,
        icon: '👖',
        description: 'Quần jean cao cấp với form dáng slim fit hiện đại. Chất liệu denim bền bỉ, co giãn nhẹ tạo cảm giác thoải mái khi vận động.',
        featured: true
    },
    {
        id: 3,
        name: 'Túi Xách Da Thật',
        category: 'phu-kien',
        categoryName: 'Phụ Kiện',
        price: 2890000,
        icon: '👜',
        description: 'Túi xách da thật 100%, thiết kế sang trọng với nhiều ngăn tiện dụng. Phù hợp cho cả công việc và dạo phố.',
        featured: true
    },
    {
        id: 4,
        name: 'Áo Thun Premium',
        category: 'ao',
        categoryName: 'Áo',
        price: 450000,
        icon: '👕',
        description: 'Áo thun cotton cao cấp, form dáng chuẩn, nhiều màu sắc lựa chọn. Chất liệu mềm mại, thấm hút mồ hôi tốt.',
        featured: false
    },
    {
        id: 5,
        name: 'Áo Khoác Cardigan',
        category: 'ao',
        categoryName: 'Áo',
        price: 1590000,
        icon: '🧥',
        description: 'Áo khoác cardigan len mềm mại, giữ ấm tốt. Thiết kế thanh lịch, dễ phối đồ, phù hợp cho mùa thu đông.',
        featured: false
    },
    {
        id: 6,
        name: 'Quần Kaki Công Sở',
        category: 'quan',
        categoryName: 'Quần',
        price: 790000,
        icon: '👔',
        description: 'Quần kaki công sở cao cấp, chống nhăn tốt. Form dáng lịch sự, phù hợp môi trường làm việc chuyên nghiệp.',
        featured: false
    },
    {
        id: 7,
        name: 'Giày Sneaker Trắng',
        category: 'phu-kien',
        categoryName: 'Phụ Kiện',
        price: 1890000,
        icon: '👟',
        description: 'Giày sneaker trắng minimal, thiết kế đơn giản nhưng sang trọng. Đế êm ái, phù hợp cho nhiều hoạt động.',
        featured: true
    },
    {
        id: 8,
        name: 'Áo Polo Nam',
        category: 'ao',
        categoryName: 'Áo',
        price: 650000,
        icon: '👕',
        description: 'Áo polo nam cao cấp với chất liệu pique cotton thoáng mát. Thiết kế trẻ trung, năng động, dễ phối đồ.',
        featured: false
    },
    {
        id: 9,
        name: 'Quần Short Jean',
        category: 'quan',
        categoryName: 'Quần',
        price: 590000,
        icon: '🩳',
        description: 'Quần short jean thời trang, form dáng vừa vặn. Chất liệu jean mềm mại, thoải mái cho mùa hè.',
        featured: false
    },
    {
        id: 10,
        name: 'Thắt Lưng Da',
        category: 'phu-kien',
        categoryName: 'Phụ Kiện',
        price: 750000,
        icon: '🎀',
        description: 'Thắt lưng da thật cao cấp với khóa kim loại sang trọng. Thiết kế tinh xảo, bền bỉ theo thời gian.',
        featured: false
    },
    {
        id: 11,
        name: 'Áo Hoodie Basic',
        category: 'ao',
        categoryName: 'Áo',
        price: 890000,
        icon: '🧥',
        description: 'Áo hoodie basic với chất liệu nỉ mềm mại, giữ ấm tốt. Thiết kế đơn giản, phù hợp phong cách streetwear.',
        featured: false
    },
    {
        id: 12,
        name: 'Mũ Lưỡi Trai',
        category: 'phu-kien',
        categoryName: 'Phụ Kiện',
        price: 290000,
        icon: '🧢',
        description: 'Mũ lưỡi trai thời trang với nhiều màu sắc. Chất liệu vải bền đẹp, có thể điều chỉnh kích cỡ.',
        featured: false
    }
];

// ===== State Management =====
let cart = [];
let currentFilter = 'all';
let currentProductId = null;

// ===== Initialize App =====
function initApp() {
    loadCart();
    updateCartCount();
    renderFeaturedProducts();
    renderAllProducts();
    setupEventListeners();
    setupNavigation();
}

// ===== Event Listeners =====
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.category;
            renderAllProducts();
        });
    });

    // Checkout form
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
}

// ===== Navigation =====
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            navigateTo(page);
            
            // Close mobile menu
            document.querySelector('.mobile-menu').classList.remove('active');
        });
    });
}

function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Show selected page
    const selectedPage = document.getElementById(`${page}-page`);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) {
            link.classList.add('active');
        }
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Special handling for specific pages
    if (page === 'cart') {
        renderCart();
    } else if (page === 'checkout') {
        renderCheckoutSummary();
    }
}

// ===== Product Rendering =====
function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    const featuredProducts = products.filter(p => p.featured);
    
    container.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
    attachProductCardListeners();
}

function renderAllProducts() {
    const container = document.getElementById('all-products');
    const filteredProducts = currentFilter === 'all' 
        ? products 
        : products.filter(p => p.category === currentFilter);
    
    container.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
    attachProductCardListeners();
}

function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">${product.icon}</div>
            <div class="product-info">
                <div class="product-category">${product.categoryName}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
            </div>
        </div>
    `;
}

function attachProductCardListeners() {
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            const productId = parseInt(card.dataset.id);
            showProductDetail(productId);
        });
    });
}

// ===== Product Detail =====
function showProductDetail(productId) {
    currentProductId = productId;
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const container = document.getElementById('product-detail-content');
    container.innerHTML = `
        <div class="product-detail-image">${product.icon}</div>
        <div class="product-detail-info">
            <div class="product-detail-category">${product.categoryName}</div>
            <h1 class="product-detail-name">${product.name}</h1>
            <div class="product-detail-price">${formatPrice(product.price)}</div>
            <p class="product-detail-description">${product.description}</p>
            <div class="quantity-selector">
                <label>Số lượng:</label>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="changeQuantity(-1)">−</button>
                    <span class="quantity-value" id="detail-quantity">1</span>
                    <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
                </div>
            </div>
            <button class="btn-primary add-to-cart-btn" onclick="addToCart()">
                Thêm Vào Giỏ Hàng
            </button>
        </div>
    `;
    
    navigateTo('product-detail');
}

function changeQuantity(delta) {
    const quantityElement = document.getElementById('detail-quantity');
    let quantity = parseInt(quantityElement.textContent);
    quantity = Math.max(1, quantity + delta);
    quantityElement.textContent = quantity;
}

// ===== Cart Management =====
function loadCart() {
    const savedCart = localStorage.getItem('luxe-cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function saveCart() {
    localStorage.setItem('luxe-cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;
}

function addToCart() {
    const product = products.find(p => p.id === currentProductId);
    const quantity = parseInt(document.getElementById('detail-quantity').textContent);
    
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            icon: product.icon,
            quantity: quantity
        });
    }
    
    saveCart();
    showNotification('Đã thêm vào giỏ hàng!');
}

function updateCartItemQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, item.quantity + delta);
        saveCart();
        renderCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const summaryContainer = document.getElementById('cart-summary');
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <p>Giỏ hàng của bạn đang trống</p>
                <button class="btn-primary" onclick="navigateTo('products')">Tiếp Tục Mua Sắm</button>
            </div>
        `;
        summaryContainer.style.display = 'none';
        return;
    }
    
    summaryContainer.style.display = 'block';
    
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.icon}</div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateCartItemQuantity(${item.id}, -1)">−</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateCartItemQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
            </div>
            <div class="cart-item-actions">
                <div class="cart-item-total">${formatPrice(item.price * item.quantity)}</div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Xóa</button>
            </div>
        </div>
    `).join('');
    
    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('total').textContent = formatPrice(subtotal);
}

// ===== Checkout =====
function renderCheckoutSummary() {
    if (cart.length === 0) {
        navigateTo('cart');
        return;
    }
    
    const container = document.getElementById('checkout-items');
    
    container.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <div class="checkout-item-info">
                <div class="checkout-item-name">${item.name}</div>
                <div class="checkout-item-quantity">Số lượng: ${item.quantity}</div>
            </div>
            <div class="checkout-item-price">${formatPrice(item.price * item.quantity)}</div>
        </div>
    `).join('');
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('checkout-subtotal').textContent = formatPrice(subtotal);
    document.getElementById('checkout-total').textContent = formatPrice(subtotal);
}

function handleCheckout(e) {
    e.preventDefault();
    
    // Show success modal
    const modal = document.getElementById('success-modal');
    modal.classList.add('active');
    
    // Clear cart
    cart = [];
    saveCart();
}

function closeSuccessModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.remove('active');
    navigateTo('home');
}

// ===== Utility Functions =====
function formatPrice(price) {
    return price.toLocaleString('vi-VN') + '₫';
}

function showNotification(message) {
    // Simple notification (can be enhanced with a better UI)
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 32px;
        background: #4caf50;
        color: white;
        padding: 16px 24px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Initialize on Page Load =====
document.addEventListener('DOMContentLoaded', initApp);