"use client";

import { motion } from "framer-motion";
import { Crown, Flame, TrendingUp } from "lucide-react";

interface RankingMembro {
  user_id: string;
  pontos_hoje: number;
  tarefas_completas_hoje: number;
  total_tarefas_hoje: number;
  profiles: {
    nome: string;
    email: string;
  };
}

interface RankingListProps {
  membros: RankingMembro[];
  currentUserId: string;
}

export function RankingList({ membros, currentUserId }: RankingListProps) {
  return (
    <div className="space-y-3">
      {membros.map((membro, index) => {
        const isLider = index === 0;
        const isCurrentUser = membro.user_id === currentUserId;
        const progresso = membro.total_tarefas_hoje > 0 
          ? Math.round((membro.tarefas_completas_hoje / membro.total_tarefas_hoje) * 100)
          : 0;
        const nome = membro.profiles?.nome || membro.profiles?.email?.split('@')[0] || 'Usuária';

        return (
          <motion.div
            key={membro.user_id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`backdrop-blur-xl border rounded-xl p-4 ${
              isCurrentUser
                ? "bg-purple-500/10 border-purple-500/30"
                : "bg-white/5 border-white/10"
            } ${isLider ? "ring-2 ring-yellow-400/50" : ""}`}
          >
            <div className="flex items-center gap-3">
              {/* Posição */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                isLider 
                  ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-white"
                  : "bg-white/10 text-gray-400"
              }`}>
                {isLider ? <Crown className="w-4 h-4" /> : `${index + 1}º`}
              </div>

              {/* Avatar e Nome */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className={`font-bold text-sm truncate ${
                    isLider ? "text-yellow-400" : ""
                  }`}>
                    {nome}
                    {isCurrentUser && " (Você)"}
                  </h4>
                  {isLider && (
                    <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-0.5 rounded-full">
                      Abelha Rainha 👑
                    </span>
                  )}
                </div>

                {/* Barra de Progresso */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">
                      {membro.tarefas_completas_hoje}/{membro.total_tarefas_hoje} tarefas
                    </span>
                    <span className="font-bold text-purple-400">
                      {membro.pontos_hoje} pts
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progresso}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className={`h-full rounded-full ${
                        progresso === 100
                          ? "bg-gradient-to-r from-green-400 to-emerald-500"
                          : "bg-gradient-to-r from-purple-400 to-pink-500"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Status */}
              {progresso === 100 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 text-green-400"
                >
                  <Flame className="w-5 h-5" />
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
