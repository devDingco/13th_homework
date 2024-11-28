"use client";

import { useState } from "react";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const UN_TRANSPARENT_HEADER_PAGES = ["/solplace-logs/new"];

export default function App() {
  const [currentPath, setCurrentPath] = useState("");

  const handleNavigationStateChange = (event) => {
    const url = new URL(event.url);
    console.log(url.pathname);
    setCurrentPath(url.pathname);
  };

  const isTransparentPage = !UN_TRANSPARENT_HEADER_PAGES.includes(currentPath);
  const Wrapper = isTransparentPage ? View : SafeAreaView;

  return (
    <>
      <Wrapper
        style={{
          flex: 1,
          backgroundColor: isTransparentPage ? "transparent" : "white",
        }}
      >
        <StatusBar translucent={isTransparentPage} />
        <WebView
          source={{ uri: "http://10.0.2.2:3000/solplace-logs/1234" }}
          onNavigationStateChange={handleNavigationStateChange}
        />
      </Wrapper>
    </>
  );
}
