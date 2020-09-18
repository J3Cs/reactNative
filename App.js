import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

function HomeScreen({navigation}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://192.168.43.156:3000/ordenes')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={({id}) => id}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.text}>Mesero: {item.mesero}</Text>
            <Text style={styles.text}>
              Cliente: {item.cliente.nombreCompleto}
            </Text>
            <Button
              title="Ver Detalles"
              onPress={() => navigation.navigate('Details')}
            />
          </View>
        )}
      />
    </View>
  );
}
function DetailsScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Al suave morro v:</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Ordenes')}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Ordenes">
        <Stack.Screen name="Ordenes" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 20,
    flexDirection: 'column',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default App;
