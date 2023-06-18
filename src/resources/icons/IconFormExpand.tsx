import * as React from 'react';

import {InjectedProps, withIcon} from './IconDecorator';
import Svg, {Path} from 'react-native-svg';

const IconFormExpand = ({width, height, fill}: InjectedProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 41 40" fill="none">
      <Path
        d="M11.854 16.667L20.187 25l8.333-8.333H11.854z"
        fill={fill || '#000'}
        fillOpacity={0.54}
      />
    </Svg>
  );
};

export default withIcon(IconFormExpand);
