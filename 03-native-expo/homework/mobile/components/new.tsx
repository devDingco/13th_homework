import { useState } from "react";
import { StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

const web = "http://10.0.2.2:3000";

export default function PlaceNewView() {
    const [isError, setIsError] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, padding: 2 }}>
            <StatusBar translucent={false} barStyle="dark-content" />

            {isError && (
                <View>
                    <Text>인터넷을 확인해주세요.</Text>
                </View>
            )}

            {!isError && <WebView source={{ uri: `${web}` }} onError={() => setIsError(true)} />}
        </SafeAreaView>
    );
}
