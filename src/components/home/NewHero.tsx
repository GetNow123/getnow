import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Shield,
  Clock,
  Star,
  Users,
  Sparkles,
  Zap,
} from "lucide-react";

const NewHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-rose-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-rose-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-rose-500/20 to-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-rose-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-rose-500/20 backdrop-blur-md rounded-full px-6 py-3 text-sm font-medium border border-purple-400/30">
                <Sparkles className="h-4 w-4 text-rose-300" />
                Premium Tech Solutions Since 2018
              </div>

              <h1 className="text-6xl lg:text-8xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-purple-100 to-rose-100 bg-clip-text text-transparent">
                  Expert Tech
                </span>
                <span className="block bg-gradient-to-r from-rose-300 via-purple-300 to-rose-300 bg-clip-text text-transparent">
                  Solutions
                </span>
                <span className="block bg-gradient-to-r from-purple-100 via-white to-purple-100 bg-clip-text text-transparent">
                  Delivered
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-200 max-w-2xl leading-relaxed">
                Experience premium technology services with our certified
                experts.
                <span className="bg-gradient-to-r from-rose-300 to-purple-300 bg-clip-text text-transparent font-semibold">
                  {" "}
                  Swift, reliable, and elegant solutions{" "}
                </span>
                delivered to your doorstep with unmatched precision.
              </p>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-3 gap-8 py-8">
              <div className="text-center group">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-rose-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  24/7
                </div>
                <div className="text-sm text-gray-300 mt-1">
                  Premium Support
                </div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold bg-gradient-to-r from-rose-300 to-purple-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  99%
                </div>
                <div className="text-sm text-gray-300 mt-1">Success Rate</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-rose-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  30min
                </div>
                <div className="text-sm text-gray-300 mt-1">Avg Response</div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 text-white px-10 py-6 text-lg font-semibold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-1 border border-purple-400/30"
              >
                <Link to="/services" className="flex items-center gap-3">
                  <Zap className="h-5 w-5" />
                  Book Premium Service
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-purple-400/50 bg-white/5 backdrop-blur-md text-white hover:bg-purple-500/20 px-10 py-6 text-lg font-semibold hover:border-purple-400 transition-all duration-300"
              >
                <Link to="/contact" className="flex items-center gap-2">
                  Get Free Consultation
                </Link>
              </Button>
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="flex items-center gap-8 pt-6">
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-rose-400 text-rose-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-300 font-medium">
                  4.9/5 Rating
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-purple-300" />
                <span className="text-sm text-gray-300 font-medium">
                  15,000+ Satisfied Clients
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced Visual Section */}
          <div className="relative">
            <div
              className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20"
              style={{
                boxShadow:
                  "0 25px 50px -12px rgba(168, 85, 247, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
              }}
            >
              <div className="grid grid-cols-2 gap-8">
                {/* Enhanced Service Cards */}
                <div className="bg-gradient-to-br from-purple-500/20 to-rose-500/20 backdrop-blur-md rounded-2xl p-8 flex flex-col items-start gap-3 shadow-lg border border-purple-400/30 hover:bg-gradient-to-br hover:from-purple-500/30 hover:to-rose-500/30 hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="h-14 w-14 bg-gradient-to-r from-purple-500 to-rose-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-bold text-white text-xl">Smart Home</h3>
                  <p className="text-sm text-gray-300">
                    Premium setup & integration
                  </p>
                </div>

                <div className="bg-gradient-to-br from-rose-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl p-8 flex flex-col items-start gap-3 shadow-lg border border-rose-400/30 hover:bg-gradient-to-br hover:from-rose-500/30 hover:to-purple-500/30 hover:shadow-xl hover:shadow-rose-500/25 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="h-14 w-14 bg-gradient-to-r from-rose-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <Clock className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-bold text-white text-xl">Express Fix</h3>
                  <p className="text-sm text-gray-300">Same day resolution</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-rose-500/20 backdrop-blur-md rounded-2xl p-8 flex flex-col items-start gap-3 shadow-lg border border-purple-400/30 hover:bg-gradient-to-br hover:from-purple-500/30 hover:to-rose-500/30 hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="h-14 w-14 bg-gradient-to-r from-purple-500 to-rose-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <Users className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-bold text-white text-xl">Elite Team</h3>
                  <p className="text-sm text-gray-300">Certified specialists</p>
                </div>

                <div className="bg-gradient-to-br from-rose-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl p-8 flex flex-col items-start gap-3 shadow-lg border border-rose-400/30 hover:bg-gradient-to-br hover:from-rose-500/30 hover:to-purple-500/30 hover:shadow-xl hover:shadow-rose-500/25 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="h-14 w-14 bg-gradient-to-r from-rose-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <Star className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-bold text-white text-xl">
                    Premium Quality
                  </h3>
                  <p className="text-sm text-gray-300">99% satisfaction rate</p>
                </div>
              </div>

              {/* Enhanced Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-purple-500 to-rose-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-bounce shadow-xl border border-white/20">
                <Sparkles className="h-4 w-4 inline mr-2" />
                Available Now
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-rose-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-xl border border-white/20">
                <Zap className="h-4 w-4 inline mr-2" />
                24/7 Premium Support
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHero;
