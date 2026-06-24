import { getCreationProgress } from '../../../../application/creation/creationProgress';
import { CREATION_UI } from '../../../../shared/constants/creationLabels';
import { AbilityBonusPreview } from '../AbilityBonusPreview';
import { CallingSkillsStep } from '../steps/CallingSkillsStep';
import { CultureOriginStep } from '../steps/CultureOriginStep';
import { EquipmentStep } from '../steps/EquipmentStep';
import { RewardsStep } from '../steps/RewardsStep';
import { useCharacterCreation } from '../../../hooks/useCharacterCreation';
import { CreationManuscriptSection } from './CreationManuscriptSection';
import { CreationProgressHeader } from './CreationProgressHeader';
import {
  CREATION_SECTION_NUMERALS,
  isCreationSectionComplete,
} from './creationSectionStatus';
import { getCreationSectionSummary } from './creationSectionSummaries';

export function CreationStitchView() {
  const {
    choices,
    culture,
    background,
    calling,
    rewardSlots,
    callingEquipment,
    bonusPreview,
    baseAbilities,
    setChoice,
    updateRewardPick,
    updateEquipmentOption,
    updateStartingItemChoice,
  } = useCharacterCreation();

  const progress = getCreationProgress(choices);
  const percent = progress.total > 0 ? Math.round((progress.done / progress.total) * 100) : 0;

  const sections = [
    {
      id: 'culture' as const,
      title: CREATION_UI.sectionCulture,
      content: (
        <CultureOriginStep
          choices={choices}
          culture={culture}
          background={background}
          calling={calling}
          onSetChoice={setChoice}
        />
      ),
    },
    {
      id: 'skills' as const,
      title: CREATION_UI.sectionSkills,
      content: (
        <CallingSkillsStep choices={choices} calling={calling} onSetChoice={setChoice} />
      ),
    },
    {
      id: 'rewards' as const,
      title: CREATION_UI.sectionRewards,
      content: (
        <RewardsStep
          choices={choices}
          rewardSlots={rewardSlots}
          onUpdateRewardPick={updateRewardPick}
        />
      ),
    },
    {
      id: 'equipment' as const,
      title: CREATION_UI.sectionEquipment,
      content: (
        <EquipmentStep
          choices={choices}
          callingEquipment={callingEquipment}
          baseAbilities={baseAbilities}
          abilityBonusSources={bonusPreview}
          onSetChoice={setChoice}
          onUpdateEquipmentOption={updateEquipmentOption}
          onUpdateStartingItemChoice={updateStartingItemChoice}
        />
      ),
    },
  ];

  return (
    <div className="st-creation">
      <CreationProgressHeader percent={percent} label={progress.label} />

      <div className="st-creation-flow">
        {sections.map((section, index) => (
          <CreationManuscriptSection
            key={section.id}
            numeral={CREATION_SECTION_NUMERALS[index]}
            title={section.title}
            complete={isCreationSectionComplete(section.id, choices)}
            summary={getCreationSectionSummary(
              section.id,
              choices,
              culture,
              calling,
              rewardSlots,
            )}
            defaultOpen={false}
          >
            {section.content}
          </CreationManuscriptSection>
        ))}
      </div>

      <AbilityBonusPreview sources={bonusPreview} variant="stitch" />
    </div>
  );
}
