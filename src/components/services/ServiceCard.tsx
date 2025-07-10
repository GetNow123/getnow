import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Star,
  ArrowRight,
  ExternalLink,
  ShoppingCart,
} from "lucide-react";
import { Service } from "@/hooks/useServices";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ServiceCardProps {
  service: Service;
  linkPath?: string;
  addToCartButtonClass?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  linkPath,
  addToCartButtonClass,
}) => {
  const defaultLinkPath = `/service/${service.slug}`;
  const finalLinkPath = linkPath || defaultLinkPath;
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(service);
    toast({
      title: "Added to cart",
      description: `${service.title} has been added to your cart.`,
    });
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-blue-100 via-blue-50 to-white overflow-hidden h-full relative hover:-translate-y-2 rounded-2xl border-blue-100">
      <Link to={finalLinkPath} className="block">
        <div className="relative overflow-hidden">
          <img
            src={service.image_url}
            alt={service.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer rounded-t-2xl"
          />
          {service.popular && (
            <Badge className="absolute top-3 left-3 bg-yellow-500 text-yellow-900 border-0 shadow-lg">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Popular
            </Badge>
          )}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
            <ArrowRight className="w-4 h-4 text-onassist-primary" />
          </div>
        </div>

        <CardContent className="p-7 flex flex-col h-full bg-transparent">
          <div className="flex-1">
            <h3 className="font-bold text-xl mb-3 group-hover:text-foreground transition-colors leading-tight text-foreground">
              {service.title}
            </h3>
            <p className="text-foreground/80 mb-4 line-clamp-3 leading-relaxed">
              {service.description}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-foreground/70">
                <Clock className="w-4 h-4" />
                <span>{service.duration}</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                ${service.price}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <Button
                onClick={handleAddToCart}
                className={
                  addToCartButtonClass
                    ? addToCartButtonClass
                    : "w-full bg-gradient-to-br from-slate-900 via-purple-900 to-rose-900 text-white font-medium text-lg rounded-xl py-3 shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                }
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2 text-white" />
                Add to Cart - ${service.price}
              </Button>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ServiceCard;
