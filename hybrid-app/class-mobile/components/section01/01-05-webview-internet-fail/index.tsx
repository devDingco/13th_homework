import { useState } from 'react'
import { SafeAreaView, StatusBar, Text, View } from 'react-native'
import { WebView } from 'react-native-webview'

// const 내컴퓨터접속주소 = "http://{QR코드 아래에 나오는 IP주소}:3000" // 내 핻드폰에서 접속하기
// const 내컴퓨터접속주소 = "http://10.0.2.2:3000" // 안드로이드에뮬레이터에서 접속하기
const 내컴퓨터접속주소 = "http://127.0.0.1:3000" // IOS시뮬레이터에서 접속하기

export default function WebviewInternetFailPage() {
    const [isError, setIsError] = useState(false)
     return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar 
                translucent = {false}
            />

            {isError && (
                <View>
                    <Text>앱뷰접속에 실패했어요!</Text>
                    <Text>인터넷 연결을 확인해주세요!</Text>
                </View>
            )}
            {!isError && (
                <WebView 
                    source={{
                        uri: `${내컴퓨터접속주소}/section01/01-05-webview-internet-fail`
                    }}
                    onError={() => setIsError(true)}
                    // onLoadStart={}
                    // onLoadEnd={}
               />
            )}
        </SafeAreaView>
    )
}