export interface ProductColor {
  key: string;
  label: string;
  image: string;
  hex?: string;
}

export interface ProductHighlight {
  title: string;
  description: string;
}

export interface DetailedProduct {
  id: string;
  slug: string;
  aliases?: string[];
  title: string;
  subtitle: string;
  brand: "soundcore" | "anker" | "eufy";
  brandDisplay: string;
  category: string;
  categorySlug: string;
  price: string;
  numericPrice: number;
  wasPrice?: string;
  discountPill?: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  sku: string;
  mainImage: string;
  galleryImages: string[];
  colors: ProductColor[];
  highlights: ProductHighlight[];
  specs: Record<string, string>;
  whatsInTheBox: string[];
  warrantyInfo: string;
  shippingInfo: string;
}

export const PRODUCTS: DetailedProduct[] = [
  {
    id: "d1204",
    slug: "d1204",
    aliases: ["soundcore-liberty-5-pro-max", "liberty-5-pro-max"],
    title: "Liberty 5 Pro Max｜AI Recording Earbuds with Smart Case",
    subtitle: "AI Note-Taker, 1.78\" AMOLED Display, HearID 5.0 and Whisper-Clear Calls",
    brand: "soundcore",
    brandDisplay: "soundcore by Anker",
    category: "Headphones",
    categorySlug: "true-wireless-earbuds",
    price: "2 690 000 so'm",
    numericPrice: 2690000,
    wasPrice: "2 990 000 so'm",
    discountPill: "-10%",
    rating: 4.9,
    reviewCount: 69,
    inStock: true,
    stockCount: 14,
    sku: "A3954H11",
    mainImage: "/images/1204_black.png",
    galleryImages: [
      "/images/1204_black.png",
      "/images/1204_gold.png",
      "/images/d1204_instant_pure_silence_black.png",
      "/images/d1204g11_moments2_1.png",
      "/images/d1204z11_dtc_listing_carousel_mrc_td01_us_v1.png",
      "/images/d1204z11_dtc_listing_carousel_mrc_td02_us_v1.png",
    ],
    colors: [
      { key: "black", label: "Midnight Black", image: "/images/1204_black.png", hex: "#1C1C1E" },
      { key: "gold", label: "Champagne Gold", image: "/images/1204_gold.png", hex: "#D4AF37" },
    ],
    highlights: [
      {
        title: "AI Note-Taker & Offline Transcription",
        description: "Record offline meetings with 10-sensor array and transcribe on demand into structured action summaries with Ask Anka AI.",
      },
      {
        title: "1.78\" AMOLED Smart Case Display",
        description: "Full touchscreen smart case allows ANC adjustments, custom wallpapers, and recording control without touching your phone.",
      },
      {
        title: "Instant Pure Silence (Adaptive ANC 3.0)",
        description: "Thus™ AI chip processes 384K+ noise signals per second, delivering up to 98.5% adaptive ambient noise reduction.",
      },
      {
        title: "HearID 5.0 Sound Profile",
        description: "Personalised hearing curve with custom 10-band EQ and dual coaxial drivers for lossless LDAC Hi-Res Wireless audio.",
      },
    ],
    specs: {
      "Frequency Response": "20 Hz - 40 kHz",
      "Bluetooth Version": "Bluetooth 5.4 (Multipoint)",
      "Codecs Supported": "LDAC, AAC, SBC",
      "Playtime": "Up to 10 hours (40 hours with Smart Case)",
      "Fast Charging": "10 min charge = 4 hours playtime",
      "Water Resistance": "IPX5 water-resistant",
      "Microphones": "6 beamforming mics + 4 bone-conduction sensors",
    },
    whatsInTheBox: [
      "soundcore Liberty 5 Pro Max Earbuds",
      "AMOLED Smart Touch Charging Case",
      "Silicone Ear Tips (XS, S, M, L, XL)",
      "Braided USB-C to USB-C Charging Cable",
      "Quick Start Guide & Safety Manual",
    ],
    warrantyInfo: "18-month hassle-free manufacturer warranty and lifetime technical support.",
    shippingInfo: "Free shipping across the Nordics. Delivery within 2–4 business days via PostNord.",
  },
  {
    id: "d1205",
    slug: "d1205",
    aliases: ["soundcore-p42i", "p42i"],
    title: "soundcore P42i ANC Wireless Earbuds",
    subtitle: "Quiet The Noise, Focus on What Matters Most",
    brand: "soundcore",
    brandDisplay: "soundcore by Anker",
    category: "Headphones",
    categorySlug: "true-wireless-earbuds",
    price: "665 000 so'm",
    numericPrice: 665000,
    wasPrice: "850 000 so'm",
    discountPill: "-22%",
    rating: 4.8,
    reviewCount: 42,
    inStock: true,
    stockCount: 28,
    sku: "A3948G11",
    mainImage: "/images/d1205_pc_1664x640_2.png",
    galleryImages: [
      "/images/d1205_pc_1664x640_2.png",
      "/images/1200_1200-2.png",
      "/images/d1203z21_rich-image_elkjop_nod_soundcore_03_en_v1.png",
    ],
    colors: [
      { key: "black", label: "Matte Black", image: "/images/d1205_pc_1664x640_2.png", hex: "#1A1A1A" },
      { key: "white", label: "Pearl White", image: "/images/1200_1200-2.png", hex: "#F3F4F6" },
    ],
    highlights: [
      {
        title: "Smart Hybrid Active Noise Cancelling",
        description: "Reduces noise by up to 42 dB with multi-mode algorithms for commuting, office, and travel.",
      },
      {
        title: "11mm Oversized Composite Drivers",
        description: "BassUp™ technology delivers intense punch and clear vocal separation.",
      },
      {
        title: "60-Hour Total Playtime",
        description: "Get 12 hours of music on a single charge and 60 hours total with the ultra-compact case.",
      },
    ],
    specs: {
      "Driver Size": "11mm Dynamic",
      "Battery Life": "12 hrs (single) / 60 hrs (case)",
      "Water Resistance": "IPX5",
      "Bluetooth": "5.3",
    },
    whatsInTheBox: [
      "soundcore P42i Earbuds",
      "Charging Case",
      "3 Sizes of Ear Tips",
      "USB-C Cable",
      "Quick Start Guide",
    ],
    warrantyInfo: "18-month warranty with 30-day money-back guarantee.",
    shippingInfo: "Standard shipping 2–4 business days. Free delivery on orders above 500 000 so'm.",
  },
  {
    id: "a110ah11",
    slug: "a110ah11",
    aliases: ["anker-prime-power-bank-26k", "prime-26k"],
    title: "Anker Prime Power Bank (26K, 300W)",
    subtitle: "High-Capacity Ultra-Fast Multi-Device Portable Charger",
    brand: "anker",
    brandDisplay: "Anker Prime",
    category: "Charging",
    categorySlug: "power-banks",
    price: "1 992 000 so'm",
    numericPrice: 1992000,
    wasPrice: "2 490 000 so'm",
    discountPill: "-20%",
    rating: 4.9,
    reviewCount: 185,
    inStock: true,
    stockCount: 9,
    sku: "A110AH11",
    mainImage: "/images/frame_2121237348.png",
    galleryImages: [
      "/images/frame_2121237348.png",
      "/images/frame2121237302.png",
      "/images/power_banks_-_a110a_1.png",
    ],
    colors: [
      { key: "black", label: "Space Gray", image: "/images/frame_2121237348.png", hex: "#374151" },
    ],
    highlights: [
      {
        title: "300W Maximum Combined Output",
        description: "Equipped with dual 140W USB-C ports to fast-charge two laptops simultaneously at peak speed.",
      },
      {
        title: "26,000 mAh Monster Capacity",
        description: "Recharge a MacBook Pro 16\" up to 1.3 times or an iPhone 16 up to 5 times.",
      },
      {
        title: "Smart Digital Display",
        description: "Real-time readouts for wattage in/out, remaining battery percentage, and full recharge time.",
      },
    ],
    specs: {
      "Capacity": "26,000 mAh / 99.73Wh (Airline-Safe)",
      "Total Output": "300W Max",
      "Ports": "2 × USB-C, 1 × USB-A",
      "Recharge Time": "45 minutes to 80% (with 140W input)",
      "Weight": "665 g",
    },
    whatsInTheBox: [
      "Anker Prime 26K (300W) Power Bank",
      "140W USB-C to USB-C Braided Cable (0.6m)",
      "Travel Pouch",
      "Welcome Guide",
    ],
    warrantyInfo: "24-month manufacturer warranty with dedicated Nordic support.",
    shippingInfo: "Free express shipping across Sweden, Norway, Denmark, and Finland.",
  },
  {
    id: "a2687",
    slug: "a2687",
    aliases: ["anker-prime-charger-160w", "a2687-anker-prime-charger-160w-3-ports-gan"],
    title: "Anker Prime Charger (160W, 3 Ports, Smart Display)",
    subtitle: "GaN Fast Wall Charger with Real-Time Power Monitoring",
    brand: "anker",
    brandDisplay: "Anker Prime",
    category: "Charging",
    categorySlug: "chargers",
    price: "1 285 000 so'm",
    numericPrice: 1285000,
    wasPrice: "1 690 000 so'm",
    discountPill: "-24%",
    rating: 4.9,
    reviewCount: 98,
    inStock: true,
    stockCount: 22,
    sku: "A2687311",
    mainImage: "/images/chargers_-_a2687.png",
    galleryImages: [
      "/images/chargers_-_a2687.png",
      "/images/frame_20000.png",
    ],
    colors: [
      { key: "black", label: "Charcoal Black", image: "/images/chargers_-_a2687.png", hex: "#1F2937" },
    ],
    highlights: [
      {
        title: "160W Total GaN Fast Charging",
        description: "Power a MacBook, iPad, and iPhone simultaneously with dynamic power allocation.",
      },
      {
        title: "Integrated OLED Smart Display",
        description: "Monitors per-port wattage output and internal temperature status in real time.",
      },
      {
        title: "ActiveShield™ 3.0",
        description: "Monitors temperatures over 6 million times per day for ultimate device safety.",
      },
    ],
    specs: {
      "Total Wattage": "160W",
      "Ports": "2 × USB-C, 1 × USB-A",
      "Technology": "GaNPrime & ActiveShield 3.0",
      "Dimensions": "68 × 54 × 42 mm",
    },
    whatsInTheBox: [
      "Anker Prime 160W Wall Charger",
      "Instruction Manual",
    ],
    warrantyInfo: "24-month warranty coverage.",
    shippingInfo: "Free shipping for orders over 500 000 so'm. 2–3 business days delivery.",
  },
  {
    id: "b25n1",
    slug: "b25n1",
    aliases: ["anker-maggo-3-in-1", "wireless-charger-3-in-1"],
    title: "Anker 25W Max Palm-Sized 3-in-1 Wireless Charger",
    subtitle: "Qi2 Certified Fast Charging with Active Cooling for Apple Devices",
    brand: "anker",
    brandDisplay: "Anker MagGo",
    category: "Charging",
    categorySlug: "wireless-chargers",
    price: "1 099 000 so'm",
    numericPrice: 1099000,
    wasPrice: "1 350 000 so'm",
    discountPill: "-15%",
    rating: 4.7,
    reviewCount: 54,
    inStock: true,
    stockCount: 17,
    sku: "B25N1011",
    mainImage: "/images/frame_2147238602.png",
    galleryImages: [
      "/images/frame_2147238602.png",
      "/images/wireless_chargers_-_a25x7.png",
    ],
    colors: [
      { key: "black", label: "Obsidian Black", image: "/images/frame_2147238602.png", hex: "#111827" },
      { key: "white", label: "Cloud White", image: "/images/frame_2147238602.png", hex: "#F9FAFB" },
    ],
    highlights: [
      {
        title: "15W Ultra-Fast Qi2 Wireless",
        description: "Charges iPhone 15/16 twice as fast as standard 7.5W MagSafe chargers.",
      },
      {
        title: "Foldable Travel-Ready Design",
        description: "Compact origami-inspired folding structure fits neatly in your pocket or backpack.",
      },
      {
        title: "3-in-1 Simultaneous Power",
        description: "Simultaneously charges your iPhone, Apple Watch Ultra/Series, and AirPods Pro.",
      },
    ],
    specs: {
      "Wireless Standard": "Qi2 Certified (15W)",
      "Compatibility": "MagSafe iPhones, Apple Watch, Wireless Earbuds",
      "Power In": "40W USB-C PD adapter included",
      "Weight": "198 g",
    },
    whatsInTheBox: [
      "Anker 3-in-1 Wireless Charging Station",
      "40W USB-C PD Wall Charger",
      "1.5m Braided USB-C Cable",
      "User Manual",
    ],
    warrantyInfo: "24-month comprehensive warranty.",
    shippingInfo: "Ships immediately from regional Nordic warehouse.",
  },
  {
    id: "t814x321",
    slug: "t814x321",
    aliases: ["eufycam-c37", "eufycam-c37-dual-cam"],
    title: "eufyCam C37 Dual-Cam 4K Solar Security System",
    subtitle: "Total Coverage. Zero Hassle. Continuous Power with Forever Solar.",
    brand: "eufy",
    brandDisplay: "eufy Security",
    category: "Security Cameras",
    categorySlug: "outdoor-cameras",
    price: "2 199 000 so'm",
    numericPrice: 2199000,
    wasPrice: "2 599 000 so'm",
    discountPill: "-15%",
    rating: 4.8,
    reviewCount: 77,
    inStock: true,
    stockCount: 8,
    sku: "T814X321",
    mainImage: "/images/t814x_banner_listing_image_01_no_copy_1060x1060px_3.png",
    galleryImages: [
      "/images/t814x_banner_listing_image_01_no_copy_1060x1060px_3.png",
      "/images/outdoor_cameras_-_eufycam_s4_-_t8172.png",
      "/images/homebase_-_homebase_s380_homebase_3_-_t8030.png",
    ],
    colors: [
      { key: "white", label: "Arctic White", image: "/images/t814x_banner_listing_image_01_no_copy_1060x1060px_3.png", hex: "#FFFFFF" },
    ],
    highlights: [
      {
        title: "Dual 4K + 2K Telephoto Cameras",
        description: "See wide-angle panoramic view while capturing crisp license plates and faces up to 15m away with 8x digital zoom.",
      },
      {
        title: "Forever Power Solar Panel",
        description: "Built-in high-efficiency solar panel needs just 2 hours of direct Nordic sunlight daily to run continuously.",
      },
      {
        title: "Zero Monthly Fees",
        description: "Expandable local storage with HomeBase 3 ensures military-grade AES-128 encrypted security without subscription fees.",
      },
    ],
    specs: {
      "Resolution": "4K UHD (3840 × 2160)",
      "Night Vision": "Full Color with 100-lumen spotlight",
      "Battery Life": "Continuous with Solar / 365-day battery backup",
      "Weather Resistance": "IP67 Weatherproof (-20°C to 50°C)",
      "Storage": "16GB eMMC built-in, expandable up to 16TB",
    },
    whatsInTheBox: [
      "eufyCam C37 Camera Unit",
      "Integrated Solar Mount Bracket",
      "Screw Pack and Wall Anchors",
      "USB-C Charging Cable",
      "Quick Start Guide",
    ],
    warrantyInfo: "12-month replacement warranty with free firmware updates.",
    shippingInfo: "Free shipping across the Nordic region.",
  },
  {
    id: "t817l420",
    slug: "t817l420",
    aliases: ["eufy-wired-cam-c31", "wired-cam-c31"],
    title: "eufy Wired Cam C31 2K Pan & Tilt Security Camera",
    subtitle: "Auto Tracking, Indoors or Outdoors with 360° AI Patrol",
    brand: "eufy",
    brandDisplay: "eufy Security",
    category: "Security Cameras",
    categorySlug: "indoor-cameras",
    price: "649 000 so'm",
    numericPrice: 649000,
    wasPrice: "799 000 so'm",
    discountPill: "-19%",
    rating: 4.6,
    reviewCount: 38,
    inStock: true,
    stockCount: 31,
    sku: "T817L420",
    mainImage: "/images/frame_2147226853-1.png",
    galleryImages: [
      "/images/frame_2147226853-1.png",
      "/images/indoor_cameras_-_indoor_cam_s350_-_t8416_1.png",
    ],
    colors: [
      { key: "white", label: "Pure White", image: "/images/frame_2147226853-1.png", hex: "#FFFFFF" },
    ],
    highlights: [
      {
        title: "2K High Definition with 360° Pan & Tilt",
        description: "Zero blind spots. Pan 360° horizontally and tilt 100° vertically to track any movement automatically.",
      },
      {
        title: "On-Device AI Detection",
        description: "Distinguishes humans and pets instantly, sending targeted alerts to your phone.",
      },
      {
        title: "Two-Way Audio & Siren",
        description: "Communicate with visitors or deter intruders with an 85dB built-in siren.",
      },
    ],
    specs: {
      "Resolution": "2K QHD (2304 × 1296)",
      "Field of View": "360° horizontal coverage",
      "Connectivity": "2.4GHz Wi-Fi",
      "Power": "5V/2A Wired USB power adapter",
    },
    whatsInTheBox: [
      "eufy Wired Cam C31",
      "3-meter Power Cable & Adapter",
      "Wall Mount Plate & Screws",
      "Positioning Sticker",
    ],
    warrantyInfo: "12-month manufacturer warranty.",
    shippingInfo: "Standard 2–4 business days delivery.",
  },
  {
    id: "t2880",
    slug: "t2880",
    aliases: ["eufy-robot-mower-e15", "robot-mower-e15"],
    title: "eufy Robot Mower E15 with AI Auto-Mapping",
    subtitle: "Wire-Free Perimeter Navigation and Precision Boundary Cut",
    brand: "eufy",
    brandDisplay: "eufy Clean",
    category: "Robot Vaccums",
    categorySlug: "robot-vacuums",
    price: "11 990 000 so'm",
    numericPrice: 11990000,
    wasPrice: "13 500 000 so'm",
    discountPill: "-11%",
    rating: 4.8,
    reviewCount: 52,
    inStock: true,
    stockCount: 6,
    sku: "T2880G11",
    mainImage: "/images/lawn_mowers_-_eufy_robot_mower_e15_-_t2880_1.png",
    galleryImages: [
      "/images/lawn_mowers_-_eufy_robot_mower_e15_-_t2880_1.png",
      "/images/homebase_-_homebase_s380_homebase_3_-_t8030.png",
    ],
    colors: [
      { key: "gray", label: "Titanium Gray", image: "/images/lawn_mowers_-_eufy_robot_mower_e15_-_t2880_1.png", hex: "#4B5563" },
    ],
    highlights: [
      {
        title: "RTK & AI Vision Wire-Free Navigation",
        description: "No physical perimeter wires required. Sets up virtual lawn boundaries in minutes using satellite and dual-camera fusion.",
      },
      {
        title: "TerrainMaster™ All-Wheel Drive",
        description: "Easily climbs slopes up to 45% (24°) with high-traction off-road tread tires.",
      },
      {
        title: "Intelligent Rain & Obstacle Sensing",
        description: "Automatically detects hedgehogs, garden toys, and returns to dock during heavy rainfall.",
      },
    ],
    specs: {
      "Lawn Capacity": "Up to 1,500 m²",
      "Cutting Height": "25 mm - 75 mm (Electronic Adjustment)",
      "Max Incline": "45% (24°)",
      "Battery": "5,000 mAh Lithium-ion",
    },
    whatsInTheBox: [
      "eufy Robot Mower E15",
      "Smart Charging Dock & Power Supply",
      "RTK Reference Station & Mounting Pole",
      "Spare Blade Set (6 pcs)",
      "Quick Start Guide",
    ],
    warrantyInfo: "3-year manufacturer warranty with Nordic weather resistance guarantee.",
    shippingInfo: "Free scheduled courier delivery with white-glove pallet handling.",
  },
  {
    id: "t600p082",
    slug: "t600p082",
    aliases: ["eufy-bottle-washer-s1-pro", "eufy-bottle-washer-s1"],
    title: "eufy Baby Bottle Washer S1 Pro",
    subtitle: "World's First Bottle Washer with Water Softener & Medical-Grade Steam Sterilization",
    brand: "eufy",
    brandDisplay: "eufy Baby",
    category: "Baby",
    categorySlug: "baby",
    price: "3 499 000 so'm",
    numericPrice: 3499000,
    wasPrice: "3 999 000 so'm",
    discountPill: "-13%",
    rating: 4.9,
    reviewCount: 120,
    inStock: true,
    stockCount: 19,
    sku: "T600P082",
    mainImage: "/images/frame_2147238600.png",
    galleryImages: [
      "/images/frame_2147238600.png",
      "/images/breast_pumps_-_wearable_breast_pump_s1_pro.png",
    ],
    colors: [
      { key: "white", label: "Pearl White", image: "/images/frame_2147238600.png", hex: "#FAFAFA" },
    ],
    highlights: [
      {
        title: "Wash, Sterilize, and Dry in One Touch",
        description: "Cleans 4 bottles, pump parts, and accessories simultaneously in just 45 minutes.",
      },
      {
        title: "Built-In Water Softener",
        description: "Prevents stubborn limescale spots and milk film with self-regenerating resin filter.",
      },
      {
        title: "99.999% Steam Sterilization",
        description: "Hospital-grade high-temperature steam eliminates harmful bacteria, followed by HEPA-filtered hot air drying.",
      },
    ],
    specs: {
      "Capacity": "4 standard or wide-neck bottles + pump parts",
      "Cycle Duration": "Wash (15m), Sterilize (10m), Dry (30m)",
      "Filter": "H13 Medical HEPA Filter",
      "Power": "600W",
    },
    whatsInTheBox: [
      "eufy Baby Bottle Washer S1 Pro",
      "Accessory Basket",
      "Water Softening Salt Sample",
      "HEPA Replacement Filter",
      "User Manual",
    ],
    warrantyInfo: "24-month baby care warranty.",
    shippingInfo: "Free standard shipping across all Nordic countries.",
  },
  {
    id: "a31a3",
    slug: "a31a3",
    aliases: ["soundcore-rave-3s-speaker", "soundcore-motion-x600", "rave-3s"],
    title: "soundcore Rave 3S Outdoor Portable Hi-Res Party Speaker",
    subtitle: "World's First Portable Hi-Res Speaker with Sky-Channel Spatial Audio",
    brand: "soundcore",
    brandDisplay: "soundcore by Anker",
    category: "Speakers",
    categorySlug: "speakers",
    price: "1 890 000 so'm",
    numericPrice: 1890000,
    wasPrice: "2 290 000 so'm",
    discountPill: "-17%",
    rating: 4.9,
    reviewCount: 245,
    inStock: true,
    stockCount: 16,
    sku: "A31A3011",
    mainImage: "/images/speakers_-_rave_3s_-_a31a3_1.png",
    galleryImages: [
      "/images/speakers_-_rave_3s_-_a31a3_1.png",
      "/images/d1203z21_rich-image_elkjop_nod_soundcore_03_en_v1.png",
    ],
    colors: [
      { key: "polar-gray", label: "Polar Gray", image: "/images/speakers_-_rave_3s_-_a31a3_1.png", hex: "#4B5563" },
      { key: "aurora-green", label: "Aurora Green", image: "/images/speakers_-_rave_3s_-_a31a3_1.png", hex: "#065F46" },
    ],
    highlights: [
      {
        title: "Immersive Spatial Audio",
        description: "Sky-channel upward-firing driver expands acoustic headroom for room-filling concert sound.",
      },
      {
        title: "50W Hi-Res Audio Performance",
        description: "Dual neodymium woofers and silk dome tweeters deliver punchy bass and crystal highs up to 40kHz.",
      },
      {
        title: "IPX7 Waterproof with Built-In Handle",
        description: "Fully waterproof casing with premium aluminium carry handle — perfect for poolside or outdoor gatherings.",
      },
    ],
    specs: {
      "Output Power": "50W RMS",
      "Frequency Range": "40 Hz - 40 kHz",
      "Bluetooth": "5.3 (LDAC supported)",
      "Playtime": "Up to 12 hours",
      "Waterproofing": "IPX7 fully submersible",
    },
    whatsInTheBox: [
      "soundcore Rave 3S Speaker",
      "60cm USB-C to USB-C Charging Cable",
      "Quick Start Guide",
    ],
    warrantyInfo: "18-month warranty with lifetime customer care.",
    shippingInfo: "Free shipping across Sweden, Norway, Denmark, and Finland.",
  },
];

export function getProductBySlug(slug: string): DetailedProduct | undefined {
  const normalized = slug.toLowerCase().trim();
  return PRODUCTS.find(
    (p) =>
      p.id.toLowerCase() === normalized ||
      p.slug.toLowerCase() === normalized ||
      p.aliases?.some((a) => a.toLowerCase() === normalized)
  );
}

export function getRelatedProducts(currentId: string, count = 4): DetailedProduct[] {
  const current = PRODUCTS.find((p) => p.id === currentId);
  const sameCategory = PRODUCTS.filter((p) => p.id !== currentId && p.category === current?.category);
  const otherProducts = PRODUCTS.filter((p) => p.id !== currentId && p.category !== current?.category);
  return [...sameCategory, ...otherProducts].slice(0, count);
}
