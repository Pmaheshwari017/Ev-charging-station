import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Data } from "../../../dummyData";
import PlaceItem from "./placeItem";
import { SelectedMarkerContext } from "../../context/SelectedMarkerContext";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { app } from "../../../utilities/firebaseConfig";
import placeItem from "./placeItem";
import { Colors } from "../../../utilities/Color";

const placeListView = ({ placeList }) => {
  // console.log("🚀 ~ placeListView ~ placeList:", JSON.stringify(placeList, null, 2))
  const [favList, SetfavList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedMarker, setSelectedMarker } = useContext(
    SelectedMarkerContext
  );
  const [onFav, setOnFav] = useState(false);

  const Ref = useRef(null);
  const getUser = useUser();
  //   console.log(
  //     "🚀 ~ placeListVffiew ~ gddetUser:",
  //     JSON.stringify(getUser, null, 2)
  //   );

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [loading]);
  console.log("dfdfd--> ", getUser?.user?.emailAddresses[0].emailAddress);
  const onGetLayout = (_, index) => ({
    length: Dimensions.get("window").width,
    offset: Dimensions.get("window").width * index,
    index,
  });
  useEffect(() => {
    selectedMarker && onScrollToIndex(selectedMarker);
  });
  const onScrollToIndex = (index) => {
    Ref.current?.scrollToIndex({ index, animated: true });
  };
  const db = getFirestore(app);

  useEffect(
    useCallback(() => {
      getUser && getFirebaseFavData();
    }, [getUser]),
    []
  );

  const getFirebaseFavData = useCallback(async () => {
    SetfavList([]);
    console.log(
      "🚀 ~ getFirebaseFavData ~ etUser?.primfffffaryEfffffffffmailAddress?.emailAddress:",
      getUser?.user?.emailAddresses[0].emailAddress
    );

    const q = query(
      collection(db, "Ev-station_db")

      //   where(
      //     _query.filter[0].value.stringValue,
      //     "==",
      //     getUser?.user?.emailAddresses[0].emailAddress
      //   )
    );
    // console.log("🚀 ~ getFirebaseFavData ~ q:", JSON.stringify(q, null, 2));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // console.log("🚀 ~ querySnapshot.forEach ~ doc:", doc);
      // doc.data() is never undefined for query doc snapsh
      //   console.log(doc.id, " =sdfdfff> ", JSON.stringify(doc.data(), null, 2));
      SetfavList((favList) => [...favList, doc?.data()]);
    });
  }, []);

  const isFav = (place) => {
    // console.log("🚀 ~ isFav ~ place:", JSON.stringify(place, null, 2));
    // console.log("🚀 ~ result ~ favList:", JSON.stringify(favList, null, 2));

    const result = favList.find((item) => {
      // console.log("🚀 ~ resulfft ~ item:", JSON.stringify(item, null, 2));
      // console.log("🚀 ~ result ~ item.id == place.id;:", item.id == place.id);
      return item.id == place.id;
    });
    console.log("🚀 ~ result ~ resffult:", result ? true : false);
    // return result;
    return result ? true : false;
  };

  return (
    <View>
      <ActivityIndicator
        animating={loading}
        size="large"
        color={Colors.PRIMARY}
        style={{ zIndex: 11 }}
      />
      <FlatList
        ref={Ref}
        // scrollEnabled={onScroll}
        getItemLayout={onGetLayout}
        data={Data}
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
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default placeListView;

const styles = StyleSheet.create({});
