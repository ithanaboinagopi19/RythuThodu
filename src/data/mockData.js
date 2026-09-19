export const INITIAL_FARMERS = [
  {
    id: "FARMER-101",
    name: "Ramesh Kumar",
    phone: "9876543210",
    village: "Tadikonda",
    district: "Guntur",
    state: "Andhra Pradesh",
    language: "te",
    mainCrop: "Tomato",
    experienceYears: 12,
    landSizeAcres: 3.5,
    avatar: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=200&auto=format&fit=crop&q=80"
  }
];

export const CROPS = [
  { id: "tomato", name: "Tomato", nameTe: "టమాటా", icon: "🍅", category: "Vegetables" },
  { id: "rice", name: "Rice", nameTe: "వరి (బియ్యం)", icon: "🌾", category: "Grains" },
  { id: "chilli", name: "Chilli", nameTe: "మిర్చి", icon: "🌶️", category: "Spices" },
  { id: "cotton", name: "Cotton", nameTe: "పత్తి", icon: "☁️", category: "Cash Crop" },
  { id: "maize", name: "Maize", nameTe: "జొన్న / మొక్కజొన్న", icon: "🌽", category: "Grains" },
  { id: "groundnut", name: "Groundnut", nameTe: "వేరుశనగ", icon: "🥜", category: "Oilseeds" }
];

export const DISEASES = [
  {
    id: "DIS-TOM-01",
    cropId: "tomato",
    cropName: "Tomato",
    cropNameTe: "టమాటా",
    name: "Late Blight",
    nameTe: "లేట్ బ్లైట్ (మచ్చ తెగులు)",
    scientificName: "Phytophthora infestans",
    confidence: 0.92,
    severity: "High",
    icon: "🍃",
    symptoms: [
      "Large dark brown to black oily spots on lower leaves",
      "White fuzzy mold underneath leaves during humid weather",
      "Stems show dark brown water-soaked lesions",
      "Fruit develops firm brown rot with bumpy surface"
    ],
    symptomsTe: [
      "ఆకులపై పెద్ద నల్లటి మరియు గోధుమ రంగు మచ్చలు ఏర్పడటం",
      "తేమ వాతావరణంలో ఆకుల వెనుక భాగంలో తెల్లని సమానమైన సిలీంధ్రం",
      "కాండంపై గోధుమ రంగు నీటి మచ్చలు కనపడటం",
      "కాయలపై గట్టి పచ్చటి గోధుమ రంగు మచ్చలు"
    ],
    quickAction: "Separate affected plants immediately and avoid overhead watering to prevent spore dispersal.",
    quickActionTe: "బాధిత మొక్కలను వెంటనే తొలగించండి మరియు ఆకులపై నేరుగా నీరు పోయడం ఆపండి."
  },
  {
    id: "DIS-RIC-01",
    cropId: "rice",
    cropName: "Rice",
    cropNameTe: "వరి",
    name: "Rice Blast",
    nameTe: "వరి అగ్గి తెగులు",
    scientificName: "Magnaporthe oryzae",
    confidence: 0.88,
    severity: "High",
    icon: "🌾",
    symptoms: [
      "Eye-shaped or diamond spots with grey centers on leaves",
      "Lesions enlarge and cause leaves to dry out completely",
      "Neck rot causing broken stems and empty grain panicles"
    ],
    symptomsTe: [
      "ఆకులపై కంటి ఆకారంలో బూడిద రంగు మచ్చలు",
      "ఎండిపోయిన ఆకులు మరియు విరిగిపోయిన గొలుసులు",
      "కంకి మెడ వద్ద నల్లబడి తాలు గింజలు రావడం"
    ],
    quickAction: "Reduce excess nitrogen application and drain standing water for 2 days if soil moisture permits.",
    quickActionTe: "యూరియా వాడకాన్ని తగ్గించండి మరియు పొలంలో నీటిని 2 రోజులు తీసివేయండి."
  },
  {
    id: "DIS-CHI-01",
    cropId: "chilli",
    cropName: "Chilli",
    cropNameTe: "మిర్చి",
    name: "Leaf Curl Virus",
    nameTe: "ఆకు ముడుత తెగులు",
    scientificName: "Begomovirus",
    confidence: 0.94,
    severity: "Medium",
    icon: "🌶️",
    symptoms: [
      "Upward curling and puckering of leaves",
      "Stunted plant growth and thickened veins",
      "Reduced flowering and small, malformed fruits"
    ],
    symptomsTe: [
      "ఆకులు పైకి ముడుచుకోవడం మరియు మందమవడం",
      "మొక్క ఎదుగుదల ఆగిపోవడం",
      "పూత రాలడం మరియు చిన్న కాయలు కాయడం"
    ],
    quickAction: "Control whiteflies using yellow sticky traps and neem oil spray.",
    quickActionTe: "పసుపు రంగు జిగురు కార్డులు మరియు వేప నూనె స్ప్రే ద్వారా తెల్ల దోమను అదుపు చేయండి."
  },
  {
    id: "DIS-COT-01",
    cropId: "cotton",
    cropName: "Cotton",
    cropNameTe: "పత్తి",
    name: "Bacterial Blight",
    nameTe: "బాక్టీరియల్ ఆకు మచ్చ తెగులు",
    scientificName: "Xanthomonas citri pv. malvacearum",
    confidence: 0.89,
    severity: "Medium",
    icon: "☁️",
    symptoms: [
      "Angular water-soaked spots bounded by leaf veins",
      "Black stem lesions causing stem breakage (blackarm stage)",
      "Dark sunken spots on cotton bolls"
    ],
    symptomsTe: [
      "ఈనెల మధ్య కోణీయ నీటి మచ్చలు",
      "కాండంపై నల్లటి మచ్చలు పడటం",
      "కాయలపై నల్లని మచ్చలు ఏర్పడటం"
    ],
    quickAction: "Prune infected lower leaves and apply copper hydroxide spray.",
    quickActionTe: "సోకిన క్రింది ఆకులను తొలగించి కాపర్ హైడ్రాక్సైడ్ స్ప్రే చేయండి."
  },
  {
    id: "DIS-MAI-01",
    cropId: "maize",
    cropName: "Maize",
    cropNameTe: "జొన్న / మొక్కజొన్న",
    name: "Fall Armyworm",
    nameTe: "కత్తెర పురుగు",
    scientificName: "Spodoptera frugiperda",
    confidence: 0.95,
    severity: "High",
    icon: "🌽",
    symptoms: [
      "Shot-hole damage on young leaves",
      "Massive whorl defoliation with dark sawdust-like frass",
      "Caterpillars with Y-shape mark on head present in leaf whorls"
    ],
    symptomsTe: [
      "ఆకులపై రంధ్రాలు మరియు సగం తినివేసిన ఆకులు",
      "సుడిలో పిప్పి మరియు పురుగు వ్యర్థాలు",
      "మొక్క సుడిలో వై (Y) ఆకారం తలపై ఉన్న పురుగులు"
    ],
    quickAction: "Apply sand + neem cake mixture directly into the central plant whorl.",
    quickActionTe: "మొక్క సుడిలో ఇసుక మరియు వేప పిండి మిశ్రమాన్ని చల్లండి."
  },
  {
    id: "DIS-GRO-01",
    cropId: "groundnut",
    cropName: "Groundnut",
    cropNameTe: "వేరుశనగ",
    name: "Tikka Leaf Spot",
    nameTe: "టిక్కా ఆకుమచ్చ తెగులు",
    scientificName: "Cercospora arachidicola",
    confidence: 0.91,
    severity: "Medium",
    icon: "🥜",
    symptoms: [
      "Circular dark brown spots surrounded by yellow halos",
      "Premature defoliation resulting in bare stems",
      "Weakened pod formation underground"
    ],
    symptomsTe: [
      "చుట్టూ పసుపు రంగు వలయంతో ఉన్న గుండ్రని గోధుమ మచ్చలు",
      "ఆకులు త్వరగా రాలిపోవడం",
      "కాయల ఊడలు బలహీనపడటం"
    ],
    quickAction: "Spray Mancozeb (75% WP) at 2g per liter of clean water.",
    quickActionTe: "లీటరు నీటికి 2 గ్రాముల మాంకోజెబ్ కలిపి పిచికారీ చేయండి."
  }
];

export const TREATMENTS = {
  "DIS-TOM-01": {
    diseaseId: "DIS-TOM-01",
    diseaseName: "Late Blight",
    diseaseNameTe: "లేట్ బ్లైట్ తెగులు",
    costRating: "Medium",
    estimatedCost: "₹450 - ₹700 per acre",
    culturalControl: [
      "Destroy and burn all infected leaf matter away from the farm",
      "Maintain wider row spacing (60cm x 45cm) for adequate airflow",
      "Irrigate only at the base during early morning hours"
    ],
    culturalControlTe: [
      "బాధిత ఆకులను తోట నుండి తీసివేసి తగులబెట్టండి",
      "మొక్కల మధ్య సరైన గాలి వెలుతురు ఉండేలా దూరం పాటించండి",
      "ఉదయాన్నే మొదళ్ల వద్ద మాత్రమే నీరు పారించండి"
    ],
    biologicalControl: [
      "Spray Trichoderma viride @ 5g/liter of water during early stage",
      "Apply Neem Seed Kernel Extract (NSKE 5%) every 7 days"
    ],
    biologicalControlTe: [
      "లీటరు నీటికి 5 గ్రాములు ట్రైకోడెర్మా విరిడే కలిపి పిచికారీ చేయండి",
      "5% వేప గింజల కషాయం ప్రతి 7 రోజులకు ఒకసారి చల్లండి"
    ],
    chemicalControl: [
      "Mancozeb 75% WP @ 2.5g per liter of water (Preventive)",
      "Metalaxyl 8% + Mancozeb 64% WP @ 2g per liter (Curative for high infestation)",
      "Ensure thorough coverage under the leaves"
    ],
    chemicalControlTe: [
      "నివారణకు: లీటరు నీటికి 2.5 గ్రా మాంకోజెబ్",
      "ముదిరిన తెగులుకు: లీటరు నీటికి 2 గ్రా మెటలాక్సిల్ + మాంకోజెబ్",
      "ఆకుల అడుగు భాగాన కూడా బాగా తడిసేలా చల్లాలి"
    ],
    prevention: [
      "Use disease-resistant certified hybrid seeds (e.g. Arka Rakshak)",
      "Rotate tomato crops with non-solanaceous crops like maize or paddy"
    ],
    preventionTe: [
      "తెగులు నిరోధక విత్తనాలను ఎంచుకోండి (ఉదా. ఆర్కా రక్షక్)",
      "మొక్కజొన్న లేదా వరితో పంట మార్పిడి చేయండి"
    ],
    safetyAdvice: "Use personal protective equipment (mask & gloves) when spraying chemicals. Pre-harvest interval is 7 days.",
    safetyAdviceTe: "మందులు చల్లేటప్పుడు ఖచ్చితంగా మాస్క్ మరియు చేతి తొడుగులు ధరించండి. కోతకు 7 రోజుల ముందు మందులు ఆపాలి."
  },
  "DIS-RIC-01": {
    diseaseId: "DIS-RIC-01",
    diseaseName: "Rice Blast",
    diseaseNameTe: "వరి అగ్గి తెగులు",
    costRating: "Medium",
    estimatedCost: "₹500 - ₹850 per acre",
    culturalControl: [
      "Avoid excess nitrogen fertilizer beyond recommended doses",
      "Maintain standing water of 2-3 cm during tillering if blast is controlled"
    ],
    culturalControlTe: [
      "సిఫార్సు చేసిన పరిమితి కంటే ఎక్కువ యూరియా వాడకండి",
      "దుబ్బు చేసే దశలో పొలంలో 2-3 సెం.మీ నీరు ఉంచండి"
    ],
    biologicalControl: [
      "Pseudomonas fluorescens seed treatment @ 10g/kg seed"
    ],
    biologicalControlTe: [
      "కిలో విత్తనానికి 10 గ్రా సూడోమోనాస్ ఫ్లోరొసెన్స్ కలిపి విత్తన శుద్ధి చేయండి"
    ],
    chemicalControl: [
      "Tricyclazole 75% WP @ 0.6g per liter of water",
      "Isoprothiolane 40% EC @ 1.5 ml per liter of water"
    ],
    chemicalControlTe: [
      "లీటరు నీటికి 0.6 గ్రా ట్రైసైక్లాజోల్ లేదా 1.5 మి.లీ ఐసోప్రోథియోలేన్"
    ],
    prevention: [
      "Treat seeds before sowing with Carbendazim @ 2g/kg seed"
    ],
    preventionTe: [
      "విత్తే ముందు కార్బండజిమ్ 2 గ్రా/కిలో చొప్పున విత్తన శుద్ధి చేయండి"
    ],
    safetyAdvice: "Keep livestock away from treated fields for 48 hours.",
    safetyAdviceTe: "మందు చల్లిన పొలంలోకి 48 గంటలు పశువులను వెళ్లనివ్వకండి."
  }
};

export const MARKET_PRICES = [
  {
    id: "MKT-01",
    crop: "Tomato",
    cropTe: "టమాటా",
    market: "Guntur Agricultural Market Yard",
    district: "Guntur",
    state: "Andhra Pradesh",
    pricePerKg: 32,
    pricePerQuintal: 3200,
    prevPrice: 28,
    changePct: +14.2,
    variety: "Hybrid Red",
    grade: "Grade A",
    minPrice: 2600,
    maxPrice: 3500,
    avgPrice: 3150,
    updated: "Today, 09:30 AM",
    arrivalsQuintals: 1450
  },
  {
    id: "MKT-02",
    crop: "Tomato",
    cropTe: "టమాటా",
    market: "Vijayawada Rythu Bazar",
    district: "Krishna",
    state: "Andhra Pradesh",
    pricePerKg: 29,
    pricePerQuintal: 2900,
    prevPrice: 30,
    changePct: -3.3,
    variety: "Country / Desi",
    grade: "Grade A",
    minPrice: 2400,
    maxPrice: 3100,
    avgPrice: 2850,
    updated: "Today, 08:45 AM",
    arrivalsQuintals: 920
  },
  {
    id: "MKT-03",
    crop: "Chilli",
    cropTe: "మిర్చి",
    market: "Guntur Chilli Yard (Asia's Largest)",
    district: "Guntur",
    state: "Andhra Pradesh",
    pricePerKg: 185,
    pricePerQuintal: 18500,
    prevPrice: 178,
    changePct: +3.9,
    variety: "Teja (Dry)",
    grade: "Export Premium",
    minPrice: 16000,
    maxPrice: 19500,
    avgPrice: 18200,
    updated: "Today, 10:15 AM",
    arrivalsQuintals: 8500
  },
  {
    id: "MKT-04",
    crop: "Rice",
    cropTe: "వరి (బియ్యం)",
    market: "Kurnool Grain Market",
    district: "Kurnool",
    state: "Andhra Pradesh",
    pricePerKg: 24.5,
    pricePerQuintal: 2450,
    prevPrice: 24.0,
    changePct: +2.0,
    variety: "Sona Masuri (Paddy)",
    grade: "Grade A",
    minPrice: 2200,
    maxPrice: 2600,
    avgPrice: 2420,
    updated: "Today, 07:00 AM",
    arrivalsQuintals: 3200
  },
  {
    id: "MKT-05",
    crop: "Cotton",
    cropTe: "పత్తి",
    market: "Warangal Cotton Market Yard",
    district: "Warangal",
    state: "Telangana",
    pricePerKg: 74,
    pricePerQuintal: 7400,
    prevPrice: 72,
    changePct: +2.7,
    variety: "Long Staple (Raw)",
    grade: "Grade A",
    minPrice: 6800,
    maxPrice: 7650,
    avgPrice: 7350,
    updated: "Yesterday",
    arrivalsQuintals: 2100
  },
  {
    id: "MKT-06",
    crop: "Maize",
    cropTe: "జొన్న / మొక్కజొన్న",
    market: "Nizamabad Grain Mandi",
    district: "Nizamabad",
    state: "Telangana",
    pricePerKg: 21.5,
    pricePerQuintal: 2150,
    prevPrice: 22.0,
    changePct: -2.2,
    variety: "Yellow Feed Grade",
    grade: "Standard",
    minPrice: 1950,
    maxPrice: 2250,
    avgPrice: 2120,
    updated: "Today, 09:00 AM",
    arrivalsQuintals: 1800
  },
  {
    id: "MKT-07",
    crop: "Groundnut",
    cropTe: "వేరుశనగ",
    market: "Anantapur APMC Yard",
    district: "Anantapur",
    state: "Andhra Pradesh",
    pricePerKg: 62.5,
    pricePerQuintal: 6250,
    prevPrice: 60.0,
    changePct: +4.1,
    variety: "Bold Pods",
    grade: "Grade A",
    minPrice: 5800,
    maxPrice: 6500,
    avgPrice: 6200,
    updated: "Today, 10:00 AM",
    arrivalsQuintals: 1650
  }
];

export const BUYERS = [
  {
    id: "BUYER-01",
    type: "FPO",
    name: "Guntur Farmer Producer Company Ltd.",
    nameTe: "గుంటూరు రైతు ఉత్పత్తిదారుల కంపెనీ",
    contactPerson: "K. Venkateswara Rao",
    phone: "+91 94401 88231",
    district: "Guntur",
    location: "Guntur Industrial Area, AP",
    cropRequired: "Tomato",
    cropRequiredTe: "టమాటా",
    quantityNeeded: "5,000 kg",
    targetPrice: "₹33 / kg",
    qualityRequirement: "Grade A / Fresh Firm Red",
    verified: true,
    rating: 4.8,
    paymentTerms: "Instant Bank Transfer upon weighing",
    description: "Government recognized FPO aggregating vegetable produce for urban retail chains."
  },
  {
    id: "BUYER-02",
    type: "Buyer",
    name: "Rayalaseema Agri Processing & Exports",
    nameTe: "రాయలసీమ అగ్రి ప్రాసెసింగ్ & ఎగుమతులు",
    contactPerson: "S. Srinivasulu",
    phone: "+91 98492 11044",
    district: "Kurnool",
    location: "Kurnool NH-44 Hub, AP",
    cropRequired: "Chilli",
    cropRequiredTe: "మిర్చి",
    quantityNeeded: "15,000 kg",
    targetPrice: "₹190 / kg",
    qualityRequirement: "Teja Variety Dry < 10% Moisture",
    verified: true,
    rating: 4.9,
    paymentTerms: "50% Advance + 50% Delivery",
    description: "Direct exporter to Southeast Asia and Middle East markets."
  },
  {
    id: "BUYER-03",
    type: "FPO",
    name: "Godavari Organic Farmers Co-operative",
    nameTe: "గోదావరి ఆర్గానిక్ రైతుల కోఆపరేటివ్",
    contactPerson: "M. Subrahmanyam",
    phone: "+91 91773 45900",
    district: "Eluru",
    location: "Eluru Canal Road, AP",
    cropRequired: "Rice",
    cropRequiredTe: "వరి (బియ్యం)",
    quantityNeeded: "25 Tons",
    targetPrice: "₹2,500 / quintal",
    qualityRequirement: "Organic Sona Masuri Paddy",
    verified: true,
    rating: 4.7,
    paymentTerms: "Direct UPI payment within 2 hours",
    description: "Connecting 1200+ organic grain farmers with premium supermarket chains."
  },
  {
    id: "BUYER-04",
    type: "Buyer",
    name: "Deccan Food Processing Mills",
    nameTe: "డెక్కన్ ఫుడ్ ప్రాసెసింగ్ మిల్స్",
    contactPerson: "Anil Reddy",
    phone: "+91 99890 22341",
    district: "Nizamabad",
    location: "Nizamabad Agro Zone, TS",
    cropRequired: "Maize",
    cropRequiredTe: "జొన్న / మొక్కజొన్న",
    quantityNeeded: "50 Tons",
    targetPrice: "₹2,200 / quintal",
    qualityRequirement: "Moisture < 12%, No Mold",
    verified: false,
    rating: 4.4,
    paymentTerms: "Cheque / NEFT on delivery",
    description: "Poultry feed and starch processing mill buying directly from farmers."
  }
];

export const COLD_STORAGES = [
  {
    id: "COLD-01",
    name: "Guntur Agri Mega Cold Warehouse",
    nameTe: "గుంటూరు అగ్రి మెగా కోల్డ్ స్టోరేజ్",
    contact: "+91 863 2234888",
    district: "Guntur",
    location: "Autonagar Phase 2, Guntur",
    distanceKm: 6.5,
    totalCapacityMT: 5000,
    availableCapacityMT: 1200,
    priceRate: "₹0.90 / kg / month",
    tempRange: "0°C to 4°C (Humidity Controlled)",
    supportedCrops: ["Chilli", "Tomato", "Tamarind", "Fruits"],
    verified: true,
    rating: 4.8,
    powerBackup: "24x7 Generator + Solar Backup"
  },
  {
    id: "COLD-02",
    name: "Vijayawada Fresh Storage Solutions",
    nameTe: "విజయవాడ ఫ్రెష్ స్టోరేజ్ సొల్యూషన్స్",
    contact: "+91 866 2541199",
    district: "Krishna",
    location: "Gannavaram Highway, Vijayawada",
    distanceKm: 18.2,
    totalCapacityMT: 3000,
    availableCapacityMT: 850,
    priceRate: "₹1.10 / kg / month",
    tempRange: "2°C to 8°C",
    supportedCrops: ["Tomato", "Vegetables", "Mango", "Flowers"],
    verified: true,
    rating: 4.6,
    powerBackup: "Dual Grid Connection"
  },
  {
    id: "COLD-03",
    name: "Rayalaseema Multi-Commodity Cold Storage",
    nameTe: "రాయలసీమ మల్టీ-కమోడిటీ కోల్డ్ స్టోరేజ్",
    contact: "+91 8518 290123",
    district: "Kurnool",
    location: "Industrial Estate, Kurnool",
    distanceKm: 24.0,
    totalCapacityMT: 8000,
    availableCapacityMT: 3400,
    priceRate: "₹0.85 / kg / month",
    tempRange: "-2°C to 5°C",
    supportedCrops: ["Groundnut", "Onion", "Chilli", "Spices"],
    verified: true,
    rating: 4.9,
    powerBackup: "24x7 Generator Backup"
  }
];

export const LOGISTICS_PROVIDERS = [
  {
    id: "LOG-01",
    name: "Gramin Express Logistics",
    nameTe: "గ్రామీన్ ఎక్స్‌ప్రెస్ లాజిస్టిక్స్",
    contact: "+91 94900 12345",
    distanceKm: 4.0,
    rating: 4.8,
    vehicles: [
      { type: "Small Pickup (Mahindra Bolero)", capacity: "1.5 Tons", baseRate: "₹25 / km", available: true },
      { type: "Mini Truck (Tata Ace)", capacity: "800 kg", baseRate: "₹18 / km", available: true },
      { type: "Heavy Truck (6 Wheeler)", capacity: "10 Tons", baseRate: "₹45 / km", available: true }
    ],
    servingDistricts: ["Guntur", "Krishna", "Prakasam"]
  },
  {
    id: "LOG-02",
    name: "Kisan Cargo Haulage Co.",
    nameTe: "కిసాన్ కార్గో రవాణా సంస్థ",
    contact: "+91 98480 67890",
    distanceKm: 9.2,
    rating: 4.6,
    vehicles: [
      { type: "Mini Truck (Tata Ace)", capacity: "1 Ton", baseRate: "₹16 / km", available: true },
      { type: "Medium Truck (Eicher 14 ft)", capacity: "4 Tons", baseRate: "₹32 / km", available: true }
    ],
    servingDistricts: ["Guntur", "Kurnool", "Anantapur"]
  }
];

export const INITIAL_DIAGNOSES = [
  {
    id: "DIAG-1001",
    farmerId: "FARMER-101",
    crop: "Tomato",
    cropTe: "టమాటా",
    disease: "Late Blight",
    diseaseTe: "లేట్ బ్లైట్ తెగులు",
    confidence: 0.92,
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-09-18 14:30",
    status: "Action Required"
  }
];

export const INITIAL_PRODUCE_LISTINGS = [
  {
    id: "LISTING-2001",
    farmerId: "FARMER-101",
    farmerName: "Ramesh Kumar",
    crop: "Tomato",
    cropTe: "టమాటా",
    quantity: 2500,
    unit: "kg",
    expectedPrice: 30,
    availableDate: "2026-09-22",
    location: "Tadikonda, Guntur, AP",
    qualityGrade: "Grade A",
    status: "Active",
    createdAt: "2026-09-17"
  }
];
