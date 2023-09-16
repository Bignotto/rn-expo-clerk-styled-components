import { ClerkProvider } from "@clerk/clerk-expo";
import { Inter_900Black, useFonts } from "@expo-google-fonts/inter";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import Routes from "@routes/index";

import * as SecureStore from "expo-secure-store";

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {
  const CLERK_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  let [fontsLoaded, fontError] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GluestackUIProvider>
      <ClerkProvider publishableKey={`${CLERK_KEY}`} tokenCache={tokenCache}>
        <Routes />
      </ClerkProvider>
    </GluestackUIProvider>
  );
}
