import { Search, Bell, Package } from 'lucide-react';

interface TopNavProps {
    userName: string;
}

const navItems = ['Overview', 'Shipping', 'Tracking', 'Analytics', 'History'];

export const TopNav = ({ userName }: TopNavProps) => {
    return (
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
            {/* Left: Logo + Nav */}
            <div className="flex items-center gap-10">
                {/* Logo */}
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center">
                        <Package className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold font-display tracking-tight">LogiTrack</span>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item, index) => (
                        <a
                            key={item}
                            href="#"
                            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${index === 0
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                        >
                            {item}
                        </a>
                    ))}
                </nav>
            </div>

            {/* Right: Actions + User */}
            <div className="flex font-body items-center gap-4">
                <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900">
                    <Search className="w-5 h-5" />
                </button>
                <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900 relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white"></span>
                </button>

                {/* User */}
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center overflow-hidden">
                        <img
                            src="https://i.pravatar.cc/40?img=12"
                            alt="User"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="hidden lg:block">
                        <p className="text-sm font-semibold text-gray-900">{userName}</p>
                        <p className="text-xs text-gray-500">Head Admin</p>
                    </div>
                </div>
            </div>
        </header>
    );
};
