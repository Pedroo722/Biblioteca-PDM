import React from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-paper';


const RegisterBook: React.FC = () => {
    const handleSave = () => {
        Alert.alert('Sucesso', 'Livro registrado com sucesso!');
    };

    return (
        <>
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.form}>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Título:</Text>
                <TextInput style={styles.input} placeholder="Digite o título:" />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Autor:</Text>
                <TextInput style={styles.input} placeholder="Digite o autor(a):" />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Editora:</Text>
                <TextInput style={styles.input} placeholder="Digite a editora:" />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>ISBN (10):</Text>
                <TextInput
                style={styles.input}
                placeholder="Digite o isbn de 10:"
                keyboardType="numeric"
                maxLength={10}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Ano de Publicação:</Text>
                <TextInput
                style={styles.input}
                placeholder="Digite o ano"
                keyboardType="numeric"
                maxLength={4}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Sinopse:</Text>
                <TextInput
                style={[styles.input, styles.multilineInput]}
                placeholder="Digite a sinopse:"
                multiline
                numberOfLines={4}
                />
            </View>

            <View style={styles.buttonRow}>
                <Button mode="contained" onPress={handleSave} style={styles.button} buttonColor="#0D4F97">
                Salvar
                </Button>
            </View>
            </View>
        </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#95BFC5',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    form: {
        backgroundColor: '#d3d3d3',
        padding: 20,
        borderRadius: 8,
        width: '90%',
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        color: '#000',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 4,
        paddingHorizontal: 10,
        height: 40,
    },
    multilineInput: {
        height: 80,
        textAlignVertical: 'top',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
    },
});

export default RegisterBook;