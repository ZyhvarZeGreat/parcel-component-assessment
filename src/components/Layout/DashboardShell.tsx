import React from 'react';
import { LayoutDashboard, Package, Settings, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardShellProps {
    children: React.ReactNode;
}

export const DashboardShell = ({ children }: DashboardShellProps) => {
    return (
        <div className="min-h-screen bg-[#FDFDFD] text-gray-900 overflow-x-hidden relative selection:bg-indigo-500/30 font-body">
            {/* Exotic Background Mesh (Subtle Light) */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-[-30%] right-[-10%] w-[70%] h-[70%] bg-gradient-to-br from-purple-200/40 to-blue-200/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-tr from-indigo-200/40 to-pink-200/40 rounded-full blur-[100px]" />
            </div>

            <div className="flex relative z-10 min-h-screen">
                {/* Floating Sidebar */}
                <motion.aside
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-20 lg:w-72 fixed h-[calc(100vh-2rem)] top-4 left-4 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex flex-col items-center lg:items-stretch py-8 hidden md:flex z-50"
                >
                    <div className="px-8 mb-12 flex items-center justify-center lg:justify-start gap-4">
                        <div className="bg-gray-900 p-2.5 rounded-xl shadow-lg shadow-gray-900/20">
                            <Package className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold font-display tracking-tight hidden lg:block text-gray-900">
                            LogiTrack
                        </span>
                    </div>

                    <nav className="flex-1 space-y-2 px-4">
                        <NavItem icon={LayoutDashboard} label="Overview" active />
                        <NavItem icon={Package} label="Shipments" />
                        <NavItem icon={Bell} label="Notifications" />
                        <NavItem icon={Settings} label="Settings" />
                    </nav>

                    <div className="px-4 mt-auto">
                        <div className="p-4 rounded-2xl bg-white/50 border border-white/50 flex items-center gap-3 hover:bg-white/80 transition-colors cursor-pointer group shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center border-2 border-white shadow-lg shadow-indigo-500/20 text-white font-bold text-xs">
                                AD
                            </div>
                            <div className="hidden lg:block overflow-hidden">
                                <p className="text-sm font-bold text-gray-900 truncate">Admin User</p>
                                <p className="text-xs text-gray-500 truncate font-medium">Head of Logistics</p>
                            </div>
                        </div>
                    </div>
                </motion.aside>

                {/* Main Content */}
                <main className="flex-1 md:ml-[calc(5rem+1rem)] lg:ml-[calc(18rem+1rem)] p-6 md:p-12 overflow-y-auto">
                    {/* White Header Area */}
                    <header className="flex items-center justify-between mb-12">
                        <div>
                            <h1 className="text-4xl font-bold font-display text-gray-900 tracking-tight">Dashboard</h1>
                            <p className="text-gray-500 mt-2 font-medium">Welcome back to the control center.</p>
                        </div>
                        <div className="flex gap-4">
                            {/* Header actions can go here */}
                        </div>
                    </header>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-7xl mx-auto space-y-10"
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

const NavItem = ({ icon: Icon, label, active }: { icon: any, label: string, active?: boolean }) => (
    <a
        href="#"
        className={`
      flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden font-medium
      ${active
                ? 'text-gray-900 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
                : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
            }
    `}
    >
        <Icon className={`w-5 h-5 relative z-10 ${active ? 'text-indigo-600' : 'group-hover:text-indigo-600 transition-colors'}`} />
        <span className="relative z-10 hidden lg:block">{label}</span>
    </a>
);
