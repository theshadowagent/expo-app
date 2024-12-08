import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/*
IMPORTANT!!!: DELETE THIS FILE IF YOU PLAN TO USE TABS
OR REPLACE THE CONTENTS OF THIS FILE IF YOU PLAN TO USE STACKS
*/

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
    <ScrollView style={styles.scrollView}>
      <Stack.Screen options={{ title: "Native Features Demo" }} />
      <StatusBar style="dark" />

      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Text style={styles.exploreText}>Explore Interactive Features</Text>

        <View style={styles.featureRow}>
          <LinearGradient
            colors={["#a855f7", "#6b21a8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0.8 }}
            style={styles.gradientBox}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="finger-print" size={20} color="#fff" />
            </View>
            <Text style={styles.featureTitle}>Interaction Count</Text>
            <Text style={styles.featureCount}>{tapCount}</Text>
            <Text style={styles.featureSubtitle}>Total taps today</Text>
          </LinearGradient>

          <LinearGradient
            colors={["#34d399", "#047857"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0.8 }}
            style={styles.gradientBox}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="navigate" size={20} color="#fff" />
            </View>
            <Text style={styles.featureTitle}>Current Location</Text>
            {location ? (
              <>
                <Text style={styles.locationText}>
                  {location.coords.latitude.toFixed(2)}°N
                </Text>
                <Text style={styles.locationText}>
                  {location.coords.longitude.toFixed(2)}°E
                </Text>
              </>
            ) : (
              <Text style={styles.featureSubtitle}>Not available</Text>
            )}
          </LinearGradient>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleHapticFeedback}
            style={styles.button}
          >
            <View style={styles.buttonContent}>
              <View style={styles.buttonIconContainer}>
                <Ionicons
                  name="phone-portrait-outline"
                  size={24}
                  color="#4f46e5"
                />
              </View>
              <View style={styles.buttonTextContainer}>
                <Text style={styles.buttonTitle}>Haptic Feedback</Text>
                <Text style={styles.buttonSubtitle}>Tap to feel vibration</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={getLocation} style={styles.button}>
            <View style={styles.buttonContent}>
              <View style={styles.buttonIconContainer}>
                <Ionicons name="location-outline" size={24} color="#4f46e5" />
              </View>
              <View style={styles.buttonTextContainer}>
                <Text style={styles.buttonTitle}>Location</Text>
                <Text style={styles.buttonSubtitle}>Tap to get location</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={pickImage} style={styles.button}>
            <View style={styles.buttonContent}>
              <View style={styles.buttonIconContainer}>
                <Ionicons name="images-outline" size={24} color="#4f46e5" />
              </View>
              <View style={styles.buttonTextContainer}>
                <Text style={styles.buttonTitle}>Gallery</Text>
                <Text style={styles.buttonSubtitle}>Pick from your photos</Text>
              </View>
            </View>
            {image && (
              <View style={styles.imagePreviewContainer}>
                <Text style={styles.previewTitle}>Preview</Text>
                <Image
                  source={{ uri: image }}
                  style={styles.imagePreview}
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

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  container: {
    padding: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  exploreText: {
    color: "#4b5563",
    marginBottom: 24,
  },
  featureRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  gradientBox: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
  },
  iconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 8,
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  featureTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  featureCount: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 4,
  },
  featureSubtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
    marginTop: 4,
  },
  locationText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4,
  },
  buttonContainer: {
    gap: 16,
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonIconContainer: {
    backgroundColor: "#e0e7ff",
    padding: 12,
    borderRadius: 50,
  },
  buttonTextContainer: {
    marginLeft: 16,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
  },
  buttonSubtitle: {
    color: "#64748b",
  },
  imagePreviewContainer: {
    borderRadius: 16,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 8,
  },
  imagePreview: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
  },
});
