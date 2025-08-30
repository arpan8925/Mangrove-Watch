import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Report {
  id: string;
  title: string;
  description: string;
  report_type: 'illegal_cutting' | 'pollution' | 'dumping' | 'construction' | 'other';
  status: 'pending' | 'verified' | 'resolved' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'critical';
  latitude: number;
  longitude: number;
  location_name?: string;
  image_urls?: string[];
  ai_confidence_score?: number;
  validation_notes?: string;
  resolved_at?: string;
  created_at: string;
  updated_at: string;
  reporter_id: string;
  area_id?: string;
  profiles: {
    display_name: string;
    email: string;
  };
}

export function useReports() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: reports, isLoading, error } = useQuery({
    queryKey: ['reports'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reports')
        .select(`
          *,
          profiles:reporter_id (
            display_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Report[];
    },
  });

  const createReportMutation = useMutation({
    mutationFn: async (newReport: Omit<Report, 'id' | 'created_at' | 'updated_at' | 'profiles' | 'reporter_id'>) => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (!profile) throw new Error('User profile not found');

      const { data, error } = await supabase
        .from('reports')
        .insert([{
          ...newReport,
          reporter_id: profile.id,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      toast({
        title: "Report Created",
        description: "Your report has been submitted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateReportMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Report> }) => {
      const { data, error } = await supabase
        .from('reports')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      toast({
        title: "Report Updated",
        description: "The report has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    reports: reports || [],
    isLoading,
    error,
    createReport: createReportMutation.mutate,
    updateReport: updateReportMutation.mutate,
    isCreating: createReportMutation.isPending,
    isUpdating: updateReportMutation.isPending,
  };
}