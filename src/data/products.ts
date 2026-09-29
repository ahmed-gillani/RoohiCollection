import type { Product, Review } from '@/types/product';

// Product images
import p1Main from '@/assets/products/p1-main.jpg';
import p2Main from '@/assets/products/p2-main.jpg';
import p3Main from '@/assets/products/p3-main.jpg';
import p4Main from '@/assets/products/p4-main.jpg';
import p5Main from '@/assets/products/p5-main.jpg';
import p6Main from '@/assets/products/p6-main.jpg';
import p7Main from '@/assets/products/p7-main.jpg';
import p8Main from '@/assets/products/p8-main.jpg';
import p9Main from '@/assets/products/p9-main.jpg';
import p10Main from '@/assets/products/p10-main.jpg';

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Boys Printed Bomber Jacket Set', cat: 'Boys', sub: 'Jackets', price: 35, orig: 49, sale: true, isNew: false, colors: ['#efe6d2', '#d4a574', '#6b6b4e'], sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'], avail: true, rating: 4.6, desc: 'Cozy printed bomber jacket with matching striped sweatshirt and brown pants for complete styling.', image: p1Main, gallery: [p1Main] },
  { id: 2, name: 'Girls Bow Party Dress', cat: 'Girls', sub: 'Dresses', price: 32, orig: null, sale: false, isNew: true, colors: ['#f5f1e8', '#d4af37'], sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'], avail: true, rating: 4.8, desc: 'Elegant cream textured dress with delicate bow details and gold sandals for special occasions.', image: p2Main, gallery: [p2Main] },
  { id: 3, name: 'Baby Cotton Bodysuit', cat: 'Infants', sub: 'Bodysuits', price: 18, orig: 24, sale: true, isNew: false, colors: ['#ffffff', '#a8d5a8'], sizes: ['0-3M', '3-6M', '6-12M'], avail: true, rating: 4.7, desc: 'Soft white cotton bodysuit paired with adorable star-patterned socks for newborns.', image: p3Main, gallery: [p3Main] },
  { id: 4, name: 'Kids Classic White Tee', cat: 'Infants', sub: 'Tops', price: 16, orig: null, sale: false, isNew: false, colors: ['#ffffff', '#f5f5dc', '#8b7355'], sizes: ['0-3M', '3-6M', '6-12M'], avail: true, rating: 4.5, desc: 'Pure cotton white t-shirt with cozy bear socks and a warm mustard pom-pom beanie for layering.', image: p4Main, gallery: [p4Main] },
  { id: 5, name: 'Kids Embroidered Kurta Set', cat: 'Traditional', sub: 'Traditional', price: 38, orig: null, sale: false, isNew: true, colors: ['#f4d4b0', '#e8c4a0', '#d4a98e'], sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'], avail: true, rating: 4.9, desc: 'Hand-embroidered traditional kurta set in warm peachy and floral tones for festive celebrations.', image: p5Main, gallery: [p5Main] },
  { id: 6, name: 'Toddler Puffer Vest & Beanie', cat: 'Boys', sub: 'Outerwear', price: 28, orig: null, sale: false, isNew: false, colors: ['#6b6b4e', '#d9c89e', '#c7c3b8'], sizes: ['2-3Y', '4-5Y', '6-7Y'], avail: true, rating: 4.8, desc: 'Warm olive puffer vest with gingham shirt and cozy mustard beanie perfect for cool weather.', image: p6Main, gallery: [p6Main] },
  { id: 7, name: 'Girls Lilac Knit Sweater', cat: 'Girls', sub: 'Knitwear', price: 26, orig: 35, sale: true, isNew: false, colors: ['#a58be0', '#e8d9f0', '#c9bfd4'], sizes: ['4-5Y', '6-7Y', '8-9Y'], avail: true, rating: 4.4, desc: 'Soft lilac knit sweater perfect for layering with comfortable ribbed pants and oversized styling.', image: p7Main, gallery: [p7Main] },
  { id: 8, name: 'Baby Girl Essentials Bundle', cat: 'New Arrivals', sub: 'Sets', price: 45, orig: null, sale: false, isNew: true, colors: ['#ffffff', '#ffb6d9', '#f0e68c', '#cd7f8f'], sizes: ['0-3M', '3-6M', '6-12M'], avail: true, rating: 4.5, desc: 'Complete newborn essentials bundle with socks, pink outfits, adorable bunny toy and accessories.', image: p8Main, gallery: [p8Main] },
  { id: 9, name: 'Infant Dotted Bloomer Shorts', cat: 'Infants', sub: 'Bottoms', price: 14, orig: null, sale: false, isNew: true, colors: ['#9fc3ec', '#e6f0ff'], sizes: ['0-3M', '3-6M', '6-12M'], avail: true, rating: 4.5, desc: 'Sweet light blue dotted bloomer shorts designed for comfortable movement and easy diaper changes.', image: p9Main, gallery: [p9Main] },
  { id: 10, name: 'Newborn Swaddle Wrap', cat: 'New Arrivals', sub: 'Newborn', price: 32, orig: 44, sale: true, isNew: false, colors: ['#d4cfc3', '#c9c0b4', '#8b7f6f'], sizes: ['0-3M'], avail: true, rating: 4.9, desc: 'Luxurious beige swaddle wrap with decorative wooden frame styling for peaceful newborn comfort.', image: p10Main, gallery: [p10Main] },
  { id: 11, name: 'Boys Corduroy-Collar Jacket', cat: 'Sale', sub: 'Jackets', price: 28, orig: 39, sale: true, isNew: false, colors: ['#efe6d2', '#8b6914', '#6b6b4e'], sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'], avail: true, rating: 4.6, desc: 'Stylish jacket with textured collar and matching coords, now on sale for year-round wear.', image: p1Main, gallery: [p1Main] },
  { id: 12, name: 'Girls Cream Bow Dress', cat: 'Sale', sub: 'Dresses', price: 24, orig: 32, sale: true, isNew: false, colors: ['#f5f1e8', '#e8d4b8'], sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'], avail: true, rating: 4.4, desc: 'Charming cream party dress with delicate bows now on sale for special moments.', image: p2Main, gallery: [p2Main] },
];

export const REVIEWS: Review[] = [
  { name: 'Amina R.', text: 'Excellent quality! My kids love wearing these clothes. Perfect fit and the colors are so vibrant.', stars: 5 },
  { name: 'Farhan K.', text: 'RoohiCollection has become my go-to for special occasions — the embroidered kurta set is stunning.', stars: 5 },
  { name: 'Sara M.', text: 'Loved the soft bodysuits and essentials bundle. So comfortable and well-made. Will definitely order again.', stars: 4 },
];

export function findProduct(id: number): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
