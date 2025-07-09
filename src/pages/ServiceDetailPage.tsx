import React, { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import NeedHelpBox from "@/components/services/NeedHelpBox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/config/site";
import { useServiceBySlug, useCategoryBySlug } from "@/hooks/useServices";
import { useCart } from "@/contexts/CartContext";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Clock,
  Star,
  CheckCircle,
  Phone,
  Globe,
  Home,
  ShoppingCart,
  Users,
  Award,
  Zap,
  Shield,
  Wrench,
  Monitor,
  Headphones,
  Settings,
  MessageCircle,
  ThumbsUp,
  Calendar,
  TrendingUp,
  FileCheck,
  MapPin,
  Sparkles,
  Heart,
  Target,
  Cpu,
  Wifi,
  Database,
  Code,
  Smartphone,
  Laptop,
  HardDrive,
  Play,
  Quote,
  AlertCircle,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useToast } from "@/hooks/use-toast";
import { testimonialsData } from "@/utils/testimonialsData";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ServiceLead } from "@/types/supabase";
import { techniciansData } from "@/utils/techniciansData";
import ReCAPTCHA from "react-google-recaptcha";
import { useDynamicSiteConfig } from "@/hooks/useDynamicSiteConfig";
import { useSiteSettings } from "@/hooks/useSiteSettings";

// Add this at the top of the file, after imports
const gradientAnimation = `
  @keyframes gradient-x {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 0%;
    }
    100% {
      background-position: 0% 0%;
    }
  }

  .gradient-border {
    position: relative;
    border-radius: 1.5rem;
    padding: 2px;
    background: linear-gradient(90deg, #00704A, #1E3932, #D4E9E2, #00704A);
    background-size: 300% 100%;
    animation: gradient-x 3s linear infinite;
  }

  .gradient-border::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 1.5rem;
    padding: 2px;
    background: linear-gradient(90deg, #00704A, #1E3932, #D4E9E2, #00704A);
    background-size: 300% 100%;
    animation: gradient-x 3s linear infinite;
    -webkit-mask: 
      linear-gradient(#D4E9E2 0 0) content-box, 
      linear-gradient(#D4E9E2 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

// Helper to get n random unique items from an array
function getRandomItems<T>(arr: T[], n: number): T[] {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

const GOLD = "#FFD700";
const GREEN = "#00704A";
const LIGHT_GREEN = "#E6F4EF";

const ServiceDetailPage = () => {
  const { serviceSlug } = useParams();
  const { config } = useDynamicSiteConfig();
  const {
    data: siteSettings,
    updateSiteSettings,
    isUpdating,
  } = useSiteSettings();

  const navigate = useNavigate();
  const {
    data: service,
    isLoading,
    error,
  } = useServiceBySlug(serviceSlug || "");
  const { addToCart } = useCart();
  const { toast: useToastToast } = useToast();

  // Get category data for breadcrumb
  const { data: category } = useCategoryBySlug(
    service
      ? service.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")
      : ""
  );

  // Get random testimonials
  const randomTestimonials = useMemo(() => {
    const shuffled = [...testimonialsData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    preferredDateTime: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");

  // Update service field whenever service data changes
  useEffect(() => {
    if (service) {
      setFormData((prev) => ({
        ...prev,
        service: service.title,
      }));
    }
  }, [service]);

  const handleGoBack = () => {
    navigate("/services");
  };

  const handleAddToCart = () => {
    if (service) {
      addToCart(service);
      toast.success(`${service.title} has been added to your cart.`);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    const phoneRegex = /^\+[1-9]\d{9,14}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone =
        "Please enter a valid phone number with country code (e.g., +1234567890)";
    }

    // DateTime validation
    if (!formData.preferredDateTime) {
      newErrors.preferredDateTime = "Preferred date and time is required";
    } else {
      const selectedDate = new Date(formData.preferredDateTime);
      const now = new Date();

      if (selectedDate < now) {
        newErrors.preferredDateTime = "Please select a future date and time";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    // Special handling for phone number
    if (name === "phone") {
      // Remove any spaces or special characters except +
      const cleanedValue = value.replace(/[^\d+]/g, "");
      // Ensure only one + at the start
      const formattedValue = cleanedValue.startsWith("+")
        ? "+" + cleanedValue.slice(1).replace(/\+/g, "")
        : "+" + cleanedValue;

      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recaptchaToken) {
      setErrors((prev) => ({
        ...prev,
        recaptcha: "Please complete the captcha",
      }));
      return;
    }
    if (!validateForm()) {
      toast.error("Please fix the errors in the form", {
        description: "All fields are required and must be valid",
        duration: 5000,
      });
      return;
    }
    setIsSubmitting(true);

    try {
      // Format the data for Supabase
      const leadData: Omit<ServiceLead, "id" | "created_at" | "updated_at"> = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        service: formData.service.trim(),
        preferred_datetime: formData.preferredDateTime,
        message: formData.message.trim() || null,
        status: "pending",
        active: true,
      };

      // Insert into Supabase
      const { data, error } = await supabase
        .from("service_leads")
        .insert([leadData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Show success toast
      toast.success("Request submitted successfully!", {
        description: "We'll contact you shortly to confirm your appointment.",
        duration: 5000,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: service?.title || "",
        preferredDateTime: "",
        message: "",
      });
      setErrors({});
      setRecaptchaToken("");
    } catch (error: unknown) {
      console.error("Error submitting form:", error);

      // Show error toast with specific message
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Please try again later or contact support.";

      toast.error("Failed to submit request", {
        description: errorMessage,
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center">
          <div className="text-center bg-white rounded-3xl shadow-2xl p-12 max-w-md mx-4">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-gray-900">
              Service Not Found
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              The service you're looking for doesn't exist or has been moved.
            </p>
            <Button
              onClick={handleGoBack}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (isLoading || !service) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="container mx-auto px-4 py-16">
            <div className="animate-pulse">
              <Skeleton className="h-12 w-96 mb-8 rounded-xl" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <Skeleton className="h-96 w-full rounded-3xl" />
                  <Skeleton className="h-32 w-full rounded-2xl" />
                  <Skeleton className="h-48 w-full rounded-2xl" />
                </div>
                <div className="space-y-6">
                  <Skeleton className="h-64 w-full rounded-2xl" />
                  <Skeleton className="h-48 w-full rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <style>{gradientAnimation}</style>
      <Helmet>
        <title>
          {service.title} | {siteConfig.name}
        </title>
        <meta name="description" content={service.description} />
        {siteSettings?.description && (
          <script type="application/ld+json">
            {`
        {
          "description": "${siteSettings.description.replace(/"/g, '\\"')}"
        }
      `}
          </script>
        )}
      </Helmet>

      {/* Hero Breadcrumb */}
      <div className="bg-[#00704A] relative overflow-hidden pb-0 w-full box-border overflow-x-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(120deg, rgba(255,215,0,0.08) 0%, rgba(0,112,74,0.0) 60%)",
          }}
        ></div>
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container mx-auto px-4 py-4 relative z-10 w-full box-border overflow-x-hidden">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    to="/"
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300"
                  >
                    <Home className="w-4 h-4" />
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/60" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    to="/services"
                    className="text-white/80 hover:text-white transition-colors duration-300"
                  >
                    Services
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/60" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium text-white">
                  {service.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center gap-4 mb-2">
            <Button
              onClick={handleGoBack}
              variant="ghost"
              className="text-white hover:bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
            {service.popular && (
              <Badge className="bg-[#FFD700] text-[#00704A] border-0 px-4 py-2 text-sm font-semibold rounded-full shadow-lg animate-bounce">
                <Star className="w-4 h-4 mr-1 fill-current text-[#00704A]" />
                Trending
              </Badge>
            )}
          </div>

          {/* Hero Main Section: Service Info (left) + Form (right) */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_48px_1fr] gap-0 lg:gap-24 items-stretch justify-between py-8 w-full box-border overflow-x-hidden">
            {/* Left: Service Info */}
            <div className="pr-0 lg:pr-16 flex flex-col justify-between min-h-[650px] py-8 lg:py-12 w-full box-border overflow-x-hidden">
              <div>
                <div className="relative group mb-8">
                  <div className="absolute inset-0 bg-[#E6F4EF] rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                  <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="relative">
                      <img
                        src={service.image_url}
                        alt={service.title}
                        className="w-full h-80 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105 rounded-t-3xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                          <Play className="w-8 h-8 text-[#00704A] ml-1" />
                        </div>
                      </div>
                      {service.popular && (
                        <div className="absolute top-6 right-6 bg-[#FFD700] text-[#00704A] px-4 py-2 rounded-full font-semibold shadow-lg">
                          <Sparkles className="w-4 h-4 inline mr-1 text-[#00704A]" />
                          Popular Choice
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-[#E6F4EF] to-[#FFD700] bg-clip-text text-transparent mb-6 leading-tight">
                  {service.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light mb-8">
                  {service.description}
                </p>
              </div>
            </div>
            {/* Divider for large screens */}
            <div className="hidden lg:flex justify-center items-center h-full">
              <div className="w-1 h-[650px] bg-gradient-to-b from-white/10 via-[#FFD700]/40 to-white/10 mx-auto rounded-full"></div>
            </div>
            {/* Right: Lead Generation Form */}
            <div className="relative flex flex-col justify-between items-center mt-16 lg:mt-0 min-h-[650px] py-8 lg:py-12 w-full max-w-full box-border overflow-x-hidden">
              <div className="absolute inset-0 blur-xl bg-gradient-to-br from-[#FFD700]/10 via-[#E6F4EF]/30 to-white/30 rounded-3xl z-0 w-full h-full max-w-full box-border overflow-x-hidden"></div>
              <div
                className="relative bg-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14 rounded-3xl shadow-2xl border-2 border-[#E6F4EF] max-w-full w-full flex flex-col justify-center min-h-[650px] lg:ml-0 lg:mr-4 box-border overflow-x-hidden"
                style={{ overflow: "hidden" }}
              >
                <h2 className="text-3xl font-extrabold mb-6 text-center text-[#00704A] drop-shadow">
                  Request This Service
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="font-semibold text-[#00704A] flex items-center gap-2"
                      >
                        <Users className="w-5 h-5" style={{ color: GOLD }} />{" "}
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className={`w-full p-3 rounded-xl border ${
                          errors.name ? "border-red-500" : "border-[#E6F4EF]"
                        } focus:ring-2 focus:ring-[#00704A] focus:border-[#00704A] transition bg-[#F8FCFA]`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.name}
                        </p>
                      )}
                    </div>
                    {/* Email Field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="font-semibold text-[#00704A] flex items-center gap-2"
                      >
                        <MessageCircle
                          className="w-5 h-5"
                          style={{ color: GOLD }}
                        />{" "}
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className={`w-full p-3 rounded-xl border ${
                          errors.email ? "border-red-500" : "border-[#E6F4EF]"
                        } focus:ring-2 focus:ring-[#00704A] focus:border-[#00704A] transition bg-[#F8FCFA]`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                    {/* Phone Field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="font-semibold text-[#00704A] flex items-center gap-2"
                      >
                        <Phone className="w-5 h-5" style={{ color: GOLD }} />{" "}
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 234 567 8900"
                        className={`w-full p-3 rounded-xl border ${
                          errors.phone ? "border-red-500" : "border-[#E6F4EF]"
                        } focus:ring-2 focus:ring-[#00704A] focus:border-[#00704A] transition bg-[#F8FCFA]`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Service Field (Pre-filled) */}
                    <div className="space-y-2">
                      <label
                        htmlFor="service"
                        className="font-semibold text-[#00704A] flex items-center gap-2"
                      >
                        <Wrench className="w-5 h-5" style={{ color: GOLD }} />{" "}
                        Service
                      </label>
                      <input
                        type="text"
                        id="service"
                        name="service"
                        value={formData.service}
                        readOnly
                        className="w-full p-3 rounded-xl border border-[#E6F4EF] bg-[#F8FCFA] text-[#00704A]"
                      />
                    </div>
                    {/* Preferred Date & Time Field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="preferredDateTime"
                        className="font-semibold text-[#00704A] flex items-center gap-2"
                      >
                        <Calendar className="w-5 h-5" style={{ color: GOLD }} />{" "}
                        Preferred Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        id="preferredDateTime"
                        name="preferredDateTime"
                        value={formData.preferredDateTime}
                        onChange={handleInputChange}
                        min={new Date().toISOString().slice(0, 16)}
                        step="1"
                        className={`w-full p-3 rounded-xl border ${
                          errors.preferredDateTime
                            ? "border-red-500"
                            : "border-[#E6F4EF]"
                        } focus:ring-2 focus:ring-[#00704A] focus:border-[#00704A] transition bg-[#F8FCFA]`}
                      />
                      {errors.preferredDateTime && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.preferredDateTime}
                        </p>
                      )}
                    </div>
                    {/* Message Field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="font-semibold text-[#00704A] flex items-center gap-2"
                      >
                        <MessageCircle
                          className="w-5 h-5"
                          style={{ color: GOLD }}
                        />{" "}
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Any additional information or requirements..."
                        rows={4}
                        className="w-full p-3 rounded-xl border border-[#E6F4EF] focus:ring-2 focus:ring-[#00704A] focus:border-[#00704A] transition resize-none bg-[#F8FCFA]"
                      />
                    </div>
                  </div>
                  {/* ReCAPTCHA */}
                  <div className="md:col-span-2">
                    <ReCAPTCHA
                      sitekey="6LdruW4rAAAAAC3sFRlPA4oMsKQi8CQB2ObSPzZa"
                      onChange={(token) => setRecaptchaToken(token || "")}
                    />
                    {errors.recaptcha && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.recaptcha}
                      </p>
                    )}
                  </div>
                  {/* Submit Button - Full Width */}
                  <div className="md:col-span-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#00704A] hover:bg-[#005f3a] text-white font-bold py-4 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg border-0"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Request"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* Key Metrics - Centered, Full Width Below Hero */}
          <div className="flex justify-center mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
              <div className="group">
                <div className="bg-gradient-to-br from-[#E6F4EF] to-white p-8 rounded-3xl text-[#00704A] shadow-2xl transition-all duration-300 hover:shadow-3xl hover:-translate-y-2 min-h-[140px] flex flex-col justify-between border-2 border-[#E6F4EF]">
                  <div className="text-4xl font-bold mb-2 truncate">
                    ${service.price}
                  </div>
                  <div className="text-[#00704A]/80 font-medium break-words">
                    Starting Price
                  </div>
                  <div className="mt-4 text-[#00704A]/60 text-sm break-words">
                    Professional Rate
                  </div>
                </div>
              </div>
              <div className="group">
                <div className="bg-gradient-to-br from-[#E6F4EF] to-white p-8 rounded-3xl text-[#00704A] shadow-2xl transition-all duration-300 hover:shadow-3xl hover:-translate-y-2 min-h-[140px] flex flex-col justify-between border-2 border-[#E6F4EF]">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-8 h-8 text-[#00704A]" />
                    <span className="text-4xl font-bold truncate">
                      {service.duration}
                    </span>
                  </div>
                  <div className="text-[#00704A]/80 font-medium break-words">
                    Service Duration
                  </div>
                  <div className="mt-4 text-[#00704A]/60 text-sm break-words">
                    Estimated Time
                  </div>
                </div>
              </div>
              <div className="group">
                <div className="bg-gradient-to-br from-[#E6F4EF] to-white p-8 rounded-3xl text-[#00704A] shadow-2xl transition-all duration-300 hover:shadow-3xl hover:-translate-y-2 min-h-[140px] flex flex-col justify-between border-2 border-[#E6F4EF]">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-8 h-8 text-[#FFD700]" />
                    <span className="text-4xl font-bold truncate">Expert</span>
                  </div>
                  <div className="text-[#00704A]/80 font-medium break-words">
                    Certified Tech
                  </div>
                  <div className="mt-4 text-[#00704A]/60 text-sm break-words">
                    Professional Grade
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[#E6F4EF] min-h-screen w-full box-border overflow-x-hidden">
        <div className="container mx-auto px-4 py-12 w-full box-border overflow-x-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch min-h-[700px] w-full box-border overflow-x-hidden">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12 flex flex-col h-full min-h-[700px]">
              {/* Service Features */}
              <Card className="shadow-2xl border-0 bg-white rounded-3xl overflow-hidden">
                <CardContent className="p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-[#00704A] rounded-2xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-[#FFD700]" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#00704A]">
                      What's Included
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      "Expert diagnosis and troubleshooting",
                      "Professional installation and setup",
                      "Configuration and optimization",
                      "Quality testing and verification",
                      "30-day service guarantee",
                      "Follow-up support included",
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[#E6F4EF] transition-colors duration-200"
                      >
                        <div className="w-10 h-10 bg-[#E6F4EF] rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-5 h-5 text-[#00704A]" />
                        </div>
                        <span className="text-[#00704A] font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Service Process */}
              <Card className="shadow-2xl border-0 bg-white rounded-3xl overflow-hidden">
                <CardContent className="p-10">
                  <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-[#00704A] mb-4">
                      Our Service Process
                    </h2>
                    <p className="text-[#00704A]/80 text-lg">
                      Simple steps to get your technology working perfectly
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      {
                        icon: Calendar,
                        title: "Book Service",
                        desc: "Schedule your appointment online or by phone",
                        step: 1,
                        color: "from-[#E6F4EF] to-[#00704A]",
                      },
                      {
                        icon: Users,
                        title: "Expert Arrives",
                        desc: "Certified technician arrives at your location",
                        step: 2,
                        color: "from-[#FFD700] to-[#00704A]",
                      },
                      {
                        icon: Wrench,
                        title: "Professional Work",
                        desc: "Expert diagnosis and quality service delivery",
                        step: 3,
                        color: "from-[#E6F4EF] to-[#FFD700]",
                      },
                      {
                        icon: ThumbsUp,
                        title: "Satisfaction",
                        desc: "Service completion with guarantee and support",
                        step: 4,
                        color: "from-[#00704A] to-[#FFD700]",
                      },
                    ].map((process, index) => (
                      <div key={index} className="text-center group">
                        <div className="relative mb-6">
                          <div
                            className={`w-20 h-20 bg-gradient-to-br ${process.color} rounded-3xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}
                          >
                            <process.icon className="w-10 h-10 text-[#00704A]" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center text-sm font-bold text-[#00704A] shadow-lg">
                            {process.step}
                          </div>
                        </div>
                        <h3 className="font-bold text-xl mb-3 text-[#00704A]">
                          {process.title}
                        </h3>
                        <p className="text-[#00704A]/80 leading-relaxed">
                          {process.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Technology & Tools */}
              <Card className="shadow-2xl border-0 bg-[#00704A] text-white rounded-3xl overflow-hidden">
                <CardContent className="p-10">
                  <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold mb-4 text-white">
                      Professional Tools & Technology
                    </h2>
                    <p className="text-white/80 text-lg">
                      Cutting-edge equipment for superior results
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      {
                        icon: Monitor,
                        name: "Advanced Diagnostics",
                        color: "from-[#E6F4EF] to-[#00704A]",
                      },
                      {
                        icon: Settings,
                        name: "Professional Tools",
                        color: "from-[#FFD700] to-[#00704A]",
                      },
                      {
                        icon: Shield,
                        name: "Security Software",
                        color: "from-[#E6F4EF] to-[#FFD700]",
                      },
                      {
                        icon: Headphones,
                        name: "Remote Support",
                        color: "from-[#00704A] to-[#FFD700]",
                      },
                    ].map((tool, index) => (
                      <div
                        key={index}
                        className="text-center bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/10"
                      >
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${tool.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                        >
                          <tool.icon className="w-8 h-8 text-white" />
                        </div>
                        <p className="font-semibold text-sm text-white">
                          {tool.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-8 h-full min-h-[700px]">
              <NeedHelpBox serviceTitle={service.title} />
              {/* Booking Card (kept as is) */}
              <Card className="relative shadow-2xl border-0 bg-gradient-to-br from-[#E6F4EF] to-white rounded-3xl overflow-hidden">
                <div className="gradient-border">
                  <CardContent className="p-8 relative z-10 bg-gradient-to-br from-[#E6F4EF] to-white rounded-3xl">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-[#00704A] mb-2">
                        Book This Service
                      </h3>
                      <p className="text-[#00704A]/80">
                        Professional service at your fingertips
                      </p>
                    </div>
                    <div className="space-y-6">
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-[#00704A]/80 font-medium">
                            Service Price:
                          </span>
                          <div className="text-right">
                            <span className="text-3xl font-bold bg-gradient-to-r from-[#00704A] to-[#FFD700] bg-clip-text text-transparent">
                              ${service.price}
                            </span>
                            <div className="text-sm text-[#00704A]/60">
                              Starting from
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[#00704A]/80 font-medium">
                            Duration:
                          </span>
                          <div className="flex items-center gap-2 text-[#00704A]">
                            <Clock className="w-4 h-4" />
                            <span className="font-semibold">
                              {service.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <Button
                          onClick={handleAddToCart}
                          className="w-full bg-[#00704A] hover:bg-[#005f3a] text-white font-bold py-4 rounded-2xl shadow-lg transition-all duration-300 text-lg border-2 border-[#FFD700] flex items-center justify-center gap-2"
                        >
                          <ShoppingCart className="w-5 h-5 mr-2 text-[#FFD700]" />
                          Add to Cart
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-2 border-[#00704A] text-[#00704A] hover:bg-[#E6F4EF] hover:text-[#00704A] font-bold py-4 rounded-2xl transition-all duration-300"
                          onClick={() =>
                            window.open(
                              `tel:${siteConfig.contactPhone}`,
                              "_self"
                            )
                          }
                        >
                          <Phone className="w-5 h-5 mr-2" />
                          Call to Book Now
                        </Button>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-[#00704A]/60 mb-2">
                          Quick Response
                        </div>
                        <div className="flex items-center justify-center gap-2 text-[#00704A]">
                          <CheckCircle className="w-4 h-4" />
                          <span className="font-medium">
                            Usually responds in 1 hour
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
          {/* Bottom Full-Width Row: Tech Expertise, Service Guarantee, Need Help */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {/* Our Tech Expertise */}
            <Card className="shadow-2xl border-0 bg-[#00704A] text-white rounded-3xl overflow-hidden h-full">
              <CardContent className="p-8 flex flex-col items-center">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#00704A] rounded-full flex items-center justify-center shadow-lg mb-3">
                    <Cpu className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#FFD700] mb-1 text-center">
                    Our Tech Expertise
                  </h3>
                  <p className="text-white/80 text-sm text-center">
                    Specialized knowledge across all technology domains
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                  {[
                    {
                      icon: Laptop,
                      name: "Laptops",
                    },
                    {
                      icon: Smartphone,
                      name: "Mobile",
                    },
                    {
                      icon: Monitor,
                      name: "Desktops",
                    },
                    {
                      icon: HardDrive,
                      name: "Storage",
                    },
                  ].map((tech, index) => (
                    <div
                      key={index}
                      className="text-center group transition-all duration-300 hover:scale-105"
                    >
                      <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-lg group-hover:shadow-xl">
                        <tech.icon className="w-7 h-7 text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)]" />
                      </div>
                      <p className="font-semibold text-white text-base">
                        {tech.name}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Service Guarantee */}
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-[#E6F4EF] via-white to-[#E6F4EF] rounded-3xl overflow-hidden h-full">
              <CardContent className="p-8 flex flex-col items-center">
                <div className="flex flex-col items-center mb-6">
                  <div className="relative w-16 h-16 mb-3">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00704A] to-[#FFD700] rounded-full flex items-center justify-center shadow-lg"></div>
                    <Shield className="w-8 h-8 text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center border-2 border-[#FFD700] shadow">
                      <CheckCircle className="w-5 h-5 text-[#FFD700]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#00704A] mb-1">
                    Service Guarantee
                  </h3>
                </div>
                <div className="space-y-3 w-full">
                  {[
                    `${
                      config.service_warranty_days || "30"
                    } day service warranty`,
                    `${
                      config.satisfaction_guarantee_percent || "100"
                    }% satisfaction guaranteed`,
                    config.followup_support_text || "Free follow-up support",
                  ].map((guarantee, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-[#E6F4EF]"
                    >
                      <CheckCircle className="w-5 h-5 text-[#00704A] flex-shrink-0" />
                      <span className="font-medium text-[#00704A] text-base">
                        {guarantee}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Need Help? */}
            <Card className="shadow-2xl border-0 bg-[#00704A] text-white rounded-3xl overflow-hidden h-full">
              <CardContent className="p-8 flex flex-col items-center">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#00704A] rounded-full flex items-center justify-center shadow-lg mb-3">
                    <Headphones className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-white">
                    Need Help?
                  </h3>
                </div>
                <div className="space-y-4 w-full">
                  <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-200 cursor-pointer">
                    <Phone className="w-5 h-5 text-[#FFD700]" />
                    <div>
                      <div className="font-medium text-base text-white">
                        Call Us
                      </div>
                      <div className="text-xs text-[#FFD700]">24/7 Support</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-200 cursor-pointer">
                    <MessageCircle className="w-5 h-5 text-white" />
                    <div>
                      <div className="font-medium text-base text-white">
                        Live Chat
                      </div>
                      <div className="text-xs text-white">Instant Response</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-200 cursor-pointer">
                    <MapPin className="w-5 h-5 text-[#FFD700]" />
                    <div>
                      <div className="font-medium text-base text-white">
                        On-Site Service
                      </div>
                      <div className="text-xs text-[#FFD700]">
                        At Your Location
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Testimonials Section */}
          <div className="container mx-auto px-4 mt-20">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-[#FFD700]/20 text-[#00704A] rounded-full px-6 py-2 mb-4">
                <Heart className="w-5 h-5 text-[#FFD700]" />
                <span className="font-medium">Happy Customers</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#00704A]">
                What Our Customers Say
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {getRandomItems(testimonialsData, 3).map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="shadow-xl border-0 bg-gradient-to-br from-[#E6F4EF] to-white hover:shadow-2xl transition-all duration-300"
                >
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-6 h-6 text-[#FFD700] fill-current"
                          />
                        )
                      )}
                    </div>
                    <p className="text-[#00704A] mb-6 italic text-lg leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#FFD700]"
                      />
                      <div>
                        <div className="font-bold text-lg text-[#00704A]">
                          {testimonial.name}
                        </div>
                        <div className="text-[#00704A]/80">
                          {testimonial.location}
                        </div>
                        <div className="text-xs text-[#00704A]/60">
                          {testimonial.service}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          {/* Meet Our Technicians Section */}
          <div className="container mx-auto px-4 mt-20">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-[#E6F4EF] text-[#00704A] rounded-full px-6 py-2 mb-4">
                <Users className="w-5 h-5" />
                <span className="font-medium">Meet Our Technicians</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#00704A]">
                Our Top Experts
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {getRandomItems(techniciansData, 3).map((tech) => (
                <Card
                  key={tech.id}
                  className="shadow-xl text-center border-0 bg-gradient-to-b from-white to-[#E6F4EF] hover:shadow-2xl transition-all duration-300"
                >
                  <CardContent className="p-8">
                    <div className="relative mb-6">
                      <img
                        src={tech.image}
                        alt={tech.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-[#00704A] rounded-full p-2">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-[#00704A]">
                      {tech.name}
                    </h3>
                    <p className="text-[#00704A] font-semibold mb-2">
                      {tech.title}
                    </p>
                    <p className="text-[#00704A]/80 mb-2">
                      {tech.experience} experience
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mb-2">
                      {tech.specialties.map((spec, i) => (
                        <span
                          key={i}
                          className="bg-[#E6F4EF] text-[#00704A] rounded-full px-3 py-1 text-xs font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-[#00704A]/80 mb-2">
                      <Star className="w-5 h-5 text-[#FFD700] fill-current" />
                      <span className="font-medium">
                        {tech.rating.toFixed(1)} Rating
                      </span>
                      <span className="mx-2">·</span>
                      <span className="text-xs">{tech.completedJobs} jobs</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                      {tech.certifications.map((cert, i) => (
                        <span
                          key={i}
                          className="bg-[#FFD700]/20 text-[#00704A] rounded-full px-3 py-1 text-xs font-medium"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceDetailPage;
