import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  SafeAreaView,
} from "react-native";
import styled from "styled-components/native";
import ScreenLayout from "../layout/ScreenLayout";
import HeaderBackground from "../../components/headerBackground/HeaderBackground";
import { TopHeaderTitle } from "../../components/title/Titles";
import MapView, { MarkerAnimated, PROVIDER_GOOGLE } from "react-native-maps";
import { useGetStudiosQuery, Studio } from "../../generated/types-and-hooks";
import Loader from "../../components/loader/Loader";
import SearchBar from "../../components/searchBar/SearchBar";
import { request, PERMISSIONS } from "react-native-permissions";
import Geolocation from "react-native-geolocation-service";
import Carousel from "react-native-snap-carousel";
import { RoundedButton } from "../../components/button/RoundedButton";

interface StudioProps {
  componentId: string;
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 0,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchBarOuterWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    zIndex: 99,
  },
  searchBarWrapper: {
    backgroundColor: null,
    width: "100%",
    height: 90,
  },
  carousel: {
    position: "absolute",
    bottom: 0,
    marginBottom: 10,
  },
  cardContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    height: 170,
    width: 300,
    padding: 24,
    borderRadius: 10,
  },
  cardTitle: {
    color: "black",
    fontSize: 18,
    fontWeight: "700",
    alignSelf: "flex-start",
  },
  cardDescription: {
    color: "black",
    fontSize: 15,
    alignSelf: "flex-start",
  },
  cardBottom: { flexDirection: "row", justifyContent: "center" },
});

const Studios = (props: StudioProps) => {
  const _map = useRef<MapView>(null);
  const _carousel = useRef<any>(null);
  const { data, error, loading } = useGetStudiosQuery();
  const initialPosition = useRef<any>(null);
  const [filterValue, setFilterValue] = useState<string>("");

  const requestLocationPermission = async () => {
    if (Platform.OS === "ios") {
      const response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (response === "granted") {
        locateCurrentPosition();
      }
    } else {
      const response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (response === "granted") {
        locateCurrentPosition();
      }
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const locateCurrentPosition = () => {
    // Getting current position takes time
    // This way the map's initial region will be the users country, and then it will animate to the current position
    // By turning highAccuracy off the delay is significantly less, and You dont need a meter-precis accuracy
    Geolocation.getCurrentPosition(
      (position: any) => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035,
        };

        if (_map.current && !initialPosition.current) {
          _map.current.animateToRegion(region);
        }
        initialPosition.current = region;
      },
      () => {
        // See error code charts below.
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
    );
  };

  if (loading) return <Loader animationType="fade" modalVisible={true} />;
  if (error) return <Text>Error</Text>;
  if (!data) {
    throw new Error("Data Undefined");
  }

  const onCarouselItemChange = (index: number) => {
    const location = data.studios[index];

    if (_map.current) {
      _map.current.animateToRegion({
        latitude: Number(location.coordinates.lat),
        longitude: Number(location.coordinates.long),
        latitudeDelta: 0.09,
        longitudeDelta: 0.035,
      });
    }
  };

  const onMarkerPressed = (location: any, index: number) => {
    if (_map.current) {
      _map.current.animateToRegion({
        latitude: Number(location.coordinates.lat),
        longitude: Number(location.coordinates.long),
        latitudeDelta: 0.09,
        longitudeDelta: 0.035,
      });
    }

    if (_carousel.current) {
      _carousel.current.snapToItem(index);
    }
  };

  const filterSearch = (val: boolean, text: string) => {
    // setIsSearching(val);
    // search({
    //   variables: {
    //     searchText: text,
    //   },
    // });
    setFilterValue(text);
  };

  const generateData = () => {
    if (!filterValue) return data.studios;
    return data.studios.filter((studio) => {
      if (
        studio.name
          ?.trim()
          .toLowerCase()
          .includes(filterValue.trim().toLowerCase())
      )
        return true;
      if (
        studio.description
          ?.trim()
          .toLowerCase()
          .includes(filterValue.trim().toLowerCase())
      )
        return true;

      return false;
    });
  };

  const renderCarouselItem = (studio: any) => {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>{studio.item.name}</Text>
        <Text style={styles.cardDescription}>{studio.item.description}</Text>
        <View style={styles.cardBottom}>
          <RoundedButton text="Webseite" />
          <RoundedButton text="Anrufen" />
        </View>
      </View>
    );
  };

  return (
    <ScreenLayout componentId={props.componentId}>
      <SafeAreaView style={styles.searchBarOuterWrapper}>
        <SearchBar onBlur={filterSearch} style={styles.searchBarWrapper} />
      </SafeAreaView>
      <StudioContainer>
        <HeaderBackground />
        <HeaderTitleContainer>
          <HeaderTitle title="Studios in deiner Nähe" />
        </HeaderTitleContainer>
        <StudioContent style={styles.container}>
          <MapView
            // provider={PROVIDER_GOOGLE}
            ref={_map}
            showsUserLocation={true}
            style={styles.map}
            minZoomLevel={2}
          >
            {data.studios.map(
              (
                studio: Pick<
                  Studio,
                  "id" | "name" | "coordinates" | "description"
                >,
                index
              ) => (
                <MarkerAnimated
                  key={studio.id}
                  pinColor="#3aa8a5"
                  coordinate={{
                    latitude: Number(studio.coordinates.lat),
                    longitude: Number(studio.coordinates.long),
                  }}
                  title={studio.name}
                  description={studio.description || ""}
                  onPress={() => {
                    onMarkerPressed(studio, index);
                  }}
                />
              )
            )}
          </MapView>
          <Carousel
            ref={_carousel}
            data={generateData()}
            containerCustomStyle={styles.carousel}
            renderItem={renderCarouselItem}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={300}
            removeClippedSubviews={false}
            onSnapToItem={(index) => onCarouselItemChange(index)}
          />
        </StudioContent>
      </StudioContainer>
    </ScreenLayout>
  );
};

export default Studios;

const StudioContainer = styled(View)`
  flex: 1;
  position: relative;
`;

const StudioContent = styled(View)`
  height: 100%;
  width: 100%;
`;

const HeaderTitle = styled(TopHeaderTitle)`
  max-width: 250px;
`;

const HeaderTitleContainer = styled(View)`
  align-self: center;
  position: absolute;
  top: 50px;
`;
