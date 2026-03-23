export default function PrivacyPage() {

    const policies = [
      {
        title: "Information We Collect",
        desc: "We collect personal information such as name, email, phone number, and service details when users register or book a service.",
      },
      {
        title: "How We Use Information",
        desc: "Collected data is used to provide services, assign technicians, process bookings, and improve user experience.",
      },
      {
        title: "Data Protection",
        desc: "We implement industry-standard security measures to protect your personal data from unauthorized access or misuse.",
      },
      {
        title: "Sharing of Information",
        desc: "We do not sell or share your personal data with third parties except for service fulfillment (e.g., assigning technicians).",
      },
      {
        title: "Cookies Usage",
        desc: "We may use cookies to enhance user experience, remember preferences, and analyze website performance.",
      },
      {
        title: "User Rights",
        desc: "Users can request access, update, or deletion of their personal data by contacting our support team.",
      },
      {
        title: "Third-Party Services",
        desc: "We may integrate third-party tools (e.g., payment gateways). Their policies apply separately.",
      },
      {
        title: "Data Retention",
        desc: "We retain user data only as long as necessary for providing services and complying with legal obligations.",
      },
      {
        title: "Policy Updates",
        desc: "We reserve the right to update this privacy policy at any time. Continued use implies acceptance of changes.",
      },
    ];
  
    return (
      <div className="relative min-h-screen bg-[#020617] text-white overflow-hidden px-6 py-20">
  
        {/* 🔥 BACKGROUND GLOW */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 opacity-10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500 opacity-10 blur-3xl rounded-full"></div>
  
        <div className="relative max-w-4xl mx-auto">
  
          {/* 🔥 HEADER */}
          <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Privacy Policy
          </h1>
  
          <p className="text-gray-400 mb-10 text-lg">
            Your privacy is important to us. This policy explains how LapCare collects, uses, and protects your information.
          </p>
  
          {/* 🔥 POLICY CARDS */}
          <div className="space-y-6">
  
            {policies.map((item, index) => (
              <div
                key={index}
                className="bg-[#0b1220] border border-gray-800 rounded-xl p-6 hover:border-blue-400 hover:scale-[1.02] transition shadow-lg"
              >
                <h2 className="text-xl font-semibold mb-2 text-blue-400">
                  {index + 1}. {item.title}
                </h2>
  
                <p className="text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
  
          </div>
  
          {/* 🔥 FOOTER */}
          <p className="text-gray-500 text-sm mt-12 text-center">
            Last updated: 2026 • LapCare Privacy Policy
          </p>
  
        </div>
  
      </div>
    );
  }