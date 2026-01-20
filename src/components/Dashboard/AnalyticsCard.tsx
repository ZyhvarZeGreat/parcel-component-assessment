import { MoreHorizontal, TrendingUp } from 'lucide-react';
import { Dropdown } from '../ui/Dropdown';

interface AnalyticsCardProps {
    totalWeight: number;
}

export const AnalyticsCard = ({ totalWeight }: AnalyticsCardProps) => {
    const revenue = totalWeight * 1500; // Mock calculation

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 h-full">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h4 className="font-semibold text-gray-900">Analytics view</h4>
                    <p className="text-xs text-gray-500 font-body">Total shipping revenue overview</p>
                </div>
                <Dropdown
                    align="right"
                    trigger={
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    }
                    items={[
                        { label: 'View Report', onClick: () => { } },
                        { label: 'Export Data', onClick: () => { } },
                    ]}
                />
            </div>

            <div className="flex flex-col font-body items-center justify-center py-8">
                <p className="text-3xl font-bold font-display text-gray-900">
                    $ {revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
                <div className="flex items-center gap-1 mt-2 text-emerald-600 text-sm font-medium">
                    <span>+2.62%</span>
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-gray-400 ml-1">than last week</span>
                </div>
            </div>
        </div>
    );
};
