import { Button, Modal, ModalBody, ModalFooter, ModalHeader, TextInput } from 'flowbite-react';
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

function BonusSourceEditor({ source }: { source: AbilityBonusSource }) {
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

  const activeBonuses = ABILITY_NAMES.filter((a) => (source.bonuses[a] ?? 0) !== 0);

  return (
    <div className="bonus-editor-card">
      <div className="bonus-editor-card__header">
        <TextInput
          sizing="sm"
          color="gray"
          value={source.label}
          placeholder="Nome da origem (ex.: Cultura, Virtude…)"
          onChange={(e) => updateSource({ label: e.target.value })}
          className="bonus-editor-card__label field__input"
        />
        <Button size="xs" color="light" onClick={remove} title="Remover origem">
          Remover
        </Button>
      </div>

      <div className="bonus-editor-card__grid">
        {ABILITY_NAMES.map((ability) => (
          <label key={ability} className="bonus-editor-card__cell">
            <span className="bonus-editor-card__ability">{ABILITY_LABELS[ability].slice(0, 3)}</span>
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

      {activeBonuses.length > 0 && (
        <p className="bonus-editor-card__preview">
          {activeBonuses
            .map((a) => {
              const v = source.bonuses[a] ?? 0;
              return `${ABILITY_LABELS[a].slice(0, 3)} ${v > 0 ? '+' : ''}${v}`;
            })
            .join(' · ')}
        </p>
      )}
    </div>
  );
}

interface AbilityBonusesModalProps {
  open: boolean;
  onClose: () => void;
}

export function AbilityBonusesModal({ open, onClose }: AbilityBonusesModalProps) {
  const { character, updateCharacter } = useCharacterSheet();
  const sources = character.abilityBonusSources ?? [];

  const addSource = (label: string) => {
    updateCharacter({
      abilityBonusSources: [...sources, createEmptyBonusSource(label)],
    });
  };

  return (
    <Modal show={open} size="2xl" onClose={onClose}>
      <ModalHeader>Bônus de atributos</ModalHeader>
      <ModalBody>
        <p className="bonus-modal__intro">
          Some bônus de cultura, chamado, virtudes e itens aos seis atributos. Cada origem é uma linha
          separada — o total aparece nas cartas de atributo.
        </p>

        {sources.length === 0 ? (
          <div className="bonus-modal__empty">
            <p>Nenhuma origem de bônus ainda. Escolha um atalho abaixo ou crie uma origem vazia.</p>
          </div>
        ) : (
          <div className="bonus-modal__list">
            {sources.map((source) => (
              <BonusSourceEditor key={source.id} source={source} />
            ))}
          </div>
        )}

        <div className="bonus-modal__presets">
          <span className="bonus-modal__presets-label">Adicionar origem:</span>
          <div className="bonus-modal__presets-buttons">
            {BONUS_SOURCE_PRESETS.map((preset) => (
              <Button key={preset} size="xs" color="light" onClick={() => addSource(preset)}>
                + {preset}
              </Button>
            ))}
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="warning" onClick={onClose}>
          Concluído
        </Button>
      </ModalFooter>
    </Modal>
  );
}
