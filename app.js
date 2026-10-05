/* ================================================
   ONIONGRADE AI — Application Logic
   Navigation, Demo Data, AI Simulation, Chat
   ================================================ */

// ========== STATE ==========
let currentLang = 'en';
let currentRole = null;
let navHistory = [];
let lifecycleActivated = false;

// ========== DEMO DATA — Individual Onions ==========
const demoOnions = [
  { id: 1, status: 'healthy', statusKey: 'stat_healthy', icon: '✓', size: 'Large', sizeMM: 72, defect: 'None', confidence: 96 },
  { id: 2, status: 'healthy', statusKey: 'stat_healthy', icon: '✓', size: 'Large', sizeMM: 70, defect: 'None', confidence: 95 },
  { id: 3, status: 'healthy', statusKey: 'stat_healthy', icon: '✓', size: 'Medium', sizeMM: 65, defect: 'None', confidence: 97 },
  { id: 4, status: 'damaged', statusKey: 'stat_damaged', icon: '⚠', size: 'Medium', sizeMM: 62, defect: 'Surface Damage', confidence: 91 },
  { id: 5, status: 'healthy', statusKey: 'stat_healthy', icon: '✓', size: 'Large', sizeMM: 74, defect: 'None', confidence: 94 },
  { id: 6, status: 'rotten', statusKey: 'stat_rotten', icon: '✕', size: 'Medium', sizeMM: 58, defect: 'Rot', confidence: 94 },
  { id: 7, status: 'healthy', statusKey: 'stat_healthy', icon: '✓', size: 'Medium', sizeMM: 66, defect: 'None', confidence: 93 },
  { id: 8, status: 'sprouted', statusKey: 'stat_sprouted', icon: '⚠', size: 'Large', sizeMM: 71, defect: 'Sprouted', confidence: 88 },
  { id: 9, status: 'healthy', statusKey: 'stat_healthy', icon: '✓', size: 'Large', sizeMM: 73, defect: 'None', confidence: 96 },
  { id: 10, status: 'healthy', statusKey: 'stat_healthy', icon: '✓', size: 'Medium', sizeMM: 64, defect: 'None', confidence: 98 },
  { id: 11, status: 'undersized', statusKey: 'stat_undersized', icon: '⚠', size: 'Small', sizeMM: 42, defect: 'Undersized', confidence: 92 },
  { id: 12, status: 'healthy', statusKey: 'stat_healthy', icon: '✓', size: 'Large', sizeMM: 76, defect: 'None', confidence: 97 },
  { id: 13, status: 'healthy', statusKey: 'stat_healthy', icon: '✓', size: 'Medium', sizeMM: 63, defect: 'None', confidence: 95 },
  { id: 14, status: 'damaged', statusKey: 'stat_damaged', icon: '⚠', size: 'Medium', sizeMM: 60, defect: 'Surface Damage', confidence: 61 },
  { id: 15, status: 'healthy', statusKey: 'stat_healthy', icon: '✓', size: 'Large', sizeMM: 69, defect: 'None', confidence: 96 },
  { id: 16, status: 'healthy', statusKey: 'stat_healthy', icon: '✓', size: 'Medium', sizeMM: 67, defect: 'None', confidence: 94 },
  { id: 17, status: 'rotten', statusKey: 'stat_rotten', icon: '✕', size: 'Small', sizeMM: 48, defect: 'Rot', confidence: 93 },
  { id: 18, status: 'healthy', statusKey: 'stat_healthy', icon: '✓', size: 'Large', sizeMM: 75, defect: 'None', confidence: 97 },
  { id: 19, status: 'healthy', statusKey: 'stat_healthy', icon: '✓', size: 'Medium', sizeMM: 64, defect: 'None', confidence: 95 },
  { id: 20, status: 'sprouted', statusKey: 'stat_sprouted', icon: '⚠', size: 'Medium', sizeMM: 61, defect: 'Sprouted', confidence: 86 },
  { id: 21, status: 'healthy', statusKey: 'stat_healthy', icon: '✓', size: 'Large', sizeMM: 72, defect: 'None', confidence: 96 },
  { id: 22, status: 'healthy', statusKey: 'stat_healthy', icon: '✓', size: 'Medium', sizeMM: 65, defect: 'None', confidence: 98 },
  { id: 23, status: 'healthy', statusKey: 'stat_healthy', icon: '✓', size: 'Large', sizeMM: 70, defect: 'None', confidence: 95 },
  { id: 24, status: 'undersized', statusKey: 'stat_undersized', icon: '⚠', size: 'Small', sizeMM: 44, defect: 'Undersized', confidence: 90 },
  { id: 25, status: 'healthy', statusKey: 'stat_healthy', icon: '✓', size: 'Large', sizeMM: 74, defect: 'None', confidence: 97 },
  { id: 26, status: 'healthy', statusKey: 'stat_healthy', icon: '✓', size: 'Medium', sizeMM: 66, defect: 'None', confidence: 93 },
  { id: 27, status: 'damaged', statusKey: 'stat_damaged', icon: '⚠', size: 'Medium', sizeMM: 59, defect: 'Surface Damage', confidence: 89 },
  { id: 28, status: 'healthy', statusKey: 'stat_healthy', icon: '✓', size: 'Large', sizeMM: 71, defect: 'None', confidence: 96 },
  { id: 29, status: 'healthy', statusKey: 'stat_healthy', icon: '✓', size: 'Medium', sizeMM: 68, defect: 'None', confidence: 95 },
  { id: 30, status: 'healthy', statusKey: 'stat_healthy', icon: '✓', size: 'Large', sizeMM: 73, defect: 'None', confidence: 97 },
];

// ========== COMPREHENSIVE ONION Q&A KNOWLEDGE BASE ==========
const qaKnowledgeBase = [
  {
    category: 'quality',
    keywords: ['grade a', 'why grade a', 'quality', 'grade', 'grading', 'diameter', 'size', 'standard', 'uniform'],
    question: {
      en: 'Why did my onion lot receive Grade A?',
      mr: 'माझ्या कांद्याचा ग्रेड A का आला?',
      hi: 'मेरे प्याज के लॉट को ग्रेड A क्यों मिला?'
    },
    answer: {
      en: '📊 **Grade A Certification Breakdown:**\n\n• **High Health Ratio:** Over 82% of sampled onions have zero rot, fungal spots, or physical cuts.\n• **Uniform Bulb Size:** Average diameter is 65–75 mm (Optimal commercial grade).\n• **Low Defect Ratio:** Surface blemishes are under 6%, with 0% premature sprouting.\n• **Firm Neck & Dry Scales:** Bulbs were properly cured with tight, dry protective outer skins.\n\n💡 *Grade A certified lots receive an average ₹150–200/Quintal premium in APMC auctions.*',
      mr: '📊 **ग्रेड A निकष विश्लेषण:**\n\n• **उच्च गुणवत्ता प्रमाण:** नमुन्यातील ८२% पेक्षा जास्त कांदे निरोगी व डागमुक्त आहेत.\n• **आकाराची एकसमानता:** सरासरी आकार ६५–७५ मिमी (उत्कृष्ट व्यापारी प्रत).\n• **कमी दोष प्रमाण:** पृष्ठभागावरील डाग ६% पेक्षा कमी, मोड आलेले कांदे ०%.\n• **सुकलेली मान व कडक साल:** योग्य सुकवणीमुळे कांद्याची साठवणूक क्षमता उत्तम आहे.\n\n💡 *ग्रेड A लॉटला APMC लिलावात सरासरी १५०-२०० रु/क्विंटल जादा भाव मिळतो.*',
      hi: '📊 **ग्रेड A प्रमाणन विश्लेषण:**\n\n• **उच्च गुणवत्ता अनुपात:** नमूने में 82% से अधिक प्याज पूरी तरह स्वस्थ और दोषमुक्त हैं।\n• **समान आकार:** औसत व्यास 65–75 मिमी (बाजार की सर्वोत्तम श्रेणी)।\n• **कम दोष दर:** सतही क्षति 6% से कम, अंकुरित प्याज 0%।\n• **सूखी गर्दन और मजबूत छिलका:** उचित सुखाई के कारण भंडारण क्षमता मजबूत है।\n\n💡 *ग्रेड A लॉट को मंडियों में 150-200 रु/क्विंटल तक अतिरिक्त प्रीमियम मिलता है।*'
    }
  },
  {
    category: 'quality',
    keywords: ['grade b', 'grade c', 'difference between grade', 'grades', 'classification'],
    question: {
      en: 'What is the difference between Grade A, B, and C onions?',
      mr: 'कांद्याच्या Grade A, B आणि C मध्ये काय फरक आहे?',
      hi: 'प्याज के Grade A, B और C में क्या अंतर है?'
    },
    answer: {
      en: '🧅 **Onion Grading Standards Explained:**\n\n• **Grade A (Premium):** 60–80 mm diameter, uniform shape, deep color, tight dry neck, defect rate <8%. Demanded for supermarkets and exports.\n• **Grade B (Fair/Medium):** 45–60 mm diameter, minor blemishes, slight size variation, 65–75% healthy bulbs. Sold in local wholesale mandis.\n• **Grade C (Low/Small):** Below 45 mm (undersized) or >15% defects (thick neck, sunburn, double bulbs, cuts). Channeled for dehydration and processing.',
      mr: '🧅 **कांदा प्रतवारी निकष:**\n\n• **Grade A (उत्कृष्ट):** ६०–८० मिमी आकार, घट्ट साल, सुकलेली मान, दोष <८%. सुपरमार्केट व निर्यातीसाठी योग्य.\n• **Grade B (मध्यम):** ४५–६० मिमी आकार, किरकोळ डाग, ६५–७५% निरोगी कांदे. स्थानिक बाजारात मागणी.\n• **Grade C (कमी प्रत):** ४५ मिमी पेक्षा लहान किंवा १५% पेक्षा जास्त दोष. डिहायड्रेशन पावडर किंवा तत्काळ वापरासाठी.',
      hi: '🧅 **प्याज ग्रेडिंग मानक:**\n\n• **Grade A (प्रीमियम):** 60–80 मिमी आकार, गहरा रंग, सूखी गर्दन, दोष <8%। निर्यात और बड़े बाजारों के लिए सर्वोत्तम।\n• **Grade B (मध्यम):** 45–60 मिमी आकार, हल्के दाग, 65–75% स्वस्थ प्याज। स्थानीय थोक मंडियों में बिक्री।\n• **Grade C (निम्न):** 45 मिमी से छोटा या 15% से अधिक दोष। प्रोसेसिंग और घरेलू उपयोग हेतु।'
    }
  },
  {
    category: 'quality',
    keywords: ['tray', 'tray scan', 'camera', 'how tray works', 'ai vision', 'how ai works'],
    question: {
      en: 'How does the AI Tray Camera quality assessment work?',
      mr: 'AI ट्रे कॅमेरा गुणवत्ता तपासणी कशी काम करते?',
      hi: 'AI ट्रे कैमरा गुणवत्ता जांच कैसे काम करती है?'
    },
    answer: {
      en: '📷 **AI Tray Assessment Workflow:**\n\n1. **Standardized Placement:** 30 representative onions from the lot are placed into individual grid cells of the tray.\n2. **Quality Capture:** Overhead camera captures an unobstructed frame verifying glare-free lighting and horizontal tilt.\n3. **Neural Network Processing:** Multi-task Computer Vision model segments each bulb to measure diameter, circularity, rot, cuts, and sprouting.\n4. **Instant Lot Report:** Produces a verified grade summary (A/B/C) with digital QR verification in under 5 seconds!',
      mr: '📷 **AI ट्रे तपासणी कार्यपद्धती:**\n\n१. **३० कांद्यांचा नमुना:** लॉटमधून निवडलेले ३० कांदे प्रमाणित ट्रेच्या कप्प्यांमध्ये ठेवले जातात.\n२. **कॅमेरा इमेजिंग:** मोबाईल कॅमेरा सरळ वर धरून प्रकाश आणि अँगल तपासून फोटो घेतला जातो.\n३. **AI कॉम्प्युटर व्हिजन विश्लेषण:** व्यास, आकार, सड, डाग, काप आणि मोड शोधणे.\n४. **त्वरित डिजिटल रिपोर्ट:** अवघ्या ५ सेकंदात ग्रेड निकाल आणि QR कोड तयार होतो!',
      hi: '📷 **AI ट्रे जांच कार्यप्रणाली:**\n\n1. **30 प्याज का नमूना:** लॉट से 30 प्रतिनिधि प्याज ट्रे के ग्रिड में रखे जाते हैं।\n2. **ओवरहेड इमेजिंग:** फोन कैमरा सीधा ऊपर रखकर पर्याप्त रोशनी में स्कैन किया जाता है।\n3. **AI विजन मॉडल विश्लेषण:** व्यास, सड़न, दाग, कट और अंकुरण की स्वचालित पहचान।\n4. **त्वरित रिपोर्ट:** 5 सेकंड में डिजिटल ग्रेड कार्ड और QR कोड तैयार!'
    }
  },
  {
    category: 'quality',
    keywords: ['rejection', 'rejected', 'camera rejection', 'blur', 'angle', 'fail capture'],
    question: {
      en: 'Why does the camera reject an image during tray scan?',
      mr: 'ट्रे स्कॅन करताना कॅमेरा फोटो का नाकारतो?',
      hi: 'ट्रे स्कैन के दौरान कैमरा फोटो क्यों अस्वीकार करता है?'
    },
    answer: {
      en: '⚠️ **Common Causes for Camera Rejection & Solutions:**\n\n• **Motion Blur:** Hold the phone steady with both hands; tap the screen center to lock focus.\n• **Angle Deviation (>10°):** Hold the phone completely parallel directly above the tray (not tilted).\n• **Uneven Shadows / Glare:** Move to diffuse daylight or shaded lighting without harsh overhead glare.\n• **Incomplete Tray:** Ensure all 30 cells are filled with single bulbs.\n• **Foreign Obstacles:** Keep fingers and objects outside the tray boundary line.',
      mr: '⚠️ **फोटो नाकारण्याची कारणे व उपाय:**\n\n• **फोटो हलणे (Blur):** मोबाईल दोन्ही हातांनी स्थिर धरा आणि स्क्रीनवर टॅप करून फोकस करा.\n• **चुकीचा अँगल:** मोबाईल ट्रेच्या अगदी वर समांतर (फ्लॅट) धरा, तिरका धरू नका.\n• **तीव्र सावली किंवा चमक:** थेट कडक उन्हाऐवजी सावलीत किंवा एकसमान प्रकाशात फोटो घ्या.\n• **रिकामे कप्पे:** ट्रेमधील सर्व ३० कप्प्यांमध्ये कांदे व्यवस्थित बसवा.\n• **अडथळे:** बोटे किंवा इतर वस्तू ट्रेच्या आत येणार नाहीत याची काळजी घ्या.',
      hi: '⚠️ **फोटो अस्वीकृति के कारण और समाधान:**\n\n• **धुंधलापन (Blur):** फोन को स्थिर रखें और फोकस करने के लिए स्क्रीन पर टैप करें।\n• **तिरछा एंगल:** फोन को ट्रे के बिल्कुल ऊपर समानांतर रखें।\n• **कड़ी धूप या छाया:** सीधी धूप की जगह छायादार और समान प्रकाश में स्कैन करें।\n• **खाली स्लॉट:** ट्रे के सभी 30 खानों में प्याज रखें।\n• **रुकावट:** स्कैन एरिया में हाथ या कोई अन्य वस्तु न आने दें।'
    }
  },
  {
    category: 'storage',
    keywords: ['storage', 'store', 'chawl', 'kanda chawl', 'prevent rot', 'rotting', 'sprout', 'sprouting', 'shelf life', 'curing'],
    question: {
      en: 'How to store onions in a Chawl to prevent rot and sprouting?',
      mr: 'कांदा चाळीत साठवणूक कशी करावी जेणेकरून सड व मोड येणार नाहीत?',
      hi: 'प्याज को भंडारण में सड़न और अंकुरण से कैसे बचाएं?'
    },
    answer: {
      en: '🏪 **Scientific Onion Storage & Chawl Guidelines:**\n\n1. **Thorough Field Curing (10–15 Days):** Dry harvested bulbs in shade until the neck is thin, dry, and tightly closed.\n2. **Proper Chawl Structure:** Build a raised bottom (at least 2 feet above ground level) with bamboo or wire mesh sides for cross-ventilation.\n3. **Ideal Microclimate:** Maintain ambient temperature between 25°C and 30°C with 65–70% relative humidity. Avoid humid basements.\n4. **Stack Height:** Never stack bulbs higher than 4 feet (3–4 layers maximum) to avoid pressure heating.\n5. **Bi-Weekly Culling:** Inspect every 15 days; discard any soft or sprouting bulbs immediately before mold spores spread.\n\n🏛️ *Govt provides up to ₹87,500 subsidy for 25 MT ventilated Kanda Chawl construction under MahaDBT.*',
      mr: '🏪 **शास्त्रीय कांदा साठवणूक व चाळ व्यवस्थापन:**\n\n१. **चांगली सुकवणी (१०-१५ दिवस):** कांदा काढणीनंतर सावलीत सुकवून मान पूर्ण वाळू द्या.\n२. **हवा खेळती चाळ:** जमिनीपासून २ फूट उंचीवर जाळीदार किंवा बांबूची रचना असावी.\n३. **तापमान व आर्द्रता:** तापमान २५ ते ३० अंश से. आणि आर्द्रता ६५-७०% दरम्यान असावी.\n४. **कांद्याचा थर:** कांद्याची थप्पी ४ फुटांपेक्षा जास्त (३-४ थरांपेक्षा जास्त) ठेवू नका.\n५. **नियमित पाहणी:** दर १५ दिवसांनी चाळ तपासा; सडलेले कांदे त्वरित वेगळे करा.\n\n🏛️ *महाडीबीटी योजनेअंतर्गत २५ मे.टन कांदा चाळीसाठी ५०% (८७,५०० रु. पर्यंत) अनुदान मिळते.*',
      hi: '🏪 **वैज्ञानिक प्याज भंडारण और चाळ प्रबंधन:**\n\n1. **उचित सुखाई (10-15 दिन):** कटाई के बाद प्याज को छाया में सुखाएं ताकि गर्दन पूरी तरह सूख जाए।\n2. **हवादार चाळ:** जमीन से 2 फीट ऊपर जालीदार फर्श और खुली हवादार संरचना बनाएं।\n3. **तापमान और नमी:** 25-30°C तापमान और 65-70% सापेक्ष आर्द्रता बनाए रखें।\n4. **ढेर की ऊंचाई:** प्याज की परत 4 फीट से अधिक ऊंची न रखें।\n5. **नियमित छंटाई:** हर 15 दिन में जांच करें और सड़े हुए प्याज तुरंत बाहर निकालें।\n\n🏛️ *MahaDBT के तहत 25 टन क्षमता की कांदा चाळ के लिए 50% तक सरकारी अनुदान उपलब्ध है।*'
    }
  },
  {
    category: 'pests',
    keywords: ['thrips', 'pest', 'insects', 'silver leaves', 'curling', 'insecticide', 'spray'],
    question: {
      en: 'How to identify and control onion thrips effectively?',
      mr: 'कांद्यावरील थ्रिप्स (फुलकिडे) कसे ओळखावे व नियंत्रण कसे करावे?',
      hi: 'प्याज में थ्रिप्स (कीट) की पहचान और रोकथाम कैसे करें?'
    },
    answer: {
      en: '🐛 **Onion Thrips (Thrips tabaci) Management:**\n\n• **Symptoms:** Tiny insects feeding inside leaf sheaths, causing silvery streaks, curling leaf tips, and premature drying.\n• **Organic Control:** Install 25 yellow & blue sticky traps per acre; spray Neem Oil (10,000 ppm) @ 3–5 ml/L water.\n• **Chemical Control (if threshold >30 thrips/plant):** Spray Spinetoram 11.7% SC @ 0.8 ml/L OR Fipronil 5% SC @ 1.5 ml/L with sticker (surfactant).\n⚠️ *Avoid spraying during hot midday hours to prevent leaf scorching.*',
      mr: '🐛 **कांद्यावरील थ्रिप्स (फुलकिडे) नियंत्रण:**\n\n• **लक्षणे:** पानांवर चंदेरी-पांढरे ठिपके पडणे, पाने वाकडी होणे आणि सुकणे.\n• **जैविक उपाय:** एकरी २०-२५ पिवळे व निळे चिकट सापळे लावा; निंबोळी अर्क (१०,००० ppm) ३-५ मिली/लिटर फवारा.\n• **रासायनिक उपाय:** स्पिनोटोरम ११.७% SC @ ०.८ मिली/लिटर किंवा फिप्रोनिल ५% SC @ १.५ मिली/लिटर सोबत स्टिकर वापरा.\n⚠️ *दुपारच्या कडक उन्हात फवारणी करणे टाळा.*',
      hi: '🐛 **प्याज में थ्रिप्स कीट नियंत्रण:**\n\n• **लक्षण:** पत्तियों पर चांदी जैसे सफेद धब्बे, पत्तियों का मुड़ना और सूखना।\n• **जैविक उपाय:** 20-25 पीले-नीले स्टिकी ट्रैप लगाएं; नीम का तेल (10,000 ppm) 3-5 मिली/लीटर स्प्रे करें।\n• **रासायनिक उपाय:** स्पिनेटोरम 11.7% SC @ 0.8 मिली/लीटर या फिप्रोनिल 5% SC @ 1.5 मिली/लीटर स्टीकर के साथ छिड़काव करें।'
    }
  },
  {
    category: 'pests',
    keywords: ['purple blotch', 'fungus', 'disease', 'blight', 'fungicide', 'leaf spots', 'rotting roots', 'basal rot'],
    question: {
      en: 'What causes Purple Blotch and Fungal Rot in onions, and how to cure it?',
      mr: 'कांद्यावर करपा (Purple Blotch) आणि बुरशीजन्य सड कशामुळे होते? काय उपाय करावा?',
      hi: 'प्याज में पर्पल ब्लॉच (झुलसा) और फफूंद रोग का क्या उपचार है?'
    },
    answer: {
      en: '🦠 **Purple Blotch (Alternaria porri) & Fungal Diseases:**\n\n• **Root Causes:** High humidity (>80%), frequent rains, and dense planting.\n• **Symptoms:** Small water-soaked spots on leaves turning purplish-brown with yellow borders.\n• **Effective Treatment:**\n  1. Spray Mancozeb 75% WP @ 2.5 g/L at first notice.\n  2. For established infections: Spray Tebuconazole 25.9% EC @ 1.5 ml/L OR Azoxystrobin 23% SC @ 1 ml/L with a wetting sticker.\n  3. Drench root zone with Trichoderma viride to prevent soil-borne basal rot.',
      mr: '🦠 **जांभळा करपा (Purple Blotch) व बुरशी नियंत्रण:**\n\n• **कारणे:** ढगाळ हवामान, सततचा पाऊस आणि हवेतील जास्त आर्द्रता (>८०%).\n• **लक्षणे:** पानांवर लहान जांभळट-तपकिरी रंगाचे लांबट डाग पडून पाने जळाल्यासारखी दिसतात.\n• **उपाययोजना:**\n  १. मॅन्कोझेब ७५% WP @ २.५ ग्रॅम प्रति लिटर फवारा.\n  २. रोग जास्त असल्यास: टेब्युकोनॅझोल २५.९% @ १.५ मिली किंवा ॲझॉक्सीस्ट्रॉबिन @ १ मिली/लिटर फवारा.\n  ३. फवारणीमध्ये \'स्टिकर\' अवश्य वापरा.',
      hi: '🦠 **पर्पल ब्लॉच (बैंगनी धब्बा रोग) और फफूंद उपचार:**\n\n• **कारण:** अत्यधिक नमी और बारिश के बाद उमस भरा मौसम।\n• **लक्षण:** पत्तियों पर छोटे बैंगनी-भूरे रंग के धब्बे जो पत्ती सुखा देते हैं।\n• **उपचार:**\n  1. मैंकोजेब 75% WP @ 2.5 ग्राम प्रति लीटर स्प्रे करें।\n  2. रोग बढ़ने पर टेबुकोनाजोल @ 1.5 मिली प्रति लीटर स्टीकर के साथ छिड़काव करें।'
    }
  },
  {
    category: 'market',
    keywords: ['price', 'rate', 'lasalgaon', 'nashik', 'mandi', 'market rate', 'when to sell', 'price trend', 'apmc'],
    question: {
      en: 'What are the current onion mandi prices and when is the best time to sell?',
      mr: 'सध्याचे कांदा बाजारभाव काय आहेत आणि विक्रीची सर्वोत्तम वेळ कोणती?',
      hi: 'वर्तमान में प्याज के मंडी भाव क्या हैं और बेचने का सही समय कौन सा है?'
    },
    answer: {
      en: '💰 **Current Mandi Rates & Market Intelligence:**\n\n• **Lasalgaon APMC (Asia\'s Largest):** Min: ₹900/Q | Max: ₹1,500/Q | **Avg: ₹1,200/Q**\n• **Nashik APMC:** Min: ₹800/Q | Max: ₹1,400/Q | **Avg: ₹1,100/Q**\n• **Pimpalgaon APMC:** Min: ₹850/Q | Max: ₹1,350/Q | **Avg: ₹1,050/Q**\n• **Solapur APMC:** Avg: ₹850/Q (Moisture stress detected)\n\n📈 **Selling Strategy:**\n1. **Kharif Harvest:** Sell immediately within 15–20 days as storability is low.\n2. **Rabi Harvest:** Hold in ventilated chawls until Aug–Oct when prices typically peak.\n3. **Grading Boost:** Grading onions into uniform sizes adds ₹150–200/Q value over unsorted lots.',
      mr: '💰 **बाजारभाव विश्लेषण व विक्री मार्गदर्शन:**\n\n• **लासलगाव APMC:** किमान: ९०० रु | कमाल: १५०० रु | **सरासरी: १,२०० रु/क्विंटल**\n• **नाशिक APMC:** किमान: ८०० रु | कमाल: १४०० रु | **सरासरी: १,१०० रु/क्विंटल**\n• **सोलापूर APMC:** सरासरी ८५० रु/क्विंटल\n\n📈 **विक्री सल्ला:**\n१. खरीप कांदा १५-२० दिवसांत विका.\n२. उन्हाळी कांदा हवा खेळत्या चाळीत साठवून ऑगस्ट ते ऑक्टोबर दरम्यान टप्प्याटप्प्याने विका.\n३. ग्रेडिंग करून माल विकल्यास थेट १५० ते २०० रुपये जादा भाव मिळतो.',
      hi: '💰 **मंडी भाव और बिक्री रणनीति:**\n\n• **लासलगांव APMC:** न्यूनतम: ₹900 | अधिकतम: ₹1,500 | **औसत: ₹1,200/क्विंटल**\n• **नासिक APMC:** न्यूनतम: ₹800 | अधिकतम: ₹1,400 | **औसत: ₹1,100/क्विंटल**\n\n📈 **बिक्री सुझाव:**\n1. खरीफ प्याज ज्यादा दिन न रोकें, तुरंत बेचें।\n2. रबी प्याज को हवादार चाळ में सुरक्षित रखकर अगस्त-अक्टूबर के ऊंचे भाव में बेचें।\n3. ग्रेडिंग करके बेचने से प्रति क्विंटल 150-200 रुपये का अधिक मुनाफा मिलता है।'
    }
  },
  {
    category: 'schemes',
    keywords: ['subsidy', 'scheme', 'government', 'kanda chawl subsidy', 'pmfby', 'insurance', 'drip', 'mahadbt'],
    question: {
      en: 'What government subsidies and schemes can onion farmers apply for?',
      mr: 'कांदा उत्पादक शेतकरी कोणत्या सरकारी योजना व अनुदानासाठी अर्ज करू शकतात?',
      hi: 'प्याज किसान किन सरकारी योजनाओं और सब्सिडी के लिए आवेदन कर सकते हैं?'
    },
    answer: {
      en: '🏛️ **Active Government Schemes for Onion Growers:**\n\n1. **Kanda Chawl Subsidy (MahaDBT Portal):**\n   • 50% capital subsidy (up to ₹87,500) for erecting a 25 Metric Ton ventilated storage chawl.\n2. **Pradhan Mantri Fasal Bima Yojana (PMFBY):**\n   • Crop loss protection against excess rainfall, dry spells, and hail at 2% premium.\n3. **Micro-Irrigation (PMKSY Drip Subsidy):**\n   • 45% to 55% direct subsidy on installing inline drip irrigation for onion beds.\n4. **NAFED / NCCF Buffer Procurement:**\n   • Central govt procurement at market intervention prices during bumper harvest gluts.',
      mr: '🏛️ **कांदा शेतकऱ्यांसाठी प्रमुख शासकीय योजना:**\n\n१. **कांदा चाळ अनुदान (महाडीबीटी):** २५ मे.टन कांदा चाळीसाठी ५०% अनुदान (८७,५०० रुपयांपर्यंत).\n२. **प्रधानमंत्री पीक विमा (PMFBY):** नैसर्गिक आपत्तीपासून विमा संरक्षण, फक्त २% हप्ता.\n३. **ठिबक सिंचन अनुदान (PMKSY):** सूक्ष्म सिंचनावर ४५% ते ५५% थेट अनुदान.\n४. **नाफेड / NCCF कांदा खरेदी:** भाव घसरल्यास आधारभूत भावाने सरकारी खरेदी.',
      hi: '🏛️ **प्याज किसानों के लिए प्रमुख सरकारी योजनाएं:**\n\n1. **कांदा चाळ सब्सिडी (MahaDBT):** 25 मीट्रिक टन हवादार प्याज चाळ के लिए 50% (₹87,500 तक) सब्सिडी।\n2. **प्रधानमंत्री फसल बीमा योजना (PMFBY):** केवल 1.5-2% प्रीमियम पर फसल नुकसान का बीमा।\n3. **ड्रिप सिंचाई सब्सिडी:** 45% से 55% तक की सरकारी छूट।\n4. **नाफेड खरीद:** मंदी के समय सरकारी न्यूनतम मूल्य पर बफर स्टॉक खरीद।'
    }
  },
  {
    category: 'cultivation',
    keywords: ['variety', 'varieties', 'seeds', 'next season', 'cultivation', 'fertilizer', 'sowing', 'harvesting', 'nursery'],
    question: {
      en: 'Which onion variety and fertilizer schedule is best for the next season?',
      mr: 'पुढील हंगामासाठी सर्वोत्तम कांदा वाण आणि खत व्यवस्थापन कोणते?',
      hi: 'अगले मौसम के लिए सर्वोत्तम प्याज की किस्म और खाद प्रबंधन क्या है?'
    },
    answer: {
      en: '🌱 **Next Season Cultivation Blueprint:**\n\n• **Top Certified Varieties:**\n  - *Bhima Super (Kharif):* High yield (220–260 Q/ha), matures in 100 days, deep red.\n  - *Phule Samarth (Rabi / Storage):* Longest shelf life (5–6 months storage), thick outer scales.\n  - *Bhima Kiran (Rabi / Export):* High TSS (12%), uniform globe, excellent export appeal.\n\n🧪 **Recommended Fertilizer Dosage (Per Hectare):**\n  • **Basal (At Transplanting):** 50 kg N + 50 kg P₂O₅ + 50 kg K₂O + **30 kg Sulphur** (vital for firm pungent bulbs).\n  • **Top Dressing (30 & 45 DAT):** 25 kg N each split.\n  ⚠️ *Stop Nitrogen after 60 days to prevent thick neck bolting and rot in storage.*',
      mr: '🌱 **पुढील हंगाम कांदा वाण व खत नियोजन:**\n\n• **उत्कृष्ट प्रमाणित वाण:**\n  - *भीमा सुपर (खरीप):* १०० दिवसांत तयार, चमकदार लाल रंग.\n  - *फुले समर्थ (रब्बी/साठवणूक):* ५-६ महिने टिकण्याची उत्कृष्ट क्षमता.\n  - *भीमा किरण (निर्यात):* एकसमान आकार आणि आकर्षक रंग.\n\n🧪 **खत व्यवस्थापन (प्रति हेक्टरी):**\n  • लागवडीवेळी: ५० किलो नत्र + ५० किलो स्फुरद + ५० किलो पालाश + **३० किलो गंधक (सल्फर)**.\n  • ३० व ४५ दिवसांनी: प्रत्येकी २५ किलो नत्र.\n  ⚠️ *लागवडीनंतर ६० दिवसांनी नत्र देणे बंद करा, अन्यथा मान जाड होऊन कांदा सडतो.*',
      hi: '🌱 **अगले मौसम के लिए उन्नत किस्में और खाद प्रबंधन:**\n\n• **शीर्ष किस्में:**\n  - *भीमा सुपर (खरीफ):* 100 दिनों में पकने वाली लाल किस्म।\n  - *फुले समर्थ (रबी/भंडारण):* 5-6 महीने सुरक्षित रहने वाली सर्वोत्तम किस्म।\n  - *भीमा किरण (निर्यात):* निर्यात और मंडी दोनों के लिए बेहतरीन।\n\n🧪 **संतुलित खाद खुराक:**\n  • रोपाई के समय: 50 किग्रा N + 50 किग्रा P + 50 किग्रा K + 30 किग्रा सल्फर।\n  • 30 और 45 दिन बाद: 25-25 किग्रा यूरिया।\n  ⚠️ *60 दिन बाद नाइट्रोजन न दें ताकि कंद ठोस रहे और सड़े नहीं।*'
    }
  }
];

// NLP Intent Question Matching Algorithm
function getChatAnswer(query, lang = 'en') {
  const cleanQ = query.toLowerCase().trim();
  let bestScore = 0;
  let bestMatch = null;

  for (const item of qaKnowledgeBase) {
    let score = 0;
    // Check exact question match across languages
    if (
      (item.question.en && cleanQ === item.question.en.toLowerCase()) ||
      (item.question.mr && cleanQ === item.question.mr.toLowerCase()) ||
      (item.question.hi && cleanQ === item.question.hi.toLowerCase())
    ) {
      return item.answer[lang] || item.answer.en;
    }
    // Check keyword hits
    for (const kw of item.keywords) {
      if (cleanQ.includes(kw.toLowerCase())) {
        score += kw.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && bestScore >= 3) {
    return bestMatch.answer[lang] || bestMatch.answer.en;
  }

  // Fallback intelligent response
  if (lang === 'en') {
    return '🤖 **Onion Mitra AI Advisory:**\n\nThank you for asking about **"' + query + '"**.\n\n• **Quality Check:** Ensure onion bulbs have a thin dry neck, tight outer papery skin, and no soft spots.\n• **Storage:** Maintain 25–30°C and 65–70% relative humidity in ventilated chawls.\n• **Live Actions:** You can run an AI tray quality test from the dashboard, check current Mandi prices, or consult government subsidy schemes.\n\n💡 *Try asking one of the suggested questions above or click any topic category!*';
  } else if (lang === 'hi') {
    return '🤖 **प्याज मित्र AI सलाह:**\n\nआपके प्रश्न **"' + query + '"** के संबंध में सुझाव:\n• प्याज की गर्दन सूखी और छिलका मजबूत होना आवश्यक है।\n• भंडारण में 25-30°C तापमान और 65-70% नमी रखें।\n• आप ऐप में सीधे ट्रे स्कैन करके गुणवत्ता ग्रेडिंग देख सकते हैं।';
  } else {
    return '🤖 **कांदा मित्र AI सल्ला:**\n\nतुमच्या **"' + query + '"** या प्रश्नाबाबत मार्गदर्शन:\n• कांद्याची मान पूर्ण सुकलेली व साल घट्ट असल्याची खात्री करा.\n• चाळीत हवा खेळती ठेवून सड रोखा.\n• तुम्ही थेट ट्रे स्कॅन करून अचूक गुणवत्ता प्रतवारी व अहवाल तपासू शकता.';
  }
}

// ========== LANGUAGE ==========
function setLang(lang) {
  currentLang = lang;
  // Update lang bar
  document.querySelectorAll('.lang-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  // Update HTML lang attribute
  document.documentElement.lang = lang;
  // Apply translations
  applyTranslations();
  // Update placeholders
  applyPlaceholders();
  // Update active user card
  if (currentRole) updateSidebarUserCard(currentRole);
  // Re-render chat suggestions
  if (typeof renderChatSuggestions === 'function') renderChatSuggestions();
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key] && translations[key][currentLang]) {
      el.textContent = translations[key][currentLang];
    }
  });
}

function applyPlaceholders() {
  document.querySelectorAll('[data-placeholder-i18n]').forEach(el => {
    const key = el.getAttribute('data-placeholder-i18n');
    if (translations[key] && translations[key][currentLang]) {
      el.placeholder = translations[key][currentLang];
    }
  });
}

// ========== SIDEBAR & ROLE PROFILE ==========
function updateSidebarUserCard(role) {
  const avatar = document.getElementById('suc-avatar');
  const name = document.getElementById('suc-name');
  const badge = document.getElementById('suc-badge');
  if (!avatar || !name || !badge) return;

  const defaultFarmerName = currentLang === 'en' ? 'Rajesh Patil' : 'राजेश पाटील';
  const farmerName = document.getElementById('farmer-display-name')?.textContent || defaultFarmerName;

  if (role === 'farmer') {
    avatar.textContent = '👨‍🌾';
    name.textContent = currentLang === 'en' ? `${farmerName} (Farmer)` : `${farmerName} (शेतकरी)`;
    badge.textContent = currentLang === 'en' ? 'Farmer Dashboard' : (currentLang === 'hi' ? 'किसान डैशबोर्ड' : 'शेतकरी डॅशबोर्ड');
  } else if (role === 'procurement') {
    avatar.textContent = '📋';
    name.textContent = currentLang === 'en' ? 'Procurement Officer (Nashik APMC)' : (currentLang === 'hi' ? 'खरीद अधिकारी (नासिक)' : 'खरेदी अधिकारी (नाशिक APMC)');
    badge.textContent = currentLang === 'en' ? 'Procurement Officer' : (currentLang === 'hi' ? 'खरीद अधिकारी' : 'खरेदी अधिकारी');
  } else if (role === 'government') {
    avatar.textContent = '🏛️';
    name.textContent = currentLang === 'en' ? 'State Agriculture Dept (Maharashtra)' : (currentLang === 'hi' ? 'कृषि विभाग (महाराष्ट्र शासन)' : 'कृषी विभाग (महाराष्ट्र शासन)');
    badge.textContent = currentLang === 'en' ? 'State Analytics' : (currentLang === 'hi' ? 'राज्य विश्लेषण' : 'राज्य विश्लेषण');
  }
}

function logoutToWelcome() {
  currentRole = null;
  document.body.classList.add('no-sidebar');
  document.body.setAttribute('data-role', 'none');
  document.querySelectorAll('.role-pill').forEach(p => p.classList.remove('active'));
  closeSidebar();
  goTo('screen-welcome');
}

// ========== NAVIGATION ==========
function goTo(screenId) {
  if (screenId === 'screen-welcome') {
    currentRole = null;
    document.body.classList.add('no-sidebar');
    document.body.setAttribute('data-role', 'none');
    document.querySelectorAll('.role-pill').forEach(p => p.classList.remove('active'));
    closeSidebar();
  } else {
    // If role not yet set, determine role from screen ID
    if (!currentRole) {
      if (screenId.startsWith('screen-proc-')) {
        currentRole = 'procurement';
      } else if (screenId.startsWith('screen-gov-')) {
        currentRole = 'government';
      } else {
        currentRole = 'farmer';
      }
    }
    document.body.classList.remove('no-sidebar');
    document.body.setAttribute('data-role', currentRole);
    document.querySelectorAll('.role-pill').forEach(p => p.classList.remove('active'));
    const pill = document.getElementById('rpill-' + currentRole);
    if (pill) pill.classList.add('active');
    updateSidebarUserCard(currentRole);
  }

  const current = document.querySelector('.screen.active');
  if (current) {
    navHistory.push(current.id);
    current.classList.remove('active');
  }
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
    const body = target.querySelector('.page-body');
    if (body) body.scrollTop = 0;
    window.scrollTo(0, 0);
  }
  // Update sidebar active state
  updateSidebarActive(screenId);
  // Update bottom nav active state
  updateBottomNavActive(screenId);
  // Re-apply translations
  applyTranslations();
  applyPlaceholders();
}

function goBack() {
  if (navHistory.length > 0) {
    const prevId = navHistory.pop();
    if (prevId === 'screen-welcome') {
      logoutToWelcome();
      return;
    }
    const current = document.querySelector('.screen.active');
    if (current) current.classList.remove('active');
    const prev = document.getElementById(prevId);
    if (prev) prev.classList.add('active');
    updateSidebarActive(prevId);
    updateBottomNavActive(prevId);
    applyTranslations();
  }
}

// ========== SIDEBAR ==========
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.toggle('open');
  if (overlay) overlay.classList.toggle('open');
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
}

function updateSidebarActive(screenId) {
  const screenMapping = {
    'screen-farmer-home': 'screen-farmer-home',
    'screen-farmer-register': 'screen-farmer-home',
    'screen-farmer-profile': 'screen-farmer-home',
    'screen-notifications': 'screen-farmer-home',
    'screen-tray-guide': 'screen-tray-guide',
    'screen-tray-camera': 'screen-tray-guide',
    'screen-rejection-demo': 'screen-tray-guide',
    'screen-ai-pipeline': 'screen-tray-guide',
    'screen-individual-onions': 'screen-tray-guide',
    'screen-quality-result': 'screen-tray-guide',
    'screen-market': 'screen-market',
    'screen-gov-schemes': 'screen-gov-schemes',
    'screen-farmer-lifecycle': 'screen-farmer-lifecycle',
    'screen-farmer-feedback': 'screen-farmer-lifecycle',
    'screen-next-season': 'screen-next-season',
    'screen-chatbot': 'screen-chatbot',
    'screen-reports': 'screen-reports',
    'screen-report': 'screen-reports',
    'screen-proc-dashboard': 'screen-proc-dashboard',
    'screen-proc-map': 'screen-proc-map',
    'screen-proc-login': 'screen-proc-dashboard',
    'screen-proc-create-lot': 'screen-proc-create-lot',
    'screen-proc-tray-scan': 'screen-proc-tray-scan',
    'screen-proc-lot-result': 'screen-proc-tray-scan',
    'screen-proc-history': 'screen-proc-history',
    'screen-proc-review': 'screen-proc-review',
    'screen-gov-dashboard': 'screen-gov-dashboard',
    'screen-gov-map': 'screen-gov-map',
    'screen-gov-login': 'screen-gov-dashboard',
    'screen-gov-analytics': 'screen-gov-analytics',
    'screen-gov-reports': 'screen-gov-reports'
  };

  const target = screenMapping[screenId] || screenId;
  const items = document.querySelectorAll('#sidebar-nav .sn-item');
  items.forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-screen') === target);
  });
}

function updateBottomNavActive(screenId) {
  const activeScreen = document.getElementById(screenId);
  if (!activeScreen) return;
  const bnav = activeScreen.querySelector('.bottom-nav');
  if (!bnav) return;
  
  const buttons = bnav.querySelectorAll('.bnav-btn');
  buttons.forEach(btn => {
    const onclickAttr = btn.getAttribute('onclick') || '';
    if (onclickAttr.includes(`'${screenId}'`) || onclickAttr.includes(`"${screenId}"`)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}


// ========== ROLE SELECTION ==========
function selectRole(role) {
  currentRole = role;
  document.body.classList.remove('no-sidebar');
  document.body.setAttribute('data-role', role);

  document.querySelectorAll('.role-pill').forEach(p => p.classList.remove('active'));
  const pill = document.getElementById('rpill-' + role);
  if (pill) pill.classList.add('active');

  updateSidebarUserCard(role);

  switch (role) {
    case 'farmer':
      goTo('screen-farmer-home');
      break;
    case 'procurement':
      goTo('screen-proc-dashboard');
      break;
    case 'government':
      goTo('screen-gov-dashboard');
      break;
  }
}

// ========== REGISTRATION ==========
function completeRegistration() {
  const name = document.getElementById('f-name').value || 'राजेश पाटील';
  const nameDisplay = document.getElementById('farmer-display-name');
  if (nameDisplay) nameDisplay.textContent = name;
  
  const profileName = document.getElementById('profile-name');
  if (profileName) profileName.textContent = name;
  
  const village = document.getElementById('f-village').value || 'देवळा';
  const district = document.getElementById('f-district').value || 'नाशिक';
  const profileVillage = document.getElementById('profile-village');
  if (profileVillage) profileVillage.textContent = `${village}, ${district}`;

  goTo('screen-farmer-home');
}

// ========== CHIP SELECTION ==========
function selectChip(el) {
  const group = el.closest('.chip-group') || el.closest('.option-chips');
  if (group) {
    group.querySelectorAll('.chip, .option-chip').forEach(c => c.classList.remove('active'));
  }
  el.classList.add('active');
}

function toggleChip(el) {
  el.classList.toggle('active');
}

// ========== TARGET SELECTION ==========
function selectTarget(el) {
  document.querySelectorAll('.target-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}

// ========== EMOJI SELECTION ==========
function selectEmoji(el) {
  document.querySelectorAll('.feedback-emoji').forEach(e => e.classList.remove('active'));
  el.classList.add('active');
}

// ========== SCHEME FILTER ==========
function filterSchemes(el, category) {
  document.querySelectorAll('.scheme-cat').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  // In a real app, filter scheme cards by category
}

// ========== CAMERA SIMULATION ==========
function simulateCapture() {
  goTo('screen-ai-pipeline');
  animatePipeline();
}

function simulateProcCapture() {
  goTo('screen-ai-pipeline');
  animatePipeline(true);
}

function animatePipeline(isProcurement = false) {
  const steps = document.querySelectorAll('#pipeline-steps .ps-step');
  const fill = document.getElementById('pp-fill');
  const pct = document.getElementById('pp-pct');
  
  let currentStep = 0;
  const totalSteps = steps.length;
  
  // Reset all steps
  steps.forEach(s => {
    s.classList.remove('done', 'active');
    s.querySelector('.ps-icon').textContent = '○';
  });
  
  function advanceStep() {
    if (currentStep < totalSteps) {
      // Complete current step
      if (currentStep > 0) {
        steps[currentStep - 1].classList.remove('active');
        steps[currentStep - 1].classList.add('done');
        steps[currentStep - 1].querySelector('.ps-icon').textContent = '✓';
      }
      
      // Activate next step
      steps[currentStep].classList.add('active');
      steps[currentStep].querySelector('.ps-icon').textContent = '⟳';
      steps[currentStep].querySelector('.ps-icon').classList.add('spinner');
      
      const progress = Math.round(((currentStep + 1) / totalSteps) * 100);
      if (fill) fill.style.width = progress + '%';
      if (pct) pct.textContent = progress;
      
      currentStep++;
      
      if (currentStep < totalSteps) {
        setTimeout(advanceStep, 400 + Math.random() * 300);
      } else {
        // Complete last step
        setTimeout(() => {
          steps[currentStep - 1].classList.remove('active');
          steps[currentStep - 1].classList.add('done');
          steps[currentStep - 1].querySelector('.ps-icon').textContent = '✓';
          steps[currentStep - 1].querySelector('.ps-icon').classList.remove('spinner');
          if (fill) fill.style.width = '100%';
          if (pct) pct.textContent = '100';
          
          // Navigate to result
          setTimeout(() => {
            if (isProcurement) {
              goTo('screen-proc-lot-result');
            } else {
              goTo('screen-quality-result');
            }
          }, 600);
        }, 400);
      }
    }
  }
  
  setTimeout(advanceStep, 300);
}

// ========== INDIVIDUAL ONIONS GRID ==========
function renderOnionGrid() {
  const grid = document.getElementById('onion-grid');
  if (!grid) return;
  
  grid.innerHTML = '';
  demoOnions.forEach(onion => {
    const statusLabel = translations[onion.statusKey] ? translations[onion.statusKey][currentLang] : onion.status;
    const badge = onion.status === 'healthy' ? '✅' : onion.status === 'rotten' ? '❌' : '⚠️';
    const confClass = onion.confidence < 70 ? 'low-conf-text' : '';
    
    grid.innerHTML += `
      <div class="onion-card">
        <p class="oc-num">Onion #${String(onion.id).padStart(2, '0')}</p>
        <div class="oc-visual oc-${onion.status}">🧅<span class="oc-badge">${badge}</span></div>
        <p class="oc-status ${onion.status}">${statusLabel}</p>
        <p class="oc-details">${onion.size} · ${onion.sizeMM}mm</p>
        <p class="oc-details">${onion.defect === 'None' ? '—' : onion.defect}</p>
        <p class="oc-conf ${confClass}">🤖 ${onion.confidence}%</p>
      </div>
    `;
  });
}

// ========== CHATBOT (INTERACTIVE Q&A ENGINE) ==========
let activeChatTopic = 'all';

function formatChatText(text) {
  if (!text) return '';
  // Convert markdown bold **text** to <strong>
  let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Convert markdown italic *text* to <em>
  formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Convert bullet points and line breaks
  formatted = formatted.split('\n').map(line => {
    line = line.trim();
    if (line.startsWith('• ') || line.startsWith('- ')) {
      return `<div style="padding-left:14px;margin-bottom:4px;text-indent:-12px;">${line}</div>`;
    }
    if (/^\d+\.\s/.test(line)) {
      return `<div style="padding-left:16px;margin-bottom:4px;text-indent:-14px;">${line}</div>`;
    }
    return line ? `<p style="margin-bottom:6px;">${line}</p>` : '<div style="height:6px;"></div>';
  }).join('');
  return formatted;
}

function renderChatSuggestions(category = activeChatTopic) {
  activeChatTopic = category;
  const container = document.getElementById('chat-suggestions');
  if (!container) return;

  container.innerHTML = '';
  const items = category === 'all' 
    ? qaKnowledgeBase 
    : qaKnowledgeBase.filter(item => item.category === category);

  // Take up to 5 relevant questions
  items.slice(0, 5).forEach(item => {
    const qText = item.question[currentLang] || item.question.en;
    const btn = document.createElement('button');
    btn.className = 'chat-sug';
    btn.textContent = qText;
    btn.onclick = () => askBot(qText);
    container.appendChild(btn);
  });
}

function filterChatTopic(category, btn) {
  document.querySelectorAll('.chat-topic-pill').forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderChatSuggestions(category);
}

function clearChat() {
  const container = document.getElementById('chat-messages');
  if (container) container.innerHTML = '';
  const welcome = document.getElementById('chat-welcome');
  if (welcome) welcome.style.display = 'block';
  renderChatSuggestions(activeChatTopic);
}

function sendChat() {
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if (!msg) return;

  // Hide welcome banner once chat begins
  const welcome = document.getElementById('chat-welcome');
  if (welcome) welcome.style.display = 'none';

  // Add user message
  addChatMessage(msg, 'user');
  input.value = '';

  // Show typing indicator
  showChatTyping();

  // Generate verified intelligent answer
  setTimeout(() => {
    hideChatTyping();
    const answer = getChatAnswer(msg, currentLang);
    addChatMessage(answer, 'bot');
  }, 600);
}

function askBot(question) {
  const input = document.getElementById('chat-input');
  input.value = question;
  sendChat();
}

function showChatTyping() {
  hideChatTyping();
  const container = document.getElementById('chat-messages');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'chat-typing';
  typingDiv.id = 'chat-typing-indicator';
  typingDiv.innerHTML = `<span></span><span></span><span></span> <small style="margin-left:6px;color:var(--text-muted);font-size:11px;">Thinking...</small>`;
  container.appendChild(typingDiv);
  
  const chatBody = document.getElementById('chat-body');
  if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
}

function hideChatTyping() {
  const el = document.getElementById('chat-typing-indicator');
  if (el) el.remove();
}

function addChatMessage(text, sender) {
  const container = document.getElementById('chat-messages');
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-msg ${sender}`;
  if (sender === 'bot') {
    msgDiv.innerHTML = formatChatText(text);
  } else {
    msgDiv.textContent = text;
  }
  container.appendChild(msgDiv);

  // Scroll to bottom
  const chatBody = document.getElementById('chat-body');
  if (chatBody) {
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
  }
}

// Handle enter key in chat
document.addEventListener('DOMContentLoaded', () => {
  const chatInput = document.getElementById('chat-input');
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendChat();
    });
  }
  renderChatSuggestions('all');
});

// ========== LIFECYCLE ACTIVATION ==========
function activateLifecycle() {
  lifecycleActivated = true;
  const prompt = document.getElementById('lifecycle-prompt');
  const timeline = document.getElementById('lifecycle-timeline');
  const tasks = document.getElementById('lifecycle-tasks');
  const homeCard = document.getElementById('home-lifecycle-card');
  
  if (prompt) prompt.style.display = 'none';
  if (timeline) timeline.style.display = 'block';
  if (tasks) tasks.style.display = 'block';
  if (homeCard) homeCard.style.display = 'block';
}

// ========== FEEDBACK ==========
function submitFeedback() {
  const msgs = {
    mr: 'तुमचा अभिप्राय यशस्वीरित्या पाठवला! तुम्हाला पुढील हंगामासाठी मार्गदर्शन हवे आहे का?',
    hi: 'आपकी प्रतिक्रिया सफलतापूर्वक भेजी गई! क्या आप अगले मौसम के लिए मार्गदर्शन चाहते हैं?',
    en: 'Your feedback has been submitted successfully! Would you like next-season guidance?'
  };
  
  if (confirm(msgs[currentLang] || msgs.en)) {
    goTo('screen-next-season');
  } else {
    goTo('screen-farmer-home');
  }
}

// ========== HUMAN REVIEW ==========
function confirmReview(btn) {
  const card = btn.closest('.review-card');
  if (card) {
    card.style.opacity = '0.5';
    card.style.pointerEvents = 'none';
    const header = card.querySelector('.review-header');
    if (header) {
      header.style.background = '#dcfce7';
      header.style.borderColor = '#86efac';
    }
    const conf = card.querySelector('.review-conf');
    if (conf) {
      conf.textContent = '✓ Confirmed';
      conf.className = 'review-conf';
      conf.style.background = '#dcfce7';
      conf.style.color = '#15803d';
    }
  }
}

function showCorrectOptions(btn) {
  const card = btn.closest('.review-card');
  if (card) {
    const options = card.querySelector('.correction-options');
    if (options) options.style.display = 'block';
  }
}

function submitCorrection(btn) {
  const card = btn.closest('.review-card');
  if (card) {
    card.style.opacity = '0.5';
    card.style.pointerEvents = 'none';
    const header = card.querySelector('.review-header');
    if (header) {
      header.style.background = '#fef3c7';
      header.style.borderColor = '#fde68a';
    }
    const conf = card.querySelector('.review-conf');
    if (conf) {
      conf.textContent = '✏️ Corrected';
      conf.className = 'review-conf';
      conf.style.background = '#fef3c7';
      conf.style.color = '#92400e';
    }
  }
}

// ========== MODALS ==========
function showQR() {
  document.getElementById('modal-qr').classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

// ========== PDF DOWNLOAD (SIMULATION) ==========
function downloadPDF() {
  const msgs = {
    mr: 'PDF अहवाल डाउनलोड होत आहे... (डेमो)',
    hi: 'PDF रिपोर्ट डाउनलोड हो रही है... (डेमो)',
    en: 'Downloading PDF report... (Demo)'
  };
  alert(msgs[currentLang] || msgs.en);
}

// ========== VOICE / TTS ==========
function speak(key) {
  if ('speechSynthesis' in window) {
    const text = translations[key] ? translations[key][currentLang] : '';
    if (text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLang === 'mr' ? 'mr-IN' : currentLang === 'hi' ? 'hi-IN' : 'en-IN';
      speechSynthesis.speak(utterance);
    }
  }
}

function startVoiceInput() {
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = currentLang === 'mr' ? 'mr-IN' : currentLang === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.interimResults = false;
    
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      const chatInput = document.getElementById('chat-input');
      if (chatInput) {
        chatInput.value = text;
        sendChat();
      }
    };
    
    recognition.onerror = () => {
      const msgs = {
        mr: 'आवाज ओळख उपलब्ध नाही. कृपया लिहा.',
        hi: 'आवाज पहचान उपलब्ध नहीं। कृपया लिखें।',
        en: 'Voice recognition not available. Please type instead.'
      };
      alert(msgs[currentLang] || msgs.en);
    };
    
    recognition.start();
  } else {
    alert('Voice input not supported in this browser.');
  }
}

// ========== PROCUREMENT MANDIS & INTERACTIVE MAP ==========
const procMandis = {
  nashik: {
    name: "📍 नाशिक APMC",
    sub: "कांदा खरेदी व प्रतवारी केंद्र · 02 Oct 2026",
    gradeBadge: "Grade A: 82%",
    gradeClass: "good",
    todayLots: "486",
    arrivals: "1,450 Q",
    passRate: "94%",
    avgSize: "68 mm",
    reviewPending: "3",
    avgPrice: "₹1,100"
  },
  lasalgaon: {
    name: "📍 लासलगाव APMC",
    sub: "आशियातील सर्वात मोठी कांदा बाजारपेठ · 02 Oct 2026",
    gradeBadge: "Grade A: 79%",
    gradeClass: "good",
    todayLots: "312",
    arrivals: "2,100 Q",
    passRate: "91%",
    avgSize: "66 mm",
    reviewPending: "2",
    avgPrice: "₹1,200"
  },
  pimpalgaon: {
    name: "📍 पिंपळगाव APMC",
    sub: "प्रमुख आवक व प्रतवारी केंद्र · 02 Oct 2026",
    gradeBadge: "Grade A: 71%",
    gradeClass: "moderate",
    todayLots: "198",
    arrivals: "980 Q",
    passRate: "88%",
    avgSize: "64 mm",
    reviewPending: "4",
    avgPrice: "₹1,050"
  },
  manmad: {
    name: "📍 मनमाड APMC",
    sub: "रेल्वे वाहतूक संलग्न खरेदी केंद्र · 02 Oct 2026",
    gradeBadge: "Grade A: 68%",
    gradeClass: "moderate",
    todayLots: "145",
    arrivals: "720 Q",
    passRate: "85%",
    avgSize: "63 mm",
    reviewPending: "1",
    avgPrice: "₹1,000"
  },
  solapur: {
    name: "📍 सोलापूर APMC",
    sub: "⚠️ गुणवत्ता चिंता केंद्र (सखोल तपासणी आवश्यक)",
    gradeBadge: "Grade A: 52% (Alert)",
    gradeClass: "low-conf-text",
    todayLots: "120",
    arrivals: "640 Q",
    passRate: "72%",
    avgSize: "59 mm",
    reviewPending: "8",
    avgPrice: "₹850"
  },
  dhule: {
    name: "📍 धुळे APMC",
    sub: "खान्देश विभाग कांदा खरेदी केंद्र · 02 Oct 2026",
    gradeBadge: "Grade A: 76%",
    gradeClass: "good",
    todayLots: "96",
    arrivals: "510 Q",
    passRate: "93%",
    avgSize: "65 mm",
    reviewPending: "0",
    avgPrice: "₹1,080"
  }
};

function selectProcMandi(mandiId) {
  const data = procMandis[mandiId];
  if (!data) return;

  const nameEl = document.getElementById('pmd-name');
  const subEl = document.getElementById('pmd-sub');
  const badgeEl = document.getElementById('pmd-grade-badge');
  const lotsEl = document.getElementById('pmd-today-lots');
  const arrEl = document.getElementById('pmd-arrivals');
  const passEl = document.getElementById('pmd-pass-rate');
  const sizeEl = document.getElementById('pmd-avg-size');
  const revEl = document.getElementById('pmd-review-pending');
  const priceEl = document.getElementById('pmd-avg-price');

  if (nameEl) nameEl.textContent = data.name;
  if (subEl) subEl.textContent = data.sub;
  if (badgeEl) {
    badgeEl.textContent = data.gradeBadge;
    badgeEl.className = 'badge ' + data.gradeClass;
  }
  if (lotsEl) lotsEl.textContent = data.todayLots;
  if (arrEl) arrEl.textContent = data.arrivals;
  if (passEl) passEl.textContent = data.passRate;
  if (sizeEl) sizeEl.textContent = data.avgSize;
  if (revEl) revEl.textContent = data.reviewPending;
  if (priceEl) priceEl.textContent = data.avgPrice;

  // Highlight pin
  document.querySelectorAll('.proc-mandi-map .map-pin').forEach(pin => {
    pin.classList.remove('pin-active');
  });
  const activePin = document.getElementById('proc-pin-' + mandiId);
  if (activePin) activePin.classList.add('pin-active');

  // Update select if needed
  const sel = document.getElementById('proc-mandi-select');
  if (sel && sel.value !== mandiId) sel.value = mandiId;
}

function filterProcMap(val) {
  if (val === 'all') {
    selectProcMandi('nashik');
  } else {
    selectProcMandi(val);
  }
}

// ========== GOVERNMENT DISTRICTS & MAP ==========
const govDistricts = {
  nashik: {
    name: "📍 नाशिक जिल्हा",
    quality: "82% (उत्कृष्ट)",
    gradeA: "74%",
    lots: "1,486 लॉट",
    lowRate: "87 शेतकरी",
    schemeStatus: "✅ 100% साठवणूक अनुदान वाटप"
  },
  ahmednagar: {
    name: "📍 अहमदनगर जिल्हा",
    quality: "69% (चांगली)",
    gradeA: "65%",
    lots: "940 लॉट",
    lowRate: "156 शेतकरी",
    schemeStatus: "⏳ 156 कांदा अनुदान प्रलंबित"
  },
  pune: {
    name: "📍 पुणे जिल्हा",
    quality: "63% (मध्यम)",
    gradeA: "58%",
    lots: "680 लॉट",
    lowRate: "128 शेतकरी",
    schemeStatus: "🔄 कांदा अनुदान प्रक्रियेत"
  },
  solapur: {
    name: "📍 सोलापूर जिल्हा ⚠️",
    quality: "52% (चिंताजनक)",
    gradeA: "44%",
    lots: "530 लॉट",
    lowRate: "531 शेतकरी",
    schemeStatus: "✅ 342 वाटप पूर्ण · 189 चाळ प्रलंबित"
  },
  dhule: {
    name: "📍 धुळे जिल्हा",
    quality: "76% (चांगली)",
    gradeA: "71%",
    lots: "410 लॉट",
    lowRate: "215 शेतकरी",
    schemeStatus: "✅ 100% कांदा अनुदान वाटप पूर्ण"
  }
};

function selectGovDistrict(distId) {
  const d = govDistricts[distId];
  if (!d) return;

  const nameEl = document.getElementById('gdd-name');
  const qEl = document.getElementById('gdd-quality');
  const gaEl = document.getElementById('gdd-grade-a');
  const lotsEl = document.getElementById('gdd-lots');
  const lowEl = document.getElementById('gdd-low-rate');
  const schEl = document.getElementById('gdd-scheme-status');

  if (nameEl) nameEl.textContent = d.name;
  if (qEl) qEl.textContent = d.quality;
  if (gaEl) gaEl.textContent = d.gradeA;
  if (lotsEl) lotsEl.textContent = d.lots;
  if (lowEl) lowEl.textContent = d.lowRate;
  if (schEl) schEl.textContent = d.schemeStatus;

  const sel = document.getElementById('gov-map-district-select');
  if (sel && sel.value !== distId) sel.value = distId;
}

function filterGovMap(val) {
  if (val === 'all') {
    selectGovDistrict('nashik');
  } else {
    selectGovDistrict(val);
  }
}

// ========== ROLE QUICK SWITCH (from control bar & sidebar) ==========
function switchRole(role) {
  selectRole(role);
}

// ========== QUICK DEMO (1-click from welcome) ==========
function quickDemo() {
  const nameDisplay = document.getElementById('farmer-display-name');
  if (nameDisplay) nameDisplay.textContent = 'राजेश पाटील';
  const profileName = document.getElementById('profile-name');
  if (profileName) profileName.textContent = 'राजेश पाटील';
  
  selectRole('farmer');
}

// ========== IMAGE REJECTION DEMO ==========
function showRejectionDemo() {
  goTo('screen-rejection-demo');
}

function resetCamera() {
  const rejection = document.getElementById('camera-rejection');
  const captureBtn = document.getElementById('capture-btn');
  const checks = document.getElementById('camera-checks');
  
  if (rejection) rejection.style.display = 'none';
  if (captureBtn) captureBtn.style.display = 'flex';
  if (checks) checks.style.display = 'flex';
}

function simulateRejection() {
  const rejection = document.getElementById('camera-rejection');
  const captureBtn = document.getElementById('capture-btn');
  const checks = document.getElementById('camera-checks');
  
  if (rejection) rejection.style.display = 'block';
  if (captureBtn) captureBtn.style.display = 'none';
  if (checks) checks.style.display = 'none';
}

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
  // Always start on welcome screen with no-sidebar
  const welcomeScreen = document.getElementById('screen-welcome');
  if (welcomeScreen && welcomeScreen.classList.contains('active')) {
    currentRole = null;
    document.body.classList.add('no-sidebar');
    document.body.setAttribute('data-role', 'none');
    document.querySelectorAll('.role-pill').forEach(p => p.classList.remove('active'));
  }

  // Apply initial translations
  applyTranslations();
  applyPlaceholders();
  
  // Render onion grid
  renderOnionGrid();
  
  // Watch for screen changes to re-render dynamic content
  const observer = new MutationObserver(() => {
    const indivScreen = document.getElementById('screen-individual-onions');
    if (indivScreen && indivScreen.classList.contains('active')) {
      renderOnionGrid();
    }
  });
  
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    observer.observe(mainContent, {
      subtree: true,
      attributeFilter: ['class']
    });
  }
});

// Make sure all functions are globally accessible
window.goTo = goTo;
window.goBack = goBack;
window.selectRole = selectRole;
window.completeRegistration = completeRegistration;
window.selectChip = selectChip;
window.toggleChip = toggleChip;
window.selectTarget = selectTarget;
window.selectEmoji = selectEmoji;
window.filterSchemes = filterSchemes;
window.simulateCapture = simulateCapture;
window.simulateProcCapture = simulateProcCapture;
window.sendChat = sendChat;
window.askBot = askBot;
window.activateLifecycle = activateLifecycle;
window.submitFeedback = submitFeedback;
window.confirmReview = confirmReview;
window.showCorrectOptions = showCorrectOptions;
window.submitCorrection = submitCorrection;
window.showQR = showQR;
window.closeModal = closeModal;
window.downloadPDF = downloadPDF;
window.speak = speak;
window.startVoiceInput = startVoiceInput;
window.showDistrictInfo = showDistrictInfo;
window.setLang = setLang;
window.setDeviceView = setDeviceView;
window.switchRole = switchRole;
window.quickDemo = quickDemo;
window.logoutToWelcome = logoutToWelcome;
window.updateSidebarUserCard = updateSidebarUserCard;
window.showRejectionDemo = showRejectionDemo;
window.resetCamera = resetCamera;
window.simulateRejection = simulateRejection;
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;
window.selectProcMandi = selectProcMandi;
window.filterProcMap = filterProcMap;
window.selectGovDistrict = selectGovDistrict;
window.filterGovMap = filterGovMap;
window.filterChatTopic = filterChatTopic;
window.clearChat = clearChat;
window.renderChatSuggestions = renderChatSuggestions;
window.getChatAnswer = getChatAnswer;
