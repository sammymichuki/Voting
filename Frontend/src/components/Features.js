import React from "react";
import { Shield, Users, LineChart, Clock } from "lucide-react";
const features = [
  {
    icon: Shield,
    title: "Secure & Encrypted",
    description:
      "End-to-end encryption ensures your vote remains confidential and tamper-proof.",
  },
  {
    icon: Users,
    title: "Easy to Use",
    description:
      "Intuitive interface makes voting accessible to everyone, anywhere.",
  },
  {
    icon: LineChart,
    title: "Real-time Results",
    description:
      "Watch live counting and get instant results once voting closes.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description:
      "Vote at your convenience, any time during the election period.",
  },
];
export const Features = () => {
  return (
    <div className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose Our E-Voting Platform?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
