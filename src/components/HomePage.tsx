import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, Bell, Settings, Gift, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import weddingHero from "@/assets/wedding-hero.jpg";
import coupleStory1 from "@/assets/couple-story-1.jpg";
import brideStory from "@/assets/bride-story.jpg";
import groomStory from "@/assets/groom-story.jpg";
import coupleFeed1 from "@/assets/couple-feed-1.jpg";

const stories = [
  { id: 1, image: coupleStory1, title: "Our Story", active: true },
  { id: 2, image: brideStory, title: "Jani", active: false },
  { id: 3, image: groomStory, title: "Radit", active: false },
];

const loveStoryPhotos = [
  { id: 1, image: coupleFeed1, caption: "First Date - Coffee & Laughs ☕️💕" },
  { id: 2, image: coupleStory1, caption: "Our First Trip Together 🌅" },
  { id: 3, image: brideStory, caption: "The Proposal Day 💍✨" },
  { id: 4, image: groomStory, caption: "Engagement Photos 📸💗" },
  { id: 5, image: coupleFeed1, caption: "Planning Our Future 🏠💕" },
];

export function HomePage() {
  const navigate = useNavigate();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const currentGuest = localStorage.getItem("currentGuest") || "Guest";

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === 0 ? loveStoryPhotos.length - 1 : prev - 1
    );
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === loveStoryPhotos.length - 1 ? 0 : prev + 1
    );
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold gradient-romantic bg-clip-text text-transparent">
              Radit & Jani
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/party-details")}
            >
              <Bell className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/messages")}
            >
              <MessageCircle className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/settings")}
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto">
        {/* Stories Section */}
        <div className="p-4 border-b border-border">
          <div className="flex gap-4 overflow-x-auto">
            {stories.map((story) => (
              <div key={story.id} className="flex-shrink-0 text-center">
                <div className={`story-ring ${story.active ? 'opacity-100' : 'opacity-60'}`}>
                  <div className="story-inner">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                </div>
                <p className="text-xs mt-1 text-muted-foreground">{story.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wedding Announcement Post */}
        <div className="border-b border-border">
          {/* Post Header */}
          <div className="p-4 flex items-center gap-3">
            <div className="story-ring">
              <div className="story-inner">
                <img
                  src={coupleStory1}
                  alt="Radit & Jani"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">raditjani_wedding</p>
              <p className="text-xs text-muted-foreground">Our Wedding Day</p>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <img
              src={weddingHero}
              alt="Wedding of Radit & Jani"
              className="w-full aspect-square object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-2xl font-bold mb-1">Wedding of</h2>
              <h3 className="text-3xl font-bold">Radit & Jani</h3>
            </div>
          </div>

          {/* Post Actions */}
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleLike}
                  className="p-0 h-auto"
                >
                  <Heart className={`w-6 h-6 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => navigate("/messages")}
                  className="p-0 h-auto"
                >
                  <MessageCircle className="w-6 h-6" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => navigate("/gift")}
                  className="p-0 h-auto"
                >
                  <Gift className="w-6 h-6" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => navigate("/party-details")}
                  className="p-0 h-auto"
                >
                  <MapPin className="w-6 h-6" />
                </Button>
              </div>
            </div>

            <div className="space-y-1">
              <p className="font-semibold text-sm">
                {liked ? '1 like' : 'Be the first to like this'}
              </p>
              <p className="text-sm">
                <span className="font-semibold">raditjani_wedding</span> We're getting married! Join us for our special day. Tap the location pin for details 💕
              </p>
              <p className="text-xs text-muted-foreground">Welcome, {currentGuest}!</p>
            </div>
          </div>
        </div>

        {/* Love Story Carousel */}
        <div className="border-b border-border">
          <div className="p-4 flex items-center gap-3">
            <Heart className="w-8 h-8 text-primary" />
            <div>
              <p className="font-semibold text-sm">Our Love Story</p>
              <p className="text-xs text-muted-foreground">Journey to Forever</p>
            </div>
          </div>

          {/* Carousel */}
          <div className="relative">
            <img
              src={loveStoryPhotos[currentPhotoIndex].image}
              alt={loveStoryPhotos[currentPhotoIndex].caption}
              className="w-full aspect-square object-cover"
            />
            
            {/* Navigation Arrows */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
              {loveStoryPhotos.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="p-4">
            <p className="text-sm">{loveStoryPhotos[currentPhotoIndex].caption}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {currentPhotoIndex + 1} of {loveStoryPhotos.length}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-sm">Wedding Menu</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              onClick={() => navigate("/party-details")}
              className="h-auto p-4 flex flex-col gap-2"
            >
              <Bell className="w-6 h-6" />
              <span className="text-sm">Wedding Details</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/messages")}
              className="h-auto p-4 flex flex-col gap-2"
            >
              <MessageCircle className="w-6 h-6" />
              <span className="text-sm">Send Message</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/gift")}
              className="h-auto p-4 flex flex-col gap-2"
            >
              <Gift className="w-6 h-6" />
              <span className="text-sm">Wedding Gift</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/settings")}
              className="h-auto p-4 flex flex-col gap-2"
            >
              <Settings className="w-6 h-6" />
              <span className="text-sm">Settings</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}