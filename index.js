/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

// import { AppRegistry } from "react-native"
// import App from "./src/index"
// import { name as appName } from "./app.json"
//
// AppRegistry.registerComponent(appName, () => App)

// index.js
import { Navigation } from "react-native-navigation"
import { registerScreens } from "./src/screens"

registerScreens()

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: "Initialize"
      }
    }
  })
})
