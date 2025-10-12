import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Spline3D } from "../Spline3D";
import {
  Satellite,
  Bell,
  MapPin,
  Shield,
  Zap,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

interface WelcomeScreenProps {
  onComplete: () => void;
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const slides = [
    {
      title: "SentinelX",
      subtitle: "Disaster Monitoring & Alert Platform",
      description: "Real-time AI-powered disaster prediction and community safety alerts",
      icon: Satellite,
      color: "sentinelx-alert-yellow",
    },
    {
      title: "AI-Powered Predictions",
      subtitle: "Machine Learning & Satellite Data",
      description: "Advanced ML algorithms analyze flood risks, heatwaves, and misinformation patterns",
      icon: Zap,
      color: "blue-400",
    },
    {
      title: "Community Protection",
      subtitle: "Real-time Alerts & Verification",
      description: "Get instant notifications and report incidents with AI verification",
      icon: Shield,
      color: "green-400",
    },
  ];

  const currentSlideData = slides[currentSlide];
  const CurrentIcon = currentSlideData.icon;

  const handleSubscribe = async () => {
    if (!phoneNumber.trim() || !location.trim()) return;
    
    setIsSubscribing(true);
    
    // Mock subscription process
    setTimeout(() => {
      setIsSubscribing(false);
      setIsSubscribed(true);
      
      // Auto complete after success
      setTimeout(() => {
        onComplete();
      }, 2000);
    }, 2000);
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  if (isSubscribed) {
    return (
      <div className="min-h-screen bg-sentinelx-deep-blue flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1 }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="h-10 w-10 text-white" />
          </motion.div>
          <h2 className="text-xl text-white mb-2">Welcome to SentinelX!</h2>
          <p className="text-muted-foreground">You&apos;ll receive alerts for your area</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sentinelx-deep-blue flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Satellite className="h-6 w-6 text-sentinelx-alert-yellow" />
          <span className="text-lg text-white font-medium">SentinelX</span>
        </div>
        <div className="flex gap-1">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-sentinelx-alert-yellow' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* 3D Visual */}
        <div className="h-64 p-4">
          <Card className="sentinelx-glass border-sentinelx-glass-border h-full">
            <CardContent className="p-0 h-full">
              <Spline3D 
                type={currentSlide === 0 ? "globe" : currentSlide === 1 ? "satellite" : "network"} 
                className="w-full h-full" 
              />
            </CardContent>
          </Card>
        </div>

        {/* Slide Content */}
        <div className="flex-1 p-6">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="text-center space-y-4"
          >
            <div className={`inline-flex p-3 rounded-full bg-${currentSlideData.color}/20 mb-4`}>
              <CurrentIcon className={`h-8 w-8 text-${currentSlideData.color}`} />
            </div>

            <h1 className="text-2xl text-white font-medium">{currentSlideData.title}</h1>
            <h2 className="text-lg text-sentinelx-alert-yellow">{currentSlideData.subtitle}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {currentSlideData.description}
            </p>
          </motion.div>

          {/* Features List */}
          {currentSlide === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 space-y-3"
            >
              {[
                "Flash flood ML predictions",
                "Heatwave index monitoring",
                "Misinformation detection",
                "Community verified reports",
                "Multi-language voice support",
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                  <span className="text-white">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Subscription Form (Last Slide) */}
        {currentSlide === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 pt-0"
          >
            <Card className="sentinelx-glass border-sentinelx-glass-border">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <Bell className="h-5 w-5 text-sentinelx-alert-yellow" />
                  <h3 className="text-white font-medium">Subscribe for Alerts</h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground block mb-1">Phone Number</label>
                    <Input
                      placeholder="+1 (555) 123-4567"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="bg-sentinelx-glass-bg border-sentinelx-glass-border text-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground block mb-1">Your Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="City, State or ZIP code"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="bg-sentinelx-glass-bg border-sentinelx-glass-border text-white pl-10"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-200">
                      You&apos;ll receive emergency alerts for your area. Standard message rates may apply.
                    </p>
                  </div>

                  <Button
                    onClick={handleSubscribe}
                    disabled={!phoneNumber.trim() || !location.trim() || isSubscribing}
                    className="w-full bg-sentinelx-alert-yellow hover:bg-sentinelx-alert-yellow/80 text-black font-medium h-12"
                  >
                    {isSubscribing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <Bell className="h-4 w-4 mr-2" />
                        Subscribe to Alerts
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Navigation */}
        {currentSlide < 2 && (
          <div className="p-6 pt-0">
            <Button
              onClick={nextSlide}
              className="w-full bg-sentinelx-alert-yellow hover:bg-sentinelx-alert-yellow/80 text-black font-medium h-12"
            >
              Continue
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}

        {currentSlide < 2 && (
          <div className="p-6 pt-2">
            <Button
              variant="ghost"
              onClick={onComplete}
              className="w-full text-muted-foreground hover:text-white"
            >
              Skip for now
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
