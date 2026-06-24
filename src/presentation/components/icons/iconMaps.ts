import type { ComponentType, SVGProps } from 'react';
import {
  ArchiveBoxIcon,
  ArrowDownCircleIcon,
  ArrowRightIcon,
  ArrowUpCircleIcon,
  BanknotesIcon,
  BeakerIcon,
  BoltIcon,
  BookOpenIcon,
  BuildingStorefrontIcon,
  CakeIcon,
  CircleStackIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  GiftIcon,
  MagnifyingGlassIcon,
  MapIcon,
  PencilSquareIcon,
  QueueListIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  ShoppingBagIcon,
  SparklesIcon,
  StarIcon,
  TrashIcon,
  WalletIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import {
  ArchiveBoxIcon as ArchiveBoxIconSolid,
  BoltIcon as BoltIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  BuildingStorefrontIcon as BuildingStorefrontIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
  GiftIcon as GiftIconSolid,
  MapIcon as MapIconSolid,
  ShieldCheckIcon as ShieldCheckIconSolid,
  ShoppingBagIcon as ShoppingBagIconSolid,
  SparklesIcon as SparklesIconSolid,
  StarIcon as StarIconSolid,
} from '@heroicons/react/24/solid';
import type { ItemDefinition } from '../../../domain/value-objects/Item';
import type { SheetTabId } from '../layout/shell/sheetTabTypes';

export type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type IconPair = {
  outline: HeroIcon;
  solid?: HeroIcon;
};

export const SHEET_TAB_ICONS: Record<SheetTabId, IconPair> = {
  creation: { outline: SparklesIcon, solid: SparklesIconSolid },
  adventure: { outline: MapIcon, solid: MapIconSolid },
  inventory: { outline: ShoppingBagIcon, solid: ShoppingBagIconSolid },
  shop: { outline: BuildingStorefrontIcon, solid: BuildingStorefrontIconSolid },
  summary: { outline: DocumentTextIcon, solid: DocumentTextIconSolid },
  story: { outline: BookOpenIcon, solid: BookOpenIconSolid },
};

export const WALLET_COIN_ICONS = {
  gold: CurrencyDollarIcon,
  silver: BanknotesIcon,
  copper: CircleStackIcon,
} as const;

export const EQUIPMENT_SLOT_ICONS = {
  mainHand: { outline: BoltIcon, solid: BoltIconSolid },
  offHand: { outline: ShieldExclamationIcon, solid: ShieldCheckIconSolid },
  armor: { outline: ShieldCheckIcon, solid: ShieldCheckIconSolid },
} as const satisfies Record<string, IconPair>;

export const ITEM_CATEGORY_ICONS: Record<ItemDefinition['category'] | 'custom', IconPair> = {
  weapon: { outline: BoltIcon, solid: BoltIconSolid },
  armor: { outline: ShieldCheckIcon, solid: ShieldCheckIconSolid },
  shield: { outline: ShieldExclamationIcon, solid: ShieldCheckIconSolid },
  ammo: { outline: ArrowRightIcon },
  gear: { outline: ArchiveBoxIcon, solid: ArchiveBoxIconSolid },
  tool: { outline: WrenchScrewdriverIcon },
  consumable: { outline: CakeIcon },
  treasure: { outline: GiftIcon, solid: GiftIconSolid },
  custom: { outline: StarIcon, solid: StarIconSolid },
};

export const UI_ICONS = {
  search: MagnifyingGlassIcon,
  wallet: WalletIcon,
  backpack: ShoppingBagIcon,
  shop: BuildingStorefrontIcon,
  sort: QueueListIcon,
  equip: ArrowUpCircleIcon,
  unequip: ArrowDownCircleIcon,
  use: BeakerIcon,
  sell: BanknotesIcon,
  delete: TrashIcon,
  edit: PencilSquareIcon,
} as const;
