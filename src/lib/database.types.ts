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
      accounting_integration_logs: {
        Row: {
          application_id: string
          created_at: string | null
          error_message: string | null
          id: string
          last_retry_at: string | null
          operation_type: string
          request_data: Json | null
          response_data: Json | null
          retry_count: number | null
          service_name: string
          status: string
        }
        Insert: {
          application_id: string
          created_at?: string | null
          error_message?: string | null
          id?: string
          last_retry_at?: string | null
          operation_type: string
          request_data?: Json | null
          response_data?: Json | null
          retry_count?: number | null
          service_name: string
          status: string
        }
        Update: {
          application_id?: string
          created_at?: string | null
          error_message?: string | null
          id?: string
          last_retry_at?: string | null
          operation_type?: string
          request_data?: Json | null
          response_data?: Json | null
          retry_count?: number | null
          service_name?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounting_integration_logs_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      application_approvals: {
        Row: {
          application_id: string
          approved_at: string | null
          approver_id: string
          comment: string | null
          created_at: string | null
          id: string
          status: string
          step: number
        }
        Insert: {
          application_id: string
          approved_at?: string | null
          approver_id: string
          comment?: string | null
          created_at?: string | null
          id?: string
          status: string
          step?: number
        }
        Update: {
          application_id?: string
          approved_at?: string | null
          approver_id?: string
          comment?: string | null
          created_at?: string | null
          id?: string
          status?: string
          step?: number
        }
        Relationships: [
          {
            foreignKeyName: "application_approvals_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          data: Json | null
          description: string | null
          id: string
          organization_id: string | null
          rejection_reason: string | null
          status: string | null
          submitted_at: string | null
          title: string
          total_amount: number | null
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          data?: Json | null
          description?: string | null
          id?: string
          organization_id?: string | null
          rejection_reason?: string | null
          status?: string | null
          submitted_at?: string | null
          title: string
          total_amount?: number | null
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          data?: Json | null
          description?: string | null
          id?: string
          organization_id?: string | null
          rejection_reason?: string | null
          status?: string | null
          submitted_at?: string | null
          title?: string
          total_amount?: number | null
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      business_trip_details: {
        Row: {
          actual_accommodation: number | null
          actual_daily_allowance: number | null
          actual_transportation: number | null
          application_id: string
          created_at: string | null
          destination_id: string | null
          end_date: string
          estimated_accommodation: number | null
          estimated_daily_allowance: number | null
          estimated_transportation: number | null
          id: string
          participants: string | null
          purpose: string
          report_content: string | null
          report_submitted: boolean | null
          start_date: string
          updated_at: string | null
        }
        Insert: {
          actual_accommodation?: number | null
          actual_daily_allowance?: number | null
          actual_transportation?: number | null
          application_id: string
          created_at?: string | null
          destination_id?: string | null
          end_date: string
          estimated_accommodation?: number | null
          estimated_daily_allowance?: number | null
          estimated_transportation?: number | null
          id?: string
          participants?: string | null
          purpose: string
          report_content?: string | null
          report_submitted?: boolean | null
          start_date: string
          updated_at?: string | null
        }
        Update: {
          actual_accommodation?: number | null
          actual_daily_allowance?: number | null
          actual_transportation?: number | null
          application_id?: string
          created_at?: string | null
          destination_id?: string | null
          end_date?: string
          estimated_accommodation?: number | null
          estimated_daily_allowance?: number | null
          estimated_transportation?: number | null
          id?: string
          participants?: string | null
          purpose?: string
          report_content?: string | null
          report_submitted?: boolean | null
          start_date?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_trip_details_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_trip_details_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "travel_destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          application_id: string | null
          content: Json | null
          created_at: string | null
          file_size: number | null
          file_url: string | null
          id: string
          mime_type: string | null
          organization_id: string | null
          status: string | null
          title: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          application_id?: string | null
          content?: Json | null
          created_at?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: string
          mime_type?: string | null
          organization_id?: string | null
          status?: string | null
          title: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          application_id?: string | null
          content?: Json | null
          created_at?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: string
          mime_type?: string | null
          organization_id?: string | null
          status?: string | null
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      expense_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          organization_id: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          organization_id: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          organization_id?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expense_categories_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      expense_items: {
        Row: {
          amount: number
          application_id: string
          category_id: string | null
          created_at: string | null
          date: string
          description: string | null
          id: string
          is_approved: boolean | null
          receipt_metadata: Json | null
          receipt_url: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          application_id: string
          category_id?: string | null
          created_at?: string | null
          date: string
          description?: string | null
          id?: string
          is_approved?: boolean | null
          receipt_metadata?: Json | null
          receipt_url?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          application_id?: string
          category_id?: string | null
          created_at?: string | null
          date?: string
          description?: string | null
          id?: string
          is_approved?: boolean | null
          receipt_metadata?: Json | null
          receipt_url?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expense_items_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expense_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "expense_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          message: string
          read: boolean | null
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message: string
          read?: boolean | null
          read_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message?: string
          read?: boolean | null
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      organization_members: {
        Row: {
          id: string
          joined_at: string | null
          organization_id: string
          role: string | null
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string | null
          organization_id: string
          role?: string | null
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string | null
          organization_id?: string
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          owner_id: string
          settings: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          owner_id: string
          settings?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          owner_id?: string
          settings?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company_name: string | null
          created_at: string | null
          default_org_id: string | null
          department: string | null
          full_name: string | null
          id: string
          onboarding_completed: boolean | null
          phone: string | null
          position: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string | null
          default_org_id?: string | null
          department?: string | null
          full_name?: string | null
          id: string
          onboarding_completed?: boolean | null
          phone?: string | null
          position?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string | null
          default_org_id?: string | null
          department?: string | null
          full_name?: string | null
          id?: string
          onboarding_completed?: boolean | null
          phone?: string | null
          position?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      travel_destinations: {
        Row: {
          address: string | null
          country: string
          created_at: string | null
          distance_from_office: number | null
          id: string
          is_domestic: boolean | null
          name: string
          notes: string | null
          organization_id: string
          standard_accommodation_cost: number | null
          standard_transportation_cost: number | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          country?: string
          created_at?: string | null
          distance_from_office?: number | null
          id?: string
          is_domestic?: boolean | null
          name: string
          notes?: string | null
          organization_id: string
          standard_accommodation_cost?: number | null
          standard_transportation_cost?: number | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          country?: string
          created_at?: string | null
          distance_from_office?: number | null
          id?: string
          is_domestic?: boolean | null
          name?: string
          notes?: string | null
          organization_id?: string
          standard_accommodation_cost?: number | null
          standard_transportation_cost?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "travel_destinations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      travel_regulations: {
        Row: {
          allowance_settings: Json | null
          articles: Json | null
          company_info: Json | null
          created_at: string | null
          created_by: string | null
          id: string
          name: string
          organization_id: string | null
          status: string | null
          updated_at: string | null
          version: string
        }
        Insert: {
          allowance_settings?: Json | null
          articles?: Json | null
          company_info?: Json | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          name: string
          organization_id?: string | null
          status?: string | null
          updated_at?: string | null
          version?: string
        }
        Update: {
          allowance_settings?: Json | null
          articles?: Json | null
          company_info?: Json | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          name?: string
          organization_id?: string | null
          status?: string | null
          updated_at?: string | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "travel_regulations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          company_name: string | null
          created_at: string | null
          default_organization_id: string | null
          department: string | null
          email: string
          full_name: string | null
          id: string
          onboarding_completed: boolean | null
          phone: string | null
          position: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string | null
          default_organization_id?: string | null
          department?: string | null
          email: string
          full_name?: string | null
          id: string
          onboarding_completed?: boolean | null
          phone?: string | null
          position?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string | null
          default_organization_id?: string | null
          department?: string | null
          email?: string
          full_name?: string | null
          id?: string
          onboarding_completed?: boolean | null
          phone?: string | null
          position?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_default_organization_id_fkey"
            columns: ["default_organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_sessions: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          session_token: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          session_token: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at: string
          id?: string
          session_token?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          email_confirmed_at: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          email_confirmed_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          email_confirmed_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_expired_sessions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_user_organization_role: {
        Args: { organization_id: string; user_id: string }
        Returns: string
      }
      is_organization_admin: {
        Args: { organization_id: string; user_id: string }
        Returns: boolean
      }
      is_organization_member: {
        Args: { organization_id: string; user_id: string }
        Returns: boolean
      }
      set_default_organization: {
        Args: { organization_id: string; user_id: string }
        Returns: undefined
      }
      update_user_profile: {
        Args: { profile_data: Json; user_id: string }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
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
  ? DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
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
  ? DefaultSchema[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends {
      schema: keyof DatabaseWithoutInternals
    }
    ? DefaultSchema[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
