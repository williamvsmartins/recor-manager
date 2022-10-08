import React, { useState, useEffect } from "react";
import { 
    StyleSheet, 
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity
} from "react-native";
import { useRoute } from "@react-navigation/core";
import { Header } from "../components/Header";
import { Load } from '../components/Load'

import colors from "../styles/colors";
import api from "../services/api";
import { StudentCard } from "../components/StudentCard";
import DatePicker from 'react-native-date-picker'
import { Entypo } from '@expo/vector-icons'; 



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

export function MyFrequence(){


    
    const route = useRoute();
    const { disciplina } = route.params as Params;

    const [students, setStudents] = useState<StudentsProps[] | undefined>([]);
    const [loading, setLoading]= useState(false);



    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date());
    var dia = String(date.getDate()).padStart(2, "0");
    var mes = String(date.getMonth() + 1).padStart(2, "0");
    var ano = date.getFullYear();
    var dataFormatada = ano + "-" + mes + "-" + dia;
    var dateOrganized = dia + "-" + mes + "-" + ano;
    


    useEffect(() => {

        
        async function fetchStudents(){
           
            await api.get(`/chamada/chamada-data/${dataFormatada}`)
                .then((response) => response.data)
                .then((response) => {
                    var filtrado = response.filter(function(obj) { return obj.id_disciplina == disciplina.id; });//mostra apenas os registro da matéria selecionada
                    setStudents(filtrado);
                    console.log(disciplina)
                  })
            setLoading(false)
        }

        if(date){
            fetchStudents()
        }
       
    }, [date])

    

    if(loading)
        return <Load />


     return(
        <View style={styles.container}>
            <Header
                 title="Minha"
                 page="Frequencia"
            />
            
            <TouchableOpacity
                style={styles.spotlight}
                onPress={() => setOpen(true)}
            >
                <Entypo 
                    name="calendar"
                    size={34} 
                    color={colors.body_dark}
                />

                <Text style={styles.spotlightText}>
                    Escolha a data que {'\n'}
                    deseja consultar
                </Text>

                <DatePicker
                    modal
                    open={open}
                    mode="date"
                    date={date}
                    onConfirm={(date) => {
                        setLoading(true)
                        setOpen(false)
                        setDate(date)
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />
                
                
            </TouchableOpacity>
            
        
            <View style={styles.students}>
                <Text style={styles.titleDisciplina}>
                    Chamada do dia {dateOrganized}
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
    spotlight:{
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        fontSize: 16,
        paddingHorizontal: 20,
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