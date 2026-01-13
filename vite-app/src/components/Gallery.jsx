import React from 'react';
import BounceCards from './BounceCards';
import CircularGallery from './CircularGallery';

const images = [
    "https://res.cloudinary.com/dhxi75eld/image/upload/v1765423719/cdb125c2-6b03-460e-a933-1249f13ccdce_kk94fv.jpg",
    "https://res.cloudinary.com/dhxi75eld/image/upload/v1765430759/8d4ffb41-1287-45d8-9698-b39be21268df_isxhcx.jpg",
    "https://res.cloudinary.com/dhxi75eld/image/upload/v1765423719/1b594e93-c311-4f0b-a548-2c37978c2e94_dzvchv.jpg",
    "https://res.cloudinary.com/dhxi75eld/image/upload/v1765430897/23d14a44-acd7-4e57-a8ec-976528fda79f_knovl4.jpg",
    "https://res.cloudinary.com/dhxi75eld/image/upload/v1765430759/21f3b195-974f-4adf-a74f-fae9618201bc_jjua4i.jpg"
];

const galleryItems = images.map((image, index) => ({
    image,
    text: `Memory ${index + 1}`
}));

const Gallery = () => {
    return (
        <section id="gallery" className="section">
            <h2 className="text-center text-4xl font-bold mb-8 font-great-vibes">Our Gallery</h2>

            <div className="mb-16">
                <h3 className="text-center text-2xl font-semibold mb-4">Bounce Cards</h3>
                <div className="flex justify-center">
                    <BounceCards images={images} enableHover={true} />
                </div>
            </div>

            <div>
                <h3 className="text-center text-2xl font-semibold mb-4">Circular Gallery</h3>
                <div className="h-[600px]">
                    <CircularGallery items={galleryItems} />
                </div>
            </div>
        </section>
    );
};

export default Gallery;