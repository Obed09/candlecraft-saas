import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { ProductionBatch } from '../types';

const sampleBatches: ProductionBatch[] = [
  {
    id: '1',
    name: 'Batch #147',
    product: 'Lavender Bliss',
    quantity: 50,
    deadline: '2025-12-22',
    priority: 'high',
    status: 'in-progress',
    assignedTo: 'Sarah',
  },
  {
    id: '2',
    name: 'Batch #148',
    product: 'Vanilla Dream',
    quantity: 30,
    deadline: '2025-12-25',
    priority: 'medium',
    status: 'pending',
  },
  {
    id: '3',
    name: 'Batch #146',
    product: 'Holiday Spice',
    quantity: 75,
    deadline: '2025-12-20',
    priority: 'high',
    status: 'completed',
    assignedTo: 'Mike',
  },
  {
    id: '4',
    name: 'Batch #149',
    product: 'Ocean Breeze',
    quantity: 40,
    deadline: '2025-12-28',
    priority: 'low',
    status: 'pending',
  },
];

export default function ProductionScreen() {
  const [batches, setBatches] = useState<ProductionBatch[]>(sampleBatches);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10b981';
      case 'in-progress':
        return '#3b82f6';
      case 'pending':
        return '#6b7280';
      default:
        return '#9ca3af';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return 'checkmark-circle';
      case 'in-progress':
        return 'timer';
      case 'pending':
        return 'time';
      default:
        return 'ellipse';
    }
  };

  const updateBatchStatus = (batchId: string, newStatus: ProductionBatch['status']) => {
    setBatches((prev) =>
      prev.map((batch) => (batch.id === batchId ? { ...batch, status: newStatus } : batch))
    );
    Alert.alert('Success', 'Batch status updated!');
  };

  const renderItem = ({ item }: { item: ProductionBatch }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.batchName}>🔥 {item.name}</Text>
          <Text style={styles.productName}>{item.product}</Text>
        </View>
        <View
          style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}
        >
          <Text style={styles.priorityText}>{item.priority.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.infoGrid}>
        <View style={styles.infoItem}>
          <Ionicons name="cube" size={18} color="#6b7280" />
          <Text style={styles.infoValue}>{item.quantity} units</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="calendar" size={18} color="#6b7280" />
          <Text style={styles.infoValue}>
            {new Date(item.deadline).toLocaleDateString()}
          </Text>
        </View>
        {item.assignedTo && (
          <View style={styles.infoItem}>
            <Ionicons name="person" size={18} color="#6b7280" />
            <Text style={styles.infoValue}>{item.assignedTo}</Text>
          </View>
        )}
      </View>

      <View style={styles.statusSection}>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Ionicons
            name={getStatusIcon(item.status)}
            size={14}
            color="white"
            style={{ marginRight: 4 }}
          />
          <Text style={styles.statusText}>{item.status.replace('-', ' ').toUpperCase()}</Text>
        </View>
      </View>

      {item.status !== 'completed' && (
        <View style={styles.actions}>
          {item.status === 'pending' && (
            <TouchableOpacity
              style={[styles.actionButton, styles.startButton]}
              onPress={() => updateBatchStatus(item.id, 'in-progress')}
            >
              <Ionicons name="play" size={18} color="white" />
              <Text style={styles.actionButtonText}>Start</Text>
            </TouchableOpacity>
          )}
          {item.status === 'in-progress' && (
            <TouchableOpacity
              style={[styles.actionButton, styles.completeButton]}
              onPress={() => updateBatchStatus(item.id, 'completed')}
            >
              <Ionicons name="checkmark" size={18} color="white" />
              <Text style={styles.actionButtonText}>Complete</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.actionButton, styles.detailsButton]}
            onPress={() => Alert.alert('Details', `Details for ${item.name}`)}
          >
            <Ionicons name="information-circle" size={18} color="white" />
            <Text style={styles.actionButtonText}>Details</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const stats = {
    total: batches.length,
    pending: batches.filter((b) => b.status === 'pending').length,
    inProgress: batches.filter((b) => b.status === 'in-progress').length,
    completed: batches.filter((b) => b.status === 'completed').length,
  };

  return (
    <View style={styles.container}>
      <View style={styles.statsBar}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: '#6b7280' }]}>{stats.pending}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: '#3b82f6' }]}>{stats.inProgress}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: '#10b981' }]}>{stats.completed}</Text>
          <Text style={styles.statLabel}>Done</Text>
        </View>
      </View>

      <FlatList
        data={batches}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="flame-outline" size={64} color="#d1d5db" />
            <Text style={styles.emptyText}>No production batches</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => Alert.alert('New Batch', 'Create a new production batch')}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
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
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9333ea',
  },
  statLabel: {
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
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  batchName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  productName: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priorityText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoValue: {
    fontSize: 14,
    color: '#374151',
  },
  statusSection: {
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
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
  startButton: {
    backgroundColor: '#3b82f6',
  },
  completeButton: {
    backgroundColor: '#10b981',
  },
  detailsButton: {
    backgroundColor: '#6b7280',
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
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#9333ea',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
