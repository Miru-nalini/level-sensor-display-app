import { StyleSheet,Dimensions,Image,Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import {Drawer} from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getAuth, signOut } from "firebase/auth";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const _layout = () => {
  const {currentUser} = getAuth();
  function CustomDrawerContent(props:any) {

    const {top,bottom}=useSafeAreaInsets();
    return(
        <View style={{flex:1}}>
            
        <DrawerContentScrollView{...props}
        scrollEnabled
        contentContainerStyle={{backgroundColor:'#0023a2'}}
        >
        <View style={{padding:20,paddingVertical:40}}>
          <Image source={require('../../assets/images/icon.png')}
          style={{width:120,height:120,alignSelf:'center',borderRadius:60}}/>
          <Text style={{
            alignSelf:'center',
            fontWeight:'500',
            fontSize:18,
            paddingTop:20,
            color:'#ffffff'
          }} >
            {currentUser?.email}
            </Text>{/**
             * //{currentUser?.email}
             */}
        </View>
       <View style={{backgroundColor:'#fff',paddingTop:20,paddingHorizontal:10}}>
       <DrawerItemList{...props}/>
       </View>
        </DrawerContentScrollView>
        <TouchableOpacity style={{
          padding:20,
          paddingBottom:20+bottom,
          borderTopColor:'#0023a2',
          borderWidth:1,
          borderTopRightRadius:15,
          borderTopLeftRadius:15,
          alignItems:'center',
          justifyContent:'center'
        }}
        onPress={()=>{
          signOut(getAuth());
          router.replace('/')}
        }
        >
          <Text style={{fontSize:16}}>Logout</Text>
        </TouchableOpacity>
        </View>
    )
}
  return (
    <GestureHandlerRootView style={styles.flexStyle}>
    <Drawer drawerContent={CustomDrawerContent}
    screenOptions={{headerShown:false,
     drawerItemStyle:{borderRadius:12},
     drawerActiveBackgroundColor:'#0023a2',
     drawerActiveTintColor:'#ffffff',
     drawerLabelStyle:{marginLeft:-20},
     }}>
      <Drawer.Screen name='(vm)'
        options={{title:'home',drawerIcon:(
        {size,color})=>(<Ionicons name='home-outline' size={size} color={color}/>)
      }}/>
      <Drawer.Screen name='add'
      options={{title:'add',drawerIcon:(
        {size,color})=>(<Ionicons name='add-outline' size={size} color={color}/>)
      }} />
      <Drawer.Screen name='settings'
      options={{title:'settings',drawerIcon:(
        {size,color})=>(<Ionicons name='settings-outline' size={size} color={color}/>),
        drawerItemStyle:{
        }
      }} />
    </Drawer>
    </GestureHandlerRootView>

  )
}

export default _layout


const styles = StyleSheet.create({
  flexStyle:{
    flex:1,

  }
})