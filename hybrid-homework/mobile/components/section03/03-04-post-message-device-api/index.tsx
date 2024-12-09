import { useRef } from "react";
import { Button, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

// const 내컴퓨터접속주소 = "http://172.12.0.106:3000" // 내핸드폰에서 접속하기
const 내컴퓨터접속주소 = "http://10.0.2.2:3000" // 안드로이드에뮬레이터에서 접속하기
// const 내컴퓨터접속주소 = "http://127.0.0.1:3000" // IOS시뮬레이터에서 접속하기

export default function PostMessageDeviceApiPage() {
    const webviewRef = useRef<WebView>(null)

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar 
                translucent={false}
            />

            <WebView 
                ref={webviewRef}
                source={{ uri: `${내컴퓨터접속주소}/section03/03-04-post-message-device-api` }} 
                onMessage={(event) => {
                    if(!event.nativeEvent.data) return

                    const request = JSON.parse(event.nativeEvent.data)
                    console.log(request)
                    switch(request.query){
                        case "fetchDeviceSystemForAppSet": {
                            webviewRef.current?.postMessage(
                                JSON.stringify({ 
                                    fetchDeviceSystemForAppSet: { 
                                        appVersion: "v1.0" // expo-constants 라이브러리 설치하면 조회 가능
                                    }
                                 })
                            )
                            break;
                        }

                        case "fetchDeviceSystemForPlatformSet": {
                            webviewRef.current?.postMessage(
                                JSON.stringify({ 
                                    fetchDeviceSystemForPlatformSet: { 
                                        modelName: "iPhone 7 Plus" // expo-device 라이브러리 설치하면 조회 가능
                                    }
                                 })
                            )
                            break;
                        }

                        case "fetchDeviceLocationForLatLngSet": {
                            webviewRef.current?.postMessage(
                                JSON.stringify({ 
                                    fetchDeviceLocationForLatLngSet: { 
                                        lat: 37, // expo-location 라이브러리 설치하면 조회 가능
                                        lng: 128
                                    }
                                 })
                            )
                            break;
                        }
                    }
                }}
            />
        </SafeAreaView>
    )
}