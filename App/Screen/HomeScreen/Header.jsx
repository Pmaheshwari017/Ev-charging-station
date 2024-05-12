import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../../utilities/Color'

const Header = () => {
    const { user } = useUser()
    // console.log("🚀 ~ Header ~ user:", JSON.stringify(user, null, 2))
    return (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", marginHorizontal: 20 }}>
            <Image source={{ uri: user?.imageUrl }}
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    borderColor: Colors.PRIMARY,
                    borderWidth: 2
                }}
            />
            <View>

                <Image source={require('../../../assets/station-logo.png')} style={{ width: 150, height: 100, objectFit: 'contain' }} />
            </View>
            <FontAwesome name="filter" size={24} color="#05051F" />

        </View>
    )
}

export default Header

const styles = StyleSheet.create({})