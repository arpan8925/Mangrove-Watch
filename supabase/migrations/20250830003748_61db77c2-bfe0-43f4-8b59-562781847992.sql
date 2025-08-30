-- Create enum types
CREATE TYPE public.report_status AS ENUM ('pending', 'verified', 'resolved', 'rejected');
CREATE TYPE public.report_priority AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE public.report_type AS ENUM ('illegal_cutting', 'pollution', 'dumping', 'construction', 'other');
CREATE TYPE public.user_role AS ENUM ('admin', 'moderator', 'community_member', 'researcher');
CREATE TYPE public.alert_type AS ENUM ('new_report', 'critical_issue', 'system_update', 'validation_needed');

-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  email TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'community_member',
  phone TEXT,
  location TEXT,
  points INTEGER NOT NULL DEFAULT 0,
  total_reports INTEGER NOT NULL DEFAULT 0,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create areas table for monitoring zones
CREATE TABLE public.areas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  radius_km DECIMAL(10, 2) DEFAULT 5.0,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reports table for incident reports
CREATE TABLE public.reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  report_type report_type NOT NULL,
  status report_status NOT NULL DEFAULT 'pending',
  priority report_priority NOT NULL DEFAULT 'medium',
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  location_name TEXT,
  image_urls TEXT[],
  reporter_id UUID NOT NULL REFERENCES public.profiles(id),
  area_id UUID REFERENCES public.areas(id),
  ai_confidence_score DECIMAL(5, 2),
  validation_notes TEXT,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create alerts table for system notifications
CREATE TABLE public.alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  alert_type alert_type NOT NULL,
  severity report_priority NOT NULL DEFAULT 'medium',
  user_id UUID REFERENCES public.profiles(id),
  report_id UUID REFERENCES public.reports(id),
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create point_transactions table for gamification
CREATE TABLE public.point_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  points INTEGER NOT NULL,
  reason TEXT NOT NULL,
  report_id UUID REFERENCES public.reports(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.point_transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for areas
CREATE POLICY "Anyone can view areas" ON public.areas FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create areas" ON public.areas FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Users can update areas they created" ON public.areas FOR UPDATE USING (created_by IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

-- Create RLS policies for reports
CREATE POLICY "Anyone can view reports" ON public.reports FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create reports" ON public.reports FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Users can update their own reports" ON public.reports FOR UPDATE USING (reporter_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

-- Create RLS policies for alerts
CREATE POLICY "Users can view their own alerts" ON public.alerts FOR SELECT USING (user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()) OR user_id IS NULL);
CREATE POLICY "System can create alerts" ON public.alerts FOR INSERT WITH CHECK (true);

-- Create RLS policies for point_transactions
CREATE POLICY "Users can view their own transactions" ON public.point_transactions FOR SELECT USING (user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));
CREATE POLICY "System can create transactions" ON public.point_transactions FOR INSERT WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_areas_updated_at BEFORE UPDATE ON public.areas FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON public.reports FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', NEW.email),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update user points
CREATE OR REPLACE FUNCTION public.update_user_points()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for point updates
CREATE TRIGGER on_point_transaction_created
  AFTER INSERT ON public.point_transactions
  FOR EACH ROW EXECUTE FUNCTION public.update_user_points();

-- Insert sample data
INSERT INTO public.areas (name, description, latitude, longitude, radius_km) VALUES
('Sundarbans Delta', 'Primary mangrove conservation area', 21.9497, 89.1833, 15.0),
('Coastal Bay Area', 'Secondary monitoring zone', 22.2587, 91.7832, 8.0),
('Everglades Park', 'Protected mangrove ecosystem', 25.3173, -80.9326, 12.0);

-- Sample reports (will be inserted after profiles are created through auth)