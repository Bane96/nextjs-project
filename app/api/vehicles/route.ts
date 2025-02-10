import { NextResponse } from "next/server";
import vehicleData from "../../../data/vehicle_data.json";

export async function GET() {
    return NextResponse.json(vehicleData.data);
}
