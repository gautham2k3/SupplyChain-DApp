"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut, Loader2, AlertCircle } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { walletService } from '@/services/wallet';
import { useToast } from '@/hooks/use-toast';

export function ConnectWallet() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Check if wallet is already connected on component mount
  useEffect(() => {
    const checkConnection = async () => {
      if (walletService.isConnected()) {
        const accounts = await walletService.getAccounts();
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
        }
      }
    };
    
    checkConnection();
    
    // Add MetaMask event listeners
    if (typeof window !== 'undefined' && window.ethereum) {
      // Handle account changes
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          setIsConnected(false);
          setWalletAddress(null);
          toast({
            title: "Wallet Disconnected",
            description: "Your wallet has been disconnected",
            variant: "destructive"
          });
        } else {
          // User switched accounts
          setWalletAddress(accounts[0]);
          toast({
            title: "Account Changed",
            description: `Connected to ${shortenAddress(accounts[0])}`,
          });
        }
      });
      
      // Handle chain changes
      window.ethereum.on('chainChanged', () => {
        // Refresh the page when the chain changes
        window.location.reload();
      });
    }
    
    return () => {
      // Clean up listeners when component unmounts
      if (typeof window !== 'undefined' && window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);
  
  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      
      if (!window.ethereum) {
        toast({
          title: "MetaMask not detected",
          description: "Please install MetaMask browser extension",
          variant: "destructive"
        });
        return;
      }
      
      const accounts = await walletService.connectWallet();
      
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        toast({
          title: "Wallet Connected",
          description: `Connected to ${shortenAddress(accounts[0])}`,
        });
      }
      
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to your wallet",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };
  
  const disconnectWallet = () => {
    // Note: There is no standard way to programmatically disconnect a wallet in web3
    // The best practice is to clear your app state
    setIsConnected(false);
    setWalletAddress(null);
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected from this site",
    });
  };
  
  const shortenAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  return (
    <div>
      {!isConnected ? (
        <Button 
          variant="outline" 
          size="sm"
          onClick={connectWallet}
          disabled={isConnecting}
          className="border-primary text-primary hover:bg-primary/10 hover:text-primary"
        >
          {isConnecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </>
          )}
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="border-primary text-primary hover:bg-primary/10 hover:text-primary"
            >
              <Wallet className="mr-2 h-4 w-4" />
              {walletAddress ? shortenAddress(walletAddress) : 'Connected'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="flex cursor-pointer items-center text-destructive focus:text-destructive"
              onClick={disconnectWallet}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}