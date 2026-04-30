// AI Guide page examples per locale.
// Each category surfaces 3 high-signal examples to keep the home page focused
// and avoid AdSense "low-value content" flags. Tax category prioritises
// India-specific examples to align with the primary target market.

const EXAMPLES_EN: Record<string, string[]> = {
  math: [
    "What is 15% of 2500?",
    "Solve 2x + 5 = 17",
    "What is the area of a circle with radius 7?",
  ],
  finance: [
    "Monthly payment for $300,000 mortgage at 6.5% for 30 years",
    "How much will $10,000 grow at 7% for 20 years?",
    "Monthly car payment for $35,000 at 4.9% for 60 months",
  ],
  health: [
    "BMI for 175cm, 70kg",
    "How many calories does a 30-year-old male need per day?",
    "TDEE for a 25-year-old female, 160cm, 55kg, moderate activity",
  ],
  date: [
    "How many days until Christmas 2026?",
    "How old am I if I was born on March 5, 1990?",
    "How many days between January 15 and August 22?",
  ],
  conversion: [
    "Convert 100 miles to kilometers",
    "Convert 72°F to Celsius",
    "Convert 200 pounds to kilograms",
  ],
  tax: [
    "Income tax on ₹12 lakh salary in FY 2025-26 new regime",
    "Old vs new tax regime for ₹15 lakh salary in India",
    "In-hand salary for ₹12 LPA CTC in Mumbai",
  ],
  daily: [
    "Split a $120 restaurant bill between 4 people with 18% tip",
    "Gas cost for a 350-mile road trip at 28 mpg with $3.50/gallon gas",
    "Monthly cost of a $5.50 daily coffee habit",
  ],
};

const EXAMPLES_KO: Record<string, string[]> = {
  math: [
    "2500의 15%는 얼마인가요?",
    "2x + 5 = 17을 풀어주세요",
    "반지름 7인 원의 넓이는?",
  ],
  finance: [
    "3억원 대출, 연 6.5%, 30년 상환 시 월 납입금은?",
    "1000만원을 연 7%로 20년 투자하면 얼마가 되나요?",
    "3500만원 자동차 대출, 4.9%, 60개월 월 납입금은?",
  ],
  health: [
    "키 175cm, 체중 70kg의 BMI는?",
    "30세 남성의 하루 필요 칼로리는?",
    "25세 여성, 160cm, 55kg, 보통 활동량의 TDEE는?",
  ],
  date: [
    "2026년 크리스마스까지 며칠 남았나요?",
    "1990년 3월 5일생이면 나이는?",
    "1월 15일부터 8월 22일까지 며칠인가요?",
  ],
  conversion: [
    "100마일은 몇 킬로미터인가요?",
    "화씨 72도는 섭씨로 몇 도인가요?",
    "200파운드는 몇 킬로그램인가요?",
  ],
  tax: [
    "인도 FY 2025-26 신 체계에서 ₹12 lakh 연봉의 소득세는?",
    "인도 ₹15 lakh 연봉의 신·구 과세 체계 비교",
    "인도 뭄바이 ₹12 LPA CTC의 실수령액은?",
  ],
  daily: [
    "4명이 18% 팁 포함 12만원 식사비를 나누면?",
    "350마일 여행, 연비 12km/L, 리터당 1800원일 때 주유비는?",
    "매일 5,500원 커피를 마시면 한 달 비용은?",
  ],
};

const EXAMPLES_JA: Record<string, string[]> = {
  math: [
    "2500の15%はいくら？",
    "2x + 5 = 17を解いて",
    "半径7の円の面積は？",
  ],
  finance: [
    "3000万円のローン、年利6.5%、30年返済の月額は？",
    "1000万円を年利7%で20年運用すると？",
    "350万円の自動車ローン、4.9%、60ヶ月の月額は？",
  ],
  health: [
    "身長175cm、体重70kgのBMIは？",
    "30歳男性の1日の必要カロリーは？",
    "25歳女性、160cm、55kg、中程度の活動のTDEEは？",
  ],
  date: [
    "2026年のクリスマスまで何日？",
    "1990年3月5日生まれの年齢は？",
    "1月15日から8月22日まで何日？",
  ],
  conversion: [
    "100マイルは何キロメートル？",
    "華氏72度は摂氏何度？",
    "200ポンドは何キログラム？",
  ],
  tax: [
    "インドFY 2025-26新税制で₹12 lakh年収の所得税は？",
    "インド₹15 lakh年収の新旧税制比較",
    "インドムンバイ₹12 LPA CTCの手取りは？",
  ],
  daily: [
    "4人で18%チップ込み12万円の食事代を割ると？",
    "350マイルの旅行、燃費12km/L、ガソリン代180円/Lの場合の費用は？",
    "毎日550円のコーヒーの月額費用は？",
  ],
};

const EXAMPLES_ZH: Record<string, string[]> = {
  math: [
    "2500的15%是多少？",
    "解方程 2x + 5 = 17",
    "半径为7的圆的面积是？",
  ],
  finance: [
    "300万贷款，年利率6.5%，30年还款，月供是多少？",
    "1万元按7%年利率投资20年会变成多少？",
    "35000元车贷，4.9%，60个月的月供是？",
  ],
  health: [
    "身高175cm，体重70kg的BMI是？",
    "30岁男性每天需要多少卡路里？",
    "25岁女性，160cm，55kg，中等活动量的TDEE是？",
  ],
  date: [
    "2026年圣诞节还有几天？",
    "1990年3月5日出生的人多大了？",
    "1月15日到8月22日有几天？",
  ],
  conversion: [
    "100英里是多少公里？",
    "华氏72度是摄氏多少度？",
    "200磅是多少公斤？",
  ],
  tax: [
    "印度FY 2025-26新税制下₹12 lakh工资的所得税？",
    "印度₹15 lakh工资的新旧税制比较",
    "印度孟买₹12 LPA CTC的实际到手工资？",
  ],
  daily: [
    "4人平分12万日元的餐费加18%小费？",
    "350英里路程，油耗12km/L，油价每升8元，油费是多少？",
    "每天5.5元的咖啡一个月花多少？",
  ],
};

const EXAMPLES_HI: Record<string, string[]> = {
  math: [
    "2500 का 15% कितना है?",
    "2x + 5 = 17 हल करें",
    "त्रिज्या 7 के वृत्त का क्षेत्रफल?",
  ],
  finance: [
    "₹50 लाख का होम लोन, 8.5% ब्याज, 20 साल की EMI कितनी होगी?",
    "₹10 लाख को 7% पर 20 साल निवेश करें तो?",
    "₹35 लाख कार लोन, 4.9%, 60 महीने की EMI?",
  ],
  health: [
    "ऊंचाई 175cm, वजन 70kg का BMI?",
    "30 साल के पुरुष को प्रतिदिन कितनी कैलोरी चाहिए?",
    "25 वर्ष महिला, 160cm, 55kg, मध्यम गतिविधि का TDEE?",
  ],
  date: [
    "2026 क्रिसमस तक कितने दिन बाकी?",
    "5 मार्च 1990 को जन्म लिया तो उम्र?",
    "15 जनवरी से 22 अगस्त तक कितने दिन?",
  ],
  conversion: [
    "100 मील कितने किलोमीटर?",
    "72°F सेल्सियस में कितना?",
    "200 पाउंड कितने किलोग्राम?",
  ],
  tax: [
    "FY 2025-26 नई व्यवस्था में ₹12 लाख वेतन पर आयकर?",
    "₹15 लाख वेतन के लिए नई बनाम पुरानी कर व्यवस्था तुलना",
    "मुंबई में ₹12 LPA CTC का इन-हैंड वेतन?",
  ],
  daily: [
    "4 लोगों में 18% टिप सहित ₹12,000 का बिल बांटें?",
    "350km यात्रा, 12km/L माइलेज, ₹100/L पेट्रोल, खर्च कितना?",
    "रोज ₹150 की कॉफी का मासिक खर्च?",
  ],
};

const EXAMPLES_AR: Record<string, string[]> = {
  math: [
    "ما هو 15% من 2500؟",
    "حل 2x + 5 = 17",
    "ما مساحة دائرة نصف قطرها 7؟",
  ],
  finance: [
    "القسط الشهري لقرض 300,000$ بفائدة 6.5% لمدة 30 سنة؟",
    "كم سيصبح 10,000$ بعائد 7% لمدة 20 سنة؟",
    "قسط سيارة بـ 35,000$ بفائدة 4.9% لمدة 60 شهراً؟",
  ],
  health: [
    "مؤشر كتلة الجسم لطول 175 سم ووزن 70 كجم؟",
    "كم سعرة حرارية يحتاج رجل عمره 30 سنة يومياً؟",
    "TDEE لأنثى 25 سنة، 160 سم، 55 كجم، نشاط معتدل؟",
  ],
  date: [
    "كم يوماً حتى عيد الميلاد 2026؟",
    "كم عمري إذا ولدت في 5 مارس 1990؟",
    "كم يوماً بين 15 يناير و 22 أغسطس؟",
  ],
  conversion: [
    "100 ميل كم كيلومتر؟",
    "72 فهرنهايت كم سلسيوس؟",
    "200 رطل كم كيلوغرام؟",
  ],
  tax: [
    "ضريبة الدخل على راتب ₹12 lakh في FY 2025-26 النظام الجديد؟",
    "مقارنة النظام القديم والجديد لراتب ₹15 lakh في الهند",
    "الراتب الصافي لـ ₹12 LPA CTC في مومباي؟",
  ],
  daily: [
    "تقسيم فاتورة 120$ بين 4 أشخاص مع 18% بقشيش؟",
    "تكلفة الوقود لرحلة 350 ميل بمعدل 28 ميل/جالون وسعر 3.50$/جالون؟",
    "تكلفة قهوة يومية بـ 5.50$ شهرياً؟",
  ],
};

const EXAMPLES_ES: Record<string, string[]> = {
  math: [
    "¿Cuánto es el 15% de 2500?",
    "Resuelve 2x + 5 = 17",
    "Área de un círculo de radio 7",
  ],
  finance: [
    "Cuota mensual de hipoteca $300,000 al 6.5% a 30 años",
    "¿Cuánto crecerán $10,000 al 7% en 20 años?",
    "Cuota de auto $35,000 al 4.9% por 60 meses",
  ],
  health: [
    "BMI para 175cm, 70kg",
    "¿Cuántas calorías necesita un hombre de 30 años?",
    "TDEE mujer 25 años, 160cm, 55kg, actividad moderada",
  ],
  date: [
    "¿Cuántos días faltan para Navidad 2026?",
    "¿Cuántos años tengo si nací el 5 de marzo de 1990?",
    "¿Cuántos días entre el 15 de enero y el 22 de agosto?",
  ],
  conversion: [
    "Convertir 100 millas a kilómetros",
    "Convertir 72°F a Celsius",
    "Convertir 200 libras a kilogramos",
  ],
  tax: [
    "Impuesto sobre ₹12 lakh en India FY 2025-26 nuevo régimen",
    "Comparar régimen nuevo vs antiguo para ₹15 lakh en India",
    "Salario neto para ₹12 LPA CTC en Mumbai",
  ],
  daily: [
    "Dividir cuenta de $120 entre 4 con 18% propina",
    "Costo de gasolina para viaje de 350 millas a 28 mpg con gas a $3.50/galón",
    "Costo mensual de café diario de $5.50",
  ],
};

export function getExamplesForLocale(locale: string): Record<string, string[]> {
  switch (locale) {
    case "ko": return EXAMPLES_KO;
    case "ja": return EXAMPLES_JA;
    case "zh": return EXAMPLES_ZH;
    case "hi": return EXAMPLES_HI;
    case "ar": return EXAMPLES_AR;
    case "es": return EXAMPLES_ES;
    default: return EXAMPLES_EN;
  }
}
