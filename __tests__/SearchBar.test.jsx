import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

jest.useFakeTimers();
describe("Test - SearchBar Component", () => {
    it('should be displayed and rendered', () => {
        render(<SearchBar setSearch={() => {}} search="" sort="" setSort={() => {}} resetPage={() => {}}/>);
        expect(document.querySelector("input[placeholder='Search brands, models...']")).not.toBeNull();
        expect(screen.getByText("Sort By")).not.toBeNull()
    });

    // In this test I wanted to test a search function that has a debounce delay.

    it("updates search state when typing", () => {
        const setSearchMock = jest.fn();
        render(<SearchBar setSearch={setSearchMock} search="" sort="" setSort={() => {}} resetPage={() => {}}/>);
        const input = screen.getByPlaceholderText("Search brands, models...");
        fireEvent.change(input, { target: { value: "Model S" } });
        jest.advanceTimersByTime(300);
        expect(setSearchMock).toHaveBeenCalledWith("Model S");
    });

    it("updates sort state when selecting a value", () => {
        const setSortMock = jest.fn();
        render(<SearchBar setSearch={() => {}} search="" sort="" setSort={setSortMock} resetPage={() => {}}/>);
        const select = screen.getByRole("combobox");
        fireEvent.change(select, { target: { value: "price-asc" } });

        expect(setSortMock).toHaveBeenCalledWith("price-asc");
    });
});
