import * as React from 'react';

import {InjectedProps, withIcon} from './IconDecorator';
import Svg, {Path} from 'react-native-svg';

const IconFormCollapsed = ({
  width,
  height,
  fill,
}: InjectedProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 41 40" fill="none">
      <Path
        d="M11.854 25l8.333-8.333L28.52 25H11.854z"
        fill={fill || '#000'}
        fillOpacity={0.54}
      />
    </Svg>
  );
};

export default withIcon(IconFormCollapsed);
