import React from "react";
import { useNavigate } from "react-router-dom";

const HeroGallery = () => {
    const navigate = useNavigate();
    return (
        <div className="h-screen flex flex-row items-start bg-secondary">
            <div className="w-1/3 h-full">
                <img
                    src="/assets/images/hero/1.png"
                    alt="Zambaku Residence Left"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="w-1/3 flex flex-col items-center justify-start gap-4 text-center px-12 py-24">
                <h1 className="text-5xl text-primary valky">
                    The Stunning Zambaku Residence Sea Side Complex
                </h1>
                <p className="text-dark axiforma-thin text-base leading-relaxed">
                    Positioned at the convergence of Montenegro, Albania, Croatia, and
                    Italy, the Zambaku Residence Sea Side Complex beautifully encapsulates the
                    natural splendor of the Adriatic Sea riviera, with its prime location
                    touching the waters of these four nations.
                </p>
                <p className="text-dark axiforma-thin text-base leading-relaxed">
                    The architectural marvel of this complex, known as Zambaku Residence,
                    adheres to the highest standards and features circular designs that
                    seamlessly blend with the surrounding pine-filled landscape,
                    presenting a futuristic vision of exceptional harmony.
                </p>
                <button onClick={() => navigate('/gallery')} className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden axiforma-thin text-white bg-primary rounded-lg group">
                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-tertiary rounded-full group-hover:w-56 group-hover:h-56"></span>
                    <span className="relative">OUR GALLERY</span>
                </button>
            </div>
            <div className="w-1/3 h-full">
                <img
                    src="/assets/images/hero/2.png"
                    alt="Zambaku Residence Right"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
};

export default HeroGallery;
