import {useState, useEffect} from "react";
import {Vehicle} from '@/model/Vehicle';

export function useVehicles(search = "", sort = "", page = 1, perPage = 12) {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        async function fetchData() {
            try {
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
                    filteredData.sort((a, b) => a.price - b.price);
                } else if (sort === "price-desc") {
                    filteredData.sort((a, b) => b.price - a.price);
                }

                // Pagination
                const startIndex = (page - 1) * perPage;
                const paginatedData = filteredData.slice(startIndex, startIndex + perPage);

                setVehicles(paginatedData);
                setTotalPages(Math.ceil(filteredData.length / perPage));
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
        }

        fetchData();
    }, [search, sort, page, perPage]);

    return {vehicles, totalPages};
}
