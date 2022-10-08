import React from "react";
import { StyleSheet, Text } from "react-native";
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import colors from '../styles/colors';

interface EnviromentButtonProps extends RectButtonProps {
    title: string;
    active?: boolean;
}