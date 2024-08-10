/* eslint-disable prettier/prettier */
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

interface BackButtonIconProps extends SvgProps {
    fillColor?: string;
    size?: number;
}

const BackButtonIcon = ({fillColor = '#fff', size = 45, ...props}: BackButtonIconProps) =>(
  <Svg
    width={size}
    height={size}
    viewBox="0 0 512 512"
    {...props}
  >
    <Path
        d="M328 112 184 256l144 144"
        fill= "none"
        stroke= {fillColor}
        strokeLinecap= "round"
        strokeLinejoin= "round"
        strokeWidth= {48}

    />
  </Svg>
);
export default BackButtonIcon;
