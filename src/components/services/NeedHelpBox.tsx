import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Phone,
  MessageCircle,
  MapPin,
  Headphones,
  CheckCircle,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { useNavigate } from "react-router-dom";

interface NeedHelpBoxProps {
  serviceTitle?: string;
}

const GOLD = "#FFD700";
const GREEN = "#00704A";

const NeedHelpBox: React.FC<NeedHelpBoxProps> = ({ serviceTitle }) => {
  const navigate = useNavigate();

  const handleCall = () => {
    window.open(`tel:${siteConfig.contactPhone}`, "_self");
  };

  const handleLiveChat = () => {
    // Replace with your live chat logic or navigation
    navigate("/contact", {
      state: {
        selectedService: serviceTitle,
        subject: `Live Chat for ${serviceTitle}`,
      },
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-gradient-to-br from-slate-900 via-purple-900 to-rose-900 text-white rounded-3xl flex flex-col items-center">
      <CardContent className="p-10 flex flex-col items-center">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#a21caf] to-[#fb7185] rounded-full flex items-center justify-center shadow-lg mb-3">
            <Headphones className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-1 text-white text-center">
            Need Help?
          </h3>
          <p className="text-[#fb7185] font-semibold text-base text-center mt-2 mb-1">
            Our experts are here for you 24/7
          </p>
          <p className="text-white/90 text-center text-base mb-4">
            Get instant support or book a visit—your satisfaction is guaranteed.
          </p>
        </div>
        <div className="space-y-4 w-full mb-6">
          <Button
            onClick={handleCall}
            className="w-full bg-[#a21caf] text-white font-bold text-base px-6 py-3 rounded-xl shadow transition-all duration-300 flex items-center justify-center hover:bg-[#fb7185] border-0"
          >
            <Phone className="w-5 h-5 mr-2 text-white" />
            Call Us
          </Button>
          <Button
            onClick={handleLiveChat}
            variant="outline"
            className="w-full border-2 border-[#fb7185] bg-white text-[#a21caf] font-bold text-base px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center hover:border-[#a21caf] hover:text-[#fb7185]"
          >
            <MessageCircle className="w-5 h-5 mr-2 text-[#fb7185]" />
            Live Chat
          </Button>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <CheckCircle className="w-5 h-5 text-[#a21caf]" />
          <span className="text-xs font-semibold text-[#f5d0fe]">
            100% Satisfaction Guarantee
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default NeedHelpBox;
