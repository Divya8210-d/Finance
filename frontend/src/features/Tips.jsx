// No changes to imports or logic; only added/modified tailwind dark: classes

export default function InvestmentTips() {
  // ... same code

  return (
    <div className="p-6 pl-10 text-gray-800 dark:text-gray-200 text-left font-inter">
      <ToastContainer position="top-center" autoClose={3000} />

      <motion.h1
        className="text-3xl font-bold mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Investment Tips
      </motion.h1>

      <hr className="mb-6 border-gray-300 dark:border-gray-600" />

      <motion.div
        className="text-black dark:bg-gray-900 dark:text-white bg-orange-100 p-4 rounded-lg shadow-sm mb-8 font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p>Welcome! Here are some key questions to guide your investment journey.</p>
      </motion.div>

      {questions.map((item, index) => (
        <motion.div
          key={index}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <div
            onClick={() => toggleQuestion(index)}
            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-2"
          >
            <p className="font-semibold text-lg dark:text-gray-200 text-gray-900">{index + 1}. {item.q}</p>
          </div>

          <AnimatePresence>
            {openQuestion === index && (
              <motion.div
                className="mt-2"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {item.input(item.key)}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <button
          className="bg-orange-500 dark:bg-white text-white dark:text-black px-6 py-2 rounded hover:opacity-90 transition"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </motion.div>

      <AnimatePresence>
        {tips.length > 0 && classification && (
          <motion.div
            key="tips"
            className="dark:bg-gray-900 dark:text-white bg-orange-100 p-4 rounded-lg shadow-sm mb-8 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="p-3">Looks like you are a <strong>{classification}</strong> Investor.</p>
            <p className="p-3">We would like to give you some tips regarding investment. Like:</p>
            <ul className="p-3 list-disc list-inside space-y-1">
              {tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
