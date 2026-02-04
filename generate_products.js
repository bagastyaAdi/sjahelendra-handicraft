
import fs from 'fs';

const existingProducts = [
    // Keeping the original curated ones with real images
    {
        id: 1,
        name: "Teak Animal Stool - Elephant",
        category: "Furniture",
        mainCategory: "FURNITURE",
        subCategory: "Stools",
        price: 850000,
        image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=800",
        description: "Hand-carved solid teak wood stool in the shape of a majestic elephant. Perfect as a plant stand or side table.",
        isBestSeller: true,
        brand: "Sjahlendra Handicraft"
    },
    {
        id: 2,
        name: "Round Coffee Table",
        category: "Furniture",
        mainCategory: "FURNITURE",
        subCategory: "Tables",
        price: 2500000,
        image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=800",
        description: "Minimalist round coffee table made from sustainable suar wood.",
        brand: "Sjahlendra Handicraft"
    },
    {
        id: 3,
        name: "Sandstone Buddha Statue",
        category: "Home Decor",
        mainCategory: "HOME DEC",
        subCategory: "Stones",
        price: 450000,
        image: "https://images.unsplash.com/photo-1628151016008-5d2729a65d33?auto=format&fit=crop&q=80&w=800",
        description: "Serene Buddha statue carved from natural sandstone. Brings peace to any corner of your home.",
        brand: "Sjahlendra Handicraft"
    },
    {
        id: 4,
        name: "Wooden Birdhouse - Owl",
        category: "Home Decor",
        mainCategory: "HOME DEC",
        subCategory: "Wood",
        price: 150000,
        image: "https://images.unsplash.com/photo-1544970631-155097327342?auto=format&fit=crop&q=80&w=800",
        description: "Charming wooden birdhouse with an owl design. Eco-friendly and distinct.",
        isBestSeller: true,
        brand: "Sjahlendra Handicraft"
    },
    {
        id: 5,
        name: "Recycled Patchwork Dungarees",
        category: "Fashion",
        "mainCategory": "FASHION",
        subCategory: "Clothing",
        price: 350000,
        image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80&w=800",
        description: "Unique dungarees made from recycled fabric patches. Each piece is one-of-a-kind.",
        isBestSeller: true,
        brand: "Sjahlendra Handicraft"
    },
    {
        id: 6,
        name: "Batik Hand Fan",
        category: "Fashion",
        mainCategory: "FASHION",
        subCategory: "Batik Fan",
        price: 75000,
        image: "https://images.unsplash.com/photo-1610998951806-03f422e6c1e5?auto=format&fit=crop&q=80&w=800",
        description: "Traditional Batik fan, perfect for warm days or as a decorative wall piece.",
        brand: "Sjahlendra Handicraft"
    },
    {
        id: 7,
        name: "Silver Filigree Brooch",
        category: "Fashion",
        mainCategory: "FASHION",
        subCategory: "Jewellery",
        price: 450000,
        image: "https://images.unsplash.com/photo-1602752250055-567f4a763131?auto=format&fit=crop&q=80&w=800",
        description: "Exquisite handmade silver brooch using traditional filigree techniques.",
        isBestSeller: true,
        brand: "Sjahlendra Handicraft"
    }
];

const rawList = `7 dreamcatchers
Animals Stools Coffee Tables
Animals Tables Owl
Animals Wooden Stool
Backpack Recycle Patchwork Fabric
Bamboo Chime With Blue Turtle
Bamboo Chime With Blue Turtle Main
Bamboo Chime With Cat On The Airplane
Bamboo Chime With Daisy On Yellow Circle
Bamboo Chime With Hamsa Hand
Bamboo Chime With Mushroom
Bamboo Chime With Pinapple
bamboo chime with rainbow
Bamboo Fluet
Bamboo Shime With Sand Crab
bandana patchwork asst. cols
Barn owl on tree trunk, hand carved wooden
Batik Fan Large Fan
Batik Fan Large Fan
Batik Fan Small Fan
Bee Bug House Hexagonal Natural
Bee Bug House Hexagonal Save Our Bees
Bee Bug Wooden House
Bird Feeder Driftwood Round
Birdhouse Carved Jempinis Wood Green Man
Birdhouse Driftwood
Birdhouse Owl Design
Birf House Blue
Buddha sandstone mini decoration
Buddha sandstone, 16cm height
Buddha sandstone, tea light candle
Bug Bee House From Recycle Wooden And Bamboo – Blue
Bug Bee House From Recycle Wooden And Bamboo – green
Bug Bee House From Recycle Wooden And Bamboo – Yellow
Chaffinch on tree trunk, hand carved wooden
Curlew on tree trunk, hand carved wooden
Dipper on tree trunk, hand carved and painted
Dreamcatcher on bamboo frame, green white brown
Dreamcatcher on bamboo frame, white tassels, grey green beige inner
dreamcatcher on rattan frame – turquoise
dreamcatcher One Eye
Dreamcatcher purple plus mixed colours
dreamcatcher tree of life rainbow colours
Dreamcatcher with black beads, orange black
Dreamcatcher with rainbow frame pink
Dreamcatcher with rainbow thread and beads orange black
Dreamcatcher with rainbow thread and beads pink black
Dreamcatcher with rainbow thread and beads Purple black
Duck Quacker
Dungarees short leg mixed colors patchwork
Elephant, sandstone
Frog no hand
Glass bowl on wooden hand
Goldfinch on tree trunk, hand carved wooden
Green Elephant Stool
Greenman Bicarving Birdhouse Tall
Hanging Bird Houswe Slooping Roof
Hanging Circular Bamboo Bee Bug Hotel
Hanging Ornament 2 Parrots on Perch, Albesia Wood
Hanging Ornament Parrot on Perch, Albesia Wood
Hedge sparrow on tree trunk, hand carved and painted
Heron, hand carved and painted 37cm height
Herring gull on tree trunk, hand carved and painted
Hexagon wooden Bug house – green
Kids Tables
Long Bamboo Fluet
Long Dress With Smocking, Patchwork Greens One Size
Long Dungarees
long jumpsuit patchwork
Long Pants With Drawstring
Long Skirt
Mask hand carved wooden
Mask hand carved wooden
mask hand carved wooden
Mask hand carved wooden
Metal bird main
Metal card holder pink rabbit
Metal card holder yellow rabbit
Metal small frog
Metal Snails
Mirror Circle Mosaic
Monk, sandstone
Natural Bird bee bug house from wooden and bamboo
natural wooden bug butterfly house
Neckalce Multicolours
Pair of Wooden Boxes, Flower of Life
Pan Pipes 10 Tubes
Pendant Hamsa Hand
Pendant Sonokeling Rosewood Tree Of Life
Pendant Yoga
Pinafore Dress Patchwork Pinks Purples
Rainstick
Rattle Cylinder Drum
Rattle Egg
rattle frog
rattle with beads cover
recycled glass 12 bottles
recycled glass and wood bee
Recycled glass and wood peace
recycled glass and wood, unicorn multicoloured hanging
Recycled glass curved
resin butterfly army green, orange, burgundy
resin butterfly blue orange
Resin butterfly blue, olive, yellow
Resin butterfly purple orange
Resin candle holder – Hamsa hand
Resin candle holder fish and lotus
Reversible Coat Blues Patchwork
Reversible Coat Reds Blacks Patchwork
Room Partition
Round Hanging Sun Design Recycled Glass Mosaic
Shaking Head Tortoise, Coconut
Shopper Bag Recycle Patchwork Fabric
Short Sleeve Shirt Blue Patchwork
Short Sleeve Shirt Purple Patchwork
Short Sleeve Shirt Red Patchwork
Small glass ball on recycle wooden
Small glass ball on recycle wooden
Swan, hand carved and painted
Swirl skirt patchwork, assorted colors
Swirl Skirt Short
Tambourine
Thumb Piano – Coconut Shell Unpainted
Travel Bag Recycle Patchwork Fabric
Triangle bug house from recycle wooden – green
White Elephant Stool
Wood Pendant Turtle
Wooden Bug butterfly house
Wooden Bug House, hexagon with used wooden rounded
wooden insect bug bee hotel
Wooden Stoll Cat Mongkey
Wooden Stool And Table Animals
Wooden Stool Animals
Wooden Stool Animals Multi Cols
Wooden Stool Crab
Wooden Stool Sea Horse
Wooden Stool Starfish
Wooden Stool Starfish`;

function getCategoryData(name) {
    const nameLower = name.toLowerCase();

    // Helper for placeholder images unique to the product
    const getPlaceholder = (n) => `https://placehold.co/600x600/f1f5f9/475569.png?text=${encodeURIComponent(n)}`;

    if (nameLower.includes("dreamcatcher")) {
        return { category: "Home Decor", mainCategory: "HOME DEC", subCategory: "Dreamcatchers", image: getPlaceholder(name) };
    }

    // Furniture
    else if (["stool", "table", "chair", "furniture", "partition"].some(x => nameLower.includes(x))) {
        return { category: "Furniture", mainCategory: "FURNITURE", subCategory: "Stools & Tables", image: getPlaceholder(name) };
    }

    // Chimes & Music
    else if (["chime", "fluet", "wind", "bell", "drum", "piano", "tambourine", "rainstick", "rattle", "pipe"].some(x => nameLower.includes(x))) {
        return { category: "Home Decor", mainCategory: "HOME DEC", subCategory: "Chimes & Music", image: getPlaceholder(name) };
    }

    // Fashion
    else if (["patchwork", "dress", "shirt", "pant", "skirt", "clothe", "dungurees", "dungarees", "bag", "bandana", "coat", "jump", "reversible"].some(x => nameLower.includes(x))) {
        return { category: "Fashion", mainCategory: "FASHION", subCategory: "Clothing", image: getPlaceholder(name) };
    } else if (["necklace", "pendant", "jewel", "brace", "brooch"].some(x => nameLower.includes(x))) {
        return { category: "Fashion", mainCategory: "FASHION", subCategory: "Jewellery", image: getPlaceholder(name) };
    }

    // Wood Carvings
    else if (["bird", "owl", "duck", "frog", "animal", "carved", "mask", "elephant", "wood", "handicraft", "tortoise", "swan", "heron", "parrot", "sparrow", "chaffinch", "curlew", "dipper", "goldfinch", "gull"].some(x => nameLower.includes(x))) {
        return { category: "Home Decor", mainCategory: "HOME DEC", subCategory: "Wood Carvings", image: getPlaceholder(name) };
    }

    // Stone / Statues
    else if (["buddha", "monk", "sandstone", "statue"].some(x => nameLower.includes(x))) {
        return { category: "Home Decor", mainCategory: "HOME DEC", subCategory: "Stone Art", image: getPlaceholder(name) };
    }

    // Glass / Recycled
    else if (["glass", "bottle", "mosaic", "mirror"].some(x => nameLower.includes(x))) {
        return { category: "Home Decor", mainCategory: "HOME DEC", subCategory: "Glass & Mosaic", image: getPlaceholder(name) };
    }

    // Garden / Bug Houses 
    else if (["bug", "bee", "house", "feeder", "garden"].some(x => nameLower.includes(x))) {
        return { category: "Outdoors", mainCategory: "OUTDOOR", subCategory: "Garden Decor", image: getPlaceholder(name) };
    }

    // Default
    else {
        return { category: "Home Decor", mainCategory: "HOME DEC", subCategory: "Accessories", image: getPlaceholder(name) };
    }
}

const products = [...existingProducts];
let startId = 8;
const existingNames = new Set(products.map(p => p.name.toLowerCase()));

const lines = rawList.trim().split('\n');
for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    // Capitalize properly
    const name = line.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

    if (existingNames.has(name.toLowerCase())) continue;

    const { category, mainCategory, subCategory, image } = getCategoryData(name);

    // Estimate price based on category
    let price = 75000;
    if (mainCategory === "FURNITURE") price = 450000;
    if (subCategory === "Dreamcatchers") price = 120000;
    if (subCategory === "Wood Carvings") price = 150000;
    if (subCategory === "Clothing") price = 250000;
    if (subCategory === "Stone Art") price = 350000;

    products.push({
        id: startId++,
        name: name,
        category,
        mainCategory,
        subCategory,
        price,
        image,
        description: `Handcrafted ${name}. Unique and sustainable.`,
        brand: "Sjahlendra Handicraft"
    });
    existingNames.add(name.toLowerCase());
}

const fileContent = `export const products = ${JSON.stringify(products, null, 2)};\n`;

fs.writeFileSync('src/data/products.js', fileContent);
console.log(`Generated ${products.length} products.`);
