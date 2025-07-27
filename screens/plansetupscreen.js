// PlanSetupScreen.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  Linking,
} from 'react-native';

export default function PlanSetupScreen({ navigation }) {
  const [agreed, setAgreed] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Image
            source={require('../assets/logo-header.png')}
            style={styles.logoIcon}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.tagline}>SUA ROTINA DE ESTUDO ONLINE</Text>
      </View>

      {/* Conteúdo principal + botão juntos */}
      <View style={styles.body}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={require('../assets/capa.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />

          <Text style={styles.title}>
            Vamos começar{'\n'}a montar seu plano!
          </Text>

          <View style={styles.list}>
            <Text style={styles.item}>
              1. Informe seus dias e horários semanais disponíveis para estudo
            </Text>
            <Text style={styles.item}>
              2. Quando marcar seus dias e horários, lembre-se de equilibrar a
              sua disponibilidade de estudo com a quantidade de disciplinas que
              estiver cursando. Caso você disponibilize poucas horas, é possível
              que o sistema não consiga criá-lo.
            </Text>
            <Text style={styles.item}>
              3. Desmobilize o máximo de horas possíveis para os seus estudos!
            </Text>
          </View>

          <Pressable
            style={styles.checkboxContainer}
            onPress={() => setAgreed((prev) => !prev)}
          >
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed && <View style={styles.checkboxDot} />}
            </View>
            <Text style={styles.checkboxLabel}>
              Tudo certo, entendi e quero criar minha rotina de estudos!
            </Text>
          </Pressable>

          <Text style={styles.helpText}>
            Permanece com dúvida? Baixe o{' '}
            <Text
              style={styles.link}
              onPress={() => Linking.openURL('https://seu.tutorial.com')}
            >
              tutorial completo!
            </Text>
          </Text>
        </ScrollView>

        {/* Botão fixo abaixo do conteúdo scrollável */}
        <TouchableOpacity
          style={[styles.button, !agreed && styles.buttonDisabled]}
          disabled={!agreed}
          onPress={() => navigation.replace('FirstStep')}
        >
          <Text style={styles.buttonText}>CRIAR ROTINA DE ESTUDO!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const PURPLE = '#6C51F5';
const LIGHT_PURPLE = '#B76EE6';
const GRAY = '#E0E0E0';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingBottom: 30
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: GRAY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 100,
    height: 40,
  },
  tagline: {
    fontSize: 10,
    color: '#666',
    textTransform: 'uppercase',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  heroImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: LIGHT_PURPLE,
    textAlign: 'center',
    marginBottom: 24,
  },
  list: {
    marginBottom: 24,
  },
  item: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#BBB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    borderColor: LIGHT_PURPLE,
  },
  checkboxDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: LIGHT_PURPLE,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  helpText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 16,
  },
  link: {
    textDecorationLine: 'underline',
    color: LIGHT_PURPLE,
  },
  button: {
    backgroundColor: LIGHT_PURPLE,
    paddingVertical: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#CCC',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
