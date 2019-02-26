import React from "react"
import { Navigation } from "react-native-navigation"

export const other = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: "App",
        children: [
          {
            component: {
              name: "Home"
            }
          }
        ]
      }
    }
  })

export const goHome = () =>
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            name: "Sample",
            passProps: {
              text: "This is a left side menu screen"
            }
          }
        },
        center: {
          component: {
            name: "Home"
          }
        }
      }
    }
  })

export const goToAuth = () =>
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: "BottomTabsId",
        children: [
          {
            component: {
              name: "Sample",
              options: {
                bottomTab: {
                  fontSize: 12,
                  text: "Sign In"
                }
              }
            }
          },
          {
            component: {
              name: "Sample",
              options: {
                bottomTab: {
                  text: "Sign Up",
                  fontSize: 12
                }
              }
            }
          }
        ]
      }
    }
  })
