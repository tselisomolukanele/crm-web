import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import CaptureSaleForm from "../components/capture-sale-form";

export default function Index() {
  return (
    <View style={styles.container}>
      <CaptureSaleForm />
      <Link href="/about" style={styles.button}>Go to About Page</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c8d8ebff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#040404ff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});