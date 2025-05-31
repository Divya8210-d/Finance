import { motion } from 'framer-motion';

export default function About() {
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
  };

  return (
    <main className="min-h-[600px] bg-gradient-to-r from-orange-100 to-orange-300 px-6 md:px-16 py-16 text-orange-900">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-4xl font-bold text-center mb-12"
      >
        Finanlyics: A Personal Finance Dashboard
      </motion.h2>

      {/* Sections container */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-12 max-w-4xl mx-auto"
      >
        {/* Section 1 */}
        <motion.div variants={item} className="relative pl-6 border-l-4 border-orange-500">
          <div className="absolute -left-3 top-1 w-6 h-6 bg-orange-500 rounded-full shadow-md"></div>
          <h3 className="text-2xl font-semibold mb-2">Collaborating AI and Finance</h3>
          <p className="text-base leading-relaxed">
            With power of AI and tools, Finanlyics provides efficient tips and plans for managing your expenses.
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div variants={item} className="relative pl-6 border-l-4 border-orange-500">
          <div className="absolute -left-3 top-1 w-6 h-6 bg-orange-500 rounded-full shadow-md"></div>
          <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
          <p className="text-base leading-relaxed">
            Empower every individual to take charge of their financial future using reliable data, insights, and intuitive tools.
          </p>
        </motion.div>

        {/* Section 3 */}
        <motion.div variants={item} className="relative pl-6 border-l-4 border-orange-500">
          <div className="absolute -left-3 top-1 w-6 h-6 bg-orange-500 rounded-full shadow-md"></div>
          <h3 className="text-2xl font-semibold mb-2">Smart Tools</h3>
          <p className="text-base leading-relaxed">
            Access calculators, trend predictors, and savings analyzers – designed for beginner investors and seasoned traders alike.
          </p>
        </motion.div>

        {/* Section 4 */}
        <motion.div variants={item} className="relative pl-6 border-l-4 border-orange-500">
          <div className="absolute -left-3 top-1 w-6 h-6 bg-orange-500 rounded-full shadow-md"></div>
          <h3 className="text-2xl font-semibold mb-2">Safe and Secure Environment</h3>
          <p className="text-base leading-relaxed">
            All the data and finance stats of a user are safely secured and used wisely — alterable only by the user.
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}
