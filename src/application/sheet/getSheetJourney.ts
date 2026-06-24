import { getCreationProgress, isCreationComplete } from '../creation/creationProgress';
import type { CharacterProps } from '../../domain/entities/Character';
import type { SheetTabId } from '../../presentation/components/layout/shell/sheetTabTypes';
import { JOURNEY_STEP_LABELS } from '../../shared/constants/shellLabels';

export type JourneyStepId = keyof typeof JOURNEY_STEP_LABELS;

export type JourneyStepStatus = 'done' | 'current' | 'pending';

export interface JourneyStep {
  id: JourneyStepId;
  tabId: SheetTabId;
  label: string;
  status: JourneyStepStatus;
}

const JOURNEY_ORDER: JourneyStepId[] = ['creation', 'dice', 'inventory', 'story', 'summary'];

function hasAbilityScoresSet(character: CharacterProps): boolean {
  const { abilities } = character;
  return Object.values(abilities).some((score) => score !== 10);
}

function storySectionsFilled(character: CharacterProps): number {
  let filled = 0;
  if (character.characterBackstory.trim()) filled += 1;
  if (character.fellowship.fellowshipName.trim() || character.fellowship.patrons.trim()) filled += 1;
  if (character.appearance.age.trim() || character.appearance.hair.trim()) filled += 1;
  return filled;
}

function isStepComplete(stepId: JourneyStepId, character: CharacterProps): boolean {
  switch (stepId) {
    case 'creation':
      return isCreationComplete(character.creationChoices);
    case 'dice':
      return hasAbilityScoresSet(character) || character.hitPoints.maximum > 0;
    case 'inventory':
      return (character.inventory?.length ?? 0) > 0;
    case 'story':
      return storySectionsFilled(character) >= 2;
    case 'summary':
      return Boolean(character.sheetFinalized);
    default:
      return false;
  }
}

function tabToJourneyStep(tabId: SheetTabId): JourneyStepId {
  if (tabId === 'shop') return 'inventory';
  return tabId as JourneyStepId;
}

export function getSheetJourney(character: CharacterProps, activeTab: SheetTabId): JourneyStep[] {
  const currentId = tabToJourneyStep(activeTab);
  const currentIndex = JOURNEY_ORDER.indexOf(currentId);

  return JOURNEY_ORDER.map((id, index) => {
    const complete = isStepComplete(id, character);
    let status: JourneyStepStatus = 'pending';

    if (id === currentId) {
      status = 'current';
    } else if (complete) {
      status = 'done';
    } else if (index < currentIndex && !complete) {
      status = 'pending';
    }

    return {
      id,
      tabId: id,
      label: JOURNEY_STEP_LABELS[id],
      status,
    };
  });
}

export function countJourneyDone(character: CharacterProps): { done: number; total: number } {
  const done = JOURNEY_ORDER.filter((id) => isStepComplete(id, character)).length;
  return { done, total: JOURNEY_ORDER.length };
}

function stepWeight(id: JourneyStepId, character: CharacterProps): number {
  if (isStepComplete(id, character)) return 1;

  switch (id) {
    case 'creation': {
      const progress = getCreationProgress(character.creationChoices);
      return progress.total > 0 ? progress.done / progress.total : 0;
    }
    case 'story':
      return storySectionsFilled(character) / 3;
    default:
      return 0;
  }
}

/** Progresso da jornada com crédito parcial (ex.: criação a 57%). */
export function getJourneyWeightedProgress(character: CharacterProps): {
  done: number;
  total: number;
  percent: number;
} {
  const { done, total } = countJourneyDone(character);
  const sum = JOURNEY_ORDER.reduce((acc, id) => acc + stepWeight(id, character), 0);
  return {
    done,
    total,
    percent: total > 0 ? Math.round((sum / total) * 100) : 0,
  };
}

export interface JourneyMissingHint {
  stepId: JourneyStepId;
  label: string;
  tabId: SheetTabId;
  message: string;
}

const MISSING_MESSAGES: Record<JourneyStepId, string> = {
  creation: 'Complete cultura, chamado, virtudes e equipamento inicial.',
  dice: 'Defina os atributos e pontos de vida.',
  inventory: 'Adicione itens ao inventário ou equipamento.',
  story: 'Preencha história, comunidade ou aparência.',
  summary: 'Abra a ficha do herói para finalizar.',
};

export function getMissingJourneyHints(character: CharacterProps): JourneyMissingHint[] {
  return JOURNEY_ORDER.filter((id) => !isStepComplete(id, character)).map((id) => ({
    stepId: id,
    label: JOURNEY_STEP_LABELS[id],
    tabId: id,
    message: MISSING_MESSAGES[id],
  }));
}
