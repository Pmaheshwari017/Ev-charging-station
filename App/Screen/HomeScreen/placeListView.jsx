import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useRef } from 'react'
import { Data } from '../../../dummyData'
import PlaceItem from './placeItem'
import { SelectedMarkerContext } from '../../context/SelectedMarkerContext'

const placeListView = ({ placeList }) => {
    // console.log("🚀 ~ placeListView ~ placeList:", JSON.stringify(placeList, null, 2))

    const { selectedMarker, setSelectedMarker } = useContext(SelectedMarkerContext)
    const Ref = useRef(null);

    const onGetLayout = (_, index) => ({
        length: Dimensions.get('window').width,
        offset: Dimensions.get('window').width * index,
        index
    }
    )
    useEffect(() => {
        selectedMarker && onScrollToIndex(selectedMarker)
    },)
    const onScrollToIndex = (index) => {
        Ref.current?.scrollToIndex({ index, animated: true })
    }

    return (
        <View>
            <FlatList
                ref={Ref}
                // scrollEnabled={onScroll}
                getItemLayout={onGetLayout}
                data={Data}
                renderItem={({ item, index }) => {
                    return (
                        <View key={index}>
                            <PlaceItem place={item} />
                        </View>
                    )
                }}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default placeListView

const styles = StyleSheet.create({})