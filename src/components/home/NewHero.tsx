import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, Star, Users } from "lucide-react";

const NewHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#00704A] to-[#1E3932] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative container mx-auto px-4 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#D4E9E2]/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-[#1E3932]">
                <Shield className="h-4 w-4 text-green-400" />
                Trusted by 10,000+ Customers
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Your Tech
                <span className="block" style={{ color: "#CBA258" }}>
                  Problems
                </span>
                <span className="block">Solved!</span>
              </h1>

              <p className="text-xl lg:text-2xl text-white max-w-2xl leading-relaxed">
                From computer crashes to smart home setup, our certified
                technicians provide
                <span className="text-[#CBA258] font-semibold">
                  {" "}
                  fast, reliable solutions
                </span>{" "}
                right at your doorstep.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-400">Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">98%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#CBA258]">1hr</div>
                <div className="text-sm text-gray-400">Avg Response</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[#00704A] hover:bg-[#1E3932] text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <Link to="/services" className="flex items-center gap-2">
                  Book Service Now
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-[#00704A] bg-white text-[#00704A] hover:bg-[#D4E9E2] px-8 py-4 text-lg font-semibold backdrop-blur-sm"
              >
                <Link to="/contact">Get Free Quote</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-[#CBA258] text-[#CBA258]"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-300">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#00704A]" />
                <span className="text-sm text-[#D4E9E2]">
                  10,000+ Happy Customers
                </span>
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div
              className="relative bg-white rounded-3xl p-8 shadow-2xl border border-[#D4E9E2]"
              style={{ boxShadow: "0 8px 32px 0 rgba(30,57,50,0.18)" }}
            >
              <div className="grid grid-cols-2 gap-6">
                {/* Service Cards */}
                <div className="bg-[#E8F5E9] rounded-xl p-6 flex flex-col items-start gap-2 shadow-md border border-[#D4E9E2] hover:bg-[#D4E9E2] hover:shadow-xl transition-all duration-300">
                  <div className="h-12 w-12 bg-[#00704A] rounded-lg flex items-center justify-center mb-3 shadow">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-[#1E3932] text-lg">
                    Smart Home
                  </h3>
                  <p className="text-sm text-[#6B7280]">Professional setup</p>
                </div>

                <div className="bg-[#E8F5E9] rounded-xl p-6 flex flex-col items-start gap-2 shadow-md border border-[#D4E9E2] hover:bg-[#D4E9E2] hover:shadow-xl transition-all duration-300">
                  <div className="h-12 w-12 bg-[#1E3932] rounded-lg flex items-center justify-center mb-3 shadow">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-[#1E3932] text-lg">
                    Quick Fix
                  </h3>
                  <p className="text-sm text-[#6B7280]">Same day service</p>
                </div>

                <div className="bg-[#E8F5E9] rounded-xl p-6 flex flex-col items-start gap-2 shadow-md border border-[#D4E9E2] hover:bg-[#D4E9E2] hover:shadow-xl transition-all duration-300">
                  <div className="h-12 w-12 bg-[#CBA258] rounded-lg flex items-center justify-center mb-3 shadow">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-[#1E3932] text-lg">
                    Expert Team
                  </h3>
                  <p className="text-sm text-[#6B7280]">Certified techs</p>
                </div>

                <div className="bg-[#E8F5E9] rounded-xl p-6 flex flex-col items-start gap-2 shadow-md border border-[#D4E9E2] hover:bg-[#D4E9E2] hover:shadow-xl transition-all duration-300">
                  <div className="h-12 w-12 bg-[#00704A] rounded-lg flex items-center justify-center mb-3 shadow">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-[#1E3932] text-lg">
                    Top Rated
                  </h3>
                  <p className="text-sm text-[#6B7280]">98% satisfaction</p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-[#00704A] text-white px-3 py-1 rounded-full text-sm font-semibold animate-bounce shadow-lg">
                ✓ Available Now
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#1E3932] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                24/7 Support
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHero;
