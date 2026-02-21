import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthBoundary } from '../components/AuthBoundary';

export default function TabLayout() {
  return (
    <AuthBoundary>
      <Tabs
        screenOptions={{
          headerShadowVisible: false
        }}
      >
        <Tabs.Screen 
          name="index" 
          options={{ 
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons 
              name={ focused ? 'home-sharp' : 'home-outline'} 
              color={ color }
              size={ 24 }/>
            ),
          }} />
        <Tabs.Screen 
          name="about" 
          options={{ 
            title: 'About', 
            tabBarIcon: ({ color, focused }) => (
              <Ionicons 
              name={ focused ? 'information-circle-sharp' : 'information-circle-outline'} 
              color={ color }
              size={ 24 }/>
            ),
          }} />
      </Tabs>
    </AuthBoundary>
  );
}
