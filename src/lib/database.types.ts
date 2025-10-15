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
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'candidate' | 'recruiter'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role: 'candidate' | 'recruiter'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'candidate' | 'recruiter'
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      historical_periods: {
        Row: {
          id: string
          name: string
          start_year: number | null
          end_year: number | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          start_year?: number | null
          end_year?: number | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          start_year?: number | null
          end_year?: number | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      historical_figures: {
        Row: {
          id: string
          name: string
          alias: string[] | null
          birth_year: number | null
          death_year: number | null
          period_id: string | null
          nationality: string | null
          occupation: string[] | null
          achievements: string | null
          biography: string | null
          image_url: string | null
          vector_embedding: number[] | null
          popularity_score: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          alias?: string[] | null
          birth_year?: number | null
          death_year?: number | null
          period_id?: string | null
          nationality?: string | null
          occupation?: string[] | null
          achievements?: string | null
          biography?: string | null
          image_url?: string | null
          vector_embedding?: number[] | null
          popularity_score?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          alias?: string[] | null
          birth_year?: number | null
          death_year?: number | null
          period_id?: string | null
          nationality?: string | null
          occupation?: string[] | null
          achievements?: string | null
          biography?: string | null
          image_url?: string | null
          vector_embedding?: number[] | null
          popularity_score?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "historical_figures_period_id_fkey"
            columns: ["period_id"]
            referencedRelation: "historical_periods"
            referencedColumns: ["id"]
          }
        ]
      }
      figure_relationships: {
        Row: {
          id: string
          figure_id: string
          related_figure_id: string
          relationship_type: string | null
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          figure_id: string
          related_figure_id: string
          relationship_type?: string | null
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          figure_id?: string
          related_figure_id?: string
          relationship_type?: string | null
          description?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "figure_relationships_figure_id_fkey"
            columns: ["figure_id"]
            referencedRelation: "historical_figures"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "figure_relationships_related_figure_id_fkey"
            columns: ["related_figure_id"]
            referencedRelation: "historical_figures"
            referencedColumns: ["id"]
          }
        ]
      }
      user_favorites: {
        Row: {
          id: string
          user_id: string
          figure_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          figure_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          figure_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_favorites_figure_id_fkey"
            columns: ["figure_id"]
            referencedRelation: "historical_figures"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_favorites_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      search_history: {
        Row: {
          id: string
          user_id: string
          query: string
          results_count: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          query: string
          results_count?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          query?: string
          results_count?: number | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "search_history_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      companies: {
        Row: {
          id: string
          name: string
          description: string | null
          logo_url: string | null
          website: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          logo_url?: string | null
          website?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          logo_url?: string | null
          website?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      job_postings: {
        Row: {
          id: string
          company_id: string
          title: string
          description: string
          requirements: string[]
          location: string | null
          salary_range: string | null
          employment_type: string
          created_at: string
          updated_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          company_id: string
          title: string
          description: string
          requirements: string[]
          location?: string | null
          salary_range?: string | null
          employment_type: string
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          company_id?: string
          title?: string
          description?: string
          requirements?: string[]
          location?: string | null
          salary_range?: string | null
          employment_type?: string
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "job_postings_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "companies"
            referencedColumns: ["id"]
          }
        ]
      }
      resumes: {
        Row: {
          id: string
          user_id: string
          file_url: string | null
          content: string | null
          vector_embedding: number[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          file_url?: string | null
          content?: string | null
          vector_embedding?: number[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          file_url?: string | null
          content?: string | null
          vector_embedding?: number[] | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "resumes_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      applications: {
        Row: {
          id: string
          job_posting_id: string
          candidate_id: string
          resume_id: string
          status: 'pending' | 'reviewed' | 'accepted' | 'rejected'
          match_score: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          job_posting_id: string
          candidate_id: string
          resume_id: string
          status?: 'pending' | 'reviewed' | 'accepted' | 'rejected'
          match_score?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          job_posting_id?: string
          candidate_id?: string
          resume_id?: string
          status?: 'pending' | 'reviewed' | 'accepted' | 'rejected'
          match_score?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_candidate_id_fkey"
            columns: ["candidate_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_job_posting_id_fkey"
            columns: ["job_posting_id"]
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_resume_id_fkey"
            columns: ["resume_id"]
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          id: string
          application_id: string
          sender_id: string
          receiver_id: string
          content: string
          is_ai_generated: boolean
          created_at: string
        }
        Insert: {
          id?: string
          application_id: string
          sender_id: string
          receiver_id: string
          content: string
          is_ai_generated?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          application_id?: string
          sender_id?: string
          receiver_id?: string
          content?: string
          is_ai_generated?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_application_id_fkey"
            columns: ["application_id"]
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      knowledge_base_chunks: {
        Row: {
          id: string
          content: string
          vector_embedding: number[]
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          content: string
          vector_embedding: number[]
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          content?: string
          vector_embedding?: number[]
          metadata?: Json
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      match_resumes: {
        Args: {
          query_embedding: number[]
          match_threshold?: number
          match_count?: number
        }
        Returns: {
          id: string
          user_id: string
          content: string
          similarity: number
        }[]
      }
      match_jobs: {
        Args: {
          query_embedding: number[]
          match_threshold?: number
          match_count?: number
        }
        Returns: {
          id: string
          title: string
          description: string
          similarity: number
        }[]
      }
      search_knowledge: {
        Args: {
          query_embedding: number[]
          match_threshold?: number
          match_count?: number
        }
        Returns: {
          id: string
          content: string
          similarity: number
        }[]
      }
      match_figures: {
        Args: {
          query_embedding: number[]
          match_threshold?: number
          match_count?: number
        }
        Returns: {
          id: string
          name: string
          biography: string
          similarity: number
        }[]
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