import { createClient } from '@supabase/supabase-js';

// Verificar se Supabase está configurado
const isConfigured = 
  typeof window !== 'undefined' &&
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co';

// Configuração mock para preview (evita erros de fetch)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Cliente Supabase (funciona apenas se as variáveis estiverem configuradas)
export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        fetch: () => Promise.reject(new Error('Supabase não configurado'))
      }
    });

// Helper para verificar se Supabase está configurado
export const isSupabaseConfigured = () => isConfigured;

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          nome: string;
          telefone: string | null;
          idade: number | null;
          altura: string | null;
          peso_inicial: string | null;
          peso_atual: string | null;
          objetivo: string | null;
          dias_consecutivos: number;
          foto_perfil: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          nome: string;
          telefone?: string | null;
          idade?: number | null;
          altura?: string | null;
          peso_inicial?: string | null;
          peso_atual?: string | null;
          objetivo?: string | null;
          dias_consecutivos?: number;
          foto_perfil?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          nome?: string;
          telefone?: string | null;
          idade?: number | null;
          altura?: string | null;
          peso_inicial?: string | null;
          peso_atual?: string | null;
          objetivo?: string | null;
          dias_consecutivos?: number;
          foto_perfil?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      jornadas: {
        Row: {
          id: number;
          user_id: string;
          jornada_tipo: string;
          progresso: number;
          tarefas_completas: number;
          data: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          jornada_tipo: string;
          progresso?: number;
          tarefas_completas?: number;
          data?: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          jornada_tipo?: string;
          progresso?: number;
          tarefas_completas?: number;
          data?: string;
          created_at?: string;
        };
      };
      fotos_progresso: {
        Row: {
          id: number;
          user_id: string;
          imagem_url: string;
          peso: string | null;
          medidas: string | null;
          nota: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          imagem_url: string;
          peso?: string | null;
          medidas?: string | null;
          nota?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          imagem_url?: string;
          peso?: string | null;
          medidas?: string | null;
          nota?: string | null;
          created_at?: string;
        };
      };
      conquistas: {
        Row: {
          id: number;
          user_id: string;
          conquista_id: number;
          desbloqueada: boolean;
          created_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          conquista_id: number;
          desbloqueada?: boolean;
          created_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          conquista_id?: number;
          desbloqueada?: boolean;
          created_at?: string;
        };
      };
    };
  };
};
