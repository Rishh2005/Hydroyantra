// Logistics and storage management utilities
export interface StorageTank {
  id: string
  name: string
  capacity: number // kg
  currentLevel: number // kg
  pressure: number // bar
  temperature: number // °C
  lastUpdated: number
  status: "normal" | "warning" | "critical"
}

export interface Shipment {
  id: string
  origin: string
  destination: string
  quantity: number // kg
  status: "pending" | "in_transit" | "delivered"
  departureTime: number
  estimatedArrival: number
  currentLocation: { lat: number; lng: number }
  temperature: number
}

export function generateStorageTanks(): StorageTank[] {
  return [
    {
      id: "tank-1",
      name: "Primary Storage A",
      capacity: 5000,
      currentLevel: 3600,
      pressure: 25.5,
      temperature: 18,
      lastUpdated: Date.now(),
      status: "normal",
    },
    {
      id: "tank-2",
      name: "Primary Storage B",
      capacity: 5000,
      currentLevel: 4200,
      pressure: 26.2,
      temperature: 19,
      lastUpdated: Date.now(),
      status: "normal",
    },
    {
      id: "tank-3",
      name: "Secondary Storage",
      capacity: 3000,
      currentLevel: 2100,
      pressure: 24.8,
      temperature: 17,
      lastUpdated: Date.now(),
      status: "normal",
    },
    {
      id: "tank-4",
      name: "Emergency Reserve",
      capacity: 2000,
      currentLevel: 1800,
      pressure: 28.1,
      temperature: 16,
      lastUpdated: Date.now(),
      status: "warning",
    },
    {
      id: "tank-5",
      name: "Distribution Hub",
      capacity: 4000,
      currentLevel: 2400,
      pressure: 22.5,
      temperature: 20,
      lastUpdated: Date.now(),
      status: "normal",
    },
    {
      id: "tank-6",
      name: "Backup Storage",
      capacity: 3500,
      currentLevel: 1750,
      pressure: 23.9,
      temperature: 18,
      lastUpdated: Date.now(),
      status: "normal",
    },
  ]
}

export function generateShipments(): Shipment[] {
  return [
    {
      id: "ship-001",
      origin: "HydroYantra Plant",
      destination: "Steel Mill, Mumbai",
      quantity: 500,
      status: "in_transit",
      departureTime: Date.now() - 3600000,
      estimatedArrival: Date.now() + 7200000,
      currentLocation: { lat: 19.076, lng: 72.8479 },
      temperature: 15,
    },
    {
      id: "ship-002",
      origin: "HydroYantra Plant",
      destination: "Refinery, Jamnagar",
      quantity: 750,
      status: "in_transit",
      departureTime: Date.now() - 7200000,
      estimatedArrival: Date.now() + 3600000,
      currentLocation: { lat: 22.1987, lng: 70.2707 },
      temperature: 14,
    },
    {
      id: "ship-003",
      origin: "HydroYantra Plant",
      destination: "Chemical Plant, Vadodara",
      quantity: 600,
      status: "pending",
      departureTime: Date.now() + 1800000,
      estimatedArrival: Date.now() + 14400000,
      currentLocation: { lat: 19.0176, lng: 72.8479 },
      temperature: 16,
    },
  ]
}

export function calculateOptimalRoute(
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number },
): { distance: number; duration: number; waypoints: Array<{ lat: number; lng: number }> } {
  // Mock route calculation
  const distance = Math.sqrt(Math.pow(destination.lat - origin.lat, 2) + Math.pow(destination.lng - origin.lng, 2))
  const duration = distance * 60 // minutes

  return {
    distance: distance * 111, // rough km conversion
    duration,
    waypoints: [origin, destination],
  }
}
