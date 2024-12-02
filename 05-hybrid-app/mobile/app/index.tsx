import { useApis } from "@/apis";
import { useRef } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

export default function Home() {
  const webviewRef = useRef<WebView>(null);
  const { onRequest } = useApis(webviewRef);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent={false} />
      <WebView
        ref={webviewRef}
        source={{
          // 1. [내핸드폰]
          // 내 핸드폰에서 연결된 내 컴퓨터 => OR코드 아래에 나오는 IP주소
          // uri: "http://172.16.0.168:3000/section01/01-04-webview-with-next"

          // 2. [안드로이드 애뮬레이터]
          // 안드로이드 기계에서 자기자신 => 10.0.2.2
          //uri: "http://10.0.2.2:3000/section01/01-04-webview-with-next",

          // 3. [IOS 시뮬레이터]
          // IOS기계에서 자기자신 => 127.0.0.1
          uri: "http://127.0.0.1:3000/solplace-logs/1/edit",
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
