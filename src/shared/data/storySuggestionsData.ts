/** Resumo do antecedente (Cap. 3 — Backgrounds do PDF). */
export interface BackgroundStory {
  summaryPt: string;
  hooks: string[];
}

/** Chave: `cultureId/backgroundId` */
export const BACKGROUND_STORIES: Record<string, BackgroundStory> = {
  // Bardings
  'bardings/dragon-stories': {
    summaryPt:
      'Cresceu ouvindo canções e lendas sobre Smaug e os heróis de Dale. Essas histórias alimentam seu orgulho pelo povo e uma curiosidade insaciável pelo passado.',
    hooks: ['Uma balada antiga menciona um tesouro esquecido', 'Sonha em ver as ruínas da Montanha Solitária'],
  },
  'bardings/by-hammer-and-anvil': {
    summaryPt:
      'Longas horas na forja moldaram caráter e músculos. Você conhece o valor do trabalho honesto e não tolera artesanato malfeito.',
    hooks: ['Uma peça rara encomendada por um estranho', 'A forja da família corre perigo'],
  },
  'bardings/healing-hands': {
    summaryPt:
      'Aprendeu ervas e cuidados de viagem com quem acolhia feridos e viajantes. O caminho é duro, mas ninguém deve ser deixado para trás.',
    hooks: ['Uma receita secreta passada por gerações', 'Jurou ajudar quem cruza as estradas do norte'],
  },
  'bardings/gifted-senses': {
    summaryPt:
      'Sentidos aguçados desde cedo — cheiros, sons e sabores que outros ignoram. Isso o tornou observador e teimoso em suas opiniões.',
    hooks: ['Detectou algo estranho no ar antes dos outros', 'Um aroma o lembra de infância em Dale'],
  },
  'bardings/patient-hunter': {
    summaryPt:
      'Caçador paciente das terras ao redor de Dale. Conhece rastros, estações e o comportamento das feras melhor que a maioria dos soldados.',
    hooks: ['Um rastro incomum nas florestas do norte', 'Caçou uma fera que assombrava a vila'],
  },
  'bardings/wordweaver': {
    summaryPt:
      'Palavras são sua arma: histórias, provérbios e jogos de rima abrem portas que a espada não alcança.',
    hooks: ['Uma aposta de riddles saiu do controle', 'Carrega um provérbio que só sua família conhece'],
  },
  // Dwarves
  'dwarves/bitter-exile': {
    summaryPt:
      'Afastado de parentes ou salão por uma disputa antiga. O exílio deixou orgulho ferido e memória viva das montanhas.',
    hooks: ['Carta não respondida de um parente em Erebor', 'Jura reconquistar o honra perdida'],
  },
  'dwarves/eloquent-orator': {
    summaryPt:
      'Voz respeitada em assembleias — defende seu povo com palavras tão firmes quanto o aço. Astuto em negociações com outros povos.',
    hooks: ['Discurso que evitou um conflito sangrento', 'Rival entre os senhores das salas'],
  },
  'dwarves/far-trader': {
    summaryPt:
      'Estradas e mercados de homens e elfos não são estranhos. Já negociou longe das montanhas e sabe que nem todo forasteiro é inimigo.',
    hooks: ['Dívida de ouro com um mercador de Bree', 'Caravana perdida na estrada verde'],
  },
  'dwarves/grief-azanulbizar': {
    summaryPt:
      'A memória de Azanulbizar ainda arde — parentes caídos, feridas que não fecham. A severidade é escudo contra a dor.',
    hooks: ['Relíquia de um parente morto na batalha', 'Odeia orques com fervor silencioso'],
  },
  'dwarves/life-of-toil': {
    summaryPt:
      'Vida de pedra, túnel e esforço. Conhece o peso do trabalho e guarda segredos aprendidos nas profundezas.',
    hooks: ['Um túnel colapsado que ninguém mapeou', 'Marca de picareta nas mãos como medalha'],
  },
  'dwarves/penetrating-gaze': {
    summaryPt:
      'Olhar que poucos suportam sustentar — lê mentiras e medo antes das palavras. Cauteloso, mas obstinado quando decide.',
    hooks: ['Desconfia de um companheiro desde o primeiro dia', 'Viu algo nas sombras que não deveria estar lá'],
  },
  // Elves Lindon
  'elves-lindon/call-of-the-sea': {
    summaryPt:
      'O chamado do mar cresce em sonhos — memória de Beleriand ou saudade de algo que nunca viu. Paciente, mas profundamente tocado.',
    hooks: ['Música que ouve ao vento na costa', 'Evita falar do que o mar lhe mostra'],
  },
  'elves-lindon/maker-of-ships': {
    summaryPt:
      'Construtor de embarcações élficas — madeira, cordame e canções de salão. Orgulho nobre pelo ofício dos Noldor e Sindar.',
    hooks: ['Um barco guardado para a hora certa', 'Inscrição élfica oculta no casco'],
  },
  'elves-lindon/merchant-family': {
    summaryPt:
      'Família de comerciantes entre Lindon e os portos dos homens. Eloquente, habituado a viagens por água e acordos justos.',
    hooks: ['Carga perdida numa tempestade', 'Contato em um porto distante'],
  },
  'elves-lindon/sky-watcher': {
    summaryPt:
      'Estudioso dos céus e das estrelas — navega por mapas celestes e conhece os caminhos antigos.',
    hooks: ['Uma estrela fora do lugar', 'Profecia lida em um almanaque élfico'],
  },
  'elves-lindon/tower-guard': {
    summaryPt:
      'Guardião de torres e passagens em Lindon. Discreto, vigilante, hábil em ler sinais de intrusão.',
    hooks: ['Viu fumaça onde não há fogueiras', 'Missão que o afastou da torre natal'],
  },
  'elves-lindon/visitor-mountains': {
    summaryPt:
      'Tempo entre montanhas e salões élficos — amizade com anões ou lore de pedra. Curioso e de palavra amável.',
    hooks: ['Presente de um ferreiro anão', 'Mapa de uma passagem esquecida'],
  },
  // Hobbits
  'hobbits/bucklander': {
    summaryPt:
      'Do outro lado da cerca do Condado — Buckland, mais próximo da Floresta Velha. Rústico e cauteloso com estranhos.',
    hooks: ['Barulhos na floresta à noite', 'Parente que sumiu perto do rio'],
  },
  'hobbits/on-patrol': {
    summaryPt:
      'Patrulheiro informal do Condado — conhece trilhas, portões e quem passa sem convite. Desconfiado, mas leal à terra.',
    hooks: ['Estranhos altos vistos na estrada', 'Armadilha para coelhos que pegou algo maior'],
  },
  'hobbits/restless-farmer': {
    summaryPt:
      'Terra e celeiro bastam a muitos, mas não a você. O horizonte chama — fiel à família, mas inquieto.',
    hooks: ['Colheita estranha num campo', 'Promessa de voltar antes do inverno'],
  },
  'hobbits/too-many-paths': {
    summaryPt:
      'Caminhos demais para um só hobbit — mapas rabiscados, trilhas exploradas, vizinhos achando que é loucura alegre.',
    hooks: ['Mapa incompleto de um bosque', 'Aposta com amigos sobre quem vai mais longe'],
  },
  'hobbits/tookish-blood': {
    summaryPt:
      'Sangue Took — honrado, mas ávido por aventura. Histórias de tios excêntricos e convidados inesperados na mesa.',
    hooks: ['Carta de um parente Took viajante', 'Objeto brilhante achado no sótão'],
  },
  'hobbits/witty-gentlehobbit': {
    summaryPt:
      'Cavalheiro hobbit de boa conversa e humor afiado. Conhece vizinhos, festas e os segredos de uma boa refeição.',
    hooks: ['Piada que ofendeu o vizinho errado', 'Convite para uma festa que mudou tudo'],
  },
  // Men of Bree
  'men-bree/crossroads-north': {
    summaryPt:
      'Família de alfaiates ou artesãos nas encruzilhadas do norte. Generoso com vizinhos, fiel à terra de Bree.',
    hooks: ['Encomenda misteriosa de um viajante encapuzado', 'Medida guardada para um cliente que não voltou'],
  },
  'men-bree/forest-dweller': {
    summaryPt:
      'Viveu perto da Chetwood — conhece trilhas, ervas e silêncios da floresta. Astuto e de modos rústicos.',
    hooks: ['Caminho seguro que só você conhece', 'Som de cascos na floresta à noite'],
  },
  'men-bree/gate-warden': {
    summaryPt:
      'Guarda portões e estradas de Bree. Paciente, observador, já viu demais para confiar em aparências.',
    hooks: ['Viajante sem nome registrado no livro', 'Fechadura que alguém tentou arrombar'],
  },
  'men-bree/no-longer-free': {
    summaryPt:
      'Tempos mudaram — sombras ao sul, estranhos na estrada. Curioso e rústico, mas já não vive sem cuidado e medo.',
    hooks: ['Rumor de orques visto longe', 'Vizinho que partiu e não deu notícias'],
  },
  'men-bree/off-with-dwarves': {
    summaryPt:
      'Amizade com anões em viagem — aprendeu respeito pelo povo da pedra e palavras de Westron e Khuzdul.',
    hooks: ['Presente de um anão ferreiro', 'Promessa de encontrar um amigo nas montanhas'],
  },
  'men-bree/up-greenway': {
    summaryPt:
      'Subiu a Greenway em juventude — viu ruínas de Arnor e ouviu histórias nas estalagens. Coração leal e palavra amável.',
    hooks: ['Pedra com runas achada na estrada', 'Canção de Arnor que ainda lembra'],
  },
  // Rangers
  'rangers/counsellor': {
    summaryPt:
      'Conselheiro entre os Dúnedain — ouve mais do que fala, guarda segredos de famílias e caminhos.',
    hooks: ['Um segredo que não pode revelar ainda', 'Mensagem cifrada de um patrulheiro'],
  },
  'rangers/far-reaching-herald': {
    summaryPt:
      'Portador de notícias entre povos distantes. Audaz, de coração leal, já percorreu léguas onde poucos ousam.',
    hooks: ['Missiva selada para Rivendell', 'Encontro com um mensageiro que não chegou ao destino'],
  },
  'rangers/hunter-orcs': {
    summaryPt:
      'Caçador de orques nas fronteiras — rastros, emboscadas e noites frias. Severo, pouco dado a risos fáceis.',
    hooks: ['Marca de lâmina orque numa árvore', 'Vingança por um companheiro caído'],
  },
  'rangers/keeper-lore': {
    summaryPt:
      'Guardião da memória de Arnor — contos de reis caídos e estradas esquecidas. Honrado e de coração verdadeiro.',
    hooks: ['Fragmento de mapa de Arnor', 'Nome de um rei que só patrulheiros lembram'],
  },
  'rangers/protector-land': {
    summaryPt:
      'Protege povoados isolados e terras férteis longe dos salões. Honrado e discreto — a espada fala só quando necessário.',
    hooks: ['Aldeia assolada por ladrões ou orques', 'Ervas que só crescem em um vale guardado'],
  },
  'rangers/watcher-border': {
    summaryPt:
      'Vigia fronteiras e passagens secretas. Reservado, severo, conhece cada colina entre o Shire e a Estrada.',
    hooks: ['Sinal de fumaça na fronteira', 'Trilha nova que não estava lá na semana passada'],
  },
};

export const DISTINCTIVE_FEATURE_LABELS: Record<string, string> = {
  Bold: 'Audaz',
  Proud: 'Orgulhoso',
  Wilful: 'Obstinado',
  Generous: 'Generoso',
  Fierce: 'Feroz',
  Eager: 'Ávido',
  'Fair-spoken': 'Eloquente',
  Cunning: 'Astuto',
  Lordly: 'Nobre',
  Secretive: 'Reservado',
  Stern: 'Severo',
  Wary: 'Cauteloso',
  Patient: 'Paciente',
  Subtle: 'Discreto',
  Inquisitive: 'Curioso',
  Rustic: 'Rústico',
  Faithful: 'Fiel',
  Merry: 'Alegre',
  Honourable: 'Honrado',
  'True-hearted': 'Coração leal',
};

export const CALLING_MOTIVATIONS: Record<string, string[]> = {
  captain: [
    'Unir companheiros contra a Sombra',
    'Provar liderança em batalha',
    'Proteger um reino ou aldeia',
    'Recuperar um estandarte perdido',
  ],
  champion: [
    'Dominar uma arma lendária',
    'Vingar uma injúria antiga',
    'Ser reconhecido como defensor',
    'Testar coragem contra um inimigo temido',
  ],
  messenger: [
    'Levar aviso de perigo a terras distantes',
    'Unir povos isolados contra o inimigo',
    'Encontrar um aliado perdido',
    'Entregar uma missiva que não pode falhar',
  ],
  scholar: [
    'Desvendar um mistério do passado',
    'Curar uma praga ou ferida rara',
    'Preservar lore que se perde',
    'Traduzir textos em línguas antigas',
  ],
  'treasure-hunter': [
    'Recuperar herança roubada',
    'Mapear ruínas de Arnor',
    'Encontrar artefato perdido',
    'Pagar uma dívida com um tesouro',
  ],
  warden: [
    'Guardar os fracos das sombras',
    'Patrulhar terras esquecidas',
    'Caçar uma criatura que assola a região',
    'Manter segredo um refúgio seguro',
  ],
};

export const GENERIC_MOTIVATIONS = [
  'Proteger parentes nas terras do norte',
  'Redimir uma falha que ainda o persegue',
  'Encontrar um lar além das estradas',
  'Servir um senhor ou conselho de sábios',
  'Fugir de um inimigo que não esquece',
  'Cumprir um juramento feito em nome de alguém amado',
];

/** Refúgios — Fase da Comunidade (livro) */
export const SAFE_HAVENS: { label: string; value: string }[] = [
  { label: 'O Poney Pardo', value: 'Refúgio seguro: estalagem O Poney Pardo, Vila de Bree' },
  { label: 'Vila de Bree', value: 'Refúgio seguro: Vila de Bree, encruzilhada da Estrada do Leste' },
  { label: 'Vales de Rivendell', value: 'Refúgio seguro: Última Casa Acolhedora, Vales de Rivendell' },
  { label: 'O Condado', value: 'Refúgio seguro: lar hobbit no Condado, longe da estrada' },
  { label: 'Colinas do Norte', value: 'Refúgio seguro: acampamento oculto dos Patrulheiros' },
  { label: 'Salões de Erebor', value: 'Refúgio seguro: salão anão em Erebor (amigo dos Anões)' },
];

export const FELLOWSHIP_PATRONS: { label: string; value: string }[] = [
  { label: 'Barliman Butterbur', value: 'Patrono: Barliman Butterbur, estalajadeiro do Poney Pardo' },
  { label: 'Mestre ferreiro', value: 'Patrono: mestre ferreiro anão — reparos e conselhos nas montanhas' },
  { label: 'Erudito de Imladris', value: 'Patrono: erudito de Rivendell — lore, mapas e cartas seladas' },
  { label: 'Chefe dos Patrulheiros', value: 'Patrono: senhor dos Dúnedain — missões e avisos nas fronteiras' },
  { label: 'Mercador da Estrada', value: 'Patrono: mercador da Estrada Verde — contatos e suprimentos' },
  { label: 'Curandeiro do norte', value: 'Patrono: curandeiro das terras ermas — ervas e abrigo' },
];

export const FELLOWSHIP_INVESTMENTS: { label: string; value: string }[] = [
  { label: 'Refúgio melhorado', value: 'Investimento: melhorar o refúgio seguro da companhia' },
  { label: 'Arquivo de mapas', value: 'Investimento: biblioteca e arquivo de mapas de Eriador' },
  { label: 'Olhos na estrada', value: 'Investimento: rede de informantes nas estradas do norte' },
  { label: 'Montarias', value: 'Investimento: cavalos ou pôneis de Bree para a companhia' },
  { label: 'Oficina comum', value: 'Investimento: ferramentas e suprimentos compartilhados' },
  { label: 'Patrono fixo', value: 'Investimento: patrono fixo na Fase da Comunidade' },
  { label: 'Legado do herdeiro', value: 'Investimento: relíquia ou artefato guardado para o herdeiro' },
];

export const TREASURE_SUGGESTIONS: { label: string; value: string }[] = [
  { label: 'Lâmina ancestral', value: 'Lâmina ancestral da família, passada de geração em geração' },
  { label: 'Broche númenóreano', value: 'Broche ou anel de estilo númenóreano, herdado de parente' },
  { label: 'Mapa de Arnor', value: 'Mapa antigo das ruínas de Arnor ou das Montanhas Nevoadas' },
  { label: 'Cachimbo de madeira', value: 'Cachimbo de madeira entalhada (fumo para cachimbo)' },
  { label: 'Medalhão de parente', value: 'Medalhão com retrato de parente ausente' },
  { label: 'Chave de salão', value: 'Chave de um cofre em salão anão' },
  { label: 'Cantos antigos', value: 'Livro de cantos ou receitas raras do norte' },
  { label: 'Cartas seladas', value: 'Pena, tinta e cartas com selo ainda não enviadas' },
  { label: 'Amuleto abençoado', value: 'Amuleto contra a Sombra, com benção menor' },
  { label: 'Moedas de Arnor', value: 'Moedas de um reino extinto, valiosas para colecionadores' },
];

export const LOTR_SECRET_BONDS: { label: string; value: string }[] = [
  { label: 'Juramento a parente', value: 'Juramento feito a um parente que partiu e não voltou' },
  { label: 'Dívida de honra', value: 'Dívida de honra com alguém poderoso nas terras do sul' },
  { label: 'Inimigo nas sombras', value: 'Inimigo que ainda o persegue, conhecido só por poucos' },
  { label: 'Promessa ao morto', value: 'Promessa feita a alguém que caiu em batalha' },
  { label: 'Objeto misterioso', value: 'Mapa ou objeto misterioso herdado sem explicação' },
  { label: 'Sonho recorrente', value: 'Sonho recorrente que parece avisar de perigo vindo do leste' },
];

export const LOTR_APPEARANCE_TRAITS: { label: string; value: string }[] = [
  { label: 'Cicatriz de orque', value: 'Cicatriz antiga de encontro com orques' },
  { label: 'Barba trançada', value: 'Barba longa trançada com anéis de metal' },
  { label: 'Manto de viajante', value: 'Manto gasto de viajante, capuz sempre à mão' },
  { label: 'Olhar de sentinela', value: 'Olhar vigilante de quem passou noites em guarda' },
  { label: 'Passo silencioso', value: 'Andar silencioso, quase hobbit em furtividade' },
  { label: 'Mãos de artesão', value: 'Mãos calejadas de ofício ou batalha' },
  { label: 'Voz de bardos', value: 'Voz clara, lembrando cantores de Dale' },
  { label: 'Brilho élfico', value: 'Traço de graça élfica no porte e nos gestos' },
];

export const FELLOWSHIP_NAME_SUGGESTIONS = [
  'Companhia da Estrada Verde',
  'Guardiões de Eriador',
  'Os Errantes do Norte',
  'Sociedade do Poney Pardo',
  'Círculo de Imladris',
  'Lança e Folha',
];

export const AGE_HINTS = ['Jovem', 'Na flor da idade', 'Meia-idade', 'Veterano das estradas', 'Aparenta pouco (elfo)'];
export const HEIGHT_HINTS = ['Baixo como hobbit', 'Médio', 'Alto entre homens', 'Esguio', 'Robusto como anão'];
export const WEIGHT_HINTS = ['Leve e ágil', 'Médio', 'Pesado e forte', 'Robusto', 'Esguio'];

export const EYE_OPTIONS = ['Castanhos', 'Verdes', 'Azuis', 'Cinzentos', 'Âmbar', 'Escuros e profundos'];
export const HAIR_OPTIONS = ['Castanho', 'Loiro', 'Preto', 'Ruivo', 'Grisalho', 'Branco', 'Escuro e liso'];
export const SKIN_OPTIONS = ['Clara', 'Bronzeada', 'Morena', 'Pálida', 'Envelhecida pelo sol', 'Rosada'];

export interface AppearancePreset {
  label: string;
  age: string;
  height: string;
  weight: string;
  hair: string;
  eyes: string;
  skin: string;
  notes: string;
}

export const APPEARANCE_PRESETS: Record<string, AppearancePreset[]> = {
  bardings: [
    {
      label: 'Jovem de Dale',
      age: '25 anos',
      height: '1,75 m',
      weight: '75 kg',
      hair: 'Castanho curto',
      eyes: 'Castanhos',
      skin: 'Bronzeada',
      notes: 'Traços fortes do povo de Dale, postura confiante.',
    },
  ],
  dwarves: [
    {
      label: 'Aventureiro anão',
      age: '68 anos',
      height: '1,45 m',
      weight: '72 kg',
      hair: 'Barba longa trançada, cabelo escuro',
      eyes: 'Escuros',
      skin: 'Morena',
      notes: 'Corpo robusto, mãos calejadas de ofício ou batalha.',
    },
  ],
  'elves-lindon': [
    {
      label: 'Elfo de Lindon',
      age: 'Aparenta 30 (muito mais antigo)',
      height: '1,80 m',
      weight: 'Esguio',
      hair: 'Escuro e liso',
      eyes: 'Cinzentos brilhantes',
      skin: 'Pálida e imaculada',
      notes: 'Graça élfica, sem sinais de idade mortal.',
    },
  ],
  hobbits: [
    {
      label: 'Hobbit do Condado',
      age: '33 anos (maioridade)',
      height: '0,95 m',
      weight: '52 kg',
      hair: 'Castanho encaracolado nos pés',
      eyes: 'Verdes',
      skin: 'Rosada',
      notes: 'Rosto redondo, mãos hábeis, passos silenciosos.',
    },
  ],
  'men-bree': [
    {
      label: 'Homem de Bree',
      age: '35 anos',
      height: '1,70 m',
      weight: '70 kg',
      hair: 'Castanho',
      eyes: 'Castanhos',
      skin: 'Clara',
      notes: 'Aparência familiar a hobbits para estranhos — independente e astuto.',
    },
  ],
  rangers: [
    {
      label: 'Patrulheiro do Norte',
      age: '40 anos',
      height: '1,78 m',
      weight: '78 kg',
      hair: 'Escuro, um pouco longo',
      eyes: 'Cinzentos',
      skin: 'Bronzeada pelo tempo nas estradas',
      notes: 'Manto gasto, olhar vigilante, poucas palavras.',
    },
  ],
};

export function backgroundStoryKey(cultureId: string, backgroundId: string): string {
  return `${cultureId}/${backgroundId}`;
}

export function getBackgroundStory(cultureId: string, backgroundId: string): BackgroundStory | undefined {
  return BACKGROUND_STORIES[backgroundStoryKey(cultureId, backgroundId)];
}

export function getCallingMotivations(callingId: string | null): string[] {
  if (!callingId) return [];
  return CALLING_MOTIVATIONS[callingId] ?? [];
}

export function getAppearancePresets(cultureId: string | null): AppearancePreset[] {
  if (!cultureId) return [];
  return APPEARANCE_PRESETS[cultureId] ?? [];
}

export interface LoreGroupDef {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;
  options: { label: string; value: string }[];
  target?: 'backstory' | 'treasure' | 'patrons' | 'investment';
}

function toOptions(strings: string[]): { label: string; value: string }[] {
  return strings.map((s) => {
    const short = s.length > 42 ? `${s.slice(0, 40)}…` : s;
    return { label: short, value: s };
  });
}

export function buildBackstoryLoreGroups(
  motivations: string[],
  backgroundHooks: string[],
): LoreGroupDef[] {
  const groups: LoreGroupDef[] = [];

  if (motivations.length > 0) {
    groups.push({
      id: 'motivation',
      icon: '⚔',
      title: 'Chamado à aventura',
      subtitle: 'O que o leva à estrada',
      options: toOptions(motivations.slice(0, 8)),
    });
  }

  if (backgroundHooks.length > 0) {
    groups.push({
      id: 'hooks',
      icon: '🍃',
      title: 'Ganchos do antecedente',
      subtitle: 'Sementes da sua história',
      options: toOptions(backgroundHooks),
    });
  }

  groups.push({
    id: 'bonds',
    icon: '✦',
    title: 'Juramentos e segredos',
    subtitle: 'Vínculos da Terra-média',
    options: LOTR_SECRET_BONDS,
  });

  groups.push({
    id: 'treasure',
    icon: '💎',
    title: 'Tesouros e relíquias',
    subtitle: 'Além do inventário comum',
    options: TREASURE_SUGGESTIONS,
    target: 'treasure',
  });

  return groups;
}

export function buildFellowshipLoreGroups(): LoreGroupDef[] {
  return [
    {
      id: 'haven',
      icon: '🏠',
      title: 'Refúgios seguros',
      subtitle: 'Fase da Comunidade — livro',
      options: SAFE_HAVENS,
      target: 'patrons',
    },
    {
      id: 'patrons',
      icon: '🤝',
      title: 'Patronos e aliados',
      subtitle: 'Encontros na estrada',
      options: FELLOWSHIP_PATRONS,
      target: 'patrons',
    },
    {
      id: 'invest',
      icon: '⚙',
      title: 'Investimentos',
      subtitle: 'Pontos de Comunidade',
      options: FELLOWSHIP_INVESTMENTS,
      target: 'investment',
    },
  ];
}
