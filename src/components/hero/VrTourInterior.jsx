import React, { useEffect } from 'react'

const VrTourInterior = ({ isOpen, onClose, vtourUrl }) => {
    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            aria-modal="true"
            role="dialog"
            className="fixed inset-0 z-[9900] flex items-center justify-center"
        >
            <div
                className="absolute inset-0 bg-black/60"
                onClick={onClose}
            />
            <div className="relative w-full md:w-full h-full md:h-full bg-transparent rounded-md overflow-hidden shadow-lg z-10 flex items-center justify-center">
                <button
                    aria-label="Close VR tour"
                    onClick={onClose}
                    className="fixed top-8 right-16 z-[9999] bg-secondary hover:bg-secondary/90 duration-300 text-primary rounded-full w-24 h-24 text-2xl flex items-center justify-center shadow"
                >
                    ✕
                </button>
                <div className="w-full h-full bg-black">
                    <iframe
                        title="360 VR Tour"
                        src={vtourUrl}
                        width="100%"
                        height="100%"
                        allow="xr-spatial-tracking; gyroscope; accelerometer; autoplay; fullscreen"
                        style={{ border: 'none' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default VrTourInterior;