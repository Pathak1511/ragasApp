import React, {
  useLayoutEffect,
  useCallback,
  useState,
  useEffect,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import tw from "tailwind-react-native-classnames";
import { HomeImg, HeroImg2, AppIcon } from "../assets";
import * as SplashScreen from "expo-splash-screen";
import Bot from "./components/Bot";
import {
  useFonts,
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
} from "@expo-google-fonts/nunito-sans";
import axios from "axios";
import { AUTHORIZATION, URL_RAGAS, URL_DISEASE, URL_Logout } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoader from "./AppLoader";

SplashScreen.preventAutoHideAsync();

const AlertWindow = (message) => {
  Alert.alert(message);
};

const Music = ({ navigation }) => {
  const [ragas, setRagas] = useState([]);
  const [disease, setDisease] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const [hideBot, sethideBot] = useState("none");

  const logout = () => {
    const value = {
      token: "",
      disease: "",
      id: "",
    };
    AsyncStorage.setItem("token", JSON.stringify(value));
    navigation.navigate("Home");
    //await axios.get(URL_Logout);
  };

  useEffect(() => {
    async function getRagas() {
      try {
        const ragas = await axios.get(URL_RAGAS, {
          headers: {
            Authorization: AUTHORIZATION,
          },
        });
        setRagas(ragas.data);

        try {
          const disease = await axios.get(URL_DISEASE, {
            headers: {
              Authorization: AUTHORIZATION,
            },
          });
          setDisease(disease.data);

          setLoadingState(true);
        } catch (err) {
          AlertWindow("Something went wrong!");
        }
      } catch (err) {
        AlertWindow("We are sorry 😣. Issue in fetching data");
      }
    }

    getRagas();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  let diabetes = new Array();
  let blood = new Array();
  let hypertension = new Array();
  let ragasName = new Array();
  if (!loadingState) {
    SplashScreen.hideAsync();
  }

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

  if (loadingState) {
    let leng = disease.ragas.length * 1;
    for (let i = 0; i < leng; i++) {
      if (disease.ragas[i].id === 1) {
        diabetes.push(disease.ragas[i]);
      } else if (disease.ragas[i].id === 2) {
        blood.push(disease.ragas[i]);
      } else if (disease.ragas[i].id === 3) {
        hypertension.push(disease.ragas[i]);
      }
    }

    let leng2 = ragas.ragas.length;
    for (let i = 0; i < leng2; i++) {
      ragasName.push([ragas.ragas[i].id, ragas.ragas[i].raga_name]);
    }

    return (
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        {/* Header */}

        <ImageBackground
          style={{
            height: Dimensions.get("window").height,
            position: "absolute",
            width: "100%",
            zIndex: 8,
            display: hideBot,
          }}
        >
          <Bot />
        </ImageBackground>

        <View
          style={[
            tw`flex flex-row justify-between items-center px-4 py-2 pb-3 shadow-sm`,
            styles.headerbg,
          ]}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
              style={[tw`p-2 rounded-3xl`, styles.icon]}
            />
          </TouchableOpacity>

          <Text
            style={[tw`text-xl py-1 font-semibold capitalize`, styles.text2]}
          >
            Raga Realm
          </Text>

          <View>
            <TouchableOpacity
              style={tw`flex-row items-center`}
              onPress={() => {
                logout();
              }}
            >
              {/* <Text
                style={[
                  tw`text-lg py-1 px-2 font-medium capitalize`,
                  styles.text2,
                ]}
              >
                Sign out
              </Text> */}
              <FontAwesome name="sign-out" size={26} color="#2d5234" />
            </TouchableOpacity>
          </View>
        </View>
        {/* Image */}
        <View style={[tw`flex justify-center items-center py-1`]}>
          <Image
            source={HomeImg}
            style={[
              tw`w-72 h-72 rounded-lg  brightness-110 contrast-125 `,
              styles.image,
            ]}
          />
        </View>

        {/* Box */}
        <View style={[tw`px-4 py-2`]}>
          {/* Diabetes */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Diabetes", { Disease: { diabetes } })
            }
            style={[
              tw`flex flex-row justify-between items-center px-6 rounded-2xl bg-indigo-400 border-solid border-transparent `,
              styles.flatlist,
            ]}
          >
            <Text style={[tw`text-lg font-semibold capitalize`, styles.text]}>
              Diabetes
            </Text>
            <View>
              <AntDesign
                name="arrowright"
                size={24}
                color="black"
                style={[tw`p-1 rounded-xl`, styles.rightarrow]}
              />
            </View>
          </TouchableOpacity>

          {/* Hypertension */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Hypertension", {
                Disease: { hypertension },
              })
            }
            style={[
              tw`flex flex-row justify-between items-center px-6 rounded-2xl bg-indigo-400 border-solid border-transparent my-2`,
              styles.flatlist,
            ]}
          >
            <Text style={[tw`text-lg font-semibold capitalize`, styles.text]}>
              Hypertension
            </Text>
            <View>
              <AntDesign
                name="arrowright"
                size={24}
                color="black"
                style={[tw`p-1 rounded-xl`, styles.rightarrow]}
              />
            </View>
          </TouchableOpacity>

          {/* Blood Pressure */}

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Blood", {
                Disease: { blood },
              })
            }
            style={[
              tw`flex flex-row justify-between items-center px-6 rounded-2xl bg-indigo-400 border-solid border-transparent`,
              styles.flatlist,
            ]}
          >
            <Text style={[tw`text-lg font-semibold capitalize`, styles.text]}>
              Blood Pressure
            </Text>
            <View>
              <AntDesign
                name="arrowright"
                size={24}
                color="black"
                style={[tw`p-1 rounded-xl`, styles.rightarrow]}
              />
            </View>
          </TouchableOpacity>

          {/* Recommendation Button */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Recommender", {
                Ragas: { ragasName, ragas },
              })
            }
            style={[
              tw`items-center px-6 rounded-2xl mt-7 border-solid border-transparent `,
              styles.flatlist,
              styles.button,
            ]}
          >
            <Animatable.View
              animation="pulse"
              easing="ease-in"
              iterationCount="infinite"
            >
              <Text
                style={[tw`text-lg font-semibold capitalize`, styles.text3]}
              >
                Explore Recommender
              </Text>
            </Animatable.View>
          </TouchableOpacity>

          <View
            style={[
              tw`flex flex-row justify-end items-center pl-4 my-4 mx-4 rounded-full ${
                hideBot == "none" ? "bg-indigo-200" : ""
              } z-30 ${hideBot == "none" ? "" : ""}`,
            ]}
          >
            <Animatable.Text
              animation="bounceInRight"
              style={[tw`px-4 ${hideBot == "none" ? "" : "hidden"}`]}
            >
              Hello! How may I assist you?
            </Animatable.Text>
            <TouchableOpacity
              onPress={() =>
                hideBot == "none" ? sethideBot("flex") : sethideBot("none")
              }
            >
              {hideBot == "none" ? (
                <Image
                  source={HeroImg2}
                  style={[tw`rounded-full shadow-lg`, styles.BotLogo]}
                />
              ) : (
                <AntDesign
                  name="close"
                  size={32}
                  color="black"
                  style={[tw`rounded-full p-2 -bottom-8 bg-indigo-200`]}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  } else {
    return <AppLoader />;
  }
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ebf0ec",
  },
  headerbg: {
    backgroundColor: "#9cb3a0",
  },

  icon: {
    marginRight: 36,
    backgroundColor: "#2d5234",
    color: "#f8f8f8",
  },
  image: {
    backgroundColor: "#afc2b3",
    borderBottomLeftRadius: 140,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  rightarrow: {
    backgroundColor: "#2d5234",
    color: "#f8f8f8",
  },
  flatlist: {
    borderWidth: 1,
    backgroundColor: "#afc2b3",
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "#2d5234",
  },
  text: {
    fontFamily: "NunitoSans_400Regular",
  },
  text2: {
    fontFamily: "NunitoSans_700Bold",
  },
  text3: {
    fontFamily: "NunitoSans_600SemiBold",
    color: "#f8f8f8",
  },
  text4: {
    fontFamily: "NunitoSans_600SemiBold",
    color: "#282828",
  },
  BotLogo: {
    width: 50,
    height: 50,
    borderColor: "#2d5234",
    borderWidth: 3,
  },
});

export default Music;
