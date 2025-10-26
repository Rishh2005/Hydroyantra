// Digital Twin simulation engine for HydroYantra
export interface SimulationState {
  time: number
  production: number
  consumption: number
  efficiency: number
  solarInput: number
  windInput: number
  hydroInput: number
  gridInput: number
  storageLevel: number
  temperature: number
  pressure: number
  voltage: number
}

export interface SimulationConfig {
  duration: number // seconds
  timeScale: number // 1 = real-time, 10 = 10x speed
  renewableVariability: number // 0-1
}

export class DigitalTwinSimulator {
  private state: SimulationState
  private config: SimulationConfig
  private history: SimulationState[] = []

  constructor(initialState: Partial<SimulationState> = {}, config: Partial<SimulationConfig> = {}) {
    this.state = {
      time: 0,
      production: 245,
      consumption: 320,
      efficiency: 52.7,
      solarInput: 65,
      windInput: 45,
      hydroInput: 30,
      gridInput: 20,
      storageLevel: 72,
      temperature: 65,
      pressure: 25,
      voltage: 48,
      ...initialState,
    }

    this.config = {
      duration: 3600,
      timeScale: 1,
      renewableVariability: 0.3,
      ...config,
    }
  }

  step(deltaTime = 1): SimulationState {
    // Simulate renewable variability
    const solarVariance = (Math.random() - 0.5) * this.config.renewableVariability * 20
    const windVariance = (Math.random() - 0.5) * this.config.renewableVariability * 15

    this.state.solarInput = Math.max(0, Math.min(100, 65 + solarVariance))
    this.state.windInput = Math.max(0, Math.min(100, 45 + windVariance))

    // Calculate total renewable input
    const totalRenewable = (this.state.solarInput + this.state.windInput + this.state.hydroInput) / 3

    // Adjust production based on renewable availability
    const targetProduction = 200 + totalRenewable * 0.5
    this.state.production = this.state.production * 0.9 + targetProduction * 0.1

    // Update consumption with slight variation
    this.state.consumption = 300 + (Math.random() - 0.5) * 40

    // Calculate efficiency
    this.state.efficiency = Math.max(40, Math.min(65, (this.state.production / this.state.consumption) * 100))

    // Update storage level
    const netFlow = this.state.production - this.state.consumption / 100
    this.state.storageLevel = Math.max(0, Math.min(100, this.state.storageLevel + netFlow * 0.01))

    // Simulate temperature dynamics
    const tempTarget = 60 + this.state.production * 0.05
    this.state.temperature = this.state.temperature * 0.95 + tempTarget * 0.05

    // Simulate pressure
    this.state.pressure = 20 + this.state.production * 0.02 + (Math.random() - 0.5) * 2

    // Simulate voltage
    this.state.voltage = 45 + this.state.production * 0.01 + (Math.random() - 0.5) * 1

    this.state.time += deltaTime

    this.history.push({ ...this.state })

    return this.state
  }

  getState(): SimulationState {
    return { ...this.state }
  }

  getHistory(): SimulationState[] {
    return [...this.history]
  }

  reset(): void {
    this.state.time = 0
    this.history = []
  }
}
