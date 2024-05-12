import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Marker } from 'react-native-maps'
import { SelectedMarkerContext } from '../../context/SelectedMarkerContext'

const Markers = ({ index, placeList }) => {
    const { selectedMarker, setSelectedMarker } = useContext(SelectedMarkerContext)
    return (
        placeList && <Marker
            key={index}
            coordinate={{
                latitude: placeList.location.latitude,
                longitude: placeList.location.longitude,
            }}
            onPress={() => {
                console.log("🚀 ~ Markers ~ inde:", index)
                return setSelectedMarker(index)
            }
            }
        >

            <Image source={require('../../../assets/blue-loc-pointer.png')} style={{ width: 30, height: 30, resizeMode: 'cover' }} />
        </Marker>



    )
}

export default Markers

const styles = StyleSheet.create({})