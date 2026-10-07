/* Susheer Shopping Mall — catalog (parody). Every product is prefixed "Susheer". */
(function () {
  let SM_LOCAL_JAG;
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
    tags: ['Flash Sale', 'Buy 1 Get 1 Free', '🥉 #3 Bestseller', 'Limited Stock']
  });

  // Product 1 — the only item in the Jaggu department
  products.push({
    id: 1, name: 'Jagadeesh', short: 'Jagadeesh', emoji: '🔥', cat: 'jaggu', catLabel: 'Jaggu',
    price: 10000000, mrp: 25000000, rating: 5.0, reviews: 999999, img: 'assets/langadeesh.jpg', hot: true, fit: true, flash: true,
    rank: { n: 1, label: '🏆 #1 MOST SOLD PRODUCT IN SUSHEER MALL HISTORY', sold: 1248760 },
    gallery: [['assets/langadeesh.jpg', 'Jagadeesh 🔥'], ['assets/jagadeesh-flash.jpg', 'His buddy: Mr. Diaper Dilip (#2 most sold) 👶']],
    taglines: ['🏆 #1 most sold product in Susheer Mall history', '🔥 FRESH & HOT — just landed at Bowenpally Mall!', '🥵 So hot our AC gave up', '💎 Only 1 piece in the entire mall', '📦 Ships with free swagger', '⚠️ May cause sudden crushes'],
    desc: 'Jagadeesh (a.k.a. Local Langadeesh) — the MOST SOLD product in the entire history of Susheer Shopping Mall. Over 12 lakh units sold (and somehow still only 1 left in stock). Now on FLASH SALE at ₹1 Crore, non-negotiable. (Parody item — approved by the guy himself, no humans are actually for sale.)',
    tags: ['🏆 #1 Bestseller Ever', '🔥 HOT', '⚡ Flash Sale', 'Only 1 in the mall']
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
    price: 75000, mrp: 500000, rating: 4.9, reviews: 88888, img: 'assets/jagadeesh-flash.jpg', hot: true, fit: true, flash: true,
    rank: { n: 2, label: '🥈 #2 MOST SOLD PRODUCT IN SUSHEER MALL', sold: 874300 },
    gallery: [['assets/jagadeesh-flash.jpg', 'Mr. Diaper Dilip — surrounded by fans'], ['assets/langadeesh.jpg', 'His buddy: Jagadeesh (#1 most sold) 🏆']],
    taglines: ['💘 Selling out EXTREMELY fast!', '🥈 #2 most sold product in the mall', '👶 Fully absorbent. Fully loyal.', '🧷 Leak-proof since birth', '🕐 Please change every 4 hours', '💍 "Marry Me" requests: 10 and counting', '📏 Available in S, M, L and XL. Pampers sold separately', '📩 DM Jagadeesh for contact details'],
    desc: 'Mr. DD — Mr. Diaper Dilip — the 2nd most sold product in Susheer Mall history, now on FLASH SALE. Surrounded by admirers, absorbs 99% of your problems and selling out extremely fast. Available in S, M, L and XL; Pampers sold separately. DM Jagadeesh for contact details. (Parody item — approved by the guy himself, no humans are actually for sale.)',
    tags: ['⚡ Flash Sale', '🥈 #2 Bestseller', '🔥 HOT', 'Leak-proof*']
  });
  SM_LOCAL_JAG = products.length - 1;

  // attach real photos (pre-fetched from Wikimedia Commons, see js/images.js) where we have one
  const IMG = window.SM_IMG || {};
  products.forEach(p => { if (!p.img && IMG[p.id]) p.photo = IMG[p.id]; });

  window.SM_DATA = {
    CATS: [{ id: 'jaggu', label: 'Jaggu', icon: '🔥', color: '#ff3d00' }].concat(CATS.map(c => ({ id: c[0], label: c[1], icon: c[2], color: c[3] }))),
    products,
    FLASH_PRICE: 50000,
    LOCAL_JAG: SM_LOCAL_JAG,
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
