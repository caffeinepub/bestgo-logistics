import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, Copy, Loader2, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import PageHeader from "../components/PageHeader";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function BookingPage() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  const [loading, setLoading] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pickup: "",
    delivery: "",
    goods: "",
    weight: "",
    date: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || isFetching) {
      toast.error("Backend not ready. Please try again.");
      return;
    }
    if (
      !form.name ||
      !form.phone ||
      !form.pickup ||
      !form.delivery ||
      !form.goods ||
      !form.weight ||
      !form.date
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      let id: string;
      if (identity) {
        id = await actor.submitBookingAsUser(
          form.name,
          form.phone,
          form.pickup,
          form.delivery,
          form.goods,
          form.weight,
          form.date,
        );
      } else {
        id = await actor.submitBooking(
          form.name,
          form.phone,
          form.pickup,
          form.delivery,
          form.goods,
          form.weight,
          form.date,
        );
      }
      setTrackingId(id);
      toast.success("Booking submitted successfully!");
    } catch {
      toast.error("Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyTrackingId = () => {
    navigator.clipboard.writeText(trackingId);
    toast.success("Tracking ID copied!");
  };

  if (trackingId) {
    return (
      <div>
        <PageHeader title="Booking Confirmed" breadcrumb="Home / Booking" />
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-xl">
            <Card
              data-ocid="booking.success_state"
              className="border-green-200 bg-green-50"
            >
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="font-display font-bold text-2xl text-foreground mb-2">
                  Booking Confirmed!
                </h2>
                <p className="text-muted-foreground font-body mb-6">
                  Your transport has been booked successfully. Use the tracking
                  ID below to track your shipment.
                </p>
                <div className="bg-white border-2 border-green-300 rounded-xl p-4 mb-6">
                  <p className="text-xs font-body text-muted-foreground mb-1 uppercase tracking-wider">
                    Your Tracking ID
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <span className="font-display font-bold text-2xl text-brand-navy">
                      {trackingId}
                    </span>
                    <button
                      type="button"
                      onClick={copyTrackingId}
                      className="text-muted-foreground hover:text-brand-orange transition-colors"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <Button
                  onClick={() => setTrackingId("")}
                  variant="outline"
                  className="font-body"
                >
                  Book Another Shipment
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Book Transport / Get a Quote"
        subtitle="Fill in your details and we'll get back to you with the best rates"
        breadcrumb="Home / Booking"
      />

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="border-border shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 font-display">
                <Truck className="w-5 h-5 text-brand-orange" />
                Shipment Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-body font-medium">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      data-ocid="booking.name_input"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-body font-medium">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      data-ocid="booking.phone_input"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="pickup" className="font-body font-medium">
                      Pickup Location *
                    </Label>
                    <Input
                      id="pickup"
                      data-ocid="booking.pickup_input"
                      placeholder="City, State"
                      value={form.pickup}
                      onChange={(e) => handleChange("pickup", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="delivery" className="font-body font-medium">
                      Delivery Location *
                    </Label>
                    <Input
                      id="delivery"
                      data-ocid="booking.delivery_input"
                      placeholder="City, State"
                      value={form.delivery}
                      onChange={(e) => handleChange("delivery", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goods" className="font-body font-medium">
                    Type of Goods *
                  </Label>
                  <Select onValueChange={(v) => handleChange("goods", v)}>
                    <SelectTrigger data-ocid="booking.goods_input" id="goods">
                      <SelectValue placeholder="Select goods type" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "General Goods",
                        "Electronics",
                        "FMCG / Food Products",
                        "Steel / Metal",
                        "Chemicals / Pharma",
                        "Machinery / Industrial",
                        "Textiles / Garments",
                        "Construction Materials",
                        "Other",
                      ].map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="font-body font-medium">
                      Weight / Load Size *
                    </Label>
                    <Input
                      id="weight"
                      data-ocid="booking.weight_input"
                      placeholder="e.g. 5 tons, 500 kg"
                      value={form.weight}
                      onChange={(e) => handleChange("weight", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date" className="font-body font-medium">
                      Preferred Date *
                    </Label>
                    <Input
                      id="date"
                      data-ocid="booking.date_input"
                      type="date"
                      value={form.date}
                      onChange={(e) => handleChange("date", e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  data-ocid="booking.submit_button"
                  disabled={loading || isFetching}
                  className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-body font-semibold py-6 text-base"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Truck className="w-4 h-4 mr-2" /> Submit Booking
                    </>
                  )}
                </Button>

                {!identity && (
                  <p className="text-center text-muted-foreground font-body text-sm">
                    💡{" "}
                    <a
                      href="/login"
                      className="text-brand-orange hover:underline"
                    >
                      Log in
                    </a>{" "}
                    to save your bookings and track them from your dashboard.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
