import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, Image, SafeAreaView, FlatList, View } from "react-native";

const FlatListB = () => {
    const [data, setData] = useState([]);
    const [refreshing, isRefresh] = useState(true);

    const doRefresh = () => {
        console.log("doRefresh");
        fetch('https://api.thecatapi.com/v1/images/search?limit=10&page=1')
            .then(res => res.json())
            .then(resJson => {
                console.log('--->', resJson);
                setData(resJson);
                isRefresh(false);
            }).catch(e => console.log(e));
    }

    useEffect(() => {
        isRefresh(true);
        doRefresh();
    }, []);

    const renderItem = (dataItem) => {
        return (
            <TouchableOpacity style={styles.container}>
                <Image style={styles.image} source={{uri: dataItem.item.url}} />
            </TouchableOpacity>
        );
    }

    const renderSeparator = () => {
        return (<View style={{
            height: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            marginLeft: 10,
            marginRight: 10
        }}
        />);
    }

    const handleRefresh = () => {
        isRefresh(true);
        doRefresh();
    }

    return (
        <SafeAreaView>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={dataItem => dataItem.id.toString()}
                ItemSeparatorComponent={renderSeparator}
                refreshing={refreshing}
                onRefresh={handleRefresh}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 300,
        margin: 10,
        backgroundColor: '#FFF',
        borderRadius: 6
    },
    image: {
        height: '100%',
        borderRadius: 4
    }
});

export default FlatListB;