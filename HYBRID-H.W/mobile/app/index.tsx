import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

export default function startPage() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent={false} />
      <WebView source={{ uri: 'http://127.0.0.1:3000/solplace-logs/new' }} />
    </SafeAreaView>
  );
}
