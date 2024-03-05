import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LandingPage from '../pages/LandingPage';
import HomePage from '../pages/HomePage';


const Stack = createNativeStackNavigator();

export default function NavigationStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="LandingPage"
          component={LandingPage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="HomePage"
          component={HomePage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
