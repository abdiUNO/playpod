/* eslint-disable react-native/sort-styles */
import React, { Component } from "react"
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  StyleSheet
} from "react-native"
import PropTypes from "prop-types"
import { ParallaxImage } from "react-native-snap-carousel"
import { colors } from "../styles/index.styles"
import {
  iOSColors,
  materialColors,
  iOSUIKit,
  systemWeights
} from "react-native-typography"
import Placeholder from "rn-placeholder"

import { itemHorizontalMargin, itemWidth } from "../styles/SliderEntry.style"

export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
    onPress: PropTypes.func
  }

  get image() {
    const {
      data: { urlToImage },
      parallax,
      parallaxProps,
      even
    } = this.props

    return parallax ? (
      <ParallaxImage
        source={urlToImage ? { uri: urlToImage, cache: "force-cache" } : {}}
        containerStyle={[
          styles.imageContainer,
          even ? styles.imageContainerEven : {}
        ]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={
          even ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.4)"
        }
        {...parallaxProps}
      />
    ) : (
      <Image source={{ uri: urlToImage }} style={styles.image} />
    )
  }

  render() {
    const {
      data: { urlToImage, title, description, source }
    } = this.props

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={this.props.onPress}
      >
        <View style={styles.imageContainer}>
          {urlToImage ? this.image : <View />}
          <View style={styles.radiusMask} />
        </View>
        <View style={styles.textContainer}>
          {title ? (
            <View>
              <Text style={styles.sourceTitle}>{source.name}</Text>
              <Text style={styles.title} numberOfLines={3}>
                {title.toUpperCase()}
              </Text>
            </View>
          ) : (
            <View>
              <View style={{ paddingBottom: 6 }}>
                <Placeholder.Line
                  animate="shine"
                  width="20%"
                  color="#31302e"
                  textSize={11}
                />
              </View>
              <View>
                <Placeholder.Line
                  animate="fade"
                  width="77%"
                  color="#31302e"
                  textSize={15}
                />
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    )
  }
}

const IS_IOS = Platform.OS === "ios"
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
)

const slideHeight = viewportHeight * 0.28

const entryBorderRadius = 8

const styles = StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 5 // needed for shadow
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: colors.black,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  imageContainerEven: {
    backgroundColor: colors.black
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
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#d2d2d6"
  },
  textContainer: {
    justifyContent: "center",
    paddingTop: 10 - entryBorderRadius,
    paddingBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius,
    borderColor: "#d2d2d6",
    borderWidth: 1,
    borderTopWidth: 0
  },
  title: {
    ...iOSUIKit.footnoteObject,
    ...systemWeights.bold,
    color: iOSColors.black,
    lineHeight: 16
  },
  sourceTitle: {
    ...iOSUIKit.caption2Object,
    color: materialColors.blackSecondary,
    paddingBottom: 6
  }
})
