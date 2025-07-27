import { type Person, getPeople } from "@/api";
import { Card, List, Toast, WhiteSpace, WingBlank } from "@ant-design/react-native";
import { Stack, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function People() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const router = useRouter();
  // store copy of people
  const peopleRef = useRef<Person[]>([]);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then((res) => {
        setPeople(res);
        peopleRef.current = res;
        setLoading(false);
      })
      .catch((err) => {
        Toast.offline("Network error...");
      });
  }, []);

  // filter people by search text
  const filterPeopleByText = useCallback((text: string) => {
    if (text === "") {
      setPeople(peopleRef.current);
    } else {
      setPeople(
        peopleRef.current.filter((person) =>
          person.name.toLocaleLowerCase().includes(text.toLocaleLowerCase())
        )
      );
    }
  }, []);

  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom }}>
      <Stack.Screen
        options={{
          title: "People",
          headerSearchBarOptions: {
            onSearchButtonPress: (e) => {
              const text = e.nativeEvent.text.trim();
              filterPeopleByText(text);
            },
            onCancelButtonPress: () => {
              filterPeopleByText("");
            },
            placeholder: "Search people by name",
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
          {people.map((person) => (
            <Pressable
              key={person.id}
              onPress={() => {
                router.navigate({
                  pathname: `/people/[personId]`,
                  params: { personId: person.id },
                });
              }}
            >
              <WhiteSpace size="lg" />
              <WingBlank>
                <Card>
                  <Card.Body>
                    <List>
                      <List.Item extra={person.name}>Name</List.Item>
                      <List.Item extra={person.gender}>Gender</List.Item>
                      <List.Item extra={person.age}>Age</List.Item>
                      <List.Item extra={person.eye_color}>Eye Color</List.Item>
                      <List.Item extra={person.hair_color}>Hair Color</List.Item>
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
