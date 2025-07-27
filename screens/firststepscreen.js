// FirstStepScreen.js
import React, { useState, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

const DAYS = ['SEGUNDA','TERÇA','QUARTA','QUINTA','SEXTA','SÁBADO','DOMINGO'];
const PERIODS = [
  { key: 'morning',   label: 'Manhã' },
  { key: 'afternoon', label: 'Tarde' },
  { key: 'night',     label: 'Noite' },
];

// horários por período de acordo com o período do dia
const TIMES = {
  morning:   Array.from({ length: 7 }).map((_, i) => `${6  + i}:00`),  // 06:00–12:00
  afternoon: Array.from({ length: 6 }).map((_, i) => `${13 + i}:00`),  // 13:00–18:00
  night:     Array.from({ length: 5 }).map((_, i) => `${19 + i}:00`),  // 19:00–23:00
};

export default function FirstStepScreen({ navigation }) {
  const [selectedDay, setSelectedDay] = useState('SEGUNDA');
  const [availability, setAvailability] = useState(() => {
    const init = {};
    DAYS.forEach(d => {
      init[d] = {
        morning:   { start: '', end: '' },
        afternoon: { start: '', end: '' },
        night:     { start: '', end: '' },
      };
    });
    return init;
  });

  const [disciplines, setDisciplines] = useState('');

  // calcula horas totais disponíveis
  const totalHours = useMemo(() => {
    let sum = 0;
    Object.values(availability).forEach(periods => {
      Object.entries(periods).forEach(([_, { start, end }]) => {
        if (start && end) {
          const s = parseInt(start.split(':')[0], 10);
          const e = parseInt(end.split(':')[0],   10);
          if (e > s) sum += e - s;
        }
      });
    });
    return sum;
  }, [availability]);

  // média horas por disciplina
  const avg = useMemo(() => {
    const d = parseFloat(disciplines);
    return d > 0 && totalHours > 0 ? (totalHours / d).toFixed(1) : '';
  }, [disciplines, totalHours]);

  function updateTime(day, periodKey, field, value) {
    setAvailability(avail => ({
      ...avail,
      [day]: {
        ...avail[day],
        [periodKey]: {
          ...avail[day][periodKey],
          [field]: value,
        },
      },
    }));
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
      <TouchableOpacity onPress={() => navigation.navigate("PlanSetup")}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Primeira etapa</Text>
      <View style={{ width: 24 }} />
    </View>

    {/* Área principal com ScrollView + Botões */}
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.scroll, { paddingBottom: 32 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Título e instrução */}
        <Text style={styles.mainTitle}>Crie sua rotina de estudos!</Text>
        <Text style={styles.subtitle}>
          Marque sua disponibilidade de horas na semana.
        </Text>

        {/* Corpo */}
        <View style={styles.body}>
          {/* Dias da semana */}
          <View style={styles.daysList}>
            {DAYS.map(day => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayItem,
                  day === selectedDay && styles.dayItemActive,
                ]}
                onPress={() => setSelectedDay(day)}
              >
                <Text
                  style={[
                    styles.dayText,
                    day === selectedDay && styles.dayTextActive,
                  ]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Períodos */}
          <View style={styles.card}>
            {PERIODS.map(p => (
              <View key={p.key} style={styles.periodRow}>
                <Text style={styles.periodLabel}>{p.label}</Text>
                <View style={styles.pickerRow}>
                  <Picker
                    style={styles.pickerWrapper}
                    selectedValue={availability[selectedDay][p.key].start}
                    onValueChange={val => updateTime(selectedDay, p.key, 'start', val)}
                  >
                    <Picker.Item label="Início" value="" />
                    {TIMES[p.key].map(t => (
                      <Picker.Item key={t} label={t} value={t} />
                    ))}
                  </Picker>
                  <Picker
                    style={styles.pickerWrapper}
                    selectedValue={availability[selectedDay][p.key].end}
                    onValueChange={val => updateTime(selectedDay, p.key, 'end', val)}
                  >
                    <Picker.Item label="Fim" value="" />
                    {TIMES[p.key].map(t => (
                      <Picker.Item key={t} label={t} value={t} />
                    ))}
                  </Picker>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Inputs */}
        <View style={styles.inputsRow}>
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Disciplinas</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="0"
              value={disciplines}
              onChangeText={setDisciplines}
            />
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Horas disponíveis</Text>
            <TextInput
              style={[styles.input, styles.inputDisabled]}
              value={String(totalHours)}
              editable={false}
            />
          </View>
        </View>

        {/* Média */}
        <View style={styles.avgBlock}>
          <Text style={styles.inputLabel}>Média horas/disciplina</Text>
          <View style={styles.avgValue}>
            <Text style={styles.avgText}>{avg || '--'} por semana</Text>
          </View>
        </View>
      </ScrollView>

      {/* Ajuda e botão fixo */}
      <TouchableOpacity style={styles.help}>
        <Text style={styles.helpText}>Ajuda?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() =>
          navigation.navigate('SecondStep', {
            step1Data: { availability, disciplines, hoursWeek: totalHours }
          })
        }
      >
        <Text style={styles.nextButtonText}>PRÓXIMA ETAPA {'>>'}</Text>
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
  mainTitle: { fontSize: 24, color: '#B76EE6', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#333', textAlign: 'center', marginBottom: 16 },
  body: { flexDirection: 'row', marginBottom: 24 },
  daysList: { width: 80, height: 100 },
  dayItem: { paddingVertical: 8, textDecorationLine: 'underline' },
  dayItemActive: { backgroundColor: '#F2E8FF', paddingHorizontal: 4 },
  dayText: { fontSize: 14, color: '#333', textAlign: 'center' },
  dayTextActive: { color: '#B76EE6', fontWeight: 'bold' },
  card: { flex: 1, marginLeft: 0, backgroundColor: '#F2E8FF', borderTopRightRadius: 12, borderBottomRightRadius: 12, padding: 12 },
  periodRow: { marginBottom: 12 },
  periodLabel: { fontWeight: '600', color: '#000', marginBottom: 4, marginHorizontal: 4 },
  pickerRow: { flexDirection: 'row', justifyContent: 'space-between' },
  pickerWrapper: { flex: 1, marginHorizontal: 4, backgroundColor: '#FFF', borderRadius: 6 },
  inputsRow: { flexDirection: 'row', marginBottom: 24 },
  inputBlock: { flex: 1, marginRight: 8 },
  inputLabel: { fontSize: 14, color: '#333' },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 6, padding: 8, marginTop: 4 },
  inputDisabled: { backgroundColor: '#F0F0F0' },
  avgBlock: { marginBottom: 24 },
  avgValue: { backgroundColor: '#F8F8F8', borderRadius: 6, padding: 8 },
  avgText: { fontSize: 16, color: '#333' },
  help: { alignItems: 'flex-end', marginTop: 8 },
  helpText: { color: '#000', paddingRight: 16 },
  nextButton: { backgroundColor: '#B76EE6', padding: 16, alignItems: 'center', margin: 16, borderRadius: 8 },
  nextButtonText: { color: '#FFF', fontSize: 16 },
});
