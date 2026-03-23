import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  ChevronRight,
  MapPin,
  Package,
  Shield,
  TrendingUp,
  Truck,
  Zap,
} from "lucide-react";
import PageHeader from "../components/PageHeader";

const services = [
  {
    icon: Truck,
    title: "Full Truck Load (FTL)",
    desc: "Ideal for large shipments that require the entire truck capacity. Get dedicated vehicle with direct routes for faster delivery.",
    features: [
      "Entire truck capacity",
      "Direct door-to-door service",
      "Faster transit times",
      "Ideal for 10+ tonne loads",
    ],
    color: "bg-brand-navy",
  },
  {
    icon: Package,
    title: "Part Load Transport",
    desc: "Cost-effective solution for smaller consignments. Share truck space with other cargo to reduce transportation costs.",
    features: [
      "Pay only for space used",
      "Cost-effective rates",
      "Regular scheduled runs",
      "1-10 tonne capacity",
    ],
    color: "bg-brand-orange",
  },
  {
    icon: MapPin,
    title: "Long Distance Transport",
    desc: "Pan India coverage with experienced long-haul drivers. GPS-tracked, with driver rest protocols ensuring safe delivery.",
    features: [
      "Pan India coverage",
      "GPS tracked vehicles",
      "Experienced drivers",
      "All states covered",
    ],
    color: "bg-brand-navy",
  },
  {
    icon: TrendingUp,
    title: "Industrial Goods Transport",
    desc: "Specialized transport for heavy machinery, equipment, and industrial materials requiring extra care and permits.",
    features: [
      "Heavy machinery handling",
      "Permit procurement",
      "Specialized equipment",
      "Insurance coverage",
    ],
    color: "bg-brand-orange",
  },
  {
    icon: Shield,
    title: "Warehouse & Logistics Support",
    desc: "End-to-end supply chain management including warehousing, inventory management, and last-mile delivery.",
    features: [
      "Secure warehousing",
      "Inventory management",
      "Last-mile delivery",
      "Cross-docking services",
    ],
    color: "bg-brand-navy",
  },
  {
    icon: Zap,
    title: "Express Delivery",
    desc: "Time-critical shipments handled with priority. 24-48 hour delivery for urgent consignments across major cities.",
    features: [
      "24-48 hour delivery",
      "Priority handling",
      "Real-time updates",
      "Dedicated express fleet",
    ],
    color: "bg-brand-orange",
  },
];

export default function ServicesPage() {
  return (
    <div>
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive logistics solutions tailored to every business need"
        breadcrumb="Home / Services"
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card
                key={service.title}
                className="overflow-hidden border-border hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`${service.color} p-6`}>
                  <service.icon className="w-10 h-10 text-white mb-3" />
                  <h3 className="font-display font-bold text-white text-xl">
                    {service.title}
                  </h3>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                    {service.desc}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm font-body text-foreground"
                      >
                        <ChevronRight className="w-4 h-4 text-brand-orange flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/booking" className="block mt-6">
                    <Button className="w-full bg-brand-navy hover:bg-brand-navy/90 text-white font-body">
                      Book This Service
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-foreground text-3xl mb-4">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-muted-foreground font-body mb-8">
            Our logistics experts will help you find the right solution for your
            requirements.
          </p>
          <Link to="/contact">
            <Button className="bg-brand-orange hover:bg-brand-orange-dark text-white font-body font-semibold px-8 py-6">
              Talk to an Expert
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
