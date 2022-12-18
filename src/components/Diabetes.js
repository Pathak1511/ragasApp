import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useLayoutEffect, useCallback, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { AntDesign } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import {
  useFonts,
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
} from "@expo-google-fonts/nunito-sans";
import YoutubeIframe from "react-native-youtube-iframe";

const dimensionForScreen = Dimensions.get("screen");

const Diabetes = ({ route, navigation }) => {
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
    <View style={[styles.container, tw`relative`]} onLayout={onLayoutRootView}>
      {/* Header */}
      <View
        style={[
          tw`flex flex-row px-4 py-4 pb-3 shadow-sm rounded-lg`,
          styles.headerbg,
        ]}
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
            Diabetes
          </Text>
        </View>
      </View>

      {/* Video View */}
      <View style={[tw`items-center pt-16 `]}>
        <View
          style={[tw`items-center p-2 shadow-sm rounded-lg`, styles.videoBg]}
        >
          <YoutubeIframe
            height={200}
            width={dimensionForScreen.width - 60}
            play={playing}
            videoId={disease.diabetes[index].video}
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
        <Text style={[tw`font-bold text-xl`]}>
          {disease.diabetes[index].newid}&nbsp;
          {disease.diabetes[index].raag}
        </Text>

        {/* Reduction */}
        <View style={[tw`mt-6 px-6`]}>
          <Text
            style={[tw`font-semibold text-lg text-justify`, styles.fontFam]}
          >
            {disease.diabetes[index].reduction}
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
              index < disease.diabetes.length - 1
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: StatusBar.currentHeight,
    // paddingTop: StatusBar.currentHeight,
    backgroundColor: "#ffecd2",
  },
  headerbg: {
    backgroundColor: "#ffcf8e",
  },
  fontFam: {
    fontFamily: "NunitoSans_400Regular",
  },
  text2: {
    fontFamily: "NunitoSans_700Bold",
  },
  icon: {
    marginRight: 20,
    backgroundColor: "#ff9f1c",
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

export default Diabetes;
