import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Colors } from "../../../utilities/Color";
import PlaceItem from "../HomeScreen/placeItem";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { app } from "../../../utilities/firebaseConfig";
import { useUser } from "@clerk/clerk-expo";

const Favorites = () => {
  const db = getFirestore(app);
  const getUser = useUser();
  const [loading, setLoading] = useState(false);
  const [forceRerender, setForceRender] = useState(true);
  const [favList, SetfavList] = useState([]);
  console.log("🚀 ~ Favorites ~ favList:", JSON.stringify(favList, null, 2));

  const getFirebaseFavData = async () => {
    setLoading(true);
    SetfavList([]);
    const q = query(collection(db, "Ev-station_db"));
    const querySnapshot = await getDocs(q);
    console.log("🚀 ~ getFirebaseFavData ~ querySnapshot:", querySnapshot);
    querySnapshot.forEach((doc) => {
      SetfavList((favList) => [...favList, doc?.data()]);
    });
    setLoading(false);
  };
  useEffect(() => {
    if (forceRerender) {
      setForceRender(false);
    }
  });
  const isFav = (place: any) => {
    const result = favList.find((item) => {
      return item.id == place.id;
    });
    console.log("🚀 ~ result ~ resffult:", result ? true : false);
    return result ? true : false;
  };

  useEffect(() => {
    console.log("Fsfddffdsfsfgsdgf");
    getFirebaseFavData();
  }, [forceRerender]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: "13%",
          borderWidth: 1,
          borderColor: Colors.GREY,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          marginBottom: 10,
        }}
      >
        <Text style={{ marginTop: "14%", fontSize: 26, alignSelf: "center" }}>
          My Favorite <Text style={{ color: Colors.PRIMARY }}>Places</Text>
        </Text>
      </View>

      {/* {!favList ? (
        <>
          <ActivityIndicator
            size="large"
            color={Colors.PRIMARY}
            animating={true}
          />
        </>
      ) : ( */}

      <FlatList
        data={favList}
        onRefresh={() => {
          getFirebaseFavData();
        }}
        refreshing={loading}
        renderItem={({ item, index }) => {
          return (
            <View key={index}>
              <PlaceItem
                place={item}
                isFavItem={isFav(item)}
                getMarkFav={() => {
                  getFirebaseFavData();
                }}
              />
            </View>
          );
        }}
      />

      {/* ) */}
      {/* } */}
    </SafeAreaView>
  );
};

export default Favorites;

const styles = StyleSheet.create({});
