'use client';
import React, { useEffect, useRef } from "react";
import { motion, useInView, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

const WhileInView = () => {
    return (
        <div className="relative mx-auto grid h-32 w-96 place-containe-center">
            <h1>Show me on Scoll</h1>
            <motion.dev 
                intial={{
                    opacity: 1,
                }}
                whileInView={{
                    opacity: 0,
                }}
                viewport={{
                    amount: "all",
                    once: true,
                }}
                className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-indigo-500"/>
        </div>
    );
};

const UseInView = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        amount: "all",
    });

    useEffect(() => {
        console.log(`The element ${isInView} ? "is" :`)
    })

    return (
        <div
            ref={ref}
            className="relative mx-auto grid h-32 w-96 place-content-center"
        >
            <h1
                className="relative z-0 text-3xl font-black uppercase">
                Show me on scroll
            </h1>
            <motion.div
                animate={{
                    y: isInView ? "-100%" : "0%",
                }}
                className="absolute bottom-0 left-0 top-0 z-10 w-1/3 bg-indigo-500"/>
            <motion.div
                animate={{
                    y: isInView ? "100%" : "0%",
                }}
                className="absolute bottom-0 left-1/3 top-0 z-10 w-1/3 bg-indigo-500"/>
            <motion.div
                animate={{
                    y: isInView ? "-100%" : "0%",
                }}
                className="absolute bottom-0 left-2/3 top-0 z-10 w-1/3 bg-indigo-500"/>

        </div>
    )
};

const UseScrollBasic = () => {
    const { scrollYProgress, scrollXProgress, scrollY, scrollX } = useScroll();

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        console.log("Scroll Y Progress:", latest);
    }

    const background = useTransform(
        scrollYProgress,
        [0, 1],
        ["rgba(255, 255, 255, 1)", "rgba(0, 0, 0, 1)"]
    )

    return (
        <motion.dev 
            style={{
                scaleX: scrollYProgress,
                background,
                x: "-50%",
                y: "-50%",
            }}
            className="fixed left-1/2 top-1/2 h-4 w-screen bg-indigo-500"
        />
    )
}

const UseScrollAdvanced = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    })

    const rotate = useTransform(scrollYProgress, [0, 1], ["0deg", "180deg"]);

    return 
        <motion.dev 
            ref={targetRef}
            style={{ rotate }}
            className="mx-auto size-48 bg-indigo-500"
        />;
};

const UseScrollWithContainer = () => {
const containerRef = useRef(null);
const targetRef = useRef(null);
const { scrollXProgress } = useScroll({
    container: containerRef,
    target: targetRef,
    axis: "x",
    offset: ["start end", "end start"]
});

    return (
        <div ref={containerRef}
        className="flex w-screen overflow-x-scroll bg-indigo-500/50 py-8"
        >
            <div className="w-screen shrink-0">
                <motion.div 
                    ref={targetRef}
                    style={{ opacity: scrollXProgress }}
                    className="mx-auto size-48 shrink-0 bg-zinc-50"
                />
                <div className="w-screen shrink-0"/>
            </div>
        </div>
    )
        // <motion.dev 
        //     ref={containerRef}
        //     className="relative h-screen w-screen overflow-x-auto"
        // >
        //     <motion.div
        //         ref={targetRef}
        //         style={{ scaleX: scrollXProgress }}
        //         className="h-full w-[200%] bg-indigo-500"
        //     />
        // </motion.dev>
}

function Word({ value } {

    const element = useRef(null);
    const { scrollYProgress } = useScroll({
        target: element,
        offset: ['start 0.9', 'start 0.25']
    })

    useEffect( () => {
        scrollYProgress.on("change", e => console.log(e) => {
    }, [])

    return (
        <motion.p 
            className={StyleSheet.paragraph}
            ref={element}
            style={{
                opacity: scrollYProgress,
                scale: scrollYProgress,
            }}
        >
            {value}
        </motion.p>
    )
})


export default WhileInView;