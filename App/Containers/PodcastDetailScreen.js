import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  FlatList,
  StyleSheet,
  View,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import { Avatar, ListItem, Header, Divider } from 'react-native-elements';
import { iOSColors, iOSUIKit, systemWeights } from 'react-native-typography';
import EpisodeListItem from '../Components/EpisodeListItem';
import { connect } from 'react-redux';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PodcastDetailScreenStyle';

import TimeAgo from 'javascript-time-ago';
import english from 'javascript-time-ago/locale/en';

import PropTypes from 'prop-types';
import { Box } from '../Components/common';
import PlayerActions from '../Redux/PlayerRedux';
import FastImage from 'react-native-fast-image';

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

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

class PodcastDetailScreen extends Component {
  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => {
    const { title, publishedParsed, itunesExt } = item;

    const props = {
      title,
      published: publishedParsed,
      duration: itunesExt.duration,
    };
    return (
      <EpisodeListItem
        item={props}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          this.props.playEpisode(item, this.props.item.title);
        }}
      />
    );
  };

  renderHeader = () => {
    return (
      <>
        <View style={styles.headingContainer}>
          <Avatar
            ImageComponent={FastImage}
            overlayContainerStyle={{
              backgroundColor: 'transparent',
              borderRadius: 8,
              overflow: 'hidden',
            }}
            avatarStyle={{
              backgroundColor: 'transparent',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: 'transparent',
            }}
            containerStyle={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,

              elevation: 3,
              marginLeft: 10,
              marginRight: 10,
            }}
            size="large"
            source={{
              uri: this.props.item.imageUrlXL,
            }}
          />
          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <Text style={styles.heading}>{this.props.item.title}</Text>
            <Text style={styles.subhead}>{this.props.item.publisherName}</Text>
          </View>
        </View>
        <View>
          <Box p="5px 10px 12px 10px">
            <Text
              style={{
                ...iOSUIKit.bodyEmphasizedObject,
                ...systemWeights.regular,
                fontSize: 20,
                color: '#373539',
                marginBottom: 5,
              }}>
              Available episodes
            </Text>
          </Box>
          <Divider
            style={{
              backgroundColor: '#E0E3E5',
              height: 1,
            }}
          />
        </View>
      </>
    );
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header
          containerStyle={{
            paddingTop: 10,
            paddingBottom: 0,
            margin: 0,
            height: 54,
          }}
          backgroundColor="#fff"
          leftComponent={{
            icon: 'arrow-back',
            color: '#000',
          }}
          centerComponent={{
            text: 'Episodes',
            style: { ...iOSUIKit.subheadEmphasizedObject },
          }}
        />
        {this.props.item ? (
          <View style={styles.container}>
            <FlatList
              ListHeaderComponent={this.renderHeader}
              keyExtractor={this.keyExtractor}
              data={this.props.episodes}
              renderItem={this.renderItem}
              initialNumToRender={15}
              keyboardShouldPersistTaps={'always'}
              maxToRenderPerBatch={5}
            />
          </View>
        ) : (
          <View />
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    item: state.podcasts.item,
    episodes: state.podcasts.episodes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    playEpisode: (episode, author) =>
      dispatch(PlayerActions.playEpisode(episode, author)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PodcastDetailScreen);
