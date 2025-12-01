"use client";

import { motion } from "framer-motion";
import { Users, Crown, TrendingUp } from "lucide-react";

interface SquadCardProps {
  squad: {
    id: string;
    nome: string;
    codigo_convite: string;
  };
  membrosCount: number;
  isActive: boolean;
  onClick: () => void;
}

export function SquadCard({ squad, membrosCount, isActive, onClick }: SquadCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`min-w-[280px] backdrop-blur-xl border rounded-2xl p-5 cursor-pointer transition-all ${
        isActive
          ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50"
          : "bg-white/5 border-white/10 hover:border-purple-500/30"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm">{squad.nome}</h3>
            <p className="text-xs text-gray-400">{membrosCount}/5 membros</p>
          </div>
        </div>
        {isActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-2 h-2 bg-green-400 rounded-full"
          />
        )}
      </div>
      
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <span>Código:</span>
        <code className="px-2 py-1 bg-white/10 rounded font-mono font-bold text-purple-400">
          {squad.codigo_convite}
        </code>
      </div>
    </motion.div>
  );
}
