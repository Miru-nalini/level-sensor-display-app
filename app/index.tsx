import { StyleSheet, Text, Dimensions,TouchableOpacity, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import React, { useState , useEffect} from 'react'
import { Link , router} from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { LinearGradient } from 'expo-linear-gradient'


const register = () => {
  const [email,setEmail]=useState<string>("");
  const [password,setPassword]=useState<string>("");
  const [isLoading,setIsLoading]=useState(false);
  const handleRegister = () => {
    setIsLoading(true);
    createUserWithEmailAndPassword(getAuth(), email, password)
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
      colors={['#1f78fe','#85c4ff','#c7e4ff']}
      style={styles.container}
      >
      <KeyboardAvoidingView style={styles.inputContainer}>
      
        <Text style={{fontSize:56,marginBottom:48}}>Welcome!</Text>

        <TextInput placeholder='Email'
          value={email}
          onChangeText={(text)=>setEmail(text)}
          keyboardType='email-address'
          cursorColor={'#000'}
          style={styles.input}/>

        <TextInput placeholder='Password'
          value={password}
          onChangeText={(text)=>setPassword(text)}
          secureTextEntry
          cursorColor={'#000'}
          style={styles.input}/>

        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={[styles.text,{color:'#ffffff'}]}>Register</Text>
          {isLoading&&<ActivityIndicator size={24} color={'#fff'}/>}
          
        </TouchableOpacity>
      
      </KeyboardAvoidingView>

        <TouchableOpacity style={styles.registerLink}>
          <Link href={'/login'} asChild>
            <Text style={styles.text}>Already have an account? Login</Text>
          </Link>
        </TouchableOpacity>
        </LinearGradient>
    
  )
}

export default register

const styles = StyleSheet.create({
  container:{
    flex:1,
    width:'100%',
    height:'100%',
    alignItems:'center',
    justifyContent:'space-between',

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
    color:'#000000'
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
    backgroundColor:'#000',
    borderWidth:1,
    padding:16,
    paddingHorizontal:32
  }
})