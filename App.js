// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { Provider as PaperProvider } from 'react-native-paper';
// import LandingPage from './src/pages/LandingPage';
// import HomePage from './src/pages/HomePage';


// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <PaperProvider>
//       <NavigationContainer>
//         <Stack.Navigator screenOptions={{headerShown: false}}>
//         <Stack.Screen name="LandingPage" component={LandingPage} />
//         <Stack.Screen name="HomePage" component={HomePage} />
//       </Stack.Navigator>
//       </NavigationContainer>
//     </PaperProvider>
//   );
// }

import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import globalstyles from './src/config/styles';
import { SafeAreaView } from "react-native-safe-area-context";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import colors from "./src/config/colors";
import NavigationStack from "./src/navigation/NavigationStack";

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: colors.colors,
    mode: "exact",
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <NavigationStack />
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create(globalstyles);



