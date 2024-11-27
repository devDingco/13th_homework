import { SafeAreaView, StatusBar } from "react-native";
import { WebView } from "react-native-webview";

export default function SolPlaceLogsPage() {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar translucent={false} />
        <WebView
          source={{
            uri: "http://10.0.2.2:3000/solplace-logs/new",
          }}
        />
      </SafeAreaView>
    </>
  );
}
