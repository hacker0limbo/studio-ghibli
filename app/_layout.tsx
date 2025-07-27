import { getFilms, getLocations, getPeople, getSpecies, getVehicles } from "@/api";
import { useStore } from "@/store";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo } from "react";
import { Appearance, View } from "react-native";

SplashScreen.preventAutoHideAsync();
// always set to light theme
Appearance.setColorScheme("light");

export default function RootLayout() {
  const [loaded] = useFonts({
    antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
  });
  const router = useRouter();
  const { setFilms, setPeople, setSpecies, setVehicles, setLocations } = useStore();

  const tasks = useMemo(
    () => [
      getFilms().then(setFilms),
      getPeople().then(setPeople),
      getSpecies().then(setSpecies),
      getVehicles().then(setVehicles),
      getLocations().then(setLocations),
    ],
    [setFilms, setLocations, setPeople, setSpecies, setVehicles]
  );

  // preload all data and store in zustand
  useEffect(() => {
    Promise.allSettled(tasks);
  }, [tasks]);

  if (!loaded) {
    return null;
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: "#f5f5f5" }}
      onLayout={() => {
        if (loaded) {
          SplashScreen.hide();
        }
      }}
    >
      <Stack
        screenOptions={{
          headerRight: () => (
            <Ionicons
              onPress={() => {
                router.navigate("/");
              }}
              name="home-outline"
              size={19}
              color="#108ee9"
            />
          ),
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false, headerTitle: "Back" }} />
      </Stack>

      <StatusBar style="light" />
    </View>
  );
}
