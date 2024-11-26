import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function App() {
  return (
    // flex: 1 = 기기 크기 전체를 사용한다.
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent={false} />
      <WebView source={{ uri: "http://localhost:3000/solplace-logs/new" }} />
    </SafeAreaView>
  );
}
