import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import { URL_SIGNUP } from "@env";
import { styles } from "../Music";
import {
  ApplicationProvider,
  Input,
  IndexPath,
  Select,
  SelectItem,
  Spinner,
  Button,
  Modal,
  Card,
  Text,
} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const data = ["Diabetes", "Hypertension", "Blood Pressure"];
const renderOption = (title) => <SelectItem title={title} key={title} />;
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const Signup = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [diseaseRating, setDiseaseRating] = useState("");
  const [pass, setpass] = useState(true);
  const [passState, setPassState] = useState(true);
  const [pass2, setpass2] = useState(true);
  const [passState2, setPassState2] = useState(true);
  const [loggedin, setloggedin] = useState(false);

  // for alert window
  const [invalidMess, setInvalidMess] = useState("");
  const [invalidMessStatus, setinvalidMessStatus] = useState("hidden");
  const [invalidEmailStatus, setinvalidEmailStatus] = useState("hidden");
  const [invalidNameStatus, setinvalidNameStatus] = useState("hidden");
  const [commonStatus, setCommonStatus] = useState("hidden");

  const yourFunction = async (ms) => {
    await delay(ms);
    setCommonStatus("hidden");
    setinvalidMessStatus("hidden");
    setinvalidEmailStatus("hidden");
  };

  const getRagas = async () => {
    setLoading(true);
    try {
      const user = await axios.post(URL_SIGNUP, {
        name: name,
        email: email,
        password: password,
        diseaseType: data[selectedIndex.row],
        diseaseRating: [0, 0, 0, 0, 0],
      });
      setloggedin(true);
      setLoading(false);
      setName("");
      setEmail("");
      setConfirmPassword("");
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
        console.log("Error while storing in signup");
      }

      navigation.pop();
      navigation.navigate("Music");
      ///////////////////////////////
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const checkPassword = () => {
    if (password == confirmPassword) {
      if (password.length < 8) {
        setInvalidMess("Password length should be greater than 8");
        setinvalidMessStatus("");
        setCommonStatus("");
        yourFunction(3000);
        return;
      } else {
        if (validateEmail(email)) {
          if (name === "") {
            setInvalidMess("Name must be specified");
            setinvalidNameStatus("");
            setCommonStatus("");
            yourFunction(3000);
          } else {
            getRagas();
          }
        } else {
          setInvalidMess("Invalid Email");
          setinvalidEmailStatus("");
          setCommonStatus("");
          yourFunction(3000);
        }
      }
    } else {
      setInvalidMess("password does not match");
      setinvalidMessStatus("");
      setCommonStatus("");
      yourFunction(3000);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const textStyle = "flex justify-start items-start pt-1 w-72";

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <View
        style={[
          tw`flex h-full w-full justify-center items-center`,
          stylesSignup.background,
          { top: 0 },
        ]}
      >
        {/* Input */}
        <View style={[tw`${textStyle}`]}>
          <Text style={[tw`py-1 text-lg`, styles.text4]}>
            Your Name <Text style={stylesSignup.star}>*</Text>
          </Text>
          <Input
            style={[
              styles.input,
              invalidNameStatus === "" ? { borderColor: "#d00" } : {},
            ]}
            value={name}
            placeholder="Hritik Pathak"
            onChangeText={(nextValue) => setName(nextValue)}
          />
        </View>
        <View style={[tw`${textStyle}`]}>
          <Text style={[tw`py-1 text-lg`, styles.text4]}>
            Email <Text style={stylesSignup.star}>*</Text>
          </Text>
          <Input
            style={[
              styles.input,
              invalidEmailStatus === "" ? { borderColor: "#d00" } : {},
            ]}
            value={email}
            placeholder="Email"
            onChangeText={(nextValue) => setEmail(nextValue)}
          />
        </View>
        <View style={[tw`${textStyle} relative`]}>
          <Text style={[tw`py-1 text-lg`, styles.text4]}>
            Password <Text style={stylesSignup.star}>*</Text>
          </Text>
          <Input
            style={[
              styles.input,
              invalidMessStatus === "" ? { borderColor: "#d00" } : {},
            ]}
            value={password}
            placeholder="Password"
            onChangeText={(nextValue) => setPassword(nextValue)}
            secureTextEntry={pass2}
          />
          <TouchableOpacity
            onPress={() => setpass2(!pass2) & setPassState2(!passState2)}
            style={[
              tw`absolute right-1 p-1 bottom-1`,
              styles.borderSet,
              styles.iconsBorder,
            ]}
          >
            {passState2 ? (
              <Entypo name="eye-with-line" size={24} color="#001233" />
            ) : (
              <Entypo name="eye" size={24} color="#001233" />
            )}
          </TouchableOpacity>
        </View>
        <View style={[tw`${textStyle} relative`]}>
          <Text style={[tw`py-1 text-lg`, styles.text4]}>
            Comfirm Password <Text style={stylesSignup.star}>*</Text>
          </Text>
          <Input
            style={[
              styles.input,
              invalidMessStatus === "" ? { borderColor: "#d00" } : {},
            ]}
            value={confirmPassword}
            placeholder="Confirm Password"
            onChangeText={(nextValue) => setConfirmPassword(nextValue)}
            secureTextEntry={pass}
          />
          <TouchableOpacity
            onPress={() => setpass(!pass) & setPassState(!passState)}
            style={[
              tw`absolute right-1 p-1 bottom-1`,
              styles.borderSet,
              styles.iconsBorder,
            ]}
          >
            {passState ? (
              <Entypo name="eye-with-line" size={24} color="#001233" />
            ) : (
              <Entypo name="eye" size={24} color="#001233" />
            )}
          </TouchableOpacity>
        </View>

        <View style={[tw`${textStyle}`]}>
          <Text style={[tw`py-1 text-lg`, styles.text4]}>
            Disease Type <Text style={stylesSignup.star}>*</Text>
          </Text>
          <Select
            style={[tw`w-full`]}
            placeholder="Default"
            value={data[selectedIndex.row]}
            selectedIndex={selectedIndex}
            onSelect={(index) => setSelectedIndex(index)}
          >
            {data.map(renderOption)}
          </Select>
        </View>

        <View style={[tw`w-72 pt-8 relative`]}>
          <Button
            style={styles.button}
            appearance="filled"
            onPress={checkPassword}
          >
            Sign Up
          </Button>
          <View
            style={[
              tw`absolute pb-1 top-1 flex justify-center items-center ${commonStatus} `,
            ]}
          >
            <Text style={[tw`pb-2 font-semibold`, { color: "#d00000" }]}>
              {invalidMess}
            </Text>
          </View>
        </View>
        <View style={tw`py-2`}>
          <TouchableOpacity onPress={() => navigation.navigate("LoginPage")}>
            <Text style={tw`font-bold`}>OR Login</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={loading}
          backdropStyle={stylesSignup.backdrop}
          onBackdropPress={() => setLoading(false)}
        >
          <Spinner size="giant" status="basic" />
        </Modal>

        <Modal visible={loggedin}>
          <Card disabled={true}>
            <Text style={[tw`pb-2 font-semibold`]}>
              Sign up successfully 🎉🎉
            </Text>
            <Text style={[tw`pb-2 font-semibold`]}>
              Welcome to Music Therapy 🎶🎵
            </Text>
            <Button onPress={() => setloggedin(false)}>Let's Go</Button>
          </Card>
        </Modal>

        <View
          style={[
            tw`absolute w-80 h-80 rounded-full bg-indigo-300 -bottom-40 -left-28 opacity-10`,
            stylesSignup.overlay,
          ]}
        ></View>
        <View
          style={[
            tw`absolute w-80 h-80 rounded-full bg-indigo-300 bottom-0 -right-44 opacity-10`,
            stylesSignup.overlay,
          ]}
        ></View>
        <View
          style={[
            tw`absolute w-full h-96 rounded-full bg-indigo-300 -top-40 -right-10 opacity-10`,
            stylesSignup.overlay,
          ]}
        ></View>
      </View>
    </ApplicationProvider>
  );
};
const stylesSignup = StyleSheet.create({
  star: {
    color: "#d00000",
  },
  background: {
    backgroundColor: "#cce3df",
    position: "absolute",
  },
  overlay: {
    backgroundColor: "#16291a",
    zIndex: -20,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  borderSet: {
    borderWidth: 0.2,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  iconsBorder: {
    borderWidth: 0.4,
    borderRadius: 0.2,
    backgroundColor: "#555",
  },
});

export default Signup;
