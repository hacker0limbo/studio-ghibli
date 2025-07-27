import { getFilmById, type Film } from "@/api";
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
import { Image, ScrollView, View } from "react-native";
import ImageView from "react-native-image-viewing";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FilmInfo() {
  const { filmId } = useLocalSearchParams<{ filmId: string }>();
  const [film, setFilm] = useState<Film>();
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const [fileImageVisible, setFileImageVisible] = useState(false);
  const people = useStore((state) => state.people);
  const router = useRouter();

  // the people field only contains links to people endpoints, so we need to check if the film contains any related people
  // the condition is if the store we fetched has no people or if the film has only one person and that person link does not contain person id
  const notContainRelatedPeople = useMemo(
    () => !people?.length || (film?.people?.length === 1 && !getCategoryId(film?.people?.[0])),
    [film, people]
  );

  useEffect(() => {
    if (filmId) {
      setLoading(true);
      getFilmById(filmId)
        .then((res) => {
          setLoading(false);
          setFilm(res);
        })
        .catch((err) => {
          Toast.offline("Network error...");
        });
    }
  }, [filmId]);

  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom }}>
      <Stack.Screen options={{ title: film?.title || "Film" }} />

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
                <Image
                  source={{ uri: film?.movie_banner }}
                  style={{
                    width: "100%",
                    height: 150,
                    resizeMode: "cover",
                  }}
                />
                <List>
                  <List.Item extra={film?.title}>Title</List.Item>
                  <List.Item extra={film?.original_title}>Original Title</List.Item>
                  <List.Item extra={film?.original_title_romanised}>
                    Original Title (Romanised)
                  </List.Item>
                  <List.Item extra={film?.director}>Director</List.Item>
                  <List.Item extra={film?.producer}>Producer</List.Item>
                  <List.Item extra={film?.release_date}>Release Date</List.Item>
                  <List.Item extra={`${film?.running_time} min`}>Running Time</List.Item>
                  <List.Item extra={film?.rt_score}>Rotten Tomatoes Score</List.Item>
                  <List.Item
                    multipleLine
                    arrow="horizontal"
                    onPress={() => {
                      setFileImageVisible(true);
                    }}
                  >
                    Image
                    <List.Item.Brief>Click to see the poster</List.Item.Brief>
                  </List.Item>
                  {notContainRelatedPeople ? (
                    <List.Item
                      arrow="horizontal"
                      onPress={() => {
                        router.navigate("/people");
                      }}
                    >
                      People
                    </List.Item>
                  ) : (
                    <></>
                  )}
                  <Collapse defaultActiveKey={[]}>
                    {!notContainRelatedPeople ? (
                      <Collapse.Panel
                        key="people"
                        title="People"
                        arrow={(active) => (active ? <Icon name="minus" /> : <Icon name="plus" />)}
                      >
                        <List>
                          {film?.people.map((personLink) => {
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
                    ) : null}
                    <Collapse.Panel
                      key="description"
                      title="Description"
                      arrow={(active) => (active ? <Icon name="minus" /> : <Icon name="plus" />)}
                    >
                      {film?.description}
                    </Collapse.Panel>
                  </Collapse>
                </List>
              </Card.Body>
            </Card>
          </WingBlank>

          <ImageView
            images={[{ uri: film?.image }]}
            visible={fileImageVisible}
            imageIndex={0}
            onRequestClose={() => {
              setFileImageVisible(false);
            }}
          />
        </ScrollView>
      )}
    </View>
  );
}
