# Stealth Investor Methodology

Detailed explanation of the calculations and assumptions used in the Buy vs Rent analysis.

## Table of Contents
1. [Buying Path Calculation](#buying-path-calculation)
2. [Renting + Investing Path Calculation](#renting--investing-path-calculation)
3. [Comparison & Results](#comparison--results)
4. [Key Formulas](#key-formulas)
5. [Assumptions & Limitations](#assumptions--limitations)

---

## Buying Path Calculation

### Initial Investment

**Down Payment**: 
```
downPayment = homePrice × (downPaymentPercent / 100)
```

**Closing Costs** (country-specific):
```
closingCosts = homePrice × (closingCostsPercent / 100)
```

**Total Initial Investment**:
```
initialInvestment = downPayment + closingCosts + renovationCost
```

### Mortgage Calculation

**Loan Amount**:
```
loanAmount = homePrice - downPayment
```

**Monthly Payment** (using amortization formula):
```
monthlyRate = (mortgageRatePercent / 100) / 12
monthlyPayment = loanAmount × [monthlyRate × (1 + monthlyRate)^n] / [(1 + monthlyRate)^n - 1]

where:
  n = mortgagePeriodYears × 12 (total number of months)
```

**Remaining Balance** after M months:
```
remainingBalance = loanAmount × [(1 + r)^n - (1 + r)^m] / [(1 + r)^n - 1]

where:
  r = monthlyRate
  n = total months in mortgage
  m = months paid
```

### Annual Costs

**Property Tax**:
```
propertyTax(year) = homeValue(year) × (propertyTaxAnnualPercent / 100)
```

**Maintenance**:
```
maintenance(year) = homeValue(year) × (maintenanceAnnualPercent / 100)
```

**HOA/Fees**:
```
hoaFees(year) = hoaMonthlyFee × 12
```

**Total Annual Costs**:
```
annualCosts = (monthlyPayment × 12) + propertyTax + maintenance + hoaFees - taxBenefit
```

**Tax Benefit** (if applicable):
```
taxBenefit = (monthlyPayment × interestPortion) × 12 × (mortgageInterestDeductionPercent / 100)
```

### Property Appreciation

**Home Value**:
```
homeValue(year) = homePrice × (1 + homeAppreciationAnnual / 100)^year
```

### Selling the Property

**Sale Price**:
```
salePrice = homeValue(finalYear)
```

**Selling Costs**:
```
sellingCosts = salePrice × (sellingCostsPercent / 100)
```

**Net Proceeds**:
```
netProceeds = salePrice - remainingMortgage - sellingCosts
```

### Buying Net Worth

**Equity at Final Year**:
```
equity = homeValue(finalYear) - remainingMortgage(finalYear)
```

**Total Spending Over Period**:
```
totalBuyingCosts = initialInvestment + sum(annualCosts for each year)
```

**Net Worth**:
```
buyingNetWorth = equity
```

---

## Renting + Investing Path Calculation

### Initial Investment

Same as buying initial investment (down payment + closing costs):
```
initialCapital = homePrice × (downPaymentPercent / 100) + 
                 homePrice × (closingCostsPercent / 100) + 
                 renovationCost
```

This capital is invested in a portfolio earning `investmentReturnAnnual`.

### Monthly Rent

**Year 1**:
```
monthlyRent = rentAmount
```

**Year N** (with growth):
```
monthlyRent(year) = rentAmount × (1 + rentGrowthAnnual / 100)^(year - 1)
```

### Monthly Savings (Investable Surplus)

**Monthly Delta**:
```
monthlyMortgagePayment = loanAmount / (mortgagePeriodYears × 12) × ... [actual amortization]
monthlyPropertyCosts = (propertyTax + maintenance) / 12 + hoaMonthlyFee

monthlySavings = max(0, monthlyMortgagePayment + monthlyPropertyCosts - monthlyRent)
```

If renting is more expensive than buying costs, the difference is "additional spending" (no surplus).

### Investment Growth

**Initial Investment Growth**:
```
portfolio(year) = initialCapital × (1 + investmentReturn / 100)^year
```

**Monthly Contributions with Compound Growth**:
```
For each month M:
  monthlyReturn = investmentReturn / 12 / 100
  portfolio += monthlySavings(M) × (1 + monthlyReturn)^(remainingMonths)
```

**Total Portfolio Value**:
```
rentingNetWorth = initialCapital × (1 + r)^years + 
                  sum(monthlySavings(M) × (1 + r)^(yearsRemaining))
```

### Total Spending

**Annual Rent**:
```
annualRent(year) = monthlyRent(year) × 12
```

**Total Renting Costs Over Period**:
```
totalRentingCosts = sum(annualRent for each year)
```

---

## Comparison & Results

### Financial Advantage

```
difference = buyingNetWorth - rentingNetWorth

if (difference > 0):
  buying wins by difference
else:
  renting wins by abs(difference)
```

### Break-Even Year

```
Year N where:
rentingNetWorth(N) ≈ buyingNetWorth(N)

Search from year 1 to final year for first intersection
If buyingNetWorth never catches up, breakEvenYear = null
```

### Final Verdict

```
if (buyingNetWorth > rentingNetWorth):
  verdict = "Buying is better"
else if (rentingNetWorth > buyingNetWorth):
  verdict = "Renting + Investing is better"
else:
  verdict = "Results are equal"
```

---

## Key Formulas

### Mortgage Amortization

Standard mortgage amortization formula (fixed-rate):

```
Monthly Payment = P × [r(1+r)^n] / [(1+r)^n - 1]

where:
  P = Principal (loan amount)
  r = Monthly interest rate (annual rate / 12 / 100)
  n = Total number of months

Principal Remaining = P × [(1+r)^n - (1+r)^m] / [(1+r)^n - 1]

where:
  m = Number of months paid
  
First Month Interest = P × r
First Month Principal = Monthly Payment - First Month Interest

For subsequent months:
  Interest = Remaining Balance × r
  Principal = Monthly Payment - Interest
  New Balance = Remaining Balance - Principal
```

### Compound Interest (Investments)

```
Future Value = Present Value × (1 + rate)^time

For monthly compounding:
  Monthly Rate = Annual Rate / 12 / 100
  FV = PV × (1 + monthlyRate)^months

For regular monthly contributions:
  FV = PMT × [((1 + r)^n - 1) / r]

where:
  PMT = Monthly contribution
  r = Monthly rate
  n = Number of months
```

### Inflation Adjustment

Rent grows at specified rate annually:
```
rent(year) = rent(year-1) × (1 + rentGrowthAnnual / 100)
```

Property appreciates at specified rate:
```
value(year) = value(year-1) × (1 + homeAppreciationAnnual / 100)
```

---

## Assumptions & Limitations

### Base Assumptions

1. **Mortgage Type**: 30-year fixed-rate mortgages
   - Interest rate is constant throughout mortgage term
   - No adjustable rates or balloon payments considered

2. **Investment Returns**: Historical average of 7-10% annually
   - Based on S&P 500 historical returns including dividends
   - Assumes full market participation (no manager fees deducted)
   - Assumes reinvestment of all dividends

3. **Property Appreciation**: Typically 2-3% annually
   - Based on historical real estate appreciation
   - Varies significantly by region
   - Does not account for market cycles

4. **Tax Treatment**: Country-specific defaults
   - Property taxes use country averages
   - Mortgage interest deduction varies by country
   - Investment income taxes not deducted

5. **Rent Growth**: Typically 2-3% annually
   - Based on historical inflation trends
   - Varies by market and economic conditions

### What We DON'T Include

These factors could significantly impact results but are not modeled:

1. **Income Growth**: Salaries increasing over time
2. **Inflation**: General price increases (partially offset by rent/appreciation growth)
3. **Insurance Costs**: Property and liability insurance premiums
4. **Utilities**: Water, electricity, gas costs
5. **Furnishing Costs**: Furniture and appliances for owned home
6. **Transaction Costs**: Moving costs, inspection fees
7. **Opportunity Costs**: Lost returns on down payment until buying
8. **Market Volatility**: Stock market ups and downs
9. **Interest Rate Changes**: Mortgage rate refinancing opportunities
10. **Capital Gains Taxes**: Taxes on investment gains when selling
11. **Liquidity Constraints**: Difficulty selling property quickly
12. **Emotional Factors**: Pride of ownership, stability of renting

### Key Limitations

- **Simplified Model**: Real estate and investment markets are complex
- **Country Averages**: Local conditions can vary significantly
- **No Scenario Analysis**: Doesn't model best/worst case scenarios
- **Historical Data**: Past performance doesn't guarantee future results
- **Tax Simplification**: Real tax situations are more nuanced
- **Fixed Assumptions**: Parameters don't change during analysis period

### When Results May Be Misleading

1. **Very Long Timeframes** (30+ years): Assumptions become less reliable
2. **Rapidly Appreciating Markets**: Historical rates may not continue
3. **High-Equity Markets**: 7% returns could be conservative or optimistic depending on market
4. **Rent-Controlled Areas**: Rent growth assumptions may not apply
5. **High-Tax Jurisdictions**: Deduction benefits could be significant
6. **First-Time Buyers**: May qualify for special programs not modeled

---

## Validation & Sanity Checks

Before trusting results, verify:

1. **Mortgage Payment** is reasonable for the loan amount and rate
   - Example: $300,000 loan at 4% = ~$1,433/month ✓

2. **Home Appreciation** is realistic for the region
   - Example: 3% annually is historical average ✓

3. **Investment Returns** are appropriate for asset class
   - Example: 7-10% for stock market is historical average ✓

4. **Break-Even Year** makes sense
   - Example: Buying expensive upfront, should break-even in 5-15 years typically ✓

5. **Final Net Worth** values are in expected ranges
   - Buying: Should be positive equity (home value - mortgage)
   - Renting: Should be reasonable investment portfolio growth ✓

---

## Recommended Usage

1. **Run Multiple Scenarios**: Try best/worst case assumptions
2. **Compare with Advisor**: Discuss with financial/real estate professional
3. **Local Research**: Adjust assumptions for your specific location
4. **Tax Planning**: Consult tax advisor for deduction benefits
5. **Long-term Planning**: Consider life goals beyond financial analysis
6. **Regular Updates**: Recalculate annually as circumstances change

---

## Further Reading

- Mortgage Amortization: https://en.wikipedia.org/wiki/Amortization_schedule
- Compound Interest: https://www.investopedia.com/terms/c/compound_interest.asp
- S&P 500 Historical Returns: https://www.investopedia.com/ask/answers/050415/what-average-annual-return-sp-500.asp
- Real Estate Appreciation: https://www.realtor.com/research/data/
