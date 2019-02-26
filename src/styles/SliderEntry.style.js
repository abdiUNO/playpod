import { Dimensions } from "react-native"

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
)

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100
  return Math.round(value)
}
export const slideWidth = wp(75)
export const itemHorizontalMargin = wp(0)

export const sliderWidth = viewportWidth
export const itemWidth = slideWidth + itemHorizontalMargin * 2
