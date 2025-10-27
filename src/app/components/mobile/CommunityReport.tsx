import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import {
  Camera,
  MapPin,
  Upload,
  X,
  CheckCircle,
  AlertTriangle,
  Waves,
  Users,
  Clock,
  Filter,
  Eye,
  MessageSquare,
} from "lucide-react";

interface CommunityReportProps {
  onBack: () => void;
}

interface Report {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  timestamp: Date;
  status: "pending" | "verified" | "false";
  severity: "low" | "medium" | "high" | "critical";
  imageUrl?: string;
  userId: string;
  votes: number;
}

const mockReports: Report[] = [
  {
    id: "1",
    title: "Road flooding on Highway 101",
    description: "Water level reaching car bumpers. Traffic severely impacted.",
    category: "flood",
    location: "Highway 101, Mile Marker 23",
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    status: "verified",
    severity: "high",
    imageUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400",
    userId: "user123",
    votes: 15,
  },
  {
    id: "2",
    title: "Heavy rainfall causing street flooding",
    description: "Heavy downpour flooding main street, affecting traffic and businesses.",
    category: "rain",
    location: "Sunset Community Center",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    status: "verified",
    severity: "critical",
    userId: "user456",
    votes: 23,
  },
  {
    id: "3",
    title: "False evacuation notice spreading",
    description: "Fake evacuation order being shared on social media for downtown area.",
    category: "misinformation",
    location: "Downtown District",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: "verified",
    severity: "medium",
    userId: "user789",
    votes: 8,
  },
];

const reportCategories = [
  { value: "flood", label: "Flooding", icon: Waves, color: "blue" },
  { value: "rain", label: "Heavy Rainfall", icon: Waves, color: "cyan" },
  { value: "landslide", label: "Landslide", icon: AlertTriangle, color: "orange" },
  { value: "misinformation", label: "Misinformation", icon: MessageSquare, color: "purple" },
  { value: "other", label: "Other Emergency", icon: AlertTriangle, color: "yellow" },
];

export function CommunityReport({ onBack }: CommunityReportProps) {
  const [activeTab, setActiveTab] = useState<"report" | "history">("report");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedImages(prev => [...prev, ...files].slice(0, 3)); // Max 3 images
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.category) return;
    
    setIsSubmitting(true);
    
    // Mock submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ title: "", description: "", category: "", location: "" });
        setSelectedImages([]);
      }, 3000);
    }, 2000);
  };

  const getCategoryIcon = (category: string) => {
    const cat = reportCategories.find(c => c.value === category);
    return cat ? cat.icon : AlertTriangle;
  };

  const getCategoryColor = (category: string) => {
    const cat = reportCategories.find(c => c.value === category);
    return cat ? cat.color : "gray";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "false": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "high": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const filteredReports = mockReports.filter(report => {
    const categoryMatch = filterCategory === "all" || report.category === filterCategory;
    const statusMatch = filterStatus === "all" || report.status === filterStatus;
    return categoryMatch && statusMatch;
  });

  if (isSubmitted) {
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
          <h2 className="text-xl text-white mb-2">Report Submitted!</h2>
          <p className="text-muted-foreground">Thank you for helping keep our community safe</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sentinelx-deep-blue pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 sentinelx-glass border-b border-sentinelx-glass-border p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-0">
            <X className="h-5 w-5 text-white" />
          </Button>
          <h1 className="text-lg text-white font-medium">Community Reports</h1>
        </div>

        {/* Tabs */}
        <div className="flex mt-4 bg-sentinelx-glass-bg rounded-lg p-1">
          <Button
            variant={activeTab === "report" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("report")}
            className={`flex-1 ${
              activeTab === "report" 
                ? "bg-sentinelx-alert-yellow text-black" 
                : "text-white hover:bg-sentinelx-glass-bg"
            }`}
          >
            <Upload className="h-4 w-4 mr-2" />
            Report Incident
          </Button>
          <Button
            variant={activeTab === "history" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("history")}
            className={`flex-1 ${
              activeTab === "history" 
                ? "bg-sentinelx-alert-yellow text-black" 
                : "text-white hover:bg-sentinelx-glass-bg"
            }`}
          >
            <Clock className="h-4 w-4 mr-2" />
            Report History
          </Button>
        </div>
      </div>

      <div className="p-4">
        <AnimatePresence mode="wait">
          {activeTab === "report" ? (
            <motion.div
              key="report"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Report Form */}
              <Card className="sentinelx-glass border-sentinelx-glass-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center gap-2 text-base">
                    <AlertTriangle className="h-4 w-4 text-sentinelx-alert-yellow" />
                    Report Emergency Incident
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Help others by reporting disasters in your area
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Category Selection */}
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Category *</label>
                    <Select value={formData.category} onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, category: value }))
                    }>
                      <SelectTrigger className="bg-sentinelx-glass-bg border-sentinelx-glass-border text-white">
                        <SelectValue placeholder="Select incident type" />
                      </SelectTrigger>
                      <SelectContent className="bg-sentinelx-glass-bg border-sentinelx-glass-border">
                        {reportCategories.map((category) => {
                          const Icon = category.icon;
                          return (
                            <SelectItem key={category.value} value={category.value} className="text-white">
                              <div className="flex items-center gap-2">
                                <Icon className={`h-4 w-4 text-${category.color}-400`} />
                                {category.label}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Title *</label>
                    <Input
                      placeholder="Brief description of the incident"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="bg-sentinelx-glass-bg border-sentinelx-glass-border text-white"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Description *</label>
                    <Textarea
                      placeholder="Provide detailed information about what you're seeing..."
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="bg-sentinelx-glass-bg border-sentinelx-glass-border text-white min-h-20"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Street address or landmark"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        className="bg-sentinelx-glass-bg border-sentinelx-glass-border text-white pl-10"
                      />
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Photos (Optional)</label>
                    <div className="space-y-3">
                      {selectedImages.length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                          {selectedImages.map((file, index) => (
                            <div key={index} className="relative">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-20 object-cover rounded-lg"
                              />
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {selectedImages.length < 3 && (
                        <Button
                          variant="secondary"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full bg-sentinelx-glass-bg border-sentinelx-glass-border border-dashed hover:bg-sentinelx-alert-yellow/20"
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          Add Photo ({selectedImages.length}/3)
                        </Button>
                      )}
                      
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    onClick={handleSubmit}
                    disabled={!formData.title || !formData.description || !formData.category || isSubmitting}
                    className="w-full bg-sentinelx-alert-yellow hover:bg-sentinelx-alert-yellow/80 text-black font-medium h-12 mt-6"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                        Submitting Report...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Submit Report
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {/* Filters */}
              <Card className="sentinelx-glass border-sentinelx-glass-border">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground block mb-1">Category</label>
                      <Select value={filterCategory} onValueChange={setFilterCategory}>
                        <SelectTrigger className="bg-sentinelx-glass-bg border-sentinelx-glass-border text-white text-sm h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-sentinelx-glass-bg border-sentinelx-glass-border">
                          <SelectItem value="all" className="text-white">All Categories</SelectItem>
                          {reportCategories.map((category) => (
                            <SelectItem key={category.value} value={category.value} className="text-white">
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground block mb-1">Status</label>
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="bg-sentinelx-glass-bg border-sentinelx-glass-border text-white text-sm h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-sentinelx-glass-bg border-sentinelx-glass-border">
                          <SelectItem value="all" className="text-white">All Status</SelectItem>
                          <SelectItem value="verified" className="text-white">Verified</SelectItem>
                          <SelectItem value="pending" className="text-white">Pending</SelectItem>
                          <SelectItem value="false" className="text-white">Marked False</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reports List */}
              <Accordion type="single" collapsible className="space-y-3">
                {filteredReports.map((report) => {
                  const CategoryIcon = getCategoryIcon(report.category);
                  const categoryColor = getCategoryColor(report.category);
                  
                  return (
                    <AccordionItem key={report.id} value={report.id} className="border-none">
                      <Card className="sentinelx-glass border-sentinelx-glass-border">
                        <AccordionTrigger className="p-4 hover:no-underline">
                          <div className="flex items-start gap-3 w-full">
                            <div className={`p-2 rounded-lg bg-${categoryColor}-500/20 flex-shrink-0`}>
                              <CategoryIcon className={`h-4 w-4 text-${categoryColor}-400`} />
                            </div>
                            
                            <div className="flex-1 text-left">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="text-white font-medium text-sm">{report.title}</h3>
                                <div className="flex gap-1 ml-2">
                                  <Badge className={`${getStatusColor(report.status)} text-xs`}>
                                    {report.status}
                                  </Badge>
                                  <Badge className={`${getSeverityColor(report.severity)} text-xs`}>
                                    {report.severity}
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {report.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {report.timestamp.toLocaleTimeString()}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {report.votes} votes
                                </div>
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        
                        <AccordionContent className="px-4 pb-4">
                          <div className="space-y-3">
                            <p className="text-sm text-white">{report.description}</p>
                            
                            {report.imageUrl && (
                              <img
                                src={report.imageUrl}
                                alt="Report"
                                className="w-full h-40 object-cover rounded-lg"
                              />
                            )}
                            
                            <div className="flex items-center justify-between pt-2 border-t border-sentinelx-glass-border">
                              <span className="text-xs text-muted-foreground">
                                Reported {report.timestamp.toLocaleDateString()}
                              </span>
                              <div className="flex gap-2">
                                <Button size="sm" variant="ghost" className="text-sentinelx-alert-yellow h-7">
                                  <Eye className="h-3 w-3 mr-1" />
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </Card>
                    </AccordionItem>
                  );
                })}
              </Accordion>

              {filteredReports.length === 0 && (
                <Card className="sentinelx-glass border-sentinelx-glass-border">
                  <CardContent className="p-8 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-white">No reports found</p>
                    <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
