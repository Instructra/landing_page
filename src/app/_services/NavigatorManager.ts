// hooks/useNavLinks.ts
"use client";

import { useState, useEffect } from "react";

export type NavLink = {
    id: string;
    label: string;
    href: string;
    active: boolean;
};

export function useNavLinks(initialLinks: Omit<NavLink, "active">[]) {
    const [links, setLinks] = useState<NavLink[]>(
        initialLinks.map((link) => ({ ...link, active: false }))
    );

    // Set active link on mount (refresh)
    useEffect(() => {
        const currentHash = window.location.hash || "#home"; // fallback to home
        setLinks((prev) =>
            prev.map((link) =>
                link.href.endsWith(currentHash)
                    ? { ...link, active: true }
                    : { ...link, active: false },
            ),
        );
    }, []);

    // Activate manually (onClick)
    const setActive = (id: string) => {
        setLinks((prev) =>
            prev.map((link) =>
                link.id === id ? { ...link, active: true } : { ...link, active: false },
            ),
        );
    };

    return { links, setActive };
}