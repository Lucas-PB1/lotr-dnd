import { Button, Select } from 'flowbite-react';
import type { AbilityName } from '../../../shared/constants/gameConstants';
import { ABILITY_LABELS } from '../../../shared/constants/gameConstants';
import type { RewardSlotDefinition } from '../../../shared/data/levelRewardData';
import type { RewardSlotPick } from '../../../shared/data/rewardSlotUtils';
import {
  getVirtuesForCulture,
  SCHOLAR_CRAFTS,
} from '../../../shared/data/virtuesAndCraftsData';

interface RewardSlotPickerProps {
  slot: RewardSlotDefinition;
  pick: RewardSlotPick;
  cultureId: string | null;
  usedVirtueIds: string[];
  onChange: (pick: RewardSlotPick) => void;
}

export function RewardSlotPicker({
  slot,
  pick,
  cultureId,
  usedVirtueIds,
  onChange,
}: RewardSlotPickerProps) {
  const virtues = getVirtuesForCulture(cultureId);
  const canChooseCraft = slot.kind === 'craft' || slot.kind === 'virtue-or-craft';
  const canChooseVirtue = slot.kind === 'virtue' || slot.kind === 'virtue-or-craft';
  const rewardType =
    slot.kind === 'craft'
      ? 'craft'
      : slot.kind === 'virtue'
        ? 'virtue'
        : pick.rewardType;

  const selectedVirtue = virtues.find((v) => v.id === pick.virtueId);
  const selectedCraft = SCHOLAR_CRAFTS.find((c) => c.id === pick.craftId);

  const setType = (type: 'virtue' | 'craft') => {
    onChange({
      ...pick,
      rewardType: type,
      virtueId: type === 'virtue' ? pick.virtueId : null,
      craftId: type === 'craft' ? pick.craftId : null,
      virtueAbilityChoice: type === 'virtue' ? pick.virtueAbilityChoice : null,
    });
  };

  return (
    <div className="reward-slot rounded border border-amber-300/40 bg-white/30 p-3">
      <p className="mb-2 text-xs font-bold text-amber-900">{slot.labelPt}</p>

      {slot.kind === 'virtue-or-craft' && (
        <div className="mb-2 flex flex-wrap gap-1">
          <Button
            size="xs"
            color={rewardType === 'virtue' ? 'warning' : 'light'}
            onClick={() => setType('virtue')}
          >
            Virtude
          </Button>
          <Button
            size="xs"
            color={rewardType === 'craft' ? 'warning' : 'light'}
            onClick={() => setType('craft')}
          >
            Ofício
          </Button>
        </div>
      )}

      {canChooseVirtue && rewardType === 'virtue' && (
        <div className="space-y-2">
          <Select
            value={pick.virtueId ?? ''}
            onChange={(e) =>
              onChange({
                ...pick,
                rewardType: 'virtue',
                virtueId: e.target.value || null,
                virtueAbilityChoice: null,
              })
            }
          >
            <option value="">— Virtude —</option>
            <optgroup label="Comuns">
              {virtues
                .filter((v) => v.scopes.includes('common'))
                .map((v) => (
                  <option key={v.id} value={v.id} disabled={usedVirtueIds.includes(v.id)}>
                    {v.namePt}
                    {usedVirtueIds.includes(v.id) ? ' (já escolhida)' : ''}
                  </option>
                ))}
            </optgroup>
            {cultureId && (
              <optgroup label="Culturais">
                {virtues
                  .filter((v) => !v.scopes.includes('common'))
                  .map((v) => (
                    <option key={v.id} value={v.id} disabled={usedVirtueIds.includes(v.id)}>
                      {v.namePt}
                      {usedVirtueIds.includes(v.id) ? ' (já escolhida)' : ''}
                    </option>
                  ))}
              </optgroup>
            )}
          </Select>
          {selectedVirtue?.abilityChoice && (
            <Select
              value={pick.virtueAbilityChoice ?? ''}
              onChange={(e) =>
                onChange({
                  ...pick,
                  virtueAbilityChoice: (e.target.value as AbilityName) || null,
                })
              }
            >
              <option value="">— Atributo +1 —</option>
              {selectedVirtue.abilityChoice.map((a) => (
                <option key={a} value={a}>
                  {ABILITY_LABELS[a]}
                </option>
              ))}
            </Select>
          )}
          {selectedVirtue && (
            <p className="text-xs text-amber-900/60">{selectedVirtue.summaryPt}</p>
          )}
        </div>
      )}

      {canChooseCraft && rewardType === 'craft' && (
        <div className="space-y-2">
          <Select
            value={pick.craftId ?? ''}
            onChange={(e) =>
              onChange({
                ...pick,
                rewardType: 'craft',
                craftId: e.target.value || null,
              })
            }
          >
            <option value="">— Ofício —</option>
            {SCHOLAR_CRAFTS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.namePt}
              </option>
            ))}
          </Select>
          {selectedCraft && (
            <p className="text-xs text-amber-900/60">{selectedCraft.summaryPt}</p>
          )}
        </div>
      )}
    </div>
  );
}
