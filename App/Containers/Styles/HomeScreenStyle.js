import { StyleSheet } from 'react-native';
import { iOSUIKit, iOSColors, systemWeights } from 'react-native-typography';
import { ApplicationStyles } from '../../Themes';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  headingContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 16,
    marginBottom: 3,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.06,
    shadowRadius: 1,

    elevation: 2,
  },
  heading: {
    ...iOSUIKit.largeTitleEmphasized,
    fontSize: 27,
    color: '#373539',
    ...systemWeights.bold,
  },
  headingSubdue: {
    ...iOSUIKit.largeTitleEmphasized,
    fontSize: 24,
    ...systemWeights.bold,
    color: '#8b8a8c',
  },
  subhead: {
    ...iOSUIKit.subheadEmphasized,
    fontWeight: '500',
    color: iOSColors.gray,
  },
  inputStyles: {
    borderWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 5,
  },
});
