import React from "react";
import { useDynamicSiteConfig } from "@/hooks/useDynamicSiteConfig";
import { Phone, Mail, MapPin, Clock, Star, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

const GOLD = "#FFD700";
const GREEN = "#00704A";
const LIGHT_GREEN = "#E6F4EF";

const Footer = () => {
  const { config } = useDynamicSiteConfig();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert([{ email }]);
      if (error) {
        if (
          error.code === "23505" ||
          (error.message && error.message.includes("duplicate"))
        ) {
          toast.error("This email is already subscribed!");
        } else {
          toast.error("Failed to subscribe. Please try again.");
        }
        return;
      }
      toast.success("🎉 Subscribed successfully! Welcome to our newsletter.");
      setEmail("");
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#00704A] text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Newsletter Subscription */}
        <div className="max-w-2xl mx-auto mb-14">
          <div
            className="bg-white rounded-2xl shadow-lg px-8 py-8 flex flex-col items-center text-center"
            style={{ background: LIGHT_GREEN }}
          >
            <h4 className="text-2xl md:text-3xl font-extrabold mb-2 text-[#00704A]">
              Subscribe to our Newsletter
            </h4>
            <p className="text-gray-700 mb-4 text-sm md:text-base">
              Get the latest updates, offers, and tech tips delivered straight
              to your inbox.
            </p>
            <form
              className="flex flex-col sm:flex-row items-center gap-3 justify-center w-full"
              onSubmit={handleSubscribe}
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-white border-gray-300 text-[#00704A] placeholder:text-gray-400 focus:ring-[#00704A] max-w-xs"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <Button
                type="submit"
                className="bg-[#00704A] hover:bg-[#005f3a] text-white px-6 py-2 rounded-md transition-colors font-semibold shadow-md"
                disabled={loading}
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-5">
            <h3 className="text-2xl font-extrabold text-white mb-1">
              {config.name}
            </h3>
            <p className="text-white/80 text-sm">{config.description}</p>
            <div className="flex items-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5" style={{ color: GOLD }} />
                <span className="text-base font-semibold">5.0 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" style={{ color: GOLD }} />
                <span className="text-base font-semibold">10k+ Customers</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h4 className="text-lg font-bold text-white mb-2">Quick Links</h4>
            <ul className="space-y-2 text-base">
              <li>
                <a
                  href="/services"
                  className="text-white hover:text-[#FFD700] transition-colors font-medium"
                >
                  Our Services
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-white hover:text-[#FFD700] transition-colors font-medium"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-white hover:text-[#FFD700] transition-colors font-medium"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-white hover:text-[#FFD700] transition-colors font-medium"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/partner"
                  className="text-white hover:text-[#FFD700] transition-colors font-medium"
                >
                  Partner With Us
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-5">
            <h4 className="text-lg font-bold text-white mb-2">
              Popular Services
            </h4>
            <ul className="space-y-2 text-base">
              <li>
                <a
                  href="/services"
                  className="text-white hover:text-[#FFD700] transition-colors font-medium"
                >
                  Computer Repair
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-white hover:text-[#FFD700] transition-colors font-medium"
                >
                  Smart Home Setup
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-white hover:text-[#FFD700] transition-colors font-medium"
                >
                  Network Installation
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-white hover:text-[#FFD700] transition-colors font-medium"
                >
                  Data Recovery
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-white hover:text-[#FFD700] transition-colors font-medium"
                >
                  Tech Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            <h4 className="text-lg font-bold text-white mb-2">Contact Info</h4>
            <div className="space-y-4 text-base">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5" style={{ color: GOLD }} />
                <span className="text-white font-medium">
                  {config.contactPhone}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5" style={{ color: GOLD }} />
                <span className="text-white font-medium">{config.email}</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-0.5" style={{ color: GOLD }} />
                <span className="text-white font-medium">{config.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5" style={{ color: GOLD }} />
                <span className="text-white font-medium">
                  {config.support.hours}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-14 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/70 text-sm">
              © 2024 {config.name}. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a
                href="/privacy"
                className="text-white/70 hover:text-[#FFD700] transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-white/70 hover:text-[#FFD700] transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/returns"
                className="text-white/70 hover:text-[#FFD700] transition-colors"
              >
                Returns Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
