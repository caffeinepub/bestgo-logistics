import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import PageHeader from "../components/PageHeader";
import { useActor } from "../hooks/useActor";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    info: "+91 98765 43210",
    sub: "Mon–Sat, 9am–8pm",
  },
  {
    icon: Mail,
    title: "Email",
    info: "info@bestgologistics.in",
    sub: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    title: "Address",
    info: "123 Transport Nagar, Mumbai - 400001",
    sub: "Maharashtra, India",
  },
  {
    icon: Clock,
    title: "Working Hours",
    info: "Monday – Saturday",
    sub: "9:00 AM – 8:00 PM",
  },
];

export default function ContactPage() {
  const { actor, isFetching } = useActor();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
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
    setLoading(true);
    try {
      await actor.submitContactMessage(
        form.name,
        form.email,
        form.phone,
        form.message,
      );
      setSubmitted(true);
      toast.success("Message sent successfully!");
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with our team for any queries or support"
        breadcrumb="Home / Contact"
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <h2 className="font-display font-bold text-foreground text-2xl mb-6">
                Get In <span className="text-brand-orange">Touch</span>
              </h2>
              <div className="space-y-4 mb-8">
                {contactInfo.map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-4 p-4 rounded-xl border border-border hover:border-brand-orange/30 transition-colors"
                  >
                    <div className="w-11 h-11 rounded-xl bg-brand-navy flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-body font-semibold text-foreground text-sm">
                        {item.title}
                      </p>
                      <p className="font-body text-sm text-foreground">
                        {item.info}
                      </p>
                      <p className="font-body text-xs text-muted-foreground">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden border border-border h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.6!2d72.8296!3d18.9373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce17e7cf9751%3A0x39bae9b17f06095d!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2s!4v1699991999999!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="BestGo Logistics Office Location"
                />
              </div>
            </div>

            {/* Form */}
            <div>
              <Card className="border-border shadow-lg">
                <CardContent className="p-8">
                  {submitted ? (
                    <div className="text-center py-8">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="font-display font-bold text-xl mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground font-body text-sm mb-6">
                        Thank you for reaching out. We'll get back to you within
                        24 hours.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setSubmitted(false)}
                        className="font-body"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <h3 className="font-display font-bold text-xl mb-2">
                        Send a Message
                      </h3>
                      <div className="space-y-2">
                        <Label className="font-body font-medium">
                          Full Name *
                        </Label>
                        <Input
                          data-ocid="contact.name_input"
                          placeholder="Your full name"
                          value={form.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-body font-medium">
                          Email Address *
                        </Label>
                        <Input
                          data-ocid="contact.email_input"
                          type="email"
                          placeholder="you@company.com"
                          value={form.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-body font-medium">
                          Phone Number
                        </Label>
                        <Input
                          data-ocid="contact.phone_input"
                          placeholder="+91 98765 43210"
                          value={form.phone}
                          onChange={(e) =>
                            handleChange("phone", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-body font-medium">
                          Message *
                        </Label>
                        <Textarea
                          data-ocid="contact.message_textarea"
                          placeholder="How can we help you?"
                          rows={4}
                          value={form.message}
                          onChange={(e) =>
                            handleChange("message", e.target.value)
                          }
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        data-ocid="contact.submit_button"
                        disabled={loading || isFetching}
                        className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-body font-semibold py-6"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
