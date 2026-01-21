import { ChevronDown, Download, Plus } from 'lucide-react';


interface DashboardHeaderProps {
    userName: string;
    onAddNew: () => void;
}

export const DashboardHeader = ({ userName, onAddNew }: DashboardHeaderProps) => {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            {/* Greeting */}
            <div>
                <p className="text-gray-500 text-sm font-medium font-body">Hello {userName.split(' ')[0]},</p>
                <h1 className="text-4xl font-bold font-display text-gray-900 tracking-tight">
                    {getGreeting()}
                </h1>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
                {/* Timeframe */}
                <button className="flex items-center font-body gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <span className="text-gray-400 text-xs">Timeframe</span>
                    <span className="font-semibold">Jan 2026</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {/* Export */}
                <button className="flex font-body items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4" />
                    Export CSV
                </button>

                {/* Add New */}
                <button
                    onClick={onAddNew}
                    className="flex items-center font-body gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    Add new shipment
                </button>
            </div>
        </div>
    );
};
