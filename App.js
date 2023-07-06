import { StyleSheet, Text, View } from 'react-native';
import Formulario from './componentes/Formulario';
import Form_Login from './componentes/Login';


export default function App() {
  return (
    <><View style={styles.container}>
      <Form_Login></Form_Login>
    </View>
    </>
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

