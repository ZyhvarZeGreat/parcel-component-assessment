import { useState } from 'react';
import { Toaster, toast } from 'sonner';

// Layout
import { TopNav } from './components/Layout/TopNav';

// Dashboard Components
import { DashboardHeader } from './components/Dashboard/DashboardHeader';
import { QuickStats } from './components/Dashboard/QuickStats';
import { StatsChart } from './components/Dashboard/StatsChart';
import { AnalyticsCard } from './components/Dashboard/AnalyticsCard';
import { VehiclesCard } from './components/Dashboard/VehiclesCard';
import { TrackingCard } from './components/Dashboard/TrackingCard';
import { ShipmentsTable } from './components/Dashboard/ShipmentsTable';

// Parcel Components
import { ParcelForm } from './components/Parcels/ParcelForm';

// Store & Types
import { useParcelStore } from './store/parcelStore';
import type { Parcel } from './types/parcel';

function App() {
  const { parcels, addParcel, updateParcel, deleteParcel, getMetrics } = useParcelStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingParcel, setEditingParcel] = useState<Parcel | null>(null);

  const metrics = getMetrics();
  const userName = "Lincoln Saris";

  const handleCreateClick = () => {
    setEditingParcel(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (parcel: Parcel) => {
    setEditingParcel(parcel);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          deleteParcel(id);
          resolve(true);
        }, 300);
      }),
      {
        loading: 'Deleting...',
        success: 'Shipment deleted',
        error: 'Failed to delete',
      }
    );
  };

  const handleFormSubmit = (data: Omit<Parcel, 'id'>) => {
    if (editingParcel) {
      updateParcel(editingParcel.id, data);
      toast.success('Shipment updated');
    } else {
      addParcel(data);
      toast.success('New shipment added');
    }
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <Toaster position="top-right" richColors theme="light" closeButton />

      {/* Top Navigation */}
      <TopNav userName={userName} />

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-6 lg:px-8 py-8">
        {/* Header */}
        <DashboardHeader userName={userName} onAddNew={handleCreateClick} />

        {/* Quick Stats */}
        <div className="mb-8">
          <QuickStats metrics={metrics} />
        </div>

        {/* Main Grid: Chart + Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left: Stats Chart */}
          <div className="lg:col-span-1">
            <StatsChart />
          </div>

          {/* Middle: Analytics + Vehicles */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <AnalyticsCard totalWeight={metrics.totalWeight} />
            <VehiclesCard />
          </div>

          {/* Right: Tracking */}
          <div className="lg:col-span-1">
            <TrackingCard />
          </div>
        </div>

        {/* Bottom: Shipments Table */}
        <ShipmentsTable
          parcels={parcels}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </main>

      {/* Modal */}
      <ParcelForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingParcel}
      />
    </div>
  );
}

export default App;
