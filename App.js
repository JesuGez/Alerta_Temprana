import { StyleSheet, Text, View } from 'react-native';
import Formulario from './componentes/Formulario';


export default function App() {
  return (
    <><View style={styles.container}>
      <Formulario></Formulario>
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

