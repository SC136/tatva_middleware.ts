-- ============================================
-- Tatva Business Management - Supabase Setup
-- ============================================
-- Run this SQL in your Supabase SQL Editor
-- Go to: https://app.supabase.com > Your Project > SQL Editor
-- ============================================

-- 1. Create profiles table for user data
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE,
  first_name text,
  last_name text,
  phone text,
  business_name text,
  preferred_language text DEFAULT 'en',
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 2. Create function to automatically update updated_at timestamp
-- ============================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$;

-- 3. Create trigger for profiles table
-- ============================================
CREATE OR REPLACE TRIGGER profiles_set_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 4. Enable Row Level Security (RLS) on profiles
-- ============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS Policies for profiles table
-- ============================================

-- Allow users to view their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles
FOR SELECT 
USING (auth.uid() = id);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert own profile" 
ON public.profiles
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" 
ON public.profiles
FOR UPDATE 
USING (auth.uid() = id) 
WITH CHECK (auth.uid() = id);

-- Allow users to delete their own profile
CREATE POLICY "Users can delete own profile" 
ON public.profiles
FOR DELETE 
USING (auth.uid() = id);

-- ============================================
-- Optional: Future Tables (if you want to move from localStorage to Supabase)
-- ============================================
-- Uncomment these if you want to store transactions, products, etc. in Supabase

/*
-- Transactions Table
CREATE TABLE IF NOT EXISTS public.transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('income', 'expense')),
  amount numeric(10,2) NOT NULL,
  category text,
  description text,
  date date NOT NULL DEFAULT CURRENT_DATE,
  payment_method text,
  notes text,
  is_voice_input boolean DEFAULT false,
  product_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Products/Inventory Table
CREATE TABLE IF NOT EXISTS public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  category text,
  sku text,
  unit text NOT NULL DEFAULT 'piece',
  cost_price numeric(10,2),
  selling_price numeric(10,2) NOT NULL,
  stock_quantity integer NOT NULL DEFAULT 0,
  low_stock_threshold integer DEFAULT 10,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Transactions
CREATE POLICY "Users can view own transactions" 
ON public.transactions FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions" 
ON public.transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own transactions" 
ON public.transactions FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own transactions" 
ON public.transactions FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for Products
CREATE POLICY "Users can view own products" 
ON public.products FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own products" 
ON public.products FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own products" 
ON public.products FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own products" 
ON public.products FOR DELETE USING (auth.uid() = user_id);

-- Triggers for automatic updated_at
CREATE TRIGGER transactions_set_updated_at
BEFORE UPDATE ON public.transactions
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER products_set_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
*/

-- ============================================
-- Verification Query
-- ============================================
-- Run this to verify your setup
SELECT 
  'Profiles table created' as status,
  COUNT(*) as profile_count 
FROM public.profiles;
