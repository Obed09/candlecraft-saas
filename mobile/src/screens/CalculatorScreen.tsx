import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const vessels = [
  { id: 100, name: '4 oz Tin', diameter: 6.35, height: 3.81, unit: 'cm', volumeOz: 4 },
  { id: 101, name: '8 oz Mason Jar', diameter: 7, height: 9, unit: 'cm', volumeOz: 8 },
  { id: 102, name: '16 oz Apothecary', diameter: 8.5, height: 12, unit: 'cm', volumeOz: 16 },
  { id: 103, name: '12 oz Tumbler', diameter: 7.5, height: 10.5, unit: 'cm', volumeOz: 12 },
  { id: 104, name: '20 oz XL Container', diameter: 10, height: 12, unit: 'cm', volumeOz: 20 },
  { id: 105, name: '6 oz Travel Tin', diameter: 7, height: 4.5, unit: 'cm', volumeOz: 6 },
];

export default function CalculatorScreen() {
  const [selectedVessel, setSelectedVessel] = useState(vessels[0]);
  const [waxDensity, setWaxDensity] = useState('0.86');
  const [fraganceLoad, setFragranceLoad] = useState('10');
  const [wickCost, setWickCost] = useState('0.50');
  const [containerCost, setContainerCost] = useState('2.00');
  const [waxCostPerLb, setWaxCostPerLb] = useState('5.00');
  const [fragranceCostPerOz, setFragranceCostPerOz] = useState('1.50');

  const calculateResults = () => {
    const volume = selectedVessel.volumeOz * 29.5735; // Convert oz to mL
    const waxWeight = (volume * parseFloat(waxDensity)) / 28.3495; // Convert to oz
    const fragranceWeight = (waxWeight * parseFloat(fraganceLoad)) / 100;
    const totalWeight = waxWeight + fragranceWeight;

    const waxCost = (waxWeight / 16) * parseFloat(waxCostPerLb);
    const fragranceCost = fragranceWeight * parseFloat(fragranceCostPerOz);
    const totalCost =
      waxCost + fragranceCost + parseFloat(wickCost) + parseFloat(containerCost);

    return {
      waxWeight: waxWeight.toFixed(2),
      fragranceWeight: fragranceWeight.toFixed(2),
      totalWeight: totalWeight.toFixed(2),
      waxCost: waxCost.toFixed(2),
      fragranceCost: fragranceCost.toFixed(2),
      totalCost: totalCost.toFixed(2),
    };
  };

  const results = calculateResults();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Vessel Selection</Text>
        <Picker
          selectedValue={selectedVessel.id}
          onValueChange={(itemValue) => {
            const vessel = vessels.find((v) => v.id === itemValue);
            if (vessel) setSelectedVessel(vessel);
          }}
          style={styles.picker}
        >
          {vessels.map((vessel) => (
            <Picker.Item
              key={vessel.id}
              label={`${vessel.name} (${vessel.volumeOz} oz)`}
              value={vessel.id}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Wax Settings</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Wax Density (g/mL)</Text>
          <TextInput
            style={styles.input}
            value={waxDensity}
            onChangeText={setWaxDensity}
            keyboardType="decimal-pad"
            placeholder="0.86"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Fragrance Load (%)</Text>
          <TextInput
            style={styles.input}
            value={fraganceLoad}
            onChangeText={setFragranceLoad}
            keyboardType="decimal-pad"
            placeholder="10"
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Cost Settings</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Wax Cost ($/lb)</Text>
          <TextInput
            style={styles.input}
            value={waxCostPerLb}
            onChangeText={setWaxCostPerLb}
            keyboardType="decimal-pad"
            placeholder="5.00"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Fragrance Cost ($/oz)</Text>
          <TextInput
            style={styles.input}
            value={fragranceCostPerOz}
            onChangeText={setFragranceCostPerOz}
            keyboardType="decimal-pad"
            placeholder="1.50"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Wick Cost ($)</Text>
          <TextInput
            style={styles.input}
            value={wickCost}
            onChangeText={setWickCost}
            keyboardType="decimal-pad"
            placeholder="0.50"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Container Cost ($)</Text>
          <TextInput
            style={styles.input}
            value={containerCost}
            onChangeText={setContainerCost}
            keyboardType="decimal-pad"
            placeholder="2.00"
          />
        </View>
      </View>

      <View style={[styles.card, styles.resultsCard]}>
        <Text style={styles.resultsTitle}>📊 Results</Text>
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Wax Needed:</Text>
          <Text style={styles.resultValue}>{results.waxWeight} oz</Text>
        </View>
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Fragrance Needed:</Text>
          <Text style={styles.resultValue}>{results.fragranceWeight} oz</Text>
        </View>
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Total Weight:</Text>
          <Text style={styles.resultValue}>{results.totalWeight} oz</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Wax Cost:</Text>
          <Text style={styles.resultValue}>${results.waxCost}</Text>
        </View>
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Fragrance Cost:</Text>
          <Text style={styles.resultValue}>${results.fragranceCost}</Text>
        </View>
        <View style={[styles.resultRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total Cost:</Text>
          <Text style={styles.totalValue}>${results.totalCost}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => Alert.alert('Success', 'Calculation saved!')}
      >
        <Text style={styles.saveButtonText}>💾 Save Calculation</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9fafb',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
  },
  resultsCard: {
    backgroundColor: '#ede9fe',
    borderColor: '#9333ea',
    borderWidth: 2,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9333ea',
    marginBottom: 16,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  resultLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  resultValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  divider: {
    height: 1,
    backgroundColor: '#d1d5db',
    marginVertical: 12,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 2,
    borderTopColor: '#9333ea',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9333ea',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9333ea',
  },
  saveButton: {
    backgroundColor: '#9333ea',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
