// @flow

import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import TabNavigator from 'react-native-tab-navigator';
import PropTypes from 'prop-types';
import NowPlaying from './NowPlaying';

class Tabs extends Component {
  render() {
    const props = this.props;
    return (
      <SafeAreaView>
        <NowPlaying navigation={props.navigation} />
      </SafeAreaView>
    );
  }
}

Tabs.propTypes = {
  navigationState: PropTypes.object,
};

export default Tabs;

const styles = StyleSheet.create({
  tabStyle: {
    paddingBottom: 5,
    backgroundColor: '#FFF',
  },
});
