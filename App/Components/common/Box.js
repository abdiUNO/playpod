import styled from 'styled-components/native';
import { View } from 'react-native';
import {
  space,
  color,
  layout,
  flexbox,
  typography,
  fontWeight,
  shadow,
  border,
  compose,
  system,
  background,
} from 'styled-system';

// theme.js
const whiteSpace = system({
  whiteSpace: {
    property: 'whiteSpace',
    cssProperty: 'whiteSpace',
  },
});

const commonProps = compose(space, layout, color, background);
export const fontProps = compose(typography, fontWeight, whiteSpace);
export const borderProps = compose(border, shadow);

const Box = styled(View)`
  ${props => props.centerContent && 'justify-content:center'};
  ${flexbox}
  ${commonProps};
  ${fontProps};
  ${borderProps};
`;

Box.displayName = 'Box';

export default Box;
