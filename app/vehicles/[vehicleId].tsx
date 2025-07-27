import { getVehicleById, type Vehicle } from "@/api";
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
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function VehicleInfo() {
  const { vehicleId } = useLocalSearchParams<{ vehicleId: string }>();
  const [vehicle, setVehicle] = useState<Vehicle>();
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const films = useStore((state) => state.films);
  const people = useStore((state) => state.people);
  const router = useRouter();

  useEffect(() => {
    if (vehicleId) {
      setLoading(true);
      getVehicleById(vehicleId)
        .then((res) => {
          setLoading(false);
          setVehicle(res);
        })
        .catch((err) => {
          Toast.offline("Network error...");
        });
    }
  }, [vehicleId]);

  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom }}>
      <Stack.Screen options={{ title: vehicle?.name || "Vehicle" }} />

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
                  <List.Item extra={vehicle?.name}>Name</List.Item>
                  <List.Item extra={vehicle?.vehicle_class}>Class</List.Item>
                  <List.Item extra={`${vehicle?.length} ft`}>Length</List.Item>
                  <List.Item
                    arrow="horizontal"
                    extra={people?.find((p) => p.id === getCategoryId(vehicle?.pilot))?.name}
                    onPress={() => {
                      router.navigate({
                        pathname: "/people/[personId]",
                        params: { personId: getCategoryId(vehicle?.pilot) },
                      });
                    }}
                  >
                    Pilot
                  </List.Item>
                  <Collapse defaultActiveKey={[]}>
                    <Collapse.Panel
                      key="description"
                      title="Description"
                      arrow={(active) => (active ? <Icon name="minus" /> : <Icon name="plus" />)}
                    >
                      {vehicle?.description}
                    </Collapse.Panel>
                    <Collapse.Panel
                      key="films"
                      title="Films"
                      arrow={(active) => (active ? <Icon name="minus" /> : <Icon name="plus" />)}
                    >
                      <List>
                        {vehicle?.films.map((filmLink) => {
                          const filmId = getCategoryId(filmLink);
                          const film = films.find((f) => f.id === filmId);

                          return (
                            <List.Item
                              key={filmLink}
                              arrow="horizontal"
                              onPress={() => {
                                router.navigate({
                                  pathname: "/films/[filmId]",
                                  params: { filmId },
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
