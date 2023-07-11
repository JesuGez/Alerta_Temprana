import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Formulario from './componentes/Formulario';
import Form_Login from './componentes/Login';


export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };
  return (
    <View style={styles.container}>
      {loggedIn ? (
        <Formulario onLogout={handleLogout} />
      ) : (
        <Form_Login onLogin={handleLogin} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50
  }
})

