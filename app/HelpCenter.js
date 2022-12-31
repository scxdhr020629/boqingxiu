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
    FlatList
} from "react-native";

const HelpCenter = ({ route, navigation }) => {
    return (
        <SafeAreaView>
            <View style={styles.header}>
                <Ionicons
                    name="chevron-back-outline"
                    size={25}
                    style={{ color: "rgba(255, 255, 255, 0.8)", position: "absolute", left: 7 }}
                    onPress={() => navigation.navigate("Mine")}
                />
                <Text style={styles.title}>帮助中心</Text>

            </View>
            <ScrollView >
                <Text style={styles.commonTxt}>   1.完成登录后，进入软件界面</Text>
                <Image source={require('../data/img/首页内容1.png')}
                    style={{ alignSelf: 'center', height: 660, width: 300 }} />
                <Text style={styles.commonTxt}>   首页为一些博物馆发布的宣传信息，点击首页里的每一个小模块都可以查看详细信息。</Text>
                <Text style={styles.commonTxt}>   2.点击其中的一个小模块进行查看</Text>
                <Image source={require('../data/img/模块内容.png')}
                    style={{ alignSelf: 'center', height: 660, width: 300 }} />
                <Image source={require('../data/img/模块内容2.png')}
                    style={{ alignSelf: 'center', height: 660, width: 300 }} />
                <Text style={styles.commonTxt}>   点进去某一个博物馆模块后的界面，里面有详细的内容信息，左图下面可以选择不同日期来查看预约人数，点击左图上面的志愿服务，可以进入到该界面查看，本志愿地点里相关的志愿服务信息时间段。</Text>

                <Text style={styles.commonTxt}>   3.对话模块</Text>
                <Image source={require('../data/img/消息模块1.png')}
                    style={{ alignSelf: 'center', height: 660, width: 300 }} />
                <Image source={require('../data/img/消息模块2.png')}
                    style={{ alignSelf: 'center', height: 660, width: 300 }} />
                <Text style={styles.commonTxt}>   通过底部导航栏，选择消息，可以进入到对话模块，左图为当前的消息列表，右上角的小刷子为一键处理未读功能，点进去一个消息对话框之后，就可以进入右图的部分。在下面的消息框中输入消息，然后点击回车即可发送。</Text>

                <Text style={styles.commonTxt}>   4.志愿签到模块</Text>
                <Image source={require('../data/img/签到1.png')}
                    style={{ alignSelf: 'center', height: 660, width: 300 }} />
                <Image source={require('../data/img/签到2.png')}
                    style={{ alignSelf: 'center', height: 660, width: 300 }} />
                <Text style={styles.commonTxt}>   点击下册导航栏，首先进入左图第一张的界面，阅读协议之后并阅读，点击我要签到之后，在上方输入签到码，若在指定的时间和地理范围内，则完成签到，进入图三的状态。</Text>

                <Text style={styles.commonTxt}>   5.活动模块</Text>
                <Image source={require('../data/img/活动1.png')}
                    style={{ alignSelf: 'center', height: 660, width: 300 }} />
                <Text style={styles.commonTxt}>   点击下侧导航栏，选择活动，点开后即可查看当前已经预约的活动，然后也可以选择不需要的活动进行取消预约。上侧一栏为时间，可以查看某个日期的预约活动。</Text>

                <Text style={styles.commonTxt}>   6.我的模块</Text>
                <Image source={require('../data/img/我的1.png')}
                    style={{ alignSelf: 'center', height: 660, width: 300 }} />
                <Text style={styles.commonTxt}>   头像下方显示的是活动时间，然后也可以查看一些加入的活动和已经签到的活动，还可以查看其他的个人信息。</Text>

                <View style={{ height: 180 }}></View>
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
        color: '#ffffff'
    },
    commonTxt: {
        fontSize: 18,
    }

});

export default HelpCenter;