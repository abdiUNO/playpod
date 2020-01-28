import { StyleSheet } from 'react-native';
import { iOSColors, iOSUIKit, systemWeights } from 'react-native-typography';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...iOSUIKit.subheadEmphasized,
    ...systemWeights.bold,
    fontSize: 16,
    marginBottom: 5,
    color: '#373539',
  },
  subTitle: {
    ...iOSUIKit.footnoteEmphasizedObject,
    color: '#7B7A7C',
  },
});
