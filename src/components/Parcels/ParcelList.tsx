import { Pencil, Trash, MoreHorizontal, Box } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Parcel } from '../../types/parcel';

interface ParcelListProps {
    parcels: Parcel[];
    onEdit: (parcel: Parcel) => void;
    onDelete: (id: string) => void;
}

export const ParcelList = ({ parcels, onEdit, onDelete }: ParcelListProps) => {
    if (parcels.length === 0) {
        return (
            <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/60 p-16 text-center shadow-sm">
                <div className="w-20 h-20 bg-gradient-to-tr from-gray-100 to-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-white">
                    <Box className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-display">No parcels found</h3>
                <p className="text-gray-500 mt-2 max-w-sm mx-auto">Your inventory is currently empty. Add a new shipment to get started.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
                <h3 className="text-xl font-bold font-display text-gray-900">Recent Inventory</h3>
                <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">View All</button>
            </div>

            <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/60 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="px-8 py-6 font-semibold text-gray-400 text-xs uppercase tracking-wider">ID</th>
                                <th className="px-8 py-6 font-semibold text-gray-400 text-xs uppercase tracking-wider">Parcel Name</th>
                                <th className="px-8 py-6 font-semibold text-gray-400 text-xs uppercase tracking-wider">Description</th>
                                <th className="px-8 py-6 font-semibold text-gray-400 text-xs uppercase tracking-wider text-right">Qty</th>
                                <th className="px-8 py-6 font-semibold text-gray-400 text-xs uppercase tracking-wider text-right">Weight</th>
                                <th className="px-8 py-6 font-semibold text-gray-400 text-xs uppercase tracking-wider text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {parcels.map((parcel, index) => (
                                <motion.tr
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 + 0.3 }}
                                    key={parcel.id}
                                    className="group hover:bg-white/80 transition-colors duration-200"
                                >
                                    <td className="px-8 py-6 text-gray-400 font-mono text-xs select-all">#{parcel.id.slice(0, 4)}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg shadow-inner">
                                                📦
                                            </div>
                                            <span className="font-bold text-gray-900">{parcel.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-gray-500 font-medium max-w-xs truncate">{parcel.description}</td>
                                    <td className="px-8 py-6 text-right">
                                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-bold text-xs border border-gray-200">
                                            {parcel.quantity}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right font-medium text-gray-900">{parcel.weight} kg</td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                                            <button
                                                onClick={() => onEdit(parcel)}
                                                className="p-2.5 hover:bg-indigo-50 text-gray-400 hover:text-indigo-600 rounded-xl transition-colors"
                                                title="Edit"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => onDelete(parcel.id)}
                                                className="p-2.5 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-xl transition-colors"
                                                title="Delete"
                                            >
                                                <Trash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
