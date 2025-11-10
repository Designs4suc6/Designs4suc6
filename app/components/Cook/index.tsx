"use client"
import { Fade } from "react-awesome-reveal";

const Cook = () => {
    return (
        <div className='relative' id="cook-section">
            <div className="bg-lightpink">
                {/* Title positioned above all content */}
                <div className='flex flex-col items-center text-center max-w-4xl mx-auto pt-16'>
                    <h2 className='text-pink text-2xl md:text-3xl font-normal mb-3 ls-51 uppercase text-center' style={{ color: '#B60B13' }}>About me</h2>
                </div>

                <div className="mx-auto max-w-[1707px] lg:pt-10 pb-8 sm:pb-12 px-6">
                    {/* Main content grid */}
                    <div className='grid grid-cols-1 lg:grid-cols-12 my-16 gap-x-12'>
                        {/* Image column */}
                        <div className='col-span-6 flex justify-center lg:justify-start mb-8 lg:mb-0'>
                            <img 
                                // style={{borderRadius: '10%'}}
                                src="/images/Designs4suc6 - About me.webp" 
                                alt="About me image" 
                                width={636}
                                height={636}
                                className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[636px] h-auto object-contain"
                            />
                        </div>
                        
                        {/* Content column */}
                        <div className='col-span-6 flex flex-col lg:justify-start lg:pl-6 mt-8 lg:mt-0'>
                            <p className='text-grey md:text-lg font-normal mb-10' style={{ color: '#645F5A' }}>
                                My name is Ludo and I like to split my time working as an instructor and behavioural consultant for my dog school 
                                (<a href="https://www.dogs4suc6.nl/" target="_blank" rel="noopener noreferrer" style={{color:'blue'}}>Dogs4suc6</a>) 
                                on the one hand and on the other I like to be creative in Wordpress website designing. 
                                In my free time you&apos;ll find me walking/playing with my dog or bouldering!
                            </p>
                            
                            <Fade direction={'up'} delay={400} cascade damping={1e-1} triggerOnce={true}>
                                <div className='flex align-middle justify-center lg:justify-start mb-4 lg:mb-0'>
                                    <button className='text-xl font-medium rounded-full text-white py-5 px-6 bg-pink lg:px-10 mr-6'> Dogs4suc6</button>
                                </div>
                            </Fade>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cook;