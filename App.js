import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Linking,
  Share,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get('window');
export default class App extends Component {
  state = {
    news: [],
    loading: true,
  };

  fetchnews = () => {
    fetch(
      'http://newsapi.org/v2/everything?q=bitcoin&from=2020-09-08&sortBy=publishedAt&apiKey=f4c414b8cd424482a45f0321682c7567'
    )
      .then((res) => res.json())
      .then((response) => {
        this.setState({
          news: response.articles,
          loading: false,
        });
      });
  };

  sharearticle = async (article) => {
    try {
      await Share.share({
        message: 'Checkout this article ' + article,
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.fetchnews();
  }

  render() {
    if (this.state.loading) {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size="large" color="#fff" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={{ fontSize: 35, color: '#fff' }}>Top</Text>
            <Text style={{ fontSize: 35, color: '#fff' }}>Headline</Text>
          </View>
          <View style={styles.news}>
            <FlatList
              data={this.state.news}
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() => Linking.openURL(item.url)}
                  >
                    <View
                      style={{
                        width: width - 50,
                        height: 180,
                        backgroundColor: '#fff',
                        marginBottom: 15,
                        borderRadius: 15,
                      }}
                    >
                      <Image
                        source={{ uri: item.urlToImage }}
                        style={[StyleSheet.absoluteFill, { borderRadius: 15 }]}
                      />
                      <View style={styles.gradient}>
                        <Text
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            color: '#fff',
                            fontSize: 18,
                            padding: 5,
                          }}
                        >
                          {item.title}
                        </Text>
                        <AntDesign
                          name="sharealt"
                          style={{
                            fontSize: 25,
                            color: '#fff',
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            padding: 10,
                            fontWeight: 'bold',
                          }}
                          onPress={() => this.sharearticle(item.url)}
                        />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                );
              }}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },

  header: {
    padding: 30,
  },
  news: {
    alignSelf: 'center',
  },
  gradient: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
  },
});
