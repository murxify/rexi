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
      contracts: {
        Row: {
          created_at: string
          share_rate: number
          user_id: string
          vacation_pay_rate: number
          vat_rate: number
        }
        Insert: {
          created_at?: string
          share_rate: number
          user_id: string
          vacation_pay_rate: number
          vat_rate: number
        }
        Update: {
          created_at?: string
          share_rate?: number
          user_id?: string
          vacation_pay_rate?: number
          vat_rate?: number
        }
        Relationships: [
          {
            foreignKeyName: "contracts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profits: {
        Row: {
          created_at: string
          date: string
          employers_share_amount: number
          expense: number
          id: number
          my_share_amount: number
          profit: number
          revenue: number
          revenue_ex_vat: number
          shift_duration: number
          shift_end: string
          shift_start: string
          tips: number
          user_id: string
          vacation_pay_amount: number
          vat_amount: number
        }
        Insert: {
          created_at?: string
          date: string
          employers_share_amount: number
          expense: number
          id?: number
          my_share_amount: number
          profit: number
          revenue: number
          revenue_ex_vat: number
          shift_duration: number
          shift_end: string
          shift_start: string
          tips: number
          user_id: string
          vacation_pay_amount: number
          vat_amount: number
        }
        Update: {
          created_at?: string
          date?: string
          employers_share_amount?: number
          expense?: number
          id?: number
          my_share_amount?: number
          profit?: number
          revenue?: number
          revenue_ex_vat?: number
          shift_duration?: number
          shift_end?: string
          shift_start?: string
          tips?: number
          user_id?: string
          vacation_pay_amount?: number
          vat_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "profits_user_id_fkey"
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
