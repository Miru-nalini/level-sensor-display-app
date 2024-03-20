import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-gesture-handler';
import { useColorScheme } from '@/components/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



//firebase config
// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import {initializeAuth,getAuth,onAuthStateChanged, getReactNativePersistence} from '@firebase/auth';
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCUQTAmd-CWx2AxVHilYQN0bHbGAzS0Rs",
  authDomain: "levelsensor-f06b5.firebaseapp.com",
  projectId: "levelsensor-f06b5",
  storageBucket: "levelsensor-f06b5.appspot.com",
  messagingSenderId: "521738927861",
  appId: "1:521738927861:web:9ad116a600a81db977cfbc",
  measurementId: "G-WTF0EGWXEJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
initializeAuth(app,{
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
//




export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  
useEffect(()=>{
  getAuth().onAuthStateChanged((user) => {
    if (user) {
      console.log('user is logged in with '+user.email);
      router.replace('/(main)/(vm)/');
    }
    else{
      router.replace('/');
    }
});
},[]);
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <Stack >
        <Stack.Screen name="index" options={{ headerShown: false , presentation:'modal', animation:'slide_from_right'}} />
        <Stack.Screen name="login" options={{ headerShown: false , presentation:'modal', animation:'slide_from_right'}} />
        <Stack.Screen name="(main)" options={{ headerShown: false , animation:'slide_from_bottom'}}/>
      </Stack>
    </GestureHandlerRootView>
  );
}
