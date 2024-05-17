import { Image, StyleSheet, Platform } from "react-native";
import { useEffect, useState } from "react";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import publicIP from "react-native-public-ip";

interface GeoData {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: number;
  timezone: string;
  readme: string;
}

const HomeScreen: React.FC = () => {
  const [ipAddress, setIpAdress] = useState("");
  const [geoData, setGeoData] = useState<GeoData>();

  useEffect(() => {
    publicIP()
      .then((ip) => {
        setIpAdress(ip);
        if (ip) {
          fetch(`https://ipinfo.io/${ip}/geo`)
            .then((res) => res.json())
            .then((json) => setGeoData(json))
            .catch((err) => console.log(err));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  console.log(ipAddress);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Your GEO Data</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Your IP Address : {geoData?.ip}</ThemedText>
        <ThemedText>City: {geoData?.city}</ThemedText>
        <ThemedText>Region: {geoData?.region}</ThemedText>
        <ThemedText>Country: {geoData?.country}</ThemedText>
        <ThemedText>Loc: {geoData?.loc}</ThemedText>
        <ThemedText>Org: {geoData?.org}</ThemedText>
        <ThemedText>Postal: {geoData?.postal}</ThemedText>
        <ThemedText>Timezone: {geoData?.timezone}</ThemedText>
        <ThemedText>Readme: {geoData?.readme}</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
