import React from "react";
import {
  Shield,
  Award,
  Clock,
  Users,
  Star,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "Industry Certified",
      description:
        "Our technicians hold industry-leading certifications and undergo continuous training.",
    },
    {
      icon: Award,
      title: "Award-Winning Service",
      description:
        "Recognized for excellence in customer service and technical expertise.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description:
        "Round-the-clock support for urgent technical issues and emergencies.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description:
        "Highly skilled professionals with years of experience in tech support.",
    },
  ];

  const certifications = [
    { name: "CompTIA A+", color: "bg-purple-100 text-purple-800" },
    { name: "Microsoft Certified", color: "bg-rose-100 text-rose-800" },
    { name: "Cisco Network Associate", color: "bg-yellow-100 text-yellow-800" },
    { name: "Apple Certified Support", color: "bg-pink-100 text-pink-800" },
    { name: "Google IT Support", color: "bg-indigo-100 text-indigo-800" },
    { name: "Amazon AWS", color: "bg-orange-100 text-orange-800" },
  ];

  const partnerships = [
    {
      name: "Best Buy Geek Squad Partner",
      color: "bg-gradient-to-r from-purple-100 to-rose-100 text-purple-800",
    },
    {
      name: "Samsung Authorized Service",
      color: "bg-gradient-to-r from-rose-100 to-purple-100 text-rose-800",
    },
    { name: "HP Premier Partner", color: "bg-yellow-100 text-yellow-800" },
    { name: "Dell Technologies Partner", color: "bg-pink-100 text-pink-800" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-purple-50 to-rose-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-purple-800 mb-3 inline-block">
            Why Choose <span className="text-[#CBA258]">OnAssist?</span>
          </h2>
          <p className="text-lg md:text-xl text-[#CBA258] font-semibold mb-2">
            Your Trusted Partner for Seamless Tech Solutions
          </p>
          <p className="text-base text-purple-700 max-w-xl mx-auto">
            Experience the next level of tech support with certified experts,
            award-winning service, and trusted partnerships.
          </p>
        </div>

        {/* Features Grid - bold green cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-rose-900 rounded-2xl shadow-xl p-8 text-center group transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl border-2 border-purple-100 hover:border-[#CBA258] flex flex-col items-center overflow-hidden"
            >
              {/* Geometric Pattern Overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                ></div>
              </div>
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white mb-6 shadow-lg border-2 border-[#CBA258]">
                <feature.icon className="w-8 h-8 text-[#CBA258]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 drop-shadow">
                {feature.title}
              </h3>
              <p className="text-white/90 leading-relaxed mb-2">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mb-14">
          <button className="bg-gradient-to-r from-purple-600 to-rose-400 hover:from-purple-700 hover:to-rose-500 text-white font-bold text-lg px-10 py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-3 mx-auto border-2 border-[#CBA258]">
            Get Started Today
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        {/* Certifications & Partnerships */}
        <div className="bg-gradient-to-br from-purple-50 to-rose-50 rounded-2xl shadow p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-purple-800 mb-2">
              Industry Certifications
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {certifications.map((cert, idx) => (
              <span
                key={idx}
                className={`px-4 py-2 rounded-full font-semibold text-sm shadow ${cert.color}`}
              >
                {cert.name}
              </span>
            ))}
          </div>
          <div className="text-center mb-4">
            <h3 className="text-xl md:text-2xl font-bold text-purple-800 mb-2">
              Strategic Partnerships
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {partnerships.map((partner, idx) => (
              <span
                key={idx}
                className={`px-4 py-2 rounded-full font-semibold text-sm shadow ${partner.color}`}
              >
                {partner.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
