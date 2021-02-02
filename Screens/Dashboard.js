
import React, { useState, useEffect } from 'react';
import {
    TouchableOpacity,
    TouchableNativeFeedback,
    View,
    ActivityIndicator,
    Text,
    TextInput,
    Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import ms from '../styles'
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

const Dashboard = props => {
    return (
        <>
            <View style={[ms.fl_1, ms.ai_c, ms.bc_mrn]}>
                <TouchableNativeFeedback onPress={() => alert('hello')}>
                    <View style={[ms.w_65p, ms.h_65p, ms.jc_c, ms.ai_c, ms.bc_red, ms.bRad_50,
                    ms.pos_ab, ms.bot_20, ms.rit_15]}>
                        <FontAwesomeIcon icon={faBars} color={'white'} size={30} />
                    </View>
                </TouchableNativeFeedback>
            </View>
        </>
    );
};

export default Dashboard;
