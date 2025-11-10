"use client"
import { Fade } from "react-awesome-reveal";
import Link from 'next/link';

const Banner = () => {

    return (
        <div id="home-section" className='bg-lightpink'>
            <div className="mx-auto max-w-7xl pt-20 sm:pb-24 px-6">

                <div className='grid grid-cols-1 lg:grid-cols-12 space-x-1'>

                    <div className='col-span-6 flex flex-col justify-center mb-10 lg:mb-0'>
                        {/* <Fade direction={'up'} delay={400} cascade damping={1e-1} triggerOnce={true}> */}
                            <h1 className="text-4xl lg:text-7xl font-semibold mb-5 md:4px lg:text-start text-center" style={{ color: '#FDD194' }}>
                            Designs4suc6
                            </h1>
                        {/* </Fade> */}
                        {/* <Fade direction={'up'} delay={800} cascade damping={1e-1} triggerOnce={true}> */}
                                          <p className='text-grey lg:text-lg font-normal mb-10 lg:text-start text-center' style={{ color: '#645F5A' }}>
                      Your brand isn&apos;t generic, so your website shouldn&apos;t be either! I make unique designs from the ground up, no template work. I make sure your website looks and feels exactly how you want it to look. I can create designs locally so you don&apos;t have to commit to hosting costs until your site is ready. I can help you redesign your current site and if you like I can help you set up hosting or for a fee I can take care of the hosting completely. I&apos;ll always be available to make tweaks and updates after the website has gone live to ensure you stay happy with the product.
                    </p>
                                       {/* </Fade> */}
                        
                        {/* Image - shows only on mobile/tablet, hidden on lg+ */}
                        <div className='flex justify-center lg:hidden mb-8'>
                            <div>
                                <img src="/images/Designs4suc6 - Ludo Koster Designs4suc6.webp" alt="nothing" width={1000} height={805} style={{borderRadius: '10%'}} />
                            </div>
                        </div>
                        
                        {/* <Fade direction={'up'} delay={1000} cascade damping={1e-1} triggerOnce={true}> */}
                        <div className='md:flex align-middle justify-center lg:justify-start mb-8 lg:mb-0'>
  <Link href='#about-section' className='block w-full md:w-auto'>
    <button className='text-xl w-full md:w-auto font-medium rounded-full text-white py-5 px-6 bg-pink lg:px-14 mr-6' >
      About me
    </button>
  </Link>
</div>
                    </div>

                    {/* Image - shows only on lg+, hidden on mobile/tablet */}
                    <div className='col-span-6 justify-center lg:justify-end relative pt-8 lg:pt-0 hidden lg:flex'>
                        {/* <div className='flex bg-white p-2 gap-5 items-center bottom-10 left-10 rounded-xl absolute'> */}
                            {/* <Image src={'/images/Banner/pizza.svg'} alt="pizza-image" width={68} height={68} /> */}
                            {/* <p className='text-lg font-normal'>More than 500+ <br /> recipes.</p> */}
                        {/* </div> */}
                        <div className="lg:ml-10 lg:transform lg:translate-x-4 xl:ml-20 xl:translate-x-8">
                            <img src="/images/Designs4suc6 - Ludo Koster Designs4suc6.webp" alt="nothing" width={1000} height={805} style={{borderRadius: '10%'}} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner;