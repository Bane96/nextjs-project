import { render, screen } from "@testing-library/react";
import VehicleCard from "../components/VehicleCard";
import {VehicleCondition} from '@/enum/VehicleCondition';

const mockVehicle = {
    brand: "Tesla",
    model: "Model S",
    year: 2020,
    price: 79999,
    range_km: 610,
    color: "Red",
    condition: VehicleCondition.USED,
    battery_capacity_kWh: 100,
    charging_speed_kW: 250,
    seats: 5,
    drivetrain: "AWD",
    location: "Berlin",
    autopilot: true,
    kilometer_count: 25000,
    accidents: true,
    accident_description: "Rear bumper scratch repaired",
    images: [
        "https://ev-database.org/img/auto/Audi_e-tron/Audi_e-tron-01@2x.jpg",
]
};

describe("Test - VehicleCard Component", () => {
    it("renders vehicle details and check if brand, model and price exist", () => {
        render(<VehicleCard vehicle={mockVehicle} />);
        expect(screen.getByText(mockVehicle.brand)).not.toBeNull();
        expect(screen.getByText(mockVehicle.model)).not.toBeNull();
        expect(screen.getByText("79.999€")).not.toBeNull();
    });
    it("renders vehicle image", () => {
        render(<VehicleCard vehicle={mockVehicle} />);
        const img = screen.getByRole("img");
        expect(img).toHaveAttribute("alt", mockVehicle.model);
    });
    it("check if open button exist and have primary class", () => {
        render(<VehicleCard vehicle={mockVehicle} />);
        const button = screen.getByText("Open");
        expect(button).not.toBeNull();
        expect(button).toHaveClass('bg-primary');
    });
});
