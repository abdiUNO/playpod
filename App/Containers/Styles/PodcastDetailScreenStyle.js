import { StyleSheet } from 'react-native';
import { ApplicationStyles } from '../../Themes/';
import { iOSColors, iOSUIKit, systemWeights } from 'react-native-typography';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    ...ApplicationStyles.screen.container,
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  headingContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 35,
  },
  heading: {
    ...iOSUIKit.title3EmphasizedObject,
    ...systemWeights.bold,
    fontSize: 21,
    marginBottom: 5,
    color: '#373539',
  },
  subhead: {
    ...iOSUIKit.bodyEmphasizedObject,
    color: '#437DFF',
  },
});
