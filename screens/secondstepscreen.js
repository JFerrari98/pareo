// SecondStepScreen.js
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

export default function SecondStepScreen({ navigation, route }) {
  // Recebe dados da etapa 1
  const { step1Data } = route.params;
  // Quantidade de disciplinas informadas na etapa 1
  const count = parseInt(step1Data.disciplines, 10) || 0;

  // Gera nomes dinâmicos: Disciplina 1, Disciplina 2, ..., Disciplina N
  const disciplinesList = Array.from({ length: count }).map(
    (_, i) => `Disciplina ${i + 1}`
  );

  // Estado para cada linha: habilitada, horas e início
  const [data, setData] = useState(
    disciplinesList.map(name => ({ name, enabled: false, hours: '', start: '' }))
  );

  // Se a quantidade mudar, resetamos o estado
  useEffect(() => {
    setData(
      disciplinesList.map(name => ({ name, enabled: false, hours: '', start: '' }))
    );
  }, [count]);

  const HOURS = ['Selecione','1','2','3','4','5','6','7','8','9','10'];
  const START_FROM = ['Selecione','1','2','3','4','5'];

  function toggleRow(i) {
    const copy = [...data];
    copy[i].enabled = !copy[i].enabled;
    setData(copy);
  }

  function updateRow(i, field, value) {
    const copy = [...data];
    copy[i][field] = value;
    setData(copy);
  }

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

    {/* Back bar */}
    <View style={styles.calling}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Segunda etapa</Text>
      <View style={{ width: 24 }} />
    </View>

    {/* Área principal com ScrollView e botões */}
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.scroll, { paddingBottom: 32 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Bom trabalho até aqui.</Text>
        <Text style={styles.subtitle}>Agora informe:</Text>
        <View style={styles.bullets}>
          <Text style={styles.bulletItem}>
            1. Quantas horas você se dedicará às disciplinas.
          </Text>
          <Text style={styles.bulletItem}>
            2. A partir de qual aula deseja iniciar a rotina de estudos.
          </Text>
        </View>

        {/* Tabela dinâmica */}
        <View style={styles.table}>
          <View style={[styles.row, styles.rowHeader]}>
            <Text style={[styles.cell, styles.cellHeader]}>Minhas disciplinas:</Text>
            <Text style={[styles.cell, styles.cellHeader]}>Estudarei por semana:</Text>
            <Text style={[styles.cell, styles.cellHeader]}>Crie a rotina a partir da aula:</Text>
          </View>

          {data.map((item, i) => (
            <View key={i} style={styles.row}>
              <TouchableOpacity onPress={() => toggleRow(i)}>
                <View style={[styles.checkbox, item.enabled && styles.checkboxChecked]}>
                  {item.enabled && <View style={styles.dot} />}
                </View>
              </TouchableOpacity>

              <Text style={[styles.cell, styles.discName]}>{item.name}</Text>

              <View style={styles.pickerWrapper}>
                <Picker
                  mode="dropdown"
                  enabled={item.enabled}
                  selectedValue={item.hours}
                  onValueChange={v => updateRow(i, 'hours', v)}
                  style={styles.picker}
                >
                  {HOURS.map(h => (
                    <Picker.Item
                      key={h}
                      label={h}
                      value={h === 'Selecione' ? '' : h}
                    />
                  ))}
                </Picker>
              </View>

              <View style={styles.pickerWrapper}>
                <Picker
                  mode="dropdown"
                  enabled={item.enabled}
                  selectedValue={item.start}
                  onValueChange={v => updateRow(i, 'start', v)}
                  style={styles.picker}
                >
                  {START_FROM.map(s => (
                    <Picker.Item
                      key={s}
                      label={s}
                      value={s === 'Selecione' ? '' : s}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Ajuda e botão fixo */}
      <TouchableOpacity style={styles.help}>
        <Text style={styles.helpText}>Ajuda?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Summary', {
            step1Data,
            step2Data: data,
          })
        }
      >
        <Text style={styles.buttonText}>RESUMO &gt;&gt;</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', overflow: 'visible', paddingBottom: 30 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    justifyContent: 'space-between',
  },
  logoIcon: { width: 100, height: 40 },
  tagline: { fontSize: 10, color: '#666', textTransform: 'uppercase' },
  calling: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 16, color: '#333' },
  scroll: { padding: 16 },
  title: { fontSize: 24,  color: '#B76EE6', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#333', textAlign: 'start', marginTop: 8 },
  bullets: { marginVertical: 12, paddingLeft: 0 },
  bulletItem: { fontSize: 16, color: '#333', marginBottom: 6 },
  table: { backgroundColor: '#F2E8FF', borderRadius: 8, overflow: 'hidden' },
  row: { flexDirection: 'row', justifyContent: "center", alignItems: 'center', paddingVertical: 8 },
  rowHeader: { backgroundColor: '#E8DFFF' },
  cell: { flex: 1, textAlign: 'start', fontSize: 14, paddingHorizontal: 16 },
  cellHeader: { fontWeight: '600', color: '#000' },
  discName: { textAlign: 'left', paddingLeft: 8, flex: 1.5 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#BBB',
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: { borderColor: '#6C51F5' },
  dot: { width: 10, height: 10, backgroundColor: '#6C51F5', borderRadius: 5 },
  pickerWrapper: { flex: 1, backgroundColor: '#FFF', marginHorizontal: 4, borderRadius: 6 },
  picker: {height: 50, width: 100},
  help: { alignItems: 'flex-end', marginTop: 16, paddingRight: 18 },
  helpText: { color: '#000' },
  button: { backgroundColor: '#B76EE6', paddingVertical: 16, alignItems: 'center', margin: 16, borderRadius: 8 },
  buttonText: { color: '#FFF', fontSize: 16 },
});
