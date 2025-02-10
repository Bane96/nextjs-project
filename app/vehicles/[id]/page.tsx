import vehicleData from "@/data/vehicle_data.json";
import {Vehicle} from '@/model/Vehicle';
import {Metadata} from 'next';
import dynamic from 'next/dynamic';
const EmptyState = dynamic(() => import('@/components/EmptyState'));
const VehicleDetail = dynamic(() => import('@/components/VehicleDetail'));

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } =  await params

    const vehicle = vehicleData.data.find(
        (v) => `${v.brand}-${v.model}-${v.year}` === decodeURIComponent(id)
    ) as Vehicle;

    if (!vehicle) {
        return {
            title: "Vehicle Not Found",
            description: "The requested vehicle does not exist.",
        };
    }

    return {
        title: `${vehicle.brand} ${vehicle.model} (${vehicle.year}) - Aampere`,
        description: `Explore details of the ${vehicle.brand} ${vehicle.model} from ${vehicle.year}. Price: $${vehicle.price}. Located in ${vehicle.location}.`,
        openGraph: {
            title: `${vehicle.brand} ${vehicle.model} (${vehicle.year}) - Aampere`,
            description: `Find out more about this ${vehicle.brand} ${vehicle.model}. Price: $${vehicle.price}.`,
            images: vehicle.images[0] ? [vehicle.images[0]] : [],
            type: "website",
        },
    };
}

export default async function VehicleDetailPage({params}: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const vehicle = vehicleData.data.find(
        (v) => `${v.brand}-${v.model}-${v.year}` === decodeURIComponent(id)
    ) as Vehicle;

    if (!vehicle) return <EmptyState text="Vehicle not found"/>;

    return (
        <VehicleDetail vehicle={vehicle}/>
    );
}
