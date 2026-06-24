import { LOTR_SKILLS } from '../../../shared/constants/gameConstants';

export function skillOptions(ids: string[]) {
  return ids.map((id) => ({
    id,
    label: LOTR_SKILLS.find((s) => s.id === id)?.name ?? id,
  }));
}
