import React, { Component } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ScrollView 
} from 'react-native';

// Object-Oriented Event Logger Class
class EventLogger {
  static log(eventType: string, description: string): void {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] [LOG - ${eventType.toUpperCase()}]: ${description}`);
  }
}

// Object-Oriented Input Validation Class
class InputValidator {
  validateRegNo(value: string): { isValid: boolean; errorMsg: string } {
    if (!value || value.trim().length < 3) {
      const error = "Registration number entry is too short.";
      EventLogger.log("validation_error", error);
      return { isValid: false, errorMsg: error };
    }
    return { isValid: true, errorMsg: "" };
  }
}

// Defining TypeScript Interfaces for State
interface ComponentState {
  inputBuffer: string;
}

export default class EventHandling extends Component<{}, ComponentState> {
  private validator: InputValidator;

  constructor(props: {}) {
    super(props);
    this.state = {
      inputBuffer: '',
    };
    this.validator = new InputValidator();
    EventLogger.log("component_init", "Week 8 Class-Based Event View Controller initialized.");
  }

  // Text Input Change Handler
  handleInputChange = (text: string): void => {
    this.setState({ inputBuffer: text });
    EventLogger.log("input_buffer_append", `Character buffer updated to: ${text}`);
  };

  // Button Form Submission Handler
  handleFormSubmit = (): void => {
    EventLogger.log("keypress_detected", "User triggered 'Submit' event action.");
    const validation = this.validator.validateRegNo(this.state.inputBuffer);
    
    if (validation.isValid) {
      EventLogger.log("form_submit_success", `Payload validated and saved: ${this.state.inputBuffer}`);
      Alert.alert("Success", `Identity verification record '${this.state.inputBuffer}' committed.`);
    } else {
      Alert.alert("Validation Error", validation.errorMsg);
    }
  };

  // Single Tap Gesture Handler
  handleCardTap = (unitCode: string): void => {
    EventLogger.log("gesture_tap", `Single tap gesture registered on card: ${unitCode}`);
    Alert.alert("Tap Gesture", `Selected unit card: ${unitCode}`);
  };

  // Long Press Gesture Handler
  handleCardLongPress = (unitCode: string): void => {
    EventLogger.log("gesture_long_press", `Sustained hold threshold reached for: ${unitCode}`);
    Alert.alert("Long Press Gesture", `Displaying special contextual action log matrix for ${unitCode}.`);
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Week 8: Practical Event Handling</Text>
        
        {/* Section 1: Keyboard Input & Interception */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Input Handling & Validation</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Student Reg No (e.g. BIT/2024/...)"
            value={this.state.inputBuffer}
            onChangeText={this.handleInputChange}
          />
          <TouchableOpacity style={styles.button} onPress={this.handleFormSubmit}>
            <Text style={styles.buttonText}>Simulate Submit (Enter Key Action)</Text>
          </TouchableOpacity>
        </View>

        {/* Section 2: Low-Level Touch Gestures */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Touch Gestures (Tap & Long Press)</Text>
          <Text style={styles.hint}>* Tap a card for selection. Long press to open options.</Text>
          
          <TouchableOpacity 
            style={styles.card}
            onPress={() => this.handleCardTap("BIT 4107")}
            onLongPress={() => this.handleCardLongPress("BIT 4107")}
          >
            <Text style={styles.cardText}>BIT 4107 - Mobile App Dev</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card}
            onPress={() => this.handleCardTap("BIT 4101")}
            onLongPress={() => this.handleCardLongPress("BIT 4101")}
          >
            <Text style={styles.cardText}>BIT 4101 - Software Eng II</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f8f9fa', flexGrow: 1 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  section: { marginBottom: 25, backgroundColor: '#fff', padding: 15, borderRadius: 10, elevation: 2 },
  sectionLabel: { fontSize: 16, fontWeight: '600', marginBottom: 10, color: '#444' },
  hint: { fontSize: 12, color: '#666', marginBottom: 10, fontStyle: 'italic' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10, backgroundColor: '#fafafa' },
  button: { backgroundColor: '#007bff', padding: 12, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  card: { padding: 15, backgroundColor: '#e9ecef', borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#dee2e6' },
  cardText: { fontSize: 14, fontWeight: '500', color: '#495057' }
});