import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
  LayoutAnimation,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Avatar, Icon, Input, Divider } from 'react-native-elements';
import { Box } from '../Components/common';
import PodcastActions from '../Redux/PodcastRedux';
import { iOSUIKit, iOSColors, systemWeights } from 'react-native-typography';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as Animatable from 'react-native-animatable';

// Styles
import styles from './Styles/HomeScreenStyle';
import FastImage from 'react-native-fast-image';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const slideInLeft = {
  from: {
    translateX: -100,
    opacity: -0.25,
  },
  to: {
    translateX: 0,
    opacity: 1,
  },
};

class PodcastItem extends Component {
  handleClick = () => this.props.onPress(this.props.episode.itunesId);

  render() {
    const { title, description, image } = this.props.episode;
    const { isLast } = this.props;
    return (
      <TouchableOpacity onPress={this.handleClick}>
        <Box py="10px">
          <ListItem
            containerStyle={{
              backgroundColor: '#FFF',
            }}
            leftAvatar={
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
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  elevation: 2,
                  padding: 2.5,
                }}
                size="large"
                source={{ uri: image }}
              />
            }
            title={title}
            titleProps={{
              numberOfLines: 2,
            }}
            titleStyle={{
              ...iOSUIKit.bodyEmphasizedObject,
              ...systemWeights.semibold,
              fontSize: 16,
              color: '#373539',
              marginBottom: 5,
            }}
            subtitle={description.substr(0, 52) + '...'}
            subtitleStyle={{
              ...iOSUIKit.subheadEmphasizedObject,
              ...systemWeights.regular,
              color: '#7B7A7C',
            }}
          />
        </Box>
        {isLast === false && (
          <Box px="10px">
            <Divider
              style={{
                backgroundColor: '#ebeef0',
                height: 1,
              }}
            />
          </Box>
        )}
      </TouchableOpacity>
    );
  }
}

class HomeScreen extends Component {
  componentDidMount() {
    this.props.getPodcasts();
  }

  keyExtractor = (item, index) => index.toString();

  handleItemPress = itunesId => this.props.getEpisodes(itunesId);

  renderItem = data => {
    const item = this.props.podcasts[data.item];
    const { title, description, imageUrlXL, itunesId, publisherName } = item;
    const episode = {
      title,
      description: publisherName,
      image: imageUrlXL,
      itunesId,
    };

    return (
      <Animatable.View
        animation={slideInLeft}
        duration={300}
        easing="ease-in-out-cubic">
        <PodcastItem
          onPress={this.handleItemPress}
          episode={episode}
          isLast={data.index === this.props.allIds.length - 1}
        />
      </Animatable.View>
    );
  };

  flatListRef(ref) {
    this.flatListRef = ref;
  }

  renderHeader = () => {
    return (
      <View style={styles.headingContainer}>
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: '#373539',
            borderStyle: 'solid',
            paddingBottom: 9,
            marginRight: 20,
          }}>
          <Animatable.View
            animation="pulse"
            duration={200}
            easing="ease-in-out-sine">
            <Text style={styles.heading}>Library</Text>
          </Animatable.View>
        </View>

        <TouchableWithoutFeedback
          onPress={() => {
            this.props.navigation.navigate('SearchScreen');
          }}>
          <View
            style={{
              paddingBottom: 5,
            }}>
            <Text style={styles.headingSubdue}>Search</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  render() {
    return (
      <Box display="flex" flex={1} m="20px 0px 0px 0px">
        <FlatList
          ListHeaderComponent={this.renderHeader}
          ref={this.flatListRef}
          data={this.props.allIds}
          extraProps={this.props.byId}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          refreshing={this.props.loading}
          contentContainerStyle={{
            paddingBottom: 50,
          }}
        />
      </Box>
    );
  }
}

const mapStateToProps = state => {
  return {
    podcasts: state.podcasts.byId,
    allIds: state.podcasts.allIds,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPodcasts: () => dispatch(PodcastActions.podcastRequest()),
    getEpisodes: itunesId => dispatch(PodcastActions.episodesRequest(itunesId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
