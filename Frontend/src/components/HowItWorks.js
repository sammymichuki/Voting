import React from "react";
import { Vote, UserCheck, CheckCircle, BarChart } from "lucide-react";
const steps = [
  {
    icon: UserCheck,
    title: "Register",
    description: "Create your secure account with valid credentials",
  },
  {
    icon: Vote,
    title: "Cast Your Vote",
    description: "Select your choice and submit your secure ballot",
  },
  {
    icon: CheckCircle,
    title: "Verify",
    description: "Receive confirmation of your recorded vote",
  },
  {
    icon: BarChart,
    title: "Track Results",
    description: "Monitor live results after voting closes",
  },
];
export const HowItWorks = () => {
  return (
    <div className="w-full bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          How It Works
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Our e-voting platform makes democratic participation simple and secure
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                  <step.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-full h-0.5 bg-blue-100 transform translate-x-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
