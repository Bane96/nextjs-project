import vehicleData from "@/data/vehicle_data.json";
import {Vehicle} from '@/model/Vehicle';
import EmptyState from '@/components/EmptyState';
import VehicleDetail from '@/components/VehicleDetail';
import {Metadata} from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const { id } = await params

    const vehicle = vehicleData.data.find(
        (v: Vehicle) => `${v.brand}-${v.model}-${v.year}` === decodeURIComponent(id)
    );

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

export default async function VehicleDetailPage({params}: { params: { id: string } }) {
    const { id } = await params

    const vehicle = vehicleData.data.find(
        (v: Vehicle) => `${v.brand}-${v.model}-${v.year}` === decodeURIComponent(id)
    );

    if (!vehicle) return <EmptyState text="Vehicle not founded"/>;

    return (
        <>
            <VehicleDetail key={vehicle} vehicle={vehicle}/>
        </>
    );
}
