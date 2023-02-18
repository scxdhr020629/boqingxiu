import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Launch from './Launch';
import Login from './Login';
import Register from './Register';
import Main from "./Main";
import SignInputCode from './SignInputCode';
import ContentIntro from "./ContentIntro";
import ContentService from "./ContentService";

import Infomation from "./Information";
import ActivitySignup from "./ActivitySignup";
import Activity from "./Activity";
import Publish from "./Publish";
import HelpCenter from "./HelpCenter";
import CompletedAct from "./CompletedAct";

import { useState, useEffect } from "react";
import Search from './Search';
import ActivityTiming from "./ActivityTiming";
import Chat from "./chat";
import Geo from "./Geo";
import UserInformation from "./UserInformation";
const Stack = createNativeStackNavigator();

const App = () => {



  // 司晨旭编写开始
  /**
  * 获取地址
   */
  getGeo = async () => {
    let data = await Geo.getCityByLocation();
    // console.log("data" + JSON.stringify(data));   //数据都在这
    // console.log(typeof data);
    // console.log(data.regeocode.formatted_address);
    UserInformation.userAddressNow = data.regeocode.formatted_address;
    // console.log("获取到的信息( •̀ ω •́ )y" + UserInformation.userAddressNow);
  }

  // useEffect(() => {
  //   setInterval("getGeo()", "5000");
  // }, []);

  //设置每过几秒获取一次
  useEffect(() => {
    const interval = setInterval(getGeo, 5000); // 每隔5分钟執行 loadData 這個 function,后来还是改成了5s

    return () => clearInterval(interval);
  }, []);



  //司晨旭编写结束

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Launch" component={Launch} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="SignInputCode" component={SignInputCode} options={{ headerShown: false }} />
        <Stack.Screen name="ActivityTiming" component={ActivityTiming} options={{ headerShown: false }} />
        <Stack.Screen name="ContentIntro" component={ContentIntro} options={{ headerShown: false }} />
        <Stack.Screen name="ContentService" component={ContentService} options={{ headerShown: false }} />


        {/* 吴佳丽第二次新增 */}
        <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
        <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
        {/* 吴卓霖 新增 */}
        <Stack.Screen name="Infomation" component={Infomation} options={{ headerShown: false }} />
        <Stack.Screen name="ActivitySignup" component={ActivitySignup} options={{ headerShown: false }} />
        <Stack.Screen name="Activity" component={Activity} options={{ headerShown: false }} />
        <Stack.Screen name="Publish" component={Publish} options={{ headerShown: false }} />
        <Stack.Screen name="HelpCenter" component={HelpCenter} options={{ headerShown: false }} />
        <Stack.Screen name="CompletedAct" component={CompletedAct} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;