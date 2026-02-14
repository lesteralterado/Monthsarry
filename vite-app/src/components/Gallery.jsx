import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BounceCards from './BounceCards';
import CircularGallery from './CircularGallery';
import FloatingElements from './FloatingElements';

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
    const sectionRef = useRef(null);
    
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start']
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
    const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

    return (
        <section id="gallery" className="section gallery-section" ref={sectionRef}>
            {/* Parallax Background */}
            <motion.div 
                className="gallery-background"
                style={{ y: backgroundY }}
            />
            
            {/* Floating Valentine Elements */}
            <FloatingElements 
                sectionRef={sectionRef} 
                count={15}
                includeHearts={true}
                includeRoses={true}
                includeSparkles={true}
            />

            <motion.h2 
                className="text-center text-4xl font-bold mb-8 font-great-vibes gallery-title"
                style={{ y: titleY }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                Our Gallery
            </motion.h2>

            <div className="mb-16">
                <motion.h3 
                    className="text-center text-2xl font-semibold mb-4 gallery-subtitle"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Bounce Cards
                </motion.h3>
                <motion.div 
                    className="flex justify-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    <BounceCards images={images} enableHover={true} />
                </motion.div>
            </div>

            <div>
                <motion.h3 
                    className="text-center text-2xl font-semibold mb-4 gallery-subtitle"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Circular Gallery
                </motion.h3>
                <motion.div 
                    className="h-[600px]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <CircularGallery items={galleryItems} />
                </motion.div>
            </div>

            <style>{`
                .gallery-section {
                    position: relative;
                    overflow: hidden;
                }

                .gallery-background {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(180deg, 
                        rgba(0, 0, 0, 0.3) 0%, 
                        rgba(220, 38, 38, 0.05) 30%,
                        rgba(220, 38, 38, 0.05) 70%,
                        rgba(0, 0, 0, 0.3) 100%
                    );
                    z-index: -1;
                }

                .gallery-title {
                    color: #dc2626;
                    font-size: 3rem;
                    margin-bottom: 3rem;
                }

                .gallery-subtitle {
                    color: #fca5a5;
                }
            `}</style>
        </section>
    );
};

export default Gallery;
