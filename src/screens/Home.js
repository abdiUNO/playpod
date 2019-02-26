import React, { Component } from "react"
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native"
import { iOSUIKit, iOSColors, systemWeights } from "react-native-typography"
import { PODCASTS, EPISODES } from "../static/entries"
import ArticleCard from "../components/ArticleCard"
import { ListItem, Avatar } from "react-native-elements"
import { colors } from "../styles/index.styles"

class Home extends Component {
  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => {
    return (
      <ListItem
        rightAvatar={
          <Avatar
            overlayContainerStyle={{
              backgroundColor: "transparent"
            }}
            avatarStyle={{
              backgroundColor: "transparent",
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "transparent"
            }}
            containerStyle={{
              shadowColor: colors.gray,
              shadowOpacity: 0.75,
              shadowOffset: { width: 0, height: 2.5 },
              shadowRadius: 5
            }}
            size="large"
            source={{ uri: item.image, cache: "force-cache" }}
          />
        }
        title={item.title}
        titleStyle={{
          ...iOSUIKit.title3EmphasizedObject,
          ...systemWeights.bold,
          marginBottom: 5
        }}
        subtitle={item.description}
        subtitleStyle={{
          ...iOSUIKit.subheadEmphasizedObject,
          ...systemWeights.semibold,
          color: iOSColors.gray
        }}
      />
    )
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Listen</Text>
          <Text style={styles.subhead}>Your Library</Text>
        </View>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={PODCASTS}
          renderItem={this.renderItem}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 65,
    paddingHorizontal: 15
  },
  headingContainer: {
    marginBottom: 35
  },
  heading: {
    ...iOSUIKit.largeTitleEmphasizedObject,
    ...systemWeights.bold,
    fontSize: 50,
    lineHeight: 65
  },
  subhead: {
    ...iOSUIKit.bodyEmphasizedObject,
    color: iOSColors.gray
  }
})

export default Home
