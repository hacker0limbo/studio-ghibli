import { GHIBLI_API_BASE_URL } from "@/constants";
import { List, WhiteSpace, WingBlank } from "@ant-design/react-native";
import { useRouter } from "expo-router";
import { Image, Linking, View } from "react-native";

export default function Settings() {
  const router = useRouter();

  return (
    <View>
      <WhiteSpace size="lg" />
      <Image
        style={{ width: 48, height: 48, alignSelf: "center" }}
        source={require("@/assets/images/favicon.png")}
      />

      <WhiteSpace size="lg" />
      <WingBlank>
        <List>
          <List.Item
            arrow="horizontal"
            onPress={() => {
              router.navigate("/settings/about");
            }}
          >
            About
          </List.Item>
          <List.Item
            extra="Github"
            arrow="horizontal"
            onPress={() => {
              Linking.openURL("https://github.com/hacker0limbo/studio-ghibli");
            }}
          >
            Source Code
          </List.Item>
          <List.Item
            extra="Studio Ghibli API"
            arrow="horizontal"
            onPress={() => {
              Linking.openURL(GHIBLI_API_BASE_URL);
            }}
          >
            API Usage
          </List.Item>
        </List>
      </WingBlank>
    </View>
  );
}
