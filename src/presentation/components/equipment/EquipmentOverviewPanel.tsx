import { useMemo } from 'react';
import { AttackRollService } from '../../../domain/services/AttackRollService';
import { InventoryService } from '../../../domain/services/InventoryService';
import type { InventoryItem } from '../../../domain/value-objects/Item';
import { CATEGORY_LABELS, getItemDefinition } from '../../../shared/data/itemCatalog';
import { useCharacterSheet } from '../../context/CharacterSheetContext';

function itemLabel(item: InventoryItem): string {
  if (item.definitionId === 'custom') return item.notes ?? 'Item';
  return getItemDefinition(item.definitionId)?.namePt ?? item.definitionId;
}

function armorNote(item: InventoryItem): string | null {
  const def = getItemDefinition(item.definitionId);
  if (!def) return null;
  if (def.category === 'armor' && def.baseAc != null) {
    return `CA ${def.baseAc} + Des`;
  }
  if (def.category === 'shield') return '+2 CA';
  return def.description ?? null;
}

interface EquipmentOverviewPanelProps {
  /** Versão compacta para ficha final / impressão */
  compact?: boolean;
}

export function EquipmentOverviewPanel({ compact = false }: EquipmentOverviewPanelProps) {
  const { character } = useCharacterSheet();
  const inventory = character.inventory ?? [];

  const mainHand = InventoryService.getEquipped(inventory, 'mainHand');
  const offHand = InventoryService.getEquipped(inventory, 'offHand');
  const armor = InventoryService.getEquipped(inventory, 'armor');
  const carried = inventory.filter((i) => !i.equipped);
  const totalWeight = InventoryService.totalWeight(inventory);

  const weaponAttacks = useMemo(
    () => AttackRollService.getEquippedWeaponAttacks(character),
    [character],
  );

  const attackByInstance = useMemo(
    () => new Map(weaponAttacks.map((a) => [a.instanceId, a])),
    [weaponAttacks],
  );

  if (inventory.length === 0) {
    return (
      <div className="equip-overview equip-overview--empty">
        <p className="equip-overview__hint">
          {character.equipment.trim() || 'Nenhum item no inventário. Use a aba Inventário ou complete a criação.'}
        </p>
      </div>
    );
  }

  const slots = [
    { label: 'Mão principal', item: mainHand },
    { label: 'Mão secundária', item: offHand },
    { label: 'Armadura', item: armor },
  ].filter((s) => s.item);

  return (
    <div className={`equip-overview${compact ? ' equip-overview--compact' : ''}`}>
      <div className="equip-overview__head">
        <h3 className="equip-overview__title">Equipado</h3>
        <span className="equip-overview__weight">{totalWeight} lb</span>
      </div>

      {slots.length === 0 ? (
        <p className="equip-overview__hint">Nenhum item equipado.</p>
      ) : (
        <ul className="equip-overview__slots">
          {slots.map(({ label, item }) => {
            if (!item) return null;
            const def = getItemDefinition(item.definitionId);
            const attack = attackByInstance.get(item.instanceId);
            const armor = armorNote(item);

            return (
              <li key={item.instanceId} className="equip-overview__slot">
                <div className="equip-overview__slot-head">
                  <span className="equip-overview__slot-label">{label}</span>
                  <span className="equip-overview__slot-name">{itemLabel(item)}</span>
                </div>
                {attack && (
                  <div className="equip-overview__combat">
                    <span className="equip-overview__roll">
                      <span className="equip-overview__roll-k">Atq</span>
                      {attack.attackFormula}
                    </span>
                    <span className="equip-overview__roll">
                      <span className="equip-overview__roll-k">Dano</span>
                      {attack.damageFormula}
                    </span>
                    {attack.range && (
                      <span className="equip-overview__meta">Alcance: {attack.range}</span>
                    )}
                    {!attack.proficient && (
                      <span className="equip-overview__warn">sem proficiência</span>
                    )}
                    {attack.breakdown.magicalNotes.length > 0 && (
                      <span className="equip-overview__magical">
                        {attack.breakdown.magicalNotes.join(' · ')}
                      </span>
                    )}
                    {attack.breakdown.virtueNotes.length > 0 && (
                      <span className="equip-overview__virtue">
                        {attack.breakdown.virtueNotes.join(' · ')}
                      </span>
                    )}
                  </div>
                )}
                {!attack && armor && (
                  <p className="equip-overview__meta">{armor}</p>
                )}
                {!attack && def && !armor && (
                  <p className="equip-overview__meta">
                    {[CATEGORY_LABELS[def.category], def.damage, def.weight ? `${def.weight} lb` : '']
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {carried.length > 0 && (
        <div className="equip-overview__carried">
          <h4 className="equip-overview__carried-title">
            Inventário ({carried.length})
          </h4>
          <ul className="equip-overview__item-list">
            {carried.map((item) => {
              const def = getItemDefinition(item.definitionId);
              return (
                <li key={item.instanceId} className="equip-overview__item">
                  <span className="equip-overview__item-name">
                    {itemLabel(item)}
                    {item.quantity > 1 ? ` ×${item.quantity}` : ''}
                  </span>
                  {def?.damage && (
                    <span className="equip-overview__item-stat">{def.damage}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {!compact && (
        <p className="equip-overview__footnote">
          Equipe armas na aba <strong>Inventário</strong> para ver ataque e dano aqui.
        </p>
      )}
    </div>
  );
}
