import Web3 from 'web3';

interface WalletService {
  web3: Web3 | null;
  connectWallet(): Promise<string[]>;
  getAccounts(): Promise<string[]>;
  isConnected(): boolean;
}

class EthereumWalletService implements WalletService {
  web3: Web3 | null = null;

  constructor() {
    // Initialize web3 if window is available (client-side)
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum);
    }
  }

  async connectWallet(): Promise<string[]> {
    if (!this.web3 || !window.ethereum) {
      throw new Error('MetaMask is not installed!');
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return accounts;
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      throw error;
    }
  }

  async getAccounts(): Promise<string[]> {
    if (!this.web3) {
      return [];
    }

    try {
      const accounts = await this.web3.eth.getAccounts();
      return accounts;
    } catch (error) {
      console.error('Error getting accounts:', error);
      return [];
    }
  }

  isConnected(): boolean {
    return this.web3 !== null && window.ethereum?.isConnected() === true;
  }
}

// Declare window ethereum property for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}

// Export a singleton instance
export const walletService = new EthereumWalletService();