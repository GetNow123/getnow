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
    { name: "CompTIA A+", color: "bg-blue-100 text-blue-800" },
    { name: "Microsoft Certified", color: "bg-green-100 text-green-800" },
    { name: "Cisco Network Associate", color: "bg-purple-100 text-purple-800" },
    { name: "Apple Certified Support", color: "bg-gray-100 text-gray-800" },
    { name: "Google IT Support", color: "bg-red-100 text-red-800" },
    { name: "Amazon AWS", color: "bg-orange-100 text-orange-800" },
  ];

  const partnerships = [
    {
      name: "Best Buy Geek Squad Partner",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      name: "Samsung Authorized Service",
      color: "bg-indigo-100 text-indigo-800",
    },
    { name: "HP Premier Partner", color: "bg-teal-100 text-teal-800" },
    { name: "Dell Technologies Partner", color: "bg-cyan-100 text-cyan-800" },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#00704A] mb-3 inline-block">
            Why Choose <span className="text-[#CBA258]">OnAssist?</span>
          </h2>
          <p className="text-lg md:text-xl text-[#CBA258] font-semibold mb-2">
            Your Trusted Partner for Seamless Tech Solutions
          </p>
          <p className="text-base text-[#1E3932] max-w-xl mx-auto">
            Experience the next level of tech support with certified experts,
            award-winning service, and trusted partnerships.
          </p>
        </div>

        {/* Features Grid - bold green cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="relative bg-[#00704A] rounded-2xl shadow-xl p-8 text-center group transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl border-2 border-[#E8F5E9] hover:border-[#CBA258] flex flex-col items-center"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#CBA258] mb-6 shadow-lg">
                <feature.icon className="w-8 h-8 text-white" />
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
          <button className="bg-[#00704A] hover:bg-[#CBA258] text-white hover:text-[#00704A] font-bold text-lg px-10 py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-3 mx-auto border-2 border-[#CBA258]">
            Get Started Today
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        {/* Certifications & Partnerships */}
        <div className="bg-[#F9F6EF] rounded-2xl shadow p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-[#00704A] mb-2">
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
            <h3 className="text-xl md:text-2xl font-bold text-[#00704A] mb-2">
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
