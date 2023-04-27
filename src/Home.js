import React, { useLayoutEffect, useCallback, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import tw from "tailwind-react-native-classnames";
import * as Animatable from "react-native-animatable";
import { Main } from "../assets";
import { AntDesign } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  NunitoSans_600SemiBold,
} from "@expo-google-fonts/nunito-sans";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { URL_CheckToken } from "@env";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
SplashScreen.preventAutoHideAsync();

const Home = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [topage, setPage] = useState("Music");

  const checkToken = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("token");
      if (Object.keys(JSON.parse(jsonValue)) === 0) {
        setPage("Signup");
      } else {
        if (JSON.parse(jsonValue)?.id === "") {
          setPage("LoginPage");
        } else {
          const user = await axios.post(
            URL_CheckToken,
            {
              id: JSON.parse(jsonValue)?.id,
            },
            {
              headers: {
                cookie: JSON.parse(jsonValue)?.token,
              },
            }
          );
          if (user.status === 200) {
            let dateNot = user.data.date;
            let expdate = user.data.exp;
            if (dateNot < expdate) {
              setPage("Music");
            } else {
              setPage("LoginPage");
            }
          }
          if (user?.data?.message === "No user find") {
            setPage("Signup");
          } else if (
            user?.data?.message === "invalid signature" ||
            user?.data?.message === "jwt expired"
          ) {
            setPage("LoginPage");
          }
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    checkToken();
  }, [isFocused]);

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
        <View style={[tw`pt-24 px-3 pr-0`, styles.ImageView]}>
          <Animatable.Image
            animation="fadeIn"
            easing="ease-in-out"
            source={Main}
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
          <Text
            style={[
              styles.text,
              tw`text-lg font-semibold capitalize text-black`,
            ]}
          >
            Where words fail, music speaks !!
          </Text>
        </View>
      </View>

      {/* Button */}
      <View style={[tw`px-4 flex items-center`]}>
        <TouchableOpacity
          style={[tw`w-40 h-40 rounded-sm`]}
          onPress={() => navigation.navigate(topage)}
        >
          <Animatable.View
            animation="pulse"
            easing="ease-in-out"
            iterationCount="infinite"
            style={[
              tw` items-center rounded-xl border-solid border-transparent `,
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

      <View
        style={[
          tw`absolute w-80 h-80 rounded-full bg-indigo-300 -bottom-40 -left-28 opacity-10`,
          styles.overlay,
        ]}
      ></View>
      <View
        style={[
          tw`absolute w-80 h-80 rounded-full bg-indigo-300 bottom-0 -right-44 opacity-10`,
          styles.overlay,
        ]}
      ></View>
      <View
        style={[
          tw`absolute w-full h-96 rounded-full bg-indigo-300 -top-40 -right-10 opacity-10`,
          styles.overlay,
        ]}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebf0ec",
  },
  CoverImage: {
    height: 380,
    resizeMode: "contain",
    backgroundColor: "#2d5234",
    borderBottomLeftRadius: 180,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 20,
  },
  iconHome: {
    color: "#2d5234",
  },
  flatlist: {
    borderWidth: 1,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "#2d5234",
  },
  text: {
    fontFamily: "NunitoSans_600SemiBold",
    color: "#f8f8f8",
  },
  overlay: {
    backgroundColor: "#16291a",
    zIndex: -20,
  },
});

export default Home;
