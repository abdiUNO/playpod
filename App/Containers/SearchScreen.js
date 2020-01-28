import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  FlatList,
  View,
  Touch,
  LayoutAnimation,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import {
  ListItem,
  Avatar,
  Icon,
  Input,
  Divider,
  SearchBar,
} from 'react-native-elements';
import { Box } from '../Components/common';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/HomeScreenStyle';
import * as Animatable from 'react-native-animatable';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const slideInRight = {
  from: {
    translateX: 50,
    opacity: -0.25,
  },
  to: {
    translateX: 0,
    opacity: 1,
  },
};

class SearchScreen extends Component {
  render() {
    return (
      <ScrollView>
        <Box display="flex" flex={1} m="20px 0px 0px 0px">
          <View style={styles.headingContainer}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.navigate('HomeScreen');
              }}>
              <View
                style={{
                  paddingBottom: 5,
                  marginRight: 20,
                }}>
                <Text style={styles.headingSubdue}>Library</Text>
              </View>
            </TouchableWithoutFeedback>

            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: '#373539',
                borderStyle: 'solid',
                paddingBottom: 9,
              }}>
              <Animatable.View
                animation="pulse"
                duration={200}
                easing="ease-in-out-sine">
                <Text style={styles.heading}>Search</Text>
              </Animatable.View>
            </View>
          </View>
          <Animatable.View
            animation={slideInRight}
            duration={300}
            easing="ease-in-out-cubic">
            <SearchBar
              platform="ios"
              placeholder="Type Here..."
              // onChangeText={this.updateSearch}
              // value={search}
            />
          </Animatable.View>
        </Box>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
