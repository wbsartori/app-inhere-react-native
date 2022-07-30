import React, { useState } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert
} from 'react-native';

import { Participant } from "../../components/Participant";
import { styles } from "./styles";

export function Home() {
    const [participants, setParticipants] = useState<String[]>([]);
    const [participantName, setParticipantName] = useState('');

    function handleParticipantAdd() {
        if(participants.includes(participantName)){
            return Alert.alert("Aviso","Já existe um participante com este nome!");
        }
        setParticipants(prevState => [...prevState, participantName]);
        setParticipantName('');
    }

    function handleParticipantRemove(name: string) {
        return Alert.alert(`AVISO!`, `Tem certeza que deseja remover o participante ${name} ?`, [
            {
                text: 'Sim',
                onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
            },
                {
                    text: 'Não',
                    style: 'cancel'
                }
            ]);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>Nome do evento</Text>
            <Text style={styles.eventDate}>Sábado 30 de julho de 2022</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do participante"
                    placeholderTextColor="#6B6B6B"
                    onChangeText={setParticipantName}
                    value={participantName}
                />
                <TouchableOpacity style={styles.button}
                    onPress={handleParticipantAdd}
                >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={participants}
                keyExtractor={item => item }
                renderItem={({item}) => (
                    <Participant
                        key={item}
                        name={item}
                        onRemove={() => handleParticipantRemove(item)}
                    />
                )}

                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Nenhum participante adicionado a lista!
                    </Text>
                )}
            />
        </View>
    );
}