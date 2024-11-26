import { StatusBar, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

export default function WebViewWithNextPage() {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar translucent={false} />
        <WebView
          source={{
            // 1. [내핸드폰]
            // QR코드 아래에 나오는 주소로 입력해야 접속이 가능하다.
            // 내 핸드폰에서 연결된 내 컴퓨터
            // uri: "http://172.16.0.66:3000/section01/01-04-webview-with-next",

            // 2. [안드로이드 에뮬레이터]
            // 10.0.2.2 => 안드로이드 기계에서 자기 자신을 의미
            uri: "http://10.0.2.2:3000/section01/01-04-webview-with-next",

            // 3. [iOS 에뮬레이터]
            // 127.0.0.1 => IOS 기계에서 자기 자신을 의미
            // uri: "http://10.0.2.2:3000/section01/01-04-webview-with-next",
          }}
        />
      </SafeAreaView>
    </>
  );
}
