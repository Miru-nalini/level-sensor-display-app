import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { router } from "expo-router";
import { View } from "react-native";

export default function CustomDrawerContent(props:any) {
    return(
        <View style={{flex:1}}>
            
        <DrawerContentScrollView{...props}
        scrollEnabled
        contentContainerStyle={{backgroundColor:'#dde3ff'}}
        >
        <DrawerItemList{...props}/>
        <DrawerItem label={"Logout"} onPress={()=>router.replace('/')}/>
        </DrawerContentScrollView>
        </View>
    )
}