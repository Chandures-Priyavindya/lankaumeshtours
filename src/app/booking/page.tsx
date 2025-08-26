"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  CalendarIcon,
  Phone,
  Mail,
  MapPin,
  Users,
  Clock,
  Star,
  CheckCircle,
} from "lucide-react";
import { format } from "date-fns";

interface BookingFormData {
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  telephone: string;
  tourPackage: string;
  adults: string;
  children: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  message: string;
}

// Create a separate component for the booking form that uses search params
function BookingFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tourId = searchParams.get("tourId");
  const tourName = searchParams.get("tourName");
  const tourPrice = searchParams.get("price");

  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    country: "",
    email: "",
    telephone: "",
    tourPackage: tourName || "",
    adults: "",
    children: "",
    startDate: undefined,
    endDate: undefined,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "Singapore",
    "India",
    "Netherlands",
    "Sweden",
    "Norway",
    "Switzerland",
    "New Zealand",
    "South Africa",
  ];

  const tourPackages = [
    "Heritage, Natural & Wildlife",
    "Heritage and Hill Country tour",
    "Wildlife Adventure Safari",
    "Hill Country Tea Trail",
    "Adventure Sports Combo",
    "Custom Package",
  ];

  const handleInputChange = (
    field: keyof BookingFormData,
    value: string | Date | undefined
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Build message (plain text, readable format)
  const message = `
Hello, I would like to book a tour!

Name: ${formData.firstName} ${formData.lastName}
Country: ${formData.country}
Email: ${formData.email}
Telephone: ${formData.telephone}
Tour Package: ${formData.tourPackage}
Adults: ${formData.adults}
Children: ${formData.children}
Start Date: ${formData.startDate ? format(formData.startDate, "PPP") : ""}
End Date: ${formData.endDate ? format(formData.endDate, "PPP") : ""}
Message: ${formData.message}
`;

  // WhatsApp number (without "+" sign)
  const whatsappNumber = "94715235984";

  // Encode the whole message
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  // Redirect to WhatsApp (works web & mobile)
  window.open(whatsappURL, "_blank");

  setIsSubmitting(false);

  // Simulate confirmation (optional)
  setTimeout(() => {
    alert("Booking inquiry submitted successfully! We will contact you soon.");
    setIsSubmitting(false);
  }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center gap-2 hover:bg-green-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <img
                  src="/Lankaumeshtours.png"
                  alt="Lankaumeshtours Logo"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <span className="text-xl font-bold text-gray-800">
                lankaumeshtours
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              +94 74 135 9498
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2">
            <Card className="animate-fade-in-left">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">
                  Book Your Tour
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Fill in your details below and we'll get back to you with the
                  best package for your needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Personal Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="firstName"
                          className="text-sm font-medium"
                        >
                          First Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="lastName"
                          className="text-sm font-medium"
                        >
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="country" className="text-sm font-medium">
                        Country <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={(e) =>
                          handleInputChange("country", e.target.value)
                        }
                        required
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="telephone"
                          className="text-sm font-medium"
                        >
                          Telephone Number{" "}
                          <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="telephone"
                          placeholder="Telephone Number"
                          value={formData.telephone}
                          onChange={(e) =>
                            handleInputChange("telephone", e.target.value)
                          }
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tour Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Tour Details
                    </h3>

                    <div>
                      <Label
                        htmlFor="tourPackage"
                        className="text-sm font-medium"
                      >
                        Select Tour Packages{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.tourPackage}
                        onValueChange={(value) =>
                          handleInputChange("tourPackage", value)
                        }
                        required
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="- Select -" />
                        </SelectTrigger>
                        <SelectContent>
                          {tourPackages.map((tour) => (
                            <SelectItem key={tour} value={tour}>
                              {tour}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="adults" className="text-sm font-medium">
                          Adults <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="adults"
                          type="number"
                          min="1"
                          placeholder="Number of adults"
                          value={formData.adults}
                          onChange={(e) =>
                            handleInputChange("adults", e.target.value)
                          }
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="children"
                          className="text-sm font-medium"
                        >
                          Child <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="children"
                          type="number"
                          min="0"
                          placeholder="Number of children"
                          value={formData.children}
                          onChange={(e) =>
                            handleInputChange("children", e.target.value)
                          }
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">
                          Start Date <span className="text-red-500">*</span>
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal mt-1"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.startDate
                                ? format(formData.startDate, "PPP")
                                : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={formData.startDate}
                              onSelect={(date) =>
                                handleInputChange("startDate", date)
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          End Date <span className="text-red-500">*</span>
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal mt-1"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.endDate
                                ? format(formData.endDate, "PPP")
                                : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={formData.endDate}
                              onSelect={(date) =>
                                handleInputChange("endDate", date)
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>

                  {/* Additional Message */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="message" className="text-sm font-medium">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about any special requirements or questions you have..."
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        rows={4}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      "Enquire Now"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Tour Summary Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card
              className="animate-fade-in-right"
              style={{ animationDelay: "0.2s" }}
            >
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-900">
                      Call Us
                    </p>
                    <p className="text-sm text-green-700">+94 74 135 9498</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      Email Us
                    </p>
                    <p className="text-sm text-blue-700">
                      info@lankaumeshtours.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium text-orange-900">
                      Location
                    </p>
                    <p className="text-sm text-orange-700">
                      Koggala, Sri Lanka
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Why Choose Us */}
            <Card
              className="animate-fade-in-right"
              style={{ animationDelay: "0.4s" }}
            >
              <CardHeader>
                <CardTitle className="text-lg">Why Choose Us?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "15+ years of experience",
                    "Local expert guides",
                    "24/7 customer support",
                    "Best price guarantee",
                    "Customizable itineraries",
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading component for Suspense fallback
function BookingFormLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-12 h-4 bg-gray-300 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-lg animate-pulse"></div>
              <div className="w-32 h-6 bg-gray-300 rounded animate-pulse"></div>
            </div>
            <div className="w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="w-48 h-8 bg-gray-300 rounded animate-pulse mb-2"></div>
                <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="w-32 h-6 bg-gray-300 rounded animate-pulse"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="w-full h-10 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-full h-10 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                  <div className="w-full h-40 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-full h-12 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="w-24 h-6 bg-gray-300 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="w-full h-16 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-full h-16 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-full h-16 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main export component with Suspense boundary
export default function BookingFormPage() {
  return (
    <Suspense fallback={<BookingFormLoading />}>
      <BookingFormContent />
    </Suspense>
  );
}
