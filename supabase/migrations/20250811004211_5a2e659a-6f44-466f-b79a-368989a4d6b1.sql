-- Create admin user directly in auth.users table
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  gen_random_uuid(),
  'admin@gmail.com',
  crypt('admin2025', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"full_name": "Administrator"}',
  false,
  'authenticated'
) ON CONFLICT (email) DO NOTHING;

-- Create profile for admin user
INSERT INTO public.profiles (
  user_id,
  full_name,
  is_admin,
  created_at,
  updated_at
)
SELECT 
  id,
  'Administrator',
  true,
  now(),
  now()
FROM auth.users 
WHERE email = 'admin@gmail.com'
ON CONFLICT (user_id) DO UPDATE SET
  is_admin = true,
  full_name = 'Administrator';

-- Add admin role to user_roles table
INSERT INTO public.user_roles (
  user_id,
  role,
  created_at
)
SELECT 
  id,
  'admin'::app_role,
  now()
FROM auth.users 
WHERE email = 'admin@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Also add student role as default
INSERT INTO public.user_roles (
  user_id,
  role,
  created_at
)
SELECT 
  id,
  'student'::app_role,
  now()
FROM auth.users 
WHERE email = 'admin@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;