import { StatusBar, SafeAreaView, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { useState } from "react";

// const computerAddress = "http://172.16.0.66:3000"; // 내 핸드폰에서 접속하기
// const androidEmulatorAddress = "http://10.0.2.2:3000"; // 안드로이드 에뮬레이터에서 접속하기
const iosEmulatorAddress = "http://127.0.0.1:3000"; // IOS 에뮬레이터에서 접속하기

export default function WebViewInternetFailPage() {
  const [isError, setIsError] = useState(false);
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar translucent={false} />

        {isError && (
          <View>
            <Text>웹뷰 접속에 실패했어요!</Text>
            <Text>인터넷 연결을 확인해주세요.</Text>
          </View>
        )}

        <WebView
          source={{
            uri: `${iosEmulatorAddress}/section01/01-05-webview-internet-fail`,
          }}
          onError={() => setIsError(true)}
        />
      </SafeAreaView>
    </>
  );
}
