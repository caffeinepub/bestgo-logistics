import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Truck } from "lucide-react";
import PageHeader from "../components/PageHeader";

const fleet = [
  {
    name: "Container Truck",
    image: "/assets/generated/truck-container.dim_800x500.jpg",
    badge: "Heavy Load",
    specs: [
      { label: "Capacity", value: "20–40 Tons" },
      { label: "Length", value: "40 ft" },
      { label: "Height", value: "13.5 ft" },
      { label: "Best For", value: "Long haul, bulk cargo" },
      { label: "Features", value: "GPS, Air Ride Suspension" },
    ],
    desc: "Our container trucks are the workhorses of long-distance haulage. Built for bulk cargo, these 40-foot giants handle everything from FMCG to auto parts with ease.",
  },
  {
    name: "Semi-Trailer Truck",
    image: "/assets/generated/truck-trailer.dim_800x500.jpg",
    badge: "Industrial",
    specs: [
      { label: "Capacity", value: "30–50 Tons" },
      { label: "Length", value: "48 ft" },
      { label: "Height", value: "14 ft" },
      { label: "Best For", value: "Heavy industrial goods" },
      { label: "Features", value: "Heavy-duty axles, overdimension" },
    ],
    desc: "Designed for oversized and heavy industrial loads, our semi-trailers handle machinery, steel coils, and large equipment with specialized rigging equipment.",
  },
  {
    name: "Mini Truck",
    image: "/assets/generated/truck-mini.dim_800x500.jpg",
    badge: "City Delivery",
    specs: [
      { label: "Capacity", value: "1–5 Tons" },
      { label: "Length", value: "14 ft" },
      { label: "Height", value: "7 ft" },
      { label: "Best For", value: "Local & city deliveries" },
      { label: "Features", value: "Agile, city-permit compliant" },
    ],
    desc: "Perfect for last-mile deliveries and city logistics. Our mini trucks navigate narrow streets with ease while maintaining the same GPS tracking and professional standards.",
  },
];

const fleetStats = [
  { v: "500+", l: "Total Vehicles" },
  { v: "200+", l: "Container Trucks" },
  { v: "150+", l: "Semi-Trailers" },
  { v: "150+", l: "Mini Trucks" },
];

export default function FleetPage() {
  return (
    <div>
      <PageHeader
        title="Our Fleet"
        subtitle="Modern, well-maintained vehicles equipped with GPS and safety features"
        breadcrumb="Home / Fleet"
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {fleet.map((truck) => (
              <Card
                key={truck.name}
                className="overflow-hidden border-border hover:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={truck.image}
                    alt={truck.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-brand-orange text-white font-body font-semibold">
                      {truck.badge}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Truck className="w-5 h-5 text-brand-orange" />
                    <h3 className="font-display font-bold text-foreground text-xl">
                      {truck.name}
                    </h3>
                  </div>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                    {truck.desc}
                  </p>
                  <div className="border border-border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <tbody>
                        {truck.specs.map((spec) => (
                          <tr
                            key={spec.label}
                            className="even:bg-muted/30 odd:bg-background"
                          >
                            <td className="px-3 py-2 font-body font-semibold text-foreground/70 w-1/2">
                              {spec.label}
                            </td>
                            <td className="px-3 py-2 font-body text-foreground">
                              {spec.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Stats */}
      <section className="py-16 bg-brand-navy">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-white text-center text-3xl mb-10">
            Fleet at a <span className="text-brand-orange">Glance</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {fleetStats.map((s) => (
              <div
                key={s.l}
                className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="font-display font-bold text-brand-orange text-3xl">
                  {s.v}
                </div>
                <div className="text-white/60 font-body text-sm mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
