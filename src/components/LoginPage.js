import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { styles } from "../Music";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { URL_Login, AUTHORIZATION } from "@env";
const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        URL_Login,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            Authorization: AUTHORIZATION,
          },
        }
      );
      setEmail("");
      setPassword("");
      const value = {
        token: `Bearer=${response.data.token}`,
        disease: response.data.disease,
        id: response.data.id,
      };
      /////////////////////////
      try {
        AsyncStorage.setItem("token", JSON.stringify(value));
        console.log("Data write successfully");
      } catch (error) {
        console.log("Error while storing in login");
      }

      navigation.pop();
      navigation.navigate("Music");
      //////////////////////////
    } catch (err) {
      console.log("error", err.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={[tw`flex-1 justify-center items-center`, styles.container]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={tw`w-11/12 p-4 bg-white rounded-md shadow-lg z-20`}>
          <Text style={tw`text-green-800 text-3xl font-bold mb-10`}>
            Welcome!!
          </Text>
          <TextInput
            style={tw`w-full px-4 py-3 border border-green-500 rounded-md mb-4 text-green-900 text-lg font-semibold`}
            placeholder="Email"
            placeholderTextColor="#96a6a1"
            onChangeText={(text) => setEmail(text)}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
          />
          <TextInput
            style={tw`w-full px-4 py-3 border border-green-500 rounded-md mb-6 text-green-900 text-lg font-semibold`}
            placeholder="Password"
            placeholderTextColor="#96a6a1"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
            autoCapitalize="none"
            autoCompleteType="password"
            textContentType="password"
          />
          <TouchableOpacity
            onPress={handleSubmit}
            style={[
              tw`items-center px-6 rounded-2xl mt-7 border-solid border-transparent `,
              styles.flatlist,
              styles.button,
            ]}
          >
            <Text style={tw`text-white text-lg font-semibold`}>Sign In</Text>
          </TouchableOpacity>
          <Text
            style={tw`text-center font-bold py-2 text-green-900 font-semibold text-lg`}
          >
            or
          </Text>
          <TouchableOpacity
            onPress={() => console.log("Forgot Password")}
            style={[
              tw`items-center rounded-2xl border-green-900`,
              styles.flatlist,
              { backgroundColor: "#f8f8f8" },
            ]}
          >
            <Text style={tw`text-green-900 text-lg font-semibold`}>
              Sign up
            </Text>
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
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginPage;
