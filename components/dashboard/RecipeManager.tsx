"use client";

import { useState } from "react";
import { Flame, Plus, Search, Star, X, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Recipe {
  id: number;
  name: string;
  category: string;
  ingredients: string[];
  notes: string;
  rating: number;
  favorite: boolean;
}

const initialRecipes: Recipe[] = [
  {
    id: 1,
    name: "Lavender Dreams",
    category: "Floral",
    ingredients: ["Lavender", "Vanilla", "Chamomile"],
    notes: "Perfect for relaxation and sleep",
    rating: 5,
    favorite: true,
  },
  {
    id: 2,
    name: "Ocean Breeze",
    category: "Fresh",
    ingredients: ["Sea Salt", "Jasmine", "Driftwood"],
    notes: "Fresh and clean beach scent",
    rating: 4,
    favorite: false,
  },
  {
    id: 3,
    name: "Vanilla Bliss",
    category: "Sweet",
    ingredients: ["French Vanilla", "Tonka Bean", "Cream"],
    notes: "Warm and comforting",
    rating: 5,
    favorite: true,
  },
  {
    id: 4,
    name: "Autumn Spice",
    category: "Seasonal",
    ingredients: ["Cinnamon", "Nutmeg", "Clove", "Orange"],
    notes: "Fall favorite, best seller",
    rating: 5,
    favorite: true,
  },
];

export default function RecipeManager() {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    category: "Floral",
    ingredients: [""],
    notes: "",
    rating: 3,
  });

  const categories = ["Floral", "Fresh", "Sweet", "Woody", "Seasonal", "Fruity", "Spicy"];

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addRecipe = () => {
    if (!newRecipe.name) {
      alert("Please enter a recipe name");
      return;
    }

    const recipe: Recipe = {
      id: Date.now(),
      name: newRecipe.name,
      category: newRecipe.category,
      ingredients: newRecipe.ingredients.filter(i => i.trim() !== ""),
      notes: newRecipe.notes,
      rating: newRecipe.rating,
      favorite: false,
    };

    setRecipes([...recipes, recipe]);
    setNewRecipe({ name: "", category: "Floral", ingredients: [""], notes: "", rating: 3 });
    setShowAddModal(false);
  };

  const deleteRecipe = (id: number) => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      setRecipes(recipes.filter(r => r.id !== id));
    }
  };

  const toggleFavorite = (id: number) => {
    setRecipes(recipes.map(r => r.id === id ? { ...r, favorite: !r.favorite } : r));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <Flame className="w-6 h-6 text-white" />
            </div>
            Recipe Manager
          </h1>
          <p className="text-gray-600 mt-2">Create and manage your candle scent recipes</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Recipe
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search recipes by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 py-6 text-lg border-2"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="text-sm text-purple-700 mb-1">Total Recipes</div>
            <div className="text-3xl font-bold text-purple-900">{recipes.length}</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-50 to-rose-50">
          <CardContent className="p-6">
            <div className="text-sm text-pink-700 mb-1">Favorites</div>
            <div className="text-3xl font-bold text-pink-900">
              {recipes.filter(r => r.favorite).length}
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-amber-50">
          <CardContent className="p-6">
            <div className="text-sm text-orange-700 mb-1">Categories</div>
            <div className="text-3xl font-bold text-orange-900">
              {new Set(recipes.map(r => r.category)).size}
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-amber-50">
          <CardContent className="p-6">
            <div className="text-sm text-yellow-700 mb-1">Avg Rating</div>
            <div className="text-3xl font-bold text-yellow-900">
              {(recipes.reduce((sum, r) => sum + r.rating, 0) / recipes.length).toFixed(1)} ⭐
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <Card key={recipe.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-200">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-1">{recipe.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                      {recipe.category}
                    </span>
                  </CardDescription>
                </div>
                <button
                  onClick={() => toggleFavorite(recipe.id)}
                  className="text-2xl hover:scale-125 transition-transform"
                >
                  {recipe.favorite ? "⭐" : "☆"}
                </button>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-2">Ingredients:</div>
                  <div className="flex flex-wrap gap-2">
                    {recipe.ingredients.map((ing, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">Notes:</div>
                  <p className="text-sm text-gray-600">{recipe.notes || "No notes"}</p>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg">
                      {i < recipe.rating ? "⭐" : "☆"}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteRecipe(recipe.id)}
                    className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Recipe Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-t-2xl relative">
              <h2 className="text-2xl font-bold mb-2">Create New Recipe</h2>
              <p className="text-purple-100">Add a new candle scent formulation</p>
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <Label>Recipe Name *</Label>
                <Input
                  value={newRecipe.name}
                  onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
                  placeholder="e.g., Lavender Dreams"
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Category</Label>
                <select
                  value={newRecipe.category}
                  onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}
                  className="w-full mt-2 p-2 border rounded-lg"
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <Label>Ingredients</Label>
                {newRecipe.ingredients.map((ing, idx) => (
                  <div key={idx} className="flex gap-2 mt-2">
                    <Input
                      value={ing}
                      onChange={(e) => {
                        const newIngs = [...newRecipe.ingredients];
                        newIngs[idx] = e.target.value;
                        setNewRecipe({ ...newRecipe, ingredients: newIngs });
                      }}
                      placeholder="Ingredient name"
                    />
                    {idx === newRecipe.ingredients.length - 1 && (
                      <button
                        onClick={() => setNewRecipe({ ...newRecipe, ingredients: [...newRecipe.ingredients, ""] })}
                        className="px-4 bg-purple-600 text-white rounded-lg"
                      >
                        +
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div>
                <Label>Notes</Label>
                <textarea
                  value={newRecipe.notes}
                  onChange={(e) => setNewRecipe({ ...newRecipe, notes: e.target.value })}
                  className="w-full mt-2 p-2 border rounded-lg"
                  rows={3}
                  placeholder="Special notes about this recipe..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={addRecipe}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg"
                >
                  Create Recipe
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
