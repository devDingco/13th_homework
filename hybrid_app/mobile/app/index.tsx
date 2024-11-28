import { SafeAreaView, StatusBar, Text } from "react-native";
import WebView from "react-native-webview";

export default function WebViewPage() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent={false} />
      <WebView source={{ uri: "http://127.0.0.1:3000/place/new" }} />
    </SafeAreaView>
  );
}
