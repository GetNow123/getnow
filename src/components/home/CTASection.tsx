import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Clock, Shield, Star, ArrowRight, Users } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useDynamicSiteConfig } from "@/hooks/useDynamicSiteConfig";

const GOLD = "#FFD700";
const GREEN = "#00704A";
const LIGHT_GREEN = "#E6F4EF";

const CTASection = () => {
  const { config, isLoading } = useDynamicSiteConfig();

  return (
    <section className="relative py-20 bg-[#00704A] overflow-hidden">
      {/* Decorative Gold Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(120deg, rgba(255,215,0,0.08) 0%, rgba(0,112,74,0.0) 60%)",
        }}
      ></div>
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-white rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-white rounded-full animate-pulse delay-1500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
            Need Tech Support
            <span className="block text-transparent bg-gradient-to-r from-[#FFD700] to-yellow-400 bg-clip-text font-extrabold">
              Right Now?
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-medium">
            Don't let technology frustrations ruin your day. Our certified
            experts are standing by to solve your tech problems quickly and
            efficiently.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div
            className="text-center p-7 bg-white rounded-2xl shadow-xl border-2 border-[#E6F4EF] flex flex-col items-center"
            style={{ background: LIGHT_GREEN }}
          >
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#00704A] rounded-full mb-4 shadow-lg">
              <Clock className="h-7 w-7" style={{ color: GOLD }} />
            </div>
            <div className="text-2xl font-bold text-[#00704A] mb-1">
              {config.response_time_stat}
            </div>
            <div className="text-[#00704A] text-sm font-semibold">
              Response Time
            </div>
          </div>
          <div
            className="text-center p-7 bg-white rounded-2xl shadow-xl border-2 border-[#E6F4EF] flex flex-col items-center"
            style={{ background: LIGHT_GREEN }}
          >
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#00704A] rounded-full mb-4 shadow-lg">
              <Star className="h-7 w-7" style={{ color: GOLD }} />
            </div>
            <div className="text-2xl font-bold text-[#00704A] mb-1">
              {config.rating_stat}
            </div>
            <div className="text-[#00704A] text-sm font-semibold">
              Customer Rating
            </div>
          </div>
          <div
            className="text-center p-7 bg-white rounded-2xl shadow-xl border-2 border-[#E6F4EF] flex flex-col items-center"
            style={{ background: LIGHT_GREEN }}
          >
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#00704A] rounded-full mb-4 shadow-lg">
              <Shield className="h-7 w-7" style={{ color: GOLD }} />
            </div>
            <div className="text-2xl font-bold text-[#00704A] mb-1">
              {config.satisfaction_stat}
            </div>
            <div className="text-[#00704A] text-sm font-semibold">
              Satisfaction
            </div>
          </div>
          <div
            className="text-center p-7 bg-white rounded-2xl shadow-xl border-2 border-[#E6F4EF] flex flex-col items-center"
            style={{ background: LIGHT_GREEN }}
          >
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#00704A] rounded-full mb-4 shadow-lg">
              <Users className="h-7 w-7" style={{ color: GOLD }} />
            </div>
            <div className="text-2xl font-bold text-[#00704A] mb-1">
              {config.happy_customers_stat}
            </div>
            <div className="text-[#00704A] text-sm font-semibold">
              Happy Customers
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="text-center space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`tel:${siteConfig.contactPhone.replace(/[^\d+]/g, "")}`}
              className="group"
            >
              <Button
                size="lg"
                className="bg-[#00704A] hover:bg-[#005f3a] text-white font-semibold px-8 py-4 rounded-2xl shadow-xl border-2 border-[#FFD700] transition-all duration-300 flex items-center"
              >
                <Phone
                  className="mr-3 h-5 w-5 animate-pulse"
                  style={{ color: GOLD }}
                />
                Call Now: {siteConfig.contactPhone}
                <ArrowRight
                  className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform"
                  style={{ color: GOLD }}
                />
              </Button>
            </a>

            <span className="text-white font-semibold">OR</span>

            <Link to="/contact" className="group">
              <Button
                size="lg"
                variant="outline"
                className="bg-white border-2 border-[#FFD700] text-[#00704A] hover:bg-[#FFD700] hover:text-[#00704A] font-semibold px-8 py-4 rounded-2xl shadow-xl transition-all duration-300 flex items-center"
              >
                Get Free Quote
                <ArrowRight
                  className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform"
                  style={{ color: GOLD }}
                />
              </Button>
            </Link>
          </div>

          <p className="text-white/90 text-sm max-w-md mx-auto font-medium">
            💡 <strong>Available 24/7</strong> • No hidden fees • Same-day
            service available
          </p>
        </div>

        {/* Trust badges */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <p className="text-center text-white/80 mb-6 font-semibold text-lg">
            Trusted by thousands of customers
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 opacity-90">
            <div className="px-5 py-2 rounded-full bg-white text-[#00704A] font-bold shadow border border-[#FFD700] flex items-center gap-2">
              <Star className="h-5 w-5" style={{ color: GOLD }} /> CompTIA
              Certified
            </div>
            <div className="px-5 py-2 rounded-full bg-white text-[#00704A] font-bold shadow border border-[#FFD700] flex items-center gap-2">
              <Shield className="h-5 w-5" style={{ color: GOLD }} /> BBB A+
              Rating
            </div>
            <div className="px-5 py-2 rounded-full bg-white text-[#00704A] font-bold shadow border border-[#FFD700] flex items-center gap-2">
              <Users className="h-5 w-5" style={{ color: GOLD }} /> Fully
              Insured
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
