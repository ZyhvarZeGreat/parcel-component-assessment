import { ChevronDown } from 'lucide-react';
import { Dropdown } from '../ui/Dropdown';

export const StatsChart = () => {
    // Mock data for the bar chart
    const data = [
        { day: 10, shipment: 48, delivery: 32 },
        { day: 11, shipment: 35, delivery: 28 },
        { day: 12, shipment: 42, delivery: 38 },
        { day: 13, shipment: 28, delivery: 22 },
        { day: 14, shipment: 55, delivery: 42 },
        { day: 15, shipment: 38, delivery: 30 },
        { day: 16, shipment: 45, delivery: 35 },
        { day: 17, shipment: 52, delivery: 40 },
        { day: 18, shipment: 60, delivery: 48 },
        { day: 19, shipment: 35, delivery: 28 },
    ];

    const maxValue = 60;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h4 className="font-semibold text-gray-900">Shipments Statistics</h4>
                    <p className="text-xs text-gray-500">Total number of deliveries 72.8K</p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Legend */}
                    <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-gray-900"></span>
                            <span className="text-gray-600">Shipment</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-gray-300"></span>
                            <span className="text-gray-600">Delivery</span>
                        </div>
                    </div>

                    {/* Filter */}
                    <Dropdown
                        align="right"
                        trigger={
                            <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                                Daily <ChevronDown className="w-4 h-4" />
                            </button>
                        }
                        items={[
                            { label: 'Daily', onClick: () => { } },
                            { label: 'Weekly', onClick: () => { } },
                            { label: 'Monthly', onClick: () => { } },
                        ]}
                    />
                </div>
            </div>

            {/* Chart */}
            <div className="flex items-end justify-between h-48 gap-2">
                {/* Y Axis Labels */}
                <div className="flex flex-col justify-between h-full text-xs text-gray-400 pr-2">
                    <span>60%</span>
                    <span>50%</span>
                    <span>40%</span>
                    <span>30%</span>
                    <span>20%</span>
                    <span>10%</span>
                    <span>0%</span>
                </div>

                {/* Bars */}
                <div className="flex-1 flex items-end justify-between gap-1">
                    {data.map((item) => (
                        <div key={item.day} className="flex-1 flex flex-col items-center gap-1">
                            <div className="w-full flex gap-0.5 justify-center items-end h-40">
                                {/* Shipment Bar */}
                                <div
                                    className="w-2.5 bg-gray-900 rounded-t-sm transition-all hover:bg-gray-700"
                                    style={{ height: `${(item.shipment / maxValue) * 100}%` }}
                                ></div>
                                {/* Delivery Bar */}
                                <div
                                    className="w-2.5 bg-gray-300 rounded-t-sm transition-all hover:bg-gray-400"
                                    style={{ height: `${(item.delivery / maxValue) * 100}%` }}
                                ></div>
                            </div>
                            <span className="text-xs text-gray-400">{item.day}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
