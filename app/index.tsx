import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";

export default function Index() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [image, setImage] = useState<string | null>(null);
  const [cameraType, setCameraType] = useState<CameraType>("back");
  const [camera, setCamera] = useState<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();

  const handleHapticFeedback = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
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

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      if (photo) setImage(photo.uri);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f0f4f8" }}>
      <StatusBar style="dark" />

      {/* Header */}
      <View
        style={{
          backgroundColor: "#4f46e5",
          paddingHorizontal: 16,
          paddingVertical: 24,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#ffffff" }}>
          Gera AI
        </Text>
        <Text style={{ color: "#ffffffcc", marginTop: 4 }}>
          Native Interaction Demos
        </Text>
      </View>

      <View style={{ padding: 16, gap: 16 }}>
        {/* Haptic Button */}
        <TouchableOpacity
          onPress={handleHapticFeedback}
          style={{
            backgroundColor: "#ffffff",
            padding: 16,
            borderRadius: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#e0e7ff",
                padding: 12,
                borderRadius: 999,
              }}
            >
              <MaterialIcons name="vibration" size={24} color="#4f46e5" />
            </View>
            <View style={{ marginLeft: 16 }}>
              <Text
                style={{ fontSize: 18, fontWeight: "600", color: "#1e293b" }}
              >
                Haptic Feedback
              </Text>
              <Text style={{ color: "#64748b" }}>Tap to feel vibration</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Location Button */}
        <TouchableOpacity
          onPress={getLocation}
          style={{
            backgroundColor: "#ffffff",
            padding: 16,
            borderRadius: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#e0e7ff",
                padding: 12,
                borderRadius: 999,
              }}
            >
              <MaterialIcons name="location-on" size={24} color="#4f46e5" />
            </View>
            <View style={{ marginLeft: 16 }}>
              <Text
                style={{ fontSize: 18, fontWeight: "600", color: "#1e293b" }}
              >
                Location
              </Text>
              {location ? (
                <Text style={{ color: "#64748b" }}>
                  {location.coords.latitude.toFixed(2)}°N,{" "}
                  {location.coords.longitude.toFixed(2)}°E
                </Text>
              ) : (
                <Text style={{ color: "#64748b" }}>Tap to get location</Text>
              )}
            </View>
          </View>
        </TouchableOpacity>

        {/* Camera Section */}
        <View
          style={{
            backgroundColor: "#ffffff",
            padding: 16,
            borderRadius: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <View
              style={{
                backgroundColor: "#e0e7ff",
                padding: 12,
                borderRadius: 999,
              }}
            >
              <MaterialIcons name="camera-alt" size={24} color="#4f46e5" />
            </View>
            <View style={{ marginLeft: 16 }}>
              <Text
                style={{ fontSize: 18, fontWeight: "600", color: "#1e293b" }}
              >
                Camera
              </Text>
              <TouchableOpacity onPress={requestPermission}>
                <Text style={{ color: "#4f46e5" }}>
                  {permission?.granted ? "Camera Ready" : "Enable Camera"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {permission?.granted && (
            <CameraView
              ref={(ref) => setCamera(ref)}
              facing={cameraType}
              style={{
                width: "100%",
                height: 192,
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <View
                style={{ flex: 1, justifyContent: "flex-end", padding: 16 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      setCameraType(cameraType === "back" ? "front" : "back")
                    }
                    style={{
                      backgroundColor: "#0000004d",
                      padding: 8,
                      borderRadius: 999,
                    }}
                  >
                    <MaterialIcons
                      name="flip-camera-ios"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={takePicture}
                    style={{
                      backgroundColor: "#ffffff",
                      padding: 8,
                      borderRadius: 999,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#4f46e5",
                        width: 32,
                        height: 32,
                        borderRadius: 999,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </CameraView>
          )}
        </View>

        {/* Gallery Button */}
        <TouchableOpacity
          onPress={pickImage}
          style={{
            backgroundColor: "#ffffff",
            padding: 16,
            borderRadius: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#e0e7ff",
                padding: 12,
                borderRadius: 999,
              }}
            >
              <MaterialIcons name="photo-library" size={24} color="#4f46e5" />
            </View>
            <View style={{ marginLeft: 16 }}>
              <Text
                style={{ fontSize: 18, fontWeight: "600", color: "#1e293b" }}
              >
                Gallery
              </Text>
              <Text style={{ color: "#64748b" }}>Pick from your photos</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Image Preview */}
        {image && (
          <View
            style={{
              backgroundColor: "#ffffff",
              padding: 16,
              borderRadius: 12,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,
              elevation: 2,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#1e293b",
                marginBottom: 8,
              }}
            >
              Preview
            </Text>
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: 192, borderRadius: 12 }}
              resizeMode="cover"
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}
