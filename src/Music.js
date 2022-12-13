import React, { useLayoutEffect, useCallback } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import tw from "tailwind-react-native-classnames";
import { HomeImg } from "../assets";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
} from "@expo-google-fonts/nunito-sans";

SplashScreen.preventAutoHideAsync();

const Music = ({ navigation }) => {
  const alertBox = () => {
    Alert.alert("Navigation Not yet initialized..");
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
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            style={[tw`p-2 rounded-3xl`, styles.icon]}
          />
        </TouchableOpacity>
        <Text style={[tw`text-xl py-2 font-semibold capitalize`, styles.text2]}>
          Music Recommendation
        </Text>
      </View>
      {/* Image */}
      <View style={[tw`flex justify-center items-center py-1`]}>
        <Image
          source={HomeImg}
          style={[
            tw`w-80 h-80 rounded-lg  brightness-110 contrast-125`,
            styles.image,
          ]}
        />
      </View>

      {/* Box */}
      <View style={[tw`px-4 py-4`]}>
        {/* Diabetes */}
        <View
          style={[
            tw`flex flex-row justify-between items-center px-6 rounded-2xl bg-indigo-400 border-solid border-transparent `,
            styles.flatlist,
          ]}
        >
          <Text style={[tw`text-lg font-semibold capitalize`, styles.text]}>
            Diabetes
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Diabetes")}>
            <AntDesign
              name="arrowright"
              size={24}
              color="black"
              style={[tw`p-1 rounded-xl`, styles.rightarrow]}
            />
          </TouchableOpacity>
        </View>

        {/* Hypertension */}
        <View
          style={[
            tw`flex flex-row justify-between items-center px-6 rounded-2xl bg-indigo-400 border-solid border-transparent my-2`,
            styles.flatlist,
          ]}
        >
          <Text style={[tw`text-lg font-semibold capitalize`, styles.text]}>
            Hypertension
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Hypertension")}>
            <AntDesign
              name="arrowright"
              size={24}
              color="black"
              style={[tw`p-1 rounded-xl`, styles.rightarrow]}
            />
          </TouchableOpacity>
        </View>

        {/* Blood Pressure */}

        <View
          style={[
            tw`flex flex-row justify-between items-center px-6 rounded-2xl bg-indigo-400 border-solid border-transparent`,
            styles.flatlist,
          ]}
        >
          <Text style={[tw`text-lg font-semibold capitalize`, styles.text]}>
            Blood Pressure
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Blood")}>
            <AntDesign
              name="arrowright"
              size={24}
              color="black"
              style={[tw`p-1 rounded-xl`, styles.rightarrow]}
            />
          </TouchableOpacity>
        </View>

        {/* Recommendation Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Recommender")}
          style={[
            tw`items-center px-6 rounded-2xl mt-10 border-solid border-transparent `,
            styles.flatlist,
            styles.button,
          ]}
        >
          <Animatable.View
            animation="pulse"
            easing="ease-in"
            iterationCount="infinite"
          >
            <Text style={[tw`text-lg font-semibold capitalize`, styles.text3]}>
              Explore Recommender
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
    flexDirection: "column",
    marginTop: StatusBar.currentHeight,
    // paddingTop: StatusBar.currentHeight,
    backgroundColor: "#ffecd2",
  },
  headerbg: {
    backgroundColor: "#ffcf8e",
  },

  icon: {
    marginRight: 36,
    backgroundColor: "#ff9f1c",
  },
  image: {
    backgroundColor: "#ffcf8e",
    borderBottomLeftRadius: 140,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  rightarrow: {
    backgroundColor: "#ff9f1c",
  },
  flatlist: {
    borderWidth: 1,
    backgroundColor: "#ffcf8e",
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "#ff9f1c",
  },
  bgcover: {
    // backgroundColor: "#ffbe0b",
    // backgroundColor: "#ff9f1c",
    // borderBottomLeftRadius: 180,
    // borderBottomRightRadius: 40,
  },
  text: {
    fontFamily: "NunitoSans_400Regular",
  },
  text2: {
    fontFamily: "NunitoSans_700Bold",
  },
  text3: {
    fontFamily: "NunitoSans_600SemiBold",
  },
});

export default Music;
