import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import CaptureSaleForm from "../components/capture-sale-form";

export default function Index() {
  return (
    <View style={styles.container}>
      <CaptureSaleForm />
      <Link href="/about">Go to About Page</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
