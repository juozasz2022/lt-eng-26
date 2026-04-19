export const lessonsContent = [
  {
    id: 0,
    image: "/images/lessons/lesson_0.png",
    theory: {
      title: "0 Pamoka: LtEng_26 Filosofija",
      story: `Sveiki atvykę į „LtEng_26“ – jūsų greitąjį kelią į anglų kalbą. Šis kursas remiasi Dmitrijaus Petrovo „16 valandų“ metodika. Kodėl tai veikia? Nes kalba yra 50% matematika (logika, karkasas) ir 50% psichologija (laisvė klysti).

Mūsų tikslas – ne išmokti tūkstančius žodžių, o įvaldyti pagrindinį algoritmą (3x3 matricą), kuris leis jums generuoti tūkstančius sakinių jau po kelių pamokų. Susipažinkite su kolegomis – Alisa, Jonu ir Domantu, kurie kartu su jumis (Juozai!) dalyvaus simuliacijose. Pasiruošę pradėti šitą kelionę į laisvą kalbėjimą? Let's go!`,
      dialogue: [
        { speaker: "Petrovas", text: "- Hello Juozas! Are you ready to speak English?", translation: "- Labas, Juozai! Ar esi pasiruošęs kalbėti angliškai?" },
        { speaker: "Juozas", text: "- Yes, I am ready! But I am a bit nervous.", translation: "- Taip, pasiruošęs! Bet šiek tiek jaudinuosi." },
        { speaker: "Petrovas", text: "- Don't worry. It is easy and fun.", translation: "- Nesijaudink. Tai lengva ir smagu." }
      ],
      points: [
        "Negalvok apie gramatiką kaip apie taisyklių rinkinį, galvok kaip apie navigaciją.",
        "Svarbiausia yra automatizmas – pagrindinės formos turi „išeiti“ savaime.",
        "Klysti yra sveika. Klaidos yra jūsų progreso ženklas."
      ],
      tprsStory: [
        {
          id: "s0_1",
          text: "Juozas is a happy student. He wants to learn English in 16 hours.",
          translation: "Juozas yra laimingas studentas. Jis nori išmokti anglų kalbą per 16 valandų.",
          check: {
            question: "Kiek valandų Juozas planuoja mokytis?",
            choices: ["16 hours", "100 hours"],
            answer: "16 hours"
          }
        }
      ],
      syntheticSimulations: []
    }
  },
  {
    id: 1,
    image: "/images/lessons/lesson_1.png",
    theory: {
      title: "1 Pamoka: Pagrindinė veiksmažodžio matrica",
      story: `Sveiki atvykę į pirmąją anglų kalbos pamoką pagal Dmitrijaus Petrovo metodiką. Anglų kalba yra algoritmiška. Mūsų tikslas – sukurti „karkasą“, kuriame galėsite laisvai judėti laike: Praeityje, Dabartyje ir Ateityje. 
      
      Pagrindinis įrankis – 3x3 matrica. Ji padės jums suformuoti bet kurį teigiamą, neigiamą ar klausiamą sakinį su baziniais veiksmažodžiais. Šiandien pradedame nuo žodžių: love (mylėti), live (gyventi), work (dirbti), open (atidaryti), close (uždaryti).`,
      dialogue: [
        { speaker: "Adamas", text: "- Hello! Do you work here?", translation: "- Labas! Ar tu čia dirbi?" },
        { speaker: "Juozas", text: "- Hello! Yes, I work here. I love this place.", translation: "- Labas! Taip, aš čia dirbu. Man patinka ši vieta." },
        { speaker: "Adamas", text: "- Does your friend live in London?", translation: "- Ar tavo draugas gyvena Londone?" },
        { speaker: "Juozas", text: "- No, he doesn't live in London. He lives in Vilnius.", translation: "- Ne, jis negyvena Londone. Jis gyvena Vilniuje." }
      ],
      points: [
        "Ateities laikas visada naudoja 'will'.",
        "Dabarties laike 3-ajam asmeniui (He/She/It) pridedame galūnę -S.",
        "Klausimams naudojame pagalbinį žodį 'Do' arba 'Does'."
      ],
      tprsStory: [
        {
          id: "s1_1",
          text: "Juozas works in London. He lives in a small house.",
          translation: "Juozas dirba Londone. Jis gyvena mažame name.",
          check: {
            question: "Kuri forma teisinga, kai kalbame apie JĮ?",
            choices: ["He lives", "He live"],
            answer: "He lives"
          }
        }
      ],
      syntheticSimulations: [
        {
          id: "sim1_1",
          title: "Jono bandymas su 3-uoju asmeniu",
          steps: [
            { speaker: "teacher", text: "Jonai, pasakyk: 'Jis dirba čia kiekvieną dieną'.", translation: "Jonas, say: 'He works here every day'." },
            { speaker: "jonas", text: "He live here every day.", translation: "Jis čia gyvena kiekvieną dieną.", error: true, errorType: "verb_form" },
            { speaker: "teacher", text: "Alisa, ar girdi klaidą?", translation: "Alisa, do you hear a mistake?" },
            { speaker: "alisa", text: "Taip, Jonai. Kai kalbame apie JĮ (He), turime pridėti -S. Teisingai bus: He works.", translation: "Yes, Jonas. When we talk about HE, we must add -S. The correct way is: He works." },
            { speaker: "teacher", text: "Juozai, ar Alisa teisingai pataisė Joną?", translation: "Juozas, did Alisa correctly correct Jonas?", interactiveCheck: true, answer: "Yes" }
          ]
        }
      ]
    }
  },
  {
    id: 2,
    image: "/images/lessons/lesson_2.png",
    theory: {
      title: "2 Pamoka: Įvardžiai ir Klausimai",
      story: `Šiandien plečiame bazinį karkasą. Išmoksime valdyti ne tik veiksmus, bet ir kryptį bei adresatus. 'Matau JĄ', 'Padėk MUMS', 'Einame Į ten'.
      
      Taip pat suvaldysime pagrindinius klausiamuosius žodžius: What (Kas/Ką), Where (Kur), When (Kada), Why (Kodėl), How (Kaip). Šie šeši įrankiai leis jums gauti visą reikiamą informaciją angliškai.`,
      dialogue: [
        { speaker: "John", text: "- Where do you live?", translation: "- Kur tu gyveni?" },
        { speaker: "Juozas", text: "- I live in Vilnius. Why do you ask?", translation: "- Gyvenu Vilniuje. Kodėl klausi?" },
        { speaker: "John", text: "- When will you come to Italy?", translation: "- Kada atvyksi į Italiją?" },
        { speaker: "Juozas", text: "- I will come next month. How is the tennis club there?", translation: "- Atvyksiu kitą mėnesį. Kaip laikosi teniso klubas ten?" }
      ],
      points: [
        "Objektiniai įvardžiai: Me, Him, Her, Us, Them.",
        "Klausiamieji žodžiai visada eina sakinio pradžioje.",
        "Prielinksiai: IN (viduje), TO (į), FROM (iš)."
      ],
      tprsStory: [
        {
          id: "s2_1",
          text: "Juozas asks where the station is. He needs to go to Italy.",
          translation: "Juozas klausia, kur yra stotis. Jam reikia vykti į Italiją.",
          check: {
            question: "Kokį žodį naudojame vietai paklausti?",
            choices: ["Where", "When"],
            answer: "Where"
          }
        }
      ],
      syntheticSimulations: [
        {
          id: "sim2_1",
          title: "Klausimų konstravimas",
          steps: [
            { speaker: "teacher", text: "Juozas, ask Jonas where he lives.", translation: "Juozai, paklausk Jono, kur jis gyvena." },
            { speaker: "juozas", text: "Where do you live?", translation: "Kur tu gyveni?" },
            { speaker: "jonas", text: "I live in a big house near the club.", translation: "Gyvenu dideliame name šalia klubo." },
            { speaker: "teacher", text: "Excellent choice of words.", translation: "Puikus žodžių pasirinkimas." }
          ]
        }
      ]
    }
  },
  {
    id: 3,
    image: "/images/lessons/lesson_3.png",
    theory: {
      title: "3 Pamoka: Veiksmažodis „Būti“ (To Be)",
      story: `Trečioji pamoka skirta svarbiausiam anglų kalbos veiksmažodžiui – „būti“ (to be). Jis skiriasi nuo kitų veiksmažodžių ir turi savo atskirą 3x3 matricą. 
      
      Be „to be“ negalime apibūdinti savęs, nurodyti vietos ar būsenos. Išmoksime pasakyti: Aš esu (I am), Tu esi (You are), Mes būsime (We will be).`,
      dialogue: [
        { speaker: "Emma", text: "- Are you a student?", translation: "- Ar tu esi studentas?" },
        { speaker: "Juozas", text: "- Yes, I am. I am happy to be here.", translation: "- Taip. Aš laimingas būdamas čia." },
        { speaker: "Emma", text: "- Is it beautiful in Italy?", translation: "- Ar Italijoje gražu?" },
        { speaker: "Juozas", text: "- Yes, it is. It is warm and sunny.", translation: "- Taip. Šilta ir saulėta." }
      ],
      points: [
        "To Be turi 3 formas dabarties laike: am, is, are.",
        "Praeities laike naudojame: was, were.",
        "Ateityje: will be."
      ],
      tprsStory: [
        {
          id: "s3_1",
          text: "Juozas is in London. He was in Italy last year.",
          translation: "Juozas yra Londone. Praeitais metais jis buvo Italijoje.",
          check: {
            question: "Dabarties forma asmeniui 'HE' yra...",
            choices: ["Is", "Am"],
            answer: "Is"
          }
        }
      ],
      syntheticSimulations: [
        {
          id: "sim3_1",
          title: "Būsena ir tapatybė",
          steps: [
            { speaker: "teacher", text: "Alisa, are you a teacher?", translation: "Alisa, ar tu mokytoja?" },
            { speaker: "alisa", text: "No, I am a student. Juozas is a programmer.", translation: "Ne, aš studentė. Juozas yra programuotojas." },
            { speaker: "teacher", text: "Juozas, are you happy today?", translation: "Juozai, ar esi laimingas šiandien?" },
            { speaker: "juozas", text: "Yes, I am very happy!", translation: "Taip, aš labai laimingas!" }
          ]
        }
      ]
    }
  },
  {
    id: 4,
    image: "/images/lessons/lesson_4.png",
    theory: {
      title: "4 Pamoka: Apie save ir profesijas (Juozas - Programuotojas)",
      story: `Ketvirtoji pamoka skirta kalbėjimui apie save ir savo veiklas. Išmoksime naudoti artikelius (A, AN, THE) ir sužinosime, kaip lengvai sudaryti šimtus profesijų pavadinimų. 
      
      Prie veiksmažodžių pridėję galūnes -ER ar -OR, gauname profesiją: work -> worker, program -> programmer, act -> actor. Juozai, kadangi esi programuotojas, tavo pagrindinis žodis šiandien – programmer!`,
      dialogue: [
        { speaker: "Adamas", text: "- What do you do? Where do you work?", translation: "- Ką tu veiki? Kur tu dirbi?" },
        { speaker: "Juozas", text: "- I am a programmer. I work from home. And you?", translation: "- Aš esu programuotojas. Dirbu iš namų. O tu?" },
        { speaker: "Adamas", text: "- I am a tennis coach. I work at a big club.", translation: "- Aš esu teniso treneris. Dirbu dideliame klube." },
        { speaker: "Juozas", text: "- That is interesting! I love tennis.", translation: "- Tai įdomu! Aš myliu tenisą." }
      ],
      points: [
        "A/AN naudojame, kai kalbame apie profesiją (I am A programmer).",
        "THE – kai kalbame apie konkretų, jau žinomą daiktą (The computer is new).",
        "Profesijoms kurti naudojame: -er (teacher), -or (doctor), -ist (artist)."
      ],
      tprsStory: [
        {
          id: "s4_1",
          text: "Juozas is a programmer. He lives in Lithuania but he wants to go to Italy.",
          translation: "Juozas yra programuotojas. Jis gyvena Lietuvoje, bet nori vykti į Italiją.",
          check: {
            question: "Kas Juozas yra pagal profesiją?",
            choices: ["A programmer", "A teacher"],
            answer: "A programmer"
          }
        }
      ],
      syntheticSimulations: [
        {
          id: "sim4_1",
          title: "Apie profesijas",
          steps: [
            { speaker: "teacher", text: "What is your profession, Juozas?", translation: "Kokia tavo profesija, Juozai?" },
            { speaker: "juozas", text: "I am a programmer.", translation: "Aš esu programuotojas." },
            { speaker: "jonas", text: "And I am a tennis player!", translation: "O aš esu teniso žaidėjas!" },
            { speaker: "teacher", text: "Don't forget the article 'A'. I am A programmer.", translation: "Nepamirškite artikelio 'A'. I am A programmer." }
          ]
        }
      ]
    }
  },
  {
    id: 5,
    image: "/images/lessons/lesson_5.png",
    theory: {
      title: "5 Pamoka: Apibūdinimai ir Laikas",
      story: `Penktoji pamoka padės mums gražiau apibūdinti pasaulį. Išmoksime lyginti daiktus: kas yra greitesnis, o kas – pats gražiausias. 
      
      Taip pat suvaldysime laiko parametrus: yesterday (vakar), today (šiandien), tomorrow (rytoj) bei prielinksnius IN, ON ir AT.`,
      dialogue: [
        { speaker: "Emma", text: "- Is tennis better than football?", translation: "- Ar tenisas geriau už futbolą?" },
        { speaker: "Juozas", text: "- For me, tennis is the best sport. It is more interesting.", translation: "- Man tenisas yra geriausias sportas. Jis įdomesnis." },
        { speaker: "Emma", text: "- When will you go to Italy?", translation: "- Kada vyksi į Italiją?" },
        { speaker: "Juozas", text: "- I will go next week, on Monday at ten o'clock.", translation: "- Vyksiu kitą savaitę, pirmadienį dešimtą valandą." }
      ],
      points: [
        "Trumpiems žodžiams -ER (fast -> faster), ilgiems – žodį MORE (more beautiful).",
        "Laikas: In June (mėnesiai), On Monday (dienos), At 10:00 (valandos).",
        "Išimtys: Good -> Better -> The Best."
      ],
      tprsStory: [
        {
          id: "s5_1",
          text: "Rome is bigger than Vilnius. Juozas thinks Rome is the most beautiful city.",
          translation: "Roma yra didesnė už Vilnių. Juozas mano, kad Roma yra gražiausias miestas.",
          check: {
            question: "Kuris miestas pagal Juozą yra gražiausias?",
            choices: ["Rome", "Vilnius"],
            answer: "Rome"
          }
        }
      ],
      syntheticSimulations: [
        {
          id: "sim5_1",
          title: "Lyginimas",
          steps: [
            { speaker: "alisa", text: "Is coding harder than tennis?", translation: "Ar programuoti sunkiau nei žaisti tenisą?" },
            { speaker: "juozas", text: "Coding is more interesting, but tennis is more active.", translation: "Programavimas įdomiau, bet tenisas aktyviau." },
            { speaker: "teacher", text: "Good use of 'more'.", translation: "Geras 'more' panaudojimas." }
          ]
        }
      ]
    }
  },
  {
    id: 6,
    image: "/images/lessons/lesson_6.png",
    theory: {
      title: "6 Pamoka: Kiekis ir Parametrai",
      story: `Šeštoji pamoka skirta skaičiavimui ir neapibrėžtumui. Išmoksime skirti MUCH (daug neskaičiuojamiems, pvz., vanduo, laikas) ir MANY (daug skaičiuojamiems, pvz., žmonės, teniso kamuoliukai). 
      
      Taip pat susipažinsime su universalia „Parametrų lentele“, kuri leis pasakyti: visi (everyone), kažkas (someone), niekas (no one) ir visur (everywhere).`,
      dialogue: [
        { speaker: "John", text: "- Do you have much time for tennis today?", translation: "- Ar turi daug laiko tenisui šiandien?" },
        { speaker: "Juozas", text: "- No, I have very little time. I have many programs to write.", translation: "- Ne, turiu labai mažai laiko. Turiu daug programų parašyti." },
        { speaker: "John", text: "- Does anybody know the secret of your code?", translation: "- Ar kas nors žino tavo kodo paslaptį?" },
        { speaker: "Juozas", text: "- No, nobody knows anything. It is a very complex project.", translation: "- Ne, niekas nieko nežino. Tai labai sudėtingas projektas." }
      ],
      points: [
        "Uncountable (time, money) -> Much/Little. Countable (days, people) -> Many/Few.",
        "Anglų kalboje dvigubas neiginys nenaudojamas: I know nothing (Niekio nežinau).",
        "Body/One – žmonėms, Thing – daiktams, Where – vietoms."
      ],
      tprsStory: [
        {
          id: "s6_1",
          text: "Juozas sees many tennis players in Rome. But he has little time to play.",
          translation: "Juozas mato daug teniso žaidėjų Romoje. Bet jis turi mažai laiko žaisti.",
          check: {
            question: "Kurią formą naudojame LAIKUI (time)?",
            choices: ["Much/Little", "Many/Few"],
            answer: "Much/Little"
          }
        }
      ],
      syntheticSimulations: [
        {
          id: "sim6_1",
          title: "Kiekis",
          steps: [
            { speaker: "teacher", text: "Juozas, how many computers do you have?", translation: "Juozai, kiek kompiuterių turi?" },
            { speaker: "juozas", text: "I have many computers.", translation: "Turiu daug kompiuterių." },
            { speaker: "teacher", text: "And how much money do you spend on tennis?", translation: "O kiek pinigų išleidi tenisui?" },
            { speaker: "juozas", text: "Too much!", translation: "Per daug!" }
          ]
        }
      ]
    }
  },
  {
    id: 7,
    image: "/images/lessons/lesson_7.png",
    theory: {
      title: "7 Pamoka: Liepiamoji nuosaka ir Etiketas",
      story: `Šiandien išmoksime duoti nurodymus ir mandagiai bendrauti. Liepiamoji nuosaka anglų kalboje yra pati paprasčiausia – tiesiog veiksmažodis be jokių galūnių: Come! (Ateik!), Speak! (Kalbėk!). 
      
      Taip pat sužinosime, kaip mandagiai ko nors paprašyti naudojant „Could you...“ ir kaip neįžeisti pašnekovo.`,
      dialogue: [
        { speaker: "Petrovas", text: "- Juozas, tell us about your project, please.", translation: "- Juozai, papasakok mums apie savo projektą, prašau." },
        { speaker: "Juozas", text: "- Okay. Listen to me. It is a platform for language learning.", translation: "- Gerai. Paklausykite manęs. Tai platforma kalbų mokymuisi." },
        { speaker: "Petrovas", text: "- Don't speak too fast! We want to understand.", translation: "- Nekalbėk per greitai! Mes norime suprasti." },
        { speaker: "Juozas", text: "- Sorry. Open the website and look at the design.", translation: "- Atsiprašau. Atidarykite svetainę ir pažiūrėkite į dizainą." }
      ],
      points: [
        "Liepiamoji nuosaka: Veiksmažodis be 'to' (Go! Stop!).",
        "Draudimas: Don't + veiksmažodis (Don't go!).",
        "Mandagumas: Please, Thank you, Could you help me?"
      ],
      tprsStory: [
        {
          id: "s7_1",
          text: "Domantas went to the bank. He saw a beautiful woman there.",
          translation: "Domantas nuėjo į banką. Jis ten pamatė gražią moterį.",
          check: {
            question: "Kokia žodžio GO praeities forma?",
            choices: ["Went", "Goed"],
            answer: "Went"
          }
        },
        {
          id: "s7_2",
          text: "She came to him and said: 'I know you!'. Domantas was surprised.",
          translation: "Ji priėjo (atėjo) prie jo ir pasakė: 'Aš tave pažįstu!'. Domantas nustebo.",
          check: {
            question: "Kiek netaisyklingų veiksmažodžių yra sakinyje?",
            choices: ["2 (came, said)", "1 (came)"],
            answer: "2 (came, said)"
          }
        }
      ],
      syntheticSimulations: [
        {
          id: "sim7_1",
          title: "Mandagumas klasėje",
          steps: [
            { speaker: "teacher", text: "Juozas, ask Jonas to open the window.", translation: "Juozai, paprašyk Jono atidaryti langą." },
            { speaker: "juozas", text: "Jonas, please open the window.", translation: "Jonai, prašau, atidaryk langą." },
            { speaker: "jonas", text: "Of course. Here you are.", translation: "Žinoma. Prašom." },
            { speaker: "juozas", text: "Thank you very much.", translation: "Labai ačiū." }
          ]
        }
      ]
    }
  },
  {
    id: 8,
    image: "/images/lessons/lesson_8.png",
    theory: {
      title: "8 Pamoka: Vietos prielinksniai ir Fraziniai veiksmažodžiai",
      story: `Aštuntoji pamoka skirta orientacijai erdvėje. Išmoksime tiksliai nurodyti, kur yra daiktai (Under, Behind, Between) ir susipažinsime su anglų kalbos fenomenu – fraziniais veiksmažodžiais. 
      
      Frazinis veiksmažodis – tai veiksmažodis + prielinksnis, kuris kartu įgauna naują prasmę. Pavyzdžiui: LOOK (žiūrėti), bet LOOK FOR (ieškoti). Išmoksime bazinius: get up (atsikelti), sit down (atsisėsti), come in (užeiti).`,
      dialogue: [
        { speaker: "Adamas", text: "- Juozas, what are you looking for?", translation: "- Juozai, ko tu ieškai?" },
        { speaker: "Juozas", text: "- I am looking for my tennis racket. It was behind the door.", translation: "- Ieškau savo teniso raketės. Ji buvo už durų." },
        { speaker: "Adamas", text: "- Look under the table. Is it there?", translation: "- Pažiūrėk po stalu. Ar ji ten?" },
        { speaker: "Juozas", text: "- Yes! Thank you. Now I must get up and go to the club.", translation: "- Taip! Ačiū. Dabar turiu atsikelti ir eiti į klubą." }
      ],
      points: [
        "Vietos: In (viduje), On (ant), Under (po), Behind (už).",
        "Fraziniai: Go on (tęsti), Come back (grįžti), Wake up (pabusti).",
        "Prielinksnis visiškai pakeičia veiksmo prasmę."
      ],
      tprsStory: [
        {
          id: "s8_1",
          text: "Juozas lives in a house between the park and the station. He always wakes up at 7 o'clock.",
          translation: "Juozas gyvena name tarp parko ir stoties. Jis visada pabunda 7 valandą.",
          check: {
            question: "Ką reiškia 'wake up'?",
            choices: ["Pabusti", "Eiti miegoti"],
            answer: "Pabusti"
          }
        }
      ],
      syntheticSimulations: [
        {
          id: "sim8_1",
          title: "Orientacija erdvėje",
          steps: [
            { speaker: "teacher", text: "Juozas, where is your tennis racket?", translation: "Juozai, kur yra tavo teniso raketė?" },
            { speaker: "juozas", text: "It is in the corner, behind the door.", translation: "Ji kampu (kampe), už durų." },
            { speaker: "teacher", text: "And where is your computer?", translation: "O kur tavo kompiuteris?" },
            { speaker: "juozas", text: "It is on the table, under the lamp.", translation: "Ant stalo, po lempa." }
          ]
        }
      ]
    }
  },
  {
    id: 9,
    image: "/images/lessons/lesson_9.png",
    theory: {
      title: "9 Pamoka: Sangrąžiniai įvardžiai (Myself, Yourself)",
      story: `Sangrąžiniai įvardžiai rodo, kad veiksmas grįžta pas patį veikėją. Lietuviškai tai dažnai atitinka galūnę -SI (moky-si-u) arba žodį „save“.
      
      Jie naudojami pabrėžti, kad žmogus kažką padarė PATS arba sau. Juozai, programuojant dažnai sakome 'The code is working by itself' (Kodas veikia pats savaime).`,
      dialogue: [
        { speaker: "Petrovas", text: "- Did you fix the bug yourself, Juozas?", translation: "- Ar pats pataisei klaidą, Juozai?" },
        { speaker: "Juozas", text: "- Yes, I did it myself. I am proud of myself.", translation: "- Taip, padariau tai pats. Didžiuojuosi savimi." },
        { speaker: "Petrovas", text: "- Jonas, Alisa, can you do it yourself too?", translation: "- Jonai, Alisa, ar ir jūs galite tai padaryti patys?" },
        { speaker: "Alisa", text: "- Yes, we can do many things ourselves.", translation: "- Taip, mes galime daug dalykų padaryti patys." }
      ],
      points: [
        "Vienaskaita: Myself, Yourself, Himself, Herself, Itself.",
        "Daugiskaita: Ourselves, Yourselves, Themselves.",
        "Naudojama sakant 'pats' arba 'save'."
      ],
      tprsStory: [
        {
          id: "s9_1",
          text: "Juozas teaches himself how to play tennis. He bought a racket for himself.",
          translation: "Juozas pats mokosi žaisti tenisą. Jis nusipirko raketę sau.",
          check: {
            question: "Kuris žodis reiškia 'savarankiškai/pats' (vns.)?",
            choices: ["Myself", "Ourselves"],
            answer: "Myself"
          }
        },
        {
          id: "s9_2",
          text: "He is proud of himself.",
          translation: "Jis didžiuojasi savimi.",
          check: {
            question: "Ką reiškia 'pats save (jis)'?",
            choices: ["Himself", "Myself"],
            answer: "Himself"
          }
        },
        {
          id: "s9_3",
          text: "We went to the office and did everything ourselves.",
          translation: "Mes nuėjome į biurą ir viską padarėme patys.",
          check: {
            question: "Kokia daugiskaitos galūnė šiems žodžiams?",
            choices: ["-selves", "-self"],
            answer: "-selves"
          }
        }
      ],
      syntheticSimulations: [
        {
          id: "sim9_1",
          title: "Savarankiškumas programuojant",
          steps: [
            { speaker: "teacher", text: "Juozas, did your team help you with the app?", translation: "Juozai, ar komanda tau padėjo su programėle?" },
            { speaker: "juozas", text: "No, I built it myself.", translation: "Ne, sukūriau ją pats." },
            { speaker: "teacher", text: "Wow, Jonas, what do you think?", translation: "Oho, Jonai, ką manai?" },
            { speaker: "jonas", text: "I think Juozas can do everything himself!", translation: "Manau, Juozas viską gali padaryti pats!" }
          ]
        }
      ]
    }
  },
  {
    id: 10,
    image: "/images/lessons/lesson_10.png",
    theory: {
      title: "10 Pamoka: Laisvas bendravimas (Juozas, Tenisas ir Italija)",
      story: `Sveikiname pasiekus dešimtąją pamoką! Šiandien mes nesimokysime naujos gramatikos. Šiandienos tikslas – sujungti viską, ką jau mokame, į vieną pasakojimą. 
      
      Mes kalbėsime apie tave, Juozai. Apie tavo darbus Lietuvoje, apie tavo aistrą tenisui ir apie tavo svajonę dažniau lankytis Italijoje. Tai „Laisvojo skrydžio“ pamoka.`,
      dialogue: [
        { speaker: "Petrovas", text: "- Juozas, tell us about your typical day. What do you do?", translation: "- Juozai, papasakok apie savo įprastą dieną. Ką veiki?" },
        { speaker: "Juozas", text: "- I work as a programmer from 9 to 5. After work, I usually go to the tennis club.", translation: "- Dirbu programuotoju nuo 9 iki 5. Po darbo paprastai einu į teniso klubą." },
        { speaker: "Petrovas", text: "- Do you play tennis in Italy too?", translation: "- Ar Italijoje irgi žaidi tenisą?" },
        { speaker: "Juozas", text: "- Yes, I love playing tennis in Rome. It is very beautiful there.", translation: "- Taip, dievinu žaisti tenisą Romoje. Ten labai gražu." }
      ],
      points: [
        "Sujunkite 3x3 matricą su naujais žodžiais.",
        "Naudokite 'usually' (paprastai) ir 'after' (po).",
        "Nebijokite klysti – svarbiausia yra pasakoti istoriją."
      ],
      tprsStory: [
        {
          id: "s10_1",
          text: "Juozas is a programmer from Lithuania. He loves tennis and Italy very much.",
          translation: "Juozas yra programuotojas iš Lietuvos. Jis labai myli tenisą ir Italiją.",
          check: {
            question: "Ką Juozas veikia po darbo?",
            choices: ["Plays tennis", "Goes to sleep"],
            answer: "Plays tennis"
          }
        }
      ],
      syntheticSimulations: []
    }
  },
  {
    id: 11,
    image: "/images/lessons/lesson_11.png",
    theory: {
      title: "11 Pamoka: Eiga (Continuous Tenses)",
      story: `Iki šiol mokėmės apie faktus („Aš dirbu“). Šiandien išmoksime kalbėti apie tai, kas vyksta DABAR, šią akimirką. Tai vadinamasis Continuous laikas. 
      
      Formulė: To Be (am/is/are) + veiksmažodis su galūne -ING. Pavyzdžiui: 'I am playing tennis now' (Aš žaidžiu tenisą dabar).`,
      dialogue: [
        { speaker: "Adamas", text: "- What are you doing now, Juozas?", translation: "- Ką veiki dabar, Juozai?" },
        { speaker: "Juozas", text: "- I am coding. I am building a new application.", translation: "- Programuoju. Kuriu naują programėlę." },
        { speaker: "Adamas", text: "- Is Alisa helping you?", translation: "- Ar Alisa tau padeda (dabar)?" },
        { speaker: "Juozas", text: "- No, she is playing tennis with Jonas.", translation: "- Ne, ji žaidžia tenisą su Jonu." }
      ],
      points: [
        "Dabartis: am/is/are + -ING.",
        "Praeitis: was/were + -ING (I was working).",
        "Naudojama pabrėžti proceso trukmę."
      ],
      tprsStory: [
        {
          id: "s11_1",
          text: "The window was broken by Domantas. Now the house is cold.",
          translation: "Langą išdaužė Domantas (Langas buvo išdaužtas Domanto). Dabar name šalta.",
          check: {
            question: "Kuo skiriasi praeitis šiame laike?",
            choices: ["Was/Were + ing", "Did + verb"],
            answer: "Was/Were + ing"
          }
        }
      ],
      syntheticSimulations: [
        {
          id: "sim11_1",
          title: "Dabarties veiksmas klasėje",
          steps: [
            { speaker: "teacher", text: "Juozas, what are you doing right now?", translation: "Juozai, ką veiki būtent dabar?" },
            { speaker: "juozas", text: "I am speaking English with you.", translation: "Aš kalbu angliškai su jumis." },
            { speaker: "teacher", text: "Exactly. Jonas, what is Alisa doing?", translation: "Tiksliai. Jonai, ką veikia Alisa?" },
            { speaker: "jonas", text: "She is listening to you.", translation: "Ji jūsų klauso." },
            { speaker: "teacher", text: "Excellent. Are we all learning?", translation: "Puiku. Ar mes visi mokomės?" },
            { speaker: "alisa", text: "Yes, we are all learning very fast!", translation: "Taip, mes visi mokomės labai greitai!" }
          ]
        }
      ]
    }
  },
  {
    id: 12,
    image: "/images/lessons/lesson_12.png",
    theory: {
      title: "12 Pamoka: Skaitvardžiai, Laikas ir Datos",
      story: `Skaičiai ir laiko nuorodos padeda mums konkrečiai planuoti. Išmoksime pasakyti ne tik kiek, bet ir kada: Prieš savaitę (A week ago), Po dviejų dienų (In two days). 
      
      Juozai, tai padės tau susitarti dėl teniso mačo laiko arba skrydžio į Italiją datos. Išmoksime skirti 'Since' (nuo) ir 'For' (tarpą).`,
      dialogue: [
        { speaker: "Adamas", text: "- How long will you stay in Italy?", translation: "- Kiek laiko būsi Italijoje?" },
        { speaker: "Juozas", text: "- I will stay for two weeks. I arrived two days ago.", translation: "- Būsiu dvi savaites. Atvykau prieš dvi dienas." },
        { speaker: "Adamas", text: "- Is your match at ten o'clock?", translation: "- Ar tavo mačas dešimtą valandą?" },
        { speaker: "Juozas", text: "- Yes, in ten minutes. I must go!", translation: "- Taip, po de�      syntheticSimulations: [
        {
          id: "sim12_1",
          title: "Planavimas laike",
          steps: [
            { speaker: "teacher", text: "Juozas, when is your next tennis match?", translation: "Juozai, kada tavo kitas teniso mačas?" },
            { speaker: "juozas", text: "It is in two days, at five o'clock.", translation: "Jis po dviejų dienų, penktą valandą." },
            { speaker: "teacher", text: "And when will you go to Italy?", translation: "O kada vyksi į Italiją?" },
            { speaker: "juozas", text: "I will go in three weeks.", translation: "Vyksiu po trijų savaičių." }
          ]
        }
      ]
    }
  },
  {
    id: 13,
    image: "/images/lessons/lesson_13.png",
    theory: {
      title: "13 Pamoka: Modaliniai veiksmažodžiai (Galiu, Turiu, Privalau)",
      story: `Modaliniai veiksmažodžiai (can, should, must) yra ypatingi „pagalbininkai“. Jie rodo galimybę, būtinybę ar rekomendaciją. 
      
      Svarbiausia taisyklė – po jų NIEKADA nenaudojame 'TO'. Sakome 'I can code' (ne 'I can TO code'). Jie nepriklausomi – jiems nereikia 'DO' klausimuose.`,
      dialogue: [
        { speaker: "Petrovas", text: "- Can you finish the program today, Juozas?", translation: "- Ar gali užbaigti programą šiandien, Juozai?" },
        { speaker: "Juozas", text: "- I should finish it, but I must go to the tennis court now.", translation: "- Turėčiau užbaigti, bet dabar privalau eiti į teniso aikštelę." },
        { speaker: "Petrovas", text: "- You could do it tomorrow morning.", translation: "- Galėtum tai padaryti rytoj ryte." },
        { speaker: "Juozas", text: "- I can, but I must work fast.", translation: "- Galiu, bet privalau dirbti greitai." }
      ],
      points: [
        "Can -> Galiu, Should -> Turėčiau, Must -> Privalau.",
        "Po modalinių veiksmažodžių nenaudokite 'TO'.",
        "Klausimas: Can you help? (ne Do you can)."
      ],
      tprsStory: [
        {
          id: "s13_1",
          text: "Juozas can speak English. He must practice to be the best.",
          translation: "Juozas gali kalbėti angliškai. Jis privalo praktikuotis, kad būtų geriausias.",
          check: {
            question: "Kuris žodis reiškia 'turėčiau'?",
            choices: ["Should", "Must"],
            answer: "Should"
          }
        }
      ],
      syntheticSimulations: [
        {
          id: "sim13_1",
          title: "Galimybės ir prievolės",
          steps: [
            { speaker: "teacher", text: "Juozas, can you program in Python?", translation: "Juozai, ar gali programuoti Python'u?" },
            { speaker: "juozas", text: "Yes, I can, but I must learn more libraries.", translation: "Taip, galiu, bet privalau išmokti daugiau bibliotekų." },
            { speaker: "alisa", text: "Juozas should teach us how to code!", translation: "Juozas turėtų mus išmokyti programuoti!" },
            { speaker: "juozas", text: "I can try, but you must be patient.", translation: "Galiu pabandyti, bet turite būti kantrūs." }
          ]
        }
      ]
    }
  },
  {
    id: 14,
    image: "/images/lessons/lesson_14.png",
    theory: {
      title: "14 Pamoka: Sąlygos (Conditionals - IF)",
      story: `Šiandien išmoksime kalbėti apie ateities planus, kurie priklauso nuo sąlygos. 'Jei bus saulėta, žaisiu tenisą'. 
      
      Angliškai tai vadiname First Conditional. Svarbi taisyklė: dalyje su IF nenaudojame WILL, net jei kalbame apie ateitį. Sakome: 'If it RAINS' (jei lyti), o ne 'If it will rain'.`,
      dialogue: [
        { speaker: "Alisa", text: "- If you go to Italy, will you visit Rome?", translation: "- Jei vyksi į Italiją, ar aplankysi Romą?" },
        { speaker: "Juozas", text: "- Yes, if I have time, I will go to the Colosseum.", translation: "- Taip, jei turėsiu laiko, nueisiu į Koliziejų." },
        { speaker: "Alisa", text: "- What will you do if it rains tomorrow?", translation: "- Ką veiksi, jei rytoj lis?" },
        { speaker: "Juozas", text: "- If it rains, I will stay home and code.", translation: "- Jei lis, liksiu namuose ir programuosiu." }
      ],
      points: [
        "Struktūra: If + Present, Will + Verb.",
        "Po IF nenaudokite WILL.",
        "I'll = I will."
      ],
      tprsStory: [
        {
          id: "s14_1",
          text: "If Juozas wins the match, he will be very happy.",
          translation: "Jei Juozas laimės mačą, jis bus labai laimingas.",
          check: {
            question: "Kokia forma naudojama po IF?",
            choices: ["Dabarties laikas", "Ateities laikas"],
            answer: "Dabarties laikas"
          }
        }
      ],
      syntheticSimulations: [
        {
          id: "sim14_1",
          title: "Ateities planai su IF",
          steps: [
            { speaker: "teacher", text: "Juozas, what will you do if your code has a bug?", translation: "Juozai, ką darysi, jei tavo kodas turės klaidą?" },
            { speaker: "juozas", text: "If it has a bug, I will fix it immediately.", translation: "Jei turės klaidą, pataisysiu ją nedelsiant." },
            { speaker: "jonas", text: "And if you win the tennis tournament?", translation: "O jei laimėsi teniso turnyrą?" },
            { speaker: "juozas", text: "If I win, I will go to Italy for a holiday!", translation: "Jei laimėsiu, vyksiu į Italiją atostogų!" }
          ]
        }
      ]
    }
  },
  {
    id: 15,
    image: "/images/lessons/lesson_15.png",
    theory: {
      title: "15 Pamoka: Čia yra... (There is / There are)",
      story: `Ši konstrukcija naudojama, kai norime pasakyti, kad kažkas kažkur tiesiog YRA. Lietuviškai tai dažnai pradedame vietos nurodymu: 'Kambaryje yra stalas'. 
      
      Angliškai pradedame 'There is a table in the room'. Jei daiktas vienas – 'There is', jei daug – 'There are'.`,
      dialogue: [
        { speaker: "Jonas", text: "- Is there a gym in this hotel?", translation: "- Ar šiame viešbutyje yra sporto salė?" },
        { speaker: "Juozas", text: "- No, there isn't. But there are two tennis courts nearby.", translation: "- Ne, nėra. Bet šalia yra du teniso aikštynai." },
        { speaker: "Jonas", text: "- Are there many people there now?", translation: "- Ar ten dabar yra daug žmonių?" },
        { speaker: "Juozas", text: "- I don't know, let's see.", translation: "- Nežinau, einam pažiūrėti." }
      ],
      points: [
        "Vienaskaita: There is. Daugiskaita: There are.",
        "Klausimas: Is there / Are there?",
        "Neiginys: There isn't / There aren't."
      ],
      tprsStory: [
        {
          id: "s15_1",
          text: "There is a big computer on the table. There are many bugs in the code.",
          translation: "Ant stalo yra didelis kompiuteris. Kode yra daug klaidų.",
          check: {
            question: "Kada naudojame 'There is'?",
            choices: ["Vieno daikto buvimui", "Daug daiktų buvimui"],
            answer: "Vieno daikto buvimui"
          }
        }
      ],
      syntheticSimulations: [
        {
          id: "sim15_1",
          title: "Daiktų ir vietų aprašymas",
          steps: [
            { speaker: "teacher", text: "Juozas, is there a project on your desk?", translation: "Juozai, ar ant tavo stalo yra projektas?" },
            { speaker: "juozas", text: "Yes, there is a new app design.", translation: "Taip, ten yra naujas programėlės dizainas." },
            { speaker: "teacher", text: "Are there many students in Italy?", translation: "Ar Italijoje yra daug studentų?" },
            { speaker: "juozas", text: "Yes, there are many people learning languages there.", translation: "Taip, ten daug žmonių mokosi kalbų." }
          ]
        }
      ]
    }
  },
  {
    id: 16,
    image: "/images/lessons/lesson_16.png",
    theory: {
      title: "16 Pamoka: Aktyvas vs Pasyvas (Veikiamoji ir Kentėjamoji rūšis)",
      story: `Sveikiname! Tai finalinė kurso pamoka. Šiandien išmoksime skirti, kai mes patys kažką darome (Active) ir kai veiksmas nukreiptas į mus (Passive). 
      
      Lietuviškai tai: „Aš parašiau programą“ (Active) ir „Programa parašyta“ (Passive). Formulė: To Be + 3-oji veiksmažodžio forma.`,
      dialogue: [
        { speaker: "Petrovas", text: "- Was this application created by you, Juozas?", translation: "- Ar ši programėlė buvo sukurta tavo, Juozai?" },
        { speaker: "Juozas", text: "- Yes, the code was written by me. I used JavaScript.", translation: "- Taip, kodas buvo parašytas mano. Naudojau JavaScript." },
        { speaker: "Petrovas", text: "- The match was won by Alisa yesterday.", translation: "- Šį mačą vakar laimėjo Alisa (Mačas buvo laimėtas Alisos)." },
        { speaker: "Juozas", text: "- She played very well.", translation: "- Ji žaidė labai gerai." }
      ],
      points: [
        "Active: Subject + Verb. Passive: Subject + BE + 3rd form.",
        "By -> nurodo veikėją (by Juozas).",
        "Dabartis: It is made. Praeitis: It was made. Ateitis: It will be made."
      ],
      tprsStory: [
        {
          id: "s16_1",
          text: "The tennis trophy was taken by Juozas. The course is finished!",
          translation: "Teniso taurę pasiėmė Juozas (Taurė buvo paimta Juozo). Kursas baigtas!",
          check: {
            question: "Ką reiškia konstrukcija pasyve?",
            choices: ["Kad veiksmas vyksta dabar", "Kad objektas patiria veiksmą"],
            answer: "Kad objektas patiria veiksmą"
          }
        }
      ],
      syntheticSimulations: [
        {
          id: "sim16_1",
          title: "Kurso pabaiga ir refleksija",
          steps: [
            { speaker: "teacher", text: "This course was finished by you, Juozas. How do you feel?", translation: "Šis kursas buvo užbaigtas tavo, Juozai. Kaip jautiesi?" },
            { speaker: "juozas", text: "I feel great. English is not a problem now.", translation: "Jaučiuosi puikiai. Anglų kalba dabar ne problema." },
            { speaker: "teacher", text: "You did a good job. Now go and speak with the world!", translation: "Atlikai gerą darbą. Dabar eik ir kalbėk su pasauliu!" },
            { speaker: "juozas", text: "Thank you for everything!", translation: "Ačiū už viską!" }
          ]
        }
      ]
    }
  }
];       }
      ],
      syntheticSimulations: []
    }
  }
];lked quickly to the station. He was very happy.",
          translation: "Domantas greitai nuėjo į stotį. Jis buvo labai laimingas.",
          check: {
            question: "Kuri galūnė padaro žodį 'greitai'?",
            choices: ["-ly", "-tion"],
            answer: "-ly"
          }
        },
        {
          id: "s15_2",
          text: "The worker gave him some useful information about the train.",
          translation: "Darbuotojas suteikė jam naudingos informacijos apie traukinį.",
          check: {
            question: "Kurią galūnę turi žodžiai 'informacija' ir 'naudingas'?",
            choices: ["-tion ir -ful", "-ly ir -ness"],
            answer: "-tion ir -ful"
          }
        }
      ]
    }
  }
];
