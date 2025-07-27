import {
  Card,
  Carousel,
  Grid,
  Icon,
  List,
  WhiteSpace,
  WingBlank,
  type IconProps,
} from "@ant-design/react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter, type Href } from "expo-router";
import { Image, Linking, ScrollView, View } from "react-native";

const externalLinks = [
  {
    text: "Studio Ghibli",
    url: "https://www.ghibli.jp/",
  },
  {
    text: "Ghibli Park",
    url: "https://ghibli-park.jp/",
  },
  {
    text: "Ghibli Museum",
    url: "https://ghibli-museum.jp/",
  },
];

type Category = { text: string; iconName: IconProps["name"]; route: Href };

const categories: Category[] = [
  { text: "Films", iconName: "video-camera", route: "/films" },
  { text: "People", iconName: "user", route: "/people" },
  { text: "Locations", iconName: "environment", route: "/locations" },
  { text: "Species", iconName: "team", route: "/species" },
  { text: "Vehicles", iconName: "car", route: "/vehicles" },
];

export default function Index() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <WhiteSpace size="lg" />
        <WingBlank>
          <Carousel style={{ height: 150, width: "100%" }} autoplay infinite>
            <Image
              style={{ resizeMode: "cover", height: "100%", width: "100%" }}
              source={require("@/assets/images/carousel/howl.jpg")}
            />
            <Image
              style={{ resizeMode: "cover", height: "100%", width: "100%" }}
              source={require("@/assets/images/carousel/laputa.jpg")}
            />
            <Image
              style={{ resizeMode: "cover", height: "100%", width: "100%" }}
              source={require("@/assets/images/carousel/ponyo.jpg")}
            />
            <Image
              style={{ resizeMode: "cover", height: "100%", width: "100%" }}
              source={require("@/assets/images/carousel/spirited-away.jpg")}
            />
            <Image
              style={{ resizeMode: "cover", height: "100%", width: "100%" }}
              source={require("@/assets/images/carousel/the-wind-rises.jpg")}
            />
          </Carousel>
        </WingBlank>

        <WhiteSpace size="lg" />
        <WingBlank>
          <Card>
            <Card.Header
              title="Categories"
              thumb={
                <MaterialIcons
                  name="category"
                  size={24}
                  color="#108ee9"
                  style={{ marginRight: 4 }}
                />
              }
            />
            <Card.Body>
              <Grid
                hasLine={false}
                onPress={(el, index) => {
                  const categoryToNavigate = categories[index ?? 0];
                  router.navigate(categoryToNavigate.route);
                }}
                data={categories.map(({ text, iconName, route }) => ({
                  text,
                  icon: <Icon name={iconName} color="#108ee9" />,
                  onPress: () => router.navigate(route),
                }))}
              />
            </Card.Body>
          </Card>
        </WingBlank>

        <WhiteSpace size="lg" />
        <WingBlank>
          <Card>
            <Card.Header
              title="Websites"
              thumb={
                <MaterialCommunityIcons
                  name="web"
                  size={24}
                  color="#108ee9"
                  style={{ marginRight: 4 }}
                />
              }
            />
            <Card.Body>
              <List>
                {externalLinks.map((link, index) => (
                  <List.Item
                    key={index}
                    onPress={() => Linking.openURL(link.url)}
                    // arrow="horizontal"
                    extra={<EvilIcons name="external-link" size={32} color="grey" />}
                  >
                    {link.text}
                  </List.Item>
                ))}
              </List>
            </Card.Body>
          </Card>
        </WingBlank>
      </ScrollView>
    </View>
  );
}
