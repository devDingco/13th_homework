import { SafeAreaView, StatusBar, Text, View } from 'react-native'
import { WebView } from 'react-native-webview'

// const 내컴퓨터접속주소 = "http://{QR코드 아래에 나오는 IP주소}:3000" // 내 핻드폰에서 접속하기
// const 내컴퓨터접속주소 = "http://10.0.2.2:3000" // 안드로이드에뮬레이터에서 접속하기
const 내컴퓨터접속주소 = "http://127.0.0.1:3000" // IOS시뮬레이터에서 접속하기

export default function RatioScailingPage() {
     return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar
                translucent = {false}
            />

                <WebView 
                    source={{
                        uri: `${내컴퓨터접속주소}/section02/02-01-ratio-scaling`
                    }}
               />
        </SafeAreaView>
    )
}