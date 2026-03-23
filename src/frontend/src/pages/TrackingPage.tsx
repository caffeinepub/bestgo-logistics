import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Loader2,
  MapPin,
  Package,
  Search,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import PageHeader from "../components/PageHeader";
import { useActor } from "../hooks/useActor";

type ShipmentResult = {
  customerName: string;
  status: string;
  trackingId: string;
  deliveryLocation: string;
  preferredDate: string;
  pickupLocation: string;
};

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  confirmed: {
    label: "Confirmed",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  inTransit: {
    label: "In Transit",
    color: "bg-brand-navy text-white border-brand-navy",
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800 border-red-200",
  },
};

export default function TrackingPage() {
  const { actor, isFetching } = useActor();
  const [trackingId, setTrackingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ShipmentResult | null | undefined>(
    undefined,
  );

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      toast.error("Please enter a tracking ID.");
      return;
    }
    if (!actor || isFetching) {
      toast.error("Backend not ready. Please try again.");
      return;
    }
    setLoading(true);
    try {
      const data = await actor.trackShipment(trackingId.trim());
      setResult(data);
      if (!data) toast.info("No shipment found with this ID.");
    } catch {
      toast.error("Failed to track shipment.");
    } finally {
      setLoading(false);
    }
  };

  const statusInfo = result
    ? (statusConfig[result.status] ?? {
        label: result.status,
        color: "bg-gray-100 text-gray-800",
      })
    : null;

  return (
    <div>
      <PageHeader
        title="Track Your Shipment"
        subtitle="Enter your tracking ID to get real-time shipment status"
        breadcrumb="Home / Tracking"
      />

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Search */}
          <Card className="border-border shadow-md mb-8">
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="flex gap-3">
                <Input
                  data-ocid="tracking.input"
                  placeholder="Enter tracking ID (e.g. BGL-123456)"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="flex-1 font-body"
                />
                <Button
                  type="submit"
                  data-ocid="tracking.submit_button"
                  disabled={loading || isFetching}
                  className="bg-brand-orange hover:bg-brand-orange-dark text-white font-body px-6"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Result */}
          {result !== undefined && result !== null && (
            <Card
              data-ocid="tracking.result_panel"
              className="border-border shadow-md"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs font-body text-muted-foreground uppercase tracking-wider mb-1">
                      Tracking ID
                    </p>
                    <p className="font-display font-bold text-xl text-foreground">
                      {result.trackingId}
                    </p>
                  </div>
                  {statusInfo && (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-body font-semibold border ${statusInfo.color}`}
                    >
                      {statusInfo.label}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-3 p-4 bg-muted/30 rounded-xl">
                    <Truck className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-body text-muted-foreground">
                        Customer
                      </p>
                      <p className="font-body font-semibold text-foreground text-sm">
                        {result.customerName}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 bg-muted/30 rounded-xl">
                    <Calendar className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-body text-muted-foreground">
                        Preferred Date
                      </p>
                      <p className="font-body font-semibold text-foreground text-sm">
                        {result.preferredDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 bg-muted/30 rounded-xl">
                    <MapPin className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-body text-muted-foreground">
                        Pickup
                      </p>
                      <p className="font-body font-semibold text-foreground text-sm">
                        {result.pickupLocation}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 bg-muted/30 rounded-xl">
                    <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-body text-muted-foreground">
                        Delivery
                      </p>
                      <p className="font-body font-semibold text-foreground text-sm">
                        {result.deliveryLocation}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Not Found */}
          {result === null && (
            <Card
              data-ocid="tracking.empty_state"
              className="border-border shadow-md"
            >
              <CardContent className="p-8 text-center">
                <Package className="w-14 h-14 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  No Shipment Found
                </h3>
                <p className="text-muted-foreground font-body text-sm">
                  We couldn't find a shipment with tracking ID{" "}
                  <strong>{trackingId}</strong>. Please check the ID and try
                  again.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
