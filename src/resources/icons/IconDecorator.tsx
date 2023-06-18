import React, {ComponentType} from 'react';

import useHScale from '../../hooks/useHScale';
import useVScale from '../../hooks/useVScale';

export type InjectedProps = {
  width: number;
  height: number;
  fill?: string;
};

type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

export const withIcon =
  (IconComponent: ComponentType<InjectedProps>) =>
  ({color, width, height}: IconProps): JSX.Element => {
    const hScale = useHScale();
    const vScale = useVScale();

    const iconFill = color;
    const iconWidth = width || hScale * 24;
    const iconHeight = height || vScale * 24;

    return (
      <IconComponent fill={iconFill} width={iconWidth} height={iconHeight} />
    );
  };
