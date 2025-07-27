import { type Vehicle, getVehicles } from "@/api";
import { Card, List, Toast, WhiteSpace, WingBlank } from "@ant-design/react-native";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    getVehicles()
      .then((res) => {
        setVehicles(res);
        setLoading(false);
      })
      .catch((err) => {
        Toast.offline("Network error...");
      });
  }, []);

  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom }}>
      <Stack.Screen
        options={{
          title: "Vehicles",
          // only have three vehicles, so no search bar
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
          {vehicles.map((vehicle) => (
            <Pressable
              key={vehicle.id}
              onPress={() => {
                router.navigate({
                  pathname: `/vehicles/[vehicleId]`,
                  params: { vehicleId: vehicle.id },
                });
              }}
            >
              <WhiteSpace size="lg" />
              <WingBlank>
                <Card>
                  <Card.Body>
                    <List>
                      <List.Item extra={vehicle.name}>Name</List.Item>
                      <List.Item extra={vehicle.vehicle_class}>Class</List.Item>
                      <List.Item extra={`${vehicle.length} ft`}>Length</List.Item>
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
