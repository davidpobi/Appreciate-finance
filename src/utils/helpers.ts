import { formatDistanceToNow } from "date-fns";
import { countryList } from "../data/countries";
import { v4 as uuidv4 } from "uuid";
import { generate } from "short-uuid";

export const timeAgo = (timestamp: number) => {
  const timestamp_ = Date.parse(new Date(timestamp).toISOString());
  const timeAgo = formatDistanceToNow(timestamp_, { addSuffix: false });
  if (timeAgo.includes("about")) {
    return `${timeAgo.split("about")[1]} ago`;
  }
  return `${timeAgo} ago`;
};

export const transformCountryList = (data: any) => {
  return data.map((country: any) => ({
    label: country.name,
    value: country.code,
  }));
};

export const getCountryCode = (country: string) => {
  let code = null;
  const list = countryList;
  const country_ = list.find((x) => {
    return x.name === country;
  });

  if (country_ === undefined || country === null) {
    code = null;
    return code;
  }
  code = country_.code;
  return code;
};

export const getUniqueId = (format: "short" | "long") => {
  if (format === "short") {
    const shortUuid = generate();
    return shortUuid.slice(0, 7);
  } else {
    return uuidv4();
  }
};

export const getCategoryStr = (category: string) => {
  return category.split(" ")[0];
};

interface IValidatePassword {
  [key: string]: boolean;
}
export function validatePasswordInput<T>(value: T): IValidatePassword {
  const isMinLength = typeof value === "string" && value.length >= 8;

  const hasUniqueChar = /[-=+_{}\\:”';<>,/^()!@#$%^&*.?"]/.test(String(value));

  const isUpperCase = /[A-Z]/.test(String(value));

  return { isMinLength, isUpperCase, hasUniqueChar };
}

export const displayPdf = async (pdfBytes: any) => {
  const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

  const pdfUrl = URL.createObjectURL(pdfBlob);
  return pdfUrl;
};

export const getPDFBytes = async (pdfUrl: string) => {
  const url = pdfUrl;
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
  return existingPdfBytes;
};

export const downloadPDF = async (pdfBytes: any, name: string) => {
  const blob = new Blob([pdfBytes], { type: "application/pdf" });

  const urlObject = URL.createObjectURL(blob);

  const downloadLink = document.createElement("a");
  downloadLink.href = urlObject;
  downloadLink.download = `${name}.pdf`;

  document.body.appendChild(downloadLink);

  downloadLink.click();

  document.body.removeChild(downloadLink);
};

export const updateBodyPositionAttribute = (position: string) => {
  if (typeof document !== "undefined") {
    document.body.style.position = position;
  }
};

export const isDevelopment = () => {
  const isDevelopment = process.env.NEXT_PUBLIC_BRANCH === "dev";
  return isDevelopment;
};

export const getCurrencySymbol = (currency: string) => {
  let symbol: string | null = null;

  if (currency === "USD") {
    symbol = "$";
  }

  if (currency === "NGN") {
    symbol = "₦";
  }

  if (currency === "GHS") {
    symbol = "₵";
  }

  return symbol;
};
