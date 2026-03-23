import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  Award,
  CheckCircle,
  ChevronRight,
  Clock,
  HeadphonesIcon,
  MapPin,
  Package,
  Shield,
  Star,
  TrendingUp,
  Truck,
  Users,
} from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Full Truck Load (FTL)",
    desc: "Dedicated truck for your full load shipments with priority delivery.",
  },
  {
    icon: Package,
    title: "Part Load Transport",
    desc: "Share truck space for smaller consignments at cost-effective rates.",
  },
  {
    icon: MapPin,
    title: "Long Distance Transport",
    desc: "Pan India coverage with experienced drivers and GPS tracking.",
  },
  {
    icon: TrendingUp,
    title: "Industrial Goods",
    desc: "Specialized handling for heavy machinery and industrial equipment.",
  },
  {
    icon: Shield,
    title: "Warehouse & Logistics",
    desc: "Secure warehousing and complete supply chain management.",
  },
  {
    icon: Clock,
    title: "Express Delivery",
    desc: "Time-critical shipments delivered on priority within 24-48 hours.",
  },
];

const benefits = [
  {
    icon: Clock,
    title: "On-Time Delivery",
    desc: "98% on-time delivery record with real-time tracking",
  },
  {
    icon: MapPin,
    title: "Pan India Network",
    desc: "Coverage across all 28 states and 8 union territories",
  },
  {
    icon: Shield,
    title: "GPS Tracking",
    desc: "Live shipment tracking with instant SMS updates",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    desc: "Round-the-clock customer support team",
  },
];

const testimonials = [
  {
    name: "Rajesh Sharma",
    company: "Sharma Steel Industries",
    text: "BestGo Logistics has been our trusted partner for over 5 years. Their reliability and professionalism is unmatched.",
  },
  {
    name: "Priya Mehta",
    company: "Mehta Textiles Pvt. Ltd.",
    text: "Excellent service! Our fabrics are always delivered safely and on time. Highly recommend their FTL service.",
  },
  {
    name: "Vikram Patel",
    company: "Patel Pharma Distributors",
    text: "The GPS tracking feature gives us complete peace of mind. BestGo is our go-to logistics partner.",
  },
];

const stats = [
  { value: "500+", label: "Trucks in Fleet" },
  { value: "15+", label: "Years Experience" },
  { value: "10,000+", label: "Deliveries Done" },
  { value: "Pan India", label: "Coverage" },
];

function StarRating() {
  return (
    <div className="flex gap-1 mb-4">
      <Star className="w-4 h-4 fill-brand-orange text-brand-orange" />
      <Star className="w-4 h-4 fill-brand-orange text-brand-orange" />
      <Star className="w-4 h-4 fill-brand-orange text-brand-orange" />
      <Star className="w-4 h-4 fill-brand-orange text-brand-orange" />
      <Star className="w-4 h-4 fill-brand-orange text-brand-orange" />
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-trucks.dim_1600x800.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/75 to-brand-navy/50" />
        <div className="relative z-10 container mx-auto px-4 pt-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 rounded-full px-4 py-1.5 mb-6">
              <Truck className="w-4 h-4 text-brand-orange" />
              <span className="text-brand-orange text-sm font-body font-medium">
                Pan India Logistics Solutions
              </span>
            </div>
            <h1 className="font-display font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
              Reliable Truck Transport &{" "}
              <span className="text-brand-orange">Logistics Solutions</span>
            </h1>
            <p className="text-white/80 font-body text-lg md:text-xl mb-8 leading-relaxed">
              BestGo Logistics — Delivering Excellence Across Every Mile.
              Trusted by 1000+ businesses across India.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/booking">
                <Button className="bg-brand-orange hover:bg-brand-orange-dark text-white font-body font-semibold text-base px-8 py-6 shadow-brand">
                  Book Transport <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
              <Link to="/booking">
                <Button
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10 font-body font-semibold text-base px-8 py-6"
                >
                  Get a Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-brand-orange py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-bold text-white text-3xl md:text-4xl">
                  {stat.value}
                </div>
                <div className="text-white/80 font-body text-sm mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-brand-orange/10 rounded-full px-4 py-1.5 mb-4">
              <span className="text-brand-orange text-sm font-body font-medium uppercase tracking-wider">
                Our Services
              </span>
            </div>
            <h2 className="font-display font-bold text-foreground text-3xl md:text-4xl">
              Comprehensive Logistics{" "}
              <span className="text-brand-orange">Solutions</span>
            </h2>
            <p className="mt-4 text-muted-foreground font-body max-w-2xl mx-auto">
              From FTL to express delivery, we offer end-to-end transport
              services tailored to your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Card
                key={s.title}
                className="group hover:shadow-lg transition-all duration-300 border-border hover:border-brand-orange/30"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-navy flex items-center justify-center mb-4 group-hover:bg-brand-orange transition-colors">
                    <s.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-lg mb-2">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    {s.desc}
                  </p>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1 mt-4 text-brand-orange text-sm font-body font-medium hover:gap-2 transition-all"
                  >
                    Learn more <ChevronRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-brand-navy">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-white text-3xl md:text-4xl">
              Why Choose <span className="text-brand-orange">BestGo?</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="text-center p-6 rounded-xl bg-white/5 border border-white/10 hover:border-brand-orange/40 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-brand-orange/20 flex items-center justify-center mx-auto mb-4">
                  <b.icon className="w-7 h-7 text-brand-orange" />
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2">
                  {b.title}
                </h3>
                <p className="text-white/60 font-body text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-foreground text-3xl md:text-4xl">
              What Our <span className="text-brand-orange">Clients Say</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-border">
                <CardContent className="p-6">
                  <StarRating />
                  <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-body font-semibold text-foreground text-sm">
                        {t.name}
                      </div>
                      <div className="font-body text-xs text-muted-foreground">
                        {t.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-brand-orange">
        <div className="container mx-auto px-4 text-center">
          <Award className="w-12 h-12 text-white mx-auto mb-4 opacity-80" />
          <h2 className="font-display font-bold text-white text-3xl md:text-4xl mb-4">
            Ready to Ship Your Goods?
          </h2>
          <p className="text-white/80 font-body text-lg mb-8 max-w-xl mx-auto">
            Get instant quotes and book your transport in minutes. Trusted by
            1000+ businesses.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/booking">
              <Button className="bg-white text-brand-orange hover:bg-white/90 font-body font-bold text-base px-8 py-6">
                Book Transport Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-body font-semibold text-base px-8 py-6"
              >
                <CheckCircle className="w-5 h-5 mr-2" /> Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
