import React from "react";
import { useDynamicSiteConfig } from "@/hooks/useDynamicSiteConfig";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

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
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-rose-900 text-white pt-20 pb-10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Newsletter Subscription */}
        <div className="max-w-2xl mx-auto mb-16">
          <div
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-400/30 px-10 py-10 flex flex-col items-center text-center"
            style={{
              boxShadow:
                "0 25px 50px -12px rgba(168, 85, 247, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-rose-500/20 backdrop-blur-md rounded-full px-4 py-2 text-sm font-medium border border-purple-400/30 mb-4">
              <Sparkles className="h-4 w-4 text-rose-300" />
              Stay Updated
            </div>
            <h4 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white via-purple-100 to-rose-100 bg-clip-text text-transparent">
              Subscribe to our Newsletter
            </h4>
            <p className="text-gray-300 mb-6 text-base md:text-lg max-w-md">
              Get the latest updates, offers, and tech tips delivered straight
              to your inbox.
            </p>
            <form
              className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full max-w-md"
              onSubmit={handleSubscribe}
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-white/10 backdrop-blur-md border-purple-400/30 text-white placeholder:text-gray-400 focus:ring-purple-500 focus:border-purple-400 flex-1"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 text-white px-6 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/50 transform hover:-translate-y-1 border border-purple-400/30"
                disabled={loading}
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
                <span className="text-white font-bold text-lg">OA</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-100 to-rose-100 bg-clip-text text-transparent">
                {config.name}
              </h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {config.description}
            </p>
            <div className="flex items-center space-x-6 mt-6">
              <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-md rounded-full px-4 py-2 border border-purple-400/30">
                <Star className="w-5 h-5 text-rose-400" />
                <span className="text-sm font-semibold">5.0 Rating</span>
              </div>
              <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-md rounded-full px-4 py-2 border border-purple-400/30">
                <Users className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-semibold">15k+ Customers</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-r from-purple-500 to-rose-500 rounded-full"></div>
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/services"
                  className="text-gray-300 hover:text-white transition-all duration-300 font-medium flex items-center gap-2 group"
                >
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  Our Services
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-300 hover:text-white transition-all duration-300 font-medium flex items-center gap-2 group"
                >
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-all duration-300 font-medium flex items-center gap-2 group"
                >
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-gray-300 hover:text-white transition-all duration-300 font-medium flex items-center gap-2 group"
                >
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/partner"
                  className="text-gray-300 hover:text-white transition-all duration-300 font-medium flex items-center gap-2 group"
                >
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  Partner With Us
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full"></div>
              Popular Services
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/services"
                  className="text-gray-300 hover:text-white transition-all duration-300 font-medium flex items-center gap-2 group"
                >
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  Computer Repair
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-gray-300 hover:text-white transition-all duration-300 font-medium flex items-center gap-2 group"
                >
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  Smart Home Setup
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-gray-300 hover:text-white transition-all duration-300 font-medium flex items-center gap-2 group"
                >
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  Network Installation
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-gray-300 hover:text-white transition-all duration-300 font-medium flex items-center gap-2 group"
                >
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  Data Recovery
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-gray-300 hover:text-white transition-all duration-300 font-medium flex items-center gap-2 group"
                >
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  Tech Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-r from-purple-500 to-rose-500 rounded-full"></div>
              Contact Info
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-rose-500/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-purple-400/30">
                  <Phone className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-white font-medium">
                    {config.contactPhone}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-rose-500/20 to-purple-500/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-rose-400/30">
                  <Mail className="w-5 h-5 text-rose-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white font-medium">{config.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-rose-500/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-purple-400/30">
                  <MapPin className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Address</p>
                  <p className="text-white font-medium">{config.address}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-rose-500/20 to-purple-500/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-rose-400/30">
                  <Clock className="w-5 h-5 text-rose-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Hours</p>
                  <p className="text-white font-medium">24/7 Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-purple-400/30 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 {config.name}. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Terms of Service
              </a>
              <a
                href="/sitemap"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
