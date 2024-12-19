'use client';

import { useEffect } from 'react'
import NotFound from '@/app/not-found';

function GBE() {
    useEffect(() => {
        throw new Error("Error!");
    }, []);
    return (
        <>
            <NotFound />
        </>
    )
}

export default GBE