import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, FlatList } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Form_Login = () => {

  const server = 'http://192.168.3.11:8000/';

  const validationSchema = Yup.object().shape({
    usuario: Yup.string().required('El usuario es obligatorio'),
    password: Yup.string().required('La contraseña es requerida')
  });

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (values) => {
    
  };
  return (
    <Formik
      initialValues={{ usuario: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <><Image
          style={{ width: '50%', height: '35%', marginTop: 30}}
          source={require('../assets/logo_oagrd.png')}>
        </Image>
          <View style={styles.container}>
            <View >
              <TextInput
                style={styles.input}
                placeholder="Usuario"
                onChangeText={handleChange('usuario')}
                onBlur={handleBlur('usuario')}
                value={values.usuario}
              />
              {touched.usuario && errors.usuario && <Text>{errors.usuario}</Text>}
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                keyboardType="password"
              />
              {touched.password && errors.password && <Text>{errors.password}</Text>}
            </View>
            <Button title="Acceder" onPress={handleSubmit} type="submit" />
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