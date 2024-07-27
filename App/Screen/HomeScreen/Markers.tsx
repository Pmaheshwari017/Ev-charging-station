import { Image, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Marker } from "react-native-maps";
import { SelectedMarkerContext } from "../../context/SelectedMarkerContext";

const Markers = ({ index, placeList }) => {
  const [chooseMaker, setChooseMaker] = useState()
  const [flagSelector, setFlagSelector] = useState(true)
  const [customStyle, setCustomStyle] = useState(30);
  const { selectedMarker, setSelectedMarker } = useContext(
    SelectedMarkerContext
  );

  useEffect(() => {
    if (flagSelector) {
      if (index == chooseMaker) {
        setCustomStyle(20)
        setFlagSelector(false)
      }
    } else {
      setCustomStyle(30)
      setFlagSelector(true)
    }
  }, [chooseMaker])

  return (
    placeList && (
      <Marker
        key={index}
        coordinate={{
          latitude: placeList.location.latitude,
          longitude: placeList.location.longitude,
        }}
        onPress={() => {
          setChooseMaker(index)
          setSelectedMarker(index);
          setCustomStyle(30)

        }}
      >
        <Image
          source={require("../../../assets/blue-loc-pointer.png")}
          style={{ width: customStyle, height: customStyle, resizeMode: "cover", objectFit: 'contain' }}
        />
      </Marker>
    )
  );
};

export default Markers;

const styles = StyleSheet.create({});
