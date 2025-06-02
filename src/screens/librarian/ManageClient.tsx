import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, TouchableOpacity, Modal} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ManageClient: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [client, setClient] = useState({
    name: 'João Lima',
    phone: '(83) 96666-6666',
    email: 'lima.joao@gmail.com',
    password: '123456',
    address: 'Rua ali no canto 121',
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Gerenciar Cliente</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.clientItem}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.clientName}>João Lima</Text>
        </TouchableOpacity>
        <Text style={styles.clientInfo}>Telefone: (83) 96666-6666</Text>
        <Text style={styles.clientInfo}>Email: xxxx@gmail.com</Text>
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{client.name}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="red" />
              </TouchableOpacity>
            </View>

            <ScrollView>
              <Text style={styles.label}>Telefone:</Text>
              <TextInput
                style={styles.input}
                value={client.phone}
                onChangeText={(text) =>
                  setClient({ ...client, phone: text })
                }
              />

              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.input}
                value={client.email}
                onChangeText={(text) =>
                  setClient({ ...client, email: text })
                }
              />

              <Text style={styles.label}>Senha:</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={client.password}
                onChangeText={(text) =>
                  setClient({ ...client, password: text })
                }
              />

              <Text style={styles.label}>Endereço:</Text>
              <TextInput
                style={styles.input}
                value={client.address}
                onChangeText={(text) =>
                  setClient({ ...client, address: text })
                }
              />

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ManageClient;

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
    fontSize: 18,
    fontWeight: 'bold',
  },
  clientItem: {
    backgroundColor: '#ddd',
    padding: 12,
    marginTop: 5,
  },
  clientName: {
    color: '#0D4F97',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clientInfo: {
    fontSize: 14,
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
    color: '#0057A0',
  },
  label: {
    marginTop: 10,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    padding: 10,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#1E4E8C',
    marginTop: 20,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
