const fs = require('fs');
const path = require('path');

// Target: Exactly 138 products.
const TOTAL_TARGET = 138;

// Vocabulary for realistic names
const adjectives = ["Vintage", "Handmade", "Traditional", "Modern", "Rustic", "Carved", "Natural", "Painted", "Bali", "Woven", "Golden", "Silver", "Antique", "Teak", "Bamboo", "Recycled", "Colorful", "White-Washed", "Ethnic", "Premium"];

const categoryVocab = {
    "Bag": ["Rattan Bag", "Round Ata Bag", "Shoulder Bag", "Clutch", "Tote Bag", "Beach Bag", "Woven Sling Bag"],
    "Batik Fan": ["Batik Hand Fan", "Traditional Fan", "Folding Fan", "Wooden Fan", "Silk Fan"],
    "Clothing": ["Sarong", "Summer Dress", "Batik Shirt", "Kimono", "Beach Wear", "Kaftan"],
    "Jewellery": ["Silver Necklace", "Beaded Bracelet", "Shell Earrings", "Pendant", "Bangle", "Wooden Ring"],
    "Stools": ["Elephant Stool", "Sheep Stool", "Round Stool", "Step Stool", "Animal Stool", "Bar Stool"],
    "Tables": ["Coffee Table", "Side Table", "Console Table", "Root Table", "Dining Table"],
    "Chairs": ["Dining Chair", "Lounge Chair", "Folding Chair", "Terrace Chair", "Armchair"],
    "Cabinets": ["Small Cabinet", "Bedside Table", "Storage Box", "Display Cabinet", "Wardrobe"],
    "Bamboo": ["Wind Chime", "Bamboo Root Duck", "Bamboo Straws", "Serving Tray", "Ladder"],
    "Bird Bug House": ["Wooden Bird House", "Bamboo Bird Feeder", "Insect Hotel", "Hanging Bird House"],
    "Dreamcatcher": ["White Dreamcatcher", "Rainbow Dreamcatcher", "Macrame Dreamcatcher", "Feather Wall Hanging"],
    "Ducks On The Boots": ["Duck with Boots", "Wooden Duckling", "Painted Duck"],
    "Glass On Wood": ["Molten Glass Bowl", "Glass Vase on Wood", "Terrarium Bowl", "Aquarium Bowl"],
    "Glass Suncatcher": ["Stained Glass Bird", "Crystal Suncatcher", "Glass Hanging"],
    "Metal": ["Metal Wall Art", "Recycled Iron Animal", "Tin Toy", "Metal Candle Holder"],
    "Mosaic": ["Mosaic Mirror", "Mosaic Bowl", "Terra Cotta Pot", "Mosaic Plate"],
    "Resin": ["Buddha Statue", "Ganesha Figure", "Abstract Sculpture", "Resin Coaster"],
    "Stones": ["River Stone Washbasin", "Stone Garden Lamp", "Carved Pebble"],
    "Taman Bali": ["Parasol", "Garden Flag", "Temple Umbrella"],
    "Wood": ["Carved Mask", "Wooden Box", "Wall Relief", "Wooden Utensils", "Coconut Bowl"]
};

// Map subcategories to main categories
const categoryMap = {
    "Bag": { main: "FASHION", cat: "Fashion" },
    "Batik Fan": { main: "FASHION", cat: "Fashion" },
    "Clothing": { main: "FASHION", cat: "Fashion" },
    "Jewellery": { main: "FASHION", cat: "Fashion" },
    "Stools": { main: "FURNITURE", cat: "Furniture" },
    "Tables": { main: "FURNITURE", cat: "Furniture" },
    "Chairs": { main: "FURNITURE", cat: "Furniture" },
    "Cabinets": { main: "FURNITURE", cat: "Furniture" },
    // Everything else maps to HOME DEC / Home Decor by default
};

const images = [
    "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1628151016008-5d2729a65d33?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1544970631-155097327342?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1610998951806-03f422e6c1e5?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1602752250055-567f4a763131?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1515562141207-7a88fb0537bf?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1590874102051-b548b4352199?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1563299796-b729d0af54a5?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1505393081532-d85c54215286?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1615456485802-bd9ee263628e?auto=format&fit=crop&q=80&w=600"
];

const prices = [45000, 75000, 125000, 150000, 250000, 350000, 480000, 650000, 850000, 1200000, 2500000];

let products = [];
let idCounter = 1;

// 1. Generate base 5 for each category to ensure coverage
const subCategories = Object.keys(categoryVocab);

subCategories.forEach(sub => {
    const vocabList = categoryVocab[sub];
    const info = categoryMap[sub] || { main: "HOME DEC", cat: "Home Decor" };

    // Generate 5 items for this subcategory
    for (let i = 0; i < 5; i++) {
        // Pick a base name
        const baseName = vocabList[i % vocabList.length];
        // Pick an adjective
        const adj = adjectives[(idCounter + i) % adjectives.length];
        const finalName = `${adj} ${baseName}`;

        products.push({
            id: idCounter,
            name: finalName,
            category: info.cat,
            mainCategory: info.main,
            subCategory: sub,
            price: prices[(idCounter % prices.length)],
            image: images[(idCounter % images.length)],
            description: `Handcrafted ${finalName} made by skilled artisans. Sustainable and authentic.`,
            isBestSeller: Math.random() > 0.8,
            brand: "Sjahlendra Handicraft"
        });
        idCounter++;
    }
});

// Current count: 20 * 5 = 100 items. 
// Need 38 more to reach 138.

while (products.length < TOTAL_TARGET) {
    // Pick random subcategory
    const sub = subCategories[Math.floor(Math.random() * subCategories.length)];
    const vocabList = categoryVocab[sub];
    const info = categoryMap[sub] || { main: "HOME DEC", cat: "Home Decor" };

    const baseName = vocabList[Math.floor(Math.random() * vocabList.length)];
    const adj1 = adjectives[Math.floor(Math.random() * adjectives.length)];
    // Add a second adjective or suffix to ensure uniqueness if needed, or just standard
    // Let's add variations like (Model A), (Large), (Small)
    const suffixes = ["(Large)", "(Small)", "(Set of 2)", "Deluxe", "Original"];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    const finalName = `${adj1} ${baseName} ${suffix}`;

    products.push({
        id: idCounter,
        name: finalName,
        category: info.cat,
        mainCategory: info.main,
        subCategory: sub,
        price: prices[(idCounter % prices.length)],
        image: images[(idCounter % images.length)],
        description: `Exclusive ${finalName}, perfect for your collection.`,
        isBestSeller: Math.random() > 0.9,
        brand: "Sjahlendra Handicraft"
    });
    idCounter++;
}

// Write to file
const fileContent = `export const products = ${JSON.stringify(products, null, 2)};`;
const targetPath = path.resolve('c:/BAGAS/Sjahelendra/src/data/products.js');

try {
    fs.writeFileSync(targetPath, fileContent);
    console.log(`Successfully generated ${products.length} products.`);
} catch (e) {
    console.error("Error writing file:", e);
}
