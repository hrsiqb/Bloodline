
import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    View,
    TouchableNativeFeedback,
    Text,
    ScrollView,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendarAlt, faPhoneAlt, faCity, faWeight, faTransgender } from '@fortawesome/free-solid-svg-icons'
import { Item, Input, Switch, Picker } from 'native-base';
import ms from '../styles'
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import { signOut, getUserInfo, updateUserInfo } from '../Config/firebase';
import Icon from 'react-native-vector-icons/Entypo';
import auth from '@react-native-firebase/auth';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

const UserDetails = ({ navigation, route }) => {
    return (
        <View style={[ms.bc_mrn, ms.fl_1]}>
            <Item style={[s.p3, ms.h_70p, ms.bd_c_red]}>
                <Icon name="mail" size={25} color="#fff" style={ms.mr_18} />
                <Text style={[ms.fs_25, ms.fc_w]}>{route.params.userInfo.Email}</Text>
            </Item>
            <Item style={[s.p3, ms.h_70p, ms.bd_c_red]}>
                <FontAwesomeIcon icon={faPhoneAlt} size={20} style={[s.mr4, ms.fc_w]} />
                <Text style={[ms.fs_25, ms.fc_w]}>{route.params.userInfo.Phone}</Text>
            </Item>
            <Item style={[s.p3, ms.h_70p, ms.bd_c_red]}>
                <FontAwesomeIcon icon={faTransgender} size={25} style={[s.mr4, ms.fc_w]} />
                <Text style={[ms.fs_25, ms.fc_w]}>{route.params.userInfo.Gender}</Text>
            </Item>
            <Item style={[s.p3, ms.h_70p, ms.bd_c_red]}>
                <Icon name="drop" size={25} color="#fff" style={ms.mr_18} />
                <Text style={[ms.fs_25, ms.fc_w]}>{route.params.userInfo.Blood}</Text>
            </Item>
            <Item style={[s.p3, ms.h_70p, ms.bd_c_red]}>
                <FontAwesomeIcon icon={faCalendarAlt} size={20} style={[s.mr4, ms.fc_w]} />
                <Text style={[ms.fs_25, ms.fc_w]}>{route.params.userInfo.Age}</Text>
            </Item>
            <Item style={[s.p3, ms.h_70p, ms.bd_c_red]}>
                <FontAwesomeIcon icon={faWeight} size={20} style={[s.mr4, ms.fc_w]} />
                <Text style={[ms.fs_25, ms.fc_w]}>{route.params.userInfo.Weight}</Text>
            </Item>
            <Item style={[s.p3, ms.h_70p, ms.bd_c_red]}>
                <FontAwesomeIcon icon={faCity} size={20} style={[s.mr4, ms.fc_w]} />
                <Text style={[ms.fs_25, ms.fc_w]}>{route.params.userInfo.City}</Text>
            </Item>
        </View>
    );
};

export default UserDetails;
