import { renderHook, waitFor } from "@testing-library/react";
import { useVehicles } from "@/hooks/useVehicles";

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve([
            { brand: "Tesla", model: "Model S", price: 80000 },
            { brand: "BMW", model: "i4", price: 60000 },
        ]),
    })
);

describe("Test - useVehicles hook", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("fetches vehicles correctly", async () => {
        const { result } = renderHook(() => useVehicles("", ""));

        await waitFor(() => expect(result.current.vehicles.length).toBeGreaterThan(0));

        expect(result.current.vehicles).toEqual([
            { brand: "Tesla", model: "Model S", price: 80000 },
            { brand: "BMW", model: "i4", price: 60000 },
        ]);
    });

    it("filter vehicles based on search term", async () => {
        const { result } = renderHook(() => useVehicles("Tesla", ""));

        await waitFor(() => expect(result.current.vehicles.length).toBeGreaterThan(0));

        expect(result.current.vehicles).toEqual([{ brand: "Tesla", model: "Model S", price: 80000 }]);
    });

    it("sorts vehicles by price - ascending", async () => {
        const { result } = renderHook(() => useVehicles("", "price-asc"));

        await waitFor(() => expect(result.current.vehicles.length).toBeGreaterThan(0));

        expect(result.current.vehicles).toEqual([
            { brand: "BMW", model: "i4", price: 60000 },
            { brand: "Tesla", model: "Model S", price: 80000 },
        ]);
    });

    it("sorts vehicles by price - descending ", async () => {
        const { result } = renderHook(() => useVehicles("", "price-desc"));

        await waitFor(() => expect(result.current.vehicles.length).toBeGreaterThan(0));

        expect(result.current.vehicles).toEqual([
            { brand: "Tesla", model: "Model S", price: 80000 },
            { brand: "BMW", model: "i4", price: 60000 },
        ]);
    });

    it("returns paginated results", async () => {
        const { result } = renderHook(() => useVehicles("", "", 1, 1)); // First page, 1 item per page

        await waitFor(() => expect(result.current.vehicles.length).toBeGreaterThan(0));

        expect(result.current.vehicles).toEqual([{ brand: "Tesla", model: "Model S", price: 80000 }]);
    });

});
