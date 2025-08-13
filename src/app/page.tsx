'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Calendar, Users, Plane, Camera, Mountain, Heart, Phone, Mail, MessageSquare, Hotel, Car, ChevronLeft, ChevronRight, Clock, DollarSign } from 'lucide-react';
import router from 'next/router';

export default function Home() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentTourIndex, setCurrentTourIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'destinations', 'services', 'about', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tourPackages = [
    {
      id: 1,
      name: "Heritage, Natural & Wildlife",
      duration: "3 Days | 2 Nights",
      price: "$899",
      originalPrice: "$1099",
      rating: 4.9,
      image: "/sigiriya.jpg",
      description: "Discover Sri Lanka’s timeless treasures, from majestic rock fortresses to misty tea country and wild safaris.",
      highlights: ["Pickup you Downsouth Hotels","Sigiriya Rock", "Nuwara Eliya", "Udawalawa","Drop you Downsouth Hotels"],
      color: "from-green-500 to-green-600",
      iconColor: "text-green-600"
    },
    {
      id: 2,
      name: "Heritage and Hill Country tour",
      duration: "4 Days | 3 Nights",
      price: "$649",
      originalPrice: "$799",
      rating: 4.8,
      image: "/nuwaraeliya.webp",
      description: "Explore Sri Lanka’s misty tea hills, scenic Ella, and the wildlife of Udawalawe in a perfect 4-day adventure.",
      highlights: ["Pickup Colombo Airport(CMB)","Sigiriya", "Nuwara Eliya", "Ella","Udawalawa","Drop Colombo Airport(CMB)"],
      color: "from-green-400 to-green-500",
      iconColor: "text-green-600"
    },
    {
      id: 3,
      name: "Wildlife Adventure Safari",
      duration: "6 Days | 5 Nights",
      price: "$759",
      originalPrice: "$899",
      rating: 4.7,
      image: "/wildlife-safari.webp",
      description: "Encounter elephants, leopards, and exotic wildlife",
      highlights: ["Pickup Colombo Airport(CMB)","Anuradhapura","sigiriya","Kandy","Nuwara Eliya","Yala National Park or Udawalawa", "Mirissa", "Drop Colombo Airport(CMB)"],
      color: "from-green-600 to-green-700",
      iconColor: "text-green-600"
    },
    {
      id: 4,
      name: "Hill Country Tea Trail",
      duration: "4 Days",
      price: "$549",
      originalPrice: "$649",
      rating: 4.8,
      image: "/tea-trail.webp",
      description: "Rolling hills, tea plantations, and cool mountain air",
      highlights: ["Ella Rock", "Tea Factory", "Nine Arches Bridge"],
      color: "from-green-500 to-green-600",
      iconColor: "text-green-600"
    },
    {
      id: 5,
      name: "Adventure Sports Combo",
      duration: "8 Days",
      price: "$999",
      originalPrice: "$1199",
      rating: 4.9,
      image: "/adventure-sports.jpg",
      description: "Thrilling activities and adrenaline-pumping experiences",
      highlights: ["White Water Rafting", "Rock Climbing", "Zip Lining"],
      color: "from-green-500 to-green-700",
      iconColor: "text-green-600"
    }
  ];

  const nextTour = () => {
    setCurrentTourIndex((prev) => 
      prev + 4 >= tourPackages.length ? 0 : prev + 1
    );
  };

  const prevTour = () => {
    setCurrentTourIndex((prev) => 
      prev === 0 ? Math.max(0, tourPackages.length - 4) : prev - 1
    );
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
      price: "$89",
      rating: 4.8,
      image: "/sigiriya.jpg",
      description: "Ancient rock fortress and palace ruin with stunning views"
    },
    {
      id: 2,
      name: "Mirissa Beach",
      location: "South Coast",
      price: "$65",
      rating: 4.9,
      image: "/mirissa-beach.jpg",
      description: "Pristine beach perfect for whale watching and relaxation"
    },
    {
      id: 3,
      name: "Ella Highlands",
      location: "Hill Country",
      price: "$75",
      rating: 4.7,
      image: "/ella-highlands.jpg",
      description: "Scenic mountain town with tea plantations and hiking"
    },
    {
      id: 4,
      name: "Galle Fort",
      location: "Southern Coast",
      price: "$55",
      rating: 4.6,
      image: "/galle-fort.jpg",
      description: "Historic Dutch fort with colonial architecture"
    }
  ];

  const services = [
    {
      icon: <Plane className="w-8 h-8 text-blue-600" />,
      title: "Tour Packages",
      description: "Customized tour packages tailored to your preferences"
    },
    {
      icon: <Hotel className="w-8 h-8 text-green-600" />,
      title: "Hotel Booking",
      description: "Best accommodation options at competitive prices"
    },
    {
      icon: <Car className="w-8 h-8 text-purple-600" />,
      title: "Transportation",
      description: "Comfortable and reliable transportation services"
    },
    {
      icon: <Camera className="w-8 h-8 text-orange-600" />,
      title: "Photography Tours",
      description: "Capture your memories with professional photography"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "United Kingdom",
      text: "Amazing experience with lankaumeshtours! Umesh and the team made our Sri Lanka trip unforgettable. Highly recommended!",
      rating: 5
    },
    {
      name: "Michael Chen",
      location: "Singapore",
      text: "Professional service and excellent planning. Every detail was taken care of. Will definitely book again!",
      rating: 5
    },
    {
      name: "Emma Williams",
      location: "Australia",
      text: "Best tourism experience in Sri Lanka. The team is knowledgeable and friendly. Thank you lankaumeshtours!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 animate-gradient">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2 animate-fade-in-left">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center animate-pulse-glow">
                <img 
                  src="/tourslk-logo.png" 
                  alt="ToursLk Logo" 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-gray-800">lankaumeshtours</span>
              
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['home', 'destinations', 'services', 'about', 'testimonials', 'contact'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-200 hover:scale-105 ${
                    activeSection === item 
                      ? 'text-blue-600 font-semibold' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item}
                </button>
              ))}
            </div>
            
            <Button 
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 animate-pulse-glow"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Book Now
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
                {" "}Sri Lanka
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              Experience unforgettable adventures with lankaumeshtours. Your journey to paradise begins here, powered by Umesh's expertise in creating magical travel experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8 py-4 hover-lift">
                Explore Destinations
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-gray-900 hover-lift">
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
      <section id="tour-packages" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Tour 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-700 animate-gradient">
                {" "}Packages
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handcrafted experiences designed to create unforgettable memories
            </p>
          </div>
          
          <div className="relative">
            {/* Navigation Buttons */}
            <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10">
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
            
            <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10">
              <Button
                onClick={nextTour}
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-full bg-white shadow-lg border border-green-200 hover:bg-green-50 hover:border-green-300 hover:scale-110 transition-all duration-300"
                disabled={currentTourIndex + 4 >= tourPackages.length}
              >
                <ChevronRight className="w-6 h-6 text-green-600" />
              </Button>
            </div>

            {/* Tour Cards Container */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out gap-6"
                style={{ 
                  transform: `translateX(-${currentTourIndex * 25}%)`,
                  width: `${(tourPackages.length / 4) * 100}%`
                }}
              >
                {tourPackages.map((tour, index) => (
                  <Card 
                    key={tour.id}
                    onClick={() => handleTourClick(tour.id)}
                    className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden cursor-pointer hover-lift bg-white border border-green-100 hover:border-green-200 animate-stagger-${(index % 4) + 1}`}
                    style={{ 
                      minWidth: 'calc(25% - 18px)',
                      animationDelay: `${(index % 4) * 0.1}s`
                    }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <div className={`absolute inset-0 bg-white-to-r ${tour.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                      <img 
                        src={tour.image} 
                        alt={tour.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      {/* Price Badge */}
                      <div className="absolute top-4 right-4 space-y-1">
                        <Badge className={`bg-gradient-to-r ${tour.color} text-white shadow-lg`}>
                          {tour.price}
                        </Badge>
                        {tour.originalPrice && (
                          <Badge variant="outline" className="bg-white text-gray-600 text-xs line-through border-green-200">
                            {tour.originalPrice}
                          </Badge>
                        )}
                      </div>
                      
                      {/* Duration Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 text-green-700 border border-green-200">
                          <Clock className="w-3 h-3 mr-1" />
                          {tour.duration}
                        </Badge>
                      </div>
                      
                      {/* Rating */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white rounded-full px-2 py-1 shadow-lg border border-green-100">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium text-green-700">{tour.rating}</span>
                      </div>
                    </div>
                    
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-gray-800 group-hover:text-green-700 transition-all duration-300">
                        {tour.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        {tour.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {/* Highlights */}
                        <div className="space-y-1">
                          {tour.highlights.slice(0, 2).map((highlight, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${tour.color}`}></div>
                              {highlight}
                            </div>
                          ))}
                          {tour.highlights.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{tour.highlights.length - 2} more highlights
                            </div>
                          )}
                        </div>
                        
                        {/* Action Button */}
                        <Button 
                          size="sm" 
                          className={`w-full bg-gradient-to-r ${tour.color} hover:shadow-lg hover:scale-105 transition-all duration-300 text-white border-0`}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Progress Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.max(1, tourPackages.length - 3) }, (_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentTourIndex 
                      ? 'w-8 bg-gradient-to-r from-green-500 to-green-600 shadow-md' 
                      : 'w-2 bg-gray-300 hover:bg-green-300'
                  }`}
                  onClick={() => setCurrentTourIndex(i)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section id="destinations" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Destinations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the most breathtaking locations Sri Lanka has to offer
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((destination, index) => (
              <Card key={destination.id} className={`group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden hover-lift animate-stagger-${index + 1}`}>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-gray-900 animate-pulse-glow">${destination.price}</Badge>
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
                  <p className="text-gray-600 mb-4">{destination.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 animate-pulse" />
                      <span className="text-sm font-medium">{destination.rating}</span>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-green-600 hover-lift">
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
      <section id="services" className="py-20 bg-gradient-to-br from-blue-50 to-green-50 animate-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tourism services to make your journey memorable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`text-center p-6 hover:shadow-lg transition-all duration-300 hover-lift animate-stagger-${index + 1}`}>
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
                className={`p-6 hover:shadow-lg transition-all duration-300 hover-lift animate-stagger-${
                  index + 1
                }`}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400 animate-pulse"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white font-semibold mr-4 animate-pulse-glow">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
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
                    <Input placeholder="First Name" className="hover-lift" />
                    <Input placeholder="Last Name" className="hover-lift" />
                  </div>
                  <Input
                    placeholder="Email Address"
                    type="email"
                    className="hover-lift"
                  />
                  <Input placeholder="Phone Number" className="hover-lift" />
                  <Textarea
                    placeholder="Tell us about your travel plans..."
                    rows={4}
                    className="hover-lift"
                  />
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 animate-pulse-glow">
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6 animate-fade-in-right">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 hover-lift">
                    <Phone className="w-5 h-5 text-blue-600 animate-pulse" />
                    <span>+94 77 123 4567</span>
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
                    src="/tourslk-logo.png"
                    alt="ToursLk Logo"
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
