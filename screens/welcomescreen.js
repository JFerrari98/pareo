// WelcomeScreen.js
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#272480', '#6C51F5']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Área de conteúdo + scroll */}
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={[styles.scrollContent, { paddingBottom: 32 }]}
            showsVerticalScrollIndicator={false}
          >
            {/* Logo + nome */}
            <View style={styles.logoRow}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.logoIcon}
                resizeMode="contain"
              />
            </View>

            {/* Título principal */}
            <Text style={styles.heading}>Bem-vindo!</Text>

            {/* Texto explicativo */}
            <Text style={styles.paragraph}>
              Estudar online não é uma tarefa fácil. No mundo digital há muitas distrações que, muitas vezes, nos tiram do foco do que é realmente importante.
            </Text>
            <Text style={styles.paragraph}>
              Estudar da modalidade EAD traz uma série de benefícios. Porém, para alcançar seus objetivos na modalidade, você precisará de disciplina e organização para não perder os prazos e manter sua rotina de estudos alinhada com as atividades e com seus colegas de turma.
            </Text>
            <Text style={styles.paragraph}>
              O PÁREO é uma ferramenta simples que o apoiará na construção de uma rotina de estudos.
            </Text>
            <Text style={styles.paragraph}>
              Clique no botão a seguir e comece a criar seu plano e bons estudos!
            </Text>
          </ScrollView>

          {/* Botão fixo */}
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => navigation.replace('PlanSetup')}
          >
            <Text style={styles.buttonText}>VAMOS COMEÇAR!</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    overflow: 'visible',
    paddingBottom: 30
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logoIcon: {
    width: 100,
    height: 24,
  },
  heading: {
    color: '#CA80FF',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  paragraph: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#B76EE6',
    marginHorizontal: 24,
    marginBottom: 32,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
