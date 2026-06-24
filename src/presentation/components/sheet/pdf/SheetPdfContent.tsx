import {
  ABILITY_LABELS,
  ABILITY_NAMES,
  LOTR_SKILLS,
  type AbilityName,
} from '../../../../shared/constants/gameConstants';
import { Character } from '../../../../domain/entities/Character';
import type { CharacterProps } from '../../../../domain/entities/Character';
import { AttackRollService } from '../../../../domain/services/AttackRollService';
import { CharacterCalculator } from '../../../../domain/services/CharacterCalculator';
import { InventoryService } from '../../../../domain/services/InventoryService';
import { getItemDefinition } from '../../../../shared/data/itemCatalog';

function formatMod(n: number) {
  return n >= 0 ? `+${n}` : `${n}`;
}

interface SheetPdfContentProps {
  character: CharacterProps;
}

export function SheetPdfContent({ character }: SheetPdfContentProps) {
  const domain = new Character(character);
  const weaponAttacks = AttackRollService.getEquippedWeaponAttacks(character);
  const inventory = character.inventory ?? [];
  const passiveWisdom = CharacterCalculator.passiveWisdom(domain);

  const activeSkills = LOTR_SKILLS.filter((s) => {
    const st = character.skills[s.id];
    return st.proficient || st.expertise;
  });

  const carried = inventory.filter((i) => !i.equipped);

  return (
    <article className="st-pdf-doc">
      <header className="st-pdf-doc__hero">
        <p className="st-pdf-doc__eyebrow">O Senhor dos Anéis RPG — Ficha de personagem</p>
        <h1 className="st-pdf-doc__name">{character.name.trim() || 'Herói sem nome'}</h1>
        <p className="st-pdf-doc__subtitle">
          {[character.callingAndLevel, character.culture].filter(Boolean).join(' · ') || '—'}
        </p>
        <dl className="st-pdf-doc__meta">
          {character.playerName.trim() ? (
            <>
              <dt>Jogador</dt>
              <dd>{character.playerName}</dd>
            </>
          ) : null}
          <dt>XP</dt>
          <dd>{character.experiencePoints}</dd>
          {character.distinctiveFeatures.trim() ? (
            <>
              <dt>Traços</dt>
              <dd>{character.distinctiveFeatures}</dd>
            </>
          ) : null}
          {character.shadowPath.trim() ? (
            <>
              <dt>Caminho da Sombra</dt>
              <dd>{character.shadowPath}</dd>
            </>
          ) : null}
        </dl>
      </header>

      <section className="st-pdf-doc__section">
        <h2>Combate & vitalidade</h2>
        <div className="st-pdf-doc__combat-row">
          <div className="st-pdf-doc__stat st-pdf-doc__stat--hp">
            <span className="st-pdf-doc__stat-label">PV</span>
            <span className="st-pdf-doc__stat-value">
              {character.hitPoints.current}
              {character.hitPoints.temporary > 0 ? ` (+${character.hitPoints.temporary})` : ''} /{' '}
              {character.hitPoints.maximum}
            </span>
          </div>
          <div className="st-pdf-doc__stat">
            <span className="st-pdf-doc__stat-label">CA</span>
            <span className="st-pdf-doc__stat-value">{character.armorClass}</span>
          </div>
          <div className="st-pdf-doc__stat">
            <span className="st-pdf-doc__stat-label">Iniciativa</span>
            <span className="st-pdf-doc__stat-value">{formatMod(character.initiative)}</span>
          </div>
          <div className="st-pdf-doc__stat">
            <span className="st-pdf-doc__stat-label">Desloc.</span>
            <span className="st-pdf-doc__stat-value">{character.speed} m</span>
          </div>
          <div className="st-pdf-doc__stat">
            <span className="st-pdf-doc__stat-label">Prof.</span>
            <span className="st-pdf-doc__stat-value">{formatMod(character.proficiencyBonus)}</span>
          </div>
          <div className="st-pdf-doc__stat">
            <span className="st-pdf-doc__stat-label">Inspiração</span>
            <span className="st-pdf-doc__stat-value">{character.inspiration ? 'Sim' : 'Não'}</span>
          </div>
        </div>
        <p className="st-pdf-doc__line">
          <strong>Dados de vida:</strong> {character.hitDice || '—'} ·{' '}
          <strong>Salvaguardas:</strong> {character.deathSaves.successes} sucessos /{' '}
          {character.deathSaves.failures} falhas
        </p>
      </section>

      <section className="st-pdf-doc__section">
        <h2>Atributos</h2>
        <div className="st-pdf-doc__abilities">
          {ABILITY_NAMES.map((ability) => {
            const score = CharacterCalculator.abilityScores(domain).get(ability);
            return (
              <div key={ability} className="st-pdf-doc__ability">
                <span className="st-pdf-doc__ability-label">{ABILITY_LABELS[ability]}</span>
                <span className="st-pdf-doc__ability-score">{score.value}</span>
                <span className="st-pdf-doc__ability-mod">{score.formattedModifier()}</span>
              </div>
            );
          })}
        </div>
      </section>

      <div className="st-pdf-doc__columns">
        <section className="st-pdf-doc__section">
          <h2>Resistências</h2>
          <ul className="st-pdf-doc__list">
            {ABILITY_NAMES.map((ability: AbilityName) => {
              const save = CharacterCalculator.savingThrowModifier(domain, ability);
              const prof = character.savingThrows[ability].proficient;
              return (
                <li key={ability}>
                  {ABILITY_LABELS[ability]}
                  {prof ? ' ●' : ''} — {save.formattedModifier()}
                </li>
              );
            })}
          </ul>
        </section>

        <section className="st-pdf-doc__section">
          <h2>Perícias ativas</h2>
          {activeSkills.length === 0 ? (
            <p className="st-pdf-doc__muted">Nenhuma perícia marcada.</p>
          ) : (
            <ul className="st-pdf-doc__list">
              {activeSkills.map((skill) => {
                const mod = CharacterCalculator.skillModifier(domain, skill.id);
                const st = character.skills[skill.id];
                return (
                  <li key={skill.id}>
                    {skill.name}
                    {st.expertise ? ' ◆' : st.proficient ? ' ●' : ''} — {mod.formattedModifier()}
                  </li>
                );
              })}
            </ul>
          )}
          <p className="st-pdf-doc__line">
            <strong>Sabedoria passiva:</strong> {passiveWisdom}
          </p>
        </section>
      </div>

      {weaponAttacks.length > 0 ? (
        <section className="st-pdf-doc__section">
          <h2>Ataques</h2>
          <table className="st-pdf-doc__table">
            <thead>
              <tr>
                <th>Arma</th>
                <th>Ataque</th>
                <th>Dano</th>
              </tr>
            </thead>
            <tbody>
              {weaponAttacks.map((a) => (
                <tr key={a.instanceId}>
                  <td>{a.weaponName}</td>
                  <td>{a.attackFormula}</td>
                  <td>{a.damageFormula}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : null}

      {inventory.length > 0 ? (
        <section className="st-pdf-doc__section">
          <h2>Equipamento</h2>
          <p className="st-pdf-doc__line">
            <strong>Carga:</strong> {InventoryService.totalWeight(inventory)} lb
          </p>
          <ul className="st-pdf-doc__list st-pdf-doc__list--equip">
            {inventory
              .filter((i) => i.equipped)
              .map((item) => (
                <li key={item.instanceId}>
                  <strong>
                    {item.definitionId === 'custom'
                      ? (item.notes ?? 'Item')
                      : (getItemDefinition(item.definitionId)?.namePt ?? item.definitionId)}
                  </strong>{' '}
                  (equipado)
                </li>
              ))}
            {carried.map((item) => (
              <li key={item.instanceId}>
                {item.definitionId === 'custom'
                  ? (item.notes ?? 'Item')
                  : (getItemDefinition(item.definitionId)?.namePt ?? item.definitionId)}
                {item.quantity > 1 ? ` ×${item.quantity}` : ''}
              </li>
            ))}
          </ul>
          <p className="st-pdf-doc__line">
            <strong>Moedas:</strong> {character.currency.gold} ouro, {character.currency.silver}{' '}
            prata, {character.currency.copper} cobre
          </p>
        </section>
      ) : null}

      <section className="st-pdf-doc__section">
        <h2>Sombra</h2>
        <p className="st-pdf-doc__line">
          <strong>Pontuação:</strong> {character.shadow.score} ·{' '}
          <strong>Miserável:</strong> {character.shadow.miserable ? 'Sim' : 'Não'} ·{' '}
          <strong>Angustiado:</strong> {character.shadow.anguished ? 'Sim' : 'Não'}
        </p>
        {character.shadow.scars.trim() ? (
          <p className="st-pdf-doc__paragraph">{character.shadow.scars}</p>
        ) : null}
      </section>

      {(character.fellowship.fellowshipName.trim() || character.fellowship.patrons.trim()) && (
        <section className="st-pdf-doc__section">
          <h2>Comunidade</h2>
          {character.fellowship.fellowshipName.trim() ? (
            <p className="st-pdf-doc__line">
              <strong>Comunidade:</strong> {character.fellowship.fellowshipName}
            </p>
          ) : null}
          {character.fellowship.patrons.trim() ? (
            <p className="st-pdf-doc__paragraph">{character.fellowship.patrons}</p>
          ) : null}
        </section>
      )}

      {character.characterBackstory.trim() ? (
        <section className="st-pdf-doc__section">
          <h2>História</h2>
          <p className="st-pdf-doc__paragraph">{character.characterBackstory}</p>
        </section>
      ) : null}

      <footer className="st-pdf-doc__footer">
        <p>The One Ring™ · Free League Publishing — ficha gerada digitalmente</p>
      </footer>
    </article>
  );
}
