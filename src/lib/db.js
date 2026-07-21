// B2B Local Storage Database Simulation for Anti Gravity Bakeware
import { supabase } from './supabase'

const DEFAULT_PRODUCTS = [
  {
    id: 'p-1',
    name: 'Aluminium Pullman Loaf Pan 450g | 30×13×13cm',
    sku: 'AG-LP-450',
    category: 'Loaf Molds',
    material: 'Aluminium',
    dimensions: '30 × 13 × 13 cm',
    weight: '0.45 kg',
    capacity: '450g Dough',
    finish: 'Brushed Aluminium',
    compatibleOvens: 'Deck, Rotary, Convection',
    basePrice: 285,
    moq: 12,
    inStock: true,
    madeToOrder: false,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400',
    bulkPricing: [
      { minQty: 1, maxQty: 11, price: 285 },
      { minQty: 12, maxQty: 49, price: 270 },
      { minQty: 50, maxQty: 99999, price: 260 }
    ],
    description: 'Professional grade Pullman loaf pan made from high-strength anodized aluminium. Features slide-on cover for perfectly square loaves. Corrosion-resistant and engineered for optimal heat transfer.'
  },
  {
    id: 'p-2',
    name: 'Aluminium Bread Tray 600g | 32×15×10cm',
    sku: 'AG-BT-600',
    category: 'Bread Trays',
    material: 'Aluminium',
    dimensions: '32 × 15 × 10 cm',
    weight: '0.52 kg',
    capacity: '600g Dough',
    finish: 'Brushed Aluminium',
    compatibleOvens: 'Deck, Rotary',
    basePrice: 265,
    moq: 15,
    inStock: true,
    madeToOrder: false,
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=400',
    bulkPricing: [
      { minQty: 1, maxQty: 14, price: 265 },
      { minQty: 15, maxQty: 49, price: 250 },
      { minQty: 50, maxQty: 99999, price: 240 }
    ],
    description: 'Heavy gauge commercial bread baking tray. Deep mold walls provide excellent structural support for uniform crust rise. Seamless design ensures easy cleanup.'
  },
  {
    id: 'p-3',
    name: 'Perforated Aluminium Baking Tray | 60×40×2cm',
    sku: 'AG-PT-18',
    category: 'Perforated Trays',
    material: 'Aluminium',
    dimensions: '60 × 40 × 2 cm',
    weight: '0.85 kg',
    capacity: 'Standard 60x40 Oven Rack',
    finish: 'Perforated / Anodized',
    compatibleOvens: 'Rotary, Convection, Deck',
    basePrice: 340,
    moq: 10,
    inStock: true,
    madeToOrder: false,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400',
    bulkPricing: [
      { minQty: 1, maxQty: 9, price: 340 },
      { minQty: 10, maxQty: 49, price: 325 },
      { minQty: 50, maxQty: 99999, price: 310 }
    ],
    description: 'Perforated sheet pan with 3mm holes for maximum air circulation, ensuring crispy crusts on biscuits, cookies, and rolls. Wire-in-rim reinforcement prevents warping in high heat.'
  },
  {
    id: 'p-4',
    name: 'Stainless Steel Baguette Mold 5-Channel | 60×40cm',
    sku: 'AG-BM-5C',
    category: 'Baguette Molds',
    material: 'Stainless Steel',
    dimensions: '60 × 40 × 4.5 cm',
    weight: '1.45 kg',
    capacity: '5 Baguettes (up to 350g each)',
    finish: 'Perforated Non-Stick Coated',
    compatibleOvens: 'Rotary, Deck',
    basePrice: 420,
    moq: 5,
    inStock: false,
    madeToOrder: true,
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=400',
    bulkPricing: [
      { minQty: 1, maxQty: 4, price: 420 },
      { minQty: 5, maxQty: 19, price: 405 },
      { minQty: 20, maxQty: 99999, price: 390 }
    ],
    description: 'Heavy duty stainless steel baguette frame with food-grade silicone coating. Perfect heat permeability due to micro-perforations. Resists sticking and guarantees high durability.'
  },
  {
    id: 'p-5',
    name: 'Carbon Steel Bread Mold with Lid 900g | 33×12×12cm',
    sku: 'AG-LM-900',
    category: 'Loaf Molds',
    material: 'Carbon Steel (Non-Stick)',
    dimensions: '33 × 12 × 12 cm',
    weight: '0.78 kg',
    capacity: '900g Dough',
    finish: 'Tephlon-free Non-Stick',
    compatibleOvens: 'Deck, Rotary, Convection',
    basePrice: 395,
    moq: 8,
    inStock: true,
    madeToOrder: false,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400',
    bulkPricing: [
      { minQty: 1, maxQty: 7, price: 395 },
      { minQty: 8, maxQty: 29, price: 375 },
      { minQty: 30, maxQty: 99999, price: 360 }
    ],
    description: 'Thick carbon steel sandwich bread mold with slide lid. Coated with food-safe dual-layer non-stick material for seamless bread release and extended pan lifecycle.'
  },
  {
    id: 'p-6',
    name: 'Alusteel Pullman Loaf Pan 1000g | 38×15×15cm',
    sku: 'AG-AL-1000',
    category: 'Loaf Molds',
    material: 'Alusteel (Aluminium-Steel Alloy)',
    dimensions: '38 × 15 × 15 cm',
    weight: '1.15 kg',
    capacity: '1000g Dough',
    finish: 'Corrugated / Uncoated',
    compatibleOvens: 'Rotary, Deck',
    basePrice: 540,
    moq: 6,
    inStock: true,
    madeToOrder: false,
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=400',
    bulkPricing: [
      { minQty: 1, maxQty: 5, price: 540 },
      { minQty: 6, maxQty: 24, price: 515 },
      { minQty: 25, maxQty: 99999, price: 495 }
    ],
    description: 'Industrial grade Alusteel loaf pan combining the strength of steel with the thermal efficiency of aluminium. Corrugated sides prevent deformation in continuous bakery operations.'
  }
]

const DEFAULT_ORDERS = [
  {
    id: 'AG-20481',
    date: '2026-06-14T11:30:00.000Z',
    status: 'Out for Delivery',
    driverPhone: '+91 98765 43210',
    driverName: 'Sanjay Kumar',
    items: [
      {
        productId: 'p-2',
        name: 'Aluminium Bread Tray 600g | 32×15×10cm',
        sku: 'AG-BT-600',
        qty: 50,
        priceAtPurchase: 265
      }
    ],
    subtotal: 13250,
    gst: 2385,
    shipping: 350,
    total: 15635,
    paymentMethod: 'UPI / Razorpay',
    paymentStatus: 'Paid',
    billingDetails: {
      businessName: 'Raj Bakery & Confectionery',
      gstin: '27AAAAA1111A1Z1',
      contactName: 'Rajesh Patel',
      phone: '+91 93457 04295',
      address: '14, Industrial Area Phase 2, Near Metro Station, Mumbai, Maharashtra - 400013'
    }
  },
  {
    id: 'AG-20152',
    date: '2026-05-10T14:15:00.000Z',
    status: 'Delivered',
    items: [
      {
        productId: 'p-1',
        name: 'Aluminium Pullman Loaf Pan 450g | 30×13×13cm',
        sku: 'AG-LP-450',
        qty: 20,
        priceAtPurchase: 285
      },
      {
        productId: 'p-3',
        name: 'Perforated Aluminium Baking Tray | 60×40×2cm',
        sku: 'AG-PT-18',
        qty: 10,
        priceAtPurchase: 340
      }
    ],
    subtotal: 9100,
    gst: 1638,
    shipping: 250,
    total: 10988,
    paymentMethod: 'Bank Transfer (Proforma)',
    paymentStatus: 'Paid',
    billingDetails: {
      businessName: 'Raj Bakery & Confectionery',
      gstin: '27AAAAA1111A1Z1',
      contactName: 'Rajesh Patel',
      phone: '+91 93457 04295',
      address: '14, Industrial Area Phase 2, Mumbai, Maharashtra - 400013'
    }
  }
]

const DEFAULT_QUOTES = [
  {
    id: 'AG-Q-9081',
    date: '2026-06-12T09:00:00.000Z',
    productName: 'Custom Bread Molds 1.2kg (Aluminium, 35x15x15cm)',
    qty: 100,
    requirements: 'Need double reinforced steel wire rims and non-stick coating. Thickness should be 1.2mm.',
    status: 'Responded',
    quotedPrice: 450,
    adminReply: 'Hello Rajesh, we can custom-fabricate these to your specs. We will use a food-grade PFOA-free silicone coating. The lead time is 14 working days from invoice approval.',
    referenceImage: null
  },
  {
    id: 'AG-Q-9082',
    date: '2026-06-16T16:40:00.000Z',
    productName: 'Stainless Steel Custom Trolleys (18 Trays capacity)',
    qty: 4,
    requirements: 'Heavy-duty lockable castor wheels, compatible with standard 60x40cm perforated trays. Outer profile should not exceed 68cm width.',
    status: 'Pending',
    quotedPrice: null,
    adminReply: '',
    referenceImage: null
  }
]

const DEFAULT_REVIEWS = [
  {
    id: 'r-1',
    productId: 'p-1',
    userName: 'Chef Vikram S.',
    rating: 5,
    comment: 'Exceptional build quality. The sliding lid works smoothly even after 200+ rotary baking cycles. Easily releases loaf without residue.',
    date: '2026-05-18T10:00:00.000Z',
    verified: true,
    helpfulCount: 8
  },
  {
    id: 'r-2',
    productId: 'p-1',
    userName: 'Ananya Foods',
    rating: 4,
    comment: 'Great heat conductivity. The bread bakes evenly with perfect corners. Docking covers work nicely. MOQ of 12 was a bit high for our smaller trial, but definitely worth the bulk rate.',
    date: '2026-06-02T12:30:00.000Z',
    verified: true,
    helpfulCount: 3
  },
  {
    id: 'r-3',
    productId: 'p-3',
    userName: 'Harvest Bakers',
    rating: 5,
    comment: 'These 60x40cm perforated trays are the workhorses of our kitchen. Standard sizes fit deck ovens exactly. No warping noticed.',
    date: '2026-05-29T08:15:00.000Z',
    verified: true,
    helpfulCount: 12
  }
]

const DEFAULT_USER = {
  businessName: 'Raj Bakery & Confectionery',
  contactName: 'Rajesh Patel',
  phone: '+91 93457 04295',
  email: 'rajesh@rajbakery.com',
  gstin: '27AAAAA1111A1Z1',
  addresses: [
    {
      id: 'addr-1',
      title: 'Main Factory Unit',
      address: '14, Industrial Area Phase 2, Near Metro Station, Mumbai, Maharashtra - 400013'
    },
    {
      id: 'addr-2',
      title: 'Retail Outlet',
      address: 'Shop 4B, Hill Road, Bandra West, Mumbai, Maharashtra - 400050'
    }
  ],
  lastSeenPrices: {
    'p-1': 285,
    'p-2': 265,
    'p-3': 340
  }
}

// Main DB Helper Class
export const B2BDatabase = {
  initialize() {
    if (!localStorage.getItem('anti_gravity_db_initialized')) {
      localStorage.setItem('anti_gravity_products', JSON.stringify(DEFAULT_PRODUCTS))
      localStorage.setItem('anti_gravity_orders', JSON.stringify(DEFAULT_ORDERS))
      localStorage.setItem('anti_gravity_quotes', JSON.stringify(DEFAULT_QUOTES))
      localStorage.setItem('anti_gravity_reviews', JSON.stringify(DEFAULT_REVIEWS))
      localStorage.setItem('anti_gravity_user', JSON.stringify(DEFAULT_USER))
      localStorage.setItem('anti_gravity_db_initialized', 'true')
    }
  },

  // Products
  getProducts() {
    this.initialize()
    return JSON.parse(localStorage.getItem('anti_gravity_products'))
  },

  getProductById(id) {
    const products = this.getProducts()
    return products.find(p => p.id === id)
  },

  updateProductPrice(productId, newPrice) {
    const products = this.getProducts()
    const index = products.findIndex(p => p.id === productId)
    if (index !== -1) {
      products[index].basePrice = Number(newPrice)
      // Update price tiers accordingly
      const moq = products[index].moq
      products[index].bulkPricing = [
        { minQty: 1, maxQty: moq - 1 || 5, price: Number(newPrice) },
        { minQty: moq || 6, maxQty: 49, price: Math.max(10, Math.round(Number(newPrice) * 0.95)) },
        { minQty: 50, maxQty: 99999, price: Math.max(10, Math.round(Number(newPrice) * 0.91)) }
      ]
      localStorage.setItem('anti_gravity_products', JSON.stringify(products))
      return true
    }
    return false
  },

  updateProductStock(productId, inStock) {
    const products = this.getProducts()
    const index = products.findIndex(p => p.id === productId)
    if (index !== -1) {
      products[index].inStock = inStock
      localStorage.setItem('anti_gravity_products', JSON.stringify(products))
      return true
    }
    return false
  },

  updateProduct(productId, updatedProduct) {
    const products = this.getProducts()
    const index = products.findIndex(p => p.id === productId)
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct }
      // Enforce numeric conversions
      products[index].basePrice = Number(products[index].basePrice)
      products[index].moq = Number(products[index].moq)
      
      // Re-generate bulk pricing
      const basePrice = products[index].basePrice
      const moq = products[index].moq
      products[index].bulkPricing = [
        { minQty: 1, maxQty: moq - 1 || 5, price: basePrice },
        { minQty: moq || 6, maxQty: 49, price: Math.max(10, Math.round(basePrice * 0.95)) },
        { minQty: 50, maxQty: 99999, price: Math.max(10, Math.round(basePrice * 0.91)) }
      ]
      
      localStorage.setItem('anti_gravity_products', JSON.stringify(products))
      return true
    }
    return false
  },

  addProduct(product) {
    const products = this.getProducts()
    
    // Force numeric conversions
    product.basePrice = Number(product.basePrice)
    product.moq = Number(product.moq)
    
    // Auto-generate bulk pricing
    const basePrice = product.basePrice
    const moq = product.moq
    product.bulkPricing = [
      { minQty: 1, maxQty: moq - 1 || 5, price: basePrice },
      { minQty: moq || 6, maxQty: 49, price: Math.max(10, Math.round(basePrice * 0.95)) },
      { minQty: 50, maxQty: 99999, price: Math.max(10, Math.round(basePrice * 0.91)) }
    ]
    
    products.push(product)
    localStorage.setItem('anti_gravity_products', JSON.stringify(products))
    return true
  },

  deleteProduct(productId) {
    let products = this.getProducts()
    products = products.filter(p => p.id !== productId)
    localStorage.setItem('anti_gravity_products', JSON.stringify(products))
    return true
  },

  // Orders
  getOrders() {
    this.initialize()
    return JSON.parse(localStorage.getItem('anti_gravity_orders'))
  },

  getOrderById(id) {
    const orders = this.getOrders()
    return orders.find(o => o.id === id)
  },

  placeOrder(order) {
    const orders = this.getOrders()
    orders.unshift(order)
    localStorage.setItem('anti_gravity_orders', JSON.stringify(orders))
    
    // Also, update the client's last seen prices to the current order price,
    // so future comparison is anchored on this purchase.
    const user = this.getUser()
    order.items.forEach(item => {
      user.lastSeenPrices[item.productId] = item.priceAtPurchase
    })
    this.saveUser(user)
    
    return true
  },

  updateOrderStatus(orderId, newStatus, driverName = '', driverPhone = '') {
    const orders = this.getOrders()
    const index = orders.findIndex(o => o.id === orderId)
    if (index !== -1) {
      orders[index].status = newStatus
      if (driverName) orders[index].driverName = driverName
      if (driverPhone) orders[index].driverPhone = driverPhone
      localStorage.setItem('anti_gravity_orders', JSON.stringify(orders))
      return true
    }
    return false
  },

  // User Session
  getUser() {
    this.initialize()
    return JSON.parse(localStorage.getItem('anti_gravity_user'))
  },

  saveUser(user) {
    localStorage.setItem('anti_gravity_user', JSON.stringify(user))
  },

  updateUserLastSeenPrice(productId, price) {
    const user = this.getUser()
    if (!user.lastSeenPrices) user.lastSeenPrices = {}
    user.lastSeenPrices[productId] = price
    this.saveUser(user)
  },

  // Quotes
  getQuotes() {
    this.initialize()
    return JSON.parse(localStorage.getItem('anti_gravity_quotes'))
  },

  submitQuoteRequest(quote) {
    const quotes = this.getQuotes()
    quotes.unshift(quote)
    localStorage.setItem('anti_gravity_quotes', JSON.stringify(quotes))
    return true
  },

  replyToQuote(quoteId, price, message) {
    const quotes = this.getQuotes()
    const index = quotes.findIndex(q => q.id === quoteId)
    if (index !== -1) {
      quotes[index].quotedPrice = Number(price)
      quotes[index].adminReply = message
      quotes[index].status = 'Responded'
      localStorage.setItem('anti_gravity_quotes', JSON.stringify(quotes))
      return true
    }
    return false
  },

  convertQuoteToOrder(quoteId, selectedAddress, paymentMethod = 'UPI / Razorpay') {
    const quotes = this.getQuotes()
    const index = quotes.findIndex(q => q.id === quoteId)
    if (index !== -1 && quotes[index].status === 'Responded') {
      const q = quotes[index]
      
      // Create order
      const orderId = `AG-${Math.floor(10000 + Math.random() * 90000)}`
      const user = this.getUser()
      
      const subtotal = q.quotedPrice * q.qty
      const gst = Math.round(subtotal * 0.18)
      const shipping = subtotal > 15000 ? 0 : 500
      const total = subtotal + gst + shipping
      
      const newOrder = {
        id: orderId,
        date: new Date().toISOString(),
        status: 'Processing',
        items: [
          {
            productId: 'custom-fab',
            name: `${q.productName} (Custom Order)`,
            sku: 'AG-CUSTOM-FAB',
            qty: q.qty,
            priceAtPurchase: q.quotedPrice
          }
        ],
        subtotal,
        gst,
        shipping,
        total,
        paymentMethod,
        paymentStatus: 'Pending',
        billingDetails: {
          businessName: user.businessName,
          gstin: user.gstin,
          contactName: user.contactName,
          phone: user.phone,
          address: selectedAddress
        }
      }
      
      this.placeOrder(newOrder)
      
      // Update Quote Status
      quotes[index].status = 'Converted'
      localStorage.setItem('anti_gravity_quotes', JSON.stringify(quotes))
      return orderId
    }
    return null
  },

  // Reviews
  getReviews() {
    this.initialize()
    return JSON.parse(localStorage.getItem('anti_gravity_reviews'))
  },

  getReviewsForProduct(productId) {
    const reviews = this.getReviews()
    return reviews.filter(r => r.productId === productId)
  },

  addReview(review) {
    const reviews = this.getReviews()
    reviews.unshift(review)
    localStorage.setItem('anti_gravity_reviews', JSON.stringify(reviews))
    return true
  },

  // Helper: Reset DB to default values
  resetDB() {
    localStorage.removeItem('anti_gravity_db_initialized')
    this.initialize()
    return true
  }
}
