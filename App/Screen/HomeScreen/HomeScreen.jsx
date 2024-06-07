import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MapAppView from "./mapView";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { UserLocationContext } from "../../context/UserLocationContext";
import globalAPI from "../../../utilities/globalAPI";
import PlaceListView from "./placeListView";
import { Data } from "../../../dummyData";
import { SelectedMarkerContext } from "../../context/SelectedMarkerContext";

const HomeScreen = () => {
  const { location, setLocation } = useContext(UserLocationContext);
  console.log("🚀 ~ HomeScreen ~ location:", location);
  const [placeList, setPlaceList] = useState([]);

  const [selectedMarker, setSelectedMarker] = useState([]);
  useEffect(() => {
    if (location) {
      console.log("🚀 ~ useEffect ~ location:", location);
      // getnearByLocation(location);
      setPlaceList(Data);
    }
  }, [location]);

  const getnearByLocation = (location) => {
    const data = {
      includedTypes: ["electric_vehicle_charging_station"],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: 37.7937,
            longitude: -122.3965,
          },
          radius: 5000.0,
        },
      },
    };

    globalAPI.NearByPlaces(data).then((res) => {
      // setPlaceList(res.data?.places)
    });
  };
  return (
    <SelectedMarkerContext.Provider
      value={{ selectedMarker, setSelectedMarker }}
    >
      <View>
        <View style={styles.headerContainer}>
          <Header />
          <SearchBar
            searchLocation={(location) => () => {
              console.log("🚀 ~ HomeScreen ~--- location:", location);
              return setLocation(location);
            }}
          />
        </View>
        <MapAppView placeList={placeList} />
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "position" : "height"}
          style={{ position: "absolute", zIndex: 1, bottom: 0 }}
        >
          {/* <View style={{ position: 'absolute', zIndex: 1, bottom: 0, }}> */}
          <PlaceListView placeList={placeList} />
          {/* </View> */}
        </KeyboardAvoidingView>
      </View>
    </SelectedMarkerContext.Provider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    marginTop: 20,
    width: "100%",
    zIndex: 10,
    paddingHorizontal: 10,
  },
  placeContainer: {
    position: "absolute",
    zIndex: 1,
    bottom: 0,
  },
});
