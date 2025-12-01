"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, LogIn, Sparkles } from "lucide-react";

interface EntrarSquadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEntrar: (codigo: string) => Promise<void>;
}

export function EntrarSquadModal({ isOpen, onClose, onEntrar }: EntrarSquadModalProps) {
  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!codigo.trim()) return;

    setLoading(true);
    setErro("");
    try {
      await onEntrar(codigo.trim().toUpperCase());
      setCodigo("");
      onClose();
    } catch (error: any) {
      setErro(error.message || "Erro ao entrar no grupo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-3xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <LogIn className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Entrar em Squad</h2>
                  <p className="text-sm text-gray-400">Use o código de convite</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Código do Grupo
                </label>
                <input
                  type="text"
                  value={codigo}
                  onChange={(e) => {
                    setCodigo(e.target.value.toUpperCase());
                    setErro("");
                  }}
                  placeholder="GLOW-XXX"
                  maxLength={8}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-green-500/50 focus:outline-none transition-colors font-mono text-center text-lg tracking-wider"
                />
                {erro && (
                  <p className="text-red-400 text-sm mt-2">{erro}</p>
                )}
              </div>

              <div className="backdrop-blur-xl bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-300">
                    <p className="font-medium mb-1">Como funciona:</p>
                    <p className="text-gray-400">
                      Peça o código para a amiga que criou o grupo. Você pode participar de até 5 grupos diferentes!
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!codigo.trim() || loading}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Entrando..." : "Entrar no Squad"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
