import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
