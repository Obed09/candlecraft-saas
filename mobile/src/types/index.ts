export interface Vessel {
  id: number;
  name: string;
  diameter: number;
  height: number;
  unit: 'cm' | 'in';
  volumeOz: number;
}

export interface Recipe {
  id: number;
  name: string;
  category?: string;
  profile?: string;
  ingredients: { [key: string]: number };
  isUserRecipe?: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'wax' | 'fragrance' | 'wick' | 'container' | 'other';
  quantity: number;
  unit: string;
  costPerUnit: number;
  minStock: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export interface Order {
  id: string;
  customerName: string;
  product: string;
  quantity: number;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  date: string;
  dueDate: string;
}

export interface ProductionBatch {
  id: string;
  name: string;
  product: string;
  quantity: number;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo?: string;
}
