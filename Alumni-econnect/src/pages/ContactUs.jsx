import React from 'react'
import ContactDetails from '../components/ContactDetail'

import contact from '../assets/contact.png'
import Welcome from '../components/Contact.jsx/welcome'
import Card from '../components/Contact.jsx/card'
import Feedback from '../components/Contact.jsx/feedback'

const ContactUs = () => {
  return (
    <section className='pt-10 mt-10'>
        <div>
        <Welcome/>
        <Card/>
        <div className='flex justify-center'>
            <div>
            <Feedback/>
            </div>
            
        </div>
        
      

     
    </div>
    </section>
    
  )
}

export default ContactUs
