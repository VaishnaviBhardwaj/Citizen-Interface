import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  SafeAreaView,
  ImageBackground,
  Linking,
  ScrollView,
  YellowBox
} from "react-native";
import "@expo/vector-icons";
import {
  TextInput,
  TouchableOpacity,
  FlatList,
  LongPressGestureHandler
} from "react-native-gesture-handler";
import AwesomeButton from "react-native-really-awesome-button";
import * as firebase from "firebase";
import { Header } from "react-native-elements";
import call from 'react-native-phone-call';
export default class HomeScreen extends Component {
  state = {
    email: "",
    displayname: ""
  };
  componentDidMount() {
    const { email, displayname } = firebase.auth().currentUser;
    this.setState({ email, displayname });
  }
  signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        firebase.auth().onAuthStateChanged(user => {
          this.props.navigation.navigate(user ? "App" : "Auth");
        });
      });
  };
  call = () => {
    console.log("call")
    //handler to make a call
    const args = {
      number: '8171940441',
      prompt: false,
    };
   
    call(args).catch(console.error);
  };
  render() {
    return (
      <ImageBackground
        source={require("../../assets/Back.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <Header
          leftComponent={{
            icon: "menu",
            color: "#1C8ADB",
            onPress: () => this.props.navigation.openDrawer()
          }}
          centerComponent={{
            text: "MENU",
            style: {
              color: "#1C8ADB",
              fontWeight: "bold",
              fontSize: 22,
              letterSpacing: 3
            }
          }}
          rightComponent={{
            icon: "exit-to-app",
            color: "#1C8ADB",
            onPress: this.signOutUser
          }}
          backgroundColor="#fff"
        />

        <View style={styles.container}>
          <ScrollView>
            <View style={styles.titleWrapper}>
              <Image
                style={{ width: 150, height: 150 }}
                source={require("../../assets/logo.png")}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Form")}
            >
              <View style={styles.tab}>
                <Text style={styles.item}>Applications</Text>
                <Image
                  style={styles.img}
                  source={require("../../assets//2.png")}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("FIR")}
            >
              <View style={styles.tab}>
                <Text style={styles.item}>Online FIR</Text>
                <Image
                  style={styles.img}
                  source={require("../../assets//3.png")}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Noc")}
            >
              <View style={styles.tab}>
                <Text style={styles.item}>NOC Request</Text>
                <Image
                  style={styles.img}
                  source={require("../../assets//4.png")}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Recent")}
            >
              <View style={styles.tab}>
                <Text style={styles.item}>Recent Activities</Text>
                <Image
                  style={styles.img}
                  source={require("../../assets//6.png")}
                />
              </View>
            </TouchableOpacity>
          </ScrollView>
          <View style={styles.sos}>
            <View style={styles.sos}>
            <AwesomeButton onPress={() => this.call()} backgroundColor="white" style={{}} backgroundDarker="red">
              <Image
                style={{ height: 50, width: 50, padding: 10 }}
                source={require("../../assets/SOS.png")}
              />
            </AwesomeButton>
            </View>
            <View style={styles.sos}>
            <AwesomeButton onPress={() => this.props.navigation.navigate("Chat")} backgroundColor="white" backgroundDarker="red">
              <Image
                style={{ height: 50, width: 50, padding: 10 }}
                source={require("../../assets/Chatbot.png")}
              />
            </AwesomeButton>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10
  },
  sos: {
    flex: 1,
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'center',
    margin: 10
  },
  img: {
    position: "absolute",
    right: 10,
    bottom: 10,
    alignItems: "center",
    height: 50,
    width: 50
  },
  tab: {
    flexDirection: "row",
    marginTop: 14,
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 5
  },
  tab_red: {
    flexDirection: "row",
    marginTop: 14,
    padding: 20,
    backgroundColor: "rgba(255,0,0,0.65)",
    borderRadius: 5
  },
  item: {
    alignItems: "center",
    fontSize: 20
  },
  titleWrapper: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
