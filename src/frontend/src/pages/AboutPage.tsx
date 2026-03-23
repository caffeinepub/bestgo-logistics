import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Clock,
  HeadphonesIcon,
  MapPin,
  Shield,
  TrendingUp,
  Truck,
  Users,
} from "lucide-react";
import PageHeader from "../components/PageHeader";

const whyChooseUs = [
  {
    icon: Clock,
    title: "On-Time Delivery",
    desc: "98% of our shipments are delivered on schedule.",
  },
  {
    icon: MapPin,
    title: "Pan India Network",
    desc: "Offices and hubs in 50+ cities across India.",
  },
  {
    icon: Users,
    title: "Trained Drivers",
    desc: "All drivers are licensed, trained, and background verified.",
  },
  {
    icon: Shield,
    title: "GPS Tracking",
    desc: "Real-time shipment tracking for complete visibility.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    desc: "Dedicated support team available round the clock.",
  },
  {
    icon: TrendingUp,
    title: "Competitive Rates",
    desc: "Best-in-class pricing with no hidden charges.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title="About BestGo Logistics"
        subtitle="Your trusted pan-India transportation partner since 2009"
        breadcrumb="Home / About Us"
      />

      {/* Company History */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-orange/10 rounded-full px-4 py-1.5 mb-4">
                <span className="text-brand-orange text-sm font-body font-medium uppercase tracking-wider">
                  Our Story
                </span>
              </div>
              <h2 className="font-display font-bold text-foreground text-3xl md:text-4xl mb-6">
                15 Years of Delivering{" "}
                <span className="text-brand-orange">Excellence</span>
              </h2>
              <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                <p>
                  Founded in 2009 by Mr. Arun Gupta in Mumbai, BestGo Logistics
                  Private Limited began its journey with just 5 trucks serving
                  local routes across Maharashtra. With an unwavering commitment
                  to reliability and customer satisfaction, the company rapidly
                  expanded.
                </p>
                <p>
                  By 2015, BestGo had grown to over 100 trucks and established
                  regional hubs in Delhi, Chennai, Bangalore, and Kolkata.
                  Today, with a fleet of 500+ trucks, we serve clients across
                  all 28 states and 8 union territories of India.
                </p>
                <p>
                  Our ISO 9001:2015 certification and recognition as one of
                  India's Top 50 Logistics Companies reflects our commitment to
                  quality and operational excellence.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { v: "2009", l: "Founded" },
                  { v: "500+", l: "Trucks" },
                  { v: "50+", l: "Cities" },
                  { v: "1000+", l: "Clients" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="bg-brand-navy/5 rounded-xl p-4 text-center border border-border"
                  >
                    <div className="font-display font-bold text-brand-orange text-2xl">
                      {s.v}
                    </div>
                    <div className="text-muted-foreground font-body text-sm">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-brand-navy rounded-2xl p-8 text-white">
                <Truck className="w-16 h-16 text-brand-orange mb-6" />
                <h3 className="font-display font-bold text-2xl mb-4">
                  Our Timeline
                </h3>
                {[
                  { year: "2009", event: "Founded with 5 trucks in Mumbai" },
                  {
                    year: "2012",
                    event: "Expanded to 50 trucks, entered Delhi market",
                  },
                  { year: "2015", event: "100+ fleet, pan-India hub network" },
                  { year: "2018", event: "Launched GPS tracking system" },
                  {
                    year: "2021",
                    event: "300+ trucks, ISO 9001:2015 certified",
                  },
                  {
                    year: "2024",
                    event: "500+ fleet, digital booking platform",
                  },
                ].map((item) => (
                  <div key={item.year} className="flex gap-4 mb-4 last:mb-0">
                    <div className="w-16 flex-shrink-0 text-brand-orange font-display font-bold text-sm">
                      {item.year}
                    </div>
                    <div className="flex-1 border-l border-white/20 pl-4">
                      <p className="text-white/80 font-body text-sm">
                        {item.event}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 bg-brand-navy text-white">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-xl bg-brand-orange/20 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="font-display font-bold text-2xl mb-4">
                  Our Mission
                </h3>
                <p className="text-white/70 font-body leading-relaxed">
                  To provide reliable, efficient, and affordable truck transport
                  services across India while ensuring complete transparency and
                  customer satisfaction at every touchpoint.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-brand-orange text-white">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-bold text-2xl mb-4">
                  Our Vision
                </h3>
                <p className="text-white/90 font-body leading-relaxed">
                  To become India's most trusted and technologically advanced
                  logistics company, revolutionizing supply chain management
                  through innovation, sustainability, and a customer-first
                  approach.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-foreground text-3xl md:text-4xl">
              Why Choose <span className="text-brand-orange">BestGo?</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-6 rounded-xl border border-border hover:border-brand-orange/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-navy flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground text-lg mb-1">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16 bg-brand-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-white text-3xl md:text-4xl mb-4">
            15+ Years of Trusted{" "}
            <span className="text-brand-orange">Experience</span>
          </h2>
          <p className="text-white/70 font-body max-w-2xl mx-auto">
            A decade and a half of delivering goods safely across India has
            earned us the trust of over 1,000 businesses, from small enterprises
            to Fortune 500 companies.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { v: "15+", l: "Years Experience" },
              { v: "10,000+", l: "Successful Deliveries" },
              { v: "500+", l: "Trucks & Vehicles" },
              { v: "1000+", l: "Happy Clients" },
            ].map((s) => (
              <div key={s.l} className="p-4">
                <div className="font-display font-bold text-brand-orange text-3xl md:text-4xl">
                  {s.v}
                </div>
                <div className="text-white/60 font-body text-sm mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <CheckCircle className="w-6 h-6 text-brand-orange mr-2" />
            <span className="text-white/80 font-body">
              ISO 9001:2015 Certified Company
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
