import React from 'react';
import Footer from '@/app/UI/footer/page';
import Nav from "@/app/UI/Nav/page";

const PrivacyPolicy: React.FC = () => {
  return (
    <div>

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          Your privacy is important to us. This privacy policy explains how we collect, use, and protect your information. By using our services, you agree to the collection and use of information in accordance with this policy.
        </p>
        
     <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
<p className="mb-4">
   We collect information that you provide to us directly, including your name, email address, password, and any other details you choose to share. Additionally, we may automatically gather certain data related to your use of our services.
</p>
<p className="mb-4">
   Google User Data: If you choose to sign in or register using your Google account, we collect your Google account information—such as your email address, profile name, and profile picture. This data is used solely for the purpose of creating and managing your account and subscription services.
</p>
<h2 className="text-2xl font-semibold mb-2">2. Use of Information</h2>
<p className="mb-4">
   We utilize your information to provide and enhance our services, communicate with you regarding your account or our offerings, and personalize your experience. This may include sending you newsletters, marketing communications, and updates on new features and services.
</p>

      
    
             <p className="mb-4">
     Service Providers: We may share data with trusted third-party providers that assist us in managing our services, including payment processing and customer support. These providers are contractually obligated to protect your data.
Legal Requirements: We may disclose your information if required by law or in response to valid legal requests
        </p>
                 

        <h2 className="text-2xl font-semibold mb-2">3. Data Security</h2>
        <p className="mb-4">
          We take reasonable measures to protect your information from unauthorized access or disclosure. These measures include encryption, secure servers, and access controls. However, no method of transmission over the internet or method of electronic storage is 100% secure. Therefore, while we strive to protect your information, we cannot guarantee its absolute security.
        </p>
 <p className="mb-4">
      We may update this Privacy Policy periodically. If we make significant changes, we will notify you through email or on our website
        </p>


       

        <h2 className="text-2xl font-semibold mb-2">6. Cookies and Tracking Technologies</h2>
        <p className="mb-4">
          We may use cookies and similar tracking technologies to enhance your experience on our website. You can control the use of cookies at the individual browser level, but if you choose to disable cookies, it may limit your ability to use certain features or functions on our website.
        </p>

        <h2 className="text-2xl font-semibold mb-2">7. Changes to Policy</h2>
        <p className="mb-4">
          We may update this privacy policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically for any updates or changes.
        </p>

        <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
        <p className="mb-4">
          For any questions, concerns, or requests regarding this privacy policy, please contact us at:
        </p>
        <p className="mb-4">
          Email: <a href="mailto:weblike.ai@gmail.com" className="text-blue-500 underline">weblike.ai@gmail.com</a>
        </p>

        <p>
          Thank you for trusting us with your information. Your privacy is our priority.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
