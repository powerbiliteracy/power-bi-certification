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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          created_at: string
          created_by: string
          expires_at: string | null
          id: string
          is_active: boolean
          message: string
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          created_by: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          message: string
          title: string
          type?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          message?: string
          title?: string
          type?: string
        }
        Relationships: []
      }
      badges: {
        Row: {
          category: string
          created_at: string
          description: string
          icon: string
          id: string
          key: string
          name: string
        }
        Insert: {
          category?: string
          created_at?: string
          description: string
          icon?: string
          id?: string
          key: string
          name: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          icon?: string
          id?: string
          key?: string
          name?: string
        }
        Relationships: []
      }
      concept_comparisons: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          left_label: string
          notes: string | null
          right_label: string
          rows: Json
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          left_label: string
          notes?: string | null
          right_label: string
          rows?: Json
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          left_label?: string
          notes?: string | null
          right_label?: string
          rows?: Json
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      content_overrides: {
        Row: {
          created_at: string
          created_by: string
          domain_name: string | null
          domain_section: string | null
          generated_body: Json
          generated_title: string
          id: string
          item_type: string
          original_topic: string
          section_key: string
          status: string
          syllabus_version_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          domain_name?: string | null
          domain_section?: string | null
          generated_body?: Json
          generated_title: string
          id?: string
          item_type?: string
          original_topic: string
          section_key: string
          status?: string
          syllabus_version_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          domain_name?: string | null
          domain_section?: string | null
          generated_body?: Json
          generated_title?: string
          id?: string
          item_type?: string
          original_topic?: string
          section_key?: string
          status?: string
          syllabus_version_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      content_update_events: {
        Row: {
          added_count: number
          created_at: string
          created_by: string
          details: Json
          id: string
          renamed_count: number
          section_key: string
          section_label: string
          summary: string
          syllabus_version_id: string | null
          syllabus_version_label: string | null
        }
        Insert: {
          added_count?: number
          created_at?: string
          created_by: string
          details?: Json
          id?: string
          renamed_count?: number
          section_key: string
          section_label: string
          summary: string
          syllabus_version_id?: string | null
          syllabus_version_label?: string | null
        }
        Update: {
          added_count?: number
          created_at?: string
          created_by?: string
          details?: Json
          id?: string
          renamed_count?: number
          section_key?: string
          section_label?: string
          summary?: string
          syllabus_version_id?: string | null
          syllabus_version_label?: string | null
        }
        Relationships: []
      }
      page_summaries: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          image_url: string
          is_active: boolean
          sort_order: number
          syllabus_domain: string | null
          syllabus_subtopic: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url: string
          is_active?: boolean
          sort_order?: number
          syllabus_domain?: string | null
          syllabus_subtopic?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string
          is_active?: boolean
          sort_order?: number
          syllabus_domain?: string | null
          syllabus_subtopic?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      pricing_settings: {
        Row: {
          annual_discount_percent: number
          explorer_price: number
          id: string
          premium_monthly_price: number
          pro_monthly_price: number
          singleton: boolean
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          annual_discount_percent?: number
          explorer_price?: number
          id?: string
          premium_monthly_price?: number
          pro_monthly_price?: number
          singleton?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          annual_discount_percent?: number
          explorer_price?: number
          id?: string
          premium_monthly_price?: number
          pro_monthly_price?: number
          singleton?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          email: string | null
          first_name: string | null
          flag_reason: string | null
          id: string
          last_name: string | null
          status: string
          subscription_tier: Database["public"]["Enums"]["subscription_tier"]
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          first_name?: string | null
          flag_reason?: string | null
          id?: string
          last_name?: string | null
          status?: string
          subscription_tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          first_name?: string | null
          flag_reason?: string | null
          id?: string
          last_name?: string | null
          status?: string
          subscription_tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      promo_codes: {
        Row: {
          code: string
          created_at: string
          created_by: string
          discount_percent: number
          expires_at: string
          id: string
          is_active: boolean
          max_uses: number | null
          times_used: number
        }
        Insert: {
          code: string
          created_at?: string
          created_by: string
          discount_percent?: number
          expires_at?: string
          id?: string
          is_active?: boolean
          max_uses?: number | null
          times_used?: number
        }
        Update: {
          code?: string
          created_at?: string
          created_by?: string
          discount_percent?: number
          expires_at?: string
          id?: string
          is_active?: boolean
          max_uses?: number | null
          times_used?: number
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          is_approved: boolean
          rating: number
          review_text: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id?: string
          is_approved?: boolean
          rating: number
          review_text: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          is_approved?: boolean
          rating?: number
          review_text?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      section_access: {
        Row: {
          admin_only: boolean
          id: string
          is_hidden: boolean
          is_locked: boolean
          required_tier: Database["public"]["Enums"]["subscription_tier"]
          section_key: string
          section_label: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          admin_only?: boolean
          id?: string
          is_hidden?: boolean
          is_locked?: boolean
          required_tier?: Database["public"]["Enums"]["subscription_tier"]
          section_key: string
          section_label: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          admin_only?: boolean
          id?: string
          is_hidden?: boolean
          is_locked?: boolean
          required_tier?: Database["public"]["Enums"]["subscription_tier"]
          section_key?: string
          section_label?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      study_plan_results: {
        Row: {
          completed: boolean
          created_at: string
          id: string
          quiz_answers: Json
          recommended_plan: Json
          self_ratings: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          created_at?: string
          id?: string
          quiz_answers?: Json
          recommended_plan?: Json
          self_ratings?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          created_at?: string
          id?: string
          quiz_answers?: Json
          recommended_plan?: Json
          self_ratings?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      syllabus_versions: {
        Row: {
          content: string
          created_at: string
          created_by: string
          exam_code: string
          id: string
          label: string
          notes: string | null
          source_url: string | null
        }
        Insert: {
          content: string
          created_at?: string
          created_by: string
          exam_code?: string
          id?: string
          label: string
          notes?: string | null
          source_url?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string
          exam_code?: string
          id?: string
          label?: string
          notes?: string | null
          source_url?: string | null
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_content_acknowledgments: {
        Row: {
          acknowledged_at: string
          choice: string
          event_id: string
          id: string
          snapshot: Json | null
          user_id: string
        }
        Insert: {
          acknowledged_at?: string
          choice: string
          event_id: string
          id?: string
          snapshot?: Json | null
          user_id: string
        }
        Update: {
          acknowledged_at?: string
          choice?: string
          event_id?: string
          id?: string
          snapshot?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_content_acknowledgments_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "content_update_events"
            referencedColumns: ["id"]
          },
        ]
      }
      user_favorites: {
        Row: {
          created_at: string
          id: string
          item_id: string
          item_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          item_id: string
          item_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          item_id?: string
          item_type?: string
          user_id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          completed_at: string
          id: string
          item_id: string
          item_type: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          id?: string
          item_id: string
          item_type: string
          user_id: string
        }
        Update: {
          completed_at?: string
          id?: string
          item_id?: string
          item_type?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      subscription_tier: "explorer" | "pro" | "premium"
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
      app_role: ["admin", "moderator", "user"],
      subscription_tier: ["explorer", "pro", "premium"],
    },
  },
} as const
