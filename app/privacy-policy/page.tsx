import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
          <CardDescription>Last updated: {new Date().toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <h2>1. Introduction</h2>
          <p>
            Welcome to the Nexasuite Marketing CRM ("we", "our", or "us"). We are committed to protecting your personal
            information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you use our application.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We collect information that you provide directly to us when you use our application, including:</p>
          <ul>
            <li>Personal information (such as name, email address, and phone number)</li>
            <li>Account credentials for social media platforms</li>
            <li>Marketing campaign data</li>
            <li>Customer data for your marketing efforts</li>
            <li>Usage data and analytics within our application</li>
          </ul>
          <p>
            When you use Facebook Login or connect your social media accounts through our application, we collect and
            use data in accordance with Facebook's Data Policy. This may include your name, email, profile picture, and
            other information provided by Meta's APIs.
          </p>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect for various purposes, including:</p>
          <ul>
            <li>Providing and maintaining our application</li>
            <li>Improving and personalizing user experience</li>
            <li>Analyzing usage patterns and trends</li>
            <li>Communicating with you about our services</li>
            <li>Complying with legal obligations</li>
          </ul>
          <p>Specifically, we use data from Facebook APIs to:</p>
          <ul>
            <li>Authenticate users through Facebook Login</li>
            <li>Personalize your app experience by retrieving profile data</li>
            <li>Enable social media account integrations for marketing campaigns</li>
          </ul>

          <h2>4. Sharing of Your Information</h2>
          <p>We may share your information with third parties in certain situations:</p>
          <ul>
            <li>With your consent</li>
            <li>With social media platforms when you connect your accounts</li>
            <li>With service providers who assist in our business operations</li>
            <li>To comply with legal obligations</li>
          </ul>
          <p>
            We may share information with Meta (Facebook and Instagram) for purposes related to user authentication, ad
            campaigns, and marketing integrations.
          </p>

          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information. These
            measures include:
          </p>
          <ul>
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security audits and vulnerability assessments</li>
            <li>Access controls and authentication mechanisms</li>
            <li>Employee training on data protection and security best practices</li>
          </ul>
          <p>
            However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot
            guarantee absolute security.
          </p>

          <h2>6. Your Data Protection Rights</h2>
          <p>
            We comply with applicable data protection laws, including GDPR and CCPA, ensuring your rights are protected.
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul>
            <li>The right to access your personal data</li>
            <li>The right to rectify or update your personal data</li>
            <li>The right to erase your personal data</li>
            <li>The right to restrict processing of your personal data</li>
            <li>The right to object to processing of your personal data</li>
            <li>The right to data portability</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided in the "Contact Us" section
            below.
          </p>

          <h2>7. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last updated" date. Any updates to this Privacy Policy that
            impact how we handle data from Facebook APIs will comply with Meta's policies and will be communicated to
            you.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or how we handle your information, please contact us at:
          </p>
          <p>
            Email: abdul832.personal@gmail.com
            {/* <br />
            Address: 123 Marketing Street, Tech City, TC 12345 */}
          </p>

          <h2>9. Additional Resources</h2>
          <p>
            For more information on how Meta (Facebook) handles your data, please review their{" "}
            <a href="https://www.facebook.com/policy.php" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

