/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const App = () => {
  const [produk, setProduk] = useState([]);
  const [limit, setLimit] = useState(15);
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);

  const getDataProduk = () => {
    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      .then(res => res.json())
      .then(res => {
        //simpan di dalam state
        setProduk(res.products);
      });
  };

  useEffect(() => {
    getDataProduk();
  }, []);

  const nextPage = () => {
    setPage(page + 1);
    setSkip(limit * page);
    getDataProduk();
  };

  const prevPage = () => {
    setPage(page - 1);
    setSkip(limit * page);
    getDataProduk();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{padding: 20}}>
        <Text>Jumlah Produk : {produk.length}</Text>
        <Text>Page : {page}</Text>
        <Text>Skip : {skip}</Text>
      </View>
      <FlatList
        data={produk}
        renderItem={data => {
          return (
            <View style={styles.item}>
              <View>
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri: data.item.thumbnail,
                  }}
                />
              </View>
              <View>
                <Text>{data.item.title}</Text>
              </View>
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />

      <View style={styles.flexRow}>
        <Button title="next" onPress={nextPage} />
        <Button title="prev" onPress={prevPage} />
      </View>
    </SafeAreaView>
  );
};

//component FlatList

//component scrollview
const ScrolViewExample = ({produk}) => {
  return (
    <ScrollView>
      {produk.map((item, index) => {
        return (
          <View style={styles.item} key={index}>
            <View>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: item.thumbnail,
                }}
              />
            </View>
            <View>
              <Text style={styles.text}>{item.title}</Text>
              <Text>$ {item.price}</Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    // flex: 1,
    // flexDirection: 'row',
    gap: 10,
  },
  item: {
    flex: 2,
    flexDirection: 'row',
    gap: 15,
    padding: 10,
    marginVertical: 5,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  tinyLogo: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
});

export default App;
