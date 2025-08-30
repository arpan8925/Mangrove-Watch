export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          alert_type: Database["public"]["Enums"]["alert_type"]
          created_at: string
          id: string
          message: string
          read_at: string | null
          report_id: string | null
          severity: Database["public"]["Enums"]["report_priority"]
          title: string
          user_id: string | null
        }
        Insert: {
          alert_type: Database["public"]["Enums"]["alert_type"]
          created_at?: string
          id?: string
          message: string
          read_at?: string | null
          report_id?: string | null
          severity?: Database["public"]["Enums"]["report_priority"]
          title: string
          user_id?: string | null
        }
        Update: {
          alert_type?: Database["public"]["Enums"]["alert_type"]
          created_at?: string
          id?: string
          message?: string
          read_at?: string | null
          report_id?: string | null
          severity?: Database["public"]["Enums"]["report_priority"]
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alerts_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alerts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      areas: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          latitude: number
          longitude: number
          name: string
          radius_km: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          latitude: number
          longitude: number
          name: string
          radius_km?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          latitude?: number
          longitude?: number
          name?: string
          radius_km?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "areas_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      point_transactions: {
        Row: {
          created_at: string
          id: string
          points: number
          reason: string
          report_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          points: number
          reason: string
          report_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          points?: number
          reason?: string
          report_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "point_transactions_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "point_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string
          email: string
          id: string
          location: string | null
          phone: string | null
          points: number
          role: Database["public"]["Enums"]["user_role"]
          total_reports: number
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name: string
          email: string
          id?: string
          location?: string | null
          phone?: string | null
          points?: number
          role?: Database["public"]["Enums"]["user_role"]
          total_reports?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string
          email?: string
          id?: string
          location?: string | null
          phone?: string | null
          points?: number
          role?: Database["public"]["Enums"]["user_role"]
          total_reports?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          ai_confidence_score: number | null
          area_id: string | null
          created_at: string
          description: string
          id: string
          image_urls: string[] | null
          latitude: number
          location_name: string | null
          longitude: number
          priority: Database["public"]["Enums"]["report_priority"]
          report_type: Database["public"]["Enums"]["report_type"]
          reporter_id: string
          resolved_at: string | null
          status: Database["public"]["Enums"]["report_status"]
          title: string
          updated_at: string
          validation_notes: string | null
        }
        Insert: {
          ai_confidence_score?: number | null
          area_id?: string | null
          created_at?: string
          description: string
          id?: string
          image_urls?: string[] | null
          latitude: number
          location_name?: string | null
          longitude: number
          priority?: Database["public"]["Enums"]["report_priority"]
          report_type: Database["public"]["Enums"]["report_type"]
          reporter_id: string
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["report_status"]
          title: string
          updated_at?: string
          validation_notes?: string | null
        }
        Update: {
          ai_confidence_score?: number | null
          area_id?: string | null
          created_at?: string
          description?: string
          id?: string
          image_urls?: string[] | null
          latitude?: number
          location_name?: string | null
          longitude?: number
          priority?: Database["public"]["Enums"]["report_priority"]
          report_type?: Database["public"]["Enums"]["report_type"]
          reporter_id?: string
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["report_status"]
          title?: string
          updated_at?: string
          validation_notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_area_id_fkey"
            columns: ["area_id"]
            isOneToOne: false
            referencedRelation: "areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      alert_type:
        | "new_report"
        | "critical_issue"
        | "system_update"
        | "validation_needed"
      report_priority: "low" | "medium" | "high" | "critical"
      report_status: "pending" | "verified" | "resolved" | "rejected"
      report_type:
        | "illegal_cutting"
        | "pollution"
        | "dumping"
        | "construction"
        | "other"
      user_role: "admin" | "moderator" | "community_member" | "researcher"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      alert_type: [
        "new_report",
        "critical_issue",
        "system_update",
        "validation_needed",
      ],
      report_priority: ["low", "medium", "high", "critical"],
      report_status: ["pending", "verified", "resolved", "rejected"],
      report_type: [
        "illegal_cutting",
        "pollution",
        "dumping",
        "construction",
        "other",
      ],
      user_role: ["admin", "moderator", "community_member", "researcher"],
    },
  },
} as const
