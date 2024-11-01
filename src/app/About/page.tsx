import React from 'react';
import Footer from '@/app/UI/footer/page';
import Nav from "@/app/UI/Nav/page";
// ... imports remain the same ...

const About: React.FC = () => {
    return (
      <div>
        <Nav/>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">About Us</h1>
          <p className="mb-6 text-lg">
            Welcome to weblike.ai, where innovation meets business growth. We are passionate about transforming businesses through cutting-edge digital solutions and AI-powered technologies.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="mb-6">
            Founded with a vision to revolutionize how businesses approach digital presence, weblike.ai has grown into a trusted partner for companies worldwide. Our journey began with a simple idea: make professional web development accessible to businesses of all sizes.
          </p>
  
          <h2 className="text-2xl font-semibold mb-4">What Sets Us Apart</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">AI-Powered Solutions</h3>
              <p>Our advanced AI technology creates stunning, conversion-focused landing pages tailored to your business needs.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
              <p>Expand your business worldwide with our international market optimization tools and strategies.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p>Our dedicated team of professionals is available 24/7 to help you succeed in your digital journey.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Innovation First</h3>
              <p>Stay ahead of the competition with our constantly evolving suite of digital tools and features.</p>
            </div>
          </div>
  
          <h2 className="text-2xl font-semibold mb-4">Our Comprehensive Services</h2>
          <div className="mb-8">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="font-semibold mr-2">• AI Landing Page Builder</span>
                Create professional, high-converting landing pages in minutes using our advanced AI technology.
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">• Business Growth Tools</span>
                Access analytics, marketing automation, and CRM tools designed to scale your business effectively.
              </li>
        
             
            </ul>
          </div>
  
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-6">
            At weblike.ai, our mission is to democratize digital success. We believe every business deserves access to professional-grade digital tools and services that can help them compete in today is  global marketplace.
          </p>
  
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Proven Results</h3>
              <p> satisfied customers worldwide</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Innovation</h3>
              <p>Cutting-edge AI technology and regular updates</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Support</h3>
              <p>24/7 dedicated customer support team</p>
            </div>
          </div>
  
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">Ready to Transform Your Business?</h2>
            <p className="mb-4">
              Join thousands of successful businesses that have already chosen weblike.ai as their digital growth partner. Let us help you achieve your business goals with our innovative solutions and expert support.
            </p>
            <p className="font-semibold">
              Contact us today to start your journey towards digital success.
            </p>
          </div>
        </div>
        <Footer/>
      </div>
    );
  };
  


export default About;
