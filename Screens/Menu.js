
import React, { useState, useEffect } from 'react';
import {
    TouchableOpacity,
    ActivityIndicator,
    View,
    TouchableNativeFeedback,
    Text,
    ScrollView,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendarAlt, faPhoneAlt, faCity, faWeight, faTransgender, faUser } from '@fortawesome/free-solid-svg-icons'
import { Item, Input, Switch, Picker } from 'native-base';
import ms from '../styles'
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import { signOut, getUserInfo, updateUserInfo } from '../Config/firebase';
import Icon from 'react-native-vector-icons/Entypo';
import auth from '@react-native-firebase/auth';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

const Menu = ({ navigation }) => {
    const [userInfo, setUserInfo] = useState({ Donor: false })
    const [loading, setLoading] = useState(true)
    const isSignedIn = () => {
        auth().onAuthStateChanged(
            user => {
                if (user) {
                    new Promise((res, rej) => getUserInfo(res, rej, user.uid))
                        .then(data => {
                            setUserInfo(data)
                            if (data.Donor) {
                                setUserInfo(data)
                            }
                            setLoading(false)
                        })
                        .catch(error => {
                            alert(error.message)
                            setLoading(false)
                            navigation.navigate("Dashboard")
                        })
                }
                else navigation.navigate('Login')
            }
        )
    }
    const handleUserUpdate = () => {
        setLoading(true)
        new Promise((res, rej) => updateUserInfo(res, rej, userInfo))
            .then(() => {
                alert("Updated donation info")
                setLoading(false)
            })
            .catch(() => {
                alert("Error updating donation info")
                setLoading(false)
            })
    }
    useEffect(() => {
        isSignedIn()
    }, [])

    const handleChange = (prop, value) => {
        setUserInfo({ ...userInfo, [prop]: value })

        if (!userInfo.Donor) {
            delete userInfo.Phone
            delete userInfo.Gender
            delete userInfo.Age
            delete userInfo.Weight
            delete userInfo.City
            delete userInfo.Blood
        }
    }

    return (
        <View style={[ms.bc_mrn, ms.fl_1]}>
            {loading &&
                <View style={[ms.pos_ab, ms.w_112, ms.h_116, ms.bc_blk_5, ms.zInd_1, ms.jc_c, ms.ai_c]} >
                    <View style={[ms.bRad_50, ms.jc_c, ms.bc_w]}>
                        <ActivityIndicator color="red" size={60} />
                    </View>
                </View>
            }
            <ScrollView>
                <Text style={[ms.ta_c, ms.fw_b, ms.fs_25, ms.fc_w, ms.bbw_2, ms.bd_c_red, ms.w_100, ms.as_c, s.pb3, s.mt3, s.mb3]}>{userInfo.FullName}</Text>
                <Text style={[ms.ta_c, ms.fw_b, ms.fs_25, ms.fc_w, ms.bbw_2, ms.bd_c_red, ms.w_200p, ms.as_c, s.pb1]}>Donation Info</Text>
                <View style={[ms.fd_r, ms.ai_c, ms.bd_c_red, ms.h_70p, ms.bbw_1, ms.jc_sb, s.p3]}>
                    <Text style={[ms.fs_25, ms.fc_w, s.pb1]}>Donor</Text>
                    <Switch value={userInfo.Donor} trackColor={{ false: "#767577", true: "red" }} thumbColor={"#f4f3f4"} onValueChange={value => handleChange("Donor", value)} />
                </View>
                {userInfo.Donor &&
                    <>
                        <Item style={[s.p3, ms.h_70p, ms.bd_c_red]}>
                            <FontAwesomeIcon icon={faPhoneAlt} size={20} style={[s.mr3, ms.fc_w]} />
                            <Input placeholder='Phone' defaultValue={userInfo.Phone} style={[ms.fs_25, ms.fc_w]}
                                keyboardType='numeric' onChangeText={value => handleChange("Phone", value)} />
                        </Item>
                        <Item style={[s.p3, ms.h_70p, ms.bd_c_red]}>
                            <FontAwesomeIcon icon={faTransgender} size={25} style={[s.mr4, ms.fc_w]} />
                            <Text style={[ms.fs_25, ms.w_45, ms.fc_w]}>Gender</Text>
                            <Picker
                                note
                                mode="dropdown"
                                style={[ms.fc_w, s.ml5, { transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }]}
                                selectedValue={userInfo.Gender}
                                onValueChange={value => handleChange("Gender", value)}
                            >
                                <Picker.Item label="Male" value={"Male"} />
                                <Picker.Item label="Female" value={"Female"} />
                            </Picker>
                        </Item>
                        <Item style={[s.p3, ms.h_70p, ms.bd_c_red]}>
                            <Icon name="drop" size={25} color="#fff" style={ms.mr_18} />
                            <Text style={[ms.fs_25, ms.w_45, ms.fc_w]}>Blood Group</Text>
                            <Picker
                                note
                                mode="dropdown"
                                style={[ms.fc_w, s.ml5, { transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }]}
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
                        <Item style={[s.p3, ms.h_70p, ms.bd_c_red]}>
                            <FontAwesomeIcon icon={faCalendarAlt} size={20} style={[s.mr3, ms.fc_w]} />
                            <Input placeholder='Age' defaultValue={userInfo.Age} keyboardType='numeric' style={[ms.fs_25, ms.fc_w]}
                                onChangeText={value => handleChange("Age", value)} />
                        </Item>
                        <Item style={[s.p3, ms.h_70p, ms.bd_c_red]}>
                            <FontAwesomeIcon icon={faWeight} size={20} style={[s.mr3, ms.fc_w]} />
                            <Input placeholder='Weight' defaultValue={userInfo.Weight} keyboardType='numeric' style={[ms.fs_25, ms.fc_w]}
                                onChangeText={value => handleChange("Weight", value)} />
                            <Text style={[s.mr3, ms.fc_w]}>KG</Text>
                        </Item>
                        <Item style={[s.p3, ms.h_70p, ms.bd_c_red]}>
                            <FontAwesomeIcon icon={faCity} size={20} style={[s.mr3, ms.fc_w]} />
                            <Input placeholder='City' defaultValue={userInfo.City} style={[ms.fs_25, ms.fc_w]}
                                onChangeText={value => handleChange("City", value)} />
                        </Item>
                    </>
                }
                <View style={[ms.bd_c_red, ms.bbw_2]}>
                    <TouchableNativeFeedback onPress={() => handleUserUpdate()}>
                        <View style={[s.m3, s.p3, ms.bc_red, ms.bRad_10, ms.w_85p, ms.as_c]}>
                            <Text style={[ms.fc_w, ms.fs_17, ms.ta_c]}>Save</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <Text style={[ms.ta_c, ms.fw_b, ms.fs_25, ms.fc_w, ms.bbw_2, ms.bd_c_red, ms.w_200p, ms.as_c, s.pb2, s.mb3, s.mt3]}>My Account</Text>
                <TouchableNativeFeedback onPress={() => signOut()}>
                    <View style={[s.m3, s.p3, ms.bc_red, ms.bRad_10, ms.w_100p, ms.as_c]}>
                        <Text style={[ms.fc_w, ms.fs_17, ms.ta_c]}>Sign Out</Text>
                    </View>
                </TouchableNativeFeedback>
            </ScrollView>
        </View>
    );
};

export default Menu;
