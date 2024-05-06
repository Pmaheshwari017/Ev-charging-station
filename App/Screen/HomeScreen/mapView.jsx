import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewStyles from '../../../utilities/MapViewStyle.json'
import { UserLocationContext } from '../../context/UserLocationContext'
const MapAppView = () => {

    const { location, setLocation } = useContext(UserLocationContext)
    console.log("🚀 ~ MapAppView ~ location, setLocation :", location, setLocation)
    return (
        location?.latitude &&
        <MapView
            style={{ width: "100%", height: "100%" }}
            provider={PROVIDER_GOOGLE}
            // showsUserLocation={true}
            customMapStyle={MapViewStyles}
            region={{
                latitude: location?.latitude,
                longitude: location?.longitude,
                latitudeDelta: 0.0442,
                longitudeDelta: 0.0421,
            }}
        >
            <Marker
                coordinate={{
                    latitude: location?.latitude,
                    longitude: location?.longitude,
                }}>
                <Image source={require('../../../assets/car-marker.png')} style={{ width: 60, height: 60, resizeMode: 'cover' }} />
            </Marker>
        </MapView>

    )
}

export default MapAppView

const styles = StyleSheet.create({})