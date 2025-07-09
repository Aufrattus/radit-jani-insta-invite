import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, MapPin, Phone, Heart, Car, Users, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function WeddingDetailsPage() {
  const navigate = useNavigate();

  const weddingDetails = {
    date: "Saturday, June 15, 2024",
    ceremony: {
      time: "2:00 PM",
      venue: "St. Mary's Church",
      address: "123 Wedding Avenue, Love City, LC 12345",
      contact: "+1 (555) 123-4567"
    },
    reception: {
      time: "6:00 PM",
      venue: "Grand Ballroom Hotel",
      address: "456 Celebration Street, Love City, LC 12345", 
      contact: "+1 (555) 987-6543"
    }
  };

  const handleOpenMap = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://maps.google.com?q=${encodedAddress}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/home")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary" />
            <h1 className="text-lg font-semibold">Wedding Details</h1>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Wedding Date */}
        <Card className="shadow-card gradient-card border-0">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl gradient-romantic bg-clip-text text-transparent">
              Our Wedding Day
            </CardTitle>
            <p className="text-lg font-semibold">{weddingDetails.date}</p>
          </CardHeader>
        </Card>

        {/* Ceremony Details */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              Wedding Ceremony
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-semibold">{weddingDetails.ceremony.time}</p>
                <p className="text-sm text-muted-foreground">Ceremony begins</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">{weddingDetails.ceremony.venue}</p>
                <p className="text-sm text-muted-foreground">{weddingDetails.ceremony.address}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => handleOpenMap(weddingDetails.ceremony.address)}
                >
                  <MapPin className="w-4 h-4 mr-1" />
                  Open in Maps
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-semibold">Contact</p>
                <p className="text-sm text-muted-foreground">{weddingDetails.ceremony.contact}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reception Details */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Reception Party
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-semibold">{weddingDetails.reception.time}</p>
                <p className="text-sm text-muted-foreground">Reception starts</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">{weddingDetails.reception.venue}</p>
                <p className="text-sm text-muted-foreground">{weddingDetails.reception.address}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => handleOpenMap(weddingDetails.reception.address)}
                >
                  <MapPin className="w-4 h-4 mr-1" />
                  Open in Maps
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-semibold">Contact</p>
                <p className="text-sm text-muted-foreground">{weddingDetails.reception.contact}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="shadow-card bg-secondary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Car className="w-4 h-4" />
              Important Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="font-semibold">Parking</p>
              <p className="text-muted-foreground">Free parking available at both venues</p>
            </div>
            <div>
              <p className="font-semibold">Dress Code</p>
              <p className="text-muted-foreground">Semi-formal attire requested</p>
            </div>
            <div>
              <p className="font-semibold">RSVP</p>
              <p className="text-muted-foreground">Please confirm your attendance via the message page</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            variant="wedding" 
            className="w-full"
            onClick={() => navigate("/messages")}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            RSVP & Send Message
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate("/gift")}
          >
            <Heart className="w-4 h-4 mr-2" />
            Wedding Gift
          </Button>
        </div>

        {/* Share Section */}
        <Card className="shadow-card">
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Share this invitation with family and friends
            </p>
            <Button 
              variant="instagram" 
              className="w-full"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Wedding of Radit & Jani',
                    text: 'You are invited to our wedding!',
                    url: window.location.origin
                  });
                } else {
                  navigator.clipboard.writeText(window.location.origin);
                }
              }}
            >
              Share Invitation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}