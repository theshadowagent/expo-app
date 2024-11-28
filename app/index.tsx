import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function Index() {
  return (
    <ScrollView className="flex-1 bg-[#f0f4f8]">
      <Stack.Screen options={{ title: "Simple Demo" }} />

      <View className="p-6">
        <LinearGradient
          colors={["#a855f7", "#6b21a8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.8 }}
          style={{ padding: 16, borderRadius: 16 }}
        >
          <Text className="text-white text-2xl font-bold">Hello World</Text>
          <Text className="text-white/70 text-sm mt-1">
            A simple gradient demo
          </Text>
        </LinearGradient>
      </View>
    </ScrollView>
  );
}
