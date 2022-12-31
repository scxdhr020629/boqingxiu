import React, { useEffect, useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    SafeAreaView,
    ImageBackground,
    Image,
    TouchableOpacity,
    FlatList,
    TextInput
} from "react-native";

const Infomation = ({ route, navigation }) => {
    const [choice, setChoice] = useState(0);
    const [data, setData] = useState();

    const order = () => {
        /**更新数据库 */
        setData({ ...data, numOfOrder: data.numOfOrder + 1 });
    }


    useEffect(() => {
        /**获取数据 */
        setData({
            
        });
    }, []);

    return (
        <SafeAreaView>
            <View style={styles.header}>
                <Ionicons
                    name="chevron-back-outline"
                    size={25}
                    style={{ color: "rgba(255, 255, 255, 0.8)", position: "absolute", left: 7 }}
                    onPress={() => navigation.navigate("Mine")}
                />
                <Text style={styles.title}>基本信息</Text>
                <TouchableOpacity style={styles.editView} onPress={() => navigation.navigate("Infomation")}>
                    <Image source={require('../data/img/register_2.png')} style={styles.editImg} />
                    <Text style={{ fontSize: 13 }}>保存</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.BQXinfo}>
                    <View style={{ justifyContent: 'center', height: 70, backgroundColor: '#ffffff', margin: 3 }}>
                        <Text style={styles.leftTxt}>头像</Text>
                        <Image source={require('../data/img/pot.png')} style={styles.touxiangImg} />
                    </View>
                    <View style={styles.txtView}>
                        <Text style={styles.leftTxt}>昵称</Text>
                        <TextInput style={styles.rightTxt}>清风Zz</TextInput>
                    </View>
                    <View style={styles.txtView}>
                        <Text style={styles.leftTxt}>公益宣言</Text>
                        <TextInput style={styles.rightTxt}>服务他人，快乐自己</TextInput>
                    </View>
                </View>

                <View style={styles.selfinfo}>
                    <View style={styles.txtView}>
                        <Text style={styles.leftTxt}>姓名</Text>
                        <TextInput style={styles.rightTxt}>吴*霖</TextInput>
                    </View>
                    <View style={styles.txtView}>
                        <Text style={styles.leftTxt}>证件类型</Text>
                        <TextInput style={styles.rightTxt}>居民身份证</TextInput>
                    </View>
                    <View style={styles.txtView}>
                        <Text style={styles.leftTxt}>证件号码</Text>
                        <TextInput style={styles.rightTxt}>******2001******59</TextInput>
                    </View>
                    <View style={styles.txtView}>
                        <Text style={styles.leftTxt}>志愿者编号</Text>
                        <TextInput style={styles.rightTxt}>3833362855494</TextInput>
                    </View>
                    <View style={styles.txtView}>
                        <Text style={styles.leftTxt}>注册日期</Text>
                        <TextInput style={styles.rightTxt}>2022-10-11</TextInput>
                    </View>
                    <View style={styles.txtView}>
                        <Text style={styles.leftTxt}>性别</Text>
                        <TextInput style={styles.rightTxt}>男</TextInput>
                    </View>
                    <View style={styles.txtView}>
                        <Text style={styles.leftTxt}>出生日期</Text>
                        <TextInput style={styles.rightTxt}>2001-03-03</TextInput>
                    </View>
                    <View style={styles.txtView}>
                        <Text style={styles.leftTxt}>政治面貌</Text>
                        <TextInput style={styles.rightTxt}>共青团员</TextInput>
                    </View>
                </View>

                <View style={styles.linkinfo}>
                    <View style={styles.txtView}>
                        <Text style={styles.leftTxt}>手机号码</Text>
                        <TextInput style={styles.rightTxt}>15058828022</TextInput>
                    </View>
                    <View style={styles.txtView}>
                        <Text style={styles.leftTxt}>邮箱地址</Text>
                        <TextInput style={styles.rightTxt}>1170687672@qq.com</TextInput>
                    </View>
                    <View style={styles.txtView}>
                        <Text style={styles.leftTxt}>现居住地</Text>
                        <TextInput style={styles.rightTxt}>拱墅区湖州街51号</TextInput>
                    </View>
                </View>
            </ScrollView>



        </SafeAreaView>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    header: {
        width: "100%",
        height: 70,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#9D98FF"
    },
    title: {
        fontSize: 25,
        color:'#ffffff'
    },
    editView: {
        width: 30,
        height: 40,
        position: "absolute",
        right: 7,
        alignItems: 'center',
    },
    editImg: {
        width: 30,
        height: 30,
    },
    BQXinfo: {
        backgroundColor: '#f0f0f0',
        marginTop: 10,
        height: 180,
    },
    touxiangImg: {
        width: 60,
        height: 60,
        borderRadius: 30,
        position: "absolute",
        right: 7
    },
    txtView: {
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#ffffff',
        margin: 2
    },
    leftTxt: {
        marginLeft: 10,
        fontSize: 16
    },
    rightTxt: {
        position: "absolute",
        right: 8
    },
    selfinfo: {
        backgroundColor: '#f0f0f0',
        marginTop: 10,
        height: 427,
    },
    linkinfo: {
        backgroundColor: '#f0f0f0',
        marginTop: 10,
        height: 260,
    },
});

export default Infomation;