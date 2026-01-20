import { useEffect } from 'react';
import { X, Check, Info } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { parcelSchema, type ParcelFormData } from '../../types/schema';
import type { Parcel } from '../../types/parcel';

interface ParcelFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Omit<Parcel, 'id'>) => void;
    initialData?: Parcel | null;
}

export const ParcelForm = ({ isOpen, onClose, onSubmit, initialData }: ParcelFormProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ParcelFormData>({
        resolver: zodResolver(parcelSchema),
        defaultValues: {
            name: '',
            description: '',
            quantity: 1,
            weight: 1.0,
        },
    });

    useEffect(() => {
        if (initialData) {
            reset({
                name: initialData.name,
                description: initialData.description,
                quantity: initialData.quantity,
                weight: initialData.weight,
            });
        } else {
            reset({
                name: '',
                description: '',
                quantity: 1,
                weight: 1.0,
            });
        }
    }, [initialData, isOpen, reset]);

    const onFormSubmit = (data: ParcelFormData) => {
        onSubmit(data);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div onClick={onClose} className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold font-display text-gray-900">
                            {initialData ? 'Edit Shipment' : 'New Shipment'}
                        </h2>
                        <p className="text-sm text-gray-500 mt-0.5 font-body">
                            {initialData ? 'Update shipment details.' : 'Add a new item to the inventory.'}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-5">
                    <div className="space-y-4">
                        {/* Name */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700 font-body">Shipment Name</label>
                            <input
                                {...register('name')}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 outline-none transition-all placeholder:text-gray-400"
                                placeholder="e.g. Electronics Kit"
                            />
                            {errors.name && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <Info className="w-3 h-3" /> {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700 font-body">Description</label>
                            <textarea
                                {...register('description')}
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 outline-none transition-all resize-none placeholder:text-gray-400"
                                placeholder="Brief description of contents..."
                            />
                            {errors.description && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <Info className="w-3 h-3" /> {errors.description.message}
                                </p>
                            )}
                        </div>

                        {/* Quantity + Weight */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700 font-body">Quantity</label>
                                <input
                                    type="number"
                                    {...register('quantity', { valueAsNumber: true })}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 outline-none transition-all"
                                />
                                {errors.quantity && (
                                    <p className="text-xs text-red-500 flex items-center gap-1">
                                        <Info className="w-3 h-3" /> {errors.quantity.message}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700 font-body">Weight (kg)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    {...register('weight', { valueAsNumber: true })}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 outline-none transition-all"
                                />
                                {errors.weight && (
                                    <p className="text-xs text-red-500 flex items-center gap-1">
                                        <Info className="w-3 h-3" /> {errors.weight.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-5 py-2.5 text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-colors flex items-center gap-2"
                        >
                            <Check className="w-4 h-4" />
                            {initialData ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
