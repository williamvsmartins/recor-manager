import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import { RectButton, RectButtonProps} from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { useRoute } from "@react-navigation/core";
import { useNavigation } from "@react-navigation/core";


import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 

import api from "../services/api";
import colors from "../styles/colors";
import fonts from "../styles/fonts";


interface Params {
    disciplina: {
        id: string;
        name: string;
    }
}



export function MyClass(){

    const route = useRoute();
    const { disciplina } = route.params as Params;


    const navigation = useNavigation();

    function handleSelectMyStudents(){
        navigation.navigate('MyStudents', { disciplina});
    }

    function handleSelectMyFrequence(){
        navigation.navigate('MyFrequence', { disciplina});
    }



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.class}>
                    {disciplina.name}
                </Text>
                <Text 
                    style={styles.title}
                    >
                    O que você deseja {'\n'}
                    consultar?
                </Text>
            </View>
            <View style={styles.action}>
                <RectButton style={styles.card}
                    onPress={handleSelectMyStudents}
                >
                    <Ionicons 
                        name="person" 
                        size={84} 
                        color={colors.heading}
                    />

                    <Text style={styles.text}>
                        Alunos
                    </Text>
                </RectButton>

                <RectButton style={styles.card}
                    onPress={handleSelectMyFrequence}
                >
                    <FontAwesome5 
                        name="calendar-check"
                        size={84}
                        color={colors.heading}
                    />
                   

                    <Text style={styles.text}>
                        Frequência
                    </Text>
                </RectButton>
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        paddingHorizontal: 30,
        width: '100%',
        paddingVertical: 50,
        marginTop: getStatusBarHeight()
    },
    class: {
        textAlign: 'center',
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 40
    },
    title: {
        fontSize: 24,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 33,
        marginTop: 25
    },
    action: {
        alignItems: 'center',
        paddingHorizontal: 32,
        justifyContent: 'center'
    },
    card:{
        width: 200,
        height: 200,
        backgroundColor: colors.shape,
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    text: {
        fontSize: 16,
        color: colors.heading,
        fontFamily: fonts.heading,
        marginVertical: 16
    }
});