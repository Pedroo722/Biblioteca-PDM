import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, TextInput, Text, ScrollView,
  TouchableOpacity, Modal, FlatList, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Client } from '../../model/client/ClientEntity';
import { clientService } from '../../model/client/ClientService';

const ManageClient: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState<(Client & { id: string }) | null>(null);
  const [searchEmail, setSearchEmail] = useState('');
  const [clients, setClients] = useState<(Client & { id: string })[]>([]);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = () => {
    const allClients = clientService.findAll();
    setClients(allClients);
  };

  const filteredClients = clients.filter(client =>
    client.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  const handleEdit = (field: keyof Client, value: string) => {
    if (selectedClient) {
      setSelectedClient({ ...selectedClient, [field]: value });
    }
  };

  const handleSaveEdit = () => {
    if (selectedClient) {
      clientService.update(selectedClient.id, selectedClient);
      loadClients();
      setModalVisible(false);
      Alert.alert('Sucesso', 'Cliente atualizado!');
    }
  };

  const handleDelete = () => {
    if (selectedClient) {
      Alert.alert(
        'Confirmar exclusão',
        `Deseja excluir ${selectedClient.name}?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Excluir',
            style: 'destructive',
            onPress: () => {
              clientService.delete(selectedClient.id);
              loadClients();
              setModalVisible(false);
              Alert.alert('Removido', 'Cliente excluído com sucesso.');
            }
          }
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Pesquisar por e-mail"
        style={styles.searchInput}
        value={searchEmail}
        onChangeText={setSearchEmail}
      />

      <FlatList
        data={filteredClients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.clientItem}>
            <TouchableOpacity
              onPress={() => {
                setSelectedClient(item);
                setModalVisible(true);
              }}
            >
              <Text style={styles.clientName}>{item.name}</Text>
              <Text style={styles.clientInfo}>Telefone: {item.phone}</Text>
              <Text style={styles.clientInfo}>Email: {item.email}</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedClient?.name}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="red" />
              </TouchableOpacity>
            </View>

            <ScrollView>
              <Text style={styles.label}>Telefone:</Text>
              <TextInput
                style={styles.input}
                value={selectedClient?.phone}
                onChangeText={(text) => handleEdit('phone', text)}
              />

              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.input}
                value={selectedClient?.email}
                onChangeText={(text) => handleEdit('email', text)}
              />

              <Text style={styles.label}>Senha:</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={selectedClient?.password}
                onChangeText={(text) => handleEdit('password', text)}
              />

              <Text style={styles.label}>Endereço:</Text>
              <TextInput
                style={styles.input}
                value={selectedClient?.address}
                onChangeText={(text) => handleEdit('address', text)}
              />

              <TouchableOpacity style={styles.button} onPress={handleSaveEdit}>
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, { backgroundColor: '#c0392b' }]} onPress={handleDelete}>
                <Text style={styles.buttonText}>Excluir</Text>
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
    paddingHorizontal: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    marginBottom: 8,
  },
  clientItem: {
    backgroundColor: '#ddd',
    padding: 12,
    marginVertical: 5,
    borderRadius: 8,
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
