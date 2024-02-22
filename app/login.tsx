
import { StyleSheet, Text, Dimensions,TouchableOpacity, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Link , router} from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { LinearGradient } from 'expo-linear-gradient'

const login = () => {
  const [email,setEmail]=useState<string>("");
  const [password,setPassword]=useState<string>("");
  const [isLoading,setIsLoading]=useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    signInWithEmailAndPassword(getAuth(), email, password)
      .then((user) => {
        if (user){ 
            console.log(email);
            setIsLoading(false);
            router.replace('/(main)/(vm)/');
          }
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err?.message);
      });
  };

  return (
    <LinearGradient
      colors={['#0023a2','#5179ff','#85c4ff']}
      style={styles.container}
      >
      <KeyboardAvoidingView style={styles.inputContainer}>
      <Text style={{fontSize:56,marginBottom:48}}>Enter details</Text>
      <TextInput placeholder='Email'
      value={email}
      onChangeText={(text)=>setEmail(text)}
      keyboardType='email-address'
      style={styles.input}/>
      <TextInput placeholder='Password'
      value={password}
      onChangeText={(text)=>setPassword(text)}
      secureTextEntry
      style={styles.input}/>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={[styles.text,{color:'#ffffff'}]}>login</Text>
        {isLoading&&<ActivityIndicator size={24} color={'#fff'}/>}
      </TouchableOpacity>
      
      </KeyboardAvoidingView>
        <TouchableOpacity style={styles.registerLink}>
        <Link href={'/'} asChild>
        <Text style={styles.text}>Don't have an account? Register</Text>
      </Link>
        </TouchableOpacity>
        </LinearGradient>
    
  )
}

export default login

const styles = StyleSheet.create({
  container:{
    flex:1,
    width:windowWidth,
    height:windowHeight,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',

  },
  inputContainer:{
    flex:1,
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    gap:16
  },
  input:{
    borderRadius:16,
    width:'90%',
    borderColor:'#000',
    borderWidth:1,
    padding:16,
  },
  registerLink:{
    bottom:50
  },
  text:{
    fontSize:18
  },
  button:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    gap:8,
    borderRadius:16,
    width:'50%',
    backgroundColor:'#000',
    borderWidth:1,
    padding:16
  }
})