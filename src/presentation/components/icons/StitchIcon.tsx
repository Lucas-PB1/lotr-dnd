import type { SVGProps } from 'react';
import type { HeroIcon } from './iconMaps';

const SIZES = {
  xs: 'w-3.5 h-3.5',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-8 h-8',
  xl: 'w-10 h-10',
  '2xl': 'w-12 h-12',
} as const;

export type StitchIconSize = keyof typeof SIZES;

type StitchIconProps = SVGProps<SVGSVGElement> & {
  icon: HeroIcon;
  solidIcon?: HeroIcon;
  solid?: boolean;
  size?: StitchIconSize;
};

export function StitchIcon({
  icon: OutlineIcon,
  solidIcon,
  solid,
  size = 'md',
  className = '',
  ...rest
}: StitchIconProps) {
  const Icon = solid && solidIcon ? solidIcon : OutlineIcon;
  return (
    <Icon
      className={`${SIZES[size]} shrink-0 ${className}`.trim()}
      aria-hidden={rest['aria-hidden'] ?? true}
      {...rest}
    />
  );
}

type StitchIconPairProps = Omit<StitchIconProps, 'icon' | 'solidIcon'> & {
  pair: { outline: HeroIcon; solid?: HeroIcon };
};

export function StitchIconPair({ pair, solid, ...rest }: StitchIconPairProps) {
  return <StitchIcon icon={pair.outline} solidIcon={pair.solid} solid={solid} {...rest} />;
}
