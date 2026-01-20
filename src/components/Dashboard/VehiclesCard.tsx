import { MoreHorizontal, TrendingUp } from 'lucide-react';
import { Dropdown } from '../ui/Dropdown';

export const VehiclesCard = () => {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 h-full">
            <div className="flex items-center font-body justify-between mb-4">
                <div>
                    <h4 className="font-semibold text-gray-900">Delivery Vehicles</h4>
                    <p className="text-xs text-gray-500">Vehicles operating on the road</p>
                </div>
                <Dropdown
                    align="right"
                    trigger={
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    }
                    items={[
                        { label: 'Active Vehicles', onClick: () => { } },
                        { label: 'Maintenance', onClick: () => { } },
                    ]}
                />
            </div>

            <div className="flex items-end justify-between">
                <div>
                    <div className="flex items-baseline font-body gap-2">
                        <span className="text-4xl font-bold font-display text-gray-900">89</span>
                        <span className="flex items-center text-emerald-600 text-sm font-medium">
                            +2.29% <TrendingUp className="w-3 h-3 ml-0.5" />
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">than last week</p>
                </div>

                {/* Truck Image Placeholder */}
                <div className="relative">
                    <div className="w-32 h-20 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                        <img src="/src/assets/truck.png" alt="Delivery Truck" className="w-full h-full object-cover transform scale-125" />
                    </div>
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                        On-Route
                    </span>
                </div>
            </div>
        </div>
    );
};
