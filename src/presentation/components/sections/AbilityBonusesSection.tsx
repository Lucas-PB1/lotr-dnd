import { Badge, Button, Label, TextInput } from 'flowbite-react';
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
          placeholder="Origem do bônus"
          onChange={(e) => updateSource({ label: e.target.value })}
          className="bonus-source-row__label bg-white/60"
        />
        <Button size="xs" color="light" onClick={remove}>
          Remover
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
              className="bg-white/60 text-center"
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
      <div className="bonus-section bonus-section--empty">
        <Label className="text-xs font-semibold uppercase text-amber-900/70">
          Bônus (cultura, chamado, etc.)
        </Label>
        <p className="mt-1 text-xs text-amber-900/60">
          Adicione bônus de atributos da sua cultura, chamado ou traços.
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {BONUS_SOURCE_PRESETS.map((preset) => (
            <Button key={preset} size="xs" color="light" onClick={() => addSource(preset)}>
              + {preset}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bonus-section">
      <div className="bonus-section__header">
        <Label className="text-xs font-semibold uppercase text-amber-900/70">
          Bônus de Atributos
        </Label>
        <Badge color="info" size="xs">
          {sources.length} origem{sources.length !== 1 ? 'ns' : ''}
        </Badge>
      </div>

      <div className="bonus-section__list">
        {sources.map((source) => (
          <BonusSourceRow key={source.id} source={source} />
        ))}
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        {BONUS_SOURCE_PRESETS.map((preset) => (
          <Button key={preset} size="xs" color="light" onClick={() => addSource(preset)}>
            + {preset}
          </Button>
        ))}
      </div>
    </div>
  );
}
