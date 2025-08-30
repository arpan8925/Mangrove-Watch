import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Alert {
  id: string;
  title: string;
  message: string;
  alert_type: 'new_report' | 'critical_issue' | 'system_update' | 'validation_needed';
  severity: 'low' | 'medium' | 'high' | 'critical';
  user_id?: string;
  report_id?: string;
  read_at?: string;
  created_at: string;
}

export function useAlerts() {
  const { data: alerts, isLoading, error } = useQuery({
    queryKey: ['alerts'],
    queryFn: async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return [];

      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.user.id)
        .single();

      if (!profile) return [];

      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .or(`user_id.eq.${profile.id},user_id.is.null`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Alert[];
    },
  });

  return {
    alerts: alerts || [],
    isLoading,
    error,
  };
}