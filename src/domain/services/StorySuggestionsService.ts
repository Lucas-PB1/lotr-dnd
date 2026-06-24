import type { CharacterProps } from '../entities/Character';
import type { CreationChoices } from './CharacterCreationService';
import {
  getBackground,
  getCalling,
  getCulture,
  getSubculture,
} from '../../shared/data/characterCreationData';
import {
  DISTINCTIVE_FEATURE_LABELS,
  GENERIC_MOTIVATIONS,
  getBackgroundStory,
  getCallingMotivations,
  SAFE_HAVENS,
} from '../../shared/data/storySuggestionsData';

export interface StoryContext {
  cultureName: string;
  subcultureName?: string;
  backgroundName?: string;
  backgroundSummary?: string;
  backgroundHooks: string[];
  callingName?: string;
  callingDescription?: string;
  shadowPath?: string;
  distinctiveFeatures: string[];
  motivations: string[];
}

function formatFeatures(features: string[]): string {
  return features
    .map((f) => DISTINCTIVE_FEATURE_LABELS[f] ?? f)
    .join(' · ');
}

export class StorySuggestionsService {
  static getContext(choices: CreationChoices | undefined | null): StoryContext | null {
    if (!choices?.cultureId) return null;

    const culture = getCulture(choices.cultureId);
    if (!culture) return null;

    const subculture =
      choices.subcultureId ? getSubculture(choices.cultureId, choices.subcultureId) : null;
    const background =
      choices.backgroundId
        ? getBackground(choices.cultureId, choices.backgroundId)
        : null;
    const calling = choices.callingId ? getCalling(choices.callingId) : null;
    const bgStory =
      choices.backgroundId
        ? getBackgroundStory(choices.cultureId, choices.backgroundId)
        : undefined;

    const distinctiveFeatures = background?.distinctiveFeatures ?? [];
    const motivations = [
      ...getCallingMotivations(choices.callingId),
      ...GENERIC_MOTIVATIONS,
    ];

    return {
      cultureName: culture.namePt,
      subcultureName: subculture?.name,
      backgroundName: background?.name,
      backgroundSummary: bgStory?.summaryPt,
      backgroundHooks: bgStory?.hooks ?? [],
      callingName: calling?.namePt,
      callingDescription: calling?.description,
      shadowPath: calling?.shadowPathPt,
      distinctiveFeatures,
      motivations,
    };
  }

  /** Texto inicial sugerido ao completar a criação (Cap. 3 — antecedente + chamado). */
  static buildStarterBackstory(choices: CreationChoices): string {
    const ctx = this.getContext(choices);
    if (!ctx) return '';

    const lines: string[] = [];

    lines.push(`=== Origem: ${ctx.cultureName}${ctx.subcultureName ? ` · ${ctx.subcultureName}` : ''} ===`);

    if (ctx.backgroundName && ctx.backgroundSummary) {
      lines.push(`Antecedente: ${ctx.backgroundName}`);
      lines.push(ctx.backgroundSummary);
      if (ctx.distinctiveFeatures.length > 0) {
        lines.push(`Traços distintivos: ${formatFeatures(ctx.distinctiveFeatures)}`);
      }
    }

    if (ctx.callingName) {
      lines.push('');
      lines.push(`=== Chamado: ${ctx.callingName} ===`);
      if (ctx.callingDescription) lines.push(ctx.callingDescription);
      if (ctx.shadowPath) lines.push(`Caminho da Sombra: ${ctx.shadowPath}`);
    }

    lines.push('');
    lines.push('=== Motivação (complete ou escolha abaixo) ===');
    const firstMotivation = ctx.motivations[0];
    if (firstMotivation) lines.push(firstMotivation);

    return lines.join('\n');
  }

  static buildStarterPatrons(choices: CreationChoices): string {
    if (choices.cultureId === 'hobbits' || choices.cultureId === 'men-bree') {
      return SAFE_HAVENS[0].value;
    }
    if (choices.cultureId === 'rangers') {
      return SAFE_HAVENS[4].value;
    }
    return SAFE_HAVENS[1].value;
  }

  static appendSnippet(current: string, snippet: string): string {
    const text = current.trim();
    if (!text) return snippet;
    if (text.includes(snippet)) return text;
    return `${text}\n\n${snippet}`;
  }

  static shouldSeedBackstory(props: CharacterProps): boolean {
    return !props.characterBackstory.trim() && Boolean(props.creationChoices?.cultureId);
  }

  static shouldSeedPatrons(props: CharacterProps): boolean {
    return !props.fellowship.patrons.trim() && Boolean(props.creationChoices?.cultureId);
  }
}
