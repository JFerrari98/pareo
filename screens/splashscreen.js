import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen({ navigation }) {
  return (
    <LinearGradient
      // ajuste as cores conforme o seu design
      colors={['#4636B5', '#6C51F5']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.logoContainer}>
          {/* substitua 'logo.png' pelo seu arquivo de logo na pasta assets */}
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.replace('Welcome')}
        >
            <Text style={styles.buttonText}>Iniciar</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'visible',
    paddingBottom: 30
  },
  safe: {
    flex: 1,
    justifyContent: 'space-between',
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: 'bold',
    marginRight: 8,
  },
  logo: {
    width: 200,
    height: 50,
  },
  button: {
    alignSelf: 'center',
    marginBottom: 40,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
