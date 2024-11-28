import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface TapStore {
  tapCount: number;
  incrementTaps: () => void;
}

const useTapStore = create<TapStore>()(
  persist(
    (set) => ({
      tapCount: 0,
      incrementTaps: () => set((state) => ({ tapCount: state.tapCount + 1 })),
    }),
    {
      name: "tap-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default function Index() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [image, setImage] = useState<string | null>(null);
  const { tapCount, incrementTaps } = useTapStore();

  const handleHapticFeedback = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    incrementTaps();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  return (
    <ScrollView className="flex-1 bg-[#f0f4f8]">
      <Stack.Screen options={{ title: "Native Features Demo" }} />
      <StatusBar style="dark" />

      <View className="p-6">
        <Text className="text-2xl font-bold mb-2">Welcome Back</Text>
        <Text className="text-gray-600 mb-6">Explore Interactive Features</Text>

        <View className="flex-row gap-4 mb-6">
          <LinearGradient
            colors={["#a855f7", "#6b21a8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0.8 }}
            style={{ flex: 1, padding: 16, borderRadius: 16 }}
          >
            <View className="bg-white/20 p-2 rounded-full w-10 h-10 items-center justify-center mb-2">
              <Ionicons name="finger-print" size={20} color="#fff" />
            </View>
            <Text className="text-white text-sm font-medium">
              Interaction Count
            </Text>
            <Text className="text-white text-3xl font-bold mt-1">
              {tapCount}
            </Text>
            <Text className="text-white/70 text-xs mt-1">Total taps today</Text>
          </LinearGradient>

          <LinearGradient
            colors={["#34d399", "#047857"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0.8 }}
            style={{ flex: 1, padding: 16, borderRadius: 16 }}
          >
            <View className="bg-white/20 p-2 rounded-full w-10 h-10 items-center justify-center mb-2">
              <Ionicons name="navigate" size={20} color="#fff" />
            </View>
            <Text className="text-white text-sm font-medium">
              Current Location
            </Text>
            {location ? (
              <>
                <Text className="text-white text-lg font-bold mt-1">
                  {location.coords.latitude.toFixed(2)}°N
                </Text>
                <Text className="text-white text-lg font-bold">
                  {location.coords.longitude.toFixed(2)}°E
                </Text>
              </>
            ) : (
              <Text className="text-white/70 text-sm mt-1">Not available</Text>
            )}
          </LinearGradient>
        </View>

        <View className="flex gap-4 mb-6">
          <TouchableOpacity
            onPress={handleHapticFeedback}
            className="bg-white p-4 rounded-xl"
          >
            <View className="flex-row items-center">
              <View className="bg-indigo-100 p-3 rounded-full">
                <Ionicons
                  name="phone-portrait-outline"
                  size={24}
                  color="#4f46e5"
                />
              </View>
              <View className="ml-4">
                <Text className="text-lg font-semibold text-slate-800">
                  Haptic Feedback
                </Text>
                <Text className="text-slate-500">Tap to feel vibration</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={getLocation}
            className="bg-white p-4 rounded-xl"
          >
            <View className="flex-row items-center">
              <View className="bg-indigo-100 p-3 rounded-full">
                <Ionicons name="location-outline" size={24} color="#4f46e5" />
              </View>
              <View className="ml-4">
                <Text className="text-lg font-semibold text-slate-800">
                  Location
                </Text>
                <Text className="text-slate-500">Tap to get location</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={pickImage}
            className="bg-white p-4 rounded-xl gap-4"
          >
            <View className="flex-row items-center">
              <View className="bg-indigo-100 p-3 rounded-full">
                <Ionicons name="images-outline" size={24} color="#4f46e5" />
              </View>
              <View className="ml-4">
                <Text className="text-lg font-semibold text-slate-800">
                  Gallery
                </Text>
                <Text className="text-slate-500">Pick from your photos</Text>
              </View>
            </View>
            {image && (
              <View className="rounded-xl">
                <Text className="text-lg font-semibold text-slate-800 mb-2">
                  Preview
                </Text>
                <Image
                  source={{ uri: image }}
                  className="w-full aspect-square rounded-xl"
                  resizeMode="cover"
                />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
