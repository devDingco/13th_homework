import { Button, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

// const 내컴퓨터접속주소 = "http://172.12.0.106:3000" // 내핸드폰에서 접속하기
const 내컴퓨터접속주소 = "http://10.0.2.2:3000" // 안드로이드에뮬레이터에서 접속하기
// const 내컴퓨터접속주소 = "http://127.0.0.1:3000" // IOS시뮬레이터에서 접속하기

export default function WebviewLogPage() {

    const onPressButton = () => {
        console.log("이것은 모바일 로그입니다!")
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar 
                translucent={false}
            />

            <WebView 
                source={{ uri: `${내컴퓨터접속주소}/section03/03-01-webview-log` }} 
            />

            <Button onPress={onPressButton} title="모바일로그를 확인하세요!" />
        </SafeAreaView>

    )
}