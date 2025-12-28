// Vessel data management for local storage

export interface VesselStyle {
  id: string;
  name: string;
  description?: string;
  capacity: number;
  unit: 'ml' | 'oz';
  shape: 'cylinder' | 'square' | 'hexagon' | 'custom';
  diameter?: number;
  height?: number;
  width?: number;
  depth?: number;
  cost: number;
  supplier?: string;
  notes?: string;
  imageUrl?: string;
  isVisible?: boolean;
}

const VESSEL_STORAGE_KEY = 'candlecraft_vessel_styles';

export function getVesselData(): VesselStyle[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(VESSEL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading vessel data:', error);
    return [];
  }
}

// Alias for backwards compatibility
export const getVessels = getVesselData;

export function saveVesselData(vessels: VesselStyle[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(VESSEL_STORAGE_KEY, JSON.stringify(vessels));
  } catch (error) {
    console.error('Error saving vessel data:', error);
  }
}

// Alias for backwards compatibility
export const saveVessels = saveVesselData;

// Vessel images storage
const VESSEL_IMAGES_KEY = 'candlecraft_vessel_images';

export function getVesselImages(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  
  try {
    const data = localStorage.getItem(VESSEL_IMAGES_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error loading vessel images:', error);
    return {};
  }
}

export function saveVesselImages(images: Record<string, string>): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(VESSEL_IMAGES_KEY, JSON.stringify(images));
  } catch (error) {
    console.error('Error saving vessel images:', error);
  }
}

export function exportVesselData(): string {
  const vessels = getVesselData();
  const images = getVesselImages();
  return JSON.stringify({ vessels, images }, null, 2);
}

export function addVessel(vessel: Omit<VesselStyle, 'id'>): VesselStyle {
  const vessels = getVesselData();
  const newVessel: VesselStyle = {
    ...vessel,
    id: `vessel-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  };
  
  vessels.push(newVessel);
  saveVesselData(vessels);
  return newVessel;
}

export function updateVessel(id: string, updates: Partial<VesselStyle>): void {
  const vessels = getVesselData();
  const index = vessels.findIndex(v => v.id === id);
  
  if (index !== -1) {
    vessels[index] = { ...vessels[index], ...updates };
    saveVesselData(vessels);
  }
}

export function deleteVessel(id: string): void {
  const vessels = getVesselData();
  const filtered = vessels.filter(v => v.id !== id);
  saveVesselData(filtered);
}

export function importVesselData(data: VesselStyle[]): void {
  saveVesselData(data);
}

export function clearVesselData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(VESSEL_STORAGE_KEY);
}
