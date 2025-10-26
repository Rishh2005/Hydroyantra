"use server"

import { keccak256, toHex } from "viem"

// Blockchain utilities for hydrogen certificate generation and verification
export interface HydrogenCertificate {
  id: string
  batchId: string
  volume: number
  energySource: string
  carbonIntensity: number
  timestamp: number
  blockchainHash: string
  verified: boolean
}

export function generateCertificateHash(
  batchId: string,
  volume: number,
  energySource: string,
  timestamp: number,
): string {
  const data = `${batchId}-${volume}-${energySource}-${timestamp}`
  try {
    return keccak256(toHex(data)).slice(0, 16)
  } catch {
    // Fallback to simple hash if viem not available
    return Buffer.from(data).toString("hex").slice(0, 16)
  }
}

export function createCertificate(
  batchId: string,
  volume: number,
  energySource: string,
  renewablePercent: number,
): HydrogenCertificate {
  const timestamp = Math.floor(Date.now() / 1000)
  const carbonIntensity = calculateCarbonIntensity(energySource, renewablePercent)
  const blockchainHash = generateCertificateHash(batchId, volume, energySource, timestamp)

  return {
    id: `CERT-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    batchId,
    volume,
    energySource,
    carbonIntensity,
    timestamp,
    blockchainHash,
    verified: true,
  }
}

export function calculateCarbonIntensity(energySource: string, renewablePercent: number): number {
  // kg CO2 per kg H2
  const baseIntensity: Record<string, number> = {
    solar: 0.5,
    wind: 0.4,
    hydro: 0.3,
    grid: 8.5,
  }

  const base = baseIntensity[energySource.toLowerCase()] || 5.0
  return base * (1 - renewablePercent / 100)
}

export function generateQRCodeData(certificate: HydrogenCertificate): string {
  return `https://hydroyantra.io/verify/${certificate.id}?hash=${certificate.blockchainHash}`
}

export async function verifyCertificateOnBlockchain(
  certificateId: string,
  blockchainHash: string,
): Promise<{ verified: boolean; timestamp: number; source: string }> {
  // Mock blockchain verification
  // In production, this would query Polygon Mumbai smart contract
  try {
    console.log("[v0] Verifying certificate on blockchain:", certificateId)
    return {
      verified: true,
      timestamp: Math.floor(Date.now() / 1000),
      source: "Polygon Mumbai",
    }
  } catch (error) {
    console.error("[v0] Blockchain verification failed:", error)
    return {
      verified: false,
      timestamp: 0,
      source: "Error",
    }
  }
}
