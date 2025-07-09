import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Heart, Send, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  guestName: string;
  message: string;
  timestamp: string;
  isRsvp?: boolean;
  attendance?: string;
}

export function MessagesPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState("");
  const [guestName, setGuestName] = useState(localStorage.getItem("currentGuest") || "");
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      guestName: "Sarah & Mike Johnson",
      message: "Congratulations! We're so excited to celebrate with you both. What a beautiful love story! 💕",
      timestamp: "2 hours ago",
      isRsvp: true,
      attendance: "attending"
    },
    {
      id: 2,
      guestName: "Emma Rodriguez",
      message: "Can't wait for your special day! You two are perfect together. See you there! ✨",
      timestamp: "5 hours ago",
      isRsvp: true,
      attendance: "attending"
    },
    {
      id: 3,
      guestName: "David & Lisa Chen",
      message: "Wishing you both a lifetime of happiness and love. Unfortunately we won't be able to make it, but we're thinking of you! ❤️",
      timestamp: "1 day ago",
      isRsvp: true,
      attendance: "not attending"
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast({
        title: "Please write a message",
        description: "Your message cannot be empty",
        variant: "destructive",
      });
      return;
    }

    if (!guestName.trim()) {
      toast({
        title: "Please enter your name",
        description: "We'd love to know who this message is from",
        variant: "destructive",
      });
      return;
    }

    const newMessage: Message = {
      id: messages.length + 1,
      guestName: guestName,
      message: message,
      timestamp: "Just now",
      isRsvp: !!attendance,
      attendance: attendance
    };

    setMessages([newMessage, ...messages]);
    setMessage("");
    setAttendance("");

    toast({
      title: "Message sent! 💕",
      description: "Thank you for your wishes to Radit & Jani",
    });
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
            <MessageCircle className="w-6 h-6 text-primary" />
            <h1 className="text-lg font-semibold">Messages for the Couple</h1>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Send Message Form */}
        <Card className="shadow-card gradient-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              Send Your Wishes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="guest-name" className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <Input
                id="guest-name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Enter your name..."
                className="bg-white"
              />
            </div>

            <div>
              <label htmlFor="attendance" className="block text-sm font-medium mb-2">
                Will you be attending? (Optional RSVP)
              </label>
              <select
                id="attendance"
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
                className="w-full p-3 border border-border rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="">I'll RSVP later</option>
                <option value="attending">Yes, I'll be there! 🎉</option>
                <option value="not attending">Sorry, can't make it 😔</option>
                <option value="maybe">Not sure yet 🤔</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Your Message to Radit & Jani
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your wishes, memories, or advice for the happy couple..."
                rows={4}
                className="bg-white resize-none"
              />
            </div>

            <Button 
              onClick={handleSendMessage}
              className="w-full"
              variant="wedding"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Message with Love
            </Button>
          </CardContent>
        </Card>

        {/* Messages List */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            Guest Messages ({messages.length})
          </h3>

          {messages.map((msg) => (
            <Card key={msg.id} className="shadow-card">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-romantic rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {msg.guestName.charAt(0)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm">{msg.guestName}</p>
                      <p className="text-xs text-muted-foreground">{msg.timestamp}</p>
                    </div>
                    
                    {msg.isRsvp && msg.attendance && (
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        msg.attendance === 'attending' ? 'bg-green-100 text-green-700' :
                        msg.attendance === 'not attending' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {msg.attendance === 'attending' && '✅ Attending'}
                        {msg.attendance === 'not attending' && '❌ Can\'t attend'}
                        {msg.attendance === 'maybe' && '🤔 Maybe'}
                      </div>
                    )}
                    
                    <p className="text-sm leading-relaxed">{msg.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {messages.length === 0 && (
          <Card className="shadow-card text-center">
            <CardContent className="py-8">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No messages yet</p>
              <p className="text-sm text-muted-foreground">Be the first to send your wishes!</p>
            </CardContent>
          </Card>
        )}

        {/* Info Card */}
        <Card className="shadow-card bg-secondary">
          <CardContent className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">
              💕 All messages will be collected and given to Radit & Jani as a beautiful keepsake from their wedding day.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}