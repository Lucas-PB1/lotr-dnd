import { Button } from 'flowbite-react';
import {
  ABILITY_LABELS,
  ABILITY_NAMES,
  LOTR_SKILLS,
  type AbilityName,
} from '../../../shared/constants/gameConstants';
import {
  ABILITY_DESCRIPTIONS,
  FIELD_DESCRIPTIONS,
  SECTION_DESCRIPTIONS,
} from '../../../shared/constants/sheetFieldDescriptions';
import { Character } from '../../../domain/entities/Character';
import { CharacterCalculator } from '../../../domain/services/CharacterCalculator';
import { useCharacterSheet } from '../../context/CharacterSheetContext';
import {
  DisplayChip,
  DisplayField,
  DisplaySection,
  DisplayStat,
  DisplayText,
} from '../display/DisplayField';
import { FinalCombatStrip } from '../display/final/FinalCombatStrip';
import { FinalDeathSaves } from '../display/final/FinalDeathSaves';
import { FinalHpHero } from '../display/final/FinalHpHero';
import { AbilityScoreDisplay } from '../sections/AbilityScoreDisplay';
import { SheetPanel } from './SheetPanel';

function FinalAbilityCard({ ability }: { ability: AbilityName }) {
  return (
    <div className="ability-card ability-card--final" title={ABILITY_DESCRIPTIONS[ability]}>
      <AbilityScoreDisplay ability={ability} />
    </div>
  );
}

function FinalSaveRow({ ability }: { ability: AbilityName }) {
  const { character } = useCharacterSheet();
  const domainCharacter = new Character(character);
  const save = CharacterCalculator.savingThrowModifier(domainCharacter, ability);
  const proficient = character.savingThrows[ability].proficient;

  return (
    <div className={`final-save-row ${proficient ? 'final-save-row--proficient' : ''}`}>
      <span className={`final-marker ${proficient ? 'final-marker--on' : ''}`}>
        {proficient ? '●' : '○'}
      </span>
      <span className="final-save-row__mod">{save.formattedModifier()}</span>
      <span className="final-save-row__name">{ABILITY_LABELS[ability]}</span>
    </div>
  );
}

function FinalSkillRow({ skillId }: { skillId: string }) {
  const { character } = useCharacterSheet();
  const skillDef = LOTR_SKILLS.find((s) => s.id === skillId)!;
  const domainCharacter = new Character(character);
  const skillMod = CharacterCalculator.skillModifier(domainCharacter, skillId);
  const state = character.skills[skillId];
  const isActive = state.proficient || state.expertise;

  if (!isActive) return null;

  return (
    <div className="final-skill-row final-skill-row--active" title={`${ABILITY_LABELS[skillDef.ability]}`}>
      <span className="final-skill-row__markers">
        {state.proficient && <span className="final-marker final-marker--on">●</span>}
        {state.expertise && <span className="final-marker final-marker--expert">◆</span>}
      </span>
      <span className="final-skill-row__mod">{skillMod.formattedModifier()}</span>
      <span className="final-skill-row__name">
        {skillDef.name}
        <span className="final-skill-row__ability">{ABILITY_LABELS[skillDef.ability].slice(0, 3)}</span>
      </span>
    </div>
  );
}

export function SheetFinalTab() {
  const { character } = useCharacterSheet();
  const domainCharacter = new Character(character);
  const passiveWisdom = CharacterCalculator.passiveWisdom(domainCharacter);
  const { shadow, encumbrance, currency, fellowship, appearance } = character;

  const activeSkills = LOTR_SKILLS.filter((s) => {
    const st = character.skills[s.id];
    return st.proficient || st.expertise;
  });

  const filledAttacks = character.attacks.filter((a) => a.weapon.trim());

  const handlePrint = () => window.print();

  return (
    <div className="sheet-final-view">
      <div className="sheet-final__toolbar no-print">
        <div>
          <p className="sheet-final__hint-title">Ficha Final</p>
          <p className="sheet-final__hint">Resumo para consulta ou impressão — passe o mouse para dicas.</p>
        </div>
        <Button color="warning" size="sm" onClick={handlePrint} className="sheet-final__print-btn">
          Imprimir ficha
        </Button>
      </div>

      <header className="sheet-final__hero">
        <div className="sheet-final__hero-badge">Herói da Terra-média</div>
        <h2 className="sheet-final__name">{character.name || 'Personagem sem nome'}</h2>
        <p className="sheet-final__subtitle">
          {[character.callingAndLevel, character.culture].filter(Boolean).join(' · ') || '—'}
        </p>
        <div className="sheet-final__hero-meta">
          <DisplayChip
            label="Jogador"
            value={character.playerName}
            description={FIELD_DESCRIPTIONS.playerName}
          />
          <DisplayChip
            label="XP"
            value={character.experiencePoints}
            description={FIELD_DESCRIPTIONS.experiencePoints}
          />
          {character.distinctiveFeatures && (
            <DisplayChip
              label="Traços"
              value={character.distinctiveFeatures}
              description={FIELD_DESCRIPTIONS.distinctiveFeatures}
            />
          )}
          {character.shadowPath && (
            <DisplayChip
              label="Sombra"
              value={character.shadowPath}
              description={FIELD_DESCRIPTIONS.shadowPath}
            />
          )}
        </div>
        <FinalCombatStrip
          inspiration={character.inspiration}
          proficiencyBonus={character.proficiencyBonus}
          armorClass={character.armorClass}
          initiative={character.initiative}
          speed={character.speed}
        />
      </header>

      <div className="sheet-final__grid">
        <SheetPanel title="Atributos & Resistências" accent="gold">
          <div className="abilities-grid abilities-grid--triple">
            {ABILITY_NAMES.map((ability) => (
              <FinalAbilityCard key={ability} ability={ability} />
            ))}
          </div>
          <details className="sheet-final__saves" open>
            <summary>Testes de resistência</summary>
            <div className="saves-grid saves-grid--final">
              {ABILITY_NAMES.map((ability) => (
                <FinalSaveRow key={ability} ability={ability} />
              ))}
            </div>
          </details>
        </SheetPanel>

        <SheetPanel title="Perícias" accent="emerald">
          <div className="final-skills-legend">
            <span><span className="final-marker final-marker--on">●</span> Prof.</span>
            <span><span className="final-marker final-marker--expert">◆</span> Perícia</span>
            <span className="final-skills-legend__count">{activeSkills.length} ativas</span>
          </div>
          <div className="final-skills-list final-skills-list--active-only">
            {activeSkills.length > 0 ? (
              activeSkills.map((skill) => <FinalSkillRow key={skill.id} skillId={skill.id} />)
            ) : (
              <p className="final-skills-empty">Nenhuma perícia marcada.</p>
            )}
          </div>
          <DisplayStat
            label="Sab. Passiva"
            value={passiveWisdom}
            description={FIELD_DESCRIPTIONS.passiveWisdom}
            accent="slate"
            compact
          />
        </SheetPanel>

        <SheetPanel title="Combate & Vitalidade" accent="slate">
          <FinalHpHero hitPoints={character.hitPoints} hitDice={character.hitDice} />

          <details className="sheet-final__details" open>
            <summary>Salvaguardas & estados</summary>
            <FinalDeathSaves deathSaves={character.deathSaves} />
            <div className="sheet-final__status-row">
              <DisplayField label="Sombra" value={shadow.score} compact />
              <DisplayField label="Miserável" value={shadow.miserable} compact />
              <DisplayField label="Angustiado" value={shadow.anguished} compact />
            </div>
            {shadow.scars && (
              <DisplayField label="Cicatrizes" value={shadow.scars} compact className="display-field--wide" />
            )}
            <div className="sheet-final__status-row">
              <DisplayField label="Peso" value={encumbrance.carriedWeight} compact />
              <DisplayField label="Sobrec." value={encumbrance.encumbered} compact />
              <DisplayField label="Grave" value={encumbrance.heavilyEncumbered} compact />
            </div>
          </details>

          {filledAttacks.length > 0 && (
            <div className="sheet-final__attacks">
              <h4 className="mini-section__title">Ataques</h4>
              <table className="final-table">
                <thead>
                  <tr>
                    <th>Arma</th>
                    <th>Atq.</th>
                    <th>Dano</th>
                    <th>Alc.</th>
                  </tr>
                </thead>
                <tbody>
                  {filledAttacks.map((attack, i) => (
                    <tr key={i}>
                      <td>{attack.weapon}</td>
                      <td>{attack.atkBonus || '—'}</td>
                      <td>{attack.damage || '—'}</td>
                      <td>{attack.range || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="final-currency-row">
            <DisplayStat label="Cobre" value={currency.copper} compact />
            <DisplayStat label="Prata" value={currency.silver} compact />
            <DisplayStat label="Ouro" value={currency.gold} compact accent="gold" />
          </div>
        </SheetPanel>
      </div>

      <DisplaySection
        title="Equipamento & Traços"
        description={SECTION_DESCRIPTIONS.equipment}
        icon="🎒"
        collapsible
        defaultOpen
      >
        <div className="sheet-final__text-blocks">
          <DisplayText label="Proficiências" value={character.toolProficiencies} compact />
          <DisplayText label="Equipamento" value={character.equipment} compact />
          <DisplayText label="Traços e virtudes" value={character.featuresTraitsVirtues} compact />
          <DisplayText label="Recompensas" value={character.rewardsAndMagicalItems} compact />
        </div>
      </DisplaySection>

      <div className="sheet-final__story">
        <DisplaySection title="Comunidade" icon="🏛" collapsible defaultOpen>
          <div className="sheet-final__status-row">
            <DisplayField label="Comunidade" value={fellowship.fellowshipName} compact />
            <DisplayField label="Pontos" value={fellowship.fellowshipPoints} compact />
            <DisplayField label="Herdeiro" value={fellowship.heirName} compact />
          </div>
          <DisplayField label="Investimento" value={fellowship.investment} compact />
          <DisplayText label="Patronos" value={fellowship.patrons} compact />
        </DisplaySection>

        <DisplaySection title="Aparência" icon="👤" collapsible defaultOpen>
          <div className="sheet-final__appearance">
            <DisplayField label="Idade" value={appearance.age} compact />
            <DisplayField label="Altura" value={appearance.height} compact />
            <DisplayField label="Peso" value={appearance.weight} compact />
            <DisplayField label="Olhos" value={appearance.eyes} compact />
            <DisplayField label="Cabelo" value={appearance.hair} compact />
            <DisplayField label="Pele" value={appearance.skin} compact />
          </div>
          <DisplayText label="Notas" value={character.characterAppearanceNotes} compact />
        </DisplaySection>
      </div>

      {character.characterBackstory.trim() && (
        <DisplaySection title="História" icon="📜" collapsible defaultOpen>
          <DisplayText label="História do personagem" value={character.characterBackstory} compact />
        </DisplaySection>
      )}
    </div>
  );
}
