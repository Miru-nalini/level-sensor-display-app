import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { DrawerActions } from '@react-navigation/native'

const add = () => {
    const navigation = useNavigation();
    const handleDrawer = ()=>{
        navigation.dispatch(DrawerActions.openDrawer());
    }
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.header}>
    <TouchableOpacity onPress={handleDrawer}>
      <Ionicons name='menu-outline' size={32} />
    </TouchableOpacity>
    </View>
    <View style={styles.mainContainer}>
        <Text>add</Text>
    </View>
    </SafeAreaView>
  )
}

export default add

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  header:{
    width:'100%',
    padding:16
  },
  mainContainer:{
    justifyContent:'center',
    alignItems:'center',
    width:'100%'
  }
})