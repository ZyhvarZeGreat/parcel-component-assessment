import { Package, Box, Truck, TrendingUp, TrendingDown } from 'lucide-react';

interface QuickStatsProps {
    metrics: {
        totalCount: number;
        totalWeight: number;
        totalQuantity: number;
    };
}

interface StatCardProps {
    icon: React.ComponentType<{ className?: string }>;
    value: number | string;
    label: string;
    trend: number;
}

const StatCard = ({ icon: Icon, value, label, trend }: StatCardProps) => {
    const isPositive = trend >= 0;
    return (
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                <Icon className="w-5 h-5 text-gray-600" />
            </div>
            <div>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-display text-gray-900">{value}</span>
                    <span className={`flex items-center text-xs font-semibold ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
                        {isPositive ? '+' : ''}{trend}%
                        {isPositive ? <TrendingUp className="w-3 h-3 ml-0.5" /> : <TrendingDown className="w-3 h-3 ml-0.5" />}
                    </span>
                </div>
                <p className="text-sm text-gray-500 font-medium font-body">{label}</p>
            </div>
        </div>
    );
};

export const QuickStats = ({ metrics }: QuickStatsProps) => {
    return (
        <div className="flex flex-wrap items-center gap-8 lg:gap-12 p-1">
            <StatCard icon={Package} value={metrics.totalCount} label="Total Shipments" trend={1.92} />
            <div className="hidden sm:block w-px h-10 bg-gray-200" />
            <StatCard icon={Box} value={metrics.totalQuantity} label="Pending Package" trend={1.89} />
            <div className="hidden sm:block w-px h-10 bg-gray-200" />
            <StatCard icon={Truck} value={Math.round(metrics.totalWeight)} label="Delivery Shipments" trend={-0.98} />
        </div>
    );
};
