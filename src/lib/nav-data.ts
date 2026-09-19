export interface MegaTabProduct {
  title: string;
  image: string;
  badges: string[];
  href: string;
}

export interface MegaSidebarTab {
  id: string;
  name: string;
  viewMoreHref: string;
  products: MegaTabProduct[];
}

export interface MegaMenuData {
  triggerLabel: string;
  bottomCta: {
    text: string;
    href: string;
  };
  sidebarTabs: MegaSidebarTab[];
}

export const MEGA_MENUS: Record<string, MegaMenuData> = {
  "Security Cameras": {
    triggerLabel: "Security Cameras",
    bottomCta: {
      text: "View all eufy Security",
      href: "/products/t814x321",
    },
    sidebarTabs: [
      {
        id: "ptz-camera",
        name: "PTZ Camera",
        viewMoreHref: "/products/t814x321",
        products: [
          {
            title: "eufyCam C37 2K Smart Security Camera CCTV with Solar panel",
            image: "/images/t814x_banner_listing_image_01_no_copy_1060x1060px_3.png",
            badges: ["New"],
            href: "/products/t814x321",
          },
          {
            title: "eufyCam S4 (4K Bullet + 2K PTZ)",
            image: "/images/outdoor_cameras_-_eufycam_s4_-_t8172.png",
            badges: ["New"],
            href: "/products/t814x321",
          },
          {
            title: "SoloCam S340 Wireless Outdoor Security Camera with Dual Lens and Solar",
            image: "/images/t814x_banner_listing_image_01_no_copy_1060x1060px_2.png",
            badges: ["Best Seller"],
            href: "/products/t814x321",
          },
          {
            title: "eufy SoloCam E42",
            image: "/images/outdoor_cameras_-_eufycam_s4_-_t8172.png",
            badges: ["New"],
            href: "/products/t814x321",
          },
          {
            title: "eufy PoE NVR Security System S4 Max",
            image: "/images/poe_cameras_-_nvr_security_system_s4_max_8_channels_nvr_with_4_poe_bul.png",
            badges: ["Hot", "New"],
            href: "/products/t814x321",
          },
          {
            title: "eufy PoE NVR Security System S4 with 2× Bullet-PTZ-Cameras and 2× Bullet-...",
            image: "/images/poe_cameras_-_nvr_security_system_s4_max_8_channels_nvr_with_4_poe_bul.png",
            badges: ["New"],
            href: "/products/t814x321",
          },
          {
            title: "eufy PoE NVR Security System S4 with 2× Bullet-PTZ-Cameras and 2× Turret-...",
            image: "/images/poe_cameras_-_nvr_security_system_s4_max_8_channels_nvr_with_4_poe_bul.png",
            badges: ["New"],
            href: "/products/t814x321",
          },
          {
            title: "eufy PTZ-Bullet PoE Cam S4 Add-On",
            image: "/images/outdoor_cameras_-_eufycam_s4_-_t8172.png",
            badges: ["New"],
            href: "/products/t814x321",
          },
          {
            title: "eufy SoloCam E30",
            image: "/images/t814x_banner_listing_image_01_no_copy_1060x1060px_3.png",
            badges: [],
            href: "/products/t814x321",
          },
        ],
      },
      {
        id: "indoor-camera",
        name: "Indoor Camera",
        viewMoreHref: "/products/t817l420",
        products: [
          {
            title: "eufy Wired Cam C31 2K Pan & Tilt 360° AI Patrol",
            image: "/images/frame_2147226853-1.png",
            badges: ["Best Seller"],
            href: "/products/t817l420",
          },
          {
            title: "Indoor Cam S350 Dual-Lens 4K Ultra Wide & Telephoto",
            image: "/images/indoor_cameras_-_indoor_cam_s350_-_t8416_1.png",
            badges: ["New"],
            href: "/products/t817l420",
          },
          {
            title: "Indoor Cam C220 2K Pan & Tilt Pet Detection",
            image: "/images/frame_2147226853-1.png",
            badges: ["Hot"],
            href: "/products/t817l420",
          },
          {
            title: "eufy Security Video Baby Monitor with Cry Detection",
            image: "/images/frame_2147238600.png",
            badges: ["Award Winner"],
            href: "/products/t600p082",
          },
        ],
      },
      {
        id: "outdoor-camera",
        name: "Outdoor Camera",
        viewMoreHref: "/products/t814x321",
        products: [
          {
            title: "eufyCam C37 Dual-Cam 4K Solar Security System",
            image: "/images/t814x_banner_listing_image_01_no_copy_1060x1060px_3.png",
            badges: ["Flagship"],
            href: "/products/t814x321",
          },
          {
            title: "eufyCam S3 Pro 4K Solar Security Camera",
            image: "/images/outdoor_cameras_-_eufycam_s4_-_t8172.png",
            badges: ["New"],
            href: "/products/t814x321",
          },
          {
            title: "Floodlight Cam E340 360° Pan-and-Tilt",
            image: "/images/smart_lights_-_permanent_outdoor_light_s4.png",
            badges: ["Best Seller"],
            href: "/products/t814x321",
          },
          {
            title: "Wall Light Cam S100 with Motion Sensor",
            image: "/images/smart_lights_-_permanent_outdoor_light_s4.png",
            badges: [],
            href: "/products/t814x321",
          },
        ],
      },
      {
        id: "video-doorbell",
        name: "Video Doorbell",
        viewMoreHref: "/products/t814x321",
        products: [
          {
            title: "Video Doorbell Dual 2K (Battery-Powered) with Package Camera",
            image: "/images/t814x_banner_listing_image_01_no_copy_1060x1060px_3.png",
            badges: ["Best Seller"],
            href: "/products/t814x321",
          },
          {
            title: "Video Doorbell C30 2K Wired with Chime",
            image: "/images/frame_2147226853-1.png",
            badges: ["New"],
            href: "/products/t817l420",
          },
        ],
      },
      {
        id: "security-others",
        name: "Security Others",
        viewMoreHref: "/products/t814x321",
        products: [
          {
            title: "HomeBase 3 (S380) with Expandable 16TB BionicMind AI Storage",
            image: "/images/homebase_-_homebase_s380_homebase_3_-_t8030.png",
            badges: ["Essential"],
            href: "/products/t814x321",
          },
          {
            title: "eufy Solar Panel Charger for SoloCam & eufyCam",
            image: "/images/t814x_banner_listing_image_01_no_copy_1060x1060px_3.png",
            badges: ["Eco"],
            href: "/products/t814x321",
          },
        ],
      },
    ],
  },

  "Charging": {
    triggerLabel: "Charging",
    bottomCta: {
      text: "View all Anker Charging",
      href: "/products/a110ah11",
    },
    sidebarTabs: [
      {
        id: "power-bank",
        name: "Power Bank",
        viewMoreHref: "/products/a110ah11",
        products: [
          {
            title: "Anker Prime Power Bank (26K, 300W)",
            image: "/images/frame_2121237348.png",
            badges: ["Best Seller", "New"],
            href: "/products/a110ah11",
          },
          {
            title: "Anker Laptop Power Bank (25K, 165W, Built-In and Retractable Cables)",
            image: "/images/a1654_no_7.png",
            badges: ["Best Seller"],
            href: "/products/a110ah11",
          },
          {
            title: "Anker Prime 20,000mAh Power Bank (200W)",
            image: "/images/frame2121237302.png",
            badges: [],
            href: "/products/a110ah11",
          },
          {
            title: "Anker MagGo Power Bank (10K, Slim)",
            image: "/images/wireless_chargers_-_a25x7.png",
            badges: [],
            href: "/products/b25n1",
          },
          {
            title: "Anker MagGo Power Bank (10K)",
            image: "/images/power_banks_-_a110a_1.png",
            badges: [],
            href: "/products/b25n1",
          },
          {
            title: "Anker MagGo Power Bank (10K, 35W, For Apple Watch)",
            image: "/images/a1654_no_8_f50a2351-3931-4a6d-a9b9-d73db1fed721.png",
            badges: [],
            href: "/products/b25n1",
          },
          {
            title: "Anker Prime Power Bank (20K, 220W)",
            image: "/images/frame2121237302.png",
            badges: ["New"],
            href: "/products/a110ah11",
          },
          {
            title: "Anker 737 Power Bank (PowerCore 24K)",
            image: "/images/frame_2121237348.png",
            badges: [],
            href: "/products/a110ah11",
          },
          {
            title: "Anker Nano Power Bank (5K, MagGo, Slim)",
            image: "/images/power_banks_-_a110a_1.png",
            badges: ["Hot"],
            href: "/products/b25n1",
          },
        ],
      },
      {
        id: "charger",
        name: "Charger",
        viewMoreHref: "/products/a2687",
        products: [
          {
            title: "Anker Prime Charger (160W, 3 Ports, Smart Display)",
            image: "/images/chargers_-_a2687.png",
            badges: ["Best Seller", "New"],
            href: "/products/a2687",
          },
          {
            title: "Anker Nano 45W Smart Display Charger (2-Pack)",
            image: "/images/bundle-a121d311-2_rich_image_td01_en_v2.png",
            badges: ["New"],
            href: "/products/a2687",
          },
          {
            title: "Anker 735 Charger (Nano II 65W)",
            image: "/images/frame_212.png",
            badges: ["Popular"],
            href: "/products/a2687",
          },
          {
            title: "Anker 140W USB-C GaN Fast Charger",
            image: "/images/frame_1_3_1.png",
            badges: ["Flagship"],
            href: "/products/a2687",
          },
        ],
      },
      {
        id: "cable",
        name: "Cable",
        viewMoreHref: "/products/a2687",
        products: [
          {
            title: "Anker USB-C to USB-C Cable (240W, Upcycled-Braided, 1.8m)",
            image: "/images/cables_-_a88e2_1.png",
            badges: ["Eco"],
            href: "/products/a2687",
          },
          {
            title: "Anker PowerLine III Flow Silicone USB-C Cable (100W)",
            image: "/images/cables_-_a88e2_1.png",
            badges: ["Soft Touch"],
            href: "/products/a2687",
          },
        ],
      },
      {
        id: "hubs-docks",
        name: "Hubs & Docks",
        viewMoreHref: "/products/a110ah11",
        products: [
          {
            title: "Anker Nano USB-C Hub (8-in-1, Dual Display, 85W PD)",
            image: "/images/a210b.png",
            badges: ["Best Seller"],
            href: "/products/a110ah11",
          },
          {
            title: "Anker 575 USB-C Docking Station (13-in-1, Triple Display)",
            image: "/images/hubs_and_docks_-_a83b3.png",
            badges: ["Pro Workstation"],
            href: "/products/a110ah11",
          },
        ],
      },
      {
        id: "wireless",
        name: "Wireless",
        viewMoreHref: "/products/b25n1",
        products: [
          {
            title: "Anker 25W Max Palm-Sized 3-in-1 Wireless Charger (Qi2)",
            image: "/images/frame_2147238602.png",
            badges: ["Qi2 Certified", "New"],
            href: "/products/b25n1",
          },
          {
            title: "Anker MagGo Wireless Charging Station (Foldable 3-in-1)",
            image: "/images/wireless_chargers_-_a25x7.png",
            badges: ["Best Seller"],
            href: "/products/b25n1",
          },
        ],
      },
    ],
  },

  "Headphones": {
    triggerLabel: "Headphones",
    bottomCta: {
      text: "View all soundcore Audio",
      href: "/products/d1204",
    },
    sidebarTabs: [
      {
        id: "true-wireless",
        name: "True Wireless Earbuds",
        viewMoreHref: "/products/d1204",
        products: [
          {
            title: "Liberty 5 Pro Max｜AI Recording Earbuds with Smart Case",
            image: "/images/1204_black.png",
            badges: ["Best Seller", "New"],
            href: "/products/d1204",
          },
          {
            title: "soundcore P42i ANC Wireless Earbuds with 60h Playtime",
            image: "/images/d1205_pc_1664x640_2.png",
            badges: ["New"],
            href: "/products/d1205",
          },
          {
            title: "soundcore Liberty 4 NC Adaptive Active Noise Cancelling",
            image: "/images/true_wireless_earbuds_-_liberty_5_-_a3957_1.png",
            badges: ["Top Pick"],
            href: "/products/d1204",
          },
          {
            title: "soundcore Space A40 Ultra-Compact Hi-Res Earbuds",
            image: "/images/1200_1200-2.png",
            badges: [],
            href: "/products/d1205",
          },
        ],
      },
      {
        id: "over-ear",
        name: "Over-Ear Headphones",
        viewMoreHref: "/products/d1204",
        products: [
          {
            title: "soundcore Space One Pro Foldable Flagship ANC",
            image: "/images/1204_gold.png",
            badges: ["Flagship"],
            href: "/products/d1204",
          },
          {
            title: "soundcore Space Q45 All-Day Travel Headphones",
            image: "/images/1204_black.png",
            badges: ["65h Battery"],
            href: "/products/d1204",
          },
        ],
      },
      {
        id: "open-ear",
        name: "Open-Ear & Sports",
        viewMoreHref: "/products/d1204",
        products: [
          {
            title: "soundcore AeroFit Pro 2 Open-Ear Air-Conduction Earbuds",
            image: "/images/open-ear_earbuds_-_aerofit_pro_2_-_a3875_1.png",
            badges: ["Comfort Fit"],
            href: "/products/d1204",
          },
          {
            title: "soundcore Sport X20 Rotatable Earhooks with SweatGuard",
            image: "/images/true_wireless_earbuds_-_liberty_5_-_a3957_1.png",
            badges: ["Workout"],
            href: "/products/d1205",
          },
        ],
      },
      {
        id: "voice-recorder",
        name: "AI Voice Recorders",
        viewMoreHref: "/products/d1204",
        products: [
          {
            title: "soundcore Work AI Voice Recorder with Ask Anka Integration",
            image: "/images/voice_recorders_-_soundcore_work_ai_recorder_-_d3200.png",
            badges: ["New", "AI Powered"],
            href: "/products/d1204",
          },
        ],
      },
    ],
  },

  "Robot Vaccums": {
    triggerLabel: "Robot Vaccums",
    bottomCta: {
      text: "View all eufy Clean",
      href: "/products/t2880",
    },
    sidebarTabs: [
      {
        id: "all-in-one",
        name: "All-in-One Stations",
        viewMoreHref: "/products/t2880",
        products: [
          {
            title: "eufy Clean X10 Pro Omni Robot Vacuum & Mop with Self-Washing",
            image: "/images/1tb_1.png",
            badges: ["Best Seller", "Flagship"],
            href: "/products/t2880",
          },
          {
            title: "eufy Omni C20 Compact Smart Station Mop & Vacuum",
            image: "/images/1tb_1.png",
            badges: ["New"],
            href: "/products/t2880",
          },
        ],
      },
      {
        id: "robot-mowers",
        name: "Robotic Mowers",
        viewMoreHref: "/products/t2880",
        products: [
          {
            title: "eufy Robot Mower E15 Wire-Free RTK Satellite Navigation",
            image: "/images/lawn_mowers_-_eufy_robot_mower_e15_-_t2880_1.png",
            badges: ["Innovation", "New"],
            href: "/products/t2880",
          },
        ],
      },
      {
        id: "stick-handheld",
        name: "Handheld & Stick",
        viewMoreHref: "/products/t2880",
        products: [
          {
            title: "eufy HomeVac H30 Infinity Cordless Stick Vacuum",
            image: "/images/1tb_1.png",
            badges: [],
            href: "/products/t2880",
          },
        ],
      },
    ],
  },

  "Speakers": {
    triggerLabel: "Speakers",
    bottomCta: {
      text: "View all soundcore Speakers",
      href: "/products/a31a3",
    },
    sidebarTabs: [
      {
        id: "spatial-audio",
        name: "Spatial & Hi-Res Audio",
        viewMoreHref: "/products/a31a3",
        products: [
          {
            title: "soundcore Rave 3S Outdoor Portable Hi-Res Party Speaker",
            image: "/images/speakers_-_rave_3s_-_a31a3_1.png",
            badges: ["Best Seller", "Spatial Audio"],
            href: "/products/a31a3",
          },
          {
            title: "soundcore Motion X600 Sky-Channel Spatial Audio Speaker",
            image: "/images/speakers_-_rave_3s_-_a31a3_1.png",
            badges: ["Award Winner"],
            href: "/products/a31a3",
          },
        ],
      },
      {
        id: "outdoor-boom",
        name: "Party & Outdoor",
        viewMoreHref: "/products/a31a3",
        products: [
          {
            title: "soundcore Boom 2 Plus 140W Monster Bass Speaker",
            image: "/images/speakers_-_rave_3s_-_a31a3_1.png",
            badges: ["BassUp 2.0"],
            href: "/products/a31a3",
          },
        ],
      },
    ],
  },

  "Projectors": {
    triggerLabel: "Projectors",
    bottomCta: {
      text: "View all Nebula Projectors",
      href: "/products/t814x321",
    },
    sidebarTabs: [
      {
        id: "cinema-4k",
        name: "Laser & 4K Cinema",
        viewMoreHref: "/products/t814x321",
        products: [
          {
            title: "Nebula Cosmos 4K SE Laser Smart Home Theater",
            image: "/images/smart_projectors_-_x1_-_d2351_1.png",
            badges: ["Dolby Vision", "New"],
            href: "/products/t814x321",
          },
          {
            title: "Nebula Mars 3 Outdoor 1000 ANSI Lumens Portable Cinema",
            image: "/images/smart_projectors_-_x1_-_d2351_1.png",
            badges: ["Waterproof"],
            href: "/products/t814x321",
          },
        ],
      },
      {
        id: "pocket-portable",
        name: "Pocket & Portable",
        viewMoreHref: "/products/t814x321",
        products: [
          {
            title: "Nebula Capsule 3 Laser 1080p Pocket Projector",
            image: "/images/smart_projectors_-_x1_-_d2351_1.png",
            badges: ["Best Seller"],
            href: "/products/t814x321",
          },
        ],
      },
    ],
  },

  "Baby": {
    triggerLabel: "Baby",
    bottomCta: {
      text: "View all eufy Baby",
      href: "/products/t600p082",
    },
    sidebarTabs: [
      {
        id: "bottle-care",
        name: "Bottle & Feeding Care",
        viewMoreHref: "/products/t600p082",
        products: [
          {
            title: "eufy Baby Bottle Washer S1 Pro with Water Softener",
            image: "/images/frame_2147238600.png",
            badges: ["Award Winner", "New"],
            href: "/products/t600p082",
          },
          {
            title: "eufy Wearable Breast Pump S2 Pro with Heated Massage",
            image: "/images/breast_pumps_-_wearable_breast_pump_s1_pro.png",
            badges: ["Comfort Fit"],
            href: "/products/t600p082",
          },
        ],
      },
      {
        id: "smart-nursery",
        name: "Smart Nursery",
        viewMoreHref: "/products/t600p082",
        products: [
          {
            title: "eufy Smart Baby Monitor E21 with Split-Screen & Zoom",
            image: "/images/frame_2147238600.png",
            badges: ["Top Rated"],
            href: "/products/t600p082",
          },
        ],
      },
    ],
  },

  "Deals": {
    triggerLabel: "Deals",
    bottomCta: {
      text: "View All Special Promotions",
      href: "/products/a110ah11",
    },
    sidebarTabs: [
      {
        id: "hot-deals",
        name: "Today's Best Deals",
        viewMoreHref: "/products/a110ah11",
        products: [
          {
            title: "Anker Prime Power Bank (26K, 300W) - 20% Off",
            image: "/images/frame_2121237348.png",
            badges: ["Save 20%", "Hot"],
            href: "/products/a110ah11",
          },
          {
            title: "soundcore P42i Active Noise Cancelling - 22% Off",
            image: "/images/d1205_pc_1664x640_2.png",
            badges: ["Save 22%"],
            href: "/products/d1205",
          },
          {
            title: "Anker Prime Charger (160W, 3 Ports) - 24% Off",
            image: "/images/chargers_-_a2687.png",
            badges: ["Save 24%"],
            href: "/products/a2687",
          },
        ],
      },
      {
        id: "bundle-deals",
        name: "Bundle Savings",
        viewMoreHref: "/products/a110ah11",
        products: [
          {
            title: "Anker Prime Charger + Power Bank Ultimate Travel Bundle",
            image: "/images/frame_1_3_1.png",
            badges: ["Save 32%"],
            href: "/products/a110ah11",
          },
        ],
      },
    ],
  },

  "New Release": {
    triggerLabel: "New Release",
    bottomCta: {
      text: "Explore All 2026 Launches",
      href: "/products/d1204",
    },
    sidebarTabs: [
      {
        id: "latest-launches",
        name: "Latest 2026 Products",
        viewMoreHref: "/products/d1204",
        products: [
          {
            title: "Liberty 5 Pro Max｜AI Recording Earbuds with Smart Case",
            image: "/images/1204_black.png",
            badges: ["New Flagship", "Hot"],
            href: "/products/d1204",
          },
          {
            title: "Anker 25W Max 3-in-1 Qi2 Foldable Wireless Charger",
            image: "/images/frame_2147238602.png",
            badges: ["Qi2 Fast", "New"],
            href: "/products/b25n1",
          },
          {
            title: "eufy Robot Mower E15 with Virtual Boundary Cut",
            image: "/images/lawn_mowers_-_eufy_robot_mower_e15_-_t2880_1.png",
            badges: ["Autonomous", "New"],
            href: "/products/t2880",
          },
        ],
      },
    ],
  },

  "About Anker Nordics": {
    triggerLabel: "About Anker Nordics",
    bottomCta: {
      text: "Learn More About Anker",
      href: "/",
    },
    sidebarTabs: [
      {
        id: "our-story",
        name: "About Us",
        viewMoreHref: "/",
        products: [
          {
            title: "Pioneering GaN Technology & Charging Innovation",
            image: "/images/frame_2121237348.png",
            badges: ["Innovation"],
            href: "/",
          },
          {
            title: "Eco-Friendly Packaging & Carbon Neutral Commitment",
            image: "/images/cables_-_a88e2_1.png",
            badges: ["Sustainability"],
            href: "/",
          },
        ],
      },
    ],
  },

  "Help and Support": {
    triggerLabel: "Help and Support",
    bottomCta: {
      text: "Visit Support Center",
      href: "/help",
    },
    sidebarTabs: [
      {
        id: "customer-care",
        name: "Customer Support",
        viewMoreHref: "/help",
        products: [
          {
            title: "Track Your Nordic PostNord / DHL Shipment",
            image: "/images/1204_black.png",
            badges: ["Tracking"],
            href: "/checkout",
          },
          {
            title: "Register Your Official 18-Month Nordic Warranty",
            image: "/images/frame_2121237348.png",
            badges: ["Warranty"],
            href: "/help",
          },
        ],
      },
    ],
  },
};
