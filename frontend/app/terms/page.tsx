export default function TermsPage() {

    const terms = [
      {
        title: "Service Agreement",
        desc: "LapCare provides laptop repair services based on user requests and technician availability. Service timelines may vary depending on the complexity of the issue and parts availability.",
      },
      {
        title: "Booking & Confirmation",
        desc: "Users must provide accurate details while booking a service. Once a technician is assigned, users will receive confirmation via email or dashboard.",
      },
      {
        title: "Payments",
        desc: "All payments must be completed after service confirmation. Prices may vary depending on additional repairs or parts required during service.",
      },
      {
        title: "Cancellation Policy",
        desc: "Users can cancel bookings before technician assignment without charges. After assignment, cancellation fees may apply.",
      },
      {
        title: "Warranty Policy",
        desc: "LapCare provides limited warranty on selected repairs. Warranty does not cover physical damage, water damage, or third-party interference after service.",
      },
      {
        title: "Data Safety",
        desc: "We are not responsible for data loss during repair. Users are strongly advised to backup important data before requesting service.",
      },
      {
        title: "Technician Responsibility",
        desc: "All technicians are verified professionals. However, LapCare acts as a service platform and is not liable for individual technician misconduct beyond reasonable control.",
      },
      {
        title: "Liability Limitation",
        desc: "LapCare is not liable for indirect, incidental, or consequential damages arising from the use of services.",
      },
      {
        title: "User Responsibilities",
        desc: "Users must ensure proper usage of the device after repair. Any misuse or external damage after service is not covered.",
      },
      {
        title: "Updates to Terms",
        desc: "LapCare reserves the right to update these terms at any time. Continued use of services implies acceptance of updated terms.",
      },
    ];
  
    return (
      <div className="relative min-h-screen bg-[#020617] text-white overflow-hidden px-6 py-20">
  
        {/* 🔥 BACKGROUND GLOW */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-green-500 opacity-10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-400 opacity-10 blur-3xl rounded-full"></div>
  
        <div className="relative max-w-4xl mx-auto">
  
          {/* 🔥 HEADER */}
          <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
            Terms & Conditions
          </h1>
  
          <p className="text-gray-400 mb-10 text-lg">
            By using LapCare services, you agree to the following terms and conditions.
          </p>
  
          {/* 🔥 TERMS LIST */}
          <div className="space-y-6">
  
            {terms.map((item, index) => (
              <div
                key={index}
                className="bg-[#0b1220] border border-gray-800 rounded-xl p-6 hover:border-green-400 hover:scale-[1.02] transition shadow-lg"
              >
                <h2 className="text-xl font-semibold mb-2 text-green-400">
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
            Last updated: 2026 • LapCare Services. All rights reserved.
          </p>
  
        </div>
  
      </div>
    );
  }