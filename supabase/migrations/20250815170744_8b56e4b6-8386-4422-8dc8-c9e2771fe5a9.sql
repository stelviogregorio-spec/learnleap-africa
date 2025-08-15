
-- 1) Criar perfis que estiverem faltando (para usuários já existentes no auth.users)
INSERT INTO public.profiles (user_id, full_name)
SELECT
  u.id,
  COALESCE(u.raw_user_meta_data->>'full_name', split_part(u.email, '@', 1))
FROM auth.users u
LEFT JOIN public.profiles p ON p.user_id = u.id
WHERE p.user_id IS NULL;

-- 2) Promover emails específicos a administradores
-- Inclui admin@gmail.com (padrão) e o email visto nos logs: paufergunza@gmail.com
UPDATE public.profiles
SET is_admin = TRUE
WHERE user_id IN (
  SELECT id FROM auth.users
  WHERE email IN ('admin@gmail.com', 'paufergunza@gmail.com')
);

-- 3) Garantir que o papel 'admin' esteja presente para esses emails
INSERT INTO public.user_roles (user_id, role)
SELECT u.id, 'admin'::public.app_role
FROM auth.users u
LEFT JOIN public.user_roles ur
  ON ur.user_id = u.id AND ur.role = 'admin'
WHERE u.email IN ('admin@gmail.com', 'paufergunza@gmail.com')
  AND ur.id IS NULL;

-- 4) Garantir que todos tenham o papel 'student' (caso tenham perfil antigo sem o trigger ter rodado)
INSERT INTO public.user_roles (user_id, role)
SELECT p.user_id, 'student'::public.app_role
FROM public.profiles p
LEFT JOIN public.user_roles ur
  ON ur.user_id = p.user_id AND ur.role = 'student'
WHERE ur.id IS NULL;
