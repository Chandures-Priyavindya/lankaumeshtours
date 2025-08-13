'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, 
  Clock, 
  Users, 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  ArrowLeft,
  CheckCircle,
  XCircle,
  Camera,
  Utensils,
  Bed,
  Car,
  Heart,
  Share2,
  Download
} from 'lucide-react';

interface TourPackage {
  id: number;
  name: string;
  duration: string;
  price: string;
  originalPrice?: string;
  rating: number;
  image: string;
  description: string;
  highlights: string[];
  color: string;
  iconColor: string;
  longDescription: string;
  itinerary: {
    day: number;
    title: string;
    description: string;
    activities: string[];
    meals: string[];
    accommodation: string;
  }[];
  inclusions: string[];
  exclusions: string[];
  gallery: string[];
  groupSize: string;
  difficulty: string;
  bestTime: string;
  startLocation: string;
  endLocation: string;
}

// Extended tour data
const tourPackagesData: TourPackage[] = [
  {
    id: 1,
    name: "Heritage & Culture Explorer",
    duration: "3 Days | 2 Nights",
    price: "$150",
    originalPrice: "$1099",
    rating: 4.9,
    image: "/heritage-tour.webp",
    description: "Explore ancient temples, historic sites, and cultural wonders",
    highlights: ["Pickup you Downsouth Hotels","Sigiriya Rock", "Nuwara Eliya", "Udawalawa","Drop you Downsouth Hotels"],
    color: "from-green-500 to-green-600",
    iconColor: "text-green-600",
    longDescription: "Embark on a captivating 3-day journey through Sri Lanka’s most enchanting landscapes and cultural treasures. Begin from your down-south hotel and venture to the iconic Sigiriya Rock Fortress, a marvel of ancient engineering and artistry. Travel through the cool, misty hills of Nuwara Eliya, known for its lush tea plantations and colonial charm. Experience the thrill of a wildlife safari in Udawalawe National Park, home to majestic elephants and diverse wildlife, before returning to your down-south hotel with memories to last a lifetime.",
    groupSize: "2-13 people(Minimum 2 people)",
    difficulty: "Easy",
    bestTime: "Any Months",
    startLocation: "Colombo Airport",
    endLocation: "Colombo Airport",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Colombo City Tour",
        description: "Welcome to Sri Lanka! Begin your cultural journey with a comprehensive Colombo city tour.",
        activities: ["Airport pickup", "Colombo city tour", "National Museum visit", "Independence Square"],
        meals: ["Lunch", "Dinner"],
        accommodation: "4-star hotel in Colombo"
      },
      {
        day: 2,
        title: "Colombo to Sigiriya",
        description: "Travel to the Cultural Triangle and explore the magnificent Sigiriya Rock Fortress.",
        activities: ["Sigiriya Rock climb", "Sigiriya Museum", "Village safari", "Local lunch experience"],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Heritage hotel near Sigiriya"
      },
      {
        day: 3,
        title: "Dambulla & Polonnaruwa",
        description: "Discover ancient cave temples and the medieval capital of Sri Lanka.",
        activities: ["Dambulla Cave Temple", "Polonnaruwa ancient city", "Cycling tour", "Sunset at Parakrama Samudra"],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Heritage hotel in Polonnaruwa"
      }
    ],
    inclusions: [
      "Accommodation in 4-star hotels",
      "All meals as mentioned",
      "English-speaking guide",
      "Air-conditioned vehicle",
      "Entrance fees to attractions",
      "Airport transfers"
    ],
    exclusions: [
      "International flights",
      "Personal expenses",
      "Tips and gratuities",
      "Travel insurance",
      "Alcoholic beverages",
      "Items not mentioned in inclusions"
    ],
    gallery: ["/heritage-1.jpg", "/heritage-2.jpg", "/heritage-3.jpg", "/heritage-4.jpg"]
  },
  {
    id: 2,
    name: "Beach Paradise Getaway",
    duration: "5 Days",
    price: "$649",
    originalPrice: "$799",
    rating: 4.8,
    image: "/beach-paradise.webp",
    description: "Pristine beaches, crystal waters, and tropical sunsets",
    highlights: ["Mirissa Beach", "Unawatuna Bay", "Whale Watching"],
    color: "from-blue-400 to-blue-500",
    iconColor: "text-blue-600",
    longDescription: "Escape to paradise with this stunning 5-day beach getaway along Sri Lanka's pristine southern coast. Enjoy crystal-clear waters, golden sandy beaches, and unforgettable whale watching experiences in Mirissa.",
    groupSize: "2-12 people",
    difficulty: "Easy",
    bestTime: "November - April",
    startLocation: "Colombo Airport",
    endLocation: "Colombo Airport",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Transfer to Mirissa",
        description: "Arrive in paradise and settle into your beachfront accommodation.",
        activities: ["Airport pickup", "Transfer to Mirissa", "Beach orientation", "Sunset viewing"],
        meals: ["Lunch", "Dinner"],
        accommodation: "Beachfront resort in Mirissa"
      }
    ],
    inclusions: [
      "Beachfront accommodation",
      "Daily breakfast",
      "Whale watching tour",
      "Airport transfers",
      "Beach activities",
      "Snorkeling equipment"
    ],
    exclusions: [
      "International flights",
      "Lunch and dinner (except mentioned)",
      "Personal expenses",
      "Water sports activities",
      "Spa treatments"
    ],
    gallery: ["/beach-1.jpg", "/beach-2.jpg", "/beach-3.jpg", "/beach-4.jpg"]
  }
  // Add more tours as needed...
];

export default function TourDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [tour, setTour] = useState<TourPackage | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const tourId = parseInt(params.id as string);
    const foundTour = tourPackagesData.find(t => t.id === tourId);
    setTour(foundTour || null);
  }, [params.id]);

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tour details...</p>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    setIsBookingModalOpen(true);
    // Scroll to contact section or open booking modal
    document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tour.name,
        text: tour.description,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Button 
              variant="ghost" 
              onClick={() => router.back()}
              className="flex items-center gap-2 hover:bg-green-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Tours
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <img 
                  src="/tourslk-logo.png" 
                  alt="ToursLk Logo" 
                  className="w-6 h-6 object-contain"
                />
              </div>
              <span className="text-xl font-bold text-gray-800">lankaumeshtours</span>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button size="sm" className={`bg-gradient-to-r ${tour.color} text-white`}>
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img 
          src={tour.image} 
          alt={tour.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
        {/* Floating Info Card */}
        <div className="absolute bottom-8 left-8 right-8">
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl animate-slide-in-up">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{tour.name}</h1>
                  <p className="text-gray-600 mb-4">{tour.description}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{tour.rating}</span>
                      <span className="text-gray-500">(245 reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <span>{tour.duration}</span>
                    </div>
                  </div>
                </div>
                
                <div className="lg:text-center">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 lg:justify-center">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{tour.groupSize}</span>
                    </div>
                    <div className="flex items-center gap-2 lg:justify-center">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{tour.startLocation}</span>
                    </div>
                  </div>
                </div>
                
                <div className="lg:text-right">
                  <div className="mb-4">
                    {tour.originalPrice && (
                      <span className="text-lg text-gray-500 line-through mr-2">
                        {tour.originalPrice}
                      </span>
                    )}
                    <span className="text-3xl font-bold text-green-600">{tour.price}</span>
                    <span className="text-gray-500 ml-1">per person</span>
                  </div>
                  <Button 
                    size="lg" 
                    className={`w-full lg:w-auto bg-gradient-to-r ${tour.color} hover:shadow-lg hover:scale-105 transition-all duration-300`}
                    onClick={handleBookNow}
                  >
                    Book This Tour
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8 bg-white border border-green-200">
              <TabsTrigger value="overview" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">Overview</TabsTrigger>
              <TabsTrigger value="itinerary" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">Itinerary</TabsTrigger>
              <TabsTrigger value="inclusions" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">What's Included</TabsTrigger>
              <TabsTrigger value="gallery" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">Gallery</TabsTrigger>
              <TabsTrigger value="booking" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">Book Now</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className="animate-fade-in-left">
                    <CardHeader>
                      <CardTitle className="text-2xl">About This Tour</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        {tour.longDescription}
                      </p>
                      
                      <h3 className="text-xl font-semibold mb-4">Tour Highlights</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {tour.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="text-gray-700">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  {/* Quick Info */}
                  <Card className="animate-fade-in-right">
                    <CardHeader>
                      <CardTitle>Quick Info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration</span>
                        <span className="font-semibold">{tour.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Group Size</span>
                        <span className="font-semibold">{tour.groupSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Difficulty</span>
                        <Badge variant="outline" className="border-green-200 text-green-700">
                          {tour.difficulty}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Best Time</span>
                        <span className="font-semibold">{tour.bestTime}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-gray-600">Start Location</span>
                        <span className="font-semibold text-right">{tour.startLocation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">End Location</span>
                        <span className="font-semibold text-right">{tour.endLocation}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact Card */}
                  <Card className="animate-fade-in-right" style={{ animationDelay: '0.2s' }}>
                    <CardHeader>
                      <CardTitle>Need Help?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Us: +94 77 123 4567
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Mail className="w-4 h-4 mr-2" />
                        Email: info@lankaumeshtours.com
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="itinerary" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Day by Day Itinerary</CardTitle>
                  <CardDescription>Detailed breakdown of your {tour.duration} adventure</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {tour.itinerary.map((day, index) => (
                      <div key={day.day} className={`relative p-6 rounded-lg border-2 border-green-100 bg-gradient-to-r from-green-50 to-blue-50 animate-stagger-${index + 1}`}>
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${tour.color} flex items-center justify-center text-white font-bold text-lg`}>
                            {day.day}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{day.title}</h3>
                            <p className="text-gray-600">{day.description}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                              <Camera className="w-4 h-4" />
                              Activities
                            </h4>
                            <ul className="space-y-1">
                              {day.activities.map((activity, idx) => (
                                <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                                  <CheckCircle className="w-3 h-3 text-green-500" />
                                  {activity}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                              <Utensils className="w-4 h-4" />
                              Meals
                            </h4>
                            <ul className="space-y-1">
                              {day.meals.map((meal, idx) => (
                                <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                                  <CheckCircle className="w-3 h-3 text-green-500" />
                                  {meal}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                              <Bed className="w-4 h-4" />
                              Accommodation
                            </h4>
                            <p className="text-sm text-gray-600">{day.accommodation}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inclusions">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="animate-fade-in-left">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-700 flex items-center gap-2">
                      <CheckCircle className="w-6 h-6" />
                      What's Included
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tour.inclusions.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="animate-fade-in-right">
                  <CardHeader>
                    <CardTitle className="text-xl text-red-700 flex items-center gap-2">
                      <XCircle className="w-6 h-6" />
                      What's Not Included
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tour.exclusions.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-200">
                          <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="gallery">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Photo Gallery</CardTitle>
                  <CardDescription>Get a glimpse of what awaits you on this amazing journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tour.gallery.map((image, index) => (
                      <div 
                        key={index} 
                        className={`relative h-64 rounded-lg overflow-hidden cursor-pointer group hover-lift animate-stagger-${index + 1}`}
                        onClick={() => setActiveImageIndex(index)}
                      >
                        <img 
                          src={image} 
                          alt={`${tour.name} gallery ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="booking" id="booking-section">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Book Your Adventure</CardTitle>
                  <CardDescription>Ready to experience {tour.name}? Let's plan your perfect trip!</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                        <h3 className="text-xl font-semibold mb-4">Tour Summary</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Tour Name:</span>
                            <span className="font-semibold">{tour.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Duration:</span>
                            <span className="font-semibold">{tour.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Price per person:</span>
                            <span className="font-semibold text-green-600">{tour.price}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Contact Information</h3>
                        <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg py-6">
                          <Phone className="w-5 h-5 mr-2" />
                          Call Now: +94 77 123 4567
                        </Button>
                        <Button variant="outline" className="w-full border-green-300 hover:bg-green-50 text-lg py-6">
                          <Mail className="w-5 h-5 mr-2" />
                          Email: info@lankaumeshtours.com
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Why Choose Us?</h3>
                        <div className="space-y-3">
                          {[
                            "15+ years of experience",
                            "Local expert guides",
                            "24/7 customer support",
                            "Best price guarantee",
                            "Customizable itineraries",
                            "Safety certified"
                          ].map((benefit, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 mb-2">Special Offer!</h4>
                        <p className="text-yellow-700">Book now and save {tour.originalPrice ? `${parseInt(tour.originalPrice.slice(1)) - parseInt(tour.price.slice(1))}` : '15%'} on your total booking!</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}