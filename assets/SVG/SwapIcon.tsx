/* eslint-disable prettier/prettier */
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface SwapIconProps extends SvgProps{
    fillColor?: string;
    size?: number;
}

const SwapIcon = ({fillColor = '#fff', size = 45, ...props}: SwapIconProps) => (
  <Svg
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke={fillColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 10h12l-4-4M16 14H4l4 4"
    />
  </Svg>
);
export default SwapIcon;
