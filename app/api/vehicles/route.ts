import { NextResponse } from "next/server";
import vehicleData from "../../../data/vehicle_data.json";

export async function GET() {
    try {
        return NextResponse.json(vehicleData.data);
    } catch (error) {
        return NextResponse.json(
            { error: `Failed to fetch vehicles with error: ${error}` },
            { status: 500 }
        );
    }
}
