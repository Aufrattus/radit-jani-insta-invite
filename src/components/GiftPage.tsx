import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Gift, Heart, Copy, Check, CreditCard, Banknote } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function GiftPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [brideName, setBrideName] = useState("Jani");
  const [groomName, setGroomName] = useState("Radit");
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const bankAccounts = [
    {
      id: "jani",
      name: "Jani (Bride)",
      bank: "Bank Mandiri",
      accountNumber: "1234567890123",
      accountName: "Jani Sari Dewi"
    },
    {
      id: "radit",
      name: "Radit (Groom)", 
      bank: "Bank BCA",
      accountNumber: "9876543210987",
      accountName: "Radit Adi Pratama"
    }
  ];

  const handleCopyAccount = (accountNumber: string, accountId: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedAccount(accountId);
    toast({
      title: "Account number copied! 📋",
      description: "The account number has been copied to your clipboard",
    });
    
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const handleOpenBankApp = (bank: string) => {
    toast({
      title: "Opening bank app... 📱",
      description: `Opening ${bank} mobile banking app`,
    });
    // In a real app, you could use deep links to open specific banking apps
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
            <Gift className="w-6 h-6 text-primary" />
            <h1 className="text-lg font-semibold">Wedding Gift</h1>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Header Card */}
        <Card className="shadow-card gradient-card border-0 text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-primary heart-pulse" />
            </div>
            <CardTitle className="text-2xl gradient-romantic bg-clip-text text-transparent">
              Gift to the Groom and Bride
            </CardTitle>
            <p className="text-muted-foreground">
              Your presence is the greatest gift, but if you wish to honor us with a wedding gift, here are our details
            </p>
          </CardHeader>
        </Card>

        {/* Couple Names Input */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">For the Happy Couple</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="bride-name" className="block text-sm font-medium mb-2">
                  Bride's Name
                </label>
                <Input
                  id="bride-name"
                  value={brideName}
                  onChange={(e) => setBrideName(e.target.value)}
                  className="bg-secondary"
                />
              </div>
              <div>
                <label htmlFor="groom-name" className="block text-sm font-medium mb-2">
                  Groom's Name
                </label>
                <Input
                  id="groom-name"
                  value={groomName}
                  onChange={(e) => setGroomName(e.target.value)}
                  className="bg-secondary"
                />
              </div>
            </div>
            <div className="text-center text-2xl font-bold gradient-romantic bg-clip-text text-transparent">
              {groomName} & {brideName}
            </div>
          </CardContent>
        </Card>

        {/* Bank Account Information */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Bank Account Information
          </h3>

          {bankAccounts.map((account) => (
            <Card key={account.id} className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Banknote className="w-5 h-5 text-primary" />
                  {account.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Bank</p>
                  <p className="font-semibold">{account.bank}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Account Name</p>
                  <p className="font-semibold">{account.accountName}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Account Number</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="font-mono font-bold text-lg flex-1">
                      {account.accountNumber}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyAccount(account.accountNumber, account.id)}
                      className="flex-shrink-0"
                    >
                      {copiedAccount === account.id ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  variant="wedding"
                  className="w-full mt-4"
                  onClick={() => handleOpenBankApp(account.bank)}
                >
                  Open {account.bank} App
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Thank You Message */}
        <Card className="shadow-card bg-secondary">
          <CardContent className="pt-6 text-center space-y-3">
            <Heart className="w-8 h-8 text-primary mx-auto heart-pulse" />
            <p className="font-semibold">Thank You! 💕</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your love, prayers, and presence at our wedding are the greatest gifts we could receive. 
              If you choose to honor us with a monetary gift, we are deeply grateful and will treasure your kindness always.
            </p>
            <p className="text-xs text-muted-foreground italic">
              - With love, {groomName} & {brideName}
            </p>
          </CardContent>
        </Card>

        {/* Additional Options */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            onClick={() => navigate("/messages")}
            className="h-auto p-4 flex flex-col gap-2"
          >
            <Heart className="w-6 h-6" />
            <span className="text-sm">Send Message</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/party-details")}
            className="h-auto p-4 flex flex-col gap-2"
          >
            <Gift className="w-6 h-6" />
            <span className="text-sm">Wedding Details</span>
          </Button>
        </div>

        {/* QR Code Section (Future Enhancement) */}
        <Card className="shadow-card">
          <CardContent className="pt-6 text-center">
            <div className="w-24 h-24 bg-muted rounded-lg mx-auto mb-3 flex items-center justify-center">
              <CreditCard className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              QR Code for digital payments coming soon
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}