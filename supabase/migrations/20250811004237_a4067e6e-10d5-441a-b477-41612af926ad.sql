-- Update the trigger to properly handle admin setup
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Insert student role for new user
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.user_id, 'student')
  ON CONFLICT (user_id, role) DO NOTHING;
  
  -- Check if this is the admin email and set admin flag
  IF NEW.user_id IN (
    SELECT id FROM auth.users WHERE email = 'admin@gmail.com'
  ) THEN
    UPDATE public.profiles 
    SET is_admin = true 
    WHERE user_id = NEW.user_id;
    
    -- Also add admin role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Recreate the trigger to ensure it fires properly
DROP TRIGGER IF EXISTS on_profile_created ON public.profiles;
CREATE TRIGGER on_profile_created
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();