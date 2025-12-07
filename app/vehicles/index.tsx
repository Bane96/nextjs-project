"use client";

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import {useVehicles} from '@/hooks/useVehicles';
import VehicleCard from '@/components/VehicleCard';
import EmptyState from '@/components/EmptyState';
import Pagination from '@/components/Pagination';
import SkeletonLoader from '@/components/SkeletonLoader';
import {debounce} from 'lodash';
import {scrollToTop} from '@/utils/functions';
import {PER_PAGE} from '@/utils/constants';


const VehiclesPage: React.FC = () => {
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const { vehicles, totalPages, isLoading } = useVehicles(debouncedSearch, sort, page);

    const debouncedSetSearch = useMemo(
        () =>
            debounce((value: string) => {
                setDebouncedSearch(value);
                setPage(1);
            }, 300),
        []
    );

    const handleSearchChange = useCallback(
        (value: string) => {
            setSearch(value);
            debouncedSetSearch(value);
        },
        [debouncedSetSearch]
    );

    useEffect(() => {
        if (page !== 1) setPage(1);
    }, [sort]);

    useEffect(() => {
        return () => {
            debouncedSetSearch.cancel();
        };
    }, [debouncedSetSearch]);

    useEffect(() => {
        scrollToTop();
    }, [page]);

    const hasVehicles = vehicles.length > 0;
    const showOnlySkeleton = isLoading && !hasVehicles;
    const showCards = hasVehicles;
    const showPagination = hasVehicles && !isLoading;
    const showEmptyState = !hasVehicles && !isLoading;

    return (
        <>
            <div>
                <SearchBar
                    search={search}
                    setSearch={handleSearchChange}
                    setSort={setSort}
                    sort={sort}
                    resetPage={() => setPage(1)}
                />

                <p className="text-2xl" aria-live="polite">
                    {search?.length ? `Search results for "${search}"` : 'All vehicles'}
                </p>

                <section className="vehicle-section" aria-busy={isLoading}>
                    {showOnlySkeleton && <SkeletonLoader elementsCount={PER_PAGE} />}

                    {showCards &&
                        vehicles.map((vehicle, index) => (
                            // I do not have vehicle id here for unique key
                            <article key={`${vehicle?.model}-${vehicle?.year ?? vehicle?.kilometer_count}-${index}`}>
                                <VehicleCard vehicle={vehicle} />
                            </article>
                        ))}

                    {isLoading && hasVehicles && <SkeletonLoader elementsCount={Math.min(3, PER_PAGE)} />}
                </section>

                {showPagination && (
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                )}

                {showEmptyState && <EmptyState text="Vehicles list is empty" />}
            </div>
        </>
    );
};

export default VehiclesPage;