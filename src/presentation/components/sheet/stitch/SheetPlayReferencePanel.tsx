import type { ReactNode } from 'react';
import { SHEET_PLAY_UI } from '../../../../shared/constants/sheetLabels';
import { getMagicalItemDefinition, MAGICAL_TIER_LABELS } from '../../../../shared/data/magicalItemCatalog';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';
import { EquipmentOverviewPanel } from '../../equipment/EquipmentOverviewPanel';
import { TraitsVirtuesPanel } from '../../equipment/TraitsVirtuesPanel';

function ReferenceSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details className="st-sheet-ref" open={defaultOpen}>
      <summary className="st-sheet-ref__summary">{title}</summary>
      <div className="st-sheet-ref__body">{children}</div>
    </details>
  );
}

export function SheetPlayReferencePanel() {
  const { character } = useCharacterSheet();
  const { fellowship, appearance } = character;
  const magicalItems = character.ownedMagicalItems ?? [];

  return (
    <section className="st-sheet-reference" aria-label={SHEET_PLAY_UI.reference}>
      <header className="st-sheet-reference__head">
        <h4 className="st-sheet-block__title">{SHEET_PLAY_UI.reference}</h4>
        <p className="st-sheet-reference__hint">{SHEET_PLAY_UI.referenceHint}</p>
      </header>

      <ReferenceSection title={SHEET_PLAY_UI.equipment} defaultOpen>
        <EquipmentOverviewPanel compact />
        {magicalItems.length > 0 ? (
          <ul className="st-sheet-magical">
            {magicalItems.map((item) => {
              const def = getMagicalItemDefinition(item.definitionId);
              const name =
                item.definitionId === 'custom-magical'
                  ? (item.notes ?? 'Item mágico')
                  : (def?.namePt ?? item.definitionId);
              return (
                <li key={item.instanceId} className="st-sheet-magical__item">
                  <strong>{name}</strong>
                  {def ? <span>{MAGICAL_TIER_LABELS[def.tier]}</span> : null}
                  {item.equipped ? <span className="st-sheet-magical__badge">equipado</span> : null}
                </li>
              );
            })}
          </ul>
        ) : null}
      </ReferenceSection>

      <ReferenceSection title={SHEET_PLAY_UI.virtues}>
        <TraitsVirtuesPanel compact />
      </ReferenceSection>

      {(fellowship.fellowshipName.trim() || fellowship.patrons.trim()) && (
        <ReferenceSection title={SHEET_PLAY_UI.fellowship}>
          <dl className="st-sheet-dl">
            {fellowship.fellowshipName.trim() ? (
              <>
                <dt>Comunidade</dt>
                <dd>{fellowship.fellowshipName}</dd>
              </>
            ) : null}
            {fellowship.patrons.trim() ? (
              <>
                <dt>Patronos</dt>
                <dd>{fellowship.patrons}</dd>
              </>
            ) : null}
            {fellowship.heirName.trim() ? (
              <>
                <dt>Herdeiro</dt>
                <dd>{fellowship.heirName}</dd>
              </>
            ) : null}
          </dl>
        </ReferenceSection>
      )}

      {(appearance.age.trim() || appearance.hair.trim() || character.characterAppearanceNotes.trim()) && (
        <ReferenceSection title={SHEET_PLAY_UI.appearance}>
          <dl className="st-sheet-dl st-sheet-dl--grid">
            {appearance.age.trim() ? (
              <>
                <dt>Idade</dt>
                <dd>{appearance.age}</dd>
              </>
            ) : null}
            {appearance.hair.trim() ? (
              <>
                <dt>Cabelo</dt>
                <dd>{appearance.hair}</dd>
              </>
            ) : null}
            {appearance.eyes.trim() ? (
              <>
                <dt>Olhos</dt>
                <dd>{appearance.eyes}</dd>
              </>
            ) : null}
          </dl>
          {character.characterAppearanceNotes.trim() ? (
            <p className="st-sheet-ref__text">{character.characterAppearanceNotes}</p>
          ) : null}
        </ReferenceSection>
      )}

      {character.characterBackstory.trim() ? (
        <ReferenceSection title={SHEET_PLAY_UI.story}>
          <p className="st-sheet-ref__text">{character.characterBackstory}</p>
        </ReferenceSection>
      ) : null}
    </section>
  );
}
