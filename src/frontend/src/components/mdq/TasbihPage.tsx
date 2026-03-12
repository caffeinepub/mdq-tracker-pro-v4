import { useCallback, useEffect, useRef, useState } from "react";

const WAZAIF = [
  {
    id: 1,
    category: "Tasbeeh",
    arabic: "سُبْحَانَ اللهِ",
    roman: "SubhanAllah",
    urdu: "اللہ پاک ہے",
    fazilat:
      "Har dafa keh ne se ek darakh Jannat mein lagta hai. Sau dafa keh ne se hazaar nekiyan milti hain.",
    count: 33,
  },
  {
    id: 2,
    category: "Hamd",
    arabic: "الْحَمْدُ لِلَّهِ",
    roman: "Alhamdulillah",
    urdu: "تمام تعریفیں اللہ کے لیے ہیں",
    fazilat:
      "Mizan (tarazu) mein sabse bhari cheez hai. Shukar ka afdal zariya.",
    count: 33,
  },
  {
    id: 3,
    category: "Takbeer",
    arabic: "اللهُ أَكْبَرُ",
    roman: "Allahu Akbar",
    urdu: "اللہ سب سے بڑا ہے",
    fazilat:
      "Sabse azeem dhikr. Namaz mein baar baar dohrana sunnat hai. Dil ko itminaan deta hai.",
    count: 34,
  },
  {
    id: 4,
    category: "Tahleel",
    arabic: "لَا إِلَٰهَ إِلَّا اللهُ",
    roman: "La ilaha illallah",
    urdu: "اللہ کے سوا کوئی معبود نہیں",
    fazilat:
      "Sabse afzal dhikr. Iman ki buniyad. Jannat ki chaabi. Rozana 100 dafa kehne se 100 ghulam aazad karne ka sawab.",
    count: 100,
  },
  {
    id: 5,
    category: "Durood",
    arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ",
    roman: "Allahumma salli ala Muhammad",
    urdu: "اے اللہ محمد ﷺ پر درود بھیج",
    fazilat:
      "Ek baar Durood padhne se Allah 10 rehmatein bhejtay hain, 10 gunah maaf hote hain, 10 darjaat buland hote hain.",
    count: 10,
  },
  {
    id: 6,
    category: "Istighfar",
    arabic: "أَسْتَغْفِرُ اللهَ",
    roman: "Astaghfirullah",
    urdu: "میں اللہ سے مغفرت مانگتا ہوں",
    fazilat:
      "Nabi ﷺ rozana 70 se 100 baar Istighfar farmay. Rizq mein barkat aati hai, mushkilat door hoti hain.",
    count: 100,
  },
  {
    id: 7,
    category: "Hasbunallah",
    arabic: "حَسْبُنَا اللهُ وَنِعْمَ الْوَكِيلُ",
    roman: "Hasbunallahu wa ni'mal wakeel",
    urdu: "ہمیں اللہ کافی ہے اور وہ بہترین وکیل ہے",
    fazilat:
      "Mushkilat aur pareeshani mein padha jata hai. Ibrahim AS ne aag mein yahi kaha. Allah taala ki hifazat milti hai.",
    count: 40,
  },
  {
    id: 8,
    category: "La Hawla",
    arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ",
    roman: "La hawla wa la quwwata illa billah",
    urdu: "اللہ کے بغیر نہ کوئی طاقت ہے نہ قوت",
    fazilat:
      "Jannat ke khazanon mein se ek khazana. Bimaari, qarz, aur gham mein relief milti hai.",
    count: 33,
  },
  {
    id: 9,
    category: "Shifa",
    arabic: "بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ",
    roman: "Bismillahilladhi la yadurru ma'asmihi shay'",
    urdu: "اللہ کے نام سے جس کے نام کے ساتھ کچھ نقصان نہیں دے سکتا",
    fazilat:
      "Subah shaam teen baar padhne se koi aafat nuqsaan nahi dey sakti. Azeem hifazat milti hai.",
    count: 3,
  },
  {
    id: 10,
    category: "Shifa",
    arabic: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ اشْفِ أَنْتَ الشَّافِي",
    roman: "Allahumma Rabban nas, adhhibil ba's, ishfi antash-Shafi",
    urdu: "اے اللہ، لوگوں کے رب، تکلیف دور فرما، شفا دے، تو ہی شافی ہے",
    fazilat:
      "Bimaari mein beemar par haath rakh kar padhne ki dua. Rasool ﷺ ki sunnat.",
    count: 3,
  },
  {
    id: 11,
    category: "Rizq",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رِزْقًا طَيِّبًا",
    roman: "Allahumma inni as'aluka rizqan tayyiban",
    urdu: "اے اللہ میں تجھ سے پاکیزہ رزق مانگتا ہوں",
    fazilat:
      "Halal rizq ki barkat ke liye. Subah padha jaye to din bhar rizq mein barkat milti hai.",
    count: 7,
  },
  {
    id: 12,
    category: "Rizq",
    arabic: "يَا رَزَّاقُ ارْزُقْنِي",
    roman: "Ya Razzaqu arzuqni",
    urdu: "اے رزق دینے والے مجھے رزق دے",
    fazilat:
      "Allah ke ism 'Ar-Razzaq' se madad maangna. Rizq ki tang dasti mein mushfid wazifa.",
    count: 100,
  },
  {
    id: 13,
    category: "Tasbih Fatima",
    arabic: "سُبْحَانَ اللهِ × ٣٣ — الْحَمْدُ لِلَّهِ × ٣٣ — اللهُ أَكْبَرُ × ٣٤",
    roman: "SubhanAllah x33, Alhamdulillah x33, Allahu Akbar x34",
    urdu: "تسبیح فاطمہ — ہر نماز کے بعد",
    fazilat:
      "Har farz namaz ke baad padha jaye. Bibi Fatima RA ko Nabi ﷺ ne khud bataya. Azeem sawab.",
    count: 100,
  },
  {
    id: 14,
    category: "Dua",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً",
    roman: "Rabbana atina fid-dunya hasanah, wa fil-akhirati hasanah",
    urdu: "اے رب ہمیں دنیا میں بھلائی دے اور آخرت میں بھی",
    fazilat:
      "Sayyidul Istighfar ke baad ki maqbool dua. Dunya aur aakhirat ki bhalai ka jam'a.",
    count: 7,
  },
  {
    id: 15,
    category: "Istighfar",
    arabic: "أَسْتَغْفِرُ اللهَ وَأَتُوبُ إِلَيْهِ",
    roman: "Astaghfirullaha wa atubu ilayh",
    urdu: "میں اللہ سے مغفرت مانگتا اور توبہ کرتا ہوں",
    fazilat: "Nabi ﷺ ke amal mein se. Gunah maaf hote hain, dil saaf hota hai.",
    count: 100,
  },
  {
    id: 16,
    category: "Hamd",
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    roman: "Alhamdulillahi Rabbil 'Alamin",
    urdu: "تمام تعریفیں اللہ کے لیے جو سارے جہانوں کا رب ہے",
    fazilat:
      "Surah Fatiha ki pehli aayat. Shukr ka afzal tareeqa. Nemat mein barkat ka zariya.",
    count: 33,
  },
  {
    id: 17,
    category: "Durood",
    arabic: "صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ",
    roman: "Sallallahu alayhi wasallam",
    urdu: "اللہ کا درود و سلام ہو ان پر",
    fazilat:
      "Nabi ﷺ ka naam sunne par padhna wajib. Qiyamat mein Nabi ﷺ ki shafa'at ka zariya.",
    count: 100,
  },
  {
    id: 18,
    category: "Tasbeeh",
    arabic: "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
    roman: "SubhanAllahi wa bihamdih",
    urdu: "اللہ پاک ہے اور اسی کی تعریف ہے",
    fazilat:
      "100 dafa padhne se 100 gunah maaf. Rozana 100 baar kehna, chahe chhoti baat hai, meezan mein bhari. Allah ko bahut pasand.",
    count: 100,
  },
  {
    id: 19,
    category: "Tasbeeh",
    arabic: "سُبْحَانَ اللهِ الْعَظِيمِ",
    roman: "SubhanAllahil 'Azeem",
    urdu: "اللہ عظیم ذات پاک ہے",
    fazilat:
      "Quran mein iska dhikr hai. Zaban ke liye halki, meezan mein bhari, Allah ko bahut mahboob.",
    count: 33,
  },
  {
    id: 20,
    category: "Hifazat",
    arabic: "أَعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
    roman: "A'udhu billahi minash-shaytanir rajim",
    urdu: "میں شیطان مردود سے اللہ کی پناہ مانگتا ہوں",
    fazilat:
      "Quran tilawat se pehle padhna sunnat. Shaitani waswas se bachav. Subah shaam 3 baar padhna amal ka hissa.",
    count: 3,
  },
  {
    id: 21,
    category: "Hifazat",
    arabic: "بِسْمِ اللهِ تَوَكَّلْتُ عَلَى اللهِ",
    roman: "Bismillah, tawakkaltu 'alallah",
    urdu: "اللہ کے نام سے، اللہ پر بھروسہ کیا",
    fazilat:
      "Ghar se nikaltay waqt padhna sunnat. Shaytan door hota hai, hifazat milti hai.",
    count: 1,
  },
  {
    id: 22,
    category: "Dua",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
    roman: "Allahumma inni a'udhu bika minal-hammi wal-hazan",
    urdu: "اے اللہ میں پریشانی اور غم سے تیری پناہ مانگتا ہوں",
    fazilat:
      "Gham aur pareshani mein azeem dua. Nabi ﷺ ne sahaba ko sikhaya. Mehnat ka nateeja milta hai.",
    count: 7,
  },
  {
    id: 23,
    category: "Rizq",
    arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ",
    roman: "Allahummakfini bihalalika 'an haramik",
    urdu: "اے اللہ مجھے حلال کے ذریعے حرام سے بے نیاز فرما",
    fazilat:
      "Halal rizq ke liye afzal dua. Ali RA se manqool. Halal kam mein barkat aati hai.",
    count: 7,
  },
  {
    id: 24,
    category: "Iman",
    arabic: "آمَنْتُ بِاللهِ وَرُسُلِهِ",
    roman: "Aamantu billahi wa rusulihi",
    urdu: "میں اللہ پر اور اس کے رسولوں پر ایمان لایا",
    fazilat:
      "Iman ki tazkeed. Subah padhna dil ko yaqeen deta hai. Shak aur waswasay door hote hain.",
    count: 3,
  },
  {
    id: 25,
    category: "Raat",
    arabic: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
    roman: "Allahumma bismika amutu wa ahya",
    urdu: "اے اللہ تیرے نام سے مرتا اور جیتا ہوں",
    fazilat:
      "Sone se pehle ki dua. Neend mein bhi Allah ki hifazat milti hai. Nabi ﷺ ki sunnat.",
    count: 1,
  },
  {
    id: 26,
    category: "Subah",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",
    roman: "Asbahna wa asbahal mulku lillah",
    urdu: "ہم نے صبح کی اور سارا ملک اللہ کا ہے",
    fazilat:
      "Subah uthne ki dua. Din ki ibtida Allah ke naam se. Barakah ka zariya.",
    count: 1,
  },
  {
    id: 27,
    category: "Shifa",
    arabic: "اللَّهُمَّ عَافِنِي فِي بَدَنِي",
    roman: "Allahumma 'afini fi badani, Allahumma 'afini fi sam'i",
    urdu: "اے اللہ میرے جسم کو عافیت دے، میرے کانوں کو عافیت دے",
    fazilat:
      "Subah shaam teen baar padhna. Jismani aur rohani sehat ke liye. Abu Bakra RA ki sunnat.",
    count: 3,
  },
  {
    id: 28,
    category: "Hifazat",
    arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ",
    roman: "Ya Hayyu ya Qayyumu birahmatika astaghith",
    urdu: "اے ہمیشہ زندہ اے قائم رہنے والے تیری رحمت سے فریاد کرتا ہوں",
    fazilat:
      "Mushkil waqt mein azeem wazifa. Nabi ﷺ ne Fatima RA ko sikhaya. Allah ki madad jaldi aati hai.",
    count: 40,
  },
  {
    id: 29,
    category: "Iman",
    arabic: "رَضِيتُ بِاللهِ رَبًّا وَبِالْإِسْلَامِ دِينًا",
    roman: "Raditu billahi Rabba, wa bil-Islami dinan",
    urdu: "میں اللہ کو رب مانتے ہوئے، اسلام کو دین مانتے ہوئے راضی ہوں",
    fazilat:
      "Subah teen baar padhne se Jannat wajib ho jaati hai. Azeem sunnat amal.",
    count: 3,
  },
  {
    id: 30,
    category: "Durood",
    arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ",
    roman: "Allahumma salli ala Muhammadin wa ala aali Muhammad",
    urdu: "اے اللہ محمد ﷺ اور آل محمد پر درود بھیج",
    fazilat:
      "Durood Ibrahim -- Namaz mein padhna farz. Jumme ke din kasrat se padhna. Nabi ﷺ ki shafa'at ka wada.",
    count: 100,
  },
  {
    id: 31,
    category: "Rizq",
    arabic: "اللَّهُمَّ أَغْنِنِي بِحَلَالِكَ",
    roman: "Allahumma aghnini bihalalika",
    urdu: "اے اللہ مجھے اپنے حلال سے مالدار بنا",
    fazilat:
      "Faqr aur muflisi se hifazat. Halal kamai ki dua. Ali RA se manqool wazifa.",
    count: 11,
  },
  {
    id: 32,
    category: "Dua",
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
    roman: "Rabbi ishrah li sadri wa yassir li amri",
    urdu: "اے رب میرے سینے کو کھول دے اور میرا کام آسان کر",
    fazilat:
      "Musa AS ki dua. Mushkil kaam se pehle padhna. Ilm aur bayan ki wusat milti hai.",
    count: 7,
  },
  {
    id: 33,
    category: "Rizq",
    arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ",
    roman: "Allahumma ikfini bi halalika an haramik",
    urdu: "اے اللہ مجھے حلال سے کافی کر اور حرام سے بچا",
    fazilat: "Rizq mein barkat aati hai aur haram se bachao milta hai.",
    count: 7,
  },

  {
    id: 34,
    category: "Rizq",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رِزْقًا وَاسِعًا حَلَالًا طَيِّبًا",
    roman: "Allahumma inni asaluka rizqan wasian halalan tayyiban",
    urdu: "اے اللہ میں تجھ سے وسیع حلال اور پاک رزق مانگتا ہوں",
    fazilat:
      "Rizq mein kushada hoti hai, barkat aati hai. Halal kamai ke liye afzal.",
    count: 10,
  },
  {
    id: 35,
    category: "Rizq",
    arabic: "يَا رَزَّاقُ ارْزُقْنِي مِنْ حَيْثُ لَا أَحْتَسِبُ",
    roman: "Ya Razzaqu urzuqni min haythu la ahtasib",
    urdu: "اے روزی دینے والے مجھے وہاں سے رزق دے جہاں سے میں سوچ بھی نہیں سکتا",
    fazilat:
      "Allah ke asma se dua. Ghaib se rizq milta hai. Qabooliyat ka bada zariya.",
    count: 33,
  },
  {
    id: 36,
    category: "Shifa",
    arabic: "اللَّهُمَّ عَافِنِي فِي بَدَنِي وَعَافِنِي فِي سَمْعِي",
    roman: "Allahumma afini fi badani wa afini fi sami",
    urdu: "اے اللہ میرے جسم میں اور سماعت میں عافیت عطا فرما",
    fazilat:
      "Rozana padhne se jism mein aafiyat aur quwwat milti hai. Bimari se bachao.",
    count: 3,
  },
  {
    id: 37,
    category: "Shifa",
    arabic: "أَذْهِبِ الْبَأْسَ رَبَّ النَّاسِ وَاشْفِ أَنْتَ الشَّافِي",
    roman: "Adhhib al-bas rabb an-nas washfi antash-shafi",
    urdu: "اے لوگوں کے رب تکلیف دور فرما اور شفا دے تو ہی شفا دینے والا ہے",
    fazilat:
      "Beemar par dam karte waqt Nabi yahi padhte. Shifa ka khaas wazifa.",
    count: 7,
  },
  {
    id: 38,
    category: "Hifazat",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    roman: "Aoodhu bi kalimatillahit tammati min sharri ma khalaq",
    urdu: "اللہ کے کامل کلمات کے ذریعے ہر مخلوق کے شر سے پناہ",
    fazilat:
      "Sham ko 3 baar padhne se raat bhar hifazat milti hai. Sahih Muslim.",
    count: 3,
  },
  {
    id: 39,
    category: "Istighfar",
    arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
    roman: "Rabbi ighfir li wa tub alayya innaka antat tawwabur rahim",
    urdu: "اے رب مجھے معاف کر توبہ قبول کر تو توبہ قبول کرنے والا مہربان ہے",
    fazilat:
      "100 baar padhna Nabi ki sunnat. Dil ki sakhti aur ghamm door hota hai.",
    count: 100,
  },
  {
    id: 40,
    category: "Istighfar",
    arabic: "أَسْتَغْفِرُ اللهَ الْعَظِيمَ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
    roman: "Astaghfirullah al-adheem alladhi la ilaha illa huwal hayyul qayyum",
    urdu: "اللہ عظیم سے مغفرت جس کے سوا کوئی معبود نہیں وہ ہمیشہ زندہ قائم ہے",
    fazilat:
      "Sayyid al-Istighfar ke baad ye padhna. Gunah bil-kuwwat maaf hote hain.",
    count: 3,
  },
  {
    id: 41,
    category: "Durood",
    arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ",
    roman:
      "Allahumma salli ala Muhammad wa ala ali Muhammad kama sallayta ala Ibrahim",
    urdu: "اے اللہ محمد ﷺ اور آل محمد پر رحمت بھیج جیسے ابراہیم پر بھیجی",
    fazilat:
      "Durood Ibrahimi -- namaz ka hissa. Jumua ke din kasrat se padhna afzal.",
    count: 100,
  },
  {
    id: 42,
    category: "Durood",
    arabic: "صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ",
    roman: "Sallallahu alayhi wa sallam",
    urdu: "اللہ کی رحمت اور سلامتی ہو محمد ﷺ پر",
    fazilat:
      "Nabi ka naam sunne par padhna wajib. Ek baar padhne se 10 rehmatein.",
    count: 50,
  },
  {
    id: 43,
    category: "Tasbeeh",
    arabic: "سُبْحَانَ اللهِ وَبِحَمْدِهِ سُبْحَانَ اللهِ الْعَظِيمِ",
    roman: "SubhanAllahi wa bi hamdih SubhanAllahil adheem",
    urdu: "اللہ پاک ہے اس کی تعریف کے ساتھ اللہ عظیم پاک ہے",
    fazilat:
      "Nabi ne farmaya: zaban par halki mizan mein bhari Jannat mein pyari.",
    count: 100,
  },
  {
    id: 44,
    category: "Dua",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    roman:
      "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina adhab an-nar",
    urdu: "اے ہمارے رب دنیا میں بھلائی آخرت میں بھلائی اور جہنم کے عذاب سے بچا",
    fazilat: "Sabse jame dua. Nabi ki paseeda dua. Hajj mein kasrat se padhte.",
    count: 3,
  },
  {
    id: 45,
    category: "Dua",
    arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    roman: "Allahumma innaka afuwwun tuhibbul afwa fa-fu anni",
    urdu: "اے اللہ تو معاف کرنے والا ہے معافی پسند کرتا ہے مجھے معاف فرما",
    fazilat: "Laylatul Qadr mein padhne ki Nabi ne khud taleem di Aisha RA ko.",
    count: 7,
  },
  {
    id: 46,
    category: "Iman",
    arabic: "لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
    roman: "La ilaha illa anta subhanaka inni kuntu minaz zalimin",
    urdu: "تیرے سوا کوئی معبود نہیں تو پاک ہے بے شک میں ظالموں میں سے تھا",
    fazilat: "Yunus AS ki dua. Mushkil mein Allah fauran madad karta hai.",
    count: 40,
  },
  {
    id: 47,
    category: "Hifazat",
    arabic: "اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ وَمِنْ خَلْفِي وَعَنْ يَمِينِي وَعَنْ شِمَالِي",
    roman:
      "Allahumma ihfazni min bayni yadayya wa min khalfi wa an yamini wa an shimali",
    urdu: "اے اللہ آگے پیچھے دائیں بائیں ہر طرف سے میری حفاظت فرما",
    fazilat:
      "Subah padhne se farishte muhafiz ban jaate hain. Hadith Abu Dawud.",
    count: 3,
  },
  {
    id: 48,
    category: "Raat",
    arabic: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
    roman: "Allahumma bismika amutu wa ahya",
    urdu: "اے اللہ تیرے نام پر مرتا اور جیتا ہوں",
    fazilat: "Sone se pehle padhna Sunnah. Raat bhar hifazat milti hai.",
    count: 1,
  },
  {
    id: 49,
    category: "Subah",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ",
    roman: "Asbahna wa asbahal mulku lillah walhamdu lillah",
    urdu: "ہم نے صبح کی اور بادشاہت اللہ کی اور تمام تعریفیں اللہ کے لیے",
    fazilat: "Subah ki dua. Din bhar ki barakat aur hifazat milti hai.",
    count: 1,
  },
  {
    id: 50,
    category: "Rizq",
    arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ",
    roman: "Allahumma ikfini bi halalika an haramik wa aghnini bi fadlik",
    urdu: "اے اللہ مجھے حلال سے کافی کر حرام سے بچا اور اپنے فضل سے غنی کر",
    fazilat:
      "Ali RA se manqool wazifa. Qarz maafi aur rizq mein kushada. Tirmizi.",
    count: 11,
  },
];

const CATEGORIES = [
  "Sab",
  "Tasbeeh",
  "Hamd",
  "Takbeer",
  "Tahleel",
  "Durood",
  "Istighfar",
  "Rizq",
  "Shifa",
  "Hifazat",
  "Dua",
  "Iman",
  "Raat",
  "Subah",
];

const MILESTONES: Record<number, { text: string; color: string }> = {
  33: {
    text: "MaashaAllah! 33 ho gaye — SubhanAllah 33 dafa!",
    color: "#2d7d46",
  },
  66: {
    text: "Alhamdulillah! 66 ho gaye — Aadha safar tay!",
    color: "#b8941e",
  },
  99: {
    text: "SubhanAllah! 99 — Ek aur aur Tasbih mukammal!",
    color: "#7c3aed",
  },
  100: { text: "MaashaAllah! Ek poori Tasbih mukammal!", color: "#c9a84c" },
  200: { text: "Allahu Akbar! 200 — Kamaal ka jazba!", color: "#1a56db" },
  300: {
    text: "SubhanAllah! 300 — Hazrat Ali RA wali Tasbih!",
    color: "#c9a84c",
  },
  500: {
    text: "MaashaAllah! 500 ho gaye — Allah qabool farmaye!",
    color: "#2d7d46",
  },
  1000: {
    text: "Allahu Akbar! 1000! Aap ke hizr mein azeem barakat hai!",
    color: "#c9a84c",
  },
};

export function TasbihPage() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [milestone, setMilestone] = useState<null | {
    text: string;
    color: string;
  }>(null);
  const [selectedCat, setSelectedCat] = useState("Sab");
  const [selectedWazifa, setSelectedWazifa] = useState<
    (typeof WAZAIF)[0] | null
  >(null);
  const [vibrating, setVibrating] = useState(false);
  const milestoneTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // load from storage
  useEffect(() => {
    const saved = localStorage.getItem("tasbihCount");
    if (saved) setCount(Number.parseInt(saved, 10) || 0);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasbihCount", String(count));
  }, [count]);

  const handleTap = useCallback(() => {
    const next = count + 1;
    setCount(next);
    setVibrating(true);
    setTimeout(() => setVibrating(false), 150);
    if (navigator.vibrate) navigator.vibrate(30);
    const ms = MILESTONES[next];
    if (ms) {
      if (milestoneTimer.current) clearTimeout(milestoneTimer.current);
      setMilestone(ms);
      milestoneTimer.current = setTimeout(() => setMilestone(null), 3000);
    }
  }, [count]);

  const handleReset = useCallback(() => {
    setCount(0);
    setMilestone(null);
  }, []);

  const filteredWazaif =
    selectedCat === "Sab"
      ? WAZAIF
      : WAZAIF.filter((w) => w.category === selectedCat);
  const progress = target > 0 ? Math.min((count / target) * 100, 100) : 0;
  const circumference = 2 * Math.PI * 80;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", paddingBottom: "32px" }}>
      {/* Counter Ring */}
      <div
        style={{
          background: "linear-gradient(135deg, #0A0F2C 0%, #1a2a5e 100%)",
          borderRadius: "24px",
          padding: "28px 20px",
          marginBottom: "20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Stars */}
        {[8, 22, 35, 47, 58, 16, 72, 83, 91, 4, 63, 29].map((top, i) => (
          <div
            key={`star-pos-${top}`}
            style={{
              position: "absolute",
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: "rgba(201,168,76,0.5)",
              top: `${top}%`,
              left: `${(i / 12) * 100}%`,
              animation: `twinkle ${1.5 + (i % 3) * 0.5}s ease-in-out infinite`,
            }}
          />
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{ position: "relative", width: "200px", height: "200px" }}
          >
            <svg
              width="200"
              height="200"
              aria-hidden="true"
              style={{ transform: "rotate(-90deg)" }}
            >
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="10"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="url(#goldGrad)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: "stroke-dashoffset 0.3s ease" }}
              />
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C9A84C" />
                  <stop offset="100%" stopColor="#FFD700" />
                </linearGradient>
              </defs>
            </svg>
            <button
              type="button"
              data-ocid="tasbih.primary_button"
              onClick={handleTap}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) scale(${vibrating ? 0.93 : 1})`,
                width: "130px",
                height: "130px",
                borderRadius: "50%",
                border: "3px solid rgba(201,168,76,0.5)",
                background: "linear-gradient(135deg, #1e3a7a 0%, #0A0F2C 100%)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: vibrating
                  ? "0 0 30px rgba(201,168,76,0.6), inset 0 0 20px rgba(201,168,76,0.1)"
                  : "0 0 15px rgba(201,168,76,0.3), inset 0 0 10px rgba(201,168,76,0.05)",
                transition: "all 0.15s ease",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <span
                style={{
                  fontSize: "42px",
                  fontWeight: "800",
                  color: "#C9A84C",
                  lineHeight: 1,
                }}
              >
                {count}
              </span>
              <span
                style={{
                  fontSize: "10px",
                  color: "rgba(201,168,76,0.7)",
                  marginTop: "4px",
                }}
              >
                Tap karo
              </span>
            </button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "12px",
          }}
        >
          <div style={{ textAlign: "center", flex: 1 }}>
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "10px",
                marginBottom: "2px",
              }}
            >
              Target
            </p>
            <select
              data-ocid="tasbih.select"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "#C9A84C",
                border: "1px solid rgba(201,168,76,0.3)",
                borderRadius: "8px",
                padding: "4px 8px",
                fontSize: "13px",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {[33, 66, 99, 100, 300, 500, 1000].map((n) => (
                <option key={n} value={n} style={{ background: "#0A0F2C" }}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            data-ocid="tasbih.delete_button"
            onClick={handleReset}
            style={{
              background: "rgba(255,70,70,0.15)",
              border: "1px solid rgba(255,70,70,0.3)",
              borderRadius: "10px",
              padding: "8px 16px",
              color: "#ff7070",
              fontSize: "12px",
              cursor: "pointer",
              fontFamily: "'Poppins', sans-serif",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            Reset
          </button>
        </div>
        {/* Milestone */}
        {milestone && (
          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              border: `1px solid ${milestone.color}`,
              borderRadius: "12px",
              padding: "10px 16px",
              textAlign: "center",
              animation: "fadeIn 0.3s ease",
            }}
          >
            <p
              style={{
                color: milestone.color,
                fontSize: "13px",
                fontWeight: "600",
                margin: 0,
              }}
            >
              {milestone.text}
            </p>
          </div>
        )}
      </div>

      {/* Wazaif Section */}
      <div style={{ marginBottom: "12px" }}>
        <h3
          style={{
            color: "#1a2035",
            fontFamily: "'Amiri', serif",
            fontSize: "18px",
            marginBottom: "12px",
            fontWeight: "700",
          }}
        >
          📿 Wazaif ({WAZAIF.length}+)
        </h3>
        <div
          style={{
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            paddingBottom: "8px",
            scrollbarWidth: "none",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              data-ocid="tasbih.tab"
              onClick={() => setSelectedCat(cat)}
              style={{
                flexShrink: 0,
                padding: "6px 14px",
                borderRadius: "20px",
                border:
                  selectedCat === cat
                    ? "none"
                    : "1px solid rgba(201,168,76,0.25)",
                background:
                  selectedCat === cat
                    ? "linear-gradient(135deg, #C9A84C, #FFD700)"
                    : "rgba(255,255,255,0.8)",
                color: selectedCat === cat ? "#fff" : "#6b7280",
                fontSize: "11px",
                fontWeight: "600",
                cursor: "pointer",
                WebkitTapHighlightColor: "transparent",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {filteredWazaif.map((w, idx) => (
          <button
            type="button"
            key={w.id}
            data-ocid={`tasbih.item.${idx + 1}`}
            onClick={() =>
              setSelectedWazifa(selectedWazifa?.id === w.id ? null : w)
            }
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "16px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              border:
                selectedWazifa?.id === w.id
                  ? "1.5px solid #C9A84C"
                  : "1px solid rgba(201,168,76,0.1)",
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
              transition: "all 0.2s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "8px",
              }}
            >
              <span
                style={{
                  background:
                    "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))",
                  border: "1px solid rgba(201,168,76,0.3)",
                  borderRadius: "8px",
                  padding: "2px 10px",
                  fontSize: "10px",
                  color: "#b8941e",
                  fontWeight: "600",
                }}
              >
                {w.category}
              </span>
              <span
                style={{
                  background: "rgba(10,15,44,0.08)",
                  borderRadius: "8px",
                  padding: "2px 10px",
                  fontSize: "11px",
                  color: "#1a2035",
                  fontWeight: "700",
                }}
              >
                {w.count}x
              </span>
            </div>
            <p
              style={{
                fontFamily: "'Amiri', serif",
                fontSize: "20px",
                color: "#0A0F2C",
                textAlign: "right",
                lineHeight: "1.8",
                marginBottom: "6px",
                direction: "rtl",
              }}
            >
              {w.arabic}
            </p>
            <p
              style={{
                fontSize: "13px",
                color: "#4b5563",
                fontWeight: "600",
                marginBottom: "4px",
              }}
            >
              {w.roman}
            </p>
            <p
              style={{
                fontSize: "12px",
                color: "#9ca3af",
                marginBottom: selectedWazifa?.id === w.id ? "10px" : "0",
              }}
            >
              {w.urdu}
            </p>
            {selectedWazifa?.id === w.id && (
              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.03))",
                  border: "1px solid rgba(201,168,76,0.2)",
                  borderRadius: "10px",
                  padding: "10px 12px",
                }}
              >
                <p
                  style={{
                    fontSize: "11px",
                    color: "#6b5200",
                    lineHeight: "1.7",
                    margin: 0,
                  }}
                >
                  ✨ {w.fazilat}
                </p>
                <button
                  type="button"
                  data-ocid="tasbih.secondary_button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTarget(w.count);
                    setCount(0);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    padding: "8px",
                    background: "linear-gradient(135deg, #C9A84C, #FFD700)",
                    border: "none",
                    borderRadius: "10px",
                    color: "#fff",
                    fontWeight: "700",
                    fontSize: "12px",
                    cursor: "pointer",
                    fontFamily: "'Poppins', sans-serif",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  Is Wazifa ke target ({w.count}) par set karo
                </button>
              </div>
            )}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default TasbihPage;
