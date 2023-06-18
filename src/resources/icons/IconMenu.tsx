import * as React from 'react';

import {InjectedProps, withIcon} from './IconDecorator';
import Svg, {Path} from 'react-native-svg';

const IconMenu = ({width, height, fill}: InjectedProps): JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 41 40" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.188 6.107c0-.863.7-1.563 1.563-1.563h9.262a7.738 7.738 0 017.738 7.738v21.612a1.563 1.563 0 01-3.127 0 3.068 3.068 0 00-3.068-3.068H4.751c-.864 0-1.564-.7-1.564-1.564V6.107zm15.437 22.406V12.282a4.612 4.612 0 00-4.612-4.612h-7.7V27.7h9.243c1.086 0 2.142.284 3.069.813z"
        fill={fill || '#000'}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.891 6.81a7.738 7.738 0 015.472-2.267h9.262c.863 0 1.563.7 1.563 1.563v23.156c0 .863-.7 1.563-1.563 1.563H24.819a3.068 3.068 0 00-3.068 3.068 1.563 1.563 0 11-3.126 0V12.281c0-2.052.815-4.02 2.266-5.471zm.86 21.702a6.193 6.193 0 013.068-.813h9.243V7.669h-7.7a4.612 4.612 0 00-4.611 4.612v16.231z"
        fill={fill || '#000'}
      />
    </Svg>
  );
};

export default withIcon(IconMenu);
