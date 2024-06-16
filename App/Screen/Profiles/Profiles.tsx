import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Colors } from "../../../utilities/Color";
import { StatusBar } from "expo-status-bar";
import {
  Entypo,
  Ionicons,
  FontAwesome5,
  Zocial,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import { useAuth, useUser } from "@clerk/clerk-expo";

const services = [
  { title: "Help" },
  { title: "Payment" },
  { title: "Activity" },
];
const offer = [
  {
    id: 1,
    disc: "You have multiple promos",
    subDisc: "We'll automatically apply the one that saves you",
  },
  {
    id: 2,
    disc: "Safety Check up",
    subDisc: "Learn ways to make trip easy and safer",
  },
  { id: 3, disc: "Easy Access", subDisc: "Take an intractive tour" },
];

const support = [{ title: "Setting" }, { title: "Contact Us" }];
const Profiles = ({ navigation }) => {
  const { user } = useUser();

  const Render_SignOut = () => {
    const { isLoaded, signOut } = useAuth();
    if (!isLoaded) {
      return null;
    }

    return (
      <View
        style={{
          backgroundColor: Colors.PRIMARY,
          //   width: "100%",
          marginTop: "6%",
          height: 50,
          borderRadius: 20,
          justifyContent: "center",
          marginHorizontal: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            signOut();
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: Colors.WHITE,
              textAlign: "center",
            }}
          >
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, width: "100%", backgroundColor: "#f2f2f2" }}>
      <View
        style={{
          position: "absolute",
          left: 12,
          zIndex: 2,
          top: 46,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            console.log("dfesffsf");
            navigation.navigate("Home");
          }}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View
          style={{
            marginTop: "20%",
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 12,
          }}
        >
          <View>
            <Text style={{ fontSize: 38, fontWeight: '700' }}>
              Prakhar Maheshwari
            </Text>
            <Text style={{ fontSize: 20, fontWeight: '500', color: Colors.GREY }}>
              +91 76687 53621
            </Text>
            <View
              style={{
                width: 55,
                height: 25,
                marginTop: 10,
                alignItems: "center",
                flexDirection: "row",
                borderRadius: 7,
                marginLeft: 5,
                paddingLeft: 3,
                backgroundColor: "#E6E6E6",
              }}
            >
              <Entypo name="star" size={20} color="black" />
              <Text style={{ marginLeft: 3 }}>5.0</Text>
            </View>
          </View>
          <View style={{ marginRight: 10, marginTop: 10 }}>
            {/* <Image
            source={require("../../../assets/imagesPerson.png")}
            style={{ width: 80, height: 80, borderRadius: 50 }}
          /> */}
            <Image
              source={
                { uri: user?.imageUrl } ||
                require("../../../assets/imagesPerson.png")
              }
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
                // borderColor: Colors.PRIMARY,
                // borderWidth: 2,
              }}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          {services.map((item, index) => (
            <View
              key={index}
              style={{
                height: 90,
                borderRadius: 10,
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "6%",
                //   borderWidth: 2,
                width: "25%",
                backgroundColor: "#E6E6E6",
              }}
            >
              {item.title == "Help" && (
                <Ionicons name="help-buoy" size={26} color="black" />
              )}
              {item.title == "Payment" && (
                <FontAwesome5 name="money-check" size={21} color="black" />
              )}
              {item.title == "Activity" && (
                <Zocial name="evernote" size={21} color="black" />
              )}
              <Text style={{ fontSize: 16, fontWeight: "300" }}>
                {" "}
                {item.title}
              </Text>
            </View>
          ))}
        </View>
        <View style={{ marginVertical: 30 }}>
          {/* <View> */}
          {offer.map((item, index) => (
            <View
              key={index}
              style={{
                marginHorizontal: 10,
                alignItems: "flex-start",
                paddingStart: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 17,
                backgroundColor: "#E6E6E6",
                marginVertical: 9,
                borderRadius: 10,
              }}
            >
              <View>
                <Text style={{ fontSize: 16 }}>{item.disc}</Text>
                <Text
                  style={{
                    fontSize: 13,
                    // width: "60%",
                    color: Colors.GREY,
                    flexWrap: "wrap",
                  }}
                >
                  {item.subDisc}
                </Text>
              </View>
              {item.id == 1 ? (
                <Image
                  source={require("../../../assets/tag.png")}
                  style={{ width: 70, height: 50, alignSelf: "center" }}
                />
              ) : item.id == 2 ? (
                <Image
                  source={require("../../../assets/progress.png")}
                  style={{ width: 70, height: 50, alignSelf: "center" }}
                />
              ) : (
                <Image
                  source={require("../../../assets/note.png")}
                  style={{
                    width: 60,
                    height: 70,
                    objectFit: "contain",
                    alignSelf: "center",
                    transform: [{ rotateZ: "-25deg" }],
                  }}
                />
              )}
            </View>
          ))}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          {support.map((item, index) => (
            <View
              key={index}
              style={{
                height: 75,
                borderRadius: 10,
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                marginTop: -10,
                //   borderWidth: 2,
                width: "44%",
                backgroundColor: "#E6E6E6",
              }}
            >
              {item.title == "Setting" && (
                <AntDesign name="setting" size={26} color="black" />
              )}
              {item.title == "Contact Us" && (
                <MaterialIcons name="contact-support" size={26} color="black" />
              )}
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                {" "}
                {item.title}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <Render_SignOut />
      {/* </View> */}
    </View>
  );
};

export default Profiles;

const styles = StyleSheet.create({});
