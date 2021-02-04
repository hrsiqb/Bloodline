
import React, { useState, useEffect } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View,
    ActivityIndicator,
    Text,
    TextInput,
    Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { LoginDialog, RegisterDialog } from '../Components/Dialog'
import ms from '../styles'
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

const Login = ({ navigation }) => {
    const [loginDialogVisibility, setLoginDialogVisibility] = useState(false)
    const [registerDialogVisibility, setRegisterDialogVisibility] = useState(false)

    const closeDialog = () => {
        setLoginDialogVisibility(false)
        setRegisterDialogVisibility(false)
    }
    const isSignedIn = () => {
        auth().onAuthStateChanged(
            user => {
                if (user) navigation.navigate('Dashboard')
            }
        )
    }

    useEffect(() => {
        isSignedIn()
    }, [])
    return (
        <>
            <LoginDialog visible={loginDialogVisibility} closeDialog={closeDialog} />
            <RegisterDialog visible={registerDialogVisibility} closeDialog={closeDialog} />
            <View style={[ms.fl_1, ms.ai_c]}>
                <Image style={[ms.w_100, ms.fl_1, ms.rsm_con]} source={require("../Images/Donation.jpg")} />
                <View style={[ms.fl_2, ms.bc_mrn, ms.w_100]}>
                    <Text style={[ms.fc_w, ms.fw_b, ms.fs_30, ms.ff_s, s.p2, s.mt4, s.mb5, ms.ta_c]}>WELCOME TO OUR BLOOD BANK</Text>
                    <TouchableOpacity style={[s.m3, s.p3, ms.bc_red, ms.bRad_10, ms.w_70, ms.as_c]}
                        onPress={() => setLoginDialogVisibility(true)} >
                        <Text style={[ms.fc_w, ms.fs_17, ms.ta_c, ms.fw_b, ms.fs_25]}>Login</Text>
                    </TouchableOpacity>
                    <View style={[ms.fd_r, ms.w_100, ms.jc_c, s.mt4, s.mb4]}>
                        <View style={[ms.bbw_2, ms.bd_c_w, ms.w_35, ms.h_13p]}></View>
                        <Text style={[ms.fc_w, ms.fw_b, ms.fs_20, s.mr2, s.ml2]}>OR</Text>
                        <View style={[ms.bbw_2, ms.bd_c_w, ms.w_35, ms.h_13p]}></View>
                    </View>
                    <TouchableOpacity style={[s.m3, s.p3, ms.bc_red, ms.bRad_10, ms.w_70, ms.as_c]}
                        onPress={() => setRegisterDialogVisibility(true)} >
                        <Text style={[ms.fc_w, ms.fs_17, ms.ta_c, ms.fw_b, ms.fs_25]}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
        // {/* <View style={[ms.bc_blu, ms.fl_1]}>
        //     <Image source={require("../Images/Donation.jpg")} style={[ms.w_100, ms.rsm_con]} />
        // </View> */}
        // {/* <View style={[ms.fl_3, ms.bc_grn]}>
        //     <TouchableOpacity style={[ms.fd_r, ms.ai_c, ms.bd_c_gry, s.p1, ms.w_300p, ms.h_70p, ms.bc_grn]}
        //         onPress={() => props.navigation.navigate('Service Provider', { type: 'Electricity' })}> */}
        //         {/* <Image style={[ms.w_60p, ms.h_60p, ms.rsm_con]} source={require("../Images/electricity-logo.png")} /> */}
        //         {/* <View style={[ms.h_70p, ms.bd_c_gry, ms.bbw_1, ms.fl_1, ms.jc_c, s.p3]}>
        //             <Text style={[ms.fs_18, ms.fc_blk, ms.fw_b, ms.flw_w]}>Electricity</Text>
        //         </View>
        //     </TouchableOpacity>
        // </View> */}
        // {/* <Text style={[ms.fs_20, ms.fc_blu, ms.fw_b, s.p3]}>
        //     Select Your Bill Type</Text>
        // <ScrollView contentContainerStyle={[ms.w_100s]}>
        //     <TouchableOpacity style={[ms.fd_r, ms.ai_c, ms.bd_c_gry, s.p1, ms.w_300p, ms.h_70p]}
        //         onPress={() => props.navigation.navigate('Service Provider', { type: 'Electricity' })}>
        //         <Image style={[ms.w_60p, ms.h_60p, ms.rsm_con]} source={require("../Images/electricity-logo.png")} />
        //         <View style={[ms.h_70p, ms.bd_c_gry, ms.bbw_1, ms.fl_1, ms.jc_c, s.p3]}>
        //             <Text style={[ms.fs_18, ms.fc_blk, ms.fw_b, ms.flw_w]}>Electricity</Text>
        //         </View>
        //     </TouchableOpacity>
        //     <TouchableOpacity style={[ms.fd_r, ms.ai_c, ms.bd_c_gry, s.p1, ms.w_300p, ms.h_70p]}
        //         onPress={() => props.navigation.navigate('Service Provider', { type: 'Gas' })}>
        //         <Image style={[ms.w_60p, ms.h_60p, ms.rsm_con]} source={require("../Images/gas-logo.png")} />
        //         <View style={[ms.h_70p, ms.bd_c_gry, ms.bbw_1, ms.fl_1, ms.jc_c, s.p3]}>
        //             <Text style={[ms.fs_18, ms.fc_blk, ms.fw_b, ms.flw_w]}>Sui Gas</Text>
        //         </View>
        //     </TouchableOpacity>
        //     <TouchableOpacity style={[ms.fd_r, ms.ai_c, ms.bd_c_gry, s.p1, ms.w_300p, ms.h_70p]}
        //         onPress={() => props.navigation.navigate('Service Provider', { type: 'Internet' })}>
        //         <Image style={[ms.w_60p, ms.h_60p, ms.rsm_con]} source={require("../Images/internet-logo.png")} />
        //         <View style={[ms.h_70p, ms.bd_c_gry, ms.bbw_1, ms.fl_1, ms.jc_c, s.p3]}>
        //             <Text style={[ms.fs_18, ms.fc_blk, ms.fw_b, ms.flw_w]}>Internet</Text>
        //         </View>
        //     </TouchableOpacity>
        // </ScrollView> */}
        // </View >
    );
};

export default Login;
