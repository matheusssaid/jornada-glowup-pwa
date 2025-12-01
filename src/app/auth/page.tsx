"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Mail, Sparkles, Heart, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [useMagicLink, setUseMagicLink] = useState(false);
  const router = useRouter();

  // Verificar se usuário já está logado
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push("/");
      }
    };
    checkUser();
  }, [router]);

  // Login com email e senha
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        setMessage("Login realizado com sucesso! Redirecionando...");
        setTimeout(() => router.push("/"), 1000);
      }
    } catch (error: any) {
      setMessage(error.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  // Cadastro com email e senha
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            nome: nome,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        // Criar perfil do usuário
        const { error: profileError } = await supabase
          .from("profiles")
          .insert({
            id: data.user.id,
            email: email,
            nome: nome,
            dias_consecutivos: 0,
          });

        if (profileError) console.error("Erro ao criar perfil:", profileError);

        setMessage("Cadastro realizado! Você já pode fazer login.");
        setTimeout(() => {
          setIsSignUp(false);
          setPassword("");
        }, 2000);
      }
    } catch (error: any) {
      setMessage(error.message || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  // Login com Magic Link
  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;

      setMessage("✨ Link mágico enviado! Verifique seu email.");
    } catch (error: any) {
      setMessage(error.message || "Erro ao enviar link mágico");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-purple-950/20 to-zinc-950 text-white flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo e Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mb-4"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Bem-vinda! ✨
          </h1>
          <p className="text-gray-400">
            Sua jornada de transformação começa aqui
          </p>
        </div>

        {/* Card de Autenticação */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6"
        >
          {/* Toggle entre Login e Cadastro */}
          <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
            <button
              onClick={() => {
                setIsSignUp(false);
                setUseMagicLink(false);
                setMessage("");
              }}
              className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
                !isSignUp
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsSignUp(true);
                setUseMagicLink(false);
                setMessage("");
              }}
              className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
                isSignUp
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Cadastro
            </button>
          </div>

          {/* Formulário */}
          <form
            onSubmit={
              useMagicLink
                ? handleMagicLink
                : isSignUp
                ? handleSignUp
                : handleLogin
            }
            className="space-y-4"
          >
            {/* Nome (apenas no cadastro) */}
            {isSignUp && !useMagicLink && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Seu nome"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="seu@email.com"
              />
            </div>

            {/* Senha (não aparece no magic link) */}
            {!useMagicLink && (
              <div>
                <label className="block text-sm font-medium mb-2">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            )}

            {/* Botão de Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Processando...
                </span>
              ) : useMagicLink ? (
                <span className="flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  Enviar Link Mágico
                </span>
              ) : isSignUp ? (
                "Criar Conta"
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          {/* Divisor */}
          {!isSignUp && (
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-zinc-900/50 text-gray-400">ou</span>
              </div>
            </div>
          )}

          {/* Botão Magic Link */}
          {!isSignUp && (
            <button
              onClick={() => {
                setUseMagicLink(!useMagicLink);
                setMessage("");
              }}
              className="w-full py-3.5 bg-white/5 border border-white/10 rounded-xl font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              {useMagicLink ? "Voltar ao Login" : "Login com Link Mágico"}
            </button>
          )}

          {/* Mensagem de Feedback */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl flex items-start gap-3 ${
                message.includes("sucesso") || message.includes("enviado")
                  ? "bg-green-500/10 border border-green-500/30 text-green-400"
                  : "bg-red-500/10 border border-red-500/30 text-red-400"
              }`}
            >
              {message.includes("sucesso") || message.includes("enviado") ? (
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
              ) : (
                <Heart className="w-5 h-5 flex-shrink-0 mt-0.5" />
              )}
              <p className="text-sm">{message}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Benefícios */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 space-y-3"
        >
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
            </div>
            <p>8 jornadas de transformação completas</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <div className="w-8 h-8 bg-pink-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-4 h-4 text-pink-400" />
            </div>
            <p>Acompanhamento diário personalizado</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
            </div>
            <p>Comunidade de apoio e motivação</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
