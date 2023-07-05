import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, FlatList } from 'react-native';
import Mapa from './Mapa';
import { SelectList } from 'react-native-dropdown-select-list'
import { RadioButtons } from 'react-native-radio-buttonx';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Formulario = () => {

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required('El nombre es obligatorio'),
        celular: Yup.string().required('El número de celular es obligatorio'),
        correo: Yup.string().email('El correo debe ser un email valido'),
        direccion: Yup.string().required('La dirección es obligatoria'),
        novedad: Yup.string().required('Debe seleccionar la novedad'),
    });

    const [nombre, setNombre] = useState('');
    const [celular, setCelular] = useState('');
    const [correo, setCorreo] = useState('');
    const [novedad, setNovedad] = useState('');
    const [direccion, setDireccion] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const data = [
        { key: '1', value: 'Amenaza Sismica' },
        { key: '2', value: 'Inundación' },
        { key: '3', value: 'Remosión en masa' },
        { key: '4', value: 'Volcanes' },
        { key: '5', value: 'Incendios' },
        { key: '6', value: 'Riesgo Quimico' },
        { key: '7', value: 'Riesgo Electrico' },
        { key: '8', value: 'Riesgo Mecanico' },
        { key: '9', value: 'Accidente de transporte' },
        { key: '10', value: 'Colapso' },
        { key: '11', value: 'Explosión' },
        { key: '12', value: 'Fuga' },
        { key: '13', value: 'Derrame' },
        { key: '0', value: 'Sin riesgo' },
    ]

    const handleSelect = (option) => {
        setSelectedOption(option);
    };

    const clasificar = (novedad) => {
        if (novedad !== 'Sin riesgo') {
        } else {
        }
    }

    const getCustomStyle = (option) => {
        const customStyleOptions = {
            ...styleOptions,
            selectedColor: option === 'Nivel 1' ? 'yellow' : (option === 'Nivel 2' ? 'orange' : (option === 'Nivel 3' ? 'red' : styleOptions.selectedColor)),
        };
        return customStyleOptions;
    };

    const styleOptions = {
        rounded: true,
        radio: 20,
        display: 'row',
        color: 'black',
    };

    const handleSubmit = async (values) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("http://localhost:8000/", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
      };
    return (
        <Formik
            initialValues={{ nombre: '', celular: '', correo: '', direccion: '', novedad: '', nivel: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.container}>
                    <Image
                        style={{ width: '50%', height: '20%', marginLeft: '22%' }}
                        source={require('../assets/logo_oagrd.png')}>
                    </Image>
                    <View style={{ marginTop: 8 }}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre"
                            onChangeText={handleChange('nombre')}
                            onBlur={handleBlur('nombre')}
                            value={values.nombre}
                        />
                        {touched.nombre && errors.nombre && <Text>{errors.nombre}</Text>}
                        <TextInput
                            style={styles.input}
                            placeholder="Celular"
                            onChangeText={handleChange('celular')}
                            onBlur={handleBlur('celular')}
                            value={values.celular}
                            keyboardType="numeric"
                        />
                        {touched.celular && errors.celular && <Text>{errors.celular}</Text>}
                        <TextInput
                            style={styles.input}
                            placeholder="Correo"
                            onChangeText={handleChange('correo')}
                            onBlur={handleBlur('correo')}
                            value={values.correo}
                            keyboardType="email-address"
                        />
                        {touched.correo && errors.correo && <Text>{errors.correo}</Text>}
                        <SelectList
                            setSelected={handleChange('novedad')}
                            data={data}
                            save="key"
                            value={values.novedad}
                            onSelect={clasificar(values.novedad)}
                        />
                        {touched.novedad && errors.novedad && <Text>{errors.novedad}</Text>}
                        <View style={{ marginBottom: 20, marginTop: 20 }}>
                            <RadioButtons
                                gap={19}
                                options={['Nivel 1', 'Nivel 2', 'Nivel 3']}
                                selectedOption={selectedOption}
                                onChangeText={handleChange('nivel')}
                                onSelect={handleSelect}
                                value={values.nivel}
                                styleOptions={getCustomStyle(selectedOption)}
                            />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Dirección"
                            onChangeText={handleChange('direccion')}
                            onBlur={handleBlur('direccion')}
                            value={values.direccion}
                        />
                        {touched.direccion && errors.direccion && <Text>{errors.direccion}</Text>}
                    </View>
                    <Mapa></Mapa>
                    <Button title="Enviar" onPress={handleSubmit} type="submit" />
                </View>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        width: '100%',
        paddingVertical: 50,
        flexGrow: 1,
    },
    input: {
        marginBottom: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    app: {
        flex: 4,
        marginHorizontal: "auto",
        width: 400
    },
    styleOptions: {
        rounded: true,
        radio: 20,
        display: 'row',
        selectedColor: 'brown',
        //fontWeight: 'bold',
        //color: 'brown'
    }
});

export default Formulario;