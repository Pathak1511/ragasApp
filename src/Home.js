import React, { useLayoutEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import * as Animatable from "react-native-animatable";
import { HomeMain } from "../assets";
import { AntDesign } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  NunitoSans_600SemiBold,
} from "@expo-google-fonts/nunito-sans";

SplashScreen.preventAutoHideAsync();

const Home = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [fontsLoaded] = useFonts({
    NunitoSans_600SemiBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View>
        {/* Image */}
        <View style={[tw`pt-20 px-3 pr-0`, styles.ImageView]}>
          <Animatable.Image
            animation="fadeIn"
            easing="ease-in-out"
            source={HomeMain}
            style={[
              tw`w-full shadow-2xl bg-black brightness-110 contrast-125 z-10`,
              styles.CoverImage,
            ]}
          />
        </View>

        <View style={[tw`py-8 px-4 flex flex-row items-center justify-center`]}>
          <AntDesign
            name="dingding"
            style={[tw`text-3xl font-semibold mr-4 `, styles.iconHome]}
          />
          <Text style={[tw`text-lg font-semibold capitalize`, styles.text]}>
            Where words fail, music speaks !!
          </Text>
        </View>
      </View>

      {/* Button */}
      <View style={[tw`px-4 flex items-center`]}>
        <TouchableOpacity
          style={[tw`w-32 h-32 rounded-full`]}
          onPress={() => navigation.navigate("Music")}
        >
          <Animatable.View
            animation="pulse"
            easing="ease-in-out"
            iterationCount="infinite"
            style={[
              tw` items-center rounded-full border-solid border-transparent `,
              styles.flatlist,
              styles.button,
            ]}
          >
            <Text style={[tw`text-xl font-bold uppercase`, styles.text]}>
              Go
            </Text>
          </Animatable.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight,
    backgroundColor: "#ffcf8e",
  },
  ImageView: {},
  CoverImage: {
    height: 440,
    resizeMode: "contain",
    backgroundColor: "#ff9f1c",
    borderBottomLeftRadius: 180,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 20,
  },
  iconHome: {
    color: "#fb8500",
  },
  flatlist: {
    borderWidth: 1,
    backgroundColor: "#ffcf8e",
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "#ff9f1c",
  },
  text: {
    fontFamily: "NunitoSans_600SemiBold",
  },
});

export default Home;
