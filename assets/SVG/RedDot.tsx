import * as React from 'react';
import Svg, { SvgProps, Circle } from 'react-native-svg';

interface RedCircleIconProps extends SvgProps {
  fillColor?: string;
  size?: number;
}

const RedCircleIcon = ({
  fillColor = '#D44242',
  size = 12,
  ...props
}: RedCircleIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 12 12" fill="none" {...props}>
    <Circle cx="6" cy="6" r="6" fill={fillColor} />
  </Svg>
);

export default RedCircleIcon;
