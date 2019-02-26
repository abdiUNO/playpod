/* eslint-disable react-native/sort-styles */
import React, { Component } from "react"
import {
  View,
  Modal,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native"
import { Header, Icon } from "react-native-elements"
import PropTypes from "prop-types"
import { iOSColors, iOSUIKit, systemWeights } from "react-native-typography"

class ArticleModal extends Component {
  static propTypes = {
    closePost: PropTypes.func,
    onSave: PropTypes.func,
    visible: PropTypes.bool,
    article: PropTypes.object
  }

  render() {
    if (this.props.article) {
      var {
        article: { urlToImage, title, source, content, bookmarked }
      } = this.props
    }

    return (
      <Modal
        animationType="slide"
        visible={this.props.visible}
        style={styles.modal}
        onRequestClose={this.props.closePost}
      >
        <Header
          outerContainerStyles={{
            paddingTop: 0,
            paddingBottom: 14,
            paddingHorizontal: 15
          }}
          containerStyle={{
            borderBottomWidth: 0,
            paddingTop: 7,
            marginBottom: 14
          }}
          backgroundColor="#fff"
          leftComponent={
            <TouchableOpacity onPress={() => this.props.closePost()}>
              <Icon
                iconStyle={{
                  alignSelf: "center"
                }}
                color="#000"
                name="close"
              />
            </TouchableOpacity>
          }
          rightComponent={
            <TouchableOpacity
              onPress={() => this.props.onSave(this.props.article)}
            >
              <Icon
                iconStyle={{
                  marginTop: 10
                }}
                color="#000"
                name={bookmarked ? "bookmark" : "bookmark-border"}
              />
            </TouchableOpacity>
          }
        />
        <ScrollView style={{ flex: 1 }}>
          <View style={{ padding: 15, paddingTop: 0 }}>
            <Text style={styles.sourceTitle}>{source ? source.name : ""}</Text>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.imageContainer}>
            {urlToImage ? (
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
            )}
          </View>
          <View style={styles.modalContent}>
            <Text style={styles.body}>{content}</Text>
          </View>
        </ScrollView>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    margin: 8,
    backgroundColor: "#FF8900",
    padding: 25
  },
  modalContent: {
    padding: 15
  },
  body: {
    ...iOSUIKit.body,
    paddingTop: 15
  },
  image: {
    height: 250,
    flex: 1,
    resizeMode: "contain"
  },
  imageContainer: {
    flex: 1,
    marginBottom: 0,
    backgroundColor: iOSColors.white
  },
  title: {
    ...iOSUIKit.title3Emphasized,
    ...systemWeights.bold,
    marginBottom: 20
  },
  sourceTitle: {
    ...iOSUIKit.subheadEmphasized,
    ...systemWeights.bold,
    fontSize: 16,
    color: iOSColors.blue,
    marginBottom: 5
  }
})

export default ArticleModal
