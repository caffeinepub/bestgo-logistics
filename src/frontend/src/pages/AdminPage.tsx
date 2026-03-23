import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { MessageSquare, Settings, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Booking, ContactMessage } from "../backend.d";
import PageHeader from "../components/PageHeader";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const STATUS_OPTIONS = [
  "pending",
  "confirmed",
  "inTransit",
  "delivered",
  "cancelled",
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  inTransit: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { actor, isFetching } = useActor();
  const { identity, isInitializing } = useInternetIdentity();
  const [updatingId, setUpdatingId] = useState<bigint | null>(null);

  const { data: isAdmin } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: () => actor?.isCallerAdmin() ?? Promise.resolve(false),
    enabled: !!actor && !isFetching && !!identity,
  });

  useEffect(() => {
    if (!isInitializing && !identity) {
      navigate({ to: "/login" });
    }
    if (!isInitializing && identity && isAdmin === false) {
      navigate({ to: "/dashboard" });
    }
  }, [isInitializing, identity, isAdmin, navigate]);

  const { data: bookings, isLoading: loadingBookings } = useQuery<Booking[]>({
    queryKey: ["allBookings"],
    queryFn: () => actor?.getAllBookings() ?? Promise.resolve([]),
    enabled: !!actor && !isFetching && !!identity,
  });

  const { data: messages, isLoading: loadingMessages } = useQuery<
    ContactMessage[]
  >({
    queryKey: ["allMessages"],
    queryFn: () => actor?.getAllContactMessages() ?? Promise.resolve([]),
    enabled: !!actor && !isFetching && !!identity,
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, status }: { id: bigint; status: string }) => {
      if (!actor) throw new Error("Not ready");
      return actor.updateBookingStatus(id, status);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["allBookings"] });
      toast.success("Status updated!");
    },
    onError: () => toast.error("Failed to update status."),
    onSettled: () => setUpdatingId(null),
  });

  const handleStatusChange = (id: bigint, status: string) => {
    setUpdatingId(id);
    updateMutation.mutate({ id, status });
  };

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
        title="Admin Panel"
        subtitle="Manage bookings and contact messages"
        breadcrumb="Home / Admin"
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="bookings">
            <TabsList className="mb-6">
              <TabsTrigger
                data-ocid="admin.bookings_tab"
                value="bookings"
                className="font-body flex items-center gap-2"
              >
                <Truck className="w-4 h-4" /> Bookings
              </TabsTrigger>
              <TabsTrigger
                data-ocid="admin.messages_tab"
                value="messages"
                className="font-body flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Contact Messages
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bookings">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display">
                    <Settings className="w-5 h-5 text-brand-orange" />
                    All Bookings ({bookings?.length ?? 0})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingBookings ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-12 w-full" />
                      ))}
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-body font-semibold">
                              Tracking ID
                            </TableHead>
                            <TableHead className="font-body font-semibold">
                              Customer
                            </TableHead>
                            <TableHead className="font-body font-semibold">
                              Route
                            </TableHead>
                            <TableHead className="font-body font-semibold">
                              Goods / Weight
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
                          {(bookings ?? []).map((b) => (
                            <TableRow key={b.trackingId}>
                              <TableCell className="font-mono text-xs font-semibold text-brand-navy">
                                {b.trackingId}
                              </TableCell>
                              <TableCell className="font-body text-sm">
                                <div>{b.customerName}</div>
                                <div className="text-xs text-muted-foreground">
                                  {b.phone}
                                </div>
                              </TableCell>
                              <TableCell className="font-body text-sm">
                                {b.pickupLocation} → {b.deliveryLocation}
                              </TableCell>
                              <TableCell className="font-body text-sm">
                                <div>{b.goodsType}</div>
                                <div className="text-xs text-muted-foreground">
                                  {b.weight}
                                </div>
                              </TableCell>
                              <TableCell className="font-body text-sm">
                                {b.preferredDate}
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={b.status}
                                  onValueChange={(v) =>
                                    handleStatusChange(b.id, v)
                                  }
                                  disabled={updatingId === b.id}
                                >
                                  <SelectTrigger className="w-32 h-8 text-xs font-body">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {STATUS_OPTIONS.map((s) => (
                                      <SelectItem
                                        key={s}
                                        value={s}
                                        className="text-xs font-body"
                                      >
                                        <span
                                          className={`px-1.5 py-0.5 rounded text-xs font-semibold ${statusColors[s] ?? ""}`}
                                        >
                                          {s}
                                        </span>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      {(!bookings || bookings.length === 0) && (
                        <p className="text-center py-8 text-muted-foreground font-body text-sm">
                          No bookings found.
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display">
                    <MessageSquare className="w-5 h-5 text-brand-orange" />
                    Contact Messages ({messages?.length ?? 0})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingMessages ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-12 w-full" />
                      ))}
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-body font-semibold">
                              Name
                            </TableHead>
                            <TableHead className="font-body font-semibold">
                              Email
                            </TableHead>
                            <TableHead className="font-body font-semibold">
                              Phone
                            </TableHead>
                            <TableHead className="font-body font-semibold">
                              Message
                            </TableHead>
                            <TableHead className="font-body font-semibold">
                              Received
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {(messages ?? []).map((m) => (
                            <TableRow key={String(m.id)}>
                              <TableCell className="font-body font-semibold text-sm">
                                {m.name}
                              </TableCell>
                              <TableCell className="font-body text-sm">
                                {m.email}
                              </TableCell>
                              <TableCell className="font-body text-sm">
                                {m.phone}
                              </TableCell>
                              <TableCell className="font-body text-sm max-w-xs">
                                <p className="truncate">{m.message}</p>
                              </TableCell>
                              <TableCell className="font-body text-xs text-muted-foreground">
                                {new Date(
                                  Number(m.submittedAt) / 1_000_000,
                                ).toLocaleDateString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      {(!messages || messages.length === 0) && (
                        <p className="text-center py-8 text-muted-foreground font-body text-sm">
                          No messages found.
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
