import type { ReactNode } from 'react';
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
import { CREATION_UI } from '../../../../shared/constants/creationLabels';
import {
  RANGER_SKILL_OPTIONS,
  type CreationChoices,
} from '../../../../domain/services/CharacterCreationService';
import { ToggleButtonGroup } from '../../ui/ToggleButtonGroup';
import { CreationSelect } from '../CreationSelect';
import { skillOptions } from '../skillOptions';

interface CultureOriginStepProps {
  choices: CreationChoices;
  culture?: CultureDefinition | null;
  background?: BackgroundDefinition | null;
  calling?: CallingDefinition;
  onSetChoice: (partial: Partial<CreationChoices>) => void;
}

function CreationField({
  id,
  label,
  hint,
  children,
  featured,
  compact,
}: {
  id: string;
  label: string;
  hint?: string;
  children: ReactNode;
  featured?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`st-creation-field${featured ? ' st-creation-field--featured' : ''}${compact ? ' st-creation-field--compact' : ''}`}
    >
      <label htmlFor={id} className="st-creation-field__label">
        {label}
      </label>
      {children}
      {hint && <p className="st-creation-field__hint">{hint}</p>}
    </div>
  );
}

function HeritageItem({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li className="st-creation-heritage__item">
      <strong>{title}</strong>
      <span>{children}</span>
    </li>
  );
}

export function CultureOriginStep({
  choices,
  culture,
  background,
  calling,
  onSetChoice,
}: CultureOriginStepProps) {
  const hasSubculture = Boolean(culture && culture.subcultures.length > 0);

  return (
    <div className="st-creation-culture-layout">
      <div className="st-creation-culture-main">
        <CreationField id="culture-select" label={CREATION_STEPS[0].label} featured>
          <CreationSelect
            id="culture-select"
            value={choices.cultureId ?? ''}
            onChange={(e) => onSetChoice({ cultureId: e.target.value || null })}
          >
            <option value="">— Escolha a cultura —</option>
            {HEROIC_CULTURES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.namePt}
              </option>
            ))}
          </CreationSelect>
        </CreationField>

        {culture && (
          <div className="st-creation-meta-strip" aria-label="Resumo da cultura">
            <span>Desloc. {culture.speed}</span>
            <span>{culture.size}</span>
            <span>Padrão {culture.standardOfLiving}</span>
          </div>
        )}

        {culture && (
          <div
            className={`st-creation-origin-grid${hasSubculture ? '' : ' st-creation-origin-grid--no-sub'}`}
          >
            {hasSubculture && (
              <CreationField id="subculture-select" label={CREATION_STEPS[1].label}>
                <CreationSelect
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
                </CreationSelect>
              </CreationField>
            )}

            <CreationField id="background-select" label={CREATION_STEPS[2].label}>
              <CreationSelect
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
              </CreationSelect>
            </CreationField>
          </div>
        )}

        <div className="st-creation-calling-row">
          <CreationField id="calling-select" label={CREATION_STEPS[3].label}>
            <CreationSelect
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
            </CreationSelect>
          </CreationField>

          <CreationField id="level-select" label="Nível" compact>
            <CreationSelect
              id="level-select"
              value={choices.level}
              onChange={(e) => onSetChoice({ level: Number(e.target.value) })}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </CreationSelect>
          </CreationField>
        </div>

        {calling && (
          <p className="st-creation-calling-blurb">
            {calling.description}
            <span className="st-creation-calling-blurb__shadow">Sombra: {calling.shadowPathPt}</span>
          </p>
        )}

        {culture?.freeAbilityBonus && (
          <CreationField id="ranger-bonus" label="Patrulheiro: +1 atributo">
            <CreationSelect
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
            </CreationSelect>
          </CreationField>
        )}

        {culture?.id === 'rangers' && (
          <ToggleButtonGroup
            variant="stitch"
            label="Patrulheiro: perícias errantes (escolha 2)"
            options={skillOptions(RANGER_SKILL_OPTIONS)}
            selected={choices.rangerSkillChoices}
            max={2}
            onChange={(rangerSkillChoices) => onSetChoice({ rangerSkillChoices })}
          />
        )}
      </div>

      {culture && (
        <aside className="st-creation-heritage">
          <h4 className="st-creation-heritage__title">{CREATION_UI.heritageTitle}</h4>
          <ul className="st-creation-heritage__list">
            {culture.traits.map((trait) => {
              const [title, ...rest] = trait.split('—');
              const body = rest.join('—').trim();
              return (
                <HeritageItem key={trait} title={title?.trim() || trait}>
                  {body || null}
                </HeritageItem>
              );
            })}
            {background && (
              <HeritageItem title={background.name}>
                Perícias: {background.skills.join(', ')} · {background.distinctiveFeatures.join(' & ')}
              </HeritageItem>
            )}
            {culture.skillProficiencies.length > 0 && (
              <HeritageItem title="Perícias culturais">
                {culture.skillProficiencies.join(', ')}
              </HeritageItem>
            )}
          </ul>
        </aside>
      )}
    </div>
  );
}
