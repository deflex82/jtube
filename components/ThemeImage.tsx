"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from 'react';

const ThemeImage = () => {
    const { theme, resolvedTheme } = useTheme();
    const [currentTheme, setCurrentTheme] = useState(theme);

    useEffect(() => {
        setCurrentTheme(resolvedTheme);
    }, [resolvedTheme,theme]);

    return (
        <div>
            {currentTheme === "dark" ? (
                <Image src="/whitel.png" alt="white logo" width={40} height={100} className="object-cover" />
            ) : (
                <Image src="/blackl.png" alt="dark logo" width={40} height={100} className="object-cover" />
            )}
        </div>
    );
};

export default ThemeImage;
