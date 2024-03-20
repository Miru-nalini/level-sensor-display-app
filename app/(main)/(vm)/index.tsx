import { StyleSheet, Text, View,TouchableOpacity, Dimensions, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { DrawerActions } from '@react-navigation/native'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { collection, doc, getCountFromServer, getDocs } from 'firebase/firestore'
import { db } from '@/app/_layout'
import vmDetails from './[vm]'
import { LinearGradient } from 'expo-linear-gradient'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const index = () => {
    const [vms,setVms]=useState<{ key: string; }[]>([]);
    const [isLoading,setIsLoading]=useState(false);
    const navigation = useNavigation();
    const handleDrawer = ()=>{
        navigation.dispatch(DrawerActions.openDrawer());
    }
    useEffect(()=>{
      getData();
    },[]);
    const getData = async()=>{
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "Vending Machines"));
      const vmsData = querySnapshot.docs.map(doc=>({
        key: doc.id,
        ...doc.data()
      }));
      console.log(vmsData);
      setVms(vmsData);
      setIsLoading(false);
     
      
    }

    const renderVMList =({item }:any)=>{
      return(
<Link href={{
  pathname:`/(main)/(vm)/${item.key}`,
  params:{'vmLocation':item.location,'vmName':item.name,'vmId':item.key}
}} asChild>
          <TouchableOpacity style={styles.vmView}>
            <View>
            <View style={styles.vmContent}>
              <Text style={styles.vmText}>{item.name}</Text>
              <Text style={{fontSize:16,color:'#a9a9a9'}}>{item.location}</Text>
            </View>
            
            </View>
            <Ionicons name='chevron-forward-outline' size={36} color={'#fff'}/>
          </TouchableOpacity>
          
        </Link>
      );
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

      <Text style={{fontSize:32,alignSelf:'center',marginVertical:16}}>Your VMs</Text>
      
      </View>
      <View style={styles.mainContainer}>
      {isLoading?<ActivityIndicator size={56} color={'#0023a2'}/>:
      <FlatList
      data={vms}
      renderItem={renderVMList}
      keyExtractor={(item)=>item.key}
      />}
      </View>  
      
      
    </LinearGradient>
  )
}

export default index

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  header:{
    width:'100%',
    paddingHorizontal:16,
    alignItems:'flex-start',
    
  },
  mainContainer:{
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    marginTop:16,
    height:windowHeight*0.8,
  },
  vmView:{
    width:'95%',
    backgroundColor:'#002c8a',
    borderRadius:16,
    elevation:4,
    paddingHorizontal:24,
    padding:16,
    marginVertical:12,
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    alignSelf:'center',

    
  },
  vmText:{
    fontSize:20,
    color:'#fff'
  },
  vmContent:{
    gap:8,
    alignItems:'flex-start'
  },
  products:{
    flexDirection:'row',
    gap:16,
    marginVertical:16,
  },
  pdt:{
    width:32,
    height:32,
    borderRadius:4,
    backgroundColor:'#cecece'
  },
})