export interface Dua {
  id: string;
  category: "subah" | "shaam" | "namaz" | "safar" | "khana" | "sone";
  arabic: string;
  romanUrdu: string;
  urdu: string;
  telugu: string;
  source?: string;
  isCustom?: boolean;
}

export const DUA_DATA: Dua[] = [
  // ── SUBAH (Morning) ──
  {
    id: "s1",
    category: "subah",
    arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
    romanUrdu:
      "Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namutu wa ilaikan nushur",
    urdu: "اے اللہ! تیری توفیق سے صبح کی، تیری توفیق سے شام کریں گے، تیری توفیق سے جیتے ہیں، تیری توفیق سے مریں گے، اور تیری طرف لوٹنا ہے",
    telugu:
      "ఓ అల్లాహ్! నీ సహాయంతో ఉదయించాం, నీతో సాయంత్రమవుతాం, నీతో జీవిస్తాం, నీతో మరణిస్తాం, నీ వైపే తిరిగి వెళ్ళాలి",
    source: "Abu Dawud 5068",
  },
  {
    id: "s2",
    category: "subah",
    arabic:
      "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    romanUrdu:
      "Asbahna wa asbahal mulku lillahi wal hamdu lillahi la ilaha illallahu wahdahu la sharika lahu lahul mulku wa lahul hamdu wa huwa 'ala kulli shay'in qadir",
    urdu: "ہم نے صبح کی اور ساری بادشاہت اللہ کے لیے ہے، اللہ کی تعریف ہے، اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، بادشاہی اور تعریف اسی کی ہے، وہ ہر چیز پر قادر ہے",
    telugu:
      "మేము ఉదయించాం, రాజ్యం అల్లాహ్‌కే, కృతజ్ఞతలు ఆయనకే, ఆయన తప్ప ఆరాధ్యుడు లేడు, ఒంటరిగా, భాగస్వామి లేడు",
    source: "Muslim 2723",
  },
  {
    id: "s3",
    category: "subah",
    arabic:
      "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    romanUrdu:
      "La ilaha illallahu wahdahu la sharika lahu lahul mulku wa lahul hamdu wa huwa 'ala kulli shay'in qadir (100 bar)",
    urdu: "اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، شریک نہیں، بادشاہی اور تعریف اسی کی، ہر چیز پر قادر ہے (100 بار)",
    telugu:
      "అల్లాహ్ తప్ప ఆరాధ్యుడు లేడు, ఒంటరి, భాగస్వామి లేడు, రాజ్యం ఆయనకే, ప్రశంసలు ఆయనకే (100 సార్లు)",
    source: "Bukhari 3293",
  },
  {
    id: "s4",
    category: "subah",
    arabic:
      "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    romanUrdu:
      "Bismillahil ladhi la yadurru ma'asmihi shay'un fil ardi wa la fis sama'i wa huwas sami'ul 'alim (3 bar)",
    urdu: "اللہ کے نام سے جس کے نام کے ساتھ زمین اور آسمان میں کوئی چیز نقصان نہیں دیتی، اور وہ سننے والا جاننے والا ہے (3 بار)",
    telugu:
      "అల్లాహ్ పేరుతో — భూమిలో, ఆకాశంలో ఆయన పేరుతో ఏదీ నష్టపరచదు, ఆయన వినేవాడు, తెలిసేవాడు (3 సార్లు)",
    source: "Tirmidhi 3388, Abu Dawud 5088",
  },
  {
    id: "s5",
    category: "subah",
    arabic:
      "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    romanUrdu:
      "Allahumma anta rabbi la ilaha illa anta khalaqtani wa ana 'abduka wa ana 'ala 'ahdika wa wa'dika mastata'tu a'udhu bika min sharri ma sana'tu abu'u laka bini'matika 'alayya wa abu'u bidhanbi faghfirli fa innahu la yaghfirudh dhunuba illa ant",
    urdu: "اے اللہ! تو میرا رب ہے، تیرے سوا کوئی معبود نہیں، تو نے مجھے پیدا کیا، میں تیرا بندہ ہوں، میں اپنی طاقت بھر تیرے عہد پر قائم ہوں، میں نے جو کیا اس کے شر سے تیری پناہ مانگتا ہوں، تیری نعمتوں کا اقرار کرتا ہوں، اپنے گناہوں کا اقرار کرتا ہوں، مجھے معاف کر کیونکہ گناہ معاف کرنے والا سوائے تیرے کوئی نہیں — یہ سیدالاستغفار ہے",
    telugu:
      "ఓ అల్లాహ్! నువ్వే నా ప్రభువు, నీ తప్ప ఆరాధ్యుడు లేడు, నువ్వు నన్ను సృష్టించావు, నేను నీ బందా, నీ నిబంధన పై ఉన్నాను, నా చేతల చెడు నుండి శరణు కోరుతాను, నీ అనుగ్రహాలు అంగీకరిస్తాను, పాపాలు అంగీకరిస్తాను, నన్ను క్షమించు — ఇది సయ్యిదుల్ ఇస్తిగ్ఫార్",
    source: "Bukhari 6306",
  },
  {
    id: "s6",
    category: "subah",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ (١٠٠ مرتبہ)",
    romanUrdu: "Subhanallahi wa bihamdih (100 bar)",
    urdu: "اللہ پاک ہے اور اس کی تعریف ہے (100 بار — گناہ مٹتے ہیں)",
    telugu: "అల్లాహ్ పవిత్రుడు, ప్రశంసలు ఆయనకే (100 సార్లు)",
    source: "Muslim 2691",
  },
  {
    id: "s7",
    category: "subah",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ",
    romanUrdu: "Allahumma inni as'alukal 'afiyata fid dunya wal akhirah",
    urdu: "اے اللہ! میں دنیا اور آخرت دونوں میں تجھ سے عافیت مانگتا ہوں",
    telugu: "ఓ అల్లాహ్! ఇహలోకంలో, పరలోకంలో రెండింట్లో నిన్ను శాంతి అడుగుతున్నాను",
    source: "Ibn Majah 3871",
  },
  {
    id: "s8",
    category: "subah",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    romanUrdu: "A'udhu bikalimatillahit tammati min sharri ma khalaq (3 bar)",
    urdu: "اللہ کے کامل کلمات کی پناہ مانگتا ہوں اس کی مخلوق کے شر سے (3 بار)",
    telugu: "అల్లాహ్ యొక్క పరిపూర్ణ మాటల ఆశ్రయం కోరుతాను, ఆయన సృష్టి చెడు నుండి (3 సార్లు)",
    source: "Muslim 2708",
  },
  {
    id: "s9",
    category: "subah",
    arabic:
      "اللَّهُمَّ عَافِنِي فِي بَدَنِي اللَّهُمَّ عَافِنِي فِي سَمْعِي اللَّهُمَّ عَافِنِي فِي بَصَرِي لَا إِلَهَ إِلَّا أَنْتَ",
    romanUrdu:
      "Allahumma 'afini fi badani, Allahumma 'afini fi sam'i, Allahumma 'afini fi basari, la ilaha illa ant (3 bar)",
    urdu: "اے اللہ! میرے جسم میں عافیت دے، میری سماعت میں عافیت دے، میری بصارت میں عافیت دے، تیرے سوا کوئی معبود نہیں (3 بار)",
    telugu: "ఓ అల్లాహ్! నా శరీరంలో, చెవులలో, కళ్ళలో ఆరోగ్యం ప్రసాదించు (3 సార్లు)",
    source: "Abu Dawud 5090",
  },
  {
    id: "s10",
    category: "subah",
    arabic: "رَضِيتُ بِاللَّهِ رَبًّا وَبِالْإِسْلَامِ دِينًا وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
    romanUrdu:
      "Raditu billahi rabban wa bil islami dinan wa bi Muhammadin sallallahu 'alayhi wa sallama nabiyyan (3 bar)",
    urdu: "میں اللہ کے رب ہونے پر، اسلام کے دین ہونے پر، اور حضرت محمد ﷺ کے نبی ہونے پر راضی ہوں (3 بار)",
    telugu: "అల్లాహ్‌ను ప్రభువుగా, ఇస్లామ్‌ను ధర్మంగా, ముహమ్మద్ ﷺ ని నబిగా అంగీకరించాను (3 సార్లు)",
    source: "Tirmidhi 3389",
  },

  // ── SHAAM (Evening) ──
  {
    id: "sh1",
    category: "shaam",
    arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
    romanUrdu:
      "Allahumma bika amsayna wa bika asbahna wa bika nahya wa bika namutu wa ilaykal masir",
    urdu: "اے اللہ! تیری توفیق سے شام ہوئی، تیری توفیق سے صبح ہوگی، تیری توفیق سے جیتے ہیں، تیری توفیق سے مریں گے، اور تیری طرف لوٹنا ہے",
    telugu: "ఓ అల్లాహ్! నీ సహాయంతో సాయంత్రమయ్యాం, నీతో జీవిస్తాం, నీతో మరణిస్తాం, నీ వైపే తిరిగి వెళ్ళాలి",
    source: "Abu Dawud 5068",
  },
  {
    id: "sh2",
    category: "shaam",
    arabic:
      "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    romanUrdu:
      "Amsayna wa amsal mulku lillahi wal hamdu lillahi la ilaha illallahu wahdahu la sharika lahu lahul mulku wa lahul hamdu wa huwa 'ala kulli shay'in qadir",
    urdu: "شام ہوئی اور ساری بادشاہت اللہ کے لیے ہے، اللہ کی تعریف ہے، اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے",
    telugu: "సాయంత్రమయింది, రాజ్యం అల్లాహ్‌కే, ఆయన తప్ప ఆరాధ్యుడు లేడు",
    source: "Muslim 2723",
  },
  {
    id: "sh3",
    category: "shaam",
    arabic: "اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ وَمِنْ خَلْفِي وَعَنْ يَمِينِي وَعَنْ شِمَالِي وَمِنْ فَوْقِي",
    romanUrdu:
      "Allahumma ihfazni min bayni yadayya wa min khalfi wa 'an yamini wa 'an shimali wa min fawqi",
    urdu: "اے اللہ! میرے آگے، پیچھے، دائیں، بائیں اور اوپر سے میری حفاظت فرما",
    telugu: "ఓ అల్లాహ్! ముందు, వెనుక, కుడి, ఎడమ, పై నుండి నన్ను కాపాడు",
    source: "Abu Dawud 5074",
  },
  {
    id: "sh4",
    category: "shaam",
    arabic: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
    romanUrdu:
      "Hasbiyallahu la ilaha illa huwa 'alayhi tawakkaltu wa huwa rabbul 'arshil 'azim (7 bar)",
    urdu: "مجھے اللہ کافی ہے، اس کے سوا کوئی معبود نہیں، میں نے اس پر بھروسہ کیا، وہ عرش عظیم کا رب ہے (7 بار)",
    telugu: "అల్లాహ్ నాకు చాలు, ఆయన తప్ప ఆరాధ్యుడు లేడు, ఆయనపై నమ్మకం ఉంచాను (7 సార్లు)",
    source: "Abu Dawud 5081",
  },
  {
    id: "sh5",
    category: "shaam",
    arabic:
      "اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ",
    romanUrdu:
      "Allahumma inni amsaytu ushiduka wa ushidu hamalata 'arshika wa mala'ikataka wa jami'a khalqika annaka antallahu la ilaha illa ant (4 bar)",
    urdu: "اے اللہ! میں شام کو تجھے، عرش اٹھانے والوں کو، فرشتوں کو اور تیری تمام مخلوق کو گواہ بناتا ہوں کہ تو ہی اللہ ہے، تیرے سوا کوئی معبود نہیں (4 بار)",
    telugu: "ఓ అల్లాహ్! సాయంత్రం నిన్ను, అర్ష్ మోసేవారిని, మలాయికాలను సాక్షిగా పెట్టాను (4 సార్లు)",
    source: "Abu Dawud 5069",
  },
  {
    id: "sh6",
    category: "shaam",
    arabic:
      "اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ",
    romanUrdu:
      "Allahumma ma amsa bi min ni'matin aw bi ahadin min khalqika faminka wahdaka la sharika laka falakal hamdu wa lakash shukr",
    urdu: "اے اللہ! شام کو مجھ پر یا تیری کسی مخلوق پر جو نعمت ہے وہ صرف تیری طرف سے ہے، تیرا کوئی شریک نہیں، تیری ہی تعریف اور شکر ہے",
    telugu: "ఓ అల్లాహ్! ఈ సాయంత్రం నాకు ఉన్న అనుగ్రహం నీ నుండే, నీకు భాగస్వామి లేడు",
    source: "Abu Dawud 5073",
  },
  {
    id: "sh7",
    category: "shaam",
    arabic:
      "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا فِيهَا وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا فِيهَا",
    romanUrdu:
      "Allahumma inni as'aluka khayra hazihil laylati wa khayra ma fiha wa a'udhu bika min sharriha wa sharri ma fiha",
    urdu: "اے اللہ! اس رات کی بھلائی اور جو اس میں ہے اس کی بھلائی مانگتا ہوں، اور اس کے شر اور جو اس میں ہے اس کے شر سے پناہ مانگتا ہوں",
    telugu: "ఓ అల్లాహ్! ఈ రాత్రి మేలు అడుగుతున్నాను, దీని చెడు నుండి శరణు కోరుతాను",
    source: "Muslim 2723",
  },
  {
    id: "sh8",
    category: "shaam",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    romanUrdu: "A'udhu bikalimatillahit tammati min sharri ma khalaq (3 bar)",
    urdu: "اللہ کے کامل کلمات کی پناہ مانگتا ہوں اس کی مخلوق کے شر سے (3 بار)",
    telugu: "అల్లాహ్ పరిపూర్ణ మాటల ఆశ్రయం కోరుతాను, ఆయన సృష్టి చెడు నుండి (3 సార్లు)",
    source: "Muslim 2708",
  },
  {
    id: "sh9",
    category: "shaam",
    arabic: "اللَّهُمَّ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ",
    romanUrdu:
      "Allahumma fatiras samawati wal ardi 'alimal ghaybi wash shahadati rabba kulli shay'in wa malikah",
    urdu: "اے اللہ! آسمانوں اور زمین کے پیدا کرنے والے، غیب اور ظاہر کے جاننے والے، ہر چیز کے رب اور مالک",
    telugu: "ఓ అల్లాహ్! ఆకాశాలు, భూమి సృష్టికర్తా, కనిపించని వాటి జ్ఞాత",
    source: "Muslim 2717",
  },
  {
    id: "sh10",
    category: "shaam",
    arabic:
      "أَعُوذُ بِعَفْوِكَ مِنْ عِقَابِكَ وَأَعُوذُ بِرِضَاكَ مِنْ سَخَطِكَ وَأَعُوذُ بِكَ مِنْكَ لَا أُحْصِي ثَنَاءً عَلَيْكَ",
    romanUrdu:
      "A'udhu bi'afwika min 'iqabika wa a'udhu biridaka min sakhatika wa a'udhu bika minka la uhsi thana'an 'alayk",
    urdu: "میں تیری سزا سے تیری معافی کی پناہ مانگتا ہوں، تیرے غضب سے تیری رضا کی پناہ مانگتا ہوں، تجھ سے تیری پناہ مانگتا ہوں — میں تیری پوری تعریف نہیں کر سکتا",
    telugu: "నీ శిక్ష నుండి నీ క్షమాపణలో ఆశ్రయం, నీ కోపం నుండి నీ సంతోషంలో ఆశ్రయం కోరుతాను",
    source: "Muslim 486, Tirmidhi 3566",
  },

  // ── NAMAZ KE BAAD (After Prayer) ──
  {
    id: "n1",
    category: "namaz",
    arabic: "أَسْتَغْفِرُ اللَّهَ (٣ مرتبہ)",
    romanUrdu: "Astaghfirullah (3 bar)",
    urdu: "میں اللہ سے معافی مانگتا ہوں (3 مرتبہ)",
    telugu: "అల్లాహ్ క్షమాపణ కోరుతాను (3 సార్లు)",
    source: "Muslim 591",
  },
  {
    id: "n2",
    category: "namaz",
    arabic: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
    romanUrdu:
      "Allahumma antas salam wa minkas salam tabarakta ya dhal jalali wal ikram",
    urdu: "اے اللہ! تو سلامتی ہے، سلامتی تجھ سے ہے، تو بابرکت ہے اے جلال اور عزت والے",
    telugu: "ఓ అల్లాహ్! నువ్వు సలామ్, సలామ్ నీ నుండే, ఓ మహిమ మరియు గౌరవ ప్రభూ!",
    source: "Muslim 591",
  },
  {
    id: "n3",
    category: "namaz",
    arabic: "سُبْحَانَ اللَّهِ (٣٣) الْحَمْدُ لِلَّهِ (٣٣) اللَّهُ أَكْبَرُ (٣٤)",
    romanUrdu: "Subhanallah 33x, Alhamdulillah 33x, Allahu Akbar 34x",
    urdu: "سبحان اللہ 33 بار، الحمد للہ 33 بار، اللہ اکبر 34 بار",
    telugu: "సుభానల్లాహ్ 33, అల్హమ్దులిల్లాహ్ 33, అల్లాహు అక్బర్ 34",
    source: "Bukhari 843, Muslim 597",
  },
  {
    id: "n4",
    category: "namaz",
    arabic:
      "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    romanUrdu:
      "La ilaha illallahu wahdahu la sharika lahu lahul mulku wa lahul hamdu wa huwa 'ala kulli shay'in qadir",
    urdu: "اللہ کے سوا کوئی معبود نہیں، اکیلا ہے، شریک نہیں، بادشاہی اور تعریف اسی کی، ہر چیز پر قادر ہے",
    telugu: "అల్లాహ్ తప్ప ఆరాధ్యుడు లేడు, ఒంటరి, రాజ్యం ఆయనకే, ప్రశంసలు ఆయనకే",
    source: "Muslim 597",
  },
  {
    id: "n5",
    category: "namaz",
    arabic:
      "اللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ وَلَا مُعْطِيَ لِمَا مَنَعْتَ وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ",
    romanUrdu:
      "Allahumma la mani'a lima a'tayta wa la mu'tiya lima mana'ta wa la yanfa'u dhal jaddi minkal jadd",
    urdu: "اے اللہ! جو تو دے اسے کوئی روکنے والا نہیں، جو تو روکے اسے کوئی دینے والا نہیں، مالدار کو اس کی دولت تجھ سے نہیں بچا سکتی",
    telugu: "ఓ అల్లాహ్! నువ్వు ఇచ్చేది ఆపేవాడు లేడు, నువ్వు ఆపేది ఇచ్చేవాడు లేడు",
    source: "Bukhari 844",
  },
  {
    id: "n6",
    category: "namaz",
    arabic:
      "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
    romanUrdu:
      "Allahu la ilaha illa huwal hayyul qayyum la ta'khudhuhuu sinatun wa la nawm lahu ma fis samawati wa ma fil ard — Ayatul Kursi (2:255)",
    urdu: "آیت الکرسی — اللہ، اس کے سوا کوئی معبود نہیں، زندہ جاوید، قائم و دائم، اسے نہ اونگھ آتی ہے نہ نیند، آسمانوں اور زمین میں جو کچھ ہے سب اسی کا ہے",
    telugu: "ఆయతుల్ కుర్సీ — అల్లాహ్, ఆయన తప్ప ఆరాధ్యుడు లేడు, జీవించే ఉన్నవాడు",
    source: "Bukhari 2311 — Namaz baad wajib",
  },
  {
    id: "n7",
    category: "namaz",
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ وَقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ وَقُلْ أَعُوذُ بِرَبِّ النَّاسِ (٣ مرتبہ)",
    romanUrdu:
      "Qul huwallahu ahad + Qul a'udhu birabbil falaq + Qul a'udhu birabbin nas (3 bar each)",
    urdu: "سورہ اخلاص، سورہ فلق، سورہ ناس — ہر فرض نماز کے بعد تین تین بار پڑھیں",
    telugu: "సూరహ్ ఇఖ్లాస్, ఫలఖ్, నాస్ — ప్రతి ఫర్జ్ నమాజ్ తర్వాత 3 సార్లు",
    source: "Abu Dawud 5082, Tirmidhi 2903",
  },
  {
    id: "n8",
    category: "namaz",
    arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
    romanUrdu: "Allahumma a'inni 'ala dhikrika wa shukrika wa husni 'ibadatik",
    urdu: "اے اللہ! تیرے ذکر، شکر اور اچھی عبادت پر میری مدد فرما",
    telugu: "ఓ అల్లాహ్! నీ జ్ఞానం, కృతజ్ఞత, మంచి ఆరాధనపై నన్ను సహాయపడు",
    source: "Abu Dawud 1522",
  },
  {
    id: "n9",
    category: "namaz",
    arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
    romanUrdu:
      "Rabbighfirli wa tub 'alayya innaka antat tawwabur rahim (100 bar)",
    urdu: "اے رب! مجھے معاف کر اور توبہ قبول فرما، بے شک تو توبہ قبول کرنے والا رحم کرنے والا ہے (100 بار)",
    telugu:
      "ప్రభూ! నన్ను క్షమించి పశ్చాత్తాపం అంగీకరించు, నువ్వే పశ్చాత్తాపం స్వీకరించేవాడు (100 సార్లు)",
    source: "Tirmidhi 3434, Ibn Majah 3814",
  },
  {
    id: "n10",
    category: "namaz",
    arabic:
      "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ",
    romanUrdu:
      "Allahumma salli 'ala Muhammadin wa 'ala ali Muhammadin kama sallayta 'ala Ibrahima wa 'ala ali Ibrahim",
    urdu: "اے اللہ! حضرت محمد ﷺ اور آل محمد ﷺ پر درود بھیج جیسا تو نے ابراہیم ؑ اور آل ابراہیم ؑ پر بھیجا — درود ابراہیمی",
    telugu: "ఓ అల్లాహ్! ముహమ్మద్ ﷺ మరియు వారి వంశంపై, ఇబ్రాహీమ్ ఆ.స. పై పంపినట్టే దరూద్ పంపు",
    source: "Bukhari 3370 — Durood Ibrahimi",
  },

  // ── SAFAR (Travel) ──
  {
    id: "sf1",
    category: "safar",
    arabic: "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى وَمِنَ الْعَمَلِ مَا تَرْضَى",
    romanUrdu:
      "Allahumma inna nas'aluka fi safarina hazal birra wat taqwa wa minal 'amali ma tarda",
    urdu: "اے اللہ! اس سفر میں نیکی، تقویٰ اور ایسے عمل مانگتے ہیں جن سے تو راضی ہو",
    telugu: "ఓ అల్లాహ్! ఈ ప్రయాణంలో నేకీ, తఖ్వా, నీకు ఇష్టమైన అమల్ అడుగుతున్నాం",
    source: "Muslim 1342",
  },
  {
    id: "sf2",
    category: "safar",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
    romanUrdu:
      "Subhana ladhi sakhkhara lana hadha wa ma kunna lahu muqrinina wa inna ila rabbina lamunqalibun",
    urdu: "پاک ہے وہ جس نے اسے ہمارے لیے مسخر کیا، اور ہم اسے قابو کرنے کی طاقت نہیں رکھتے تھے، اور ہم ضرور اپنے رب کی طرف لوٹنے والے ہیں",
    telugu:
      "పవిత్రుడు అతను, దీన్ని మనకోసం అధీనపరిచాడు, మేము దీన్ని నియంత్రించలేము, మేము మన ప్రభువు వైపు తిరిగి వెళ్తాం",
    source: "Quran 43:13-14, Tirmidhi 3446",
  },
  {
    id: "sf3",
    category: "safar",
    arabic:
      "اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ وَالْخَلِيفَةُ فِي الْأَهْلِ اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ",
    romanUrdu:
      "Allahumma antas sahibu fis safari wal khalifatu fil ahli allahumma inni a'udhu bika min wa'tha'is safar",
    urdu: "اے اللہ! سفر میں تو ساتھی ہے اور گھر میں نگہبان، اے اللہ! سفر کی تکلیف سے تیری پناہ مانگتا ہوں",
    telugu:
      "ఓ అల్లాహ్! ప్రయాణంలో నువ్వే తోడు, ఇంట్లో నీవే రక్షకుడు, ప్రయాణ కష్టాల నుండి శరణు కోరుతాను",
    source: "Muslim 1342",
  },
  {
    id: "sf4",
    category: "safar",
    arabic: "رَبِّ أَنْزِلْنِي مُنْزَلًا مُبَارَكًا وَأَنْتَ خَيْرُ الْمُنْزِلِينَ",
    romanUrdu: "Rabbi anzilni munzalan mubarakan wa anta khayrul munzilin",
    urdu: "اے رب! مجھے بابرکت جگہ اتار، اور تو سب سے بہتر اتارنے والا ہے",
    telugu: "ప్రభూ! బాగా బ్లెస్డ్ స్థానంలో నన్ను దింపు, నువ్వే శ్రేష్ఠమైన దింపేవాడు",
    source: "Quran 23:29",
  },
  {
    id: "sf5",
    category: "safar",
    arabic: "اللَّهُمَّ اطْوِ لَنَا الْأَرْضَ وَهَوِّنْ عَلَيْنَا السَّفَرَ",
    romanUrdu: "Allahumma itwi lanal arda wa hawwin 'alainas safar",
    urdu: "اے اللہ! ہمارے لیے زمین کو لپیٹ دے اور سفر کو آسان فرما",
    telugu: "ఓ అల్లాహ్! మాకోసం భూమిని చుట్టి, ప్రయాణం సులువు చేయి",
  },
  {
    id: "sf6",
    category: "safar",
    arabic:
      "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ وَكَآبَةِ الْمَنْظَرِ وَسُوءِ الْمُنْقَلَبِ فِي الْمَالِ وَالْأَهْلِ",
    romanUrdu:
      "Allahumma inni a'udhu bika min wa'tha'is safari wa ka'abatil manzari wa su'il munqalabi fil mali wal ahl",
    urdu: "اے اللہ! سفر کی تکلیف، برا منظر اور مال و اہل میں برے انجام سے پناہ مانگتا ہوں",
    telugu:
      "ఓ అల్లాహ్! ప్రయాణ కష్టాలు, చెడు దృశ్యం, ఆస్తి-కుటుంబంలో చెడు ముగింపు నుండి శరణు కోరుతాను",
    source: "Muslim 1343",
  },
  {
    id: "sf7",
    category: "safar",
    arabic: "اللَّهُمَّ بَارِكْ لَنَا فِي سَفَرِنَا وَاطْوِ لَنَا الْبُعْدَ",
    romanUrdu: "Allahumma barik lana fi safarina watwi lanal bu'd",
    urdu: "اے اللہ! ہمارے سفر میں برکت دے اور دوری کو کم فرما",
    telugu: "ఓ అల్లాహ్! మా ప్రయాణంలో బరకత్ ఇచ్చి దూరాన్ని తగ్గించు",
  },
  {
    id: "sf8",
    category: "safar",
    arabic:
      "اللَّهُمَّ أَصْلِحْ لِي دِينِي الَّذِي هُوَ عِصْمَةُ أَمْرِي وَأَصْلِحْ لِي دُنْيَايَ الَّتِي فِيهَا مَعَاشِي",
    romanUrdu:
      "Allahumma aslih li diniyal ladhi huwa 'ismatu amri wa aslih li dunyayal lati fiha ma'ashi",
    urdu: "اے اللہ! میرے دین کو درست فرما جو میرے معاملات کی حفاظت ہے، اور دنیا کو درست فرما جس میں میری زندگی ہے",
    telugu: "ఓ అల్లాహ్! నా దీన్‌ను సరిచేయి, నా దునియాను సరిచేయి",
    source: "Muslim 2720",
  },

  // ── KHANA (Food) ──
  {
    id: "k1",
    category: "khana",
    arabic: "بِسْمِ اللَّهِ",
    romanUrdu: "Bismillah (khane se pehle)",
    urdu: "اللہ کے نام سے (کھانے سے پہلے لازمی پڑھیں)",
    telugu: "అల్లాహ్ పేరుతో (తినే ముందు తప్పకుండా చదవండి)",
    source: "Bukhari 5376",
  },
  {
    id: "k2",
    category: "khana",
    arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
    romanUrdu: "Allahumma barik lana fima razaqtana wa qina 'adhabin nar",
    urdu: "اے اللہ! جو رزق دیا اس میں برکت دے اور جہنم کے عذاب سے بچا",
    telugu: "ఓ అల్లాహ్! ఇచ్చిన రిజ్కులో బరకత్ ఇచ్చి నరకం నుండి కాపాడు",
  },
  {
    id: "k3",
    category: "khana",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
    romanUrdu:
      "Alhamdulillahil ladhi at'amani hadha wa razaqanihi min ghayri hawlin minni wa la quwwah",
    urdu: "اللہ کا شکر جس نے یہ کھانا دیا اور رزق دیا میری کوشش اور طاقت کے بغیر",
    telugu: "ఈ ఆహారం ఇచ్చిన అల్లాహ్‌కు కృతజ్ఞతలు — నా శ్రమ, శక్తి లేకుండా ఇచ్చాడు",
    source: "Tirmidhi 3458, Abu Dawud 4023",
  },
  {
    id: "k4",
    category: "khana",
    arabic:
      "الْحَمْدُ لِلَّهِ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ غَيْرَ مَكْفِيٍّ وَلَا مُوَدَّعٍ وَلَا مُسْتَغْنًى عَنْهُ رَبَّنَا",
    romanUrdu:
      "Alhamdulillahi hamdan kathiran tayyiban mubarakan fihi ghayra makfiyyin wa la muwadda'in wa la mustaghnan 'anhu rabbana",
    urdu: "اللہ کا بہت زیادہ، پاکیزہ، بابرکت شکر جو کافی نہیں، رخصت نہیں، اور ہم اس سے بے نیاز نہیں، اے ہمارے رب",
    telugu: "అల్లాహ్‌కు చాలా, పవిత్రమైన, బ్లెస్డ్ కృతజ్ఞతలు — ఏ స్థితిలోనూ వేరే వలదు",
    source: "Bukhari 5458",
  },
  {
    id: "k5",
    category: "khana",
    arabic: "اللَّهُمَّ أَطْعِمْ مَنْ أَطْعَمَنِي وَاسْقِ مَنْ سَقَانِي",
    romanUrdu: "Allahumma at'im man at'amani wasqi man saqani",
    urdu: "اے اللہ! جس نے مجھے کھلایا اسے بھی کھلا، جس نے پلایا اسے بھی پلا",
    telugu: "ఓ అల్లాహ్! నాకు తినిపించిన వారికి నువ్వూ తినిపించు, తాగించిన వారికి తాగించు",
    source: "Muslim 2055",
  },
  {
    id: "k6",
    category: "khana",
    arabic: "اللَّهُمَّ اجْعَلْهُ رِزْقًا طَيِّبًا هَنِيئًا مَرِيئًا لَا وَبَالَ فِيهِ وَلَا عِقَابَ",
    romanUrdu:
      "Allahumma ij'alhu rizqan tayyiban hani'an mari'an la wabala fihi wa la 'iqab",
    urdu: "اے اللہ! اسے پاکیزہ، خوشگوار رزق بنا جس میں کوئی وبال اور سزا نہ ہو",
    telugu: "ఓ అల్లాహ్! దీన్ని పవిత్రమైన, ఆనందకరమైన రిజ్కుగా చేయి, శిక్ష లేకుండా",
  },
  {
    id: "k7",
    category: "khana",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
    romanUrdu: "Alhamdulillahil ladhi at'amana wa saqana wa ja'alana muslimin",
    urdu: "اللہ کا شکر جس نے ہمیں کھلایا، پلایا اور ہمیں مسلمان بنایا",
    telugu: "మాకు తిండి, నీళ్ళు ఇచ్చి మనల్ని ముస్లింలుగా చేసిన అల్లాహ్‌కు కృతజ్ఞతలు",
    source: "Tirmidhi 3457, Abu Dawud 3850",
  },

  // ── SONE SE PEHLE (Before Sleep) ──
  {
    id: "so1",
    category: "sone",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    romanUrdu: "Bismika Allahumma amutu wa ahya",
    urdu: "اے اللہ! تیرے نام سے مرتا اور جیتا ہوں",
    telugu: "ఓ అల్లాహ్! నీ పేరుతో మరణిస్తాను, జీవిస్తాను",
    source: "Bukhari 6324",
  },
  {
    id: "so2",
    category: "sone",
    arabic: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ (٣ مرتبہ)",
    romanUrdu: "Allahumma qini 'adhabaka yawma tab'athu 'ibadak (3 bar)",
    urdu: "اے اللہ! جس دن تو بندوں کو اٹھائے گا عذاب سے بچا (3 بار)",
    telugu: "ఓ అల్లాహ్! నీ బందాలను లేపే రోజు శిక్ష నుండి కాపాడు (3 సార్లు)",
    source: "Abu Dawud 5045",
  },
  {
    id: "so3",
    category: "sone",
    arabic: "سُبْحَانَ اللَّهِ (٣٣) الْحَمْدُ لِلَّهِ (٣٣) اللَّهُ أَكْبَرُ (٣٤)",
    romanUrdu: "Subhanallah 33x, Alhamdulillah 33x, Allahu Akbar 34x",
    urdu: "تسبیح 33، تحمید 33، تکبیر 34 — سونے سے پہلے پڑھیں، دن بھر کی محنت کا ثواب",
    telugu: "తస్బీహ్ 33, తహ్మీద్ 33, తక్బీర్ 34 — నిద్రకు ముందు",
    source: "Bukhari 3705, Muslim 2727",
  },
  {
    id: "so4",
    category: "sone",
    arabic: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ",
    romanUrdu: "Ayatul Kursi (2:255) — sone se pehle lazim",
    urdu: "آیت الکرسی — رسول اللہ ﷺ نے فرمایا: سونے سے پہلے پڑھو، تمہاری حفاظت کے لیے فرشتہ مقرر ہوگا، صبح تک شیطان قریب نہیں آسکے گا",
    telugu: "ఆయతుల్ కుర్సీ — నిద్రపోయే ముందు చదవండి, పహారా కోసం మలక్ నిర్ణయించబడతాడు",
    source: "Bukhari 2311 — sone se pehle wajib",
  },
  {
    id: "so5",
    category: "sone",
    arabic:
      "اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ وَفَوَّضْتُ أَمْرِي إِلَيْكَ وَوَجَّهْتُ وَجْهِي إِلَيْكَ وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ رَغْبَةً وَرَهْبَةً إِلَيْكَ لَا مَلْجَأَ وَلَا مَنْجَا مِنْكَ إِلَّا إِلَيْكَ آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ",
    romanUrdu:
      "Allahumma aslamtu nafsi ilayka wa fawwadtu amri ilayka wa wajjahtu wajhi ilayka wa alja'tu zahri ilayka raghbatan wa rahbatan ilayka la malja'a wa la manja minka illa ilayk amantu bikitabikal ladhi anzalta wa binabiyikal ladhi arsalt",
    urdu: "اے اللہ! میں نے اپنے آپ کو تیرے سپرد کیا، اپنا معاملہ تجھے سونپا، اپنا رخ تیری طرف کیا، اپنی پیٹھ تجھ سے لگائی — تیری رغبت اور خوف سے — تجھ سے بچنے کی کوئی جگہ نہیں — میں تیری اتاری کتاب پر اور تیرے بھیجے نبی ﷺ پر ایمان لایا",
    telugu:
      "ఓ అల్లాహ్! నన్ను నీకే అప్పగించాను, నా వ్యవహారాలు నీకే అప్పగించాను, నీ మీద ఆశ, భయంతో — నీ పుస్తకం, నీ నబి ﷺ పై ఈమాన్ తెచ్చాను",
    source: "Bukhari 247, Muslim 2710",
  },
  {
    id: "so6",
    category: "sone",
    arabic: "رَبِّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ — اور سورہ اخلاص، فلق، ناس پڑھ کر پھونکیں",
    romanUrdu:
      "Rabbi qini 'adhabaka + Surah Ikhlas, Falaq, Naas (3 bar) — haathon par phunken",
    urdu: "ہاتھوں پر تین تین بار سورہ اخلاص، فلق، ناس پڑھ کر پھونکیں اور جسم پر پھیریں — حضور ﷺ کا معمول",
    telugu: "సూరహ్ ఇఖ్లాస్, ఫలఖ్, నాస్ 3 సార్లు చదివి చేతులపై ఊది, శరీరంపై పసరండి",
    source: "Bukhari 5017",
  },
  {
    id: "so7",
    category: "sone",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَأَعُوذُ بِكَ مِنَ النَّارِ (٣ مرتبہ)",
    romanUrdu:
      "Allahumma inni as'alukal jannata wa a'udhu bika minan nar (3 bar)",
    urdu: "اے اللہ! جنت مانگتا ہوں اور جہنم سے پناہ مانگتا ہوں (3 بار)",
    telugu: "ఓ అల్లాహ్! జన్నత్ అడుగుతున్నాను, నరకం నుండి శరణు కోరుతాను (3 సార్లు)",
    source: "Abu Dawud 792, Tirmidhi 2572",
  },
  {
    id: "so8",
    category: "sone",
    arabic: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    romanUrdu: "Tabarak allazi biyadihil mulku — Surah Mulk (har raat padhen)",
    urdu: "سورہ ملک پڑھیں — حضور ﷺ نے فرمایا: یہ سورہ قبر کے عذاب سے بچاتی ہے — ہر رات لازمی",
    telugu: "సూరహ్ ముల్క్ — ప్రతి రాత్రి చదవండి, సమాధి శిక్ష నుండి కాపాడుతుంది",
    source: "Tirmidhi 2891, Nasai 10516",
  },
];

export const CATEGORY_META: Record<
  string,
  { label: string; emoji: string; color: string }
> = {
  subah: { label: "Subah", emoji: "🌅", color: "#f59e0b" },
  shaam: { label: "Shaam", emoji: "🌇", color: "#ef4444" },
  namaz: { label: "Namaz ke Baad", emoji: "🕌", color: "#10b981" },
  safar: { label: "Safar", emoji: "✈️", color: "#3b82f6" },
  khana: { label: "Khana", emoji: "🍽️", color: "#8b5cf6" },
  sone: { label: "Sone se Pehle", emoji: "🌙", color: "#6366f1" },
};
