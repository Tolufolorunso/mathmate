// AppText.js
import PropTypes from 'prop-types';
import { Text } from 'react-native-paper';

const VARIANTS = [
  'displayLarge',
  'displayMedium',
  'displaySmall',
  'headlineLarge',
  'headlineMedium',
  'headlineSmall',
  'titleLarge',
  'titleMedium',
  'titleSmall',
  'bodyLarge',
  'bodyMedium',
  'bodySmall',
  'labelLarge',
  'labelMedium',
  'labelSmall',
];

const AppText = ({ children, style, ...rest }) => {
  // pick the first prop that matches a variant key
  const variantKey = VARIANTS.find((v) => rest[v] === true);
  const variant = variantKey || undefined;

  // strip all variant booleans from the other props
  const otherProps = Object.keys(rest).reduce((acc, k) => {
    if (!VARIANTS.includes(k)) acc[k] = rest[k];
    return acc;
  }, {});

  return (
    <Text variant={variant} style={style} {...otherProps}>
      {children}
    </Text>
  );
};

AppText.propTypes = {
  children: PropTypes.node,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number,
  ]),
  ...VARIANTS.reduce((acc, v) => ({ ...acc, [v]: PropTypes.bool }), {}),
};

export default AppText;
