import { useApis } from "@/apis";
import { useRef } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

// const 내컴퓨터접속주소 = "http://172.16.0.106:3000"; // 내 핸드폰에서 접속하기
// const 내컴퓨터접속주소 = "http://10.0.2.2:3000"; // 안드로이드 에뮬레이터에서 접속하기
const 내컴퓨터접속주소 = "http://127.0.0.1:3000"; // IOS 시뮬레이터에서 접속하기

export default function home() {
  const webviewRef = useRef<WebView>(null);
  const { onRequest } = useApis(webviewRef);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent={true} />
      <WebView
        source={{
          uri: `${내컴퓨터접속주소}/solplace-logs/123`,
        }}
        onMessage={(event) => {
          if (!event.nativeEvent.data) return;

          const request = JSON.parse(event.nativeEvent.data);
          onRequest(request.query);
        }}
      />
    </SafeAreaView>
  );
}
