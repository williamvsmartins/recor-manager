import React, { useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    Alert
} from 'react-native'
import { useNavigation } from "@react-navigation/core";

import { Button } from '../components/Button'

import { useAuth } from '../hooks/useAuth';
import { Data } from '../contexts/AuthContext/types';

import colors from "../styles/colors";
import fonts from "../styles/fonts";




export function UserIdentification(){

    const { isAuth, isLoading } = useAuth();

    const navigator = useNavigation();

    const { handleAuth } = useAuth();

    const [name, setName] = useState(String)
    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)


    function handleInputBlur(){
        setIsFocused(false)
        setIsFilled(!!name)
    }

    function handleInputFocus(){
        setIsFocused(true)
    }

    function handleInputChange(value: string){
        setIsFilled(!!value) //verifica se é inverso de falso
        setName(value)
    }

    

    async function handleSubmit() {
        if (!name)
          return Alert.alert("Me diz ai como se chama!");
    
        try {
          await handleAuth({
            name
          });
        
          navigator.navigate('Confirmation')

        } catch(error) {
           console.log(error)
           Alert.alert('Não foi possível salvar o seu nome!');
        }
      }
  


    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    { isFilled ? '😄' : '😀' }
                                </Text>
                                <Text style={styles.title}>
                                    Como podemos {'\n'}
                                    chamar você?
                                </Text>
                            </View>

                            <TextInput 
                                style={[
                                    styles.input,
                                    (isFocused || isFilled) && 
                                    {borderColor: colors.purple}
                                ]}
                                placeholder="Digite um nome"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={(value) => handleInputChange(value)}
                            />
                            <View style={styles.footer}>
                                <Button 
                                    title="Confirmar"
                                    disabled={!name}
                                    onPress={handleSubmit}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        width: '100%'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
    },
    header: {
        alignItems: 'center'
    },
    emoji: {
        fontSize: 44
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,  
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    footer: {
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20
    }
})