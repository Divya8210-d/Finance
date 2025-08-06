import React, { useEffect } from "react";
import Saving from "./Insights/Saving.jsx";
import SpendingTrends from "./Insights/SpendingTrends.jsx";
import Week from "./Insights/Week.jsx";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import Cashflow from "./Insights/Cashflow.jsx";
import { useState } from "react";
import BudgetInsight from "./Insights/BudgetInsight.jsx";
import FutureBudget from "./Insights/FutureBudget.jsx";
import Goalset from "./Insights/Goalset.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from "react";

function Insights() {
const [personality,setPersonality]=useState("");
const insightRef = useRef()


  const handleDownloadPDF = async () => {
    const input = insightRef.current;

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      windowWidth: input.scrollWidth,
    });

    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add the first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position -= pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save('Your_Expense_Report.pdf');
  };


const getpersonality = async (req,res) => {

try {
    

      const res = await axios.post(
        "https://finanlytic.onrender.com/api/v1/dashboard/futureprediction",
      {},
        { withCredentials: true }
      );
     console.log("personality",res.data)
      const {classifyaiRaw} = res.data.data;

    setPersonality(classifyaiRaw)
    
    } catch (error) {
         toast.error(error.response?.data?.message||"Something went wrong ")
    }


  

  
}


useEffect(()=>{
getpersonality()
},[])


  return (<> <div><button onClick={handleDownloadPDF} className="ml-14 p-3 rounded-lg bg-blue-100  dark:bg-gray-900 mt-5">Download Pdf</button></div>
    <div ref={insightRef} className="p-6 space-y-6 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      
       
       
           <p className="text-gray-700 dark:text-gray-300 mb-2 ml-10">
           <div className="max-w-6xl bg-orange-100 dark:bg-orange-900 rounded-xl p-4">
              
               <p className="text-gray-700 dark:text-orange-100 font-bold">{personality}</p>
               </div>
              </p>
          
       <div className="flex">
        <Cashflow/>
       </div>
       <div>
        <Goalset/>
       </div>
         <div className="flex">
        <BudgetInsight/>
       </div>


      {/* Saving Chart and Insight Summary */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Saving />
      </motion.div>

      {/* Spending Trends */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <SpendingTrends />
      </motion.div>

      {/* Weekly Trends */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Week />
      </motion.div>

 <div className="flex">
        <FutureBudget/>
       </div>

      <ToastContainer />
    </div></>
  );
}

export default Insights;
