import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { logAttendance, getAttendanceReport } from './_database-service'; // <-- Import the SQLite services

export default function DashboardScreen() {
  const router = useRouter();
  
  // Using a static registration number matching your profile for local tracking
  const studentReg = "BIT/2024/39544"; 

  /**
   * Action Handler: Checks into a unit session and writes a row to SQLite
   */
  const handleClassCheckIn = (unitCode: string) => {
    try {
      // Execute local transaction writing
      logAttendance(studentReg, unitCode, 'Present');
      
      Alert.alert(
        "Check-In Successful", 
        `Your presence for ${unitCode} has been logged in the local SQLite database container.`
      );
    } catch (error: any) {
      Alert.alert("Database Error", "Failed to record check-in: " + error.message);
    }
  };

  /**
   * Action Handler: Reads historical attendance rows from SQLite and compiles a visual summary report
   */
  const handleViewReport = () => {
    try {
      const records = getAttendanceReport(studentReg);
      
      if (records.length === 0) {
        Alert.alert("Attendance Report", "No persistent database records found. Try checking into a class card first!");
        return;
      }

      // Aggregate and map rows cleanly into readable blocks
      const formattedReport = records
        .map((r, index) => `${index + 1}. ${r.unit_code} - ${r.status}\n   [Logged: ${new Date(r.timestamp).toLocaleString()}]`)
        .join('\n\n');

      Alert.alert(
        "Generated Attendance Report", 
        `Student: ${studentReg}\n\n${formattedReport}`
      );
    } catch (error: any) {
      Alert.alert("Database Error", "Failed to aggregate report details: " + error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        
        {/* Top Header Panel Section */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Student Portal</Text>
          <Text style={styles.regText}>{studentReg}</Text>
        </View>

        {/* Dashboard Operational Actions Grid Menu */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.gridContainer}>
          
          <TouchableOpacity style={styles.reportCard} onPress={handleViewReport}>
            <Text style={styles.cardIcon}>📊</Text>
            <Text style={styles.cardTitle}>View Report</Text>
            <Text style={styles.cardSubtitle}>Generate attendance summaries</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.noticeCard} onPress={() => router.push('/api-consumer')}>
            <Text style={styles.cardIcon}>🔔</Text>
            <Text style={styles.cardTitle}>Live Notices</Text>
            <Text style={styles.cardSubtitle}>Consume remote API streams</Text>
          </TouchableOpacity>

        </View>

        {/* Course Unit Class Check-In Grid Section */}
        <Text style={styles.sectionTitle}>Active Unit Check-In</Text>
        <Text style={styles.instructionText}>Tap a module grid item to log your physical attendance instantly:</Text>
        
        <View style={styles.gridContainer}>
          
          <TouchableOpacity style={styles.unitCard} onPress={() => handleClassCheckIn('BIT4107')}>
            <Text style={styles.unitBadge}>Core</Text>
            <Text style={styles.unitCode}>BIT 4107</Text>
            <Text style={styles.unitName}>Mobile App Dev</Text>
            <Text style={styles.actionText}>👉 Check In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.unitCard} onPress={() => handleClassCheckIn('BIT4101')}>
            <Text style={styles.unitBadge}>Core</Text>
            <Text style={styles.unitCode}>BIT 4101</Text>
            <Text style={styles.unitName}>Software Eng II</Text>
            <Text style={styles.actionText}>👉 Check In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.unitCard} onPress={() => handleClassCheckIn('BIT4103')}>
            <Text style={styles.unitBadge}>Core</Text>
            <Text style={styles.unitCode}>BIT 4103</Text>
            <Text style={styles.unitName}>Computer Graphics</Text>
            <Text style={styles.actionText}>👉 Check In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.unitCard} onPress={() => handleClassCheckIn('BUSS4105')}>
            <Text style={styles.unitBadge}>Elective</Text>
            <Text style={styles.unitCode}>BUSS 4105</Text>
            <Text style={styles.unitName}>Business Continuity</Text>
            <Text style={styles.actionText}>👉 Check In</Text>
          </TouchableOpacity>

        </View>

        {/* System Logout Operational Action */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace('/login')}>
          <Text style={styles.logoutText}>Securely Close Session</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: '#f4f6f9' },
  container: { flex: 1, padding: 20, paddingTop: 40 },
  header: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 24, borderWidth: 1, borderColor: '#e4e7eb', elevation: 1 },
  welcomeText: { fontSize: 22, fontWeight: 'bold', color: '#111' },
  regText: { fontSize: 13, color: '#007AFF', fontWeight: '600', marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 12, marginTop: 8 },
  instructionText: { fontSize: 13, color: '#666', marginBottom: 12 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 16 },
  reportCard: { backgroundColor: '#fff', width: '48%', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#e4e7eb', marginBottom: 16, elevation: 1 },
  noticeCard: { backgroundColor: '#fff', width: '48%', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#e4e7eb', marginBottom: 16, elevation: 1 },
  unitCard: { backgroundColor: '#fff', width: '48%', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#e4e7eb', marginBottom: 16, elevation: 1 },
  cardIcon: { fontSize: 24, marginBottom: 8 },
  cardTitle: { fontSize: 14, fontWeight: 'bold', color: '#111' },
  cardSubtitle: { fontSize: 11, color: '#777', marginTop: 4, lineHeight: 14 },
  unitBadge: { backgroundColor: '#E1F5FE', color: '#0288D1', fontSize: 10, fontWeight: 'bold', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, alignSelf: 'flex-start', marginBottom: 8 },
  unitCode: { fontSize: 15, fontWeight: 'bold', color: '#111' },
  unitName: { fontSize: 12, color: '#555', marginTop: 2, height: 32 },
  actionText: { fontSize: 12, color: '#007AFF', fontWeight: '600', marginTop: 8 },
  logoutButton: { backgroundColor: '#FFEBEE', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 16, borderWidth: 1, borderColor: '#FFCDD2' },
  logoutText: { color: '#C62828', fontSize: 14, fontWeight: 'bold' }
});