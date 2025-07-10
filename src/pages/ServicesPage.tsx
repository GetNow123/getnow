import React, { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import ServiceCard from "@/components/services/ServiceCard";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/config/site";
import { useCategoriesWithServices } from "@/hooks/useServices";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, SortAsc, SortDesc, X, Layers } from "lucide-react";

const ServicesPage = () => {
  const {
    data: categoriesWithServices,
    isLoading,
    error,
  } = useCategoriesWithServices();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [priceRange, setPriceRange] = useState("all");

  // Get all services from all categories
  const allServices = useMemo(() => {
    if (!categoriesWithServices) return [];
    return categoriesWithServices.flatMap((category) =>
      category.services.map((service) => ({
        ...service,
        categoryTitle: category.title,
        categorySlug: category.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      }))
    );
  }, [categoriesWithServices]);

  // Filter and sort services
  const filteredServices = useMemo(() => {
    let filtered = allServices;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (service) =>
          service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          service.categoryTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (service) => service.categorySlug === selectedCategory
      );
    }

    // Price range filter
    if (priceRange !== "all") {
      const ranges = {
        "under-50": [0, 50],
        "50-100": [50, 100],
        "100-200": [100, 200],
        "over-200": [200, Infinity],
      };
      const [min, max] = ranges[priceRange as keyof typeof ranges] || [
        0,
        Infinity,
      ];
      filtered = filtered.filter(
        (service) => service.price >= min && service.price <= max
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case "name":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "price":
          aValue = a.price;
          bValue = b.price;
          break;
        case "popular":
          aValue = a.popular ? 1 : 0;
          bValue = b.popular ? 1 : 0;
          break;
        default:
          return 0;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [
    allServices,
    searchTerm,
    selectedCategory,
    sortBy,
    sortOrder,
    priceRange,
  ]);

  // Group services by category for display
  const servicesByCategory = useMemo(() => {
    const grouped: Record<string, typeof filteredServices> = {};
    filteredServices.forEach((service) => {
      if (!grouped[service.categoryTitle]) {
        grouped[service.categoryTitle] = [];
      }
      grouped[service.categoryTitle].push(service);
    });
    return grouped;
  }, [filteredServices]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setPriceRange("all");
    setSortBy("name");
    setSortOrder("asc");
  };

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Error loading services</h1>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Services | {siteConfig.name}</title>
        <meta
          name="description"
          content="Browse our comprehensive tech support services for all your technology needs."
        />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-white via-purple-50 to-rose-100 py-20 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-rose-100 to-white opacity-80 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-purple-900 drop-shadow-lg">
              Our Tech Support Services
            </h1>
            <p className="text-xl mb-8 opacity-95 leading-relaxed font-medium text-gray-700 drop-shadow">
              From computer issues to smart home setup, our tech experts are
              ready to solve your tech problems with professional, reliable
              solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Badge
                variant="secondary"
                className="text-lg px-6 py-3 bg-white/60 border-2 border-[#CBA258] text-purple-900 font-semibold shadow-lg flex items-center gap-2"
              >
                <Layers className="w-5 h-5 mr-2 text-[#CBA258]" />
                {filteredServices.length} Services Available
              </Badge>
              <Badge
                variant="secondary"
                className="text-lg px-6 py-3 bg-white/60 border-2 border-[#CBA258] text-purple-900 font-semibold shadow-lg flex items-center gap-2"
              >
                <span className="inline-block w-4 h-4 rounded-full bg-[#CBA258] mr-2" />
                {categoriesWithServices?.length || 0} Categories
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-[#F6FFF9] border-b sticky top-16 z-30 shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Search */}
            <div className="relative lg:col-span-2">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#00704A] h-5 w-5" />
              <Input
                placeholder="Search services, categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-lg border-2 border-[#00704A] focus:border-[#FFD700] rounded-2xl bg-white shadow-md text-[#00704A] font-semibold"
              />
            </div>

            {/* Category Filter */}
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="h-12 border-2 border-[#00704A] rounded-2xl bg-white shadow-md text-[#00704A] font-semibold">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-[#00704A] rounded-xl">
                <SelectItem value="all">All Categories</SelectItem>
                {categoriesWithServices?.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^a-z0-9-]/g, "")}
                  >
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Range Filter */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="h-12 border-2 border-[#00704A] rounded-2xl bg-white shadow-md text-[#00704A] font-semibold">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-[#00704A] rounded-xl">
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-50">Under $50</SelectItem>
                <SelectItem value="50-100">$50 - $100</SelectItem>
                <SelectItem value="100-200">$100 - $200</SelectItem>
                <SelectItem value="over-200">Over $200</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <div className="flex gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="flex-1 h-12 border-2 border-[#00704A] rounded-2xl bg-white shadow-md text-[#00704A] font-semibold">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-[#00704A] rounded-xl">
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 border-2 border-[#FFD700] rounded-2xl bg-white shadow-md hover:bg-[#00704A] hover:text-white text-[#00704A]"
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
              >
                {sortOrder === "asc" ? (
                  <SortAsc className="h-5 w-5 text-[#FFD700]" />
                ) : (
                  <SortDesc className="h-5 w-5 text-[#FFD700]" />
                )}
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm ||
            selectedCategory !== "all" ||
            priceRange !== "all") && (
            <div className="flex flex-wrap gap-3 mt-6 items-center">
              <span className="text-sm font-semibold text-[#00704A]">
                Active filters:
              </span>
              {searchTerm && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-2 px-4 py-2 bg-[#00704A] text-white rounded-xl shadow"
                >
                  Search: {searchTerm}
                  <X
                    className="h-4 w-4 cursor-pointer hover:text-[#FFD700]"
                    onClick={() => setSearchTerm("")}
                  />
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-2 px-4 py-2 bg-[#00704A] text-white rounded-xl shadow"
                >
                  Category:{" "}
                  {
                    categoriesWithServices?.find(
                      (c) =>
                        c.title
                          .toLowerCase()
                          .replace(/\s+/g, "-")
                          .replace(/[^a-z0-9-]/g, "") === selectedCategory
                    )?.title
                  }
                  <X
                    className="h-4 w-4 cursor-pointer hover:text-[#FFD700]"
                    onClick={() => setSelectedCategory("all")}
                  />
                </Badge>
              )}
              {priceRange !== "all" && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-2 px-4 py-2 bg-[#00704A] text-white rounded-xl shadow"
                >
                  Price: {priceRange}
                  <X
                    className="h-4 w-4 cursor-pointer hover:text-[#FFD700]"
                    onClick={() => setPriceRange("all")}
                  />
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-8 px-4 hover:bg-[#FFD700]/10 hover:text-[#00704A] font-semibold"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Services Grid */}
      <div className="bg-gradient-to-br from-[#F6FFF9] to-white py-16 min-h-[40vh]">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 9 }).map((_, i) => (
                <Skeleton key={i} className="h-96 rounded-2xl bg-[#E6F4EC]" />
              ))}
            </div>
          ) : filteredServices.length > 0 ? (
            <div className="space-y-20">
              {Object.entries(servicesByCategory).map(
                ([categoryTitle, services]) => (
                  <div key={categoryTitle} className="space-y-10">
                    {/* Category Header */}
                    <div className="text-center">
                      <div className="inline-flex items-center gap-3 bg-[#00704A] px-10 py-5 rounded-3xl shadow-xl border-4 border-[#FFD700]/40">
                        <Layers className="w-7 h-7 text-[#FFD700] drop-shadow" />
                        <h2 className="text-3xl font-extrabold text-white tracking-tight drop-shadow">
                          {categoryTitle}
                        </h2>
                        <Badge className="bg-[#FFD700] text-[#00704A] px-4 py-2 font-bold text-lg shadow">
                          {services.length}{" "}
                          {services.length === 1 ? "Service" : "Services"}
                        </Badge>
                      </div>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                      {services.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="bg-white rounded-3xl p-12 shadow-2xl max-w-md mx-auto border-4 border-[#FFD700]/30">
                <Filter className="h-20 w-20 text-[#00704A] mx-auto mb-6" />
                <h3 className="text-3xl font-extrabold mb-4 text-[#00704A]">
                  No services found
                </h3>
                <p className="text-[#00704A]/80 mb-8 text-lg leading-relaxed">
                  Try adjusting your search criteria or filters to find what
                  you're looking for.
                </p>
                <Button
                  onClick={clearFilters}
                  className="bg-[#00704A] hover:bg-[#005c36] text-white px-8 py-3 rounded-2xl font-bold shadow-lg"
                >
                  Clear all filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ServicesPage;
