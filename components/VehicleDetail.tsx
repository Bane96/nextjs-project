"use client";
import React from 'react';
import {Vehicle} from '@/model/Vehicle';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Zoom, Navigation, Pagination} from 'swiper/modules';
import {priceSplitter} from '@/utils/functions';
import {VehicleCondition} from '@/enum/VehicleCondition';
import BlurImage from '@/components/BlurImage';
import {VEHICLE_DETAIL_IMG_H, VEHICLE_DETAIL_IMG_W} from '@/utils/constants';
interface VehicleDetailProps {
    vehicle: Vehicle;
}

const VehicleDetail = ({vehicle}: VehicleDetailProps) => {
    return (
        <>
            <div className="flex flex-col md:flex-row gap-8 p-4">
                <div className="md:w-2/3">
                    <Swiper
                        zoom={true}
                        navigation={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Zoom, Navigation, Pagination]}
                        className="mySwiper rounded-xl"
                    >
                        {vehicle.images.map((img, index) => (
                            <SwiperSlide key={index + img}>
                                <div className="swiper-zoom-container">
                                    <BlurImage
                                        src={img}
                                        alt={vehicle.model}
                                        className="object-contain w-full h-full"
                                        priority={index === 0}
                                        width={VEHICLE_DETAIL_IMG_W}
                                        height={VEHICLE_DETAIL_IMG_H}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <section className="md:w-2/3 p-4 bg-gray-100 rounded-lg">
                    <h1 className="text-2xl font-bold mb-2">{vehicle?.brand} {vehicle?.model} {vehicle.condition === VehicleCondition.NEW && `(NEW)`}</h1>
                    <p>Price: <span
                        className="font-semibold">€{priceSplitter(vehicle?.price)}</span></p>
                    <p>Year: <span className="font-semibold">{vehicle?.year}</span></p>
                    <p>Mileage: <span
                        className="font-semibold">{priceSplitter(vehicle?.kilometer_count)} km</span></p>
                    <p>Location: <span
                        className="font-semibold">{vehicle?.location}</span></p>
                    <p>Color: <span
                        className="font-semibold">{vehicle?.color}</span></p>
                    <p>Drivetrain: <span
                        className="font-semibold">{vehicle?.drivetrain}</span></p>
                    <p>Seats: <span
                        className="font-semibold">{vehicle?.seats}</span></p>
                </section>
            </div>
            <div className="flex flex-col md:flex-row gap-8 p-4">
                <section className="md:w-1/2 p-4 bg-gray-100 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Additional Vehicle Details</h2>
                    <p>Range: <span
                        className="font-semibold"> {vehicle.range_km} km </span></p>
                    <p>Battery Capacity: <span
                        className="font-semibold">{vehicle.battery_capacity_kWh} kWh</span></p>
                    <p>Charging Speed: <span
                        className="font-semibold">{vehicle.charging_speed_kW} kW</span></p>
                    <p>Autopilot: <span
                        className="font-semibold">{vehicle.autopilot ? 'Yes' : 'No'}</span></p>
                </section>
                {vehicle.accidents &&
                    <section className="md:w-1/2 p-4 bg-red-100 rounded-lg">
                        <h2 className="text-xl font-semibold mb-2">Accident history</h2>
                        <p>{vehicle.accident_description}</p>
                    </section>
                }
            </div>
        </>

    )
        ;
};

export default VehicleDetail;