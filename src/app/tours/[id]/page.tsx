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
  Download,
  Menu,
  X
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

// Extended tour data (keeping your existing data structure)
const tourPackagesData: TourPackage[] = [
  {
    id: 1,
    name: "Heritage, Natural & Wildlife",
    duration: "3 Days | 2 Nights",
    price: "$395",
    originalPrice: "$450",
    rating: 4.9,
    image: "/sigiriyarock.jpg",
    description: "Explore ancient temples, historic sites, and cultural wonders",
    highlights: ["Pick up from Hikkaduwa/Galle/Mirissa","Udawalawa","Ella","Nuwara Eliya","Sigiriya Rock","Kandy",  "Drop your pickup location"],
    color: "from-green-500 to-green-600",
    iconColor: "text-green-600",
    longDescription: "Experience the beauty of Sri Lanka in just 3 days with this exciting highlights tour that takes you from the Hikkaduwa, Galle, or Mirissa to the misty hills of Nuwara Eliya and the heart of the Cultural Triangle. Begin your journey with stops at Udawalawa, Ella, the iconic Nine Arch Bridge, Little Adam’s Peak, and a Spice Garden, with the chance to enjoy a scenic train ride before settling into Nuwara Eliya for the night. On the second day, discover the charm of Nuwara Eliya’s colonial landmarks such as the Post Office, stroll through Haggala or Victoria Botanical Garden, enjoy a tea experience at Ramboda, and continue your journey with a visit to either the Temple of the Tooth in Kandy or the unique Ambuluwawa Tower before heading to Sigiriya for your overnight stay. On the final day, climb the world-famous Sigiriya Rock Fortress, explore the stunning Dambulla Cave Temple, and conclude your adventure with a drop-off back at your hotel or starting location. This short but memorable tour is perfect for travelers who want to explore Sri Lanka’s nature, history, and culture in just a few days.",
    groupSize: "2-13 people(Minimum 2 people)",
    difficulty: "Easy",
    bestTime: "Any Months",
    startLocation: "Pickup Hikkaduwa/Galle/Mirissa",
    endLocation: "Pickup Location",
    itinerary: [
      {
        day: 1,
        title: "Pickup Hikkaduwa/Galle/Mirissa & Nuwara Eliya",
        description: "Welcome to Sri Lanka! Begin your cultural journey.",
        activities: ["Pickup you Hikkaduwa/Galle/Mirissa","Udawalawa","Ella","Nine Arch Bridge","Spice Garden","Little Adam's peak", "Train Ride (depend time)","Nuwara Eliya","Over Night Nuwara Eliya",],
        meals: ["Not Including"],
        accommodation: "Not Including"
      },
      {
        day: 2,
        title: "Nuwara Eliya to Sigiriya",
        description: "Travel to the Cultural Triangle and explore the magnificent Sigiriya Rock Fortress.",
        activities: ["Nuwara Eliya Post Office","Haggala or Victoria Botanical Garden","Ramboda Tea Plantation","Kandy Tooth Temple or Ambuluwawa Tower","Over Night Sigiriya",],
        meals: ["Not Including"],
        accommodation: "Not Including"
      },
      {
        day: 3,
        title: "Sigiriya & Drop your Hotel",
        description: "Discover ancient cave temples and the medieval capital of Sri Lanka.",
        activities: ["Sigiriya Rock","Dambulla Cave Temple","Drop Your Pickup Location",],
        meals: ["Not Including"],
        accommodation: "Not Including"
      }
    ],
    inclusions: [
      "Safari Hilux jeep and Udawalawa National Park entrance ticket",
      "Parking Tickets",
      "Dambulla Cave Temple entrance ticket",
      "Sigiriya Rock entrance ticket",
      "Train tickets",
      "English-speaking guide",
      "Air-conditioned vehicle",
    ],
    exclusions: [
      "Personal expenses",
      "meals",
      
      "Travel insurance",
      "Alcoholic beverages",
      "Items not mentioned in inclusions"
    ],
    gallery: ["/ride.webp", "/nuwaraeliya2.jpg", "/nuwaraeliyar.jpg", "/nuwaraeliyar.jpg"]
  },
  {
    id: 2,
    name: "Heritage and Hill Country tour",
    duration: "4 Days | 3 Nights",
    price: "$555 ",
    originalPrice: "$799",
    rating: 4.8,
    image: "/srilankawaterfall.jpg",
    description: "Explore Sri Lanka’s misty tea hills, scenic Ella, and the wildlife of Udawalawe in a perfect 4-day adventure.",
    highlights: [
      "Pickup Colombo Airport(CMB)",
        "Sigiriya",
        "Kandy",
        "Nuwara Eliya",
        "Ella",
        "Udawalawa",
        "Drop Colombo Airport(CMB) or Your Down South Hotel",
    ],
    color: "from-blue-400 to-blue-500",
    iconColor: "text-blue-600",
    longDescription: "Discover the best of Sri Lanka in 4 unforgettable days with this highlights tour that blends culture, nature, and breathtaking landscapes. Begin your adventure with a warm airport pickup from Colombo and head straight to the iconic Sigiriya, where you’ll spend your first night. The next morning, climb the majestic Sigiriya Rock Fortress, explore the palace ruins and museum, and continue to Kandy to visit the sacred Temple of the Tooth before enjoying a scenic drive through the hill country to Nuwara Eliya, the “Little England” of Sri Lanka, where you’ll visit tea plantations and stay overnight. On day three, explore the beauty of Nuwara Eliya with stops at the colonial Post Office, Lake Gregory, and either Victoria or Haggala Botanical Garden before heading to Ella to see the Nine Arches Bridge, hike Little Adam’s Peak, and stroll through the charming town, then continue to Udawalawa or Yala for your overnight stay. Your final day begins with a thrilling morning safari in Udawalawa or Yala National Park, where you’ll spot elephants and diverse wildlife, before returning to Colombo Airport or heading to your beach hotel in the south. This short yet adventure-filled journey is the perfect way to experience Sri Lanka’s most famous highlights in just four days.",
    groupSize: "2-12 people",
    difficulty: "Easy",
    bestTime: "Any Months",
    startLocation: "Colombo Airport(CMB)",
    endLocation: "Colombo Airport(CMB)",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Sigiriya",
        description: "Begin your Sri Lankan adventure with a warm welcome and a visit to the magnificent Sigiriya Rock Fortress.",
        activities: [
          "Airport pickup from Colombo (CMB)",
          "Drive to Sigiriya",
          
          "Overnight in Sigiriya area"
        ],
        meals: ["Not Including"],
        accommodation: "Not Including"
      },
      {
        day: 2,
        title: "Sigiriya to Nuwara Eliya",
        description: "Travel from the cultural heartland to the misty highlands of Nuwara Eliya, famous for its tea plantations and colonial charm.",
        activities: [
          "Climb Sigiriya Rock Fortress",
          "Explore the ancient palace ruins",
          "Visit Sigiriya Museum",
          "Kandy Tooth Temple",
          
          "Scenic drive through the hill country",
          "Tea plantation and tea factory visit",
          
          "Overnight in Nuwara Eliya"
        ],
        meals: ["Not Including"],
        accommodation: "Not Including"
      },
      {
        day: 3,
        title: "Nuwara Eliya to Udawalawa or Yala",
        description: "Take in breathtaking mountain scenery and explore the charming town of Ella.",
        activities: [
          "Nuwara Eliya Post Office",
          "Lake Gregory visit",
          "Victoria or Haggala Botanical Garden",
          "Visit Nine Arches Bridge",
          "Little Adam’s Peak hike",
          "Spice Garden visit",
          "Explore Ella town",
          "Overnight in Udawalawa or Yala area"
        ],
        meals: ["Not Including"],
        accommodation: "Not Including"
      },
      {
        day: 4,
        title: "Udawalawa to Departure or your Down South Hotel",
        description: "Wrap up your journey with an exciting safari in Udawalawa National Park before returning to Colombo.",
        activities: [
          
          "Drive to Udawalawa",
          "Morning wildlife safari in Udawalawa or yala national park",
          "Spot elephants and other wildlife",
          
          "Drop-off at Colombo Airport (CMB)",
          "Departure or Down South Hotel"
        ],
        meals: ["Not Including"],
        accommodation: "Not Including"
      }
    ],

    gallery: ["/ride.webp", "/elephant.jpg", "/elephant2.jpg", "/elephant3.jpg"],
    inclusions: [
      "Safari Hilux jeep and Udawalawa or Yala National Park entrance ticket",
      "Parking Tickets",
      "Dambulla Cave Temple entrance ticket",
      "Sigiriya Rock entrance ticket",
      "Train tickets",
      "English-speaking guide",
      "Air-conditioned vehicle",
    ],
    exclusions: [
      "Personal expenses",
      "meals",
      
      "Travel insurance",
      "Alcoholic beverages",
      "Items not mentioned in inclusions"
    ],
  },
  {
    id: 3,
    name: "Wildlife Adventure Safari",
    duration: "1 Day", 
    price: "$240 ",
    originalPrice: "$270",
    rating: 4.7,
    image: "/udawalawa.jpg",
    description: "Encounter elephants, leopards, and exotic wildlife in their natural habitat",
    highlights: [
      "Pickup from Hikkaduwa/Galle/Mirissa",
        
        
        
        "Yala National Park",
        "Ella",
        "Drop from Hikkaduwa/Galle/Mirissa",
    ],
    color: "from-green-600 to-green-700",
    iconColor: "text-green-600",
    longDescription: "Set off on an unforgettable 1-day adventure through Sri Lanka’s natural beauty and cultural charm. Begin with a pickup from Hikkaduwa, Galle, or Mirissa, then head for an exciting Yala Wildlife Safari, where you’ll spot elephants, leopards, and other incredible animals in their natural habitat. Continue your journey to Ella, one of Sri Lanka’s most scenic hill country towns, where you’ll visit the iconic Nine Arches Bridge, hike up the picturesque Little Adam’s Peak, and enjoy a breathtaking train ride from Haliela to Ella. On the way, stop at a Spice Garden to experience Sri Lanka’s fragrant flavors and traditional herbs. This one-day tour is perfect for travelers who want to experience wildlife, mountains, and culture all in a single adventure.",
    groupSize: "2-13 people (Minimum 2 people)",
    difficulty: "Easy", 
    bestTime: "Any Months",
    startLocation: "Pickup from hikkaduwa/Galle/Mirissa",
    endLocation: "Drop from hikkaduwa/Galle/Mirissa",
    itinerary: [
      {
        day: 1,
        title: "Pickup & Ella",
        description: "Welcome to Sri Lanka! Begin your adventure with ancient wonders.",
        activities: [
          "Pickup from Hikkaduwa/Galle/Mirissa",
          "Yala Wildlife Safari",
          "Ella",
          "Nine Arches Bridge",
          "Little Adam's Peak",
          "Train Ride (Haliela to Ella)",
          "Spice Garden",


          
          
          
        ],
        meals: ["Not Including"],
        accommodation: "Not Including"
      }
    ],
    inclusions: [
    "Safari Hilux jeep and Yala National Park entrance ticket",
      "Train tickets",
      "Parking Tickets",
      "English-speaking guide",
      "Air-conditioned vehicle",
      "Monkey feeding(Banana)",
    ],
    exclusions: [
      "Personal expenses",
      "meals",
      
      "Travel insurance",
      "Alcoholic beverages",
      "Items not mentioned in inclusions"
    ],
    gallery: [
      "/1day1.jpg", 
      "/1day2.jpg", 
      "/1day3.jpg", 
      "/1day5.jpg"
    ]
  },
  {
    id: 4,
    name: "Wildlife Adventure Safari Udawalawa",
    duration: "1 Day", 
    price: "$235 ",
    originalPrice: "$270",
    rating: 4.7,
    image: "/udawalawa.jpg",
    description: "Encounter elephants, leopards, and exotic wildlife in their natural habitat",
    highlights: [
      "Pickup from Hikkaduwa/Galle/Mirissa",
        
        
        
        "Udawalawa National Park",
        "Ella",
        "Drop from Hikkaduwa/Galle/Mirissa",
    ],
    color: "from-green-600 to-green-700",
    iconColor: "text-green-600",
    longDescription: "Set off on an unforgettable 1-day adventure through Sri Lanka’s natural beauty and cultural charm. Begin with a pickup from Hikkaduwa, Galle, or Mirissa, then head for an exciting Udawalawa Wildlife Safari, where you’ll spot elephants, leopards, and other incredible animals in their natural habitat. Continue your journey to Ella, one of Sri Lanka’s most scenic hill country towns, where you’ll visit the iconic Nine Arches Bridge, hike up the picturesque Little Adam’s Peak, and enjoy a breathtaking train ride from Haliela to Ella. On the way, stop at a Spice Garden to experience Sri Lanka’s fragrant flavors and traditional herbs. This one-day tour is perfect for travelers who want to experience wildlife, mountains, and culture all in a single adventure.",
    groupSize: "2-13 people (Minimum 2 people)",
    difficulty: "Easy", 
    bestTime: "Any Months",
    startLocation: "Pickup from hikkaduwa/Galle/Mirissa",
    endLocation: "Drop from hikkaduwa/Galle/Mirissa",
    itinerary: [
      {
        day: 1,
        title: "Pickup & Ella",
        description: "Welcome to Sri Lanka! Begin your adventure with ancient wonders.",
        activities: [
          "Pickup from Hikkaduwa/Galle/Mirissa",
          "Udawalawa Wildlife Safari",
          "Ella",
          "Nine Arches Bridge",
          "Little Adam's Peak",
          "Train Ride (Haliela to Ella)",
          "Spice Garden",


          
          
          
        ],
        meals: ["Not Including"],
        accommodation: "Not Including"
      }
    ],
    inclusions: [
    "Safari Hilux jeep and Yala National Park entrance ticket",
      "Train tickets",
      "Parking Tickets",
      "English-speaking guide",
      "Air-conditioned vehicle",
      "Monkey feeding(Banana)",
    ],
    exclusions: [
      "Personal expenses",
      "meals",
      
      "Travel insurance",
      "Alcoholic beverages",
      "Items not mentioned in inclusions"
    ],
    gallery: [
      "/1day1.jpg", 
      "/1day2.jpg", 
      "/1day3.jpg", 
      "/1day5.jpg"
    ]
  },
  {
    id: 5,
    name: "Galle City Tour",
    duration: "1 Day", 
    price: "Customize Price",
    originalPrice: "",
    rating: 4.7,
    image: "/gallefort1.jpg",
    description: "Discover the charm of Galle — where history, culture, and coastal beauty meet.",
    highlights: [
      "Pickup your Hotel",
      "Galle Fort", 
      "Koggala Lake Boat Safari",
      "Sea Turtle Hatchery",
      "Stick Fisherman",
      "Drop your Pickup Location"
    ],
    color: "from-green-600 to-green-700",
    iconColor: "text-green-600",
    longDescription: "Embark on an unforgettable journey through the southern charm of Sri Lanka! Start with a convenient pickup from your down-south hotel and step into the UNESCO World Heritage Galle Fort, where colonial history whispers through every street. Glide across the serene waters of Koggala Lake on a boat safari, spot exotic wildlife, and witness the timeless tradition of Sri Lanka’s famous stick fishermen. Visit a Sea Turtle Hatchery to see conservation in action before ending your day with a safe drop-off at your hotel. A perfect blend of culture, nature, and coastal beauty — all in one tour!",
    groupSize: "2-13 people (Minimum 2 people)",
    difficulty: "Very Easy", 
    bestTime: "12 Months",
    startLocation: "Pickup your Hotel",
    endLocation: "Drop your Pickup Location",
    itinerary: [
  {
    day: 1,
    title: "Galle City Tour",
    description: "Explore the charm of Sri Lanka’s southern coast with history, culture, and nature in one unforgettable day.",
    activities: [
      "Pickup from your  hotel",
      "Visit the UNESCO World Heritage Galle Fort",
      "Enjoy a scenic Koggala Lake Boat Safari",
      "Visit the Sea Turtle Hatchery and learn about conservation",
      "Experience the traditional Stick Fishermen",
      "Drop-off at your pickup location"
    ],
    meals: ["Not Including"],
    accommodation: "Not Including"
  }
]
,
    inclusions: [
      "Parking Tickets",
      "English-speaking guide",
      "Air-conditioned vehicle",
    ],
    exclusions: [
      "Personal expenses",
      "meals",
      "Entrance fees to attractions",
      "Travel insurance",
      "Alcoholic beverages",
      "Items not mentioned in inclusions"
    ],
    gallery: [
      "/turtle.jpg", 
      "/turtle1.jpg", 
      "/turtle4.jpg", 
      "/turtle3.jpg"
    ]
  },
  {
    id: 6,
    name: "Madu River Boart Safari",
    duration: "1 Day", 
    price: "Customize",
    originalPrice: "",
    rating: 4.7,
    image: "/maduriver.jpg",
    description: "Madu River Boat Safari: Experience the serene beauty of Madu River",
    highlights: [
      "Madu River", 
    ],
    color: "from-green-600 to-green-700",
    iconColor: "text-green-600",
    longDescription: "Escape into the heart of Sri Lanka’s natural beauty with the Madu River Boat Safari. Begin with a convenient pickup from your down-south hotel before drifting through the lush mangrove forests and winding waterways of the Madu River. Discover hidden islands, spot exotic birds and wildlife, and feel the serenity of this tropical paradise. End your adventure with a comfortable drop-off at your hotel — a day filled with relaxation, exploration, and unforgettable memories.",
    groupSize: "2-13 people (Minimum 2 people)",
    difficulty: "Very Easy", 
    bestTime: "12 Months",
    startLocation: "Pickup your Hotel",
    endLocation: "Drop your Pickup Location",
    itinerary: [
  {
    day: 1,
    title: "Madu River Boat Safari",
    description: "Discover the beauty of Sri Lanka’s southern waterways with a peaceful river cruise and scenic lake safari.",
    activities: [
      "Pickup from your down-south hotel",
      "Enjoy a boat safari along the Madu River with mangrove forests and small islands",
      
      "Drop-off at your pickup location"
    ],
    meals: ["Not Including"],
    accommodation: "Not Including"
  }
]

,
    inclusions: [
      "Parking Tickets",
      "English-speaking guide",
      "Air-conditioned vehicle",
    ],
    exclusions: [
      "Personal expenses",
      "meals",
      "Entrance fees to attractions",
      "Travel insurance",
      "Alcoholic beverages",
      "Items not mentioned in inclusions"
    ],
    gallery: [
      "/maduiver3.jpg", 
      "/maduriver1.jpg", 
      "/maduriver2.jpg", 
      "/maduriver4.jpg"
    ]
  },
  {
    id: 7,
    name: "Mirissa Whale Watching",
    duration: "1 Day", 
    price: "Customize",
    originalPrice: "",
    rating: 4.7,
    image: "/whaleswatching.jpg",
    description: "Mirissa Whale Watching: Witness the majestic blue whales and dolphins",
    highlights: [
      "Pickup from  hotel",
      "Mirissa Whale Watching",
      "Drop your Pickup Location",
    ],
    color: "from-green-600 to-green-700",
    iconColor: "text-green-600",
    longDescription: "Set sail on an unforgettable adventure in Mirissa, Sri Lanka’s world-famous whale watching paradise! Begin with a convenient pickup from your down-south hotel and cruise into the sparkling Indian Ocean. Keep your eyes open for the majestic blue whales, playful dolphins, and other incredible marine life that call these waters home. After an awe-inspiring morning at sea, return safely and comfortably to your hotel — a once-in-a-lifetime ocean experience you’ll never forget",
    groupSize: "2-13 people (Minimum 2 people)",
    difficulty: "Very Easy", 
    bestTime: "12 Months",
    startLocation: "Pickup your Hotel",
    endLocation: "Drop your Pickup Location",
    itinerary: [
  {
    day: 1,
    title: "Mirissa Whale Watching",
    description: "Experience the thrill of Sri Lanka’s southern seas as you set out in search of majestic whales and playful dolphins in their natural habitat.",
    activities: [
      "Pickup from your hotel",
      "Set sail on a Mirissa Whale Watching cruise",
      "Spot blue whales, sperm whales, dolphins, and other marine life",
      "Return to Mirissa harbor",
      "Drop-off at your pickup location"
    ],
    meals: ["Not Including"],
    accommodation: "Not Including"
  }
]


,
    inclusions: [
      "Parking Tickets",
      "English-speaking guide",
      "Air-conditioned vehicle",
    ],
    exclusions: [
      "Personal expenses",
      "meals",
      "Entrance fees to attractions",
      "Travel insurance",
      "Alcoholic beverages",
      "Items not mentioned in inclusions"
    ],
    gallery: [
      "/whaleswatching.jpg", 
      "/whaleswatching1.jpg", 
      "/whaleswatching2.jpg", 
      "/whaleswatching3.jpg"
    ]
  },
  {
    id: 8,
    name: "Airport Drop and Pickup",
    duration: "1 Day", 
    price: "Customize",
    originalPrice: "",
    rating: 4.7,
    image: "/airportdrop.jpg",
    description: "Airport Drop and Pickup",
    highlights: ["Pickup Colombo Airport(CMB)","Drop Colombo Airport(CMB)","Airport Drop and Pickup"],
    color: "from-green-600 to-green-700",
    iconColor: "text-green-600",
    longDescription: "Start and end your Sri Lankan journey with comfort and peace of mind. Our reliable airport pickup and drop-off service from Colombo International Airport (CMB) ensures a smooth travel experience. Whether you’re arriving for your dream holiday or heading home after an unforgettable stay, we’ll be there on time with a safe, friendly, and hassle-free ride — because your journey matters from the very first step.",
    groupSize: "2-13 people (Minimum 2 people)",
    difficulty: "Very Easy", 
    bestTime: "12 Months",
    startLocation: "Pickup Colombo Airport(CMB),Drop Colombo Airport(CMB)",
    endLocation: "Pickup Colombo Airport(CMB),Drop Colombo Airport(CMB)",
    itinerary: [
  {
    day: 1,
    title: "Airport Drop & Pickup",
    description: "Enjoy a smooth and reliable transfer service to and from Colombo International Airport (CMB), ensuring comfort and peace of mind for your journey.",
    activities: [
      "Pickup from Colombo Airport (CMB)",
      "Drop at Colombo Airport (CMB)",
      "Dedicated Airport Drop and Pickup Service"
    ],
    meals: ["Not Including"],
    accommodation: "Not Including"
  }
]



,
    inclusions: [
      "Parking Tickets",
      "English-speaking guide",
      "Air-conditioned vehicle",
    ],
    exclusions: [
      "Personal expenses",
      "meals",
      "Entrance fees to attractions",
      "Travel insurance",
      "Alcoholic beverages",
      "Items not mentioned in inclusions"
    ],
    gallery: [
      "/wildlife-1.jpg", 
      "/wildlife-2.jpg", 
      "/wildlife-3.jpg", 
      "/wildlife-4.jpg"
    ]
  }
];

export default function TourDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [tour, setTour] = useState<TourPackage | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const tourId = parseInt(params.id as string);
    const foundTour = tourPackagesData.find(t => t.id === tourId);
    setTour(foundTour || null);
  }, [params.id]);

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center animate-fade-in-up">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tour details...</p>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    router.push(`/booking?tourId=${tour.id}&tourName=${encodeURIComponent(tour.name)}&price=${encodeURIComponent(tour.price)}`);
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tour.name,
        text: tour.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Responsive Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            {/* Back Button - Hidden on small mobile, icon only on mobile */}
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                onClick={() => router.back()}
                className="flex items-center gap-1 sm:gap-2 hover:bg-green-50 px-2 sm:px-4"
                size="sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            </div>
            
            {/* Logo - Responsive sizing */}
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <img 
                  src="/Lankaumeshtours.png" 
                  alt="Lankaumeshtours Logo" 
                  className="w-4 h-4 sm:w-6 sm:h-6 object-contain"
                />
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-800 truncate max-w-[120px] sm:max-w-none">
                lankaumeshtours
              </span>
            </div>

            {/* Action Buttons - Responsive layout */}
            <div className="flex gap-1 sm:gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleShare}
                className="hidden sm:flex"
              >
                <Share2 className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden md:inline">Share</span>
              </Button>
              
              {/* Mobile menu button */}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="sm:hidden"
              >
                {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
              
              <Button 
                size="sm" 
                className={`bg-gradient-to-r ${tour.color} text-white hidden sm:flex`}
              >
                <Heart className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden md:inline">Save</span>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="sm:hidden border-t border-gray-200 py-4 space-y-2">
              <Button 
                variant="ghost" 
                onClick={handleShare}
                className="w-full justify-start"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Tour
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
              >
                <Heart className="w-4 h-4 mr-2" />
                Save Tour
              </Button>
              <Button 
                onClick={handleBookNow}
                className={`w-full bg-gradient-to-r ${tour.color} text-white`}
              >
                Book This Tour
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Responsive Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden">
        <img 
          src={tour.image} 
          alt={tour.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
        {/* Responsive Floating Info Card */}
        <div className="absolute bottom-4 sm:bottom-8 left-4 right-4 sm:left-8 sm:right-8">
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl animate-slide-in-up">
            <CardContent className="p-4 sm:p-6">
              {/* Mobile Layout - Stacked */}
              <div className="block lg:hidden space-y-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight">{tour.name}</h1>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 line-clamp-2">{tour.description}</p>
                  
                  {/* Mobile Stats Row */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{tour.rating}</span>
                      <span className="text-gray-500 hidden sm:inline">(245 reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="truncate max-w-[100px] sm:max-w-none">{tour.groupSize}</span>
                    </div>
                  </div>
                </div>
                
                {/* Price and Book Button Row */}
                <div className="flex items-center justify-between">
                  <div>
                    {tour.originalPrice && (
                      <span className="text-sm sm:text-base text-gray-500 line-through mr-2">
                        {tour.originalPrice}
                      </span>
                    )}
                    <span className="text-2xl sm:text-3xl font-bold text-green-600">{tour.price}</span>
                    <span className="text-gray-500 ml-1 text-sm">/person</span>
                  </div>
                  <Button 
                    size="sm" 
                    className={`bg-gradient-to-r ${tour.color} hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap`}
                    onClick={handleBookNow}
                  >
                    Book Now
                  </Button>
                </div>
              </div>

              {/* Desktop Layout - Grid */}
              <div className="hidden lg:grid grid-cols-3 gap-6 items-center">
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
                
                <div className="text-center">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 justify-center">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{tour.groupSize}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{tour.startLocation}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="mb-4">
                    {tour.originalPrice && (
                      <span className="text-lg text-gray-500 line-through mr-2">
                        {tour.originalPrice}
                      </span>
                    )}
                    <span className="text-3xl font-bold text-green-600">{tour.price}</span>
                    <span className="text-gray-500 ml-1">per person All Including</span>
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

      {/* Responsive Main Content */}
      <section className="py-6 sm:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Responsive Tab Navigation */}
            <div className="mb-6 sm:mb-8">
              {/* Mobile: Horizontal scrollable tabs */}
              <div className="sm:hidden">
                <div className="flex space-x-1 overflow-x-auto pb-2 scrollbar-hide">
                  {[
                    { value: 'overview', label: 'Overview' },
                    { value: 'itinerary', label: 'Itinerary' },
                    { value: 'inclusions', label: 'Included' },
                    { value: 'gallery', label: 'Gallery' },
                    { value: 'booking', label: 'Book' }
                  ].map((tab) => (
                    <button
                      key={tab.value}
                      onClick={() => setActiveTab(tab.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                        activeTab === tab.value
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Desktop: Full width grid */}
              <TabsList className="hidden sm:grid w-full grid-cols-5 bg-white border border-green-200 h-auto p-1">
                <TabsTrigger value="overview" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 py-3">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="itinerary" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 py-3">
                  Itinerary
                </TabsTrigger>
                <TabsTrigger value="inclusions" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 py-3">
                  What's Included
                </TabsTrigger>
                <TabsTrigger value="gallery" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 py-3">
                  Gallery
                </TabsTrigger>
                <TabsTrigger value="booking" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 py-3">
                  Book Now
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Main Content - Mobile first approach */}
                <div className="lg:col-span-2">
                  <Card className="animate-fade-in-left">
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-2xl">About This Tour</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
                        {tour.longDescription}
                      </p>
                      
                      <h3 className="text-lg sm:text-xl font-semibold mb-4">Tour Highlights</h3>
                      <div className="grid grid-cols-1 gap-3">
                        {tour.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm sm:text-base">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Sidebar - Responsive stacking */}
                <div className="space-y-6">
                  {/* Quick Info Card */}
                  <Card className="animate-fade-in-right">
                    <CardHeader>
                      <CardTitle className="text-lg sm:text-xl">Quick Info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 text-sm sm:text-base">Duration</span>
                          <span className="font-semibold text-sm sm:text-base">{tour.duration}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 text-sm sm:text-base">Group Size</span>
                          <span className="font-semibold text-sm sm:text-base text-right">{tour.groupSize}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 text-sm sm:text-base">Difficulty</span>
                          <Badge variant="outline" className="border-green-200 text-green-700 text-xs sm:text-sm">
                            {tour.difficulty}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 text-sm sm:text-base">Best Time</span>
                          <span className="font-semibold text-sm sm:text-base">{tour.bestTime}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-start">
                          <span className="text-gray-600 text-sm sm:text-base">Start Location</span>
                          <span className="font-semibold text-sm sm:text-base text-right max-w-[60%]">{tour.startLocation}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-gray-600 text-sm sm:text-base">End Location</span>
                          <span className="font-semibold text-sm sm:text-base text-right max-w-[60%]">{tour.endLocation}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact Card */}
                  <Card className="animate-fade-in-right" style={{ animationDelay: '0.2s' }}>
                    <CardHeader>
                      <CardTitle className="text-lg sm:text-xl">Need Help?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start text-sm sm:text-base">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Us: +94 74 135 9498
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-sm sm:text-base">
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
                  <CardTitle className="text-xl sm:text-2xl">Day by Day Itinerary</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Detailed breakdown of your {tour.duration} adventure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 sm:space-y-6">
                    {tour.itinerary.map((day, index) => (
                      <div key={day.day} className={`relative p-4 sm:p-6 rounded-lg border-2 border-green-100 bg-gradient-to-r from-green-50 to-blue-50 animate-stagger-${index + 1}`}>
                        <div className="flex items-start gap-3 sm:gap-4 mb-4">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r ${tour.color} flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0`}>
                            {day.day}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">{day.title}</h3>
                            <p className="text-gray-600 text-sm sm:text-base">{day.description}</p>
                          </div>
                        </div>
                        
                        {/* Mobile: Stacked layout */}
                        <div className="space-y-4 sm:hidden">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-sm">
                              <Camera className="w-4 h-4" />
                              Activities
                            </h4>
                            <ul className="space-y-1">
                              {day.activities.map((activity, idx) => (
                                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                  <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                                  <span>{activity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-sm">
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
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-sm">
                              <Bed className="w-4 h-4" />
                              Accommodation
                            </h4>
                            <p className="text-sm text-gray-600">{day.accommodation}</p>
                          </div>
                        </div>

                        {/* Desktop: Grid layout */}
                        <div className="hidden sm:grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                              <Camera className="w-4 h-4" />
                              Activities
                            </h4>
                            <ul className="space-y-1">
                              {day.activities.map((activity, idx) => (
                                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                  <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                                  <span>{activity}</span>
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <Card className="animate-fade-in-left">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl text-green-700 flex items-center gap-2">
                      <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6" />
                      What's Included
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tour.inclusions.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                          <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="animate-fade-in-right">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl text-red-700 flex items-center gap-2">
                      <XCircle className="w-5 sm:w-6 h-5 sm:h-6" />
                      What's Not Included
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tour.exclusions.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-200">
                          <XCircle className="w-4 sm:w-5 h-4 sm:h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm sm:text-base">{item}</span>
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
                  <CardTitle className="text-xl sm:text-2xl">Photo Gallery</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Get a glimpse of what awaits you on this amazing journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Responsive Gallery Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {tour.gallery.map((image, index) => (
                      <div 
                        key={index} 
                        className={`relative h-48 sm:h-56 lg:h-64 rounded-lg overflow-hidden cursor-pointer group hover-lift animate-stagger-${index + 1}`}
                        onClick={() => setActiveImageIndex(index)}
                      >
                        <img 
                          src={image} 
                          alt={`${tour.name} gallery ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <Camera className="w-6 sm:w-8 h-6 sm:h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="booking">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">Book Your Adventure</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Ready to experience {tour.name}? Let's plan your perfect trip!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Tour Summary */}
                      <div className="p-4 sm:p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                        <h3 className="text-lg sm:text-xl font-semibold mb-4">Tour Summary</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <span className="text-gray-600 text-sm sm:text-base">Tour Name:</span>
                            <span className="font-semibold text-sm sm:text-base text-right max-w-[60%]">{tour.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 text-sm sm:text-base">Duration:</span>
                            <span className="font-semibold text-sm sm:text-base">{tour.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 text-sm sm:text-base">Price per person:</span>
                            <span className="font-semibold text-green-600 text-sm sm:text-base">{tour.price}</span>
                          </div>
                        </div>
                      </div>

                      {/* Contact Buttons */}
                      <div className="space-y-4">
                        <h3 className="text-lg sm:text-xl font-semibold">Contact Information</h3>
                        <Button 
                          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-base sm:text-lg py-4 sm:py-6"
                          onClick={handleBookNow}
                        >
                          <Phone className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                          Book Now via WhatsApp
                        </Button>
                        <Button variant="outline" className="w-full border-green-300 hover:bg-green-50 text-base sm:text-lg py-4 sm:py-6">
                          <Mail className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                          Email: info@lankaumeshtours.com
                        </Button>
                        <Button variant="outline" className="w-full border-green-300 hover:bg-green-50 text-base sm:text-lg py-4 sm:py-6">
                          <Phone className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                          Call: +94 74 135 9498
                        </Button>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Why Choose Us */}
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-4">Why Choose Us?</h3>
                        <div className="space-y-3">
                          {[
                            "15+ years of experience",
                            "Local expert guides",
                            "24/7 customer support",
                            "Best price guarantee",
                            "Customizable itineraries",
                            "Safety certified"
                          ].map((benefit, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="text-sm sm:text-base">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Special Offer */}
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 mb-2 text-sm sm:text-base">Special Offer!</h4>
                        <p className="text-yellow-700 text-sm sm:text-base">
                          Book now and save {tour.originalPrice ? `${parseInt(tour.originalPrice.slice(1)) - parseInt(tour.price.slice(1))}` : '15%'} on your total booking!
                        </p>
                      </div>

                      {/* Emergency Contact Info */}
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">24/7 Support</h4>
                        <p className="text-blue-700 text-sm">
                          Need immediate assistance? Our team is available around the clock to help with your booking and travel needs.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Responsive Sticky Bottom Bar for Mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {tour.originalPrice && (
                <span className="text-sm text-gray-500 line-through">{tour.originalPrice}</span>
              )}
              <span className="text-xl font-bold text-green-600">{tour.price}</span>
            </div>
            <span className="text-xs text-gray-500">per person</span>
          </div>
          <Button 
            className={`bg-gradient-to-r ${tour.color} hover:shadow-lg flex-1 max-w-[200px]`}
            onClick={handleBookNow}
          >
            Book This Tour
          </Button>
        </div>
      </div>

      {/* Add bottom padding for mobile sticky bar */}
      <div className="sm:hidden h-20"></div>
    </div>
  );
}