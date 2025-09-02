"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Star,
  Calendar,
  Users,
  Plane,
  Camera,
  Mountain,
  Heart,
  Phone,
  Mail,
  MessageSquare,
  Hotel,
  Car,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
} from "lucide-react";
import router from "next/router";






// TourCard component definition
type TourCardProps = {
  tour: {
    id: number;
    name: string;
    duration: string;
    price: string;
    originalPrice: string;
    rating: number;
    image: string;
    description: string;
    highlights: string[];
    color: string;
    iconColor: string;
  };
  index: number;
  onClick: () => void;
  className?: string;
};

function TourCard({ tour, index, onClick, className }: TourCardProps) {
  return (
    <Card
      className={`group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden hover-lift animate-stagger-${
        index + 1
      } ${className}`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={tour.image}
          alt={tour.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute top-4 right-4">
          <Badge className="bg-white/90 text-gray-900 animate-pulse-glow">
            {tour.price}
          </Badge>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{tour.name}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {tour.duration}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{tour.description}</p>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 animate-pulse" />
            <span className="text-sm font-medium">{tour.rating}</span>
          </div>
          <span className="line-through text-gray-400 text-xs">
            {tour.originalPrice}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {tour.highlights.map((highlight, i) => (
            <Badge key={i} className="bg-green-100 text-green-700">
              {highlight}
            </Badge>
          ))}
        </div>
        <Button
          size="sm"
          className="bg-gradient-to-r from-blue-600 to-green-600 hover-lift mt-2"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [currentTourIndex, setCurrentTourIndex] = useState(0);
  // Add this near the top of your component with other state variables
const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: ''
});
// Add this function to handle WhatsApp submission
const handleSubmitToWhatsApp = () => {
  // Validate form data
  if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
    alert('Please fill in all required fields');
    return;
  }

  // Your WhatsApp number (from your contact section)
  const whatsappNumber = '94715235984';
  
  // Create formatted message
  const messageText = `
*New Contact Form Submission from lankaumeshtours.com*

*Name:* ${formData.firstName} ${formData.lastName}
*Email:* ${formData.email}
*Phone:* ${formData.phone || 'Not provided'}
*Travel Plans:* ${formData.message}

*Website:* lankaumeshtours.com
*Date:* ${new Date().toLocaleDateString()}
  `.trim();

  // Create WhatsApp URL
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;
  
  // Open WhatsApp
  window.open(whatsappURL, '_blank');
  
  // Clear form after submission
  setFormData({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  
  // Show success message
  alert('Form submitted! WhatsApp will open with your message.');
};

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = [
        "home",
        "destinations",
        "services",
        "about",
        "testimonials",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const tourPackages = [
    {
      id: 1,
      name: "Heritage, Natural & Wildlife",
      duration: "3 Days | 2 Nights",
      price: "$150",
      originalPrice: "$1099",
      rating: 4.9,
      image: "/sigiriyarock.jpg",
      description:
        "Discover Sri Lanka’s timeless treasures, from majestic rock fortresses to misty tea country and wild safaris.",
      highlights: [
        "Pickup you Downsouth Hotels",
        "Sigiriya Rock",
        "Nuwara Eliya",
        "Ella",
        "Udawalawa",
        "Drop you Downsouth Hotels",
      ],
      color: "from-green-500 to-green-600",
      iconColor: "text-green-600",
    },
    {
      id: 2,
      name: "Heritage and Hill Country tour",
      duration: "4 Days | 3 Nights",
      price: "$649",
      originalPrice: "$799",
      rating: 4.8,
      image: "/srilankawaterfall.jpg",
      description:
        "Explore Sri Lanka’s misty tea hills, scenic Ella, and the wildlife of Udawalawe in a perfect 4-day adventure.",
      highlights: [
        "Pickup Colombo Airport(CMB)",
        "Sigiriya",
        "Nuwara Eliya",
        "Ella",
        "Udawalawa",
        "Drop Colombo Airport(CMB)",
      ],
      color: "from-green-400 to-green-500",
      iconColor: "text-green-600",
    },
    {
      id: 3,
      name: "Wildlife Adventure Safari",
      duration: "6 Days | 5 Nights",
      price: "$759",
      originalPrice: "$899",
      rating: 4.7,
      image: "/udawalawa.jpg",
      description: "Encounter elephants, leopards, and exotic wildlife",
      highlights: [
        "Pickup Colombo Airport(CMB)",
        "Anuradhapura",
        "sigiriya",
        "Kandy",
        "Nuwara Eliya",
        "Yala National Park or Udawalawa",
        "Mirissa",
        "Drop Colombo Airport(CMB)",
      ],
      color: "from-green-600 to-green-700",
      iconColor: "text-green-600",
    },
    {
      id: 4,
      name: "Galle City Tour",
      duration: "1 Day",
      price: "",
      originalPrice: "",
      rating: 4.8,
      image: "/gallefort1.jpg",
      description:
        "Galle City Tour: Explore the historic Galle Fort, Koggala Lake, and more",
      highlights: [
        "Pickup from Downsouth hotel",
        "Galle Fort",
        "Koggala Lake Boat Safari",
        "Sea Turtle Hatchery",
        "Stick Fisherman",
        "Drop your Pickup Location"
      ],
      color: "from-green-500 to-green-600",
      iconColor: "text-green-600",
    },
    {
      id: 5,
      name: "Madu River Boart Safari",
      duration: "1 Day",
      price: "",
      originalPrice: "",
      rating: 4.9,
      image: "/maduriver.jpg",
      description:
        "Madu River Boat Safari: Experience the serene beauty of Madu River",
      highlights: ["Pickup from Downsouth hotel","Madu River","Drop your Pickup Location"],
      color: "from-green-500 to-green-700",
      iconColor: "text-green-600",
    },
    {
      id: 6,
      name: "Mirissa Whale Watching",
      duration: "1 Day",
      price: "",
      originalPrice: "",
      rating: 4.8,
      image: "/whaleswatching.jpg",
      description:
        "Mirissa Whale Watching: Witness the majestic blue whales and dolphins",
      highlights: ["Pickup from Downsouth hotel","Mirissa Whale Watching","Drop your Pickup Location"],
      color: "from-green-500 to-green-600",
      iconColor: "text-green-600",
    },
    {
      id: 7,
      name: "Airport Drop and Pickup",
      duration: "1 Day",
      price: "",
      originalPrice: "",
      rating: 4.8,
      image: "/airportdrop.jpg",
      description: "Airport Drop and Pickup",
      highlights: ["Pickup Colombo Airport(CMB)","Drop Colombo Airport(CMB)","Airport Drop and Pickup"],
      color: "from-green-500 to-green-600",
      iconColor: "text-green-600",
    },
  ];

  const handleBookNow = () => {
    router.push("/booking");
  };

  const nextTour = () => {
    const maxIndex = Math.max(0, 7); // Maximum index to show 4 cards
    setCurrentTourIndex((prev) => (prev >= maxIndex ? maxIndex : prev + 1));
  };

  const prevTour = () => {
    setCurrentTourIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const handleTourClick = (tourId: number) => {
    // Navigate to tour detail page
    router.push(`/tours/${tourId}`);
  };

  const destinations = [
    {
      id: 1,
      name: "Sigiriya Rock Fortress",
      location: "Central Sri Lanka",
      price: "",
      rating: 4.8,
      image: "/sigiriya.jpg",
      description: "Ancient rock fortress and palace ruin with stunning views",
    },
    {
      id: 2,
      name: "Mirissa Beach",
      location: "South Coast",
      price: "",
      rating: 4.9,
      image: "/mirissa-beach.jpg",
      description: "Pristine beach perfect for whale watching and relaxation",
    },
    {
      id: 3,
      name: "Ella Highlands",
      location: "Hill Country",
      price: "",
      rating: 4.7,
      image: "/ella-highlands.jpg",
      description: "Scenic mountain town with tea plantations and hiking",
    },
    {
      id: 4,
      name: "Galle Fort",
      location: "Southern Coast",
      price: "",
      rating: 4.6,
      image: "/galle-fort.jpg",
      description: "Historic Dutch fort with colonial architecture",
    },
  ];

  const services = [
    {
      icon: <Plane className="w-8 h-8 text-blue-600" />,
      title: "Tour Packages",
      description: "Customized tour packages tailored to your preferences",
    },
    {
      icon: <Hotel className="w-8 h-8 text-green-600" />,
      title: "Hotel Booking",
      description: "Best accommodation options at competitive prices",
    },
    {
      icon: <Car className="w-8 h-8 text-purple-600" />,
      title: "Transportation",
      description: "Comfortable and reliable transportation services",
    },
    {
      icon: <Camera className="w-8 h-8 text-orange-600" />,
      title: "Photography Tours",
      description: "Capture your memories with professional photography",
    },
  ];

  const testimonials = [
  {
    name: "Chandures Priyavindya",
    location: "United Kingdom",
    text: "We spent 10 days exploring Sri Lanka with Umesh as our driver and guide, and it was hands down the best decision we made for our trip. From the moment he picked us up at the airport, Umesh went above and beyond to ensure we had an authentic and memorable experience. More...",
    rating: 5,
    image: "https://thafd.bing.com/th/id/OIP.mTH8GtRVqcf1Lv1ir8lbcgHaJ4?w=128&h=180&c=7&r=0&o=7&cb=thfc1&pid=1.7&rm=3"
  },
  {
    name: "Ruhi balha",
    location: "Singapore",
    text: "Umesh was fantastic throughout our Sri Lanka journey! Professional, reliable, and incredibly knowledgeable about the best places to visit. His comfortable vehicle and safe driving made long distances enjoyable, while his warm hospitality … More...",
    rating: 5,
    image: "https://thafd.bing.com/th/id/OIF.9uPkn4pzk0XkDXpfrfRJ0A?w=199&h=306&c=7&r=0&o=5&cb=thfc1&pid=1.7"
  },
  {
    name: "Jxxl Lxxl",
    location: "Australia",
    text: "Very nice driver. He drives very safely and obeys traffic rules.He is very punctual, professional, and responsible!.Highly recommended.He speaks good English and shares interesting facts about the area and Sri Lanka.",
    rating: 5,
    image: "https://thafd.bing.com/th/id/OIP.lKJ3LJRkKO_KCixe8kL4zwHaHa?w=170&h=180&c=7&r=0&o=5&cb=thfc1&pid=1.7"
  },
];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 animate-gradient">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2 animate-fade-in-left">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center animate-pulse-glow">
                <img
                  src="/Lankaumeshtours.png"
                  alt="Lankaumeshtours Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-gray-800">
                lankaumeshtours
              </span>
            </div>

            <div className="hidden md:flex space-x-8">
              {[
                "home",
                "destinations",
                "services",
                "about",
                "testimonials",
                "contact",
              ].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-200 hover:scale-105 ${
                    activeSection === item
                      ? "text-blue-600 font-semibold"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item}
                </button>
              ))}
            </div>

            <Button
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 animate-pulse-glow"
              onClick={handleBookNow}
            >
              Book Now
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="/sri-lanka-hero.jpg"
            alt="Sri Lanka Tourism Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-green-600/40"></div>
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Discover the Beauty of
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 animate-gradient">
                {" "}
                Sri Lanka
              </span>
            </h1>
            <p
              className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              Experience unforgettable adventures with lankaumeshtours. Your
              journey to paradise begins here, powered by Umesh's expertise in
              creating magical travel experiences.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8 py-4 hover-lift"
                onClick={() => scrollToSection("destinations")}
              >
                Explore Destinations
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-2 border-white text-black hover:bg-white hover:text-gray-900 hover-lift"
                onClick={() => scrollToSection("contact")}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Popular Tour Packages */}

      {/* Popular Tour Packages - Responsive Version */}
      <section id="tour-packages" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Tour
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-700 animate-gradient">
                {" "}
                Packages
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handcrafted experiences designed to create unforgettable memories
            </p>
          </div>

          <div className="relative">
            {/* Navigation Buttons - Only visible on desktop */}
            <div className="hidden lg:block absolute -left-6 top-1/2 transform -translate-y-1/2 z-10">
              <Button
                onClick={prevTour}
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-full bg-white shadow-lg border border-green-200 hover:bg-green-50 hover:border-green-300 hover:scale-110 transition-all duration-300"
                disabled={currentTourIndex === 0}
              >
                <ChevronLeft className="w-6 h-6 text-green-600" />
              </Button>
            </div>

            <div className="hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2 z-10">
              <Button
                onClick={nextTour}
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-full bg-white shadow-lg border border-green-200 hover:bg-green-50 hover:border-green-300 hover:scale-110 transition-all duration-300"
                disabled={currentTourIndex >= Math.max(0, tourPackages.length)}
              >
                <ChevronRight className="w-6 h-6 text-green-600" />
              </Button>
            </div>

            {/* Tour Cards Container */}
            <div className="overflow-hidden">
              {/* Desktop: Horizontal sliding carousel */}
              <div
                className="hidden lg:flex transition-transform duration-500 ease-in-out gap-6"
                style={{
                  transform: `translateX(-${currentTourIndex * 25}%)`,
                  width: `${Math.max(100, tourPackages.length * 25)}%`,
                }}
              >
                {tourPackages.map((tour, index) => (
                  <TourCard
                    key={tour.id}
                    tour={tour}
                    index={index}
                    onClick={() => handleTourClick(tour.id)}
                    className="flex-shrink-0 w-1/4"
                  />
                ))}
              </div>

              {/* Tablet: 2 columns grid */}
              <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
                {tourPackages.map((tour, index) => (
                  <TourCard
                    key={tour.id}
                    tour={tour}
                    index={index}
                    onClick={() => handleTourClick(tour.id)}
                    className=""
                  />
                ))}
              </div>

              {/* Mobile: Single column */}
              <div className="grid md:hidden grid-cols-1 gap-6">
                {tourPackages.map((tour, index) => (
                  <TourCard
                    key={tour.id}
                    tour={tour}
                    index={index}
                    onClick={() => handleTourClick(tour.id)}
                    className=""
                  />
                ))}
              </div>
            </div>

            {/* Progress Indicators - Only visible on desktop */}
            <div className="hidden lg:flex justify-center mt-8 space-x-2">
              {Array.from(
                { length: Math.max(1, tourPackages.length - 3) },
                (_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      i === currentTourIndex
                        ? "w-8 bg-gradient-to-r from-green-500 to-green-600 shadow-md"
                        : "w-2 bg-gray-300 hover:bg-green-300"
                    }`}
                    onClick={() => setCurrentTourIndex(i)}
                  />
                )
              )}
            </div>

            {/* View All Tours Button for Mobile/Tablet */}
            <div className="lg:hidden flex justify-center mt-8">
              <Button
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                onClick={() => router.push("/tours")}
              ></Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section id="destinations" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the most breathtaking locations Sri Lanka has to offer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((destination, index) => (
              <Card
                key={destination.id}
                className={`group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden hover-lift animate-stagger-${
                  index + 1
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{destination.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {destination.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {destination.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 animate-pulse" />
                      <span className="text-sm font-medium">
                        {destination.rating}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-green-600 hover-lift"
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-20 bg-gradient-to-br from-blue-50 to-green-50 animate-gradient"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tourism services to make your journey memorable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`text-center p-6 hover:shadow-lg transition-all duration-300 hover-lift animate-stagger-${
                  index + 1
                }`}
              >
                <div className="flex justify-center mb-4 animate-float">
                  {service.icon}
                </div>
                <CardTitle className="mb-2">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                About lankaumeshtours
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Welcome to lankaumeshtours, your premier travel partner in
                exploring the magnificent island of Sri Lanka. Founded and
                powered by Umesh, we bring years of expertise in creating
                unforgettable travel experiences.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our mission is to showcase the hidden gems of Sri Lanka while
                providing exceptional service and creating memories that last a
                lifetime. From pristine beaches to ancient temples, from lush
                tea plantations to wildlife sanctuaries - we cover it all.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center animate-scale-in">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    5000+
                  </div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div
                  className="text-center animate-scale-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    15+
                  </div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in-right">
              <div className="w-full h-96 bg-gradient-to-br from-blue-400 to-green-400 rounded-2xl flex items-center justify-center animate-pulse-glow">
                <div className="text-center text-white">
                  <Heart className="w-16 h-16 mx-auto mb-4 animate-float" />
                  <p className="text-xl font-semibold">
                    Passionate About Travel
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
  id="testimonials"
  className="py-20 bg-gradient-to-br from-blue-50 to-green-50 animate-gradient"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16 animate-fade-in-up">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        What Our Customers Say
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Real experiences from travelers who chose lankaumeshtours
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <Card
          key={index}
          className={`p-6 hover:shadow-xl hover:shadow-green-100 transition-all duration-300 hover-lift animate-stagger-${
            index + 1
          } cursor-pointer group hover:scale-105 hover:border-green-200 border border-transparent`}
          onClick={() =>
            window.open(
              "https://share.google/Up1MeBcN8g8y0oHpT",
              "_blank"
            )
          }
        >
          <div className="flex mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-yellow-400 text-yellow-400 animate-pulse group-hover:scale-110 transition-transform duration-300"
              />
            ))}
          </div>
          <p className="text-gray-600 mb-4 italic group-hover:text-gray-800 transition-colors duration-300">
            "{testimonial.text}"
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* Updated circular image container */}
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-gradient-to-r from-blue-600 to-green-600 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.currentTarget.style.display = 'none';
                    (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                  }}
                />
                {/* Fallback div with initials (hidden by default) */}
                <div 
                  className="w-full h-full bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center text-white font-semibold animate-pulse-glow"
                  style={{ display: 'none' }}
                >
                  {testimonial.name.charAt(0)}
                </div>
              </div>
              <div>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-gray-500">
                  {testimonial.location}
                </div>
              </div>
            </div>
            <div className="text-sm text-green-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View Reviews →
            </div>
          </div>
        </Card>
      ))}
    </div>

    {/* View All Reviews Button */}
    <div className="text-center mt-12">
      <Button
        onClick={() =>
          window.open("https://share.google/Up1MeBcN8g8y0oHpT", "_blank")
        }
        className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8 py-4 hover-lift animate-pulse-glow"
      >
        View All Google Reviews
      </Button>
    </div>
  </div>
</section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16 animate-fade-in-up">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Get In Touch
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Ready to start your Sri Lankan adventure? Contact us today!
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="animate-fade-in-left">
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you as soon as
              possible
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input 
                placeholder="First Name *" 
                className="hover-lift"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                required
              />
              <Input 
                placeholder="Last Name *" 
                className="hover-lift"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                required
              />
            </div>
            <Input
              placeholder="Email Address *"
              type="email"
              className="hover-lift"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <Input 
              placeholder="Phone Number (Optional)" 
              className="hover-lift"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            <Textarea
              placeholder="Tell us about your travel plans... *"
              rows={4}
              className="hover-lift"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
            />
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 animate-pulse-glow"
              onClick={handleSubmitToWhatsApp}
              type="button"
            >
              Send to WhatsApp
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Rest of your contact section remains the same */}
      <div className="space-y-6 animate-fade-in-right">
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3 hover-lift">
              <Phone className="w-5 h-5 text-blue-600 animate-pulse" />
              <span>+94 74 135 9498</span>
            </div>
            <div className="flex items-center space-x-3 hover-lift">
              <Mail className="w-5 h-5 text-green-600 animate-pulse" />
              <span>info@lankaumeshtours.com</span>
            </div>
            <div className="flex items-center space-x-3 hover-lift">
              <MapPin className="w-5 h-5 text-red-600 animate-pulse" />
              <span>Koggala, Sri Lanka</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Business Hours</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between hover-lift">
              <span>Monday - Friday</span>
              <span>24/7 hours</span>
            </div>
            <div className="flex justify-between hover-lift">
              <span>Saturday</span>
              <span>24/7 hours</span>
            </div>
            <div className="flex justify-between hover-lift">
              <span>Sunday</span>
              <span>24/7 hours</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="animate-fade-in-up">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center animate-pulse-glow">
                  <img
                    src="/Lankaumeshtours.png"
                    alt="Lankaumeshtours Logo"
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <span className="text-xl font-bold">lankaumeshtours</span>
              </div>
              <p className="text-gray-400">
                Your trusted travel partner in Sri Lanka, powered by Umesh.
              </p>
            </div>

            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors hover-lift"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors hover-lift"
                  >
                    Destinations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors hover-lift"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors hover-lift"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <h3 className="text-lg font-semibold mb-4">
                Popular Destinations
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors hover-lift"
                  >
                    Sigiriya
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors hover-lift"
                  >
                    Mirissa
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors hover-lift"
                  >
                    Ella
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors hover-lift"
                  >
                    Galle
                  </a>
                </li>
              </ul>
            </div>

            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer hover-lift">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer hover-lift">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer hover-lift">
                  <MessageSquare className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 animate-fade-in-up">
            <p>&copy; 2024 lankaumeshtours. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
