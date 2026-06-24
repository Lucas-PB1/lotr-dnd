import { TextInput } from 'flowbite-react';
import { getIdentityFieldLocks } from '../../../application/creation/identityFieldLocks';
import { CharacterCreationService } from '../../../domain/services/CharacterCreationService';
import { getCalling } from '../../../shared/data/characterCreationData';
import { FIELD_DESCRIPTIONS } from '../../../shared/constants/sheetFieldDescriptions';
import { migrateCreationChoices } from '../../../shared/data/rewardSlotUtils';
import { useCharacterSheet } from '../../context/CharacterSheetContext';
import { TextField } from '../ui/FormFields';

function OriginItem({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  if (!value?.trim()) return null;
  return (
    <div className={`origin-item${wide ? ' origin-item--wide' : ''}`}>
      <span className="origin-item__label">{label}</span>
      <span className="origin-item__value">{value}</span>
    </div>
  );
}

export function IdentitySection() {
  const { character, updateCharacter } = useCharacterSheet();
  const choices = migrateCreationChoices(character.creationChoices);
  const locks = getIdentityFieldLocks(choices);
  const calling = choices.callingId ? getCalling(choices.callingId) : null;

  const hasOrigin =
    locks.culture || locks.distinctiveFeatures || locks.shadowPath;

  const applyLevel = (level: number) => {
    const next = { ...choices, level };
    const normalized = CharacterCreationService.normalizeChoices(choices, next);
    const updates = CharacterCreationService.applyCreationChoices(
      { ...character, creationChoices: normalized },
      normalized,
    );
    updateCharacter({ ...updates, creationChoices: normalized });
  };

  return (
    <div className="identity-card">
      <div className="identity-card__hero">
        <div className="identity-card__hero-top">
          <span className="identity-card__badge">Herói</span>
          {locks.callingName && calling && (
            <span className="identity-card__calling-pill">{calling.namePt}</span>
          )}
        </div>

        <div className="identity-card__name-block">
          <label className="identity-card__name-label" htmlFor="character-name">
            Nome do personagem
          </label>
          <TextInput
            id="character-name"
            sizing="lg"
            color="gray"
            value={character.name}
            placeholder="Nome do herói"
            onChange={(e) => updateCharacter({ name: e.target.value })}
            className="identity-card__name-input"
            title={FIELD_DESCRIPTIONS.characterName}
          />
        </div>

        <div className="identity-card__quick-stats">
          <div className="identity-quick-stat">
            <label className="identity-quick-stat__label" htmlFor="player-name">
              Jogador
            </label>
            <TextInput
              id="player-name"
              sizing="sm"
              color="gray"
              value={character.playerName}
              placeholder="Quem joga"
              onChange={(e) => updateCharacter({ playerName: e.target.value })}
              className="identity-quick-stat__input field__input"
              title={FIELD_DESCRIPTIONS.playerName}
            />
          </div>

          {locks.callingName ? (
            <div className="identity-quick-stat">
              <label className="identity-quick-stat__label" htmlFor="char-level">
                Nível
              </label>
              <TextInput
                id="char-level"
                type="number"
                min={1}
                max={20}
                sizing="sm"
                color="gray"
                value={choices.level}
                onChange={(e) => applyLevel(Number(e.target.value) || 1)}
                className="identity-quick-stat__input field__input field__input--number"
                title="Nível atual"
              />
            </div>
          ) : null}

          <div className="identity-quick-stat">
            <label className="identity-quick-stat__label" htmlFor="char-xp">
              XP
            </label>
            <TextInput
              id="char-xp"
              type="number"
              min={0}
              sizing="sm"
              color="gray"
              value={character.experiencePoints}
              onChange={(e) =>
                updateCharacter({ experiencePoints: Number(e.target.value) || 0 })
              }
              className="identity-quick-stat__input field__input field__input--number"
              title={FIELD_DESCRIPTIONS.experiencePoints}
            />
          </div>
        </div>
      </div>

      {hasOrigin && (
        <div className="identity-card__origin">
          <div className="identity-card__origin-header">
            <span className="identity-card__origin-title">Origem do herói</span>
            <span className="identity-card__origin-badge">Criação</span>
          </div>
          <div className="identity-card__origin-grid">
            {locks.culture && (
              <OriginItem label="Cultura" value={character.culture} />
            )}
            {locks.shadowPath && (
              <OriginItem label="Caminho das Sombras" value={character.shadowPath} />
            )}
            {locks.distinctiveFeatures && (
              <OriginItem
                label="Características"
                value={character.distinctiveFeatures}
                wide
              />
            )}
          </div>
          <p className="identity-card__origin-foot">
            Cultura, chamado e traços são definidos na aba <strong>Criação</strong>.
          </p>
        </div>
      )}

      {!hasOrigin && (
        <div className="identity-card__manual">
          <p className="identity-card__manual-hint">
            Complete a aba Criação para preencher cultura e chamado automaticamente.
          </p>
          <div className="identity-card__manual-grid">
            <TextField
              label="Chamado e nível"
              value={character.callingAndLevel}
              onChange={(callingAndLevel) => updateCharacter({ callingAndLevel })}
              compact
              placeholder="Ex.: Guardião 4"
            />
            <TextField
              label="Cultura"
              value={character.culture}
              onChange={(culture) => updateCharacter({ culture })}
              compact
            />
            <TextField
              label="Características"
              value={character.distinctiveFeatures}
              onChange={(distinctiveFeatures) => updateCharacter({ distinctiveFeatures })}
              compact
              className="identity-card__manual-wide"
            />
            <TextField
              label="Caminho das Sombras"
              value={character.shadowPath}
              onChange={(shadowPath) => updateCharacter({ shadowPath })}
              compact
            />
          </div>
        </div>
      )}
    </div>
  );
}
