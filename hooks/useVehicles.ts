import {useState, useEffect} from "react";
import {Vehicle} from '@/model/Vehicle';
import {PER_PAGE} from '@/utils/constants';

export function useVehicles(search = "", sort = "", page = 1, perPage = PER_PAGE) {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        async function fetchData() {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch("/api/vehicles");


                const data = await response.json();


                let filteredData = data;

                // Filter by brand or model
                if (search) {
                    filteredData = filteredData.filter((vehicle: Vehicle) =>
                        vehicle.brand.toLowerCase().includes(search.toLowerCase()) ||
                        vehicle.model.toLowerCase().includes(search.toLowerCase())
                    );
                }

                // Sort by price
                if (sort === "price-asc") {
                    filteredData.sort((a: Vehicle, b: Vehicle) => a.price - b.price);
                } else if (sort === "price-desc") {
                    filteredData.sort((a: Vehicle, b: Vehicle) => b.price - a.price);
                }

                // Pagination
                const startIndex = (page - 1) * perPage;
                const paginatedData = filteredData.slice(startIndex, startIndex + perPage);

                setVehicles(paginatedData);
                setTotalPages(Math.ceil(filteredData.length / perPage));
            } catch (error) {
                
                setError(error instanceof Error ? error.message : 'An error occurred');
                console.error("Error fetching vehicles:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
      
    }, [search, sort, page, perPage]);

    return {vehicles, totalPages, isLoading, error};
}
