import { getPersonById, type Person } from "@/api";
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

export default function PersonInfo() {
  const { personId } = useLocalSearchParams<{ personId: string }>();
  const [person, setPerson] = useState<Person>();
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const films = useStore((state) => state.films);
  const species = useStore((state) => state.species);
  const router = useRouter();

  useEffect(() => {
    if (personId) {
      setLoading(true);
      getPersonById(personId)
        .then((res) => {
          setLoading(false);
          setPerson(res);
        })
        .catch((err) => {
          Toast.offline("Network error...");
        });
    }
  }, [personId]);

  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom }}>
      <Stack.Screen options={{ title: person?.name || "Person" }} />

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
                  <List.Item extra={person?.name}>Name</List.Item>
                  <List.Item extra={person?.gender}>Gender</List.Item>
                  <List.Item extra={person?.age}>Age</List.Item>
                  <List.Item extra={person?.eye_color}>Eye Color</List.Item>
                  <List.Item extra={person?.hair_color}>Hair Color</List.Item>
                  <List.Item
                    arrow="horizontal"
                    extra={species.find((s) => s.id === getCategoryId(person?.species!))?.name}
                    onPress={() => {
                      router.navigate({
                        pathname: "/species/[speciesId]",
                        params: { speciesId: getCategoryId(person?.species!) },
                      });
                    }}
                  >
                    Species
                  </List.Item>
                  <Collapse defaultActiveKey={[]}>
                    <Collapse.Panel
                      key="films"
                      title="Films"
                      arrow={(active) => (active ? <Icon name="minus" /> : <Icon name="plus" />)}
                    >
                      <List>
                        {person?.films.map((filmLink) => {
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
