import Image from 'next/image';
import { useState } from 'react';
import clsx from 'clsx';

interface BlurImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export default function BlurImage({ src, alt, width, height, className, priority }: BlurImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="relative fill-inherit">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={clsx(
          className,
          'duration-700 ease-in-out',
          isLoading ? 'grayscale blur-2xl scale-110' : ''
        )}
        onLoad={() => setLoading(false)}
        priority={priority}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
    </div>
  );
}