import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Colors } from "../../../utilities/Color";
import { API_KEY } from "../../../utilities/globalAPI";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { getFirestore } from "firebase/firestore";
import { app } from "../../../utilities/firebaseConfig";

const placeItem = ({ place }) => {
  const [isFav, setIsFav] = React.useState(false);
  const db = getFirestore(app);
  const GOOGLE_PHOTO_BASE_URL = "https://places.googleapis.com/v1/";
  const ImageCheck = `${GOOGLE_PHOTO_BASE_URL}${place?.photos[0]?.name}/media?key=${API_KEY}&maxHeightPx=450&maxWidthPx=450`;
  const handleFav = () => {
    console.log("first");
    setIsFav(!isFav);
  };
  // const ImageCheck2 = GOOGLE_PHOTO_BASE_URL + place.photos > 0 ? place?.photos[0]?.name : null + "/media?key=" + "API_KEY" + "&maxHeightPx=450&maxWidthPx=450"
  // console.log("🚀 ~ placeItem ~ ImageCheck:", ImageCheck)
  // console.log("---->", place.photos > 0 ? place?.photos[0]?.name : "hello")
  // console.log("🚀 ~ placeItem ~ ImageCheck", ImageCheck2);
  return (
    <View style={{ zIndex: 1 }}>
      <TouchableOpacity onPress={handleFav}>
        <View
          style={{
            position: "absolute",
            right: 10,
            zIndex: 11,
            //   marginRight: "4%",
            //   marginTop: "2%",
          }}
        >
          {isFav ? (
            <Ionicons name="heart" size={30} color={Colors.BLACK} />
          ) : (
            <Ionicons name="heart-outline" size={30} color={Colors.BLACK} />
          )}
        </View>
      </TouchableOpacity>
      <View
        style={{
          width: Dimensions.get("screen").width * 0.9,
          marginRight: 23,
          // backgroundColor: 'white',
          borderRadius: 50,
          marginBottom: 27,
          marginHorizontal: 20,
          // marginRight: 5
        }}
      >
        <LinearGradient colors={["transparent", "#ffffff", "#ffffff"]}>
          <Image
            source={
              !ImageCheck
                ? { uri: ImageCheck }
                : require("../../../assets/image1.png")
            }
            style={{ width: "100%", height: 220, borderRadius: 20, zIndex: -1 }}
          />
          <View style={{ padding: 5 }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Outfit",
              }}
            >
              {" "}
              {place?.displayName?.text}
            </Text>
            <Text
              style={{
                fontFamily: "Outfit",
                color: Colors.GREY,
              }}
            >
              {" "}
              {place?.shortFormattedAddress}
            </Text>

            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Outfit",
                    color: Colors.GREY,
                  }}
                >
                  {" "}
                  Connector :{" "}
                </Text>
                <Text
                  style={{
                    color: Colors.BLACK,
                    fontFamily: "Outfit-SemiBold",
                  }}
                >
                  {" "}
                  {place?.evChargeOptions?.connectorCount
                    ? place?.evChargeOptions?.connectorCount
                    : 0}{" "}
                  Points
                </Text>
              </View>
              <View
                style={{
                  padding: 10,
                  paddingHorizontal: 14,
                  paddingVertical: 13,
                  backgroundColor: Colors.PRIMARY,
                  borderRadius: 10,
                  marginRight: 10,
                  marginBottom: 10,
                }}
              >
                <FontAwesome
                  name="location-arrow"
                  size={25}
                  color={Colors.WHITE}
                />
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default placeItem;

const styles = StyleSheet.create({});
