"use client";

import Barcode from "react-barcode";
import { QRCodeSVG } from "qrcode.react";

type BarcodeFormat = "CODE128" | "CODE39" | "CODE128A" | "CODE128B" | "CODE128C" | "EAN13" | "EAN8" | "EAN5" | "EAN2" | "UPC" | "UPCE" | "ITF14" | "ITF" | "MSI" | "MSI10" | "MSI11" | "MSI1010" | "MSI1110" | "pharmacode" | "codabar";

interface BarcodeGeneratorProps {
  value: string;
  type?: "barcode" | "qr";
  size?: number;
  displayValue?: boolean;
  format?: BarcodeFormat;
}

export function BarcodeGenerator({
  value,
  type = "barcode",
  size = 100,
  displayValue = true,
  format = "CODE128",
}: BarcodeGeneratorProps) {
  if (!value || value.trim() === "") {
    return (
      <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg text-gray-500 text-sm">
        No SKU/Code
      </div>
    );
  }

  if (type === "qr") {
    return (
      <div className="flex flex-col items-center gap-2">
        <QRCodeSVG value={value} size={size} level="H" includeMargin />
        {displayValue && <div className="text-xs text-gray-600 font-mono">{value}</div>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <Barcode
        value={value}
        format={format}
        width={1.5}
        height={50}
        displayValue={displayValue}
        fontSize={12}
        margin={5}
      />
    </div>
  );
}

// SKU Generator Utility
export function generateSKU(productName: string, existingSKUs: string[] = []): string {
  // Get first 3 letters of product name (uppercase)
  const prefix = productName
    .replace(/[^a-zA-Z]/g, "")
    .substring(0, 3)
    .toUpperCase()
    .padEnd(3, "X");

  // Generate a random 4-digit number
  let sku = "";
  let attempts = 0;
  const maxAttempts = 100;

  do {
    const randomNum = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    sku = `${prefix}-${randomNum}`;
    attempts++;
  } while (existingSKUs.includes(sku) && attempts < maxAttempts);

  return sku;
}

// EAN-13 Generator (for retail products)
export function generateEAN13(): string {
  // Generate 12 random digits
  let ean = "";
  for (let i = 0; i < 12; i++) {
    ean += Math.floor(Math.random() * 10);
  }

  // Calculate check digit
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(ean[i]);
    sum += i % 2 === 0 ? digit : digit * 3;
  }
  const checkDigit = (10 - (sum % 10)) % 10;

  return ean + checkDigit;
}
