
import React,{useState, useEffect} from 'react';
import { Button ,TextInput} from 'react-native-paper';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  StyleSheet,
  AsyncStorage,
  Image,
  ToastAndroid,
} from 'react-native';
import { Container, Toast } from 'native-base';

const LoginScreen = (props) => {
  const [email,setEmail] = useState('');
  const [password,setPassword]=useState('')

  useEffect(() => {
    const check = async ()=>{
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        props.navigation.replace("Restaurantscreen")
      }
    } catch (error) {
      console.log('error getting data')
    }
  }
  check();
}, [])

  const sendCred = async (props)=>{
    fetch("http://192.168.137.23:3000/signin",{
      method:"POST",
      headers: {
       'Content-Type': 'application/json'
     },
     body:JSON.stringify({
       "email":email,
       "password":password
     })
    })
    .then(res=>res.json())
    .then(async (data)=>{
             await AsyncStorage.setItem('token',data.token)
             props.navigation.replace("Restaurantscreen")
             Toast.show(
              "Login Successful!",
              ToastAndroid.SHORT
            )
           
    }).catch(ToastAndroid.show(
      "Login Successful!",
      ToastAndroid.SHORT
    ))
 }

  return (
   <Container style={{backgroundColor:''}}> 
   <KeyboardAvoidingView behavior="position">
     <StatusBar backgroundColor='#8E0438' barStyle="light-content" />
      <View style={{alignItems:'center'}}>
      <Image
      style={{height:150, width:150}}
      source={require('../assets/menu.png')}
      />
      </View>
      <Text 
      style={{fontSize:50, textAlign:'center', color:'#8E0438'}}
      >Digital Bites</Text>
      <View
      style={{
        borderBottomColor:"#8E0438",
        borderBottomWidth:4,
        borderRadius:6,
        marginLeft:100,
        marginRight:100,
        marginTop:4
      }}
       />
      <Text
      style={{
        fontSize:20,marginLeft:18,marginTop:40
      }}
      
      >Login with email</Text>
      <TextInput
        label='Email'
        mode="outlined"
        placeholder='johndoe@example.com'
        value={email}
        style={{marginLeft:18,marginRight:18,marginTop:18}}
        theme={{colors:{primary:"#8E0438"}}}
        onChangeText={(text)=>setEmail(text)} 
      />
      <TextInput
        label='Password'
        mode="outlined"
        secureTextEntry={true}
        value={password}
        onChangeText={(text)=>{setPassword(text)}}
        style={{marginLeft:18,marginRight:18,marginTop:18}}
        theme={{colors:{primary:"#8E0438"}}}
     
      />
      <Button 
        mode="contained"
        style={{marginLeft:18,marginRight:18,marginTop:18, backgroundColor:'#8E0438'}}
       //onPress={() => sendCred(props)}
       onPress={() => props.navigation.navigate("mainFlow")}
       >
        Login
      </Button>
      
      </KeyboardAvoidingView>
   </Container>
  );
};

export default LoginScreen;
