import { Product, Currency } from '../types';

import heroImg from '../assets/images/hero_pakistan_summer_lawn_1791269454912.jpg';
import mintChikanImg from '../assets/images/product_mint_chikankari_1791269469495.jpg';
import roseLawnImg from '../assets/images/product_rose_lawn_suit_1791269485989.jpg';
import ivoryFestiveImg from '../assets/images/product_ivory_festive_1791269501048.jpg';
import craftDetailImg from '../assets/images/craft_artisanal_embroidery_1791269515540.jpg';
import amberSaffronImg from '../assets/images/product_amber_saffron_lawn_1791271030968.jpg';
import indigoChunriImg from '../assets/images/product_indigo_chunri_pret_1791271042761.jpg';
import lilacOrganzaImg from '../assets/images/product_lilac_organza_eid_1791271053280.jpg';
import emeraldSuitImg from '../assets/images/product_emerald_jamdani_suit_1791271064221.jpg';

export const CURRENCIES: Currency[] = [
  { code: 'PKR', symbol: '₨', rate: 1, label: 'PKR (Pakistani Rupee)' },
  { code: 'USD', symbol: '$', rate: 0.0036, label: 'USD (US Dollar)' },
  { code: 'GBP', symbol: '£', rate: 0.0028, label: 'GBP (British Pound)' },
  { code: 'AED', symbol: 'AED', rate: 0.0132, label: 'AED (UAE Dirham)' },
  { code: 'SAR', symbol: 'SAR', rate: 0.0135, label: 'SAR (Saudi Riyal)' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'kb-mint-01',
    name: 'Firoza Chikankari Ensemble',
    urduName: 'فیروزہ چکن کاری',
    collection: 'Mausam-e-Gulzar 2026',
    category: 'Handcrafted Chikankari',
    fabric: 'Pure Cotton Mulmul & Organza',
    colorFamily: 'Pistachio Sage',
    basePricePKR: 16500,
    images: [mintChikanImg, craftDetailImg, heroImg],
    description: 'An ode to summer breeze. Handcrafted shadow-work chikankari rendered on heirloom breathable mint mulmul, adorned with delicate freshwater seed pearls along the jewel neckline and scalloped sheer organza dupatta.',
    fabricDetails: {
      shirt: '3.15m Pure Cotton Mulmul with Hand-Embroidered Chikankari jaal',
      dupatta: '2.5m Sheer Organza with Four-Sided Embroidered Scalloped Borders',
      trouser: '2.5m Dyed Cotton Cambric with Matching Pearl Lace Daman Patch',
      embroidery: 'Needlework Shadow Work, Fine Ivory Taanka, Seed Pearl embellishment',
    },
    inStock: true,
    featured: true,
    bestseller: true,
    sizesAvailable: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewsCount: 48,
  },
  {
    id: 'kb-rose-02',
    name: 'Gul-e-Kashmir Luxury Lawn',
    urduName: 'گلِ کشمیر لگژری لان',
    collection: 'Mausam-e-Gulzar 2026',
    category: 'Summer Lawn 3-Piece',
    fabric: 'Combed 80s Swiss Lawn',
    colorFamily: 'Tea Rose Blush',
    basePricePKR: 14800,
    images: [roseLawnImg, craftDetailImg, heroImg],
    description: 'Inspired by Lahore’s historic Shalimar rose beds. Premium 80s count combed lawn featuring resham-threaded Kashmiri floral sprays along the daman, paired with a featherlight digitally illustrated pure silk dupatta.',
    fabricDetails: {
      shirt: '3.25m Digital Printed & Resham Embroidered 80s Pima Lawn',
      dupatta: '2.5m Ultra-Fine Lightweight Pure Silk with Floral Foliage Motifs',
      trouser: '2.5m Mercerized Cotton Cambric with Organza Cutwork Patch',
      embroidery: 'Resham Kashmiri Floral Tilla, Schiffli Lace Borders',
    },
    inStock: true,
    featured: true,
    bestseller: true,
    sizesAvailable: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviewsCount: 39,
  },
  {
    id: 'kb-emerald-03',
    name: 'Zamurrad Emerald Festive Suit',
    urduName: 'زمرد فیسٹیو جوڑا',
    collection: 'Shahi Mahal Festive',
    category: 'Festive Pret',
    fabric: 'Self-Weave Cotton Net & Organza',
    colorFamily: 'Emerald Pine',
    basePricePKR: 21500,
    images: [emeraldSuitImg, craftDetailImg, ivoryFestiveImg],
    description: 'Royal deep emerald festive lawn with delicate peach blossom resham needlecraft and antique golden tilla. Styled with fluid tailored culottes and a sheer scalloped organza dupatta designed for summer celebratory evenings.',
    fabricDetails: {
      shirt: '3.3m Self-Weave Cotton Net with Peach Resham & Tilla Borders',
      dupatta: '2.5m Hand-Embroidered Scalloped Organza Dupatta',
      trouser: '2.5m Raw Silk Cigarette Bottom Fabric with Gota Edging',
      embroidery: 'Zari Taanka, Peach Resham Threadwork, Organza Cutwork',
    },
    inStock: true,
    featured: true,
    bestseller: true,
    sizesAvailable: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 5.0,
    reviewsCount: 34,
  },
  {
    id: 'kb-ivory-04',
    name: 'Noor-e-Jahan Festive Angrakha',
    urduName: 'نورِ جہاں انگرکھا',
    collection: 'Shahi Mahal Festive',
    category: 'Festive Pret',
    fabric: 'Cotton Net & Tissue Organza',
    colorFamily: 'Ivory Pearl',
    basePricePKR: 22500,
    images: [ivoryFestiveImg, craftDetailImg, roseLawnImg],
    description: 'A regal silhouette for celebratory summer evenings and Eid soirees. Graceful ivory and subtle antique gold angrakha cut featuring authentic Marori stitch work, hand-set gota patti, and gossamer bamber chiffon dupatta.',
    fabricDetails: {
      shirt: '3.5m Heavy Handcrafted Cotton Net with Marori & Zari Work',
      dupatta: '2.6m Bamber Crinkle Chiffon with Heavy Kiran Lace Borders',
      trouser: '2.5m Raw Silk Trouser with Gota Patti Hem Trim',
      embroidery: 'Handmade Gota Patti, Antique Zari Thread, Mukaish Dotting',
    },
    inStock: true,
    featured: true,
    bestseller: false,
    sizesAvailable: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 5.0,
    reviewsCount: 27,
  },
  {
    id: 'kb-amber-05',
    name: 'Zaffran Saffron Marigold Lawn',
    urduName: 'زعفران گیندا لان',
    collection: 'Mausam-e-Gulzar 2026',
    category: 'Summer Lawn 3-Piece',
    fabric: 'Jacquard Lawn & Pure Silk',
    colorFamily: 'Saffron Ochre',
    basePricePKR: 15400,
    images: [amberSaffronImg, craftDetailImg, roseLawnImg],
    description: 'Warm saffron marigold tones echoing Lahore sunset courtyards. Woven in breathable self-textured jacquard lawn with delicate antique gold floral needlework and an illustrated pure silk dupatta.',
    fabricDetails: {
      shirt: '3.2m Tonal Textured Jacquard Lawn with Embroidered Neck & Daman',
      dupatta: '2.5m Digitally Illustrated Lightweight Pure Silk',
      trouser: '2.5m Premium Dyed Cambric with Lace Inserts',
      embroidery: 'Matte Gold Tilla, Resham Taanka, Hand-Set Seed Beads',
    },
    inStock: true,
    featured: true,
    bestseller: false,
    sizesAvailable: ['XS', 'S', 'M', 'L'],
    rating: 4.8,
    reviewsCount: 23,
  },
  {
    id: 'kb-indigo-06',
    name: 'Neelam Chunri Lawn Set',
    urduName: 'نیلم چونری سوٹ',
    collection: 'Artisan Heritage Series',
    category: 'Handcrafted Chikankari',
    fabric: 'Fine Cotton Mulmul & Chiffon',
    colorFamily: 'Powder Indigo',
    basePricePKR: 17900,
    images: [indigoChunriImg, craftDetailImg, mintChikanImg],
    description: 'Cooling indigo and turquoise traditional chunri tie-dye pattern on featherweight breathable mulmul lawn. Detailed with white shadow-work needlecraft and pure bamber chiffon dupatta.',
    fabricDetails: {
      shirt: '3.1m Hand-Dyed Chunri Mulmul with Fine Taanka Neckline',
      dupatta: '2.5m Pure Bamber Chiffon with Silver Gota Borders',
      trouser: '2.5m Breathable Cotton Trouser with Scallop Details',
      embroidery: 'Authentic Bakhiya, Murri & Phanda Hand Embroidery',
    },
    inStock: true,
    featured: false,
    bestseller: true,
    sizesAvailable: ['S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewsCount: 31,
  },
  {
    id: 'kb-lilac-07',
    name: 'Yasmeen Lilac Organza Pret',
    urduName: 'یاسمین لیلک پرنٹ',
    collection: 'Mausam-e-Gulzar 2026',
    category: 'Chiffon & Silk',
    fabric: 'Swiss Voile & Laser Organza',
    colorFamily: 'Pastel Lilac',
    basePricePKR: 18900,
    images: [lilacOrganzaImg, craftDetailImg, ivoryFestiveImg],
    description: 'Ethereal pastel lavender Swiss voile paired with intricate white chikankari floral jaal, laser-cut organza cuffs and hemline, and a feather-soft printed organza dupatta that floats in warm breeze.',
    fabricDetails: {
      shirt: '3.2m Premium Swiss Voile with Laser-Cut Organza Cuffs & Hem',
      dupatta: '2.5m Flowing Printed Sheer Organza with Four-Sided Lace',
      trouser: '2.5m Dyed Cotton Silk Trouser Fabric',
      embroidery: 'White Chikankari Taanka, Laser Cutwork, Pearl Neckline',
    },
    inStock: true,
    featured: true,
    bestseller: false,
    sizesAvailable: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewsCount: 28,
  },
  {
    id: 'kb-chambeli-08',
    name: 'Chambeli White Silk Lawn',
    urduName: 'چمبیلی وائٹ سلک لان',
    collection: 'Shahi Mahal Festive',
    category: 'Chiffon & Silk',
    fabric: 'Silk Lawn & Organza',
    colorFamily: 'Ivory Pearl',
    basePricePKR: 19800,
    images: [ivoryFestiveImg, craftDetailImg, heroImg],
    description: 'Chambeli (jasmine) is Pakistan’s national flower and the heartbeat of summer nostalgia. A luminous white-on-white composition with tone-on-tone embroidery, organza laser cuts, and a delicate foil-printed dupatta.',
    fabricDetails: {
      shirt: '3.2m Silk Lawn with Laser-Cut Organza Applique Neckline',
      dupatta: '2.5m Foil-Printed Organza Dupatta with Tassel Borders',
      trouser: '2.5m Fine Cotton Silk Trouser',
      embroidery: 'White-on-White Silk Floss Threadwork, Gota Tassels',
    },
    inStock: true,
    featured: false,
    bestseller: false,
    sizesAvailable: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewsCount: 22,
  },
];

export const ARTISANAL_NOTES = {
  heroTitle: "Mausam-e-Gulzar '26",
  heroSubtitle: "Breathable Lawn & Heirlooms of Multan & Lahore",
  craftsmanshipTitle: "The Poetry of Hand-Worked Pakistani Summer Textiles",
  craftsmanshipStory: "In the warm embrace of the Indus plains, Pakistani lawn has evolved from simple breathable summer cotton into a celebrated art form. Each piece in SANAVA's Summer '26 edit marries whisper-light 80s combed Egyptian-grade lawn with generational needlecraft—from Multani shadow-work chikankari to Bahawalpuri gota patti and Kashmiri floral resham. Designed to float effortlessly in 40°C summer warmth while retaining regal elegance.",
  pillars: [
    {
      title: "Combed 80s Pima Lawn",
      detail: "Ultra-breathable high-twist long-staple cotton yarns engineered specifically for South Asian midsummers."
    },
    {
      title: "Generational Needlecraft",
      detail: "Hand-embroidery by women artisan guilds in Multan, Bahawalpur, and Swat preserving heritage taanka stitches."
    },
    {
      title: "Custom Bespoke Tailoring",
      detail: "Choose between traditional unstitched 3-piece fabric or bespoke stitching tailored to your exact measurements."
    }
  ]
};

export const REVIEWS_DATA = [
  {
    id: 'r1',
    author: 'Ayesha K.',
    city: 'Lahore, Pakistan',
    verified: true,
    rating: 5,
    title: 'The fabric lawn breathes like pure air',
    comment: 'The Firoza Chikankari arrived in beautiful ivory packaging. The lawn is so soft for the Lahore summer heat, and the organza dupatta finish is completely ethereal. Will definitely order the rose ensemble next!',
    productName: 'Firoza Chikankari Ensemble'
  },
  {
    id: 'r2',
    author: 'Zainab M.',
    city: 'London, UK',
    verified: true,
    rating: 5,
    title: 'Custom stitching fit was absolute perfection',
    comment: 'Being in London, finding authentic Pakistani tailoring is always stressful. SANAVA’s bespoke stitching option got my shirt length and cigarette pants measurements spot on. DHL express delivery took just 4 days.',
    productName: 'Gul-e-Kashmir Luxury Lawn'
  },
  {
    id: 'r3',
    author: 'Hiba R.',
    city: 'Dubai, UAE',
    verified: true,
    rating: 5,
    title: 'Exquisite needlework and dupatta drape',
    comment: 'Wore the Noor-e-Jahan Angrakha for a summer Eid gathering here in Dubai. Got countless compliments on the antique gota patti and the delicate crinkle chiffon. Truly luxury cultural fashion.',
    productName: 'Noor-e-Jahan Festive Angrakha'
  }
];
