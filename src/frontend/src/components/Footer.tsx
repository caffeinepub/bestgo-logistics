import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Truck,
  Twitter,
} from "lucide-react";

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-brand-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-brand-orange flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-white text-lg leading-none">
                  BestGo
                </span>
                <span className="block text-xs text-white/60 font-body leading-none">
                  Logistics Pvt. Ltd.
                </span>
              </div>
            </div>
            <p className="text-white/60 text-sm font-body leading-relaxed">
              Delivering excellence across every mile. Pan India truck transport
              and logistics solutions since 2009.
            </p>
            <div className="flex gap-3 mt-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-orange transition-colors flex items-center justify-center"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-white mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 font-body text-sm">
              {(
                [
                  { label: "Home", to: "/" },
                  { label: "About Us", to: "/about" },
                  { label: "Our Fleet", to: "/fleet" },
                  { label: "Track Shipment", to: "/tracking" },
                  { label: "Customer Login", to: "/login" },
                ] as { label: string; to: string }[]
              ).map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to as "/"}
                    className="text-white/60 hover:text-brand-orange transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-white mb-4 text-sm uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2 font-body text-sm">
              {[
                "Full Truck Load (FTL)",
                "Part Load Transport",
                "Long Distance Transport",
                "Industrial Goods",
                "Warehouse & Logistics",
                "Express Delivery",
              ].map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="text-white/60 hover:text-brand-orange transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-white mb-4 text-sm uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-3 font-body text-sm">
              <li className="flex gap-3 text-white/60">
                <Phone className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex gap-3 text-white/60">
                <Mail className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                <span>info@bestgologistics.in</span>
              </li>
              <li className="flex gap-3 text-white/60">
                <MapPin className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                <span>
                  123 Transport Nagar,
                  <br />
                  Mumbai - 400001,
                  <br />
                  Maharashtra, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm font-body">
            © {year} BestGo Logistics Private Limited. All rights reserved.
          </p>
          <p className="text-white/40 text-sm font-body">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-orange hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
