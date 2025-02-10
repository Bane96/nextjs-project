import React from 'react';
import {Vehicle} from '@/model/Vehicle';
import {priceSplitter} from '@/utils/functions';
import {VehicleCondition} from '@/enum/VehicleCondition';
import Link from 'next/link';
import BlurImage from '@/components/BlurImage';

interface VehicleCardProps {
    vehicle: Vehicle;
}

const VehicleCard = ({vehicle}: VehicleCardProps) => {

    // This approach because I don't have unique ID, this is not necessary when we have unique ID.
    const vehicleUniqueKey = `${vehicle.brand}-${vehicle.model}-${vehicle.year}`;

    return (
        <div className="bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl relative">
            {vehicle?.condition === VehicleCondition.NEW &&
                <span className="text-xs absolute top-2 rounded-full right-2 text-white bg-primary p-1 z-10">
                    New
                </span>
            }
            <BlurImage
                src={vehicle?.images[0] ?? ''}
                alt={`${vehicle?.model}`}
                width={400}
                height={300}
                className="w-full h-[200px] object-cover rounded-xl"
                priority={true}
            />
            <div className="px-4 py-3">
                <span className="text-gray-400 mr-3 uppercase text-xs">{vehicle?.brand}</span>
                <p className="text-lg font-bold text-black truncate block capitalize">{vehicle?.model}</p>
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-black cursor-auto my-3">{priceSplitter(vehicle?.price)}€</p>
                    <p className="text-sm text-gray-600 cursor-auto ml-2">{vehicle.location}</p>
                </div>
                <Link role="button" href={`vehicles/${vehicleUniqueKey}`}>
                    <button className="bg-primary text-white px-5 py-2 rounded-xl w-full">
                        Open
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default VehicleCard;