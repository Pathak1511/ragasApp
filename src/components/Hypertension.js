import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useLayoutEffect, useCallback, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import tw from "tailwind-react-native-classnames";
import {
  useFonts,
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
} from "@expo-google-fonts/nunito-sans";
import YoutubeIframe from "react-native-youtube-iframe";

const dimensionForScreen = Dimensions.get("screen");

const Hypertension = ({ route, navigation }) => {
  const disease = route.params.Disease;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [playIcon, setPlayIcon] = useState("play");

  const Alert = () => {
    alert("No more Song in the queue");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_600SemiBold,
    NunitoSans_700Bold,
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
      {/* Header */}
      <View
        style={[tw`flex flex-row px-4 py-4 pb-3 shadow-sm`, styles.headerbg]}
      >
        <View style={[tw`pr-4`]}>
          <TouchableOpacity onPress={() => navigation.navigate("Music")}>
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
              style={[tw`p-2 rounded-3xl`, styles.icon]}
            />
          </TouchableOpacity>
        </View>
        <View style={[tw`w-64 flex justify-center`]}>
          <Text
            style={[tw`text-xl py-2 font-semibold capitalize`, styles.text2]}
          >
            Hypertension
          </Text>
        </View>
      </View>

      {/* Video View */}
      <View style={[tw`items-center pt-16 `]}>
        <View
          style={[
            tw`items-center justify-center p-2 bg-indigo-200 rounded-lg`,
            styles.videoBg,
          ]}
        >
          <YoutubeIframe
            height={200}
            width={dimensionForScreen.width - 60}
            play={playing}
            videoId={disease.hypertension[index].video}
            onChangeState={(event) => {
              if (event === "playing") {
                setPlayIcon("pausecircle");
              }
              if (event === "paused") {
                setPlayIcon("play");
              }
            }}
          />
        </View>
        <View style={[tw`pt-2`]}>
          <Text style={[tw`font-bold text-xl`]}>
            {disease.hypertension[index].raag}
          </Text>
        </View>

        {/* Reduction */}
        <View style={[tw`mt-2 px-6`]}>
          <Text
            style={[tw`font-semibold text-lg text-justify`, styles.fontFam]}
          >
            {disease.hypertension[index].reduction}
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <View
        style={[
          tw` flex justify-center items-center bottom-16`,
          styles.buttons,
        ]}
      >
        <View
          style={[
            tw`flex flex-row justify-between items-center bg-indigo-300 p-4 mt-8 shadow-xl rounded-lg`,
            styles.videoBg,
          ]}
        >
          <TouchableOpacity
            onPress={() => (index > 0 ? setIndex(index - 1) : Alert())}
          >
            <AntDesign name="stepbackward" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[tw`mx-8`]}
            onPress={() =>
              playing
                ? setPlaying(false) & setPlayIcon("play")
                : setPlaying(true) & setPlayIcon("pausecircle")
            }
          >
            <AntDesign name={playIcon} size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              index < disease.hypertension.length - 1
                ? setIndex(index + 1)
                : Alert()
            }
          >
            <AntDesign name="stepforward" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Hypertension;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#ffecd2",
  },
  headerbg: {
    backgroundColor: "#ffcf8e",
  },

  icon: {
    marginRight: 20,
    backgroundColor: "#ff9f1c",
  },
  fontFam: {
    fontFamily: "NunitoSans_400Regular",
    lineHeight: 20,
  },
  text2: {
    fontFamily: "NunitoSans_700Bold",
  },
  videoBg: {
    backgroundColor: "#ffcf8e",
  },
  buttons: {
    position: "absolute",
    right: 50,
    left: 50,
  },
});
