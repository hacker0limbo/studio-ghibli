import { type Species, getSpecies } from "@/api";
import { Card, List, Toast, WhiteSpace, WingBlank } from "@ant-design/react-native";
import { Stack, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AllSpecies() {
  const [species, setSpecies] = useState<Species[]>([]);
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const router = useRouter();
  // store copy of species
  const speciesRef = useRef<Species[]>([]);

  useEffect(() => {
    setLoading(true);
    getSpecies()
      .then((res) => {
        setSpecies(res);
        speciesRef.current = res;
        setLoading(false);
      })
      .catch((err) => {
        Toast.offline("Network error...");
      });
  }, []);

  // filter species by search text
  const filterSpeciesByText = useCallback((text: string) => {
    if (text === "") {
      setSpecies(speciesRef.current);
    } else {
      setSpecies(
        speciesRef.current.filter((species) =>
          species.name.toLocaleLowerCase().includes(text.toLocaleLowerCase())
        )
      );
    }
  }, []);

  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom }}>
      <Stack.Screen
        options={{
          title: "Species",
          headerSearchBarOptions: {
            onSearchButtonPress: (e) => {
              const text = e.nativeEvent.text.trim();
              filterSpeciesByText(text);
            },
            onCancelButtonPress: () => {
              filterSpeciesByText("");
            },
            placeholder: "Search Species by name",
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
          {species.map((s) => (
            <Pressable
              key={s.id}
              onPress={() => {
                router.navigate({
                  pathname: `/species/[speciesId]`,
                  params: { speciesId: s.id },
                });
              }}
            >
              <WhiteSpace size="lg" />
              <WingBlank>
                <Card>
                  <Card.Body>
                    <List>
                      <List.Item extra={s.name}>Name</List.Item>
                      <List.Item extra={s.classification}>Classification</List.Item>
                      <List.Item extra={s.eye_colors}>Eye Colors</List.Item>
                      <List.Item extra={s.hair_colors}>Hair Colors</List.Item>
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
