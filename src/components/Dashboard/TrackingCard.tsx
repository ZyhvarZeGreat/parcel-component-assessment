import { MoreHorizontal, MapPin, Phone, MessageCircle } from 'lucide-react';
import { Dropdown } from '../ui/Dropdown';

export const TrackingCard = () => {
    return (
        <div className="bg-white font-body rounded-2xl border border-gray-100 p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h4 className="font-semibold text-gray-900">Tracking Delivery</h4>
                    <p className="text-xs text-gray-500 ">Last viewed delivery history</p>
                </div>
                <Dropdown
                    align="right"
                    trigger={
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    }
                    items={[
                        { label: 'View Details', onClick: () => { } },
                        { label: 'Share Tracking', onClick: () => { } },
                    ]}
                />
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-24 bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 to-blue-100/50"></div>
                <MapPin className="w-6 h-6 text-red-500 relative z-10" />
            </div>

            {/* Tracking ID */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-xs text-gray-500">Tracking ID</p>
                    <p className="font-mono font-semibold text-gray-900">#172989-72-727bjk</p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                    In transit
                </span>
            </div>

            {/* Timeline */}
            <div className="flex-1 space-y-3 border-l-2 border-gray-100 pl-4 ml-2">
                <TimelineItem date="11 Dec 2023" status="Checking" time="10:23 AM" active />
                <TimelineItem date="12 Dec 2023" status="In transit" time="10:23 AM" />
                <TimelineItem date="13 Dec 2023" status="Delivered" time="--:--" />
            </div>

            {/* Courier */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        <img src="https://i.pravatar.cc/40?img=33" alt="Courier" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Courier</p>
                        <p className="font-semibold text-gray-900 text-sm">Adam Schleifer</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400"><MessageCircle className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400"><Phone className="w-4 h-4" /></button>
                </div>
            </div>
        </div>
    );
};

const TimelineItem = ({ date, status, time, active }: { date: string; status: string; time: string; active?: boolean }) => (
    <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 relative">
            <div className={`w-2.5 h-2.5 rounded-full mt-1.5 -ml-[21px] border-2 ${active ? 'bg-emerald-500 border-emerald-200' : 'bg-gray-300 border-gray-100'}`}></div>
            <div>
                <p className="text-xs text-gray-400">{date}</p>
                <p className={`text-sm font-medium ${active ? 'text-emerald-600' : 'text-gray-600'}`}>{status}</p>
            </div>
        </div>
        <span className="text-xs text-gray-400">{time}</span>
    </div>
);
