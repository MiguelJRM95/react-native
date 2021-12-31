import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  
  const addGoalHandler = goalTitle => {
    //setCourseGoals([...courseGoals, enteredGoal])
    setCourseGoals(currentGoals => [...currentGoals, {key: Math.random().toString(), value: goalTitle}]);
    setIsAddMode(false);
  };

  const removeGoalHandler = goalKey =>{
    setCourseGoals(currentGoals => {
      // filter devuelve un nuevo array filtrado segun los parametros pasados
      return currentGoals.filter((goal) => goal.key !== goalKey);
    });
  }

  const cancelAddGoalHandler = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.container}>
      <Button title='Add New Goal' onPress={() => setIsAddMode(true)}/>
      {/* Ahora GoalInput recibe los datos de la funcion addGoalHandler como una prop */}
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelAddGoalHandler}/>
      <FlatList
        //keyExtractor={(item, index) => item.id} o la propiedad que se necesite para key
        data={courseGoals} 
        renderItem={itemData => <GoalItem id={itemData.item.key} onDelete={removeGoalHandler} itemValue={itemData.item.value} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50
  }
});
