export interface MultiLangArticle {
  id: string;
  title: string;
  category: string;
  romanUrdu: string;
  urdu: string;
  telugu: string;
  createdAt: string;
}

export const BLOG_ARTICLES: MultiLangArticle[] = [
  {
    id: "b1",
    title: "Namaz Kyon Zaruri Hai?",
    category: "Ibadat",
    createdAt: "2025-01-01",
    romanUrdu: `Namaz Islam ke paanch arkaan mein se ek aham rukn hai. Yeh sirf ek ibadat nahi, balki Allah aur bandey ke darmiyan ek seedha taaluq hai. Din mein paanch baar Allah ke huzoor haazir hona -- yeh ek azeem nemat hai.

Quran mein Allah farmaata hai: "Beshak namaz mominon par muqarrara waqton par farz hai." (Nisa: 103) Rasulullah ne farmaya: "Jo shaks namaz chhor deta hai, woh kufr ki taraf kadam badhata hai."

Namaz ke zariye hum apne gunaahon ki maafi maangte hain, apni mushkilaat Allah ke saamne rakhte hain, aur dil ko sukoon milta hai. Research bhi kehti hai ke namaz mein jo sajda hota hai usme brain ko extra oxygen milti hai aur stress hormones kam hote hain.

Har roz paanch waqt ki namaz ka matlab hai ke hum din mein paanch baar apni zindagi ka hisaab dete hain -- kya main sahi raha? Kya maine kisi ka haq maara? Yeh tehzeeb aur kirdar banata hai. Namaz sirf akhirat ki zarurat nahi, duniya mein bhi kaamyabi ki chaabi hai.`,
    urdu: `نماز اسلام کے پانچ ارکان میں سے ایک اہم رکن ہے۔ یہ صرف ایک عبادت نہیں، بلکہ اللہ اور بندے کے درمیان ایک سیدھا تعلق ہے۔ دن میں پانچ بار اللہ کے حضور حاضر ہونا ایک عظیم نعمت ہے۔

قرآن میں اللہ فرماتا ہے: "بے شک نماز مومنوں پر مقررہ وقتوں پر فرض ہے۔" (النساء: 103) رسول اللہ ﷺ نے فرمایا: "جو شخص نماز چھوڑ دیتا ہے، وہ کفر کی طرف قدم بڑھاتا ہے۔"

نماز کے ذریعے ہم اپنے گناہوں کی معافی مانگتے ہیں، اپنی مشکلات اللہ کے سامنے رکھتے ہیں، اور دل کو سکون ملتا ہے۔ ریسرچ بھی کہتی ہے کہ نماز میں سجدے میں دماغ کو زیادہ آکسیجن ملتی ہے اور تناؤ کے ہارمونز کم ہوتے ہیں۔

ہر روز پانچ وقت کی نماز کا مطلب ہے کہ ہم دن میں پانچ بار اپنی زندگی کا حساب دیتے ہیں۔ نماز صرف آخرت کی ضرورت نہیں، دنیا میں بھی کامیابی کی چابی ہے۔`,
    telugu: `నమాజ్ ఇస్లాం యొక్క ఐదు స్తంభాలలో ఒక ముఖ్యమైనది. ఇది కేవలం ఒక ఆరాధన మాత్రమే కాదు, అల్లాహ్ మరియు బందే మధ్య ఒక నేరుగా సంబంధం.

ఖురాన్‌లో అల్లాహ్ చెప్పాడు: "నిశ్చయంగా నమాజ్ విశ్వాసులపై నిర్ణీత సమయాలలో విధిగా ఉంది." (నిసా: 103). రోజుకు ఐదు నమాజ్‌లు మన జీవితంలో క్రమశిక్షణ, శాంతి మరియు అల్లాహ్‌తో సంబంధాన్ని కలిగిస్తాయి.

నమాజ్ ద్వారా మనం పాపాల క్షమాపణ కోరతాం, మన కష్టాలను అల్లాహ్ ముందు ఉంచుతాం. పరిశోధన కూడా నమాజ్‌లో సజ్దాలో మెదడుకు అదనపు ఆక్సిజన్ అందుతుందని, ఒత్తిడి హార్మోన్లు తగ్గుతాయని చెప్తోంది.

నమాజ్ కేవలం ఆఖిరత్ అవసరం మాత్రమే కాదు, ఈ ప్రపంచంలో కూడా విజయానికి తాళం చెవి.`,
  },
  {
    id: "b2",
    title: "Naujawanon Ki Kadwi Haqeeqat",
    category: "Islah",
    createdAt: "2025-01-02",
    romanUrdu: `Aaj ke naujawaan kisi bhi daur ke naujawanon se zyada intelligent hain. Unke haath mein smartphones hain, internet hai, duniya bhar ki knowledge hai. Lekin phir bhi woh pareshan hain, khali hain, aur bechain hain. Kyun?

Kyunki hum ne knowledge toh le li, lekin hikmat (wisdom) nahi li. Hum ne followers toh gain kiye, lekin khud ko kho diya. Social media pe 1000 dost hain, lekin ek sachcha humnawa nahi. Raat ko ankhein band karne se pehle phone ka screen chehra roshan karta hai -- Allah ka noor nahi.

Islam ne har daur ke naujawaan ko ek message diya: "Naujawani se pehle budhape ka fayda uthaao." Sahaba-e-Kiram mein Hazrat Usamah bin Zaid (RA) 17 saal mein lashkar ke sipahsalar the. Hazrat Ali (RA) ne Islam qabool kiya jab teen ya char saal ke the. Unke paas koi phone nahi tha, lekin maqsad tha.

Aaj zarurat yeh hai ke hum apni naujawani ka sahi istemal karein. Ek skill seekhein. Ek kitaab padhein. Ek namaz jamaat se padhein. Ek din mein ek achcha kaam karein. Yahi chhoti chhoti cheezein duniya aur aakhirat mein kaamyabi deti hain.`,
    urdu: `آج کے نوجوان کسی بھی دور کے نوجوانوں سے زیادہ ذہین ہیں۔ ان کے ہاتھ میں اسمارٹ فون ہیں، انٹرنیٹ ہے، علم ہے۔ لیکن پھر بھی وہ پریشان ہیں، خالی ہیں۔

کیونکہ ہم نے علم تو لے لیا لیکن حکمت نہیں لی۔ سوشل میڈیا پر ہزار دوست ہیں لیکن ایک سچا ہمنوا نہیں۔ رات کو آنکھیں بند کرنے سے پہلے فون کی سکرین چہرہ روشن کرتی ہے -- اللہ کا نور نہیں۔

اسلام نے ہر دور کے نوجوان کو ایک پیغام دیا: صحابہ کرام میں حضرت اسامہ بن زید 17 سال میں لشکر کے سپہ سالار تھے۔ ان کے پاس فون نہیں تھا، لیکن مقصد تھا۔

آج ضرورت یہ ہے کہ ہم اپنی جوانی کا صحیح استعمال کریں۔ ایک ہنر سیکھیں۔ ایک کتاب پڑھیں۔ ایک نماز جماعت سے پڑھیں۔`,
    telugu: `నేటి యువత ఏ కాలంలోనైనా ఉన్న యువతకంటే మేధావులు. వారి చేతిలో స్మార్ట్‌ఫోన్‌లు, ఇంటర్నెట్, జ్ఞానం ఉంది. కానీ అయినప్పటికీ వారు అశాంతిగా, ఖాళీగా ఉన్నారు. ఎందుకు?

ఎందుకంటే మనం జ్ఞానం తీసుకున్నాం, కానీ వివేకం తీసుకోలేదు. సోషల్ మీడియాలో వేయి మంది స్నేహితులున్నారు, కానీ ఒక నిజమైన సహచరుడు లేడు.

ఇస్లాం ప్రతి కాలంలోని యువతకు ఒక సందేశమిచ్చింది: సహాబాలలో హజ్రత్ ఉసామా బిన్ జైద్ 17 ఏళ్ళలో సైన్య అధిపతి అయ్యారు. వారి దగ్గర ఫోన్ లేదు, కానీ లక్ష్యం ఉంది.

నేడు అవసరమేమిటంటే మన యౌవనాన్ని సరిగ్గా వాడుకోవడం. ఒక నైపుణ్యం నేర్చుకోండి. ఒక పుస్తకం చదవండి. ఒక నమాజ్ జమాత్‌తో చదవండి.`,
  },
  {
    id: "b3",
    title: "Muslim Scientists -- Duniya Ko Hamare Hadiye",
    category: "Taareekh",
    createdAt: "2025-01-03",
    romanUrdu: `Aaj jab log kehtey hain ke "Islam aur science mein tazaad hai", toh woh taareekh nahi padhte. Woh 8vi se 13vi Sadi ko nahi jantey -- jise Golden Age of Islam kaha jaata hai.

Ibn al-Haytham (965-1040): Optics ke baap. Unse pehle log sochtey the ke aankhon se roshni nikalti hai aur woh cheezein dekhti hai. Ibn al-Haytham ne sabit kiya ke roshni cheezoon se aati hai aur aankhon mein jaati hai. Roger Bacon aur Kepler ne unhi ke kaam par apna kaam banaya.

Ibn Sina (980-1037): "Al-Qanun fit-Tibb" likh di -- ek medical encyclopedia jo 600 saal tak European universities mein padhaayi jaati rahi. Unka kehna tha: ilaj mein observation aur experiment zaroori hai.

Al-Khawarizmi (780-850): Algebra ke bani. "Al-jabr wa'l-muqabalah" ki kitaab se "Algebra" lafz bana. Decimal number system ko Europe mein phailaaya. Aaj jo algorithms hain computers mein, unka naam Al-Khawarizmi ke naam par hai.

Al-Biruni (973-1048): Zameen ka circumference calculate kiya -- aur itna accurate tha ke aaj bhi scientists hairaan hain. India aur uski sabhyata par research ki, jo ek azeem tarikhi dastaawez hai. Yeh sab log musalman the. Unka ilm ibadat tha.`,
    urdu: `آج جب لوگ کہتے ہیں کہ اسلام اور سائنس میں تضاد ہے، تو وہ تاریخ نہیں پڑھتے۔ وہ 8ویں سے 13ویں صدی کو نہیں جانتے جسے Golden Age of Islam کہا جاتا ہے۔

ابن الہیثم (965-1040): آپٹکس کے باپ۔ ابن سینا (980-1037): "القانون فی الطب" لکھی جو 600 سال تک یورپ میں پڑھائی جاتی رہی۔ الخوارزمی (780-850): الجبرا کے بانی -- Algebra لفظ ان کی کتاب "الجبر" سے بنا۔

البیرونی (973-1048): زمین کا circumference calculate کیا اتنی درستگی سے کہ آج بھی سائنسدان حیران ہیں۔ یہ سب مسلمان تھے۔ ان کا علم عبادت تھا۔

آج ہمیں اس وراثت کو یاد کرنا ہے اور علم کی طرف واپس آنا ہے۔`,
    telugu: `"ఇస్లాం మరియు సైన్స్ మధ్య వ్యతిరేకత ఉంది" అని చెప్పేవారు చరిత్ర చదవలేదు. 8వ నుండి 13వ శతాబ్దం వరకు గోల్డెన్ ఏజ్ ఆఫ్ ఇస్లాం గురించి వారికి తెలియదు.

ఇబ్న్ అల్-హైతమ్ (965-1040): ఆప్టిక్స్ పితామహుడు. ఇబ్న్ సీనా (980-1037): "అల్-కానూన్" అనే వైద్య విజ్ఞాన సర్వస్వాన్ని రాశారు -- ఇది 600 సంవత్సరాలు యూరోప్ విశ్వవిద్యాలయాలలో బోధించబడింది.

అల్-ఖ్వారిజ్మీ (780-850): బీజగణితం వ్యవస్థాపకుడు. "Algebra" అనే పదం వారి పుస్తకం నుండి వచ్చింది. కంప్యూటర్‌లలో ఉన్న అల్గారిథమ్‌లు వారి పేరు మీద ఉన్నాయి.

ఈ అందరూ ముస్లింలే. వారికి జ్ఞానం ఆరాధన. మనం ఈ వారసత్వాన్ని గుర్తుచేసుకోవాలి.`,
  },
  {
    id: "b4",
    title: "Sahaba ki Ittefaq -- Ek Azeem Sabaq",
    category: "Taareekh",
    createdAt: "2025-01-04",
    romanUrdu: `Sahaba-e-Kiram ki jama'at mein har taraf ke log the. Arab the, Persian the, Habshi the, Roman the. Hazrat Bilal (RA) Habshah se the -- woh muazzin-e-Rasool bane. Hazrat Salman Farsi (RA) Iran se -- unhe "Salman minna ahl-ul-bayt" kaha. Hazrat Suhayb Rumi (RA) Rome se -- unhone sab kuch chhor diya Islam ke liye.

Is jama'at ki taaqat kya thi? Sirf ek baat: "Inna al-mu'mineena ikhwah" -- sab mominon bhai hain. Unka ek Allah tha, ek Nabi tha, ek Quran tha. Zaaban alag thi, rang alag tha, mulk alag tha -- magar dil ek tha.

In 313 logon ne Badr mein 1000 ka muqabla kiya aur jeet gaye. Kaise? Kyunki woh ittehad mein the. Woh ek dusre se muhabbat karte the, ek doosre ka dard mehsoos karte the. Rasulullah ne farmaya: "Mominon ki misal ek jism ki si hai ke jab ek uzw ko takleef hoti hai toh pura jism baichain ho jaata hai."

Aaj hum 1.8 billion hain -- lekin bikray hue hain. Har cheez mein aapas mein jhagra karte hain. Sahaba ka sabaq yeh hai: apni farq ko chhor ke ittehad ko apnaao. Islam ka rishta khoon ke rishte se zyada mazboot hai.`,
    urdu: `صحابہ کرام کی جماعت میں ہر طرف کے لوگ تھے۔ عرب تھے، فارسی تھے، حبشی تھے، رومی تھے۔ حضرت بلال حبشہ سے -- مؤذنِ رسول بنے۔ حضرت سلمان فارسی ایران سے -- انہیں "سلمان مِنّا اہل البیت" کہا گیا۔

اس جماعت کی طاقت کیا تھی؟ صرف ایک بات: "سب مومن بھائی ہیں"۔ زبان الگ تھی، رنگ الگ تھا، ملک الگ تھا -- مگر دل ایک تھا۔

313 لوگوں نے بدر میں 1000 کا مقابلہ کیا اور جیت گئے۔ کیونکہ وہ اتحاد میں تھے۔ رسول اللہ ﷺ نے فرمایا: "مومنوں کی مثال ایک جسم کی سی ہے"۔

آج ہم 1.8 ارب ہیں لیکن بکھرے ہوئے ہیں۔ صحابہ کا سبق: اتحاد کو اپناؤ۔`,
    telugu: `సహాబాల సమూహంలో అన్ని ప్రాంతాల వారున్నారు. అరబ్బులు, పర్షియన్లు, హబ్షీలు, రోమన్లు. హజ్రత్ బిలాల్ హబ్షా నుండి -- ప్రవక్త యొక్క ముఅజ్జిన్ అయ్యారు. హజ్రత్ సల్మాన్ ఫారసీ ఇరాన్ నుండి -- "సల్మాన్ మిన్నా అహ్ల్ అల్-బైత్" అని చెప్పబడ్డారు.

ఈ సమూహం యొక్క శక్తి ఏమిటంటే: "అందరు విశ్వాసులు సోదరులే". భాష వేరు, రంగు వేరు, దేశం వేరు -- కానీ హృదయం ఒకటే.

313 మంది బద్ర్‌లో 1000 మందిని ఓడించారు. ఎందుకంటే వారు ఐక్యంగా ఉన్నారు. ప్రవక్త చెప్పారు: "విశ్వాసుల ఉదాహరణ ఒక శరీరం వంటిది".

నేడు మనం 1.8 బిలియన్లు -- కానీ చెల్లాచెదురుగా ఉన్నాం. సహాబాల పాఠం: ఐక్యతను స్వీకరించండి.`,
  },
  {
    id: "b5",
    title: "Social Media -- Sahi aur Galat Istemal",
    category: "Aaj Ka Masla",
    createdAt: "2025-01-05",
    romanUrdu: `Social media ek hathiyar hai. Hathiyar se khana bhi pakta hai, aur jang bhi hoti hai. Iska ilzaam hathiyar par nahi, istemal karne wale par hai.

Galat Istemal: Ghaybat -- logon ki burai unki peethe peeche karna. Online hoke bhi yahi hota hai -- kisi ki tasweer, kisi ka screenshot share karna bina ijazat. Waqt barbaad -- ek video se doosra, doosra se teesra. Ghante guzar jaate hain, kuch hasil nahi. Nazar ka gunaah -- bejaa tasweerein dekhna, fitna failaana.

Sahi Istemal: Ilm hasil karna -- YouTube pe Islamic lectures, Quran tafseer, science, coding, languages seekhna. Dawat dena -- ek achi baat share karo toh hazaaron log padh sakte hain. Silah Rehmi -- dooro se rishtedaron se raabta rakhna.

Rasulullah ne farmaya: "Jo cheez insaan ke liye mufeed nahi, use chhor dena uska Islam ka achcha hona hai." Social media use karo, use apne aap ko use karne mat do. Roz apne phone ki screen time check karo -- woh waqt kahin aur lagao.`,
    urdu: `سوشل میڈیا ایک ہتھیار ہے۔ ہتھیار سے کھانا بھی پکتا ہے اور جنگ بھی ہوتی ہے۔ اس کا الزام ہتھیار پر نہیں، استعمال کرنے والے پر ہے۔

غلط استعمال: غیبت -- لوگوں کی برائی ان کی پیٹھ پیچھے۔ وقت برباد -- ایک ویڈیو سے دوسری، گھنٹے گزر جاتے ہیں۔ نگاہ کا گناہ -- بے جا تصویریں دیکھنا۔

صحیح استعمال: علم حاصل کرنا -- اسلامی لیکچر، قرآن تفسیر، سائنس، کوڈنگ سیکھنا۔ دعوت دینا -- ایک اچھی بات شیئر کرو تو ہزاروں لوگ پڑھ سکتے ہیں۔

رسول اللہ ﷺ نے فرمایا: "جو چیز انسان کے لیے مفید نہیں، اسے چھوڑ دینا اس کا اسلام کا اچھا ہونا ہے۔"`,
    telugu: `సోషల్ మీడియా ఒక ఆయుధం. ఆయుధంతో వంట కూడా అవుతుంది, యుద్ధం కూడా జరుగుతుంది. నింద ఆయుధంపై కాదు, వాడే వ్యక్తిపై.

తప్పుడు వాడకం: పరోక్షంగా చెడు మాట్లాడడం (గైబత్), సమయం వృధా చేయడం, చూడకూడని చిత్రాలు చూడడం.

సరైన వాడకం: జ్ఞానం పొందడం -- ఇస్లామిక్ లెక్చర్లు, ఖురాన్ తఫ్సీర్, సైన్స్, కోడింగ్ నేర్చుకోవడం. దావత్ ఇవ్వడం -- ఒక మంచి విషయం షేర్ చేస్తే వేలమంది చదవగలరు.

ప్రవక్త చెప్పారు: "ఒక వ్యక్తికి ఉపయోగపడని విషయాన్ని వదిలివేయడం అతని ఇస్లాం మంచిగా ఉన్న సూచన." సోషల్ మీడియాను వాడండి, అది మిమ్మల్ని వాడకోనివ్వకండి.`,
  },
  {
    id: "b6",
    title: "Islam Mein Skills Ka Darjan",
    category: "Zindagi",
    createdAt: "2025-01-06",
    romanUrdu: `Islam ne hamesha ilm aur hunar ko azmat di. Quran ki pehli aayat "Iqra" -- padhne ka hukm -- yeh ittefaq nahi. Allah ne Hazrat Dawood (AS) ko lohe ka kaam sikhaya. Hazrat Idrees (AS) ko silai aur likhna sikhaya. Khud Rasulullah (SAW) ke Sahaba mein tijarat ke maahir, khatoot likhne wale, zabaan ke tarjuman the.

Aaj Muslim Ummah ka masla yeh hai ke hum sirf ek career ke peeche bhaagte hain -- MBBS, Engineering, ya Govt Job. Baaki sab ko haqaarat se dekhte hain. Halankeh Islam kehta hai: har woh kaam jo halal ho aur log ka kaam aaye, woh ibadat hai.

Ek skill -- graphic design, coding, carpentry, cooking, photography, writing -- yeh sab Islam mein izzat ki cheezein hain. Rasulullah ne farmaya: "Ek insaan apne haath ki mehnat se zyada paak khana nahi khaata." Yani mehnat karna, kuch banana, kuch seekhna -- yeh Islam ka hissa hai.

Aaj se ek cheez decide karo: kya seekhna chahte ho? Ek tool, ek language, ek hunar. Shuru karo. Allah barakatein deta hai unhe jo koshish karte hain.`,
    urdu: `اسلام نے ہمیشہ علم اور ہنر کو عزت دی۔ قرآن کی پہلی آیت "اقرا" -- پڑھنے کا حکم۔ اللہ نے حضرت داؤد کو لوہے کا کام سکھایا، حضرت ادریس کو سلائی اور لکھنا سکھایا۔

آج مسلم امہ کا مسئلہ یہ ہے کہ ہم صرف ایک کیریئر کے پیچھے بھاگتے ہیں۔ حالانکہ اسلام کہتا ہے: ہر وہ کام جو حلال ہو اور لوگوں کے کام آئے، عبادت ہے۔

گرافک ڈیزائن، کوڈنگ، بڑھئی کا کام، فوٹوگرافی -- یہ سب اسلام میں عزت کی چیزیں ہیں۔ رسول اللہ ﷺ نے فرمایا: "انسان اپنے ہاتھ کی محنت سے زیادہ پاک کھانا نہیں کھاتا۔"

آج سے ایک چیز فیصلہ کرو: کیا سیکھنا چاہتے ہو؟ شروع کرو۔`,
    telugu: `ఇస్లాం ఎప్పుడూ జ్ఞానానికి మరియు నైపుణ్యానికి గౌరవమిచ్చింది. ఖురాన్ యొక్క మొదటి ఆయత్ "ఇఖ్రా" -- చదవమని ఆదేశం. అల్లాహ్ హజ్రత్ దావూద్‌కు ఇనుమును పని నేర్పించాడు.

నేడు ముస్లిం ఉమ్మా యొక్క సమస్య ఏమిటంటే మనం ఒకే కెరీర్ వెంట పరుగెడతాం. కానీ ఇస్లాం చెప్తుంది: హలాల్ అయిన మరియు ప్రజలకు ఉపయోగపడే ప్రతి పని ఆరాధన.

గ్రాఫిక్ డిజైన్, కోడింగ్, వడ్రంగి పని, వంట, ఫోటోగ్రఫీ -- ఇవన్నీ ఇస్లాంలో గౌరవప్రదమైనవి. ప్రవక్త చెప్పారు: "ఒక వ్యక్తి తన చేతి కష్టం నుండి సంపాదించిన దానికంటే పవిత్రమైన ఆహారం తినడు."

ఇప్పటి నుండి ఒక విషయం నిర్ణయించుకోండి: ఏం నేర్చుకోవాలని ఉంది? ప్రారంభించండి.`,
  },
  {
    id: "b7",
    title: "Ulama Ki Taraf Raghbat Kyun Kam Ho Rahi Hai?",
    category: "Aaj Ka Masla",
    createdAt: "2025-01-07",
    romanUrdu: `Ek waqt tha jab Imam Malik ke dars mein hazaaron talibaan aate the. Imam Bukhari 600,000 ahadith yaad karte the. Ibn Taymiyyah jail mein likhtey rahe. Yeh log ummah ke heroes the.

Aaj ki soorat yeh hai ke ek actor ya cricketer ka naam poochho toh 10 log bata denge. Ek Alim ka naam poochho -- khamoshi. Kyun? Kyunki humne apne priorities badal li hain.

Media ne hero aur villain badal diye. Jo log duniya mein kuch nahi laaye -- sirf entertainment -- unhe aasman par bithaaya gaya. Jo log raat raat bhar jaag ke Quran ki khidmat karte hain unhe bhula diya gaya.

Lekin yeh sirf media ka qusoor nahi -- hum parents bhi zimmedar hain. Ghar mein kabhi bacche ko nahi bataya ke Ulama ki zindagi kaisi hoti hai, kya sacrifice karte hain, kya ilm rakhte hain.

Hal kya hai? Ulama ke dars suno -- online bhi milte hain. Unki kitabein padhein. Apne bachchon ko unki zindaniyaan sunaao. Aur ek kaam karo: kisi ek Alim ko personally jaanein, unkse milein, unka adab karo.`,
    urdu: `ایک وقت تھا جب امام مالک کے درس میں ہزاروں طالبان آتے تھے۔ ابن تیمیہ جیل میں لکھتے رہے۔ یہ لوگ امت کے ہیرو تھے۔

آج کی صورت یہ ہے کہ ایک اداکار کا نام پوچھو تو دس لوگ بتا دیں گے۔ ایک عالم کا نام پوچھو -- خاموشی۔

میڈیا نے ہیرو اور ولن بدل دیے۔ جو لوگ صرف تفریح لائے انہیں آسمان پر بٹھایا۔ جو لوگ رات رات بھر جاگ کر قرآن کی خدمت کرتے ہیں انہیں بھلا دیا گیا۔

حل کیا ہے؟ علماء کے درس سنیں۔ ان کی کتابیں پڑھیں۔ اپنے بچوں کو ان کی زندگانیاں سناؤ۔`,
    telugu: `ఒక కాలంలో ఇమామ్ మాలిక్ యొక్క పాఠాలకు వేలమంది విద్యార్థులు వచ్చేవారు. ఇబ్న్ తైమియ్యా జైలులో రాస్తూనే ఉన్నారు. ఇవి ఉమ్మా యొక్క నాయకులు.

నేటి పరిస్థితి ఏమిటంటే ఒక నటుడి పేరు అడిగితే పది మంది చెప్తారు. ఒక ఆలిమ్ పేరు అడిగితే -- నిశ్శబ్దం.

మీడియా హీరో మరియు విలన్‌లను మార్చింది. కేవలం వినోదం అందించిన వారిని ఆకాశానికి ఎత్తారు. రాత్రంతా జాగరణ చేసి ఖురాన్ సేవ చేసేవారిని మరచిపోయారు.

పరిష్కారం: ఆలిమ్‌ల పాఠాలు వినండి. వారి పుస్తకాలు చదవండి. మీ పిల్లలకు వారి జీవిత కథలు చెప్పండి.`,
  },
  {
    id: "b8",
    title: "Tahajjud -- Raat Ki Khamoshi Mein Rabb Se Baat",
    category: "Nafl Ibadat",
    createdAt: "2025-01-08",
    romanUrdu: `Duniya soti hai. Shehron ki roshni bujhne lagti hai. Aur ek banda uthta hai -- wuzoo karta hai, masalla bichhata hai, aur Rabb ke saamne khara ho jaata hai. Yahi hai Tahajjud.

Allah Ta'ala ne Quran mein farmaya: "Aur raat ke kuch hisson mein Tahajjud padho -- yeh tumhare liye nafl hai. Umeed hai ke tumhara Rabb tumhe maqam-e-mahmood par pahunchaye." (Isra: 79)

Rasulullah (SAW) ne farmaya: "Farz ke baad sabse afzal namaz Tahajjud hai." Aur yeh bhi farmaya: "Allah Ta'ala raat ke aakhri teehai mein Aasmaane Duniya par nazil hota hai aur farmata hai: 'Kaun hai jo dua kare main qabool karun. Kaun hai jo maafi maange main maaf karun.'" (Bukhari & Muslim)

Tahajjud ka sahi waqt raat ka aakhri teehai hai -- gar Isha aur Fajr ke darmiyan 8 ghante ka farq ho, toh aakhri 3 ghante Tahajjud ka waqt hai.

Shuruat aise karo: bas do rakat. Sirf do rakat roz. Teen hafte mein aadat ban jaayegi. Phir ek din uthoge aur mehsoos karoge ke ek rishta ban gaya hai -- ek aisi silsilah jo Arsh tak jaati hai.`,
    urdu: `دنیا سوتی ہے۔ اور ایک بندہ اٹھتا ہے -- وضو کرتا ہے، مصلٰی بچھاتا ہے، اور رب کے سامنے کھڑا ہو جاتا ہے۔ یہی ہے تہجد۔

اللہ تعالیٰ نے فرمایا: "اور رات کے کچھ حصوں میں تہجد پڑھو -- یہ تمہارے لیے نفل ہے۔" (اسراء: 79)

رسول اللہ ﷺ نے فرمایا: "فرض کے بعد سب سے افضل نماز تہجد ہے۔" اللہ رات کے آخری تہائی میں آسمانِ دنیا پر نزول فرماتا ہے: "کون ہے جو دعا کرے، میں قبول کروں۔"

شروعات ایسے کرو: بس دو رکعت روز۔ تین ہفتوں میں عادت بن جائے گی۔`,
    telugu: `ప్రపంచం నిద్రపోతోంది. మరియు ఒక బందా లేస్తాడు -- వుజూ చేస్తాడు, మసల్లా పరుస్తాడు, రబ్బ్ ముందు నిలుస్తాడు. ఇదే తహజ్జుద్.

అల్లాహ్ ఖురాన్‌లో చెప్పాడు: "రాత్రి కొంత భాగంలో తహజ్జుద్ చదువు -- ఇది నీకు నఫిల్." (ఇస్రా: 79)

ప్రవక్త చెప్పారు: "ఫర్జ్ తర్వాత అత్యుత్తమ నమాజ్ తహజ్జుద్." అల్లాహ్ రాత్రి చివరి మూడింట ఒక వంతులో దిగివస్తాడు: "ఎవరు దుఆ చేస్తే నేను స్వీకరిస్తాను."

ప్రారంభం: కేవలం రెండు రకాత్‌లు రోజూ. మూడు వారాల్లో అలవాటు అవుతుంది.`,
  },
  {
    id: "b9",
    title: "Sabr -- Zindagi Ka Sab Se Bada Hunar",
    category: "Akhlaaq",
    createdAt: "2025-01-09",
    romanUrdu: `Sabr ka matlab yeh nahi ke chup raho aur sehte raho. Sabr ka matlab hai: haalaat ke baawajood apna iman aur kirdar qaim rakhna. Yeh zindagi ka sab se bada hunar hai.

Allah ne Quran mein 90 se zyada baar sabr ka zikr kiya. Ek jagah farmaya: "Hum tumhe thoda khauf, bhook, malon, jaanon aur phalon ki kami se zaror aazmaenge, aur (yeh khushkhabri de do) sabr karne waalon ko." (Baqarah: 155)

Aur agle hi aayat mein bata diya ke woh sabr karne wale kaun hain: "Woh jo jab unhe koi musibat pahunche toh keh dein: 'Inna lillahi wa inna ilayhi raji'oon'." -- Hum Allah ke hain aur usi ki taraf lawtenge.

Zindagi mein taqleef aayegi -- yeh sach hai. Imtehaan aayenge -- yeh bhi sach. Lekin ek baat aur sach hai: "Beshak her dushwari ke saath asan hai." (Inshirah: 6) Har takleef ke peeche ek asan bhi hai. Allah ki qadar ki baat samjho -- har bura waqt guzar jaata hai.

Practice yeh karo: jab koi buri khabar aaye, pehle "Inna lillahi" parhein. Jab koi taklif ho, do rakat shukar ki namaz padho. Yeh sabr ki practice hai -- aur jab yeh aadat ban jaati hai, duniya ka koi dukh tumhe tor nahi sakta.`,
    urdu: `صبر کا مطلب یہ نہیں کہ چپ رہو۔ صبر کا مطلب ہے: حالات کے باوجود اپنا ایمان اور کردار قائم رکھنا۔

اللہ نے قرآن میں 90 سے زیادہ بار صبر کا ذکر کیا۔ فرمایا: "ہم تمہیں ضرور آزمائیں گے۔ اور (خوشخبری دے دو) صبر کرنے والوں کو۔" (البقرہ: 155)

اور اگلی آیت میں بتایا: "وہ جو جب انہیں کوئی مصیبت پہنچے تو کہہ دیں: إنا للہ وإنا إلیہ راجعون۔"

زندگی میں تکلیف آئے گی۔ لیکن ایک بات بھی سچ ہے: "بے شک ہر دشواری کے ساتھ آسانی ہے۔" (الانشراح: 6)`,
    telugu: `సహారు (సబ్ర్) అంటే చుప్పగా ఉండటం కాదు. సబ్ర్ అంటే: పరిస్థితులు ఏవైనా ఇమాన్ మరియు నైతిక విలువలను కాపాడుకోవడం.

అల్లాహ్ ఖురాన్‌లో 90 సార్లకు పైగా సబ్ర్ గురించి చెప్పాడు: "మేము మిమ్మల్ని తప్పకుండా పరీక్షిస్తాం. సబ్ర్ చేసేవారికి శుభవార్త చెప్పు." (బఖర: 155)

ఒక వాస్తవం: "నిశ్చయంగా ప్రతి కష్టంతో పాటు సుఖం ఉంది." (ఇన్‌షిరా: 6) ప్రతి కష్టకాలం గడిచిపోతుంది.

సాధన: చెడు వార్త వచ్చినప్పుడు "ఇన్నా లిల్లాహి" చదవండి. కష్టమొచ్చినప్పుడు రెండు రకాత్‌లు శుక్రియా నమాజ్ చదవండి.`,
  },
  {
    id: "b10",
    title: "Ramzan -- Ek Naya Janam",
    category: "Ramzan",
    createdAt: "2025-01-10",
    romanUrdu: `Har saal Ramzan aata hai -- aur saath laata hai ek mauqa. Ek naya janam lene ka mauqa. Purane gunaah chhor dene ka, nayi aadat apnane ka, aur Allah ke qareeb aane ka.

Allah ne Quran mein farmaya: "Ramzan ka mahina woh hai jis mein Quran nazil kiya gaya, hidayat ke liye insaanon ki." (Baqarah: 185) Quran ek complete system of life hai -- aur Ramzan us Quran ke saath dosti karne ka mahina hai.

Rasulullah ne farmaya: "Jo Ramzan mein iman aur ihtisaab ke saath roza rakhe, uske pichhle saare gunaah maaf kar diye jaate hain." (Bukhari) Yeh kya baat hai! Ek mahine mein ek naya insaan.

Lekin yeh mahina sirf bhook pyaas ka nahi. Yeh mahina hai:
- Quran ke saath taaluq banane ka
- Raat ko Taraweeh mein aansuon se Rabb ko manane ka
- Din ko ghaybat, jhoot, laDai se door rehne ka
- Ghareebon ka khayal rakhne ka -- Iftaar mein kisi ko bhi shareek karo
- Apni zindagi ka muhasabah karne ka

Is Ramzan mein ek kaam zaroor karo: poora Quran khatam karo -- ek baar. Agar Arabic mein mushkil ho, toh Urdu tarjuma padhein. Dekhna -- Ramzan ke baad tum wahi nahi rahoge.`,
    urdu: `ہر سال رمضان آتا ہے -- اور ساتھ لاتا ہے ایک نیا موقع۔ پرانے گناہ چھوڑنے کا، نئی عادت اپنانے کا۔

اللہ نے فرمایا: "رمضان کا مہینہ وہ ہے جس میں قرآن نازل کیا گیا۔" (البقرہ: 185) رمضان اس قرآن کے ساتھ دوستی کرنے کا مہینہ ہے۔

رسول اللہ ﷺ نے فرمایا: "جو رمضان میں ایمان اور احتساب کے ساتھ روزہ رکھے، اس کے پچھلے سارے گناہ معاف ہو جاتے ہیں۔" (بخاری)

اس رمضان میں ایک کام ضرور کرو: پورا قرآن ختم کرو۔ دیکھنا -- رمضان کے بعد تم وہی نہیں رہو گے۔`,
    telugu: `ప్రతి సంవత్సరం రమజాన్ వస్తుంది -- మరియు ఒక అవకాశం తీసుకొస్తుంది. పాత పాపాలు వదిలివేయడానికి, కొత్త అలవాటు పెట్టుకోవడానికి, అల్లాహ్ సమీపించడానికి.

అల్లాహ్ చెప్పాడు: "రమజాన్ నెల -- అందులో ఖురాన్ అవతరించింది, మానవులకు మార్గదర్శనంగా." (బఖర: 185)

ప్రవక్త చెప్పారు: "రమజాన్‌లో ఇమాన్ మరియు లెక్క చూసుకుంటూ రోజా ఉంచిన వారి పూర్వపాపాలు మాఫ్ చేయబడతాయి." (బుఖారీ)

ఈ రమజాన్‌లో ఒక పని తప్పకుండా చేయండి: పూర్తి ఖురాన్ చదవండి -- ఒక్కసారి. చూడండి -- రమజాన్ తర్వాత మీరు అదే వ్యక్తిగా ఉండరు.`,
  },
  {
    id: "b11",
    title: "Wudu ki Ahmiyat aur Fayde",
    category: "Tahara",
    createdAt: "2025-01-11",
    romanUrdu: `Wudu sirf paani se haath dhona nahi -- yeh ek mukammal jism aur rooh ki tahaarat ka nizam hai. Quran mein Allah ne farmaya: Jab tum namaz ke liye uthho toh apne chehra aur haath kohniyon tak dhoo. (Maaida: 6)

German researchers ne 2010 mein sabit kiya ke naak mein paani daalna respiratory infections ko 40% tak kam karta hai. Mooh ki safai se 50+ tarah ki bimariyon se bachao milta hai.

Nabi ne farmaya: Jab koi Muslim wudu karta hai aur chehra dhota hai, toh paani ke saath aankhon se woh tamam gunah nikal jaate hain jo aankhon ne dekhe. (Muslim)

Wuzu ka ek aur faida jo log nahi jaante: concentration badhhti hai. Paani ka thanda sparsh vagus nerve ko activate karta hai jo anxiety aur stress ko kam karta hai.

Aaj se ek azm karo: har namaz ke liye taaza wuzu karo. Har damke ke saath gunah jhadte hain aur darajaat buland hote hain.
    `,
    urdu: `وضو صرف پانی سے ہاتھ دھونا نہیں یہ جسم اور روح کی طہارت کا مکمل نظام ہے۔

قرآن میں اللہ نے فرمایا جب تم نماز کے لیے اٹھو تو اپنا چہرہ اور کہنیوں تک ہاتھ دھوؤ۔ (المائدہ 6)

جرمن محققین نے 2010 میں ثابت کیا کہ ناک میں پانی ڈالنا سانس کی بیماریوں کو 40 فیصد تک کم کرتا ہے۔

نبی نے فرمایا جب مسلمان وضو کرتا اور چہرہ دھوتا ہے تو پانی کے ساتھ آنکھوں کے گناہ نکل جاتے ہیں۔ (مسلم)

آج سے یہ عزم کرو ہر نماز کے لیے تازہ وضو کرو۔ ہر قطرے کے ساتھ گناہ جھڑتے ہیں۔
    `,
    telugu: `వుజూ అంటే కేవలం నీళ్ళతో చేతులు కడగడం మాత్రమే కాదు ఇది శరీరం మరియు ఆత్మ యొక్క పరిశుద్ధత వ్యవస్థ.

ఖురాన్ లో అల్లాహ్ చెప్పాడు మీరు నమాజ్ కు లేచినప్పుడు మీ ముఖాలు మరియు మోచేతుల వరకు చేతులు కడుక్కోండి. (మాయిదా 6)

జర్మన్ పరిశోధకులు నిరూపించారు ముక్కు నీళ్ళు వేయడం శ్వాసకోశ అంటువ్యాధులను 40 శాతం తగ్గిస్తుంది.

ప్రవక్త చెప్పారు ముస్లిం వుజూ చేసి ముఖం కడిగినప్పుడు నీళ్ళతో పాటు కళ్ళు చూసిన పాపాలు పోతాయి. (ముస్లిం)

ఈరోజు నుండి నిర్ణయం తీసుకోండి ప్రతి నమాజ్ కు తాజా వుజూ చేయండి.
    `,
  },
  {
    id: "b12",
    title: "Quran Padhne ka Sahi Tarika",
    category: "Quran",
    createdAt: "2025-01-12",
    romanUrdu: `Aaj zyada tar log Quran ko ek rasmi kitaab ki tarah treat karte hain -- bara izzat se almari mein rakhte hain, Ramzan mein uthate hain, kuch tilawat karte hain, phir wapas rakh dete hain. Lekin Quran sirf padhne ke liye nahi aaya -- yeh samajhne, sochne, amal karne aur zindagi badalne ke liye aaya.

Nabi ne farmaya: Quran padhne wala us missk ki tarah hai jis ki khushboo har taraf phailti hai. (Bukhari)

Sahi tarika kya hai?

Pahli baat: Quran Arabic mein padhein, chahe samajh na aaye. Har harf ka sawab milta hai. Alif Lam Meem teen harf yani 30 nekiyan.

Doosri baat: Tarjuma padhein apni zubaan mein. Urdu, Telugu -- jo bhi samajh aaye.

Teesri baat: Roz kuch na kuch padhein, chahe thoda hi ho.

Chauthi baat: Tajweed seekhein. Galat talaffuz ke saath bhi sawab milta hai lekin sahi talaffuz ke saath kalam ka asli husn khulta hai.

Paanchvi baat: Quran ki aayaat ko zindagi pe apply karein.

Aaj se ek aadat banao: Fajr ke baad 10 minute Quran. Baqi sab kaam baad mein.
    `,
    urdu: `آج زیادہ تر لوگ قرآن کو رسمی کتاب کی طرح برتتے ہیں الماری میں رکھتے ہیں رمضان میں اٹھاتے ہیں پھر واپس رکھ دیتے ہیں۔ لیکن قرآن سمجھنے سوچنے اور زندگی بدلنے کے لیے آیا۔

نبی نے فرمایا قرآن پڑھنے والا مشک کی طرح ہے جس کی خوشبو ہر طرف پھیلتی ہے۔ (بخاری)

صحیح طریقہ: پہلی بات عربی میں پڑھیں چاہے سمجھ نہ آئے ہر حرف کا ثواب ملتا ہے الف لام میم تین حروف یعنی 30 نیکیاں۔ دوسری بات ترجمہ پڑھیں۔ تیسری بات روز کچھ نہ کچھ پڑھیں۔

آج سے ایک عادت بناؤ فجر کے بعد 10 منٹ قرآن۔
    `,
    telugu: `నేడు చాలా మంది ఖురాన్ ను ఆచారపు గ్రంథంగా భావిస్తారు అల్మారాలో పెడతారు రమజాన్ లో తీస్తారు కొంచెం చదువుతారు తిరిగి పెడతారు. కానీ ఖురాన్ అర్థం చేసుకోవడానికి జీవితాన్ని మార్చుకోవడానికి వచ్చింది.

ప్రవక్త చెప్పారు ఖురాన్ చదివే వ్యక్తి కస్తూరి వంటివాడు వారి సువాసన అన్నివైపులా వ్యాపిస్తుంది. (బుఖారీ)

సరైన పద్ధతి: అరబిక్ లో చదవండి ప్రతి అక్షరానికి 10 పుణ్యాలు. మీ భాషలో అనువాదం చదవండి. రోజూ కొంచెమైనా చదవండి.

ఈరోజు నుండి అలవాటు చేసుకోండి ఫజర్ తర్వాత 10 నిమిషాలు ఖురాన్.
    `,
  },
  {
    id: "b13",
    title: "Sadqa aur Khairaat ka Asar",
    category: "Akhlaaq",
    createdAt: "2025-01-13",
    romanUrdu: `Kya tum jaante ho ke sadqa tumhara khud ka bhi bhala karta hai? Duniya mein logon ki naazir mein izzat milti hai aur aakhirat mein Allah ke naazir mein darjaat buland hote hain.

Quran mein Allah ne farmaya: Jo log apna maal Allah ki raah mein kharch karte hain, unki misaal ek daane ki tarah hai jo saat baaliyan ugaata hai har baali mein sau daane. (Baqara: 261) Matlab ek rupaye ka sadqa aakhirat mein 700 rupaye banta hai!

Nabi ne farmaya: Sadqa maliyat mein kami nahi aata. (Muslim) Yeh Allah ka waada hai.

Sadqa ke qism: Maal ka sadqa, ilm ka sadqa -- kisi ko kuch sikhana, jism ka sadqa -- kisi ki madad karna, dua karna, muskurahat -- yeh bhi sadqa hai!

Nabi ne farmaya: Apne beemar logo ko sadqa se dawa karo. (Abu Dawud) Yeh spiritual medicine hai.

Aaj se ek kaam karo: Roz ek sadqa, chahe kitna bhi chhota ho.
    `,
    urdu: `کیا تم جانتے ہو کہ صدقہ تمہارا خود کا بھی بھلا کرتا ہے؟

قرآن میں اللہ نے فرمایا جو لوگ اپنا مال اللہ کی راہ میں خرچ کرتے ہیں ان کی مثال ایک دانے کی طرح ہے جو سات بالیاں اگاتا ہے ہر بالی میں سو دانے۔ (البقرہ 261)

نبی نے فرمایا صدقہ مالیت میں کمی نہیں آتا۔ (مسلم)

صدقہ کی اقسام مال کا صدقہ علم کا صدقہ جسم کا صدقہ دعا اور مسکراہٹ یہ بھی صدقہ ہے۔

آج سے ایک کام کرو روز ایک صدقہ چاہے کتنا بھی چھوٹا ہو۔
    `,
    telugu: `మీకు తెలుసా సదఖా మీ స్వంత మేలు కూడా చేస్తుంది.

ఖురాన్ లో అల్లాహ్ చెప్పాడు అల్లాహ్ మార్గంలో తమ సంపదను ఖర్చు చేసేవారి ఉపమానం ఒక గింజ వంటిది ఏడు వంట్లు పుట్టిస్తుంది ప్రతి వంటలో నూరు గింజలు. (బఖర 261)

ప్రవక్త చెప్పారు సదఖా సంపదను తగ్గించదు. (ముస్లిం)

సదఖా రకాలు సంపద సదఖా జ్ఞాన సదఖా శారీరక సదఖా దుఆ మరియు చిరునవ్వు ఇది కూడా సదఖాయే.

ఈరోజు నుండి రోజూ ఒక సదఖా ఎంత చిన్నదైనా సరే.
    `,
  },
  {
    id: "b14",
    title: "Raat ki Ibadat: Tahajjud ki Fazilat",
    category: "Ibadat",
    createdAt: "2025-01-14",
    romanUrdu: `Tahajjud woh waqt hai jab duniya soti hai aur kuch mukhlis bande jaag kar apne Rab se baat karte hain. Quran mein Allah ne farmaya: Woh log jo raat ke chhote hisse mein sota hain aur seher ke waqt mafrat maangney hain. (Zariyat: 17-18)

Nabi ne farmaya: Farz ke baad sabse afzal namaz raat ki namaz hai. (Muslim)

Scientific research kehti hai: Seher ka waqt 3-5 AM cortisol energy hormone ka peak time hota hai. Is waqt jo kaam karo woh zyada productive hota hai.

Tahajjud kaise shuru karein: Isha ke baad jaldi so jao. 2:30-3:00 baje alarm lagao. Wuzu karo. 2 rakat se shuru karo. Dil ki baat Allah ko kahte raho.

Tahajjud mein dua qubool hoti hai. Nabi ne farmaya: Raat ke aakhri tahi mein Allah neeche utarta hai aur kehta hai Koi hai jo mujh se maange taake main use doon. (Bukhari)

Ek hafte try karo. Sirf 7 raat.
    `,
    urdu: `تہجد وہ وقت ہے جب دنیا سوتی ہے اور کچھ مخلص بندے جاگ کر اپنے رب سے بات کرتے ہیں۔

قرآن میں اللہ نے فرمایا وہ لوگ جو رات کے چھوٹے حصے میں سوتے ہیں اور سحر کے وقت مغفرت مانگتے ہیں۔ (الذاریات 17-18)

نبی نے فرمایا فرض کے بعد سب سے افضل نماز رات کی نماز ہے۔ (مسلم)

تہجد کیسے شروع کریں: عشاء کے بعد جلدی سوئیں۔ 2:30-3:00 بجے الارم لگائیں۔ وضو کریں۔ 2 رکعت سے شروع کریں۔

ایک ہفتہ آزماؤ۔ صرف 7 راتیں۔
    `,
    telugu: `తహజ్జుద్ అది ప్రపంచం నిద్రిస్తున్నప్పుడు కొంతమంది నిష్ఠగల సేవకులు మేల్కొని తమ ప్రభువుతో మాట్లాడే సమయం.

ఖురాన్ లో అల్లాహ్ చెప్పాడు రాత్రి కొంత భాగం మాత్రమే నిద్రించేవారు తెల్లవారు జామున క్షమాపణ కోరుతారు. (జారియాత్ 17-18)

ప్రవక్త చెప్పారు ఫర్జ్ తర్వాత అత్యుత్తమ నమాజ్ రాత్రి నమాజ్. (ముస్లిం)

తహజ్జుద్ ఎలా ప్రారంభించాలి: ఇషా తర్వాత వేగంగా నిద్రపొండి. 2:30-3:00 కు అలారం పెట్టండి. వుజూ చేయండి. 2 రకాత్ తో మొదలుపెట్టండి.

ఒక వారం ప్రయత్నించండి. కేవలం 7 రాత్రులు.
    `,
  },
  {
    id: "b15",
    title: "Musalman aur Waqt ki Qadr",
    category: "Akhlaaq",
    createdAt: "2025-01-15",
    romanUrdu: `Waqt paisa hai yeh westerner kehte hain. Islam kehta hai waqt usse bhi zyada qeemti hai. Kyunki paisa laut sakta hai waqt nahi.

Quran mein Allah ne farmaya: Asar zamaane ki qasam! Beshak insaan nuqsaan mein hai. (Asr: 1-2) Puri ek surah sirf 3 aayat sirf waqt ke baare mein!

Islamic time management ke usool: Barakatein subah mein hain jaldi utho. Niyat sahi karo waqt ki barakat niyat se milti hai. Fajr ke baad koi kaam nahi chhorna. Kaam ko kal par na dalo. Maut ko yaad karo yeh waqt ki sabse badi reminder hai.

Har din 24 ghante hain. Sirf 2.5 ghante namaz mein jaate hain. Baaki 21.5 ghante tum us waqt mein kya karte ho yahi jawab-dehi hai.

Aaj se ek kaam: Raat ko so ne se pehle likhoo aaj maine kya kiya jo Allah ko pasand aaya.
    `,
    urdu: `وقت پیسہ ہے یہ مغرب کہتا ہے۔ اسلام کہتا ہے وقت اس سے بھی زیادہ قیمتی ہے کیونکہ پیسہ واپس آ سکتا ہے وقت نہیں۔

قرآن میں اللہ نے فرمایا زمانے کی قسم بے شک انسان خسارے میں ہے۔ (العصر 1-2) پوری ایک سورۃ صرف 3 آیات صرف وقت کے بارے میں!

Islamic time management کے اصول: صبح جلدی اٹھو نیت سیدھی رکھو کام کو کل پر نہ ڈالو موت کو یاد کرو۔

آج سے ایک کام: رات کو سونے سے پہلے لکھو آج میں نے کیا کیا جو اللہ کو پسند آیا۔
    `,
    telugu: `సమయం డబ్బు అని పాశ్చాత్యులు చెప్తారు. ఇస్లాం చెప్తుంది సమయం దానికంటే విలువైనది ఎందుకంటే డబ్బు తిరిగి రావచ్చు సమయం రాదు.

ఖురాన్ లో అల్లాహ్ చెప్పాడు కాలం సాక్షిగా నిశ్చయంగా మానవుడు నష్టంలో ఉన్నాడు. (అస్ర్ 1-2) ఒక పూర్తి సూరా కేవలం 3 ఆయాత్ లు కేవలం సమయం గురించి!

Islamic time management నిరూపణలు: ఉదయమే లేవండి నిజమైన నియ్యత పెట్టుకోండి పనులు రేపటికి వాయిదా వేయకండి మరణాన్ని గుర్తు ఉంచుకోండి.
    `,
  },
  {
    id: "b16",
    title: "Sabr: Zindagi ka Sabse Bada Hunnar",
    category: "Akhlaaq",
    createdAt: "2025-01-16",
    romanUrdu: `Zindagi mein sabse mushkil kaam kya hai? Paisa banana nahi. Fame haasil karna nahi. Sabse mushkil kaam hai sabr karna. Aur sabse bada hunar sabr hi hai.

Quran mein sabr ka lafz 90 se zyada baar aaya hai. Kisi aur sifat ka itna zikar nahi. Kyunki Allah janta tha ke insaan ko sabse zyada is cheez ki zaroorat hogi.

Sabr ke teeno darje: Mushkilaat par sabr jab bimari ho naukri jaye. Gunaah se bachne par sabr nafas ko rokna. Ibadat par sabr roz uthke fajr padhna.

Quran mein Allah ne farmaya: Beshak Allah sabr karne waalon ke saath hai. (Baqara: 153) Yeh ek guarantee hai.

Stanford University ne sabit kiya ke jo bache delayed gratification mein behtara, woh zindagi mein zyada kamyaab rahe -- behtar jobs better relationships healthier lives.

Aaj kisi mushkil mein ho? Sirf teen kaam karo: Wuzu karo. 2 rakat namaz padho. Yeh dua karo: Innallaha ma as sabirin -- Allah sabr karne waalon ke saath hai.
    `,
    urdu: `زندگی میں سب سے مشکل کام کیا ہے؟ سب سے مشکل کام ہے صبر کرنا۔ اور سب سے بڑا ہنر صبر ہی ہے۔

قرآن میں صبر کا لفظ 90 سے زیادہ بار آیا ہے۔ کسی اور صفت کا اتنا ذکر نہیں۔

صبر کے تین درجے: مشکلات پر صبر، گناہ سے بچنے پر صبر، عبادت پر صبر۔

قرآن میں اللہ نے فرمایا بے شک اللہ صبر کرنے والوں کے ساتھ ہے۔ (البقرہ 153)

آج کسی مشکل میں ہو؟ صرف تین کام کرو: وضو کرو 2 رکعت نماز پڑھو اور دعا کرو اللہ صابروں کے ساتھ ہے۔
    `,
    telugu: `జీవితంలో అత్యంత కష్టమైన పని ఏమిటి? అత్యంత కష్టమైన పని సబ్ర్ చేయడం. అత్యుత్తమ నైపుణ్యం సబ్రే.

ఖురాన్ లో సబ్ర్ పదం 90 కంటే ఎక్కువ సార్లు వచ్చింది. మరే ఇతర లక్షణానికి ఇంత ప్రస్తావన లేదు.

సబ్ర్ యొక్క మూడు స్థాయిలు: కష్టాలపై సబ్ర్, పాపాల నుండి దూరంగా ఉండటంలో సబ్ర్, ఇబాదత్ పై సబ్ర్.

ఖురాన్ లో అల్లాహ్ చెప్పాడు నిశ్చయంగా అల్లాహ్ సబ్ర్ చేసేవారితో ఉంటాడు. (బఖర 153)

ఈరోజు ఏదైనా కష్టంలో ఉన్నారా? మూడు పనులు చేయండి వుజూ చేయండి 2 రకాత్ నమాజ్ చదవండి దుఆ చేయండి.
    `,
  },
];
