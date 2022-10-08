import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Routes } from './src/routes';


import { AuthProvider } from './src/contexts/AuthContext';


import { Jost_400Regular, Jost_600SemiBold } from "@expo-google-fonts/jost";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          Jost_400Regular,
          Jost_600SemiBold,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    })();
  }, []);

  const onLayout = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);



  if (!appIsReady) {
    return null;
  }
  return (
    <View style={{ flex: 1 }} onLayout={onLayout}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </View>
  );
}
