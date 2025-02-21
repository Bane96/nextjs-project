import React from 'react';
import Link from 'next/link';
const Navbar = () => {
    return (
            <header className="px-5 py-3 bg-white shadow-sm">
                <nav className="flex justify-between items-center">
                    <Link href="/">
                        {/*<Image priority={false} src="/assets/logo.svg" alt="logo" width={144} height={30} />*/}
                        <p className="text-primary text-2xl font-bold">Amper vehicles</p>
                    </Link>
                </nav>
            </header>
    );
};

export default Navbar;