import { Badge, Button, TextInput } from 'flowbite-react';
import {
  ABILITY_LABELS,
  ABILITY_NAMES,
  type AbilityName,
} from '../../../shared/constants/gameConstants';
import {
  BONUS_SOURCE_PRESETS,
  createEmptyBonusSource,
  type AbilityBonusSource,
} from '../../../domain/services/AbilityBonusService';
import { useCharacterSheet } from '../../context/CharacterSheetContext';

function BonusSourceRow({ source }: { source: AbilityBonusSource }) {
  const { character, updateCharacter } = useCharacterSheet();

  const updateSource = (partial: Partial<AbilityBonusSource>) => {
    const abilityBonusSources = character.abilityBonusSources.map((s) =>
      s.id === source.id ? { ...s, ...partial } : s,
    );
    updateCharacter({ abilityBonusSources });
  };

  const updateBonus = (ability: AbilityName, value: number) => {
    const bonuses = { ...source.bonuses, [ability]: value };
    if (value === 0) delete bonuses[ability];
    updateSource({ bonuses });
  };

  const remove = () => {
    updateCharacter({
      abilityBonusSources: character.abilityBonusSources.filter((s) => s.id !== source.id),
    });
  };

  return (
    <div className="bonus-source-row">
      <div className="bonus-source-row__header">
        <TextInput
          sizing="sm"
          color="gray"
          value={source.label}
          placeholder="Origem"
          onChange={(e) => updateSource({ label: e.target.value })}
          className="bonus-source-row__label field__input"
        />
        <Button size="xs" color="light" onClick={remove}>
          ×
        </Button>
      </div>
      <div className="bonus-source-row__grid">
        {ABILITY_NAMES.map((ability) => (
          <label key={ability} className="bonus-source-row__cell">
            <span className="bonus-source-row__ability">{ABILITY_LABELS[ability].slice(0, 3)}</span>
            <TextInput
              type="number"
              sizing="sm"
              color="gray"
              min={-5}
              max={5}
              value={source.bonuses[ability] ?? 0}
              onChange={(e) => updateBonus(ability, Number(e.target.value) || 0)}
              className="field__input field__input--number"
            />
          </label>
        ))}
      </div>
    </div>
  );
}

export function AbilityBonusesSection() {
  const { character, updateCharacter } = useCharacterSheet();
  const sources = character.abilityBonusSources ?? [];

  const addSource = (label: string) => {
    updateCharacter({
      abilityBonusSources: [...sources, createEmptyBonusSource(label)],
    });
  };

  if (sources.length === 0) {
    return (
      <details className="abilities-accordion__item abilities-accordion__item--bonus">
        <summary className="abilities-accordion__summary">
          <span>Bônus de atributos</span>
          <span className="abilities-accordion__hint">cultura, chamado…</span>
        </summary>
        <div className="bonus-section bonus-section--empty">
          <p className="bonus-section__empty-text">Nenhum bônus adicionado ainda.</p>
          <div className="bonus-section__presets">
            {BONUS_SOURCE_PRESETS.map((preset) => (
              <Button key={preset} size="xs" color="light" onClick={() => addSource(preset)}>
                + {preset}
              </Button>
            ))}
          </div>
        </div>
      </details>
    );
  }

  return (
    <details className="abilities-accordion__item abilities-accordion__item--bonus" open>
      <summary className="abilities-accordion__summary">
        <span>Bônus de atributos</span>
        <Badge color="info" size="xs">
          {sources.length}
        </Badge>
      </summary>
      <div className="bonus-section">
        <div className="bonus-section__list">
          {sources.map((source) => (
            <BonusSourceRow key={source.id} source={source} />
          ))}
        </div>
        <div className="bonus-section__presets">
          {BONUS_SOURCE_PRESETS.map((preset) => (
            <Button key={preset} size="xs" color="light" onClick={() => addSource(preset)}>
              + {preset}
            </Button>
          ))}
        </div>
      </div>
    </details>
  );
}
