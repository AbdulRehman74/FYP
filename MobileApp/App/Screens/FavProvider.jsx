import {
  StyleSheet,
  View,
  Pressable,
  // Text,
  TouchableHighlight,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import {
  Button,
  Searchbar,
  Avatar,
  Divider,
  Text,
  Chip,
} from "react-native-paper";
import {
  Ionicons,
} from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, query, orderByChild, equalTo } from "firebase/database";
import { auth } from "../../firebase"; // Make sure this path is correct



const FavProvider = ({ navigation }) => {

  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [userCategory, setUserCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  
  useEffect(() => {
    const db = getDatabase();
    const userId = auth.currentUser.uid;

    const userRef = ref(db, `users/Service Provider/${userId}`);
    onValue(userRef, snapshot => {
      const userData = snapshot.val();
      if (userData && userData.category) {
        setUserCategory(userData.category);
      }
    });

    const tasksRef = query(ref(db, 'PostedTasks'), orderByChild('title'));
    onValue(tasksRef, snapshot => {
      const loadedTasks = [];
      snapshot.forEach(childSnapshot => {
        const task = childSnapshot.val();
        if (task.title === userCategory) {
          loadedTasks.push({ id: childSnapshot.key, ...task });
        }
      });
      setTasks(loadedTasks);
    });

    return () => {};
  }, [userCategory]);



  const filteredTasks = tasks.filter(task => {
    if (selectedStatus === 'All') {
      return true;
    }
    return task.taskStatus === selectedStatus;
  }).filter(task => {
    return task.title.toLowerCase().includes(searchQuery.toLowerCase());
  });



  const getButtonStyle = (isSelected) => ({
    backgroundColor: isSelected ? "rgba(44, 139, 139, 1)" : "rgba(44, 139, 139, 0.75)",
    height: 40, // Adjust the height as needed
    justifyContent: 'center', // Ensure text aligns center vertically
    paddingHorizontal: 6, // Adjust horizontal padding if needed
    marginHorizontal: 5,
  });



  return (
    // {/* <ScrollView> */}
    <View style={styles.container}>
      <View style={styles.navBar}>
        <View style={styles.logo}>
          <Image
            style={styles.img2}
            source={require("../../assets/Logo.png")}
          />
          <Text style={styles.logoText}>
            Work
            <Text style={[styles.logoText, styles.logoText2]}>{" Whiz"}</Text>
          </Text>
        </View>
        <View style={styles.menu}>
          <Pressable
            onPress={() => navigation.navigate("Hamburger1")}
            style={styles.hamburger}
          >
            <FontAwesomeIcon icon={faBars} size={34} color="black" />
          </Pressable>
        </View>
      </View>
      <View style={styles.threButns}>
        <Text style={styles.mainText}>My Tasks</Text>
      </View>
<View style={styles.statusFilterContainer}>
  <Button 
    onPress={() => setSelectedStatus('Posted')}
    style={getButtonStyle(selectedStatus === 'Posted')}
    labelStyle={{ color: selectedStatus === 'Posted' ? 'white' : 'rgba(44, 139, 139, 1)' }} // Text color change if needed
  >
    Posted
  </Button>
  <Button 
    onPress={() => setSelectedStatus('Assigned')}
    style={getButtonStyle(selectedStatus === 'Assigned')}
    labelStyle={{ color: selectedStatus === 'Assigned' ? 'white' : 'rgba(44, 139, 139, 1)' }}
  >
    Assigned
  </Button>
  <Button 
    onPress={() => setSelectedStatus('Completed')}
    style={getButtonStyle(selectedStatus === 'Completed')}
    labelStyle={{ color: selectedStatus === 'Completed' ? 'white' : 'rgba(44, 139, 139, 1)' }}
  >
    Completed
  </Button>
  <Button 
    onPress={() => setSelectedStatus('All')}
    style={getButtonStyle(selectedStatus === 'All')}
    labelStyle={{ color: selectedStatus === 'All' ? 'white' : 'rgba(44, 139, 139, 1)' }}
  >
    All
  </Button>
</View>
      <View style={styles.poster}>
        <Searchbar
          placeholder="Search Tasks"
          value={searchQuery}
          onChangeText={setSearchQuery}
          elevation={5}
          style={{ width: "97%" }}
        />

      </View>
      {/* <View style={styles.bottomNavBar}>
        <Text style={styles.bannerText}>Need Some Service</Text>
      </View> */}
      <View style={styles.servicesSection}>
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.task}>
              <View style={styles.taskImage}>
                <Avatar.Image size={50} source={require("../../assets/user.png")} />
              </View>
              <View style={styles.part2}>
                <View style={styles.aboveText}>
                  <Ionicons name="list" size={24} color="black" />
                  <Text variant="labelLarge">{item.title}</Text>
                </View>
                <Divider bold={true} />
                <View style={styles.lowerText}>
                  <Ionicons name="location" size={24} color="black" />
                  <Text variant="labelLarge">{item.location.address}</Text>
                </View>
              </View>
              <View style={styles.part3}>
                <Pressable
                  onPress={() => navigation.navigate("ViewTaskProvider", { taskId: item.id })}
                  style={styles.buttonOpen}
                >
                  <Text style={styles.buttonOpenTxt}>Open</Text>
                </Pressable>

                <Pressable style={styles.buttonPrice}>
                  <Text style={styles.buttonPriceTxt}>Rs {item.budgetFrom}</Text>
                </Pressable>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 15 }} />} // This adds a 10pt gap between items
        />
      </View>
    </View>
    // {/* </ScrollView> */}
  );
};

export default FavProvider;

const styles = StyleSheet.create({

  img: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  img2: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  logoText: {
    color: "#316B8C",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    fontSize: 35,
    fontStyle: "italic",
    fontWeight: "700",
    lineHeight: 35,
  },
  logoText2: {
    color: "#1E2643",
  },
  hamburger:{

  },
  mainText: {
    color: "#F5F5F5",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    fontSize: 32,
    fontStyle: "italic",
    fontWeight: "700",
    lineHeight: 35,
    textAlign: "center",
  },
  container: {
    flex: 1,
    // borderColor: "violet",
    // borderWidth: 5,
    backgroundColor: "rgb(222, 213, 205)",
  },
  // NavBar Started
  navBar: {
    flex: 0.14,
    // borderColor: "blue",
    // borderWidth: 1,
    flexDirection: "row",
    // backgroundColor: "#B1ABAB",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    flex: 0.8,
    // borderColor: "red",
    // borderWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    gap:55,
    marginLeft:10
  },
  menu: {
    flex: 0.2,
    // borderColor: "yellow",
    // borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "blue",
  },
  part3: {
    flex: 0.26,
    // borderColor: "red",
    // borderWidth: 1,
    // backgroundColor: "orange",
    justifyContent: 'center',
    alignItems: 'center',
    gap: 1.5,

  },
  statusFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    
  },
  buttonPrice: {
    marginVertical: 1,
    backgroundColor: "#D9D9D9",
    width: 80,
    height: 33,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    // elevation: 3,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
  },
  buttonPriceTxt: {
    color: '#0F2E48',
    textAlign: "center",
    fontSize: 15,
    fontWeight: "700",
  },
  buttonOpen: {
    // marginBottom: 1,
    backgroundColor: "rgba(44, 139, 139, 0.75)",
    width: 80,
    height: 33,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    // elevation: 3,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
  },
  buttonOpenTxt: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
  },
  servicesSection: {
    flex: 0.7,
    gap: 8,
    padding: 8,
    // justifyContent:"space-around"
    // borderColor: "orange",
    // borderWidth: 1,
    // backgroundColor: "blue",
  },
  aboveText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  lowerText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  task: {
    // flex: 0.3,
    // backgroundColor: "#eaeaea",
    // borderColor: "black",
    // borderWidth: 1,
    backgroundColor: "white",
    flexDirection: "row",
    // justifyContent:'space-around',

    alignItems: "center",
    padding: 7,
    borderRadius: 10,
    // flexWrap: "wrap",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  taskImage: {
    flex: 0.16,
    // borderColor: "red",
    // borderWidth: 2,
    // backgroundColor: "green",
  },
  part2: {
    flex: 0.58,
    // borderColor: "red",
    // borderWidth: 1,
    // backgroundColor: "yellow",
    gap: 7,
  },
  gridContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "#fff",
    gap: 10,
  },
  gridItem: {
    width: "21%",
    height: "19%",
    // padding: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gridItemText: {
    color: "#555",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
  bannerText: {
    color: "#555",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    fontSize: 32,
    fontStyle: "italic",
    fontWeight: "700",
    lineHeight: 35,
    textAlign: "center",
  },
 
  mainText: {
    color: "#F5F5F5",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    fontSize: 32,
    fontStyle: "italic",
    fontWeight: "700",
    lineHeight: 45,
    textAlign: "center",
    borderRadius: 100,
    width: "97%",
    backgroundColor: "rgba(44, 139, 139, 1)",
  },
  
  // NavBar Ended
  threButns: {
    // flex: 0.09,
    // borderColor: "red",
    // borderWidth: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  poster: {
    flex: 0.11,
    // borderColor: "green",
    // borderWidth: 1,
    // backgroundColor: "yellow",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  bottomNavBar: {
    flex: 0.1,
    borderColor: "purple",
    borderWidth: 3,
    backgroundColor: "pink",
  },
});
