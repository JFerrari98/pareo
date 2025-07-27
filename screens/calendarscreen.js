import React, { useState, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView 
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { LocaleConfig } from 'react-native-calendars';

// 1. Registra as traduções para pt-br
LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
    'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
  ],
  monthNamesShort: [
    'Jan','Fev','Mar','Abr','Mai','Jun',
    'Jul','Ago','Set','Out','Nov','Dez'
  ],
  dayNames: [
    'Domingo','Segunda-feira','Terça-feira','Quarta-feira',
    'Quinta-feira','Sexta-feira','Sábado'
  ],
  dayNamesShort: [
    'Dom','Seg','Ter','Qua','Qui','Sex','Sáb'
  ],
  today: 'Hoje'
};

// 2. Define pt-br como locale padrão
LocaleConfig.defaultLocale = 'pt-br';

// Gera string "YYYY-MM-DD" de hoje
function getTodayLocal() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm   = String(d.getMonth()+1).padStart(2,'0');
  const dd   = String(d.getDate()).padStart(2,'0');
  return `${yyyy}-${mm}-${dd}`;
}

// Converte "YYYY-MM-DD" para Date em horário local sem ambiguidade de fuso
function parseDateLocal(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export default function CalendarScreen({ navigation, route }) {
  const { availability = {}, step2Data = [], currentMonth } = route.params;

  // converte availability para objeto de marcações
  // marcamos em rosa os dias habilitados
  const marked = useMemo(() => {
    const m = {};
    Object.entries(availability).forEach(([dayName, periods]) => {
      if (Object.values(periods).some(p => p.start && p.end)) {
        const weekday = ['DOMINGO','SEGUNDA','TERÇA','QUARTA','QUINTA','SEXTA','SÁBADO']
          .indexOf(dayName);
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        for (let d = 1; d <= new Date(year, month + 1, 0).getDate(); d++) {
          const dt = new Date(year, month, d);
          if (dt.getDay() === weekday) {
            const key = dt.toISOString().split('T')[0];
            m[key] = {
              selected: true,
              selectedColor: '#F2E8FF'
            };
          }
        }
      }
    });
    return m;
  }, [availability]);

  const [selectedDate, setSelectedDate] = useState(getTodayLocal());

  // Usa parseDateLocal para obter o weekday correto
  const dayObj = availability[
    ['DOMINGO','SEGUNDA','TERÇA','QUARTA','QUINTA','SEXTA','SÁBADO']
      [ parseDateLocal(selectedDate).getDay() ]
  ] || {};

  const periods = ['morning','afternoon','night'];

  // Formata data para "DD de mês"
  const fmtDate = dateISO => {
    const d = parseDateLocal(dateISO);
    return `${d.getDate()} de ${d.toLocaleString('pt-BR',{month:'long'})}`;
  };

return (
  <SafeAreaView style={s.container}>
    {/* Header com logo */}
    <View style={s.header}>
      <Image
        source={require('../assets/logo-header.png')}
        style={s.logoIcon}
        resizeMode="contain"
      />
      <Text style={s.tagline}>SUA ROTINA DE ESTUDO ONLINE</Text>
    </View>

    {/* Header com título */}
    <View style={s.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={s.headerTitle}>Detalhes</Text>
      <View style={{ width: 24 }} />
    </View>

    {/* Conteúdo com scroll + botões fixos */}
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho personalizado */}
        <View style={s.customHeader}>
          <Text style={s.greeting}>
            Bom dia, bem-vindo à sua rotina de estudo.
          </Text>
          <Text style={s.subGreeting}>
            Essa é a visão geral do seu mês de {currentMonth}. Clique no dia…
          </Text>
        </View>

        {/* Calendário */}
        <Calendar
          current={selectedDate}
          monthFormat={'MMMM yyyy'}
          markedDates={{
            ...marked,
            [selectedDate]: {
              ...(marked[selectedDate] || {}),
              selected: true,
              selectedColor: '#B76EE6',
              selectedDayTextColor: '#fff',
            }
          }}
          onDayPress={day => setSelectedDate(day.dateString)}
          theme={{
            todayTextColor: '#6C51F5',
            arrowColor: '#FAF2FF',
            selectedDayTextColor: '#000',
          }}
          style={s.calendar}
        />

        {/* Data e horários */}
        <Text style={s.selectedDate}>{fmtDate(selectedDate)}</Text>
        <View style={s.detailsContainer}>
          {periods.map(p => {
            const { start, end } = dayObj[p] || {};
            return start && end ? (
              <Text key={p} style={s.detailItem}>
                {p === 'morning' ? 'Manhã' : p === 'afternoon' ? 'Tarde' : 'Noite'}: {start}–{end}
              </Text>
            ) : null;
          })}
        </View>
      </ScrollView>

      {/* Botões fixos */}
      <TouchableOpacity
        style={s.button}
        onPress={() => navigation.replace('PlanSetup')}
      >
        <Text style={s.buttonText}>Refaça a rotina</Text>
      </TouchableOpacity>
      <TouchableOpacity style={s.buttonInativo}>
        <Text style={s.buttonTextInativo}>Dicas de como estudar online</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);
}

const GRAY = '#EEE';
const BG = '#FFF';

const s = StyleSheet.create({
  container: {flex:1,backgroundColor:'#FFF', paddingBottom: 30},
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
  headerTitle:{fontSize:16,fontWeight:'600'},
  customHeader:{padding:16,borderBottomWidth:1,borderBottomColor:'#EEE'},
  greeting:{fontSize:20,fontWeight:'600',textAlign:'center',marginBottom:4},
  subGreeting:{fontSize:14,textAlign:'center',color:'#666',lineHeight:20},
  calendar:{margin:16,borderRadius:8,elevation:2},
  selectedDate:{marginTop:24,marginHorizontal:16,fontStyle:'italic'},
  detailsContainer:{margin:16},
  detailItem:{fontSize:14,marginBottom:4},
  button:{backgroundColor:'#B76EE6',padding:16,marginHorizontal:16,borderRadius:8},
  buttonText:{color:'#FFF',textAlign:'center'},
  buttonInativo:{padding:16,margin:16,borderRadius:8,borderWidth:2,borderColor:'#B76EE6'},
  buttonTextInativo:{textAlign:'center',color:'#333'}
});
