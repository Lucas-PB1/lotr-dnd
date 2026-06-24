import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
  Badge,
} from 'flowbite-react';
import { AbilityBonusPreview } from '../creation/AbilityBonusPreview';
import { CallingSkillsStep } from '../creation/steps/CallingSkillsStep';
import { CultureOriginStep } from '../creation/steps/CultureOriginStep';
import { EquipmentStep } from '../creation/steps/EquipmentStep';
import { RewardsStep } from '../creation/steps/RewardsStep';
import { useCharacterCreation } from '../../hooks/useCharacterCreation';

export function CharacterCreationSection() {
  const {
    choices,
    culture,
    background,
    calling,
    rewardSlots,
    callingEquipment,
    bonusPreview,
    setChoice,
    updateRewardPick,
    updateEquipmentOption,
  } = useCharacterCreation();

  return (
    <div className="creation-panel space-y-4">
      <div className="creation-panel__intro">
        <p className="text-sm text-amber-950">
          Criação oficial (Cap. 3): cultura, antecedente, chamado, virtudes/ofícios por nível e
          equipamento inicial automático.
        </p>
        <Badge color="info" size="sm">
          Regras: Core Rulebook p. 45–70
        </Badge>
      </div>

      <Accordion collapseAll className="creation-accordion border border-amber-300/40">
        <AccordionPanel>
          <AccordionTitle className="text-sm font-semibold text-amber-950">
            1. Cultura e origem
          </AccordionTitle>
          <AccordionContent>
            <CultureOriginStep
              choices={choices}
              culture={culture}
              background={background}
              calling={calling}
              onSetChoice={setChoice}
            />
          </AccordionContent>
        </AccordionPanel>

        <AccordionPanel>
          <AccordionTitle className="text-sm font-semibold text-amber-950">
            2. Chamado e perícias
          </AccordionTitle>
          <AccordionContent>
            <CallingSkillsStep choices={choices} calling={calling} onSetChoice={setChoice} />
          </AccordionContent>
        </AccordionPanel>

        <AccordionPanel>
          <AccordionTitle className="text-sm font-semibold text-amber-950">
            3. Virtudes e ofícios
          </AccordionTitle>
          <AccordionContent>
            <RewardsStep
              choices={choices}
              rewardSlots={rewardSlots}
              onUpdateRewardPick={updateRewardPick}
            />
          </AccordionContent>
        </AccordionPanel>

        <AccordionPanel>
          <AccordionTitle className="text-sm font-semibold text-amber-950">
            4. Equipamento inicial
          </AccordionTitle>
          <AccordionContent>
            <EquipmentStep
              choices={choices}
              callingEquipment={callingEquipment}
              onSetChoice={setChoice}
              onUpdateEquipmentOption={updateEquipmentOption}
            />
          </AccordionContent>
        </AccordionPanel>
      </Accordion>

      <AbilityBonusPreview sources={bonusPreview} />
    </div>
  );
}
