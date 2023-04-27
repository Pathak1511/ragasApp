import { SafeAreaView, Dimensions, View } from "react-native";
import React, { Component } from "react";
import { GiftedChat, InputToolbar, Send } from "react-native-gifted-chat";
import { HeroImg2 } from "./../../assets";
import { Dialogflow_V2 } from "react-native-dialogflow";
import { diaglowflow } from "./../../env";
import { FontAwesome } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";

const windowHeight = Dimensions.get("window").height;

const bot = {
  _id: 2,
  name: "Mr. Therapist",
  avatar: HeroImg2,
  video: "",
};

const customtInputToolbar = (props) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        height: 50,
        position: "absolute",
        bottom: windowHeight + 96 - windowHeight,
        backgroundColor: "#d5dcd6",
        borderTopColor: "#ebf0ec",
        borderTopWidth: 1,
        marginBottom: 20,
      }}
    />
  );
};

const customSend = (props) => {
  return (
    <Send
      {...props}
      containerStyle={{
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FontAwesome name="send" size={24} color="#2d5234" />
    </Send>
  );
};

class Bot extends Component {
  state = {
    messages: [
      {
        _id: 1,
        text: "Hello! How can I assist you with your therapy today? ",
        createdAt: new Date(),
        user: bot,
      },
    ],
    id: 1,
    name: "",
  };

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      diaglowflow.client_email,
      diaglowflow.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      diaglowflow.project_id
    );
  }

  sendBotResponse = (text) => {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: bot,
    };

    console.log(msg);

    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, msg),
    }));
  };

  handleGoogleResponse = (result) => {
    console.log(result);
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    this.sendBotResponse(text);
  };

  onSend = (messages = []) => {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log(error)
    );
  };

  onQuickReply = (quickReply) => {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, quickReply),
    }));

    let message = quickReply[0].value;
    Dialogflow_V2.requestQuery(
      message,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log(error)
    );
  };

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,

          marginBottom: 2,
          padding: 4,
        }}
      >
        <GiftedChat
          messages={this.state.messages}
          onSend={(message) => this.onSend(message)}
          onQuickReply={(quickReply) => this.onQuickReply(quickReply)}
          scrollToBottom={true}
          user={{ _id: 1 }}
          isTyping={true}
          renderInputToolbar={(props) => customtInputToolbar(props)}
          timeTextStyle={{
            left: { color: "#344e41" },
            right: { color: "#f1faee" },
          }}
          messagesContainerStyle={{
            backgroundColor: "#2d5234",
            paddingBottom: 16,
            borderColor: "#426348",
            borderWidth: 1,
            height: windowHeight - 160,
            marginBottom: 20,
          }}
          alwaysShowSend={true}
          renderSend={(props) => customSend(props)}
          //renderMessageVideo={renderMessageVideo}
          //renderMessageAudio={(props)=>renderMessageAudioInput}
          linkStyle={{
            right: {
              color: "##FFFFFF",
            },
            left: {
              color: "#3a86ff",
            },
          }}
        />
      </SafeAreaView>
    );
  }
}

// const styles = StyleSheet.create({
//   ChatMessageSytemMessageContainer: {
//     backgroundColor: "#222",
//   },
// });

export default Bot;
