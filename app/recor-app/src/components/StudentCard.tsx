import React from 'react';
import { 
    StyleSheet,
    Text
} from 'react-native'

import { RectButton, RectButtonProps} from 'react-native-gesture-handler';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { Ionicons   } from '@expo/vector-icons'

interface StudentProps extends RectButtonProps {
    data: {
        name: string;
    }
}

export const StudentCard = ({ data, ...rest} : StudentProps) => {
    return (
        <RectButton 
            style={styles.container}
            {...rest}
        >
            <Ionicons 
                name="person"
                size={44}
                color={colors.heading}
            />
            <Text style={styles.title}>
                {data.name}
            </Text>

        </RectButton>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.shape,
        marginVertical: 5
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontFamily: fonts.heading,
        fontSize: 18,
        color: colors.heading
    }
})