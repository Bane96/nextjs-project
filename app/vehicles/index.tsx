"use client";

import React, {useEffect, useState} from 'react';
import SearchBar from '@/components/SearchBar';
import {useVehicles} from '@/hooks/useVehicles';
import VehicleCard from '@/components/VehicleCard';
import EmptyState from '@/components/EmptyState';
import Pagination from '@/components/Pagination';

const VehiclesPage = () => {
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const {vehicles, totalPages} = useVehicles(search, sort, page);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [page]);

    return (
        <>
            <div className="p-5 container mx-auto">
                <SearchBar
                    search={search}
                    setSearch={setSearch}
                    setSort={setSort}
                    sort={sort}
                    resetPage={() => setPage(1)}
                />
                <p className="text-2xl">
                    {search?.length ? `Search results for "${search}"` : 'All vehicles'}
                </p>
                <section className="vehicle-section">
                    {vehicles.map((vehicle, index) => (
                        <article key={`${vehicle?.model}-${index}`}>
                            <VehicleCard vehicle={vehicle}/>
                        </article>
                    ))}
                </section>
                {!!vehicles.length &&
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage}/>
                }
                {!vehicles.length && <EmptyState text="Vehicles list is empty"/>}
            </div>
        </>
    );
};

export default VehiclesPage;