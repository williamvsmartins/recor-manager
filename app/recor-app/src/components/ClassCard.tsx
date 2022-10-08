import React from 'react';
import { 
    StyleSheet,
    Text
} from 'react-native'

import { RectButton, RectButtonProps} from 'react-native-gesture-handler';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { AntDesign   } from '@expo/vector-icons';

interface ClassProps extends RectButtonProps {
    data: {
        name: string;
    }
}

export const ClassCard = ({ data, ...rest} : ClassProps) => {
    return (
        <RectButton 
            style={styles.container}
            {...rest}
        >
            <AntDesign 
                name="book"
                size={64}
                color={colors.heading}
            />

            <Text style={styles.text}>
                { data.name }
            </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: '45%',
        backgroundColor: colors.shape,
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        margin: 10
    },
    text: {
        color: colors.heading,
        fontFamily: fonts.heading,
        marginVertical: 16 
    }
})