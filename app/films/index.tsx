import { type Film, getFilms } from "@/api";
import { Card, List, Toast, WhiteSpace, WingBlank } from "@ant-design/react-native";
import { Stack, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Films() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const router = useRouter();
  // store copy of films
  const filmsRef = useRef<Film[]>([]);

  useEffect(() => {
    setLoading(true);
    getFilms()
      .then((res) => {
        setFilms(res);
        filmsRef.current = res;
        setLoading(false);
      })
      .catch((err) => {
        Toast.offline("Network error...");
      });
  }, []);

  // filter films by search text
  const filterFilmsByText = useCallback((text: string) => {
    if (text === "") {
      setFilms(filmsRef.current);
    } else {
      setFilms(
        filmsRef.current.filter(
          (film) =>
            film.title.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
            film.original_title.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
            film.director.toLocaleLowerCase().includes(text.toLocaleLowerCase())
        )
      );
    }
  }, []);

  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom }}>
      <Stack.Screen
        options={{
          title: "Films",
          headerSearchBarOptions: {
            onSearchButtonPress: (e) => {
              const text = e.nativeEvent.text.trim();
              filterFilmsByText(text);
            },
            onCancelButtonPress: () => {
              filterFilmsByText("");
            },
            placeholder: "Search films by title or director",
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
          {films.map((film) => (
            <Pressable
              key={film.id}
              onPress={() => {
                router.navigate({
                  pathname: "/films/[filmId]",
                  params: { filmId: film.id },
                });
              }}
            >
              <WhiteSpace size="lg" />
              <WingBlank>
                <Card>
                  <Card.Body>
                    <Image
                      source={{ uri: film.movie_banner }}
                      style={{
                        width: "100%",
                        height: 150,
                        resizeMode: "cover",
                      }}
                    />
                    <List>
                      <List.Item extra={film.title}>Title</List.Item>
                      <List.Item extra={film.original_title}>Original Title</List.Item>
                      <List.Item extra={film.director}>Director</List.Item>
                      <List.Item extra={film.release_date}>Release Date</List.Item>
                      <List.Item extra={`${film.running_time} min`}>Running Time</List.Item>
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
