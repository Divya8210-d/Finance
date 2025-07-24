import { Crypto } from "../models/crypto.model";
import { Gold } from "../models/gold.model";
import { MutualFund } from "../models/mutualfunds.model";
import { Stocks } from "../models/stocks.model";
import { ApiError } from "../utilss/ApiError";
import asyncHandler from "../utilss/asynchandler";





const savemutualfunds = asyncHandler(async (req,res) => {
     const {fundname,investmentAmount,investmentDate} = req.body

     if(!fundname || !investmentAmount || !investmentDate) {
      throw new ApiError(400,"All the fields are required")
     }

const fund = await MutualFund.create({
    fundname,
    investmentAmount,investmentDate
})

return res.status(200).json(200,"Fund saved successfully")


    })


const fetchmutualfunds = asyncHandler(async (req,res) => {
    
})


const savestocks = asyncHandler(async (req,res) => {
      const {stocksymbol,numberofShares,purchaseDate,buyprice} = req.body

     if(!stocksymbol || !numberofShares || !buyprice||!purchaseDate) {
      throw new ApiError(400,"All the fields are required")
     }

const stock = await Stocks.create({
    stocksymbol,
    numberofShares,
    purchaseDate,
    buyPrice

})

return res.status(200).json(200,"Stock saved successfully")
})



const fetchstocks = asyncHandler(async (req,res) => {
    
})

const savegold = asyncHandler(async (req,res) => {
       const {goldType,quantity,purchaseDate,Pricepergram} = req.body

     if(!goldType || !quantity || !Pricepergram||!purchaseDate) {
      throw new ApiError(400,"All the fields are required")
     }

const gold = await Gold.create({
    goldType,
    quantity,
    purchaseDate,
    Pricepergram
})

return res.status(200).json(200,"Gold data saved successfully")

})





const fetchgold = asyncHandler(async (req,res) => {
    
})

const savecrypto = asyncHandler(async (req,res) => {
    
       const {cryptoname,symbol,purchaseDate,purchasePrice,quantity} = req.body

     if(!cryptoname || !quantity || !purchasePrice||!purchaseDate||!symbol) {
      throw new ApiError(400,"All the fields are required")
     }

const crypto = await Crypto.create({
    cryptoname,
    symbol,purchaseDate,purchasePrice,
    quantity
})


return res.status(200).json(200,"Crypto data saved successfully")
})



const fetchcrypto = asyncHandler(async (req,res) => {
    
})


export {
    savecrypto,
    savegold,
    savemutualfunds,
    savestocks,
    fetchcrypto,
    fetchgold,
    fetchmutualfunds,
    fetchstocks
}