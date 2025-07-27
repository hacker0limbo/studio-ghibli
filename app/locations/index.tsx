import { type Location, getLocations } from "@/api";
import { Card, List, Toast, WhiteSpace, WingBlank } from "@ant-design/react-native";
import { Stack, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Locations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const router = useRouter();
  // store copy of locations
  const locationsRef = useRef<Location[]>([]);

  useEffect(() => {
    setLoading(true);
    getLocations()
      .then((res) => {
        setLocations(res);
        locationsRef.current = res;
        setLoading(false);
      })
      .catch((err) => {
        Toast.offline("Network error...");
      });
  }, []);

  // filter locations by search text
  const filterLocationsByText = useCallback((text: string) => {
    if (text === "") {
      setLocations(locationsRef.current);
    } else {
      setLocations(
        locationsRef.current.filter((location) =>
          location.name.toLocaleLowerCase().includes(text.toLocaleLowerCase())
        )
      );
    }
  }, []);

  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom }}>
      <Stack.Screen
        options={{
          title: "Locations",
          headerSearchBarOptions: {
            onSearchButtonPress: (e) => {
              const text = e.nativeEvent.text.trim();
              filterLocationsByText(text);
            },
            onCancelButtonPress: () => {
              filterLocationsByText("");
            },
            placeholder: "Search locations by name",
          },
        }}
      />
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator animating={loading} size="large" />
        </View>
      ) : (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {locations.map((location) => (
            <Pressable
              key={location.id}
              onPress={() => {
                router.navigate({
                  pathname: `/locations/[locationId]`,
                  params: { locationId: location.id },
                });
              }}
            >
              <WhiteSpace size="lg" />
              <WingBlank>
                <Card>
                  <Card.Body>
                    <List>
                      <List.Item extra={location.name}>Name</List.Item>
                      <List.Item extra={location.climate}>Climate</List.Item>
                      <List.Item extra={location.terrain}>Terrain</List.Item>
                      <List.Item extra={`${location.surface_water}%`}>Surface Water</List.Item>
                    </List>
                  </Card.Body>
                </Card>
              </WingBlank>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
