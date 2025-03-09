
export const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  export const generateId = (): string => {
    return Date.now().toString();
  };

  export const parseXml = async (xml: string): Promise<any> => {
    const { parseStringPromise } = require('xml2js'); // Use xml2js for XML parsing
    return parseStringPromise(xml, { explicitArray: false });
  };
  
  export const formatDate = (date: Date): string => {
    return date.toISOString();
  };