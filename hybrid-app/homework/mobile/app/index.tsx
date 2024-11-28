
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import WebView from "react-native-webview";

export default function 나의시작화면 () {

    return (
        <SafeAreaView style={{flex: 1}}>
        <StatusBar 
            translucent = {false}
        />
        <WebView 
            source={{
                // 1. [내핸드폰]
                //    내 핸드폰에서 연결된 내컴퓨터 => QR코드 아래에 나오는 IP주소  
                // uri: "http://{QR코드 아래에 나오는 IP주소}:3000/section01/01-04-webview-with-next"

                // 2. [안드로이드 에물레이터]
                //    안드로이드 기계에서 자기자신 => 10.0.2.2
                // uri: "http://10.0.2.2:3000/solplace-logs/new"

                // 3. [IOS 시뮬레이터]
                //    IOS 기계에서 자기자신 => 127.0.0.1
                uri: "http://127.0.0.1:3000/solplace-logs/new"
            }}
        />
    </SafeAreaView>
    )
}