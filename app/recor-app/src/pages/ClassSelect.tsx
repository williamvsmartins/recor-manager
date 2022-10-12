import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { ClassCard } from "../components/ClassCard";
import { Header } from "../components/Header";
import { Load } from '../components/Load'

import { useNavigation } from "@react-navigation/core";
import { FlatList } from "react-native-gesture-handler";
import api from "../services/api";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

import { useAuth } from '../hooks/useAuth';


interface ClassProps {
    id: string,
    name: string
}

export function ClassSelect() {
    const { user } = useAuth();

    const [classes, setClasses] = useState<ClassProps[]>([]); //dados da rota "matérias" da api
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    function handleClassSelect(disciplina: ClassProps){
        navigation.navigate('MyClass', { disciplina });
    }
 
    useEffect(() => {
        async function fetchClasses(){
            const { data } = await api.get('disciplina');
            setClasses(data);
            setLoading(false)
        }

        fetchClasses()
    })



    if(loading)
        return <Load />

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header 
                    title="Olá,"
                    name={user?.name}
                />

                <Text style={styles.title}>
                    De qual turma 
                </Text>
                <Text style={styles.subtitle}>
                    você quer consultar a frequência?
                </Text>
            </View>

            <View style={styles.classes}> 
                <FlatList
                    data={classes}
                    keyExtractor={( item ) => String(item.id)}
                    renderItem={({ item }) => (
                        <ClassCard
                            data={item}
                            onPress={() => handleClassSelect(item)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}

                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    header: {
        paddingHorizontal: 30
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },
    classes: {
        flex: 1,
        marginTop: 30,
        paddingHorizontal: 32,
        justifyContent: 'center'
    }
})

