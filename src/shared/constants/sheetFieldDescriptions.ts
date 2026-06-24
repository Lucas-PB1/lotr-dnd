/** Textos explicativos para a ficha final e tooltips do sistema. */

export const SECTION_DESCRIPTIONS = {
  identity:
    'Dados básicos que identificam o herói na mesa — quem joga, quanto evoluiu e traços que o destacam.',
  combat:
    'Números centrais de combate: defesa, ordem de ação e mobilidade em campo.',
  abilities:
    'Os seis atributos definem o potencial físico e mental. O modificador entre parênteses é usado em testes e perícias.',
  savingThrows:
    'Testes de resistência contra efeitos que ameaçam corpo ou mente. Marque ● quando for proficiente.',
  skills:
    'Perícias de Middle-earth. ● = proficiente (soma bônus de proficiência); ◆ = perícia (dobra o bônus).',
  vitality:
    'Vida, queda, Sombra e carga — tudo que pode mudar durante uma aventura.',
  equipment:
    'O que o personagem carrega, sabe fazer e recebeu como recompensa ao longo da campanha.',
  fellowship:
    'A Comunidade do jogador: laços, patrono e herdeiro que herdará suas conquistas.',
  appearance:
    'Como o personagem é visto por outros — útil para roleplay e cenas sociais.',
  backstory:
    'Origem, motivações e eventos que moldaram o herói antes da aventura atual.',
} as const;

export const FIELD_DESCRIPTIONS = {
  characterName: 'Nome do herói — como é conhecido na Terra-média.',
  callingAndLevel: 'Chamado (classe) e nível atual do personagem.',
  culture: 'Povo de origem — define bônus, equipamento e traços.',
  playerName: 'Jogador responsável por este personagem.',
  experiencePoints: 'XP acumulada para avançar de nível.',
  distinctiveFeatures: 'Traços físicos ou de personalidade que o tornam memorável.',
  shadowPath: 'Caminho da Sombra que o personagem pode seguir se ceder à corrupção.',
  inspiration: 'Ponto de Inspiração disponível para re-rolar ou ganhar vantagem.',
  proficiencyBonus: 'Bônus fixo por nível, somado a perícias e resistências proficientes.',
  armorClass: 'Classe de Armadura — dificuldade para ser atingido em combate.',
  initiative: 'Modificador de Destreza para determinar a ordem de ação.',
  speed: 'Deslocamento em metros por turno, conforme cultura e equipamento.',
  passiveWisdom: 'Percepção passiva (10 + mod. de Percepção). O Mestre usa para o que você nota sem rolar dados.',
  hitPointsMax: 'Total de pontos de vida ao descansar plenamente.',
  hitPointsCurrent: 'Vida restante neste momento da aventura.',
  hitPointsTemp: 'PV temporários — somam ao atual, mas desaparecem primeiro.',
  hitDice: 'Dados de vida para recuperação em descanso curto.',
  deathSaveSuccesses: 'Sucessos acumulados enquanto está a 0 PV (máx. 3).',
  deathSaveFailures: 'Falhas acumuladas — três falhas significam morte.',
  shadowScore: 'Pontuação atual de Sombra acumulada.',
  shadowMiserable: 'Estado Miserável — penalidades quando a Sombra domina.',
  shadowAnguished: 'Estado Angustiado — sofrimento profundo da corrupção.',
  shadowScars: 'Cicatrizes permanentes deixadas pela Sombra.',
  carriedWeight: 'Peso total carregado em quilogramas.',
  encumbered: 'Sobrecarregado — deslocamento reduzido.',
  heavilyEncumbered: 'Gravemente sobrecarregado — penalidades severas.',
  copper: 'Moedas de cobre da Terra-média.',
  silver: 'Moedas de prata — valor intermediário.',
  gold: 'Moedas de ouro — riqueza rara e valiosa.',
  toolProficiencies: 'Ferramentas, idiomas e proficiências especiais.',
  equipment: 'Itens de partida e equipamento atual.',
  featuresTraitsVirtues: 'Habilidades de cultura, chamado, virtudes e traços únicos.',
  rewardsAndMagicalItems: 'Tesouros de aventura, melhorias de nível e objetos de poder.',
  fellowshipName: 'Nome da Comunidade formada pelo grupo.',
  fellowshipPoints: 'Pontos de Comunidade disponíveis para investir.',
  heirName: 'Herdeiro que receberá legado ao fim da campanha.',
  investment: 'Como os pontos de Comunidade foram investidos.',
  patrons: 'Patronos, aliados e vínculos da Comunidade.',
  age: 'Idade aparente ou real do personagem.',
  height: 'Altura em termos descritivos ou medidas.',
  weight: 'Peso corporal aproximado.',
  eyes: 'Cor ou aspecto dos olhos.',
  hair: 'Cor, comprimento ou estilo do cabelo.',
  skin: 'Tom ou textura da pele.',
  appearanceNotes: 'Detalhes visuais extras para cenas e ilustrações.',
  characterBackstory: 'História pessoal, motivações e segredos do personagem.',
} as const;

export const ABILITY_DESCRIPTIONS: Record<string, string> = {
  strength: 'Força bruta — combate corpo a corpo e atletismo.',
  dexterity: 'Agilidade — reflexos, furtividade e precisão.',
  constitution: 'Vigor — resistência física e pontos de vida.',
  intelligence: 'Raciocínio — memória, lore e investigação.',
  wisdom: 'Intuição — percepção, instinto e medicina.',
  charisma: 'Presença — persuasão, liderança e performance.',
};
