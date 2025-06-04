import React from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-paper';


const RegisterClient: React.FC = () => {
    const handleSave = () => {
        Alert.alert('Sucesso', 'Cliente registrado com sucesso!');
    };

    return (
        <>


        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nome:</Text>
                    <TextInput style={styles.input} placeholder="Digite seu nome:" />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Telefone:</Text>
                    <TextInput style={styles.input} placeholder="Digite seu telefone:" keyboardType="phone-pad" />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput style={styles.input} placeholder="Digite seu email:" keyboardType="email-address" />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Senha:</Text>
                    <TextInput style={styles.input} placeholder="Digite sua senha:" secureTextEntry />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Endereço:</Text>
                    <TextInput
                        style={[styles.input, styles.multilineInput]}
                        placeholder="Digite seu endereço:"
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
        color: '#0D4F97',
    },
});

export default RegisterClient;