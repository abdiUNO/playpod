/* eslint-disable react-native/sort-styles */
import React, { Component } from "react"
import {
  View,
  ScrollView,
  Text,
  StatusBar,
  SafeAreaView,
  StyleSheet
} from "react-native"
import ArticleCard from "./components/ArticleCard"
import ArticleModal from "./components/ArticleModal"
import ArticlesCarousel from "./components/ArticlesCarousel"
import { iOSColors, iOSUIKit } from "react-native-typography"

const SLIDER_1_FIRST_ITEM = 0

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      visible: false,
      trendingArticles: [
        {
          source: { name: "" },
          title: null,
          description: null,
          urlToImage: null
        },
        {
          source: { name: "" },
          title: "",
          description: "",
          urlToImage: ""
        }
      ],
      articles: [
        {
          source: { name: "" },
          title: "",
          description: "",
          urlToImage: ""
        },
        {
          source: { name: "" },
          title: "",
          description: "",
          urlToImage: ""
        }
      ],
      selectedArticle: null
    }
  }

  componentDidMount() {
    fetch(
      "https://newsapi.org/v2/top-headlines?apiKey=84f61c16475c473c8c49a21725fa73f7&country=us&pageSize=20&page=1"
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          trendingArticles: responseJson.articles
        })
      })
      .catch(error => {
        console.error(error)
      })

    fetch(
      "https://newsapi.org/v2/top-headlines?apiKey=84f61c16475c473c8c49a21725fa73f7&country=us&pageSize=20&page=2"
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          articles: responseJson.articles
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  renderTrending = () => {
    return (
      <ArticlesCarousel
        onItemPress={item =>
          this.setState({ visible: true, selectedArticle: item })
        }
        firstItem={SLIDER_1_FIRST_ITEM}
        data={this.state.trendingArticles}
        onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
      />
    )
  }

  renderArticles = (item, index) => {
    return (
      <ArticleCard
        data={item}
        key={index}
        onPress={() => this.setState({ visible: true, selectedArticle: item })}
      />
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container}>
          <StatusBar
            translucent={true}
            backgroundColor={"rgba(0, 0, 0, 0.3)"}
            barStyle={"light-content"}
          />
          <ScrollView
            style={styles.scrollview}
            scrollEventThrottle={200}
            directionalLockEnabled={true}
          >
            {this.renderTrending()}
          </ScrollView>
          <View style={{ padding: 20 }}>
            <Text style={styles.largeTitle}>Briefing</Text>
            {this.state.articles.map(this.renderArticles)}
          </View>
        </ScrollView>
        <ArticleModal
          visible={this.state.visible && this.state.selectedArticle != null}
          article={this.state.selectedArticle}
          closePost={() => this.setState({ visible: false })}
          onSave={article => {
            const articles = this.state.articles.map(_item => {
              if (_item.url === article.url)
                _item.bookmarked = !_item.bookmarked
              return _item
            })

            this.setState({ articles })
          }}
        />
      </SafeAreaView>
    )
  }
}

const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#B721FF",
  background2: "#21D4FD"
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.black,
    flex: 1
  },
  container: {
    backgroundColor: iOSColors.white,
    flex: 1
  },
  scrollview: {
    flex: 1
  },
  largeTitle: {
    ...iOSUIKit.largeTitleEmphasizedObject,
    marginBottom: 20
  }
})
