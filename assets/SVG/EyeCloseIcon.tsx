/* eslint-disable prettier/prettier */
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface EyeCloseIconProps extends SvgProps {
  fillColor?: string;
  size?: number;
}

const EyeCloseIcon = ({fillColor = '#fff', size = 45, ...props}: EyeCloseIconProps) => (
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
      d="m2.999 3 18 18M9.843 9.914a3 3 0 0 0 4.265 4.22M6.5 6.646A10.024 10.024 0 0 0 2.457 12c1.274 4.057 5.065 7 9.542 7 1.99 0 3.842-.58 5.4-1.582m-6.4-12.369c.329-.032.663-.049 1-.049 4.478 0 8.268 2.943 9.542 7a9.954 9.954 0 0 1-1.189 2.5"
    />
  </Svg>
);
export default EyeCloseIcon;
