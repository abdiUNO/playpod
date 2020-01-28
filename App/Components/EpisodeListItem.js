import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View, Text, LayoutAnimation } from 'react-native';
import styles from './Styles/EpisodeListItemStyle';
import { ListItem } from 'react-native-elements';
import { Box } from './common/';
import { iOSColors, iOSUIKit, systemWeights } from 'react-native-typography';
import TimeAgo from 'javascript-time-ago/modules/JavascriptTimeAgo';
import english from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(english);
const timeAgo = new TimeAgo('en-US', 'twitter');

const getDuration = timeStr => {
  if (timeStr) {
    const timeArr = timeStr.split(':');
    let hour = parseInt(timeArr[0]);
    let minutes = parseInt(timeArr[1]);

    if (!minutes) {
      hour = 1;
      return Math.floor(parseInt(timeArr[0]) / 60) + ' mins';
    }

    const duration = hour * 60 + minutes;

    return duration + ' mins';
  } else {
    return '0 mins';
  }
};

export default class EpisodeListItem extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render() {
    const { title, published, duration } = this.props.item;

    const abbrTime = `${timeAgo.format(new Date(published))} - ${getDuration(
      duration
    )}`;

    return (
      <Box>
        <ListItem
          rightIcon={{
            name: 'play-circle-filled',
            color: '#393939',
            size: 30,
          }}
          title={title}
          titleStyle={styles.title}
          subtitle={abbrTime}
          subtitleStyle={styles.subTitle}
          onPress={this.props.onPress}
        />
      </Box>
    );
  }
}
