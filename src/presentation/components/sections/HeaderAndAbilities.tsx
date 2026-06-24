import { Checkbox, Label, TextInput } from 'flowbite-react';
import {
  ABILITY_LABELS,
  ABILITY_NAMES,
  type AbilityName,
} from '../../../shared/constants/gameConstants';
import { CharacterCalculator } from '../../../domain/services/CharacterCalculator';
import { Character } from '../../../domain/entities/Character';
import { useCharacterSheet } from '../../context/CharacterSheetContext';
import { CheckboxField, NumberField, StatBox, TextField } from '../ui/FormFields';
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
        className="identity-grid__name"
      />
      <TextField
        label="Nome do Jogador"
        value={character.playerName}
        onChange={(playerName) => updateCharacter({ playerName })}
      />
      <TextField
        label="Chamado e Nível"
        value={character.callingAndLevel}
        onChange={(callingAndLevel) => updateCharacter({ callingAndLevel })}
      />
      <TextField
        label="Cultura"
        value={character.culture}
        onChange={(culture) => updateCharacter({ culture })}
      />
      <TextField
        label="Características Distintivas"
        value={character.distinctiveFeatures}
        onChange={(distinctiveFeatures) => updateCharacter({ distinctiveFeatures })}
        className="identity-grid__wide"
      />
      <TextField
        label="Caminho das Sombras"
        value={character.shadowPath}
        onChange={(shadowPath) => updateCharacter({ shadowPath })}
      />
      <NumberField
        label="Experiência"
        value={character.experiencePoints}
        onChange={(experiencePoints) => updateCharacter({ experiencePoints })}
      />
    </div>
  );
}

export function CombatStatsSection() {
  const { character, updateCharacter } = useCharacterSheet();

  const formatMod = (n: number) => (n >= 0 ? `+${n}` : `${n}`);

  return (
    <div className="combat-stats-grid">
      <CheckboxField
        label="Inspiração"
        checked={character.inspiration}
        onChange={(inspiration) => updateCharacter({ inspiration })}
      />
      <StatBox label="Proficiência" value={formatMod(character.proficiencyBonus)} sublabel="auto" />
      <StatBox label="CA" value={character.armorClass} sublabel="10 + Des" />
      <StatBox
        label="Iniciativa"
        value={formatMod(character.initiative)}
        sublabel="mod. Des"
      />
      <StatBox label="Desloc." value={`${character.speed} m`} sublabel="cultura" />
    </div>
  );
}

function ManualAbilityBlock({ ability }: { ability: AbilityName }) {
  const { character, updateCharacter } = useCharacterSheet();
  const base = character.abilities[ability];

  return (
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
        className="ability-card__input bg-white/80 text-center"
      />
    </AbilityScoreDisplay>
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
        <div className="abilities-grid abilities-grid--compact">
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

  return (
    <div className="save-row">
      <Checkbox
        color="warning"
        checked={character.savingThrows[ability].proficient}
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
    <div className="saves-panel">
      <h3 className="subsection-title">Testes de Resistência</h3>
      {ABILITY_NAMES.map((ability) => (
        <SavingThrowRow key={ability} ability={ability} />
      ))}
    </div>
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
