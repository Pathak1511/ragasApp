import React, { useState, useEffect, isFocused } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Image,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { AntDesign } from "@expo/vector-icons";
import { HeroImg2 } from "../../assets";
import { styles } from "../Music";
import { URL_Feedback, AUTHORIZATION } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Feedback = ({ navigation }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    async function check() {
      try {
        const jsonValue = await AsyncStorage.getItem("token");
        console.log(jsonValue);
        setId(JSON.parse(jsonValue)?.id);
        console.log("Data Read successfully");
      } catch (err) {
        console.log("Error while reading in feedback");
      }
    }
    check();
  }, [isFocused]);

  const handlePress = async () => {
    console.log(id);
    try {
      await axios.post(
        URL_Feedback,
        {
          id: id,
          name: name,
          comment: comment,
          feedback: rating,
        },
        {
          headers: {
            Authorization: AUTHORIZATION,
          },
        }
      );
      setName("");
      setComment("");
      setRating(0);
    } catch (err) {
      alert("error occured");
    }
  };

  return (
    <View
      onPress={Keyboard.dismiss}
      style={[tw`bg-gray-700`, styles.container]}
    >
      {/* Header */}
      <View
        style={[tw`flex flex-row px-4 py-2 pb-3 shadow-sm`, styles.headerbg]}
      >
        <View style={[tw`pr-4`]}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
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
            style={[tw`text-xl py-1 font-semibold capitalize`, styles.text2]}
          >
            Feedback
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={tw`flex-1 justify-center items-center bg-gray-100 px-4`}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={tw`w-full p-4 bg-white rounded-md shadow-md`}>
          <Image source={HeroImg2} style={tw`h-16 w-16 mb-4 rounded-full`} />
          <Text style={tw`text-2xl font-bold mb-4`}>
            Tell us how do you feel?
          </Text>
          <TextInput
            style={tw`w-full px-4 py-2 border border-gray-300 rounded-md mb-4`}
            placeholder="Your Name"
            onChangeText={(text) => setName(text)}
            value={name}
            autoFocus
            blurOnSubmit={false}
          />
          <TextInput
            style={tw`w-full px-4 py-2 border border-gray-300 rounded-md mb-4`}
            placeholder="Your Comment"
            onChangeText={(text) => setComment(text)}
            value={comment}
            multiline
            numberOfLines={3}
          />
          <View style={tw`flex flex-row mb-4`}>
            {[1, 2, 3, 4, 5].map((value) => (
              <TouchableOpacity
                key={value}
                onPress={() => setRating(value)}
                style={[
                  tw`p-1 rounded-md mr-2`,
                  rating >= value ? styles.button : tw`bg-gray-300`,
                ]}
              >
                <AntDesign
                  name="star"
                  size={24}
                  color={rating >= value ? "white" : "gray"}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            onPress={handlePress}
            style={[
              tw`items-center px-6 rounded-2xl mt-7 border-solid border-transparent `,
              styles.flatlist,
              styles.button,
            ]}
          >
            <Text style={tw`text-white text-lg font-bold`}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Feedback;
