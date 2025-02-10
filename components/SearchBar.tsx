import React, {Dispatch, SetStateAction} from 'react';

interface SearchBarProps {
    search: string;
    setSearch: (value: string) => void;
    sort: string
    setSort: Dispatch<SetStateAction<string>>
    resetPage: () => void;
}

const SearchBar = ({setSearch, search, sort, setSort}: SearchBarProps) => {

    return (
        <div>
            <div className="flex justify-center gap-5 mb-4">
                <input
                    className="input-primary w-3/4"
                    type="text"
                    placeholder="Search brands, models..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
                <select
                    className="input-primary w-1/4"
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