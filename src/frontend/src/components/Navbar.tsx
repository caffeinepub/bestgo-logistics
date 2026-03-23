import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Truck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const navLinks = [
  { label: "Home", to: "/" as const, ocid: "nav.home_link" },
  { label: "About", to: "/about" as const, ocid: "nav.about_link" },
  { label: "Services", to: "/services" as const, ocid: "nav.services_link" },
  { label: "Fleet", to: "/fleet" as const, ocid: "nav.fleet_link" },
  { label: "Tracking", to: "/tracking" as const, ocid: "nav.tracking_link" },
  { label: "Contact", to: "/contact" as const, ocid: "nav.contact_link" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-brand-navy shadow-lg" : "bg-brand-navy/95"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-brand-orange flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight">
                <span className="font-display font-bold text-white text-lg leading-none">
                  BestGo
                </span>
                <span className="block text-xs text-white/60 font-body leading-none">
                  Logistics
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={link.ocid}
                className={`px-4 py-2 rounded-md text-sm font-body font-medium transition-colors ${
                  pathname === link.to
                    ? "text-brand-orange"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/booking">
              <Button
                data-ocid="nav.quote_button"
                className="bg-brand-orange hover:bg-brand-orange-dark text-white font-body font-semibold text-sm px-5"
              >
                Get a Quote
              </Button>
            </Link>
            {identity ? (
              <Button
                variant="outline"
                data-ocid="nav.login_button"
                onClick={clear}
                className="border-white/30 text-white hover:bg-white/10 font-body text-sm"
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="outline"
                data-ocid="nav.login_button"
                onClick={login}
                disabled={isLoggingIn}
                className="border-white/30 text-white hover:bg-white/10 font-body text-sm"
              >
                {isLoggingIn ? "Logging in..." : "Login"}
              </Button>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="lg:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-brand-navy border-t border-white/10">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={link.ocid}
                className={`px-4 py-3 rounded-md text-sm font-body font-medium transition-colors ${
                  pathname === link.to
                    ? "text-brand-orange bg-white/10"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <Link to="/booking">
                <Button
                  data-ocid="nav.quote_button"
                  className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white"
                >
                  Get a Quote
                </Button>
              </Link>
              {identity ? (
                <Button
                  variant="outline"
                  onClick={clear}
                  className="w-full border-white/30 text-white"
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={login}
                  disabled={isLoggingIn}
                  className="w-full border-white/30 text-white"
                >
                  {isLoggingIn ? "Logging in..." : "Login"}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
