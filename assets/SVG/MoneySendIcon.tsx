/* eslint-disable prettier/prettier */
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface MoneySendIconProps extends SvgProps{
    fillColor?: string;
    size?: number;
}

const MoneySendIcon = ({fillColor = '#fff', size = 45, ...props}: MoneySendIconProps) => (
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
      strokeWidth={1.5}
      d="M9.5 13.75c0 .97.75 1.75 1.67 1.75h1.88c.8 0 1.45-.68 1.45-1.53 0-.91-.4-1.24-.99-1.45l-3.01-1.05c-.59-.21-.99-.53-.99-1.45 0-.84.65-1.53 1.45-1.53h1.88c.92 0 1.67.78 1.67 1.75M12 7.5v9"
    />
    <Path
      stroke={fillColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2M22 6V2h-4M17 7l5-5"
    />
  </Svg>
);
export default MoneySendIcon;
