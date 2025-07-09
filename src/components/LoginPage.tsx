import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const guestList = [
  "Sarah & Mike Johnson",
  "Emma Rodriguez", 
  "David & Lisa Chen",
  "Jennifer Taylor",
  "Michael Brown",
  "Ashley & James Wilson"
];

export function LoginPage() {
  const [guestName, setGuestName] = useState("");
  const [password, setPassword] = useState("*****");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = () => {
    if (!guestName.trim()) {
      toast({
        title: "Please select your name",
        description: "Choose your name from the dropdown to continue",
        variant: "destructive",
      });
      return;
    }
    
    // Store guest info and navigate to home
    localStorage.setItem("currentGuest", guestName);
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo Section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-primary heart-pulse" />
            <h1 className="text-3xl font-bold gradient-romantic bg-clip-text text-transparent">
              Radit & Jani
            </h1>
            <Heart className="w-8 h-8 text-primary heart-pulse" />
          </div>
          <p className="text-muted-foreground">Our Wedding Invitation</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-card gradient-card border-0">
          <CardHeader className="text-center pb-4">
            <Instagram className="w-12 h-12 mx-auto text-primary mb-2" />
            <h2 className="text-xl font-semibold">Welcome to Our Wedding</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="guest" className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <select
                id="guest"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="">Select your name...</option>
                {guestList.map((guest, index) => (
                  <option key={index} value={guest}>
                    {guest}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Access Code
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                readOnly
                className="bg-muted"
              />
            </div>

            <Button 
              onClick={handleLogin}
              className="w-full"
              variant="wedding"
              size="lg"
            >
              Enter Wedding Invitation
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Can't find your name? Please contact the couple.
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>With love, Radit & Jani ❤️</p>
        </div>
      </div>
    </div>
  );
}