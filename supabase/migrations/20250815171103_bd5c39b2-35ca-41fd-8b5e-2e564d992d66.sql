-- Create missing profiles for existing users
INSERT INTO public.profiles (user_id, full_name)
SELECT u.id, COALESCE(u.raw_user_meta_data->>'full_name', u.email)
FROM auth.users u
LEFT JOIN public.profiles p ON p.user_id = u.id
WHERE p.user_id IS NULL;

-- Promote specific emails to admin
UPDATE public.profiles p
SET is_admin = TRUE
FROM auth.users u
WHERE p.user_id = u.id
  AND u.email IN ('admin@gmail.com', 'paufergunza@gmail.com');

-- Ensure 'admin' role for those admins
INSERT INTO public.user_roles (user_id, role)
SELECT u.id, 'admin'::app_role
FROM auth.users u
LEFT JOIN public.user_roles ur 
  ON ur.user_id = u.id AND ur.role = 'admin'::app_role
WHERE u.email IN ('admin@gmail.com', 'paufergunza@gmail.com')
  AND ur.user_id IS NULL;

-- Ensure 'student' role for all users with a profile
INSERT INTO public.user_roles (user_id, role)
SELECT p.user_id, 'student'::app_role
FROM public.profiles p
LEFT JOIN public.user_roles ur 
  ON ur.user_id = p.user_id AND ur.role = 'student'::app_role
WHERE ur.user_id IS NULL;