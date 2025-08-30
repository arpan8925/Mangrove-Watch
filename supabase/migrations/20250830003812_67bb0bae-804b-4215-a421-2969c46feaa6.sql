-- Fix security warnings by setting proper search_path for functions
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', NEW.email),
    NEW.email
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_user_points()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Update total points in profiles table
  UPDATE public.profiles 
  SET points = points + NEW.points
  WHERE id = NEW.user_id;
  
  -- Update total reports count if this is a report-related transaction
  IF NEW.report_id IS NOT NULL AND NEW.points > 0 THEN
    UPDATE public.profiles 
    SET total_reports = total_reports + 1
    WHERE id = NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$;