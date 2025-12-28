import { useMemo } from 'react';

/**
 * Input parameters for buy vs rent analysis
 * 
 * Combines property details, mortgage parameters, cost assumptions, and investment returns
 * to model two financial scenarios: buying vs renting + investing
 */
export interface BuyVsRentInput {
  // ========== PROPERTY DETAILS ==========
  
  /** Purchase price of the property in EUR */
  homePrice: number;
  
  /** Number of years to analyze (1-50) */
  durationYears: number;
  
  /** Expected annual home value appreciation percentage (2-3% typical) */
  homeAppreciationAnnual: number;
  
  // ========== MORTGAGE & FINANCING ==========
  
  /** Down payment as percentage of home price (5-50%, typical: 20%) */
  downPaymentPercent: number;
  
  /** Mortgage interest rate in percent (2-8%, varies by country) */
  mortgageRatePercent: number;
  
  /** Mortgage repayment period in years (5-40, typical: 25-30) */
  mortgagePeriodYears: number;
  
  // ========== BUYING COSTS ==========
  
  /** Closing costs as percentage of purchase price (3-14% depending on country)
   * Includes: notary fees, registration, transfer taxes, title insurance, etc.
   */
  closingCostsPercent: number;
  
  /** One-time renovation or EPC improvement cost in EUR */
  renovationCost: number;
  
  /** Monthly HOA fees, building maintenance, or property management fee in EUR */
  hoaMonthlyFee: number;
  
  /** Annual maintenance/repair costs as percentage of home value (0.5-2% typical) */
  maintenanceAnnualPercent: number;
  
  /** Annual property tax as percentage of home value (varies significantly by country) */
  propertyTaxAnnualPercent: number;
  
  /** Selling costs as percentage of sale price (2-6%, mostly agent fees)
   * Paid when selling property at end of analysis period
   */
  sellingCostsPercent: number;
  
  /** Tax deduction for mortgage interest as percentage (0-100%, varies by country)
   * Most EU countries: 0% | USA: can deduct interest portion of payments
   */
  mortgageInterestDeductionPercent: number;
  
  // ========== RENTING COSTS ==========
  
  /** First year monthly rent in EUR */
  monthlyRent: number;
  
  /** Expected annual rent growth percentage (1-3% typical) */
  rentGrowthAnnualPercent: number;
  
  // ========== INVESTMENT ASSUMPTIONS ==========
  
  /** Expected annual investment return percentage (7-10% for stock market)
   * Based on historical S&P 500 average with dividends reinvested
   */
  investmentReturnAnnual: number;

  /** Capital gains tax rate on investment returns (0-50%)
   * Typically 15-20% for long-term capital gains in most countries
   */
  investmentTaxRatePercent: number;
}

/**
 * Yearly financial snapshot for both buying and renting paths
 * 
 * Contains detailed breakdown of costs, assets, and net worth for each year of analysis
 */
export interface YearlyData {
  /** Year number (0 = start, 1 = end of year 1, etc.) */
  year: number;
  
  // ========== BUYING PATH DATA ==========
  
  /** Current home value including appreciation */
  homeValue: number;
  
  /** Outstanding mortgage balance (decreases over time) */
  mortgageBalance: number;
  
  /** Equity = homeValue - mortgageBalance */
  buyingNetWorth: number;
  
  /** Cumulative spending on buying (down payment + all annual costs) */
  buyerCumulativeExpenses: number;
  
  /** Monthly cost of homeownership in this year */
  buyerMonthlyExpense: number;
  
  // ========== RENTING PATH DATA ==========
  
  /** Cumulative rent payments from start */
  rentCumulativeExpenses: number;
  
  /** Monthly rent in this year (growing with inflation) */
  renterMonthlyRent: number;
  
  /** Value of investment portfolio (initial capital + monthly savings grown) */
  investmentPortfolio: number;
  
  /** Total net worth from renting = investmentPortfolio */
  rentingNetWorth: number;
  
  // ========== COMPARATIVE METRICS ==========
  
  /** Monthly savings/spending difference (positive = buying cheaper than renting) */
  monthlyDelta: number;
}

/**
 * Final results of the buy vs rent analysis
 * 
 * Contains all yearly data points, break-even analysis, and final verdict
 */
export interface BuyVsRentResult {
  /** Array of yearly financial snapshots (0 to durationYears inclusive) */
  yearlyData: YearlyData[];
  
  /** Year when renting net worth equals buying net worth (null if never) */
  breakEvenYear: number | null;
  
  /** True if buying produces higher final net worth */
  buyingWins: boolean;
  
  /** Net worth from buying path at final year (home equity) */
  finalBuyingNetWorth: number;
  
  /** Net worth from renting path at final year (investment portfolio) */
  finalRentingNetWorth: number;
  
  /** Absolute difference: buyingNetWorth - rentingNetWorth
   * Positive = buying wins by this amount
   * Negative = renting wins by absolute value of this amount
   */
  difference: number;
  
  /** Total cash spent in buying scenario (down payment + annual costs + selling fees) */
  totalBuyingCosts: number;
  
  /** Total cash spent in renting scenario (all rent payments) */
  totalRentingCosts: number;
}

/**
 * Calculate monthly mortgage payment using standard amortization formula
 * 
 * Formula: Monthly Payment = P × [r(1+r)^n] / [(1+r)^n - 1]
 * 
 * @param principal - Total loan amount in EUR
 * @param annualRate - Annual interest rate (e.g., 3.5 for 3.5%)
 * @param years - Mortgage period in years
 * @returns Monthly payment amount in EUR
 * 
 * @example
 * calculateMonthlyMortgage(300000, 3.5, 25) // ~1400 EUR/month
 */
function calculateMonthlyMortgage(
  principal: number,
  annualRate: number,
  years: number
): number {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;

  if (monthlyRate === 0) {
    return principal / numberOfPayments;
  }

  return (
    (principal *
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  );
}

/**
 * Calculate remaining mortgage balance after N months of payments
 * 
 * Formula: Balance = P × [(1+r)^n - (1+r)^m] / [(1+r)^n - 1]
 * 
 * @param originalPrincipal - Original loan amount in EUR
 * @param monthlyPayment - Monthly payment amount
 * @param annualRate - Annual interest rate (e.g., 3.5 for 3.5%)
 * @param monthsPaid - Number of months of payments made
 * @returns Outstanding mortgage balance in EUR
 * 
 * @example
 * calculateRemainingMortgage(300000, 1400, 3.5, 60) // Balance after 5 years
 */
function calculateRemainingMortgage(
  originalPrincipal: number,
  monthlyPayment: number,
  annualRate: number,
  monthsPaid: number
): number {
  const monthlyRate = annualRate / 100 / 12;

  if (monthlyRate === 0) {
    return Math.max(0, originalPrincipal - monthlyPayment * monthsPaid);
  }

  return (
    originalPrincipal * Math.pow(1 + monthlyRate, monthsPaid) -
    monthlyPayment *
      (Math.pow(1 + monthlyRate, monthsPaid) - 1) /
      monthlyRate
  );
}

export function useBuyVsRent(input: BuyVsRentInput): BuyVsRentResult {
  /**
   * Buy vs Rent Analysis using NYT "Opportunity Cost" Methodology
   * 
   * BUYER SCENARIO (Equity Path):
   * - Initial investment: Down payment + Closing costs
   * - Home value grows annually at appreciation rate
   * - Mortgage balance decreases through amortization
   * - Final net worth = Home value - Remaining mortgage - Selling costs
   * 
   * RENTER SCENARIO (S&P 500 Path):
   * - Initial brokerage: Equal to buyer's initial cash out
   * - Monthly surplus: Buyer's monthly costs - Renter's monthly costs
   * - If buyer costs are higher, renter invests the difference
   * - Brokerage grows monthly at S&P 500 return rate
   * - Final net worth: Total brokerage account value
   * 
   * Winner: Whichever path has higher net worth at end of analysis period
   */
  const result = useMemo(() => {
    const yearlyData: YearlyData[] = [];
    let breakEvenYear: number | null = null;

    // ===== INITIAL SETUP =====
    const downPayment = input.homePrice * (input.downPaymentPercent / 100);
    const closingCosts = input.homePrice * (input.closingCostsPercent / 100);
    const initialCashOut = downPayment + closingCosts + input.renovationCost;
    
    // Mortgage calculations
    const mortgagePrincipal = input.homePrice - downPayment;
    const monthlyMortgagePayment = calculateMonthlyMortgage(
      mortgagePrincipal,
      input.mortgageRatePercent,
      input.mortgagePeriodYears
    );

    // ===== MONTHLY COST BREAKDOWNS =====
    // Buyer monthly costs
    const monthlyMaintenanceBase = (input.homePrice * input.maintenanceAnnualPercent) / 100 / 12;
    const monthlyPropertyTaxBase = (input.homePrice * input.propertyTaxAnnualPercent) / 100 / 12;

    // ===== STARTING VALUES =====
    let homeValue = input.homePrice;
    let mortgageBalance = mortgagePrincipal;
    let brokerageBalance = initialCashOut; // Renter's starting portfolio
    let totalBuyerCashOutflow = initialCashOut;
    let totalRenterCashOutflow = 0;

    // ===== YEAR-BY-YEAR SIMULATION =====
    for (let year = 0; year <= input.durationYears; year++) {
      // ===== BUYER PATH: HOME VALUE AND MORTGAGE =====
      // Home appreciates
      homeValue = input.homePrice * Math.pow(1 + input.homeAppreciationAnnual / 100, year);

      // Calculate remaining mortgage balance using amortization
      const monthsPaid = Math.min(year * 12, input.mortgagePeriodYears * 12);
      mortgageBalance = calculateRemainingMortgage(
        mortgagePrincipal,
        monthlyMortgagePayment,
        input.mortgageRatePercent,
        monthsPaid
      );
      mortgageBalance = Math.max(0, mortgageBalance);

      // ===== MONTHLY COST CALCULATIONS FOR THIS YEAR =====
      // Rent grows annually
      const monthlyRentThisYear = 
        input.monthlyRent * Math.pow(1 + input.rentGrowthAnnualPercent / 100, year);

      // Buyer's monthly housing costs (mortgage + maintenance + tax + HOA)
      // Note: Mortgage interest deduction is applied as a lump sum tax benefit at tax filing, not as monthly cost reduction
      const buyerMonthlyHousingCost =
        monthlyMortgagePayment + monthlyMaintenanceBase + monthlyPropertyTaxBase + input.hoaMonthlyFee;

      // ===== OPPORTUNITY COST: MONTHLY SURPLUS/DEFICIT =====
      // If buyer costs > renter costs, the renter invests the difference
      const monthlyOpportunityCost = Math.max(0, buyerMonthlyHousingCost - monthlyRentThisYear);
      const annualOpportunityCost = monthlyOpportunityCost * 12;

      // ===== UPDATE YEARLY TOTALS =====
      if (year > 0) {
        // Renter's annual rent outflow
        const annualRentPayment = monthlyRentThisYear * 12;
        totalRenterCashOutflow += annualRentPayment;

        // Renter's brokerage grows at S&P 500 rate and receives new monthly contributions
        // Using monthly compounding for precision
        for (let month = 0; month < 12; month++) {
          // Apply monthly investment return (after tax)
          const monthlyReturn = input.investmentReturnAnnual / 100 / 12;
          const afterTaxReturn = monthlyReturn * (1 - input.investmentTaxRatePercent / 100);
          brokerageBalance *= (1 + afterTaxReturn);
          
          // Add monthly opportunity cost (monthly surplus from not buying)
          brokerageBalance += monthlyOpportunityCost;
        }

        // Buyer's annual costs
        totalBuyerCashOutflow += buyerMonthlyHousingCost * 12;
      }

      // ===== CALCULATE NET WORTH AT END OF YEAR =====
      // Buyer's net worth (Equity Path)
      let buyerNetWorth: number;
      if (year === input.durationYears) {
        // At final year, subtract selling costs
        const sellingCostsAmount = homeValue * (input.sellingCostsPercent / 100);
        buyerNetWorth = homeValue - mortgageBalance - sellingCostsAmount;
      } else {
        // Before final year, just equity
        buyerNetWorth = homeValue - mortgageBalance;
      }

      // Renter's net worth (S&P 500 Path)
      const renterNetWorth = brokerageBalance;

      // ===== DETECT BREAK-EVEN YEAR =====
      if (breakEvenYear === null && year > 0 && buyerNetWorth > renterNetWorth) {
        breakEvenYear = year;
      }

      // ===== RECORD YEARLY DATA =====
      yearlyData.push({
        year,
        homeValue,
        mortgageBalance,
        buyingNetWorth: buyerNetWorth,
        buyerCumulativeExpenses: totalBuyerCashOutflow,
        buyerMonthlyExpense: buyerMonthlyHousingCost,
        rentCumulativeExpenses: totalRenterCashOutflow,
        renterMonthlyRent: monthlyRentThisYear,
        investmentPortfolio: brokerageBalance,
        rentingNetWorth: renterNetWorth,
        monthlyDelta: monthlyOpportunityCost,
      });
    }

    // ===== CALCULATE FINAL RESULTS =====
    const finalYear = yearlyData[input.durationYears];
    
    // Apply mortgage interest deduction as a tax benefit
    // Calculate total interest paid over the loan period and apply tax benefit
    let totalInterestPaid = 0;
    let tempBalance = mortgagePrincipal;
    for (let m = 0; m < Math.min(input.durationYears * 12, input.mortgagePeriodYears * 12); m++) {
      const monthlyRate = input.mortgageRatePercent / 100 / 12;
      const interestPayment = tempBalance * monthlyRate;
      totalInterestPaid += interestPayment;
      const principalPayment = monthlyMortgagePayment - interestPayment;
      tempBalance -= principalPayment;
    }
    
    const mortgageInterestTaxBenefit = totalInterestPaid * (input.mortgageInterestDeductionPercent / 100);
    
    const finalBuyingNetWorth = finalYear.buyingNetWorth + mortgageInterestTaxBenefit;
    const finalRentingNetWorth = finalYear.rentingNetWorth;
    const buyingWins = finalBuyingNetWorth > finalRentingNetWorth;

    return {
      yearlyData,
      breakEvenYear,
      buyingWins,
      finalBuyingNetWorth,
      finalRentingNetWorth,
      difference: finalBuyingNetWorth - finalRentingNetWorth,
      totalBuyingCosts: finalYear.buyerCumulativeExpenses,
      totalRentingCosts: finalYear.rentCumulativeExpenses,
    };
  }, [input]);

  return result;
}
