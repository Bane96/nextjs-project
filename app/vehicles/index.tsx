"use client";

import React, {useEffect, useState} from 'react';
import SearchBar from '@/components/SearchBar';
import {useVehicles} from '@/hooks/useVehicles';
import VehicleCard from '@/components/VehicleCard';
import EmptyState from '@/components/EmptyState';
import Pagination from '@/components/Pagination';
import SkeletonLoader from '@/components/SkeletonLoader';
import {debounce} from 'lodash';
import {scrollToTop} from '@/utils/functions';
import {PER_PAGE} from '@/utils/constants';

const VehiclesPage = () => {
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const {vehicles, totalPages, isLoading} = useVehicles(debouncedSearch, sort, page);

    const debouncedSetSearch = React.useMemo(
        () =>
            debounce((value: string) => {
                setDebouncedSearch(value);
                setPage(1);
            }, 300),
        []
    );

    const handleSearchChange = (value: string) => {
        setSearch(value);
        debouncedSetSearch(value);
    };

    useEffect(() => {
        return () => {
            debouncedSetSearch.cancel();
        };
    }, [debouncedSetSearch]);


    useEffect(() => {
        scrollToTop();
    }, [page]);

    return (
        <>
            <div className="p-5 container mx-auto">
                <SearchBar
                    search={search}
                    setSearch={handleSearchChange}
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
                    {isLoading && <SkeletonLoader elementsCount={PER_PAGE}/>}
                </section>
                {!!vehicles.length &&
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage}/>
                }
                {!vehicles.length && !isLoading && <EmptyState text="Vehicles list is empty"/>}
            </div>
        </>
    );
};

export default VehiclesPage;