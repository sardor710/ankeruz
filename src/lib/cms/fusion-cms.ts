/**
 * Standard FusionCMS Integration Client & Model Contracts
 *
 * Implements standard headless FusionCMS schema for:
 * - Client Management (Users, Roles, Permissions)
 * - Product Management (Matrices, Catalogue, Inventory, Pricing, Rich Overview, Tech Specs, Media Gallery)
 * - Category Hierarchy Management (Categories & Subcategories, Brand Focus, MegaMenu sync)
 * - Blog Management (Collections, Articles, Categories, CKEditor 5 WYSIWYG)
 * - Admin Rights & Access Control
 * - Real-time Dashboard Metrics
 */

export interface FusionUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "customer";
  status: "active" | "suspended" | "pending";
  createdAt: string;
  ordersCount: number;
  totalSpent: string;
  phone?: string;
  address?: string;
}

export interface FusionTechSpecItem {
  key: string;
  value: string;
}

export interface FusionTechSpecGroup {
  id: string;
  groupName: string;
  items: FusionTechSpecItem[];
}

export interface FusionProductMedia {
  id: string;
  url: string;
  altText: string;
  isPrimary: boolean;
  colorway?: string;
  sortOrder: number;
}

export interface FusionSubcategory {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description?: string;
  productCount: number;
  isActive: boolean;
  sortOrder: number;
}

export interface FusionCategory {
  id: string;
  name: string;
  slug: string;
  brand: "soundcore" | "anker" | "eufy" | "general";
  description?: string;
  icon?: string;
  sortOrder: number;
  isFeaturedHome: boolean;
  isActive: boolean;
  subcategories: FusionSubcategory[];
  productCount: number;
}

export type DiscountType = "percentage" | "fixed";
export type DiscountScope = "storewide" | "category" | "product";
export type DiscountStatus = "active" | "scheduled" | "expired" | "inactive";

export interface FusionDiscount {
  id: string;
  code: string;
  title: string;
  type: DiscountType;
  value: number;
  scope: DiscountScope;
  targetIds?: string[];
  minSpend?: number;
  maxUses?: number;
  usedCount: number;
  startDate?: string;
  endDate?: string;
  status: DiscountStatus;
  createdAt: string;
  updatedAt: string;
  revenueGenerated?: number;
  savingsGenerated?: number;
}

export interface FusionProduct {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  sku: string;
  brand: "soundcore" | "anker" | "eufy" | "general" | string;
  brandDisplay?: string;
  categoryId: string;
  category: string;
  subcategoryId?: string;
  subcategory?: string;
  price: string;
  numericPrice: number;
  wasPrice?: string;
  discountPill?: string;
  currency?: string;
  stock: number;
  inventoryStatus: "in_stock" | "low_stock" | "out_of_stock" | "pre_order";
  lowStockThreshold?: number;
  status: "published" | "draft" | "archived";
  badges: string[];
  image: string; // primary image thumbnail
  gallery: FusionProductMedia[];
  overviewHtml: string; // CKEditor 5 rich HTML overview
  specGroups: FusionTechSpecGroup[];
  specs?: Record<string, string>;
  whatsInTheBox?: string[];
  warrantyInfo?: string;
  shippingInfo?: string;
  seo?: {
    metaTitle: string;
    metaDescription: string;
    keywords?: string[];
    focusKeyword?: string;
    ogImage?: string;
    score?: number;
  };
  updatedAt: string;
}

export interface FusionBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  bodyHtml?: string;
  author: string;
  category: string;
  status: "published" | "draft";
  publishedAt: string;
  readTime: string;
  image: string;
  tags?: string[];
  seo?: {
    metaTitle: string;
    metaDescription: string;
    focusKeyword?: string;
    ogImage?: string;
    score?: number;
  };
}

export interface FusionRole {
  id: string;
  name: string;
  slug: "admin" | "editor" | "customer";
  description: string;
  userCount: number;
  permissions: {
    canManageProducts: boolean;
    canManageUsers: boolean;
    canManageBlogs: boolean;
    canManageOrders: boolean;
    canAccessSettings: boolean;
  };
}

export interface FusionDashboardStats {
  totalRevenue: string;
  totalOrders: number;
  totalProducts: number;
  activeClients: number;
  publishedBlogs: number;
  serverStatus: "online" | "synced" | "standby";
  version: string;
}

// Initial Fusion Categories
export const INITIAL_FUSION_CATEGORIES: FusionCategory[] = [
  {
    id: "cat-headphones",
    name: "Headphones & Audio",
    slug: "headphones",
    brand: "soundcore",
    description: "ANC Earbuds, Over-Ear Headphones, and Party Speakers",
    icon: "Headphones",
    sortOrder: 1,
    isFeaturedHome: true,
    isActive: true,
    productCount: 2,
    subcategories: [
      {
        id: "sub-tws",
        categoryId: "cat-headphones",
        name: "True Wireless Earbuds",
        slug: "true-wireless-earbuds",
        description: "Adaptive ANC earbuds with spatial audio & smart cases",
        productCount: 2,
        isActive: true,
        sortOrder: 1,
      },
      {
        id: "sub-over-ear",
        categoryId: "cat-headphones",
        name: "Over-Ear Headphones",
        slug: "over-ear-headphones",
        description: "Hi-Res LDAC wireless headphones for travel and office",
        productCount: 0,
        isActive: true,
        sortOrder: 2,
      },
      {
        id: "sub-open-ear",
        categoryId: "cat-headphones",
        name: "Open-Ear Sports",
        slug: "open-ear-sports",
        description: "Comfortable situational awareness audio for runners",
        productCount: 0,
        isActive: true,
        sortOrder: 3,
      },
    ],
  },
  {
    id: "cat-charging",
    name: "Charging & Power",
    slug: "charging",
    brand: "anker",
    description: "GaN Prime Chargers, High-Capacity Power Banks, and Qi2 Docks",
    icon: "Zap",
    sortOrder: 2,
    isFeaturedHome: true,
    isActive: true,
    productCount: 3,
    subcategories: [
      {
        id: "sub-power-banks",
        categoryId: "cat-charging",
        name: "Power Banks",
        slug: "power-banks",
        description: "Multi-device laptop and phone battery packs with smart displays",
        productCount: 1,
        isActive: true,
        sortOrder: 1,
      },
      {
        id: "sub-chargers",
        categoryId: "cat-charging",
        name: "Wall & Desktop Chargers",
        slug: "wall-chargers",
        description: "Compact multi-port GaNPrime chargers up to 250W",
        productCount: 1,
        isActive: true,
        sortOrder: 2,
      },
      {
        id: "sub-wireless",
        categoryId: "cat-charging",
        name: "Wireless & Qi2 Chargers",
        slug: "wireless-chargers",
        description: "Magnetic 15W Qi2 certified folding stands and pads",
        productCount: 1,
        isActive: true,
        sortOrder: 3,
      },
      {
        id: "sub-power-stations",
        categoryId: "cat-charging",
        name: "Portable Power Stations",
        slug: "power-stations",
        description: "Long-lasting LiFePO4 batteries for camping & home backup",
        productCount: 0,
        isActive: true,
        sortOrder: 4,
      },
    ],
  },
  {
    id: "cat-security",
    name: "Security Cameras",
    slug: "security-cameras",
    brand: "eufy",
    description: "Forever Solar 4K Security Systems, Wired Cams & Video Doorbells",
    icon: "Shield",
    sortOrder: 3,
    isFeaturedHome: true,
    isActive: true,
    productCount: 2,
    subcategories: [
      {
        id: "sub-solar-cams",
        categoryId: "cat-security",
        name: "Solar & Battery Cameras",
        slug: "solar-cameras",
        description: "Continuous solar harvesting with no recurring monthly fees",
        productCount: 1,
        isActive: true,
        sortOrder: 1,
      },
      {
        id: "sub-pan-tilt",
        categoryId: "cat-security",
        name: "Pan & Tilt Indoor Cams",
        slug: "indoor-cameras",
        description: "360-degree AI human and pet tracking cameras",
        productCount: 1,
        isActive: true,
        sortOrder: 2,
      },
      {
        id: "sub-doorbells",
        categoryId: "cat-security",
        name: "Smart Doorbells & Chimes",
        slug: "smart-doorbells",
        description: "Dual-camera doorbells with package detection",
        productCount: 0,
        isActive: true,
        sortOrder: 3,
      },
    ],
  },
  {
    id: "cat-vacuums",
    name: "Robot Vacuums & Garden",
    slug: "robot-vacuums",
    brand: "eufy",
    description: "Autonomous Laser Robot Vacuums, Washers, and Robotic Mowers",
    icon: "Layers",
    sortOrder: 4,
    isFeaturedHome: true,
    isActive: true,
    productCount: 1,
    subcategories: [
      {
        id: "sub-mowers",
        categoryId: "cat-vacuums",
        name: "Robot Lawn Mowers",
        slug: "robot-mowers",
        description: "Wire-free AI boundary navigation robotic mowers",
        productCount: 1,
        isActive: true,
        sortOrder: 1,
      },
      {
        id: "sub-robovacs",
        categoryId: "cat-vacuums",
        name: "Robot Vacuums & Mops",
        slug: "robot-vacuums-mops",
        description: "Self-emptying and self-washing all-in-one stations",
        productCount: 0,
        isActive: true,
        sortOrder: 2,
      },
    ],
  },
  {
    id: "cat-speakers",
    name: "Speakers & Party Audio",
    slug: "speakers",
    brand: "soundcore",
    description: "Waterproof Bluetooth Speakers, Party Lighting, and Boomboxes",
    icon: "Radio",
    sortOrder: 5,
    isFeaturedHome: false,
    isActive: true,
    productCount: 1,
    subcategories: [
      {
        id: "sub-party-speakers",
        categoryId: "cat-speakers",
        name: "Party & Outdoor Speakers",
        slug: "party-speakers",
        description: "160W+ high-output speakers with synched beat-driven lightshow",
        productCount: 1,
        isActive: true,
        sortOrder: 1,
      },
      {
        id: "sub-portable-speakers",
        categoryId: "cat-speakers",
        name: "Portable Bluetooth Speakers",
        slug: "portable-speakers",
        description: "Compact IPX7 waterproof speakers for on-the-go audio",
        productCount: 0,
        isActive: true,
        sortOrder: 2,
      },
    ],
  },
  {
    id: "cat-baby",
    name: "Baby & Nursery",
    slug: "baby",
    brand: "eufy",
    description: "Smart Baby Monitors, Bottle Washers & Sterilizers",
    icon: "HeartHandshake",
    sortOrder: 6,
    isFeaturedHome: false,
    isActive: true,
    productCount: 1,
    subcategories: [
      {
        id: "sub-bottle-washers",
        categoryId: "cat-baby",
        name: "Bottle Washers & Cleaners",
        slug: "bottle-washers",
        description: "Automatic wash, sterilize, and steam-dry stations",
        productCount: 1,
        isActive: true,
        sortOrder: 1,
      },
      {
        id: "sub-baby-monitors",
        categoryId: "cat-baby",
        name: "Smart Baby Monitors",
        slug: "baby-monitors",
        description: "2K video baby monitors with cry detection and pan-tilt",
        productCount: 0,
        isActive: true,
        sortOrder: 2,
      },
    ],
  },
];

// Initial Rich Products (10 Flagship Products Matching Reference Storefront)
export const INITIAL_FUSION_PRODUCTS: FusionProduct[] = [
  {
    id: "prod-1",
    slug: "d1204",
    title: "Liberty 5 Pro Max｜AI Recording Earbuds with Smart Case",
    subtitle: "Real-time AI Note-Taker with 1.78\" AMOLED Display and Adaptive ANC 3.0",
    sku: "A3954H11",
    brand: "soundcore",
    brandDisplay: "soundcore by Anker",
    categoryId: "cat-headphones",
    category: "Headphones",
    subcategoryId: "sub-tws",
    subcategory: "True Wireless Earbuds",
    price: "2 690 000 so'm",
    numericPrice: 2690000,
    wasPrice: "2 990 000 so'm",
    discountPill: "-10%",
    currency: "so'm",
    stock: 14,
    inventoryStatus: "in_stock",
    lowStockThreshold: 5,
    status: "published",
    badges: ["New", "Hot", "Best Seller"],
    image: "/images/1204_black.png",
    gallery: [
      { id: "g1", url: "/images/1204_black.png", altText: "Liberty 5 Pro Max Midnight Black Case & Buds", isPrimary: true, colorway: "Midnight Black", sortOrder: 1 },
      { id: "g2", url: "/images/d1204g11_moments2_1.png", altText: "Liberty 5 Pro Max Lifestyle Wear", isPrimary: false, colorway: "Midnight Black", sortOrder: 2 },
      { id: "g3", url: "/images/d1204_instant_pure_silence_black.png", altText: "Acoustic Sensor Array Breakdown", isPrimary: false, colorway: "Midnight Black", sortOrder: 3 },
      { id: "g4", url: "/images/d1204z11_dtc_listing_banner_mrc_td02_us_v1.jpg", altText: "Smart Screen UI in Action", isPrimary: false, colorway: "Midnight Black", sortOrder: 4 },
    ],
    overviewHtml: `
      <h2>The World's First True AI Recording Earbuds</h2>
      <p>The <strong>soundcore Liberty 5 Pro Max</strong> redefines professional audio. Equipped with a high-resolution 1.78" AMOLED touchscreen case, 8 environmental acoustic sensors, and the proprietary ANKER Thus™ AI processing unit.</p>
      <ul>
        <li><strong>On-Device Meeting Transcription:</strong> Offline voice-to-text recording with Ask Anka AI summary synthesis.</li>
        <li><strong>Adaptive ANC 3.0:</strong> Calibrates noise cancellation 384,000 times per second across 3 scenario modes.</li>
        <li><strong>Studio Coaxial Drivers:</strong> 11mm woofer + Knowles balanced armature with LDAC Hi-Res Wireless certification.</li>
        <li><strong>10-Sensor Whisper-Clear Mic Array:</strong> 6 beamforming microphones + 4 bone-conduction voice pickup sensors for noisy environments.</li>
      </ul>
      <p>Enjoy up to 50 hours of total playback with Qi fast wireless charging and multi-point Bluetooth 5.4 connectivity.</p>
    `,
    specGroups: [
      {
        id: "sg-audio",
        groupName: "Acoustics & Drivers",
        items: [
          { key: "Driver Architecture", value: "Coaxial Dual Drivers (11mm Dynamic + Knowles Balanced Armature)" },
          { key: "Frequency Response", value: "20 Hz - 40 kHz (Hi-Res Audio Certified)" },
          { key: "Codecs Supported", value: "LDAC, AAC, SBC, LC3" },
          { key: "Active Noise Cancellation", value: "Real-time Adaptive ANC 3.0 (-50dB depth)" },
        ],
      },
      {
        id: "sg-battery",
        groupName: "Battery & Power",
        items: [
          { key: "Playtime (ANC Off)", value: "Up to 10 hours per charge / 50 hours total with case" },
          { key: "Playtime (ANC On)", value: "Up to 8 hours per charge / 40 hours total with case" },
          { key: "Fast Charging", value: "10 minutes charge = 4 hours playback" },
          { key: "Charging Interface", value: "USB-C & Qi Wireless Charging" },
        ],
      },
      {
        id: "sg-smart",
        groupName: "Smart Features & AI",
        items: [
          { key: "Smart Case Display", value: "1.78\" AMOLED Touchscreen (468×368 px)" },
          { key: "AI Engine", value: "ANKER Thus™ 150× Neural Processing Unit" },
          { key: "Microphone Array", value: "10 Sensors (6 Beamforming Mics + 4 Bone Conduction VPUs)" },
          { key: "Water Resistance", value: "IPX5 Sweat & Water Resistant" },
        ],
      },
    ],
    whatsInTheBox: [
      "soundcore Liberty 5 Pro Max Earbuds",
      "AMOLED Smart Touch Charging Case",
      "6 Pairs of Liquid Silicone Ear Tips (XS/S/M/L/XL/XXL)",
      "USB-C to USB-C Fast Charging Cable",
      "Quick Start Guide & Safety Manual",
    ],
    warrantyInfo: "24-Month Nordic Warranty with hassle-free replacement.",
    shippingInfo: "Free express shipping across Sweden, Norway, Denmark, and Finland (1-3 business days).",
    seo: {
      metaTitle: "soundcore Liberty 5 Pro Max | AI Recording Earbuds | Anker Nordics",
      metaDescription: "Experience the soundcore Liberty 5 Pro Max with 1.78\" AMOLED smart screen, on-device AI meeting transcription, and Adaptive ANC 3.0.",
    },
    updatedAt: "2026-09-19",
  },
  {
    id: "prod-2",
    slug: "d1205",
    title: "soundcore P42i ANC Wireless Earbuds",
    subtitle: "Compact Adaptive Noise Cancelling with 2-in-1 Phone Stand Case",
    sku: "A3948G11",
    brand: "soundcore",
    brandDisplay: "soundcore by Anker",
    categoryId: "cat-headphones",
    category: "Headphones",
    subcategoryId: "sub-tws",
    subcategory: "True Wireless Earbuds",
    price: "665 000 so'm",
    numericPrice: 665000,
    wasPrice: "850 000 so'm",
    discountPill: "-22%",
    currency: "so'm",
    stock: 28,
    inventoryStatus: "in_stock",
    status: "published",
    badges: ["Best Seller"],
    image: "/images/d1205_pc_1664x640_2.png",
    gallery: [
      { id: "g1", url: "/images/d1205_pc_1664x640_2.png", altText: "soundcore P42i Case and Earbuds", isPrimary: true, sortOrder: 1 },
      { id: "g2", url: "/images/1204_black.png", altText: "soundcore P42i Earbuds Close-up", isPrimary: false, sortOrder: 2 },
    ],
    overviewHtml: `
      <h2>Smart Everyday Noise Cancelling with Built-In Phone Stand</h2>
      <p>The <strong>soundcore P42i</strong> offers powerful 11mm composite drivers with BassUp™ technology and smart adaptive noise cancelling that silences up to 45dB of background ambient noise.</p>
      <ul>
        <li><strong>2-in-1 Pop-Out Phone Stand:</strong> Prop your smartphone up for hands-free video calls anywhere.</li>
        <li><strong>60-Hour Total Playback:</strong> 12 hours on a single charge with fast USB-C topping.</li>
        <li><strong>AI Clear Calling:</strong> 4 beamforming microphones with deep-learning noise suppression.</li>
      </ul>
    `,
    specGroups: [
      {
        id: "sg-audio",
        groupName: "Audio & Performance",
        items: [
          { key: "Driver Unit", value: "11mm High-Elastic Composite Drivers" },
          { key: "Noise Reduction", value: "Hybrid Adaptive ANC (-45dB)" },
          { key: "Playtime", value: "12 hours (Buds) / 60 hours (Case)" },
        ],
      },
    ],
    updatedAt: "2026-09-19",
  },
  {
    id: "prod-3",
    slug: "a110ah11",
    title: "Anker Prime Power Bank (26K, 300W)",
    subtitle: "Ultra-High Capacity Smart Portable Charger with Color TFT Display",
    sku: "A110AH11",
    brand: "anker",
    brandDisplay: "Anker Prime",
    categoryId: "cat-charging",
    category: "Charging",
    subcategoryId: "sub-power-banks",
    subcategory: "Power Banks",
    price: "1 992 000 so'm",
    numericPrice: 1992000,
    wasPrice: "2 490 000 so'm",
    discountPill: "-20%",
    currency: "so'm",
    stock: 9,
    inventoryStatus: "low_stock",
    lowStockThreshold: 10,
    status: "published",
    badges: ["Hot", "Best Seller"],
    image: "/images/frame_2121237348.png",
    gallery: [
      { id: "g1", url: "/images/frame_2121237348.png", altText: "Anker Prime 26K 300W Power Bank", isPrimary: true, sortOrder: 1 },
      { id: "g2", url: "/images/chargers_-_a2687.png", altText: "Anker Prime Connected", isPrimary: false, sortOrder: 2 },
    ],
    overviewHtml: `
      <h2>300W Extreme Output for Laptops & Professional Gear</h2>
      <p>The <strong>Anker Prime 26,000mAh Power Bank</strong> delivers a massive combined 300W output with dual 140W USB-C ports capable of fast-charging two 16" MacBook Pros simultaneously.</p>
      <ul>
        <li><strong>Smart Digital Display:</strong> Real-time wattage output, battery health, and estimated recharge times.</li>
        <li><strong>Airline-Approved 26,000mAh:</strong> Travel-safe lithium chemistry built for transatlantic flights.</li>
        <li><strong>ActiveShield™ 2.0:</strong> 3 million daily temperature checks for safety and longevity.</li>
      </ul>
    `,
    specGroups: [
      {
        id: "sg-power",
        groupName: "Power Specifications",
        items: [
          { key: "Total Output", value: "300W Max (140W USB-C1 + 140W USB-C2 + 22.5W USB-A)" },
          { key: "Battery Capacity", value: "26,000mAh (99.32Wh Airline Approved)" },
          { key: "Input Recharge", value: "140W Fast Input (Fully charges in 45 minutes)" },
        ],
      },
    ],
    updatedAt: "2026-09-18",
  },
  {
    id: "prod-4",
    slug: "a2687",
    title: "Anker Prime Charger (160W, 3 Ports, Smart Display)",
    subtitle: "GaNPrime Desktop & Wall Charger with Interactive Status Screen",
    sku: "A2687311",
    brand: "anker",
    brandDisplay: "Anker Prime",
    categoryId: "cat-charging",
    category: "Charging",
    subcategoryId: "sub-chargers",
    subcategory: "Wall & Desktop Chargers",
    price: "1 285 000 so'm",
    numericPrice: 1285000,
    wasPrice: "1 690 000 so'm",
    discountPill: "-24%",
    currency: "so'm",
    stock: 22,
    inventoryStatus: "in_stock",
    status: "published",
    badges: ["Best Seller"],
    image: "/images/chargers_-_a2687.png",
    gallery: [
      { id: "g1", url: "/images/chargers_-_a2687.png", altText: "Anker Prime 160W Charger", isPrimary: true, sortOrder: 1 },
    ],
    overviewHtml: `
      <h2>Smart 160W High-Efficiency GaN Charger</h2>
      <p>Powered by Anker GaNPrime™ technology, this charger delivers up to 160W of fast charging across 3 ports with active temperature monitoring and smart wattage redistribution.</p>
    `,
    specGroups: [
      {
        id: "sg-specs",
        groupName: "Technical Specifications",
        items: [
          { key: "Max Wattage", value: "160W High-Speed Output" },
          { key: "Ports", value: "2 × USB-C, 1 × USB-A" },
          { key: "Protection", value: "ActiveShield™ 2.0 Temperature Protection" },
        ],
      },
    ],
    updatedAt: "2026-09-17",
  },
  {
    id: "prod-5",
    slug: "b25n1",
    title: "Anker 25W Max Palm-Sized 3-in-1 Wireless Charger",
    subtitle: "Foldable Magnetic Qi2 Travel Stand for iPhone, Apple Watch, and AirPods",
    sku: "B25N1011",
    brand: "anker",
    brandDisplay: "Anker MagGo",
    categoryId: "cat-charging",
    category: "Charging",
    subcategoryId: "sub-wireless",
    subcategory: "Wireless & Qi2 Chargers",
    price: "1 099 000 so'm",
    numericPrice: 1099000,
    wasPrice: "1 350 000 so'm",
    currency: "so'm",
    stock: 17,
    inventoryStatus: "in_stock",
    status: "published",
    badges: ["New"],
    image: "/images/frame_2147238602.png",
    gallery: [
      { id: "g1", url: "/images/frame_2147238602.png", altText: "Anker 3-in-1 Wireless Charger Stand", isPrimary: true, sortOrder: 1 },
    ],
    overviewHtml: `
      <h2>Certified Qi2 15W Ultra-Fast Magnetic Charging</h2>
      <p>Folds down to the size of a deck of cards. Charge your phone, watch, and earbuds simultaneously with certified 15W Qi2 wireless alignment.</p>
    `,
    specGroups: [
      {
        id: "sg-wireless",
        groupName: "Wireless Charging",
        items: [
          { key: "Qi2 Wireless Speed", value: "Certified 15W Magnetic Fast Charge" },
          { key: "Watch Module", value: "Official Apple Watch Fast Charger Certified" },
          { key: "Form Factor", value: "Ultra-Compact Foldable Origami Design" },
        ],
      },
    ],
    updatedAt: "2026-09-16",
  },
  {
    id: "prod-6",
    slug: "t814x321",
    title: "eufyCam C37 Dual-Cam 4K Solar Security System",
    subtitle: "Forever Power Solar Outdoor Security Camera with 8× Hybrid Zoom",
    sku: "T814X321",
    brand: "eufy",
    brandDisplay: "eufy Security",
    categoryId: "cat-security",
    category: "Security Cameras",
    subcategoryId: "sub-solar-cams",
    subcategory: "Solar & Battery Cameras",
    price: "2 199 000 so'm",
    numericPrice: 2199000,
    wasPrice: "2 599 000 so'm",
    currency: "so'm",
    stock: 8,
    inventoryStatus: "low_stock",
    status: "published",
    badges: ["Hot", "New"],
    image: "/images/t814x_banner_listing_image_01_no_copy_1060x1060px_3.png",
    gallery: [
      { id: "g1", url: "/images/t814x_banner_listing_image_01_no_copy_1060x1060px_3.png", altText: "eufyCam C37 Dual-Cam Solar Unit", isPrimary: true, sortOrder: 1 },
    ],
    overviewHtml: `
      <h2>4K Dual-Camera Detail with Forever Solar Power</h2>
      <p>Never climb a ladder to recharge your security camera again. With high-efficiency integrated solar panels, just 2 hours of sunlight per day keeps eufyCam C37 powered year-round.</p>
      <ul>
        <li><strong>Dual-Lens 4K Clarity:</strong> Wide-angle telephoto combo tracks moving intruders up to 15 meters away.</li>
        <li><strong>Zero Monthly Fees:</strong> Local encrypted storage on HomeBase with BionicMind™ AI face recognition.</li>
      </ul>
    `,
    specGroups: [
      {
        id: "sg-cam",
        groupName: "Camera & Optics",
        items: [
          { key: "Resolution", value: "4K UHD (3840×2160) + 2K Telephoto" },
          { key: "Night Vision", value: "Full-Color Starlight Sensor with 100-lumen spotlight" },
          { key: "Power", value: "Integrated Solar Panel + 13,400mAh rechargeable battery" },
        ],
      },
    ],
    updatedAt: "2026-09-15",
  },
  {
    id: "prod-7",
    slug: "t817l420",
    title: "eufy Wired Cam C31 2K Pan & Tilt Security Camera",
    subtitle: "360° AI Indoor Pet & Human Tracking Camera with Privacy Shutter",
    sku: "T817L420",
    brand: "eufy",
    brandDisplay: "eufy Security",
    categoryId: "cat-security",
    category: "Security Cameras",
    subcategoryId: "sub-pan-tilt",
    subcategory: "Pan & Tilt Indoor Cams",
    price: "649 000 so'm",
    numericPrice: 649000,
    wasPrice: "799 000 so'm",
    currency: "so'm",
    stock: 31,
    inventoryStatus: "in_stock",
    status: "published",
    badges: ["Best Seller"],
    image: "/images/frame_2147226853-1.png",
    gallery: [
      { id: "g1", url: "/images/frame_2147226853-1.png", altText: "eufy Indoor Cam C31 Pan & Tilt", isPrimary: true, sortOrder: 1 },
    ],
    overviewHtml: `
      <h2>Keep an Eye on Every Corner of Your Home</h2>
      <p>360° horizontal and 96° vertical coverage ensures no blind spots. Features smart AI human and pet detection with automated physical privacy shutter.</p>
    `,
    specGroups: [
      {
        id: "sg-indoor",
        groupName: "Indoor Surveillance",
        items: [
          { key: "Resolution", value: "2K Quad HD (2304×1296)" },
          { key: "Field of View", value: "360° Horizontal Pan, 96° Vertical Tilt" },
          { key: "Storage", value: "MicroSD support up to 128GB / HomeBase compatible" },
        ],
      },
    ],
    updatedAt: "2026-09-14",
  },
  {
    id: "prod-8",
    slug: "t2880",
    title: "eufy Robot Mower E15 with AI Auto-Mapping",
    subtitle: "Boundary Wire-Free RTK + Vision Smart Robotic Lawn Mower",
    sku: "T2880G11",
    brand: "eufy",
    brandDisplay: "eufy Clean",
    categoryId: "cat-vacuums",
    category: "Robot Vaccums",
    subcategoryId: "sub-mowers",
    subcategory: "Robot Lawn Mowers",
    price: "11 990 000 so'm",
    numericPrice: 11990000,
    wasPrice: "13 500 000 so'm",
    currency: "so'm",
    stock: 6,
    inventoryStatus: "low_stock",
    status: "published",
    badges: ["New", "Hot"],
    image: "/images/lawn_mowers_-_eufy_robot_mower_e15_-_t2880_1.png",
    gallery: [
      { id: "g1", url: "/images/lawn_mowers_-_eufy_robot_mower_e15_-_t2880_1.png", altText: "eufy Robot Mower E15", isPrimary: true, sortOrder: 1 },
    ],
    overviewHtml: `
      <h2>Wire-Free Precision Mowing with Centimeter Accuracy</h2>
      <p>No perimeter wires needed. Utilizing satellite RTK guidance and 3D stereo vision cameras, the eufy Mower E15 maps complex lawns in minutes and handles slopes up to 45% (24°).</p>
    `,
    specGroups: [
      {
        id: "sg-mower",
        groupName: "Mowing & Navigation",
        items: [
          { key: "Coverage Area", value: "Up to 1,500 m² (0.37 acres)" },
          { key: "Navigation System", value: "RTK-GNSS + Stereo Vision AI Obstacle Avoidance" },
          { key: "Cutting Height", value: "25mm - 75mm (Electrically Adjustable)" },
        ],
      },
    ],
    updatedAt: "2026-09-13",
  },
  {
    id: "prod-9",
    slug: "t600p082",
    title: "eufy Baby Bottle Washer S1 Pro",
    subtitle: "All-in-One Automatic Wash, Steam Sterilize, and Medical-Grade Dry",
    sku: "T600P082",
    brand: "eufy",
    brandDisplay: "eufy Baby",
    categoryId: "cat-baby",
    category: "Baby",
    subcategoryId: "sub-bottle-washers",
    subcategory: "Bottle Washers & Cleaners",
    price: "3 499 000 so'm",
    numericPrice: 3499000,
    wasPrice: "3 999 000 so'm",
    currency: "so'm",
    stock: 19,
    inventoryStatus: "in_stock",
    status: "published",
    badges: ["New"],
    image: "/images/frame_2147238600.png",
    gallery: [
      { id: "g1", url: "/images/frame_2147238600.png", altText: "eufy Baby Bottle Washer S1 Pro", isPrimary: true, sortOrder: 1 },
    ],
    overviewHtml: `
      <h2>Save 30 Minutes Every Day on Baby Care</h2>
      <p>Washes, steam-sterilizes (99.999% germ elimination), and dries up to 4 baby bottles, pump parts, and pacifiers in one automated 68-minute cycle.</p>
    `,
    specGroups: [
      {
        id: "sg-baby",
        groupName: "Sanitization & Capacity",
        items: [
          { key: "Capacity", value: "4 Bottles + Pump Parts & Accessories" },
          { key: "Sterilization", value: "100°C High-Pressure Steam (99.999% efficacy)" },
          { key: "Drying", value: "HEPA-Filtered Hot Air Medical Drying" },
        ],
      },
    ],
    updatedAt: "2026-09-12",
  },
  {
    id: "prod-10",
    slug: "a31a3",
    title: "soundcore Rave 3S Outdoor Portable Hi-Res Party Speaker",
    subtitle: "160W Extreme Bass with Beat-Synched 360° RGB Halo Lights",
    sku: "A31A3011",
    brand: "soundcore",
    brandDisplay: "soundcore by Anker",
    categoryId: "cat-speakers",
    category: "Speakers",
    subcategoryId: "sub-party-speakers",
    subcategory: "Party & Outdoor Speakers",
    price: "1 890 000 so'm",
    numericPrice: 1890000,
    wasPrice: "2 190 000 so'm",
    currency: "so'm",
    stock: 16,
    inventoryStatus: "in_stock",
    status: "published",
    badges: ["Hot"],
    image: "/images/speakers_-_rave_3s_-_a31a3_1.png",
    gallery: [
      { id: "g1", url: "/images/speakers_-_rave_3s_-_a31a3_1.png", altText: "soundcore Rave 3S Party Speaker", isPrimary: true, sortOrder: 1 },
    ],
    overviewHtml: `
      <h2>Thunderous Bass for Outdoor Gatherings and Parties</h2>
      <p>160W peak acoustic power with dual 5.25" subwoofers, IPX4 splash protection, and 18 hours of continuous battery life to keep the music going anywhere.</p>
    `,
    specGroups: [
      {
        id: "sg-speaker",
        groupName: "Acoustics & Power",
        items: [
          { key: "Peak Output", value: "160W High-Impact Sound" },
          { key: "Battery Life", value: "18 Hours Continuous Playback" },
          { key: "Water Resistance", value: "IPX4 Splashproof" },
        ],
      },
    ],
    updatedAt: "2026-09-11",
  },
];

export const INITIAL_FUSION_USERS: FusionUser[] = [
  {
    id: "usr-1",
    name: "Alex Lindqvist (Super Admin)",
    email: "alex.admin@ankernordics.com",
    role: "admin",
    status: "active",
    createdAt: "2026-01-10",
    ordersCount: 12,
    totalSpent: "34 890 000 so'm",
    phone: "+46 70 123 4567",
    address: "Kungsgatan 44, Stockholm",
  },
  {
    id: "usr-2",
    name: "Klara Johansen",
    email: "klara.content@ankernordics.com",
    role: "editor",
    status: "active",
    createdAt: "2026-02-14",
    ordersCount: 4,
    totalSpent: "8 490 000 so'm",
    phone: "+47 91 234 567",
    address: "Karl Johans gate 12, Oslo",
  },
  {
    id: "usr-3",
    name: "Erik Nilsson",
    email: "erik.nilsson@example.se",
    role: "customer",
    status: "active",
    createdAt: "2026-05-20",
    ordersCount: 2,
    totalSpent: "4 682 000 so'm",
    phone: "+46 73 987 6543",
    address: "Avenyn 18, Gothenburg",
  },
  {
    id: "usr-4",
    name: "Sofie Møller",
    email: "sofie.m@example.dk",
    role: "customer",
    status: "active",
    createdAt: "2026-06-11",
    ordersCount: 1,
    totalSpent: "2 690 000 so'm",
    phone: "+45 20 123 456",
    address: "Strøget 5, Copenhagen",
  },
  {
    id: "usr-5",
    name: "Jari Korhonen",
    email: "jari.k@example.fi",
    role: "customer",
    status: "active",
    createdAt: "2026-07-02",
    ordersCount: 3,
    totalSpent: "7 120 000 so'm",
    phone: "+358 40 123 4567",
    address: "Mannerheimintie 22, Helsinki",
  },
];

export const INITIAL_FUSION_BLOGS: FusionBlogPost[] = [
  {
    id: "blog-1",
    slug: "introducing-liberty-5-pro-max",
    title: "Introducing Liberty 5 Pro Max: AI Transcription Meets Audiophile Sound",
    excerpt: "Discover how on-device AI and the 1.78\" AMOLED Smart Case revolutionize meeting productivity and noise cancellation.",
    body: "The soundcore Liberty 5 Pro Max is engineered for professionals who demand studio acoustics alongside real-time productivity tools. With 10 integrated sensors and the ANKER Thus™ AI chip...",
    bodyHtml: `
      <p>The <strong>soundcore Liberty 5 Pro Max</strong> is engineered for professionals who demand studio acoustics alongside real-time productivity tools.</p>
      <h2>Meeting Notes Done Effortlessly</h2>
      <p>Never scramble for a pen in meetings again. The integrated voice recording suite captures speakers with pristine accuracy, processing local speech-to-text directly on the case.</p>
      <blockquote>"The smartest audio hardware release of 2026." — Nordic Tech Review</blockquote>
      <h3>Key Innovations</h3>
      <ul>
        <li>AES-256 local encrypted memory</li>
        <li>Instant audio transcription via Ask Anka AI</li>
        <li>10-mic acoustic array eliminating background noise</li>
      </ul>
    `,
    author: "Klara Johansen",
    category: "Product Launch",
    status: "published",
    publishedAt: "2026-09-12",
    readTime: "4 min read",
    image: "/images/1204_black.png",
    tags: ["soundcore", "Liberty", "AI", "Audio"],
  },
  {
    id: "blog-2",
    slug: "qi2-wireless-charging-guide",
    title: "Qi2 Wireless Charging Explained: What Nordic Users Need to Know",
    excerpt: "Everything you need to know about the Qi2 magnetic standard, 15W fast charging, and active cooling technology.",
    body: "Qi2 delivers true universal magnetic alignment and certified 15W wireless charging across Apple and Android ecosystems. Anker's new MagGo line features proprietary ActiveCooling...",
    bodyHtml: `
      <p>Qi2 is the latest magnetic wireless charging standard developed by the Wireless Power Consortium (WPC), bringing MagSafe-grade 15W speeds to both Apple and Android devices.</p>
      <h2>Why Temperature Management Matters</h2>
      <p>High charging speed creates heat, which throttles charging rate. Anker's proprietary ActiveShield™ ensures continuous maximum throughput without battery degradation.</p>
    `,
    author: "Alex Lindqvist",
    category: "Guides & Tech",
    status: "published",
    publishedAt: "2026-08-28",
    readTime: "5 min read",
    image: "/images/frame_2147238602.png",
    tags: ["Anker", "Qi2", "MagGo", "FastCharging"],
  },
  {
    id: "blog-3",
    slug: "solar-security-in-nordic-winters",
    title: "How Forever Solar Security Cameras Perform in Nordic Winter Light",
    excerpt: "Testing eufyCam C37 and S3 Pro in low-light Nordic conditions: battery benchmarks and solar harvesting curves.",
    body: "Nordic winters are notorious for short daylight hours. With eufy's high-efficiency monocrystalline solar cells, just 2 hours of indirect ambient light is enough to maintain 365-day autonomy...",
    bodyHtml: `
      <p>Nordic winters present a unique challenge for solar hardware: short daylight windows and sub-zero temperatures.</p>
      <h2>Laboratory & Field Test Findings</h2>
      <p>In field trials across Stockholm and Tromsø, eufy's high-efficiency monocrystalline solar cells required only 1.8 to 2.2 hours of indirect daylight to offset 24 hours of standard security monitoring.</p>
    `,
    author: "Henrik Bergström",
    category: "Smart Home",
    status: "published",
    publishedAt: "2026-08-15",
    readTime: "6 min read",
    image: "/images/t814x_banner_listing_image_01_no_copy_1060x1060px_3.png",
    tags: ["eufy", "Security", "Solar", "Nordic"],
  },
];

export const INITIAL_FUSION_ROLES: FusionRole[] = [
  {
    id: "role-admin",
    name: "Administrator",
    slug: "admin",
    description: "Full system control, client access, inventory management, role assignments, and server settings.",
    userCount: 1,
    permissions: {
      canManageProducts: true,
      canManageUsers: true,
      canManageBlogs: true,
      canManageOrders: true,
      canAccessSettings: true,
    },
  },
  {
    id: "role-editor",
    name: "Content Editor",
    slug: "editor",
    description: "Create and publish blog posts, update product descriptions and images. No access to user management or billing.",
    userCount: 1,
    permissions: {
      canManageProducts: true,
      canManageUsers: false,
      canManageBlogs: true,
      canManageOrders: false,
      canAccessSettings: false,
    },
  },
  {
    id: "role-customer",
    name: "Customer / Client",
    slug: "customer",
    description: "Registered storefront client. View order receipts, manage personal address and wishlist.",
    userCount: 3,
    permissions: {
      canManageProducts: false,
      canManageUsers: false,
      canManageBlogs: false,
      canManageOrders: false,
      canAccessSettings: false,
    },
  },
];

export const INITIAL_FUSION_STATS: FusionDashboardStats = {
  totalRevenue: "248 500 000 so'm",
  totalOrders: 64,
  totalProducts: INITIAL_FUSION_PRODUCTS.length,
  activeClients: INITIAL_FUSION_USERS.length,
  publishedBlogs: INITIAL_FUSION_BLOGS.length,
  serverStatus: "synced",
  version: "FusionCMS v6.4.1 Standard",
};

export const INITIAL_FUSION_DISCOUNTS: FusionDiscount[] = [
  {
    id: "disc-1",
    code: "NORDIC20",
    title: "Nordic Autumn Storewide Sale",
    type: "percentage",
    value: 20,
    scope: "storewide",
    minSpend: 500000,
    maxUses: 500,
    usedCount: 142,
    startDate: "2026-09-01",
    endDate: "2026-10-31",
    status: "active",
    createdAt: "2026-09-01",
    updatedAt: "2026-09-19",
    revenueGenerated: 184500000,
    savingsGenerated: 36900000,
  },
  {
    id: "disc-2",
    code: "SOUNDCORE15",
    title: "Soundcore Audiophile Exclusive",
    type: "percentage",
    value: 15,
    scope: "category",
    targetIds: ["cat-headphones", "Headphones"],
    minSpend: 0,
    maxUses: 250,
    usedCount: 88,
    startDate: "2026-09-10",
    endDate: "2026-10-15",
    status: "active",
    createdAt: "2026-09-10",
    updatedAt: "2026-09-19",
    revenueGenerated: 92400000,
    savingsGenerated: 13860000,
  },
  {
    id: "disc-3",
    code: "CHARGING50",
    title: "50 000 so'm Off High-Speed GaN Chargers & Power Banks",
    type: "fixed",
    value: 50000,
    scope: "category",
    targetIds: ["cat-charging", "Charging"],
    minSpend: 400000,
    maxUses: 300,
    usedCount: 215,
    startDate: "2026-09-01",
    endDate: "2026-09-30",
    status: "active",
    createdAt: "2026-09-01",
    updatedAt: "2026-09-19",
    revenueGenerated: 64200000,
    savingsGenerated: 10750000,
  },
  {
    id: "disc-4",
    code: "SECURE25",
    title: "eufyCam 4K Solar Security Camera Flash Promo",
    type: "percentage",
    value: 25,
    scope: "product",
    targetIds: ["prod-6", "t814x321"],
    minSpend: 1500000,
    maxUses: 100,
    usedCount: 47,
    startDate: "2026-09-15",
    endDate: "2026-10-01",
    status: "active",
    createdAt: "2026-09-15",
    updatedAt: "2026-09-19",
    revenueGenerated: 77500000,
    savingsGenerated: 25800000,
  },
];

