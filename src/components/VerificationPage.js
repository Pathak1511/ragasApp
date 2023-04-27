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
import { AntDesign } from "@expo/vector-icons";
import { styles } from "../Music";

const VerificationPage = () => {
  const [email, setemail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const handleSendOtp = () => {
    // const otp = Math.floor(100000 + Math.random() * 900000);
    //OTP sending logic
    console.log(`Sending OTP to ${email}`, otp);
    setOtpSent(true);
  };

  const handleVerify = () => {
    //your verification logic
    console.log(`Verifying OTP ${otp}`);
    setVerificationSuccess(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={[
          tw`flex-1 justify-center items-center bg-green-900`,
          styles.container,
        ]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={tw`w-11/12 p-4 bg-white rounded-md shadow-lg`}>
          <View style={tw`flex items-center justify-center mb-10`}>
            <Text
              style={[
                tw`text-green-500 text-2xl font-bold`,
                { color: "#2d5234" },
              ]}
            >
              One Time Password
            </Text>
          </View>
          {!verificationSuccess ? (
            <>
              <Text
                style={tw`text-center text-gray-700 font-medium text-lg mb-4`}
              >
                {!otpSent
                  ? "Enter your email to receive the OTP"
                  : "Enter the OTP you received on your email"}
              </Text>
              <TextInput
                style={tw`w-full px-4 py-3 border border-gray-400 rounded-md mb-4 text-lg font-semibold`}
                placeholder={otpSent ? "Enter OTP" : "Email"}
                placeholderTextColor="#96a6a1"
                onChangeText={(text) =>
                  otpSent ? setOtp(text) : setemail(text)
                }
                value={otpSent ? otp : email}
                autoCompleteType={otpSent ? "off" : "tel"}
              />
              <TouchableOpacity
                onPress={otpSent ? handleVerify : handleSendOtp}
                style={[
                  tw`items-center px-6 rounded-2xl py-3 mt-2 border-solid border-transparent `,
                  styles.flatlist,
                  styles.button,
                ]}
              >
                <Text style={tw`text-white font-semibold text-lg`}>
                  {otpSent ? "Verify" : "Send OTP"}
                </Text>
              </TouchableOpacity>
              {otpSent && (
                <TouchableOpacity onPress={() => setOtpSent(false)}>
                  <Text
                    style={[
                      tw`text-center mt-4 font-medium text-base`,
                      { color: "#2d5234" },
                    ]}
                  >
                    Change Email
                  </Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <View style={tw`flex items-center justify-center py-12`}>
              <AntDesign name="checkcircleo" size={80} color="#10b981" />
              <Text
                style={tw`text-center text-gray-700 font-bold text-xl mt-6`}
              >
                Verification successful!
              </Text>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default VerificationPage;
