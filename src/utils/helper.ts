/**
 * Validates an email address.
 * @param email - The email address to validate.
 * @returns True if the email is valid, otherwise false.
 */
export const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  /**
   * Generates a unique ID.
   * @returns A unique ID string.
   */
  export const generateId = (): string => {
    return Date.now().toString();
  };
  
  /**
   * Parses XML data into a JavaScript object.
   * @param xml - The XML data to parse.
   * @returns A promise that resolves to the parsed JavaScript object.
   */
  export const parseXml = async (xml: string): Promise<any> => {
    const { parseStringPromise } = require('xml2js'); // Use xml2js for XML parsing
    return parseStringPromise(xml, { explicitArray: false });
  };
  
  /**
   * Formats a date into a human-readable string.
   * @param date - The date to format.
   * @returns A formatted date string.
   */
  export const formatDate = (date: Date): string => {
    return date.toISOString();
  };