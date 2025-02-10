import {VehicleCondition} from '@/enum/VehicleCondition';

export interface Vehicle {
    model: string;
    brand: string;
    year: number;
    color: string;
    price: number;
    range_km: number;
    battery_capacity_kWh: number;
    charging_speed_kW: number;
    condition: VehicleCondition;
    seats: number;
    drivetrain: string;
    location: string;
    autopilot: boolean;
    kilometer_count: number;
    accidents: boolean;
    images: string[];
    accident_description?: string;
};
