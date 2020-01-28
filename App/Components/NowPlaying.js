import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  PanResponder,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { Avatar, ListItem, Icon } from 'react-native-elements';
const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD',
};
import { iOSColors, iOSUIKit, systemWeights } from 'react-native-typography';
import React from 'react';
import { connect } from 'react-redux';

import Video from 'react-native-video';
import TextTicker from 'react-native-text-ticker';
import PlayerActions from '../Redux/PlayerRedux';
import FastImage from 'react-native-fast-image';
import EpisodeModal from './EpisodeModal';

function timeFormat(seconds) {
  var hours = parseInt(seconds / 3600);
  seconds = seconds % 3600;
  var minutes = parseInt(seconds / 60);
  seconds = ~~seconds % 60;

  var ret = '';

  if (hours > 0) {
    ret += '' + hours + ':' + (minutes < 10 ? '0' : '');
  }

  ret += '' + minutes + ':' + (seconds < 10 ? '0' : '');
  ret += '' + seconds;
  return ret;
}

const PlayerAvatar = ({ image }) => (
  <Avatar
    ImageComponent={FastImage}
    overlayContainerStyle={{
      backgroundColor: 'transparent',
      borderRadius: 2.5,
      overflow: 'hidden',
    }}
    avatarStyle={{
      backgroundColor: 'transparent',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'transparent',
    }}
    containerStyle={{}}
    source={{
      uri: image,
    }}
  />
);

class NowPlaying extends Component {
  static propTypes = {
    nowPlaying: PropTypes.bool,
    title: PropTypes.string,
    username: PropTypes.string,
  };

  constructor() {
    super();

    this.state = {
      progress: 0,
      error: null,
      isSelectModalVisible: false,
    };
  }

  onProgress = (player, other) => this.props.onProgress(player);

  onLoad = payload => {
    this.props.onLoad(payload.duration);
  };

  onBuffer = ({ isBuffering }: { isBuffering: boolean }) => {
    if (this.props.loading === false && isBuffering === false)
      this.props.onBuffered();
  };

  showModal = () => {
    if (this.props.track && this.props.track.itunesExt.image) {
      this.toggleSelectFriendModal();
    }
  };

  seek = sec => this.player.seek(sec);

  toggleSelectFriendModal = () =>
    this.setState({ isSelectModalVisible: !this.state.isSelectModalVisible });

  _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    onPanResponderRelease: (e, { vy, dy }) => {
      const screenHeight = Dimensions.get('window').height;
      if (Math.abs(vy) >= 0.25 || Math.abs(dy) >= 0.25 * screenHeight)
        this.showModal();
    },
  });

  render() {
    const _props = this.props.track && {
      podcast: this.props.track.author,
      episode: this.props.track.title,
      image: this.props.track.itunesExt.image,
      paused: this.props.paused,
      playPause: this.props.playPause,
    };

    return (
      <View>
        <EpisodeModal
          isModalVisible={this.state.isSelectModalVisible}
          onClose={this.toggleSelectFriendModal}
          seek={this.seek}
          {..._props}
        />
        {this.props.track ? (
          <View>
            <ListItem
              onPress={this.showModal}
              containerStyle={{
                backgroundColor: '#1c1b1d',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 3,
              }}
              leftAvatar={
                <PlayerAvatar image={this.props.track.itunesExt.image} />
              }
              rightIcon={
                this.props.track ? (
                  <TouchableOpacity onPress={() => this.props.playPause()}>
                    <Icon
                      name={
                        !this.props.paused ? 'pause' : 'play-circle-outline'
                      }
                      color="#fff"
                      size={30}
                    />
                  </TouchableOpacity>
                ) : null
              }
              title={
                <TouchableOpacity onPress={this.showModal}>
                  <TextTicker
                    style={{
                      ...iOSUIKit.subheadEmphasizedObject,
                      ...systemWeights.bold,
                      color: iOSColors.white,
                      marginBottom: 5,
                    }}
                    duration={15000}
                    loop
                    repeatSpacer={100}
                    bounce={false}
                    marqueeDelay={1000}>
                    {this.props.track.title}
                  </TextTicker>
                </TouchableOpacity>
              }
              subtitle={
                <TouchableOpacity onPress={this.showModal}>
                  <Text
                    style={{
                      ...iOSUIKit.footnoteEmphasizedObject,
                      ...systemWeights.semibold,
                      color: iOSColors.white,
                    }}>
                    {!this.props.buffered
                      ? 'buffering...'
                      : `${timeFormat(this.props.progress.currentTime)} min`}
                  </Text>
                </TouchableOpacity>
              }
            />
          </View>
        ) : (
          <View />
        )}
        {this.props.track ? (
          <Video
            paused={this.props.paused}
            volume={1}
            poster="https://baconmockup.com/300/200/"
            audioOnly={true}
            playInBackground={true}
            source={{
              uri: this.props.track.enclosures[0].url,
            }}
            ref={ref => {
              this.player = ref;
            }}
            onProgress={this.onProgress}
            onLoad={this.onLoad}
            onBuffer={this.onBuffer}
            style={styles.backgroundVideo}
            ignoreSilentSwitch="ignore"
          />
        ) : (
          <View />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nowPlayingFooter: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderColor: iOSColors.lightGray,
    shadowColor: iOSColors.lightGray2,
    shadowOffset: {
      width: 0,
      height: -2.5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2.5,
  },
  trackTitle: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  trackArtist: {
    fontSize: 12,
    marginBottom: 6,
    textAlign: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    width: 0,
    height: 0,
    flex: 0,
  },
});

const mapStateToProps = state => {
  return {
    paused: state.player.paused,
    loading: state.player.loading,
    track: state.player.track,
    buffered: state.player.buffered,
    progress: state.player.progress || {},
  };
};

const mapDispatchToProps = dispatch => {
  return {
    playEpisode: (episode, author) =>
      dispatch(PlayerActions.playEpisode(episode, author)),
    onLoad: duration => dispatch(PlayerActions.trackLoaded(duration)),
    onBuffered: () => dispatch(PlayerActions.trackBuffered()),
    onProgress: progress => dispatch(PlayerActions.progress(progress)),
    playPause: () => dispatch(PlayerActions.playPause()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NowPlaying);
