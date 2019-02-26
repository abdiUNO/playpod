/* eslint-disable react-native/sort-styles */
import React, { Component } from "react"
import SliderEntry from "./SliderEntry"
import { StyleSheet, Text, View } from "react-native"
import Carousel from "react-native-snap-carousel"
import { itemWidth, sliderWidth } from "../styles/SliderEntry.style"
import { iOSUIKit, systemWeights } from "react-native-typography"
import PropTypes from "prop-types"

class ArticlesCarousel extends Component {
  static propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
    onItemPress: PropTypes.func,
    firstItem: PropTypes.number,
    onSnapToItem: PropTypes.func
  }

  _renderItems = ({ item, index }, parallaxProps) => {
    return (
      <SliderEntry
        data={item}
        t
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
        onPress={() => this.props.onItemPress(item)}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Carousel
          ref={c => (this._slider1Ref = c)}
          data={this.props.data}
          renderItem={this._renderItems}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={this.props.firstItem}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.6}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          autoplay={false}
          onSnapToItem={this.props.onSnapToItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0
  },
  title: {
    ...iOSUIKit.bodyEmphasizedObject,
    ...systemWeights.bold,
    textAlign: "center"
  },
  slider: {
    overflow: "visible" // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10 // for custom animation
  }
})

export default ArticlesCarousel
