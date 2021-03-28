import React from "react";
import {
    StyleSheet,
    FlatList,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Platform,
    Modal,
    StatusBar,
    Image,
    ScrollView    
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";


import { icons, COLORS, SIZES, FONTS } from '../constants'

const DeliverOrder = ({ route, navigation }) => {

  
    const [order, setOrder] = React.useState(null);
    const [currentLocation, setCurrentLocation] = React.useState(null);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [checked, setChecked]= React.useState(true);

    const handleClicked = () => {
        
          setModalVisible(false);
          navigation.navigate("PersonnelHome");
        };
    
    

    React.useEffect(() => {
        let { item, currentLocation } = route.params;

        setOrder(item)
        setCurrentLocation(currentLocation)
        
    })

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row' }}>                
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center'
                    }}
                >
                    <View
                        style={{
                            height: 50,
                            width: "90%",
                            justifyContent: 'center',
                            paddingHorizontal: SIZES.padding * 3,
                            borderBottomRightRadius: SIZES.radius,
                            backgroundColor: COLORS.primary
                        }}
                    >
                        <Text style={{ ...FONTS.h3,color: COLORS.white }}>Order Details</Text>
                    </View>
                    </View>
                    <TouchableOpacity
                    style={{
                        width: 50,
                        paddingTop: SIZES.padding,
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.close}
                        resizeMode="contain"
                        style={{
                            
                            width: 25,
                            height: 25,
                            marginLeft: SIZES.padding,
                            tintColor: COLORS.gray
                        }}
                    />
                </TouchableOpacity>             
            </View>
        )
    }

    function renderOrderInfo() {
         const renderItem = ({ item }) => (
            <View
                style={{ 
                    paddingVertical: 2*SIZES.padding,
                    
                    flex: 1, flexDirection: "column", 
                    width: SIZES.width*0.95,
                    marginLeft: SIZES.width*0.025,
                    height: 100,
                    backgroundColor:COLORS.white ,
                    borderBottomColor: COLORS.black,
                    borderBottomWidth: 1,
                    borderRadius: 20,
                    marginBottom: SIZES.padding,
                    justifyContent:'center'}}
            >
                <View style = {{flexDirection: "row"}}>
                    <Text style = {{paddingLeft:SIZES.padding,width: 0.1*SIZES.width,...FONTS.h3,color: COLORS.black}}>{item.quantity}x</Text>
                    <Text style={{ width: 0.7*SIZES.width,...FONTS.h4,color: COLORS.black }}>{item.name}</Text>
                    <Text style={{width: 0.2*SIZES.width, ...FONTS.h4,color: COLORS.black }}>${(item.price*item.quantity).toFixed(2)}</Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingVertical: SIZES.padding,
                        paddingHorizontal: SIZES.width*0.1
                    }}
                    
                >   
                    <Text style = {{width: SIZES.width,...FONTS.body3,color: COLORS.black}}>{item.additional_info}</Text>
                       
                 </View>   
            
             
            </View>
        )

        return (

            <View>
            <FlatList
                data={order?.order_details}
                keyExtractor={item => `${item.food_id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingBottom: 30
                }}
            />
            </View>
        )
    }

   


    function renderOrder() {
        
        return (
            <View style = {{height: 100,marginTop: SIZES.padding,flexDirection: "row",justifyContent: "space-between"}}>
              <View style = {{justifyContent: 'center'}}>
                  <Text style={{ ...FONTS.body3,color: COLORS.white,paddingHorizontal: SIZES.padding*2 }}>{order?.customer_name}</Text>
                  <Text style={{ ...FONTS.h3,color: COLORS.white,paddingHorizontal: SIZES.padding*2,paddingTop:SIZES.padding }}>{order?.address}</Text>

              </View>
             

              
              <View style = {{alignItems:'center',flexDirection: "row"}}>
                    <Text style={{ ...FONTS.h2,color: COLORS.white, marginRight: SIZES.padding*5 }}>{order?.restaurant}</Text>
                    
               </View>
            </View>
           
        )
    }
    function renderButton() {
        
        return (
            <View >
                <TouchableOpacity
                    style={{
                        height: 60,
                        backgroundColor: COLORS.primary,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => {
                       setModalVisible(true)
                    }
                }
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Deliver</Text>
                </TouchableOpacity>
            </View>
        )
    }
      function renderModeModal() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        handleClicked()
                    }}
                >
                    <View style={{ flex: 1, flexDirection: 'column-reverse'}}>
                        <View
                            style={{
                                
                                height: 400,
                                width: "100%",
                                backgroundColor: COLORS.white,
                                alignItems: 'center'
                            }}
                        >   
                            <View style={{flexDirection:'row', marginTop: 5*SIZES.padding, alignItems: "center"}}>
                                <Image
                                    source={icons.success}
                                    resizeMode="contain"
                                    style={{
                                        height: 60,
                                        width: 60,
                                        tintColor: COLORS.primary
                                    }}
                                />
                                <Text
                                    style={{
                                        color: COLORS.black,
                                        ...FONTS.body1,
                                }}>Delivered!</Text>
                            </View>

                            
                            <Text
                                style={{
                                    color: COLORS.black,
                                    marginVertical: SIZES.padding,
                                    marginLeft: 3*SIZES.padding,
                                    ...FONTS.body2,
                                    width: SIZES.width * 0.9


                            }}>{"Thank you for delivering the order"}</Text>
                            <Text
                                style={{
                                    color: COLORS.black,
                                    marginVertical: SIZES.padding,
                                    marginLeft: 3*SIZES.padding,
                                    ...FONTS.body3,
                                    width: SIZES.width * 0.9


                            }}>{"Does the user have any reusable package to return?"}</Text>

                            <View style={{flex:1, flexDirection:"row", paddingTop:SIZES.padding}}>                          
                                    <TouchableOpacity
                                        style={{
                                            padding: SIZES.padding*2,
                                            margin: SIZES.padding,
                                            backgroundColor: (checked)? COLORS.primary: COLORS.white,
                                            width:"40%",
                                            height:50,
                                            borderRadius:SIZES.radius,
                                            justifyContent:"center",
                                            borderWidth:1
                                        }}
                                        onPress= {()=>{setChecked(true)}}
                                    >
                                        <Text style={{textAlign:"center", ...FONTS.body2}}>Yes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                    style={{
                                        margin: SIZES.padding,
                                        backgroundColor: (!checked)? COLORS.primary: COLORS.white,
                                        width:"40%",
                                        height:50,
                                        borderRadius:SIZES.radius,
                                        justifyContent:"center",
                                        borderWidth:1
                                    }}
                                    onPress= {()=>{setChecked(false)}}>
                                        <Text style={{textAlign:"center", ...FONTS.body2}}>No</Text>
                                    </TouchableOpacity>
                                </View>
                                 
                                <TouchableOpacity
                                    style={{
                                        height: 60,
                                        width: '100%',
                                        backgroundColor: COLORS.primary,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    onPress={() => {
                                        setModalVisible(false);
                                        if(checked)
                                        navigation.navigate("Scan", {modeTag: "Personnel"})
                                        else
                                        navigation.navigate("PersonnelHome")

                                    
                                    }}

                                >
                                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Continue</Text>
                                </TouchableOpacity>
                            

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
     function taxOrder() {

        let total = order?.price;
        return (0.18*total).toFixed(2);
    }
     function reusablePackageFee(){
        if(order?.resuablePackage){
            return (
                <View style={{flexDirection: "row"}}>
                    <Text style={{width:"75%", color: COLORS.white, ...FONTS.body3, textAlign:"left"}}>Reusable Package Fee</Text>  
                    <Text style={{width:"25%",color: COLORS.white, ...FONTS.body3, textAlign: "right"}}>$4.00</Text>   
                </View>
            )
        }
        else{
            <View></View>
        }
    }
     function calculateTotal(){
        let total= (parseFloat(order?.price)+ parseFloat(taxOrder())+ parseFloat(5.00)+ parseFloat(((order?.resuablePackage)? 4.00:0.00)));
        return total.toFixed(2);
    }

    function renderTotal(){
        return(
            <View style={{margin: SIZES.padding * 2}}>
                <View style={{flexDirection: "row"}}>
                    <Text style={{width:"75%", color: COLORS.white, ...FONTS.body3, textAlign:"left"}}>Subtotal</Text>  
                    <Text style={{width:"25%",color: COLORS.white, ...FONTS.body3, textAlign: "right"}}>${order?.price}</Text>   
                </View>
                <View style={{flexDirection: "row"}}>
                    <Text style={{width:"75%", color: COLORS.white, ...FONTS.body3, textAlign:"left"}}>Tax</Text>  
                    <Text style={{width:"25%",color: COLORS.white, ...FONTS.body3, textAlign: "right"}}>${taxOrder()}</Text>   
                </View>
                <View style={{flexDirection: "row"}}>
                    <Text style={{width:"75%", color: COLORS.white, ...FONTS.body3, textAlign:"left"}}>Delivery Fee</Text>  
                    <Text style={{width:"25%",color: COLORS.white, ...FONTS.body3, textAlign: "right"}}>$5.00</Text>   
                </View>
                {reusablePackageFee()}
                <View style={{flexDirection: "row", marginVertical:SIZES.padding}}>
                    <Text style={{width:"75%", color: COLORS.white, ...FONTS.body2, textAlign:"left"}}>Total</Text>  
                    <Text style={{width:"25%",color: COLORS.white, ...FONTS.body2, textAlign: "right"}}>${calculateTotal()}</Text>   
                </View>
            </View>


            
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            <ScrollView>
            {renderOrder()}
            {renderOrderInfo()}
            {<Text style = {{margin: SIZES.padding*2,color: COLORS.white, ...FONTS.body2}}>Payment Mode: {order?.payment_mode}</Text>}
            {renderTotal()}
            </ScrollView>
            {renderButton()}
            {renderModeModal()}
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        marginTop: (Platform.OS==="android")?StatusBar.currentHeight:0
    },
    checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
})

export default DeliverOrder;