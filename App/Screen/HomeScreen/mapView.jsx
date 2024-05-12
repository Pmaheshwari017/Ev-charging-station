import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewStyles from '../../../utilities/MapViewStyle.json'
import { UserLocationContext } from '../../context/UserLocationContext'
import Markers from './Markers'
const MapAppView = ({ placeList }) => {
    // console.log("🚀 ~ MapAppView ~ placeList:", JSON.stringify(placeList, null, 2))
    // "latitude": 37.7937,
    // "longitude": -122.3965,
    const { location, setLocation } = useContext(UserLocationContext)
    // console.log("🚀 ~ MapAppView ~ location, setLocation :", location, setLocation)
    return (
        location?.latitude &&
        <MapView
            style={{ width: "100%", height: "100%" }}
            provider={PROVIDER_GOOGLE}
            // showsUserLocation={true}
            customMapStyle={MapViewStyles}
            region={{
                latitude: 37.7937,
                longitude: -122.3965,
                latitudeDelta: 0.0442,
                longitudeDelta: 0.0421,
            }}
        >
            {location ? <Marker
                coordinate={{
                    latitude: 37.7937,
                    longitude: -122.3965,
                }}>
                <Image source={require('../../../assets/loc_pointer.png')} style={{ width: 60, height: 60, resizeMode: 'cover' }} />
            </Marker> : null}
            {placeList?.map((placeList, index) => <Markers index={index} key={index} placeList={placeList} />
            )}
            {/* {placeList?.map((place, index) => {
                return (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: place.location.latitude,
                            longitude: place.location.longitude,
                        }}>
                        <Image source={require('../../../assets/blue-loc-pointer.png')} style={{ width: 30, height: 30, resizeMode: 'cover' }} />
                    </Marker>
                )
            })} */}
        </MapView>

    )
}

export default MapAppView

const styles = StyleSheet.create({})