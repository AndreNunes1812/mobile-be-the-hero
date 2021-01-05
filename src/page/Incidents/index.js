import React , { useState, useEffect } from 'react'
import Feather  from 'react-native-vector-icons/Feather';
import { useNavigation  } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'

import  logoimg from '../../assets/logo.png';

import api from '../../services/api';

import styles from './styles';
console.disableYellowBox = true;

export default function Incidents() {
  const [incidents, setIncidents] = useState([])
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  
  function navigationDetail(incident) {
    navigation.navigate('Detail', {incident});
  }

  async function loadIncidents() {

    if(loading) {
      return;
    }

    if(total > 0 && incidents.total === total) {
      return 
    }

    setLoading(true);

    const response = await api.get('incidents', {
      params: { page }
    });

    setLoading(false);
    setPage(page + 1);
    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers['x-total-count'])

  }

  useEffect(()=> {
    loadIncidents();
  },[])

  return (
    <View style={ styles.container } >
      <View style={ styles.header }>
        <Image source={ logoimg } />
        <Text style={ styles.headerText}>
          Total de <Text style={ styles.headerTextBold }>{total} casos.</Text>
        </Text>          
      </View>

      <Text style={ styles.title}>Bem-vindo</Text>
      <Text style={ styles.description}>Escolha um dos casos abaixo e salve o dia</Text>

      <FlatList 
        data={incidents}
        style={ styles.incidentList }
        keyExtractor={incident => incident.id}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}

        showsVerticalScrollIndicator={false}
        renderItem={( { item: incident } ) => (
          <View style={ styles.incident}>
            <Text style={ styles.incidentProperty}>ONG:</Text>
            <Text style={ styles.incidentValue}>{incident.name}</Text>

            <Text style={ styles.incidentProperty}>CASO:</Text>
            <Text style={ styles.incidentValue}>{incident.title}</Text>


            <Text style={ styles.incidentProperty}>VALOR:</Text>
        <Text style={ styles.incidentValue}>{Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(incident.value)}
        </Text>

            <TouchableOpacity 
              style={styles.detailsButton} 
              onPress={()=> navigationDetail(incident)}
            >
              <Text style={ styles.detailsButtonText} >Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </TouchableOpacity>

          </View>
        )}      
      />  

    </View>
  );
}