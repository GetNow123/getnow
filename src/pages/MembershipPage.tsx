import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/config/site";
import {
  Check,
  Star,
  Zap,
  Shield,
  Phone,
  Clock,
  Users,
  Award,
  Crown,
  Sparkles,
} from "lucide-react";

const MembershipPage = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Premium Support",
      icon: Star,
      popular: false,
      monthlyPrice: 29,
      yearlyPrice: 290,
      description: "Perfect for individuals and small businesses",
      features: [
        "24/7 Tech Support",
        "Remote Assistance",
        "Software Installation",
        "Virus Removal",
        "Basic Troubleshooting",
        "Email Support",
        "Phone Support",
        "1 Device Coverage",
      ],
      color: "from-[#00704A] to-[#1E3932]",
    },
    {
      name: "Enterprise Plus",
      icon: Crown,
      popular: true,
      monthlyPrice: 79,
      yearlyPrice: 790,
      description: "Comprehensive solution for businesses",
      features: [
        "Everything in Premium",
        "Priority Support",
        "On-site Visits",
        "Network Setup & Management",
        "Data Backup & Recovery",
        "Security Audits",
        "Hardware Diagnostics",
        "Up to 10 Devices",
        "Dedicated Account Manager",
        "Monthly Health Reports",
      ],
      color: "from-[#00704A] to-[#1E3932]",
    },
  ];

  const getPrice = (plan: (typeof plans)[0]) => {
    return isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  };

  const getSavings = (plan: (typeof plans)[0]) => {
    const monthlyTotal = plan.monthlyPrice * 12;
    const savings = monthlyTotal - plan.yearlyPrice;
    return Math.round((savings / monthlyTotal) * 100);
  };

  return (
    <Layout>
      <Helmet>
        <title>Membership Plans | {siteConfig.name}</title>
        <meta
          name="description"
          content="Choose the perfect tech support plan for your needs. Get 24/7 support, priority service, and exclusive benefits."
        />
      </Helmet>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-rose-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml;utf8,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="%23ffffff" fill-opacity="0.3"><circle cx="30" cy="30" r="8"/><circle cx="10" cy="10" r="4"/><circle cx="50" cy="50" r="6"/></g></svg>\')',
            }}
          ></div>
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#a21caf]/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Sparkles className="w-5 h-5 text-[#fb7185]" />
              <span className="font-medium text-[#a21caf]">
                Premium Memberships
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Tech Support <span className="text-[#fb7185]">Memberships</span>
            </h1>
            <p className="text-2xl text-white/80 mb-12 leading-relaxed">
              Get unlimited tech support with our premium membership plans. Save
              money and get priority service.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span
                className={`text-lg font-medium ${
                  !isYearly ? "text-[#fb7185]" : "text-white/70"
                }`}
              >
                Monthly
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-[#a21caf]"
              />
              <span
                className={`text-lg font-medium ${
                  isYearly ? "text-[#fb7185]" : "text-white/70"
                }`}
              >
                Yearly
              </span>
              {isYearly && (
                <Badge className="bg-[#f5d0fe] text-[#a21caf] ml-2 border border-[#a21caf]/30">
                  Save up to 20%
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Plans Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const PlanIcon = plan.icon;
              return (
                <Card
                  key={index}
                  className={`relative overflow-hidden shadow-2xl border-0 ${
                    plan.popular ? "transform scale-105 lg:scale-110" : ""
                  } hover:shadow-3xl transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#fb7185] to-[#a21caf] text-center py-3">
                      <span className="text-white font-bold text-sm uppercase tracking-wide">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <CardHeader
                    className={`bg-gradient-to-br from-[#a21caf] to-[#fb7185] text-white relative ${
                      plan.popular ? "pt-16" : "pt-8"
                    } pb-8`}
                  >
                    <div className="text-center">
                      <div className="bg-[#f5d0fe]/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                        <PlanIcon className="w-10 h-10 text-white" />
                      </div>
                      <CardTitle className="text-3xl font-bold mb-2">
                        {plan.name}
                      </CardTitle>
                      <p className="text-white/90 text-lg">
                        {plan.description}
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="flex items-baseline justify-center gap-2 mb-4">
                        <span className="text-5xl font-bold text-[#a21caf]">
                          ${getPrice(plan)}
                        </span>
                        <span className="text-xl text-[#fb7185]">
                          /{isYearly ? "year" : "month"}
                        </span>
                      </div>

                      {isYearly && (
                        <div className="text-center">
                          <span className="text-[#a21caf] font-medium">
                            Save {getSavings(plan)}% annually
                          </span>
                          <p className="text-sm text-[#a21caf]/80">
                            Billed ${plan.yearlyPrice} yearly
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-3"
                        >
                          <div className="bg-gradient-to-br from-[#a21caf] to-[#fb7185] w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-[#1e293b]">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      className={`w-full py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 ${
                        plan.popular
                          ? "bg-gradient-to-r from-[#fb7185] to-[#a21caf] hover:from-[#a21caf] hover:to-[#fb7185] text-white"
                          : "bg-gradient-to-br from-[#a21caf] to-[#fb7185] hover:opacity-90 text-white"
                      }`}
                    >
                      {plan.popular ? "Get Started" : "Choose Plan"}
                    </Button>

                    <p className="text-center text-sm text-[#a21caf]/80 mt-4">
                      Cancel anytime • 30-day money-back guarantee
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-[#f5d0fe] via-white to-[#f5d0fe]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose Our <span className="text-[#a21caf]">Membership?</span>
            </h2>
            <p className="text-xl text-[#a21caf]/80 max-w-3xl mx-auto">
              Get more value with our comprehensive tech support memberships
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Clock,
                title: "24/7 Support",
                description: "Round-the-clock assistance whenever you need it",
              },
              {
                icon: Users,
                title: "Expert Technicians",
                description: "Certified professionals with years of experience",
              },
              {
                icon: Shield,
                title: "Guaranteed Results",
                description: "100% satisfaction guarantee on all services",
              },
              {
                icon: Award,
                title: "Priority Service",
                description: "Skip the queue with priority support access",
              },
            ].map((benefit, index) => {
              const BenefitIcon = benefit.icon;
              return (
                <Card
                  key={index}
                  className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white hover:-translate-y-2"
                >
                  <CardContent className="p-8 text-center">
                    <div className="bg-gradient-to-br from-[#a21caf] to-[#fb7185] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <BenefitIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-4 text-[#a21caf]">
                      {benefit.title}
                    </h3>
                    <p className="text-[#a21caf]/80">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-rose-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml;utf8,<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="%23ffffff" fill-opacity="0.3"><path d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/></g></svg>\')',
            }}
          ></div>
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get{" "}
              <span className="text-[#fb7185]">Premium Support?</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed">
              Join thousands of satisfied customers who trust us with their tech
              needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-[#a21caf] hover:bg-[#f5d0fe] font-bold px-10 py-5 rounded-full shadow-2xl text-lg"
                onClick={() =>
                  window.open(`tel:${siteConfig.contactPhone}`, "_self")
                }
              >
                <Phone className="w-6 h-6 mr-3" />
                Call Now: {siteConfig.contactPhone}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-[#a21caf] hover:text-white font-bold px-10 py-5 rounded-full backdrop-blur-sm text-lg"
              >
                <Zap className="w-6 h-6 mr-3" />
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MembershipPage;
