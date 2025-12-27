// C:\Users\jafar\Desktop\ta3awon\context\LanguageContext.js
'use client';
import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("ar");

  const translations = {
    en: {
      // Navbar
      home: "Home",
      about: "About",
      campaigns: "Campaigns",
      contact: "Contact",
      login: "Login",
      
      // Hero
      platformName: "Syrian Cooperation Platform",
      quranVerse: "And cooperate in righteousness and piety",
      donateText: "Donate now to help rebuilding Syria",
      donateButton: "Donate Now",
      totalDonations: "Total Donations",
      
      // Top Donors
      donor1: "Ahmed - $500",
      donor2: "Mona - $300",
      
      // About Section
      aboutTitle: "About Our Platform",
      aboutSubtitle: "Rebuilding Syria Through Strategic Philanthropy",
      aboutDescription1: "The Syrian Cooperation Platform is a dedicated charitable initiative established to support strategic reconstruction projects across Syria. In the aftermath of years of conflict, we believe in the power of collective action and targeted humanitarian investment to restore hope and rebuild communities.",
      aboutDescription2: "Our platform focuses on channeling donations towards high-impact projects that address critical infrastructure needs, healthcare facilities, educational institutions, and sustainable livelihood programs. We work closely with local communities, engineers, and development experts to ensure that every contribution creates lasting positive change.",
      aboutMissionTitle: "Our Mission",
      aboutMissionText: "To facilitate sustainable reconstruction and development in Syria through transparent, efficient, and strategic allocation of charitable donations, empowering communities to rebuild their lives with dignity and resilience.",
      aboutVisionTitle: "Our Vision",
      aboutVisionText: "A rebuilt Syria where communities are self-sufficient, infrastructure is restored, and future generations can thrive in peace and prosperity through sustainable development and humanitarian cooperation.",
      
      // About Values
      value1Title: "Transparency",
      value1Desc: "Complete financial transparency with regular reports on project progress and fund allocation.",
      value2Title: "Impact",
      value2Desc: "Focusing on strategic projects with measurable, long-term impact on community development.",
      value3Title: "Sustainability",
      value3Desc: "Implementing projects that are environmentally and economically sustainable for future generations.",
      value4Title: "Community",
      value4Desc: "Working with local communities to ensure projects meet their actual needs and priorities.",
      
      // About Stats
      stat1: "Projects Completed",
      stat2: "Beneficiaries",
      stat3: "Partners",
      stat4: "Cities Covered",
      
      // Campaigns Section
      campaignsTitle: "Active Campaigns",
      campaignsSubtitle: "Support Our Strategic Reconstruction Projects",
      viewAllCampaigns: "View All Campaigns",
      campaignEnds: "Campaign ends in",
      days: "days",
      raised: "Raised",
      target: "Target",
      donors: "Donors",
      urgent: "URGENT",
      featured: "FEATURED",
      donateNow: "Donate Now",
      seeDetails: "See Details",
      
      // Campaign Categories
      category1: "Education",
      category2: "Healthcare",
      category3: "Infrastructure",
      category4: "Food Security",
      category5: "Shelter",
      category6: "Livelihood",
      
      // Campaign Titles
      campaign1Title: "Rebuild Al-Rahma School in Aleppo",
      campaign1Desc: "Restoring educational facilities for 500+ students who lost their school in the conflict. Providing safe learning environment and educational materials.",
      campaign2Title: "Emergency Medical Clinic in Idlib",
      campaign2Desc: "Establishing a fully equipped medical clinic to serve 10,000+ residents in underserved areas with critical healthcare services.",
      campaign3Title: "Clean Water Project for Rural Homs",
      campaign3Desc: "Installing water purification systems and wells to provide clean drinking water for 5,000+ people in drought-affected villages.",
      campaign4Title: "Winter Shelter Program",
      campaign4Desc: "Providing insulated shelters and heating supplies for 200 families facing harsh winter conditions in displacement camps.",
      campaign5Title: "Vocational Training Center",
      campaign5Desc: "Establishing a vocational training center to equip 300+ youth with skills in construction, technology, and agriculture for sustainable livelihoods.",
      campaign6Title: "Agricultural Revival Initiative",
      campaign6Desc: "Supporting 150 farming families with seeds, tools, and irrigation systems to restore agricultural production in fertile regions.",
      
      // Contact Section
      contactTitle: "Get In Touch",
      contactSubtitle: "We're Here to Help Rebuild Syria Together",
      contactDescription: "Have questions about our projects? Want to partner with us? Or simply wish to learn more about how you can contribute? Our team is ready to assist you.",
      sendMessage: "Send Message",
      sending: "Sending...",
      messageSent: "Message Sent Successfully!",
      
      // Contact Form
      formName: "Full Name",
      formEmail: "Email Address",
      formPhone: "Phone Number",
      formSubject: "Subject",
      formMessage: "Your Message",
      formRequired: "This field is required",
      formEmailInvalid: "Please enter a valid email",
      formPhoneInvalid: "Please enter a valid phone number",
      
      // Contact Information
      contactInfoTitle: "Contact Information",
      contactAddressTitle: "Office Address",
      contactAddress: "Damascus, Syria",
      contactEmailTitle: "Email Address",
      contactEmail: "info@ta3awon.org",
      contactPhoneTitle: "Phone Number",
      contactPhone: "+963 11 123 4567",
      contactHoursTitle: "Working Hours",
      contactHours: "Sunday - Thursday: 9:00 AM - 5:00 PM",
      contactEmergency: "For urgent matters, contact our emergency line",
      
      // Form Subjects
      subjectGeneral: "General Inquiry",
      subjectDonation: "Donation Questions",
      subjectVolunteer: "Volunteering",
      subjectPartnership: "Partnership Opportunities",
      subjectMedia: "Media Inquiry",
      subjectOther: "Other",
      
      // Social Media
      followUs: "Follow Us",
      
      // Footer Section
      footerAbout: "Syrian Cooperation Platform is a charitable initiative dedicated to strategic reconstruction and sustainable development in Syria through transparent and impactful humanitarian projects.",
      quickLinks: "Quick Links",
      ourProjects: "Our Projects",
      getInvolved: "Get Involved",
      newsUpdates: "News & Updates",
      annualReport: "Annual Report",
      transparency: "Transparency",
      donateNow: "Donate Now",
      
      // Footer Legal
      privacyPolicy: "Privacy Policy",
      termsConditions: "Terms & Conditions",
      cookiesPolicy: "Cookies Policy",
      disclaimer: "Disclaimer",
      sitemap: "Sitemap",
      accessibility: "Accessibility",
      
      // Footer Contact
      contactUs: "Contact Us",
      address: "Damascus, Syria",
      email: "info@ta3awon.org",
      phone: "+963 11 123 4567",
      emergency: "Emergency: +963 99 999 9999",
      workingHours: "Sun - Thu: 9:00 AM - 5:00 PM",
      
      // Newsletter
      newsletterTitle: "Stay Updated",
      newsletterDesc: "Subscribe to our newsletter for latest updates on our projects and impact.",
      subscribe: "Subscribe",
      emailPlaceholder: "Enter your email",
      subscribed: "Thank you for subscribing!",
      
      // Certification
      certified: "Certified Non-Profit Organization",
      registration: "Registration No: 2024-001-SYR",
      trusted: "100% Trust & Transparency",
      
      // Copyright
      copyright: "© 2024 Syrian Cooperation Platform. All rights reserved.",
      rightsReserved: "All rights reserved.",
      madeWith: "Made with ❤️ for Syria",
      
      // CTA
      joinUs: "Join Our Mission",
      learnMore: "Learn More About Our Work",
      
      // General
      currency: "$"
    },
    ar: {
      // Navbar
      home: "الرئيسية",
      about: "من نحن",
      campaigns: "الحملات",
      contact: "اتصل بنا",
      login: "تسجيل الدخول",
      
      // Hero
      platformName: "منصة تعاون السورية",
      quranVerse: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَى",
      donateText: "تبرع الآن للمساعدة في إعادة بناء سوريا",
      donateButton: "تبرع الآن",
      totalDonations: "إجمالي التبرعات",
      
      // Top Donors
      donor1: "أحمد - ٥٠٠$",
      donor2: "منى - ٣٠٠$",
      
      // About Section
      aboutTitle: "عن منصتنا",
      aboutSubtitle: "إعادة بناء سوريا من خلال العمل الخيري الاستراتيجي",
      aboutDescription1: "منصة تعاون السورية هي مبادرة خيرية مخصصة تم إنشاؤها لدعم مشاريع إعادة الإعمار الاستراتيجية في جميع أنحاء سوريا. في أعقاب سنوات من الصراع، نؤمن بقوة العمل الجماعي والاستثمار الإنساني المستهدف لإعادة الأمل وبناء المجتمعات.",
      aboutDescription2: "تركز منصتنا على توجيه التبرعات نحو المشاريع عالية التأثير التي تعالج احتياجات البنية التحتية الحرجة، والمرافق الصحية، والمؤسسات التعليمية، وبرامج سبل العيش المستدامة. نحن نعمل عن كثب مع المجتمعات المحلية والمهندسين وخبراء التنمية لضمان أن كل مساهمة تخلق تغييرًا إيجابيًا دائمًا.",
      aboutMissionTitle: "مهمتنا",
      aboutMissionText: "تسهيل إعادة الإعمار والتنمية المستدامة في سوريا من خلال التوزيع الشفاف والفعال والاستراتيجي للتبرعات الخيرية، وتمكين المجتمعات من إعادة بناء حياتها بكرامة وقدرة على الصمود.",
      aboutVisionTitle: "رؤيتنا",
      aboutVisionText: "سوريا معاد بناؤها حيث تكون المجتمعات مكتفية ذاتيًا، وتكون البنية التحتية قد تم ترميمها، ويمكن للأجيال القادمة أن تزدهر في سلام وازدهار من خلال التنمية المستدامة والتعاون الإنساني.",
      
      // About Values
      value1Title: "الشفافية",
      value1Desc: "شفافية مالية كاملة مع تقارير منتظمة عن تقدم المشاريع وتوزيع الأموال.",
      value2Title: "التأثير",
      value2Desc: "التركيز على المشاريع الاستراتيجية ذات التأثير القابل للقياس والطويل الأجل على تنمية المجتمع.",
      value3Title: "الاستدامة",
      value3Desc: "تنفيذ مشاريع مستدامة بيئيًا واقتصاديًا للأجيال القادمة.",
      value4Title: "المجتمع",
      value4Desc: "العمل مع المجتمعات المحلية لضمان تلبية المشاريع لاحتياجاتهم وأولوياتهم الفعلية.",
      
      // About Stats
      stat1: "مشروع مكتمل",
      stat2: "مستفيد",
      stat3: "شريك",
      stat4: "مدينة مغطاة",
      
      // Campaigns Section
      campaignsTitle: "الحملات النشطة",
      campaignsSubtitle: "ادعم مشاريع إعادة الإعمار الاستراتيجية",
      viewAllCampaigns: "عرض جميع الحملات",
      campaignEnds: "تنتهي الحملة بعد",
      days: "يوم",
      raised: "المبلغ المجموع",
      target: "الهدف",
      donors: "متبرع",
      urgent: "عاجل",
      featured: "مميز",
      donateNow: "تبرع الآن",
      seeDetails: "عرض التفاصيل",
      
      // Campaign Categories
      category1: "التعليم",
      category2: "الرعاية الصحية",
      category3: "البنية التحتية",
      category4: "الأمن الغذائي",
      category5: "المأوى",
      category6: "سُبل العيش",
      
      // Campaign Titles
      campaign1Title: "إعادة بناء مدرسة الرحمة في حلب",
      campaign1Desc: "إعادة تأهيل المرافق التعليمية لأكثر من 500 طالب فقدوا مدرستهم في الصراع. توفير بيئة تعليمية آمنة والمواد التعليمية.",
      campaign2Title: "عيادة طبية طارئة في إدلب",
      campaign2Desc: "إنشاء عيادة طبية مجهزة بالكامل لخدمة أكثر من 10,000 نسمة في المناطق المحرومة من الخدمات الصحية الحرجة.",
      campaign3Title: "مشروع المياه النظيفة لريف حمص",
      campaign3Desc: "تركيب أنظمة تنقية المياه وآبار لتوفير مياه شرب نظيفة لأكثر من 5,000 شخص في القرى المتضررة من الجفاف.",
      campaign4Title: "برنامج المأوى الشتوي",
      campaign4Desc: "توفير مآوٍ معزولة وإمدادات تدفئة لـ 200 عائلة تواجه ظروف شتاء قاسية في مخيمات النزوح.",
      campaign5Title: "مركز التدريب المهني",
      campaign5Desc: "إنشاء مركز تدريب مهني لتجهيز أكثر من 300 شاب بمهارات في البناء والتكنولوجيا والزراعة لسُبل عيش مستدامة.",
      campaign6Title: "مبادرة إحياء الزراعة",
      campaign6Desc: "دعم 150 عائلة من المزارعين بالبذور والأدوات وأنظمة الري لاستعادة الإنتاج الزراعي في المناطق الخصبة.",
      
      // Contact Section
      contactTitle: "تواصل معنا",
      contactSubtitle: "نحن هنا للمساعدة في إعادة بناء سوريا معاً",
      contactDescription: "هل لديك أسئلة عن مشاريعنا؟ تريد الشراكة معنا؟ أو ببساطة ترغب في معرفة المزيد عن كيفية المساهمة؟ فريقنا جاهز لمساعدتك.",
      sendMessage: "إرسال الرسالة",
      sending: "جارٍ الإرسال...",
      messageSent: "تم إرسال الرسالة بنجاح!",
      
      // Contact Form
      formName: "الاسم الكامل",
      formEmail: "البريد الإلكتروني",
      formPhone: "رقم الهاتف",
      formSubject: "الموضوع",
      formMessage: "رسالتك",
      formRequired: "هذا الحقل مطلوب",
      formEmailInvalid: "يرجى إدخال بريد إلكتروني صحيح",
      formPhoneInvalid: "يرجى إدخال رقم هاتف صحيح",
      
      // Contact Information
      contactInfoTitle: "معلومات الاتصال",
      contactAddressTitle: "عنوان المكتب",
      contactAddress: "دمشق، سوريا",
      contactEmailTitle: "البريد الإلكتروني",
      contactEmail: "info@ta3awon.org",
      contactPhoneTitle: "رقم الهاتف",
      contactPhone: "+963 11 123 4567",
      contactHoursTitle: "ساعات العمل",
      contactHours: "الأحد - الخميس: 9:00 صباحاً - 5:00 مساءً",
      contactEmergency: "للأمور العاجلة، اتصل بخط الطوارئ",
      
      // Form Subjects
      subjectGeneral: "استفسار عام",
      subjectDonation: "أسئلة عن التبرعات",
      subjectVolunteer: "التطوع",
      subjectPartnership: "فرص الشراكة",
      subjectMedia: "استفسار إعلامي",
      subjectOther: "أخرى",
      
      // Social Media
      followUs: "تابعونا",
      
      // Footer Section
      footerAbout: "منصة تعاون السورية هي مبادرة خيرية مخصصة لإعادة الإعمار الاستراتيجي والتنمية المستدامة في سوريا من خلال مشاريع إنسانية شفافة ذات تأثير ملموس.",
      quickLinks: "روابط سريعة",
      ourProjects: "مشاريعنا",
      getInvolved: "شارك معنا",
      newsUpdates: "الأخبار والتحديثات",
      annualReport: "التقرير السنوي",
      transparency: "الشفافية",
      donateNow: "تبرع الآن",
      
      // Footer Legal
      privacyPolicy: "سياسة الخصوصية",
      termsConditions: "الشروط والأحكام",
      cookiesPolicy: "سياسة الكوكيز",
      disclaimer: "إخلاء المسؤولية",
      sitemap: "خريطة الموقع",
      accessibility: "سهولة الوصول",
      
      // Footer Contact
      contactUs: "اتصل بنا",
      address: "دمشق، سوريا",
      email: "info@ta3awon.org",
      phone: "+963 11 123 4567",
      emergency: "طوارئ: +963 99 999 9999",
      workingHours: "الأحد - الخميس: 9:00 صباحاً - 5:00 مساءً",
      
      // Newsletter
      newsletterTitle: "ابقَ على اطلاع",
      newsletterDesc: "اشترك في نشرتنا الإخبارية للحصول على آخر التحديثات حول مشاريعنا وأثرنا.",
      subscribe: "اشتراك",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      subscribed: "شكراً على اشتراكك!",
      
      // Certification
      certified: "منظمة غير ربحية معتمدة",
      registration: "رقم التسجيل: 2024-001-SYR",
      trusted: "ثقة وشفافية بنسبة 100٪",
      
      // Copyright
      copyright: "© 2024 منصة تعاون السورية. جميع الحقوق محفوظة.",
      rightsReserved: "جميع الحقوق محفوظة.",
      madeWith: "صنع ب ❤️ لسوريا",
      
      // CTA
      joinUs: "انضم إلى مهمتنا",
      learnMore: "اعرف المزيد عن عملنا",
      
      // General
      currency: "$"
    }
  };

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === "en" ? "ar" : "en");
  };

  return (
    <LanguageContext.Provider value={{ language, translations, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};