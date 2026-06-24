import { Label, Select } from 'flowbite-react';
import type { AbilityName } from '../../../../shared/constants/gameConstants';
import { ABILITY_LABELS, ABILITY_NAMES } from '../../../../shared/constants/gameConstants';
import {
  CALLINGS,
  CREATION_STEPS,
  HEROIC_CULTURES,
  type BackgroundDefinition,
  type CallingDefinition,
  type CultureDefinition,
} from '../../../../shared/data/characterCreationData';
import {
  RANGER_SKILL_OPTIONS,
  type CreationChoices,
} from '../../../../domain/services/CharacterCreationService';
import { ToggleButtonGroup } from '../../ui/ToggleButtonGroup';
import { skillOptions } from '../skillOptions';

interface CultureOriginStepProps {
  choices: CreationChoices;
  culture?: CultureDefinition | null;
  background?: BackgroundDefinition | null;
  calling?: CallingDefinition;
  onSetChoice: (partial: Partial<CreationChoices>) => void;
}

export function CultureOriginStep({
  choices,
  culture,
  background,
  calling,
  onSetChoice,
}: CultureOriginStepProps) {
  return (
    <>
      <div className="creation-grid">
        <div>
          <Label htmlFor="culture-select" className="mb-1 text-xs uppercase text-amber-900/70">
            {CREATION_STEPS[0].label}
          </Label>
          <Select
            id="culture-select"
            value={choices.cultureId ?? ''}
            onChange={(e) => onSetChoice({ cultureId: e.target.value || null })}
          >
            <option value="">— Escolha —</option>
            {HEROIC_CULTURES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.namePt}
              </option>
            ))}
          </Select>
          {culture && (
            <p className="mt-1 text-xs text-amber-900/60">
              Desloc. {culture.speed} · {culture.size} · Padrão {culture.standardOfLiving}
            </p>
          )}
        </div>

        {culture && culture.subcultures.length > 0 && (
          <div>
            <Label htmlFor="subculture-select" className="mb-1 text-xs uppercase text-amber-900/70">
              {CREATION_STEPS[1].label}
            </Label>
            <Select
              id="subculture-select"
              value={choices.subcultureId ?? ''}
              onChange={(e) => onSetChoice({ subcultureId: e.target.value || null })}
            >
              <option value="">— Escolha —</option>
              {culture.subcultures.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </Select>
          </div>
        )}

        {culture && (
          <div>
            <Label htmlFor="background-select" className="mb-1 text-xs uppercase text-amber-900/70">
              {CREATION_STEPS[2].label}
            </Label>
            <Select
              id="background-select"
              value={choices.backgroundId ?? ''}
              onChange={(e) => onSetChoice({ backgroundId: e.target.value || null })}
            >
              <option value="">— Escolha —</option>
              {culture.backgrounds.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </Select>
            {background && (
              <p className="mt-1 text-xs text-amber-900/60">
                Perícias: {background.skills.join(', ')} ·{' '}
                {background.distinctiveFeatures.join(' & ')}
              </p>
            )}
          </div>
        )}

        <div>
          <Label htmlFor="calling-select" className="mb-1 text-xs uppercase text-amber-900/70">
            {CREATION_STEPS[3].label}
          </Label>
          <Select
            id="calling-select"
            value={choices.callingId ?? ''}
            onChange={(e) => onSetChoice({ callingId: e.target.value || null })}
          >
            <option value="">— Escolha —</option>
            {CALLINGS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.namePt} (d{c.hitDie})
              </option>
            ))}
          </Select>
          {calling && (
            <p className="mt-1 text-xs text-amber-900/60">
              Sombra: {calling.shadowPathPt} · {calling.primaryAbilities}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="level-select" className="mb-1 text-xs uppercase text-amber-900/70">
            Nível (máx. 10)
          </Label>
          <Select
            id="level-select"
            value={choices.level}
            onChange={(e) => onSetChoice({ level: Number(e.target.value) })}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </Select>
          <p className="mt-1 text-xs text-amber-900/60">
            Virtudes/ofícios desbloqueiam conforme o nível e o chamado.
          </p>
        </div>
      </div>

      {culture?.freeAbilityBonus && (
        <div>
          <Label htmlFor="ranger-bonus" className="mb-1 text-xs uppercase text-amber-900/70">
            Patrulheiro: +1 atributo à escolha
          </Label>
          <Select
            id="ranger-bonus"
            value={choices.rangerBonusAbility ?? ''}
            onChange={(e) =>
              onSetChoice({ rangerBonusAbility: (e.target.value as AbilityName) || null })
            }
          >
            <option value="">— Escolha —</option>
            {ABILITY_NAMES.map((a) => (
              <option key={a} value={a}>
                {ABILITY_LABELS[a]}
              </option>
            ))}
          </Select>
        </div>
      )}

      {culture?.id === 'rangers' && (
        <ToggleButtonGroup
          label="Patrulheiro: perícias errantes (escolha 2)"
          options={skillOptions(RANGER_SKILL_OPTIONS)}
          selected={choices.rangerSkillChoices}
          max={2}
          onChange={(rangerSkillChoices) => onSetChoice({ rangerSkillChoices })}
        />
      )}
    </>
  );
}
