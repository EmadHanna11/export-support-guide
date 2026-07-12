import { useState, useMemo } from "react";

/* ============================================================
   EXPORT SUPPORT GUIDE — Phase 1 Demo
   Bilingual (EN/AR, full RTL) · AI-generated questionnaire ·
   Six fixed pillars · Live scoring + recommendations
   ============================================================ */

const T = {
  en: {
    appName: "Export Support Guide",
    tagline: "Know where you stand. Plan where you're going.",
    poweredBy: "A CMC white-label tool — demo tenant",
    start: "Start your assessment",
    intakeTitle: "Tell us about your company and product",
    intakeSub: "Your answers shape a questionnaire written specifically for your product and target markets.",
    companyName: "Company name",
    sector: "Sector",
    sectors: ["Food & Agriculture", "Dead Sea Products & Cosmetics", "Pharmaceuticals", "Chemicals & Plastics", "Garments & Textiles", "Furniture & Wood Products", "Engineering & Metal Industries", "Packaging & Printing", "Construction Materials", "ICT / Software", "Handicrafts", "Other"],
    size: "Company size",
    sizes: ["1–9 employees", "10–49 employees", "50–249 employees", "250+ employees"],
    exportStatus: "Export status",
    statuses: ["Never exported", "Exported once or twice", "Exporting occasionally", "Exporting regularly"],
    product: "Describe your main product",
    productPh: "e.g., Extra-virgin olive oil in 500ml glass bottles, cold-pressed, from our own groves",
    uploadLabel: "Or upload a clear product photo or data sheet (image / PDF)",
    uploadBtn: "Upload & analyze",
    uploadBusy: "Analyzing your file…",
    uploadDone: "Product analyzed from your file",
    uploadTooBig: "File too large — please use a file under 8 MB.",
    uploadKeyAttrs: "Key attributes identified",
    hsBtn: "Suggest my HS code",
    hsWorking: "Analyzing your product…",
    hsLabel: "Suggested HS code",
    hsManual: "HS code — type it if you know it, or let us suggest it",
    hsPh: "e.g., 1509.10",
    hsConfidence: { high: "High confidence", medium: "Medium confidence", low: "Low confidence" },
    countries: "Target export country",
    countryOtherOpt: "Other — type it below",
    countriesPh: "Type the country name",
    selectPh: "Select…",
    generate: "Generate my questionnaire",
    generating: "Writing your questionnaire…",
    generatingSub: "The questions below are being written specifically for your product and markets — this takes a moment.",
    qTitle: "Readiness questionnaire",
    pillars: {
      product_production: "Product & Production",
      company_management: "Company & Management",
      market_knowledge: "Market Knowledge",
      financial_readiness: "Financial Readiness",
      compliance_documentation: "Compliance & Documentation",
      logistics_readiness: "Logistics Readiness",
    },
    yes: "Yes", no: "No",
    scaleLow: "Not at all", scaleHigh: "Fully",
    next: "Next pillar", back: "Back",
    finish: "Get my score",
    scoring: "Scoring your answers…",
    scoringSub: "Each pillar is scored against a fixed rubric so results are comparable and fair.",
    resultsTitle: "Your Export Readiness Score",
    tier: { t0: "Not Yet Export Ready", t1: "Developing", t2: "Export Ready", t3: "Export Advanced" },
    pillarBreakdown: "Pillar breakdown",
    recsTitle: "Your top priorities",
    restart: "Start a new assessment",
    deepDive: "Continue to full Export Plan",
    deepDiveNote: "Market fit, entry strategy, costing and documentation for your target market.",
    ddPickCountry: "Which market should the plan focus on?",
    ddGenerating: "Building your export plan…",
    ddGeneratingSub: "Analyzing market fit, entry strategy and documentation for your product and destination.",
    ddTitle: "Export Plan",
    ddFor: "Prepared for",
    ddMarket: "Market fit",
    ddEntry: "Entry strategy",
    ddDocs: "Documentation & logistics checklist",
    ddCosting: "Export costing & pricing",
    ddCostingNote: "This calculator is deterministic — the numbers are computed exactly, not AI-generated.",
    exw: "Ex-works cost per unit", qty: "Quantity (units)", inland: "Inland transport to port", freight: "International freight", insRate: "Insurance rate %", dutyRate: "Destination import duty %",
    cRow: { exwTotal: "EXW total", fob: "FOB (EXW + inland)", cif: "CIF (FOB + freight + insurance)", landed: "Landed cost (CIF + duty)", perUnit: "Landed cost per unit" },
    printPlan: "Print / save plan as PDF",
    backToResults: "Back to results",
    currency: "JOD",
    ddAction: "90-day action plan",
    phase1: "Days 1–30 · Foundations",
    phase2: "Days 31–60 · Build",
    phase3: "Days 61–90 · Launch",
    viewReport: "Compile full report",
    reportBuilding: "Compiling your report…",
    reportBuildingSub: "Assembling the executive summary and full assessment document.",
    reportTitle: "Export Readiness & Market Entry Report",
    execSummary: "Executive summary",
    scorecard: "Readiness scorecard",
    whyScore: "Why this score",
    researched: "Market analysis based on the model\u2019s knowledge base",
    methodology: "Methodology: Competence six-pillar export readiness framework · AI-assisted diagnostic · fixed scoring rubric for cross-company comparability.",
    reportDate: "Report date",
    backToPlan: "Back to plan",
    printReport: "Print / save report as PDF",
    error: "Something went wrong while contacting the AI. Your answers are safe.",
    retry: "Try again",
    required: "Please fill in the required fields.",
    answerAll: "Please answer all questions in this pillar to continue.",
    disclaimer: "Confirm final HS classification with customs or a licensed broker before shipping.",
    langBtn: "العربية",
  },
  ar: {
    appName: "دليل دعم التصدير",
    tagline: "اعرف موقعك اليوم، وخطّط لوجهتك القادمة.",
    poweredBy: "أداة بعلامة بيضاء من CMC — نسخة تجريبية",
    start: "ابدأ التقييم",
    intakeTitle: "حدّثنا عن شركتك ومنتجك",
    intakeSub: "إجاباتك هنا تُشكّل استبياناً يُكتب خصيصاً لمنتجك وأسواقك المستهدفة.",
    companyName: "اسم الشركة",
    sector: "القطاع",
    sectors: ["الأغذية والزراعة", "منتجات البحر الميت ومستحضرات التجميل", "الصناعات الدوائية", "الكيماويات والبلاستيك", "الألبسة والمنسوجات", "الأثاث والصناعات الخشبية", "الصناعات الهندسية والمعدنية", "التعبئة والتغليف والطباعة", "مواد البناء", "تكنولوجيا المعلومات / البرمجيات", "الحرف اليدوية", "أخرى"],
    size: "حجم الشركة",
    sizes: ["١–٩ موظفين", "١٠–٤٩ موظفاً", "٥٠–٢٤٩ موظفاً", "٢٥٠+ موظفاً"],
    exportStatus: "وضع التصدير الحالي",
    statuses: ["لم نصدّر من قبل", "صدّرنا مرة أو مرتين", "نصدّر بشكل متقطع", "نصدّر بانتظام"],
    product: "صف منتجك الرئيسي",
    productPh: "مثال: زيت زيتون بكر ممتاز في عبوات زجاجية ٥٠٠ مل، معصور على البارد من مزارعنا",
    uploadLabel: "أو حمّل صورة واضحة للمنتج أو نشرة بياناته (صورة / PDF)",
    uploadBtn: "حمّل وحلّل",
    uploadBusy: "جارٍ تحليل الملف…",
    uploadDone: "تم تحليل المنتج من ملفك",
    uploadTooBig: "الملف كبير جداً — يرجى استخدام ملف أقل من ٨ ميغابايت.",
    uploadKeyAttrs: "الخصائص الرئيسية المحدّدة",
    hsBtn: "اقترح رمز النظام المنسّق (HS)",
    hsWorking: "جارٍ تحليل منتجك…",
    hsLabel: "رمز HS المقترح",
    hsManual: "رمز HS — اكتبه إن كنت تعرفه، أو دعنا نقترحه",
    hsPh: "مثال: 1509.10",
    hsConfidence: { high: "ثقة عالية", medium: "ثقة متوسطة", low: "ثقة منخفضة" },
    countries: "الدولة المستهدفة للتصدير",
    countryOtherOpt: "أخرى — اكتبها أدناه",
    countriesPh: "اكتب اسم الدولة",
    selectPh: "اختر…",
    generate: "أنشئ استبياني",
    generating: "جارٍ كتابة استبيانك…",
    generatingSub: "الأسئلة تُكتب الآن خصيصاً لمنتجك وأسواقك — يستغرق ذلك لحظات.",
    qTitle: "استبيان الجاهزية",
    pillars: {
      product_production: "المنتج والإنتاج",
      company_management: "الشركة والإدارة",
      market_knowledge: "معرفة السوق",
      financial_readiness: "الجاهزية المالية",
      compliance_documentation: "الامتثال والوثائق",
      logistics_readiness: "الجاهزية اللوجستية",
    },
    yes: "نعم", no: "لا",
    scaleLow: "إطلاقاً", scaleHigh: "بشكل كامل",
    next: "الركيزة التالية", back: "رجوع",
    finish: "احصل على نتيجتي",
    scoring: "جارٍ احتساب نتيجتك…",
    scoringSub: "تُقيَّم كل ركيزة وفق معايير ثابتة لضمان نتائج عادلة وقابلة للمقارنة.",
    resultsTitle: "درجة جاهزيتك للتصدير",
    tier: { t0: "غير جاهز للتصدير بعد", t1: "في طور التطوير", t2: "جاهز للتصدير", t3: "متقدم في التصدير" },
    pillarBreakdown: "تفصيل الركائز",
    recsTitle: "أولوياتك الأهم",
    restart: "ابدأ تقييماً جديداً",
    deepDive: "تابع إلى خطة التصدير الكاملة",
    deepDiveNote: "ملاءمة السوق، استراتيجية الدخول، التكاليف والوثائق لسوقك المستهدف.",
    ddPickCountry: "على أي سوق تريد أن تركّز الخطة؟",
    ddGenerating: "جارٍ بناء خطة التصدير…",
    ddGeneratingSub: "نحلّل ملاءمة السوق واستراتيجية الدخول والوثائق المطلوبة لمنتجك ووجهتك.",
    ddTitle: "خطة التصدير",
    ddFor: "أُعدّت لـ",
    ddMarket: "ملاءمة السوق",
    ddEntry: "استراتيجية الدخول",
    ddDocs: "قائمة الوثائق واللوجستيات",
    ddCosting: "تكاليف وتسعير التصدير",
    ddCostingNote: "هذه الحاسبة حتمية — الأرقام تُحسب بدقة رياضية وليست مولّدة بالذكاء الاصطناعي.",
    exw: "تكلفة المصنع للوحدة", qty: "الكمية (وحدات)", inland: "النقل الداخلي إلى الميناء", freight: "الشحن الدولي", insRate: "نسبة التأمين %", dutyRate: "نسبة الرسوم الجمركية في الوجهة %",
    cRow: { exwTotal: "إجمالي تسليم المصنع (EXW)", fob: "فوب FOB (المصنع + النقل الداخلي)", cif: "سيف CIF (فوب + الشحن + التأمين)", landed: "التكلفة الواصلة (سيف + الرسوم)", perUnit: "التكلفة الواصلة للوحدة" },
    printPlan: "اطبع / احفظ الخطة PDF",
    backToResults: "عودة إلى النتائج",
    currency: "دينار",
    ddAction: "خطة عمل ٩٠ يوماً",
    phase1: "الأيام ١–٣٠ · التأسيس",
    phase2: "الأيام ٣١–٦٠ · البناء",
    phase3: "الأيام ٦١–٩٠ · الانطلاق",
    viewReport: "أنشئ التقرير الكامل",
    reportBuilding: "جارٍ تجميع التقرير…",
    reportBuildingSub: "نُعدّ الملخص التنفيذي ووثيقة التقييم الكاملة.",
    reportTitle: "تقرير جاهزية التصدير ودخول السوق",
    execSummary: "الملخص التنفيذي",
    scorecard: "بطاقة نتائج الجاهزية",
    whyScore: "سبب هذه النتيجة",
    researched: "تحليل السوق مبني على قاعدة معرفة النموذج",
    methodology: "المنهجية: إطار الركائز الست لجاهزية التصدير من شركة التفوق · تشخيص مدعوم بالذكاء الاصطناعي · معايير تقييم ثابتة لقابلية المقارنة بين الشركات.",
    reportDate: "تاريخ التقرير",
    backToPlan: "عودة إلى الخطة",
    printReport: "اطبع / احفظ التقرير PDF",
    error: "حدث خطأ أثناء الاتصال بالذكاء الاصطناعي. إجاباتك محفوظة.",
    retry: "حاول مجدداً",
    required: "يرجى تعبئة الحقول المطلوبة.",
    answerAll: "يرجى الإجابة على جميع أسئلة هذه الركيزة للمتابعة.",
    disclaimer: "يُرجى تأكيد التصنيف النهائي لرمز HS مع الجمارك أو وسيط مرخّص قبل الشحن.",
    langBtn: "English",
  },
};

const PILLAR_ORDER = [
  "product_production",
  "company_management",
  "market_knowledge",
  "financial_readiness",
  "compliance_documentation",
  "logistics_readiness",
];

const COUNTRIES = [
  { v: "Saudi Arabia", en: "Saudi Arabia", ar: "السعودية" },
  { v: "United Arab Emirates", en: "United Arab Emirates", ar: "الإمارات" },
  { v: "Iraq", en: "Iraq", ar: "العراق" },
  { v: "Egypt", en: "Egypt", ar: "مصر" },
  { v: "Qatar", en: "Qatar", ar: "قطر" },
  { v: "Kuwait", en: "Kuwait", ar: "الكويت" },
  { v: "Germany", en: "Germany", ar: "ألمانيا" },
  { v: "Netherlands", en: "Netherlands", ar: "هولندا" },
  { v: "United Kingdom", en: "United Kingdom", ar: "المملكة المتحدة" },
  { v: "France", en: "France", ar: "فرنسا" },
  { v: "United States", en: "United States", ar: "الولايات المتحدة" },
  { v: "Canada", en: "Canada", ar: "كندا" },
];

const COUNTRIES_ALL = [
  { v: "Albania", en: "Albania", ar: "ألبانيا" },
  { v: "Algeria", en: "Algeria", ar: "الجزائر" },
  { v: "Argentina", en: "Argentina", ar: "الأرجنتين" },
  { v: "Armenia", en: "Armenia", ar: "أرمينيا" },
  { v: "Australia", en: "Australia", ar: "أستراليا" },
  { v: "Austria", en: "Austria", ar: "النمسا" },
  { v: "Azerbaijan", en: "Azerbaijan", ar: "أذربيجان" },
  { v: "Bahrain", en: "Bahrain", ar: "البحرين" },
  { v: "Bangladesh", en: "Bangladesh", ar: "بنغلاديش" },
  { v: "Belgium", en: "Belgium", ar: "بلجيكا" },
  { v: "Bosnia and Herzegovina", en: "Bosnia and Herzegovina", ar: "البوسنة والهرسك" },
  { v: "Brazil", en: "Brazil", ar: "البرازيل" },
  { v: "Bulgaria", en: "Bulgaria", ar: "بلغاريا" },
  { v: "Cameroon", en: "Cameroon", ar: "الكاميرون" },
  { v: "Chile", en: "Chile", ar: "تشيلي" },
  { v: "China", en: "China", ar: "الصين" },
  { v: "Colombia", en: "Colombia", ar: "كولومبيا" },
  { v: "Costa Rica", en: "Costa Rica", ar: "كوستاريكا" },
  { v: "Croatia", en: "Croatia", ar: "كرواتيا" },
  { v: "Cyprus", en: "Cyprus", ar: "قبرص" },
  { v: "Czech Republic", en: "Czech Republic", ar: "التشيك" },
  { v: "Denmark", en: "Denmark", ar: "الدنمارك" },
  { v: "Djibouti", en: "Djibouti", ar: "جيبوتي" },
  { v: "Ecuador", en: "Ecuador", ar: "الإكوادور" },
  { v: "Estonia", en: "Estonia", ar: "إستونيا" },
  { v: "Ethiopia", en: "Ethiopia", ar: "إثيوبيا" },
  { v: "Finland", en: "Finland", ar: "فنلندا" },
  { v: "Georgia", en: "Georgia", ar: "جورجيا" },
  { v: "Ghana", en: "Ghana", ar: "غانا" },
  { v: "Greece", en: "Greece", ar: "اليونان" },
  { v: "Hungary", en: "Hungary", ar: "المجر" },
  { v: "Iceland", en: "Iceland", ar: "آيسلندا" },
  { v: "India", en: "India", ar: "الهند" },
  { v: "Indonesia", en: "Indonesia", ar: "إندونيسيا" },
  { v: "Ireland", en: "Ireland", ar: "أيرلندا" },
  { v: "Italy", en: "Italy", ar: "إيطاليا" },
  { v: "Japan", en: "Japan", ar: "اليابان" },
  { v: "Kazakhstan", en: "Kazakhstan", ar: "كازاخستان" },
  { v: "Kenya", en: "Kenya", ar: "كينيا" },
  { v: "South Korea", en: "South Korea", ar: "كوريا الجنوبية" },
  { v: "Latvia", en: "Latvia", ar: "لاتفيا" },
  { v: "Lebanon", en: "Lebanon", ar: "لبنان" },
  { v: "Libya", en: "Libya", ar: "ليبيا" },
  { v: "Lithuania", en: "Lithuania", ar: "ليتوانيا" },
  { v: "Luxembourg", en: "Luxembourg", ar: "لوكسمبورغ" },
  { v: "Malaysia", en: "Malaysia", ar: "ماليزيا" },
  { v: "Malta", en: "Malta", ar: "مالطا" },
  { v: "Mexico", en: "Mexico", ar: "المكسيك" },
  { v: "Moldova", en: "Moldova", ar: "مولدوفا" },
  { v: "Mongolia", en: "Mongolia", ar: "منغوليا" },
  { v: "Montenegro", en: "Montenegro", ar: "الجبل الأسود" },
  { v: "Morocco", en: "Morocco", ar: "المغرب" },
  { v: "New Zealand", en: "New Zealand", ar: "نيوزيلندا" },
  { v: "Nigeria", en: "Nigeria", ar: "نيجيريا" },
  { v: "North Macedonia", en: "North Macedonia", ar: "مقدونيا الشمالية" },
  { v: "Norway", en: "Norway", ar: "النرويج" },
  { v: "Oman", en: "Oman", ar: "عُمان" },
  { v: "Pakistan", en: "Pakistan", ar: "باكستان" },
  { v: "Palestine", en: "Palestine", ar: "فلسطين" },
  { v: "Peru", en: "Peru", ar: "بيرو" },
  { v: "Philippines", en: "Philippines", ar: "الفلبين" },
  { v: "Poland", en: "Poland", ar: "بولندا" },
  { v: "Portugal", en: "Portugal", ar: "البرتغال" },
  { v: "Romania", en: "Romania", ar: "رومانيا" },
  { v: "Russia", en: "Russia", ar: "روسيا" },
  { v: "Rwanda", en: "Rwanda", ar: "رواندا" },
  { v: "Senegal", en: "Senegal", ar: "السنغال" },
  { v: "Serbia", en: "Serbia", ar: "صربيا" },
  { v: "Singapore", en: "Singapore", ar: "سنغافورة" },
  { v: "Slovakia", en: "Slovakia", ar: "سلوفاكيا" },
  { v: "Slovenia", en: "Slovenia", ar: "سلوفينيا" },
  { v: "Somalia", en: "Somalia", ar: "الصومال" },
  { v: "South Africa", en: "South Africa", ar: "جنوب أفريقيا" },
  { v: "Spain", en: "Spain", ar: "إسبانيا" },
  { v: "Sri Lanka", en: "Sri Lanka", ar: "سريلانكا" },
  { v: "Sudan", en: "Sudan", ar: "السودان" },
  { v: "Sweden", en: "Sweden", ar: "السويد" },
  { v: "Switzerland", en: "Switzerland", ar: "سويسرا" },
  { v: "Syria", en: "Syria", ar: "سوريا" },
  { v: "Tanzania", en: "Tanzania", ar: "تنزانيا" },
  { v: "Thailand", en: "Thailand", ar: "تايلاند" },
  { v: "Tunisia", en: "Tunisia", ar: "تونس" },
  { v: "Turkey", en: "Turkey", ar: "تركيا" },
  { v: "Turkmenistan", en: "Turkmenistan", ar: "تركمانستان" },
  { v: "Uganda", en: "Uganda", ar: "أوغندا" },
  { v: "Ukraine", en: "Ukraine", ar: "أوكرانيا" },
  { v: "Uruguay", en: "Uruguay", ar: "الأوروغواي" },
  { v: "Uzbekistan", en: "Uzbekistan", ar: "أوزبكستان" },
  { v: "Venezuela", en: "Venezuela", ar: "فنزويلا" },
  { v: "Vietnam", en: "Vietnam", ar: "فيتنام" },
  { v: "Yemen", en: "Yemen", ar: "اليمن" },
  { v: "Zambia", en: "Zambia", ar: "زامبيا" },
  { v: "Zimbabwe", en: "Zimbabwe", ar: "زيمبابوي" },
];

const RUBRIC = `Fixed scoring rubric (0-100 per pillar). Anchors:
- product_production: 0=no capacity/quality control; 50=stable local production, no export certifications; 100=export-grade capacity, certified quality systems relevant to destination.
- company_management: 0=no export responsibility or language capability; 50=part-time export attention, some capability; 100=dedicated export function, international experience.
- market_knowledge: 0=no knowledge of target markets; 50=general awareness, no validated demand; 100=validated demand, known competitors, channel understanding for the named countries.
- financial_readiness: 0=no export costing or finance access; 50=basic costing, limited finance; 100=full export price build-up, trade finance access.
- compliance_documentation: 0=no registrations/certificates; 50=basic docs, gaps for destination requirements; 100=all destination-specific requirements met or in progress.
- logistics_readiness: 0=no export packaging/logistics knowledge; 50=basic understanding, no partners; 100=export packaging ready, forwarder relationships, Incoterms fluency for the trade lane.`;

// OpenRouter free auto-router: picks a working free model and filters for the
// capabilities each request needs (tools, structured output, vision).
// Fallback chain across DIFFERENT providers — when one provider throttles (429),
// the next has its own separate quota. Ordered by JSON reliability + vision support.
const OR_MODELS = [
  "google/gemma-4-31b-it:free",              // vision + tools, good JSON
  "nvidia/nemotron-3-super-120b-a12b:free",  // separate provider quota
  "openai/gpt-oss-120b:free",                // separate provider quota
  "openrouter/free",                          // auto-router, last resort
];
const OR_MODEL = OR_MODELS[0];

function extractJson(data) {
  // Surface OpenRouter/provider errors instead of silently failing to parse
  if (data?.error) {
    throw new Error("Provider error: " + (data.error.message || JSON.stringify(data.error)));
  }
  // OpenRouter/OpenAI shape: choices[0].message.content (may be string or array)
  let text = data?.choices?.[0]?.message?.content ?? "";
  if (Array.isArray(text)) {
    text = text.map((b) => (typeof b === "string" ? b : b?.text || "")).join("\n");
  }
  if (typeof text !== "string") text = String(text || "");
  // Some models emit reasoning in a separate field; fall back to it if content is empty
  if (!text.trim() && data?.choices?.[0]?.message?.reasoning) text = data.choices[0].message.reasoning;
  // Strip code fences and any <think>...</think> reasoning blocks
  let clean = text.replace(/<think>[\s\S]*?<\/think>/gi, "").replace(/```json|```/g, "").trim();
  const start = clean.indexOf("{");
  const end = clean.lastIndexOf("}");
  if (start === -1 || end === -1 || end < start) {
    throw new Error("No JSON object found in model response");
  }
  return JSON.parse(clean.slice(start, end + 1));
}

async function callClaude(prompt, _useSearch = false) {
  let lastErr;
  for (const model of OR_MODELS) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const response = await fetch("/api/claude", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model,
            max_tokens: 2000,
            response_format: { type: "json_object" },
            messages: [
              { role: "system", content: "You are a precise API that returns ONLY a single valid JSON object. No prose, no markdown, no code fences, no reasoning — just the JSON object." },
              { role: "user", content: prompt },
            ],
          }),
        });
        if (response.status === 429 || response.status >= 500) {
          // exponential backoff (1.5s, 3s, 6s) before retrying this model, then move on
          await new Promise((r) => setTimeout(r, 1500 * Math.pow(2, attempt)));
          lastErr = new Error("rate limited (" + response.status + ")");
          continue;
        }
        const data = await response.json();
        return extractJson(data);
      } catch (e) {
        lastErr = e;
        await new Promise((r) => setTimeout(r, 800));
      }
    }
  }
  throw lastErr || new Error("All models failed");
}

// No free model offers built-in web search, so research falls back to model knowledge.
async function callClaudeResearch(prompt) {
  return await callClaude(prompt, false);
}

async function callClaudeFile(base64, mediaType, prompt) {
  const dataUrl = `data:${mediaType};base64,${base64}`;
  const content = mediaType === "application/pdf"
    ? [{ type: "text", text: prompt + "\n\n(Note: a PDF data sheet was provided as an image URL below.)" },
       { type: "image_url", image_url: { url: dataUrl } }]
    : [{ type: "text", text: prompt },
       { type: "image_url", image_url: { url: dataUrl } }];
  const response = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: OR_MODEL,
      max_tokens: 2000,
      messages: [
        { role: "system", content: "You return ONLY a single valid JSON object. No prose, no markdown, no code fences." },
        { role: "user", content },
      ],
    }),
  });
  const data = await response.json();
  return extractJson(data);
}

const fileAnalysisPrompt = `You are the product-intake analyzer of an SME export readiness tool. Analyze this product photo or data sheet.
Tasks: identify what the product is, its form/packaging, and export-relevant attributes (material, processing level, certifications visible, shelf life, technical specs — whatever the file actually shows). Do not invent details not visible.
Respond ONLY with JSON, no preamble:
{"product_description_en":"2-3 sentence export-oriented product description","product_description_ar":"نفس الوصف بعربية مهنية طبيعية","attributes_en":["max 4 short attributes"],"attributes_ar":["نفسها بالعربية"],"readable":true}
If the file is unclear or not a product, set readable:false and briefly say why in product_description_en/ar.`;

const intakeSummary = (f) =>
  `Company: ${f.companyName || "unnamed"} | Sector: ${f.sector} | Size: ${f.size} | Export status: ${f.exportStatus} | Product: ${f.product} | HS code (suggested): ${f.hsCode || "not determined"} | Target countries: ${f.countries}${f.fileAttrs ? ` | Product attributes (from uploaded photo/data sheet): ${f.fileAttrs}` : ""}`;

function questionPrompt(fields, pillars) {
  const defs = pillars
    .map((p) => `- ${p}: ${RUBRIC.split(p + ":")[1]?.split("\n")[0] || ""}`)
    .join("\n");
  return `You are the diagnostic engine of an SME export-readiness tool used by a consulting firm. Based on this intake:

${intakeSummary(fields)}

Generate exactly 3 readiness questions for EACH of these fixed pillars (do not invent other pillars):
${defs}

Rules:
- Questions must be specific to this product and these destination countries (e.g., destination-specific certifications, trade-lane logistics), not generic.
- Provide each question in BOTH English (text_en) and natural, professional Arabic (text_ar) — Arabic must read like a consultant wrote it, not a translation.
- Choose type per question: "yes_no", "scale_1_5", or "multiple_choice" (with exactly 3 very short options_en and options_ar).
- Keep every question under 18 words. Use at most one multiple_choice per pillar.

Respond ONLY with JSON, no preamble, no markdown fences:
{"questions":[{"pillar":"<pillar_key>","type":"yes_no","text_en":"...","text_ar":"...","options_en":[],"options_ar":[]}]}`;
}

function scoringPrompt(fields, questions, answers) {
  const qa = questions
    .map((q, i) => `[${q.pillar}] Q: ${q.text_en} A: ${formatAnswer(q, answers[i])}`)
    .join("\n");
  return `You are the scoring engine of an SME export-readiness tool. Use ONLY this fixed rubric — never invent new criteria:

${RUBRIC}

Intake: ${intakeSummary(fields)}

Answers:
${qa}

Tasks:
1. Score each of the six pillars 0-100 against the rubric anchors, with a brief reasoning per pillar (max 12 words, English).
2. overall = simple average of the six, rounded.
3. Write the top 3 priority recommendations: action-oriented, specific to this product and these destination countries, direct consultant voice (no generic advice like "improve marketing"). Each in English (en) and natural professional Arabic (ar), exactly 1 sentence each, under 25 words.

Respond ONLY with JSON, no preamble, no markdown fences:
{"pillar_scores":[{"pillar":"product_production","score":72,"reasoning":"..."}],"overall_score":68,"recommendations":[{"en":"...","ar":"..."}]}`;
}

function hsPrompt(product) {
  return `Suggest the most likely Harmonized System (HS) code at 4-6 digit level for this product: "${product}".
Respond ONLY with JSON, no preamble: {"hs_code":"0000.00","description_en":"...","description_ar":"...","confidence":"high|medium|low"}
Never present the code as certain; pick the single most likely heading.`;
}

function planPrompt(fields, country, scores) {
  const weak = (scores || []).slice().sort((a, b) => a.score - b.score).slice(0, 2).map((s) => s.pillar).join(", ");
  return `You are an export consultant writing a concise plan for an SME.

Intake: ${intakeSummary(fields)}. Focus market: ${country}. Weakest readiness pillars: ${weak || "unknown"}.

Write two short sections, each in English AND natural professional Arabic (consultant voice, not translation):
1. market_fit: why (or under what conditions) this product fits ${country} — current demand angle, competition reality, one honest caution. Max 70 words per language.
2. entry_strategy: the single best-fit entry route for this company (direct export / agent-distributor / e-commerce / trade fairs & matchmaking) and why, with the first concrete step. Max 60 words per language.

Respond ONLY with JSON, no preamble, no markdown fences:
{"market_fit_en":"...","market_fit_ar":"...","entry_strategy_en":"...","entry_strategy_ar":"..."}`;
}

function actionPlanPrompt(fields, country, scores) {
  const ranked = (scores || []).slice().sort((a, b) => a.score - b.score).map((s) => `${s.pillar}:${s.score}`).join(", ");
  return `You are an export consultant. Create a 90-day action plan for this SME to prepare for exporting to ${country}.
Intake: ${intakeSummary(fields)}. Pillar scores (weakest first): ${ranked}.

Structure: exactly 3 phases — phase1 (days 1-30, foundations: fix weakest pillars), phase2 (days 31-60, build: market prep), phase3 (days 61-90, launch: first transactions). Exactly 3 action items per phase. Each item: concrete, verifiable, specific to this product/market (name real certificate types, real channels — never "improve X"). Max 14 words per item, in English (en) and professional Arabic (ar).

Respond ONLY with JSON, no preamble: {"phase1":[{"en":"...","ar":"..."}],"phase2":[...],"phase3":[...]}`;
}

function execSummaryPrompt(fields, country, result) {
  return `Write an executive summary for an SME export readiness report. Company: ${fields.companyName || "the company"}. Product: ${fields.product}. Target: ${country}. Overall score: ${result.overall_score}/100. Pillar scores: ${(result.pillar_scores || []).map((p) => `${p.pillar}:${p.score}`).join(", ")}.
One paragraph, max 85 words per language: current position, the single biggest gap, the single biggest opportunity, and the recommended immediate focus. Confident consultant voice, no hedging filler. English (en) and natural professional Arabic (ar).
Respond ONLY with JSON, no preamble: {"en":"...","ar":"..."}`;
}

function docsPrompt(fields, country) {
  return `List the 6-8 most important documents and logistics requirements for exporting this product to ${country}. Product: ${fields.product}. HS (suggested): ${fields.hsCode || "unknown"}. Origin: Jordan (assume unless stated otherwise).
Include only genuinely applicable items (e.g., certificate of origin, destination-specific certificates, product registrations, labeling). Each item max 12 words, in English (en) and Arabic (ar).
Respond ONLY with JSON, no preamble: {"documents":[{"en":"...","ar":"..."}]}`;
}

function formatAnswer(q, a) {
  if (a === undefined || a === null) return "(no answer)";
  if (q.type === "yes_no") return a ? "Yes" : "No";
  if (q.type === "scale_1_5") return `${a}/5`;
  if (q.type === "multiple_choice") return q.options_en?.[a] ?? String(a);
  return String(a);
}

/* ---------------- UI ---------------- */

const css = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Sans+Arabic:wght@400;500;700&display=swap');
.esg-root { --paper:#F7F8FA; --ink:#16304A; --ink-soft:#5B7A9D; --teal:#173A5E; --teal-deep:#0F2A47; --green:#2F8C3C; --amber:#F08A24; --line:#DDE4EC; --card:#FFFFFF;
  background: var(--paper); min-height: 100vh; color: var(--ink); }
.esg-root[dir="ltr"] { font-family: 'IBM Plex Sans', sans-serif; }
.esg-root[dir="rtl"] { font-family: 'IBM Plex Sans Arabic', sans-serif; }
.esg-display { font-weight: 700; letter-spacing: -0.01em; }
.esg-root[dir="ltr"] .esg-display { font-family: 'Space Grotesk', sans-serif; }
.esg-btn { background: var(--teal); color: #fff; border: none; border-radius: 8px; padding: 13px 26px; font-size: 16px; font-weight: 600; cursor: pointer; font-family: inherit; transition: background .15s; }
.esg-btn:hover { background: var(--teal-deep); }
.esg-btn:disabled { background: #9BB5B0; cursor: default; }
.esg-btn-ghost { background: transparent; color: var(--teal); border: 1.5px solid var(--teal); }
.esg-btn-ghost:hover { background: #173A5E10; }
.esg-input, .esg-select, .esg-textarea { width: 100%; box-sizing: border-box; border: 1.5px solid var(--line); border-radius: 8px; padding: 12px 14px; font-size: 15px; font-family: inherit; background: var(--card); color: var(--ink); }
.esg-input:focus, .esg-select:focus, .esg-textarea:focus { outline: 2px solid var(--teal); outline-offset: 1px; border-color: var(--teal); }
.esg-label { display: block; font-size: 13px; font-weight: 600; color: var(--ink-soft); margin-bottom: 6px; text-transform: uppercase; letter-spacing: .04em; }
.esg-card { background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 28px; }
.esg-chip { display: inline-flex; align-items: center; gap: 8px; background: #173A5E12; color: var(--teal-deep); border-radius: 999px; padding: 6px 14px; font-size: 13px; font-weight: 600; }
.esg-opt { display:block; width:100%; text-align:start; border:1.5px solid var(--line); background:var(--card); border-radius:8px; padding:11px 14px; font-size:15px; font-family:inherit; cursor:pointer; color:var(--ink); }
.esg-opt[data-on="true"] { border-color: var(--teal); background:#173A5E0E; font-weight:600; }
@keyframes esgPulse { 0%,100%{opacity:.35} 50%{opacity:1} }
.esg-pulse span { display:inline-block; width:9px; height:9px; border-radius:50%; background:var(--teal); margin:0 3px; animation:esgPulse 1.2s infinite; }
.esg-pulse span:nth-child(2){animation-delay:.2s} .esg-pulse span:nth-child(3){animation-delay:.4s}
@media (prefers-reduced-motion: reduce) { .esg-pulse span { animation: none; opacity:.7 } }
@media print {
  .esg-noprint { display: none !important; }
  .esg-root { background: #fff !important; }
  .esg-card { border: none !important; padding: 14px 0 !important; break-inside: avoid; }
  .esg-report-section { break-inside: avoid; }
}
`;

export default function ExportSupportGuide() {
  const [lang, setLang] = useState("en");
  const t = T[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";
  const [stage, setStage] = useState("landing"); // landing | intake | generating | questionnaire | scoring | results
  const [fields, setFields] = useState({ companyName: "", sector: "", size: "", exportStatus: "", product: "", countries: "", hsCode: "", hsDesc: null });
  const [hsBusy, setHsBusy] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [pillarIdx, setPillarIdx] = useState(0);
  const [result, setResult] = useState(null);
  const [err, setErr] = useState("");
  const [plan, setPlan] = useState(null);
  const [planCountry, setPlanCountry] = useState("");
  const [cost, setCost] = useState({ exw: "", qty: "", inland: "", freight: "", insRate: "1", dutyRate: "5" });
  const [countryMode, setCountryMode] = useState("select"); // select | other
  const [fileBusy, setFileBusy] = useState(false);
  const [fileAnalysis, setFileAnalysis] = useState(null);

  async function analyzeFile(file) {
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) { setErr(T[lang].uploadTooBig); return; }
    setFileBusy(true); setErr(""); setFileAnalysis(null);
    try {
      const base64 = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result.split(",")[1]);
        r.onerror = () => rej(new Error("read failed"));
        r.readAsDataURL(file);
      });
      const a = await callClaudeFile(base64, file.type || "image/jpeg", fileAnalysisPrompt);
      setFileAnalysis(a);
      if (a.readable !== false) {
        const desc = lang === "ar" ? a.product_description_ar : a.product_description_en;
        setFields((f) => ({ ...f, product: f.product.trim() ? f.product : desc, fileAttrs: (a.attributes_en || []).join(", ") }));
      }
    } catch { setErr(T[lang].error); }
    setFileBusy(false);
  }

  const countryList = useMemo(() => (fields.countries.trim() ? [fields.countries.trim()] : []), [fields.countries]);

  async function startDeepDive(country) {
    setPlanCountry(country); setErr(""); setStage("dd_loading");
    try {
      const p = await callClaudeResearch(planPrompt(fields, country, result?.pillar_scores));
      await new Promise((r) => setTimeout(r, 1200));
      const d = await callClaude(docsPrompt(fields, country));
      await new Promise((r) => setTimeout(r, 1200));
      const ap = await callClaude(actionPlanPrompt(fields, country, result?.pillar_scores));
      setPlan({ ...p, documents: d.documents || [], actionPlan: ap });
      setStage("deepdive");
    } catch { setErr(T[lang].error); setStage("results"); }
  }

  const [execSum, setExecSum] = useState(null);
  async function buildReport() {
    setErr(""); setStage("report_loading");
    try {
      const s = execSum || (await callClaude(execSummaryPrompt(fields, planCountry, result)));
      setExecSum(s);
      setStage("report");
    } catch { setErr(T[lang].error); setStage("deepdive"); }
  }

  const set = (k, v) => setFields((f) => ({ ...f, [k]: v }));

  const pillarsWithQs = useMemo(() => PILLAR_ORDER.filter((p) => questions.some((q) => q.pillar === p)), [questions]);
  const currentPillar = pillarsWithQs[pillarIdx];
  const currentQs = questions.map((q, i) => ({ ...q, idx: i })).filter((q) => q.pillar === currentPillar);

  async function suggestHs() {
    if (!fields.product.trim()) return;
    setHsBusy(true); setErr("");
    try {
      const r = await callClaude(hsPrompt(fields.product));
      setFields((f) => ({ ...f, hsCode: r.hs_code, hsDesc: r }));
    } catch { setErr(t.error); }
    setHsBusy(false);
  }

  async function generateQuestions() {
    if (!fields.sector || !fields.size || !fields.exportStatus || !fields.product.trim() || !fields.countries.trim()) { setErr(t.required); return; }
    setErr(""); setStage("generating");
    try {
      const a = await callClaude(questionPrompt(fields, PILLAR_ORDER.slice(0, 2)));
      await new Promise((r) => setTimeout(r, 1200));
      const b = await callClaude(questionPrompt(fields, PILLAR_ORDER.slice(2, 4)));
      await new Promise((r) => setTimeout(r, 1200));
      const c = await callClaude(questionPrompt(fields, PILLAR_ORDER.slice(4)));
      const qs = [...(a.questions || []), ...(b.questions || []), ...(c.questions || [])].filter((q) => PILLAR_ORDER.includes(q.pillar));
      if (qs.length < 6) throw new Error("too few questions");
      setQuestions(qs); setAnswers({}); setPillarIdx(0); setStage("questionnaire");
    } catch { setErr(t.error); setStage("intake"); }
  }

  async function score() {
    setErr(""); setStage("scoring");
    try {
      const r = await callClaude(scoringPrompt(fields, questions, questions.map((_, i) => answers[i])));
      setResult(r); setStage("results");
    } catch { setErr(t.error); setStage("questionnaire"); }
  }

  function nextPillar() {
    const unanswered = currentQs.some((q) => answers[q.idx] === undefined);
    if (unanswered) { setErr(t.answerAll); return; }
    setErr("");
    if (pillarIdx < pillarsWithQs.length - 1) setPillarIdx(pillarIdx + 1);
    else score();
  }

  const tierOf = (s) => (s >= 90 ? t.tier.t3 : s >= 70 ? t.tier.t2 : s >= 40 ? t.tier.t1 : t.tier.t0);
  const tierColor = (s) => (s >= 70 ? "var(--green)" : s >= 40 ? "var(--amber)" : "#B0432E");

  const LogoMark = (
    <svg width="42" height="42" viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="11" fill="#F08A24" />
      <path d="M 50 14 A 36 36 0 1 1 18 32" fill="none" stroke="#2F8C3C" strokeWidth="9" strokeLinecap="round" />
      <path d="M 50 30 A 20 20 0 1 0 70 52" fill="none" stroke="#173A5E" strokeWidth="9" strokeLinecap="round" />
      <path d="M 82 62 A 36 36 0 0 1 36 84" fill="none" stroke="#173A5E" strokeWidth="9" strokeLinecap="round" />
    </svg>
  );

  const Header = (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0 26px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {LogoMark}
        <div>
          <div className="esg-display" style={{ fontSize: 20, color: "var(--teal)" }}>{t.appName}</div>
          <div style={{ fontSize: 12, color: "var(--ink-soft)", letterSpacing: ".08em", borderTop: "2px solid var(--amber)", paddingTop: 3, marginTop: 3 }}>
            {lang === "ar" ? "شركة التفوق للاستشارات الإدارية" : "Competence Management Consulting"}
          </div>
        </div>
      </div>
      <button className="esg-btn esg-btn-ghost" style={{ padding: "8px 18px", fontSize: 14 }} onClick={() => setLang(lang === "en" ? "ar" : "en")}>{t.langBtn}</button>
    </div>
  );

  const ErrBox = err ? (
    <div style={{ background: "#A54B3414", border: "1px solid #A54B3440", color: "#7C3423", borderRadius: 8, padding: "10px 14px", fontSize: 14, margin: "14px 0" }}>{err}</div>
  ) : null;

  return (
    <div className="esg-root" dir={dir}>
      <style>{css}</style>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 22px 60px" }}>
        {Header}

        {stage === "landing" && (
          <div style={{ paddingTop: 40 }}>
            <div className="esg-chip">Competence · Export Development</div>
            <h1 className="esg-display" style={{ fontSize: 44, lineHeight: 1.12, margin: "18px 0 14px", maxWidth: 640, color: "var(--teal)" }}>{t.tagline}</h1>
            <p style={{ fontSize: 17, color: "var(--ink-soft)", maxWidth: 560, lineHeight: 1.65 }}>{t.intakeSub}</p>
            <div style={{ marginTop: 30 }}>
              <button className="esg-btn" onClick={() => setStage("intake")}>{t.start}</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12, marginTop: 56 }}>
              {PILLAR_ORDER.map((p, i) => (
                <div key={p} className="esg-card" style={{ padding: "16px 18px" }}>
                  <div style={{ width: 26, height: 3, background: i % 3 === 0 ? "var(--green)" : i % 3 === 1 ? "var(--amber)" : "var(--teal)", borderRadius: 2, marginBottom: 10 }} />
                  <div style={{ fontWeight: 600, fontSize: 14.5 }}>{t.pillars[p]}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {stage === "intake" && (
          <div className="esg-card" style={{ maxWidth: 640, margin: "0 auto" }}>
            <h2 className="esg-display" style={{ fontSize: 26, margin: "0 0 6px" }}>{t.intakeTitle}</h2>
            <p style={{ color: "var(--ink-soft)", fontSize: 14.5, marginTop: 0 }}>{t.intakeSub}</p>
            <div style={{ display: "grid", gap: 18, marginTop: 22 }}>
              <div><label className="esg-label">{t.companyName}</label>
                <input className="esg-input" value={fields.companyName} onChange={(e) => set("companyName", e.target.value)} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div><label className="esg-label">{t.sector}</label>
                  <select className="esg-select" value={fields.sector} onChange={(e) => set("sector", e.target.value)}>
                    <option value="">—</option>{t.sectors.map((s) => <option key={s}>{s}</option>)}</select></div>
                <div><label className="esg-label">{t.size}</label>
                  <select className="esg-select" value={fields.size} onChange={(e) => set("size", e.target.value)}>
                    <option value="">—</option>{t.sizes.map((s) => <option key={s}>{s}</option>)}</select></div>
              </div>
              <div><label className="esg-label">{t.exportStatus}</label>
                <select className="esg-select" value={fields.exportStatus} onChange={(e) => set("exportStatus", e.target.value)}>
                  <option value="">—</option>{t.statuses.map((s) => <option key={s}>{s}</option>)}</select></div>
              <div><label className="esg-label">{t.product}</label>
                <textarea className="esg-textarea" rows={3} placeholder={t.productPh} value={fields.product} onChange={(e) => set("product", e.target.value)} />
                <div style={{ marginTop: 10 }}>
                  <label className="esg-label" style={{ textTransform: "none", letterSpacing: 0 }}>{t.uploadLabel}</label>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                    <input type="file" accept="image/jpeg,image/png,image/webp,application/pdf" id="esg-file" style={{ display: "none" }}
                      onChange={(e) => analyzeFile(e.target.files?.[0])} />
                    <button className="esg-btn esg-btn-ghost" style={{ padding: "8px 16px", fontSize: 13.5 }} disabled={fileBusy}
                      onClick={() => document.getElementById("esg-file").click()}>
                      {fileBusy ? t.uploadBusy : t.uploadBtn}
                    </button>
                    {fileAnalysis && fileAnalysis.readable !== false && <span className="esg-chip" style={{ background: "#2F8C3C18", color: "var(--green)" }}>✓ {t.uploadDone}</span>}
                  </div>
                  {fileAnalysis && fileAnalysis.readable !== false && (fileAnalysis.attributes_en || []).length > 0 && (
                    <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: "var(--ink-soft)", fontWeight: 600 }}>{t.uploadKeyAttrs}:</span>
                      {(lang === "ar" ? fileAnalysis.attributes_ar : fileAnalysis.attributes_en).map((a, i) => (
                        <span key={i} className="esg-chip" style={{ fontSize: 12, padding: "3px 10px" }}>{a}</span>
                      ))}
                    </div>
                  )}
                  {fileAnalysis && fileAnalysis.readable === false && (
                    <div style={{ fontSize: 13, color: "#7C3423", marginTop: 8 }}>{lang === "ar" ? fileAnalysis.product_description_ar : fileAnalysis.product_description_en}</div>
                  )}
                </div>
              </div>
              <div><label className="esg-label">{t.hsManual}</label>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <input className="esg-input" style={{ maxWidth: 180 }} placeholder={t.hsPh} value={fields.hsCode}
                    onChange={(e) => setFields((f) => ({ ...f, hsCode: e.target.value, hsDesc: null }))} />
                  <button className="esg-btn esg-btn-ghost" style={{ padding: "8px 16px", fontSize: 13.5 }} disabled={hsBusy || !fields.product.trim()} onClick={suggestHs}>
                    {hsBusy ? t.hsWorking : t.hsBtn}
                  </button>
                  {fields.hsDesc && (
                    <span className="esg-chip">{t.hsLabel}: {fields.hsDesc.hs_code} · {t.hsConfidence[fields.hsDesc.confidence] || fields.hsDesc.confidence}</span>
                  )}
                </div>
                {fields.hsDesc && (
                  <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 8 }}>
                    {lang === "ar" ? fields.hsDesc.description_ar : fields.hsDesc.description_en} — {t.disclaimer}
                  </div>
                )}
              </div>
              <div><label className="esg-label">{t.countries}</label>
                <select className="esg-select" value={countryMode === "other" ? "__other" : fields.countries}
                  onChange={(e) => {
                    if (e.target.value === "__other") { setCountryMode("other"); set("countries", ""); }
                    else { setCountryMode("select"); set("countries", e.target.value); }
                  }}>
                  <option value="">{t.selectPh}</option>
                  <optgroup label={lang === "ar" ? "الوجهات الشائعة" : "Common destinations"}>
                    {COUNTRIES.map((c) => <option key={c.v} value={c.v}>{lang === "ar" ? c.ar : c.en}</option>)}
                  </optgroup>
                  <optgroup label={lang === "ar" ? "جميع الدول" : "All countries"}>
                    {COUNTRIES_ALL.map((c) => <option key={c.v} value={c.v}>{lang === "ar" ? c.ar : c.en}</option>)}
                  </optgroup>
                  <option value="__other">{t.countryOtherOpt}</option>
                </select>
                {countryMode === "other" && (
                  <input className="esg-input" style={{ marginTop: 10 }} placeholder={t.countriesPh} value={fields.countries} onChange={(e) => set("countries", e.target.value)} />
                )}
              </div>
            </div>
            {ErrBox}
            <div style={{ marginTop: 22 }}>
              <button className="esg-btn" onClick={generateQuestions}>{t.generate}</button>
            </div>
          </div>
        )}

        {(stage === "generating" || stage === "scoring" || stage === "dd_loading" || stage === "report_loading") && (
          <div style={{ textAlign: "center", paddingTop: 90 }}>
            <div className="esg-pulse" style={{ marginBottom: 22 }}><span /><span /><span /></div>
            <h2 className="esg-display" style={{ fontSize: 24, margin: "0 0 8px" }}>
              {stage === "generating" ? t.generating : stage === "scoring" ? t.scoring : stage === "dd_loading" ? t.ddGenerating : t.reportBuilding}</h2>
            <p style={{ color: "var(--ink-soft)", maxWidth: 440, margin: "0 auto", fontSize: 14.5, lineHeight: 1.6 }}>
              {stage === "generating" ? t.generatingSub : stage === "scoring" ? t.scoringSub : stage === "dd_loading" ? t.ddGeneratingSub : t.reportBuildingSub}</p>
          </div>
        )}

        {stage === "questionnaire" && currentPillar && (
          <div>
            <div style={{ display: "flex", gap: 6, margin: "6px 0 24px" }}>
              {pillarsWithQs.map((p, i) => (
                <div key={p} style={{ flex: 1, height: 5, borderRadius: 3, background: i <= pillarIdx ? "var(--teal)" : "var(--line)" }} title={t.pillars[p]} />
              ))}
            </div>
            <div className="esg-chip" style={{ marginBottom: 10 }}>{pillarIdx + 1} / {pillarsWithQs.length}</div>
            <h2 className="esg-display" style={{ fontSize: 27, margin: "6px 0 20px" }}>{t.pillars[currentPillar]}</h2>
            <div style={{ display: "grid", gap: 16 }}>
              {currentQs.map((q) => (
                <div key={q.idx} className="esg-card" style={{ padding: "20px 22px" }}>
                  <div style={{ fontSize: 15.5, fontWeight: 600, marginBottom: 14, lineHeight: 1.55 }}>
                    {lang === "ar" ? q.text_ar : q.text_en}
                  </div>
                  {q.type === "yes_no" && (
                    <div style={{ display: "flex", gap: 10 }}>
                      {[true, false].map((v) => (
                        <button key={String(v)} className="esg-opt" data-on={answers[q.idx] === v} style={{ width: 110, textAlign: "center" }}
                          onClick={() => setAnswers((a) => ({ ...a, [q.idx]: v }))}>{v ? t.yes : t.no}</button>
                      ))}
                    </div>
                  )}
                  {q.type === "scale_1_5" && (
                    <div>
                      <div style={{ display: "flex", gap: 8 }}>
                        {[1, 2, 3, 4, 5].map((v) => (
                          <button key={v} className="esg-opt" data-on={answers[q.idx] === v} style={{ width: 52, textAlign: "center" }}
                            onClick={() => setAnswers((a) => ({ ...a, [q.idx]: v }))}>{v}</button>
                        ))}
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--ink-soft)", marginTop: 6, maxWidth: 292 }}>
                        <span>{t.scaleLow}</span><span>{t.scaleHigh}</span>
                      </div>
                    </div>
                  )}
                  {q.type === "multiple_choice" && (
                    <div style={{ display: "grid", gap: 8 }}>
                      {(lang === "ar" ? q.options_ar : q.options_en)?.map((opt, oi) => (
                        <button key={oi} className="esg-opt" data-on={answers[q.idx] === oi}
                          onClick={() => setAnswers((a) => ({ ...a, [q.idx]: oi }))}>{opt}</button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {ErrBox}
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              {pillarIdx > 0 && <button className="esg-btn esg-btn-ghost" onClick={() => { setErr(""); setPillarIdx(pillarIdx - 1); }}>{t.back}</button>}
              <button className="esg-btn" onClick={nextPillar}>{pillarIdx < pillarsWithQs.length - 1 ? t.next : t.finish}</button>
            </div>
          </div>
        )}

        {stage === "deepdive" && plan && (() => {
          const n = (v) => parseFloat(v) || 0;
          const exwTotal = n(cost.exw) * n(cost.qty);
          const fob = exwTotal + n(cost.inland);
          const ins = (fob + n(cost.freight)) * (n(cost.insRate) / 100);
          const cif = fob + n(cost.freight) + ins;
          const landed = cif * (1 + n(cost.dutyRate) / 100);
          const perUnit = n(cost.qty) > 0 ? landed / n(cost.qty) : 0;
          const fmt = (x) => x.toLocaleString(lang === "ar" ? "ar-JO" : "en-US", { maximumFractionDigits: 2 });
          return (
            <div>
              <div className="esg-chip" style={{ marginBottom: 10 }}>{planCountry}</div>
              <h2 className="esg-display" style={{ fontSize: 30, margin: "4px 0 4px" }}>{t.ddTitle}</h2>
              <div style={{ color: "var(--ink-soft)", fontSize: 14, marginBottom: 22 }}>{t.ddFor} {fields.companyName || "—"} · {fields.product.slice(0, 60)}</div>

              <div className="esg-card" style={{ marginBottom: 16 }}>
                <h3 className="esg-display" style={{ margin: "0 0 10px", fontSize: 18 }}>{t.ddMarket}</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75 }}>{lang === "ar" ? plan.market_fit_ar : plan.market_fit_en}</p>
              </div>

              <div className="esg-card" style={{ marginBottom: 16 }}>
                <h3 className="esg-display" style={{ margin: "0 0 10px", fontSize: 18 }}>{t.ddEntry}</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75 }}>{lang === "ar" ? plan.entry_strategy_ar : plan.entry_strategy_en}</p>
              </div>

              <div className="esg-card" style={{ marginBottom: 16 }}>
                <h3 className="esg-display" style={{ margin: "0 0 4px", fontSize: 18 }}>{t.ddCosting}</h3>
                <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 2 }}>{t.ddCostingNote}</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, margin: "14px 0 18px" }}>
                  {[["exw", `${t.exw} (${t.currency})`], ["qty", t.qty], ["inland", `${t.inland} (${t.currency})`], ["freight", `${t.freight} (${t.currency})`], ["insRate", t.insRate], ["dutyRate", t.dutyRate]].map(([k, label]) => (
                    <div key={k}><label className="esg-label">{label}</label>
                      <input className="esg-input" type="number" min="0" value={cost[k]} onChange={(e) => setCost((c) => ({ ...c, [k]: e.target.value }))} /></div>
                  ))}
                </div>
                <div style={{ borderTop: "1px solid var(--line)" }}>
                  {[[t.cRow.exwTotal, exwTotal], [t.cRow.fob, fob], [t.cRow.cif, cif], [t.cRow.landed, landed], [t.cRow.perUnit, perUnit]].map(([label, val], i, arr) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 2px", borderBottom: "1px solid var(--line)", fontSize: 14.5, fontWeight: i >= arr.length - 2 ? 700 : 500, color: i >= arr.length - 2 ? "var(--teal-deep)" : "var(--ink)" }}>
                      <span>{label}</span><span>{fmt(val)} {t.currency}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="esg-card" style={{ marginBottom: 20 }}>
                <h3 className="esg-display" style={{ margin: "0 0 14px", fontSize: 18 }}>{t.ddDocs}</h3>
                <div style={{ display: "grid", gap: 10 }}>
                  {plan.documents.map((d, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 14.5, lineHeight: 1.6 }}>
                      <div style={{ minWidth: 8, height: 8, borderRadius: "50%", background: "var(--amber)", marginTop: 7 }} />
                      <span>{lang === "ar" ? d.ar : d.en}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 14, marginBottom: 0 }}>{t.disclaimer}</p>
              </div>

              {plan.actionPlan && (
                <div className="esg-card" style={{ marginBottom: 20 }}>
                  <h3 className="esg-display" style={{ margin: "0 0 16px", fontSize: 18 }}>{t.ddAction}</h3>
                  {[["phase1", t.phase1], ["phase2", t.phase2], ["phase3", t.phase3]].map(([key, label]) => (
                    <div key={key} style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--teal)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 8, borderBottom: "2px solid var(--amber)", display: "inline-block", paddingBottom: 2 }}>{label}</div>
                      <div style={{ display: "grid", gap: 8 }}>
                        {(plan.actionPlan[key] || []).map((item, i) => (
                          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 14.5, lineHeight: 1.6 }}>
                            <div style={{ minWidth: 20, height: 20, borderRadius: 5, background: "var(--green)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 11 }}>{i + 1}</div>
                            <span>{lang === "ar" ? item.ar : item.en}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button className="esg-btn" onClick={buildReport}>{t.viewReport}</button>
                <button className="esg-btn esg-btn-ghost" onClick={() => setStage("results")}>{t.backToResults}</button>
              </div>
              <p style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 12 }}>{t.researched}</p>
            </div>
          );
        })()}

        {stage === "report" && result && plan && execSum && (() => {
          const n = (v) => parseFloat(v) || 0;
          const exwTotal = n(cost.exw) * n(cost.qty);
          const fob = exwTotal + n(cost.inland);
          const ins = (fob + n(cost.freight)) * (n(cost.insRate) / 100);
          const cif = fob + n(cost.freight) + ins;
          const landed = cif * (1 + n(cost.dutyRate) / 100);
          const perUnit = n(cost.qty) > 0 ? landed / n(cost.qty) : 0;
          const fmt = (x) => x.toLocaleString(lang === "ar" ? "ar-JO" : "en-US", { maximumFractionDigits: 2 });
          const hasCosting = exwTotal > 0;
          const Sec = ({ title, children }) => (
            <div className="esg-card esg-report-section" style={{ marginBottom: 14 }}>
              <h3 className="esg-display" style={{ margin: "0 0 12px", fontSize: 17, color: "var(--teal)" }}>{title}</h3>
              {children}
            </div>
          );
          return (
            <div>
              <div className="esg-card esg-report-section" style={{ background: "var(--teal)", color: "#fff", marginBottom: 14, border: "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontSize: 12, opacity: .8, textTransform: "uppercase", letterSpacing: ".08em" }}>{lang === "ar" ? "شركة التفوق للاستشارات الإدارية" : "Competence Management Consulting"}</div>
                    <h2 className="esg-display" style={{ fontSize: 26, margin: "8px 0 4px", color: "#fff" }}>{t.reportTitle}</h2>
                    <div style={{ fontSize: 14, opacity: .9 }}>{fields.companyName || "—"} · {planCountry}</div>
                  </div>
                  <div style={{ textAlign: "center", background: "#ffffff18", borderRadius: 12, padding: "14px 22px" }}>
                    <div className="esg-display" style={{ fontSize: 42, lineHeight: 1, color: "#F08A24" }}>{result.overall_score}</div>
                    <div style={{ fontSize: 12, marginTop: 4 }}>{tierOf(result.overall_score)}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, opacity: .75, marginTop: 12 }}>{t.reportDate}: {new Date().toLocaleDateString(lang === "ar" ? "ar-JO" : "en-GB")}</div>
              </div>

              <Sec title={t.execSummary}>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8 }}>{lang === "ar" ? execSum.ar : execSum.en}</p>
              </Sec>

              <Sec title={t.scorecard}>
                <div style={{ display: "grid", gap: 12 }}>
                  {PILLAR_ORDER.map((p) => {
                    const ps = result.pillar_scores?.find((x) => x.pillar === p);
                    const s = ps?.score ?? 0;
                    return (
                      <div key={p}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 4 }}>
                          <span style={{ fontWeight: 600 }}>{t.pillars[p]}</span>
                          <span style={{ fontWeight: 700, color: tierColor(s) }}>{s}</span>
                        </div>
                        <div style={{ height: 8, background: "var(--line)", borderRadius: 4, overflow: "hidden" }}>
                          <div style={{ width: `${s}%`, height: "100%", background: tierColor(s) }} />
                        </div>
                        {ps?.reasoning && <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 4, lineHeight: 1.5 }}>{ps.reasoning}</div>}
                      </div>
                    );
                  })}
                </div>
              </Sec>

              <Sec title={t.recsTitle}>
                <div style={{ display: "grid", gap: 10 }}>
                  {(result.recommendations || []).map((r, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, fontSize: 14.5, lineHeight: 1.65 }}>
                      <div style={{ minWidth: 24, height: 24, borderRadius: "50%", background: "var(--green)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12 }}>{i + 1}</div>
                      <span>{lang === "ar" ? r.ar : r.en}</span>
                    </div>
                  ))}
                </div>
              </Sec>

              <Sec title={`${t.ddMarket} — ${planCountry}`}>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.75 }}>{lang === "ar" ? plan.market_fit_ar : plan.market_fit_en}</p>
                <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 10 }}>{t.researched}</div>
              </Sec>

              <Sec title={t.ddEntry}>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.75 }}>{lang === "ar" ? plan.entry_strategy_ar : plan.entry_strategy_en}</p>
              </Sec>

              {hasCosting && (
                <Sec title={t.ddCosting}>
                  {[[t.cRow.exwTotal, exwTotal], [t.cRow.fob, fob], [t.cRow.cif, cif], [t.cRow.landed, landed], [t.cRow.perUnit, perUnit]].map(([label, val], i, arr) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 2px", borderBottom: "1px solid var(--line)", fontSize: 14, fontWeight: i >= arr.length - 2 ? 700 : 500 }}>
                      <span>{label}</span><span>{fmt(val)} {t.currency}</span>
                    </div>
                  ))}
                  <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 8 }}>{t.ddCostingNote}</div>
                </Sec>
              )}

              <Sec title={t.ddDocs}>
                <div style={{ display: "grid", gap: 8 }}>
                  {plan.documents.map((d, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, lineHeight: 1.6 }}>
                      <div style={{ minWidth: 7, height: 7, borderRadius: "50%", background: "var(--amber)", marginTop: 7 }} />
                      <span>{lang === "ar" ? d.ar : d.en}</span>
                    </div>
                  ))}
                </div>
              </Sec>

              {plan.actionPlan && (
                <Sec title={t.ddAction}>
                  {[["phase1", t.phase1], ["phase2", t.phase2], ["phase3", t.phase3]].map(([key, label]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--teal)", marginBottom: 6 }}>{label}</div>
                      <div style={{ display: "grid", gap: 6 }}>
                        {(plan.actionPlan[key] || []).map((item, i) => (
                          <div key={i} style={{ fontSize: 14, lineHeight: 1.6, paddingInlineStart: 14, borderInlineStart: "3px solid var(--green)" }}>{lang === "ar" ? item.ar : item.en}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </Sec>
              )}

              <p style={{ fontSize: 11.5, color: "var(--ink-soft)", lineHeight: 1.6 }}>{t.methodology} {t.disclaimer}</p>

              <div className="esg-noprint" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                <button className="esg-btn" onClick={() => window.print()}>{t.printReport}</button>
                <button className="esg-btn esg-btn-ghost" onClick={() => setStage("deepdive")}>{t.backToPlan}</button>
              </div>
            </div>
          );
        })()}

        {stage === "results" && result && (
          <div>
            <div className="esg-card" style={{ textAlign: "center", padding: "40px 28px", marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: ".06em" }}>{t.resultsTitle}</div>
              <div className="esg-display" style={{ fontSize: 76, lineHeight: 1, margin: "14px 0 8px", color: tierColor(result.overall_score) }}>
                {result.overall_score}
              </div>
              <div className="esg-chip" style={{ background: `${tierColor(result.overall_score)}18`, color: tierColor(result.overall_score) }}>
                {tierOf(result.overall_score)}
              </div>
            </div>

            <div className="esg-card" style={{ marginBottom: 20 }}>
              <h3 className="esg-display" style={{ margin: "0 0 18px", fontSize: 19 }}>{t.pillarBreakdown}</h3>
              <div style={{ display: "grid", gap: 13 }}>
                {PILLAR_ORDER.map((p) => {
                  const s = result.pillar_scores?.find((x) => x.pillar === p)?.score ?? 0;
                  return (
                    <div key={p}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 5 }}>
                        <span style={{ fontWeight: 600 }}>{t.pillars[p]}</span>
                        <span style={{ fontWeight: 700, color: tierColor(s) }}>{s}</span>
                      </div>
                      <div style={{ height: 9, background: "var(--line)", borderRadius: 5, overflow: "hidden" }}>
                        <div style={{ width: `${s}%`, height: "100%", background: tierColor(s), borderRadius: 5 }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="esg-card" style={{ marginBottom: 20 }}>
              <h3 className="esg-display" style={{ margin: "0 0 16px", fontSize: 19 }}>{t.recsTitle}</h3>
              <div style={{ display: "grid", gap: 14 }}>
                {(result.recommendations || []).map((r, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ minWidth: 30, height: 30, borderRadius: "50%", background: "var(--green)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>{i + 1}</div>
                    <div style={{ fontSize: 15, lineHeight: 1.65 }}>{lang === "ar" ? r.ar : r.en}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              {countryList.length <= 1 ? (
                <button className="esg-btn" onClick={() => startDeepDive(countryList[0] || fields.countries)}>{t.deepDive}</button>
              ) : (
                <div style={{ width: "100%" }}>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 10 }}>{t.ddPickCountry}</div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {countryList.map((c) => (
                      <button key={c} className="esg-btn" onClick={() => startDeepDive(c)}>{c}</button>
                    ))}
                  </div>
                </div>
              )}
              <button className="esg-btn esg-btn-ghost" onClick={() => { setStage("landing"); setQuestions([]); setAnswers({}); setResult(null); setPlan(null); setFields({ companyName: "", sector: "", size: "", exportStatus: "", product: "", countries: "", hsCode: "", hsDesc: null }); }}>{t.restart}</button>
            </div>
            <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 14 }}>{t.deepDiveNote}</p>
          </div>
        )}
      </div>
    </div>
  );
}
