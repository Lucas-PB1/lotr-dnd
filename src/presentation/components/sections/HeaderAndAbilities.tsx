import { Checkbox, Label, TextInput } from 'flowbite-react';
import {
  ABILITY_LABELS,
  ABILITY_NAMES,
  type AbilityName,
} from '../../../shared/constants/gameConstants';
import {
  ABILITY_DESCRIPTIONS,
  FIELD_DESCRIPTIONS,
} from '../../../shared/constants/sheetFieldDescriptions';
import { CharacterCalculator } from '../../../domain/services/CharacterCalculator';
import { Character } from '../../../domain/entities/Character';
import { useCharacterSheet } from '../../context/CharacterSheetContext';
import { NumberField, TextField } from '../ui/FormFields';
import { AbilityBonusesSection } from './AbilityBonusesSection';
import { AbilityScoreDisplay } from './AbilityScoreDisplay';
import {
  AbilityScoreModeToggle,
  PointBuyAbilitiesSection,
} from './PointBuyAbilitiesSection';

export function HeaderSection() {
  const { character, updateCharacter } = useCharacterSheet();

  return (
    <div className="identity-grid">
      <TextField
        label="Nome do Personagem"
        value={character.name}
        onChange={(name) => updateCharacter({ name })}
        description={FIELD_DESCRIPTIONS.characterName}
        className="identity-grid__name"
        placeholder="Ex.: Aragorn"
      />
      <TextField
        label="Nome do Jogador"
        value={character.playerName}
        onChange={(playerName) => updateCharacter({ playerName })}
        description={FIELD_DESCRIPTIONS.playerName}
      />
      <TextField
        label="Chamado e Nível"
        value={character.callingAndLevel}
        onChange={(callingAndLevel) => updateCharacter({ callingAndLevel })}
        description={FIELD_DESCRIPTIONS.callingAndLevel}
        placeholder="Ex.: Capitão 3"
      />
      <TextField
        label="Cultura"
        value={character.culture}
        onChange={(culture) => updateCharacter({ culture })}
        description={FIELD_DESCRIPTIONS.culture}
      />
      <TextField
        label="Características Distintivas"
        value={character.distinctiveFeatures}
        onChange={(distinctiveFeatures) => updateCharacter({ distinctiveFeatures })}
        description={FIELD_DESCRIPTIONS.distinctiveFeatures}
        className="identity-grid__wide"
      />
      <TextField
        label="Caminho das Sombras"
        value={character.shadowPath}
        onChange={(shadowPath) => updateCharacter({ shadowPath })}
        description={FIELD_DESCRIPTIONS.shadowPath}
      />
      <NumberField
        label="Experiência"
        value={character.experiencePoints}
        onChange={(experiencePoints) => updateCharacter({ experiencePoints })}
        description={FIELD_DESCRIPTIONS.experiencePoints}
      />
    </div>
  );
}

function ManualAbilityBlock({ ability }: { ability: AbilityName }) {
  const { character, updateCharacter } = useCharacterSheet();
  const base = character.abilities[ability];

  return (
    <div className="ability-card ability-card--manual" title={ABILITY_DESCRIPTIONS[ability]}>
      <AbilityScoreDisplay ability={ability} baseScore={base}>
        <TextInput
          type="number"
          min={1}
          max={30}
          sizing="sm"
          color="gray"
          value={base}
          onChange={(e) =>
            updateCharacter({
              abilities: {
                ...character.abilities,
                [ability]: Number(e.target.value) || 10,
              },
            })
          }
          className="ability-card__input field__input field__input--number"
        />
      </AbilityScoreDisplay>
    </div>
  );
}

export function AbilitiesSection() {
  const { character } = useCharacterSheet();
  const isPointBuy = (character.abilityScoreMode ?? 'manual') === 'pointBuy';

  return (
    <div className="abilities-block">
      <AbilityScoreModeToggle />
      {isPointBuy ? (
        <PointBuyAbilitiesSection />
      ) : (
        <div className="abilities-grid abilities-grid--triple">
          {ABILITY_NAMES.map((ability) => (
            <ManualAbilityBlock key={ability} ability={ability} />
          ))}
        </div>
      )}
      <AbilityBonusesSection />
    </div>
  );
}

function SavingThrowRow({ ability }: { ability: AbilityName }) {
  const { character, updateCharacter } = useCharacterSheet();
  const domainCharacter = new Character(character);
  const save = CharacterCalculator.savingThrowModifier(domainCharacter, ability);
  const proficient = character.savingThrows[ability].proficient;

  return (
    <div className={`save-row ${proficient ? 'save-row--proficient' : ''}`}>
      <Checkbox
        color="warning"
        checked={proficient}
        title="Proficiente nesta resistência"
        onChange={(e) =>
          updateCharacter({
            savingThrows: {
              ...character.savingThrows,
              [ability]: { proficient: e.target.checked },
            },
          })
        }
      />
      <span className="save-row__mod">{save.formattedModifier()}</span>
      <Label className="save-row__name">{ABILITY_LABELS[ability]}</Label>
    </div>
  );
}

export function SavingThrowsSection() {
  return (
    <details className="abilities-accordion__item abilities-accordion__item--saves" open>
      <summary className="abilities-accordion__summary">
        <span>Testes de resistência</span>
      </summary>
      <div className="saves-grid">
        {ABILITY_NAMES.map((ability) => (
          <SavingThrowRow key={ability} ability={ability} />
        ))}
      </div>
    </details>
  );
}

export function AbilitiesAndSavesPanel() {
  return (
    <div className="abilities-saves-panel">
      <AbilitiesSection />
      <SavingThrowsSection />
    </div>
  );
}
