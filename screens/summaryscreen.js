// SummaryScreen.js
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SummaryScreen({ navigation, route }) {
  // 1) Recebendo os dados via navigation params
  const { step1Data, step2Data } = route.params;
  const { availability } = step1Data;
  const totalStep1 = parseInt(step1Data.hoursWeek, 10) || 0;

  // Apenas as disciplinas marcadas na segunda etapa
  const used = step2Data.filter(d => d.enabled);
  // Soma das horas escolhidas na segunda etapa
  const totalStep2 = used.reduce(
    (sum, d) => sum + (parseInt(d.hours, 10) || 0),
    0
  );

  const valid = totalStep2 <= totalStep1;
  const created = new Date().toLocaleDateString();

return (
  <SafeAreaView style={styles.container}>
    {/* Header */}
    <View style={styles.header}>
      <Image
        source={require('../assets/logo-header.png')}
        style={styles.logoIcon}
        resizeMode="contain"
      />
      <Text style={styles.tagline}>SUA ROTINA DE ESTUDO ONLINE</Text>
    </View>

    {/* Top bar with back arrow */}
    <View style={styles.calling}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Resumo</Text>
      <View style={{ width: 24 }} />
    </View>

    {/* Área principal com Scroll + Botões */}
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.scroll, { paddingBottom: 32 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          Uau! Veja o resumo da sua rotina de estudos.
        </Text>

        <View style={styles.box}>
          <Text style={styles.boxLabel}>
            Lista das disciplinas que foram utilizadas:
          </Text>
          {used.map((d, i) => (
            <Text key={i} style={styles.boxItem}>
              ✔ {d.name}
            </Text>
          ))}
        </View>

        <Text style={styles.date}>Criada em {created}</Text>

        <Text style={styles.result}>
          Total de horas disponíveis  
          <Text style={styles.resultValue}> {totalStep1} Horas</Text>
        </Text>
        <Text style={styles.result}>
          Total de horas selecionadas  
          <Text style={styles.resultValue}> {totalStep2} Horas</Text>
        </Text>

        {!valid && (
          <View style={styles.alert}>
            <Ionicons name="warning" size={20} color="#333" style={{ marginRight: 8 }} />
            <Text style={styles.alertText}>
              O tempo que você disponibilizou semanal é maior que o tempo
              selecionado na segunda etapa. Refaça as etapas e gere uma nova rotina.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Ajuda e botão final */}
      <TouchableOpacity style={styles.help}>
        <Text style={styles.helpText}>Ajuda?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, !valid && styles.buttonRefazer]}
        disabled={!valid}
        onPress={() =>
          navigation.navigate('Calendar', {
            availability,
            step2Data,
            currentMonth: new Date().toLocaleString('pt-BR', {
              month: 'long',
              year: 'numeric',
            }),
          })
        }
      >
        <Text style={styles.buttonText}>GERAR ROTINA &gt;&gt;</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

}

const PURPLE = '#B76EE6';
const LIGHT_BG = '#F2E8FF';
const TEXT = '#333';
const BG = '#FFF';
const GRAY = '#EEE';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', overflow: 'visible', paddingBottom: 30 },
  header: {
    backgroundColor: BG,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: GRAY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  calling: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: GRAY,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: TEXT,
  },
  scroll: { padding: 16 },
  title: {
    fontSize: 24,
    color: PURPLE,
    textAlign: 'center',
    marginBottom: 16,
  },
  box: {
    backgroundColor: LIGHT_BG,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  boxLabel: { marginBottom: 8, color: TEXT },
  boxItem: { marginVertical: 4, fontSize: 14, color: TEXT },
  date: { textAlign: 'center', fontStyle: 'italic', marginBottom: 16 },
  result: { fontSize: 16, color: TEXT, marginVertical: 4 },
  resultValue: { fontWeight: 'bold' },
  alert: {
    flexDirection: 'row',
    backgroundColor: '#FFF1C2',
    padding: 12,
    borderRadius: 6,
    marginVertical: 16,
    alignItems: 'center',
  },
  alertText: { flex: 1, fontSize: 14, color: TEXT },
  help: { alignItems: 'flex-end', marginTop: 16, paddingRight: 18 },
  helpText: { color: '#000' },
  button: {
    backgroundColor: PURPLE,
    paddingVertical: 16,
    alignItems: 'center',
    margin: 16,
    borderRadius: 8,
  },
  buttonRefazer: { backgroundColor: '#CCC' },
  buttonText: { color: '#FFF', fontSize: 16 },
});
