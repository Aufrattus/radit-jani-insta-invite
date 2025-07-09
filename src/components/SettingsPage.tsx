import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Settings, Users, Share, Trash2, Plus, UserCheck, Copy, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function SettingsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [guestList, setGuestList] = useState([
    "Sarah & Mike Johnson",
    "Emma Rodriguez", 
    "David & Lisa Chen",
    "Jennifer Taylor",
    "Michael Brown",
    "Ashley & James Wilson"
  ]);
  
  const [newGuest, setNewGuest] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  const addGuest = () => {
    if (!newGuest.trim()) {
      toast({
        title: "Please enter a guest name",
        description: "Guest name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    if (guestList.includes(newGuest.trim())) {
      toast({
        title: "Guest already exists",
        description: "This guest is already in the list",
        variant: "destructive",
      });
      return;
    }

    setGuestList([...guestList, newGuest.trim()]);
    setNewGuest("");
    toast({
      title: "Guest added! 👥",
      description: `${newGuest} has been added to the guest list`,
    });
  };

  const removeGuest = (index: number) => {
    const guestName = guestList[index];
    const updatedList = guestList.filter((_, i) => i !== index);
    setGuestList(updatedList);
    toast({
      title: "Guest removed",
      description: `${guestName} has been removed from the guest list`,
    });
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditingName(guestList[index]);
  };

  const saveEdit = () => {
    if (!editingName.trim()) {
      toast({
        title: "Please enter a guest name",
        description: "Guest name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    if (editingIndex !== null) {
      const updatedList = [...guestList];
      updatedList[editingIndex] = editingName.trim();
      setGuestList(updatedList);
      setEditingIndex(null);
      setEditingName("");
      toast({
        title: "Guest updated! ✅",
        description: "Guest information has been updated",
      });
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditingName("");
  };

  const shareInvitation = (guestName: string) => {
    const inviteUrl = `${window.location.origin}?guest=${encodeURIComponent(guestName)}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Wedding Invitation - Radit & Jani',
        text: `${guestName}, you're invited to Radit & Jani's wedding!`,
        url: inviteUrl
      });
    } else {
      navigator.clipboard.writeText(inviteUrl);
      toast({
        title: "Invitation link copied! 📋",
        description: `Personal invitation link for ${guestName} copied to clipboard`,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentGuest");
    navigate("/login");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
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
            <Settings className="w-6 h-6 text-primary" />
            <h1 className="text-lg font-semibold">Settings</h1>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Guest List Management */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Guest List Management
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage who can access the wedding invitation
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add New Guest */}
            <div className="flex gap-2">
              <Input
                value={newGuest}
                onChange={(e) => setNewGuest(e.target.value)}
                placeholder="Add new guest name..."
                onKeyPress={(e) => e.key === 'Enter' && addGuest()}
              />
              <Button onClick={addGuest} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Guest List */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Current Guests ({guestList.length})</p>
              {guestList.map((guest, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                  {editingIndex === index ? (
                    <>
                      <Input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="flex-1 h-8"
                        onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                      />
                      <Button onClick={saveEdit} size="sm" variant="wedding">
                        <UserCheck className="w-4 h-4" />
                      </Button>
                      <Button onClick={cancelEdit} size="sm" variant="outline">
                        ×
                      </Button>
                    </>
                  ) : (
                    <>
                      <span className="flex-1 text-sm">{guest}</span>
                      <Button
                        onClick={() => shareInvitation(guest)}
                        size="sm"
                        variant="outline"
                        title="Share personal invitation"
                      >
                        <Share className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => startEditing(index)}
                        size="sm"
                        variant="outline"
                        title="Edit guest name"
                      >
                        ✏️
                      </Button>
                      <Button
                        onClick={() => removeGuest(index)}
                        size="sm"
                        variant="outline"
                        title="Remove guest"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Invitation Sharing */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share className="w-5 h-5 text-primary" />
              Share Invitation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">General Invitation Link</p>
              <div className="flex gap-2">
                <Input
                  value={window.location.origin}
                  readOnly
                  className="bg-muted text-sm"
                />
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.origin);
                    toast({
                      title: "Link copied! 📋",
                      description: "General invitation link copied to clipboard",
                    });
                  }}
                  size="sm"
                  variant="outline"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Wedding Invitation - Radit & Jani',
                    text: 'You are invited to our wedding!',
                    url: window.location.origin
                  });
                } else {
                  navigator.clipboard.writeText(window.location.origin);
                  toast({
                    title: "Link copied! 📋",
                    description: "Invitation link copied to clipboard",
                  });
                }
              }}
              variant="instagram"
              className="w-full"
            >
              <Share className="w-4 h-4 mr-2" />
              Share Wedding Invitation
            </Button>
          </CardContent>
        </Card>

        {/* Wedding Information */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Wedding Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Couple:</span>
              <span className="font-semibold">Radit & Jani</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-semibold">Saturday, June 15, 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Guests:</span>
              <span className="font-semibold">{guestList.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current User:</span>
              <span className="font-semibold">{localStorage.getItem("currentGuest") || "Admin"}</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            onClick={() => navigate("/messages")}
            className="h-auto p-4 flex flex-col gap-2"
          >
            <UserCheck className="w-6 h-6" />
            <span className="text-sm">View Messages</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/party-details")}
            className="h-auto p-4 flex flex-col gap-2"
          >
            <Settings className="w-6 h-6" />
            <span className="text-sm">Wedding Details</span>
          </Button>
        </div>

        {/* Logout */}
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>

        {/* Info */}
        <Card className="shadow-card bg-secondary">
          <CardContent className="pt-6 text-center">
            <p className="text-xs text-muted-foreground">
              💡 Tip: Use personalized invitation links to track RSVPs and send customized messages to each guest.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}