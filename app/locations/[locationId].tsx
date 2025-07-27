import { type Location, getLocationById } from "@/api";
import { useStore } from "@/store";
import { getCategoryId } from "@/utils";
import {
  ActivityIndicator,
  Card,
  Collapse,
  Icon,
  List,
  Toast,
  WhiteSpace,
  WingBlank,
} from "@ant-design/react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LocationInfo() {
  const { locationId } = useLocalSearchParams<{ locationId: string }>();
  const [location, setLocation] = useState<Location>();
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const films = useStore((state) => state.films);
  const people = useStore((state) => state.people);
  const router = useRouter();

  // This location does not have residents, or the API is not providing them.
  const withOutResidents = useMemo(() => {
    return !people.length || !location?.residents?.length || location?.residents?.[0] === "TODO";
  }, [people, location]);

  useEffect(() => {
    if (locationId) {
      setLoading(true);
      getLocationById(locationId)
        .then((res) => {
          setLoading(false);
          setLocation(res);
        })
        .catch((err) => {
          Toast.offline("Network error...");
        });
    }
  }, [locationId]);

  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom }}>
      <Stack.Screen options={{ title: location?.name || "Location" }} />

      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" animating={loading} />
        </View>
      ) : (
        <ScrollView>
          <WhiteSpace size="lg" />
          <WingBlank>
            <Card>
              <Card.Body>
                <List>
                  <List.Item extra={location?.name}>Name</List.Item>
                  <List.Item extra={location?.climate}>Climate</List.Item>
                  <List.Item extra={location?.terrain}>Terrain</List.Item>
                  <List.Item extra={`${location?.surface_water}%`} multipleLine>
                    Surface Water
                    <List.Item.Brief>Percentage of surface water in the location</List.Item.Brief>
                  </List.Item>
                  {withOutResidents ? (
                    <List.Item
                      arrow="horizontal"
                      onPress={() => {
                        router.navigate({
                          pathname: "/people",
                        });
                      }}
                    >
                      Residents
                    </List.Item>
                  ) : (
                    <></>
                  )}
                  <Collapse defaultActiveKey={[]}>
                    {!withOutResidents ? (
                      <Collapse.Panel
                        key="residents"
                        title="Residents"
                        arrow={(active) => (active ? <Icon name="minus" /> : <Icon name="plus" />)}
                      >
                        <List>
                          {location?.residents.map((residentLink) => {
                            const residentId = getCategoryId(residentLink);
                            const resident = people.find((p) => p.id === residentId);

                            return (
                              <List.Item
                                key={residentLink}
                                arrow="horizontal"
                                onPress={() => {
                                  router.navigate({
                                    pathname: "/people/[personId]",
                                    params: { personId: residentId },
                                  });
                                }}
                              >
                                {resident?.name}
                              </List.Item>
                            );
                          })}
                        </List>
                      </Collapse.Panel>
                    ) : null}
                    <Collapse.Panel
                      key="films"
                      title="Films"
                      arrow={(active) => (active ? <Icon name="minus" /> : <Icon name="plus" />)}
                    >
                      <List>
                        {location?.films.map((filmLink) => {
                          const filmId = getCategoryId(filmLink);
                          const film = films.find((f) => f.id === filmId);

                          return (
                            <List.Item
                              key={filmLink}
                              arrow="horizontal"
                              onPress={() => {
                                router.navigate({
                                  pathname: "/films/[filmId]",
                                  params: { filmId: filmId },
                                });
                              }}
                            >
                              {film?.title}
                            </List.Item>
                          );
                        })}
                      </List>
                    </Collapse.Panel>
                  </Collapse>
                </List>
              </Card.Body>
            </Card>
          </WingBlank>
        </ScrollView>
      )}
    </View>
  );
}
