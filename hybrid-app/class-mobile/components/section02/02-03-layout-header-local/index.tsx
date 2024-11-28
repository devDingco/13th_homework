import { StatusBar, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

// const computerAddress = "http://172.16.0.66:3000"; // 내 핸드폰에서 접속하기
// const androidEmulatorAddress = "http://10.0.2.2:3000"; // 안드로이드 에뮬레이터에서 접속하기
const iosEmulatorAddress = "http://127.0.0.1:3000"; // IOS 에뮬레이터에서 접속하기

export default function LayoutHeaderLocalPage() {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar translucent={false} />
        <WebView
          source={{
            uri: `${iosEmulatorAddress}/section02/02-03-layout-header-local/123`,
          }}
        />
      </SafeAreaView>
    </>
  );
}
