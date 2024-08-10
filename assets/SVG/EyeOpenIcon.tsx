
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface EyeOpenIconProps extends SvgProps {
  fillColor?: string;
  size?: number;
}

const EyeOpenIcon = ({
  fillColor = '#fff',
  size = 45,
  ...props
}: EyeOpenIconProps) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      stroke={fillColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
    <Path
      stroke={fillColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12.001 5C7.524 5 3.733 7.943 2.46 12c1.274 4.057 5.065 7 9.542 7 4.478 0 8.268-2.943 9.542-7-1.274-4.057-5.064-7-9.542-7Z"
    />
  </Svg>
);
export default EyeOpenIcon;
