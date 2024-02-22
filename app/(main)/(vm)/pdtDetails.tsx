import { Image,Dimensions, SafeAreaView, StyleSheet, Text, View, ActivityIndicator, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { db } from '@/app/_layout';
import { LineChart } from 'react-native-chart-kit';
import { Timestamp, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
const pdtDetails = () => {
  const para = useLocalSearchParams();
  const pdtName = para.name;
  const vmName = para.vmName;
  const vmId = para.vmId;
  const vmLocation = para.vmLocation;
  const currentVolume=(Number(para.currentVolume))
  const totalVolume=(Number(para.totalVolume))
  const levelcolor= currentVolume>20?'#4caf50':'#bc1a1a'
  const pdtId = para.id;
  
  let history =[];
  const [isLoading,setIsLoading]=useState(false);
  useEffect(()=>{
    getData();
    console.log('got data');
    console.log(history);

  },[]);
  type historicalData={
    key:string,
    volume:number,
    updateTime:Timestamp
  }
  const getData = async() =>{
    setIsLoading(true);
    const histSnap = await getDocs(collection(db,`Vending Machines/${vmId}/items/${pdtId}/historicalData`));
    const histData = histSnap.docs.map((doc):historicalData=>({
      key:doc.id,
      volume:doc.get("volume"),
      updateTime:doc.get("updateTime")
    }))
    
    console.log(histData);
    history=histData;
    setIsLoading(false);
  }

  const chart = (props:{data:any}) => {
    return (
      <View>
        <Text>History</Text>
        
      </View>
    )
  }
  
  if(isLoading){
    console.log("loading...");
    return (
      <LinearGradient
      colors={['#0023a2','#5179ff','#85c4ff']}
      style={{flex:1,alignItems:'center',justifyContent:'center',paddingTop:50}}
      >
      <ActivityIndicator size={56}color={'#000'}/>
    </LinearGradient>)
   }
  
  return (
    <LinearGradient
      colors={['#0023a2','#5179ff','#85c4ff']}
      style={{flex:1,alignItems:'center',paddingTop:50}}
      >
      
      <View style={styles.header}>
        <Link href={'..'} replace asChild>
        <Ionicons name='arrow-back' size={36} />
        </Link>
      <Text style={{fontSize:32,alignSelf:'center',marginVertical:16,}}>{pdtName}</Text>
      
      </View>
      {isLoading?<ActivityIndicator size={56} color={'#0023a2'}/>:
      <View style={styles.mainContainer}>
      <View style={styles.imageView}></View>
     
      <View style={styles.levelIndicator}>
      
        <View style={[styles.levelBar,{backgroundColor:levelcolor}, { width: `${(currentVolume/ totalVolume) * 100}%` }]} />
        </View>
        <View style={[styles.pdtbottom,{justifyContent:'space-between'}]}>
      <Text style={{fontSize:16,color:'#323232'}}>{`${((currentVolume /totalVolume) * 100).toFixed(2)}%` }</Text>
      <Text style={{fontSize:16,color:'#323232'}}>{`${currentVolume}/${totalVolume}`}</Text>
      </View>
      
        <LinearGradient
      colors={['#0023a2','#0c33b4','#5179ff','#acdbff']}
      style={styles.history}
      >
       
      </LinearGradient>

      
      </View>
}
    </LinearGradient>
  )
}

export default pdtDetails

const styles = StyleSheet.create({
  header:{
    width:'100%',
    paddingHorizontal:16,
    alignItems:'flex-start',
  },
  mainContainer:{
    justifyContent:'center',
    paddingVertical:16,
    alignItems:'center',
    width:'100%',
    alignSelf:'center',
  },
  imageView:{
    height:250,
    width:250,
    backgroundColor:"#efefef",
    borderRadius:16,

  },
  
  pdtbottom:{
    width:'70%',
    flexDirection:'row',
    gap:4,
    alignItems:'center',
    justifyContent:'center',
    marginHorizontal:16,

  },
  levelIndicator: {
    margin:16,
    marginBottom:4,
    height: 16,
    backgroundColor: '#c2c2c2',
    borderRadius: 8,
    overflow:'hidden',
    width:'80%',
    alignSelf:'center'
  },
  levelBar:{
    height:'100%',
    borderRadius: 8,

    
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  history:{
    height:400,
    width:'95%',
    //backgroundColor:'#e3e3e3',
    marginTop:50,
    borderRadius:16,
    elevation:8
  }
})

{/**

<View style={styles.header}>
      <Link href={'/(main)/(vm)/'} asChild>
      <Ionicons name='arrow-back' size={36} />
      </Link>


       </View>
    <View >
      
     
    
    </View>
    */}