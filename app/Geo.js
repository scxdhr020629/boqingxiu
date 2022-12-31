import { PermissionsAndroid, Platform } from 'react-native';
import { init, Geolocation } from "react-native-amap-geolocation"
import axios from "axios";

class Geo {
    async initGeo() {
        if (Platform.OS === "android") {
            const grantd = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);

            //这里也可以再加点判断啥的给用户提示，grantd 值为 granted 时，是获取成功。
            // console.log("权限获取的咋样了？？？",grantd)
        }

        //初始化高德地图
        await init({
            //来自高德地图中的 安卓 应用的Key
            ios: "31008d413461cc712065baeaa7ed4a0c",
            android: "31008d413461cc712065baeaa7ed4a0c"
        });

        return Promise.resolve();
    }

    async getCurrentPosition() {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(({ coords }) => {
                // console.log(coords)
                resolve(coords);
            }, reject)
        })
    }

    async getCityByLocation() {
        await this.initGeo()

        const { longitude, latitude } = await this.getCurrentPosition()
        const res = await axios.get("https://restapi.amap.com/v3/geocode/regeo", {
            //这里的key是高德地图的 web 的Key
            params: { location: `${longitude}, ${latitude}`, key: "bdb24f2eec679a8049eee92c289dfa9a" }
        })

        return Promise.resolve(res.data);
    }
}

// 这里是new一个对象导出使用，要注意。
export default new Geo();