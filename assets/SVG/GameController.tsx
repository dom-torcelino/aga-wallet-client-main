/* eslint-disable prettier/prettier */
import * as React from 'react';
import Svg, { SvgProps, Path, Circle } from 'react-native-svg';

interface GameControllerProps extends SvgProps{
    fillColor?: string;
    size?: number;
  }


const GameController = ({ fillColor = '#fff', size = 45, ...props }: GameControllerProps) => (
  <Svg
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 192 192"
    {...props}
  >
    <Path
      stroke={fillColor}
      strokeLinejoin="round"
      strokeWidth={12}
      d="m29.56 78.961-7.14 56.232c-1.441 11.347 12.302 18.085 20.39 9.997L70 118h52l27.19 27.19c8.088 8.088 21.831 1.35 20.39-9.997l-7.14-56.232C159.902 58.978 142.901 44 122.758 44H69.242C49.099 44 32.098 58.978 29.56 78.961Z"
    />
    <Path
      stroke={fillColor}
      strokeLinecap="round"
      strokeWidth={12}
      d="M66 69v12m0 12V81m0 0H54m12 0h12"
    />
    <Circle cx={126} cy={69} r={6} fill={fillColor} />
    <Circle cx={126} cy={93} r={6} fill={fillColor} />
    <Circle cx={138} cy={81} r={6} fill={fillColor} transform="rotate(90 138 81)" />
    <Circle cx={114} cy={81} r={6} fill={fillColor} transform="rotate(90 114 81)" />
  </Svg>
);
export default GameController;
