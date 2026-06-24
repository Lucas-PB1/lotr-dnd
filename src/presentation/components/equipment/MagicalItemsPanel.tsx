import { useMemo, useState } from 'react';
import { MAGICAL_UI } from '../../../shared/constants/appLabels';
import { MagicalItemService } from '../../../domain/services/MagicalItemService';
import { createCustomMagicalItem } from '../../../domain/value-objects/MagicalItem';
import {
  getMagicalCatalogByGroup,
  getMagicalItemDefinition,
  MAGICAL_CATALOG_GROUPS,
  MAGICAL_TIER_LABELS,
} from '../../../shared/data/magicalItemCatalog';
import { useCharacterSheet } from '../../context/CharacterSheetContext';

function tierLabel(tier: string): string {
  return MAGICAL_TIER_LABELS[tier as keyof typeof MAGICAL_TIER_LABELS] ?? tier;
}

export function MagicalItemsPanel() {
  const { character, updateCharacter } = useCharacterSheet();
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [catalogTab, setCatalogTab] = useState(MAGICAL_CATALOG_GROUPS[0]?.id ?? 'rewards');
  const [customName, setCustomName] = useState('');

  const owned = character.ownedMagicalItems ?? [];
  const bonuses = useMemo(() => MagicalItemService.getEquippedBonuses(character), [character]);
  const reminders = useMemo(() => MagicalItemService.getReminders(character), [character]);
  const linkOptions = useMemo(
    () => MagicalItemService.getLinkableInventoryOptions(character),
    [character],
  );

  const catalogItems = useMemo(
    () => getMagicalCatalogByGroup(catalogTab),
    [catalogTab],
  );

  const patchItems = (next: typeof owned) => {
    updateCharacter({ ownedMagicalItems: next });
  };

  const addFromCatalog = (definitionId: string) => {
    updateCharacter(MagicalItemService.addFromCatalog(character, definitionId));
    setCatalogOpen(false);
  };

  const addCustom = () => {
    const name = customName.trim();
    if (!name) return;
    patchItems([...owned, createCustomMagicalItem(name)]);
    setCustomName('');
  };

  const updateOwned = (instanceId: string, patch: Parameters<typeof MagicalItemService.updateItem>[2]) => {
    updateCharacter(MagicalItemService.updateItem(character, instanceId, patch));
  };

  const removeOwned = (instanceId: string) => {
    updateCharacter(MagicalItemService.removeItem(character, instanceId));
  };

  const toggleEquip = (instanceId: string) => {
    updateCharacter(MagicalItemService.toggleEquip(character, instanceId));
  };

  const toggleQuality = (instanceId: string, qualityId: string, allIds: string[]) => {
    const item = owned.find((i) => i.instanceId === instanceId);
    if (!item) return;
    const current = item.activeQualityIds ?? allIds;
    const next = current.includes(qualityId)
      ? current.filter((id) => id !== qualityId)
      : [...current, qualityId];
    updateOwned(instanceId, { activeQualityIds: next });
  };

  return (
    <div className="magical-hub">
      <div className="magical-hub__main">
        <header className="magical-hub__head">
          <div>
            <h3 className="magical-hub__title">{MAGICAL_UI.panelTitle}</h3>
            <p className="magical-hub__sub">{MAGICAL_UI.panelSubtitle}</p>
          </div>
          {(bonuses.acBonus > 0 || bonuses.attackBonus > 0 || bonuses.damageBonus > 0) && (
            <div className="magical-hub__bonuses">
              {bonuses.acBonus > 0 && <span>CA {bonuses.acBonus > 0 ? `+${bonuses.acBonus}` : ''}</span>}
              {bonuses.attackBonus > 0 && <span>Atq +{bonuses.attackBonus}</span>}
              {bonuses.damageBonus > 0 && <span>Dano +{bonuses.damageBonus}</span>}
            </div>
          )}
        </header>

        <div className="magical-hub__actions">
          <button
            type="button"
            className="lore-action lore-action--primary"
            onClick={() => setCatalogOpen((v) => !v)}
          >
            {catalogOpen ? 'Fechar lista' : '+ Adicionar do livro'}
          </button>
          <div className="magical-hub__custom">
            <input
              type="text"
              className="lore-field__input"
              placeholder="Item personalizado…"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCustom()}
            />
            <button type="button" className="lore-action lore-action--ghost" onClick={addCustom}>
              Adicionar
            </button>
          </div>
        </div>

        {owned.length === 0 ? (
          <p className="magical-hub__empty">
            Nenhum item mágico registrado. Use o catálogo ou adicione um nome livre.
          </p>
        ) : (
          <ul className="magical-hub__list">
            {owned.map((item) => {
              const def = getMagicalItemDefinition(item.definitionId);
              const name =
                item.definitionId === 'custom-magical'
                  ? (item.notes ?? 'Item mágico')
                  : (def?.namePt ?? item.definitionId);

              return (
                <li key={item.instanceId} className="magical-card">
                  <div className="magical-card__head">
                    <div>
                      <span className="magical-card__name">{name}</span>
                      {def && (
                        <span className="magical-card__tier">{tierLabel(def.tier)}</span>
                      )}
                    </div>
                    <div className="magical-card__toggles">
                      <label className="magical-card__toggle">
                        <input
                          type="checkbox"
                          checked={item.equipped}
                          onChange={() => toggleEquip(item.instanceId)}
                        />
                        Equipado
                      </label>
                      <label className="magical-card__toggle">
                        <input
                          type="checkbox"
                          checked={item.identified}
                          onChange={() =>
                            updateOwned(item.instanceId, { identified: !item.identified })
                          }
                        />
                        Identificado
                      </label>
                      <button
                        type="button"
                        className="magical-card__remove"
                        onClick={() => removeOwned(item.instanceId)}
                        aria-label="Remover"
                      >
                        ×
                      </button>
                    </div>
                  </div>

                  {def?.identifyDc && (
                    <p className="magical-card__dc">Identificar (Rune-craft): CD {def.identifyDc}</p>
                  )}

                  {def?.descriptionPt && (
                    <p className="magical-card__desc">{def.descriptionPt}</p>
                  )}

                  {def?.effects && def.effects.length > 0 && (
                    <ul className="magical-card__effects">
                      {def.effects.map((fx, i) => (
                        <li
                          key={i}
                          className={`magical-card__fx magical-card__fx--${fx.kind}`}
                        >
                          {fx.textPt}
                        </li>
                      ))}
                    </ul>
                  )}

                  {def?.qualities && def.qualities.length > 0 && (
                    <div className="magical-card__qualities">
                      <span className="magical-card__qualities-k">Qualidades</span>
                      <div className="magical-card__quality-row">
                        {def.qualities.map((q) => {
                          const active = (item.activeQualityIds ?? def.qualities!.map((x) => x.id)).includes(
                            q.id,
                          );
                          return (
                            <button
                              key={q.id}
                              type="button"
                              className={`lore-chip-row__chip${active ? ' lore-chip-row__chip--selected' : ''}`}
                              onClick={() =>
                                toggleQuality(
                                  item.instanceId,
                                  q.id,
                                  def.qualities!.map((x) => x.id),
                                )
                              }
                            >
                              {q.order}. {q.namePt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {linkOptions.length > 0 && item.definitionId !== 'custom-magical' && (
                    <label className="magical-card__link">
                      <span>Vincular ao inventário</span>
                      <select
                        className="magical-card__select"
                        value={item.linkedInventoryId ?? ''}
                        onChange={(e) =>
                          updateOwned(item.instanceId, {
                            linkedInventoryId: e.target.value || undefined,
                          })
                        }
                      >
                        <option value="">— nenhum —</option>
                        {linkOptions.map((opt) => (
                          <option key={opt.instanceId} value={opt.instanceId}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {reminders.length > 0 && (
          <section className="magical-hub__reminders" aria-label="Lembretes de efeitos">
            <h4 className="magical-hub__reminders-title">Lembretes na mesa</h4>
            <ul className="magical-hub__reminder-list">
              {reminders.map((r, i) => (
                <li key={`${r.instanceId}-${i}`} className="magical-hub__reminder">
                  <strong>{r.itemName}</strong> — {r.text}
                </li>
              ))}
            </ul>
          </section>
        )}

        {character.rewardsAndMagicalItems.trim() && (
          <details className="magical-hub__legacy">
            <summary>{MAGICAL_UI.legacyNotes}</summary>
            <p>{character.rewardsAndMagicalItems}</p>
          </details>
        )}
      </div>

      {catalogOpen && (
        <aside className="magical-hub__catalog story-hub__aside story-hub__aside--open">
          <div className="lore-inspire lore-inspire--compact">
            <header className="lore-inspire__head">
              <h4 className="lore-inspire__title">{MAGICAL_UI.catalogTitle}</h4>
              <span className="lore-inspire__hint">{MAGICAL_UI.catalogHint}</span>
            </header>

            <div className="lore-inspire__tabs" role="tablist">
              {MAGICAL_CATALOG_GROUPS.map((group) => (
                <button
                  key={group.id}
                  type="button"
                  role="tab"
                  aria-selected={catalogTab === group.id}
                  className={`lore-inspire__tab${catalogTab === group.id ? ' lore-inspire__tab--active' : ''}`}
                  onClick={() => setCatalogTab(group.id)}
                >
                  <span className="lore-inspire__tab-icon" aria-hidden>
                    {group.icon}
                  </span>
                  <span className="lore-inspire__tab-label">{group.title}</span>
                </button>
              ))}
            </div>

            <div className="lore-inspire__grid" role="list">
              {catalogItems.map((def) => (
                <button
                  key={def.id}
                  type="button"
                  className="lore-inspire__card"
                  onClick={() => addFromCatalog(def.id)}
                >
                  <span className="lore-inspire__card-top">
                    <span className="lore-inspire__card-label">{def.namePt}</span>
                    <span className="lore-inspire__card-add" aria-hidden>
                      +
                    </span>
                  </span>
                  <span className="lore-inspire__card-preview">
                    {def.descriptionPt ?? tierLabel(def.tier)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
