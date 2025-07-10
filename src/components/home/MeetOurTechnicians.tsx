import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Award,
  Clock,
  Shield,
  Users,
  Smile,
  CheckCircle2,
} from "lucide-react";
import { techniciansData, Technician } from "@/utils/techniciansData";

function getRandomTechnicians(arr: Technician[], n: number) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

const MeetOurTechnicians = () => {
  const technicians = getRandomTechnicians(techniciansData, 4);
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-purple-800 mb-3 inline-block">
            Meet Our <span className="text-[#CBA258]">Expert Technicians</span>
            <span className="block w-20 h-1 bg-gradient-to-r from-[#CBA258] to-purple-600 rounded-full mx-auto mt-3" />
          </h2>
          <p className="text-lg md:text-xl text-[#CBA258] font-semibold mb-2">
            Certified. Experienced. Trusted.
          </p>
          <p className="text-base text-purple-700 max-w-xl mx-auto">
            Our certified professionals bring years of experience and expertise
            to solve your tech challenges. Each technician is vetted, trained,
            and committed to providing exceptional service.
          </p>
        </div>

        {/* Technician Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {technicians.map((tech) => (
            <Card
              key={tech.id}
              className="group bg-gradient-to-br from-slate-900 via-purple-900 to-rose-900 rounded-2xl shadow-xl border-2 border-purple-100 hover:border-[#CBA258] transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center overflow-hidden"
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
              <CardContent className="p-6 flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full mx-auto border-4 border-[#CBA258] shadow-lg overflow-hidden flex items-center justify-center bg-white">
                    <img
                      src={tech.image}
                      alt={tech.name}
                      className="w-24 h-24 object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[#CBA258] text-white flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-1 text-center drop-shadow">
                  {tech.name}
                </h3>
                <p className="text-sm text-[#F9F6EF] mb-2 text-center">
                  {tech.title}
                </p>

                <div className="flex items-center justify-center gap-1 mb-3">
                  <Star className="h-4 w-4 text-[#CBA258] fill-[#CBA258]" />
                  <span className="text-sm font-semibold text-white">
                    {tech.rating}
                  </span>
                  <span className="text-xs text-[#F9F6EF]">
                    ({tech.completedJobs} jobs)
                  </span>
                </div>

                <div className="space-y-3 w-full">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#CBA258]" />
                    <span className="text-sm text-[#F9F6EF]">
                      {tech.experience} Experience
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-[#CBA258]" />
                    <span className="text-sm text-[#F9F6EF]">
                      {tech.certifications.length} Certifications
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-[#CBA258] mb-2 font-semibold">
                      Specialties:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {tech.specialties.slice(0, 2).map((specialty, index) => (
                        <Badge
                          key={index}
                          className="bg-[#CBA258] text-white text-xs px-2 py-1 rounded-full font-semibold"
                        >
                          {specialty}
                        </Badge>
                      ))}
                      {tech.specialties.length > 2 && (
                        <Badge className="bg-white text-purple-700 border border-[#CBA258] text-xs px-2 py-1 rounded-full font-semibold">
                          +{tech.specialties.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section - redesigned */}
        <div className="bg-gradient-to-br from-purple-50 to-rose-50 rounded-3xl p-10 shadow-2xl mt-4 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-purple-100">
            <div className="flex flex-col items-center px-2">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-[#CBA258] to-purple-600 shadow mb-3">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-[#CBA258] bg-clip-text text-transparent mb-1">
                50+
              </div>
              <div className="text-base font-semibold text-purple-800">
                Certified Technicians
              </div>
            </div>
            <div className="flex flex-col items-center px-2">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-[#CBA258] to-purple-600 shadow mb-3">
                <Smile className="w-7 h-7 text-white" />
              </div>
              <div className="text-4xl font-extrabold bg-gradient-to-r from-[#CBA258] to-purple-600 bg-clip-text text-transparent mb-1">
                98%
              </div>
              <div className="text-base font-semibold text-purple-800">
                Customer Satisfaction
              </div>
            </div>
            <div className="flex flex-col items-center px-2">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-[#CBA258] shadow mb-3">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <div className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-[#CBA258] bg-clip-text text-transparent mb-1">
                24/7
              </div>
              <div className="text-base font-semibold text-purple-800">
                Support Available
              </div>
            </div>
            <div className="flex flex-col items-center px-2">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-[#CBA258] to-purple-600 shadow mb-3">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
              <div className="text-4xl font-extrabold bg-gradient-to-r from-[#CBA258] to-purple-600 bg-clip-text text-transparent mb-1">
                15K+
              </div>
              <div className="text-base font-semibold text-purple-800">
                Jobs Completed
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetOurTechnicians;
