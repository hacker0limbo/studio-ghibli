import { Result } from "@ant-design/react-native";
import { Stack, useRouter } from "expo-router";
import { View } from "react-native";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack.Screen options={{ title: "Oops!" }} />

      <Result
        title="Oops!"
        message="Seems this screen does not exist"
        buttonText="Go home"
        buttonType="primary"
        onButtonClick={() => router.navigate("/")}
      />
    </View>
  );
}
