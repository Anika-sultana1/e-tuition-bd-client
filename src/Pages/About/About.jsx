import { motion } from "framer-motion";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserShield,
  FaCheckCircle,
  FaLightbulb,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <title>eTuitionBD-About</title>
      <div className="max-w-7xl mx-auto px-4 py-24 space-y-28">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">
            Our Story
          </p>
          <h1 className="text-6xl font-black mb-6 bg-linear-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent leading-tight">
            Connecting Education, Digitally.
          </h1>
          <p className="text-gray-600 max-w-4xl mx-auto text-xl leading-relaxed font-light">
            eTuitionBd is a modern Tuition Management System that bridges students
            and <span className="font-semibold">verified tutors</span> through a
            secure, transparent, and fully automated digital platform.
          </p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl p-12 shadow-2xl shadow-blue-100 border border-gray-100"
        >
          <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
            Why eTuitionBd?
          </h2>

          <div className="grid md:grid-cols-2 gap-12 text-gray-700">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center text-red-500">
                <FaLightbulb className="mr-3" /> The Challenge
              </h3>
              <p className="text-lg leading-relaxed">
                Students struggle to find trustworthy tutors, while tutors face
                difficulties identifying genuine tuition opportunities. Manual
                coordination, lack of verification, and unclear payments create
                unnecessary friction.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center text-teal-500">
                <FaCheckCircle className="mr-3" /> Our Solution
              </h3>
              <p className="text-lg leading-relaxed">
                We solve this with admin verification, role-based dashboards,
                secure Stripe payments, and automated workflows — ensuring trust,
                transparency, and efficiency.
              </p>
            </div>
          </div>
        </motion.section>

        <section>
          <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-800">
            Platform Roles
          </h2>

          <div className="grid lg:grid-cols-3 gap-10">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-10 text-center shadow-lg border-t-4 border-blue-500"
            >
              <FaUserGraduate className="text-6xl text-blue-500 mx-auto mb-6 bg-blue-50 p-3 rounded-full" />
              <h3 className="text-2xl font-bold mb-3">Students</h3>
              <p className="text-gray-600 leading-relaxed">
                Post tuition requirements, review tutor applications, approve the
                best match, and complete secure payments.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-10 text-center shadow-lg border-t-4 border-teal-500"
            >
              <FaChalkboardTeacher className="text-6xl text-teal-500 mx-auto mb-6 bg-teal-50 p-3 rounded-full" />
              <h3 className="text-2xl font-bold mb-3">Tutors</h3>
              <p className="text-gray-600 leading-relaxed">
                Apply to approved tuition posts, track application status, and
                manage earnings transparently.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-10 text-center shadow-lg border-t-4 border-orange-500"
            >
              <FaUserShield className="text-6xl text-orange-500 mx-auto mb-6 bg-orange-50 p-3 rounded-full" />
              <h3 className="text-2xl font-bold mb-3">Admins</h3>
              <p className="text-gray-600 leading-relaxed">
                Verify users, approve tuition posts, manage roles, and monitor
                platform transactions.
              </p>
            </motion.div>
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-800">
            Key Technical Features
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              "Role-based dashboards (Student, Tutor, Admin)",
              "Firebase Authentication with JWT verification",
              "Admin-controlled tuition approval workflow",
              "Stripe payment integration with transaction history",
              "Tutor application & approval management",
              "Search, sort, and pagination support",
              "Protected routes with role validation",
              "Fully responsive & recruiter-friendly UI",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 bg-white p-5 rounded-xl border border-blue-200"
              >
                <FaCheckCircle className="text-blue-500 mt-1" />
                <p className="text-gray-700 font-medium">{item}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center bg-linear-to-br from-blue-600 to-teal-500 rounded-3xl p-16 shadow-2xl"
        >
          <h2 className="text-4xl font-black mb-6 text-white">
            Our Vision
          </h2>
          <p className="text-white max-w-4xl mx-auto text-xl leading-relaxed">
            To build the most trusted digital tuition ecosystem in Bangladesh —
            where education, technology, and transparency work together.
          </p>
        </motion.section>

      </div>
    </div>
  );
};

export default About;
