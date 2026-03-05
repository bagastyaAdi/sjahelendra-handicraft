-- =========================================
-- SJAHLENDRA HANDICRAFT - SUPABASE SEED DATA
-- =========================================
-- This script contains dummy data aligned with the latest int4 schema.
-- Run 'database_schema.sql' before running this script.

-- --------------------------------------------------------
-- 1. SEED CATEGORIES
-- --------------------------------------------------------
INSERT INTO public.categories (name, image_url, sort_order) VALUES
('Furniture', 'https://placehold.co/800x600/e0e0e0/333?text=Furniture', 1),
('Home Decor', 'https://placehold.co/800x600/e0e0e0/333?text=Home+Decor', 2),
('Lighting', 'https://placehold.co/800x600/e0e0e0/333?text=Lighting', 3),
('Kitchenware', 'https://placehold.co/800x600/e0e0e0/333?text=Kitchenware', 4)
ON CONFLICT (name) DO NOTHING;

-- --------------------------------------------------------
-- 2. SEED PRODUCTS
-- --------------------------------------------------------
INSERT INTO public.products (name, description, price, stock, image_url, main_category, is_best_seller, brand) VALUES
('Teak Wood Lounge Chair', 'Elegant hand-crafted lounge chair made from sustainable teak wood.', 2500000, 10, 'https://placehold.co/800x800/f0f0f0/666?text=Teak+Chair', 'Furniture', true, 'Sjahlendra'),
('Rattan Dining Set', 'Minimalist dining set featuring woven rattan chairs and a solid wood table.', 4500000, 5, 'https://placehold.co/800x800/f0f0f0/666?text=Dining+Set', 'Furniture', false, 'Sjahlendra'),
('Woven Bamboo Basket', 'Multipurpose storage basket hand-woven from natural bamboo.', 150000, 50, 'https://placehold.co/800x800/f0f0f0/666?text=Bamboo+Basket', 'Home Decor', true, 'CraftLocal'),
('Ceramic Vase Set', 'Set of 3 rustic ceramic vases perfect for dried flowers.', 350000, 20, 'https://placehold.co/800x800/f0f0f0/666?text=Ceramic+Vase', 'Home Decor', false, 'EarthWorks'),
('Macrame Wall Hanging', 'Bohemian-style macrame wall art, woven with natural cotton rope.', 280000, 15, 'https://placehold.co/800x800/f0f0f0/666?text=Macrame+Wall+Art', 'Home Decor', true, 'Sjahlendra'),
('Pendant Rattan Lamp', 'Warm ambient lighting enclosed in a meticulously woven rattan lampshade.', 750000, 8, 'https://placehold.co/800x800/f0f0f0/666?text=Rattan+Lamp', 'Lighting', true, 'Sjahlendra'),
('Wooden Salad Bowl', 'Large serving bowl carved from a single piece of mahogany.', 220000, 30, 'https://placehold.co/800x800/f0f0f0/666?text=Salad+Bowl', 'Kitchenware', false, 'EarthWorks'),
('Teak Spatula Set', 'Durable and heat-resistant cooking utensils set.', 120000, 100, 'https://placehold.co/800x800/f0f0f0/666?text=Spatula+Set', 'Kitchenware', true, 'CraftLocal');

-- --------------------------------------------------------
-- 3. SEED CAROUSEL SLIDES (Hero & Promo)
-- --------------------------------------------------------
INSERT INTO public.carousel_slides (type, title, subtitle, description, link, link_label, image_url, sort_order, is_active) VALUES
('hero', 'Handcrafted Elegance', 'Discover authentic, artisan-made furniture', 'We craft our items to outlast generations.', '/products', 'SHOP COLLECTION', 'https://placehold.co/1920x1080/2c3e50/fff?text=Handcrafted+Elegance', 1, true),
('hero', 'Sustainable Materials', 'Ethically sourced wood and natural fibers', 'Saving the planet one chair at a time.', '/about', 'OUR STORY', 'https://placehold.co/1920x1080/7f8c8d/fff?text=Sustainable+Materials', 2, true),
('promo', 'Summer Sale', 'Up to 50% Off Home Decor', 'Dont miss out on the summer bargains.', '/products', 'SHOP SALE', 'https://placehold.co/1200x500/e67e22/fff?text=Summer+Sale', 1, true);

-- --------------------------------------------------------
-- 4. SEED SITE CONTENT (e.g. For About pages instead of about_pages/team_members tables)
-- --------------------------------------------------------
INSERT INTO public.site_content (section_key, title, content) VALUES
('about_hero', 'Our Journey', '{"text": "Sjahlendra Handicraft began as a passionate endeavor.", "image": "https://placehold.co/1200x600/4a4a4a/fff?text=Our+Journey"}'),
('about_vision', 'Our Vision', '{"text": "To be the leading platform for sustainable artisan goods."}')
ON CONFLICT (section_key) DO UPDATE SET 
    title = EXCLUDED.title,
    content = EXCLUDED.content;

-- --------------------------------------------------------
-- 5. SEED FAQS
-- --------------------------------------------------------
INSERT INTO public.faqs (question, answer, sort_order, is_active) VALUES
('Do you ship internationally?', 'Yes, we provide international shipping. Costs will apply and be calculated at checkout.', 1, true),
('Are your materials sustainably sourced?', 'Absolutely. All our wood and natural fibers are ethically sourced and certified.', 2, true),
('Can I request a custom design?', 'Yes, we do take custom wholesale orders. Please contact us via our email.', 3, true);

-- --------------------------------------------------------
-- 6. SEED SITE SETTINGS (Footer Info)
-- --------------------------------------------------------
INSERT INTO public.site_settings (key, value) VALUES
('phone', '+62 813-1666-3377'),
('email', 'info@sjahlendra.com'),
('address', 'Jl. Handicraft No. 12, Bali, Indonesia'),
('instagram', '@sjahlendra.handicraft')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
