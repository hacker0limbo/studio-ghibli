import { Card, WhiteSpace, WingBlank } from "@ant-design/react-native";
import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function About() {
  return (
    <View>
      <Stack.Screen options={{ title: "About" }} />

      <WhiteSpace size="lg" />

      <WingBlank>
        <Card>
          <Card.Body>
            <Text style={{ marginLeft: 16, fontSize: 20 }}>
              This App is a learning based project that leverage the Studio Ghibli API to fetch and
              display information about the movies. It is written in TypeScript and React Native.
            </Text>
            <WhiteSpace />
            <Text style={{ marginLeft: 16, fontSize: 20 }}>
              Due to publishing app to IOS App Store will cost extra fees($99/year), this app is not
              available on the App Store.
            </Text>
            <WhiteSpace />
            <Text style={{ marginLeft: 16, fontSize: 20 }}>
              However, You are welcomed to clone it from github and run it locally using expo go, or
              just scan the QR code i provided on README.md
            </Text>
          </Card.Body>
          <Card.Footer content="Note that if you are in China, you need to use proxy to access the Ghibli API" />
        </Card>
      </WingBlank>
    </View>
  );
}
