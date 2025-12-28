import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { InventoryItem } from '../types';

const sampleInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Soy Wax',
    category: 'wax',
    quantity: 50,
    unit: 'lbs',
    costPerUnit: 5.0,
    minStock: 20,
    status: 'in-stock',
  },
  {
    id: '2',
    name: 'Lavender Fragrance Oil',
    category: 'fragrance',
    quantity: 8,
    unit: 'oz',
    costPerUnit: 1.5,
    minStock: 10,
    status: 'low-stock',
  },
  {
    id: '3',
    name: 'Cotton Wicks (CD-10)',
    category: 'wick',
    quantity: 0,
    unit: 'pcs',
    costPerUnit: 0.5,
    minStock: 50,
    status: 'out-of-stock',
  },
  {
    id: '4',
    name: '8oz Mason Jars',
    category: 'container',
    quantity: 45,
    unit: 'pcs',
    costPerUnit: 2.0,
    minStock: 30,
    status: 'in-stock',
  },
];

export default function InventoryScreen() {
  const [inventory, setInventory] = useState<InventoryItem[]>(sampleInventory);
  const [searchQuery, setSearchQuery] = useState('');

  const handleBarcodeScan = () => {
    Alert.alert(
      'Barcode Scanner',
      'Barcode scanning feature coming soon! This will allow you to quickly scan and add inventory items.'
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock':
        return '#10b981';
      case 'low-stock':
        return '#f59e0b';
      case 'out-of-stock':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'wax':
        return 'flame';
      case 'fragrance':
        return 'flower';
      case 'wick':
        return 'git-commit';
      case 'container':
        return 'cube';
      default:
        return 'ellipse';
    }
  };

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: { item: InventoryItem }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.itemInfo}>
          <Ionicons name={getCategoryIcon(item.category)} size={24} color="#9333ea" />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCategory}>{item.category}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>
            {item.status.replace('-', ' ').toUpperCase()}
          </Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Quantity:</Text>
          <Text style={styles.statValue}>
            {item.quantity} {item.unit}
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Min Stock:</Text>
          <Text style={styles.statValue}>
            {item.minStock} {item.unit}
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Cost/Unit:</Text>
          <Text style={styles.statValue}>${item.costPerUnit.toFixed(2)}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total Value:</Text>
          <Text style={[styles.statValue, styles.totalValue]}>
            ${(item.quantity * item.costPerUnit).toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.updateButton]}
          onPress={() => Alert.alert('Update', `Update stock for ${item.name}`)}
        >
          <Ionicons name="add-circle" size={20} color="white" />
          <Text style={styles.actionButtonText}>Add Stock</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => Alert.alert('Edit', `Edit ${item.name}`)}
        >
          <Ionicons name="create" size={20} color="white" />
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#6b7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search inventory..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.scanButton} onPress={requestCameraPermission}>
          <Ionicons name="barcode" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsBar}>
        <View style={styles.statBox}>
          <Text style={styles.statBoxValue}>{inventory.length}</Text>
          <Text style={styles.statBoxLabel}>Items</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statBoxValue, { color: '#10b981' }]}>
            {inventory.filter((i) => i.status === 'in-stock').length}
          </Text>
          <Text style={styles.statBoxLabel}>In Stock</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statBoxValue, { color: '#f59e0handleBarcodeSca
            {inventory.filter((i) => i.status === 'low-stock').length}
          </Text>
          <Text style={styles.statBoxLabel}>Low</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statBoxValue, { color: '#ef4444' }]}>
            {inventory.filter((i) => i.status === 'out-of-stock').length}
          </Text>
          <Text style={styles.statBoxLabel}>Out</Text>
        </View>
      </View>

      <FlatList
        data={filteredInventory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="cube-outline" size={64} color="#d1d5db" />
            <Text style={styles.emptyText}>No items found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  scanButton: {
    backgroundColor: '#9333ea',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statBoxValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9333ea',
  },
  statBoxLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemDetails: {
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  itemCategory: {
    fontSize: 12,
    color: '#6b7280',
    textTransform: 'capitalize',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardBody: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  totalValue: {
    color: '#9333ea',
    fontSize: 16,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    gap: 6,
  },
  updateButton: {
    backgroundColor: '#10b981',
  },
  editButton: {
    backgroundColor: '#3b82f6',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    color: '#9ca3af',
    marginTop: 12,
  },
  scannerContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  closeScannerButton: {
    position: 'absolute',
    top: 48,
    right: 24,
  },
});
