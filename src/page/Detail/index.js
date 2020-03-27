import React from 'react'
import Feather  from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { openComposer } from 'react-native-email-link'
import EmailSender from 'react-native-smtp';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'

import  logoimg from '../../assets/logo.png';

import styles  from './styles';

export default function Detail() {
  const navigation = useNavigation();

  const route = useRoute();

  const incident = route.params.incident;

  const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.description}" com valor de ${Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(incident.value)}`


/*  EmailSender.config({
    host: 'smtp.host.io',
    port: '465', // Optional. Default to 465
    username: 'andre.nunes020770@gmail.com',
    password: '',
    isAuth: 'true', // Optional. Default to `true`
    tls: 'true' // Optional. Default to `true`
  });
*/
  function navigateBack() {
    navigation.goBack()
  }

  function sendMail() {

    /*openComposer({
      to: 'andre.nunes020770@gmail.com',
      subject: 'Wanna change the world?',
      body: 'This is our year!',
    })*/

  /*  EmailSender.send(
      {
        from: 'andre.nunes@gmail.com',
        to: 'andre.nunes020770@gmail.com',
        subject: 'The subject',
        body: '<h3> Cool Body </h3>'
      },
      attachments, // This second parameter is mandatory. You can send an empty array.
    );
*/
  }

  function sendWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=${incident.sendWhatsApp}&text=${message}`)
  }

  return (
    <View style={styles.container} >
      <View style={styles.header}>
        <Image source={logoimg} />

        <TouchableOpacity onPress={ navigateBack }>
          <Feather name="arrow-left" size={28} color="#E02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={ [styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
        <Text style={ styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

        <Text style={ styles.incidentProperty}>CASO:</Text>
        <Text style={ styles.incidentValue}>{incident.title}</Text>

        <Text style={ styles.incidentProperty}>DESCRICÃO:</Text>
        <Text style={ styles.incidentValue}>{incident.description}</Text>

        <Text style={ styles.incidentProperty}>VALOR:</Text>
        <Text style={ styles.incidentValue}>{Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(incident.value)}
        </Text>
      </View>

      <View style={ styles.contacBox }>
        <Text style={ styles.heroTitle}>Salve o dia!</Text>
        <Text style={ styles.heroTitle}>Seja o herói desse dia.</Text>

        <Text style={ styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>

          <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>

        </View>
      </View>

    </View>
  );
}