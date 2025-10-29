import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

class Todo {
  constructor(
    public userId: number, 
    public id: number, 
    public title: string, 
    public completed: boolean
   ) {
  }
}

class DropDownItem {
  constructor(
    public key: string,
    public label: string,
    public value: string
  ) {
  }
}

const CaptureSaleForm = () => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [customers, setCustomers] = useState<DropDownItem[]>([ ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/');
        setCustomers(
          response
          .data
          .map(
            (item: Todo) => new DropDownItem(
              item.id.toString(), 
              item.title, 
              JSON.stringify(item)
            )
          ));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });

  const onSubmit = () => {
    console.log(customer);
  };
  return (
    <View style={styles.container}>
      <Text>Login Form</Text>
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        value={customer}
        setValue={setCustomer}
        items={customers}
        setItems={setCustomers}
        placeholder="Select a fruit"
        listMode="SCROLLVIEW"
        multiple={false}
      />
      <TextInput
        placeholder="Password"
      />
      <Button title="Submit" onPress={onSubmit} />
    </View>
  );
};

export default CaptureSaleForm;