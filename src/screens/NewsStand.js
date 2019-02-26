import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"
import { iOSUIKit } from "react-native-typography"

class Sample extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={iOSUIKit.largeTitleEmphasized}>Sample Component</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

export default Sample
