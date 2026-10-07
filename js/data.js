/* Susheer Shopping Mall — catalog (parody). Every product is prefixed "Susheer". */
(function () {
  let SM_LOCAL_JAG, SM_KK;
  const PEOPLE = [];
  // category: [id, label, icon, accent, items "emoji|name|price"]
  const CATS = [
    ['mobiles', 'Mobiles', '📱', '#6c5ce7', [
      '📱|Phone X Pro 256GB|54999', '📱|Phone Lite 128GB|12999', '📱|Phone Max 5G 512GB|79999', '📱|Fold Z 5G|139999',
      '📱|Budget Smartphone 64GB|6999', '📱|Gaming Phone 16GB RAM|44999', '📱|Camera Phone 200MP|36999', '📱|Keypad Feature Phone|1499',
      '🔋|Power Bank 20000mAh|1799', '🎧|Phone Case Armor|499', '🔌|Fast Charger 65W|1299', '🛡️|Tempered Glass Guard|299',
      '📲|Tablet 11" 128GB|21999', '⌚|Smartwatch AMOLED|3999', '🎧|Earbuds ANC|2499', '📶|WiFi Router 6|2999']],
    ['laptops', 'Laptops & Computers', '💻', '#0984e3', [
      '💻|Laptop 15 i5 16GB|55999', '💻|Gaming Laptop RTX|109999', '💻|UltraBook Air 13"|74999', '💻|Student Laptop 8GB|27999',
      '🖥️|Desktop Tower i7|64999', '🖥️|All-in-One PC 24"|48999', '🖱️|Wireless Mouse|599', '⌨️|Mechanical Keyboard|2999',
      '🖥️|Monitor 27" 4K|18999', '💾|SSD 1TB NVMe|5499', '💽|Pen Drive 128GB|799', '🖨️|Wireless Printer|8999',
      '🎙️|USB Microphone|3499', '📷|Webcam Full HD|1999', '🧰|Laptop Backpack|1299', '🔌|USB-C Hub 7-in-1|1799']],
    ['tv', 'TVs & Appliances', '📺', '#e17055', [
      '📺|Smart TV 43" 4K|27999', '📺|OLED TV 65"|139999', '📺|LED TV 32"|10999', '🔊|Soundbar 2.1|5999',
      '❄️|Refrigerator Double Door|32999', '🧺|Washing Machine Front Load|34999', '🌀|Air Conditioner 1.5T|38999', '🍲|Microwave Oven 25L|8999',
      '💧|Water Purifier RO|12999', '🔥|Geyser 15L|7499', '🧹|Vacuum Cleaner|6999', '🍞|Toaster 2 Slice|1499',
      '☕|Coffee Maker|3499', '🌬️|Air Purifier|11999', '🧊|Mini Fridge 90L|9999', '🍚|Rice Cooker 5L|2299']],
    ['mens', "Men's Fashion", '👔', '#00b894', [
      '👕|T-Shirt Cotton (Pack of 3)|899', '👔|Formal Shirt Slim Fit|1299', '👖|Jeans Stretch Blue|1799', '🧥|Hoodie Oversized|1999',
      '🧥|Leather Jacket|5999', '🩳|Shorts Casual|699', '🧦|Socks (Pack of 6)|399', '🩲|Innerwear Boxers (Pack of 3)|599',
      '👞|Formal Shoes Oxford|2999', '👟|Running Sneakers|2499', '🩴|Flip Flops|399', '⌚|Wrist Watch Classic|2999',
      '🕶️|Aviator Sunglasses|1499', '👜|Leather Wallet|899', '🧢|Baseball Cap|499', '🎽|Track Pants|1199', '🥻|Kurta Pyjama Set|1899', '🧣|Winter Muffler|599']],
    ['womens', "Women's Fashion", '👗', '#e84393', [
      '👗|Floral Maxi Dress|1999', '🥻|Silk Saree|4999', '👚|Kurti Cotton|899', '👖|High-Waist Jeans|1799',
      '🩱|Bra Everyday Comfort|499', '🩱|Bra Sports Support|799', '🩲|Panty (Pack of 5)|599', '👙|Swimwear Set|1299',
      '👠|High Heels|2299', '👡|Flat Sandals|899', '👜|Handbag Tote|1999', '💍|Gold-plated Jewellery Set|1499',
      '🧣|Dupatta Embroidered|799', '👚|Crop Top|599', '🧥|Denim Jacket|2499', '🕶️|Cat-eye Sunglasses|1299', '🩳|Yoga Leggings|899', '🎀|Hair Accessories Combo|299']],
    ['kids', 'Kids & Baby', '🧸', '#fdcb6e', [
      '🧸|Teddy Bear Giant|1499', '🚗|RC Racing Car|1799', '🧩|Jigsaw Puzzle 1000pc|699', '🪀|Building Blocks 500pc|1299',
      '🍼|Baby Feeding Bottle|399', '👶|Diapers Pack (Large)|899', '🧴|Baby Lotion|349', '🛒|Baby Stroller|7999',
      '👕|Kids T-Shirt Set|599', '👟|Kids School Shoes|999', '🎒|School Bag|1099', '🛴|Kick Scooter|2299',
      '🎨|Colouring Kit|499', '🪁|Kite Combo|249', '📚|Picture Story Books (Set of 10)|799', '🎠|Ride-on Toy|3499']],
    ['grocery', 'Grocery & Fresh', '🛒', '#00cec9', [
      '🍎|Apples (1 kg)|180', '🍌|Bananas (1 dozen)|60', '🍇|Grapes (500 g)|90', '🥭|Mangoes (1 kg)|160',
      '🍉|Watermelon (1 pc)|70', '🍊|Oranges (1 kg)|110', '🍓|Strawberries (250 g)|120', '🥔|Potatoes (1 kg)|40',
      '🍅|Tomatoes (1 kg)|50', '🧅|Onions (1 kg)|45', '🥕|Carrots (1 kg)|60', '🥦|Broccoli (1 pc)|70',
      '🌶️|Green Chillies (250 g)|30', '🥛|Milk (1 L)|68', '🧀|Cheese Block (200 g)|140', '🧈|Butter (500 g)|280',
      '🥚|Eggs (Tray of 30)|210', '🍞|Bread Brown (400 g)|50', '🍚|Basmati Rice (5 kg)|649', '🌾|Whole Wheat Atta (10 kg)|499',
      '🫘|Toor Dal (1 kg)|160', '🛢️|Sunflower Oil (5 L)|749', '🧂|Iodised Salt (1 kg)|25', '🍬|Sugar (5 kg)|230',
      '☕|Tea Leaves (500 g)|260', '🍪|Biscuits Family Pack|90', '🍫|Chocolate Bar (Pack of 6)|300', '🍜|Instant Noodles (Pack of 12)|170',
      '🥤|Cold Drink 2.25 L|99', '🧃|Fruit Juice 1 L|110', '🍗|Chicken Curry Cut (1 kg)|240', '🐟|Fresh Fish Rohu (1 kg)|280',
      '🥜|Peanuts (500 g)|90', '🥥|Coconut Water (Pack of 6)|180', '🍯|Honey (500 g)|320', '🫒|Pickles Mixed (500 g)|140']],
    ['home', 'Home & Furniture', '🛋️', '#a29bfe', [
      '🛋️|3-Seater Sofa|24999', '🛏️|King Size Bed|28999', '🪑|Office Chair Ergonomic|6999', '🗄️|Wardrobe 3-Door|18999',
      '🪞|Wall Mirror Round|1999', '💡|LED Bulbs (Pack of 10)|699', '🛏️|Memory Foam Mattress|12999', '🛌|Bedsheet Double (Set of 2)|999',
      '🪟|Curtains Blackout (Pair)|1299', '🖼️|Wall Art Frames (Set of 3)|1499', '🕯️|Scented Candles|499', '🪴|Indoor Plant with Pot|399',
      '🍽️|Dinner Set 24pc|2499', '🥘|Non-stick Cookware Set|2999', '🧽|Cleaning Kit Combo|599', '🧴|Detergent Liquid 2 L|399', '🚿|Shower Head Rain|1299', '⏰|Wall Clock Designer|899']],
    ['beauty', 'Beauty & Personal Care', '💄', '#fd79a8', [
      '💄|Lipstick Matte|499', '🧴|Face Wash Gel|249', '🧼|Soap (Pack of 4)|199', '🧴|Shampoo 650 ml|449',
      '💇|Hair Dryer|1499', '🪒|Trimmer Pro|1599', '🧴|Moisturiser SPF 50|599', '🌸|Perfume Eau de Parfum|1999',
      '💅|Nail Polish Set|399', '🪮|Hair Brush|299', '🧴|Body Lotion 400 ml|349', '🦷|Toothpaste (Pack of 3)|199',
      '🪥|Electric Toothbrush|1299', '👁️|Kajal Waterproof|149', '🧖|Face Mask Sheet (Pack of 10)|399', '🧔|Beard Oil|449']],
    ['sports', 'Sports & Fitness', '🏏', '#55efc4', [
      '🏏|Cricket Bat English Willow|3999', '🏏|Cricket Ball (Pack of 6)|899', '⚽|Football Size 5|899', '🏀|Basketball|999',
      '🏸|Badminton Racket Pair|1999', '🎾|Tennis Racket|2999', '🏓|Table Tennis Set|1499', '🏋️|Dumbbell Set 20kg|2999',
      '🧘|Yoga Mat|699', '🚴|Cycle 21-Speed|9999', '🏃|Treadmill Foldable|24999', '🥊|Boxing Gloves|1299',
      '⛺|Camping Tent 4-Person|3499', '🏊|Swimming Goggles|499', '🥾|Trekking Shoes|2999', '🧃|Protein Powder 1 kg|2499']],
    ['books', 'Books & Stationery', '📚', '#fab1a0', [
      '📚|Bestseller Novel|299', '📖|Self-Help Classic|349', '🧪|Science Textbook Class 10|450', '📐|Maths Guide JEE|899',
      '✏️|Pencil Box Set|199', '🖊️|Gel Pens (Pack of 20)|249', '📓|Notebook A4 (Pack of 6)|399', '🖍️|Sketch Pens 48 Colours|349',
      '🎒|College Bag|1199', '📏|Geometry Box|249', '🗂️|File Folders (Pack of 10)|299', '📝|Sticky Notes Combo|149',
      '🧮|Scientific Calculator|899', '📕|Comics Collection (Set of 5)|799', '🖋️|Fountain Pen|599', '📅|Planner 2027|349']],
    ['gaming', 'Gaming & Entertainment', '🎮', '#7d5fff', [
      '🎮|Console Next-Gen 1TB|49999', '🕹️|Wireless Controller|5499', '🎧|Gaming Headset 7.1|3499', '💿|Racing Game Disc|3499',
      '🥽|VR Headset|29999', '🎲|Board Game Family Night|1299', '♟️|Chess Set Wooden|1499', '🃏|Playing Cards Premium|199',
      '🎸|Acoustic Guitar|6999', '🎹|Keyboard Piano 61 Keys|8999', '🥁|Bluetooth Speaker Party|4999', '🎤|Karaoke Mic Set|2499',
      '📻|Retro Radio|1999', '🎬|Home Projector Full HD|14999', '🖱️|Gaming Mouse RGB|1499', '🪑|Gaming Chair|11999']],
    ['auto', 'Auto & Accessories', '🚗', '#636e72', [
      '🏍️|Helmet Full Face|2499', '🚗|Car Seat Covers|3999', '🧽|Car Wash Kit|999', '🔦|Car LED Headlights|2999',
      '📹|Dashcam 4K|5999', '🛢️|Engine Oil 4 L|1999', '🔋|Car Battery 65Ah|6999', '🚲|Bike Lock Heavy|699',
      '🧰|Tool Kit 108pc|2499', '🛞|Tyre Inflator Portable|1799', '📱|Phone Holder Car|399', '🧴|Car Perfume|249',
      '🗺️|GPS Navigator|4999', '🧊|Car Fridge 12 V|5999', '🔌|Jump Starter|3499', '🪟|Windshield Sunshade|499']],
    ['pets', 'Pet Supplies', '🐶', '#ffeaa7', [
      '🐶|Dog Food 10 kg|2199', '🐱|Cat Food Tuna (Pack of 12)|899', '🦴|Chew Bones (Pack of 10)|399', '🧶|Cat Scratcher Tower|2499',
      '🛏️|Pet Bed Large|1599', '🐕|Dog Leash & Collar|599', '🐠|Fish Tank 20 L|2999', '🧼|Pet Shampoo|349',
      '🐦|Bird Cage|1999', '🎾|Pet Toy Ball Set|299', '🐹|Hamster Wheel Kit|799', '🍖|Dog Treats|249']],
    ['health', 'Health & Medical', '🩺', '#ff7675', [
      '🩺|Digital BP Monitor|1999', '🌡️|Infrared Thermometer|1499', '💊|Vitamin C Tablets|349', '🧴|Hand Sanitiser 500 ml|199',
      '😷|Face Masks (Pack of 50)|299', '🩹|First-Aid Kit|599', '🦵|Knee Support Brace|699', '⚖️|Digital Weighing Scale|1299',
      '🫁|Pulse Oximeter|999', '🧘|Massage Gun|3499', '💆|Foot Massager|4999', '🩸|Glucometer with Strips|1499']],
    ['mall', 'Mall Specials', '🚁', '#fdcb6e', [
      '🚁|Helicopter (Scale Model, Desk)|2999', '✈️|Luxury Aircraft Paper-Craft Kit|499', '🏢|Mall Mini Replica|1999', '🎟️|Mall VIP Parking Pass|999',
      '🎁|Mystery Gift Box|499', '🧳|Cabin Luggage Trolley|3499', '🕴️|Mall Mascot Costume|2499', '📣|Megaphone Loud Voice|899',
      '🍿|Movie Popcorn Tub Combo|299', '🎫|Food Court Coupon Book|599', '🛍️|Reusable Shopping Bags|199', '🧸|Mall Mascot Plushie|799']],
    ['jewellery', 'Jewellery & Watches', '💍', '#f9ca24', [
      '💍|Diamond-look Ring|2999', '📿|Pearl Necklace|3999', '🧿|Evil Eye Bracelet|399', '⌚|Luxury Chronograph Watch|14999',
      '💎|Solitaire Pendant|9999', '🪙|Silver Coin 10 g|1099', '👂|Jhumka Earrings|899', '⌚|Digital Sports Watch|1999']],
    ['stationery', 'Office & Industrial', '🏢', '#74b9ff', [
      '🪑|Standing Desk|14999', '🖨️|Laser Printer|11999', '📠|Paper Shredder|3999', '🗃️|Filing Cabinet|5999',
      '📎|Paper Clips Bulk|99', '🖇️|Stapler Heavy Duty|399', '📊|Whiteboard 4x3 ft|1799', '🔌|Extension Board 6 Socket|799']],
    ['garden', 'Garden & Outdoor', '🌿', '#badc58', [
      '🌱|Seeds Mixed Vegetable|149', '🪴|Planter Pots (Set of 5)|699', '💦|Garden Hose 30 m|1299', '✂️|Pruning Shears|499',
      '🌻|Sunflower Bulbs|199', '🛖|Outdoor Swing Chair|7999', '🔥|BBQ Grill Portable|3499', '☂️|Patio Umbrella|2999']],
    ['helicopters', 'Helicopters', '🚁', '#e84118', [
      '🚁|Light Helicopter 4-Seater|45000000', '🚁|Luxury Executive Helicopter|180000000', '🚁|Rescue Helicopter Twin-Engine|320000000', '🚁|Police Patrol Helicopter|250000000',
      '🚁|Cargo Heavy-Lift Helicopter|520000000', '🚁|Remote Control Helicopter Toy|2999', '🎧|Pilot Headset Noise-Cancelling|45000', '🏗️|Rooftop Helipad Kit|8500000']],
    ['cars', 'Cars', '🚗', '#0097e6', [
      '🚗|Hatchback Car|650000', '🚙|Compact SUV|1250000', '🚙|SUV 7-Seater|2400000', '🚘|Sedan Luxury|3200000',
      '⚡|Electric Car|1800000', '🏎️|Sports Car|9500000', '🚐|Limousine Stretch|18000000', '🛻|Pickup Truck|1900000',
      '🛺|Auto Rickshaw|350000', '🚌|Mini Bus 16-Seater|2800000', '🚛|Cargo Truck|3500000', '🚜|Tractor|900000']],
    ['planes', 'Planes & Aircraft', '✈️', '#00a8ff', [
      '✈️|Private Jet|900000000', '🛩️|Single-Engine Propeller Plane|25000000', '🛩️|Seaplane|60000000', '✈️|Passenger Airliner|8000000000',
      '🪂|Paraglider|85000', '🎈|Hot Air Balloon|2500000', '🛩️|Glider Aircraft|1500000', '🛸|Camera Drone 4K|35000',
      '✈️|Luxury Aircraft Cabin Edition|1500000000', '🪁|Remote Control Plane Toy|3499']],
    ['bikes', 'Bikes & Scooters', '🏍️', '#e1b12c', [
      '🏍️|Motorcycle 150cc|120000', '🏍️|Cruiser Bike 350cc|260000', '🛵|Scooter 110cc|85000', '🛵|Electric Scooter|110000',
      '🏍️|Superbike 1000cc|1800000', '🚲|Mountain Bicycle|18999', '🚲|Kids Bicycle|4999', '🛴|Electric Kick Scooter|32999']],
    ['boats', 'Boats & Yachts', '🛥️', '#487eb0', [
      '🛥️|Speedboat|3500000', '🛥️|Luxury Yacht|450000000', '🛶|Kayak|18000', '⛵|Sailboat|2200000',
      '🚤|Jet Ski|1200000', '🛟|Life Jacket|1499', '🚢|Houseboat|9000000', '🏊|Inflatable Pool Boat|3999']]
  ];


  // seeded PRNG so catalog is stable between page loads
  let seed = 20250;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);

  const products = [];
  // Product 0 — the headline flash sale item
  products.push({
    id: 0, name: 'Susheer — Original Edition (Flash Sale)', short: 'Susheer', emoji: '🕴️', cat: 'mall', catLabel: 'Mall Specials',
    price: 50000, mrp: 99999, rating: 3.1, reviews: 12, img: 'assets/susheer-product.jpg', flash: true, bogo: true,
    rank: { n: 3, label: '🥉 #3 MOST SOLD PRODUCT IN SUSHEER MALL', sold: 621400 },
    taglines: ['🥉 #3 most sold product in Susheer Mall', '🎁 FLASH SALE: buy 1, get 1 FREE', '🧥 Hoodie included. Swagger included.', '🚶 Walks into every room like he owns the mall (he does)', '🔥 Limited stock. Unlimited main-character energy'],
    desc: 'Susheer himself — the face of the mall and the #3 best-selling product of all time, now at a flash sale price of ₹50,000. Buy 1 and get 1 FREE. Comes with a signature hoodie, premium swagger and unlimited mall-walking energy. (Parody item — no humans are actually for sale.)',
    tags: ['Flash Sale', 'Buy 1 Get 1 Free', '🥉 #3 Bestseller', 'Limited Stock'],
    sizesLabel: 'Hoodie size', sizes: ['S', 'M', 'L', 'XL'],
    highlights: ['🥉 #3 most sold product in Susheer Mall', '🎁 Buy 1, get 1 FREE — flash sale price ₹50,000', '🧥 Signature hoodie included', '😎 Sunglasses hang on the shirt (not included)', '🚶 Unlimited mall-walking energy']
  });

  // Product 1 — the only item in the Jaggu department
  products.push({
    id: 1, name: 'Jagadeesh', short: 'Jagadeesh', emoji: '🔥', cat: 'jaggu', catLabel: 'Jaggu',
    price: 10000000, mrp: 25000000, rating: 5.0, reviews: 999999, img: 'assets/langadeesh.jpg', hot: true, fit: true, flash: true,
    rank: { n: 1, label: '🏆 #1 MOST SOLD PRODUCT IN SUSHEER MALL HISTORY', sold: 1248760 },
    taglines: ['🏆 #1 most sold product in Susheer Mall history', '🔥 FRESH & HOT — just landed at Bowenpally Mall!', '🥵 So hot our AC gave up', '💎 Only 1 piece in the entire mall', '📦 Ships with free swagger', '⚠️ May cause sudden crushes'],
    desc: 'Jagadeesh (a.k.a. Local Langadeesh, a.k.a. Global Langadeesh) — the MOST SOLD product in the entire history of Susheer Shopping Mall. Over 12 lakh units sold (and somehow still only 1 left in stock). Now on FLASH SALE at ₹1 Crore, non-negotiable. (Parody item — approved by the guy himself, no humans are actually for sale.)',
    tags: ['🏆 #1 Bestseller Ever', '🔥 HOT', '⚡ Flash Sale', 'Only 1 in the mall'],
    highlights: ['🏆 #1 most sold product in Susheer Mall history', '🌍 Also known as Local Langadeesh and Global Langadeesh', '💎 Only 1 piece left in the entire mall', '🚫 Non-refundable, non-returnable, non-negotiable', '🎁 Free swagger with every order']
  });

  CATS.forEach(([cid, label, icon, color, items]) => {
    items.forEach(line => {
      const [emoji, nm, pr] = line.split('|');
      const base = +pr;
      const disc = 8 + Math.floor(rnd() * 55);
      const price = Math.max(9, Math.round(base * (0.9 + rnd() * 0.2)));
      const mrp = Math.round(price / (1 - disc / 100));
      const id = products.length;
      products.push({
        id, name: 'Susheer ' + nm, short: 'Susheer ' + nm.replace(/\s*\(.*\)/, ''), emoji, cat: cid, catLabel: label,
        price, mrp, rating: Math.round((3.4 + rnd() * 1.5) * 10) / 10, reviews: Math.floor(40 + rnd() * 48000),
        img: null, color,
        desc: 'Genuine Susheer ' + nm + ' — handpicked at the Bowenpally Mall, the world\'s most talked-about shopping destination. Every Susheer product is made with love, a lot of confidence and zero actual quality-control. Fast delivery across Hyderabad, helicopter delivery on request.',
        tags: [disc + '% off', rnd() > .5 ? 'Free Delivery' : 'Susheer Assured']
      });
    });
  });

  // Local Jagadeesh — the flash-sale item behind the side popup (added last so existing product ids stay put)
  products.push({
    id: products.length, name: 'Mr. DD — Mr. Diaper Dilip (Flash Sale)', short: 'Mr. DD', emoji: '👶', cat: 'jaggu', catLabel: 'Jaggu',
    price: 750000, mrp: 5000000, rating: 4.9, reviews: 88888, img: 'assets/jagadeesh-flash.jpg', hot: true, fit: true, flash: true,
    rank: { n: 2, label: '🥈 #2 MOST SOLD PRODUCT IN SUSHEER MALL', sold: 874300 },
    taglines: ['💘 Selling out EXTREMELY fast!', '🥈 #2 most sold product in the mall', '👶 Fully absorbent. Fully loyal.', '🧷 Leak-proof since birth', '🕐 Please change every 4 hours', '💍 "Marry Me" requests: 10 and counting', '📏 Available in S, M, L and XL. Pampers sold separately', '📩 DM Jagadeesh for contact details'],
    desc: 'Mr. DD — Mr. Diaper Dilip — the 2nd most sold product in Susheer Mall history, now on FLASH SALE. Surrounded by admirers, absorbs 99% of your problems and selling out extremely fast. Available in S, M, L and XL; Pampers sold separately. DM Jagadeesh for contact details. (Parody item — approved by the guy himself, no humans are actually for sale.)',
    tags: ['⚡ Flash Sale', '🥈 #2 Bestseller', '🔥 HOT', 'Leak-proof*'],
    sizesLabel: 'Size', sizes: ['XS', 'S', 'M', 'L', 'XL'],
    highlights: ['👶 Absorbs 99% of your problems (the other 1% is the EMI)', '📏 Available in XS, S, M, L and XL — Pampers sold separately', '🧷 Leak-proof since birth*', '🕐 Please change every 4 hours', '💍 10 “Marry Me” requests and counting']
  });
  SM_LOCAL_JAG = products.length - 1;
  products[1].buddy = SM_LOCAL_JAG; products[SM_LOCAL_JAG].buddy = 1;
  products[1].note = 'Most sold product in mall history 🔥'; products[SM_LOCAL_JAG].note = 'Fully absorbent. Fully loyal. 👶'; products[0].note = 'The face of the mall 😎 Buy 1, get 1 FREE';
  products[SM_LOCAL_JAG].popup = { tag: '⚡ FLASH SALE · FULLY ABSORBENT 👶', title: 'Mr. Diaper Dilip (Mr. DD) is selling out EXTREMELY fast!', small: '{left} left · DM Jagadeesh for contact details' };
  products[SM_LOCAL_JAG].pitch = 'Mr. Diaper Dilip is selling out EXTREMELY fast! Fully absorbent, only ₹7,50,000!';

  // Mr. KK — the mall's multi-skilled salesman, sold as a product on his own page (kk.html)
  products.push({
    id: products.length, name: 'Mr. KK — Senior Salesman, Canteen Cleaner & Aisle Walker', short: 'Mr. KK', emoji: '🧑‍💼', cat: 'mall', catLabel: 'Mall Specials',
    price: 9999, mrp: 49999, unit: 'per day', rating: 2.4, reviews: 43210, img: 'assets/mr-kk.jpg', fit: true, kk: true,
    taglines: ['🛍️ Sells Susheer products. When awake.', '🧹 Cleans the canteen. With eyes closed.', '🚶 Walks 14 km a day (mostly to the tea stall)', '😴 Hardworking index: 2%. Napping index: 98%.', '☕ Needs 3 tea breaks to recover from 1 customer', '🧑‍💼 Available for rent. Never for sale.'],
    highlights: ['🛍️ Sells Susheer products — whenever he wakes up', '🧹 Cleans the canteen (scientifically proven to be "in progress")', '🚶 Walks the aisles all day — straight to the tea stall and back', '😴 Premium napping service included at no extra charge', '☕ Tea breaks: 3 per hour. Lunch break: 4 hours', '🤝 Hire for ₹9,999/day — work not guaranteed']
    ,
    desc: 'Mr. KK is the mall\'s Senior Salesman by title, Canteen Cleaner by job description and professional Napper by passion. He sells Susheer products (when awake), cleans the canteen (with his eyes closed) and walks the aisles — mostly towards the tea stall. Famously lazy and allergic to hard work, he still pops up uninvited with a "great offer" just when you were about to leave. Rated 2.4 stars for effort and 5 stars for confidence. Available for hire at ₹9,999/day — never for sale, and honestly, who would buy. (Parody item — approved by the guy himself.)',
    tags: ['🧑‍💼 Hire', '😴 Napper', '☕ Tea-break pro', 'Not for sale'],
    reviewList: [
      ['Ramesh K.', 1, 'Hired him for the day. Found him asleep in the canteen. He said he was cleaning with his eyes closed.'],
      ['Priya S.', 2, 'Advertised as hardworking. Worked for 7 minutes. Took 3 tea breaks to recover.'],
      ['Venkat R.', 1, 'Walks 14 km a day? I saw him walk 14 metres — to the tea stall.'],
      ['Anjali M.', 2, 'He sold me a nap and a story about his back pain. No Susheer products were involved.'],
      ['Sai T.', 3, 'Nice guy, great smile. Zero work. 3 stars for the smile, minus all the rest.'],
      ['Lakshmi D.', 1, 'Asked him to clean the table. He asked me to wait. I am still waiting.'],
      ['Kiran P.', 2, 'Pops up with offers, then vanishes when you actually want to buy. Professional ghosting.'],
      ['Divya N.', 2, 'Hardworking index: 2%. Napping index: 98%. Value for money: ₹9,999 of regret.']
    ]
  });
  SM_KK = products.length - 1;

  // The Jaggu gang — more top sellers, ranked in the order they were added
  const person = o => {
    const p = Object.assign({ id: products.length, emoji: '🕴️', cat: 'jaggu', catLabel: 'Jaggu', hot: true, fit: true }, o);
    products.push(p); PEOPLE.push(p.id); return p;
  };
  person({
    name: 'Vishneamon', short: 'Vishneamon', emoji: '🤖', price: 299999, mrp: 999999, rating: 4.7, reviews: 412300, img: 'assets/vishneamon.jpg',
    rank: { n: 4, label: '🏅 #4 MOST SOLD PRODUCT IN SUSHEER MALL', sold: 412300 },
    note: 'Opens gadgets. Opens batsmen. Opens birthdays. 🎂',
    taglines: ['🔧 Specialist in opening gadgets', '🏏 Also opens the batting (and your parcels)', '🎒 Pulls gadgets out of his pocket on demand', '🍰 Comes with pancake tower and candles', '🔔 Bell included. Not optional.'],
    highlights: ['🔧 Speciality: opening gadgets — unboxing, unscrewing, unlocking', '🏏 Also opens the batting for your gully team (powerplay certified)', '🍰 Pancake tower and birthday candles available on request', '🔔 Signature bell included, rings at awkward moments', '🕳️ 4D pocket: holds 1 charger, 2 cables and infinite excuses'],
    desc: 'Vishneamon — the mall\'s #4 best-seller and a legend in two professions: opening gadgets and opening the batting. Hand him any box and he will open it. Hand him a bat and he will open the innings. He may also open your fridge. Pancake tower and candles available for birthdays. (Parody item — approved by the guy himself, no humans are actually for sale.)',
    tags: ['🏅 #4 Bestseller', '🔧 Gadget opener', '🏏 Opening batsman', '🔥 HOT'],
    popup: { tag: '🔧 NEW · GADGET OPENER', title: 'Vishneamon opens gadgets AND batsmen — selling out fast!', small: '{left} left · DM Jagadeesh for bookings' },
    pitch: 'Boss! Vishneamon opens any gadget in 10 seconds and opens the batting too. Only ₹2,99,999!',
    reviewList: [
      ['Rahul T.', 5, 'Asked him to open a gadget. He opened my phone, my laptop and my wallet. Very efficient.'],
      ['Sneha K.', 5, 'Opened the batting for our gully team. Scored 2 in 3 hours. Legend.'],
      ['Arjun V.', 4, 'Pulls everything out of his pocket except what you actually asked for.'],
      ['Meena G.', 5, 'Birthday-ready! Brought the pancake tower, the candles and a screwdriver.'],
      ['Ganesh L.', 3, 'Opened my new TV box with a fork. TV is fine. Fork is not.']
    ]
  });
  person({
    name: 'Long Jump Harish (Bulley)', short: 'Long Jump Harish', emoji: '🏃', price: 14999, mrp: 79999, unit: 'per day (service)', rating: 4.8, reviews: 288900, img: 'assets/harish.jpg',
    rank: { n: 5, label: '🏅 #5 MOST SOLD PRODUCT IN SUSHEER MALL', sold: 288900 },
    note: 'Jumps long. Shakes milk. Smiles free. 🥤',
    taglines: ['🏃 Long jumps. Lands (usually).', '🥤 Makes milkshakes: mango, banana, chocolate, mystery', '🛎️ Available as a service, just like Mr. KK', '😄 Smile included, free of cost', '⚠️ Land at your own risk'],
    highlights: ['🏃 Speciality: long jumping (record: over a puddle, 2.4 m)', '🥤 Also makes milkshakes — mango, banana, chocolate and "mystery"', '🛎️ Available as a service for events, parties and gully matches', '😄 Smile included, free of cost', '⚠️ Landing not guaranteed. Milkshake guaranteed.'],
    desc: 'Long Jump Harish (Bulley) — the mall\'s #5 best-seller and the only human who can long jump AND make a thick milkshake before breakfast. Available as a service (book him just like Mr. KK, but he actually works). Perfect for parties, sports days and unexpected milkshake emergencies. Landing not included. (Parody item — approved by the guy himself, no humans are actually for sale.)',
    tags: ['🏅 #5 Bestseller', '🛎️ Service', '🥤 Milkshake maker', '🏃 Long jumper'],
    popup: { tag: '🛎️ BOOK NOW · SERVICE', title: 'Long Jump Harish: jumps long, shakes milk — booking fast!', small: '{left} slots left today · only ₹14,999/day' },
    pitch: 'Bhai, book Long Jump Harish! He jumps long AND makes milkshakes. Just ₹14,999 a day!',
    reviewList: [
      ['Ramya P.', 5, 'Long jumped over a puddle holding my milkshake. Not a drop spilt. Hired again.'],
      ['Kiran P.', 4, 'Milkshake 10/10. Landing 6/10. Please book a softer ground.'],
      ['Divya N.', 5, 'Booked him for my sister\'s party. Kids loved the milkshake, the jump AND the smile.'],
      ['Sai T.', 5, 'Mango shake, mango jump. Mango everything.'],
      ['Fatima B.', 4, 'Smiled the whole time. The milkshake had extra vibes. Still good.']
    ]
  });
  person({
    name: 'Chetaku Rohit', short: 'Chetaku Rohit', emoji: '🛵', price: 249999, mrp: 999999, rating: 4.5, reviews: 197500, img: 'assets/rohit.jpg',
    rank: { n: 6, label: '🏅 #6 MOST SOLD PRODUCT IN SUSHEER MALL', sold: 197500 },
    note: 'Official Chapri of Bowenpally Mall 🛵',
    taglines: ['🛵 Rides at minimum 100 km/h. Minimum.', '🏅 Official Chapri of Bowenpally Mall', '🍵 Sells Rohit\'s Special Kadha', '📣 Horn louder than the PA system', '😎 Aura: unmatched. Helmet: optional.'],
    highlights: ['🏅 Titled Official Chapri of Bowenpally Mall', '🛵 Rides at a minimum speed of 100 km/h — brakes are for other people', '🍵 Sells Rohit\'s Special Kadha — cures Mondays', '📣 Horn included, louder than the mall PA', '🧢 Style: unmatched. Helmet: sometimes.'],
    desc: 'Chetaku Rohit, a.k.a. Chapri Rohit — the mall\'s #6 best-seller and its Official Chapri. He rides at a minimum of 100 km/h, arrives on his Chetak in a blur, leaves in a cloud of confidence, and sells Rohit\'s Special Kadha to anyone with a bad Monday. Horn louder than the PA system. (Parody item — approved by the guy himself, no humans are actually for sale.)',
    tags: ['🏅 #6 Bestseller', '🛵 Chetak', '🏅 Official Chapri', '🔥 HOT'],
    popup: { tag: '🛵 TRENDING · CHAPRI ALERT', title: 'Chetaku Rohit — the Official Chapri — is selling out!', small: '{left} left · horn included' },
    pitch: 'Psst! Chetaku Rohit, our Official Chapri, rides at 100+ km/h and is on sale for ₹2,49,999. Horn included!',
    reviewList: [
      ['Venkat R.', 5, 'Reached the mall in 4 minutes at 100+ km/h. Left a cloud of confidence behind.'],
      ['Priya S.', 4, 'Official Chapri of Bowenpally Mall. Sunglasses stay on even indoors.'],
      ['Anjali M.', 5, 'His special kadha cured my Monday. Tuesday still pending.'],
      ['Lakshmi D.', 3, 'Scooter horn is louder than the PA system. Respect.']
    ]
  });
  person({
    name: 'Lean Baddie', short: 'Lean Baddie', emoji: '💪', price: 499999, mrp: 1999999, rating: 4.9, reviews: 143200, img: 'assets/baddie.jpg',
    rank: { n: 7, label: '🏅 #7 MOST SOLD PRODUCT IN SUSHEER MALL', sold: 143200 },
    note: 'Gym. Baddiness. Aura. 💪',
    taglines: ['💪 Gym 6 days a week. 7th day: protein.', '😎 Certified baddie. Aura +1000', '🥗 Lean mode: permanently on', '🏋️ Spots you on bench press and judges silently', '🧴 Comes with main-character walk'],
    highlights: ['💪 Speciality: gym (6 days a week, 7th day is protein)', '😎 Baddiness certified — aura +1000, confidence +9999', '🥗 Lean mode is permanently on', '🏋️ Will spot you on the bench press and judge you silently', '🕶️ Sunglasses indoors: standard'],
    desc: 'Lean Baddie — the mall\'s #7 best-seller and the only product that can bench your cart, fix your posture and raise your aura in one visit. Specialises in the gym, in baddiness and in walking into rooms like the lights were installed for him. (Parody item — approved by the guy himself, no humans are actually for sale.)',
    tags: ['🏅 #7 Bestseller', '💪 Gym', '😎 Baddie', '🔥 HOT'],
    popup: { tag: '💪 GYM SPECIAL · BADDIE', title: 'Lean Baddie is flexing — and selling out fast!', small: '{left} left · aura included' },
    pitch: 'Boss, want some baddiness? Lean Baddie — gym plus aura — only ₹4,99,999!',
    reviewList: [
      ['Ramesh K.', 5, 'Lifted me. And my cart. And my confidence.'],
      ['Sneha K.', 5, 'Aura so strong the mall lights flickered.'],
      ['Arjun V.', 4, 'Gym 6 days a week. On the 7th day he recovers with biryani.'],
      ['Meena G.', 5, 'Baddie energy: 100%. Lean mode: permanent.']
    ]
  });
  person({
    name: 'Sullileni Sridhar', short: 'Sullileni Sridhar', emoji: '🎤', price: 39999, mrp: 149999, unit: 'per show (service)', rating: 4.6, reviews: 98700, img: 'assets/sridhar.jpg',
    rank: { n: 8, label: '🏅 #8 MOST SOLD PRODUCT IN SUSHEER MALL', sold: 98700 },
    note: 'Sings. Dances. Brings the house down. 🎤',
    taglines: ['🎤 Sings so well the canteen stops boiling tea', '💃 Dance moves with free embarrassment', '🛎️ Available for weddings, birthdays and bus journeys', '🔊 Volume: yes', '🎶 Requests accepted. Mostly ignored.'],
    highlights: ['🎤 Speciality: singing (any language, any key, any time)', '💃 Also dancing — moves come with free embarrassment', '🛎️ Bookable for weddings, birthdays and long bus rides', '🎶 Requests accepted, rarely played', '🔊 Volume: yes'],
    desc: 'Sullileni Sridhar — the mall\'s #8 best-seller, a one-man concert and dance floor. Specialises in singing and dancing, in that order, and sometimes both at once. Book him for weddings, birthdays or any occasion that needs a little more noise. (Parody item — approved by the guy himself, no humans are actually for sale.)',
    tags: ['🏅 #8 Bestseller', '🎤 Singer', '💃 Dancer', '🛎️ Service'],
    popup: { tag: '🎤 LIVE · BOOK THE SINGER', title: 'Sullileni Sridhar sings AND dances — booking fast!', small: '{left} shows left this week · ₹39,999' },
    pitch: 'Bhai, Sullileni Sridhar sings and dances for just ₹39,999 a show. Book now!',
    reviewList: [
      ['Divya N.', 5, 'Sang so well the canteen uncle stopped boiling the tea to listen.'],
      ['Kiran P.', 4, 'His dance moves unlocked a new level of embarrassment for me. 10/10.'],
      ['Ramya P.', 5, 'Booked for a birthday. Sang, danced, ate half the cake.'],
      ['Sai T.', 5, 'The Sullileni Sridhar experience: wallet lighter, heart fuller.']
    ]
  });



  person({
    name: 'Chearean.c', short: 'Chearean.c', emoji: '💻', price: 50000000, mrp: 200000000, rating: 4.9, reviews: 100000, img: 'assets/chearean.jpg',
    best: true, medal: '👑',
    rank: { n: 9, label: '👑 BEST PRODUCT OF SUSHEER SHOPPING MALL', sold: 78500 },
    note: 'Editor\'s choice. Compiles on the first try. 💻',
    taglines: ['👑 Best product of Susheer Shopping Mall', '💻 Compiles on the first try. Allegedly.', '🧠 All-rounder: codes, debugs, fixes the Wi-Fi', '💎 Perfectly expensive. Worth every rupee.', '🐞 Has never met a bug he could not fix', '⭐ 4.9 stars. The missing 0.1 is jealousy.'],
    highlights: ['💻 Programming coder — speaks C, C++, Java and Python (sleeps in none)', '🧠 All-rounder: codes, debugs, deploys and fixes your Wi-Fi', '⭐ Excellently reviewed — 4.9★ from 1,00,000 ratings', '💎 Perfectly expensive — you get exactly what you pay for', '🎂 Birthday-ready: cake and candles on request', '🐞 Zero segmentation faults* (*terms apply)'],
    desc: 'Chearean.c — a programmer, a coder and a true all-rounder, and by popular vote the BEST product in the entire Susheer Shopping Mall. He writes code that compiles on the first try, debugs while you blink, fixes the Wi-Fi and still has time to cut a birthday cake. Excellently reviewed and perfectly expensive: you do not buy Chearean.c, you invest in him. (Parody item — approved by the guy himself, no humans are actually for sale.)',
    tags: ['👑 Best Product', '💻 Coder', '🏆 All-rounder', '⭐ 4.9 rated'],
    popup: { tag: '👑 BEST PRODUCT · CODER', title: 'Chearean.c — the best product in the mall — is selling out!', small: '{left} left · compiles first time' },
    pitch: 'Boss! Chearean.c — coder, all-rounder, BEST product in the mall — only ₹5,00,00,000. Worth every rupee!',
    reviewList: [
      ['Rahul T.', 5, 'Fixed my laptop, my Wi-Fi and my life in one visit. Worth every rupee.'],
      ['Sneha K.', 5, 'Wrote a program in 10 minutes. It compiled on the first try. I cried.'],
      ['Arjun V.', 5, 'All-rounder: codes, cooks, cuts cakes. Birthday-ready too.'],
      ['Meena G.', 5, 'Perfectly expensive. You can feel the quality.'],
      ['Ganesh L.', 5, 'Five stars because he is watching me type this review.'],
      ['Kiran P.', 5, 'Zero bugs, zero excuses, infinite chai consumption.'],
      ['Divya N.', 5, 'The best product in the mall, and the mall is full of legends.']
    ]
  });

  // attach real photos (pre-fetched from Wikimedia Commons, see js/images.js) where we have one
  const IMG = window.SM_IMG || {};
  products.forEach(p => { if (!p.img && IMG[p.id]) p.photo = IMG[p.id]; });

  window.SM_DATA = {
    CATS: [{ id: 'jaggu', label: 'Jaggu', icon: '🔥', color: '#ff3d00' }].concat(CATS.map(c => ({ id: c[0], label: c[1], icon: c[2], color: c[3] }))),
    products,
    FLASH_PRICE: 50000,
    LOCAL_JAG: SM_LOCAL_JAG,
    KK_ID: SM_KK,
    PEOPLE: PEOPLE,
    BOARD: [1, SM_LOCAL_JAG, 0].concat(PEOPLE),
    POPUPS: [SM_LOCAL_JAG].concat(PEOPLE),
    REVIEWS: [
      ['Ramesh K.', 5, 'Bought one. A helicopter landed on my terrace to deliver it. 10/10 would be surprised again.'],
      ['Priya S.', 5, 'My mother-in-law now shops only at Susheer. Please send help.'],
      ['Venkat R.', 4, 'Great product. Lost one star because Mr. KK kept winking at me.'],
      ['Anjali M.', 5, 'Came for apples, left with a luxury aircraft. No regrets (bank has some).'],
      ['Sai T.', 5, 'The salesman popped up while I was in the bathroom. Still bought it.'],
      ['Lakshmi D.', 3, 'Good but my neighbour also bought one. Now we are competitors.'],
      ['Fatima B.', 5, 'Delivered in 30 minutes. I had not even finished ordering.'],
      ['Kiran P.', 5, 'Plz visit Bowenpally Mall for world rate experience. I did. I live there now.'],
      ['Divya N.', 4, 'The packaging was so fancy I hugged the box. Product also good.'],
      ['Arjun V.', 5, 'Fell in love at the flash sale. Wallet has not recovered.'],
      ['Meena G.', 5, 'Asked for a refund, got a thank-you kiss from Mr. KK instead. Fair.'],
      ['Ganesh L.', 2, 'My wife says I bought too many. I say there is no such thing.'],
      ['Sneha K.', 5, 'Bought Mr. DD for my little one. Dry for 12 hours. Dilip, however, has asked for a refund.'],
      ['Ramya P.', 5, 'Mr. Diaper Dilip absorbed all my Monday problems. Size L fits perfectly.']
    ]
  };
})();
