import { supabase } from "./supabase";

// Gerar código de convite único
export function gerarCodigoConvite(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let codigo = 'GLOW-';
  for (let i = 0; i < 3; i++) {
    codigo += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return codigo;
}

// Mensagens de provocação rotativas
const MENSAGENS_PROVOCACAO = [
  (nome: string) => `A ${nome} já ativou a energia feminina hoje. E você, vai continuar parada?`,
  (nome: string) => `Alerta: A ${nome} está ficando mais bonita que você. Corra!`,
  (nome: string) => `A ${nome} subiu no ranking. Não deixe ela ganhar!`,
  (nome: string) => `${nome} completou todas as tarefas! Você vai deixar ela te passar?`,
  (nome: string) => `Enquanto você descansa, ${nome} está evoluindo. Acorda!`,
];

export function obterMensagemProvocacao(nome: string): string {
  const index = Math.floor(Math.random() * MENSAGENS_PROVOCACAO.length);
  return MENSAGENS_PROVOCACAO[index](nome);
}

// Criar novo squad
export async function criarSquad(nome: string, userId: string) {
  const codigoConvite = gerarCodigoConvite();
  
  const { data: squad, error: squadError } = await supabase
    .from('squads')
    .insert({
      nome,
      codigo_convite: codigoConvite,
      criador_id: userId,
    })
    .select()
    .single();

  if (squadError) throw squadError;

  // Adicionar criador como membro
  const { error: membroError } = await supabase
    .from('squad_membros')
    .insert({
      squad_id: squad.id,
      user_id: userId,
    });

  if (membroError) throw membroError;

  return squad;
}

// Entrar em squad por código
export async function entrarEmSquad(codigoConvite: string, userId: string) {
  // Buscar squad pelo código
  const { data: squad, error: squadError } = await supabase
    .from('squads')
    .select('*')
    .eq('codigo_convite', codigoConvite.toUpperCase())
    .single();

  if (squadError || !squad) {
    throw new Error('Código inválido');
  }

  // Verificar limite de 5 membros
  const { data: membros, error: membrosError } = await supabase
    .from('squad_membros')
    .select('id')
    .eq('squad_id', squad.id);

  if (membrosError) throw membrosError;

  if (membros && membros.length >= 5) {
    throw new Error('Este grupo já está cheio (máximo 5 membros)');
  }

  // Verificar se usuário já está no grupo
  const { data: membroExistente } = await supabase
    .from('squad_membros')
    .select('id')
    .eq('squad_id', squad.id)
    .eq('user_id', userId)
    .single();

  if (membroExistente) {
    throw new Error('Você já está neste grupo');
  }

  // Adicionar membro
  const { error: insertError } = await supabase
    .from('squad_membros')
    .insert({
      squad_id: squad.id,
      user_id: userId,
    });

  if (insertError) throw insertError;

  return squad;
}

// Buscar squads do usuário
export async function buscarSquadsDoUsuario(userId: string) {
  const { data: membros, error: membrosError } = await supabase
    .from('squad_membros')
    .select('squad_id')
    .eq('user_id', userId);

  if (membrosError) throw membrosError;

  if (!membros || membros.length === 0) return [];

  const squadIds = membros.map(m => m.squad_id);

  const { data: squads, error: squadsError } = await supabase
    .from('squads')
    .select('*')
    .in('id', squadIds);

  if (squadsError) throw squadsError;

  return squads || [];
}

// Buscar ranking do squad
export async function buscarRankingSquad(squadId: string) {
  const { data: membros, error } = await supabase
    .from('squad_membros')
    .select(`
      *,
      profiles:user_id (
        nome,
        email
      )
    `)
    .eq('squad_id', squadId)
    .order('pontos_hoje', { ascending: false });

  if (error) throw error;

  return membros || [];
}

// Atualizar progresso do usuário no squad
export async function atualizarProgressoSquad(
  squadId: string,
  userId: string,
  tarefasCompletas: number,
  totalTarefas: number
) {
  const pontos = tarefasCompletas * 10; // 10 pontos por tarefa

  const { error } = await supabase
    .from('squad_membros')
    .update({
      pontos_hoje: pontos,
      tarefas_completas_hoje: tarefasCompletas,
      total_tarefas_hoje: totalTarefas,
    })
    .eq('squad_id', squadId)
    .eq('user_id', userId);

  if (error) throw error;

  // Se completou 100%, enviar notificações provocativas
  if (tarefasCompletas === totalTarefas && totalTarefas > 0) {
    await enviarNotificacoesProvocacao(squadId, userId);
  }
}

// Enviar notificações de provocação
async function enviarNotificacoesProvocacao(squadId: string, userId: string) {
  // Buscar nome do usuário
  const { data: profile } = await supabase
    .from('profiles')
    .select('nome, email')
    .eq('id', userId)
    .single();

  const nome = profile?.nome || profile?.email?.split('@')[0] || 'Uma amiga';

  // Buscar outros membros do squad
  const { data: membros } = await supabase
    .from('squad_membros')
    .select('user_id')
    .eq('squad_id', squadId)
    .neq('user_id', userId);

  if (!membros || membros.length === 0) return;

  // Criar notificações para cada membro
  const notificacoes = membros.map(membro => ({
    squad_id: squadId,
    user_id: membro.user_id,
    tipo: 'provocacao',
    mensagem: obterMensagemProvocacao(nome),
  }));

  await supabase
    .from('squad_notificacoes')
    .insert(notificacoes);
}

// Buscar notificações não lidas
export async function buscarNotificacoesNaoLidas(userId: string) {
  const { data, error } = await supabase
    .from('squad_notificacoes')
    .select('*')
    .eq('user_id', userId)
    .eq('lida', false)
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) throw error;

  return data || [];
}

// Marcar notificação como lida
export async function marcarNotificacaoComoLida(notificacaoId: string) {
  const { error } = await supabase
    .from('squad_notificacoes')
    .update({ lida: true })
    .eq('id', notificacaoId);

  if (error) throw error;
}

// Verificar se usuário é líder do squad
export async function verificarLideranca(squadId: string, userId: string) {
  const ranking = await buscarRankingSquad(squadId);
  
  if (ranking.length === 0) return false;
  
  return ranking[0].user_id === userId;
}
