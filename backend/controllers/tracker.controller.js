import { Crypto } from "../models/crypto.model";
import { Gold } from "../models/gold.model";
import { MutualFund } from "../models/mutualfunds.model";
import { Stocks } from "../models/stocks.model";
import { ApiError } from "../utilss/ApiError";
import { ApiResponse } from "../utilss/ApiResponse";
import asyncHandler from "../utilss/asynchandler";
import fetch from "node-fetch";




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


import fetch from "node-fetch";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { MutualFund } from "../models/mutualfund.model.js";

const fetchmutualfunds = asyncHandler(async (req, res) => {
  const mutualfunds = await MutualFund.find({ user: req.user.email });

  if (mutualfunds.length === 0) {
    throw new ApiError(404, "No Mutual Funds investment found");
  }

  // 1. Fetch live NAV data from AMFI
  const navRes = await fetch("https://www.amfiindia.com/spages/NAVAll.txt");
  const navText = await navRes.text();
  const lines = navText.split("\n");

  // 2. Clean and filter data lines
  const navLines = lines.filter(line => line.includes("|") && line.split("|").length >= 6);

  // 3. Attach current NAV and value to each mutual fund
  const enrichedFunds = mutualfunds.map(fund => {
    const matchedLine = navLines.find(line =>
      line.toLowerCase().includes(fund.fundname.toLowerCase())
    );

    if (!matchedLine) {
      return {
        ...fund._doc,
        currentNAV: null,
        currentValue: null,
        note: "NAV not found",
      };
    }

    const parts = matchedLine.split("|").map(p => p.trim());
    const nav = parseFloat(parts[5]);

    const currentValue = Number((nav * (fund.investmentAmount / nav)).toFixed(2)); // assumes 1:1 NAV unit purchase

    return {
      ...fund._doc,
      currentNavValue: nav,
      
    };
  });

  return res.status(200).json(new ApiResponse(200, { enrichedFunds }, "Fetched"));
});

export default fetchmutualfunds;


const savestocks = asyncHandler(async (req,res) => {
      const {stocksymbol,numberofShares,purchaseDate,buyprice} = req.body

     if(!stocksymbol || !numberofShares || !buyprice||!purchaseDate) {
      throw new ApiError(400,"All the fields are required")
     }

const stock = await Stocks.create({
    stocksymbol,
    numberofShares,
    purchaseDate,
    buyPrice:buypricecc

})

return res.status(200).json(200,"Stock saved successfully")
})



const fetchStockPrice = async (symbol) => {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );

    const data = await response.json();
    const price = parseFloat(data["Global Quote"]["05. price"]);
    return isNaN(price) ? null : price;
  } catch (err) {
    console.error(`Failed to fetch price for ${symbol}:`, err.message);
    return null;
  }
};

const fetchstocks = asyncHandler(async (req, res) => {
  const stocks = await Stocks.find({ user: req.user.email });

  if (stocks.length === 0) {
    throw new ApiError(500, "No stocks investment found");
  }

  const updatedStocks = await Promise.all(
    stocks.map(async (stock) => {
      const livePrice = await fetchStockPrice(stock.stocksymbol);
      const currentValue = livePrice
        ? Number((stock.numberofShares * livePrice).toFixed(2))
        : null;

      return {
        ...stock._doc,
        currentStockPrice: livePrice,
        currentValue,
      };
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, { stocks: updatedStocks }, "Fetched"));
});

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





const fetchgold = asyncHandler(async (req, res) => {
  const golds = await Gold.find({ user: req.user.email });

  if (golds.length === 0) {
    throw new ApiError(500, "No gold investment found");
  }

  // 1. Fetch live gold price per gram (example API)
  const response = await fetch(
    "https://www.goldapi.io/api/XAU/INR", // XAU = gold ounce, INR = currency
    {
      headers: {
        "x-access-token": "YOUR_GOLD_API_KEY", // Replace with your GoldAPI key
        "Content-Type": "application/json"
      }
    }
  );

  const data = await response.json();

  // 2. Convert price per ounce to per gram (1 ounce = 31.1035 grams)
  const goldPricePerGram = data.price / 31.1035;

  // 3. Update each record with current value
  const enrichedGolds = golds.map(gold => {
    const currentValue = Number((gold.quantity * goldPricePerGram).toFixed(2));

    return {
      ...gold._doc,
      
      currentValue,
    };
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {  enrichedGolds }, "Gold investments fetched"));
});

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



const fetchCryptoPrice = async (symbol) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=inr`
    );
    const data = await response.json();
    return data[symbol]?.inr || null;
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error);
    return null;
  }
};

const fetchcrypto = asyncHandler(async (req, res) => {
  const cryptos = await Crypto.find({ user: req.user.email });

  if (cryptos.length === 0) {
    throw new ApiError(404, "No crypto investment found");
  }

  const updatedCryptos = await Promise.all(
    cryptos.map(async (crypto) => {
      const symbol = crypto.cryptoname.toLowerCase(); // CoinGecko uses lowercase IDs like 'bitcoin'
      const price = await fetchCryptoPrice(symbol);
      const currentValue = price ? +(price * crypto.quantity).toFixed(2) : null;

      return {
        ...crypto._doc,
        currentPriceINR: price,
        currentValue,
      };
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, { cryptos: updatedCryptos }, "Fetched with live prices"));
});


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