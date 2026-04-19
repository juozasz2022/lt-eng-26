# **Sintetinės klasės ir daugiagentės architektūros: kolektyvinės dinamikos replikavimas DI pagrįstose kalbų mokymosi sistemose**

Dmitrijaus Petrovo metodika, plačiau žinoma kaip „Poliglotas 16“, tapo vienu ryškiausių intensyvaus kalbų mokymo pavyzdžių, pabrėžiančių ne tik lingvistinį minimalizmą, bet ir socialinę grupės dinamiką kaip esminį sėkmės veiksnį.1 Tačiau bandymas šią metodiką perkelti į individualizuotą skaitmeninę aplinką, kurioje mokytojo vaidmenį atlieka dirbtinio intelekto (DI) įrankis, sukuria specifinį „vienišo mokinio spąstų“ fenomeną. Pagrindinis šio iššūkio aspektas yra kognityvinio ir sociokognityvinio krūvio disbalansas: kai mokinys lieka vienas prieš DI mokytoją, jis priverstas nuolatos generuoti atsakymus, o tai sukelia greitą mentalinį nuovargį ir sumažina mokymosi efektyvumą.3 Siekiant išspręsti šią problemą, šiuolaikiniai edukacinių technologijų tyrimai siūlo kurti „Sintetines klases“ – aplinkas, kuriose dalyvauja ne tik DI mokytojas, bet ir keli autonominiai DI agentai, atliekantys klasiokų vaidmenis.4 Šiame pranešime analizuojama, kaip daugiagentės sistemos (angl. Multi-Agent Systems, MAS) gali imituoti kolektyvinį darbą, suteikti mokiniui būtinas „poilsio fazes“ per netiesioginį (vikarinį) mokymąsi ir užtikrinti Petrovo metodikai būdingą „laisvės prieš teisingumą“ atmosferą.6

## **D. Petrovo metodikos esmė: lingvistinė matrica ir grupės dinamika**

D. Petrovo metodika remiasi principu, kad kiekviena kalba turi fundamentalų „branduolį“ arba „matricą“, kurią sudaro apie 300–500 dažniausiai vartojamų žodžių ir 50–60 bazinių veiksmažodžių.8 Šis rinkinys padengia iki 90 % kasdienės komunikacijos poreikių. Autoriaus teigimu, pagrindinis tikslas per pirmąsias 16 pamokų yra ne pasiekti gramatinį tobulumą, o „automatizuoti“ šiuos bazinius algoritmus, kad mokinys galėtų kurti sakinius negalvodamas apie taisykles.6

Tradicinėje Petrovo pamokoje, kurioje dalyvauja 5–9 žmonės, grupė atlieka kelias kritines funkcijas. Pirma, kol mokytojas dirba su vienu mokiniu, kiti grupės nariai turi galimybę klausytis ir nesąmoningai įsisavinti struktūras be tiesioginio spaudimo atsakyti. Tai vadinama vikarinio mokymosi procesu, kuris leidžia smegenims pailsėti nuo aktyvios gamybos ir pereiti prie pasyvaus modeliavimo.9 Antra, skirtingi grupės nariai daro skirtingas klaidas, o tai leidžia mokytojui pademonstruoti taisyklės veikimą įvairiuose kontekstuose. Trečia, socialinė interakcija mažina užsienio kalbos baimę (angl. Foreign Language Anxiety, FLA), nes mokiniai mato, kad jų bendraamžiai taip pat susiduria su sunkumais.11

### **Lentelė 1: D. Petrovo metodikos komponentų adaptacija DI sistemoje**

| Metodikos komponentas | Funkcija tradicinėje grupėje | Iššūkis individualiame DI kurse | DI agentų sprendimas |
| :---- | :---- | :---- | :---- |
| **Bazinė matrica (16 pamokų)** | Greitas pagrindinių struktūrų įsisavinimas.6 | Per didelis intensyvumas vienam asmeniui. | Adaptuotas tempas ir agentų intarpai.13 |
| **Veiksmažodžių automatizavimas** | Nuolatinis kartojimas keičiantis eilėms.12 | Monotonija ir greitas nuovargis. | DI klasiokai perima dalį kartojimo krūvio.14 |
| **„Laisvė prieš teisingumą“** | Klaidos toleruojamos siekiant srauto.7 | DI linkęs per dažnai taisyti klaidas.11 | DI klasiokai daro tyčines klaidas, mažindami įtampą.15 |
| **Grupės „etiudai“ (vaidmenų žaidimai)** | Realių situacijų simuliacija su bendraamžiais.12 | Trūksta pašnekovų įvairovės. | Daugiagentė vaidmenų simuliacija.16 |
| **Vikarinis mokymasis (stebėjimas)** | Mokymasis iš kitų atsakymų ir klaidų.9 | Nuolatinis mokinio aktyvumas (be poilsio). | „Stebėjimo režimas“ (Observation Mode).17 |

Mokymosi sistemėlės kūrėjui, siekiančiam perkelti šią dinamiką į DI terpę, svarbu suprasti, kad mokinio poilsis nėra tiesiog pauzė ar tyla. Tai aktyvus kognityvinis procesas, kurio metu mokinys stebi, kaip du ar daugiau DI personažų sąveikauja tarpusavyje, sprendžia tuos pačius uždavinius, su kuriais ką tik susidūrė jis pats, ir galbūt daro klaidas, kurias jis jau išmoko atpažinti.18

## **Netiesioginis (vikarinis) mokymasis: teorinis pagrindas ir „poilsio“ mechanizmas**

Netiesioginis arba vikarinis mokymasis (angl. vicarious learning) yra procesas, kai individas įgyja žinių ar įgūdžių stebėdamas kitų elgesį ir tų veiksmų pasekmes.10 Edukacinės psichologijos kontekste tai ypač svarbu mažinant kognityvinį krūvį. Tyrimai rodo, kad mokiniai, kurie stebi moderuojamą dialogą tarp mokytojo ir kito mokinio (angl. vicarious dialogue), dažnai pasiekia geresnių rezultatų nei tie, kurie mokosi tik iš monologinių paskaitų.19

### **Kognityvinio krūvio teorija ir poilsio būtinybė**

Kognityvinio krūvio teorija (angl. Cognitive Load Theory, CLT) teigia, kad darbinė atmintis turi ribotus išteklius.20 Kai mokinys aktyviai konstruoja sakinį anglų kalba, jis vienu metu turi:

1. Prisiminti reikiamą veiksmažodį iš Petrovo matricos.8  
2. Pritaikyti teisingą laiką (esamąjį, būsimąjį ar būtajį).12  
3. Suvaldyti tarimą ir intonaciją.  
4. Stebėti socialinius signalus (net jei tai DI agentas).3

Šis „sociokognityvinis krūvis“ gali sukelti mokinio „užsidarymą“ arba tylą.3 Petrovo pamokose poilsis atsiranda natūraliai – kol mokytojas dirba su kitu grupės nariu, dabartinis mokinys gali „atjungti“ aktyvios gamybos centrus ir pereiti prie informacijos integravimo.9 DI sistemoje tai galima pasiekti įvedant DI personažus-klasiokus, kurie perima estafetę. Įdomu tai, kad stebint „vidutinio lygio“ klasioką (kuris daro apie 50 % klaidų), mokinio dėmesio koncentracija yra didesnė nei stebint „tobulą“ klasioką, nes klaidų atpažinimas aktyvuoja smegenų klaidų aptikimo mechanizmus (angl. prediction errors).18

### **Lentelė 2: Poilsio fazių tipai DI mokymosi sistemoje**

| Poilsio fazės tipas | DI agentų veiksmas | Mokinio kognityvinė veikla | Pedagoginė nauda |
| :---- | :---- | :---- | :---- |
| **Vikarinis dialogas (Pasyvus)** | Mokytojas dirba su DI klasioku, aiškindamas naują veiksmažodį.19 | Mokinys stebi ir „permąsto“ savo žinias. | Sumažėja FLA, gerėja modeliavimas.23 |
| **Klaidų taisymo simuliacija** | DI klasiokas padaro klaidą, mokytojas prašo kito agento ją pataisyti.15 | Mokinys bando mintyse pataisyti klaidą pirmas. | Aktyvuojami klaidų aptikimo centrai (ACC).22 |
| **„Mokymas mokant“ (LBT)** | Mokinys stebi, kaip vienas DI agentas moko kitą.24 | Mokinys vertina mokymo procesą. | Geresnis konceptualus supratimas.26 |
| **Stebėjimo režimas (Read-Only)** | Du DI agentai atlieka vaidmenų žaidimą (pvz., oro uoste).16 | Mokinys klauso natūralaus srauto. | Įgyjamas pasyvus žodynas ir intonacijos modeliai.12 |

Šios fazės leidžia įgyvendinti Petrovo siekį išlaikyti aukštą pamokos intensyvumą (45–60 min.) be mokinio perdegimo. Svarbiausia, kad šie agentai nebūtų tik „statistai“ – jie turi turėti ryškias asmenybes, kurios imituotų tikrą klasės aplinką.5

## **Daugiagentės sistemos (MAS) architektūra: sintetinių klasiokų projektavimas**

Norint sukurti sistemą, kurioje mokinys jaustųsi kolektyvinio darbo dalimi, DI architektūra turi būti pagrįsta ne vienu modeliu, o specializuotų agentų tinklu.13 Kiekvienas agentas turi savo vaidmenį, žinių lygį ir bendravimo stilių. Šis požiūris leidžia išvengti „monolitinio“ mokytojo, kuris bando būti viskuo vienu metu.13

### **Klasiokų tipologija pagal SimClass sistemą**

Tyrimai su „SimClass“ karkasu parodė, kad efektyviausiai klasės dinamiką imituoja šie personažai 14:

1. **Klasės juokdarys (angl. Class Clown)**: Šis agentas įterpia lengvų pastabų, pajuokauja apie savo nesėkmes mokantis anglų kalbos arba užduoda netikėtus klausimus. Jo pagrindinė funkcija – mažinti įtampą ir humanizuoti DI aplinką.14  
2. **Gilus mąstytojas (angl. Deep Thinker)**: Jis užduoda sudėtingesnius klausimus apie Petrovo matricos logiką, pavyzdžiui: „Kodėl būsimajame laike naudojame *will*, o ne kitą formą?“. Tai skatina mokinį mąstyti analitiškai.14  
3. **Smalsusis protas (angl. Inquisitive Mind)**: Agentas, kuris nuolatos prašo pavyzdžių arba prašo pakartoti taisyklę, kai mokinys jaučiasi pavargęs. Jis atlieka „pertraukos“ iniciatoriaus vaidmenį.14  
4. **Užrašų darytojas (angl. Note Taker)**: Šis agentas susistemina tai, kas buvo pasakyta, pateikdamas santrauką lentelės ar sąrašo pabaigoje, padėdamas mokiniui vizualizuoti Petrovo veiksmažodžių lenteles.14

### **Techninis įgyvendinimas: Klasės sesijos valdiklis**

Visą šią dinamiką valdo centrinis elementas – „Klasės sesijos valdiklis“ (angl. Class Session Controller).14 Jis analizuoja mokinio elgseną realiuoju laiku (atsakymų greitį, klaidų dažnumą) ir nusprendžia, kada perleisti eilę DI agentams.

* **Būsenos receptorius (Class State Receptor)**: Renka informaciją apie pamokos eigą ir mokinio nuovargį.28  
* **Turnų priskyrimas (Turn Allocation)**: Jei mokinys vėluoja atsakyti arba jo atsakymai tampa trumpi, valdiklis suteikia žodį DI klasiokui, sakydamas: „Jonai, matau, kad šis veiksmažodis sukėlė klausimų. Alisa, o kaip tu pasakytum 'aš būsiu čia rytoj'?“.28  
* **Klaidų injekcija (Error Injection)**: DI agentai užprogramuoti daryti „procedūrines klaidas“ (pvz., pamiršti galūnę *\-s* esamajame laike), kad mokinys galėtų pailsėti atlikdamas stebėtojo-taisytojo vaidmenį.15

Ši struktūra neleidžia mokiniui pasijusti izoliuotam. Tyrimai rodo, kad net 10 minučių treniruotė tokioje simuliacijoje žymiai padidina pasitikėjimą savo jėgomis.29

## **„Stebėjimo režimo“ (Observation Mode) vartotojo patirties (UX) projektavimas**

Sistemos kūrėjui ypač svarbu sukurti sklandų perėjimą iš aktyvaus dalyvavimo į stebėjimo režimą. Tai neturi atrodyti kaip „vaizdo įrašo žiūrėjimas“ – mokinys vis tiek turi jaustis dalyviu, bet be prievolės kalbėti.

### **Read-Only mokymosi fazės pritaikymas**

Programinės įrangos mokymo srityje naudojamas „Read-Only Learning“ etapas, kurio metu sistema analizuoja duomenis ir rodo dėsningumus be vartotojo įsikišimo.17 Kalbų mokymosi sistemoje tai gali atrodyti taip:

1. **Vizualinis grįžtamasis ryšys**: Kol DI agentai kalbasi, ekrane dinamiškai pildosi Petrovo veiksmažodžių lentelė. Mokinys mato, kaip agentų ištarti žodžiai „nugula“ į teisingus langelius.7  
2. **Multimodalumas**: Naudojami ne tik balsai, bet ir vizualinės anotacijos ant ekrano, kurios pabrėžia gramatines jungtis.31 Pavyzdžiui, kai agentas Alisa sako *I will work*, ekrane prie žodžio *will* atsiranda rodyklė į būsimąjį laiką.  
3. **Pritarimo mechanizmas**: Mokinys gali „ilsėtis“, bet vis tiek būti įtrauktas per paprastus mygtukus: „Ar Alisa teisingai pasakė?“. Tai nereikalauja didelių kognityvinių išteklių, bet neleidžia mintims klaidžioti.18

### **Lentelė 3: Vartotojo sąsajos (UI) elementai skirtingiems režimams**

| Režimas | Mokinio statusas | UI elementai | DI agentų aktyvumas |
| :---- | :---- | :---- | :---- |
| **Aktyvus (Performansas)** | Pagrindinis kalbėtojas. | Mikrofonas įjungtas, didelis raginimas (prompt). | Mokytojas stebi ir taiso. |
| **Poilsio (Stebėjimas)** | Klausytojas / Vertintojas. | Mikrofonas išjungtas, rodomas dialogas tekstu. | Du agentai diskutuoja tarpusavyje.14 |
| **Hibridinis (Etiudas)** | Rolės partneris. | Partnerio atvaizdas (avataras) centre. | Partneris-agentas reaguoja į mokinį.32 |
| **Refleksijos (Santrauka)** | Vertintojas. | Lentelių pildymas, klaidų analizė. | „Note Taker“ agentas pristato apžvalgą.28 |

Svarbu, kad DI agentų balsai būtų kuo panašesni į žmonių (cloned voices), nes robotizuoti balsai greičiau sukelia nuovargį ir sumažina įsitraukimą.33 Be to, avatarai turėtų atspindėti skirtingas kultūras ar asmenybes, kad mokinys priprastų prie įvairių akcentų, kas yra itin svarbu anglų kalbos mokymuisi.16

## **Lingvistiniai specifiniai aspektai: anglų kalbos kursas lietuviams**

Kuriant sistemą specialiai lietuviams, būtina atsižvelgti į abiejų kalbų struktūrinius skirtumus. Lietuvių kalba yra fleksinė (daug galūnių, laisva žodžių tvarka), o anglų kalba – analitinė (griežta žodžių tvarka, pagalbiniai veiksmažodžiai). Petrovo metodas čia puikiai tinka, nes jis supaprastina anglų kalbos tėkmę iki logiškų algoritmų.8

### **Petrovo „matricos“ pritaikymas lietuviškam mąstymui**

Lietuviui mokinį dažnai gąsdina anglų kalbos laikų gausa. Petrovo sistemoje jie suvedami į paprastą kvadratą: Esamasis, Būtasis, Būsimasis laikai kartu su Teiginiu, Neiginiu ir Klausimu.12

* **Pagalbiniai veiksmažodžiai kaip „operatoriai“**: DI agentai-klasiokai gali būti suprogramuoti daryti tipiškas lietuvių klaidas (pvz., sakyti *I not work* vietoj *I don't work*). Mokinys, stebėdamas, kaip DI mokytojas taiso agentą, paaiškindamas, kad „anglų kalboje mums reikia operatoriaus *do*“, geriau įsimena taisyklę, nes mato ją iš šono.22  
* **Žodynas (300 žodžių)**: Kadangi lietuviai dažnai turi gerą pasyvųjį žodyną iš medijų, DI sistema turėtų dinamiškai nustatyti, kuriuos žodžius mokinys jau žino, ir leisti DI agentams naudoti tuos žodžius vikarinio dialogo metu, taip įtvirtinant jų aktyvų vartojimą.8

### **Lentelė 4: Tipiškos klaidos ir jų simuliacija per DI agentus**

| Anglų k. struktūra | Lietuviška interferencija | DI klasioko klaidos simuliacija | Mokytojo reakcija (Poilsio fazėje) |
| :---- | :---- | :---- | :---- |
| Pagalbiniai veiksmažodžiai | Jų nebuvimas lietuvių k. | „Why you go there?“.15 | „Alisa, nepamiršk klausiamojo žodžio *do*\!“ |
| Trečiasis asmuo (*\-s*) | Nėra atitikmens galūnei. | „He play football every day.“ | „Jonai, ar girdi klaidą Alisos sakinyje?“ |
| Artikulai | Nėra artikulų sistemos. | „I have a car. The car is blue.“ | Rodomas vizualinis akcentas ant *a/the*. |
| Žodžių tvarka | Laisva tvarka lietuvių k. | „Yesterday went I to school.“ | Mokytojas perstumia žodžius ekrane.31 |

Šis metodas leidžia mokiniui pailsėti nuo savo paties klaidų naštos ir stebėti, kaip kiti sprendžia tuos pačius iššūkius, kas yra kritiškai svarbu išlaikant motyvaciją per visas 16 pamokų.6

## **DI technologijų palyginimas ir perspektyvos**

Rinkoje jau egzistuoja įrankiai, kurie bando įgyvendinti panašius principus, tačiau dauguma jų vis dar orientuoti į dyadinį (1-on-1) bendravimą.

* **Alelo Enskill**: Naudoja socialiai intelektualius avatarus vaidmenų žaidimams. Tai artimiausia Petrovo „etiudams“, nes agentai reaguoja į vartotojo emocijas ir elgseną.16  
* **Immerse**: Kuria pilną virtualią aplinką, kurioje galima bendrauti su DI treneriais ir kitais mokiniais. Tai puikiai tinka kolektyvinio darbo simuliacijai, tačiau reikalauja didesnių techninių išteklių (VR).37  
* **SimClass**: Tai pažangiausias tyrimų karkasas, kuris tiesiogiai simuliuoja klasę su mokytoju ir keliais klasiokais-agentais. Jis parodė, kad klasiokų agentų pašalinimas sumažina vartotojo kalbėjimo trukmę 26–45 %, kas įrodo jų svarbą motyvacijai.14

Kuriant naują sistemą lietuviams, rekomenduojama naudoti agentinę architektūrą, kurioje mokinys galėtų bet kada pasakyti: „Aš noriu pasiklausyti, kaip jūs kalbatės“, ir DI mokytojas su DI klasiokais pereitų į etiudo demonstravimo režimą.13

## **Išvados ir rekomendacijos sistemos kūrimui**

Remiantis atlikta analize, galima teigti, kad sėkmingas D. Petrovo metodikos perkėlimas į DI aplinką priklauso ne nuo mokytojo-roboto tobulumo, o nuo visos edukacinės ekosistemos sukūrimo. Kolektyvinio darbo imitavimas per sintetinius klasiokus ne tik suteikia mokiniui reikiamą poilsį, bet ir sukuria saugią, stimuliuojančią ir pedagogiškai pagrįstą aplinką.4

1. **Sukurti bent tris DI personažus-klasiokus** su skirtingais charakteriais ir klaidų profiliais (pvz., Alisa daro gramatines klaidas, o Jonas – tarimo).  
2. **Įdiegti „Klasės sesijos valdiklį“**, kuris stebėtų mokinio nuovargį ir automatiškai inicijuotų vikarinio mokymosi epizodus.  
3. **Naudoti Petrovo „veiksmažodžių matricą“** kaip pagrindinį vizualinį inkarą ekrane, kuris pildytųsi tiek mokinio, tiek DI agentų aktyvumo metu.  
4. **Prioritizuoti psichologinį saugumą**, užtikrinant, kad DI mokytojas būtų „begaliniai kantrus“, o DI klasiokai savo klaidomis demonstruotų, kad klysti yra normali mokymosi dalis.7

Tokia sistema ne tik padės išvengti „vienišo mokinio spąstų“, bet ir leis pasiekti Petrovo žadamus rezultatus per 16 pamokų, išlaikant mokinio susidomėjimą ir kognityvinę sveikatą visos programos metu.6 Tai yra revoliucinis žingsnis nuo paprastų programėlių prie pilnaverčių, socialiai intelektualių mokymosi partnerių.13

#### **Cituoti šaltiniai**

1. METHOD OF LEARNING A FOREIGN LANGUAGE BY DMITRIY PETROV | International Journal of Pedagogics, pasiekta balandžio 11, 2026, [https://theusajournals.com/index.php/ijp/article/view/4099](https://theusajournals.com/index.php/ijp/article/view/4099)  
2. Dmitry Petrov (translator) \- Wikipedia, pasiekta balandžio 11, 2026, [https://en.wikipedia.org/wiki/Dmitry\_Petrov\_(translator)](https://en.wikipedia.org/wiki/Dmitry_Petrov_\(translator\))  
3. Sociocognitive Load: Why Learners Freeze, Fumble, and Fall Silent | The Language Gym, pasiekta balandžio 11, 2026, [https://gianfrancoconti.com/2025/08/07/sociocognitive-load-why-learners-freeze-fumble-and-fall-silent/](https://gianfrancoconti.com/2025/08/07/sociocognitive-load-why-learners-freeze-fumble-and-fall-silent/)  
4. Synthetic Classrooms | Axiom | Envisioning, pasiekta balandžio 11, 2026, [https://www.envisioning.com/research/axiom/synthetic-classrooms](https://www.envisioning.com/research/axiom/synthetic-classrooms)  
5. Simulating Classroom Education with LLM-Empowered Agents \- ACL Anthology, pasiekta balandžio 11, 2026, [https://aclanthology.org/2025.naacl-long.520.pdf](https://aclanthology.org/2025.naacl-long.520.pdf)  
6. METHOD OF LEARNING A FOREIGN LANGUAGE BY DMITRIY PETROV \- inLibrary, pasiekta balandžio 11, 2026, [https://inlibrary.uz/index.php/ijp/article/view/57832](https://inlibrary.uz/index.php/ijp/article/view/57832)  
7. 16 English Lessons. Beginner's Course \- Dmitry Petrov \- Kniga.lv, pasiekta balandžio 11, 2026, [https://kniga.lv/en/shop/16-urokov-anglijskogo-jazyka-nachalnyj-kurs](https://kniga.lv/en/shop/16-urokov-anglijskogo-jazyka-nachalnyj-kurs)  
8. Ways to Quickly Learn a Foreign Language, pasiekta balandžio 11, 2026, [https://ipindexing.com/journal-article-file/42945/ways-to-quickly-learn-a-foreign-language](https://ipindexing.com/journal-article-file/42945/ways-to-quickly-learn-a-foreign-language)  
9. Learning through vicarious participation in online language tutorials, pasiekta balandžio 11, 2026, [https://oro.open.ac.uk/70890/1/ChristinePleines\_Learning\_through\_vicarious\_participation\_EdDThesis\_REDACTED.pdf](https://oro.open.ac.uk/70890/1/ChristinePleines_Learning_through_vicarious_participation_EdDThesis_REDACTED.pdf)  
10. Coactive Vicarious Learning: Toward a Relational Theory of Vicarious Learning in Organizations | Academy of Management Review, pasiekta balandžio 11, 2026, [https://journals.aom.org/doi/10.5465/amr.2016.0202](https://journals.aom.org/doi/10.5465/amr.2016.0202)  
11. What the research shows about generative AI in tutoring \- Brookings Institution, pasiekta balandžio 11, 2026, [https://www.brookings.edu/articles/what-the-research-shows-about-generative-ai-in-tutoring/](https://www.brookings.edu/articles/what-the-research-shows-about-generative-ai-in-tutoring/)  
12. EFFECTIVE METHODS OF LEARNING ENGLISH ТрофимоваИ.С., РусинаА.С. Белорусский государственный университет, pasiekta balandžio 11, 2026, [https://elib.bsu.by/bitstream/123456789/241298/1/%D0%A2%D1%80%D0%BE%D1%84%D0%B8%D0%BC%D0%BE%D0%B2%D0%B0%20%D0%98.%D0%A1.%2C%20%D0%A0%D1%83%D1%81%D0%B8%D0%BD%D0%B0%20%D0%90.%D0%A1.\_EFFECTIVE%20METHODS%20OF%20LEARNING%20ENGLISH.pdf](https://elib.bsu.by/bitstream/123456789/241298/1/%D0%A2%D1%80%D0%BE%D1%84%D0%B8%D0%BC%D0%BE%D0%B2%D0%B0%20%D0%98.%D0%A1.%2C%20%D0%A0%D1%83%D1%81%D0%B8%D0%BD%D0%B0%20%D0%90.%D0%A1._EFFECTIVE%20METHODS%20OF%20LEARNING%20ENGLISH.pdf)  
13. Why Multi-Agent AI Architectures Will Power the Next Generation of Learning Systems, pasiekta balandžio 11, 2026, [https://dev.to/amit\_tyagi\_b6bb9dd185178e/why-multi-agent-ai-architectures-will-power-the-next-generation-of-learning-systems-m1j](https://dev.to/amit_tyagi_b6bb9dd185178e/why-multi-agent-ai-architectures-will-power-the-next-generation-of-learning-systems-m1j)  
14. Simulating Classroom Education with LLM-Empowered Agents ..., pasiekta balandžio 11, 2026, [https://www.alphaxiv.org/overview/2406.19226](https://www.alphaxiv.org/overview/2406.19226)  
15. Beyond the AI Tutor: Social Learning with LLM Agents \- arXiv, pasiekta balandžio 11, 2026, [https://arxiv.org/html/2604.02677v1](https://arxiv.org/html/2604.02677v1)  
16. Enskill Ed | Alelo, pasiekta balandžio 11, 2026, [https://www.alelo.com/wp-content/uploads/2022/02/Enskill-Ed-Flyer-200814.pdf](https://www.alelo.com/wp-content/uploads/2022/02/Enskill-Ed-Flyer-200814.pdf)  
17. From Alert Fatigue to Agent-Assisted Intelligent Observability \- InfoQ, pasiekta balandžio 11, 2026, [https://www.infoq.com/articles/agent-assisted-intelligent-observability/](https://www.infoq.com/articles/agent-assisted-intelligent-observability/)  
18. Reducing Mind-Wandering During Vicarious Learning from an Intelligent Tutoring System | Request PDF \- ResearchGate, pasiekta balandžio 11, 2026, [https://www.researchgate.net/publication/333910234\_Reducing\_Mind-Wandering\_During\_Vicarious\_Learning\_from\_an\_Intelligent\_Tutoring\_System](https://www.researchgate.net/publication/333910234_Reducing_Mind-Wandering_During_Vicarious_Learning_from_an_Intelligent_Tutoring_System)  
19. VIVID: Human-AI Collaborative Authoring of Vicarious Dialogues from Lecture Videos \- arXiv, pasiekta balandžio 11, 2026, [https://arxiv.org/html/2403.09168v2](https://arxiv.org/html/2403.09168v2)  
20. Beyond Cognitive Load Theory: Why Learning Needs More than Memory Management, pasiekta balandžio 11, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC12839043/](https://pmc.ncbi.nlm.nih.gov/articles/PMC12839043/)  
21. Managing cognitive load optimises learning | Australian Education Research Organisation, pasiekta balandžio 11, 2026, [https://www.edresearch.edu.au/summaries-explainers/explainers/managing-cognitive-load-optimises-learning](https://www.edresearch.edu.au/summaries-explainers/explainers/managing-cognitive-load-optimises-learning)  
22. Vicarious Reinforcement Learning Signals When Instructing Others, pasiekta balandžio 11, 2026, [https://www.jneurosci.org/content/35/7/2904](https://www.jneurosci.org/content/35/7/2904)  
23. Student Prior Knowledge and Learning in an Intelligent Tutoring System: Comparing the Effectiveness of Vicarious and Interactive Dialogues \- University of Memphis Digital Commons, pasiekta balandžio 11, 2026, [https://digitalcommons.memphis.edu/cgi/viewcontent.cgi?article=4384\&context=etd](https://digitalcommons.memphis.edu/cgi/viewcontent.cgi?article=4384&context=etd)  
24. Scientist studies AI as a 'learning buddy' \- University of Miami News, pasiekta balandžio 11, 2026, [https://news.miami.edu/stories/2026/03/scientist-studies-ai-as-a-learning-buddy.html](https://news.miami.edu/stories/2026/03/scientist-studies-ai-as-a-learning-buddy.html)  
25. Teach AI How to Code: Using Large Language Models as Teachable Agents for Programming Education \- arXiv, pasiekta balandžio 11, 2026, [https://arxiv.org/html/2309.14534v3](https://arxiv.org/html/2309.14534v3)  
26. Full article: LEARNING BY TEACHING: A NEW AGENT PARADIGM FOR EDUCATIONAL SOFTWARE \- Taylor & Francis, pasiekta balandžio 11, 2026, [https://www.tandfonline.com/doi/full/10.1080/08839510590910200](https://www.tandfonline.com/doi/full/10.1080/08839510590910200)  
27. Multi-Agent Systems in Education: A Survey from the Trustworthiness Perspective | TechRxiv, pasiekta balandžio 11, 2026, [https://www.techrxiv.org/doi/10.36227/techrxiv.176704820.01980102](https://www.techrxiv.org/doi/10.36227/techrxiv.176704820.01980102)  
28. \[Literature Review\] Simulating Classroom Education with LLM-Empowered Agents, pasiekta balandžio 11, 2026, [https://www.themoonlight.io/en/review/simulating-classroom-education-with-llm-empowered-agents](https://www.themoonlight.io/en/review/simulating-classroom-education-with-llm-empowered-agents)  
29. AI-Powered Simulations Offer Practice for Teachers in Training \- Government Technology, pasiekta balandžio 11, 2026, [https://www.govtech.com/education/k-12/ai-powered-simulations-offer-practice-for-teachers-in-training](https://www.govtech.com/education/k-12/ai-powered-simulations-offer-practice-for-teachers-in-training)  
30. Agentic AI Builds Autonomously: Is Your SDLC Ready to Adapt? \- Nitor Infotech, pasiekta balandžio 11, 2026, [https://www.nitorinfotech.com/blog/agentic-ai-builds-autonomously-is-your-sdlc-ready-to-adapt/](https://www.nitorinfotech.com/blog/agentic-ai-builds-autonomously-is-your-sdlc-ready-to-adapt/)  
31. 'Show It, Don't Just Say It': The Complementary Effects of Instruction Multimodality for Software Guidance \- arXiv.org, pasiekta balandžio 11, 2026, [https://arxiv.org/html/2603.02567v1](https://arxiv.org/html/2603.02567v1)  
32. Asynchronous Learning Platform Driven By AI \- Alelo, pasiekta balandžio 11, 2026, [https://www.alelo.com/ai-asynchronous-learning-platform/](https://www.alelo.com/ai-asynchronous-learning-platform/)  
33. What's the best AI language learning app in 2026? \- LanguaTalk, pasiekta balandžio 11, 2026, [https://languatalk.com/blog/whats-the-best-ai-for-language-learning/](https://languatalk.com/blog/whats-the-best-ai-for-language-learning/)  
34. Best AI Speaking Apps 2026 — 5 Apps Tested & Compared \- Lingtuitive, pasiekta balandžio 11, 2026, [https://lingtuitive.com/blog/best-ai-speaking-apps](https://lingtuitive.com/blog/best-ai-speaking-apps)  
35. Learn French in 16 Hours: A Guide | PDF \- Scribd, pasiekta balandžio 11, 2026, [https://www.scribd.com/document/964173570/French-in-16-Hours-33-pdf](https://www.scribd.com/document/964173570/French-in-16-Hours-33-pdf)  
36. Educational psychology perspectives on cognitive load and written corrective feedback: enhancing past tense acquisition in L2 learning \- Frontiers, pasiekta balandžio 11, 2026, [https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2026.1695913/full](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2026.1695913/full)  
37. IMMERSE's Origin Story, pasiekta balandžio 11, 2026, [https://www.immerse.com/blog/podcast-episode-7-immerse-origin-with-ceo-quinn-taber](https://www.immerse.com/blog/podcast-episode-7-immerse-origin-with-ceo-quinn-taber)  
38. IMMERSE \- Build Real Language Fluency on Meta Quest, pasiekta balandžio 11, 2026, [https://www.meta.com/experiences/immerse-build-real-language-fluency/3181432891940455/](https://www.meta.com/experiences/immerse-build-real-language-fluency/3181432891940455/)  
39. For Individuals \- Immerse, pasiekta balandžio 11, 2026, [https://www.immerse.com/for-individuals](https://www.immerse.com/for-individuals)  
40. Artificial Intelligence and Animated Pedagogical Agents \- AACE, pasiekta balandžio 11, 2026, [https://aace.org/review/artificial-intelligence-and-animated-pedagogical-agents/](https://aace.org/review/artificial-intelligence-and-animated-pedagogical-agents/)