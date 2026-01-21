import { useState } from 'react';
import { Pencil, Trash, MoreHorizontal, ChevronLeft, ChevronRight, Filter, ArrowUpDown, ChevronDown } from 'lucide-react';
import { Dropdown } from '../ui/Dropdown';
import type { Parcel } from '../../types/parcel';

interface ShipmentsTableProps {
    parcels: Parcel[];
    onEdit: (parcel: Parcel) => void;
    onDelete: (id: string) => void;
}

const tabs = ['All Shipments', 'Delivered', 'In transit', 'Pending', 'Processing'];
const statuses = ['Delivered', 'In transit', 'Pending', 'Processing'];

export const ShipmentsTable = ({ parcels, onEdit, onDelete }: ShipmentsTableProps) => {
    const [activeTab, setActiveTab] = useState('All Shipments');

    const getRandomStatus = (id: string) => {
        const index = id.charCodeAt(0) % statuses.length;
        return statuses[index];
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Delivered': return 'text-emerald-600';
            case 'In transit': return 'text-amber-600';
            case 'Pending': return 'text-gray-500';
            case 'Processing': return 'text-blue-600';
            default: return 'text-gray-500';
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold font-display text-gray-900">Shipments Activities</h3>
                        <p className="text-sm text-gray-500">Keep track of recent shipping activity</p>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Tabs */}
                        {/* Mobile Tabs Dropdown */}
                        <div className="md:hidden">
                            <Dropdown
                                className="w-full"
                                trigger={
                                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-sm font-medium text-gray-900">
                                        <span>{activeTab}</span>
                                        <ChevronDown className="w-4 h-4" />
                                    </button>
                                }
                                items={tabs.map(tab => ({
                                    label: tab,
                                    onClick: () => setActiveTab(tab)
                                }))}
                            />
                        </div>

                        {/* Desktop Tabs */}
                        <div className="hidden md:flex items-center font-body bg-gray-100 rounded-xl p-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 font-body py-2 text-sm font-medium font-body rounded-lg transition-colors ${activeTab === tab
                                        ? 'bg-gray-900 text-white shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Filter */}
                        <Dropdown
                            align="right"
                            trigger={
                                <button className="p-2.5 hover:bg-gray-100 rounded-xl border border-gray-200 text-gray-500">
                                    <Filter className="w-4 h-4" />
                                </button>
                            }
                            items={[
                                { label: 'Date', onClick: () => { } },
                                { label: 'Status', onClick: () => { } },
                                { label: 'Price', onClick: () => { } },
                            ]}
                        />

                        {/* Pagination */}
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                            <span>1-10 of {parcels.length}</span>
                            <button className="p-1 hover:bg-gray-100 rounded"><ChevronLeft className="w-4 h-4" /></button>
                            <button className="p-1 hover:bg-gray-100 rounded"><ChevronRight className="w-4 h-4" /></button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                            <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                                <div className="flex items-center gap-1">Order ID <ArrowUpDown className="w-3 h-3" /></div>
                            </th>
                            <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                                <div className="flex items-center gap-1">Category <ArrowUpDown className="w-3 h-3" /></div>
                            </th>
                            <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                                <div className="flex items-center gap-1">Company <ArrowUpDown className="w-3 h-3" /></div>
                            </th>
                            <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                                <div className="flex items-center gap-1">Arrival time <ArrowUpDown className="w-3 h-3" /></div>
                            </th>
                            <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                                <div className="flex items-center gap-1">Route <ArrowUpDown className="w-3 h-3" /></div>
                            </th>
                            <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                                <div className="flex items-center gap-1">Price <ArrowUpDown className="w-3 h-3" /></div>
                            </th>
                            <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                                <div className="flex items-center gap-1">Status <ArrowUpDown className="w-3 h-3" /></div>
                            </th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {parcels.filter(parcel => {
                            if (activeTab === 'All Shipments') return true;
                            // Since we are mocking statuses based on ID for now, we need to regenerate consistency or filtered based on the same logic.
                            // However, ideally the parcel object should have a status. 
                            // For this step, I will use the getRandomStatus logic to check equality.
                            const status = getRandomStatus(parcel.id);
                            return status === activeTab;
                        }).slice(0, 10).map((parcel) => {
                            const status = getRandomStatus(parcel.id);
                            return (
                                <tr key={parcel.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                                            <span className="font-mono text-gray-600">#{parcel.id.slice(0, 8)}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{parcel.name.split(' ')[0]}</td>
                                    <td className="px-6 py-4 text-gray-900 font-medium">{parcel.name}</td>
                                    <td className="px-6 py-4 text-gray-600">24 Jan, 2026</td>
                                    <td className="px-6 py-4 text-gray-600">Lagos - Abuja</td>
                                    <td className="px-6 py-4 text-gray-900 font-medium">${(parcel.weight * 100).toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`font-medium ${getStatusColor(status)}`}>{status}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => onEdit(parcel)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600">
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => onDelete(parcel.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600">
                                                <Trash className="w-4 h-4" />
                                            </button>
                                            <Dropdown
                                                align="right"
                                                trigger={
                                                    <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </button>
                                                }
                                                items={[
                                                    { label: 'View Details', onClick: () => onEdit(parcel) },
                                                    { label: 'Delete', onClick: () => onDelete(parcel.id), danger: true },
                                                ]}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
