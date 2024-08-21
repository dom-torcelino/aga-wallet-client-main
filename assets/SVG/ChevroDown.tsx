import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface ArrowIconProps extends SvgProps {
  fillColor?: string;
  size?: number;
}

const ChevronDown = ({
  fillColor = 'white',
  size = 30,
  ...props
}: ArrowIconProps) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 30 30" {...props}>
    <Path
      d="M22.5 11.25L15 18.75L7.5 11.25"
      stroke={fillColor}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ChevronDown;
