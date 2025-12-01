"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  Heart,
  Brain,
  Dumbbell,
  Target,
  Sun,
  Activity,
  Home,
  Compass,
  Users,
  User,
  Award,
  Flame,
  X,
  Check,
  LogOut,
  Trophy,
  Share2,
  Download,
  Lightbulb,
  Plus,
  Bell,
  Copy,
  Camera,
  Edit2,
  Save,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { obterValidacaoDoDia, obterNivelProgressao } from "@/lib/validacoes-jornadas";
import { 
  criarSquad, 
  entrarEmSquad, 
  buscarSquadsDoUsuario, 
  buscarRankingSquad,
  atualizarProgressoSquad,
  buscarNotificacoesNaoLidas,
  marcarNotificacaoComoLida,
  verificarLideranca
} from "@/lib/squads";
import { SquadCard } from "@/components/squads/SquadCard";
import { RankingList } from "@/components/squads/RankingList";
import { CriarSquadModal } from "@/components/squads/CriarSquadModal";
import { EntrarSquadModal } from "@/components/squads/EntrarSquadModal";
import { toast, Toaster } from "sonner";

// ============================================
// MOCK DATA - JORNADAS (INCLUINDO 2 NOVAS)
// ============================================

const JORNADAS = [
  {
    id: 1,
    titulo: "Detox Mental",
    icon: Brain,
    cor: "from-purple-500 to-pink-500",
    tarefasDiarias: [
      "Meditação guiada de 10 minutos",
      "Journaling: escreva 3 gratidões",
      "Afirmações positivas no espelho",
      "Pratique 5 minutos de respiração profunda",
      "Assista um vídeo motivacional",
    ],
    bloqueada: false,
  },
  {
    id: 2,
    titulo: "Corpo Fitness",
    icon: Dumbbell,
    cor: "from-orange-500 to-red-500",
    tarefasDiarias: [
      "30 minutos de treino em casa",
      "Beber 2L de água hoje",
      "Refeição saudável e colorida",
      "15 minutos de alongamento",
      "Caminhar 10.000 passos",
    ],
    bloqueada: false,
  },
  {
    id: 3,
    titulo: "Glow Estético",
    icon: Sparkles,
    cor: "from-pink-500 to-rose-500",
    tarefasDiarias: [
      "Skincare completo (manhã e noite)",
      "Hidratar o cabelo profundamente",
      "Esfoliar e hidratar o corpo",
      "Aplicar protetor solar",
      "Máscara facial relaxante",
    ],
    bloqueada: false,
  },
  {
    id: 4,
    titulo: "Feminilidade",
    icon: Heart,
    cor: "from-rose-500 to-pink-600",
    tarefasDiarias: [
      "Vista algo que te faça sentir linda",
      "Pratique sua postura e andar",
      "Assista vídeo sobre energia feminina",
      "Dance por 10 minutos",
      "Pratique autoafirmações no espelho",
    ],
    bloqueada: false,
  },
  {
    id: 5,
    titulo: "Bumbum na Nuca",
    icon: Target,
    cor: "from-orange-400 to-pink-500",
    tarefasDiarias: [
      "100 agachamentos (4 séries de 25)",
      "Ponte de glúteos: 3 séries de 20",
      "Afundo búlgaro: 3 séries de 15 cada perna",
      "Elevação pélvica com peso: 4 séries de 15",
      "Hidromassagem + creme firmador nos glúteos",
    ],
    bloqueada: false,
  },
  {
    id: 6,
    titulo: "Cabelo de Sereia",
    icon: Sparkles,
    cor: "from-amber-500 to-yellow-500",
    tarefasDiarias: [
      "Cronograma capilar do dia",
      "Massagem no couro cabeludo 10min",
      "Aplicar leave-in e finalizador",
      "Proteção térmica antes do secador",
      "Hidratação profunda semanal",
    ],
    bloqueada: false,
  },
  {
    id: 7,
    titulo: "Pele de Porcelana",
    icon: Sun,
    cor: "from-yellow-400 to-orange-400",
    tarefasDiarias: [
      "Limpeza facial dupla",
      "Tônico e sérum vitamina C",
      "Protetor solar FPS 50+",
      "Hidratante facial dia e noite",
      "Esfoliação suave 2x semana",
    ],
    bloqueada: false,
  },
  {
    id: 8,
    titulo: "Cintura Fina",
    icon: Activity,
    cor: "from-green-500 to-emerald-500",
    tarefasDiarias: [
      "Prancha abdominal 3x 1min",
      "Oblíquos: 4 séries de 20",
      "Vacuum abdominal 5x 30seg",
      "Cardio 20 minutos",
      "Alimentação anti-inchaço",
    ],
    bloqueada: false,
  },
  {
    id: 9,
    titulo: "Relacionamentos",
    icon: Users,
    cor: "from-pink-400 to-rose-500",
    tarefasDiarias: [
      "Ligar ou visitar alguém querido",
      "Praticar escuta ativa com alguém",
      "Fazer um elogio sincero hoje",
      "Agradecer alguém importante",
      "Planejar momento especial com alguém",
    ],
    bloqueada: false,
  },
  {
    id: 10,
    titulo: "Espiritualidade",
    icon: Lightbulb,
    cor: "from-indigo-400 to-purple-500",
    tarefasDiarias: [
      "Momento de oração ou reflexão",
      "Ler um texto inspirador",
      "Praticar gratidão ao acordar",
      "Fazer uma boa ação hoje",
      "Meditar sobre seus propósitos",
    ],
    bloqueada: false,
  },
];

// Medalhas e marcos
const MEDALHAS = [
  { id: 1, nome: "Iniciada", tarefas: 50, cor: "from-gray-400 to-gray-500", emoji: "🌱" },
  { id: 2, nome: "Determinada", tarefas: 100, cor: "from-blue-400 to-blue-500", emoji: "💪" },
  { id: 3, nome: "Guerreira", tarefas: 200, cor: "from-purple-400 to-purple-500", emoji: "⚔️" },
  { id: 4, nome: "Imparável", tarefas: 500, cor: "from-orange-400 to-orange-500", emoji: "🔥" },
  { id: 5, nome: "Lendária", tarefas: 750, cor: "from-pink-400 to-pink-500", emoji: "👑" },
  { id: 6, nome: "Deusa Suprema", tarefas: 1000, cor: "from-yellow-400 to-yellow-500", emoji: "✨" },
];

export default function Dashboard() {
  const [jornadas, setJornadas] = useState(JORNADAS);
  const [menuAtivo, setMenuAtivo] = useState("home");
  const [jornadaSelecionada, setJornadaSelecionada] = useState<number | null>(null);
  const [tarefasCompletas, setTarefasCompletas] = useState<{[key: number]: boolean[]}>({});
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showConquistaModal, setShowConquistaModal] = useState(false);
  const [totalTarefasCompletas, setTotalTarefasCompletas] = useState(0);
  const [diasConsecutivos, setDiasConsecutivos] = useState(7);
  const [jornadaCompletada, setJornadaCompletada] = useState("");
  const router = useRouter();

  // Estados para Squads
  const [squads, setSquads] = useState<any[]>([]);
  const [squadAtivo, setSquadAtivo] = useState<any>(null);
  const [rankingSquad, setRankingSquad] = useState<any[]>([]);
  const [notificacoes, setNotificacoes] = useState<any[]>([]);
  const [showCriarSquadModal, setShowCriarSquadModal] = useState(false);
  const [showEntrarSquadModal, setShowEntrarSquadModal] = useState(false);
  const [isLider, setIsLider] = useState(false);

  // Estados para Perfil Editável
  const [editandoPerfil, setEditandoPerfil] = useState(false);
  const [perfilData, setPerfilData] = useState({
    foto: "",
    nome: "",
    idade: "",
    apelido: "",
    metas: ["", "", "", "", ""]
  });

  // Verificar autenticação
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/auth");
        return;
      }

      setUser(session.user);
      
      // Carregar dados do usuário do Supabase
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      if (profile) {
        setDiasConsecutivos(profile.dias_consecutivos || 0);
      }

      // Carregar total de tarefas completas
      const { data: conquistas } = await supabase
        .from('jornadas')
        .select('tarefas_completas')
        .eq('user_id', session.user.id);
      
      if (conquistas) {
        const total = conquistas.reduce((acc, c) => acc + (c.tarefas_completas || 0), 0);
        setTotalTarefasCompletas(total);
      }

      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  // Carregar dados do perfil do localStorage
  useEffect(() => {
    if (!user) return;
    
    const perfilSalvo = localStorage.getItem(`perfil-${user.id}`);
    if (perfilSalvo) {
      try {
        const dados = JSON.parse(perfilSalvo);
        setPerfilData(dados);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      }
    }
  }, [user]);

  // Salvar perfil no localStorage
  const salvarPerfil = () => {
    if (!user) return;
    localStorage.setItem(`perfil-${user.id}`, JSON.stringify(perfilData));
    setEditandoPerfil(false);
    toast.success("Perfil atualizado com sucesso! ✨");
  };

  // Carregar Squads quando usuário estiver autenticado
  useEffect(() => {
    if (!user) return;

    const carregarSquads = async () => {
      try {
        const squadsData = await buscarSquadsDoUsuario(user.id);
        setSquads(squadsData);
        
        if (squadsData.length > 0) {
          setSquadAtivo(squadsData[0]);
        }
      } catch (error) {
        // Erro silencioso - não há squads ainda
        setSquads([]);
      }
    };

    carregarSquads();
  }, [user]);

  // Carregar ranking quando squad ativo mudar
  useEffect(() => {
    if (!squadAtivo) return;

    const carregarRanking = async () => {
      try {
        const ranking = await buscarRankingSquad(squadAtivo.id);
        setRankingSquad(ranking);
        
        // Verificar se é líder
        if (user && ranking.length > 0) {
          const lider = await verificarLideranca(squadAtivo.id, user.id);
          setIsLider(lider);
        }
      } catch (error) {
        // Erro silencioso - ranking vazio
        setRankingSquad([]);
        setIsLider(false);
      }
    };

    carregarRanking();
  }, [squadAtivo, user]);

  // Carregar notificações
  useEffect(() => {
    if (!user) return;

    const carregarNotificacoes = async () => {
      try {
        const notifs = await buscarNotificacoesNaoLidas(user.id);
        setNotificacoes(notifs);
        
        // Mostrar toast para cada notificação
        notifs.forEach((notif: any) => {
          toast.error(notif.mensagem, {
            duration: 5000,
            action: {
              label: "OK",
              onClick: () => marcarNotificacaoComoLida(notif.id),
            },
          });
        });
      } catch (error) {
        // Erro silencioso - sem notificações
        setNotificacoes([]);
      }
    };

    carregarNotificacoes();
    
    // Recarregar notificações a cada 30 segundos
    const interval = setInterval(carregarNotificacoes, 30000);
    return () => clearInterval(interval);
  }, [user]);

  // Carregar progresso do localStorage
  useEffect(() => {
    if (!user) return;
    
    const progressoSalvo = localStorage.getItem(`jornadas-progresso-${user.id}`);
    if (progressoSalvo) {
      try {
        const dados = JSON.parse(progressoSalvo);
        setTarefasCompletas(dados);
      } catch (error) {
        console.error("Erro ao carregar progresso:", error);
      }
    }
  }, [user]);

  // Salvar progresso no localStorage e Supabase
  useEffect(() => {
    if (!user) return;
    localStorage.setItem(`jornadas-progresso-${user.id}`, JSON.stringify(tarefasCompletas));
    
    // Salvar no Supabase
    const salvarProgresso = async () => {
      const hoje = new Date().toISOString().split('T')[0];
      
      for (const [jornadaId, tarefas] of Object.entries(tarefasCompletas)) {
        const completas = tarefas.filter(Boolean).length;
        const total = jornadas.find(j => j.id === parseInt(jornadaId))?.tarefasDiarias.length || 0;
        const progresso = total > 0 ? Math.round((completas / total) * 100) : 0;
        
        await supabase
          .from('jornadas')
          .upsert({
            user_id: user.id,
            jornada_tipo: jornadas.find(j => j.id === parseInt(jornadaId))?.titulo || '',
            progresso,
            tarefas_completas: completas,
            data: hoje,
          }, {
            onConflict: 'user_id,jornada_tipo,data'
          });
      }
      
      // Atualizar progresso nos squads (apenas se houver squad ativo)
      if (squadAtivo) {
        try {
          const totalTarefas = jornadas.reduce((acc, j) => acc + j.tarefasDiarias.length, 0);
          const totalCompletas = Object.values(tarefasCompletas).reduce(
            (acc, tarefas) => acc + tarefas.filter(Boolean).length,
            0
          );
          
          await atualizarProgressoSquad(squadAtivo.id, user.id, totalCompletas, totalTarefas);
        } catch (error) {
          // Erro silencioso - squad pode não existir mais
        }
      }
    };
    
    salvarProgresso();
  }, [tarefasCompletas, user, jornadas, squadAtivo]);

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  // Handlers para Squads
  const handleCriarSquad = async (nome: string) => {
    if (!user) return;
    
    try {
      if (squads.length >= 5) {
        toast.error("Você já está em 5 grupos (limite máximo)");
        return;
      }
      
      const novoSquad = await criarSquad(nome, user.id);
      setSquads([...squads, novoSquad]);
      setSquadAtivo(novoSquad);
      toast.success(`Squad "${nome}" criado! Código: ${novoSquad.codigo_convite}`);
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar squad");
    }
  };

  const handleEntrarSquad = async (codigo: string) => {
    if (!user) return;
    
    try {
      if (squads.length >= 5) {
        toast.error("Você já está em 5 grupos (limite máximo)");
        return;
      }
      
      const squad = await entrarEmSquad(codigo, user.id);
      setSquads([...squads, squad]);
      setSquadAtivo(squad);
      toast.success(`Você entrou no squad "${squad.nome}"!`);
    } catch (error: any) {
      throw error;
    }
  };

  const copiarCodigo = (codigo: string) => {
    navigator.clipboard.writeText(codigo);
    toast.success("Código copiado!");
  };

  // Calcular progresso de uma jornada
  const calcularProgressoJornada = (jornadaId: number) => {
    const tarefas = tarefasCompletas[jornadaId] || [];
    const completas = tarefas.filter(Boolean).length;
    const jornada = jornadas.find(j => j.id === jornadaId);
    const total = jornada?.tarefasDiarias.length || 0;
    return { completas, total, percentual: total > 0 ? Math.round((completas / total) * 100) : 0 };
  };

  // Calcular progresso geral
  const calcularProgressoGeral = () => {
    let totalTarefas = 0;
    let totalCompletas = 0;
    
    jornadas.forEach(jornada => {
      totalTarefas += jornada.tarefasDiarias.length;
      const tarefas = tarefasCompletas[jornada.id] || [];
      totalCompletas += tarefas.filter(Boolean).length;
    });
    
    return totalTarefas > 0 ? Math.round((totalCompletas / totalTarefas) * 100) : 0;
  };

  // Toggle tarefa com verificação de conquista
  const toggleTarefa = async (jornadaId: number, tarefaIndex: number) => {
    setTarefasCompletas(prev => {
      const jornadaTarefas = prev[jornadaId] || [];
      const novasTarefas = [...jornadaTarefas];
      novasTarefas[tarefaIndex] = !novasTarefas[tarefaIndex];
      
      const novoEstado = {
        ...prev,
        [jornadaId]: novasTarefas,
      };
      
      // Verificar se completou todas as 5 tarefas da jornada
      const jornada = jornadas.find(j => j.id === jornadaId);
      if (jornada && novasTarefas.filter(Boolean).length === jornada.tarefasDiarias.length) {
        // Disparar efeito dopamina
        setShowConfetti(true);
        setJornadaCompletada(jornada.titulo);
        setShowConquistaModal(true);
        
        // Atualizar total de tarefas completas
        setTotalTarefasCompletas(prev => prev + 5);
        
        // Salvar conquista no Supabase
        if (user) {
          supabase
            .from('jornadas')
            .update({ tarefas_completas: supabase.rpc('increment', { x: 5 }) })
            .eq('user_id', user.id)
            .eq('jornada_tipo', jornada.titulo);
        }
        
        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
      }
      
      return novoEstado;
    });
  };

  // Compartilhar conquista
  const compartilharConquista = () => {
    const validacao = obterValidacaoDoDia(jornadaCompletada, totalTarefasCompletas);
    const semanas = Math.floor(diasConsecutivos / 7);
    const diasRestantes = diasConsecutivos % 7;
    
    // Criar card para compartilhar
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Background gradiente
      const gradient = ctx.createLinearGradient(0, 0, 0, 1920);
      gradient.addColorStop(0, '#a855f7');
      gradient.addColorStop(1, '#ec4899');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1080, 1920);
      
      // Texto
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 70px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(validacao.emoji, 540, 350);
      
      ctx.font = 'bold 60px Arial';
      ctx.fillText(jornadaCompletada, 540, 500);
      
      ctx.font = '45px Arial';
      const words = validacao.mensagemCompleta.split(' ');
      let line = '';
      let y = 700;
      
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > 900 && n > 0) {
          ctx.fillText(line, 540, y);
          line = words[n] + ' ';
          y += 60;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 540, y);
      
      ctx.font = 'bold 50px Arial';
      y += 150;
      if (semanas > 0) {
        ctx.fillText(`${semanas} ${semanas === 1 ? 'semana' : 'semanas'}${diasRestantes > 0 ? ` e ${diasRestantes} ${diasRestantes === 1 ? 'dia' : 'dias'}` : ''}`, 540, y);
      } else {
        ctx.fillText(`${diasConsecutivos} ${diasConsecutivos === 1 ? 'dia' : 'dias'} consecutivos`, 540, y);
      }
      ctx.fillText('de consistência 🔥', 540, y + 80);
      
      // Converter para imagem e baixar
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'conquista-glow-up.png';
          a.click();
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-purple-950/20 to-zinc-950 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
        />
      </div>
    );
  }

  const progressoGeral = calcularProgressoGeral();
  
  // Usar apelido do perfil se disponível, senão usar nome do usuário ou email
  const nomeExibicao = perfilData.apelido || user?.user_metadata?.nome || user?.email?.split("@")[0] || "Usuária";
  
  const semanas = Math.floor(diasConsecutivos / 7);
  const diasRestantes = diasConsecutivos % 7;

  // Renderizar conteúdo baseado no menu ativo
  const renderizarConteudo = () => {
    if (menuAtivo === "home") {
      return (
        <>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Usar foto do perfil se disponível */}
              {perfilData.foto ? (
                <img
                  src={perfilData.foto}
                  alt="Perfil"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-pink-500/50"
                />
              ) : (
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-500/20 border-2 border-gray-500/30 flex items-center justify-center">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                </div>
              )}
              <div>
                <h1 className="text-lg sm:text-xl font-bold">Olá, {nomeExibicao}! 👋</h1>
                <p className="text-xs sm:text-sm text-gray-400">Pronta para arrasar hoje?</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              title="Sair"
            >
              <LogOut className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-3 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-4 text-center"
            >
              <Flame className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <p className="text-2xl font-bold">{diasConsecutivos}</p>
              <p className="text-xs text-gray-400">Dias Seguidos</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="backdrop-blur-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-4 text-center"
            >
              <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold">{totalTarefasCompletas}</p>
              <p className="text-xs text-gray-400">Tarefas Feitas</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="backdrop-blur-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-4 text-center"
            >
              <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold">{MEDALHAS.filter(m => totalTarefasCompletas >= m.tarefas).length}</p>
              <p className="text-xs text-gray-400">Conquistas</p>
            </motion.div>
          </div>

          {/* Progresso de Hoje */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-3xl p-6"
          >
            <div className="flex items-center gap-6">
              <div className="relative">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-white/10"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - progressoGeral / 100)}`}
                    className="transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{progressoGeral}%</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-1">Progresso de Hoje</h3>
                <p className="text-sm text-gray-400">
                  {progressoGeral === 100 
                    ? "🎉 Parabéns! Você completou todas as tarefas!" 
                    : "Continue assim, você está arrasando!"}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Jornadas Ativas */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold">Suas Jornadas</h2>
            </div>

            <div className="space-y-3">
              {jornadas.map((jornada) => {
                const progresso = calcularProgressoJornada(jornada.id);
                return (
                  <motion.div
                    key={jornada.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => setJornadaSelecionada(jornada.id)}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 cursor-pointer hover:border-purple-500/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${jornada.cor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <jornada.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-sm truncate">{jornada.titulo}</h3>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">Progresso</span>
                            <span className="font-bold">{progresso.completas}/{progresso.total}</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${progresso.percentual}%` }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                              className={`h-full bg-gradient-to-r ${jornada.cor} rounded-full`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </>
      );
    }

    if (menuAtivo === "conquistas") {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Painel de Conquistas</h2>
          
          {/* Gráfico de Ofensiva */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-3xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Flame className="w-8 h-8 text-orange-400" />
              <div>
                <h3 className="text-xl font-bold">Ofensiva Atual</h3>
                <p className="text-sm text-gray-400">Sequência de dias seguidos</p>
              </div>
            </div>
            
            <div className="text-center mb-6">
              <p className="text-6xl font-bold text-orange-400">{diasConsecutivos}</p>
              <p className="text-gray-400 mt-2">dias consecutivos 🔥</p>
            </div>
            
            {/* Gráfico de barras simples */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Diário</span>
                  <span className="font-bold">{diasConsecutivos} dias</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((diasConsecutivos / 30) * 100, 100)}%` }}
                    className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Semanal</span>
                  <span className="font-bold">{Math.floor(diasConsecutivos / 7)} semanas</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((Math.floor(diasConsecutivos / 7) / 12) * 100, 100)}%` }}
                    className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Mensal</span>
                  <span className="font-bold">{Math.floor(diasConsecutivos / 30)} meses</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((Math.floor(diasConsecutivos / 30) / 12) * 100, 100)}%` }}
                    className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Anual</span>
                  <span className="font-bold">{Math.floor(diasConsecutivos / 365)} anos</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((Math.floor(diasConsecutivos / 365) / 5) * 100, 100)}%` }}
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Galeria de Medalhas */}
          <div>
            <h3 className="text-xl font-bold mb-4">Galeria de Medalhas</h3>
            <div className="grid grid-cols-2 gap-4">
              {MEDALHAS.map((medalha, index) => {
                const desbloqueada = totalTarefasCompletas >= medalha.tarefas;
                return (
                  <motion.div
                    key={medalha.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`backdrop-blur-xl border rounded-2xl p-6 text-center transition-all ${
                      desbloqueada
                        ? `bg-gradient-to-br ${medalha.cor} border-white/20 shadow-2xl`
                        : "bg-gray-500/10 border-gray-500/30 grayscale"
                    }`}
                  >
                    <div className="text-5xl mb-3">{medalha.emoji}</div>
                    <h4 className={`font-bold mb-1 ${desbloqueada ? "text-white" : "text-gray-500"}`}>
                      {medalha.nome}
                    </h4>
                    <p className={`text-sm ${desbloqueada ? "text-white/80" : "text-gray-500"}`}>
                      {medalha.tarefas} tarefas
                    </p>
                    {desbloqueada && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-3"
                      >
                        <CheckCircle2 className="w-6 h-6 text-white mx-auto" />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Estatísticas Gerais */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6"
          >
            <h3 className="text-xl font-bold mb-4">Estatísticas Gerais</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Total de Tarefas Completas</span>
                <span className="text-2xl font-bold text-green-400">{totalTarefasCompletas}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Medalhas Desbloqueadas</span>
                <span className="text-2xl font-bold text-yellow-400">
                  {MEDALHAS.filter(m => totalTarefasCompletas >= m.tarefas).length}/{MEDALHAS.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Próxima Medalha</span>
                <span className="text-lg font-bold text-purple-400">
                  {MEDALHAS.find(m => totalTarefasCompletas < m.tarefas)?.nome || "Todas desbloqueadas! 🎉"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Progresso para 10.000</span>
                <span className="text-lg font-bold text-pink-400">
                  {((totalTarefasCompletas / 10000) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      );
    }

    if (menuAtivo === "jornadas") {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Todas as Jornadas</h2>
          <div className="grid grid-cols-1 gap-4">
            {jornadas.map((jornada) => {
              const progresso = calcularProgressoJornada(jornada.id);
              return (
                <motion.div
                  key={jornada.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setJornadaSelecionada(jornada.id)}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 cursor-pointer hover:border-purple-500/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${jornada.cor} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      <jornada.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{jornada.titulo}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Progresso</span>
                          <span className="font-bold">{progresso.completas}/{progresso.total} tarefas</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progresso.percentual}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className={`h-full bg-gradient-to-r ${jornada.cor} rounded-full`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      );
    }

    if (menuAtivo === "grupo") {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Meus Squads</h2>
            {notificacoes.length > 0 && (
              <div className="relative">
                <Bell className="w-6 h-6 text-purple-400" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                  {notificacoes.length}
                </span>
              </div>
            )}
          </div>

          {/* Botões de Ação */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setShowCriarSquadModal(true)}
              className="py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Criar Squad
            </button>
            <button
              onClick={() => setShowEntrarSquadModal(true)}
              className="py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5" />
              Entrar em Squad
            </button>
          </div>

          {/* Carrossel de Squads */}
          {squads.length > 0 ? (
            <>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {squads.map((squad) => (
                  <SquadCard
                    key={squad.id}
                    squad={squad}
                    membrosCount={rankingSquad.length}
                    isActive={squadAtivo?.id === squad.id}
                    onClick={() => setSquadAtivo(squad)}
                  />
                ))}
              </div>

              {/* Ranking do Squad Ativo */}
              {squadAtivo && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">{squadAtivo.nome}</h3>
                    <button
                      onClick={() => copiarCodigo(squadAtivo.codigo_convite)}
                      className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      <span className="text-sm">Copiar Código</span>
                    </button>
                  </div>

                  {isLider && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="backdrop-blur-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4 text-center"
                    >
                      <p className="font-bold text-yellow-400 text-lg">
                        Você é a Abelha Rainha desse grupo! 👑
                      </p>
                    </motion.div>
                  )}

                  <RankingList membros={rankingSquad} currentUserId={user?.id || ""} />
                </div>
              )}
            </>
          ) : (
            <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-3xl p-8 text-center">
              <Users className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Crie seu primeiro Squad!</h3>
              <p className="text-gray-400 mb-4">
                Monte um grupo com até 4 amigas e compitam de forma saudável para se motivarem mutuamente.
              </p>
            </div>
          )}
        </div>
      );
    }

    if (menuAtivo === "perfil") {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Meu Perfil</h2>
            {!editandoPerfil && (
              <button
                onClick={() => setEditandoPerfil(true)}
                className="p-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-colors"
              >
                <Edit2 className="w-5 h-5 text-purple-400" />
              </button>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-3xl p-6"
          >
            {/* Área de Foto */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative group">
                {perfilData.foto ? (
                  <img
                    src={perfilData.foto}
                    alt="Foto de perfil"
                    className="w-32 h-32 rounded-full object-cover border-4 border-pink-500/50"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-500/20 border-4 border-gray-500/30 flex items-center justify-center">
                    <User className="w-16 h-16 text-gray-500" />
                  </div>
                )}
                {editandoPerfil && (
                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="w-8 h-8 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setPerfilData({ ...perfilData, foto: reader.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                )}
              </div>
              {editandoPerfil && (
                <p className="text-xs text-gray-400 mt-2 text-center">
                  Clique na foto para alterar
                </p>
              )}
            </div>

            {/* Formulário de Perfil */}
            <div className="space-y-4">
              {/* Nome */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Nome Completo</label>
                {editandoPerfil ? (
                  <input
                    type="text"
                    value={perfilData.nome}
                    onChange={(e) => setPerfilData({ ...perfilData, nome: e.target.value })}
                    placeholder="Digite seu nome"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 transition-colors"
                  />
                ) : (
                  <p className="text-lg font-semibold">{perfilData.nome || "Não informado"}</p>
                )}
              </div>

              {/* Idade e Apelido */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Idade</label>
                  {editandoPerfil ? (
                    <input
                      type="number"
                      value={perfilData.idade}
                      onChange={(e) => setPerfilData({ ...perfilData, idade: e.target.value })}
                      placeholder="Ex: 25"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 transition-colors"
                    />
                  ) : (
                    <p className="text-lg font-semibold">{perfilData.idade || "—"}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Apelido</label>
                  {editandoPerfil ? (
                    <input
                      type="text"
                      value={perfilData.apelido}
                      onChange={(e) => setPerfilData({ ...perfilData, apelido: e.target.value })}
                      placeholder="Ex: Duda"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 transition-colors"
                    />
                  ) : (
                    <p className="text-lg font-semibold">{perfilData.apelido || "—"}</p>
                  )}
                </div>
              </div>

              {/* Metas */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Minhas 5 Metas ✨</label>
                <div className="space-y-2">
                  {perfilData.metas.map((meta, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-purple-400 font-bold">{index + 1}.</span>
                      {editandoPerfil ? (
                        <input
                          type="text"
                          value={meta}
                          onChange={(e) => {
                            const novasMetas = [...perfilData.metas];
                            novasMetas[index] = e.target.value;
                            setPerfilData({ ...perfilData, metas: novasMetas });
                          }}
                          placeholder={`Meta ${index + 1}`}
                          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                        />
                      ) : (
                        <p className="flex-1 text-sm">{meta || "Não definida"}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Botões de Ação */}
              {editandoPerfil ? (
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setEditandoPerfil(false);
                      // Recarregar dados salvos
                      const perfilSalvo = localStorage.getItem(`perfil-${user.id}`);
                      if (perfilSalvo) {
                        setPerfilData(JSON.parse(perfilSalvo));
                      }
                    }}
                    className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl font-medium hover:bg-white/10 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={salvarPerfil}
                    className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Salvar
                  </button>
                </div>
              ) : (
                <div className="pt-4 space-y-3">
                  {/* Estatísticas */}
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Jornadas Ativas</span>
                      <span className="font-bold">{jornadas.length}</span>
                    </div>
                  </div>
                  
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Dias de Sequência</span>
                      <span className="font-bold">{diasConsecutivos} dias 🔥</span>
                    </div>
                  </div>
                  
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Total de Conquistas</span>
                      <span className="font-bold">{MEDALHAS.filter(m => totalTarefasCompletas >= m.tarefas).length} 🏆</span>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full py-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl font-medium hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-5 h-5" />
                    Sair da Conta
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      );
    }
  };

  const jornadaAtual = jornadas.find(j => j.id === jornadaSelecionada);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-purple-950/20 to-zinc-950 text-white pb-24">
      <Toaster position="top-center" richColors />
      
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={typeof window !== 'undefined' ? window.innerWidth : 300}
          height={typeof window !== 'undefined' ? window.innerHeight : 600}
          recycle={false}
          numberOfPieces={500}
        />
      )}

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
      </div>

      <div className="relative z-10 max-w-md mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {renderizarConteudo()}
      </div>

      {/* Modals */}
      <CriarSquadModal
        isOpen={showCriarSquadModal}
        onClose={() => setShowCriarSquadModal(false)}
        onCriar={handleCriarSquad}
      />

      <EntrarSquadModal
        isOpen={showEntrarSquadModal}
        onClose={() => setShowEntrarSquadModal(false)}
        onEntrar={handleEntrarSquad}
      />

      {/* Modal de Conquista (Efeito Dopamina) - PERSONALIZADO COM FOTO E APELIDO */}
      <AnimatePresence>
        {showConquistaModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowConquistaModal(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 text-center relative overflow-hidden"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-pink-400/20"
              />
              
              <div className="relative z-10">
                {/* Foto do perfil no modal de conquista */}
                <div className="flex justify-center mb-4">
                  {perfilData.foto ? (
                    <img
                      src={perfilData.foto}
                      alt="Perfil"
                      className="w-20 h-20 rounded-full object-cover border-4 border-white/50"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                  )}
                </div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="text-7xl mb-4"
                >
                  {obterValidacaoDoDia(jornadaCompletada, totalTarefasCompletas).emoji}
                </motion.div>
                
                <h2 className="text-3xl font-bold mb-2">{jornadaCompletada}</h2>
                
                {/* Usar apelido na mensagem de validação */}
                <p className="text-lg mb-2 font-semibold">
                  Parabéns, {nomeExibicao}! 🎉
                </p>
                
                <p className="text-base mb-6 leading-relaxed">
                  {obterValidacaoDoDia(jornadaCompletada, totalTarefasCompletas).mensagemCompleta}
                </p>
                
                <div className="backdrop-blur-xl bg-white/20 rounded-2xl p-5 mb-6 space-y-3">
                  <div className="flex items-center justify-center gap-2 text-2xl font-bold">
                    <Flame className="w-7 h-7 text-orange-300" />
                    {semanas > 0 ? (
                      <span>
                        {semanas} {semanas === 1 ? 'semana' : 'semanas'}
                        {diasRestantes > 0 && ` e ${diasRestantes} ${diasRestantes === 1 ? 'dia' : 'dias'}`}
                      </span>
                    ) : (
                      <span>{diasConsecutivos} {diasConsecutivos === 1 ? 'dia' : 'dias'}</span>
                    )}
                  </div>
                  <p className="text-sm text-white/90">de consistência</p>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={compartilharConquista}
                    className="flex-1 py-3 bg-white/20 backdrop-blur-sm rounded-xl font-bold hover:bg-white/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-5 h-5" />
                    Compartilhar
                  </button>
                  
                  <button
                    onClick={() => setShowConquistaModal(false)}
                    className="flex-1 py-3 bg-white text-purple-600 rounded-xl font-bold hover:bg-gray-100 transition-all"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Jornada */}
      <AnimatePresence>
        {jornadaSelecionada && jornadaAtual && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
            onClick={() => setJornadaSelecionada(null)}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Header do Modal */}
              <div className={`bg-gradient-to-br ${jornadaAtual.cor} p-6 relative`}>
                <button
                  onClick={() => setJornadaSelecionada(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/40 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <jornadaAtual.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{jornadaAtual.titulo}</h2>
                    <p className="text-white/80 text-sm">
                      {calcularProgressoJornada(jornadaAtual.id).completas}/{jornadaAtual.tarefasDiarias.length} tarefas completas
                    </p>
                  </div>
                </div>
              </div>

              {/* Lista de Tarefas */}
              <div className="flex-1 overflow-y-auto p-6 space-y-3">
                <h3 className="font-bold text-lg mb-4">Tarefas de Hoje</h3>
                {jornadaAtual.tarefasDiarias.map((tarefa, index) => {
                  const completa = tarefasCompletas[jornadaAtual.id]?.[index] || false;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => toggleTarefa(jornadaAtual.id, index)}
                      className={`backdrop-blur-xl border rounded-xl p-4 cursor-pointer transition-all ${
                        completa
                          ? "bg-green-500/10 border-green-500/30"
                          : "bg-white/5 border-white/10 hover:border-purple-500/30"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                            completa
                              ? "bg-green-500 border-green-500"
                              : "border-gray-400"
                          }`}
                        >
                          {completa && <Check className="w-4 h-4 text-white" />}
                        </div>
                        <p className={`flex-1 ${completa ? "line-through text-gray-400" : ""}`}>
                          {tarefa}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer do Modal */}
              <div className="p-6 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Progresso</span>
                  <span className="text-sm font-bold">
                    {calcularProgressoJornada(jornadaAtual.id).percentual}%
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${calcularProgressoJornada(jornadaAtual.id).percentual}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${jornadaAtual.cor} rounded-full`}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu Inferior */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-xl border-t border-white/10 z-40">
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            <button
              onClick={() => setMenuAtivo("home")}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                menuAtivo === "home" 
                  ? "bg-purple-500/20 text-purple-400" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs font-medium">Início</span>
            </button>

            <button
              onClick={() => setMenuAtivo("jornadas")}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                menuAtivo === "jornadas" 
                  ? "bg-purple-500/20 text-purple-400" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Compass className="w-6 h-6" />
              <span className="text-xs font-medium">Jornadas</span>
            </button>

            <button
              onClick={() => setMenuAtivo("conquistas")}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                menuAtivo === "conquistas" 
                  ? "bg-purple-500/20 text-purple-400" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Trophy className="w-6 h-6" />
              <span className="text-xs font-medium">Conquistas</span>
            </button>

            <button
              onClick={() => setMenuAtivo("grupo")}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all relative ${
                menuAtivo === "grupo" 
                  ? "bg-purple-500/20 text-purple-400" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Users className="w-6 h-6" />
              <span className="text-xs font-medium">Grupo</span>
              {notificacoes.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            <button
              onClick={() => setMenuAtivo("perfil")}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                menuAtivo === "perfil" 
                  ? "bg-purple-500/20 text-purple-400" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <User className="w-6 h-6" />
              <span className="text-xs font-medium">Perfil</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
