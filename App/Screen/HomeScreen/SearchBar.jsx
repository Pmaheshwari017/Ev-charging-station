import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { UserLocationContext } from "../../context/UserLocationContext";
const PROD = false;
const API = PROD ? "AIzaSyBUxiSuS1uiV6RsT3XrBxIDV3nnYVYx8MQ" : "";
const SearchBar = ({ seleLocation }) => {
  const { location, setLocation } = useContext(UserLocationContext);
  console.log("🚀 ~ SearchBar ~ location:", location);
  return (
    <View style={{ marginHorizontal: 20 }}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        enablePoweredByContainer={false}
        fetchDetails={true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log("------->", JSON.stringify(details, null, 2));
          setLocation(details?.geometry?.location);
          searchLocation(details?.geometry?.location);
        }}
        query={{
          key: API,
          language: "en",
        }}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
