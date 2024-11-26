import { Platform, StatusBar } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

export default function index() {
    const webViewUri =
        Platform.OS === 'android'
            ? 'http://10.0.2.2:3000/new'
            : 'http://127.0.0.1:3000/new';
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar translucent={false} />
            <WebView source={{ uri: webViewUri }} />
        </SafeAreaView>
    );
}
