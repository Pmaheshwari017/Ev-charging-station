import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Colors } from "../../../utilities/Color";
import { useWarmUpBrowser } from "../../../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View
      style={{
        ...styles.constainer,
      }}
    >
      <Image
        source={require("../../../assets/station-logo.png")}
        style={styles.logo}
      />
      <Image
        source={require("../../../assets/ev-charging.jpeg")}
        style={styles.bgimage}
      />
      <View style={{ padding: 20 }}>
        <Text style={styles.heading}>Your Ultimate EV-Charging finder app</Text>
        <Text style={styles.subheading}>
          Find the nearest EV-Charging station, plan trip and so much more in
          just one click
        </Text>
        <TouchableOpacity onPress={() => onPress()}>
          <View style={styles.loginBtn}>
            <Text style={{ color: Colors.WHITE }}>Login With Google</Text>
          </View>
        </TouchableOpacity>
        <ImageBackground
          source={require("../../../assets/earth3.jpeg")}
          resizeMode="cover"
          style={styles.image1}
        ></ImageBackground>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  logo: {
    width: 190,
    height: 100,
    marginTop: 20,
    objectFit: "contain",
  },
  bgimage: {
    marginTop: 10,
    width: "100%",
    objectFit: "cover",
    opacity: 0.8,
  },

  heading: {
    fontFamily: "Outfit-Bold",
    fontSize: 30,
    textAlign: "center",
    marginTop: 20,
  },
  subheading: {
    // fontFamily: "",
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
    color: Colors.GREY,
  },
  loginBtn: {
    backgroundColor: Colors.PRIMARY,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    padding: 15,
    borderRadius: 99,
    marginTop: 60,
  },
  image1: {
    // flex: 1,
    // width: "100%",
    marginTop: 70,
    // marginLeft: 20,
    justifyContent: "center",
    height: 150,
    objectFit: "contain",
    opacity: 0.3,
  },
});
