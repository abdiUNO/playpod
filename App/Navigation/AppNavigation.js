import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import SearchScreen from '../Containers/SearchScreen';
import PodcastDetailScreen from '../Containers/PodcastDetailScreen';
import HomeScreen from '../Containers/HomeScreen';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LaunchScreen from '../Containers/LaunchScreen';
import Tabs from '../Components/Tabs';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';

import styles from './Styles/NavigationStyles';
import { SafeAreaView } from 'react-native';
import React from 'react';
import { Transition } from 'react-native-reanimated';

const SwitchNav = createSwitchNavigator(
  {
    HomeScreen: HomeScreen,
    SearchScreen: SearchScreen,
  },
  {
    // Default config for all screens
    animationEnabled: false,
    headerMode: 'none',
    initialRouteName: 'HomeScreen',
    navigationOptions: {
      headerStyle: styles.header,
    },
  }
);

const MainScreens = createStackNavigator(
  {
    SwitchNav,
    PodcastDetailScreen: PodcastDetailScreen,
    LaunchScreen: LaunchScreen,
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'SwitchNav',
    navigationOptions: {
      headerStyle: styles.header,
    },
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    MainScreens,
  },
  {
    headerMode: 'none',
    initialRouteName: 'MainScreens',
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarComponent: Tabs,
  }
);

export default createAppContainer(TabNavigator);
