import React from 'react';
import Footer from '@/app/UI/footer/page';
import Nav from "@/app/UI/Nav/page";

const TermsAndConditions: React.FC = () => {
  return (
    <div>
      <Nav/>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
      <p className="mb-4">
        Welcome to The webllix. By accessing or using our service, you agree to comply with and be bound by the following terms and conditions:
      </p>
      <h2 className="text-2xl font-semibold mb-2">1. Use of Service</h2>
      <p className="mb-4">
        You must not misuse our service. You will only use our service for lawful purposes and in accordance with our acceptable use policy.
      </p>
      <h2 className="text-2xl font-semibold mb-2">2. Account Responsibility</h2>
      <p className="mb-4">
        You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
      </p>
      <h2 className="text-2xl font-semibold mb-2">3. Termination</h2>
      <p className="mb-4">
        We may terminate or suspend your access to our service immediately, without prior notice or liability, if you breach the terms.
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
            
      <p>
        For more details, please contact us at weblike.ai@gmail.com.
      </p>
    </div>
    <Footer/>
    </div>
  );
};

export default TermsAndConditions;
