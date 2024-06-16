import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../../utilities/Color";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const { user } = useUser();
  const navigation: any = useNavigation();
  // console.log("🚀 ~ Header ~ user:", JSON.stringify(user, null, 2))
  return (
    <TouchableOpacity
      onPress={() => {
        navigation?.navigate("Profile");
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 20,
        }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{
            width: 43,
            height: 43,
            borderRadius: 20,
            // borderColor: Colors.PRIMARY,
            borderWidth: 2,
          }}
        />
        <View>
          <Image
            source={require("../../../assets/station-logo.png")}
            style={{ width: 150, height: 100, objectFit: "contain" }}
          />
        </View>
        <FontAwesome name="filter" size={24} color="#05051F" />
      </View>
    </TouchableOpacity>
  );
};

export default Header;

const styles = StyleSheet.create({});
