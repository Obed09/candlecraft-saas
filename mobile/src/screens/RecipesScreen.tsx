import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Recipe } from '../types';

const sampleRecipes: Recipe[] = [
  {
    id: 1,
    name: 'Lavender Relaxation',
    category: 'Floral',
    profile: 'Calming',
    ingredients: { Lavender: 70, Vanilla: 20, Chamomile: 10 },
  },
  {
    id: 2,
    name: 'Vanilla Dream',
    category: 'Gourmand',
    profile: 'Sweet',
    ingredients: { Vanilla: 60, 'Warm Caramel': 30, Sandalwood: 10 },
  },
  {
    id: 3,
    name: 'Citrus Burst',
    category: 'Citrus',
    profile: 'Energizing',
    ingredients: { Lemon: 40, Orange: 30, Grapefruit: 30 },
  },
  {
    id: 4,
    name: 'Ocean Breeze',
    category: 'Fresh',
    profile: 'Clean',
    ingredients: { 'Sea Salt': 50, Eucalyptus: 30, Mint: 20 },
  },
  {
    id: 5,
    name: 'Cozy Fireside',
    category: 'Woodsy',
    profile: 'Warm',
    ingredients: { Cedarwood: 40, Amber: 30, Vanilla: 20, Smoke: 10 },
  },
];

export default function RecipesScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>(sampleRecipes);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryColor = (category?: string) => {
    switch (category?.toLowerCase()) {
      case 'floral':
        return '#ec4899';
      case 'citrus':
        return '#f59e0b';
      case 'woodsy':
        return '#92400e';
      case 'fresh':
        return '#06b6d4';
      case 'gourmand':
        return '#a855f7';
      default:
        return '#9333ea';
    }
  };

  const getCategoryIcon = (category?: string) => {
    switch (category?.toLowerCase()) {
      case 'floral':
        return 'flower';
      case 'citrus':
        return 'sunny';
      case 'woodsy':
        return 'leaf';
      case 'fresh':
        return 'water';
      case 'gourmand':
        return 'ice-cream';
      default:
        return 'flask';
    }
  };

  const openRecipeDetails = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const renderItem = ({ item }: { item: Recipe }) => (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: getCategoryColor(item.category) }]}
      onPress={() => openRecipeDetails(item)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.recipeInfo}>
          <Ionicons
            name={getCategoryIcon(item.category)}
            size={24}
            color={getCategoryColor(item.category)}
          />
          <View style={styles.recipeDetails}>
            <Text style={styles.recipeName}>{item.name}</Text>
            <View style={styles.badges}>
              {item.category && (
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: `${getCategoryColor(item.category)}20` },
                  ]}
                >
                  <Text style={[styles.badgeText, { color: getCategoryColor(item.category) }]}>
                    {item.category}
                  </Text>
                </View>
              )}
              {item.profile && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.profile}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      </View>

      <View style={styles.ingredientPreview}>
        <Text style={styles.ingredientLabel}>Ingredients:</Text>
        <Text style={styles.ingredientText} numberOfLines={1}>
          {Object.entries(item.ingredients)
            .map(([name, percent]) => `${name} ${percent}%`)
            .join(', ')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#6b7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search recipes..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.statsBar}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{recipes.length}</Text>
          <Text style={styles.statLabel}>Recipes</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: '#ec4899' }]}>
            {recipes.filter((r) => r.category === 'Floral').length}
          </Text>
          <Text style={styles.statLabel}>Floral</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: '#f59e0b' }]}>
            {recipes.filter((r) => r.category === 'Citrus').length}
          </Text>
          <Text style={styles.statLabel}>Citrus</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: '#92400e' }]}>
            {recipes.filter((r) => r.category === 'Woodsy').length}
          </Text>
          <Text style={styles.statLabel}>Woodsy</Text>
        </View>
      </View>

      <FlatList
        data={filteredRecipes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="flask-outline" size={64} color="#d1d5db" />
            <Text style={styles.emptyText}>No recipes found</Text>
          </View>
        }
      />

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleContainer}>
                <Ionicons
                  name={getCategoryIcon(selectedRecipe?.category)}
                  size={28}
                  color={getCategoryColor(selectedRecipe?.category)}
                />
                <Text style={styles.modalTitle}>{selectedRecipe?.name}</Text>
              </View>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Ionicons name="close-circle" size={32} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.modalBadges}>
                {selectedRecipe?.category && (
                  <View
                    style={[
                      styles.modalBadge,
                      { backgroundColor: getCategoryColor(selectedRecipe.category) },
                    ]}
                  >
                    <Text style={styles.modalBadgeText}>{selectedRecipe.category}</Text>
                  </View>
                )}
                {selectedRecipe?.profile && (
                  <View style={[styles.modalBadge, { backgroundColor: '#9333ea' }]}>
                    <Text style={styles.modalBadgeText}>{selectedRecipe.profile}</Text>
                  </View>
                )}
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>📊 Fragrance Formula</Text>
                {selectedRecipe &&
                  Object.entries(selectedRecipe.ingredients).map(([name, percent]) => (
                    <View key={name} style={styles.ingredientRow}>
                      <View style={styles.ingredientInfo}>
                        <Text style={styles.ingredientName}>{name}</Text>
                        <Text style={styles.ingredientPercent}>{percent}%</Text>
                      </View>
                      <View style={styles.progressBar}>
                        <View
                          style={[
                            styles.progressFill,
                            {
                              width: `${percent}%`,
                              backgroundColor: getCategoryColor(selectedRecipe.category),
                            },
                          ]}
                        />
                      </View>
                    </View>
                  ))}
              </View>

              <TouchableOpacity
                style={styles.useButton}
                onPress={() => {
                  setShowModal(false);
                  // Navigate to calculator with this recipe
                }}
              >
                <Ionicons name="calculator" size={20} color="white" />
                <Text style={styles.useButtonText}>Use in Calculator</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
  },
  searchContainer: {
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
    fontSize: 11,
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
    borderLeftWidth: 4,
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
  recipeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  recipeDetails: {
    marginLeft: 12,
    flex: 1,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6,
  },
  badges: {
    flexDirection: 'row',
    gap: 6,
  },
  badge: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '600',
  },
  ingredientPreview: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  ingredientLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  ingredientText: {
    fontSize: 13,
    color: '#374151',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  modalBody: {
    padding: 20,
  },
  modalBadges: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  modalBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  modalBadgeText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  ingredientRow: {
    marginBottom: 16,
  },
  ingredientInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  ingredientName: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '500',
  },
  ingredientPercent: {
    fontSize: 15,
    color: '#9333ea',
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  useButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9333ea',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  useButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
