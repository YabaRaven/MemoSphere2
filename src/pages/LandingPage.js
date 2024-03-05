// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/stack';


// const LandingPage = ({ navigation }) => {
//  return (
//     <SafeAreaView style = {styles.safeArea}>        
//         <View style={styles.container}>   
//             <Image
//                 style={{width: 300, height: 200}}
//                 source={require('../memo.png')}
//             />
//             <Text style={styles.title}>Instant. Unfolded. Memoir</Text>
//             <TouchableOpacity
//                 style={styles.button}
//                 onPress={() => navigation.navigate('HomePage')}
//             >
//                 <Text style={styles.buttonText}>Get Started</Text>
//             </TouchableOpacity>
//         </View>
//     </SafeAreaView>
//  );
// };

// import React from 'react';
// import { SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const LandingPage = () => {
//   const navigation = useNavigation();

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.container}>
//         <Image
//           style={{ width: 300, height: 200 }}
//           source={require('../memo.png')}
//         />
//         <Text style={styles.title}>Instant. Unfolded. Memoir</Text>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.navigate('HomePage')}
//         >
//           <Text style={styles.buttonText}>Get Started</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//     safeArea: {
//         flex: 1,
//         backgroundColor: '#ffffff',
        
//     },
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#ffffff',
//     },
//     title: {
//         fontSize: 20,
//         marginBottom: 20,
//         color: '#004AAD'
//     },
//     button: {
//         backgroundColor: '#004AAD',
//         paddingHorizontal: 10,
//         paddingVertical: 15,
//         borderRadius: 10,
//         marginTop: 50,
//         width: 200,
//         alignItems: 'center', 
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 18,
//     },
// });

// export default LandingPage;
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LandingPage = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          style={{ width: 300, height: 200 }}
          source={require('../memo.png')}
        />
        <Text style={styles.title}>Instant. Unfolded. Memoir</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('HomePage')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
        
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        color: '#004AAD'
    },
    button: {
        backgroundColor: '#004AAD',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 50,
        width: 200,
        alignItems: 'center', 
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default LandingPage;