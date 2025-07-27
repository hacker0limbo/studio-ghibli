import { getSpeciesById, type Species } from "@/api";
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

export default function SpeciesInfo() {
  const { speciesId } = useLocalSearchParams<{ speciesId: string }>();
  const [species, setSpecies] = useState<Species>();
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const films = useStore((state) => state.films);
  const people = useStore((state) => state.people);
  const router = useRouter();

  useEffect(() => {
    if (speciesId) {
      setLoading(true);
      getSpeciesById(speciesId)
        .then((res) => {
          setLoading(false);
          setSpecies(res);
        })
        .catch((err) => {
          Toast.offline("Network error...");
        });
    }
  }, [speciesId]);

  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom }}>
      <Stack.Screen options={{ title: species?.name || "Species" }} />

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
                  <List.Item extra={species?.name}>Name</List.Item>
                  <List.Item extra={species?.classification}>Classification</List.Item>
                  <List.Item extra={species?.eye_colors}>Eye Colors</List.Item>
                  <List.Item extra={species?.hair_colors}>Hair Colors</List.Item>
                  <Collapse defaultActiveKey={[]}>
                    <Collapse.Panel
                      key="films"
                      title="Films"
                      arrow={(active) => (active ? <Icon name="minus" /> : <Icon name="plus" />)}
                    >
                      <List>
                        {species?.films.map((filmLink) => {
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

                    <Collapse.Panel
                      key="people"
                      title="People"
                      arrow={(active) => (active ? <Icon name="minus" /> : <Icon name="plus" />)}
                    >
                      <List>
                        {species?.people.map((personLink) => {
                          const personId = getCategoryId(personLink);
                          const person = people.find((p) => p.id === personId);

                          return (
                            <List.Item
                              key={personLink}
                              arrow="horizontal"
                              onPress={() => {
                                router.navigate({
                                  pathname: "/people/[personId]",
                                  params: { personId },
                                });
                              }}
                            >
                              {person?.name}
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
