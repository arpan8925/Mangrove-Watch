import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Profile {
  id: string;
  user_id: string;
  display_name: string;
  email: string;
  role: 'admin' | 'moderator' | 'community_member' | 'researcher';
  phone?: string;
  location?: string;
  points: number;
  total_reports: number;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export function useProfiles() {
  const { data: profiles, isLoading, error } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('points', { ascending: false });

      if (error) throw error;
      return data as Profile[];
    },
  });

  return {
    profiles: profiles || [],
    isLoading,
    error,
  };
}

export function useCurrentProfile() {
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['currentProfile'],
    queryFn: async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.user.id)
        .single();

      if (error) throw error;
      return data as Profile;
    },
  });

  return {
    profile,
    isLoading,
    error,
  };
}