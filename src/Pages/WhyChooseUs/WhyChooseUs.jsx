import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Search, Shield, MessageSquare, Star, UserCheck } from "lucide-react";

const features = [
  {
    icon: <UserCheck size={32} />,
    title: "Verified Tutors",
    desc: "Every tutor is ID-verified for trust & safety.",
  },
  {
    icon: <Search size={32} />,
    title: "Smart Matching",
    desc: "Get the best tutor suggestions instantly.",
  },
  {
    icon: <MessageSquare size={32} />,
    title: "Secure Messaging",
    desc: "Chat safely with tutors inside the platform.",
  },
  {
    icon: <Shield size={32} />,
    title: "Location-Based Search",
    desc: "Find tutors near your area quickly.",
  },
  {
    icon: <Star size={32} />,
    title: "Review System",
    desc: "See ratings & reviews before you choose.",
  },
  {
    icon: <CheckCircle size={32} />,
    title: "Fast & Simple Posting",
    desc: "Post tuition demands in under 60 seconds.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-black">
        
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Why Choose Us
        </motion.h2>
        <motion.p className="my-5 text-center">The Tuition Management System is a complete platform where students, tutors, and admins can manage tuition activities including tuition posting, tutor applications, financial tracking, payments, and student–tutor communication.</motion.p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-center mb-4 text-indigo-600">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-center mb-2 text-black">
                {item.title}
              </h3>
              <p className="text-gray-600 text-center text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
