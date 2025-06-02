import React, { useState } from 'react';
import { View, StyleSheet, Text, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ManageLoan: React.FC = () => {
    const [bookModalVisible, setBookModalVisible] = useState(false);
    const [clientModalVisible, setClientModalVisible] = useState(false);

    const bookDetails = {
        title: 'Quarta asa',
        author: 'C. S. Lewis',
        status: 'Disponível',
        publisher: 'HarperCollins',
        isbn: '857827069X',
        year: '2005',
        synopsis: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    };

    const clientDetails = {
        name: 'João Lima',
        phone: '(83) 96666-6666',
        email: 'lima.joao@gmail.com',
        password: '123456',
        address: 'Rua ali no canto 121',
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="menu" size={24} color="#000" />
                <Text style={styles.headerText}>Emprestimo</Text>
                <Ionicons name="search" size={24} color="#000" />
            </View>

            <View style={styles.loanBox}>
                <TouchableOpacity onPress={() => setBookModalVisible(true)}>
                    <Text style={styles.clickableTitle}>{bookDetails.title}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setClientModalVisible(true)}>
                    <Text style={styles.clickableTitle}>{clientDetails.name}</Text>
                </TouchableOpacity>

                <Text style={styles.labelRed}>Multa: 0,75</Text>
                <Text>Status: Emprestado</Text>
                <Text>Data Esperada de devolução: 25/02/2005</Text>
                <Text>Data de Emprestimo: 25/02/2005</Text>

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.buttonBlue}>
                        <Text style={styles.buttonText}>Finalizar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonRed}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal visible={bookModalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.modalTitle, styles.centerText]}>{bookDetails.title}</Text>
                            </View>
                            <TouchableOpacity onPress={() => setBookModalVisible(false)}>
                                <Ionicons name="close" size={24} color="red" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.centerText}>Autor(a): {bookDetails.author}</Text>
                        <View style={styles.row}>
                            <Text>Status: {bookDetails.status}</Text>
                            <Text>Editora: {bookDetails.publisher}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>ISBN: {bookDetails.isbn}</Text>
                            <Text>Ano de publicação: {bookDetails.year}</Text>
                        </View>

                        <Text style={styles.synopsisLabel}>Sinopse:</Text>
                        <Text>{bookDetails.synopsis}</Text>
                    </View>
                </View>
            </Modal>

            <Modal visible={clientModalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.modalTitle, styles.centerText]}>{clientDetails.name}</Text>
                            </View>
                            <TouchableOpacity onPress={() => setClientModalVisible(false)}>
                                <Ionicons name="close" size={24} color="red" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.centerText}>Telefone: {clientDetails.phone}</Text>
                        <Text style={styles.centerText}>Email: {clientDetails.email}</Text>
                        <Text style={styles.centerText}>Senha: {clientDetails.password}</Text>
                        <Text style={styles.centerText}>Endereço: {clientDetails.address}</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ManageLoan;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9AC0C5',
    },
    header: {
        backgroundColor: '#00CFFF',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    loanBox: {
        backgroundColor: '#D9D9D9',
        padding: 16,
        margin: 10,
        borderRadius: 8,
    },
    clickableTitle: {
        color: '#0D4F97',
        fontSize: 16,
        fontWeight: 'bold',
    },
    labelRed: {
        color: 'red',
        fontWeight: 'bold',
    },
    buttonRow: {
        flexDirection: 'row',
        marginTop: 16,
        justifyContent: 'space-around',
    },
    buttonBlue: {
        backgroundColor: '#1E4E8C',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    buttonRed: {
        backgroundColor: '#C62828',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#00000080',
        padding: 20,
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0D4F97',
    },
    centerText: {
        textAlign: 'center',
        marginVertical: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2,
    },
    synopsisLabel: {
        marginTop: 10,
        fontWeight: 'bold',
    },
});
