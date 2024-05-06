import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapAppView from './mapView'
import Header from './Header'

const HomeScreen = () => {
    return (
        <View>
            <View style={styles.headerContainer}>
                <Header />
            </View>
            <MapAppView />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        // borderWidth: 1,
        marginTop: -20,
        // borderColor: 'red',
        width: '100%',
        // marginTop: 20,

        zIndex: 10,
        paddingHorizontal: 10
    }
})