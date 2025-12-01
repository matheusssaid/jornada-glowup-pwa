// ============================================
// BANCO DE TAREFAS - SISTEMA DE TRANSFORMAÇÃO
// Baseado em Nicole Freya (feminilidade) e Paulo Vieira (superação)
// ============================================

export interface Task {
  id: string;
  titulo: string;
  descricao: string;
  categoria: 'mindset' | 'acao' | 'autocuidado' | 'habito' | 'desafio';
  dificuldade: 'facil' | 'medio' | 'dificil';
  tempo_estimado: string;
  validacao_verbal: string; // Mensagem motivacional ao completar
  validacao_premium?: string; // Call-to-action discreto para premium
}

export interface JornadaTasks {
  id: number;
  nome: string;
  tasks: Task[];
}

// ============================================
// JORNADA 1: DETOX MENTAL
// ============================================
const DETOX_MENTAL_TASKS: Task[] = [
  {
    id: 'dm1',
    titulo: 'Meditação Guiada Matinal',
    descricao: 'Pratique 10 minutos de meditação guiada focada em gratidão e clareza mental',
    categoria: 'habito',
    dificuldade: 'facil',
    tempo_estimado: '10 min',
    validacao_verbal: '🌟 Incrível! Você começou o dia com a mente tranquila. Sua paz interior está florescendo!',
    validacao_premium: '✨ Você merece a transformação completa. Desbloqueie meditações exclusivas!'
  },
  {
    id: 'dm2',
    titulo: 'Journaling de Gratidão',
    descricao: 'Escreva 5 coisas pelas quais você é grata hoje, detalhando por que cada uma é importante',
    categoria: 'habito',
    dificuldade: 'facil',
    tempo_estimado: '15 min',
    validacao_verbal: '💖 Que lindo! Sua energia de gratidão está atraindo coisas maravilhosas para sua vida!',
    validacao_premium: '🌸 Você é capaz de concluir esse desafio completo. Libere todo seu potencial!'
  },
  {
    id: 'dm3',
    titulo: 'Afirmações Poderosas no Espelho',
    descricao: 'Olhe nos seus olhos e repita 10 afirmações positivas sobre você mesma com convicção',
    categoria: 'mindset',
    dificuldade: 'medio',
    tempo_estimado: '10 min',
    validacao_verbal: '👑 Você é poderosa! Cada palavra que você diz para si mesma está reconstruindo sua autoestima!',
    validacao_premium: '💎 Você merece todas as jornadas de transformação. Continue brilhando!'
  },
  {
    id: 'dm4',
    titulo: 'Respiração 4-7-8 para Ansiedade',
    descricao: 'Pratique a técnica: inspire por 4 seg, segure por 7 seg, expire por 8 seg. Repita 5 vezes',
    categoria: 'acao',
    dificuldade: 'facil',
    tempo_estimado: '5 min',
    validacao_verbal: '🌬️ Perfeito! Você está dominando sua ansiedade. Sua mente agradece esse cuidado!',
    validacao_premium: '✨ Imagine ter acesso a todas as técnicas de controle emocional. Você merece!'
  },
  {
    id: 'dm5',
    titulo: 'Detox Digital de 1 Hora',
    descricao: 'Fique 1 hora sem redes sociais. Leia, caminhe ou faça algo que te conecte consigo mesma',
    categoria: 'desafio',
    dificuldade: 'medio',
    tempo_estimado: '60 min',
    validacao_verbal: '🎯 Uau! Você se reconectou com você mesma. Isso é autocuidado de verdade!',
    validacao_premium: '🌟 Você está pronta para desafios maiores. Desbloqueie todas as jornadas!'
  },
  {
    id: 'dm6',
    titulo: 'Visualização Criativa do Futuro',
    descricao: 'Feche os olhos e visualize em detalhes a mulher que você quer ser daqui 6 meses',
    categoria: 'mindset',
    dificuldade: 'medio',
    tempo_estimado: '15 min',
    validacao_verbal: '✨ Incrível! Você está criando sua realidade. O universo está conspirando a seu favor!',
    validacao_premium: '💫 Você é capaz de realizar essa transformação completa. Acredite!'
  },
  {
    id: 'dm7',
    titulo: 'Carta para Seu Eu do Passado',
    descricao: 'Escreva uma carta carinhosa para você de 5 anos atrás, perdoando e acolhendo',
    categoria: 'autocuidado',
    dificuldade: 'dificil',
    tempo_estimado: '20 min',
    validacao_verbal: '💝 Que cura profunda! Você está liberando o passado e abrindo espaço para o novo!',
    validacao_premium: '🌸 Você merece todo o suporte para essa jornada. Desbloqueie mais recursos!'
  },
  {
    id: 'dm8',
    titulo: 'Playlist de Frequências Positivas',
    descricao: 'Ouça 30 minutos de música com frequências 432Hz ou 528Hz para elevar sua vibração',
    categoria: 'habito',
    dificuldade: 'facil',
    tempo_estimado: '30 min',
    validacao_verbal: '🎵 Sua energia está vibrando alto! Continue nutrindo sua mente com positividade!',
    validacao_premium: '✨ Você está no caminho certo. Imagine ter acesso a playlists exclusivas!'
  },
  {
    id: 'dm9',
    titulo: 'Desafio: Zero Reclamações',
    descricao: 'Passe o dia inteiro sem reclamar de nada. Transforme reclamações em gratidão',
    categoria: 'desafio',
    dificuldade: 'dificil',
    tempo_estimado: 'Dia todo',
    validacao_verbal: '🏆 Você é uma guerreira! Transformou sua mentalidade em apenas um dia!',
    validacao_premium: '👑 Você está pronta para desafios ainda maiores. Desbloqueie tudo!'
  },
  {
    id: 'dm10',
    titulo: 'Limpeza Energética do Ambiente',
    descricao: 'Limpe e organize um cômodo da casa enquanto mentaliza renovação e leveza',
    categoria: 'acao',
    dificuldade: 'medio',
    tempo_estimado: '45 min',
    validacao_verbal: '🏡 Ambiente limpo, mente limpa! Você está criando um santuário para sua paz!',
    validacao_premium: '💎 Você merece um ambiente completo de transformação. Continue!'
  },
  {
    id: 'dm11',
    titulo: 'Banho de Ervas Relaxante',
    descricao: 'Prepare um banho com ervas calmantes (camomila, lavanda) e tome com intenção de renovação',
    categoria: 'autocuidado',
    dificuldade: 'facil',
    tempo_estimado: '30 min',
    validacao_verbal: '🛁 Que ritual lindo! Você está honrando seu corpo e sua energia!',
    validacao_premium: '🌸 Você merece rituais ainda mais profundos. Desbloqueie!'
  },
  {
    id: 'dm12',
    titulo: 'Escrita Terapêutica: Libere Emoções',
    descricao: 'Escreva livremente por 15 minutos sobre tudo que te incomoda, depois rasgue o papel',
    categoria: 'autocuidado',
    dificuldade: 'medio',
    tempo_estimado: '20 min',
    validacao_verbal: '📝 Libertador! Você está soltando o que não te serve mais. Que coragem!',
    validacao_premium: '✨ Você está pronta para técnicas ainda mais poderosas!'
  },
  {
    id: 'dm13',
    titulo: 'Caminhada Consciente na Natureza',
    descricao: 'Caminhe 20 minutos prestando atenção em cada som, cheiro e sensação',
    categoria: 'acao',
    dificuldade: 'facil',
    tempo_estimado: '20 min',
    validacao_verbal: '🌳 Conexão perfeita! Você se reconectou com a natureza e consigo mesma!',
    validacao_premium: '🌟 Você merece explorar todas as formas de conexão. Desbloqueie!'
  },
  {
    id: 'dm14',
    titulo: 'Mantra de Autoamor',
    descricao: 'Repita 108 vezes: "Eu me amo, eu me aceito, eu sou suficiente" usando um colar de contas',
    categoria: 'mindset',
    dificuldade: 'medio',
    tempo_estimado: '15 min',
    validacao_verbal: '💗 Poderoso! Você está reprogramando sua mente para o amor próprio!',
    validacao_premium: '👑 Você é capaz de transformação completa. Continue essa jornada!'
  },
  {
    id: 'dm15',
    titulo: 'Desintoxicação de Relacionamentos Tóxicos',
    descricao: 'Identifique 3 relacionamentos que drenam sua energia e estabeleça limites saudáveis',
    categoria: 'desafio',
    dificuldade: 'dificil',
    tempo_estimado: '30 min',
    validacao_verbal: '🛡️ Que força! Você está protegendo sua paz. Isso é amor próprio de verdade!',
    validacao_premium: '💎 Você merece todo o suporte nessa jornada. Desbloqueie mais!'
  },
  {
    id: 'dm16',
    titulo: 'Yoga Restaurativa',
    descricao: 'Pratique 20 minutos de yoga focada em relaxamento e liberação de tensões',
    categoria: 'acao',
    dificuldade: 'medio',
    tempo_estimado: '20 min',
    validacao_verbal: '🧘‍♀️ Perfeito! Seu corpo e mente estão em harmonia. Continue assim!',
    validacao_premium: '✨ Você está pronta para práticas ainda mais profundas!'
  },
  {
    id: 'dm17',
    titulo: 'Lista de Conquistas Pessoais',
    descricao: 'Escreva 20 conquistas suas (pequenas ou grandes) e celebre cada uma',
    categoria: 'mindset',
    dificuldade: 'facil',
    tempo_estimado: '15 min',
    validacao_verbal: '🏆 Olha tudo que você já conquistou! Você é incrível e merece reconhecer isso!',
    validacao_premium: '🌟 Você merece conquistar ainda mais. Desbloqueie todo seu potencial!'
  },
  {
    id: 'dm18',
    titulo: 'Desafio: Silêncio Interno',
    descricao: 'Fique 30 minutos em silêncio total, apenas observando seus pensamentos sem julgá-los',
    categoria: 'desafio',
    dificuldade: 'dificil',
    tempo_estimado: '30 min',
    validacao_verbal: '🤫 Que profundidade! Você está desenvolvendo consciência plena. Incrível!',
    validacao_premium: '💫 Você está pronta para desafios ainda maiores. Continue!'
  },
  {
    id: 'dm19',
    titulo: 'Aromaterapia para Ansiedade',
    descricao: 'Use óleos essenciais calmantes (lavanda, bergamota) em difusor ou pulsos',
    categoria: 'autocuidado',
    dificuldade: 'facil',
    tempo_estimado: '5 min',
    validacao_verbal: '🌺 Que cuidado lindo! Você está nutrindo todos os seus sentidos!',
    validacao_premium: '✨ Você merece rituais completos de autocuidado. Desbloqueie!'
  },
  {
    id: 'dm20',
    titulo: 'Desconexão Noturna',
    descricao: 'Desligue todos os eletrônicos 1 hora antes de dormir e faça um ritual relaxante',
    categoria: 'habito',
    dificuldade: 'medio',
    tempo_estimado: '60 min',
    validacao_verbal: '🌙 Perfeito! Você está priorizando seu descanso. Seu corpo agradece!',
    validacao_premium: '💎 Você merece rotinas completas de bem-estar. Continue!'
  },
  {
    id: 'dm21',
    titulo: 'Terapia do Riso',
    descricao: 'Assista algo engraçado por 20 minutos ou pratique yoga do riso',
    categoria: 'acao',
    dificuldade: 'facil',
    tempo_estimado: '20 min',
    validacao_verbal: '😄 Que energia maravilhosa! Rir é um remédio poderoso para a alma!',
    validacao_premium: '🌟 Você está no caminho certo. Desbloqueie mais alegria!'
  },
  {
    id: 'dm22',
    titulo: 'Mapa Mental dos Sonhos',
    descricao: 'Crie um mapa mental visual com todos os seus sonhos e objetivos de vida',
    categoria: 'mindset',
    dificuldade: 'medio',
    tempo_estimado: '30 min',
    validacao_verbal: '🎨 Que visão clara! Você está materializando seus sonhos no papel!',
    validacao_premium: '✨ Você merece realizar todos esses sonhos. Desbloqueie!'
  },
  {
    id: 'dm23',
    titulo: 'Desafio: Jejum de Notícias Negativas',
    descricao: 'Passe 24 horas sem consumir notícias negativas ou fofocas',
    categoria: 'desafio',
    dificuldade: 'medio',
    tempo_estimado: '24 horas',
    validacao_verbal: '📰 Incrível! Você protegeu sua energia de negatividade. Isso é sabedoria!',
    validacao_premium: '👑 Você está pronta para proteger sua energia completamente!'
  },
  {
    id: 'dm24',
    titulo: 'Ritual de Perdão',
    descricao: 'Escreva uma carta de perdão para alguém (ou você mesma) e queime simbolicamente',
    categoria: 'autocuidado',
    dificuldade: 'dificil',
    tempo_estimado: '30 min',
    validacao_verbal: '🕊️ Que libertação! Você está soltando o peso do passado. Que coragem!',
    validacao_premium: '💝 Você merece cura completa. Desbloqueie mais recursos!'
  },
  {
    id: 'dm25',
    titulo: 'Dança Livre Terapêutica',
    descricao: 'Dance livremente por 15 minutos sem julgamentos, apenas sentindo a música',
    categoria: 'acao',
    dificuldade: 'medio',
    tempo_estimado: '15 min',
    validacao_verbal: '💃 Que liberdade! Você está se expressando autenticamente. Lindo!',
    validacao_premium: '✨ Você merece expressar toda sua essência. Continue!'
  },
  {
    id: 'dm26',
    titulo: 'Meditação da Montanha',
    descricao: 'Pratique a meditação da montanha: firme, inabalável, observando tudo passar',
    categoria: 'habito',
    dificuldade: 'medio',
    tempo_estimado: '15 min',
    validacao_verbal: '⛰️ Que força interior! Você está desenvolvendo resiliência emocional!',
    validacao_premium: '🌟 Você está pronta para técnicas ainda mais profundas!'
  },
  {
    id: 'dm27',
    titulo: 'Desafio: Dia da Positividade',
    descricao: 'Fale apenas coisas positivas sobre você e os outros durante todo o dia',
    categoria: 'desafio',
    dificuldade: 'dificil',
    tempo_estimado: 'Dia todo',
    validacao_verbal: '🌈 Você irradiou luz hoje! Sua energia positiva transformou o ambiente!',
    validacao_premium: '💎 Você merece irradiar essa luz sempre. Desbloqueie!'
  },
  {
    id: 'dm28',
    titulo: 'Banho de Sol Consciente',
    descricao: 'Tome 15 minutos de sol (antes das 10h) praticando gratidão pela vida',
    categoria: 'autocuidado',
    dificuldade: 'facil',
    tempo_estimado: '15 min',
    validacao_verbal: '☀️ Que energia renovada! Você está se nutrindo de luz e vida!',
    validacao_premium: '✨ Você merece todos os rituais de renovação. Continue!'
  },
  {
    id: 'dm29',
    titulo: 'Técnica EFT (Tapping)',
    descricao: 'Pratique 10 minutos de EFT para liberar emoções negativas e ansiedade',
    categoria: 'acao',
    dificuldade: 'medio',
    tempo_estimado: '10 min',
    validacao_verbal: '👆 Poderoso! Você está liberando bloqueios emocionais. Continue!',
    validacao_premium: '🌟 Você está pronta para técnicas avançadas de cura!'
  },
  {
    id: 'dm30',
    titulo: 'Criação de Mandalas',
    descricao: 'Desenhe ou pinte uma mandala focando na intenção de paz interior',
    categoria: 'autocuidado',
    dificuldade: 'medio',
    tempo_estimado: '30 min',
    validacao_verbal: '🎨 Que arte terapêutica! Você está expressando sua paz interior!',
    validacao_premium: '💫 Você merece explorar todas as formas de arte terapêutica!'
  },
  {
    id: 'dm31',
    titulo: 'Desafio: Jejum de Comparações',
    descricao: 'Passe o dia sem se comparar com ninguém, focando apenas em sua própria jornada',
    categoria: 'desafio',
    dificuldade: 'dificil',
    tempo_estimado: 'Dia todo',
    validacao_verbal: '🎯 Que foco! Você entendeu que sua jornada é única e perfeita!',
    validacao_premium: '👑 Você merece celebrar sua unicidade. Desbloqueie!'
  },
  {
    id: 'dm32',
    titulo: 'Ritual de Gratidão Noturna',
    descricao: 'Antes de dormir, agradeça mentalmente por 10 coisas boas do dia',
    categoria: 'habito',
    dificuldade: 'facil',
    tempo_estimado: '5 min',
    validacao_verbal: '🌟 Perfeito! Você está fechando o dia com gratidão. Que sabedoria!',
    validacao_premium: '✨ Você merece rituais completos de bem-estar. Continue!'
  },
  {
    id: 'dm33',
    titulo: 'Meditação Loving-Kindness',
    descricao: 'Pratique meditação de bondade amorosa, enviando amor para você e todos os seres',
    categoria: 'mindset',
    dificuldade: 'medio',
    tempo_estimado: '15 min',
    validacao_verbal: '💗 Que coração generoso! Você está expandindo sua capacidade de amar!',
    validacao_premium: '🌸 Você merece amor em todas as áreas. Desbloqueie!'
  },
  {
    id: 'dm34',
    titulo: 'Desintoxicação de Pensamentos',
    descricao: 'Identifique 5 pensamentos negativos recorrentes e substitua por afirmações positivas',
    categoria: 'mindset',
    dificuldade: 'medio',
    tempo_estimado: '20 min',
    validacao_verbal: '🧠 Que transformação mental! Você está reprogramando sua mente!',
    validacao_premium: '💎 Você está pronta para reprogramação completa. Continue!'
  },
  {
    id: 'dm35',
    titulo: 'Prática de Ho\'oponopono',
    descricao: 'Repita o mantra: "Sinto muito, me perdoe, te amo, sou grata" por 10 minutos',
    categoria: 'habito',
    dificuldade: 'facil',
    tempo_estimado: '10 min',
    validacao_verbal: '🙏 Que cura profunda! Você está limpando memórias e energias!',
    validacao_premium: '✨ Você merece cura em todos os níveis. Desbloqueie!'
  },
  {
    id: 'dm36',
    titulo: 'Desafio: Ato de Bondade Anônimo',
    descricao: 'Faça algo gentil por alguém sem esperar reconhecimento ou retorno',
    categoria: 'desafio',
    dificuldade: 'medio',
    tempo_estimado: '30 min',
    validacao_verbal: '💝 Que generosidade! Você está espalhando amor pelo mundo!',
    validacao_premium: '🌟 Você merece receber tanto quanto dá. Continue!'
  },
  {
    id: 'dm37',
    titulo: 'Banho de Lua',
    descricao: 'Em noite de lua cheia, tome um banho visualizando renovação e limpeza energética',
    categoria: 'autocuidado',
    dificuldade: 'facil',
    tempo_estimado: '20 min',
    validacao_verbal: '🌙 Que ritual mágico! Você está se conectando com os ciclos naturais!',
    validacao_premium: '💫 Você merece rituais lunares completos. Desbloqueie!'
  },
  {
    id: 'dm38',
    titulo: 'Escrita de Intenções',
    descricao: 'Escreva 10 intenções claras para os próximos 30 dias e leia diariamente',
    categoria: 'mindset',
    dificuldade: 'medio',
    tempo_estimado: '20 min',
    validacao_verbal: '📝 Que clareza! Você está direcionando sua energia para o que importa!',
    validacao_premium: '👑 Você merece realizar todas essas intenções. Continue!'
  },
  {
    id: 'dm39',
    titulo: 'Desafio: Jejum de Julgamentos',
    descricao: 'Passe 24 horas sem julgar ninguém (nem você mesma)',
    categoria: 'desafio',
    dificuldade: 'dificil',
    tempo_estimado: '24 horas',
    validacao_verbal: '🕊️ Que libertação! Você está praticando compaixão verdadeira!',
    validacao_premium: '💎 Você está pronta para viver com mais leveza. Desbloqueie!'
  },
  {
    id: 'dm40',
    titulo: 'Meditação Guiada para Autoestima',
    descricao: 'Pratique meditação focada em reconhecer e celebrar seu valor único',
    categoria: 'mindset',
    dificuldade: 'medio',
    tempo_estimado: '15 min',
    validacao_verbal: '👑 Você é valiosa! Está reconhecendo sua própria grandeza!',
    validacao_premium: '✨ Você merece elevar sua autoestima ao máximo. Continue!'
  },
  {
    id: 'dm41',
    titulo: 'Ritual de Limpeza com Sal Grosso',
    descricao: 'Tome banho com sal grosso visualizando todas as energias negativas indo embora',
    categoria: 'autocuidado',
    dificuldade: 'facil',
    tempo_estimado: '15 min',
    validacao_verbal: '🧂 Que limpeza poderosa! Você está renovando sua energia!',
    validacao_premium: '🌟 Você merece rituais completos de proteção. Desbloqueie!'
  },
  {
    id: 'dm42',
    titulo: 'Prática de Mindfulness Eating',
    descricao: 'Faça uma refeição em silêncio, prestando atenção em cada sabor e textura',
    categoria: 'habito',
    dificuldade: 'medio',
    tempo_estimado: '30 min',
    validacao_verbal: '🍽️ Que presença! Você está honrando seu corpo e sua alimentação!',
    validacao_premium: '💫 Você merece consciência plena em tudo. Continue!'
  },
  {
    id: 'dm43',
    titulo: 'Desafio: Dia do Sim',
    descricao: 'Diga sim para coisas que normalmente recusaria (dentro do saudável)',
    categoria: 'desafio',
    dificuldade: 'dificil',
    tempo_estimado: 'Dia todo',
    validacao_verbal: '🎉 Que coragem! Você está saindo da zona de conforto!',
    validacao_premium: '👑 Você está pronta para desafios ainda maiores. Desbloqueie!'
  },
  {
    id: 'dm44',
    titulo: 'Visualização do Eu Ideal',
    descricao: 'Visualize em detalhes a versão mais elevada de você mesma por 20 minutos',
    categoria: 'mindset',
    dificuldade: 'medio',
    tempo_estimado: '20 min',
    validacao_verbal: '✨ Você está criando sua realidade! Essa visão está se manifestando!',
    validacao_premium: '💎 Você merece se tornar essa versão. Desbloqueie tudo!'
  },
  {
    id: 'dm45',
    titulo: 'Prática de Respiração Holotrópica',
    descricao: 'Pratique respiração profunda e rápida por 10 minutos para liberar emoções',
    categoria: 'acao',
    dificuldade: 'dificil',
    tempo_estimado: '15 min',
    validacao_verbal: '🌬️ Que liberação! Você está soltando emoções presas. Poderoso!',
    validacao_premium: '🌟 Você está pronta para técnicas avançadas. Continue!'
  },
  {
    id: 'dm46',
    titulo: 'Criação de Vision Board',
    descricao: 'Crie um painel visual com imagens que representam seus sonhos e objetivos',
    categoria: 'mindset',
    dificuldade: 'medio',
    tempo_estimado: '45 min',
    validacao_verbal: '🎨 Que visão clara! Você está materializando seus sonhos!',
    validacao_premium: '✨ Você merece realizar cada imagem desse painel. Desbloqueie!'
  },
  {
    id: 'dm47',
    titulo: 'Desafio: Jejum de Desculpas',
    descricao: 'Passe o dia sem se desculpar desnecessariamente, apenas quando realmente errar',
    categoria: 'desafio',
    dificuldade: 'medio',
    tempo_estimado: 'Dia todo',
    validacao_verbal: '💪 Que empoderamento! Você está ocupando seu espaço com confiança!',
    validacao_premium: '👑 Você merece se sentir poderosa sempre. Continue!'
  },
  {
    id: 'dm48',
    titulo: 'Meditação dos 7 Chakras',
    descricao: 'Pratique meditação focando em equilibrar e limpar cada um dos 7 chakras',
    categoria: 'habito',
    dificuldade: 'medio',
    tempo_estimado: '20 min',
    validacao_verbal: '🌈 Que equilíbrio! Sua energia está fluindo harmoniosamente!',
    validacao_premium: '💫 Você merece equilíbrio completo. Desbloqueie!'
  },
  {
    id: 'dm49',
    titulo: 'Ritual de Soltura',
    descricao: 'Escreva tudo que quer soltar em papel, rasgue e jogue fora ou queime',
    categoria: 'autocuidado',
    dificuldade: 'medio',
    tempo_estimado: '20 min',
    validacao_verbal: '🕊️ Que libertação! Você está criando espaço para o novo!',
    validacao_premium: '✨ Você merece renovação completa. Continue!'
  },
  {
    id: 'dm50',
    titulo: 'Desafio: Dia da Autenticidade',
    descricao: 'Seja 100% autêntica o dia todo, expressando seus verdadeiros sentimentos',
    categoria: 'desafio',
    dificuldade: 'dificil',
    tempo_estimado: 'Dia todo',
    validacao_verbal: '💎 Que coragem! Você está honrando sua verdade. Isso é liberdade!',
    validacao_premium: '👑 Você merece viver autenticamente sempre. Desbloqueie tudo!'
  },
  {
    id: 'dm51',
    titulo: 'Prática de Auto-Hipnose',
    descricao: 'Pratique auto-hipnose guiada para reprogramar crenças limitantes',
    categoria: 'mindset',
    dificuldade: 'dificil',
    tempo_estimado: '25 min',
    validacao_verbal: '🧠 Que transformação profunda! Você está reprogramando seu subconsciente!',
    validacao_premium: '🌟 Você está pronta para reprogramação completa. Desbloqueie!'
  },
  {
    id: 'dm52',
    titulo: 'Banho de Ervas Energizante',
    descricao: 'Prepare banho com ervas energizantes (alecrim, hortelã) para renovar energia',
    categoria: 'autocuidado',
    dificuldade: 'facil',
    tempo_estimado: '20 min',
    validacao_verbal: '🌿 Que energia renovada! Você está vibrando alto!',
    validacao_premium: '💫 Você merece rituais completos de renovação. Continue!'
  },
  {
    id: 'dm53',
    titulo: 'Desafio: Dia da Vulnerabilidade',
    descricao: 'Compartilhe algo vulnerável com alguém de confiança, praticando coragem',
    categoria: 'desafio',
    dificuldade: 'dificil',
    tempo_estimado: '30 min',
    validacao_verbal: '💝 Que coragem! Vulnerabilidade é força. Você está se conectando profundamente!',
    validacao_premium: '👑 Você merece conexões profundas. Desbloqueie mais!'
  },
  {
    id: 'dm54',
    titulo: 'Meditação Transcendental',
    descricao: 'Pratique 20 minutos de meditação transcendental com seu mantra pessoal',
    categoria: 'habito',
    dificuldade: 'medio',
    tempo_estimado: '20 min',
    validacao_verbal: '🙏 Que paz profunda! Você está transcendendo o ego e encontrando sua essência!',
    validacao_premium: '✨ Você merece paz completa. Continue essa jornada!'
  },
  {
    id: 'dm55',
    titulo: 'Ritual de Fechamento de Ciclos',
    descricao: 'Faça um ritual simbólico para fechar ciclos que não te servem mais',
    categoria: 'autocuidado',
    dificuldade: 'medio',
    tempo_estimado: '30 min',
    validacao_verbal: '🔄 Que sabedoria! Você está honrando finais para permitir novos começos!',
    validacao_premium: '💎 Você merece novos começos poderosos. Desbloqueie!'
  }
];

// ============================================
// JORNADA 2: CORPO FITNESS
// (Já criada anteriormente - mantida igual)
// ============================================

// Continua no próximo arquivo devido ao tamanho...

export const ALL_JORNADAS_TASKS: JornadaTasks[] = [
  { id: 1, nome: 'Detox Mental', tasks: DETOX_MENTAL_TASKS },
];

// Função para pegar 5 tarefas aleatórias do dia
export function getTarefasDoDia(jornadaId: number, dia: number): Task[] {
  const jornada = ALL_JORNADAS_TASKS.find(j => j.id === jornadaId);
  if (!jornada) return [];
  
  // Usa o dia como seed para garantir que as mesmas tarefas apareçam no mesmo dia
  const seed = jornadaId * 1000 + dia;
  const shuffled = [...jornada.tasks].sort(() => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  });
  
  return shuffled.slice(0, 5);
}

// Função para pegar todas as tarefas de uma jornada
export function getTodasTarefas(jornadaId: number): Task[] {
  const jornada = ALL_JORNADAS_TASKS.find(j => j.id === jornadaId);
  return jornada?.tasks || [];
}
