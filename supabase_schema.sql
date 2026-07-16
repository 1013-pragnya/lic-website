-- Database schema for LIC 3D Insurance & Real Estate Website

-- 1. Media Library Table
CREATE TABLE IF NOT EXISTS public.media (
    id TEXT PRIMARY KEY,
    file_name TEXT,
    original_name TEXT,
    file_url TEXT, -- Can be public URL or base64 data
    file_size TEXT,
    mime_type TEXT,
    width INTEGER,
    height INTEGER,
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Insurance Plans Table
CREATE TABLE IF NOT EXISTS public.plans (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    provider TEXT NOT NULL,
    category TEXT,
    tagline TEXT,
    icon TEXT,
    description TEXT,
    logo TEXT, -- Image URL/Base64 or path
    image TEXT, -- Image URL/Base64 or path
    benefits JSONB DEFAULT '[]'::jsonb,
    eligibility JSONB DEFAULT '{}'::jsonb,
    hidden BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Real Estate Properties Table
CREATE TABLE IF NOT EXISTS public.real_estate (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT,
    type TEXT,
    benefits TEXT,
    price TEXT,
    image TEXT, -- Cover image URL/Base64 or path
    price_card_image TEXT, -- Pricing image
    map_image TEXT, -- Map location image
    developer TEXT,
    approvals JSONB DEFAULT '[]'::jsonb,
    gift TEXT,
    highlights JSONB DEFAULT '[]'::jsonb,
    investment_benefits JSONB DEFAULT '[]'::jsonb,
    location_advantages JSONB DEFAULT '[]'::jsonb,
    trust_badges JSONB DEFAULT '[]'::jsonb,
    status TEXT DEFAULT 'Available',
    featured BOOLEAN DEFAULT FALSE,
    hidden BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id TEXT PRIMARY KEY,
    client_name TEXT NOT NULL,
    client_location TEXT,
    policy_name TEXT,
    review TEXT NOT NULL,
    image_id TEXT, -- References media.id or custom path
    hidden BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Banners (Hero Banners) Table
CREATE TABLE IF NOT EXISTS public.banners (
    id TEXT PRIMARY KEY,
    badge TEXT,
    title TEXT NOT NULL,
    description TEXT,
    primary_button_text TEXT,
    secondary_button_text TEXT,
    families_count TEXT,
    background_image TEXT,
    hidden BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Partners Table
CREATE TABLE IF NOT EXISTS public.partners (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,
    logo TEXT, -- Partner Logo URL/Base64 or path
    description TEXT,
    button_text TEXT,
    button_link TEXT,
    hidden BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Benefits Table
CREATE TABLE IF NOT EXISTS public.benefits (
    id TEXT PRIMARY KEY,
    icon TEXT,
    title TEXT NOT NULL,
    description TEXT,
    hidden BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Quotes Table (Inquiries)
CREATE TABLE IF NOT EXISTS public.quotes (
    id TEXT PRIMARY KEY,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    provider TEXT,
    category TEXT,
    message TEXT,
    status TEXT DEFAULT 'New'
);

-- 9. Contacts Table (General Messages)
CREATE TABLE IF NOT EXISTS public.contacts (
    id TEXT PRIMARY KEY,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    plan TEXT,
    property_interest TEXT,
    message TEXT,
    status TEXT DEFAULT 'New'
);

-- 10. Settings & Dynamic Branding Table
CREATE TABLE IF NOT EXISTS public.settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS & policies or disable it for simplicity.
-- We explicitly set Row Level Security to off on public schemas to allow client direct operations for this local developer project.
-- Run these policies if RLS is enabled:
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.real_estate ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Create Open Policies for Public SELECT, INSERT, UPDATE, DELETE (Standard for demo workspaces)
CREATE POLICY "Allow public select on media" ON public.media FOR SELECT USING (true);
CREATE POLICY "Allow public insert on media" ON public.media FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on media" ON public.media FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on media" ON public.media FOR DELETE USING (true);

CREATE POLICY "Allow public select on plans" ON public.plans FOR SELECT USING (true);
CREATE POLICY "Allow public insert on plans" ON public.plans FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on plans" ON public.plans FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on plans" ON public.plans FOR DELETE USING (true);

CREATE POLICY "Allow public select on real_estate" ON public.real_estate FOR SELECT USING (true);
CREATE POLICY "Allow public insert on real_estate" ON public.real_estate FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on real_estate" ON public.real_estate FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on real_estate" ON public.real_estate FOR DELETE USING (true);

CREATE POLICY "Allow public select on testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public insert on testimonials" ON public.testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on testimonials" ON public.testimonials FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on testimonials" ON public.testimonials FOR DELETE USING (true);

CREATE POLICY "Allow public select on banners" ON public.banners FOR SELECT USING (true);
CREATE POLICY "Allow public insert on banners" ON public.banners FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on banners" ON public.banners FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on banners" ON public.banners FOR DELETE USING (true);

CREATE POLICY "Allow public select on partners" ON public.partners FOR SELECT USING (true);
CREATE POLICY "Allow public insert on partners" ON public.partners FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on partners" ON public.partners FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on partners" ON public.partners FOR DELETE USING (true);

CREATE POLICY "Allow public select on benefits" ON public.benefits FOR SELECT USING (true);
CREATE POLICY "Allow public insert on benefits" ON public.benefits FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on benefits" ON public.benefits FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on benefits" ON public.benefits FOR DELETE USING (true);

CREATE POLICY "Allow public select on quotes" ON public.quotes FOR SELECT USING (true);
CREATE POLICY "Allow public insert on quotes" ON public.quotes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on quotes" ON public.quotes FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on quotes" ON public.quotes FOR DELETE USING (true);

CREATE POLICY "Allow public select on contacts" ON public.contacts FOR SELECT USING (true);
CREATE POLICY "Allow public insert on contacts" ON public.contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on contacts" ON public.contacts FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on contacts" ON public.contacts FOR DELETE USING (true);

CREATE POLICY "Allow public select on settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Allow public insert on settings" ON public.settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on settings" ON public.settings FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on settings" ON public.settings FOR DELETE USING (true);
