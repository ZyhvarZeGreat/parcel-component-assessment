import { useState, useEffect } from 'react';
import type { Parcel } from '../types/parcel';

const STORAGE_KEY = 'parcels-data';

export interface ParcelStore {
    parcels: Parcel[];
    addParcel: (parcel: Omit<Parcel, 'id'>) => void;
    updateParcel: (id: string, updatedParcel: Partial<Parcel>) => void;
    deleteParcel: (id: string) => void;
    getMetrics: () => { totalCount: number; totalWeight: number; totalQuantity: number };
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export const useParcelStore = (): ParcelStore => {
    const [parcels, setParcels] = useState<Parcel[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parcels));
    }, [parcels]);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored || JSON.parse(stored).length === 0) {
            const seedData: Parcel[] = [
                { id: '1', name: 'Quantum Processor Unit', description: 'Prototype quantum core.', quantity: 5, weight: 1.2 },
                { id: '2', name: 'Neural Link Interface', description: 'Brain-computer interface headset.', quantity: 12, weight: 0.4 },
                { id: '3', name: 'Holographic Display Module', description: '8k volumetric display.', quantity: 8, weight: 2.5 },
                { id: '4', name: 'Fusion Battery Cell', description: 'Compact cold fusion power cell.', quantity: 20, weight: 0.8 },
                { id: '5', name: 'Exoskeleton Servo Kit', description: 'High-torque titanium servos.', quantity: 4, weight: 5.5 },
                { id: '6', name: 'Nano-fiber Weave', description: 'Spool of carbon-silicate nano-fiber.', quantity: 50, weight: 0.1 },
                { id: '7', name: 'Zero-G Hydroponics Set', description: 'Automated nutrient delivery system.', quantity: 3, weight: 12.0 },
                { id: '8', name: 'Void-Glass Pane', description: 'Radiation shielding transparent alloy.', quantity: 10, weight: 8.5 },
                { id: '9', name: 'Plasma Cutter Nozzle', description: 'Industrial grade tungsten carbide nozzle.', quantity: 100, weight: 0.05 },
                { id: '10', name: 'Cryogenic Stasis Pod', description: 'Personal stasis unit.', quantity: 1, weight: 150.0 },
            ];
            setParcels(seedData);
        }
    }, []);

    const addParcel = (parcelData: Omit<Parcel, 'id'>) => {
        const newParcel: Parcel = {
            ...parcelData,
            id: crypto.randomUUID(),
        };
        setParcels((prev) => [newParcel, ...prev]);
    };

    const updateParcel = (id: string, updatedParcel: Partial<Parcel>) => {
        setParcels((prev) =>
            prev.map((p) => (p.id === id ? { ...p, ...updatedParcel } : p))
        );
    };

    const deleteParcel = (id: string) => {
        setParcels((prev) => prev.filter((p) => p.id !== id));
    };

    const getMetrics = () => {
        return {
            totalCount: parcels.length,
            totalWeight: parcels.reduce((sum, p) => sum + p.weight, 0),
            totalQuantity: parcels.reduce((sum, p) => sum + p.quantity, 0),
        };
    };

    return { parcels, addParcel, updateParcel, deleteParcel, getMetrics, searchQuery, setSearchQuery };
};
