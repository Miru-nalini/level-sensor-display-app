import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '@/app/_layout';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const vmDetails = () => {
  let [items,setItems]=useState<any>([]);
  const [isLoading,setIsLoading]=useState(true);
  const para = useLocalSearchParams();
  const vmName = para.vmName;
  const vmLocation = para.vmLocation;
  const vmId=para.vmId;
  const [batteryStatus,setBatteryStatus]=useState()
  useEffect(()=>{
     getData();
    
  },[]);

  const getData = async()=>{
    const vmSnap = await getDocs(collection(db,"Vending Machines",`${vmId}`,"items"));
    const its= vmSnap.docs.map((doc)=>({
      key:doc.id,
      ...doc.data(),
    }))
    setItems(its);
    setIsLoading(false);

  }

  
  const Item = ({item}:any) => {
   const levelcolor= item.currentVolume>20?'#4caf50':'#bc1a1a'

    return (
      <Link href={{
        pathname:'/(main)/(vm)/pdtDetails',
        params:{'name':item.name,'vmName':vmName,'vmLocation':vmLocation, 'currentVolume':item.currentVolume,'totalVolume':item.totalVolume,'id':item.key,'vmId':vmId}
      }} asChild>
    <TouchableOpacity style={styles.pdtView}>
      <View style={styles.pdttop}>
      <Text style={{fontSize:18}} >{item.name}</Text>   
      </View>
      <View>
      <View style={[styles.pdtbottom,{justifyContent:'space-between'}]}>
      <Text style={{fontSize:12,color:'#a9a9a9'}}>{`${((item.currentVolume / item.totalVolume) * 100).toFixed(2)}%` }</Text>
      <Text style={{fontSize:12,color:'#a9a9a9'}}>{`${item.currentVolume}/${item.totalVolume}`}</Text>
      </View>
      <View style={styles.pdtbottom}>
        <View style={styles.levelIndicator}>
      
        <View style={[styles.levelBar,{backgroundColor:levelcolor}, { width: `${(item.currentVolume / item.totalVolume) * 100}%` }]} />
        </View>
        <Ionicons name='chevron-forward-outline' size={20}/>
      </View>
      </View>
    </TouchableOpacity>
    </Link>
  );}

    
  if(isLoading){
    console.log("loading...");
    return (
      <LinearGradient
      colors={['#5179ff','#85c4ff','#c7e4ff']}
      style={styles.loading}
      >
      <ActivityIndicator size={56} color={'#002c8a'}/>
    </LinearGradient>)
   }
   
  return (
        <LinearGradient
        colors={['#5179ff','#85c4ff','#c7e4ff']}
    style={{flex:1,alignItems:'center',paddingTop:50}}>
      <View style={styles.header}>
        <Link href={'/(main)/(vm)/'} asChild>
        <Ionicons name='arrow-back' size={36} />
        </Link>
      <Text style={{fontSize:32,alignSelf:'center',marginVertical:16,}}>{vmName}</Text>
      </View>
      <View style={styles.mainContainer}>
        <FlatList
        data={items}
        renderItem={({item}:any)=><Item item={item}/>}
        keyExtractor={(item)=>item.key}
        numColumns={2}
        />
        <Text style={{alignSelf:'flex-start',color:"#212121",fontSize:18,margin:8}}>MACHINE DETAILS</Text>
        <View style={styles.desc}>

        <View style={styles.descItem}>
          <Text  style={{fontSize:16,color:'#212121'}}>Id</Text>
          <Text style={{fontSize:12,color:'#484848'}}>{para.vm}</Text>
          </View>
        <View style={styles.descItem}>
          <Text  style={{fontSize:16,color:'#212121'}}>Location</Text>
          <Text style={{fontSize:12,color:'#484848'}}>{vmLocation}</Text>
          </View>
          <View style={styles.descItem}>
          <Text  style={{fontSize:16,color:'#212121'}}>Battery life</Text>
          <Text style={{fontSize:12,color:'#484848'}}>17h 53m   86%</Text>
          </View>
          <View style={styles.descItem}>
          <Text  style={{fontSize:16,color:'#212121'}}>Battery status</Text>
          <Text style={{fontSize:12,color:'#484848'}}>charging</Text>
          </View>
          <View style={styles.descItem}>
          <Text  style={{fontSize:16,color:'#212121'}}>Battery mode</Text>
          <Text style={{fontSize:12,color:'#484848'}}>Hibernation</Text>
          </View>
        </View>
      
      </View>
      
    </LinearGradient>

  )
  
}

export default vmDetails

const styles = StyleSheet.create({
  header:{
    width:'100%',
    paddingHorizontal:16,
    alignItems:'flex-start',
  },
  mainContainer:{
    width:'90%',
    height:"80%",
    justifyContent:'center',
    paddingVertical:16,
    alignItems:'center'
  },
  pdtView:{
    padding:16,
    alignItems:'center',
    justifyContent:'space-between',
    height:160,
    width:160,
    margin:8,
    borderRadius:16,
    backgroundColor:'#fff',
    elevation:4,
  },

  pdttop:{
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
  },
  pdtbottom:{
    width:'100%',
    flexDirection:'row',
    gap:4,
    alignItems:'center',
    justifyContent:'center',

  },
  levelIndicator: {
    height: 8,
    backgroundColor: '#c2c2c2',
    borderRadius: 4,
    overflow:'hidden',
    width:'86%',
    alignSelf:'center'
  },
  levelBar:{
    height:'100%',
    
  },
  desc:{
    width:'100%',
    backgroundColor:'#e6f0ff',
    borderRadius:16,
    elevation:2,
    padding:8,
    paddingBottom:0,
  },
  descItem:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:10,
    paddingVertical:10,
    borderBottomColor:'#a8a8a8',
    borderBottomWidth:0.8,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
