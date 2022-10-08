import React, { useState, useEffect } from "react";
import { 
    StyleSheet, 
    View,
    Text,
    FlatList
} from "react-native";
import { useRoute } from "@react-navigation/core";
import { Header } from "../components/Header";
import { Load } from '../components/Load'

import colors from "../styles/colors";
import api from "../services/api";
import { StudentCard } from "../components/StudentCard";
import { ClassCard } from "../components/ClassCard";
import fonts from "../styles/fonts";


interface Params {
    disciplina: {
        id: Number;
        name: string;
    }
}

interface StudentsProps {
    id: string,
    name: string
}

export function MyStudents(){
    const route = useRoute();
    const { disciplina } = route.params as Params;

    const [students, setStudents] = useState<StudentsProps[] | undefined>([]);
    const [loading, setLoading]= useState(true);
    

    

    useEffect(() => {
        async function fetchStudents(){
            const { data } = await api.get(`/aluno/aluno-disciplina/${disciplina.id}`);
            setStudents(data);
            setLoading(false)
        }

        fetchStudents()
    })

    if(loading)
        return <Load />


    return(
        <View style={styles.container}>
            <Header
                title="Meus"
                page="Alunos"
            />

            <View style={styles.students}>
                <Text style={styles.titleDisciplina}>
                    {disciplina.name}
                </Text>
 
                {students && (
                <FlatList
                    data={students}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <StudentCard 
                            data={item}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />
                )}
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        backgroundColor: colors.background
    },
    students: {
        flex: 1,
        width: '100%'
    },
    titleDisciplina: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20,
    }

})