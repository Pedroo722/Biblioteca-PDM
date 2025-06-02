import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header: React.FC<{ title: string }> = ({ title }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity>
            <Ionicons name="menu" size={28} color="black" />
            </TouchableOpacity>
            <View style={styles.headerSpacer} />
            <Text style={styles.headerTitle}>{title}</Text>
            <View style={styles.headerSpacer} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#4dd0ff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 12,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        flex: 1,
    },
    headerSpacer: {
        width: 24,
    },
});

export default Header;