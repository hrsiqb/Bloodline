
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

    var datas = []
    // Prevent going back
    navigation.addListener('focus', e => navigation.addListener('beforeRemove', e => e.preventDefault()))
    // Enable going back on screen blur
    navigation.addListener('blur', e => navigation.removeListener('beforeRemove'))

    useEffect(() => {
        setLoading(true)
        new Promise((res, rej) => getAllDonors(res, rej))
            .then(donors => {
                // Object.keys(donors).map((uId, key) => {
                for (var uId in donors) {
                    var promise = new Promise((res, rej) => getUserInfo(res, rej, uId))
                        .then(data => {
                            console.log("38==>", data)
                            datas.push(<UserCard navigation={navigation} userInfo={data} key={data.uId} />)
                            setUsersData(datas)
                            console.log("40==>", datas)
                            // usersData && usersData.map((data, key) => setDonors([...donors, <UserCard navigation={navigation} userInfo={data} key={key} />]))
                            setLoading(false)
                        })
                        .catch(error => {
                            setLoading(false)
                            alert(error.message)
                        })
                }
                // })
            })
            .catch(error => {
                setLoading(false)
                alert(error.message)
            })
    }, [])
    return (
        <>
            <ScrollView contentContainerStyle={[ms.fl_1, ms.ai_c, ms.bc_mrn]}>
                {loading &&
                    <View style={[ms.pos_ab, ms.w_112, ms.h_116, ms.bc_blk_5, ms.zInd_1, ms.jc_c, ms.ai_c]} >
                        <View style={[ms.bRad_50, ms.jc_c, ms.bc_w]}>
                            <ActivityIndicator color="red" size={60} />
                        </View>
                    </View>
                }
                {usersData}
                {console.log("59==>", usersData)}
                <TouchableNativeFeedback onPress={() => navigation.navigate("Menu")}>
                    <View style={[ms.w_65p, ms.h_65p, ms.jc_c, ms.ai_c, ms.bc_red, ms.bRad_50,
                    ms.pos_ab, ms.bot_20, ms.rit_15]}>
                        <FontAwesomeIcon icon={faBars} color={'white'} size={30} />
                    </View>
                </TouchableNativeFeedback>
            </ScrollView>
        </>
    );
};

export default Dashboard;
