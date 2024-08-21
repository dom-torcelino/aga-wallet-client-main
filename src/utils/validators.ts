export const validateWalletAddress = (address: string) => {
    const addressRegex = /^5[a-zA-Z0-9]{47}$/; // Update the regex to match your wallet address format
    return addressRegex.test(address);
  };

export const isNumericValue = (text: string) => text.replace(/[^0-9.]/g, '').slice(0, 10);