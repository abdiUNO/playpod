import React, { Component } from 'react';
import Modal from 'react-native-modal';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Animated,
  Easing,
} from 'react-native';
import { Avatar, Icon, ListItem, Slider } from 'react-native-elements';
import { human, iOSColors, iOSUIKit } from 'react-native-typography';
import { connect } from 'react-redux';
const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD',
};
import PlayerActions from '../Redux/PlayerRedux';
import FastImage from 'react-native-fast-image';

const OPTIONS = [
  'Hateful or abusive content',
  'Harmful or Discrimination',
  'Violent or repulsive content',
  'Disclosure of personal Information',
  'Spam or misleading',
  'Sexual content',
];

const TRANSFORMS = ['translateX', 'translateY', 'rotate', 'scale'];

const isTransform = prop => {
  return TRANSFORMS.includes(prop);
};

function fancyTimeFormat(time) {
  // Hours, minutes and seconds
  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = '';

  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
  }

  ret += '' + mins + ':' + (secs < 10 ? '0' : '');
  ret += '' + secs;
  return ret;
}

const Header = ({ onPress, header, fontSize }) => (
  <View style={styles.header}>
    <Text style={{ ...styles.headerText, fontSize: header ? 18 : 20 }}>
      {header || 'Report Message'}
    </Text>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon
        name="close"
        color="#000"
        size={25}
        style={styles.buttonText}
        onPress={onPress}
        hitSlop={{
          top: 10,
          left: 10,
          right: 10,
          bottom: 10,
        }}
      />
    </TouchableOpacity>
  </View>
);

class EpisodeModal extends Component {
  state = {
    query: '',
    complete: false,
  };

  handleOnPress = option => {
    this.setState({ complete: true }, () => this.props.onPress(option));
    // this.props.toggleModal()
  };

  renderLists = () => {
    return OPTIONS.map((option, index) => {
      return (
        <ListItem
          key={`${option.trim()}-${index}`}
          containerStyle={styles.listItemContainer}
          title={option}
          titleStyle={styles.listItemTitle}
          chevron={true}
          onPress={() => this.handleOnPress(option)}
        />
      );
    });
  };

  onComplete = () => this.setState({ complete: true });

  onClose = () => this.setState({ complete: false }, this.props.onClose);

  render() {
    const params = this.props;

    const height = Dimensions.get('window').height;

    if (!this.props.progress) return <View />;

    return (
      <Modal
        backdropTransitionOutTiming={0}
        isVisible={this.props.isModalVisible}
        onBackdropPress={this.props.onClose}
        onSwipeComplete={this.props.onClose}
        swipeDirection={['down']}
        hasBackdrop={true}
        style={{ margin: 0, padding: 0 }}>
        <View style={styles.modal}>
          <SafeAreaView style={styles.bottomArea}>
            <View style={styles.header}>
              <View />
              <TouchableOpacity style={styles.button} onPress={this.onClose}>
                <Icon
                  name="close"
                  color="#000"
                  size={25}
                  style={styles.buttonText}
                  hitSlop={{
                    top: 10,
                    left: 10,
                    right: 10,
                    bottom: 10,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }} keyboardShouldPersistTaps="always">
              <View style={styles.imageContainer}>
                <Avatar
                  ImageComponent={FastImage}
                  overlayContainerStyle={{
                    backgroundColor: 'transparent',
                  }}
                  avatarStyle={{
                    backgroundColor: 'transparent',
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: 'transparent',
                  }}
                  containerStyle={{
                    width: height / 3.5,
                    height: height / 3.5,
                    shadowColor: colors.gray,
                    shadowOpacity: 0.75,
                    shadowOffset: { width: 0, height: 2.5 },
                    shadowRadius: 5,
                  }}
                  size="xlarge"
                  imageProps={{
                    resizeMode: FastImage.resizeMode.contain,
                  }}
                  source={{
                    uri: params.image,
                  }}
                />
              </View>
              <View style={styles.modalContent}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'stretch',
                    justifyContent: 'center',
                    paddingHorizontal: 25,
                  }}>
                  <Slider
                    step={0.01}
                    minimumValue={0}
                    maximumValue={this.props.duration}
                    thumbTintColor="#2980b9"
                    minimumTrackTintColor="#3498db"
                    maximumTrackTintColor="#d6eaf8"
                    animateTransitions={true}
                    animationType="timing"
                    value={this.props.progress.currentTime}
                    thumbStyle={{
                      width: 15,
                      height: 15,
                    }}
                    onSlidingComplete={value => {
                      params.seek(value);
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 25,
                  }}>
                  <Text
                    style={{
                      ...iOSUIKit.footnoteEmphasizedObject,
                      color: '#727276',
                    }}>
                    {fancyTimeFormat(this.props.progress.currentTime)}
                  </Text>
                  <Text
                    style={{
                      ...iOSUIKit.footnoteEmphasizedObject,
                      color: '#727276',
                    }}>
                    -{fancyTimeFormat(this.props.duration)}
                  </Text>
                </View>
                <View
                  style={{
                    paddingTop: '7%',
                    paddingBottom: 1,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{ ...iOSUIKit.bodyEmphasized, marginBottom: 10 }}>
                    {params.episode}
                  </Text>
                  <Text
                    style={{
                      ...iOSUIKit.footnote,
                      fontSize: 14,
                      color: '#727276',
                    }}>
                    {params.podcast}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '8%',
                    paddingBottom: 25,
                    paddingHorizontal: 55,
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      params.seek(this.props.progress.currentTime - 30)
                    }>
                    <Icon
                      type="feather"
                      name="rewind"
                      size={29}
                      color="#858585"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.props.playPause()}>
                    <Icon
                      raised
                      size={25}
                      reverse
                      color="#3d3d3d"
                      name={!this.props.paused ? 'pause' : 'play-arrow'}
                      reverseColor="#fff"
                      iconStyle={{ fontSize: 35 }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      params.seek(this.props.progress.currentTime + 30)
                    }>
                    <Icon
                      type="feather"
                      name="fast-forward"
                      size={28}
                      color="#858585"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    paused: state.player.paused,
    loading: state.player.loading,
    track: state.player.track,
    buffered: state.player.buffered,
    progress: state.player.progress,
    duration: state.player.duration,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeModal);

const styles = StyleSheet.create({
  listItemTitle: {
    ...human.calloutObject,
    fontSize: 18,
  },
  imageContainer: {
    marginTop: '2%',
    marginBottom: 50,
    backgroundColor: iOSColors.white,
    alignItems: 'center',
  },
  listItemContainer: {
    paddingLeft: 10,
    paddingRight: 14,
    paddingVertical: 15,
  },
  modal: {
    padding: 10,
    marginLeft: '1%',
    marginRight: '1%',
    position: 'absolute',
    bottom: 0,
    width: '98%',
    height: '87%',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  header: {
    borderRadius: 10,
    margin: 5,
    marginBottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    height: 50,
    width: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 45,
    borderColor: '#CCC',
  },
  buttonText: {
    color: '#333',
    fontSize: 50,
    alignSelf: 'center',
  },
  bottomArea: {
    height: '100%',
  },
});
