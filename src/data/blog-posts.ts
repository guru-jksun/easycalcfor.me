export interface BlogPost {
  slug: string;
  category: "finance" | "health" | "living" | "korea";
  date: string;
  readingTime: number;
  calculatorLink: string;
  title: Record<string, string>;
  summary: Record<string, string>;
  content: Record<string, string>;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "salary-take-home-2025",
    category: "korea",
    date: "2025-04-06",
    readingTime: 8,
    calculatorLink: "/calculator/finance/salary",
    title: {
      ko: "2025년 연봉별 실수령액 표",
      en: "2025 Salary Take-Home Pay Table (Korea)",
      es: "Tabla de salario neto 2025 (Corea)",
      fr: "Tableau des salaires nets 2025 (Corée)",
      de: "Nettogehalt-Tabelle 2025 (Korea)",
      pt: "Tabela de salário líquido 2025 (Coreia)",
      ja: "2025年 年俸別手取り額一覧（韓国）",
      zh: "2025年韩国年薪实际到手金额表",
      ar: "جدول الراتب الصافي 2025 (كوريا)",
    },
    summary: {
      ko: "연봉 3,000만원부터 1억원까지 4대보험과 세금 공제 후 실제로 받는 금액을 한눈에 확인하세요.",
      en: "See how much you actually take home from a Korean salary after taxes and social insurance deductions.",
      es: "Vea cuánto recibe realmente de un salario coreano después de impuestos y deducciones de seguro social.",
      fr: "Découvrez combien vous recevez réellement d'un salaire coréen après impôts et cotisations sociales.",
      de: "Sehen Sie, wie viel Sie von einem koreanischen Gehalt nach Steuern und Sozialversicherung tatsächlich erhalten.",
      pt: "Veja quanto você realmente recebe de um salário coreano após impostos e deduções de seguro social.",
      ja: "韓国の給与から税金と社会保険を差し引いた実際の手取り額をご確認ください。",
      zh: "了解韩国工资在扣除税金和社会保险后的实际到手金额。",
      ar: "اعرف كم تحصل فعلياً من الراتب الكوري بعد خصم الضرائب والتأمينات الاجتماعية.",
    },
    content: {
      ko: `## 2025년 연봉별 실수령액 완벽 정리

직장인이라면 누구나 궁금한 것이 있습니다. "내 연봉에서 실제로 얼마를 받을 수 있을까?" 연봉 계약서에 적힌 금액과 실제로 통장에 찍히는 금액은 상당한 차이가 있습니다. 이는 4대보험료와 소득세, 지방소득세가 공제되기 때문입니다.

### 4대보험 공제율 (2025년 기준)

| 항목 | 근로자 부담률 | 비고 |
|------|-------------|------|
| 국민연금 | 4.5% | 상한액 월 590만원 기준 |
| 건강보험 | 3.545% | 장기요양보험 별도 |
| 장기요양보험 | 건강보험료의 12.81% | 건강보험에 추가 |
| 고용보험 | 0.9% | 근로자 부담분 |
| **합계** | **약 9.4%** | 소득세 별도 |

### 연봉별 실수령액 표

아래 표는 부양가족 1인(본인)을 기준으로 계산한 것입니다. 실제 금액은 부양가족 수, 비과세 항목 등에 따라 달라질 수 있습니다.

| 연봉 | 월급(세전) | 4대보험 | 소득세+지방세 | 월 실수령액 | 연 실수령액 |
|------|-----------|---------|-------------|-----------|-----------|
| 3,000만원 | 250만원 | 약 23.5만원 | 약 3.4만원 | **약 223만원** | **약 2,676만원** |
| 3,500만원 | 292만원 | 약 27.4만원 | 약 5.8만원 | **약 259만원** | **약 3,104만원** |
| 4,000만원 | 333만원 | 약 31.3만원 | 약 9.2만원 | **약 293만원** | **약 3,512만원** |
| 4,500만원 | 375만원 | 약 35.3만원 | 약 13.7만원 | **약 326만원** | **약 3,914만원** |
| 5,000만원 | 417만원 | 약 39.2만원 | 약 19.4만원 | **약 358만원** | **약 4,296만원** |
| 5,500만원 | 458만원 | 약 43.1만원 | 약 26.2만원 | **약 389만원** | **약 4,668만원** |
| 6,000만원 | 500만원 | 약 47.0만원 | 약 33.6만원 | **약 419만원** | **약 5,032만원** |
| 6,500만원 | 542만원 | 약 50.9만원 | 약 42.0만원 | **약 449만원** | **약 5,384만원** |
| 7,000만원 | 583만원 | 약 54.8만원 | 약 51.8만원 | **약 477만원** | **약 5,720만원** |
| 7,500만원 | 625만원 | 약 58.8만원 | 약 62.5만원 | **약 504만원** | **약 6,044만원** |
| 8,000만원 | 667만원 | 약 62.7만원 | 약 74.8만원 | **약 529만원** | **약 6,352만원** |
| 8,500만원 | 708만원 | 약 66.6만원 | 약 88.2만원 | **약 554만원** | **약 6,644만원** |
| 9,000만원 | 750만원 | 약 70.5만원 | 약 102.8만원 | **약 577만원** | **약 6,920만원** |
| 9,500만원 | 792만원 | 약 74.4만원 | 약 118.6만원 | **약 599만원** | **약 7,184만원** |
| 1억원 | 833만원 | 약 78.3만원 | 약 135.8만원 | **약 619만원** | **약 7,432만원** |

### 실수령액을 높이는 방법

1. **비과세 항목 활용**: 식대(월 20만원), 자가운전보조금(월 20만원) 등의 비과세 항목을 활용하면 세금 부담을 줄일 수 있습니다.
2. **연말정산 준비**: 신용카드 사용액, 의료비, 교육비, 기부금 등의 공제 항목을 미리 준비하세요.
3. **퇴직연금 추가 납입**: IRP(개인형퇴직연금)에 추가 납입하면 세액공제 혜택을 받을 수 있습니다.
4. **부양가족 등록**: 부양가족이 있다면 반드시 등록하여 인적공제를 받으세요.

### 주의사항

- 위 표는 2025년 기준이며, 매년 4대보험 요율이 변경될 수 있습니다.
- 부양가족 수, 비과세 급여, 추가 공제 항목에 따라 실수령액이 달라집니다.
- 정확한 계산을 위해서는 EasyCalcFor.me의 연봉 계산기를 이용해보세요.`,

      en: `## 2025 Korean Salary Take-Home Pay Guide

When working in Korea, the gap between your gross salary and take-home pay can be significant. Here's what gets deducted:

### Social Insurance Contributions (2025)

| Item | Employee Rate |
|------|-------------|
| National Pension | 4.5% |
| Health Insurance | 3.545% |
| Long-term Care | 12.81% of health insurance |
| Employment Insurance | 0.9% |
| **Total** | **~9.4%** |

### Take-Home Pay by Annual Salary

| Annual Salary (KRW) | Monthly Gross | Monthly Take-Home | Annual Take-Home |
|---------------------|--------------|-------------------|-----------------|
| 30M | 2.50M | ~2.23M | ~26.76M |
| 40M | 3.33M | ~2.93M | ~35.12M |
| 50M | 4.17M | ~3.58M | ~42.96M |
| 60M | 5.00M | ~4.19M | ~50.32M |
| 70M | 5.83M | ~4.77M | ~57.20M |
| 80M | 6.67M | ~5.29M | ~63.52M |
| 90M | 7.50M | ~5.77M | ~69.20M |
| 100M | 8.33M | ~6.19M | ~74.32M |

### Tips to Maximize Take-Home Pay

1. **Use tax-free allowances** — meal allowance (200K/month), transportation (200K/month)
2. **Prepare for year-end tax settlement** — credit card spending, medical/education expenses
3. **Contribute to IRP** — additional retirement pension contributions for tax credits
4. **Register dependents** — claim personal deductions for dependents

Use our salary calculator for exact figures based on your situation.`,

      es: `## Guía de salario neto en Corea 2025

Al trabajar en Corea, la diferencia entre el salario bruto y el neto puede ser significativa debido a las contribuciones al seguro social y los impuestos.

### Contribuciones al Seguro Social (2025)

| Concepto | Tasa del empleado |
|----------|------------------|
| Pensión Nacional | 4.5% |
| Seguro de Salud | 3.545% |
| Cuidado a Largo Plazo | 12.81% del seguro de salud |
| Seguro de Empleo | 0.9% |
| **Total** | **~9.4%** |

### Salario neto por salario anual

| Salario Anual (KRW) | Bruto Mensual | Neto Mensual | Neto Anual |
|---------------------|--------------|-------------|-----------|
| 30M | 2.50M | ~2.23M | ~26.76M |
| 50M | 4.17M | ~3.58M | ~42.96M |
| 70M | 5.83M | ~4.77M | ~57.20M |
| 100M | 8.33M | ~6.19M | ~74.32M |

### Consejos para maximizar el salario neto

1. Utilice las asignaciones libres de impuestos
2. Prepare la liquidación de impuestos de fin de año
3. Contribuya al IRP para créditos fiscales
4. Registre a sus dependientes

Use nuestra calculadora de salario para cifras exactas.`,

      fr: `## Guide du salaire net en Corée 2025

En travaillant en Corée, l'écart entre le salaire brut et le salaire net peut être important en raison des cotisations sociales et des impôts.

### Cotisations sociales (2025)

| Poste | Taux salarié |
|-------|-------------|
| Pension nationale | 4,5% |
| Assurance maladie | 3,545% |
| Soins de longue durée | 12,81% de l'assurance maladie |
| Assurance emploi | 0,9% |
| **Total** | **~9,4%** |

### Salaire net par salaire annuel

| Salaire annuel (KRW) | Brut mensuel | Net mensuel | Net annuel |
|----------------------|-------------|------------|-----------|
| 30M | 2,50M | ~2,23M | ~26,76M |
| 50M | 4,17M | ~3,58M | ~42,96M |
| 70M | 5,83M | ~4,77M | ~57,20M |
| 100M | 8,33M | ~6,19M | ~74,32M |

### Conseils pour maximiser votre salaire net

1. Utilisez les indemnités non imposables
2. Préparez la déclaration fiscale de fin d'année
3. Cotisez à l'IRP pour des crédits d'impôt
4. Enregistrez vos personnes à charge

Utilisez notre calculateur de salaire pour des chiffres exacts.`,

      de: `## Nettogehalt-Leitfaden Korea 2025

Bei der Arbeit in Korea kann der Unterschied zwischen Brutto- und Nettogehalt erheblich sein, da Sozialversicherungsbeiträge und Steuern abgezogen werden.

### Sozialversicherungsbeiträge (2025)

| Posten | Arbeitnehmeranteil |
|--------|-------------------|
| Nationale Rente | 4,5% |
| Krankenversicherung | 3,545% |
| Pflegeversicherung | 12,81% der Krankenversicherung |
| Arbeitslosenversicherung | 0,9% |
| **Gesamt** | **~9,4%** |

### Nettogehalt nach Jahresgehalt

| Jahresgehalt (KRW) | Brutto/Monat | Netto/Monat | Netto/Jahr |
|--------------------|-------------|------------|-----------|
| 30M | 2,50M | ~2,23M | ~26,76M |
| 50M | 4,17M | ~3,58M | ~42,96M |
| 70M | 5,83M | ~4,77M | ~57,20M |
| 100M | 8,33M | ~6,19M | ~74,32M |

### Tipps zur Maximierung des Nettogehalts

1. Nutzen Sie steuerfreie Zulagen
2. Bereiten Sie den Jahressteuerausgleich vor
3. Zahlen Sie in die IRP ein für Steuergutschriften
4. Melden Sie Ihre Angehörigen an

Nutzen Sie unseren Gehaltsrechner für genaue Zahlen.`,

      pt: `## Guia de Salário Líquido na Coreia 2025

Ao trabalhar na Coreia, a diferença entre o salário bruto e o líquido pode ser significativa devido às contribuições de seguro social e impostos.

### Contribuições de Seguro Social (2025)

| Item | Taxa do Empregado |
|------|------------------|
| Pensão Nacional | 4,5% |
| Seguro de Saúde | 3,545% |
| Cuidados de Longo Prazo | 12,81% do seguro de saúde |
| Seguro de Emprego | 0,9% |
| **Total** | **~9,4%** |

### Salário líquido por salário anual

| Salário Anual (KRW) | Bruto Mensal | Líquido Mensal | Líquido Anual |
|---------------------|-------------|---------------|--------------|
| 30M | 2,50M | ~2,23M | ~26,76M |
| 50M | 4,17M | ~3,58M | ~42,96M |
| 70M | 5,83M | ~4,77M | ~57,20M |
| 100M | 8,33M | ~6,19M | ~74,32M |

### Dicas para maximizar o salário líquido

1. Use subsídios isentos de impostos
2. Prepare a declaração fiscal de fim de ano
3. Contribua para o IRP para créditos fiscais
4. Registre seus dependentes

Use nossa calculadora de salário para valores exatos.`,

      ja: `## 2025年 韓国の手取り額ガイド

韓国で働く場合、総支給額と手取り額の差は社会保険料と税金の控除により大きくなります。

### 社会保険料率（2025年）

| 項目 | 労働者負担率 |
|------|------------|
| 国民年金 | 4.5% |
| 健康保険 | 3.545% |
| 長期療養保険 | 健康保険の12.81% |
| 雇用保険 | 0.9% |
| **合計** | **約9.4%** |

### 年俸別手取り額

| 年俸（KRW） | 月額総支給 | 月額手取り | 年間手取り |
|------------|----------|----------|----------|
| 3,000万 | 250万 | 約223万 | 約2,676万 |
| 5,000万 | 417万 | 約358万 | 約4,296万 |
| 7,000万 | 583万 | 約477万 | 約5,720万 |
| 1億 | 833万 | 約619万 | 約7,432万 |

### 手取り額を増やすコツ

1. 非課税手当を活用する
2. 年末調整の準備をする
3. IRP（個人型退職年金）に追加拠出して税額控除を受ける
4. 扶養家族を登録する

正確な計算には給与計算機をご利用ください。`,

      zh: `## 2025年韩国工资到手指南

在韩国工作时，由于社会保险和税款扣除，总工资和实际到手金额之间可能存在较大差异。

### 社会保险缴费率（2025年）

| 项目 | 员工缴费率 |
|------|----------|
| 国民年金 | 4.5% |
| 健康保险 | 3.545% |
| 长期护理 | 健康保险的12.81% |
| 就业保险 | 0.9% |
| **合计** | **约9.4%** |

### 按年薪计算的到手金额

| 年薪（韩元） | 月总额 | 月到手 | 年到手 |
|------------|-------|-------|-------|
| 3000万 | 250万 | 约223万 | 约2676万 |
| 5000万 | 417万 | 约358万 | 约4296万 |
| 7000万 | 583万 | 约477万 | 约5720万 |
| 1亿 | 833万 | 约619万 | 约7432万 |

### 最大化到手金额的建议

1. 利用免税津贴
2. 准备年终税务结算
3. 向IRP缴纳额外退休金以获得税收抵免
4. 登记被抚养人

使用我们的工资计算器获取准确数据。`,

      ar: `## دليل الراتب الصافي في كوريا 2025

عند العمل في كوريا، يمكن أن يكون الفرق بين الراتب الإجمالي والصافي كبيراً بسبب اشتراكات التأمين الاجتماعي والضرائب.

### اشتراكات التأمين الاجتماعي (2025)

| البند | نسبة الموظف |
|-------|-----------|
| المعاش الوطني | 4.5% |
| التأمين الصحي | 3.545% |
| الرعاية طويلة الأمد | 12.81% من التأمين الصحي |
| تأمين التوظيف | 0.9% |
| **الإجمالي** | **~9.4%** |

### الراتب الصافي حسب الراتب السنوي

| الراتب السنوي | الإجمالي الشهري | الصافي الشهري | الصافي السنوي |
|-------------|---------------|-------------|-------------|
| 30 مليون | 2.50 مليون | ~2.23 مليون | ~26.76 مليون |
| 50 مليون | 4.17 مليون | ~3.58 مليون | ~42.96 مليون |
| 70 مليون | 5.83 مليون | ~4.77 مليون | ~57.20 مليون |
| 100 مليون | 8.33 مليون | ~6.19 مليون | ~74.32 مليون |

### نصائح لزيادة الراتب الصافي

1. استخدم البدلات المعفاة من الضرائب
2. جهّز التسوية الضريبية نهاية العام
3. ساهم في IRP للحصول على ائتمانات ضريبية
4. سجّل المعالين

استخدم حاسبة الرواتب للحصول على أرقام دقيقة.`,
    },
  },
  {
    slug: "jeonse-vs-wolse",
    category: "korea",
    date: "2025-03-28",
    readingTime: 7,
    calculatorLink: "/calculator/finance/rent-compare",
    title: {
      ko: "전세 vs 월세, 어떤 것이 유리할까?",
      en: "Jeonse vs Wolse: Which Rental Option Is Better?",
      es: "Jeonse vs Wolse: ¿Qué opción de alquiler es mejor?",
      fr: "Jeonse vs Wolse : Quelle option de location est meilleure ?",
      de: "Jeonse vs Wolse: Welche Mietoption ist besser?",
      pt: "Jeonse vs Wolse: Qual opção de aluguel é melhor?",
      ja: "チョンセ vs ウォルセ：どちらの賃貸が有利？",
      zh: "全租 vs 月租：哪种租房方式更划算？",
      ar: "الجونسي مقابل الوولسي: أي خيار إيجار أفضل؟",
    },
    summary: {
      ko: "전세와 월세의 기회비용을 비교하고, 2025년 금리 환경에서 어떤 선택이 유리한지 분석합니다.",
      en: "Compare the opportunity costs of Korea's unique jeonse (lump-sum deposit) vs monthly rent, with 2025 market analysis.",
      es: "Compare los costos de oportunidad del jeonse (depósito único) vs alquiler mensual en Corea.",
      fr: "Comparez les coûts d'opportunité du jeonse (dépôt forfaitaire) vs le loyer mensuel en Corée.",
      de: "Vergleichen Sie die Opportunitätskosten von Jeonse (Pauschalkaution) vs. Monatsmiete in Korea.",
      pt: "Compare os custos de oportunidade do jeonse (depósito único) vs aluguel mensal na Coreia.",
      ja: "韓国独自のチョンセ（一括保証金）と月払い家賃の機会費用を比較分析します。",
      zh: "比较韩国特有的全租（一次性押金）与月租的机会成本。",
      ar: "قارن تكاليف الفرصة البديلة بين الجونسي (الوديعة الإجمالية) والإيجار الشهري في كوريا.",
    },
    content: {
      ko: `## 전세 vs 월세: 2025년 완벽 비교 가이드

한국에서 집을 구할 때 가장 먼저 마주치는 선택이 바로 전세와 월세입니다. 전세는 세계에서 거의 유일하게 한국에만 존재하는 독특한 주거 제도로, 큰 금액의 보증금을 맡기고 월 임대료 없이 거주하는 방식입니다.

### 전세란?

전세는 집주인에게 주택 가격의 50~80%에 해당하는 큰 금액의 보증금(전세금)을 맡기고, 계약 기간(보통 2년) 동안 별도의 월세 없이 거주하는 제도입니다. 계약 만료 시 보증금 전액을 돌려받습니다.

### 월세란?

월세는 일반적인 임대 방식으로, 비교적 적은 보증금을 내고 매달 일정 금액의 임대료를 지불합니다. 보증금이 클수록 월세가 낮아지는 반전세 형태도 있습니다.

### 기회비용으로 비교하기

전세와 월세를 비교할 때 가장 중요한 개념이 **기회비용**입니다. 전세금으로 묶인 큰 돈을 다른 곳에 투자했다면 얼마의 수익을 올릴 수 있었는지를 따져봐야 합니다.

**예시: 서울 아파트 기준**

| 구분 | 전세 | 월세 |
|------|------|------|
| 보증금 | 3억원 | 3,000만원 |
| 월 임대료 | 0원 | 80만원 |
| 연간 주거비용 | 0원 | 960만원 |
| 기회비용 (연 4%) | 1,200만원 | 120만원 |
| **실질 연간 비용** | **1,200만원** | **1,080만원** |

위 예시에서 금리가 4%일 때, 전세의 기회비용(1,200만원)이 월세의 총 비용(1,080만원)보다 높으므로 **월세가 유리**합니다.

### 금리에 따른 비교

| 금리 | 전세 기회비용(3억 기준) | 월세 실질비용 | 유리한 선택 |
|------|---------------------|-------------|-----------|
| 2% | 600만원 | 1,080만원 | 전세 유리 |
| 3% | 900만원 | 1,080만원 | 전세 유리 |
| 3.6% | 1,080만원 | 1,080만원 | 동일 |
| 4% | 1,200만원 | 1,080만원 | 월세 유리 |
| 5% | 1,500만원 | 1,080만원 | 월세 유리 |

**핵심 포인트**: 금리가 높을수록 월세가 유리하고, 금리가 낮을수록 전세가 유리합니다.

### 2025년 시장 상황

2025년 현재 한국은행 기준금리는 약 2.75% 수준입니다. 시중은행 전세자금대출 금리는 3.5~5% 수준이며, 정부의 전세사기 방지 대책으로 인해 전세 시장에 큰 변화가 일어나고 있습니다.

- **전세 대출을 받는 경우**: 대출 이자가 기회비용을 대체하므로, 대출 금리와 월세를 직접 비교해야 합니다.
- **전세금을 자기 자금으로 마련하는 경우**: 해당 금액의 투자 수익률이 기회비용이 됩니다.

### 전세가 유리한 경우

1. 저금리 환경 (기준금리 2% 이하)
2. 전세 보증금을 자기 자금으로 충당 가능
3. 장기 거주 예정 (4년 이상)
4. 전세가율이 낮은 안전한 매물

### 월세가 유리한 경우

1. 고금리 환경 (기준금리 3.5% 이상)
2. 전세 대출이 필요한 경우
3. 투자할 곳이 있어 자금 유동성이 중요한 경우
4. 단기 거주 예정 (1~2년)

### 결론

전세와 월세의 유불리는 금리 환경과 개인 상황에 따라 달라집니다. 단순히 "전세가 좋다" 또는 "월세가 좋다"고 단정짓기 어렵습니다. EasyCalcFor.me의 전세 vs 월세 비교 계산기를 활용하여 본인의 상황에 맞는 최적의 선택을 찾아보세요.`,

      en: `## Jeonse vs Wolse: Korea's Unique Rental Systems Compared

Korea has a unique rental system called **jeonse** where tenants pay a large lump-sum deposit (typically 50-80% of the property value) instead of monthly rent. The deposit is returned in full when the lease ends.

### How Opportunity Cost Decides the Winner

The key to comparing jeonse and wolse (monthly rent) is **opportunity cost** — what you could earn if you invested the deposit money elsewhere.

**Example: Seoul Apartment**

| | Jeonse | Wolse |
|--|--------|-------|
| Deposit | 300M KRW | 30M KRW |
| Monthly Rent | 0 | 800K KRW |
| Annual Housing Cost | 0 | 9.6M KRW |
| Opportunity Cost (4%) | 12M KRW | 1.2M KRW |
| **Real Annual Cost** | **12M KRW** | **10.8M KRW** |

### Interest Rate Impact

| Interest Rate | Jeonse Cost | Wolse Cost | Better Option |
|--------------|------------|-----------|--------------|
| 2% | 6M KRW | 10.8M KRW | Jeonse |
| 3% | 9M KRW | 10.8M KRW | Jeonse |
| 4% | 12M KRW | 10.8M KRW | Wolse |
| 5% | 15M KRW | 10.8M KRW | Wolse |

**Key insight**: Higher interest rates favor wolse; lower rates favor jeonse.

### 2025 Market Context

With Korea's base rate around 2.75% and jeonse loan rates at 3.5-5%, the decision depends heavily on whether you're using your own funds or borrowing.

Use our rent comparison calculator to find the optimal choice for your situation.`,

      es: `## Jeonse vs Wolse: Comparación de sistemas de alquiler de Corea

Corea tiene un sistema de alquiler único llamado **jeonse** donde los inquilinos pagan un gran depósito (50-80% del valor de la propiedad) en lugar de alquiler mensual.

### El costo de oportunidad decide

La clave es el **costo de oportunidad**: lo que podría ganar si invirtiera el dinero del depósito.

| Tasa de interés | Costo Jeonse | Costo Wolse | Mejor opción |
|-----------------|-------------|------------|-------------|
| 2% | 6M KRW | 10.8M KRW | Jeonse |
| 3% | 9M KRW | 10.8M KRW | Jeonse |
| 4% | 12M KRW | 10.8M KRW | Wolse |
| 5% | 15M KRW | 10.8M KRW | Wolse |

**Dato clave**: Las tasas de interés más altas favorecen el wolse; las tasas más bajas favorecen el jeonse.

Use nuestra calculadora de comparación de alquiler para encontrar la opción óptima.`,

      fr: `## Jeonse vs Wolse : Comparaison des systèmes locatifs coréens

La Corée dispose d'un système locatif unique appelé **jeonse** où les locataires versent un dépôt important (50-80% de la valeur du bien) au lieu d'un loyer mensuel.

### Le coût d'opportunité décide

La clé est le **coût d'opportunité** : ce que vous pourriez gagner en investissant l'argent du dépôt ailleurs.

| Taux d'intérêt | Coût Jeonse | Coût Wolse | Meilleure option |
|----------------|-----------|----------|----------------|
| 2% | 6M KRW | 10,8M KRW | Jeonse |
| 3% | 9M KRW | 10,8M KRW | Jeonse |
| 4% | 12M KRW | 10,8M KRW | Wolse |
| 5% | 15M KRW | 10,8M KRW | Wolse |

Utilisez notre calculateur de comparaison de loyer pour votre situation.`,

      de: `## Jeonse vs Wolse: Koreanische Mietsysteme im Vergleich

Korea hat ein einzigartiges Mietsystem namens **Jeonse**, bei dem Mieter eine große Kaution (50-80% des Immobilienwerts) statt monatlicher Miete zahlen.

### Opportunitätskosten entscheiden

Der Schlüssel ist die **Opportunitätskosten**: Was Sie verdienen könnten, wenn Sie das Kautionsgeld anderweitig anlegen würden.

| Zinssatz | Jeonse-Kosten | Wolse-Kosten | Bessere Option |
|----------|-------------|------------|--------------|
| 2% | 6M KRW | 10,8M KRW | Jeonse |
| 3% | 9M KRW | 10,8M KRW | Jeonse |
| 4% | 12M KRW | 10,8M KRW | Wolse |
| 5% | 15M KRW | 10,8M KRW | Wolse |

Nutzen Sie unseren Mietvergleichsrechner für Ihre individuelle Situation.`,

      pt: `## Jeonse vs Wolse: Comparação dos sistemas de aluguel coreanos

A Coreia tem um sistema de aluguel único chamado **jeonse**, onde os inquilinos pagam um grande depósito (50-80% do valor do imóvel) em vez de aluguel mensal.

### O custo de oportunidade decide

A chave é o **custo de oportunidade**: o que você poderia ganhar investindo o dinheiro do depósito.

| Taxa de juros | Custo Jeonse | Custo Wolse | Melhor opção |
|-------------|------------|----------|------------|
| 2% | 6M KRW | 10,8M KRW | Jeonse |
| 3% | 9M KRW | 10,8M KRW | Jeonse |
| 4% | 12M KRW | 10,8M KRW | Wolse |
| 5% | 15M KRW | 10,8M KRW | Wolse |

Use nossa calculadora de comparação de aluguel para sua situação.`,

      ja: `## チョンセ vs ウォルセ：韓国の賃貸システム比較

韓国には**チョンセ**という独自の賃貸システムがあり、月々の家賃の代わりに物件価値の50-80%の高額保証金を支払います。

### 機会費用で判断

鍵となるのは**機会費用**です。保証金を他に投資していたら得られたであろう収益を考慮する必要があります。

| 金利 | チョンセ費用 | ウォルセ費用 | 有利な選択肢 |
|------|-----------|-----------|-----------|
| 2% | 600万KRW | 1,080万KRW | チョンセ |
| 3% | 900万KRW | 1,080万KRW | チョンセ |
| 4% | 1,200万KRW | 1,080万KRW | ウォルセ |
| 5% | 1,500万KRW | 1,080万KRW | ウォルセ |

家賃比較計算機であなたの状況に最適な選択を見つけてください。`,

      zh: `## 全租 vs 月租：韩国租房体系比较

韩国有一种独特的租房制度叫**全租（Jeonse）**，租户支付房产价值50-80%的大额押金，无需支付月租。

### 机会成本决定选择

关键在于**机会成本**：如果将押金投资到其他地方能获得多少收益。

| 利率 | 全租成本 | 月租成本 | 更优选择 |
|------|---------|---------|---------|
| 2% | 600万韩元 | 1,080万韩元 | 全租 |
| 3% | 900万韩元 | 1,080万韩元 | 全租 |
| 4% | 1,200万韩元 | 1,080万韩元 | 月租 |
| 5% | 1,500万韩元 | 1,080万韩元 | 月租 |

使用我们的租金比较计算器找到最适合您的选择。`,

      ar: `## الجونسي مقابل الوولسي: مقارنة أنظمة الإيجار الكورية

لدى كوريا نظام إيجار فريد يسمى **الجونسي** حيث يدفع المستأجرون وديعة كبيرة (50-80% من قيمة العقار) بدلاً من الإيجار الشهري.

### تكلفة الفرصة البديلة تحدد الخيار

المفتاح هو **تكلفة الفرصة البديلة**: ما يمكنك كسبه لو استثمرت أموال الوديعة في مكان آخر.

| سعر الفائدة | تكلفة الجونسي | تكلفة الوولسي | الخيار الأفضل |
|------------|-------------|-------------|-------------|
| 2% | 6 مليون | 10.8 مليون | الجونسي |
| 3% | 9 مليون | 10.8 مليون | الجونسي |
| 4% | 12 مليون | 10.8 مليون | الوولسي |
| 5% | 15 مليون | 10.8 مليون | الوولسي |

استخدم حاسبة مقارنة الإيجار لإيجاد الخيار الأمثل لحالتك.`,
    },
  },
  {
    slug: "bmi-normal-range-guide",
    category: "health",
    date: "2025-03-20",
    readingTime: 6,
    calculatorLink: "/calculator/health/bmi",
    title: {
      ko: "BMI 정상 범위: 나이별·성별 기준 완벽 가이드",
      en: "BMI Normal Range: Complete Guide by Age and Gender",
      es: "Rango normal de IMC: Guía completa por edad y género",
      fr: "IMC normal : Guide complet par âge et sexe",
      de: "BMI-Normalbereich: Vollständiger Leitfaden nach Alter und Geschlecht",
      pt: "Faixa normal de IMC: Guia completo por idade e gênero",
      ja: "BMI正常範囲：年齢別・性別完全ガイド",
      zh: "BMI正常范围：按年龄和性别的完整指南",
      ar: "النطاق الطبيعي لمؤشر كتلة الجسم: دليل شامل حسب العمر والجنس",
    },
    summary: {
      ko: "BMI(체질량지수)의 정확한 계산법과 WHO 기준, 아시아인 기준의 차이, 나이별 정상 범위를 상세히 알아봅니다.",
      en: "Learn the accurate BMI calculation method, WHO standards, Asian-specific criteria, and normal ranges by age.",
      es: "Aprenda el método de cálculo del IMC, los estándares de la OMS y los rangos normales por edad.",
      fr: "Apprenez la méthode de calcul de l'IMC, les normes de l'OMS et les plages normales par âge.",
      de: "Erfahren Sie die BMI-Berechnung, WHO-Standards und Normalbereiche nach Alter.",
      pt: "Aprenda o cálculo do IMC, padrões da OMS e faixas normais por idade.",
      ja: "BMI計算法、WHO基準、アジア人基準の違い、年齢別正常範囲を詳しく解説します。",
      zh: "了解BMI计算方法、WHO标准、亚洲人标准差异及各年龄段正常范围。",
      ar: "تعرف على طريقة حساب مؤشر كتلة الجسم ومعايير منظمة الصحة العالمية والنطاقات الطبيعية حسب العمر.",
    },
    content: {
      ko: `## BMI(체질량지수) 완벽 가이드

BMI(Body Mass Index, 체질량지수)는 키와 몸무게를 이용하여 비만도를 간접적으로 측정하는 지표입니다. 1832년 벨기에의 수학자 아돌프 케틀레가 개발했으며, 현재 전 세계적으로 가장 널리 사용되는 비만 판정 기준입니다.

### BMI 계산 공식

$$BMI = \\frac{체중(kg)}{신장(m)^2}$$

**예시**: 키 170cm, 체중 68kg인 경우
- BMI = 68 / (1.70)² = 68 / 2.89 = **23.5**

### WHO 국제 기준

| BMI 범위 | 분류 |
|---------|------|
| 18.5 미만 | 저체중 |
| 18.5 ~ 24.9 | 정상 |
| 25.0 ~ 29.9 | 과체중 |
| 30.0 ~ 34.9 | 비만 1단계 |
| 35.0 ~ 39.9 | 비만 2단계 |
| 40.0 이상 | 비만 3단계 (고도비만) |

### 아시아인 기준 (WHO 아시아-태평양 기준)

아시아인은 같은 BMI에서도 서양인보다 체지방률이 높고, 비만 관련 질환 위험이 더 높은 것으로 알려져 있습니다. 따라서 아시아-태평양 지역에서는 다른 기준을 적용합니다.

| BMI 범위 | 분류 (아시아 기준) |
|---------|---------------|
| 18.5 미만 | 저체중 |
| 18.5 ~ 22.9 | 정상 |
| 23.0 ~ 24.9 | 과체중 (위험체중) |
| 25.0 ~ 29.9 | 비만 1단계 |
| 30.0 이상 | 비만 2단계 |

**중요**: 한국에서는 대한비만학회 기준으로 BMI 23 이상을 과체중, 25 이상을 비만으로 분류합니다.

### 나이별 권장 BMI 범위

나이가 들수록 약간 높은 BMI가 건강에 유리할 수 있습니다. 이는 노화에 따른 근육량 감소와 관련이 있습니다.

| 나이 | 권장 BMI 범위 |
|------|-------------|
| 19~24세 | 19~24 |
| 25~34세 | 20~25 |
| 35~44세 | 21~26 |
| 45~54세 | 22~27 |
| 55~64세 | 23~28 |
| 65세 이상 | 24~29 |

### BMI의 한계점

BMI는 유용한 도구이지만 완벽하지는 않습니다:

1. **근육량 미반영**: 근육이 많은 운동선수는 BMI가 높게 나오지만 실제로 건강합니다.
2. **체지방 분포 무시**: 복부 비만은 같은 BMI에서도 더 위험하지만, BMI로는 구별할 수 없습니다.
3. **성별 차이**: 여성은 남성보다 체지방률이 자연적으로 높지만, BMI 기준은 동일합니다.
4. **인종별 차이**: 아시아인과 서양인의 체성분 구성이 다르지만, WHO 기준은 이를 완전히 반영하지 못합니다.

### BMI와 함께 확인할 지표

- **허리둘레**: 남성 90cm, 여성 85cm 이상이면 복부 비만
- **체지방률**: DEXA, InBody 등으로 측정
- **허리-엉덩이 비율**: 남성 0.9, 여성 0.85 이상이면 위험

EasyCalcFor.me의 BMI 계산기로 당신의 체질량지수를 정확히 계산해보세요.`,

      en: `## Complete BMI Guide: Normal Ranges by Age & Gender

BMI (Body Mass Index) is the most widely used method to assess whether someone is at a healthy weight. It uses a simple formula based on height and weight.

### BMI Formula

**BMI = Weight (kg) / Height (m)²**

Example: 170cm tall, 68kg → BMI = 68 / 1.70² = **23.5**

### WHO International Standards

| BMI Range | Classification |
|-----------|---------------|
| Below 18.5 | Underweight |
| 18.5–24.9 | Normal |
| 25.0–29.9 | Overweight |
| 30.0–34.9 | Obese Class I |
| 35.0–39.9 | Obese Class II |
| 40.0+ | Obese Class III |

### Asian-Specific Criteria

Asians tend to have higher body fat percentage at the same BMI, so the Asia-Pacific guidelines use lower thresholds:

| BMI Range | Classification (Asian) |
|-----------|----------------------|
| Below 18.5 | Underweight |
| 18.5–22.9 | Normal |
| 23.0–24.9 | Overweight (At Risk) |
| 25.0–29.9 | Obese Class I |
| 30.0+ | Obese Class II |

### Recommended BMI by Age

| Age | Recommended BMI |
|-----|----------------|
| 19–24 | 19–24 |
| 25–34 | 20–25 |
| 35–44 | 21–26 |
| 45–54 | 22–27 |
| 55–64 | 23–28 |
| 65+ | 24–29 |

### Limitations of BMI

1. **Doesn't account for muscle mass** — athletes may show high BMI despite being healthy
2. **Ignores fat distribution** — belly fat is more dangerous but BMI can't detect it
3. **No gender differentiation** — women naturally have higher body fat
4. **Ethnic variations** — body composition differs across ethnicities

Use our BMI calculator for an instant, accurate assessment.`,

      es: `## Guía completa de IMC: Rangos normales por edad y género

El IMC (Índice de Masa Corporal) es el método más utilizado para evaluar si alguien tiene un peso saludable.

### Fórmula del IMC

**IMC = Peso (kg) / Altura (m)²**

### Estándares internacionales de la OMS

| Rango de IMC | Clasificación |
|-------------|--------------|
| Menos de 18.5 | Bajo peso |
| 18.5–24.9 | Normal |
| 25.0–29.9 | Sobrepeso |
| 30.0+ | Obesidad |

### Criterios específicos para asiáticos

Los asiáticos tienden a tener mayor porcentaje de grasa corporal con el mismo IMC:
- Normal: 18.5–22.9
- Sobrepeso: 23.0–24.9
- Obesidad: 25.0+

### IMC recomendado por edad

| Edad | IMC recomendado |
|------|----------------|
| 19–24 | 19–24 |
| 25–34 | 20–25 |
| 35–44 | 21–26 |
| 45–54 | 22–27 |
| 55–64 | 23–28 |
| 65+ | 24–29 |

### Limitaciones del IMC

1. No considera la masa muscular
2. Ignora la distribución de grasa
3. Sin diferenciación por género
4. Variaciones étnicas

Use nuestra calculadora de IMC para una evaluación precisa.`,

      fr: `## Guide complet de l'IMC : Plages normales par âge et sexe

L'IMC (Indice de Masse Corporelle) est la méthode la plus utilisée pour évaluer le poids santé.

### Formule de l'IMC

**IMC = Poids (kg) / Taille (m)²**

### Normes internationales de l'OMS

| Plage d'IMC | Classification |
|------------|---------------|
| Moins de 18,5 | Insuffisance pondérale |
| 18,5–24,9 | Normal |
| 25,0–29,9 | Surpoids |
| 30,0+ | Obésité |

### Critères spécifiques pour les Asiatiques

- Normal : 18,5–22,9
- Surpoids : 23,0–24,9
- Obésité : 25,0+

### IMC recommandé par âge

| Âge | IMC recommandé |
|-----|---------------|
| 19–24 | 19–24 |
| 25–34 | 20–25 |
| 35–44 | 21–26 |
| 45–54 | 22–27 |
| 55–64 | 23–28 |
| 65+ | 24–29 |

### Limites de l'IMC

1. Ne tient pas compte de la masse musculaire
2. Ignore la distribution des graisses
3. Pas de différenciation par sexe
4. Variations ethniques

Utilisez notre calculateur d'IMC pour une évaluation précise.`,

      de: `## Vollständiger BMI-Leitfaden: Normalbereiche nach Alter und Geschlecht

Der BMI (Body-Mass-Index) ist die am häufigsten verwendete Methode zur Beurteilung eines gesunden Gewichts.

### BMI-Formel

**BMI = Gewicht (kg) / Größe (m)²**

### Internationale WHO-Standards

| BMI-Bereich | Klassifikation |
|------------|---------------|
| Unter 18,5 | Untergewicht |
| 18,5–24,9 | Normal |
| 25,0–29,9 | Übergewicht |
| 30,0+ | Adipositas |

### Asiatische Kriterien

- Normal: 18,5–22,9
- Übergewicht: 23,0–24,9
- Adipositas: 25,0+

### Empfohlener BMI nach Alter

| Alter | Empfohlener BMI |
|-------|----------------|
| 19–24 | 19–24 |
| 25–34 | 20–25 |
| 35–44 | 21–26 |
| 45–54 | 22–27 |
| 55–64 | 23–28 |
| 65+ | 24–29 |

### Grenzen des BMI

1. Berücksichtigt keine Muskelmasse
2. Ignoriert Fettverteilung
3. Keine Geschlechtsunterscheidung
4. Ethnische Variationen

Nutzen Sie unseren BMI-Rechner für eine genaue Bewertung.`,

      pt: `## Guia completo de IMC: Faixas normais por idade e gênero

O IMC (Índice de Massa Corporal) é o método mais usado para avaliar o peso saudável.

### Fórmula do IMC

**IMC = Peso (kg) / Altura (m)²**

### Padrões internacionais da OMS

| Faixa de IMC | Classificação |
|-------------|--------------|
| Abaixo de 18,5 | Abaixo do peso |
| 18,5–24,9 | Normal |
| 25,0–29,9 | Sobrepeso |
| 30,0+ | Obesidade |

### Critérios asiáticos

- Normal: 18,5–22,9
- Sobrepeso: 23,0–24,9
- Obesidade: 25,0+

### IMC recomendado por idade

| Idade | IMC recomendado |
|-------|----------------|
| 19–24 | 19–24 |
| 25–34 | 20–25 |
| 35–44 | 21–26 |
| 45–54 | 22–27 |
| 55–64 | 23–28 |
| 65+ | 24–29 |

### Limitações do IMC

1. Não considera massa muscular
2. Ignora distribuição de gordura
3. Sem diferenciação por gênero
4. Variações étnicas

Use nossa calculadora de IMC para uma avaliação precisa.`,

      ja: `## 完全BMIガイド：年齢・性別別正常範囲

BMI（ボディマス指数）は、健康的な体重かどうかを評価する最も広く使用されている方法です。

### BMI計算式

**BMI = 体重(kg) / 身長(m)²**

例：170cm、68kg → BMI = 68 / 1.70² = **23.5**

### WHO国際基準

| BMI範囲 | 分類 |
|---------|------|
| 18.5未満 | 低体重 |
| 18.5–24.9 | 正常 |
| 25.0–29.9 | 過体重 |
| 30.0以上 | 肥満 |

### アジア人基準

- 正常：18.5–22.9
- 過体重：23.0–24.9
- 肥満：25.0以上

### 年齢別推奨BMI

| 年齢 | 推奨BMI |
|------|--------|
| 19–24歳 | 19–24 |
| 25–34歳 | 20–25 |
| 35–44歳 | 21–26 |
| 45–54歳 | 22–27 |
| 55–64歳 | 23–28 |
| 65歳以上 | 24–29 |

### BMIの限界

1. 筋肉量を考慮しない
2. 脂肪分布を無視する
3. 性別による区別がない
4. 人種による差異

BMI計算機で正確な評価をお試しください。`,

      zh: `## 完整BMI指南：按年龄和性别的正常范围

BMI（身体质量指数）是评估健康体重最广泛使用的方法。

### BMI计算公式

**BMI = 体重(kg) / 身高(m)²**

例：170cm，68kg → BMI = 68 / 1.70² = **23.5**

### WHO国际标准

| BMI范围 | 分类 |
|---------|------|
| 低于18.5 | 体重过轻 |
| 18.5–24.9 | 正常 |
| 25.0–29.9 | 超重 |
| 30.0以上 | 肥胖 |

### 亚洲人标准

- 正常：18.5–22.9
- 超重：23.0–24.9
- 肥胖：25.0以上

### 各年龄段推荐BMI

| 年龄 | 推荐BMI |
|------|--------|
| 19–24岁 | 19–24 |
| 25–34岁 | 20–25 |
| 35–44岁 | 21–26 |
| 45–54岁 | 22–27 |
| 55–64岁 | 23–28 |
| 65岁以上 | 24–29 |

### BMI的局限性

1. 不考虑肌肉量
2. 忽略脂肪分布
3. 无性别区分
4. 种族差异

使用我们的BMI计算器进行准确评估。`,

      ar: `## دليل مؤشر كتلة الجسم الكامل: النطاقات الطبيعية حسب العمر والجنس

مؤشر كتلة الجسم (BMI) هو الطريقة الأكثر استخداماً لتقييم الوزن الصحي.

### صيغة مؤشر كتلة الجسم

**BMI = الوزن (كجم) / الطول (م)²**

### معايير منظمة الصحة العالمية

| نطاق BMI | التصنيف |
|----------|---------|
| أقل من 18.5 | نقص الوزن |
| 18.5–24.9 | طبيعي |
| 25.0–29.9 | زيادة الوزن |
| 30.0+ | سمنة |

### معايير آسيوية

- طبيعي: 18.5–22.9
- زيادة الوزن: 23.0–24.9
- سمنة: 25.0+

### BMI الموصى به حسب العمر

| العمر | BMI الموصى |
|-------|----------|
| 19–24 | 19–24 |
| 25–34 | 20–25 |
| 35–44 | 21–26 |
| 45–54 | 22–27 |
| 55–64 | 23–28 |
| 65+ | 24–29 |

### حدود مؤشر كتلة الجسم

1. لا يأخذ بعين الاعتبار كتلة العضلات
2. يتجاهل توزيع الدهون
3. لا يفرق بين الجنسين
4. اختلافات عرقية

استخدم حاسبة BMI للحصول على تقييم دقيق.`,
    },
  },
  {
    slug: "compound-interest-magic",
    category: "finance",
    date: "2025-03-15",
    readingTime: 7,
    calculatorLink: "/calculator/finance/compound-interest",
    title: {
      ko: "복리의 마법: 10년·20년·30년 후 내 돈은?",
      en: "The Magic of Compound Interest: Your Money in 10, 20, 30 Years",
      es: "La magia del interés compuesto: Tu dinero en 10, 20, 30 años",
      fr: "La magie des intérêts composés : Votre argent dans 10, 20, 30 ans",
      de: "Die Magie des Zinseszinses: Ihr Geld in 10, 20, 30 Jahren",
      pt: "A magia dos juros compostos: Seu dinheiro em 10, 20, 30 anos",
      ja: "複利の魔法：10年・20年・30年後のお金は？",
      zh: "复利的魔力：10年、20年、30年后你的钱会变成多少？",
      ar: "سحر الفائدة المركبة: أموالك بعد 10 و20 و30 سنة",
    },
    summary: {
      ko: "복리의 원리와 72법칙, 기간별·이율별 성장표를 통해 장기 투자의 위력을 확인하세요.",
      en: "Discover the power of compound interest with the Rule of 72, growth tables, and real-world examples.",
      es: "Descubra el poder del interés compuesto con la Regla del 72 y tablas de crecimiento.",
      fr: "Découvrez la puissance des intérêts composés avec la Règle de 72 et des tableaux de croissance.",
      de: "Entdecken Sie die Kraft des Zinseszinses mit der 72er-Regel und Wachstumstabellen.",
      pt: "Descubra o poder dos juros compostos com a Regra dos 72 e tabelas de crescimento.",
      ja: "72の法則と成長表で複利の力を実感してください。",
      zh: "通过72法则和增长表发现复利的力量。",
      ar: "اكتشف قوة الفائدة المركبة مع قاعدة 72 وجداول النمو.",
    },
    content: {
      ko: `## 복리의 마법: 시간이 만드는 부의 비밀

알버트 아인슈타인이 "복리는 세계 8번째 불가사의"라고 말했다는 이야기가 있을 정도로, 복리는 자산 증식에서 가장 강력한 도구입니다. 하지만 많은 사람들이 복리의 진정한 위력을 과소평가합니다.

### 복리 공식

$$A = P \\times (1 + \\frac{r}{n})^{n \\times t}$$

- **A**: 최종 금액
- **P**: 원금 (초기 투자금)
- **r**: 연이율 (소수점)
- **n**: 연간 복리 횟수
- **t**: 투자 기간 (년)

### 72법칙: 원금이 두 배가 되는 시간

72법칙은 원금이 두 배가 되는 데 걸리는 시간을 빠르게 계산하는 방법입니다.

**두 배 소요 시간 = 72 / 연이율(%)**

| 연이율 | 원금 2배 소요 시간 |
|-------|-----------------|
| 2% | 36년 |
| 3% | 24년 |
| 5% | 14.4년 |
| 7% | 10.3년 |
| 10% | 7.2년 |
| 12% | 6년 |

### 1,000만원 투자 시 기간별·이율별 성장

| 기간 | 3% | 5% | 7% | 10% |
|------|------|------|------|------|
| 5년 | 1,159만원 | 1,276만원 | 1,403만원 | 1,611만원 |
| 10년 | 1,344만원 | 1,629만원 | 1,967만원 | 2,594만원 |
| 20년 | 1,806만원 | 2,653만원 | 3,870만원 | 6,727만원 |
| 30년 | 2,427만원 | 4,322만원 | 7,612만원 | 1억 7,449만원 |

**놀라운 사실**: 연 7%로 30년간 투자하면, 1,000만원이 **7,612만원**이 됩니다. 원금의 7.6배!

### 매월 적립의 위력

원금 없이 매월 50만원씩 적립하는 경우:

| 기간 | 총 납입금 | 연 5% 결과 | 연 7% 결과 | 연 10% 결과 |
|------|---------|-----------|-----------|-----------|
| 10년 | 6,000만원 | 7,764만원 | 8,654만원 | 10,242만원 |
| 20년 | 1.2억원 | 2.06억원 | 2.60억원 | 3.63억원 |
| 30년 | 1.8억원 | 4.16억원 | 6.10억원 | 11.30억원 |

**핵심**: 매월 50만원을 연 7%로 30년간 적립하면, 총 납입금 1.8억원이 **6.1억원**으로 늘어납니다!

### 복리의 3가지 핵심 원칙

1. **일찍 시작하라**: 10년 먼저 시작하는 것이 투자 금액을 2배로 늘리는 것보다 효과적입니다.
2. **꾸준히 투자하라**: 시장 타이밍보다 투자 기간이 더 중요합니다.
3. **수수료를 줄여라**: 연 1%의 수수료 차이가 30년 후 수천만원의 차이를 만듭니다.

### 실제 사례: 20대 vs 30대 투자 시작

| 구분 | 25세 시작 (A) | 35세 시작 (B) |
|------|-------------|-------------|
| 월 적립금 | 30만원 | 30만원 |
| 투자 기간 | 35년 (60세까지) | 25년 (60세까지) |
| 연 수익률 | 7% | 7% |
| 총 납입금 | 1.26억원 | 9,000만원 |
| **60세 시 자산** | **약 5.5억원** | **약 2.4억원** |

10년 일찍 시작한 A는 납입금 차이(3,600만원)보다 훨씬 큰 자산 차이(3.1억원)를 만들어냈습니다. 이것이 바로 복리의 마법입니다.

EasyCalcFor.me의 복리 계산기로 당신만의 투자 시뮬레이션을 해보세요.`,

      en: `## The Magic of Compound Interest

Albert Einstein reportedly called compound interest "the eighth wonder of the world." Whether or not he actually said it, the power of compound interest is undeniable.

### The Compound Interest Formula

**A = P(1 + r/n)^(nt)**

- A = Final amount, P = Principal, r = Annual rate, n = Compounding frequency, t = Time in years

### The Rule of 72

A quick way to estimate how long it takes to double your money:

**Years to Double = 72 / Interest Rate (%)**

| Rate | Time to Double |
|------|---------------|
| 3% | 24 years |
| 5% | 14.4 years |
| 7% | 10.3 years |
| 10% | 7.2 years |

### $10,000 Growth Over Time

| Period | 3% | 5% | 7% | 10% |
|--------|---------|---------|---------|----------|
| 10 yrs | $13,439 | $16,289 | $19,672 | $25,937 |
| 20 yrs | $18,061 | $26,533 | $38,697 | $67,275 |
| 30 yrs | $24,273 | $43,219 | $76,123 | $174,494 |

### Monthly Contributions: $500/month

| Period | Total Contributed | At 5% | At 7% | At 10% |
|--------|-----------------|-------|-------|--------|
| 10 yrs | $60,000 | $77,641 | $86,541 | $102,422 |
| 20 yrs | $120,000 | $205,517 | $260,464 | $363,437 |
| 30 yrs | $180,000 | $416,129 | $610,498 | $1,130,244 |

### Three Key Principles

1. **Start early** — Starting 10 years sooner beats doubling your investment amount
2. **Stay consistent** — Time in market beats timing the market
3. **Minimize fees** — A 1% fee difference compounds to millions over decades

Try our compound interest calculator to simulate your own investment journey.`,

      es: `## La magia del interés compuesto

### Fórmula del interés compuesto

**A = P(1 + r/n)^(nt)**

### La Regla del 72

**Años para duplicar = 72 / Tasa de interés (%)**

| Tasa | Tiempo para duplicar |
|------|---------------------|
| 3% | 24 años |
| 5% | 14.4 años |
| 7% | 10.3 años |
| 10% | 7.2 años |

### Crecimiento de $10,000

| Período | 3% | 5% | 7% | 10% |
|---------|---------|---------|---------|----------|
| 10 años | $13,439 | $16,289 | $19,672 | $25,937 |
| 20 años | $18,061 | $26,533 | $38,697 | $67,275 |
| 30 años | $24,273 | $43,219 | $76,123 | $174,494 |

### Tres principios clave

1. **Comience temprano** — Comenzar 10 años antes supera duplicar el monto de inversión
2. **Sea constante** — El tiempo en el mercado supera el timing del mercado
3. **Minimice las comisiones** — Una diferencia del 1% se multiplica en décadas

Pruebe nuestra calculadora de interés compuesto.`,

      fr: `## La magie des intérêts composés

### Formule des intérêts composés

**A = P(1 + r/n)^(nt)**

### La Règle de 72

**Années pour doubler = 72 / Taux d'intérêt (%)**

| Taux | Temps pour doubler |
|------|-------------------|
| 3% | 24 ans |
| 5% | 14,4 ans |
| 7% | 10,3 ans |
| 10% | 7,2 ans |

### Croissance de 10 000 $

| Période | 3% | 5% | 7% | 10% |
|---------|---------|---------|---------|----------|
| 10 ans | 13 439$ | 16 289$ | 19 672$ | 25 937$ |
| 20 ans | 18 061$ | 26 533$ | 38 697$ | 67 275$ |
| 30 ans | 24 273$ | 43 219$ | 76 123$ | 174 494$ |

### Trois principes clés

1. **Commencez tôt** — Commencer 10 ans plus tôt bat le doublement du montant
2. **Restez constant** — Le temps sur le marché bat le timing du marché
3. **Minimisez les frais** — 1% de différence se compose sur des décennies

Essayez notre calculateur d'intérêts composés.`,

      de: `## Die Magie des Zinseszinses

### Zinseszins-Formel

**A = P(1 + r/n)^(nt)**

### Die 72er-Regel

**Jahre zur Verdopplung = 72 / Zinssatz (%)**

| Zinssatz | Zeit zur Verdopplung |
|----------|---------------------|
| 3% | 24 Jahre |
| 5% | 14,4 Jahre |
| 7% | 10,3 Jahre |
| 10% | 7,2 Jahre |

### Wachstum von 10.000 $

| Zeitraum | 3% | 5% | 7% | 10% |
|----------|---------|---------|---------|----------|
| 10 Jahre | 13.439$ | 16.289$ | 19.672$ | 25.937$ |
| 20 Jahre | 18.061$ | 26.533$ | 38.697$ | 67.275$ |
| 30 Jahre | 24.273$ | 43.219$ | 76.123$ | 174.494$ |

### Drei Schlüsselprinzipien

1. **Früh beginnen** — 10 Jahre früher zu starten schlägt die Verdopplung des Betrags
2. **Konsequent bleiben** — Zeit im Markt schlägt Market-Timing
3. **Gebühren minimieren** — 1% Unterschied potenziert sich über Jahrzehnte

Probieren Sie unseren Zinseszinsrechner aus.`,

      pt: `## A magia dos juros compostos

### Fórmula dos juros compostos

**A = P(1 + r/n)^(nt)**

### A Regra dos 72

**Anos para dobrar = 72 / Taxa de juros (%)**

| Taxa | Tempo para dobrar |
|------|------------------|
| 3% | 24 anos |
| 5% | 14,4 anos |
| 7% | 10,3 anos |
| 10% | 7,2 anos |

### Crescimento de $10.000

| Período | 3% | 5% | 7% | 10% |
|---------|---------|---------|---------|----------|
| 10 anos | $13.439 | $16.289 | $19.672 | $25.937 |
| 20 anos | $18.061 | $26.533 | $38.697 | $67.275 |
| 30 anos | $24.273 | $43.219 | $76.123 | $174.494 |

### Três princípios-chave

1. **Comece cedo** — Começar 10 anos antes supera dobrar o valor investido
2. **Seja consistente** — Tempo no mercado supera timing do mercado
3. **Minimize taxas** — 1% de diferença se multiplica ao longo de décadas

Experimente nossa calculadora de juros compostos.`,

      ja: `## 複利の魔法

### 複利の公式

**A = P(1 + r/n)^(nt)**

### 72の法則

**倍増にかかる年数 = 72 / 金利（%）**

| 金利 | 倍増時間 |
|------|---------|
| 3% | 24年 |
| 5% | 14.4年 |
| 7% | 10.3年 |
| 10% | 7.2年 |

### 1,000万円の成長

| 期間 | 3% | 5% | 7% | 10% |
|------|------|------|------|------|
| 10年 | 1,344万円 | 1,629万円 | 1,967万円 | 2,594万円 |
| 20年 | 1,806万円 | 2,653万円 | 3,870万円 | 6,727万円 |
| 30年 | 2,427万円 | 4,322万円 | 7,612万円 | 1.7億円 |

### 3つの重要原則

1. **早く始める** — 10年早く始めることは投資額を倍にするより効果的
2. **一貫性を保つ** — 市場にいる時間がタイミングに勝る
3. **手数料を最小化** — 1%の差が数十年で大きな違いに

複利計算機をお試しください。`,

      zh: `## 复利的魔力

### 复利公式

**A = P(1 + r/n)^(nt)**

### 72法则

**翻倍所需年数 = 72 / 利率（%）**

| 利率 | 翻倍时间 |
|------|---------|
| 3% | 24年 |
| 5% | 14.4年 |
| 7% | 10.3年 |
| 10% | 7.2年 |

### 10,000美元的增长

| 期限 | 3% | 5% | 7% | 10% |
|------|---------|---------|---------|----------|
| 10年 | $13,439 | $16,289 | $19,672 | $25,937 |
| 20年 | $18,061 | $26,533 | $38,697 | $67,275 |
| 30年 | $24,273 | $43,219 | $76,123 | $174,494 |

### 三个关键原则

1. **尽早开始** — 早10年开始胜过加倍投资金额
2. **保持一致** — 在市场中的时间胜过把握市场时机
3. **降低费用** — 1%的费用差异在数十年后会产生巨大差距

试试我们的复利计算器。`,

      ar: `## سحر الفائدة المركبة

### صيغة الفائدة المركبة

**A = P(1 + r/n)^(nt)**

### قاعدة 72

**سنوات المضاعفة = 72 / سعر الفائدة (%)**

| السعر | وقت المضاعفة |
|-------|-------------|
| 3% | 24 سنة |
| 5% | 14.4 سنة |
| 7% | 10.3 سنة |
| 10% | 7.2 سنة |

### نمو 10,000 دولار

| الفترة | 3% | 5% | 7% | 10% |
|--------|---------|---------|---------|----------|
| 10 سنوات | $13,439 | $16,289 | $19,672 | $25,937 |
| 20 سنة | $18,061 | $26,533 | $38,697 | $67,275 |
| 30 سنة | $24,273 | $43,219 | $76,123 | $174,494 |

### ثلاثة مبادئ أساسية

1. **ابدأ مبكراً** — البدء قبل 10 سنوات يتفوق على مضاعفة مبلغ الاستثمار
2. **كن منتظماً** — الوقت في السوق يتفوق على توقيت السوق
3. **قلل الرسوم** — فرق 1% يتراكم على مدى عقود

جرب حاسبة الفائدة المركبة.`,
    },
  },
  {
    slug: "severance-pay-guide-2025",
    category: "korea",
    date: "2025-03-10",
    readingTime: 8,
    calculatorLink: "/calculator/finance/severance-pay",
    title: {
      ko: "퇴직금 계산법 완벽 가이드 (2025)",
      en: "Korean Severance Pay Calculation Guide (2025)",
      es: "Guía de cálculo de indemnización por despido en Corea (2025)",
      fr: "Guide de calcul des indemnités de départ en Corée (2025)",
      de: "Leitfaden zur Berechnung der Abfindung in Korea (2025)",
      pt: "Guia de cálculo de indenização por demissão na Coreia (2025)",
      ja: "韓国の退職金計算ガイド（2025年）",
      zh: "韩国遣散费计算指南（2025年）",
      ar: "دليل حساب مكافأة نهاية الخدمة في كوريا (2025)",
    },
    summary: {
      ko: "퇴직금 계산 공식부터 근속연수별 예시, 세금 공제, 중간정산까지 퇴직금의 모든 것을 알아봅니다.",
      en: "Everything about Korean severance pay: calculation formula, examples by service years, tax deductions, and FAQs.",
      es: "Todo sobre la indemnización coreana: fórmula, ejemplos por años de servicio y deducciones fiscales.",
      fr: "Tout sur l'indemnité de départ coréenne : formule, exemples par années de service et déductions fiscales.",
      de: "Alles über die koreanische Abfindung: Formel, Beispiele nach Dienstjahren und Steuerabzüge.",
      pt: "Tudo sobre a indenização coreana: fórmula, exemplos por anos de serviço e deduções fiscais.",
      ja: "韓国の退職金の全て：計算式、勤続年数別の例、税金控除、よくある質問。",
      zh: "韩国遣散费的一切：计算公式、按服务年限的示例和税收减免。",
      ar: "كل شيء عن مكافأة نهاية الخدمة الكورية: الصيغة والأمثلة حسب سنوات الخدمة والخصومات الضريبية.",
    },
    content: {
      ko: `## 퇴직금 계산법 완벽 가이드 (2025)

퇴직금은 근로자가 1년 이상 근무한 후 퇴직할 때 받는 법적으로 보장된 금액입니다. 한국에서는 근로기준법에 의해 모든 사업장에서 퇴직금 또는 퇴직연금을 의무적으로 지급해야 합니다.

### 퇴직금 계산 공식

$$퇴직금 = \\frac{1일 평균임금 \\times 30일 \\times 총 근속일수}{365}$$

**1일 평균임금 계산:**
$$1일 평균임금 = \\frac{퇴직 전 3개월간 임금 총액}{퇴직 전 3개월간 총 일수}$$

여기서 "임금 총액"에는 기본급, 각종 수당, 상여금의 3/12이 포함됩니다.

### 근속연수별 퇴직금 예시

월급 300만원(상여금 연 400%) 기준:

| 근속연수 | 3개월 임금총액 | 1일 평균임금 | 퇴직금 |
|---------|-------------|-----------|-------|
| 1년 | 1,200만원 | 131,868원 | **약 396만원** |
| 3년 | 1,200만원 | 131,868원 | **약 1,187만원** |
| 5년 | 1,200만원 | 131,868원 | **약 1,978만원** |
| 10년 | 1,200만원 | 131,868원 | **약 3,956만원** |
| 20년 | 1,200만원 | 131,868원 | **약 7,912만원** |

*참고: 위 예시는 급여가 변동 없다고 가정한 것이며, 실제로는 퇴직 전 3개월의 실제 급여로 계산합니다.*

### 퇴직금에 포함되는 항목

**포함됨:**
- 기본급
- 고정 수당 (직책수당, 자격수당 등)
- 상여금 (연간 상여금 / 12 x 3)
- 연차수당 (미사용 연차에 대한 수당)

**포함 안 됨:**
- 실비변상 성격의 금품 (출장비, 교통비 실비)
- 임의적/은혜적 금품
- 비과세 식대 (일부 논란 있음)

### 퇴직금 세금

퇴직금에는 **퇴직소득세**가 부과됩니다. 근속연수가 길수록 세금 부담이 줄어드는 구조입니다.

**퇴직소득세 계산 과정:**
1. 퇴직금에서 비과세 소득 차감
2. 근속연수 공제 적용
3. 환산급여 계산
4. 환산급여에 대한 세율 적용
5. 최종 세액 산출

| 근속연수 | 근속연수 공제 |
|---------|------------|
| 5년 이하 | 100만원 x 근속연수 |
| 10년 이하 | 500만원 + 200만원 x (근속연수 - 5년) |
| 20년 이하 | 1,500만원 + 250만원 x (근속연수 - 10년) |
| 20년 초과 | 4,000만원 + 300만원 x (근속연수 - 20년) |

### 중간정산

2012년 이후 퇴직금 중간정산은 원칙적으로 금지되었으나, 다음의 경우에는 예외적으로 가능합니다:

1. **무주택자의 주택 구입**
2. **무주택자의 전세금 부담** (본인 명의 임차)
3. **6개월 이상 요양이 필요한 질병·부상** (본인 또는 부양가족)
4. **파산 선고 또는 개인회생 절차 개시**
5. **임금피크제로 급여가 감소한 경우**
6. **천재지변 등 고용노동부장관이 정하는 사유**

### 자주 묻는 질문

**Q: 1년 미만 근무 시 퇴직금을 받을 수 있나요?**
A: 아니요. 퇴직금은 계속근로기간 1년 이상인 근로자에게만 지급됩니다.

**Q: 계약직도 퇴직금을 받나요?**
A: 네. 1년 이상 근무한 계약직 근로자도 퇴직금을 받을 수 있습니다.

**Q: 퇴직금은 언제 지급되나요?**
A: 퇴직일로부터 14일 이내에 지급해야 합니다. 지연 시 연 20%의 지연이자가 부과됩니다.

**Q: 퇴직연금(DC형)과 퇴직금의 차이는?**
A: DC형 퇴직연금은 매년 연봉의 1/12을 적립하는 방식이고, 퇴직금은 퇴직 시 일시금으로 계산합니다. 급여가 우상향하는 경우 퇴직금이 더 유리할 수 있습니다.

EasyCalcFor.me의 퇴직금 계산기로 정확한 퇴직금을 계산해보세요.`,

      en: `## Korean Severance Pay Guide (2025)

In Korea, all employers must provide severance pay (or a retirement pension) to employees who have worked for at least one year.

### Severance Pay Formula

**Severance = (Average Daily Wage x 30 x Total Service Days) / 365**

Average Daily Wage = Total wages for last 3 months / Total days in last 3 months

### Examples by Service Years

Based on monthly salary of 3M KRW (with 400% annual bonus):

| Service Years | Severance Pay |
|-------------|--------------|
| 1 year | ~3.96M KRW |
| 3 years | ~11.87M KRW |
| 5 years | ~19.78M KRW |
| 10 years | ~39.56M KRW |
| 20 years | ~79.12M KRW |

### What's Included in the Calculation

**Included:** Base salary, fixed allowances, bonuses (annual / 12 x 3), unused leave pay

**Excluded:** Reimbursements, discretionary gifts, certain meal allowances

### Tax on Severance Pay

Severance income tax is calculated with deductions that increase with service years:

| Service Years | Deduction |
|-------------|----------|
| Up to 5 | 1M KRW x years |
| Up to 10 | 5M + 2M x (years - 5) |
| Up to 20 | 15M + 2.5M x (years - 10) |
| Over 20 | 40M + 3M x (years - 20) |

### FAQs

**Can I receive severance if I worked less than 1 year?** No, minimum 1 year is required.

**Do contract workers get severance?** Yes, if they worked 1+ years.

**When must it be paid?** Within 14 days of leaving. Late payment incurs 20% annual interest.

Use our severance pay calculator for exact figures.`,

      es: `## Guía de indemnización por despido en Corea (2025)

En Corea, todos los empleadores deben proporcionar indemnización a los empleados que hayan trabajado al menos un año.

### Fórmula

**Indemnización = (Salario diario promedio x 30 x Días totales de servicio) / 365**

### Ejemplos por años de servicio

| Años de servicio | Indemnización |
|-----------------|--------------|
| 1 año | ~3.96M KRW |
| 5 años | ~19.78M KRW |
| 10 años | ~39.56M KRW |
| 20 años | ~79.12M KRW |

### Impuestos

El impuesto sobre la indemnización se calcula con deducciones que aumentan con los años de servicio.

### Preguntas frecuentes

- Mínimo 1 año de servicio requerido
- Los trabajadores contratados también reciben indemnización
- Debe pagarse dentro de 14 días

Use nuestra calculadora de indemnización para cifras exactas.`,

      fr: `## Guide des indemnités de départ en Corée (2025)

En Corée, tous les employeurs doivent fournir une indemnité de départ aux employés ayant travaillé au moins un an.

### Formule

**Indemnité = (Salaire journalier moyen x 30 x Jours de service totaux) / 365**

### Exemples par années de service

| Années de service | Indemnité |
|------------------|----------|
| 1 an | ~3,96M KRW |
| 5 ans | ~19,78M KRW |
| 10 ans | ~39,56M KRW |
| 20 ans | ~79,12M KRW |

### Impôts

L'impôt sur l'indemnité est calculé avec des déductions croissantes selon les années de service.

### Questions fréquentes

- Minimum 1 an de service requis
- Les travailleurs contractuels reçoivent aussi l'indemnité
- Doit être payée dans les 14 jours

Utilisez notre calculateur d'indemnités pour des chiffres exacts.`,

      de: `## Leitfaden zur Abfindung in Korea (2025)

In Korea müssen alle Arbeitgeber Abfindungen an Mitarbeiter zahlen, die mindestens ein Jahr gearbeitet haben.

### Formel

**Abfindung = (Durchschnittlicher Tageslohn x 30 x Gesamte Arbeitstage) / 365**

### Beispiele nach Dienstjahren

| Dienstjahre | Abfindung |
|------------|----------|
| 1 Jahr | ~3,96M KRW |
| 5 Jahre | ~19,78M KRW |
| 10 Jahre | ~39,56M KRW |
| 20 Jahre | ~79,12M KRW |

### Steuern

Die Abfindungssteuer wird mit Abzügen berechnet, die mit den Dienstjahren steigen.

### Häufige Fragen

- Mindestens 1 Jahr Dienstzeit erforderlich
- Auch Vertragsarbeiter erhalten Abfindungen
- Muss innerhalb von 14 Tagen gezahlt werden

Nutzen Sie unseren Abfindungsrechner für genaue Zahlen.`,

      pt: `## Guia de indenização na Coreia (2025)

Na Coreia, todos os empregadores devem fornecer indenização aos funcionários que trabalharam pelo menos um ano.

### Fórmula

**Indenização = (Salário diário médio x 30 x Dias totais de serviço) / 365**

### Exemplos por anos de serviço

| Anos de serviço | Indenização |
|----------------|-----------|
| 1 ano | ~3,96M KRW |
| 5 anos | ~19,78M KRW |
| 10 anos | ~39,56M KRW |
| 20 anos | ~79,12M KRW |

### Impostos

O imposto sobre a indenização é calculado com deduções crescentes por anos de serviço.

### Perguntas frequentes

- Mínimo de 1 ano de serviço necessário
- Trabalhadores contratados também recebem indenização
- Deve ser pago em 14 dias

Use nossa calculadora de indenização para valores exatos.`,

      ja: `## 韓国の退職金計算ガイド（2025年）

韓国では、すべての雇用主が1年以上勤務した従業員に退職金を支払う義務があります。

### 計算式

**退職金 = (1日平均賃金 x 30 x 総勤務日数) / 365**

### 勤続年数別の例

| 勤続年数 | 退職金 |
|---------|-------|
| 1年 | 約396万KRW |
| 5年 | 約1,978万KRW |
| 10年 | 約3,956万KRW |
| 20年 | 約7,912万KRW |

### 税金

退職金税は勤続年数が長いほど控除が大きくなります。

### よくある質問

- 最低1年の勤続が必要
- 契約社員も退職金を受け取れる
- 退職後14日以内に支払う必要がある

退職金計算機で正確な金額を計算してください。`,

      zh: `## 韩国遣散费计算指南（2025年）

在韩国，所有雇主必须向工作满一年的员工支付遣散费。

### 计算公式

**遣散费 = (日平均工资 x 30 x 总服务天数) / 365**

### 按服务年限的示例

| 服务年限 | 遣散费 |
|---------|-------|
| 1年 | 约396万韩元 |
| 5年 | 约1,978万韩元 |
| 10年 | 约3,956万韩元 |
| 20年 | 约7,912万韩元 |

### 税金

遣散费税随服务年限增加而减少。

### 常见问题

- 最少需要1年服务期
- 合同工也可获得遣散费
- 必须在离职后14天内支付

使用我们的遣散费计算器获取准确数字。`,

      ar: `## دليل حساب مكافأة نهاية الخدمة في كوريا (2025)

في كوريا، يجب على جميع أصحاب العمل دفع مكافأة نهاية الخدمة للموظفين الذين عملوا لمدة سنة على الأقل.

### الصيغة

**المكافأة = (متوسط الأجر اليومي x 30 x إجمالي أيام الخدمة) / 365**

### أمثلة حسب سنوات الخدمة

| سنوات الخدمة | المكافأة |
|-------------|---------|
| 1 سنة | ~3.96 مليون وون |
| 5 سنوات | ~19.78 مليون وون |
| 10 سنوات | ~39.56 مليون وون |
| 20 سنة | ~79.12 مليون وون |

### الضرائب

تُحسب ضريبة المكافأة مع خصومات تزداد مع سنوات الخدمة.

### الأسئلة الشائعة

- الحد الأدنى سنة واحدة من الخدمة
- العمال المتعاقدون يحصلون أيضاً على المكافأة
- يجب الدفع خلال 14 يوماً

استخدم حاسبة مكافأة نهاية الخدمة للحصول على أرقام دقيقة.`,
    },
  },
  {
    slug: "military-discharge-guide-2025",
    category: "korea",
    date: "2025-04-05",
    readingTime: 5,
    calculatorLink: "/calculator/date/military-discharge",
    title: {
      ko: "군대 전역일 계산: 2025년 군별 복무기간 총정리",
      en: "Korean Military Discharge Date Calculator: 2025 Service Periods",
      es: "Calculadora de fecha de licenciamiento militar coreano: Períodos de servicio 2025",
      fr: "Calculateur de date de libération militaire coréenne : Périodes de service 2025",
      de: "Koreanischer Militärentlassungsrechner: Dienstzeiten 2025",
      pt: "Calculadora de data de dispensa militar coreana: Períodos de serviço 2025",
      ja: "韓国軍除隊日計算：2025年軍別服務期間まとめ",
      zh: "韩国军队退伍日期计算：2025年各军种服役期限总整理",
      ar: "حاسبة تاريخ التسريح العسكري الكوري: فترات الخدمة 2025",
    },
    summary: {
      ko: "육군, 해군, 공군, 해병대, 사회복무요원 등 군별 복무기간과 전역일 계산법을 한눈에 정리합니다.",
      en: "A comprehensive guide to Korean military service periods by branch, including discharge date calculation.",
      es: "Guía completa de los períodos de servicio militar coreano por rama y cálculo de fecha de licenciamiento.",
      fr: "Guide complet des périodes de service militaire coréen par branche et calcul de la date de libération.",
      de: "Umfassender Leitfaden zu koreanischen Militärdienstzeiten nach Waffengattung und Entlassungsdatum.",
      pt: "Guia completo dos períodos de serviço militar coreano por ramo e cálculo da data de dispensa.",
      ja: "韓国軍の軍別服務期間と除隊日の計算方法を包括的にまとめたガイドです。",
      zh: "全面整理韩国各军种服役期限及退伍日期计算方法。",
      ar: "دليل شامل لفترات الخدمة العسكرية الكورية حسب الفرع وحساب تاريخ التسريح.",
    },
    content: {
      ko: `## 2025년 군별 복무기간 및 전역일 계산 완벽 가이드

대한민국 남성이라면 반드시 거쳐야 하는 병역 의무. 입대를 앞두고 있거나 현재 복무 중이라면 가장 궁금한 것이 바로 **전역일**입니다. 이 글에서는 2025년 기준 각 군별 복무기간과 전역일 계산법을 상세하게 정리합니다.

### 군별 복무기간 (2025년 기준)

병역법 개정에 따라 현재 적용되는 복무기간은 다음과 같습니다.

| 군별 | 복무기간 | 비고 |
|------|---------|------|
| 육군 | 18개월 | 가장 많은 인원이 복무 |
| 해군 | 20개월 | 함정 근무 포함 |
| 공군 | 21개월 | 기술 교육 기간 포함 |
| 해병대 | 18개월 | 육군과 동일 |
| 의무경찰(전경) | 18개월 | 2023년 폐지, 잔여 인원만 해당 |
| 사회복무요원 | 21개월 | 대체복무 |
| 해양의무경찰 | 18개월 | 해양경찰청 소속 |
| 의무소방대 | 18개월 | 소방청 소속 |

### 전역일 계산 방법

전역일은 입대일로부터 복무기간을 더한 날짜의 **전날**입니다. 예를 들어:

- **입대일**: 2025년 3월 10일
- **복무기간**: 18개월 (육군)
- **만기일**: 2026년 9월 10일
- **전역일**: 2026년 9월 9일

### 복무기간 단축 요인

1. **모범 병사 조기 전역**: 복무 중 우수한 성과를 보인 병사에게 최대 15일 조기 전역 가능
2. **포상 휴가**: 부대 기여도에 따라 추가 휴가 부여 (전역일에 영향 없음)
3. **군 복무 중 명절 근무**: 추석, 설날 근무 시 보상 휴가 부여

### 입대 전 준비 체크리스트

1. **건강검진**: 입영 전 기본 건강검진 완료
2. **필수 서류**: 주민등록등본, 가족관계증명서 등
3. **개인 물품**: 세면도구, 속옷, 간식 등 (부대별 허용 품목 확인)
4. **통신**: 부대 내 휴대폰 사용 정책 확인 (일과 후 개인 휴대폰 사용 허용)
5. **금융**: 급여 수령 계좌 개설 (국군재정관리단 자동 이체)
6. **보험**: 군인 단체보험 가입 여부 확인

### 전역 후 유용한 정보

1. **전역 후 취업 지원**: 국방부 제대군인지원센터에서 취업 상담 및 직업훈련 지원
2. **학점 인정**: 군 복무 경험에 대한 학점 인정 (대학별 상이)
3. **전역증 발급**: 전역 시 자동 발급되며, 병적증명서와 함께 보관
4. **건강보험**: 전역 후 지역가입자 또는 직장가입자로 전환 필요
5. **국민연금**: 군 복무 기간도 국민연금 크레딧으로 인정 (최대 6개월)

### 2025년 병역 관련 변경사항

- 병사 월급 인상: 병장 기준 월 125만원 (2024년 대비 인상)
- 일과 후 휴대폰 사용 확대
- 장병 복지 개선: 급식 질 향상, 생활관 리모델링 확대

EasyCalcFor.me의 군대 전역일 계산기로 정확한 전역일을 확인해보세요.`,

      en: `## Korean Military Service: 2025 Discharge Date Guide

South Korea requires all male citizens to serve in the military. Here's a summary of service periods by branch:

### Service Periods by Branch (2025)

| Branch | Duration | Notes |
|--------|----------|-------|
| Army | 18 months | Most common |
| Navy | 20 months | Includes ship duty |
| Air Force | 21 months | Includes technical training |
| Marines | 18 months | Same as Army |
| Social Service | 21 months | Alternative service |

### How to Calculate Discharge Date

The discharge date is the day before the date obtained by adding the service period to the enlistment date.

**Example**: Enlisted March 10, 2025 (Army, 18 months)
- Full term date: September 10, 2026
- Discharge date: **September 9, 2026**

### Pre-enlistment Checklist

1. Complete health examination
2. Prepare required documents
3. Pack personal items (check unit policy)
4. Set up military pay account
5. Verify insurance coverage

Use our military discharge calculator for your exact date.`,

      es: `## Servicio Militar Coreano: Guía de Fecha de Licenciamiento 2025

Corea del Sur requiere que todos los ciudadanos masculinos sirvan en el ejército. Períodos de servicio por rama:

| Rama | Duración |
|------|----------|
| Ejército | 18 meses |
| Armada | 20 meses |
| Fuerza Aérea | 21 meses |
| Marines | 18 meses |
| Servicio Social | 21 meses |

La fecha de licenciamiento se calcula sumando el período de servicio a la fecha de alistamiento y restando un día.

Use nuestra calculadora de licenciamiento militar para su fecha exacta.`,

      fr: `## Service Militaire Coréen : Guide de Date de Libération 2025

La Corée du Sud exige que tous les citoyens masculins effectuent leur service militaire. Périodes de service par branche :

| Branche | Durée |
|---------|-------|
| Armée de terre | 18 mois |
| Marine | 20 mois |
| Armée de l'air | 21 mois |
| Marines | 18 mois |
| Service social | 21 mois |

La date de libération se calcule en ajoutant la période de service à la date d'enrôlement, moins un jour.

Utilisez notre calculateur de date de libération militaire pour votre date exacte.`,

      de: `## Koreanischer Militärdienst: Entlassungsdatum-Leitfaden 2025

Südkorea verpflichtet alle männlichen Staatsbürger zum Militärdienst. Dienstzeiten nach Waffengattung:

| Waffengattung | Dauer |
|--------------|-------|
| Heer | 18 Monate |
| Marine | 20 Monate |
| Luftwaffe | 21 Monate |
| Marineinfanterie | 18 Monate |
| Sozialdienst | 21 Monate |

Das Entlassungsdatum wird berechnet, indem die Dienstzeit zum Einberufungsdatum addiert und ein Tag abgezogen wird.

Nutzen Sie unseren Militärentlassungsrechner für Ihr genaues Datum.`,

      pt: `## Serviço Militar Coreano: Guia de Data de Dispensa 2025

A Coreia do Sul exige que todos os cidadãos masculinos sirvam nas forças armadas. Períodos de serviço por ramo:

| Ramo | Duração |
|------|---------|
| Exército | 18 meses |
| Marinha | 20 meses |
| Força Aérea | 21 meses |
| Fuzileiros | 18 meses |
| Serviço Social | 21 meses |

A data de dispensa é calculada adicionando o período de serviço à data de alistamento e subtraindo um dia.

Use nossa calculadora de dispensa militar para sua data exata.`,

      ja: `## 韓国軍服務：2025年除隊日ガイド

韓国はすべての男性市民に兵役義務があります。軍別の服務期間：

| 軍種 | 期間 |
|------|------|
| 陸軍 | 18ヶ月 |
| 海軍 | 20ヶ月 |
| 空軍 | 21ヶ月 |
| 海兵隊 | 18ヶ月 |
| 社会服務 | 21ヶ月 |

除隊日は入隊日に服務期間を加え、1日前の日付となります。

軍除隊日計算機で正確な日付をご確認ください。`,

      zh: `## 韩国兵役：2025年退伍日期指南

韩国要求所有男性公民服兵役。各军种服役期限：

| 军种 | 期限 |
|------|------|
| 陆军 | 18个月 |
| 海军 | 20个月 |
| 空军 | 21个月 |
| 海军陆战队 | 18个月 |
| 社会服务 | 21个月 |

退伍日期的计算方法是将服役期限加到入伍日期，再减去一天。

使用我们的军队退伍日期计算器获取您的准确日期。`,

      ar: `## الخدمة العسكرية الكورية: دليل تاريخ التسريح 2025

تُلزم كوريا الجنوبية جميع المواطنين الذكور بالخدمة العسكرية. فترات الخدمة حسب الفرع:

| الفرع | المدة |
|-------|-------|
| الجيش | 18 شهراً |
| البحرية | 20 شهراً |
| القوات الجوية | 21 شهراً |
| مشاة البحرية | 18 شهراً |
| الخدمة الاجتماعية | 21 شهراً |

يُحسب تاريخ التسريح بإضافة فترة الخدمة إلى تاريخ التجنيد ثم طرح يوم واحد.

استخدم حاسبة تاريخ التسريح العسكري للحصول على تاريخك الدقيق.`,
    },
  },
  {
    slug: "annual-leave-calculation",
    category: "korea",
    date: "2025-04-04",
    readingTime: 4,
    calculatorLink: "/calculator/date/annual-leave",
    title: {
      ko: "연차 계산법: 입사일 기준 내 연차는 몇 일?",
      en: "Annual Leave Calculation in Korea: How Many Days Do You Get?",
      es: "Cálculo de vacaciones anuales en Corea: ¿Cuántos días le corresponden?",
      fr: "Calcul des congés annuels en Corée : Combien de jours avez-vous ?",
      de: "Jahresurlaub in Korea berechnen: Wie viele Tage stehen Ihnen zu?",
      pt: "Cálculo de férias anuais na Coreia: Quantos dias você tem?",
      ja: "韓国の年次有給休暇計算：入社日基準で何日もらえる？",
      zh: "韩国年假计算：以入职日为基准你能休几天？",
      ar: "حساب الإجازة السنوية في كوريا: كم يوماً تستحق؟",
    },
    summary: {
      ko: "근로기준법에 따른 연차 발생 기준, 1년 미만 근로자와 1년 이상 근로자의 차이, 가산 연차까지 완벽 정리합니다.",
      en: "A complete guide to Korean annual leave rules under the Labor Standards Act, including accrual rates and bonus days.",
      es: "Guía completa de las reglas de vacaciones anuales coreanas según la Ley de Normas Laborales.",
      fr: "Guide complet des règles de congés annuels coréens selon la Loi sur les normes du travail.",
      de: "Vollständiger Leitfaden zu koreanischen Jahresurlaubsregeln nach dem Arbeitsnormengesetz.",
      pt: "Guia completo das regras de férias anuais coreanas segundo a Lei de Padrões Trabalhistas.",
      ja: "韓国の勤労基準法に基づく年次有給休暇の発生基準と計算方法を完全解説。",
      zh: "根据韩国《劳动基准法》详解年假发生标准和计算方法。",
      ar: "دليل شامل لقواعد الإجازة السنوية الكورية وفقاً لقانون معايير العمل.",
    },
    content: {
      ko: `## 연차 유급휴가 완벽 가이드: 근로기준법 기준

직장 생활에서 가장 중요한 복지 중 하나인 연차 유급휴가. 하지만 많은 직장인이 자신의 연차가 정확히 몇 일인지, 어떻게 계산되는지 모르는 경우가 많습니다. 이 글에서는 근로기준법 제60조를 기준으로 연차 발생 규칙을 상세히 설명합니다.

### 1년 미만 근로자의 연차

입사 후 1년이 되지 않은 근로자는 **1개월 개근 시 1일**의 유급휴가가 발생합니다.

| 근속 기간 | 발생 연차 | 누적 연차 |
|----------|---------|---------|
| 1개월 | 1일 | 1일 |
| 2개월 | 1일 | 2일 |
| 3개월 | 1일 | 3일 |
| ... | ... | ... |
| 11개월 | 1일 | 11일 |

**최대 11일**까지 발생하며, 이 연차는 입사일로부터 1년 이내에 사용해야 합니다.

### 1년 이상 근로자의 연차

1년 이상 근무하고 **80% 이상 출근**한 근로자에게는 **15일**의 유급휴가가 부여됩니다.

**중요 변경사항 (2018년 법 개정)**:
- 1년 미만 기간에 사용한 연차는 1년차 15일에서 **차감하지 않습니다**.
- 즉, 입사 1년차에 최대 11일 + 1년 후 15일 = **총 26일** 사용 가능

### 가산 연차 (3년 이상 근속자)

3년 이상 계속 근무한 근로자에게는 **2년마다 1일씩** 연차가 추가됩니다. 단, 가산 연차를 포함하여 **최대 25일**을 초과할 수 없습니다.

| 근속 연수 | 기본 연차 | 가산 연차 | 총 연차 |
|----------|---------|---------|--------|
| 1년 | 15일 | 0일 | 15일 |
| 2년 | 15일 | 0일 | 15일 |
| 3년 | 15일 | 1일 | 16일 |
| 4년 | 15일 | 1일 | 16일 |
| 5년 | 15일 | 2일 | 17일 |
| 6년 | 15일 | 2일 | 17일 |
| ... | ... | ... | ... |
| 21년 | 15일 | 10일 | 25일 (최대) |
| 23년+ | 15일 | 10일 | 25일 (최대) |

### 연차 수당 (미사용 연차 보상)

사용하지 않은 연차에 대해서는 **연차 수당**을 받을 수 있습니다.

**연차 수당 계산법**:
- 연차 수당 = 1일 통상임금 × 미사용 연차일수
- 1일 통상임금 = 월 통상임금 ÷ 월 소정근로일수 (보통 209시간 기준)

**예시**: 월급 300만원, 미사용 연차 5일인 경우
- 1일 통상임금 = 3,000,000 ÷ 209 × 8 = 약 114,833원
- 연차 수당 = 114,833 × 5 = **약 574,165원**

### 연차 사용 촉진 제도

사용자가 연차 사용을 촉진하면, 근로자가 사용하지 않은 연차에 대해 수당을 지급하지 않아도 됩니다.

**연차 사용 촉진 절차**:
1. 연차 사용 기간 만료 **6개월 전**: 근로자에게 미사용 연차 일수 통보
2. 근로자는 통보 후 **10일 이내** 사용 시기를 지정
3. 미지정 시: 만료 **2개월 전**까지 사용자가 사용 시기 지정

### 자주 묻는 질문

**Q: 수습 기간에도 연차가 발생하나요?**
A: 네, 수습 기간도 근로 기간에 포함되므로 1개월 개근 시 1일의 연차가 발생합니다.

**Q: 퇴사 시 남은 연차는 어떻게 되나요?**
A: 퇴사 시 미사용 연차에 대해 연차 수당을 받을 수 있습니다. 이는 퇴직금과 별도로 지급됩니다.

**Q: 연차는 반차(반일)로도 사용할 수 있나요?**
A: 근로기준법에는 반차 규정이 없지만, 대부분의 회사에서 내부 규정으로 반차 사용을 허용합니다.

EasyCalcFor.me의 연차 계산기로 나의 정확한 연차 일수를 확인해보세요.`,

      en: `## Korean Annual Leave: A Complete Guide

Under Korea's Labor Standards Act, employees are entitled to paid annual leave. Here's how it works:

### First Year (Under 1 Year of Service)

New employees earn **1 day of leave per month** of perfect attendance, up to **11 days** in their first year.

### After 1 Year of Service

Employees who worked at least **80% of the year** receive **15 days** of annual leave. Important: The first-year monthly leave days are NOT deducted from these 15 days.

### Bonus Days (3+ Years)

After 3 years, employees earn **1 additional day every 2 years**, capped at **25 days total**.

| Years of Service | Base | Bonus | Total |
|-----------------|------|-------|-------|
| 1-2 years | 15 | 0 | 15 |
| 3-4 years | 15 | 1 | 16 |
| 5-6 years | 15 | 2 | 17 |
| 21+ years | 15 | 10 | 25 (max) |

### Unused Leave Compensation

Unused leave must be compensated financially. The daily pay rate equals monthly salary divided by standard monthly hours (209), multiplied by 8.

Use our annual leave calculator to determine your exact entitlement.`,

      es: `## Vacaciones Anuales en Corea: Guía Completa

La Ley de Normas Laborales de Corea establece el derecho a vacaciones anuales pagadas:

### Primer Año

Los nuevos empleados acumulan **1 día por mes** de asistencia perfecta, hasta **11 días**.

### Después de 1 Año

Con asistencia del **80%+**, se otorgan **15 días**. Los días del primer año no se descuentan.

### Días Adicionales (3+ Años)

Después de 3 años: **1 día adicional cada 2 años**, máximo **25 días** en total.

Las vacaciones no utilizadas deben ser compensadas económicamente.

Use nuestra calculadora de vacaciones anuales para determinar sus días exactos.`,

      fr: `## Congés Annuels en Corée : Guide Complet

La Loi sur les normes du travail de Corée prévoit des congés annuels payés :

### Première Année

Les nouveaux employés acquièrent **1 jour par mois** d'assiduité parfaite, jusqu'à **11 jours**.

### Après 1 An

Avec une assiduité de **80%+**, **15 jours** sont accordés. Les jours de la première année ne sont pas déduits.

### Jours Supplémentaires (3+ Ans)

Après 3 ans : **1 jour supplémentaire tous les 2 ans**, plafonné à **25 jours** au total.

Utilisez notre calculateur de congés annuels pour déterminer vos jours exacts.`,

      de: `## Jahresurlaub in Korea: Vollständiger Leitfaden

Das koreanische Arbeitsnormengesetz regelt den bezahlten Jahresurlaub:

### Erstes Jahr

Neue Mitarbeiter erhalten **1 Tag pro Monat** bei voller Anwesenheit, maximal **11 Tage**.

### Nach 1 Jahr

Bei **80%+ Anwesenheit** werden **15 Tage** gewährt. Die Tage des ersten Jahres werden nicht abgezogen.

### Zusatztage (3+ Jahre)

Nach 3 Jahren: **1 zusätzlicher Tag alle 2 Jahre**, maximal **25 Tage** insgesamt.

Nutzen Sie unseren Jahresurlaubsrechner, um Ihre genauen Tage zu berechnen.`,

      pt: `## Férias Anuais na Coreia: Guia Completo

A Lei de Padrões Trabalhistas da Coreia prevê férias anuais remuneradas:

### Primeiro Ano

Novos funcionários acumulam **1 dia por mês** de presença perfeita, até **11 dias**.

### Após 1 Ano

Com presença de **80%+**, são concedidos **15 dias**. Os dias do primeiro ano não são descontados.

### Dias Adicionais (3+ Anos)

Após 3 anos: **1 dia adicional a cada 2 anos**, máximo de **25 dias** no total.

Use nossa calculadora de férias anuais para determinar seus dias exatos.`,

      ja: `## 韓国の年次有給休暇：完全ガイド

韓国の勤労基準法に基づく年次有給休暇制度：

### 入社1年目

新入社員は**毎月皆勤で1日**、最大**11日**の有給休暇が発生します。

### 1年以上勤務後

**出勤率80%以上**で**15日**の年次休暇が付与されます。1年目の月次休暇は差し引かれません。

### 加算休暇（3年以上）

3年以上勤続で**2年ごとに1日追加**、最大**25日**まで。

| 勤続年数 | 基本 | 加算 | 合計 |
|---------|------|------|------|
| 1-2年 | 15日 | 0日 | 15日 |
| 3-4年 | 15日 | 1日 | 16日 |
| 5-6年 | 15日 | 2日 | 17日 |
| 21年以上 | 15日 | 10日 | 25日（上限）|

年次有給休暇計算機で正確な日数をご確認ください。`,

      zh: `## 韩国年假：完整指南

根据韩国《劳动基准法》的年假制度：

### 入职第一年

新员工**每月全勤可获1天**假期，最多**11天**。

### 工作满1年后

**出勤率80%以上**的员工可获得**15天**年假。第一年的月假不会被扣除。

### 额外假期（3年以上）

工作满3年后，**每2年增加1天**，最多**25天**。

未使用的年假必须以工资形式补偿。

使用我们的年假计算器确定您的准确天数。`,

      ar: `## الإجازة السنوية في كوريا: دليل شامل

ينظم قانون معايير العمل الكوري الإجازة السنوية المدفوعة:

### السنة الأولى

يحصل الموظفون الجدد على **يوم واحد شهرياً** عند الحضور الكامل، بحد أقصى **11 يوماً**.

### بعد سنة واحدة

بنسبة حضور **80%+**، يُمنح **15 يوماً**. أيام السنة الأولى لا تُخصم.

### أيام إضافية (3+ سنوات)

بعد 3 سنوات: **يوم إضافي كل سنتين**، بحد أقصى **25 يوماً** إجمالاً.

استخدم حاسبة الإجازة السنوية لتحديد أيامك الدقيقة.`,
    },
  },
  {
    slug: "sleep-cycle-guide",
    category: "health",
    date: "2025-04-03",
    readingTime: 4,
    calculatorLink: "/calculator/health/sleep",
    title: {
      ko: "수면 사이클 계산: 몇 시에 자야 개운할까?",
      en: "Sleep Cycle Calculator: What Time Should You Go to Bed?",
      es: "Calculadora de ciclos de sueño: ¿A qué hora deberías acostarte?",
      fr: "Calculateur de cycles de sommeil : À quelle heure devriez-vous vous coucher ?",
      de: "Schlafzyklus-Rechner: Wann sollten Sie ins Bett gehen?",
      pt: "Calculadora de ciclos de sono: A que horas você deveria dormir?",
      ja: "睡眠サイクル計算：何時に寝ればスッキリ起きられる？",
      zh: "睡眠周期计算：几点睡觉才能精神饱满地起床？",
      ar: "حاسبة دورات النوم: متى يجب أن تذهب إلى الفراش؟",
    },
    summary: {
      ko: "90분 수면 사이클의 원리와 나이별 권장 수면시간, 수면의 질을 높이는 과학적 방법을 알아봅니다.",
      en: "Learn the science behind 90-minute sleep cycles, recommended sleep hours by age, and tips to improve sleep quality.",
      es: "Aprenda la ciencia detrás de los ciclos de sueño de 90 minutos y consejos para mejorar la calidad del sueño.",
      fr: "Découvrez la science des cycles de sommeil de 90 minutes et des conseils pour améliorer la qualité du sommeil.",
      de: "Erfahren Sie die Wissenschaft hinter 90-Minuten-Schlafzyklen und Tipps zur Verbesserung der Schlafqualität.",
      pt: "Aprenda a ciência por trás dos ciclos de sono de 90 minutos e dicas para melhorar a qualidade do sono.",
      ja: "90分睡眠サイクルの科学と年齢別推奨睡眠時間、睡眠の質を高める方法を解説します。",
      zh: "了解90分钟睡眠周期的科学原理、各年龄段推荐睡眠时间以及提高睡眠质量的方法。",
      ar: "تعرف على علم دورات النوم كل 90 دقيقة ونصائح لتحسين جودة النوم.",
    },
    content: {
      ko: `## 수면 사이클 완벽 가이드: 개운한 아침을 위한 과학적 수면법

매일 아침 알람이 울릴 때 몸이 천근만근 무겁게 느껴지신 적 있나요? 충분히 잤는데도 피곤한 이유는 **수면 사이클**과 관련이 있을 수 있습니다.

### 수면 사이클이란?

수면은 약 **90분(1.5시간)** 단위로 하나의 사이클을 구성합니다. 각 사이클은 다음 단계를 거칩니다:

1. **1단계 (NREM 1)** — 얕은 수면 (5-10분): 눈을 감고 졸기 시작
2. **2단계 (NREM 2)** — 가벼운 수면 (약 20분): 체온 저하, 심박수 감소
3. **3단계 (NREM 3)** — 깊은 수면 (약 30-40분): 신체 회복, 성장호르몬 분비
4. **REM 수면** — 꿈을 꾸는 수면 (약 10-20분): 기억 정리, 학습 강화

### 왜 90분 단위가 중요한가?

깊은 수면(3단계) 도중에 깨어나면 **수면 관성(sleep inertia)**이 발생하여 극심한 피로감과 멍한 느낌을 경험합니다. 반면, 수면 사이클이 완료되는 시점(특히 REM 수면 직후)에 깨어나면 **개운하고 상쾌한 기분**으로 일어날 수 있습니다.

### 기상 시간별 최적 취침 시간

기상 시간 오전 6시 기준으로 권장 취침 시간:

| 수면 사이클 수 | 수면 시간 | 취침 시간 | 권장도 |
|-------------|---------|---------|-------|
| 6 사이클 | 9시간 | 오후 9:00 | ★★★★★ (최적) |
| 5 사이클 | 7시간 30분 | 오후 10:30 | ★★★★★ (최적) |
| 4 사이클 | 6시간 | 자정 12:00 | ★★★★ (양호) |
| 3 사이클 | 4시간 30분 | 오전 1:30 | ★★ (최소) |

**참고**: 잠들기까지 평균 **14분**이 소요되므로, 위 시간보다 14분 일찍 침대에 누우세요.

### 나이별 권장 수면시간 (미국수면재단 기준)

| 나이 | 권장 수면시간 | 사이클 수 |
|------|------------|---------|
| 신생아 (0-3개월) | 14-17시간 | - |
| 영아 (4-11개월) | 12-15시간 | - |
| 유아 (1-2세) | 11-14시간 | - |
| 미취학 (3-5세) | 10-13시간 | - |
| 학령기 (6-13세) | 9-11시간 | 6-7 |
| 청소년 (14-17세) | 8-10시간 | 5-6 |
| 성인 (18-64세) | 7-9시간 | 5-6 |
| 노인 (65세+) | 7-8시간 | 5 |

### 수면의 질을 높이는 7가지 방법

1. **일정한 수면 시간 유지**: 주말에도 같은 시간에 자고 일어나세요
2. **취침 1시간 전 블루라이트 차단**: 스마트폰, 태블릿 사용 자제
3. **카페인 섭취 제한**: 오후 2시 이후 카페인 섭취 금지
4. **적정 실내 온도**: 18-20°C가 수면에 최적
5. **규칙적인 운동**: 취침 3시간 전까지 운동 완료
6. **취침 전 루틴**: 따뜻한 샤워, 독서 등 일정한 루틴 만들기
7. **알코올 제한**: 알코올은 수면의 질을 떨어뜨립니다

EasyCalcFor.me의 수면 사이클 계산기로 오늘 밤 최적의 취침 시간을 확인해보세요.`,

      en: `## Sleep Cycle Guide: The Science of Waking Up Refreshed

Ever wonder why you sometimes wake up groggy even after 8 hours of sleep? The answer lies in **sleep cycles**.

### How Sleep Cycles Work

Sleep occurs in approximately **90-minute cycles**, each consisting of:

1. **Stage 1 (NREM 1)** — Light sleep (5-10 min): Drifting off
2. **Stage 2 (NREM 2)** — Light sleep (20 min): Body temperature drops
3. **Stage 3 (NREM 3)** — Deep sleep (30-40 min): Physical restoration
4. **REM Sleep** — Dream sleep (10-20 min): Memory consolidation

### Why 90 Minutes Matters

Waking during deep sleep causes **sleep inertia** — that heavy, foggy feeling. Waking at the end of a cycle (after REM) leaves you feeling **refreshed and alert**.

### Optimal Bedtimes for a 6:00 AM Wake-Up

| Cycles | Sleep Duration | Bedtime | Rating |
|--------|---------------|---------|--------|
| 6 cycles | 9 hours | 9:00 PM | Best |
| 5 cycles | 7.5 hours | 10:30 PM | Great |
| 4 cycles | 6 hours | 12:00 AM | Good |
| 3 cycles | 4.5 hours | 1:30 AM | Minimum |

**Note**: Add 14 minutes to account for the average time to fall asleep.

### Recommended Sleep by Age (National Sleep Foundation)

| Age Group | Recommended Hours |
|-----------|------------------|
| Newborns (0-3 months) | 14-17 hours |
| Infants (4-11 months) | 12-15 hours |
| Toddlers (1-2 years) | 11-14 hours |
| Preschool (3-5 years) | 10-13 hours |
| School Age (6-13) | 9-11 hours |
| Teens (14-17) | 8-10 hours |
| Adults (18-64) | 7-9 hours |
| Seniors (65+) | 7-8 hours |

### 7 Tips for Better Sleep

1. **Keep a consistent schedule** — even on weekends
2. **Block blue light** — no screens 1 hour before bed
3. **Limit caffeine** — none after 2:00 PM
4. **Optimize room temperature** — 65-68°F (18-20°C) is ideal
5. **Exercise regularly** — finish at least 3 hours before bed
6. **Create a bedtime routine** — warm shower, reading, etc.
7. **Limit alcohol** — it disrupts sleep quality

Use our sleep cycle calculator to find your optimal bedtime tonight.`,

      es: `## Guía de Ciclos de Sueño: La Ciencia de Despertar Descansado

¿Alguna vez se preguntó por qué a veces despierta aturdido incluso después de dormir 8 horas? La respuesta está en los **ciclos de sueño**.

### Cómo Funcionan los Ciclos de Sueño

El sueño ocurre en ciclos de aproximadamente **90 minutos**, cada uno con:

1. **Etapa 1 (NREM 1)** — Sueño ligero (5-10 min)
2. **Etapa 2 (NREM 2)** — Sueño ligero (20 min)
3. **Etapa 3 (NREM 3)** — Sueño profundo (30-40 min): Restauración física
4. **Sueño REM** — Sueño de ensueño (10-20 min): Consolidación de memoria

### Horas de Sueño Recomendadas por Edad

| Grupo de Edad | Horas Recomendadas |
|--------------|-------------------|
| Recién nacidos (0-3 meses) | 14-17 horas |
| Niños (6-13 años) | 9-11 horas |
| Adolescentes (14-17) | 8-10 horas |
| Adultos (18-64) | 7-9 horas |
| Adultos mayores (65+) | 7-8 horas |

### 7 Consejos para Dormir Mejor

1. Mantenga un horario constante
2. Bloquee la luz azul antes de dormir
3. Limite la cafeína después de las 2 PM
4. Optimice la temperatura de la habitación (18-20°C)
5. Haga ejercicio regularmente
6. Cree una rutina antes de dormir
7. Limite el alcohol

Use nuestra calculadora de ciclos de sueño para encontrar su hora ideal de dormir.`,

      fr: `## Guide des Cycles de Sommeil : La Science du Réveil en Forme

Vous êtes-vous déjà demandé pourquoi vous vous réveillez parfois groggy même après 8 heures de sommeil ? La réponse réside dans les **cycles de sommeil**.

### Comment Fonctionnent les Cycles de Sommeil

Le sommeil se déroule en cycles d'environ **90 minutes**, comprenant :

1. **Phase 1 (NREM 1)** — Sommeil léger (5-10 min)
2. **Phase 2 (NREM 2)** — Sommeil léger (20 min)
3. **Phase 3 (NREM 3)** — Sommeil profond (30-40 min) : Restauration physique
4. **Sommeil REM** — Sommeil paradoxal (10-20 min) : Consolidation de la mémoire

### Heures de Sommeil Recommandées par Âge

| Groupe d'Âge | Heures Recommandées |
|-------------|-------------------|
| Nouveau-nés (0-3 mois) | 14-17 heures |
| Enfants (6-13 ans) | 9-11 heures |
| Adolescents (14-17) | 8-10 heures |
| Adultes (18-64) | 7-9 heures |
| Seniors (65+) | 7-8 heures |

### 7 Conseils pour Mieux Dormir

1. Gardez un horaire régulier
2. Bloquez la lumière bleue avant le coucher
3. Limitez la caféine après 14h
4. Optimisez la température de la chambre (18-20°C)
5. Faites de l'exercice régulièrement
6. Créez une routine du coucher
7. Limitez l'alcool

Utilisez notre calculateur de cycles de sommeil pour trouver votre heure idéale de coucher.`,

      de: `## Schlafzyklus-Leitfaden: Die Wissenschaft des Erfrischten Aufwachens

Haben Sie sich jemals gefragt, warum Sie manchmal benommen aufwachen, obwohl Sie 8 Stunden geschlafen haben? Die Antwort liegt in den **Schlafzyklen**.

### Wie Schlafzyklen Funktionieren

Schlaf verläuft in Zyklen von etwa **90 Minuten**, bestehend aus:

1. **Phase 1 (NREM 1)** — Leichter Schlaf (5-10 Min.)
2. **Phase 2 (NREM 2)** — Leichter Schlaf (20 Min.)
3. **Phase 3 (NREM 3)** — Tiefschlaf (30-40 Min.): Körperliche Regeneration
4. **REM-Schlaf** — Traumschlaf (10-20 Min.): Gedächtniskonsolidierung

### Empfohlene Schlafstunden nach Alter

| Altersgruppe | Empfohlene Stunden |
|-------------|-------------------|
| Neugeborene (0-3 Monate) | 14-17 Stunden |
| Kinder (6-13 Jahre) | 9-11 Stunden |
| Jugendliche (14-17) | 8-10 Stunden |
| Erwachsene (18-64) | 7-9 Stunden |
| Senioren (65+) | 7-8 Stunden |

### 7 Tipps für Besseren Schlaf

1. Halten Sie einen regelmäßigen Zeitplan ein
2. Blockieren Sie blaues Licht vor dem Schlafengehen
3. Kein Koffein nach 14 Uhr
4. Optimale Raumtemperatur: 18-20°C
5. Regelmäßig Sport treiben
6. Schaffen Sie eine Schlafroutine
7. Alkohol einschränken

Nutzen Sie unseren Schlafzyklus-Rechner, um Ihre ideale Schlafenszeit zu finden.`,

      pt: `## Guia de Ciclos de Sono: A Ciência de Acordar Descansado

Já se perguntou por que às vezes acorda grogue mesmo depois de dormir 8 horas? A resposta está nos **ciclos de sono**.

### Como Funcionam os Ciclos de Sono

O sono ocorre em ciclos de aproximadamente **90 minutos**, cada um com:

1. **Estágio 1 (NREM 1)** — Sono leve (5-10 min)
2. **Estágio 2 (NREM 2)** — Sono leve (20 min)
3. **Estágio 3 (NREM 3)** — Sono profundo (30-40 min): Restauração física
4. **Sono REM** — Sono dos sonhos (10-20 min): Consolidação da memória

### Horas de Sono Recomendadas por Idade

| Faixa Etária | Horas Recomendadas |
|-------------|-------------------|
| Recém-nascidos (0-3 meses) | 14-17 horas |
| Crianças (6-13 anos) | 9-11 horas |
| Adolescentes (14-17) | 8-10 horas |
| Adultos (18-64) | 7-9 horas |
| Idosos (65+) | 7-8 horas |

### 7 Dicas para Dormir Melhor

1. Mantenha um horário consistente
2. Bloqueie a luz azul antes de dormir
3. Limite a cafeína após as 14h
4. Temperatura ideal do quarto: 18-20°C
5. Exercite-se regularmente
6. Crie uma rotina de sono
7. Limite o álcool

Use nossa calculadora de ciclos de sono para encontrar seu horário ideal de dormir.`,

      ja: `## 睡眠サイクルガイド：スッキリ目覚める科学

8時間寝ても目覚めがスッキリしないことはありませんか？その答えは**睡眠サイクル**にあります。

### 睡眠サイクルの仕組み

睡眠は約**90分サイクル**で構成されています：

1. **ステージ1（NREM 1）** — 浅い睡眠（5-10分）
2. **ステージ2（NREM 2）** — 軽い睡眠（20分）
3. **ステージ3（NREM 3）** — 深い睡眠（30-40分）：身体の回復
4. **レム睡眠** — 夢を見る睡眠（10-20分）：記憶の整理

### 年齢別推奨睡眠時間

| 年齢層 | 推奨時間 |
|--------|---------|
| 新生児（0-3ヶ月） | 14-17時間 |
| 小児（6-13歳） | 9-11時間 |
| 青少年（14-17歳） | 8-10時間 |
| 成人（18-64歳） | 7-9時間 |
| 高齢者（65歳+） | 7-8時間 |

### より良い睡眠のための7つのコツ

1. 一定のスケジュールを守る
2. 就寝前のブルーライトを遮断
3. 午後2時以降のカフェインを避ける
4. 室温を18-20°Cに最適化
5. 定期的に運動する
6. 就寝前のルーティンを作る
7. アルコールを控える

睡眠サイクル計算機で今夜の最適な就寝時間を確認しましょう。`,

      zh: `## 睡眠周期指南：精神饱满地起床的科学方法

你是否曾经睡了8小时却仍然感觉昏昏沉沉？答案在于**睡眠周期**。

### 睡眠周期的原理

睡眠以大约**90分钟为一个周期**，每个周期包括：

1. **第1阶段（NREM 1）** — 浅睡眠（5-10分钟）
2. **第2阶段（NREM 2）** — 轻睡眠（20分钟）
3. **第3阶段（NREM 3）** — 深睡眠（30-40分钟）：身体恢复
4. **REM睡眠** — 做梦睡眠（10-20分钟）：记忆整合

### 各年龄段推荐睡眠时间

| 年龄段 | 推荐时间 |
|--------|---------|
| 新生儿（0-3个月） | 14-17小时 |
| 儿童（6-13岁） | 9-11小时 |
| 青少年（14-17岁） | 8-10小时 |
| 成人（18-64岁） | 7-9小时 |
| 老年人（65岁+） | 7-8小时 |

### 改善睡眠质量的7个方法

1. 保持固定的作息时间
2. 睡前1小时远离蓝光
3. 下午2点后不摄入咖啡因
4. 保持室温在18-20°C
5. 规律运动
6. 建立睡前习惯
7. 限制饮酒

使用我们的睡眠周期计算器找到今晚最佳的就寝时间。`,

      ar: `## دليل دورات النوم: علم الاستيقاظ المنتعش

هل تساءلت يوماً لماذا تستيقظ أحياناً متعباً رغم نومك 8 ساعات؟ الإجابة تكمن في **دورات النوم**.

### كيف تعمل دورات النوم

يحدث النوم في دورات تقريبية مدتها **90 دقيقة**، كل منها يتكون من:

1. **المرحلة 1 (NREM 1)** — نوم خفيف (5-10 دقائق)
2. **المرحلة 2 (NREM 2)** — نوم خفيف (20 دقيقة)
3. **المرحلة 3 (NREM 3)** — نوم عميق (30-40 دقيقة): استعادة الجسم
4. **نوم REM** — نوم الأحلام (10-20 دقيقة): تعزيز الذاكرة

### ساعات النوم الموصى بها حسب العمر

| الفئة العمرية | الساعات الموصى بها |
|-------------|-------------------|
| حديثو الولادة (0-3 أشهر) | 14-17 ساعة |
| الأطفال (6-13 سنة) | 9-11 ساعة |
| المراهقون (14-17) | 8-10 ساعات |
| البالغون (18-64) | 7-9 ساعات |
| كبار السن (65+) | 7-8 ساعات |

### 7 نصائح لنوم أفضل

1. حافظ على جدول ثابت
2. تجنب الضوء الأزرق قبل النوم
3. لا كافيين بعد الساعة 2 ظهراً
4. حافظ على درجة حرارة الغرفة 18-20 درجة مئوية
5. مارس الرياضة بانتظام
6. اصنع روتيناً قبل النوم
7. قلل من الكحول

استخدم حاسبة دورات النوم لإيجاد وقت النوم المثالي الليلة.`,
    },
  },
  {
    slug: "acquisition-tax-guide-2025",
    category: "korea",
    date: "2025-04-02",
    readingTime: 5,
    calculatorLink: "/calculator/finance/acquisition-tax",
    title: {
      ko: "2025년 부동산 취득세 총정리",
      en: "2025 Korean Real Estate Acquisition Tax Guide",
      es: "Guía del impuesto de adquisición inmobiliaria en Corea 2025",
      fr: "Guide de la taxe d'acquisition immobilière en Corée 2025",
      de: "Leitfaden zur Immobilien-Erwerbsteuer in Korea 2025",
      pt: "Guia do imposto de aquisição imobiliária na Coreia 2025",
      ja: "2025年韓国不動産取得税ガイド",
      zh: "2025年韩国房地产取得税指南",
      ar: "دليل ضريبة شراء العقارات في كوريا 2025",
    },
    summary: {
      ko: "1주택부터 다주택까지 취득세율, 면적 기준 감면 혜택, 그리고 실제 계산 예시를 상세히 정리합니다.",
      en: "A comprehensive guide to Korean real estate acquisition tax rates for 1st, 2nd, and 3rd+ homes with calculation examples.",
      es: "Guía completa de las tasas del impuesto de adquisición inmobiliaria coreano con ejemplos de cálculo.",
      fr: "Guide complet des taux de taxe d'acquisition immobilière coréenne avec exemples de calcul.",
      de: "Umfassender Leitfaden zu koreanischen Immobilien-Erwerbsteuersätzen mit Berechnungsbeispielen.",
      pt: "Guia completo das taxas de imposto de aquisição imobiliária coreana com exemplos de cálculo.",
      ja: "韓国の不動産取得税率を1住宅から多住宅まで計算例付きで詳しく解説します。",
      zh: "全面整理韩国房地产取得税税率，从1套房到多套房，附计算示例。",
      ar: "دليل شامل لمعدلات ضريبة شراء العقارات الكورية مع أمثلة حسابية.",
    },
    content: {
      ko: `## 2025년 부동산 취득세 완벽 가이드

부동산을 매입할 때 반드시 납부해야 하는 세금이 바로 **취득세**입니다. 특히 한국에서는 보유 주택 수, 취득 가액, 면적에 따라 세율이 크게 달라지기 때문에 사전에 정확히 파악하는 것이 중요합니다.

### 취득세란?

취득세는 부동산, 차량 등 재산을 취득할 때 부과되는 지방세입니다. 부동산의 경우 매매 계약 후 **60일 이내**에 신고·납부해야 합니다. (상속은 6개월, 증여는 3개월)

### 1주택자 취득세율 (2025년 기준)

일반적인 주택 매매 시 1주택자(무주택자가 1주택 취득)의 취득세율:

| 취득 가액 | 세율 | 비고 |
|----------|------|------|
| 6억원 이하 | 1% | 가장 낮은 세율 |
| 6억원 초과 ~ 9억원 이하 | 1~3% | 구간별 차등 적용 |
| 9억원 초과 | 3% | 고가 주택 |

**참고**: 취득세에는 농어촌특별세(0.2%)와 지방교육세(0.1~0.3%)가 추가됩니다.

### 다주택자 취득세율

정부의 부동산 투기 억제 정책에 따라 다주택자는 높은 세율이 적용됩니다.

| 보유 주택 수 | 조정대상지역 | 비조정대상지역 |
|------------|-----------|-------------|
| 2주택 | 8% | 1~3% |
| 3주택 | 12% | 6% |
| 4주택 이상 | 12% | 6% |
| 법인 | 12% | 12% |

### 면적 기준 감면 혜택

소형 주택에 대한 취득세 감면 혜택:

| 조건 | 감면 내용 |
|------|---------|
| 전용면적 40㎡ 이하 + 취득가 1억 이하 | 취득세 면제 |
| 전용면적 60㎡ 이하 + 생애최초 주택 | 취득세 50% 감면 (최대 200만원) |
| 신혼부부 + 수도권 6억 이하 (지방 3억 이하) | 취득세 50% 감면 |

### 생애최초 주택 취득세 감면

2025년 현재 생애최초 주택 구입자에 대한 취득세 감면 제도:

- **대상**: 본인과 배우자 모두 주택을 소유한 적이 없는 경우
- **소득 요건**: 부부 합산 연소득 7,000만원 이하 (맞벌이 8,500만원 이하)
- **주택 가격**: 수도권 4억원 이하, 비수도권 3억원 이하
- **감면율**: 취득세의 50% (최대 200만원 한도)

### 실제 계산 예시

**예시 1: 무주택자가 서울 5억원 아파트 취득**
- 취득세율: 1%
- 취득세: 5억 × 1% = 500만원
- 농어촌특별세: 면제 (전용 85㎡ 이하)
- 지방교육세: 500만 × 10% = 50만원
- **총 납부액: 약 550만원**

**예시 2: 1주택자가 조정대상지역 7억원 아파트 추가 취득 (2주택)**
- 취득세율: 8%
- 취득세: 7억 × 8% = 5,600만원
- 농어촌특별세: 5,600만 × 20% = 1,120만원
- 지방교육세: 5,600만 × 10% = 560만원
- **총 납부액: 약 7,280만원**

**예시 3: 2주택자가 비조정지역 3억원 주택 추가 취득 (3주택)**
- 취득세율: 6%
- 취득세: 3억 × 6% = 1,800만원
- 농어촌특별세: 1,800만 × 20% = 360만원
- 지방교육세: 1,800만 × 10% = 180만원
- **총 납부액: 약 2,340만원**

### 취득세 납부 시 주의사항

1. **납부 기한**: 취득일로부터 60일 이내 (초과 시 가산세 부과)
2. **신고 방법**: 위택스(Wetax) 온라인 신고 또는 관할 구청 방문
3. **감면 신청**: 감면 대상인 경우 취득 시 함께 신청해야 함
4. **다주택 판정**: 세대원 전체의 주택 수를 합산하여 판정

### 2025년 변경사항

- 생애최초 주택 취득세 감면 제도 연장
- 인구감소지역 주택 취득 시 취득세 감면 특례
- 지방 미분양 주택 취득 시 세율 완화 검토 중

EasyCalcFor.me의 취득세 계산기로 정확한 취득세를 미리 확인해보세요.`,

      en: `## 2025 Korean Real Estate Acquisition Tax Guide

When buying property in Korea, you must pay an **acquisition tax**. The rate varies significantly depending on the number of homes you own and the property value.

### Tax Rates for First-Time Homeowners

| Property Value | Tax Rate |
|---------------|----------|
| Under 600M KRW | 1% |
| 600M - 900M KRW | 1-3% |
| Over 900M KRW | 3% |

Additional taxes: Rural Special Tax (0.2%) + Local Education Tax (0.1-0.3%)

### Multi-Home Owner Rates

| Homes Owned | Regulated Area | Non-regulated Area |
|------------|---------------|-------------------|
| 2nd home | 8% | 1-3% |
| 3rd home | 12% | 6% |
| 4th+ home | 12% | 6% |

### Reduction Benefits

- **First-time buyers**: 50% reduction (up to 2M KRW) for households earning under 70M KRW/year
- **Small units**: Under 40㎡ + under 100M KRW = tax exempt
- **Newlyweds**: 50% reduction for qualifying properties

### Calculation Example

**First home, 500M KRW apartment in Seoul**:
- Acquisition tax: 500M × 1% = 5M KRW
- Local education tax: 500K KRW
- **Total: approximately 5.5M KRW**

Use our acquisition tax calculator for exact figures.`,

      es: `## Impuesto de Adquisición Inmobiliaria en Corea 2025

Al comprar una propiedad en Corea, debe pagar un **impuesto de adquisición**. La tasa varía según el número de viviendas y el valor de la propiedad.

### Tasas para Primera Vivienda

| Valor de la Propiedad | Tasa |
|----------------------|------|
| Menos de 600M KRW | 1% |
| 600M - 900M KRW | 1-3% |
| Más de 900M KRW | 3% |

### Tasas para Propietarios Múltiples

| Viviendas | Zona Regulada | Zona No Regulada |
|-----------|-------------|-----------------|
| 2ª vivienda | 8% | 1-3% |
| 3ª vivienda | 12% | 6% |

Use nuestra calculadora de impuestos de adquisición para cifras exactas.`,

      fr: `## Taxe d'Acquisition Immobilière en Corée 2025

Lors de l'achat d'un bien immobilier en Corée, vous devez payer une **taxe d'acquisition**. Le taux varie selon le nombre de logements et la valeur du bien.

### Taux pour Premier Logement

| Valeur du Bien | Taux |
|---------------|------|
| Moins de 600M KRW | 1% |
| 600M - 900M KRW | 1-3% |
| Plus de 900M KRW | 3% |

### Taux pour Multi-propriétaires

| Logements | Zone Régulée | Zone Non Régulée |
|-----------|-------------|-----------------|
| 2e logement | 8% | 1-3% |
| 3e logement | 12% | 6% |

Utilisez notre calculateur de taxe d'acquisition pour des chiffres exacts.`,

      de: `## Immobilien-Erwerbsteuer in Korea 2025

Beim Kauf einer Immobilie in Korea müssen Sie eine **Erwerbsteuer** zahlen. Der Satz variiert je nach Anzahl der Wohnungen und Immobilienwert.

### Steuersätze für Erstkäufer

| Immobilienwert | Steuersatz |
|---------------|-----------|
| Unter 600M KRW | 1% |
| 600M - 900M KRW | 1-3% |
| Über 900M KRW | 3% |

### Steuersätze für Mehrfacheigentümer

| Wohnungen | Reguliertes Gebiet | Nicht reguliertes Gebiet |
|-----------|-------------------|------------------------|
| 2. Wohnung | 8% | 1-3% |
| 3. Wohnung | 12% | 6% |

Nutzen Sie unseren Erwerbsteuerrechner für genaue Zahlen.`,

      pt: `## Imposto de Aquisição Imobiliária na Coreia 2025

Ao comprar um imóvel na Coreia, você deve pagar um **imposto de aquisição**. A taxa varia conforme o número de imóveis e o valor da propriedade.

### Taxas para Primeiro Imóvel

| Valor do Imóvel | Taxa |
|----------------|------|
| Menos de 600M KRW | 1% |
| 600M - 900M KRW | 1-3% |
| Mais de 900M KRW | 3% |

### Taxas para Múltiplos Imóveis

| Imóveis | Zona Regulada | Zona Não Regulada |
|---------|-------------|------------------|
| 2º imóvel | 8% | 1-3% |
| 3º imóvel | 12% | 6% |

Use nossa calculadora de imposto de aquisição para valores exatos.`,

      ja: `## 2025年韓国不動産取得税ガイド

韓国で不動産を購入する際、**取得税**を支払う必要があります。税率は保有住宅数と不動産価額によって大きく異なります。

### 1住宅者の税率

| 取得価額 | 税率 |
|---------|------|
| 6億ウォン以下 | 1% |
| 6億～9億ウォン | 1-3% |
| 9億ウォン超 | 3% |

### 多住宅者の税率

| 保有住宅数 | 調整対象地域 | 非調整地域 |
|-----------|-----------|----------|
| 2住宅 | 8% | 1-3% |
| 3住宅 | 12% | 6% |

取得税計算機で正確な金額をご確認ください。`,

      zh: `## 2025年韩国房地产取得税指南

在韩国购买房地产时，必须缴纳**取得税**。税率因持有住宅数量和房产价值而异。

### 首套房税率

| 取得价额 | 税率 |
|---------|------|
| 6亿韩元以下 | 1% |
| 6亿～9亿韩元 | 1-3% |
| 9亿韩元以上 | 3% |

### 多套房税率

| 持有住宅数 | 调控区域 | 非调控区域 |
|-----------|---------|---------|
| 第2套 | 8% | 1-3% |
| 第3套 | 12% | 6% |

使用我们的取得税计算器获取准确金额。`,

      ar: `## دليل ضريبة شراء العقارات في كوريا 2025

عند شراء عقار في كوريا، يجب دفع **ضريبة الاستحواذ**. تختلف النسبة حسب عدد المنازل المملوكة وقيمة العقار.

### معدلات الضريبة للمشتري الأول

| قيمة العقار | النسبة |
|------------|--------|
| أقل من 600 مليون وون | 1% |
| 600-900 مليون وون | 1-3% |
| أكثر من 900 مليون وون | 3% |

### معدلات أصحاب العقارات المتعددة

| عدد المنازل | منطقة منظمة | منطقة غير منظمة |
|------------|-----------|---------------|
| المنزل الثاني | 8% | 1-3% |
| المنزل الثالث | 12% | 6% |

استخدم حاسبة ضريبة الاستحواذ للحصول على أرقام دقيقة.`,
    },
  },
  {
    slug: "tipping-guide-worldwide",
    category: "living",
    date: "2025-04-01",
    readingTime: 4,
    calculatorLink: "/calculator/finance/tip",
    title: {
      ko: "팁 문화 가이드: 나라별 팁 계산법",
      en: "Tipping Guide Worldwide: How to Calculate Tips by Country",
      es: "Guía de propinas en el mundo: Cómo calcular propinas por país",
      fr: "Guide des pourboires dans le monde : Comment calculer les pourboires par pays",
      de: "Trinkgeld-Leitfaden weltweit: Trinkgeld berechnen nach Land",
      pt: "Guia de gorjetas no mundo: Como calcular gorjetas por país",
      ja: "世界のチップガイド：国別チップの計算方法",
      zh: "全球小费指南：各国小费计算方法",
      ar: "دليل البقشيش حول العالم: كيفية حساب البقشيش حسب البلد",
    },
    summary: {
      ko: "미국, 유럽, 일본, 한국 등 주요 국가의 팁 문화와 적정 팁 비율, 팁 에티켓을 정리합니다.",
      en: "A complete guide to tipping customs around the world, including appropriate tip percentages and etiquette for major countries.",
      es: "Guía completa de costumbres de propina en el mundo, incluyendo porcentajes apropiados y etiqueta.",
      fr: "Guide complet des coutumes de pourboire dans le monde, avec les pourcentages appropriés et l'étiquette.",
      de: "Vollständiger Leitfaden zu Trinkgeldsitten weltweit, einschließlich angemessener Prozentsätze und Etikette.",
      pt: "Guia completo de costumes de gorjeta no mundo, incluindo porcentagens apropriadas e etiqueta.",
      ja: "世界各国のチップ文化と適切なチップ率、チップエチケットの完全ガイドです。",
      zh: "全球各国小费文化、适当比例及礼仪的完整指南。",
      ar: "دليل شامل لعادات البقشيش حول العالم، بما في ذلك النسب المناسبة وآداب البقشيش.",
    },
    content: {
      ko: `## 나라별 팁 문화 완벽 가이드

해외여행 시 가장 당황스러운 순간 중 하나가 바로 팁을 줘야 할 때입니다. 나라마다 팁 문화가 다르기 때문에, 사전에 알아두면 여행이 한결 편해집니다.

### 주요 국가별 팁 가이드

**미국**: 팁은 필수입니다. 서비스 종사자의 기본급이 낮기 때문에 팁이 주요 수입원입니다.
- 레스토랑: 15-20% (점심 15%, 저녁 18-20%)
- 바/카페: 음료당 $1-2 또는 15%
- 택시: 15-20%
- 호텔 벨보이: 짐당 $1-2
- 호텔 하우스키핑: 1박당 $2-5

**일본**: 팁을 주면 오히려 실례입니다. 좋은 서비스는 당연한 것으로 여겨집니다.
- 레스토랑: 팁 불필요 (서비스료 포함)
- 택시: 팁 불필요
- 호텔: 팁 불필요 (고급 료칸에서 봉투에 넣어 주는 경우는 있음)

**한국**: 일반적으로 팁 문화가 없습니다.
- 레스토랑: 팁 불필요 (봉사료 포함되는 고급 레스토랑 제외)
- 택시: 팁 불필요
- 배달: 팁 불필요

**유럽**: 나라마다 다르지만 미국보다 낮은 수준입니다.
- 영국: 서비스료 미포함 시 10-15%
- 프랑스: 서비스료 포함이 일반적 (추가 1-2유로 가능)
- 독일: 5-10% 또는 반올림
- 이탈리아: coperto(테이블 차지)가 포함, 추가 5-10% 가능

### 팁 계산 팁 (Tips for Tipping!)

1. **세전 금액 기준**: 미국에서는 세금 전 금액 기준으로 팁 계산
2. **카드 결제 시**: 영수증의 Tip란에 금액 기재 후 Total 작성
3. **그룹 식사**: 6인 이상 시 자동 18-20% 팁이 추가되는 경우가 많음
4. **현금이 더 좋아**: 직접 현금으로 주는 것이 서비스 종사자에게 더 유리

EasyCalcFor.me의 팁 계산기로 정확한 팁 금액을 간편하게 계산해보세요.`,

      en: `## The Ultimate Worldwide Tipping Guide

Navigating tipping customs can be one of the trickiest parts of international travel. Give too much, and you might seem flashy; give too little (or nothing at all), and you could come across as rude. This guide breaks down tipping etiquette across major countries so you'll never be caught off guard.

### United States: Tipping Is Expected

In the US, tipping is not optional — it's a fundamental part of the service industry. Many service workers earn a reduced minimum wage with the expectation that tips will make up the difference.

| Service | Recommended Tip |
|---------|----------------|
| Restaurants (sit-down) | 15-20% (15% lunch, 18-20% dinner) |
| Bars/Cafes | $1-2 per drink or 15% |
| Taxi/Rideshare | 15-20% |
| Hotel Bellhop | $1-2 per bag |
| Hotel Housekeeping | $2-5 per night |
| Hair Salon/Barber | 15-20% |
| Food Delivery | 15-20% or $3-5 minimum |
| Valet Parking | $2-5 |

**Pro Tips for the US**:
- Calculate tip on the **pre-tax** subtotal, not the total with tax
- For large groups (6+), an automatic gratuity of 18-20% is often added
- At buffets, tip 10% for drink refills and plate clearing
- Never tip at fast-food or counter-service restaurants

### Europe: Moderate Tipping

European tipping customs vary by country, but tips are generally lower than in the US since servers earn a living wage.

**United Kingdom**:
- Restaurants: 10-15% if service charge isn't included (check the bill!)
- Pubs: Not expected for drinks; round up for food
- Taxis: Round up to nearest pound or 10%

**France**:
- Restaurants: Service is included by law ("service compris"), but leaving 1-5€ extra for good service is appreciated
- Cafes: Round up or leave small change
- Taxis: 5-10% or round up

**Germany**:
- Restaurants: 5-10% or round up to a convenient number
- Say the total amount you want to pay when handing over cash
- Taxis: Round up to nearest euro

**Italy**:
- Restaurants: "Coperto" (cover charge, 1-3€) is standard; additional 5-10% for excellent service
- Cafes: Leave small change on the counter
- Taxis: Round up

**Spain**:
- Restaurants: 5-10% or leave small change
- Bars/Tapas: Small change or round up
- Taxis: Round up

### Japan: No Tipping

Japan is famous for its exceptional service — and its strict no-tipping culture. Leaving a tip can actually be considered **rude or confusing**, as excellent service is seen as a professional duty, not something requiring extra payment.

- Restaurants: No tip (ever)
- Taxis: No tip
- Hotels: No tip (at traditional ryokans, a "kokorozuke" in an envelope may be given, but this is rare)
- Tour guides: No tip expected

**Important**: If you accidentally leave money on the table, the staff may chase you down to return it!

### South Korea: No Tipping

Like Japan, Korea does not have a tipping culture. Service charges are typically included in prices, especially at upscale establishments.

- Restaurants: No tip needed
- Taxis: No tip needed
- Delivery: No tip needed
- Hotels: No tip expected (bellhop service may receive 1,000-2,000 KRW at luxury hotels)

### Southeast Asia: Small Tips Appreciated

**Thailand**: 20-50 THB at restaurants, round up for taxis
**Vietnam**: 5-10% at upscale restaurants, small change elsewhere
**Philippines**: 10% if service charge not included

### Middle East: Moderate Tipping

**UAE/Dubai**: 10-15% at restaurants if not included
**Turkey**: 5-10% at restaurants
**Egypt**: 10-15% ("baksheesh" culture is common)

### Quick Reference Chart

| Country | Restaurant | Taxi | Hotel |
|---------|-----------|------|-------|
| USA | 15-20% | 15-20% | $2-5/night |
| UK | 10-15% | Round up | £1-2/night |
| France | Included + 1-5€ | 5-10% | 1-2€/night |
| Germany | 5-10% | Round up | 1-2€/night |
| Italy | Coperto + 5-10% | Round up | 1-2€/night |
| Spain | 5-10% | Round up | 1€/night |
| Japan | None | None | None |
| South Korea | None | None | None |
| Thailand | 20-50 THB | Round up | 20-50 THB |
| Australia | Not expected | Round up | Not expected |

### Golden Rules of Tipping

1. **Research before you travel** — customs vary widely even within regions
2. **When in doubt, ask locals** — hotel concierges or local friends can advise
3. **Cash is king** — credit card tips don't always reach the server
4. **Check the bill** — many places include service charges already
5. **Be generous where it matters** — in countries where tips are expected, it's part of workers' livelihoods
6. **Don't force it** — in no-tip cultures, respect the local custom

Use our tip calculator to quickly figure out the right amount for any situation.`,

      es: `## Guía de Propinas en el Mundo

Navegar las costumbres de propinas puede ser complicado al viajar. Aquí está todo lo que necesita saber:

### Estados Unidos: La Propina Es Obligatoria

| Servicio | Propina Recomendada |
|----------|-------------------|
| Restaurantes | 15-20% |
| Bares/Cafés | $1-2 por bebida o 15% |
| Taxi | 15-20% |
| Hotel | $2-5 por noche |

### Europa: Propinas Moderadas

- **Reino Unido**: 10-15% si no está incluido el servicio
- **Francia**: Servicio incluido por ley; 1-5€ extra opcional
- **Alemania**: 5-10% o redondear
- **Italia**: "Coperto" incluido; 5-10% adicional opcional
- **España**: 5-10% o dejar cambio

### Japón y Corea: Sin Propinas

En ambos países, dejar propina puede considerarse descortés. El servicio excelente se considera un deber profesional.

### Tabla de Referencia Rápida

| País | Restaurante | Taxi | Hotel |
|------|-----------|------|-------|
| EE.UU. | 15-20% | 15-20% | $2-5/noche |
| Reino Unido | 10-15% | Redondear | £1-2/noche |
| Francia | Incluido + 1-5€ | 5-10% | 1-2€/noche |
| Japón | Ninguna | Ninguna | Ninguna |
| Corea | Ninguna | Ninguna | Ninguna |

### Reglas de Oro

1. Investigue antes de viajar
2. En caso de duda, pregunte a los locales
3. El efectivo es preferible
4. Revise la cuenta por cargos de servicio incluidos

Use nuestra calculadora de propinas para calcular el monto correcto.`,

      fr: `## Guide des Pourboires dans le Monde

Naviguer les coutumes de pourboire peut être délicat en voyage. Voici tout ce que vous devez savoir :

### États-Unis : Le Pourboire Est Attendu

| Service | Pourboire Recommandé |
|---------|---------------------|
| Restaurants | 15-20% |
| Bars/Cafés | 1-2$ par boisson ou 15% |
| Taxi | 15-20% |
| Hôtel | 2-5$/nuit |

### Europe : Pourboires Modérés

- **Royaume-Uni** : 10-15% si le service n'est pas inclus
- **France** : Service compris par la loi ; 1-5€ en plus apprécié
- **Allemagne** : 5-10% ou arrondir
- **Italie** : "Coperto" inclus ; 5-10% supplémentaire possible
- **Espagne** : 5-10% ou laisser la monnaie

### Japon et Corée : Pas de Pourboire

Dans les deux pays, laisser un pourboire peut être considéré impoli. Un excellent service est vu comme un devoir professionnel.

### Tableau de Référence

| Pays | Restaurant | Taxi | Hôtel |
|------|-----------|------|-------|
| USA | 15-20% | 15-20% | 2-5$/nuit |
| France | Inclus + 1-5€ | 5-10% | 1-2€/nuit |
| Japon | Aucun | Aucun | Aucun |
| Corée | Aucun | Aucun | Aucun |

Utilisez notre calculateur de pourboire pour le montant exact.`,

      de: `## Trinkgeld-Leitfaden Weltweit

Die Trinkgeldsitten beim Reisen zu navigieren kann schwierig sein. Hier ist alles, was Sie wissen müssen:

### USA: Trinkgeld Wird Erwartet

| Service | Empfohlenes Trinkgeld |
|---------|----------------------|
| Restaurants | 15-20% |
| Bars/Cafés | $1-2 pro Getränk oder 15% |
| Taxi | 15-20% |
| Hotel | $2-5/Nacht |

### Europa: Moderate Trinkgelder

- **Großbritannien**: 10-15% wenn Service nicht enthalten
- **Frankreich**: Service im Preis inbegriffen; 1-5€ extra willkommen
- **Deutschland**: 5-10% oder aufrunden
- **Italien**: "Coperto" inklusive; 5-10% zusätzlich möglich
- **Spanien**: 5-10% oder Wechselgeld lassen

### Japan und Korea: Kein Trinkgeld

In beiden Ländern kann Trinkgeld als unhöflich empfunden werden. Exzellenter Service gilt als berufliche Pflicht.

### Schnellreferenz

| Land | Restaurant | Taxi | Hotel |
|------|-----------|------|-------|
| USA | 15-20% | 15-20% | $2-5/Nacht |
| Deutschland | 5-10% | Aufrunden | 1-2€/Nacht |
| Japan | Keines | Keines | Keines |
| Korea | Keines | Keines | Keines |

Nutzen Sie unseren Trinkgeldrechner für den richtigen Betrag.`,

      pt: `## Guia de Gorjetas no Mundo

Navegar os costumes de gorjeta pode ser complicado ao viajar. Aqui está tudo que você precisa saber:

### Estados Unidos: Gorjeta É Obrigatória

| Serviço | Gorjeta Recomendada |
|---------|-------------------|
| Restaurantes | 15-20% |
| Bares/Cafés | $1-2 por bebida ou 15% |
| Táxi | 15-20% |
| Hotel | $2-5/noite |

### Europa: Gorjetas Moderadas

- **Reino Unido**: 10-15% se o serviço não estiver incluído
- **França**: Serviço incluído por lei; 1-5€ extra apreciado
- **Alemanha**: 5-10% ou arredondar
- **Itália**: "Coperto" incluído; 5-10% adicional possível
- **Espanha**: 5-10% ou deixar troco

### Japão e Coreia: Sem Gorjeta

Em ambos os países, deixar gorjeta pode ser considerado rude. Serviço excelente é visto como dever profissional.

### Tabela de Referência

| País | Restaurante | Táxi | Hotel |
|------|-----------|------|-------|
| EUA | 15-20% | 15-20% | $2-5/noite |
| França | Incluído + 1-5€ | 5-10% | 1-2€/noite |
| Japão | Nenhuma | Nenhuma | Nenhuma |
| Coreia | Nenhuma | Nenhuma | Nenhuma |

Use nossa calculadora de gorjetas para o valor correto.`,

      ja: `## 世界のチップガイド：国別チップの計算方法

海外旅行でのチップの習慣は国によって大きく異なります。ここでは主要国のチップ事情をまとめます。

### アメリカ：チップは必須

| サービス | 推奨チップ |
|---------|----------|
| レストラン | 15-20% |
| バー/カフェ | 1杯$1-2または15% |
| タクシー | 15-20% |
| ホテル | 1泊$2-5 |

### ヨーロッパ：控えめなチップ

- **イギリス**: サービス料未込みの場合10-15%
- **フランス**: サービス料込みが法律; 追加1-5€は任意
- **ドイツ**: 5-10%または切り上げ
- **イタリア**: 「コペルト」込み; 追加5-10%は任意

### 日本：チップは不要

日本ではチップを渡すことは**失礼**にあたる場合があります。優れたサービスは職業的義務と考えられています。レストラン、タクシー、ホテルすべてでチップは不要です。

### 韓国：チップは不要

韓国も日本同様、チップ文化がありません。サービス料は価格に含まれています。

### 早見表

| 国 | レストラン | タクシー | ホテル |
|----|----------|---------|--------|
| アメリカ | 15-20% | 15-20% | $2-5/泊 |
| イギリス | 10-15% | 切り上げ | £1-2/泊 |
| フランス | 込み+1-5€ | 5-10% | 1-2€/泊 |
| 日本 | なし | なし | なし |
| 韓国 | なし | なし | なし |

チップ計算機で正確な金額を簡単に計算しましょう。`,

      zh: `## 全球小费指南：各国小费计算方法

出国旅行时，小费礼仪可能让人困惑。以下是主要国家的小费文化总结：

### 美国：小费是必须的

| 服务 | 建议小费 |
|------|---------|
| 餐厅 | 15-20% |
| 酒吧/咖啡 | 每杯$1-2或15% |
| 出租车 | 15-20% |
| 酒店 | 每晚$2-5 |

### 欧洲：适度小费

- **英国**: 未含服务费时10-15%
- **法国**: 法律规定含服务费；额外1-5€表示感谢
- **德国**: 5-10%或凑整
- **意大利**: 含"Coperto"；额外5-10%可选

### 日本：不需要小费

在日本，给小费可能被视为**不礼貌**。优质服务被认为是职业本分。

### 韩国：不需要小费

与日本类似，韩国没有小费文化。服务费已包含在价格中。

### 快速参考表

| 国家 | 餐厅 | 出租车 | 酒店 |
|------|------|--------|------|
| 美国 | 15-20% | 15-20% | $2-5/晚 |
| 英国 | 10-15% | 凑整 | £1-2/晚 |
| 法国 | 已含+1-5€ | 5-10% | 1-2€/晚 |
| 日本 | 无 | 无 | 无 |
| 韩国 | 无 | 无 | 无 |

使用我们的小费计算器快速计算正确金额。`,

      ar: `## دليل البقشيش حول العالم

قد يكون التنقل بين عادات البقشيش أمراً صعباً أثناء السفر. إليك كل ما تحتاج معرفته:

### الولايات المتحدة: البقشيش متوقع

| الخدمة | البقشيش الموصى به |
|--------|------------------|
| المطاعم | 15-20% |
| البارات/المقاهي | $1-2 لكل مشروب أو 15% |
| سيارات الأجرة | 15-20% |
| الفنادق | $2-5/ليلة |

### أوروبا: بقشيش معتدل

- **بريطانيا**: 10-15% إذا لم تكن رسوم الخدمة مشمولة
- **فرنسا**: الخدمة مشمولة بالقانون؛ 1-5€ إضافية مرحب بها
- **ألمانيا**: 5-10% أو التقريب
- **إيطاليا**: "Coperto" مشمول؛ 5-10% إضافية اختيارية

### اليابان وكوريا: لا بقشيش

في كلا البلدين، قد يُعتبر البقشيش **غير مهذب**. الخدمة الممتازة تُعد واجباً مهنياً.

### جدول مرجعي سريع

| البلد | المطعم | سيارة الأجرة | الفندق |
|-------|--------|-------------|--------|
| أمريكا | 15-20% | 15-20% | $2-5/ليلة |
| بريطانيا | 10-15% | تقريب | £1-2/ليلة |
| فرنسا | مشمول+1-5€ | 5-10% | 1-2€/ليلة |
| اليابان | لا شيء | لا شيء | لا شيء |
| كوريا | لا شيء | لا شيء | لا شيء |

### القواعد الذهبية للبقشيش

1. ابحث قبل السفر
2. عند الشك، اسأل السكان المحليين
3. النقد أفضل من البطاقة
4. تحقق من الفاتورة لرسوم الخدمة المشمولة

استخدم حاسبة البقشيش لحساب المبلغ الصحيح بسرعة.`,
    },
  },
  {
    slug: "ai-calculator-guide",
    category: "living",
    date: "2025-04-06",
    readingTime: 3,
    calculatorLink: "/ai",
    title: {
      ko: "AI 계산기 완벽 가이드: 자연어로 계산하는 방법",
      en: "AI Calculator Complete Guide: How to Calculate with Natural Language",
      es: "Guía completa de la calculadora IA: Cómo calcular con lenguaje natural",
      fr: "Guide complet du calculateur IA : Comment calculer en langage naturel",
      de: "KI-Rechner Komplettanleitung: So rechnen Sie mit natürlicher Sprache",
      pt: "Guia completo da calculadora IA: Como calcular com linguagem natural",
      ja: "AI計算機完全ガイド：自然言語で計算する方法",
      zh: "AI计算器完全指南：如何用自然语言进行计算",
      ar: "دليل حاسبة الذكاء الاصطناعي الشامل: كيف تحسب بلغة طبيعية",
    },
    summary: {
      ko: "복잡한 수식 없이 일상 언어로 계산하세요. AI 계산기의 활용법, 다양한 예시, 팁을 소개합니다.",
      en: "Calculate without complex formulas using everyday language. Learn how to use the AI calculator with examples and tips.",
      es: "Calcule sin fórmulas complejas usando lenguaje cotidiano. Aprenda a usar la calculadora IA con ejemplos y consejos.",
      fr: "Calculez sans formules complexes en utilisant le langage courant. Découvrez le calculateur IA avec des exemples et astuces.",
      de: "Rechnen Sie ohne komplexe Formeln in Alltagssprache. Lernen Sie den KI-Rechner mit Beispielen und Tipps kennen.",
      pt: "Calcule sem fórmulas complexas usando linguagem do dia a dia. Aprenda a usar a calculadora IA com exemplos e dicas.",
      ja: "複雑な数式なしで日常言語で計算しましょう。AI計算機の使い方、例、コツをご紹介します。",
      zh: "无需复杂公式，用日常语言进行计算。了解AI计算器的使用方法、示例和技巧。",
      ar: "احسب بدون صيغ معقدة باستخدام اللغة اليومية. تعرف على كيفية استخدام حاسبة الذكاء الاصطناعي مع أمثلة ونصائح.",
    },
    content: {
      ko: `## AI 계산기 완벽 가이드

기존 계산기는 버튼을 누르거나 수식을 직접 입력해야 했습니다. 하지만 AI 계산기는 다릅니다. 마치 친구에게 물어보듯 자연스러운 말로 계산을 요청하면, AI가 의도를 이해하고 정확한 결과를 돌려줍니다.

### AI 계산기란?

AI 계산기는 자연어 처리(NLP) 기술을 활용한 차세대 계산 도구입니다. "월급 350만원에서 세금 떼면 얼마야?"처럼 일상 언어로 질문하면, AI가 문맥을 파악하고 적절한 공식을 적용하여 결과를 계산합니다.

### 분야별 활용 예시

#### 금융 계산
- "연봉 5000만원의 실수령액은?"
- "1억원을 연 5% 복리로 10년 투자하면?"
- "월 200만원씩 30년 납입하는 주택담보대출 총이자는?"
- "5000만원 투자해서 7000만원 됐으면 수익률은?"

#### 건강 계산
- "키 175cm 몸무게 70kg이면 BMI는?"
- "30세 남자 하루 권장 칼로리는?"
- "매일 30분 달리기하면 한 달에 몇 칼로리 소모해?"

#### 수학 계산
- "원의 넓이가 100이면 반지름은?"
- "sin(45도)의 값은?"
- "12의 팩토리얼은?"
- "삼각형 밑변 10, 높이 7의 넓이는?"

#### 일상 계산
- "서울에서 부산까지 400km를 시속 100km로 가면 몇 시간?"
- "20% 할인에 추가 10% 쿠폰 적용하면 원래 5만원짜리가 얼마?"
- "3명이서 87,000원 나누면 1인당 얼마?"
- "2025년 1월 15일부터 오늘까지 며칠?"

### 효과적으로 사용하는 팁

1. **구체적으로 질문하세요**: "이자 계산해줘"보다 "1000만원을 연 3.5%로 5년 예금하면 이자가 얼마야?"가 정확한 결과를 얻을 수 있습니다.
2. **단위를 명시하세요**: 원, 달러, kg, cm 등 단위를 함께 적으면 오해 없이 계산됩니다.
3. **복합 질문도 가능합니다**: "월세 80만원짜리 집에서 2년 살면 총 비용은? 보증금 1000만원 포함해서"처럼 여러 조건을 한 번에 물어볼 수 있습니다.
4. **풀이 과정을 확인하세요**: 결과 아래의 "풀이 과정 보기"를 클릭하면 어떻게 계산되었는지 단계별로 확인할 수 있습니다.

### 주의사항

- AI 계산기는 참고용입니다. 중요한 재무 결정은 전문가와 상담하세요.
- 세금, 보험료 등은 개인 상황에 따라 달라질 수 있습니다.
- 복잡한 세무/법률 계산은 정확도가 떨어질 수 있으니 전문 계산기를 병행하세요.
- 실시간 환율이나 주가 등 변동 데이터는 반영되지 않습니다.

### 마무리

AI 계산기는 수식을 몰라도, 계산기 사용법을 몰라도 누구나 쉽게 계산할 수 있는 도구입니다. 지금 바로 궁금한 것을 자연스럽게 물어보세요!`,

      en: `## AI Calculator Complete Guide

Traditional calculators require you to press buttons or type formulas. The AI calculator is different — just ask your question in plain English, and AI understands your intent and returns accurate results.

### What is the AI Calculator?

The AI calculator uses Natural Language Processing (NLP) technology. Ask questions like "How much will I take home from a $60,000 salary?" and the AI applies the right formulas automatically.

### Examples by Category

#### Finance
- "What's the monthly payment on a $300,000 mortgage at 6.5% for 30 years?"
- "If I invest $10,000 at 7% compound interest for 20 years, how much will I have?"
- "What's my ROI if I bought at $50 and sold at $73?"

#### Health
- "What's my BMI if I'm 5'10 and weigh 170 lbs?"
- "How many calories does a 30-year-old male need per day?"

#### Math
- "What's the area of a circle with radius 5?"
- "Calculate 15% tip on a $87 bill split 3 ways"

#### Everyday
- "How many days between January 15, 2025 and today?"
- "A $200 item with 20% off plus an extra 10% coupon — what's the final price?"

### Tips for Best Results

1. **Be specific** — include numbers, units, and time periods
2. **Specify units** — USD, kg, miles, etc.
3. **Ask complex questions** — combine multiple conditions in one query
4. **Check the steps** — click "Show Steps" to see the calculation breakdown

### Important Notes

- The AI calculator is for reference only. Consult professionals for major financial decisions.
- Tax and insurance figures may vary by personal situation.
- Real-time exchange rates and stock prices are not reflected.

Try the AI calculator now — just type your question naturally!`,

      es: `## Guía completa de la calculadora IA

Las calculadoras tradicionales requieren fórmulas. La calculadora IA entiende tu pregunta en lenguaje cotidiano y te da resultados precisos.

### Ejemplos por categoría

#### Finanzas
- "¿Cuánto pagaré mensualmente por una hipoteca de $300,000 al 6.5% a 30 años?"
- "Si invierto $10,000 al 7% de interés compuesto por 20 años, ¿cuánto tendré?"

#### Salud
- "¿Cuál es mi IMC si mido 1.75m y peso 70kg?"
- "¿Cuántas calorías necesita un hombre de 30 años al día?"

#### Matemáticas
- "¿Cuál es el área de un círculo con radio 5?"
- "Calcula el 15% de propina en una cuenta de $87 dividida entre 3"

#### Vida cotidiana
- "Un artículo de $200 con 20% de descuento más un cupón adicional del 10%"
- "¿Cuántos días hay entre el 15 de enero de 2025 y hoy?"

### Consejos

1. Sé específico con números y unidades
2. Puedes hacer preguntas complejas combinando condiciones
3. Revisa los pasos del cálculo para entender el proceso
4. Usa la calculadora como referencia, no como asesoría financiera

¡Prueba la calculadora IA ahora!`,

      fr: `## Guide complet du calculateur IA

Les calculatrices traditionnelles nécessitent des formules. Le calculateur IA comprend vos questions en langage naturel et fournit des résultats précis.

### Exemples par catégorie

#### Finance
- "Combien paierai-je par mois pour un prêt de 300 000 euros à 3% sur 25 ans ?"
- "Si j'investis 10 000 euros à 5% d'intérêt composé pendant 20 ans ?"

#### Santé
- "Quel est mon IMC si je mesure 1,75m et pèse 70kg ?"
- "Combien de calories un homme de 30 ans a-t-il besoin par jour ?"

#### Mathématiques
- "Quelle est l'aire d'un cercle de rayon 5 ?"
- "Calcule 15% de pourboire sur une note de 87 euros divisée par 3"

#### Vie quotidienne
- "Un article à 200 euros avec 20% de réduction plus un coupon de 10%"
- "Combien de jours entre le 15 janvier 2025 et aujourd'hui ?"

### Conseils

1. Soyez précis avec les chiffres et les unités
2. Combinez plusieurs conditions dans une seule question
3. Vérifiez les étapes de calcul
4. Utilisez comme référence, consultez un professionnel pour les décisions importantes

Essayez le calculateur IA maintenant !`,

      de: `## KI-Rechner Komplettanleitung

Herkömmliche Rechner erfordern Formeln. Der KI-Rechner versteht Ihre Fragen in natürlicher Sprache und liefert präzise Ergebnisse.

### Beispiele nach Kategorie

#### Finanzen
- "Wie hoch ist die monatliche Rate für einen Kredit von 300.000 Euro bei 3% auf 25 Jahre?"
- "Wenn ich 10.000 Euro bei 5% Zinseszins für 20 Jahre anlege?"

#### Gesundheit
- "Was ist mein BMI bei 1,75m und 70kg?"
- "Wie viele Kalorien braucht ein 30-jähriger Mann pro Tag?"

#### Mathematik
- "Fläche eines Kreises mit Radius 5?"
- "Berechne 15% Trinkgeld auf eine Rechnung von 87 Euro geteilt durch 3"

#### Alltag
- "Ein Artikel für 200 Euro mit 20% Rabatt plus 10% Gutschein"
- "Wie viele Tage zwischen dem 15. Januar 2025 und heute?"

### Tipps

1. Seien Sie spezifisch mit Zahlen und Einheiten
2. Kombinieren Sie mehrere Bedingungen in einer Frage
3. Prüfen Sie die Berechnungsschritte
4. Nutzen Sie den Rechner als Referenz

Probieren Sie den KI-Rechner jetzt aus!`,

      pt: `## Guia completo da calculadora IA

Calculadoras tradicionais exigem fórmulas. A calculadora IA entende suas perguntas em linguagem natural e fornece resultados precisos.

### Exemplos por categoria

#### Finanças
- "Quanto pagarei por mês em um financiamento de R$500.000 a 10% em 30 anos?"
- "Se investir R$10.000 a 5% de juros compostos por 20 anos?"

#### Saúde
- "Qual é meu IMC se meço 1,75m e peso 70kg?"
- "Quantas calorias um homem de 30 anos precisa por dia?"

#### Matemática
- "Área de um círculo com raio 5?"
- "Calcule 15% de gorjeta em uma conta de R$87 dividida por 3"

#### Dia a dia
- "Um produto de R$200 com 20% de desconto mais cupom de 10%"
- "Quantos dias entre 15 de janeiro de 2025 e hoje?"

### Dicas

1. Seja específico com números e unidades
2. Combine várias condições em uma pergunta
3. Confira os passos do cálculo
4. Use como referência, consulte profissionais para decisões importantes

Experimente a calculadora IA agora!`,

      ja: `## AI計算機完全ガイド

従来の計算機は数式の入力が必要でした。AI計算機は自然な言葉で質問するだけで、AIが意図を理解し正確な結果を返します。

### カテゴリ別の例

#### 金融
- "年収500万円の手取りは？"
- "100万円を年利5%の複利で20年運用したら？"

#### 健康
- "身長175cm体重70kgのBMIは？"
- "30歳男性の1日の推奨カロリーは？"

#### 数学
- "半径5の円の面積は？"
- "8,700円を3人で割ると1人いくら？"

#### 日常
- "2万円の商品が20%オフでさらに10%クーポン適用後の値段は？"
- "2025年1月15日から今日まで何日？"

### 効果的に使うコツ

1. 数字と単位を具体的に記載する
2. 複数の条件を一度に質問できる
3. 計算過程を確認して理解を深める
4. 重要な判断は専門家に相談する

AI計算機を今すぐ試してみましょう！`,

      zh: `## AI计算器完全指南

传统计算器需要输入公式。AI计算器不同——用日常语言提问，AI就能理解您的意图并返回准确结果。

### 分类示例

#### 金融
- "年薪50万税后到手多少？"
- "10万元按年利率5%复利投资20年能有多少？"

#### 健康
- "身高175cm体重70kg的BMI是多少？"
- "30岁男性每天需要多少卡路里？"

#### 数学
- "半径为5的圆的面积是多少？"
- "8700元3个人平分每人多少？"

#### 日常
- "200元的商品打8折再用9折优惠券后多少钱？"
- "2025年1月15日到今天有多少天？"

### 使用技巧

1. 具体说明数字和单位
2. 可以在一个问题中组合多个条件
3. 查看计算步骤了解过程
4. 重要决策请咨询专业人士

现在就试试AI计算器吧！`,

      ar: `## دليل حاسبة الذكاء الاصطناعي الشامل

الآلات الحاسبة التقليدية تتطلب صيغاً رياضية. حاسبة الذكاء الاصطناعي مختلفة — اسأل بلغتك الطبيعية وسيفهم الذكاء الاصطناعي سؤالك ويعطيك نتائج دقيقة.

### أمثلة حسب الفئة

#### المالية
- "كم سأدفع شهرياً لقرض 300,000 دولار بفائدة 6.5% لمدة 30 سنة؟"
- "إذا استثمرت 10,000 دولار بفائدة مركبة 7% لمدة 20 سنة؟"

#### الصحة
- "ما هو مؤشر كتلة الجسم إذا كان طولي 175 سم ووزني 70 كغ؟"
- "كم سعرة حرارية يحتاج رجل عمره 30 سنة يومياً؟"

#### الرياضيات
- "ما مساحة دائرة نصف قطرها 5؟"
- "احسب 15% بقشيش على فاتورة 87 دولار مقسمة على 3"

#### الحياة اليومية
- "منتج بـ 200 دولار مع خصم 20% وقسيمة إضافية 10%"
- "كم يوم بين 15 يناير 2025 واليوم؟"

### نصائح للاستخدام

1. كن محدداً بالأرقام والوحدات
2. يمكنك دمج عدة شروط في سؤال واحد
3. تحقق من خطوات الحساب
4. استخدمها كمرجع واستشر متخصصاً للقرارات المهمة

جرب حاسبة الذكاء الاصطناعي الآن!`,
    },
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostsByCategory(category?: string): BlogPost[] {
  if (!category || category === "all") return blogPosts;
  return blogPosts.filter((post) => post.category === category);
}

export function getAdjacentPosts(slug: string): { prev: BlogPost | null; next: BlogPost | null } {
  const index = blogPosts.findIndex((post) => post.slug === slug);
  return {
    prev: index > 0 ? blogPosts[index - 1] : null,
    next: index < blogPosts.length - 1 ? blogPosts[index + 1] : null,
  };
}
