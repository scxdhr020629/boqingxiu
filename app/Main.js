import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from "react-native";
import Message from "./Message";
import Home from "./Home";
import SignAgreement from './SignAgreement';
import Activity from "./Activity";
import Mine from "./Mine"

const Tab = createBottomTabNavigator();

const Main = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    if (route.name === "Home") {
                        return (focused ? <Image source={require("../data/img/home_11.png")} style={{ width: 30, height: 28, marginBottom: 2, marginRight: 3 }} />
                            : <Image source={require("../data/img/home_1.png")} style={{ width: 30, height: 26, marginTop: 3, marginRight: 1 }} />);
                    } else if (route.name === "Message") {
                        return (focused ? <Image source={require("../data/img/home_22.png")} style={{ width: 30, height: 30, marginTop: 2, marginRight: 2 }} />
                            : <Image source={require("../data/img/home_2.png")} style={{ width: 28, height: 23, marginTop: 4 }} />);
                    }
                    else if (route.name === "SignAgreement") {
                        return <Image source={require("../data/img/home_3.png")} style={{ width: 40, height: 40, marginBottom: 12 }} />;
                    }
                    else if (route.name === "Activity") {
                        return (focused ? <Image source={require("../data/img/home_44.png")} style={{ width: 36, height: 36 }} />
                            : <Image source={require("../data/img/home_4.png")} style={{ width: 30, height: 30 }} />);
                    }
                    else if (route.name === "Mine") {
                        return (focused ? <Image source={require("../data/img/home_55.png")} style={{ width: 30, height: 30 }} />
                            : <Image source={require("../data/img/home_5.png")} style={{ width: 32, height: 28, marginLeft: 5, marginTop: 3 }} />);
                    }
                },
                tabBarActiveTintColor: "#A998FF",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: { height: 50 }
            })}
        >
            <Tab.Screen name="Home" options={{ title: "首页", headerShown: false }} component={Home} />
            <Tab.Screen name="Message" options={{ title: "消息", headerShown: false }} component={Message} />
            <Tab.Screen name="SignAgreement" options={{ title: "签到", headerShown: false }} component={SignAgreement} />
            <Tab.Screen name="Activity" options={{ title: "活动", headerShown: false }} component={Activity} />
            <Tab.Screen name="Mine" options={{ title: "我的", headerShown: false }} component={Mine} />
        </Tab.Navigator>
    );
}

export default Main;