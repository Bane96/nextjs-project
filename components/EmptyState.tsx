import React from 'react';
import Image from 'next/image';

interface EmptyStateProps {
    text: string;
}
const EmptyState = ({text}: EmptyStateProps) => {
    return (
        <div className="flex flex-col items-center">
            <Image className="object-cover" width={70} height={70} src="/assets/empty-state.png" alt="Epty state"/>
            <p className="text-center text-primary">
                {text}
            </p>
        </div>
    );
};

export default EmptyState;