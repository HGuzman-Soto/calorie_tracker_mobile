import {
  Image,
  StyleSheet,
  Platform,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const weekData = [
    { day: 'Mon', calories: 2000 },
    { day: 'Tue', calories: 3000 },
    { day: 'Wed', calories: 4000 },
    { day: 'Thu', calories: 5000 },
    { day: 'Fri', calories: 6000 },
    { day: 'Sat', calories: 7000 },
    { day: 'Sun', calories: 8000 },
  ];

  const todayCalories = 1800;

  return (
    <SafeAreaView style={styles.container}>
      {/* Top row for 7 days of calorie data */}
      <View style={styles.weekRow}>
        {weekData.map((item) => (
          <View style={styles.dayContainer} key={item.day}>
            <Text style={styles.dayText}>{item.day}</Text>
            <Text style={styles.calText}>{item.calories}</Text>
          </View>
        ))}
      </View>

      {/* The current day's calorie count in the middle */}
      <View style={styles.todayContainer}>
        <Text style={styles.todayCalories}>{todayCalories}</Text>
        <Text style={styles.todayLabel}>calories today</Text>
      </View>

      {/* The big + button at the bottom/center for adding a new entry */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/(tabs)/AddFoodScreen')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>

    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    //   headerImage={
    //     <Image
    //       source={require('@/assets/images/partial-react-logo.png')}
    //       style={styles.reactLogo}
    //     />
    //   }
    // >
    //   <ThemedView style={styles.titleContainer}>
    //     <ThemedText type='title'>Welcome!</ThemedText>
    //     <HelloWave />
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type='subtitle'>Step 1: Try it</ThemedText>
    //     <ThemedText>
    //       Edit{' '}
    //       <ThemedText type='defaultSemiBold'>app/(tabs)/index.tsx</ThemedText>{' '}
    //       to see changes. Press{' '}
    //       <ThemedText type='defaultSemiBold'>
    //         {Platform.select({
    //           ios: 'cmd + d',
    //           android: 'cmd + m',
    //           web: 'F12',
    //         })}
    //       </ThemedText>{' '}
    //       to open developer tools.
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type='subtitle'>Step 2: Explore</ThemedText>
    //     <ThemedText>
    //       Tap the Explore tab to learn more about what's included in this
    //       starter app.
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type='subtitle'>Step 3: Get a fresh start</ThemedText>
    //     <ThemedText>
    //       When you're ready, run{' '}
    //       <ThemedText type='defaultSemiBold'>npm run reset-project</ThemedText>{' '}
    //       to get a fresh <ThemedText type='defaultSemiBold'>app</ThemedText>{' '}
    //       directory. This will move the current{' '}
    //       <ThemedText type='defaultSemiBold'>app</ThemedText> to{' '}
    //       <ThemedText type='defaultSemiBold'>app-example</ThemedText>.
    //     </ThemedText>
    //   </ThemedView>
    // </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 16,
    marginTop: 50,
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayText: {
    fontSize: 16,
    fontWeight: '600',
  },
  calText: {
    fontSize: 14,
    color: '#777',
  },
  todayContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  todayCalories: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  todayLabel: {
    fontSize: 18,
    color: '#777',
  },
  addButton: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  addButtonText: {
    fontSize: 36,
    color: '#fff',
    lineHeight: 40,
  },

  // const styles = StyleSheet.create({
  //   titleContainer: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     gap: 8,
  //   },
  //   stepContainer: {
  //     gap: 8,
  //     marginBottom: 8,
  //   },
  //   reactLogo: {
  //     height: 178,
  //     width: 290,
  //     bottom: 0,
  //     left: 0,
  //     position: 'absolute',
  //   },
});
