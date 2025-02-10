import React, {ChangeEvent, Dispatch, SetStateAction} from 'react';
import debounce from 'lodash.debounce'

interface SearchBarProps {
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    sort: string
    setSort: Dispatch<SetStateAction<string>>
    resetPage: () => void;
}

const SearchBar = ({setSearch, search, sort, setSort, resetPage}: SearchBarProps) => {

    const handleSearch = debounce((event: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target
        setSearch(value);
        resetPage()
    }, 300);

    return (
        <div>
            <div className="flex justify-center gap-5 mb-4">
                <input
                    type="text"
                    placeholder="Search brands, models..."
                    className="border p-2 rounded-xl w-full"
                    defaultValue={search}
                    onChange={handleSearch}
                />
                <select
                    className="border p-2 rounded-xl"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="price-asc">Lower price</option>
                    <option value="price-desc">Higher price</option>
                </select>
            </div>
        </div>
    );
};

export default SearchBar;