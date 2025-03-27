import 'react-native-gesture-handler'; 
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import MainStackNavigator from "./navigation/BottomTabNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainStackNavigator  />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
