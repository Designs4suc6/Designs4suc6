"use client"
import { Fade } from "react-awesome-reveal";
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ContactInfo = () => {
    return (
        <div style={{ backgroundColor: '#ffd494' }} className="relative">
        {/* Positioned image at top right with half above container */}
        <div className="hidden lg:block absolute right-0 -top-12 sm:-top-28 md:-top-32 lg:-top-40 z-10 w-[100px] sm:w-[150px] md:w-[180px] lg:w-[200px] mr-8">
        <img 
            // style={{borderRadius: '10%'}}
                src={'/images/Designs4suc6_logo.webp'} 
                alt="decorative image" 
                className="w-full h-auto mr-12"
            />
        </div>
        
        
            <>
                {/* About me section outside the container */}
                <div className="mx-auto max-w-2xl md:max-w-7xl px-6 pt-8 pb-12 text-center" >
                    <Fade direction={'up'} delay={200} cascade damping={1e-1} triggerOnce={true}>
                        <div className='col-span-6 flex flex-col justify-center items-center'>
                            <h2 className='text-pink text-2xl md:text-3xl font-normal mb-3 ls-51 uppercase text-center' style={{color: '#B60B13' }}>Get in Touch</h2>
                        </div>
                    </Fade>
                </div>
                
                <div className='relative pb-8' >
                    <div className="mx-auto max-w-2xl bg-pink br-50 md:max-w-7xl mt-8 md:mt-24 lg:mt-48 rounded-lg">
                        <div className="grid grid-cols-1 gap-y-10 gap-x-6 md:grid-cols-12 xl:gap-x-8">
                
                        <div className="col-span-7">
    <div className="m-10 lg:ml-32 lg:mt-20 lg:mb-20" >
        <Fade direction={'up'} delay={300} cascade damping={1e-1} triggerOnce={true}>
            <h3 className="text-lg font-normal text-white mb-3 ls-51">CONTACT INFORMATION</h3>
        </Fade>
   

        <Fade direction={'up'} delay={300} cascade damping={1e-1} triggerOnce={true}>
            <div className="text-white space-y-4">
                <div className="flex items-center">
                    <EmailIcon fontSize="medium" />
                    <p className="text-lg ml-2">Info@dogs4suc6.nl</p>
                </div>
                
                <div className="flex items-center">
                    <LocalPhoneIcon fontSize="medium" />
                    <p className="text-lg ml-2">+316 20002928</p>
                </div>
          
                
                <div className="pt-6">
                    <p className="text-lg">Send me an email and I will get in touch with you the same or next day!
                    </p>
                </div>
            </div>
        </Fade>
    </div>
</div>
                            
                            
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}

export default ContactInfo;