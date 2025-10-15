
const Contact = () => {

    return (
        <div
            className='relative w-full h-full md:min-h-[1500px] flex flex-col items-center justify-start gap-2 text-center relative py-32 md:py-48'
            style={{ backgroundImage: `url(/projektet/assets/images/hero/bckContact.jpg)`, backgroundSize: 'cover', backgroundPosition: '0, 0' }}
        >
            <div className='absolute -top-50 base-width md:h-80 bg-secondary transition-colors duration-300 hover:bg-gradient-to-t hover:from-secondary/100 hover:to-primary/10 flex flex-col items-center justify-center group'>
                <div className='base-width uppercase flex justify-center md:justify-between items-center flex-wrap py-12 md:py-0'>
                    <h1 className='text-primary montserrat text-600 text-xl md:text-[38px] md:text-nowrap'>jeni tË interesuar pËr projektin tonË ?</h1>
                    <button className='bg-primary text-secondary rounded-full w-30 md:w-36 h-30 md:h-36 text-nowrap text-sm md:text-base'>Na kontaktoni</button>
                </div>
                <div className='absolute -bottom-3 md:-bottom-10 contact-abs w-23/24  flex items-center justify-center overflow-hidden z-10'>
                    <img src="/projektet/assets/images/hero/bckContact.png" alt="" />
                </div>
            </div>
            <p className='text-xl md:text-2xl text-secondary'>Çdo hap drejt një shtëpie të re nis me një bisedë. Kontaktoni sot<br/> për të zbuluar më shumë mbi Zambaku Residence.</p>
            <h1 className='text-2xl md:text-[54px] text-600 text-primary montserrat '>Le të Lidhim Vizionin me Realitetin</h1>
        </div>
    );
};

export default Contact;