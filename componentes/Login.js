import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, FlatList } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import server from '../server';

const Form_Login = ({ onLogin }) => {

  const server = 'http://192.168.3.11:8000/';

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('El usuario es obligatorio'),
    password: Yup.string().required('La contraseña es requerida')
  });

  const handleSubmit = async (values) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(values);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(server + "login", requestOptions)
    .then(response => {
      if (response.status === 401) {
        throw new Error('Contraseña incorrecta');
      } else if (response.status === 404) {
        throw new Error('Usuario no encontrado');
      }
      return response.json();
    })
    .then(result => {
      console.log(result);
      onLogin();
    })
    .catch(error => {
      console.log(error.message);
    });
  };
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <><Image
          style={{ width: '50%', height: '35%', marginTop: 30 }}
          source={require('../assets/logo_oagrd.png')}>
        </Image>
          <View style={styles.container}>
            <View >
              <TextInput
                style={styles.input}
                placeholder="Usuario"
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />
              {touched.username && errors.username && <Text>{errors.username}</Text>}
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {touched.password && errors.password && <Text>{errors.password}</Text>}
            </View>
            <Button title="Acceder" onPress={handleSubmit} type="submit"/>
          </View>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -50,
    marginBottom: 100,
    padding: 16,
    justifyContent: 'center',
    width: '100%',
    flexGrow: 1,
  },
  input: {
    marginBottom: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  }
});

export default Form_Login;