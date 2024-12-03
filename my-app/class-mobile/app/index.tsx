import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

// const URI = "172.16.1.22"; // 내 핸드폰 접속하기
// const URI = "10.0.2.2"; //안드로이드에뮬레이터 접속하기
const URI = "127.0.0.1"; //IOS시뮬레이터 접속하기

// prettier-ignore
export default function 나의시작화면() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar translucent={false} />

      {/* <WebView source={{ uri: `http://${URI}:3000/solplace-logs/new` }} /> */} {/* 등록페이지 */}
      
      <WebView source={{ uri: `http://${URI}:3000/solplace-logs/solplaceLogId` }} /> {/* 상세페이지 */}
    </SafeAreaView>
  );
}
