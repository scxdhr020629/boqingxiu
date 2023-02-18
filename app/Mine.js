// 未处理完成
import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TextInput, Image, Dimensions, TouchableOpacity } from "react-native";
import UserInformation from "./UserInformation";


const Mine = (prop) => {
    const [name, setName] = useState("");
    const [head, setHead] = useState("");
    const [type, setType] = useState("");
    const [totalTime, setTime] = useState(0);
    //测试数据
    const mineDetail = [
        {
            Name: '吴卓霖',
            vType: '大学生志愿者',
            organization: '浙大城市学院',
        }
    ]

    const exit = () => {
        prop.navigation.navigate('Login');
    }

    const fetchData = async () => {
        var name;
        var type;
        var totalTime;
        var userId = UserInformation.id;
        var ip = UserInformation.ip;

        await fetch(ip + 'selectUserByUserId.php?id=' + userId)
            .then(res => res.json())
            .then(resJson => {
                if (resJson.length != 0) {
                    name = resJson[0].name;
                    type = resJson[0].type;
                }
            }).catch(e => console.log(e));
        setName(name);
        console.log("type");
        console.log(type);
        if (type === "1") { // normalUser
            await fetch(ip + 'selectNormalUserByUserId.php?id=' + userId)
                .then(res => res.json())
                .then(resJson => {
                    if (resJson.length != 0) {
                        totalTime = resJson[0].totalTime;
                        setHead(resJson[0].nUserImg)
                    }
                }).catch(e => console.log(e));
            setType("大学生志愿者");
            setTime(totalTime);
            console.log(totalTime);
        }
        else {
            // setTime(0);
            setType("组织")
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ fontSize: 20, color: '#ffffff' }}>个人页面</Text>
            </View>

            <View style={styles.viewUser}>
                <View style={styles.viewUserTop}>
                    <Image style={styles.imgUserTitle} source={{ uri: head }} />
                </View>
                <Text style={styles.txtName}>{name}</Text>
                <Text style={styles.vTime}>{totalTime}</Text>
                <Text style={styles.vTxt}>活动时长</Text>

            </View>
            <View style={{ marginLeft: 19, marginRight: 19 }}>
                <Image style={styles.adverimage} source={require('../data/img/advertiseme.png')} />
            </View>

            <Text style={{ fontSize: 18, marginTop: 30, marginBottom: 10 }}>  我的服务————————————————</Text>

            <View style={styles.SecondService}>
                <TouchableOpacity style={styles.secondTouch} onPress={() => prop.navigation.navigate('Infomation', mineDetail)}>
                    <Image source={require('../data/img/AK-MN_活动.png')} style={styles.imagestyle}></Image>
                    <Text style={styles.smalltitle}>基本信息</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondTouch} onPress={() => prop.navigation.navigate('ActivitySignup', mineDetail)}>
                    <Image source={require('../data/img/活动记录.png')} style={styles.imagestyle}></Image>
                    <Text style={styles.smalltitle}>已报名活动</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondTouch} onPress={() => prop.navigation.navigate('CompletedAct', mineDetail)}>
                    <Image source={require('../data/img/活动发布.png')} style={styles.imagestyle}></Image>
                    <Text style={styles.smalltitle}>已签到活动</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondTouch} onPress={() => prop.navigation.navigate('HelpCenter', mineDetail)}>
                    <Image source={require('../data/img/home_4.png')} style={styles.imagestyle}></Image>
                    <Text style={styles.smalltitle}>帮助中心</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => exit()}
                style={{
                    marginTop: 30,
                    borderRadius: 10,
                    width: 200,
                    height: 40,
                    backgroundColor: "#9D98FF",
                    justifyContent: "center",
                    alignSelf: "center"
                }}>
                <Text style={styles.btnExit}>退出登录</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        width: "100%",
        height: 70,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#9D98FF'
    },
    //颜色F0F0F0
    viewUser: {
        height: 240,
        backgroundColor: '#F0F0F0'
    },
    viewUserTop: {
        height: 130,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgUserTitle: {
        height: 100,
        width: 100,
        borderRadius: 50,
        marginTop: 20,
    },
    txtName: {
        fontSize: 15,
        alignSelf: 'center'
    },
    vTime: {
        alignSelf: 'center',
        fontSize: 20,
        marginTop: 20,
        marginBottom: 5,
        color: "blue"
    },
    vTxt: {
        alignSelf: 'center',
        fontSize: 18,
    },
    adverimage: {
        width: '100%',
        height: 80,
        borderRadius: 10,
    },
    twoPage: {
        flexDirection: 'row',
        height: 110,
        backgroundColor: '#f0f0f0',
        marginTop: 10,
        marginLeft: 19,
        marginRight: 19,
    },
    touchPage: {
        height: 80,
        width: '45%',
        flexDirection: 'row',
        //justifyContent:"center",
        alignItems: 'center',
        borderColor: '#F0F0F0',
        margin: 10,
        borderWidth: 2,
        backgroundColor: '#ffffff',
        borderRadius: 10
    },
    imagestyle: {
        margin: 5,
        height: 60,
        width: 60,
    },
    SecondService: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 90,
    },
    secondTouch: {
        alignItems: 'center',
        width: '22%',
        margin: 5,
    },
    btnExit: {
        textAlign: "center",
        textAlignVertical: 'center',
        color: "#FFF",
        fontSize: 18
    }
});

export default Mine;