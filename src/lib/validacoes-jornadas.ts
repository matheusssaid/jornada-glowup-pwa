// Sistema de validações personalizadas por jornada
// 30 mensagens diferentes para cada jornada que oscilam durante o mês

export interface ValidacaoJornada {
  mensagem: string;
  emoji: string;
}

// Níveis de progressão
export const NIVEIS_PROGRESSAO = {
  INICIANTE: { min: 0, max: 149, multiplicador: 1 },
  INTERMEDIARIO: { min: 150, max: 499, multiplicador: 1.5 },
  AVANCADO: { min: 500, max: 9999, multiplicador: 2 },
  MESTRE: { min: 10000, max: Infinity, multiplicador: 3 },
};

// Função para obter nível atual
export function obterNivelProgressao(totalTarefas: number) {
  if (totalTarefas >= NIVEIS_PROGRESSAO.MESTRE.min) return 'MESTRE';
  if (totalTarefas >= NIVEIS_PROGRESSAO.AVANCADO.min) return 'AVANCADO';
  if (totalTarefas >= NIVEIS_PROGRESSAO.INTERMEDIARIO.min) return 'INTERMEDIARIO';
  return 'INICIANTE';
}

// Mensagens de progressão crescente
export const MENSAGENS_PROGRESSAO = {
  INICIANTE: {
    prefixo: "",
    sufixo: "Continue assim!",
  },
  INTERMEDIARIO: {
    prefixo: "Você está evoluindo! ",
    sufixo: "Cada vez mais perto da sua melhor versão!",
  },
  AVANCADO: {
    prefixo: "INCRÍVEL! ",
    sufixo: "Você está se tornando imparável! Continue firme!",
  },
  MESTRE: {
    prefixo: "🔥 LENDÁRIA! ",
    sufixo: "Você é uma MULHER MARAVILHA! Inspiração pura! 🔥",
  },
};

// ============================================
// VALIDAÇÕES POR JORNADA (30 mensagens cada)
// ============================================

export const VALIDACOES_DETOX_MENTAL: ValidacaoJornada[] = [
  { mensagem: "Parabéns! Sua mente está cada dia mais leve e clara.", emoji: "🧠" },
  { mensagem: "Linda! Você está priorizando sua paz mental.", emoji: "✨" },
  { mensagem: "Que orgulho! Cuidar da mente é cuidar de tudo.", emoji: "💜" },
  { mensagem: "Você está se libertando dos pensamentos negativos!", emoji: "🦋" },
  { mensagem: "Sua clareza mental está crescendo a cada dia.", emoji: "🌟" },
  { mensagem: "Parabéns! Você está construindo uma mente forte.", emoji: "💪" },
  { mensagem: "Que evolução! Sua paz interior está florescendo.", emoji: "🌸" },
  { mensagem: "Linda! Você está dominando seus pensamentos.", emoji: "👑" },
  { mensagem: "Sua jornada mental está transformando você!", emoji: "🌈" },
  { mensagem: "Parabéns! Cada meditação te deixa mais centrada.", emoji: "🧘‍♀️" },
  { mensagem: "Você está se tornando a dona da sua mente!", emoji: "💎" },
  { mensagem: "Que progresso! Sua energia mental está radiante.", emoji: "☀️" },
  { mensagem: "Linda! Você está cultivando pensamentos poderosos.", emoji: "🌺" },
  { mensagem: "Sua disciplina mental está te levando longe!", emoji: "🚀" },
  { mensagem: "Parabéns! Você está criando uma mente resiliente.", emoji: "🛡️" },
  { mensagem: "Que transformação! Sua mente agradece.", emoji: "💝" },
  { mensagem: "Linda! Você está se conectando com seu eu interior.", emoji: "🕊️" },
  { mensagem: "Sua paz mental está se tornando seu superpoder!", emoji: "⚡" },
  { mensagem: "Parabéns! Você está reprogramando sua mente.", emoji: "🔮" },
  { mensagem: "Que dedicação! Sua mente está cada vez mais saudável.", emoji: "🌿" },
  { mensagem: "Linda! Você está eliminando o estresse da sua vida.", emoji: "🎯" },
  { mensagem: "Sua jornada de autoconhecimento está linda!", emoji: "🌙" },
  { mensagem: "Parabéns! Você está criando novos padrões mentais.", emoji: "✨" },
  { mensagem: "Que evolução! Sua mente está mais leve.", emoji: "🎈" },
  { mensagem: "Linda! Você está se tornando mentalmente invencível.", emoji: "👸" },
  { mensagem: "Sua clareza mental está te guiando para o sucesso!", emoji: "🌟" },
  { mensagem: "Parabéns! Você está nutrindo sua saúde mental.", emoji: "💚" },
  { mensagem: "Que progresso! Sua mente está em harmonia.", emoji: "🎵" },
  { mensagem: "Linda! Você está construindo uma fortaleza mental.", emoji: "🏰" },
  { mensagem: "Sua transformação mental está inspiradora!", emoji: "🌠" },
];

export const VALIDACOES_CORPO_FITNESS: ValidacaoJornada[] = [
  { mensagem: "Parabéns! Seu corpo está agradecendo cada treino.", emoji: "💪" },
  { mensagem: "Linda! Você está esculpindo o corpo dos sonhos.", emoji: "🔥" },
  { mensagem: "Que dedicação! Cada dia mais forte e saudável.", emoji: "⚡" },
  { mensagem: "Você está se tornando uma máquina fitness!", emoji: "🏋️‍♀️" },
  { mensagem: "Parabéns! Seu corpo está se transformando.", emoji: "✨" },
  { mensagem: "Linda! Você está conquistando seu shape ideal.", emoji: "👑" },
  { mensagem: "Que evolução! Sua força está crescendo.", emoji: "💎" },
  { mensagem: "Você está definindo seu corpo com disciplina!", emoji: "🎯" },
  { mensagem: "Parabéns! Cada treino te deixa mais poderosa.", emoji: "🚀" },
  { mensagem: "Linda! Seu corpo está respondendo ao seu esforço.", emoji: "🌟" },
  { mensagem: "Que progresso! Você está ficando cada vez mais fit.", emoji: "💚" },
  { mensagem: "Sua determinação fitness está inspiradora!", emoji: "🌈" },
  { mensagem: "Parabéns! Você está construindo um corpo forte.", emoji: "🛡️" },
  { mensagem: "Linda! Sua energia fitness está contagiante.", emoji: "☀️" },
  { mensagem: "Que transformação! Seu corpo está agradecendo.", emoji: "💝" },
  { mensagem: "Você está se tornando a versão mais fit de você!", emoji: "🦋" },
  { mensagem: "Parabéns! Sua saúde física está radiante.", emoji: "🌺" },
  { mensagem: "Linda! Você está dominando seus treinos.", emoji: "👸" },
  { mensagem: "Que dedicação! Seu corpo está se moldando.", emoji: "🎨" },
  { mensagem: "Sua jornada fitness está incrível!", emoji: "🌠" },
  { mensagem: "Parabéns! Você está criando hábitos saudáveis.", emoji: "🌿" },
  { mensagem: "Linda! Seu corpo está cada vez mais tonificado.", emoji: "💪" },
  { mensagem: "Que evolução! Você está ficando mais forte.", emoji: "🔥" },
  { mensagem: "Sua disciplina fitness está te levando longe!", emoji: "🏆" },
  { mensagem: "Parabéns! Você está esculpindo músculos.", emoji: "💎" },
  { mensagem: "Linda! Seu corpo está se transformando visivelmente.", emoji: "✨" },
  { mensagem: "Que progresso! Você está mais saudável.", emoji: "💚" },
  { mensagem: "Sua força física está crescendo a cada dia!", emoji: "⚡" },
  { mensagem: "Parabéns! Você está conquistando seu corpo ideal.", emoji: "🎯" },
  { mensagem: "Linda! Sua transformação fitness está linda!", emoji: "🌟" },
];

export const VALIDACOES_GLOW_ESTETICO: ValidacaoJornada[] = [
  { mensagem: "Parabéns! Seu brilho está cada dia mais intenso.", emoji: "✨" },
  { mensagem: "Linda! Você está radiante de beleza.", emoji: "💎" },
  { mensagem: "Que glow! Sua pele está agradecendo.", emoji: "🌟" },
  { mensagem: "Você está brilhando de dentro pra fora!", emoji: "💫" },
  { mensagem: "Parabéns! Seu autocuidado está visível.", emoji: "🌸" },
  { mensagem: "Linda! Você está exalando beleza.", emoji: "👑" },
  { mensagem: "Que transformação! Seu glow está incrível.", emoji: "✨" },
  { mensagem: "Você está se tornando mais radiante a cada dia!", emoji: "☀️" },
  { mensagem: "Parabéns! Sua beleza está florescendo.", emoji: "🌺" },
  { mensagem: "Linda! Seu brilho natural está aparecendo.", emoji: "💖" },
  { mensagem: "Que evolução! Você está luminosa.", emoji: "🌙" },
  { mensagem: "Sua dedicação estética está dando resultado!", emoji: "🎨" },
  { mensagem: "Parabéns! Você está cuidando da sua beleza.", emoji: "💝" },
  { mensagem: "Linda! Seu glow está contagiante.", emoji: "🦋" },
  { mensagem: "Que progresso! Sua pele está perfeita.", emoji: "🌈" },
  { mensagem: "Você está se tornando mais deslumbrante!", emoji: "✨" },
  { mensagem: "Parabéns! Seu autocuidado está transformador.", emoji: "🌟" },
  { mensagem: "Linda! Você está brilhando intensamente.", emoji: "💎" },
  { mensagem: "Que dedicação! Sua beleza está radiante.", emoji: "☀️" },
  { mensagem: "Sua jornada estética está linda!", emoji: "🌸" },
  { mensagem: "Parabéns! Você está cultivando sua beleza.", emoji: "🌺" },
  { mensagem: "Linda! Seu glow está cada vez mais forte.", emoji: "✨" },
  { mensagem: "Que transformação! Você está deslumbrante.", emoji: "👑" },
  { mensagem: "Sua beleza natural está aflorando!", emoji: "🌿" },
  { mensagem: "Parabéns! Você está se tornando mais radiante.", emoji: "💫" },
  { mensagem: "Linda! Seu brilho está hipnotizante.", emoji: "🔮" },
  { mensagem: "Que evolução! Sua pele está impecável.", emoji: "💎" },
  { mensagem: "Sua dedicação ao glow está inspiradora!", emoji: "🌟" },
  { mensagem: "Parabéns! Você está exalando beleza.", emoji: "✨" },
  { mensagem: "Linda! Sua transformação estética está perfeita!", emoji: "🌸" },
];

export const VALIDACOES_FEMINILIDADE: ValidacaoJornada[] = [
  { mensagem: "Parabéns linda! Cada dia 1% mais próxima de exalar feminilidade e transbordar no mundo com seu charme e doçura.", emoji: "💖" },
  { mensagem: "Que mulher! Sua energia feminina está florescendo.", emoji: "🌸" },
  { mensagem: "Linda! Você está se conectando com sua essência feminina.", emoji: "✨" },
  { mensagem: "Parabéns! Sua feminilidade está radiante.", emoji: "👑" },
  { mensagem: "Que evolução! Você está exalando charme.", emoji: "💫" },
  { mensagem: "Linda! Sua doçura está encantadora.", emoji: "🌺" },
  { mensagem: "Parabéns! Você está abraçando sua feminilidade.", emoji: "💝" },
  { mensagem: "Que transformação! Sua energia feminina está linda.", emoji: "🦋" },
  { mensagem: "Linda! Você está se tornando mais feminina.", emoji: "🌹" },
  { mensagem: "Parabéns! Seu charme está irresistível.", emoji: "✨" },
  { mensagem: "Que mulher poderosa! Sua feminilidade está forte.", emoji: "👸" },
  { mensagem: "Linda! Você está exalando elegância feminina.", emoji: "💎" },
  { mensagem: "Parabéns! Sua essência feminina está brilhando.", emoji: "🌟" },
  { mensagem: "Que evolução! Você está mais feminina a cada dia.", emoji: "🌸" },
  { mensagem: "Linda! Sua energia feminina está magnética.", emoji: "💖" },
  { mensagem: "Parabéns! Você está cultivando sua feminilidade.", emoji: "🌺" },
  { mensagem: "Que transformação! Seu charme está encantador.", emoji: "✨" },
  { mensagem: "Linda! Você está se tornando mais graciosa.", emoji: "🦢" },
  { mensagem: "Parabéns! Sua feminilidade está contagiante.", emoji: "💫" },
  { mensagem: "Que mulher! Você está exalando doçura.", emoji: "🍯" },
  { mensagem: "Linda! Sua energia feminina está poderosa.", emoji: "👑" },
  { mensagem: "Parabéns! Você está abraçando sua essência.", emoji: "🌹" },
  { mensagem: "Que evolução! Sua feminilidade está linda.", emoji: "💝" },
  { mensagem: "Linda! Você está se tornando mais encantadora.", emoji: "✨" },
  { mensagem: "Parabéns! Seu charme feminino está radiante.", emoji: "🌟" },
  { mensagem: "Que transformação! Você está mais feminina.", emoji: "🌸" },
  { mensagem: "Linda! Sua doçura está hipnotizante.", emoji: "💖" },
  { mensagem: "Parabéns! Você está exalando feminilidade pura.", emoji: "🦋" },
  { mensagem: "Que mulher incrível! Sua energia está linda.", emoji: "👸" },
  { mensagem: "Linda! Sua feminilidade está inspiradora!", emoji: "✨" },
];

export const VALIDACOES_BUMBUM_NA_NUCA: ValidacaoJornada[] = [
  { mensagem: "Parabéns lindona! O projeto bumbum na nuca está cada vez mais perto, cada dia mais gostosa!", emoji: "🍑" },
  { mensagem: "Que evolução! Seu bumbum está ficando perfeito.", emoji: "🔥" },
  { mensagem: "Linda! Você está esculpindo o bumbum dos sonhos.", emoji: "💪" },
  { mensagem: "Parabéns! Cada agachamento está valendo a pena.", emoji: "✨" },
  { mensagem: "Que dedicação! Seu bumbum está crescendo.", emoji: "📈" },
  { mensagem: "Lindona! O projeto bumbum está dando resultado.", emoji: "🎯" },
  { mensagem: "Parabéns! Você está conquistando o shape perfeito.", emoji: "👑" },
  { mensagem: "Que transformação! Seu bumbum está incrível.", emoji: "💎" },
  { mensagem: "Linda! Você está ficando cada vez mais gostosa.", emoji: "🔥" },
  { mensagem: "Parabéns! Seu bumbum está respondendo aos treinos.", emoji: "💪" },
  { mensagem: "Que evolução! O projeto está avançando.", emoji: "🚀" },
  { mensagem: "Lindona! Seu bumbum está ficando durinho.", emoji: "💎" },
  { mensagem: "Parabéns! Você está esculpindo cada curva.", emoji: "🎨" },
  { mensagem: "Que dedicação! Seu bumbum está crescendo visivelmente.", emoji: "📊" },
  { mensagem: "Linda! O bumbum dos sonhos está chegando.", emoji: "✨" },
  { mensagem: "Parabéns! Cada treino está moldando seu bumbum.", emoji: "🏋️‍♀️" },
  { mensagem: "Que transformação! Você está ficando mais gostosa.", emoji: "🔥" },
  { mensagem: "Lindona! Seu bumbum está ficando empinado.", emoji: "🍑" },
  { mensagem: "Parabéns! O projeto bumbum está perfeito.", emoji: "👑" },
  { mensagem: "Que evolução! Seu shape está incrível.", emoji: "💫" },
  { mensagem: "Linda! Você está conquistando o bumbum perfeito.", emoji: "🎯" },
  { mensagem: "Parabéns! Seu bumbum está cada vez mais definido.", emoji: "💪" },
  { mensagem: "Que dedicação! O resultado está aparecendo.", emoji: "✨" },
  { mensagem: "Lindona! Seu bumbum está ficando maravilhoso.", emoji: "🌟" },
  { mensagem: "Parabéns! Você está esculpindo o bumbum ideal.", emoji: "🎨" },
  { mensagem: "Que transformação! Seu bumbum está crescendo.", emoji: "📈" },
  { mensagem: "Linda! O projeto bumbum está dando certo.", emoji: "🔥" },
  { mensagem: "Parabéns! Você está ficando cada vez mais gostosa.", emoji: "💎" },
  { mensagem: "Que evolução! Seu bumbum está perfeito.", emoji: "👑" },
  { mensagem: "Lindona! O bumbum na nuca está realidade!", emoji: "✨" },
];

export const VALIDACOES_CABELO_SEREIA: ValidacaoJornada[] = [
  { mensagem: "Parabéns! Seu cabelo está cada dia mais lindo.", emoji: "💇‍♀️" },
  { mensagem: "Linda! Você está com cabelo de sereia.", emoji: "🧜‍♀️" },
  { mensagem: "Que evolução! Seu cabelo está radiante.", emoji: "🌟" },
  { mensagem: "Você está cuidando do seu cabelo com amor!", emoji: "💖" },
  { mensagem: "Parabéns! Seu cabelo está brilhando.", emoji: "✨" },
  { mensagem: "Linda! Você está com fios de princesa.", emoji: "👑" },
  { mensagem: "Que transformação! Seu cabelo está impecável.", emoji: "💎" },
  { mensagem: "Você está conquistando o cabelo dos sonhos!", emoji: "🌈" },
  { mensagem: "Parabéns! Seu cabelo está saudável e lindo.", emoji: "🌸" },
  { mensagem: "Linda! Seus fios estão agradecendo.", emoji: "💝" },
  { mensagem: "Que progresso! Seu cabelo está crescendo forte.", emoji: "📈" },
  { mensagem: "Sua dedicação capilar está dando resultado!", emoji: "🎯" },
  { mensagem: "Parabéns! Você está com cabelo de comercial.", emoji: "✨" },
  { mensagem: "Linda! Seu cabelo está cada vez mais bonito.", emoji: "🌺" },
  { mensagem: "Que evolução! Seus fios estão perfeitos.", emoji: "💫" },
  { mensagem: "Você está tratando seu cabelo como merece!", emoji: "👸" },
  { mensagem: "Parabéns! Seu cabelo está deslumbrante.", emoji: "🌟" },
  { mensagem: "Linda! Você está com fios de sereia.", emoji: "🧜‍♀️" },
  { mensagem: "Que transformação! Seu cabelo está radiante.", emoji: "☀️" },
  { mensagem: "Sua jornada capilar está linda!", emoji: "🌸" },
  { mensagem: "Parabéns! Você está cuidando dos seus fios.", emoji: "💖" },
  { mensagem: "Linda! Seu cabelo está brilhando intensamente.", emoji: "✨" },
  { mensagem: "Que progresso! Seus fios estão saudáveis.", emoji: "🌿" },
  { mensagem: "Você está conquistando o cabelo perfeito!", emoji: "🎨" },
  { mensagem: "Parabéns! Seu cabelo está cada vez mais lindo.", emoji: "💝" },
  { mensagem: "Linda! Você está com fios de revista.", emoji: "📸" },
  { mensagem: "Que evolução! Seu cabelo está maravilhoso.", emoji: "🌟" },
  { mensagem: "Sua dedicação capilar está inspiradora!", emoji: "✨" },
  { mensagem: "Parabéns! Você está com cabelo de deusa.", emoji: "👑" },
  { mensagem: "Linda! Seu cabelo está simplesmente perfeito!", emoji: "💎" },
];

export const VALIDACOES_PELE_PORCELANA: ValidacaoJornada[] = [
  { mensagem: "Parabéns! Sua pele está cada dia mais radiante.", emoji: "✨" },
  { mensagem: "Linda! Você está com pele de porcelana.", emoji: "💎" },
  { mensagem: "Que glow! Sua pele está agradecendo.", emoji: "🌟" },
  { mensagem: "Você está cuidando da sua pele com carinho!", emoji: "💖" },
  { mensagem: "Parabéns! Sua pele está brilhando.", emoji: "✨" },
  { mensagem: "Linda! Você está com pele impecável.", emoji: "👑" },
  { mensagem: "Que transformação! Sua pele está perfeita.", emoji: "💫" },
  { mensagem: "Você está conquistando a pele dos sonhos!", emoji: "🌸" },
  { mensagem: "Parabéns! Sua pele está saudável e linda.", emoji: "🌺" },
  { mensagem: "Linda! Seu rosto está radiante.", emoji: "☀️" },
  { mensagem: "Que progresso! Sua pele está melhorando.", emoji: "📈" },
  { mensagem: "Sua rotina de skincare está dando resultado!", emoji: "🎯" },
  { mensagem: "Parabéns! Você está com pele de bebê.", emoji: "✨" },
  { mensagem: "Linda! Sua pele está cada vez mais bonita.", emoji: "💝" },
  { mensagem: "Que evolução! Seu rosto está perfeito.", emoji: "💎" },
  { mensagem: "Você está tratando sua pele como merece!", emoji: "👸" },
  { mensagem: "Parabéns! Sua pele está deslumbrante.", emoji: "🌟" },
  { mensagem: "Linda! Você está com pele de anjo.", emoji: "😇" },
  { mensagem: "Que transformação! Sua pele está luminosa.", emoji: "💫" },
  { mensagem: "Sua jornada de skincare está linda!", emoji: "🌸" },
  { mensagem: "Parabéns! Você está cuidando da sua pele.", emoji: "💖" },
  { mensagem: "Linda! Sua pele está brilhando intensamente.", emoji: "✨" },
  { mensagem: "Que progresso! Seu rosto está saudável.", emoji: "🌿" },
  { mensagem: "Você está conquistando a pele perfeita!", emoji: "🎨" },
  { mensagem: "Parabéns! Sua pele está cada vez mais linda.", emoji: "💝" },
  { mensagem: "Linda! Você está com pele de revista.", emoji: "📸" },
  { mensagem: "Que evolução! Sua pele está maravilhosa.", emoji: "🌟" },
  { mensagem: "Sua dedicação ao skincare está inspiradora!", emoji: "✨" },
  { mensagem: "Parabéns! Você está com pele de deusa.", emoji: "👑" },
  { mensagem: "Linda! Sua pele está simplesmente perfeita!", emoji: "💎" },
];

export const VALIDACOES_CINTURA_FINA: ValidacaoJornada[] = [
  { mensagem: "Parabéns! Sua cintura está cada dia mais fina.", emoji: "⏳" },
  { mensagem: "Linda! Você está esculpindo a cintura perfeita.", emoji: "✨" },
  { mensagem: "Que evolução! Sua cintura está definindo.", emoji: "💪" },
  { mensagem: "Você está conquistando a cintura dos sonhos!", emoji: "🎯" },
  { mensagem: "Parabéns! Cada exercício está moldando sua cintura.", emoji: "🔥" },
  { mensagem: "Linda! Sua cintura está ficando fininha.", emoji: "👑" },
  { mensagem: "Que transformação! Sua cintura está incrível.", emoji: "💎" },
  { mensagem: "Você está definindo cada curva da cintura!", emoji: "🎨" },
  { mensagem: "Parabéns! Sua cintura está respondendo aos treinos.", emoji: "📈" },
  { mensagem: "Linda! O projeto cintura fina está avançando.", emoji: "🚀" },
  { mensagem: "Que progresso! Sua cintura está mais fina.", emoji: "⏳" },
  { mensagem: "Sua dedicação está moldando sua cintura!", emoji: "💫" },
  { mensagem: "Parabéns! Você está com cintura de violão.", emoji: "🎸" },
  { mensagem: "Linda! Sua cintura está cada vez mais definida.", emoji: "✨" },
  { mensagem: "Que evolução! Seu shape está perfeito.", emoji: "💎" },
  { mensagem: "Você está esculpindo a cintura ideal!", emoji: "🏋️‍♀️" },
  { mensagem: "Parabéns! Sua cintura está deslumbrante.", emoji: "🌟" },
  { mensagem: "Linda! Você está com cintura de princesa.", emoji: "👸" },
  { mensagem: "Que transformação! Sua cintura está fininha.", emoji: "⏳" },
  { mensagem: "Sua jornada de cintura fina está linda!", emoji: "💖" },
  { mensagem: "Parabéns! Você está definindo sua cintura.", emoji: "💪" },
  { mensagem: "Linda! Sua cintura está ficando marcada.", emoji: "✨" },
  { mensagem: "Que progresso! Seu abdômen está definido.", emoji: "🔥" },
  { mensagem: "Você está conquistando a cintura perfeita!", emoji: "🎯" },
  { mensagem: "Parabéns! Sua cintura está cada vez mais fina.", emoji: "⏳" },
  { mensagem: "Linda! Você está com cintura de modelo.", emoji: "💎" },
  { mensagem: "Que evolução! Sua cintura está maravilhosa.", emoji: "🌟" },
  { mensagem: "Sua dedicação está transformando sua cintura!", emoji: "✨" },
  { mensagem: "Parabéns! Você está com cintura de deusa.", emoji: "👑" },
  { mensagem: "Linda! Sua cintura está simplesmente perfeita!", emoji: "💫" },
];

// NOVAS JORNADAS

export const VALIDACOES_RELACIONAMENTOS: ValidacaoJornada[] = [
  { mensagem: "Parabéns! Você está cultivando relacionamentos saudáveis.", emoji: "💕" },
  { mensagem: "Linda! Suas conexões estão cada dia mais fortes.", emoji: "🤝" },
  { mensagem: "Que evolução! Você está nutrindo seus vínculos.", emoji: "🌸" },
  { mensagem: "Você está se tornando uma pessoa mais presente!", emoji: "💖" },
  { mensagem: "Parabéns! Sua energia social está radiante.", emoji: "✨" },
  { mensagem: "Linda! Você está construindo laços verdadeiros.", emoji: "🌟" },
  { mensagem: "Que transformação! Seus relacionamentos estão florescendo.", emoji: "🌺" },
  { mensagem: "Você está se conectando de forma autêntica!", emoji: "💝" },
  { mensagem: "Parabéns! Sua empatia está crescendo.", emoji: "🦋" },
  { mensagem: "Linda! Você está criando memórias especiais.", emoji: "📸" },
  { mensagem: "Que progresso! Suas relações estão mais profundas.", emoji: "💎" },
  { mensagem: "Sua dedicação aos relacionamentos está linda!", emoji: "🌈" },
  { mensagem: "Parabéns! Você está sendo uma amiga incrível.", emoji: "👭" },
  { mensagem: "Linda! Sua família está sentindo seu amor.", emoji: "🏡" },
  { mensagem: "Que evolução! Você está mais conectada.", emoji: "🔗" },
  { mensagem: "Você está cultivando amor e respeito!", emoji: "💕" },
  { mensagem: "Parabéns! Suas relações estão mais harmoniosas.", emoji: "☮️" },
  { mensagem: "Linda! Você está sendo luz na vida das pessoas.", emoji: "💫" },
  { mensagem: "Que transformação! Seus vínculos estão fortes.", emoji: "💪" },
  { mensagem: "Sua jornada social está inspiradora!", emoji: "🌟" },
  { mensagem: "Parabéns! Você está atraindo pessoas incríveis.", emoji: "🧲" },
  { mensagem: "Linda! Sua energia está contagiante.", emoji: "✨" },
  { mensagem: "Que progresso! Você está mais amorosa.", emoji: "💖" },
  { mensagem: "Você está construindo relacionamentos sólidos!", emoji: "🏗️" },
  { mensagem: "Parabéns! Sua presença faz diferença.", emoji: "🌸" },
  { mensagem: "Linda! Você está sendo uma companhia maravilhosa.", emoji: "🤗" },
  { mensagem: "Que evolução! Seus relacionamentos estão lindos.", emoji: "💝" },
  { mensagem: "Sua dedicação às pessoas está transformadora!", emoji: "🌺" },
  { mensagem: "Parabéns! Você está criando laços eternos.", emoji: "♾️" },
  { mensagem: "Linda! Seus relacionamentos estão abençoados!", emoji: "🙏" },
];

export const VALIDACOES_ESPIRITUALIDADE: ValidacaoJornada[] = [
  { mensagem: "Parabéns! Sua jornada espiritual está florescendo.", emoji: "🕊️" },
  { mensagem: "Linda! Você está se conectando com o divino.", emoji: "✨" },
  { mensagem: "Que evolução! Sua fé está crescendo.", emoji: "🙏" },
  { mensagem: "Você está cultivando sua vida espiritual!", emoji: "🌿" },
  { mensagem: "Parabéns! Sua paz interior está radiante.", emoji: "☮️" },
  { mensagem: "Linda! Você está se aproximando do sagrado.", emoji: "💫" },
  { mensagem: "Que transformação! Sua alma está em paz.", emoji: "🕊️" },
  { mensagem: "Você está nutrindo seu espírito!", emoji: "🌸" },
  { mensagem: "Parabéns! Sua luz espiritual está brilhando.", emoji: "✨" },
  { mensagem: "Linda! Você está em sintonia com o divino.", emoji: "🙏" },
  { mensagem: "Que progresso! Sua fé está fortalecida.", emoji: "💪" },
  { mensagem: "Sua jornada espiritual está linda!", emoji: "🌟" },
  { mensagem: "Parabéns! Você está crescendo espiritualmente.", emoji: "📈" },
  { mensagem: "Linda! Sua alma está em harmonia.", emoji: "🎵" },
  { mensagem: "Que evolução! Você está mais conectada.", emoji: "🔗" },
  { mensagem: "Você está cultivando gratidão e amor!", emoji: "💖" },
  { mensagem: "Parabéns! Sua espiritualidade está florescendo.", emoji: "🌺" },
  { mensagem: "Linda! Você está sendo guiada pela fé.", emoji: "🧭" },
  { mensagem: "Que transformação! Seu espírito está forte.", emoji: "💎" },
  { mensagem: "Sua dedicação espiritual está inspiradora!", emoji: "✨" },
  { mensagem: "Parabéns! Você está em paz com o divino.", emoji: "☮️" },
  { mensagem: "Linda! Sua fé está te transformando.", emoji: "🦋" },
  { mensagem: "Que progresso! Você está mais iluminada.", emoji: "💡" },
  { mensagem: "Você está construindo uma vida espiritual rica!", emoji: "🏛️" },
  { mensagem: "Parabéns! Sua alma está radiante.", emoji: "🌟" },
  { mensagem: "Linda! Você está sendo abençoada.", emoji: "🙏" },
  { mensagem: "Que evolução! Sua espiritualidade está linda.", emoji: "🕊️" },
  { mensagem: "Sua jornada com o divino está transformadora!", emoji: "✨" },
  { mensagem: "Parabéns! Você está em comunhão espiritual.", emoji: "💫" },
  { mensagem: "Linda! Sua fé está te guiando para a luz!", emoji: "🌅" },
];

// Mapeamento de jornadas para validações
export const VALIDACOES_POR_JORNADA: { [key: string]: ValidacaoJornada[] } = {
  "Detox Mental": VALIDACOES_DETOX_MENTAL,
  "Corpo Fitness": VALIDACOES_CORPO_FITNESS,
  "Glow Estético": VALIDACOES_GLOW_ESTETICO,
  "Feminilidade": VALIDACOES_FEMINILIDADE,
  "Bumbum na Nuca": VALIDACOES_BUMBUM_NA_NUCA,
  "Cabelo de Sereia": VALIDACOES_CABELO_SEREIA,
  "Pele de Porcelana": VALIDACOES_PELE_PORCELANA,
  "Cintura Fina": VALIDACOES_CINTURA_FINA,
  "Relacionamentos": VALIDACOES_RELACIONAMENTOS,
  "Espiritualidade": VALIDACOES_ESPIRITUALIDADE,
};

// Função para obter validação do dia
export function obterValidacaoDoDia(
  jornadaTitulo: string,
  totalTarefasCompletas: number
): { mensagemCompleta: string; emoji: string } {
  const validacoes = VALIDACOES_POR_JORNADA[jornadaTitulo];
  
  if (!validacoes) {
    return {
      mensagemCompleta: "Parabéns! Você completou mais uma jornada!",
      emoji: "🎉",
    };
  }

  // Usar o dia do mês para selecionar uma das 30 validações
  const diaDoMes = new Date().getDate();
  const indice = (diaDoMes - 1) % validacoes.length;
  const validacao = validacoes[indice];

  // Obter nível de progressão
  const nivel = obterNivelProgressao(totalTarefasCompletas);
  const progressao = MENSAGENS_PROGRESSAO[nivel];

  // Construir mensagem completa com progressão
  let mensagemCompleta = validacao.mensagem;

  // Adicionar prefixo e sufixo baseado no nível
  if (nivel !== 'INICIANTE') {
    mensagemCompleta = `${progressao.prefixo}${mensagemCompleta}`;
  }

  // Adicionar informação de progresso para níveis avançados
  if (totalTarefasCompletas >= 150) {
    const faltam = 10000 - totalTarefasCompletas;
    const percentual = ((totalTarefasCompletas / 10000) * 100).toFixed(1);
    
    if (totalTarefasCompletas >= 500) {
      mensagemCompleta += ` Você já está em ${percentual}% do caminho para se tornar uma MULHER MARAVILHA! Faltam apenas ${faltam} tarefas!`;
    } else {
      mensagemCompleta += ` Você já completou ${totalTarefasCompletas} tarefas! Continue assim!`;
    }
  }

  mensagemCompleta += ` ${progressao.sufixo}`;

  return {
    mensagemCompleta,
    emoji: validacao.emoji,
  };
}
