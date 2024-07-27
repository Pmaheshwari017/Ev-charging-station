import {
  ActivityIndicator,
  Dimensions,
  Image,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { lazy, useEffect, useState } from "react";
import { Colors } from "../../../utilities/Color";
import { API_KEY } from "../../../utilities/globalAPI";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { getFirestore } from "firebase/firestore";
import { app } from "../../../utilities/firebaseConfig";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";

const placeItem = ({ place, isFavItem, getMarkFav }) => {
  const [isFav, setIsFav] = React.useState(false);
  const [isfavAdd, setIsfavAdd] = useState(false);
  const [isfavDelete, setIsfavDelete] = useState(false);

  const getUserDetails = useUser();
  const db = getFirestore(app);
  const GOOGLE_PHOTO_BASE_URL = "https://places.googleapis.com/v1/";
  const ImageCheck = `${GOOGLE_PHOTO_BASE_URL}${place?.photos[0]?.name}/media?key=${API_KEY}&maxHeightPx=450&maxWidthPx=450`;
  const [getMark, setGetMark] = useState(false);
  const [loading, setLoading] = useState(false);
  const onFavHandler = async (place) => {
    console.log("🚀 ~ onFavHandler ~ place:", place.id);
    await setDoc(doc(db, "Ev-station_db", place?.id), place);
    ToastAndroid.show("Added to Favorite", ToastAndroid.TOP);
  };

  const onPressDirectionHandler = () => {
    const Url = Platform.select({
      ios:
        "maps:" +
        place?.location?.latitude +
        "," +
        place?.location?.longitude +
        "?q=" +
        place?.formattedAddress,
      android:
        "geo:" +
        place?.location?.latitude +
        "," +
        place?.location?.longitude +
        "?q=" +
        place?.formattedAddress,
    });

    Linking.openURL(Url);
  };
  const deleteFavItem = async (place) => {
    console.log("🚀 ~ deleteFavItem ~ placeItem:", place);
    await deleteDoc(doc(db, "Ev-station_db", place?.id));
    ToastAndroid.show(
      "Removed from Favorite",
      ToastAndroid.CENTER,

    );
  };
  const handleFav = () => {
    console.log("Handling favorite for item ID:", isFavItem[0]?.id);
    setLoading((prev) => !prev);
    setIsFav((prev) => !prev);
    setIsfavDelete((prev) => !prev);
    if (isfavDelete) {
      deleteFavItem(place);
    } else {
      onFavHandler(place);
    }
    getMarkFav();
  };
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [loading]);
  useEffect(() => {
    console.log(
      "checkfdsvfdvf",
      "maps:" +
      place?.location?.latitude +
      "," +
      place?.location?.longitude +
      "?q=" +
      place?.formattedAddress
    );
    setIsfavDelete(isFavItem);
  }, [isFavItem]);
  // const ImageCheck2 = GOOGLE_PHOTO_BASE_URL + place.photos > 0 ? place?.photos[0]?.name : null + "/media?key=" + "API_KEY" + "&maxHeightPx=450&maxWidthPx=450"
  return (
    <View style={{ zIndex: 1 }}>
      <View
        style={{
          position: "absolute",
          right: "10%",
          top: "2%",
          zIndex: 11,
          //   marginRight: "4%",
          //   marginTop: "2%",
        }}
      >
        {loading ? (
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
        ) : (
          <TouchableOpacity onPress={handleFav}>
            {/* {console.log("---sdfdsfdf-----", isFavItem)} */}
            {isfavDelete ? (
              <Ionicons name="heart" size={35} color={Colors.RED} />
            ) : (
              <Ionicons name="heart-outline" size={35} color={Colors.RED} />
            )}
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          width: Dimensions.get("screen").width * 0.9,
          marginRight: 23,
          borderRadius: 50,
          // height: '80%',
          marginBottom: -10,
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
              <TouchableOpacity
                onPress={() => {
                  onPressDirectionHandler();
                }}
              >
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
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default placeItem;

const styles = StyleSheet.create({});
