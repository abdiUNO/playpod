import { Navigation } from "react-native-navigation"

export function registerScreens() {
  Navigation.registerComponent("Home", () => require("./screens/Home").default)
  Navigation.registerComponent(
    "Initialize",
    () => require("./screens/Init").default
  )
  Navigation.registerComponent(
    "Sample",
    () => require("./screens/NewsStand").default
  )
}
