/* eslint-disable react-native/sort-styles */
import React, { Component } from "react"
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  Image,
  TouchableOpacity
} from "react-native"
import { itemHorizontalMargin } from "../styles/SliderEntry.style"
import { colors } from "../styles/index.styles"
import {
  iOSColors,
  iOSUIKit,
  materialColors,
  systemWeights
} from "react-native-typography"
import PropTypes from "prop-types"
import Placeholder from "rn-placeholder"

const IS_IOS = Platform.OS === "ios"
const { width: _, height: viewportHeight } = Dimensions.get("window")

export default class ArticleCard extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  get image() {
    const {
      data: { urlToImage }
    } = this.props

    return urlToImage ? (
      <Image
        source={{
          uri: urlToImage,
          cache: "force-cache"
        }}
        style={styles.image}
      />
    ) : (
      <Image
        source={{
          uri:
            "https://images.unsplash.com/photo-1445112098124-3e76dd67983c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2247&q=80",
          cache: "force-cache"
        }}
        style={styles.image}
      />
    )
  }

  render() {
    const {
      data: { urlToImage, title, description, author }
    } = this.props

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={this.props.onPress}
      >
        <View style={styles.shadow} />
        <View style={styles.imageContainer}>
          {urlToImage ? this.image : <View />}
          <View style={styles.radiusMask} />
        </View>
        <View style={styles.textContainer}>
          {title ? (
            <View>
              <Text style={styles.sourceTitle}>{author}</Text>
              <Text style={styles.title} numberOfLines={2}>
                {title.toUpperCase()}
              </Text>
            </View>
          ) : (
            <View>
              <View style={{ paddingBottom: 6 }}>
                <Placeholder.Line
                  animate="shine"
                  width="20%"
                  color="#f3f3f3"
                  textSize={11}
                />
              </View>
              <Placeholder.Line
                animate="fade"
                width="77%"
                color="#d1d1d1"
                textSize={15}
              />
            </View>
          )}

          {description ? (
            <View>
              <Text style={styles.subtitle} numberOfLines={2}>
                {description}
              </Text>
            </View>
          ) : (
            <View style={{ marginTop: 8 }}>
              <Placeholder.Paragraph
                animate="shine"
                lineNumber={3}
                textSize={13}
                lineSpacing={5}
                width="100%"
                lastLineWidth="70%"
                firstLineWidth="50%"
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    )
  }
}

const slideHeight = viewportHeight * 0.5

const entryBorderRadius = 5

const styles = StyleSheet.create({
  slideInnerContainer: {
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18,
    shadowColor: iOSColors.midGray,
    shadowOffset: {
      width: 0,
      height: 2.5
    },
    shadowOpacity: 0.75,
    shadowRadius: 5
  },
  shadow: {
    position: "absolute",
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 18,
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    borderRadius: entryBorderRadius
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: iOSColors.white,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    borderRadius: IS_IOS ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    backgroundColor: iOSColors.white,
    borderColor: iOSColors.lightGray,
    borderWidth: 1,
    borderBottomWidth: 0
  },
  textContainer: {
    justifyContent: "center",
    paddingTop: 20 - entryBorderRadius,
    paddingBottom: 20,
    paddingHorizontal: 14,
    backgroundColor: iOSColors.white,
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius,
    borderColor: iOSColors.lightGray,
    borderWidth: 1,
    borderTopWidth: 0
  },
  title: {
    ...iOSUIKit.subheadObject,
    ...systemWeights.bold,
    color: iOSColors.black,
    letterSpacing: 0.5,
    lineHeight: 16
  },
  subtitle: {
    ...iOSUIKit.footnoteObject,
    marginTop: 6,
    fontSize: 14,
    color: iOSColors.gray,
    fontStyle: "italic"
  },
  sourceTitle: {
    ...iOSUIKit.caption2Object,
    color: materialColors.blackSecondary,
    paddingBottom: 5
  }
})
