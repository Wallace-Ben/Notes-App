import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [listOfGoals, setListOfGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(goalText) {
    setListOfGoals((prevList) => [
      ...prevList,
      { key: uuidv4(), text: goalText },
    ]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    setListOfGoals((prevList) => {
      return prevList.filter((goal) => goal.key !== id);
    });
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#5e0acc"
          onPress={startAddGoalHandler}
        />
        <GoalInput
          addGoal={addGoalHandler}
          visible={modalIsVisible}
          removeModal={endAddGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={listOfGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  onDeleteItem={deleteGoalHandler}
                  id={itemData.item.key}
                />
              );
            }}
          ></FlatList>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
    paddingTop: 6,
  },
});
