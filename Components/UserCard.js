
import React from 'react';
import {
    TouchableNativeFeedback,
    View,
    Text,
} from 'react-native';
import ms from '../styles'
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

const UserCard = props => {
    return (
        <TouchableNativeFeedback key={props.userInfo.uId} onPress={() => props.navigation.navigate("User Details", { userInfo: props.userInfo })}>
            <View style={[ms.bc_red, s.mt3, s.p3, s.pt2, ms.bRad_20, ms.w_90, ms.h_110p]}>
                <Text style={[ms.fc_w, ms.fs_25, ms.fw_b, ms.as_c]}>{props.userInfo.FullName}</Text>
                <View style={[ms.fd_r, ms.jc_sa]}>
                    <View>
                        <Text style={[ms.fc_w, ms.fs_20]}>City: {props.userInfo.City}</Text>
                        <Text style={[ms.fc_w, ms.fs_20]}>Blood Group: {props.userInfo.Blood}</Text>
                    </View>
                    <View>
                        <Text style={[ms.fc_w, ms.fs_20]}>Age: {props.userInfo.Age}</Text>
                        <Text style={[ms.fc_w, ms.fs_20]}>Weight: {props.userInfo.Weight}</Text>
                    </View>
                </View>
            </View>
        </TouchableNativeFeedback>
    );
};

export default UserCard;
