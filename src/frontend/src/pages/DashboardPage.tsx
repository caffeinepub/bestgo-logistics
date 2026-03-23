import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Package, Truck } from "lucide-react";
import { useEffect } from "react";
import type { Booking } from "../backend.d";
import PageHeader from "../components/PageHeader";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const statusConfig: Record<
  string,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  pending: { label: "Pending", variant: "secondary" },
  confirmed: { label: "Confirmed", variant: "default" },
  inTransit: { label: "In Transit", variant: "default" },
  delivered: { label: "Delivered", variant: "outline" },
  cancelled: { label: "Cancelled", variant: "destructive" },
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const { actor, isFetching } = useActor();
  const { identity, isInitializing } = useInternetIdentity();

  useEffect(() => {
    if (!isInitializing && !identity) {
      navigate({ to: "/login" });
    }
  }, [isInitializing, identity, navigate]);

  const { data: bookings, isLoading } = useQuery<Booking[]>({
    queryKey: ["myBookings"],
    queryFn: () => actor?.getMyBookings() ?? Promise.resolve([]),
    enabled: !!actor && !isFetching && !!identity,
  });

  const principalStr = identity?.getPrincipal().toString() ?? "";
  const shortPrincipal = principalStr ? `${principalStr.slice(0, 8)}...` : "";

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="My Dashboard"
        subtitle={`Welcome back! ${shortPrincipal}`}
        breadcrumb="Home / Dashboard"
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display">
                <Truck className="w-5 h-5 text-brand-orange" />
                My Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3" data-ocid="dashboard.bookings_table">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : !bookings || bookings.length === 0 ? (
                <div
                  data-ocid="dashboard.empty_state"
                  className="text-center py-12"
                >
                  <Package className="w-14 h-14 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display font-bold text-xl mb-2">
                    No Bookings Yet
                  </h3>
                  <p className="text-muted-foreground font-body text-sm">
                    You haven't made any bookings yet.{" "}
                    <a
                      href="/booking"
                      className="text-brand-orange hover:underline"
                    >
                      Book your first shipment
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <div
                  data-ocid="dashboard.bookings_table"
                  className="overflow-x-auto"
                >
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-body font-semibold">
                          Tracking ID
                        </TableHead>
                        <TableHead className="font-body font-semibold">
                          Route
                        </TableHead>
                        <TableHead className="font-body font-semibold">
                          Goods
                        </TableHead>
                        <TableHead className="font-body font-semibold">
                          Date
                        </TableHead>
                        <TableHead className="font-body font-semibold">
                          Status
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking) => {
                        const sc = statusConfig[booking.status] ?? {
                          label: booking.status,
                          variant: "outline" as const,
                        };
                        return (
                          <TableRow key={booking.trackingId}>
                            <TableCell className="font-body font-mono text-sm text-brand-navy font-semibold">
                              {booking.trackingId}
                            </TableCell>
                            <TableCell className="font-body text-sm">
                              {booking.pickupLocation} →{" "}
                              {booking.deliveryLocation}
                            </TableCell>
                            <TableCell className="font-body text-sm">
                              {booking.goodsType}
                            </TableCell>
                            <TableCell className="font-body text-sm">
                              {booking.preferredDate}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={sc.variant}
                                className="font-body text-xs"
                              >
                                {sc.label}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
