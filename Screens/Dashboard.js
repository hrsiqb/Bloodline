
import React, { useState, useEffect } from 'react';
import {
    TouchableOpacity,
    TouchableNativeFeedback,
    View,
    ScrollView,
    Text,
    ActivityIndicator,
    Image,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import ms from '../styles'
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import UserCard from '../Components/UserCard';
import { getAllDonors, getUserInfo } from '../Config/firebase';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

const Dashboard = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const [usersData, setUsersData] = useState([])

    // Prevent going back
    navigation.addListener('focus', e => navigation.addListener('beforeRemove', e => e.preventDefault()))
    // Enable going back on screen blur
    navigation.addListener('blur', e => navigation.removeListener('beforeRemove'))

    useEffect(() => {
        var datas = []
        var len = 0
        setLoading(true)
        new Promise((res, rej) => getAllDonors(res, rej))
            .then(donors => {
                Object.keys(donors).map((uId, key) => {
                    new Promise((res, rej) => getUserInfo(res, rej, uId))
                        .then(data => {
                            len++
                            datas.push(<UserCard navigation={navigation} key={uId} userInfo={data} />)
                            if (len === 3) {
                                setUsersData(datas)
                                setLoading(false)
                            }
                        })
                        .catch(error => {
                            setLoading(false)
                            alert(error.message)
                        })
                })
            })
            .catch(error => {
                setLoading(false)
                alert(error.message)
            })
    }, [])

    return (
        <View style={[ms.bc_mrn, ms.fl_1]}>
            {loading &&
                <View style={[ms.pos_ab, ms.w_112, ms.h_116, ms.bc_blk_5, ms.zInd_1, ms.jc_c, ms.ai_c]} >
                    <View style={[ms.bRad_50, ms.jc_c, ms.bc_w]}>
                        <ActivityIndicator color="red" size={60} />
                    </View>
                </View>
            }
            <ScrollView contentContainerStyle={[ms.ai_c, ms.bc_mrn]}>{usersData}</ScrollView>
            <TouchableNativeFeedback onPress={() => navigation.navigate("Menu")}>
                <View style={[ms.w_65p, ms.h_65p, ms.jc_c, ms.ai_c, ms.bc_red, ms.bRad_50,
                ms.pos_ab, ms.bot_20, ms.rit_15, ms.bw_2, ms.bd_c_mrn]}>
                    <FontAwesomeIcon icon={faBars} color={'white'} size={30} />
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};

export default Dashboard;
