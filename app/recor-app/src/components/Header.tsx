import React from "react";
import {
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import { User } from '../libs/storage';


import userImg from '../assets/william.jpg'
import colors from "../styles/colors";
import fonts from "../styles/fonts";


interface HeaderProps{
    title: string,
    name?: string | null | undefined,
    page?: string
}




export function Header({title, name, page, ...rest} : HeaderProps){

    

    return (
        <View 
            style={styles.container}
            {...rest}
            >
            <View>
                <Text style={styles.greeting}>{title}</Text>
                <Text style={styles.userName}>
                    {name || page}
                </Text>
            </View>

            <Image style={styles.image} source={userImg} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight()
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 40
    }
})