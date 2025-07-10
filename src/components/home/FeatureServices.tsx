import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useServiceCategories } from "@/hooks/useServices";
import { ArrowRight, Star } from "lucide-react";

const FeatureServices = () => {
  const { data: categories, isLoading } = useServiceCategories();

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-purple-50 to-rose-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Tech Support <span className="text-purple-700">Services</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="h-64 bg-purple-100 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-rose-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 rounded-full px-6 py-2 mb-4">
            <Star className="w-5 h-5 text-[#CBA258]" />
            <span className="font-medium">Featured Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Tech Support <span className="text-purple-700">Services</span>
          </h2>
          <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
            Comprehensive technology solutions to keep your devices running
            smoothly and your business productive
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories?.slice(0, 6).map((category) => (
            <Card
              key={category.id}
              className="group transition-all duration-300 border border-purple-100 shadow-lg bg-purple-50 overflow-hidden h-full hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={category.image_url}
                  alt={category.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-bold text-xl mb-2 text-white">
                    {category.title}
                  </h3>
                </div>
                <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-rose-400 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link to={`/services/${category.slug}`}>
                    <ArrowRight className="w-4 h-4 text-white group-hover:text-[#CBA258] transition-colors duration-300" />
                  </Link>
                </div>
              </div>

              <CardContent className="p-6">
                <p className="text-[#6B7280] mb-6 line-clamp-3 leading-relaxed">
                  {category.description}
                </p>
                <Link to={`/services/${category.slug}`}>
                  <Button
                    size="lg"
                    className="w-full font-semibold px-8 py-3 text-lg bg-gradient-to-r from-slate-900 via-purple-900 to-rose-900 text-white hover:from-purple-800 hover:to-rose-800 border-2 border-purple-200 mt-2 transition-all duration-300 flex items-center justify-center"
                  >
                    Explore More
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:text-[#CBA258]" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 flex justify-center">
          <Link to="/services">
            <Button
              size="lg"
              className="font-semibold px-8 py-3 text-lg bg-gradient-to-r from-slate-900 via-purple-900 to-rose-900 text-white hover:from-purple-800 hover:to-rose-800 border-2 border-purple-200 transition-all duration-300 flex items-center justify-center"
            >
              View All Services
              <ArrowRight className="w-5 h-5 ml-2 group-hover:text-[#CBA258]" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeatureServices;
