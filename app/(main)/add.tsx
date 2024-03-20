import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { DrawerActions } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'

const add = () => {
    const navigation = useNavigation();
    const handleDrawer = ()=>{
        navigation.dispatch(DrawerActions.openDrawer());
    }
  return (
    <LinearGradient
    colors={['#5179ff','#85c4ff','#c7e4ff']}
      style={styles.container}
      >
      <View style={styles.header}>
      <TouchableOpacity onPress={handleDrawer} style={{alignSelf:'flex-start',paddingTop:50}}>
        <Ionicons name='menu-outline' size={48} />
      </TouchableOpacity>

      <Text style={{fontSize:32,alignSelf:'center',marginVertical:16}}>Discover nearby</Text>
      
      </View>
      <TouchableOpacity style={{padding:16,paddingHorizontal:30,borderRadius:16,backgroundColor:'#000000',width:'30%',justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'#ffffff',fontSize:16}}>Scan</Text>
      </TouchableOpacity>
      </LinearGradient>
  )
}

export default add

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
  },
  header:{
    width:'100%',
    padding:16,
  },
  mainContainer:{
    justifyContent:'center',
    alignItems:'center',
    width:'100%'
  }
})