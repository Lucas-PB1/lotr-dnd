import { SECTION_DESCRIPTIONS } from '../../../shared/constants/sheetFieldDescriptions';
import { InventorySection } from '../inventory/InventorySection';
import { CurrencySection } from '../sections/combat/CurrencySection';
import { SheetPanel } from './SheetPanel';

export function SheetInventoryTab() {
  return (
    <div className="sheet-inventory-tab">
      <SheetPanel
        title="Inventário"
        description={SECTION_DESCRIPTIONS.equipment}
        accent="gold"
      >
        <div className="sheet-inventory-tab__wallet">
          <CurrencySection />
        </div>
        <InventorySection />
      </SheetPanel>
    </div>
  );
}
