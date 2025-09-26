import React from 'react'

const Interior = ({ images }) => {
    return (
        <div className='w-full h-full flex items-center justify-center py-36'>
            <div className="base-width flex flex-col gap-6">
                {images &&
                    images.reduce((rows, image, index) => {
                        if (index % 3 === 0) {
                            rows.push([image]);
                        } else if (index % 3 === 1) {
                            rows.push([image, images[index + 1]].filter(Boolean));
                        }
                        return rows;
                    }, []).map((row, rowIndex) => (
                        <div
                            key={rowIndex}
                            className={`grid gap-6 ${row.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}
                        >
                            {row.map((img, i) => (
                                <img
                                    key={i}
                                    // src={`${API_URL}${img}`}
                                    src={img}
                                    alt={`Project image ${rowIndex + 1}-${i + 1}`}
                                    className="w-full object-cover aspect-[16/9]"
                                />
                            ))}
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Interior