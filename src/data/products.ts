import type { Product, Review } from '@/types/product';

// Product images
import p1Main from '@/assets/products/p1-main.jpg';
import p1Thumb1 from '@/assets/products/p1-thumb1.jpg';
import p1Thumb2 from '@/assets/products/p1-thumb2.jpg';
import p1Thumb3 from '@/assets/products/p1-thumb3.jpg';

import p2Main from '@/assets/products/p2-main.jpg';
import p2Thumb1 from '@/assets/products/p2-thumb1.jpg';
import p2Thumb2 from '@/assets/products/p2-thumb2.jpg';
import p2Thumb3 from '@/assets/products/p2-thumb3.jpg';

import p3Main from '@/assets/products/p3-main.jpg';
import p3Thumb1 from '@/assets/products/p3-thumb1.jpg';
import p3Thumb2 from '@/assets/products/p3-thumb2.jpg';
import p3Thumb3 from '@/assets/products/p3-thumb3.jpg';

import p4Main from '@/assets/products/p4-main.jpg';
import p4Thumb1 from '@/assets/products/p4-thumb1.jpg';
import p4Thumb2 from '@/assets/products/p4-thumb2.jpg';
import p4Thumb3 from '@/assets/products/p4-thumb3.jpg';

import p5Main from '@/assets/products/p5-main.jpg';
import p5Thumb1 from '@/assets/products/p5-thumb1.jpg';
import p5Thumb2 from '@/assets/products/p5-thumb2.jpg';
import p5Thumb3 from '@/assets/products/p5-thumb3.jpg';

import p6Main from '@/assets/products/p6-main.jpg';
import p6Thumb1 from '@/assets/products/p6-thumb1.jpg';
import p6Thumb2 from '@/assets/products/p6-thumb2.jpg';
import p6Thumb3 from '@/assets/products/p6-thumb3.jpg';

import p7Main from '@/assets/products/p7-main.jpg';
import p7Thumb1 from '@/assets/products/p7-thumb1.jpg';
import p7Thumb2 from '@/assets/products/p7-thumb2.jpg';
import p7Thumb3 from '@/assets/products/p7-thumb3.jpg';

import p8Main from '@/assets/products/p8-main.jpg';
import p8Thumb1 from '@/assets/products/p8-thumb1.jpg';
import p8Thumb2 from '@/assets/products/p8-thumb2.jpg';
import p8Thumb3 from '@/assets/products/p8-thumb3.jpg';

import p9Main from '@/assets/products/p9-main.jpg';
import p9Thumb1 from '@/assets/products/p9-thumb1.jpg';
import p9Thumb2 from '@/assets/products/p9-thumb2.jpg';
import p9Thumb3 from '@/assets/products/p9-thumb3.jpg';

import p10Main from '@/assets/products/p10-main.jpg';
import p10Thumb1 from '@/assets/products/p10-thumb1.jpg';
import p10Thumb2 from '@/assets/products/p10-thumb2.jpg';
import p10Thumb3 from '@/assets/products/p10-thumb3.jpg';

import p11Main from '@/assets/products/p11-main.jpg';
import p11Thumb1 from '@/assets/products/p11-thumb1.jpg';
import p11Thumb2 from '@/assets/products/p11-thumb2.jpg';
import p11Thumb3 from '@/assets/products/p11-thumb3.jpg';

import p12Main from '@/assets/products/p12-main.jpg';
import p12Thumb1 from '@/assets/products/p12-thumb1.jpg';
import p12Thumb2 from '@/assets/products/p12-thumb2.jpg';
import p12Thumb3 from '@/assets/products/p12-thumb3.jpg';

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Silk Wrap Blouse', cat: "Women's Clothing", sub: 'Tops', price: 78, orig: 98, sale: true, isNew: false, colors: ['#1b1b1b', '#a9822f', '#e6e1da'], sizes: ['XS', 'S', 'M', 'L'], avail: true, rating: 4.6, desc: 'An effortless silk-blend blouse with a soft wrap front, finished with mother-of-pearl buttons. Cut for a relaxed, elegant drape.', image: p1Main, gallery: [p1Main, p1Thumb1, p1Thumb2, p1Thumb3] },
  { id: 2, name: 'Tailored Wool Trousers', cat: "Women's Clothing", sub: 'Bottoms', price: 110, orig: null, sale: false, isNew: true, colors: ['#1b1b1b', '#6b6560'], sizes: ['S', 'M', 'L', 'XL'], avail: true, rating: 4.8, desc: 'High-waisted tailored trousers in a soft Italian wool blend, with a tapered leg for a polished silhouette.', image: p2Main, gallery: [p2Main, p2Thumb1, p2Thumb2, p2Thumb3] },
  { id: 3, name: 'Linen Midi Dress', cat: 'Dresses', sub: 'Dresses', price: 95, orig: 130, sale: true, isNew: false, colors: ['#e6e1da', '#a9822f'], sizes: ['XS', 'S', 'M', 'L'], avail: true, rating: 4.7, desc: 'A breathable pure-linen midi dress with a fitted bodice and flowing skirt — perfect for warm-weather elegance.', image: p3Main, gallery: [p3Main, p3Thumb1, p3Thumb2, p3Thumb3] },
  { id: 4, name: 'Classic Oxford Shirt', cat: "Men's Clothing", sub: 'Shirts', price: 65, orig: null, sale: false, isNew: false, colors: ['#f5f2ec', '#1b1b1b'], sizes: ['S', 'M', 'L', 'XL'], avail: true, rating: 4.5, desc: 'A timeless cotton Oxford shirt with a structured collar, tailored for a clean everyday fit.', image: p4Main, gallery: [p4Main, p4Thumb1, p4Thumb2, p4Thumb3] },
  { id: 5, name: 'Cashmere Crewneck', cat: "Men's Clothing", sub: 'Tops', price: 145, orig: 180, sale: true, isNew: true, colors: ['#6b6560', '#1b1b1b', '#e6e1da'], sizes: ['S', 'M', 'L', 'XL'], avail: true, rating: 4.9, desc: 'Pure cashmere crewneck sweater, lightweight yet warm, with ribbed cuffs and hem.', image: p5Main, gallery: [p5Main, p5Thumb1, p5Thumb2, p5Thumb3] },
  { id: 6, name: 'Embroidered Kurta Set', cat: 'Traditional Wear', sub: 'Traditional', price: 120, orig: null, sale: false, isNew: true, colors: ['#a9822f', '#b1443b'], sizes: ['S', 'M', 'L', 'XL'], avail: true, rating: 4.8, desc: 'Hand-embroidered kurta and trouser set in premium chikankari fabric, made for special occasions.', image: p6Main, gallery: [p6Main, p6Thumb1, p6Thumb2, p6Thumb3] },
  { id: 7, name: 'Pleated Satin Skirt', cat: "Women's Clothing", sub: 'Bottoms', price: 70, orig: 95, sale: true, isNew: false, colors: ['#1b1b1b', '#a9822f'], sizes: ['XS', 'S', 'M'], avail: false, rating: 4.4, desc: 'A fluid pleated skirt in liquid satin, designed to move beautifully with every step.', image: p7Main, gallery: [p7Main, p7Thumb1, p7Thumb2, p7Thumb3] },
  { id: 8, name: 'Merino Polo Shirt', cat: "Men's Clothing", sub: 'Shirts', price: 58, orig: null, sale: false, isNew: false, colors: ['#1b1b1b', '#6b6560', '#e6e1da'], sizes: ['S', 'M', 'L'], avail: true, rating: 4.3, desc: 'Fine merino wool polo with a breathable knit, ideal for smart-casual layering.', image: p8Main, gallery: [p8Main, p8Thumb1, p8Thumb2, p8Thumb3] },
  { id: 9, name: 'Chiffon Layered Top', cat: 'New Arrivals', sub: 'Tops', price: 52, orig: null, sale: false, isNew: true, colors: ['#e6e1da', '#b1443b'], sizes: ['XS', 'S', 'M', 'L'], avail: true, rating: 4.5, desc: 'Airy chiffon top with a delicate layered hem, styled for effortless day-to-night wear.', image: p9Main, gallery: [p9Main, p9Thumb1, p9Thumb2, p9Thumb3] },
  { id: 10, name: 'Formal Bandhgala Coat', cat: 'Traditional Wear', sub: 'Traditional', price: 210, orig: 260, sale: true, isNew: false, colors: ['#1b1b1b', '#a9822f'], sizes: ['M', 'L', 'XL'], avail: true, rating: 4.9, desc: 'A structured bandhgala coat in fine wool blend, tailored for formal occasions.', image: p10Main, gallery: [p10Main, p10Thumb1, p10Thumb2, p10Thumb3] },
  { id: 11, name: 'Cotton Poplin Shirt Dress', cat: 'Dresses', sub: 'Dresses', price: 88, orig: null, sale: false, isNew: true, colors: ['#f5f2ec'], sizes: ['XS', 'S', 'M', 'L'], avail: true, rating: 4.6, desc: 'A crisp cotton poplin shirt dress with a belted waist, equally at home at work or dinner.', image: p11Main, gallery: [p11Main, p11Thumb1, p11Thumb2, p11Thumb3] },
  { id: 12, name: 'Relaxed Denim Jacket', cat: 'Sale', sub: 'Tops', price: 60, orig: 89, sale: true, isNew: false, colors: ['#6b6560'], sizes: ['S', 'M', 'L', 'XL'], avail: true, rating: 4.4, desc: 'A relaxed-fit denim jacket with a washed finish, an easy layer for every season.', image: p12Main, gallery: [p12Main, p12Thumb1, p12Thumb2, p12Thumb3] },
];

export const REVIEWS: Review[] = [
  { name: 'Amina R.', text: 'The fabric quality is beautiful and the fit is exactly true to size. Fast shipping too.', stars: 5 },
  { name: 'Farhan K.', text: 'RoohiCollections has become my go-to for formal wear — the bandhgala coat is stunning.', stars: 5 },
  { name: 'Sara M.', text: 'Loved the linen dress, so comfortable for summer. Will definitely order again.', stars: 4 },
];

export function findProduct(id: number): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
