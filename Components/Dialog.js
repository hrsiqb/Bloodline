
import React, { useState } from 'react';
import {
    TouchableOpacity,
    TouchableNativeFeedback,
    StyleSheet,
    View,
    ScrollView,
    Text,
    TextInput,
    Image,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimes, faCalendarAlt, faPhoneAlt, faCity, faWeight, faTransgender, faUser, faKey, faEye } from '@fortawesome/free-solid-svg-icons'
import Dialog from "react-native-dialog";
import { Container, Header, Content, Item, Input, Switch, Picker, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import { registerUser, loginUser } from '../Config/firebase'
import ms from '../styles'
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;


const LoginDialog = props => {
    const [userInfo, setUserInfo] = useState({
        Email: 'haris@gmail.com',
        passwordVisibility: true
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (type, value) => setUserInfo({ ...userInfo, [type]: value })

    const validateLogin = () => {
        if (userInfo.Email && userInfo.Password) handleLogin(userInfo)
        else alert('Please fill in all the fields')
    }

    const handleLogin = data => {
        setLoading(true)
        new Promise((resolve, reject) => loginUser(resolve, reject, data))
            .then(() => {
                alert("You are Signed In!")
                props.closeDialog()
                setLoading(false)
            })
            .catch(error => {
                alert(error)
                setLoading(false)
            })
    }
    return (
        <Dialog.Container visible={props.visible}>
            {loading &&
                <View style={[ms.pos_ab, ms.w_112, ms.h_116, ms.bc_blk_5, ms.zInd_1, ms.jc_c, ms.ai_c]} >
                    <View style={[ms.bRad_50, ms.jc_c, ms.bc_w]}>
                        <ActivityIndicator color="red" size={60} />
                    </View>
                </View>
            }
            <TouchableNativeFeedback onPress={props.closeDialog}>
                <View style={[ms.pos_ab, ms.rit_0, ms.top_0, ms.jc_c, ms.ai_c, ms.w_40p, ms.h_40p, ms.jc_c, ms.ai_c]}>
                    <FontAwesomeIcon icon={faTimes} size={15} />
                </View>
            </TouchableNativeFeedback>
            <Dialog.Title style={[ms.ta_c, ms.fw_b, ms.fs_25]}>Login</Dialog.Title>
            <View style={[ms.bbw_1, ms.bd_c_gry]}></View>
            <Item>
                <Icon name="mail" size={17} color="#000" style={s.mr3} />
                <Input placeholder='Email' defaultValue={userInfo.Email} keyboardType='email-address' onChangeText={value => handleChange("Email", value)} />
            </Item>
            <Item>
                <FontAwesomeIcon icon={faKey} size={15} style={[s.mr3]} />
                <Input placeholder='Password' secureTextEntry={userInfo.passwordVisibility}
                    onChangeText={value => handleChange("Password", value)} />
                <TouchableNativeFeedback onPress={() => setUserInfo({ ...userInfo, passwordVisibility: !userInfo.passwordVisibility })}>
                    <View style={[ms.w_40p, ms.h_40p, ms.jc_c, ms.ai_c, s.mr2]}>
                        <FontAwesomeIcon icon={faEye} size={18} />
                    </View>
                </TouchableNativeFeedback>
            </Item>
            <View style={[ms.fd_r, ms.jc_sa, s.mt3]}>
                <Dialog.Button label="Login" style={[ms.bc_grn, ms.bRad_50, ms.fc_w, ms.bRad_5, ms.w_100p]} onPress={validateLogin} />
            </View>
        </Dialog.Container >
    )
}


const RegisterDialog = props => {
    const [userInfo, setUserInfo] = useState({
        FullName: "Haris Iqbal",
        Email: 'haris@gmail.com',
        Phone: '03105660525',
        Age: "26",
        Weight: "72",
        City: "Rawalpindi",
        Donor: true,
        Gender: "male",
        Blood: "A+"
    })

    const [passwords, setPasswords] = useState({ visibility: true })
    const [loading, setLoading] = useState(false)

    const handleChange = (type, value) => setUserInfo({ ...userInfo, [type]: value })

    const handleSignup = () => {
        if (userInfo.FullName && userInfo.Email && passwords.password && passwords.cPassword) {
            if (userInfo.Donor) {
                if (userInfo.Phone && userInfo.Age && userInfo.Weight && userInfo.City) handleRegister({ userInfo, password: passwords.password })
                else alert('Please fill in all the fields')
            }
            else {
                if (passwords.cPassword === passwords.password) handleRegister({ userInfo, password: passwords.password })
                else alert('Passwords must match')
            }
        }
        else alert('Please fill in all the fields')
    }

    const handleRegister = data => {
        setLoading(true)
        new Promise((resolve, reject) => registerUser(resolve, reject, data))
            .then(() => {
                alert("You are Signed In!")
                props.closeDialog()
                setLoading(false)
            })
            .catch(error => {
                alert(error)
                setLoading(false)
            })
    }
    return (
        <Dialog.Container visible={props.visible}>
            {loading &&
                <View style={[ms.pos_ab, ms.w_111_5, ms.h_105_5, ms.bc_blk_5, ms.zInd_1, ms.jc_c, ms.ai_c]} >
                    <View style={[ms.bRad_50, ms.jc_c, ms.bc_w]}>
                        <ActivityIndicator color="red" size={60} />
                    </View>
                </View>
            }
            <TouchableNativeFeedback onPress={() => setPasswords({ ...passwords, visibility: !passwords.visibility })}
                onPress={props.closeDialog}>
                <View style={[ms.pos_ab, ms.rit_0, ms.top_0, ms.jc_c, ms.ai_c, ms.w_40p, ms.h_40p, ms.jc_c, ms.ai_c]}>
                    <FontAwesomeIcon icon={faTimes} size={15} />
                </View>
            </TouchableNativeFeedback>
            <Dialog.Title style={[ms.ta_c, ms.fw_b, ms.fs_25]}>Register</Dialog.Title>
            <ScrollView>
                <View style={[ms.bbw_1, ms.bd_c_gry]}></View>
                <View style={[ms.fd_r, ms.jc_c, s.m3]}>
                    <Text style={[s.ml2, ms.fw_b, ms.fs_18]}>Acceptor</Text>
                    <Switch value={userInfo.Donor} onValueChange={value => handleChange("Donor", value)} />
                    <Text style={[s.mr2, ms.fw_b, ms.fs_18]}>Donor</Text>
                </View>
                <View style={[ms.bbw_1, ms.bd_c_gry, s.ml5, s.mr5]}></View>
                <Item>
                    <FontAwesomeIcon icon={faUser} size={15} style={[s.mr3]} />
                    <Input placeholder='Full Name' defaultValue={userInfo.FullName} onChangeText={value => handleChange("FullName", value)} />
                </Item>
                <Item>
                    <Icon name="mail" size={17} color="#000" style={s.mr3} />
                    <Input placeholder='Email' defaultValue={userInfo.Email} keyboardType='email-address' onChangeText={value => handleChange("Email", value)} />
                </Item>
                {userInfo.Donor &&
                    <>
                        <Item>
                            <FontAwesomeIcon icon={faPhoneAlt} size={15} style={[s.mr3]} />
                            <Input placeholder='Phone' defaultValue={userInfo.Phone} keyboardType='numeric' onChangeText={value => handleChange("Phone", value)} />
                        </Item>
                        <Item>
                            <FontAwesomeIcon icon={faTransgender} size={17} style={[s.mr4]} />
                            <Text style={[ms.fs_17, ms.w_45]}>Gender</Text>
                            <Picker
                                note
                                mode="dropdown"
                                style={[ms.fc_blk]}
                                selectedValue={userInfo.Gender}
                                onValueChange={value => handleChange("Gender", value)}
                            >
                                <Picker.Item label="Male" value={"Male"} />
                                <Picker.Item label="Female" value={"Female"} />
                            </Picker>
                        </Item>
                        <Item>
                            <Icon name="drop" size={20} color="#900" style={ms.mr_18} />
                            <Text style={[ms.fs_17, ms.w_45]}>Blood Group</Text>
                            <Picker
                                note
                                mode="dropdown"
                                style={[ms.fc_blk, ms.w_120p]}
                                selectedValue={userInfo.Blood}
                                onValueChange={value => handleChange("Blood", value)}
                            >
                                <Picker.Item label="A+" value="A+" />
                                <Picker.Item label="A-" value="A-" />
                                <Picker.Item label="B+" value="B+" />
                                <Picker.Item label="B-" value="B-" />
                                <Picker.Item label="AB+" value="AB+" />
                                <Picker.Item label="AB-" value="AB-" />
                                <Picker.Item label="O+" value="O+" />
                                <Picker.Item label="O-" value="O-" />
                            </Picker>
                        </Item>
                        <Item>
                            <FontAwesomeIcon icon={faCalendarAlt} size={15} style={[s.mr3]} />
                            <Input placeholder='Age' defaultValue={userInfo.Age} keyboardType='numeric' onChangeText={value => handleChange("Age", value)} />
                        </Item>
                        <Item>
                            <FontAwesomeIcon icon={faWeight} size={15} style={[s.mr3]} />
                            <Input placeholder='Weight' defaultValue={userInfo.Weight} keyboardType='numeric' onChangeText={value => handleChange("Weight", value)} />
                            <Text style={[s.mr3]}>KG</Text>
                        </Item>
                        <Item>
                            <FontAwesomeIcon icon={faCity} size={15} style={[s.mr3]} />
                            <Input placeholder='City' defaultValue={userInfo.City} onChangeText={value => handleChange("City", value)} />
                        </Item>
                    </>
                }
                <Item>
                    <FontAwesomeIcon icon={faKey} size={15} style={[s.mr3]} />
                    <Input placeholder='Password' secureTextEntry={passwords.visibility}
                        onChangeText={value => setPasswords({ ...passwords, password: value })} />
                    <TouchableNativeFeedback onPress={() => setPasswords({ ...passwords, visibility: !passwords.visibility })}>
                        <View style={[ms.w_40p, ms.h_40p, ms.jc_c, ms.ai_c, s.mr2]}>
                            <FontAwesomeIcon icon={faEye} size={18} />
                        </View>
                    </TouchableNativeFeedback>
                </Item>
                <Item>
                    <FontAwesomeIcon icon={faKey} size={15} style={[s.mr3]} />
                    <Input placeholder='Confirm Password' secureTextEntry={passwords.visibility}
                        onChangeText={value => setPasswords({ ...passwords, cPassword: value })} />
                    <TouchableNativeFeedback onPress={() => setPasswords({ ...passwords, visibility: !passwords.visibility })}>
                        <View style={[ms.w_40p, ms.h_40p, ms.jc_c, ms.ai_c, s.mr2]}>
                            <FontAwesomeIcon icon={faEye} size={18} />
                        </View>
                    </TouchableNativeFeedback>
                </Item>
                <View style={[ms.fd_r, ms.jc_sa, s.mt3]}>
                    <Dialog.Button label="Sign Up" style={[ms.bc_grn, ms.bRad_50, ms.fc_w, ms.bRad_5, ms.w_100p]} onPress={handleSignup} />
                </View>
            </ScrollView>
        </Dialog.Container >
    )
}

export { LoginDialog, RegisterDialog }