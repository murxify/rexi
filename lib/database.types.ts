export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      settings: {
        Row: {
          created_at: string
          share_rate: number | null
          user_id: string | null
          vacation_pay_rate: number | null
          vat_rate: number | null
        }
        Insert: {
          created_at?: string
          share_rate?: number | null
          user_id?: string | null
          vacation_pay_rate?: number | null
          vat_rate?: number | null
        }
        Update: {
          created_at?: string
          share_rate?: number | null
          user_id?: string | null
          vacation_pay_rate?: number | null
          vat_rate?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "settings_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
