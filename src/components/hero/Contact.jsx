
const Contact = () => {

    return (
        <div
            className='relative w-full h-full min-h-[1500px] flex flex-col items-center justify-start gap-2 text-center relative py-48'
            style={{ backgroundImage: `url(/projektet/assets/images/hero/bckContact.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className='absolute -top-50 base-width h-80 bg-secondary hover:bg-secondary/90 duration-300 flex flex-col items-center justify-center group'>
                <div className='base-width uppercase flex justify-between items-center flex-wrap'>
                    <h1 className='text-primary montserrat text-600 text-[38px] text-nowrap'>jeni tË interesuar pËr projektin tonË ?</h1>
                    <button className='bg-primary text-secondary rounded-full w-36 h-36 text-nowrap'>Na kontaktoni</button>
                </div>
                <div className='absolute -bottom-10 contact-abs w-23/24  flex items-center justify-center overflow-hidden'>
                    <img src="/projektet/assets/images/hero/bckContact.png" alt="" />
                </div>
            </div>
            <p className='text-2xl text-secondary'>Çdo hap drejt një shtëpie të re nis me një bisedë. Kontaktoni sot<br/> për të zbuluar më shumë mbi Zambaku Residence.</p>
            <h1 className='text-[54px] text-600 text-primary montserrat '>Le të Lidhim Vizionin me Realitetin</h1>
        </div>
    );
};

export default Contact;