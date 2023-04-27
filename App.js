import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/Home";
import Music from "./src/Music";
import Diabetes from "./src/components/Diabetes";
import Hypertension from "./src/components/Hypertension";
import Blood from "./src/components/Blood";
import Recommender from "./src/components/Recommender";
import Signup from "./src/components/Signup";
import Bot from "./src/components/Bot";
import Feedback from "./src/components/Feedback";
import LoginPage from "./src/components/LoginPage";
import VerificationPage from "./src/components/VerificationPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Ragas Therapist"
          component={Bot}
        />
        <Stack.Screen
          name="Feedback"
          options={{ headerShown: false }}
          component={Feedback}
        ></Stack.Screen>
        <Stack.Screen name="Music" component={Music} />
        <Stack.Screen name="Diabetes" component={Diabetes} />
        <Stack.Screen name="Hypertension" component={Hypertension} />
        <Stack.Screen name="Blood" component={Blood} />
        <Stack.Screen name="Recommender" component={Recommender} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen
          name="LoginPage"
          options={{ headerShown: false }}
          component={LoginPage}
        ></Stack.Screen>
        <Stack.Screen
          name="VerificationPage"
          options={{ headerShown: false }}
          component={VerificationPage}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#081c15",
  },
});
