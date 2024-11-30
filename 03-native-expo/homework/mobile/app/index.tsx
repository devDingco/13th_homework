import { useState } from "react";
import { StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

// const LOCAL = "http://192.168.0.1:3000/";
const ANDROID = "http://10.0.2.2:3000/";
// const IOS = "http://127.0.0.1:3000/";

export default function InitialScreen() {
    const [isError, setIsError] = useState(false);
    return (
        <SafeAreaView style={{ flex: 1, padding: 2 }}>
            <StatusBar translucent={false} barStyle="dark-content" />

            {isError && (
                <View>
                    <Text>인터넷을 확인해주세요.</Text>
                </View>
            )}

            {!isError && (
                <WebView source={{ uri: `${ANDROID}` }} onError={() => setIsError(true)} />
            )}
        </SafeAreaView>
    );
}
