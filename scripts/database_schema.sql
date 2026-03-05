-- =========================================
-- SJAHLENDRA HANDICRAFT - SUPABASE SCHEMA
-- =========================================
-- Based on the exact live Supabase tables

-- --------------------------------------------------------
-- 1. CATEGORIES TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
    id serial PRIMARY KEY, -- int4
    name text NOT NULL UNIQUE,
    image_url text,
    sort_order int4 DEFAULT 0,
    created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- --------------------------------------------------------
-- 2. PRODUCTS TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
    id serial PRIMARY KEY, -- int4
    name text NOT NULL,
    category text,
    main_category text REFERENCES public.categories(name) ON UPDATE CASCADE,
    sub_category text,
    price int4 NOT NULL DEFAULT 0,
    image_url text,
    description text,
    is_best_seller boolean DEFAULT false,
    brand text,
    created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
    stock int4 DEFAULT 0
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_main_category ON public.products(main_category);
CREATE INDEX IF NOT EXISTS idx_products_best_seller ON public.products(is_best_seller);

-- --------------------------------------------------------
-- 3. CAROUSEL SLIDES TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.carousel_slides (
    id serial PRIMARY KEY, -- int4
    image_url text NOT NULL,
    image_mobile_url text,
    title text,
    subtitle text,
    description text,
    link text,
    link_label text,
    category text,
    type text NOT NULL, -- e.g., 'hero', 'promo'
    sort_order int4 DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_carousel_type ON public.carousel_slides(type);

-- --------------------------------------------------------
-- 4. SITE CONTENT TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_content (
    id serial PRIMARY KEY, -- int4
    section_key text NOT NULL UNIQUE,
    title text,
    content jsonb,
    updated_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- --------------------------------------------------------
-- 5. FAQS TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.faqs (
    id serial PRIMARY KEY, -- int4
    question text NOT NULL,
    answer text NOT NULL,
    sort_order int4 DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- --------------------------------------------------------
-- 6. SITE SETTINGS TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
    id serial PRIMARY KEY, -- int4
    key text NOT NULL UNIQUE,
    value text NOT NULL,
    updated_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================
-- STORAGE BUCKETS (Create via Supabase UI)
-- =========================================
-- You only need 1 main bucket named 'product' (set to PUBLIC)
