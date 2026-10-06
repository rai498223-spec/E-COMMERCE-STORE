export type StitchType = 'unstitched' | 'ready-to-wear' | 'custom-stitched';

export type CurrencyCode = 'PKR' | 'USD' | 'GBP' | 'AED' | 'SAR';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  rate: number;
  label: string;
}

export interface CustomMeasurements {
  bust: number;
  shirtLength: number;
  waist: number;
  hips: number;
  sleeveLength: number;
  necklineStyle: 'Split V-Keyhole with Tassels' | 'Boat Neck with Pearl Loop' | 'Angrakha Wrap Overlap' | 'Classic Round with Organza Insert';
  sleeveStyle: 'Bell Sleeves with Cutwork Lace' | 'Straight Fitted with Pearl Buttons' | 'Flared 3/4 with Organza Borders';
  trouserStyle: 'Straight Cigarette Trousers' | 'Classic Tulip Shalwar' | 'Flared Organza Culottes' | 'Festive Wide-Leg Gharara Pants';
  specialNotes?: string;
}

export interface Product {
  id: string;
  name: string;
  urduName: string;
  collection: string;
  category: 'Summer Lawn 3-Piece' | 'Handcrafted Chikankari' | 'Festive Pret' | 'Chiffon & Silk';
  fabric: string;
  colorFamily: string;
  basePricePKR: number;
  images: string[];
  description: string;
  fabricDetails: {
    shirt: string;
    dupatta: string;
    trouser: string;
    embroidery: string;
  };
  inStock: boolean;
  featured: boolean;
  bestseller?: boolean;
  sizesAvailable: ('XS' | 'S' | 'M' | 'L' | 'XL')[];
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  stitchType: StitchType;
  selectedSize?: 'XS' | 'S' | 'M' | 'L' | 'XL';
  customMeasurements?: CustomMeasurements;
  quantity: number;
  unitPricePKR: number;
}

export interface OrderItem {
  productName: string;
  stitchType: StitchType;
  size?: string;
  quantity: number;
  price: string;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  shippingAddress: string;
  paymentMethod: 'cod' | 'card';
  items: OrderItem[];
  subtotal: string;
  shippingFee: string;
  discount: string;
  total: string;
  orderDate: string;
  estimatedDelivery: string;
}
