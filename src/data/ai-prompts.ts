export const AI_PROMPTS: Record<string, string[]> = {
  // Math
  "math/basic": [
    "What is 1234 × 5678?",
    "Calculate 15% of 250",
    "What is the square root of 144?",
  ],
  "math/percentage": [
    "What is 15% of 200?",
    "30 is what percent of 150?",
    "Percentage change from 80 to 100",
  ],
  "math/scientific": [
    "What is sin(45 degrees)?",
    "Calculate log base 10 of 1000",
    "What is e raised to the power of 3?",
  ],
  "math/fraction": [
    "Simplify 24/36 to lowest terms",
    "What is 3/4 + 2/5?",
    "Convert 0.625 to a fraction",
  ],
  "math/prime": [
    "Is 97 a prime number?",
    "List all prime numbers between 1 and 50",
    "What is the prime factorization of 360?",
  ],
  "math/square-root": [
    "What is the square root of 225?",
    "Calculate the cube root of 729",
    "Simplify square root of 72",
  ],
  "math/gpa": [
    "Convert 3.7 GPA to percentage",
    "What letter grade is a 3.5 GPA?",
    "Calculate GPA from grades A, B+, A-, B",
  ],
  "math/grade": [
    "What is my grade if I scored 85 out of 100?",
    "Calculate weighted average: Math 90 (40%), Science 85 (30%), English 92 (30%)",
    "What score do I need on the final to get an A?",
  ],
  "math/graphing": [
    "Graph y = x^2 - 4x + 3",
    "Plot sin(x) and cos(x) on the same graph",
    "What does the graph of y = 1/x look like?",
  ],
  "math/discount": [
    "What is the price after 25% off $80?",
    "Calculate double discount: 20% off then 10% off $100",
    "Original price was $60, sale price is $45. What is the discount?",
  ],
  "math/average": [
    "Average of 85, 90, 78, 92, 88",
    "What is the weighted average of 90 (weight 3) and 80 (weight 2)?",
    "Median of 12, 15, 11, 19, 14",
  ],
  "math/solver": [
    "Solve 2x + 5 = 15",
    "Solve the quadratic equation x^2 - 5x + 6 = 0",
    "What is x if 3x - 7 = 2x + 4?",
  ],
  "math/password-strength": [
    "How strong is the password 'MyP@ssw0rd!'?",
    "Generate a strong 16-character password",
    "How long would it take to crack an 8-character password?",
  ],

  // Finance
  "finance/loan": [
    "Monthly payment for $200,000 loan at 6% for 30 years",
    "How much interest on a $50,000 loan at 5% for 10 years?",
    "Compare 15-year vs 30-year mortgage payments",
  ],
  "finance/mortgage": [
    "Monthly mortgage for a $350,000 home with 20% down at 6.5%",
    "How much house can I afford with $3,000/month budget?",
    "Total interest paid on a $250,000 mortgage at 7% for 30 years",
  ],
  "finance/compound-interest": [
    "Compound interest on $10,000 at 5% for 10 years",
    "How long to double my money at 7% interest?",
    "$500/month invested at 8% return for 20 years",
  ],
  "finance/savings": [
    "How much will I have if I save $200/month for 5 years at 4%?",
    "How long to save $50,000 at $1,000/month with 3% interest?",
    "Savings goal: $100,000 in 10 years, how much per month?",
  ],
  "finance/interest-rate": [
    "What interest rate turns $5,000 into $8,000 in 5 years?",
    "Effective annual rate for 5% compounded monthly",
    "APR vs APY for 6% compounded quarterly",
  ],
  "finance/roi": [
    "ROI if I bought at $50 and sold at $75",
    "Annualized return on $10,000 invested 3 years ago now worth $14,000",
    "Which is better: 15% return in 2 years or 25% in 4 years?",
  ],
  "finance/salary": [
    "Convert $75,000 annual salary to hourly rate",
    "What is $25/hour as annual salary?",
    "Monthly take-home from $60,000 salary",
  ],
  "finance/tip": [
    "Tip calculator: 18% tip on $85 bill split 3 ways",
    "How much is 20% tip on $120?",
    "What tip percentage for $12 tip on $67 bill?",
  ],
  "finance/gold": [
    "How much is 10 grams of 24k gold worth today?",
    "Value of 1 ounce of gold in USD",
    "Convert 22k gold price to 24k equivalent",
  ],
  "finance/payment": [
    "Monthly payment for $15,000 car loan at 4.5% for 5 years",
    "How much can I borrow with $500/month payment at 6%?",
    "Payment schedule for $30,000 loan at 5% for 3 years",
  ],
  "finance/investment": [
    "Future value of $10,000 invested at 8% for 20 years",
    "How much to invest monthly to reach $1 million by age 65?",
    "Compare investing $500/month vs $6,000 lump sum annually",
  ],
  "finance/inflation": [
    "What will $100 be worth in 10 years with 3% inflation?",
    "Purchasing power of $50,000 in 1990 vs today",
    "Real return if nominal return is 8% and inflation is 3%?",
  ],
  "finance/rent-compare": [
    "Is it cheaper to rent at $1,500/month or buy a $300,000 home?",
    "Break-even point: renting vs buying with $50,000 down payment",
    "Compare renting $2,000/month vs $400,000 mortgage at 6.5%",
  ],
  "finance/acquisition-tax": [
    "Acquisition tax on a $500,000 property",
    "How much tax for buying a $300,000 apartment?",
    "First-time home buyer tax benefits calculation",
  ],
  "finance/capital-gains-tax": [
    "Capital gains tax on selling a stock bought at $50 sold at $120",
    "Tax on real estate profit of $100,000 held for 3 years",
    "Long-term vs short-term capital gains on $50,000 profit",
  ],
  "finance/severance-pay": [
    "Severance pay for 5 years of employment with $4,000/month salary",
    "How is severance calculated for 10 years service?",
    "Minimum severance pay by law for 3 years of work",
  ],
  "finance/housing-points": [
    "Housing subscription points needed for a new apartment",
    "How long to accumulate enough housing points?",
    "Calculate my housing priority score",
  ],
  "finance/auto-loan": [
    "Auto loan payment for $35,000 car at 5.9% for 60 months",
    "How much car can I afford with $600/month payment?",
    "Total cost of a $25,000 auto loan at 4.5% for 5 years",
  ],
  "finance/car-payment": [
    "Monthly car payment for $28,000 with $5,000 down at 5%",
    "Is 0% financing better than $3,000 cash rebate?",
    "Car payment comparison: 48 months vs 60 months",
  ],
  "finance/personal-loan": [
    "Monthly payment for $10,000 personal loan at 8% for 3 years",
    "Total interest on a $20,000 personal loan at 12%",
    "Best personal loan amount for $400/month budget",
  ],
  "finance/paycheck": [
    "Net paycheck from $5,000 gross with 25% tax rate",
    "How much is my biweekly paycheck from $70,000 salary?",
    "Paycheck after deductions: $4,500 gross, 22% tax, 6% 401k",
  ],
  "finance/pay": [
    "Convert $30/hour to annual salary",
    "Overtime pay for 50 hours at $22/hour",
    "How much is $85,000/year per biweekly paycheck?",
  ],

  // Health
  "health/bmi": [
    "BMI for someone 175cm tall weighing 70kg",
    "Is a BMI of 23 normal?",
    "What should I weigh at 180cm for normal BMI?",
  ],
  "health/calorie": [
    "How many calories should a 30-year-old male eat to lose weight?",
    "Daily calories for 165cm, 60kg, moderately active female",
    "Calorie deficit needed to lose 1 pound per week",
  ],
  "health/tdee": [
    "TDEE for 25-year-old male, 180cm, 80kg, exercises 3x/week",
    "How many calories do I burn daily if I'm sedentary?",
    "TDEE difference between moderate and very active lifestyle",
  ],
  "health/body-fat": [
    "Estimate body fat for male, waist 34in, neck 16in, height 5'10\"",
    "What is a healthy body fat percentage for women?",
    "Navy method body fat calculation for 180cm, waist 85cm, neck 38cm",
  ],
  "health/ideal-weight": [
    "Ideal weight for 5'10\" male",
    "What is the ideal weight range for 165cm female?",
    "Compare ideal weight formulas for 175cm",
  ],
  "health/due-date": [
    "Due date if last period was March 15, 2026",
    "How many weeks pregnant am I if LMP was February 1?",
    "Pregnancy due date from conception date April 1",
  ],
  "health/one-rep-max": [
    "Estimate 1RM if I bench 185 lbs for 5 reps",
    "What is my one rep max for squat at 225 lbs for 3 reps?",
    "Training percentages based on 300 lb deadlift max",
  ],
  "health/bac": [
    "BAC for 180 lb male after 3 beers in 2 hours",
    "How long until my BAC reaches 0 after 4 drinks?",
    "Blood alcohol level for 130 lb female after 2 glasses of wine",
  ],
  "health/sleep": [
    "Best bedtime if I need to wake up at 6:30 AM",
    "How many sleep cycles in 7.5 hours?",
    "What time should I wake up if I go to bed at 11 PM?",
  ],

  // Date
  "date/age": [
    "How old am I if I was born on July 4, 1995?",
    "Days between January 1, 2000 and today",
    "How many days old is someone born in 1990?",
  ],
  "date/difference": [
    "Days between March 15 and December 25",
    "How many weeks between two dates?",
    "Months between January 2024 and June 2026",
  ],
  "date/dday": [
    "How many days until Christmas 2026?",
    "Days until New Year 2027",
    "Countdown to July 4, 2026",
  ],
  "date/time-duration": [
    "How many hours between 9:30 AM and 5:15 PM?",
    "Duration from 2:45 PM to 11:00 PM",
    "Total minutes in 3 hours and 47 minutes",
  ],
  "date/annual-leave": [
    "Annual leave calculation for 3 years of service",
    "How many vacation days do I get after 5 years?",
    "Remaining leave if I used 8 of 15 days",
  ],
  "date/military-discharge": [
    "Military discharge date for enlistment April 2025, 18 months",
    "D-day countdown for military service ending",
    "How many days left for 21-month military service?",
  ],
  "date/time": [
    "What time is it in Tokyo if it's 3 PM in New York?",
    "Time difference between London and Seoul",
    "Convert 14:30 UTC to EST",
  ],
  "date/hours": [
    "How many work hours between Monday 9 AM and Friday 5 PM?",
    "Total hours in a 40-hour work week with 1 hour lunch",
    "Hours worked from 8:30 AM to 6:15 PM",
  ],
  "date/day": [
    "What day of the week was July 20, 1969?",
    "What day will January 1, 2030 be?",
    "Day of the week for my birthday December 15, 1998",
  ],

  // Conversion
  "conversion/length": [
    "Convert 5 feet 11 inches to centimeters",
    "How many meters in a mile?",
    "100 yards to meters",
  ],
  "conversion/weight": [
    "Convert 70 kg to pounds",
    "How many ounces in 2.5 kg?",
    "150 lbs to kilograms",
  ],
  "conversion/temperature": [
    "Convert 98.6°F to Celsius",
    "What is 37°C in Fahrenheit?",
    "200°C to Fahrenheit for baking",
  ],
  "conversion/currency": [
    "Convert 100 USD to EUR",
    "How much is 1000 KRW in USD?",
    "Exchange rate for JPY to USD",
  ],
  "conversion/speed": [
    "Convert 100 km/h to mph",
    "How fast is Mach 1 in km/h?",
    "60 mph to meters per second",
  ],
  "conversion/energy": [
    "Convert 500 calories to kilojoules",
    "How many watts in 1 horsepower?",
    "1000 BTU to kilowatt-hours",
  ],
  "conversion/fuel-cost": [
    "Fuel cost for 500 km trip at 8L/100km with gas at $1.50/L",
    "Compare fuel cost: 30 MPG vs 40 MPG for 10,000 miles",
    "Cost per mile at $3.50/gallon and 25 MPG",
  ],

  // Tax
  "tax/income-tax": [
    "Federal income tax on $75,000 salary",
    "Tax bracket for $120,000 annual income",
    "Effective tax rate for $50,000 taxable income",
  ],
  "tax/sales-tax": [
    "Sales tax on $500 purchase in California (7.25%)",
    "Price before tax if total is $107.50 with 7.5% tax",
    "Compare sales tax: $200 item in Texas vs New York",
  ],
  "tax/vat": [
    "VAT on $1,000 purchase at 20%",
    "Price excluding 10% VAT from $110 total",
    "VAT refund amount on $500 at 19% rate",
  ],
  "tax/tax-2026": [
    "Estimate my 2026 income tax for $80,000 salary",
    "2026 standard deduction for married filing jointly",
    "Tax changes in 2026 compared to 2025",
  ],

  // India
  "india/emi": [
    "EMI for ₹50 lakh home loan at 8.5% for 20 years",
    "Car loan EMI for ₹10 lakh at 9% for 5 years",
    "How much can I borrow with ₹30,000 EMI at 8%?",
  ],
  "india/gst": [
    "GST on ₹10,000 at 18%",
    "Price before GST if total is ₹11,800 with 18% GST",
    "IGST vs CGST+SGST calculation on ₹50,000",
  ],
  "india/sip": [
    "SIP returns for ₹5,000/month at 12% for 10 years",
    "How much SIP needed to reach ₹1 crore in 15 years?",
    "Compare SIP of ₹10,000 at 10% vs 12% returns",
  ],
  "india/fd": [
    "FD maturity for ₹5 lakh at 7.5% for 3 years",
    "Compare FD rates: 7% quarterly vs 6.9% monthly compounding",
    "Tax on FD interest of ₹40,000 for senior citizen",
  ],
  "india/ppf": [
    "PPF maturity for ₹1.5 lakh/year investment for 15 years",
    "PPF interest calculation at 7.1% rate",
    "How much PPF balance after 10 years of ₹50,000 annual deposit?",
  ],
  "india/hra": [
    "HRA exemption for ₹20,000 HRA, ₹15,000 rent, ₹50,000 salary in Delhi",
    "How to calculate HRA tax benefit?",
    "HRA deduction for metro vs non-metro city",
  ],
};
