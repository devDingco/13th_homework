import { SafeAreaView, StatusBar } from 'react-native'
import { WebView } from 'react-native-webview'

export default function WebviewPage(){
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar 
                translucent={false}
            />

            <WebView source={{ uri: "https://www.naver.com" }} />
        </SafeAreaView>
    )
}