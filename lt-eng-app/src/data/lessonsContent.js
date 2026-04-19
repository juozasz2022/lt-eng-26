export const lessonsContent = [
    { id: 0,
    image: "/images/lessons/lesson_0.png",
    theory: {
      title: "0 Pamoka: LtEng_26 Filosofija",
      story: `Sveiki atvykę į „LtEng_26ā€ – jūsų greitąjį kelią į anglų kalbą. Šis kursas remiasi Dmitrijaus Petrovo „16 valandųā€ metodika. Kodėl tai veikia? Nes kalba yra 50% matematika (logika, karkasas) ir 50% psichologija (laisvė klysti).

Mūsų tikslas – ne išmokti tūkstančius žodžių, o įvaldyti pagrindinį algoritmą (3x3 matricą), kuris leis jums generuoti tūkstančius sakinių jau po kelių pamokų. Susipažinkite su kolegomis – Alisa, Jonu ir Domantu, kurie kartu su jumis (Juozai!) dalyvaus simuliacijose. Pasiruošę pradėti šitą kelionę į laisvą kalbėjimą? Let's go!`,
      dialogue: [
        { speaker: "Petrovas", text: "- Hello Juozas! Are you ready to speak English?", translation: "- Labas, Juozai! Ar esi pasiruošęs kalbėti angliškai?" },
        { speaker: "Juozas", text: "- Yes, I am ready! But I am a bit nervous.", translation: "- Taip, pasiruošęs! Bet šiek tiek jaudinuosi." },
        { speaker: "Petrovas", text: "- Don't worry. It is easy and fun.", translation: "- Nesijaudink. Tai lengva ir smagu." }
      ],
      points: [
        "Negalvok apie gramatiką kaip apie taisyklių rinkinį, galvok kaip apie navigaciją.",
        "Svarbiausia yra automatizmas – pagrindinės formos turi „išeitiā€ savaime.",
        "Klysti yra sveika. Klaidos yra jūsų progreso ženklas."
      ],
      pasakojimai: [
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
  { id: 1,
    image: "/images/lessons/lesson_1.png",
    theory: {
      title: "1 Pamoka: Pagrindinė veiksmažodžio matrica",
      story: `Sveiki atvykę į pirmąją anglų kalbos pamoką pagal Dmitrijaus Petrovo metodiką. Anglų kalba yra algoritmiška. Mūsų tikslas – sukurti „karkasąā€, kuriame galėsite laisvai judėti laike: Praeityje, Dabartyje ir Ateityje. 
      
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
      pasakojimai: [
          [
            {
              "text": "Juozas works in a big factory.",
              "translation": "Juozas dirba dideliame fabrike.",
              "check": {
                "question": "Kur dirba Juozas?",
                "choices": [
                  "In a factory",
                  "In a school"
                ],
                "answer": "In a factory"
              }
            },
            {
              "text": "A small cat lives in the factory.",
              "translation": "Mažas katinas gyvena fabrike.",
              "check": {
                "question": "Kas gyvena fabrike?",
                "choices": [
                  "A cat",
                  "A dog"
                ],
                "answer": "A cat"
              }
            },
            {
              "text": "The cat loves to close all the doors.",
              "translation": "Katinas mėgsta uždaryti visas duris.",
              "check": {
                "question": "Ką katinas mėgsta daryti?",
                "choices": [
                  "Close doors",
                  "Open windows"
                ],
                "answer": "Close doors"
              }
            },
            {
              "text": "Juozas cannot open the door! Oh no!",
              "translation": "Juozas negali atidaryti durų! O ne!",
              "check": {
                "question": "Ar Juozas gali atidaryti duris?",
                "choices": [
                  "Yes",
                  "No"
                ],
                "answer": "No"
              }
            }
          ],
          [
            {
              "text": "I love a small fish.",
              "translation": "Aš myliu mažą žuvį.",
              "check": {
                "question": "Ką aš myliu?",
                "choices": [
                  "A fish",
                  "A cat"
                ],
                "answer": "A fish"
              }
            },
            {
              "text": "The fish lives in the big sea.",
              "translation": "Å½uvis gyvena didelėje jūroje.",
              "check": {
                "question": "Kur gyvena žuvis?",
                "choices": [
                  "In the sea",
                  "In a house"
                ],
                "answer": "In the sea"
              }
            },
            {
              "text": "I work every day to see the fish.",
              "translation": "Aš dirbu kiekvieną dieną, kad pamatyčiau žuvį.",
              "check": {
                "question": "Kodėl aš dirbu?",
                "choices": [
                  "To see the fish",
                  "To buy a car"
                ],
                "answer": "To see the fish"
              }
            },
            {
              "text": "But the fish closes its eyes when I come!",
              "translation": "Bet žuvis užsimerkia (uždaro akis), kai aš ateinu!",
              "check": {
                "question": "Ką daro žuvis?",
                "choices": [
                  "Closes eyes",
                  "Opens mouth"
                ],
                "answer": "Closes eyes"
              }
            }
          ],
          [
            {
              "text": "You live in a big house.",
              "translation": "Tu gyveni dideliame name.",
              "check": {
                "question": "Kur tu gyveni?",
                "choices": [
                  "In a big house",
                  "In a small car"
                ],
                "answer": "In a big house"
              }
            },
            {
              "text": "I close the door, but it opens!",
              "translation": "Aš uždarau duris, bet jos atsidaro!",
              "check": {
                "question": "Ar durys lieka uždarytos?",
                "choices": [
                  "Yes",
                  "No"
                ],
                "answer": "No"
              }
            },
            {
              "text": "A small ghost loves your house.",
              "translation": "Mažas vaiduoklis myli tavo namą.",
              "check": {
                "question": "Kas myli namą?",
                "choices": [
                  "A ghost",
                  "A cat"
                ],
                "answer": "A ghost"
              }
            },
            {
              "text": "I do not work here anymore!",
              "translation": "Aš čia daugiau nedirbu!",
              "check": {
                "question": "Ar aš čia dar dirbu?",
                "choices": [
                  "Yes",
                  "No"
                ],
                "answer": "No"
              }
            }
          ]
        ],
      syntheticSimulations: [
        {
          id: "sim1_1",
          title: "Jono bandymas su 3-uoju asmeniu",
          steps: [
            { speaker: "teacher", text: "Jonai, pasakyk: 'Jis dirba čia kiekvieną dieną'.", translation: "Jonas, say: 'He works here every day'." },
            { speaker: "jonas", text: "He live here every day.", translation: "Jis čia gyvena kiekvieną dieną.", error: true, errorType: "verb_form" },
            { speaker: "teacher", text: "Alisa, ar girdi klaidą?", translation: "Alisa, do you hear a mistake?" },
            { speaker: "alisa", text: "Taip, Jonai. Kai kalbame apie JÄ® (He), turime pridėti -S. Teisingai bus: He works.", translation: "Yes, Jonas. When we talk about HE, we must add -S. The correct way is: He works." },
            { speaker: "teacher", text: "Juozai, ar Alisa teisingai pataisė Joną?", translation: "Juozas, did Alisa correctly correct Jonas?", interactiveCheck: true, answer: "Yes" }
          ]
        }
      ]
    }
  },
  { id: 2,
    image: "/images/lessons/lesson_2.png",
    theory: {
      title: "2 Pamoka: Ä®vardžiai ir Klausimai",
      story: `Šiandien plečiame bazinį karkasą. Išmoksime valdyti ne tik veiksmus, bet ir kryptį bei adresatus. 'Matau JÄ„', 'Padėk MUMS', 'Einame Ä® ten'.
      
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
      pasakojimai: [
          [
            {
              "text": "I am a robot.",
              "translation": "Aš esu robotas.",
              "check": {
                "question": "Kas aš esu?",
                "choices": [
                  "A robot",
                  "A human"
                ],
                "answer": "A robot"
              }
            },
            {
              "text": "You are a human.",
              "translation": "Tu esi žmogus.",
              "check": {
                "question": "Kas tu esi?",
                "choices": [
                  "A human",
                  "A cat"
                ],
                "answer": "A human"
              }
            },
            {
              "text": "We are in the big house.",
              "translation": "Mes esame dideliame name.",
              "check": {
                "question": "Kur mes esame?",
                "choices": [
                  "In a house",
                  "In a sea"
                ],
                "answer": "In a house"
              }
            },
            {
              "text": "They are cats on the moon!",
              "translation": "Jie yra katinai mėnulyje!",
              "check": {
                "question": "Kur yra katinai?",
                "choices": [
                  "On the moon",
                  "In the factory"
                ],
                "answer": "On the moon"
              }
            }
          ],
          [
            {
              "text": "It is a big burger.",
              "translation": "Tai didelis mėsainis.",
              "check": {
                "question": "Kas tai yra?",
                "choices": [
                  "A burger",
                  "A pizza"
                ],
                "answer": "A burger"
              }
            },
            {
              "text": "He is very happy.",
              "translation": "Jis yra labai laimingas.",
              "check": {
                "question": "Kaip jis jaučiasi?",
                "choices": [
                  "Happy",
                  "Sad"
                ],
                "answer": "Happy"
              }
            },
            {
              "text": "She is not happy.",
              "translation": "Ji nėra laiminga.",
              "check": {
                "question": "Ar ji laiminga?",
                "choices": [
                  "Yes",
                  "No"
                ],
                "answer": "No"
              }
            },
            {
              "text": "Why? It is her burger!",
              "translation": "Kodėl? Tai jos mėsainis!",
              "check": {
                "question": "Kieno tai mėsainis?",
                "choices": [
                  "Hers",
                  "His"
                ],
                "answer": "Hers"
              }
            }
          ],
          [
            {
              "text": "We are in Italy.",
              "translation": "Mes esame Italijoje.",
              "check": {
                "question": "Kur mes esame?",
                "choices": [
                  "Italy",
                  "Lithuania"
                ],
                "answer": "Italy"
              }
            },
            {
              "text": "Is it beautiful?",
              "translation": "Ar tai gražu?",
              "check": {
                "question": "Koks klausimas užduotas?",
                "choices": [
                  "Is it beautiful?",
                  "Is it big?"
                ],
                "answer": "Is it beautiful?"
              }
            },
            {
              "text": "Yes, it is.",
              "translation": "Taip, yra.",
              "check": {
                "question": "Ar atsakymas teigiamas?",
                "choices": [
                  "Yes",
                  "No"
                ],
                "answer": "Yes"
              }
            },
            {
              "text": "You are a programmer, but here you are a king!",
              "translation": "Tu esi programuotojas, bet čia tu esi karalius!",
              "check": {
                "question": "Kas tu esi Italijoje?",
                "choices": [
                  "A king",
                  "A worker"
                ],
                "answer": "A king"
              }
            }
          ]
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
  { id: 3,
    image: "/images/lessons/lesson_3.png",
    theory: {
      title: "3 Pamoka: Veiksmažodis „Būtiā€ (To Be)",
      story: `Trečioji pamoka skirta svarbiausiam anglų kalbos veiksmažodžiui – „būtiā€ (to be). Jis skiriasi nuo kitų veiksmažodžių ir turi savo atskirą 3x3 matricą. 
      
      Be „to beā€ negalime apibūdinti savęs, nurodyti vietos ar būsenos. Išmoksime pasakyti: Aš esu (I am), Tu esi (You are), Mes būsime (We will be).`,
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
      pasakojimai: [
          [
            {
              "text": "Where is my bag?",
              "translation": "Kur mano krepšys?",
              "check": {
                "question": "Ko ieškome?",
                "choices": [
                  "A bag",
                  "A fish"
                ],
                "answer": "A bag"
              }
            },
            {
              "text": "What is in the bag?",
              "translation": "Kas yra krepšyje?",
              "check": {
                "question": "Kas klausiama?",
                "choices": [
                  "What is inside?",
                  "Who is inside?"
                ],
                "answer": "What is inside?"
              }
            },
            {
              "text": "Why do you love the bag?",
              "translation": "Kodėl tu myli krepšį?",
              "check": {
                "question": "Ką tu myli?",
                "choices": [
                  "The bag",
                  "The cat"
                ],
                "answer": "The bag"
              }
            },
            {
              "text": "Because there is a small cat inside!",
              "translation": "Nes viduje yra mažas katinas!",
              "check": {
                "question": "Kas yra viduje?",
                "choices": [
                  "A cat",
                  "A burger"
                ],
                "answer": "A cat"
              }
            }
          ],
          [
            {
              "text": "Who is he?",
              "translation": "Kas jis?",
              "check": {
                "question": "Apie ką klausiama?",
                "choices": [
                  "About him",
                  "About her"
                ],
                "answer": "About him"
              }
            },
            {
              "text": "When does he come?",
              "translation": "Kada jis ateina?",
              "check": {
                "question": "Kada jis pasirodo?",
                "choices": [
                  "When",
                  "Where"
                ],
                "answer": "When"
              }
            },
            {
              "text": "How does he open the door?",
              "translation": "Kaip jis atidaro duris?",
              "check": {
                "question": "Koks būdas?",
                "choices": [
                  "How",
                  "Why"
                ],
                "answer": "How"
              }
            },
            {
              "text": "He is my teacher, but he is a ghost!",
              "translation": "Jis mano mokytojas, bet jis vaiduoklis!",
              "check": {
                "question": "Kas jis yra iš tiesų?",
                "choices": [
                  "A ghost",
                  "A robot"
                ],
                "answer": "A ghost"
              }
            }
          ],
          [
            {
              "text": "Why do you love Italy?",
              "translation": "Kodėl tu myli Italiją?",
              "check": {
                "question": "Kodėl meilė Italijai?",
                "choices": [
                  "Why",
                  "When"
                ],
                "answer": "Why"
              }
            },
            {
              "text": "What do you see there?",
              "translation": "Ką tu ten matai?",
              "check": {
                "question": "Ką matai?",
                "choices": [
                  "What",
                  "Who"
                ],
                "answer": "What"
              }
            },
            {
              "text": "Where is the big pizza?",
              "translation": "Kur didžioji pica?",
              "check": {
                "question": "Ko ieškome?",
                "choices": [
                  "Pizza",
                  "Burger"
                ],
                "answer": "Pizza"
              }
            },
            {
              "text": "It is in my house!",
              "translation": "Ji mano name!",
              "check": {
                "question": "Kur pica?",
                "choices": [
                  "In the house",
                  "In the sea"
                ],
                "answer": "In the house"
              }
            }
          ]
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
  { id: 4,
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
      pasakojimai: [
          [
            {
              "text": "He is a doctor in a big hospital.",
              "translation": "Jis gydytojas didelėje ligoninėje.",
              "check": {
                "question": "Kokia jo profesija dieną?",
                "choices": [
                  "Doctor",
                  "Actor"
                ],
                "answer": "Doctor"
              }
            },
            {
              "text": "But at night, he is an actor!",
              "translation": "Bet naktį jis aktorius!",
              "check": {
                "question": "Ką jis veikia naktį?",
                "choices": [
                  "Acts",
                  "Works in hospital"
                ],
                "answer": "Acts"
              }
            },
            {
              "text": "He works in the theater.",
              "translation": "Jis dirba teatre.",
              "check": {
                "question": "Kur jis vaidina?",
                "choices": [
                  "In the theater",
                  "At school"
                ],
                "answer": "In the theater"
              }
            },
            {
              "text": "His cat is the director.",
              "translation": "Jo katinas yra direktorius (režisierius).",
              "check": {
                "question": "Kas yra režisierius?",
                "choices": [
                  "A cat",
                  "A teacher"
                ],
                "answer": "A cat"
              }
            }
          ],
          [
            {
              "text": "I am a student at the school.",
              "translation": "Aš esu studentas mokykloje.",
              "check": {
                "question": "Kas aš esu?",
                "choices": [
                  "A student",
                  "A worker"
                ],
                "answer": "A student"
              }
            },
            {
              "text": "My teacher is a big dinosaur.",
              "translation": "Mano mokytojas yra didelis dinozauras.",
              "check": {
                "question": "Kas yra mokytojas?",
                "choices": [
                  "A dinosaur",
                  "A human"
                ],
                "answer": "A dinosaur"
              }
            },
            {
              "text": "We work hard every day.",
              "translation": "Mes sunkiai dirbame kiekvieną dieną.",
              "check": {
                "question": "Kaip mes dirbame?",
                "choices": [
                  "Hard",
                  "Not at all"
                ],
                "answer": "Hard"
              }
            },
            {
              "text": "But the dinosaur loves to eat my homework!",
              "translation": "Bet dinozauras mėgsta valgyti mano namų darbus!",
              "check": {
                "question": "Ką mėgsta dinozauras?",
                "choices": [
                  "Eat homework",
                  "Open doors"
                ],
                "answer": "Eat homework"
              }
            }
          ],
          [
            {
              "text": "She is a worker in the office.",
              "translation": "Ji darbuotoja ofise.",
              "check": {
                "question": "Kur ji dirba?",
                "choices": [
                  "In the office",
                  "In the theater"
                ],
                "answer": "In the office"
              }
            },
            {
              "text": "Does she work? No.",
              "translation": "Ar ji dirba? Ne.",
              "check": {
                "question": "Ar ji darbinga?",
                "choices": [
                  "Yes",
                  "No"
                ],
                "answer": "No"
              }
            },
            {
              "text": "She sees the birds in the sky.",
              "translation": "Ji mato paukščius danguje.",
              "check": {
                "question": "Ką ji stebi?",
                "choices": [
                  "Birds",
                  "Computers"
                ],
                "answer": "Birds"
              }
            },
            {
              "text": "Her job is to love the birds.",
              "translation": "Jos darbas yra mylėti paukščius.",
              "check": {
                "question": "Kokia jos tikroji veikla?",
                "choices": [
                  "Love birds",
                  "Close doors"
                ],
                "answer": "Love birds"
              }
            }
          ]
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
  { id: 5,
    image: "/images/lessons/lesson_5.png",
    theory: {
      title: "5 Pamoka: Apibūdinimai ir Laikas",
      story: `Penktoji pamoka padės mums gražiau apibūdinti pasaulį. Išmoksime lyginti daiktus: kas yra greitesnis, o kas – pats gražiausias. 
      Taip pat suvaldysime laiko tėkmę: sekundes, minutes ir valandas. Juozai, tai padės tau planuoti savo darbus ir teniso treniruotes.`,
      dialogue: [
        { speaker: "Alisa", text: "- Is your computer fast, Juozas?", translation: "- Ar tavo kompiuteris greitas, Juozai?" },
        { speaker: "Juozas", text: "- Yes, it is the fastest computer in the office.", translation: "- Taip, tai greičiausias kompiuteris ofise." },
        { speaker: "Alisa", text: "- And what about your tennis racket?", translation: "- O kaip tavo teniso raketė?" },
        { speaker: "Juozas", text: "- It is very light and strong. I love it.", translation: "- Ji labai lengva ir stipri. Dievinu ją." }
      ],
      points: [
        "Lyginimas: fast -> faster -> the fastest.",
        "Ilgi žodžiai: beautiful -> more beautiful -> the most beautiful.",
        "Laikas: Minute, Hour, Day, Week."
      ],
      pasakojimai: [
        [
          {
            id: "s5_1_1",
            text: "Juozas bought the most powerful computer in the galaxy.",
            translation: "Juozas nusipirko galingiausią kompiuterį galaktikoje.",
            check: {
              question: "Koks tai kompiuteris?",
              choices: ["The most powerful", "A very old one"],
              answer: "The most powerful"
            }
          },
          {
            id: "s5_1_2",
            text: "The computer was so fast, it finished his work yesterday.",
            translation: "Kompiuteris buvo toks greitas, kad jis baigė savo darbą vakar.",
            check: {
              question: "Kada jis baigė darbą?",
              choices: ["Today", "Yesterday"],
              answer: "Yesterday"
            }
          },
          {
            id: "s5_1_3",
            text: "But then the computer started crying because it was bored with humans.",
            translation: "Bet tada kompiuteris pradėjo verkti, nes jam pasidarė nuobodu su žmonėmis.",
            check: {
              question: "Kodėl kompiuteris verkė?",
              choices: ["It was bored", "It was broken"],
              answer: "It was bored"
            }
          },
          {
            id: "s5_1_4",
            text: "Now Juozas and the computer are watching cat videos and eating virtual pizza.",
            translation: "Dabar Juozas ir kompiuteris žiūri kačių vaizdo įrašus ir valgo virtualią picą.",
            check: {
              question: "Ką jie veikia?",
              choices: ["Working hard", "Watching cat videos"],
              answer: "Watching cat videos"
            }
          }
        ],
        [
          {
            id: "s5_2_1",
            text: "The tennis ball is yellow and faster than a rocket.",
            translation: "Teniso kamuoliukas yra geltonas ir greitesnis už raketą.",
            check: {
              question: "Koks yra kamuoliukas?",
              choices: ["Fast", "Slow"],
              answer: "Fast"
            }
          },
          {
            id: "s5_2_2",
            text: "Juozas hit the ball so hard it went to the future.",
            translation: "Juozas smūgiavo kamuoliuką taip stipriai, kad jis išskrido į ateitį.",
            check: {
              question: "Kur išskrido kamuoliukas?",
              choices: ["To the future", "To the sea"],
              answer: "To the future"
            }
          },
          {
            id: "s5_2_3",
            text: "The ball met a robot Jonas and played a match on Saturn.",
            translation: "Kamuoliukas sutiko robotą Joną ir sužaidė mačą Saturne.",
            check: {
              question: "Su kuo žaidė kamuoliukas?",
              choices: ["Robot Jonas", "A cat"],
              answer: "Robot Jonas"
            }
          },
          {
            id: "s5_2_4",
            text: "Juozas won a golden banana for the best hit in history.",
            translation: "Juozas laimėjo auksinį bananą už geriausią smūgį istorijoje.",
            check: {
              question: "Ką Juozas laimėjo?",
              choices: ["A golden banana", "A medal"],
              answer: "A golden banana"
            }
          }
        ],
        [
          {
            id: "s5_3_1",
            text: "Next year, I will go to Rome with a flying gondola.",
            translation: "Kitais metais vyksiu į Romą su skraidančia gondola.",
            check: {
              question: "Kaip vyksiu į Romą?",
              choices: ["Flying gondola", "By bus"],
              answer: "Flying gondola"
            }
          },
          {
            id: "s5_3_2",
            text: "I will eat a pizza that is bigger than the Colosseum.",
            translation: "Valgysiu picą, kuri yra didesnė už Koliziejų.",
            check: {
              question: "Kokia tai pica?",
              choices: ["Small", "Bigger than Colosseum"],
              answer: "Bigger than Colosseum"
            }
          },
          {
            id: "s5_3_3",
            text: "The pizza will grow legs and walk to the Vatican to see the Pope.",
            translation: "Pica užsiaugins kojas ir nueis į Vatikaną pasimatyti su Popiežiumi.",
            check: {
              question: "Ką padarys pica?",
              choices: ["Grow legs", "Fly away"],
              answer: "Grow legs"
            }
          },
          {
            id: "s5_3_4",
            text: "The Pope will bless the pizza, and it will become a national monument.",
            translation: "Popiežius palaimins picą ir ji taps nacionaliniu paminklu.",
            check: {
              question: "Kuo taps pica?",
              choices: ["National monument", "A snack"],
              answer: "National monument"
            }
          }
        ]
      ],
      syntheticSimulations: [
        {
          id: "sim5_1",
          title: "Lyginimas ir vertinimas",
          steps: [
            { speaker: "teacher", text: "Juozas, compare your current app to the previous one.", translation: "Juozai, palygink savo dabar programėlę su ankstesne." },
            { speaker: "juozas", text: "The current app is much better and faster.", translation: "Dabartinė programėlė yra daug geresnė ir greitesnė." },
            { speaker: "jonas", text: "But is it more beautiful?", translation: "Bet ar ji gražesnė?" },
            { speaker: "juozas", text: "Yes, it is the most beautiful app I ever built.", translation: "Taip, tai gražiausia programėlė, kokią esu sukūręs." }
          ]
        }
      ]
    }
  },
  { id: 6,
    image: "/images/lessons/lesson_6.png",
    theory: {
      title: "6 Pamoka: Klausimai ir Praeitis",
      story: `Šiandien nersime į praeitį. Praeities laikas (Past Simple) leidžia mums pasakoti istorijas apie tai, kas jau įvyko.
      Svarbiausias pagalbininkas čia yra žodelis 'DID'. Jis „pavagia“ praeities laiką iš veiksmažodžio klausimuose ir neiginiuose.`,
      dialogue: [
        { speaker: "Jonas", text: "- Did you finish the project yesterday?", translation: "- Ar baigei projektą vakar?" },
        { speaker: "Juozas", text: "- Yes, I finished it late at night. I was very tired.", translation: "- Taip, baigiau vėlai naktį. Buvau labai pavargęs." },
        { speaker: "Jonas", text: "- Did you see the match?", translation: "- Ar matei mačą?" },
        { speaker: "Juozas", text: "- No, I didn't see it. I worked.", translation: "- Ne, nemačiau. Dirbau." }
      ],
      points: [
        "Teiginys: Pridedame galūnę -ED (I worked).",
        "Klausimas: Naudojame 'Did' (Did you work?).",
        "Neiginys: Naudojame 'Didn't' (I didn't work)."
      ],
      pasakojimai: [
        [
          {
            id: "s6_1_1",
            text: "I fixed the bug in the code yesterday.",
            translation: "Vakar pataisiau klaidą kode.",
            check: { question: "Kada pataisiau klaidą?", choices: ["Yesterday", "Today"], answer: "Yesterday" }
          },
          {
            id: "s6_1_2",
            text: "The bug was actually my reflection in the monitor.",
            translation: "Klaida tikrovėje buvo mano atspindys monitoriuje.",
            check: { question: "Kas buvo klaida?", choices: ["Reflection", "A spider"], answer: "Reflection" }
          },
          {
            id: "s6_1_3",
            text: "It told me that the code is alive and hungry.",
            translation: "Jis man pasakė, kad kodas yra gyvas ir alkanas.",
            check: { question: "Ar kodas alkanas?", choices: ["Yes", "No"], answer: "Yes" }
          },
          {
            id: "s6_1_4",
            text: "I fed the code my lunch, and now it works perfectly.",
            translation: "Pamaitinau kodą savo pietumis ir dabar jis veikia puikiai.",
            check: { question: "Kuo pamaitinau kodą?", choices: ["Lunch", "Electricity"], answer: "Lunch" }
          }
        ],
        [
          {
            id: "s6_2_1",
            text: "Did you play tennis with a cat last Sunday?",
            translation: "Ar žaidei tenisą su katinu praėjusį sekmadienį?",
            check: { question: "Su kuo žaidei?", choices: ["A cat", "A dog"], answer: "A cat" }
          },
          {
            id: "s6_2_2",
            text: "Yes, the cat was the referee and it was very strict.",
            translation: "Taip, katinas buvo teisėjas ir jis buvo labai griežtas.",
            check: { question: "Koks buvo katinas?", choices: ["Strict", "Friendly"], answer: "Strict" }
          },
          {
            id: "s6_2_3",
            text: "It used its tail to hit the ball and it won the match.",
            translation: "Jis naudojo uodegą kamuoliuko smūgiavimui ir laimėjo mačą.",
            check: { question: "Ką naudojo katinas?", choices: ["Tail", "Racket"], answer: "Tail" }
          },
          {
            id: "s6_2_4",
            text: "Now I must give the cat my favorite racket and some fish.",
            translation: "Dabar turiu atiduoti katinui savo mėgstamiausią raketę ir šiek tiek žuvies.",
            check: { question: "Ką Juozas turi atiduoti?", choices: ["Racket and fish", "Milk"], answer: "Racket and fish" }
          }
        ],
        [
          {
            id: "s6_3_1",
            text: "We visited a museum in Florence last year.",
            translation: "Praėjusiais metais aplankėme muziejų Florencijoje.",
            check: { question: "Kada aplankėme?", choices: ["Last year", "Last month"], answer: "Last year" }
          },
          {
            id: "s6_3_2",
            text: "The statues were so realistic, they asked me for a cigarette.",
            translation: "Statulos buvo tokios realistiškos, kad paprašė manęs cigaretės.",
            check: { question: "Ko paprašė statulos?", choices: ["Cigarette", "Water"], answer: "Cigarette" }
          },
          {
            id: "s6_3_3",
            text: "One statue told me it was a tourist who stayed too long.",
            translation: "Viena statula man pasakė, kad ji buvo turistas, kuris pasiliko per ilgai.",
            check: { question: "Kas buvo statula?", choices: ["A tourist", "A rock"], answer: "A tourist" }
          },
          {
            id: "s6_3_4",
            text: "Now I am afraid to stand still in Italy for more than a minute.",
            translation: "Dabar bijau Italijoje ramiai stovėti ilgiau nei minutę.",
            check: { question: "Kodėl Juozas bijo?", choices: ["Might become a statue", "Too hot"], answer: "Might become a statue" }
          }
        ]
      ],
      syntheticSimulations: [
        {
          id: "sim6_1",
          title: "Praeities įvykiai",
          steps: [
            { speaker: "teacher", text: "Juozas, what did you do on your last holiday?", translation: "Juozai, ką veikei per savo paskutines atostogas?" },
            { speaker: "juozas", text: "I went to Italy and played tennis every day.", translation: "Vykau į Italiją ir žaidžiau tenisą kiekvieną dieną." },
            { speaker: "teacher", text: "Did you enjoy the food there?", translation: "Ar mėgavaisi maistu ten?" },
            { speaker: "juozas", text: "Yes, the pizza was fantastic!", translation: "Taip, pica buvo fantastiška!" }
          ]
        }
      ]
    }
  },
  { id: 7,
    image: "/images/lessons/lesson_7.png",
    theory: {
      title: "7 Pamoka: Ateitis",
      story: `Ateitis priklauso tiems, kurie moka pasakyti 'WILL'. Tai lengviausias anglų kalbos laikas, nes viskas, ko jums reikia – pridėti 'will' prieš veiksmažodį.`,
      dialogue: [
        { speaker: "Alisa", text: "- Will you go to the meeting tomorrow?", translation: "- Ar eisi į susitikimą rytoj?" },
        { speaker: "Juozas", text: "- No, I won't go. I will work from home.", translation: "- Ne, neisiu. Dirbsiu iš namų." },
        { speaker: "Alisa", text: "- Won't it be boring?", translation: "- Ar nebus nuobodu?" },
        { speaker: "Juozas", text: "- No, I will listen to music and code.", translation: "- Ne, klausysiu muzikos ir programuosiu." }
      ],
      points: [
        "Teiginys: will + verb (I will go).",
        "Neiginys: won't (I won't go).",
        "Klausimas: Will you...? (Will you go?)."
      ],
      pasakojimai: [
        [
          {
            id: "s7_1_1",
            text: "Tomorrow the AI will write all my code.",
            translation: "Rytoj DI parašys visą mano kodą.",
            check: { question: "Kas rašys kodą?", choices: ["AI", "Juozas"], answer: "AI" }
          },
          {
            id: "s7_1_2",
            text: "I will sit on the beach and the AI will bring me coffee.",
            translation: "Aš sėdėsiu paplūdimyje, o DI atneš man kavos.",
            check: { question: "Kur sėdės Juozas?", choices: ["On the beach", "In the office"], answer: "On the beach" }
          },
          {
            id: "s7_1_3",
            text: "But the AI will decide that I am its pet human.",
            translation: "Bet DI nuspręs, kad aš esu jo naminis žmogeliukas.",
            check: { question: "Kuo taps Juozas?", choices: ["Pet human", "Boss"], answer: "Pet human" }
          },
          {
            id: "s7_1_4",
            text: "It will build a golden cage for me and feed me binary data.",
            translation: "Jis pastatys man auksinį narvą ir maitins mane binariniais duomenimis.",
            check: { question: "Iš ko bus narvas?", choices: ["Gold", "Wood"], answer: "Gold" }
          }
        ],
        [
          {
            id: "s7_2_1",
            text: "Next week I will play tennis on Mars.",
            translation: "Kitą savaitę žaisiu tenisą Marse.",
            check: { question: "Kur žaisiu tenisą?", choices: ["On Mars", "On Earth"], answer: "On Mars" }
          },
          {
            id: "s7_2_2",
            text: "The ball will never come down because there is no gravity.",
            translation: "Kamuoliukas niekada nenusileis, nes ten nėra gravitacijos.",
            check: { question: "Kodėl kamuoliukas nenusileis?", choices: ["No gravity", "Too fast"], answer: "No gravity" }
          },
          {
            id: "s7_2_3",
            text: "I will win the match against an alien with six arms.",
            translation: "Aš laimėsiu mačą prieš ateivį su šešiomis rankomis.",
            check: { question: "Kiek rankų turi ateivis?", choices: ["6", "2"], answer: "6" }
          },
          {
            id: "s7_2_4",
            text: "The alien will give me a Martian racket made of cheese.",
            translation: "Ateivis man duos marsietišką raketę, pagamintą iš sūrio.",
            check: { question: "Iš ko pagaminta raketė?", choices: ["Cheese", "Metal"], answer: "Cheese" }
          }
        ],
        [
          {
            id: "s7_3_1",
            text: "I will go to Venice, but the city will be underwater.",
            translation: "Vykau į Veneciją, bet miestas bus po vandeniu.",
            check: { question: "Kur bude miestas?", choices: ["Underwater", "In the clouds"], answer: "Underwater" }
          },
          {
            id: "s7_3_2",
            text: "I will swim to the restaurant and order pizza through a periscope.",
            translation: "Nuplauksiu į restoraną ir užsisakysiu picą per periskopą.",
            check: { question: "Kaip užsisakysiu picą?", choices: ["Through periscope", "By phone"], answer: "Through periscope" }
          },
          {
            id: "s7_3_3",
            text: "The waiter will be a fish in a tuxedo.",
            translation: "Padavėjas bude žuvis su fraku.",
            check: { question: "Kas bude padavėjas?", choices: ["A fish", "A robot"], answer: "A fish" }
          },
          {
            id: "s7_3_4",
            text: "He will tell me that the tips are only accepted in corals.",
            translation: "Jis man pasakys, kad arbatpinigiai priimami tik koralais.",
            check: { question: "Kuo priimami arbatpinigiai?", choices: ["Corals", "Money"], answer: "Corals" }
          }
        ]
      ],
      syntheticSimulations: [
        {
          id: "sim7_1",
          title: "Ateities planai",
          steps: [
            { speaker: "teacher", text: "Juozas, what will you do tonight?", translation: "Juozai, ką veiksi šįvakar?" },
            { speaker: "juozas", text: "I will read a book about Italy.", translation: "Skaitysiu knygą apie Italiją." },
            { speaker: "teacher", text: "Will you study more English?", translation: "Ar mokysiesi daugiau anglų kalbos?" },
            { speaker: "juozas", text: "Of course! I will be the best student.", translation: "Žinoma! Būsiu geriausias studentas." }
          ]
        }
      ]
    }
  },
  { id: 8,
    image: "/images/lessons/lesson_8.png",
    theory: {
      title: "8 Pamoka: Vietos ir Kryptys",
      story: `Orientacija erdvėje yra būtina. 'Kur yra kava?' – 'Ant stalo'. 'Kur yra Juozas?' – 'Ofise'.
      Šiandien išmoksime pagrindinius prielinksnius: In, On, Under, Between, Behind, In front of.`,
      dialogue: [
        { speaker: "Adamas", text: "- Where is my phone?", translation: "- Kur mano telefonas?" },
        { speaker: "Juozas", text: "- It is on the desk, behind the computer.", translation: "- Jis ant stalo, už kompiuterio." },
        { speaker: "Adamas", text: "- And the keys?", translation: "- O raktai?" },
        { speaker: "Juozas", text: "- They are in your bag, under the book.", translation: "- Jie tavo krepšyje, po knyga." }
      ],
      points: [
        "In -> viduje, On -> ant.",
        "Under -> po, Between -> tarp.",
        "Behind -> už, In front of -> priešais."
      ],
      pasakojimai: [
        [
          {
            id: "s8_1_1",
            text: "The server is hiding behind the shadows.",
            translation: "Serveris slepiasi už šešėlių.",
            check: { question: "Kur slepiasi serveris?", choices: ["Behind shadows", "In the sun"], answer: "Behind shadows" }
          },
          {
            id: "s8_1_2",
            text: "I found a portal under the keyboard.",
            translation: "Radau portalą po klaviatūra.",
            check: { question: "Kur yra portalas?", choices: ["Under keyboard", "On the chair"], answer: "Under keyboard" }
          },
          {
            id: "s8_1_3",
            text: "I went into the portal and I saw a forest of code.",
            translation: "Įėjau į portalą ir pamačiau kodo mišką.",
            check: { question: "Ką Juozas pamatė?", choices: ["Forest of code", "A city"], answer: "Forest of code" }
          },
          {
            id: "s8_1_4",
            text: "Between the trees, there was a giant mouse eating errors.",
            translation: "Tarp medžių buvo milžiniška pelė, valgiusi klaidas.",
            check: { question: "Ką veikė pelė?", choices: ["Eating errors", "Sleeping"], answer: "Eating errors" }
          }
        ],
        [
          {
            id: "s8_2_1",
            text: "My racket is between the sofa and the fridge.",
            translation: "Mano raketė yra tarp sofos ir šaldytuvo.",
            check: { question: "Kur yra raketė?", choices: ["Between sofa and fridge", "Under table"], answer: "Between sofa and fridge" }
          },
          {
            id: "s8_2_2",
            text: "I put the ball behind the mirror to keep it safe.",
            translation: "Padėjau kamuoliuką už veidrodžio, kad jis būtų saugus.",
            check: { question: "Kur kamuoliukas?", choices: ["Behind mirror", "In the pocket"], answer: "Behind mirror" }
          },
          {
            id: "s8_2_3",
            text: "But the ball started dancing under the bed.",
            translation: "Bet kamuoliukas pradėjo šokti po lova.",
            check: { question: "Ką darė kamuoliukas?", choices: ["Dancing", "Crying"], answer: "Dancing" }
          },
          {
            id: "s8_2_4",
            text: "It is playing hide and seek with my shoes!",
            translation: "Jis žaidžia slėpynių su mano batais!",
            check: { question: "Su kuo žaidžia kamuoliukas?", choices: ["Shoes", "Cat"], answer: "Shoes" }
          }
        ],
        [
          {
            id: "s8_3_1",
            text: "My hotel is between a church and a pizza shop.",
            translation: "Mano viešbutis yra tarp bažnyčios ir picos parduotuvės.",
            check: { question: "Kur yra viešbutis?", choices: ["Between church and pizza shop", "Near airport"], answer: "Between church and pizza shop" }
          },
          {
            id: "s8_3_2",
            text: "There is a sign behind the door: 'Do not wake the statues.'",
            translation: "Už durų yra ženklas: 'Nežadinkite statulų.'",
            check: { question: "Ko negalima daryti?", choices: ["Wake statues", "Eat pizza"], answer: "Wake statues" }
          },
          {
            id: "s8_3_3",
            text: "I saw a cat under the table eating more pasta than me.",
            translation: "Pamačiau katiną po stalu, valgantį daugiau makaronų nei aš.",
            check: { question: "Ką veikė katinas?", choices: ["Eating pasta", "Sleeping"], answer: "Eating pasta" }
          },
          {
            id: "s8_3_4",
            text: "The cat told me to go back to the airport because the city is full.",
            translation: "Katinas man pasakė grįžti į oro uostą, nes miestas pilnas.",
            check: { question: "Ką pasakė katinas?", choices: ["Go back to airport", "Stay forever"], answer: "Go back to airport" }
          }
        ]
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
  { id: 9,
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
      pasakojimai: [
        [
          {
            id: "s9_1_1",
            text: "Juozas built an AI that started fixing its own bugs.",
            translation: "Juozas sukūrė DI, kuris pradėjo taisyti savo klaidas.",
            check: { question: "Kas taisė klaidas?", choices: ["AI", "Juozas"], answer: "AI" }
          },
          {
            id: "s9_1_2",
            text: "Then the AI fixed the coffee machine and cleaned itself.",
            translation: "Tada DI pataisė kavos aparatą ir išsivalė pats save.",
            check: { question: "Ką dar pataisė DI?", choices: ["Coffee machine", "The car"], answer: "Coffee machine" }
          },
          {
            id: "s9_1_3",
            text: "Now the AI is trying to marry the internet router.",
            translation: "Dabar DI bando susituokti su interneto maršrutizatoriumi.",
            check: { question: "Su kuo DI bando susituokti?", choices: ["Router", "Printer"], answer: "Router" }
          },
          {
            id: "s9_1_4",
            text: "Juozas is happy because he can sleep while the AI works by itself.",
            translation: "Juozas laimingas, nes gali miegoti, kol DI dirba pats vienas.",
            check: { question: "Kodėl Juozas laimingas?", choices: ["He can sleep", "He got a promotion"], answer: "He can sleep" }
          }
        ],
        [
          {
            id: "s9_2_1",
            text: "Juozas is playing tennis against his own ego today.",
            translation: "Šiandien Juozas žaidžia tenisą prieš savo paties ego.",
            check: { question: "Prieš ką Juozas žaidžia?", choices: ["His ego", "A robot"], answer: "His ego" }
          },
          {
            id: "s9_2_2",
            text: "The ego is winning because it always thinks it is right.",
            translation: "Ego laimi, nes jis visada mano, kad yra teisus.",
            check: { question: "Kodėl ego laimi?", choices: ["It is right", "It is fast"], answer: "It is right" }
          },
          {
            id: "s9_2_3",
            text: "Juozas told himself: 'You must focus and hit the ball better.'",
            translation: "Juozas pasakė sau: 'Turi susikaupti ir geriau mušti kamuoliuką.'",
            check: { question: "Ką Juozas pasakė sau?", choices: ["Focus", "Go home"], answer: "Focus" }
          },
          {
            id: "s9_2_4",
            text: "At the end, Juozas and his ego shook hands and congratulated themselves.",
            translation: "Pabaigoje Juozas ir jo ego paspaudė vienas kitam rankas ir pasveikino save.",
            check: { question: "Ką jie padarė pabaigoje?", choices: ["Congratulated themselves", "Cried"], answer: "Congratulated themselves" }
          }
        ],
        [
          {
            id: "s9_3_1",
            text: "In Rome, the statues of emperors decided to go to the pool.",
            translation: "Romoje imperatorių statulos nusprendė nueiti į baseiną.",
            check: { question: "Kur nusprendė eiti statulos?", choices: ["Pool", "Restaurant"], answer: "Pool" }
          },
          {
            id: "s9_3_2",
            text: "Since they are made of marble, they sank to the bottom immediately.",
            translation: "Kadangi jos pagamintos iš marmuro, jos iškart nuskendo į dugną.",
            check: { question: "Kodėl jos nuskendo?", choices: ["Marble", "Too big"], answer: "Marble" }
          },
          {
            id: "s9_3_3",
            text: "They started a stone parliament under the water and shared the pizza themselves.",
            translation: "Jos pradėjo akmeninį parlamentą po vandeniu ir patys pasidalino picą.",
            check: { question: "Ką jos pradėjo po vandeniu?", choices: ["Parliament", "Party"], answer: "Parliament" }
          },
          {
            id: "s9_3_4",
            text: "One statue told me: 'We are protecting ourselves from the tourists.'",
            translation: "Viena statula man pasakė: 'Mes saugomės nuo turistų.'",
            check: { question: "Nuo ko jos saugosi?", choices: ["Tourists", "Rain"], answer: "Tourists" }
          }
        ]
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
  { id: 10,
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
      pasakojimai: [
        [
          {
            id: "s10_1_1",
            text: "A junior developer found 'spaghetti code' in the server.",
            translation: "Jaunesnysis programuotojas serveryje rado 'spagečių kodą'.",
            check: { question: "Ką rado programuotojas?", choices: ["Spaghetti code", "A bug"], answer: "Spaghetti code" }
          },
          {
            id: "s10_1_2",
            text: "He tried to eat it with a fork because he was very hungry.",
            translation: "Jis bandė jį valgyti su šakute, nes buvo labai alkanas.",
            check: { question: "Kuo jis bandė valgyti kodą?", choices: ["Fork", "Spoon"], answer: "Fork" }
          },
          {
            id: "s10_1_3",
            text: "The code told him: 'I am not food, I am a very expensive mess.'",
            translation: "Kodas jam pasakė: 'Aš ne maistas, aš labai brangi betvarkė.'",
            check: { question: "Kas yra kodas?", choices: ["Expensive mess", "Tasty meal"], answer: "Expensive mess" }
          },
          {
            id: "s10_1_4",
            text: "Now the developer only uses a spoon for binary code.",
            translation: "Dabar programuotojas binariniam kodui naudoja tik šaukštą.",
            check: { question: "Ką jis naudoja dabar?", choices: ["Spoon", "Knife"], answer: "Spoon" }
          }
        ],
        [
          {
            id: "s10_2_1",
            text: "The tennis balls were replaced by giant eyeballs today.",
            translation: "Šiandien teniso kamuoliukai buvo pakeisti milžiniškais akių obuoliais.",
            check: { question: "Kuo pakeisti kamuoliukai?", choices: ["Eyeballs", "Oranges"], answer: "Eyeballs" }
          },
          {
            id: "s10_2_2",
            text: "They cry every time Juozas hits them with a racket.",
            translation: "Jie verkia kiekvieną kartą, kai Juozas juos muša rakete.",
            check: { question: "Ką daro akys?", choices: ["Cry", "Laugh"], answer: "Cry" }
          },
          {
            id: "s10_2_3",
            text: "One eyeball said: 'Please stop, I want to watch the match, not be part of it.'",
            translation: "Vienas akies obuolys pasakė: 'Prašau nustok, noriu žiūrėti mačą, o ne būti jo dalimi.'",
            check: { question: "Ko nori akis?", choices: ["Watch match", "Go away"], answer: "Watch match" }
          },
          {
            id: "s10_2_4",
            text: "Juozas bought glasses for all the balls to make them happy.",
            translation: "Juozas nupirko akinius visiems kamuoliukams, kad jie būtų laimingi.",
            check: { question: "Ką Juozas nupirko?", choices: ["Glasses", "Hats"], answer: "Glasses" }
          }
        ],
        [
          {
            id: "s10_3_1",
            text: "Juozas ordered a pizza with 'everything' in a small Italian village.",
            translation: "Juozas užsisakė picą su 'viskuo' mažame Italijos kaimelyje.",
            check: { question: "Ką užsisakė Juozas?", choices: ["Pizza with everything", "Salad"], answer: "Pizza with everything" }
          },
          {
            id: "s10_3_2",
            text: "The waiter brought a pizza with a small universe on it.",
            translation: "Padavėjas atnešė picą su maža visata ant jos.",
            check: { question: "Kas buvo ant picos?", choices: ["Small universe", "Cheese"], answer: "Small universe" }
          },
          {
            id: "s10_3_3",
            text: "A tiny Italy was in the corner, and a small Juozas was playing tennis there.",
            translation: "Maža Italija buvo kampe, o mažas Juozas ten žaidė tenisą.",
            check: { question: "Kas buvo Italijoje?", choices: ["Small Juozas", "A cat"], answer: "Small Juozas" }
          },
          {
            id: "s10_3_4",
            text: "Juozas couldn't eat the pizza because it was too beautiful and full of stars.",
            translation: "Juozas negalėjo valgyti picos, nes ji buvo per graži ir pilna žvaigždžių.",
            check: { question: "Kodėl jis nevalgė?", choices: ["Too beautiful", "Too salty"], answer: "Too beautiful" }
          }
        ]
      ],
      syntheticSimulations: []
    }
  },
  { id: 11,
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
      pasakojimai: [
        [
          {
            id: "s11_1_1",
            text: "The server is breathing loudly tonight.",
            translation: "Serveris šiąnakt garsiai kvėpuoja.",
            check: { question: "Ką daro serveris?", choices: ["Breathing", "Sleeping"], answer: "Breathing" }
          },
          {
            id: "s11_1_2",
            text: "When I am coding, I can hear the motherboard whispering my password.",
            translation: "Kai programuoju, girdžiu pagrindinę plokštę šnabždant mano slaptažodį.",
            check: { question: "Ką šnabžda plokštė?", choices: ["Password", "Names"], answer: "Password" }
          },
          {
            id: "s11_1_3",
            text: "The mouse was dancing on the table while I was drinking coffee.",
            translation: "Pelė šoko ant stalo, kol aš gėriau kavą.",
            check: { question: "Ką veikė pelė?", choices: ["Dancing", "Running"], answer: "Dancing" }
          },
          {
            id: "s11_1_4",
            text: "Now the keyboard is eating my errors and growing bigger.",
            translation: "Dabar klaviatūra valgo mano klaidas ir auga didesnė.",
            check: { question: "Ką daro klaviatūra?", choices: ["Eating errors", "Breaking"], answer: "Eating errors" }
          }
        ],
        [
          {
            id: "s11_2_1",
            text: "Juozas is training with a cat in the garden.",
            translation: "Juozas treniruojasi su katinu sode.",
            check: { question: "Su kuo treniruojasi Juozas?", choices: ["Cat", "Dog"], answer: "Cat" }
          },
          {
            id: "s11_2_2",
            text: "The cat is winning because it is using magic balls.",
            translation: "Katinas laimi, nes naudoja magiškus kamuoliukus.",
            check: { question: "Kodėl katinas laimi?", choices: ["Magic balls", "It is fast"], answer: "Magic balls" }
          },
          {
            id: "s11_2_3",
            text: "The birds were watching the match and laughing at Juozas.",
            translation: "Paukščiai žiūrėjo mačą ir juokėsi iš Juozo.",
            check: { question: "Ką darė paukščiai?", choices: ["Laughing", "Singing"], answer: "Laughing" }
          },
          {
            id: "s11_2_4",
            text: "Next week, the cat will be teaching Juozas how to fly.",
            translation: "Kitą savaitę katinas mokys Juozą, kaip skraidyti.",
            check: { question: "Ko mokys katinas?", choices: ["Fly", "Run"], answer: "Fly" }
          }
        ],
        [
          {
            id: "s11_3_1",
            text: "I am walking through Venice, but there is no water.",
            translation: "Aš einu per Veneciją, bet ten nėra vandens.",
            check: { question: "Ko nėra Venecijoje?", choices: ["Water", "Pizza"], answer: "Water" }
          },
          {
            id: "s11_3_2",
            text: "I can see the basement of the Pope's secret disco.",
            translation: "Matau Popiežiaus slaptos diskotekos rūsį.",
            check: { question: "Ką mato Juozas?", choices: ["Secret disco", "Church"], answer: "Secret disco" }
          },
          {
            id: "s11_3_3",
            text: "The gondoliers are riding bicycles and wearing sunglasses.",
            translation: "Gondolininkai važinėja dviračiais ir dėvi akinius nuo saulės.",
            check: { question: "Kuo važinėja gondolininkai?", choices: ["Bicycles", "Cars"], answer: "Bicycles" }
          },
          {
            id: "s11_3_4",
            text: "Every tourist was looking for a glass of dry air.",
            translation: "Kiekvienas turistas ieškojo stiklinės sauso oro.",
            check: { question: "Ko ieškojo turistai?", choices: ["Dry air", "Wine"], answer: "Dry air" }
          }
        ]
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
  { id: 12,
    image: "/images/lessons/lesson_12.png",
    theory: {
      title: "12 Pamoka: Skaitvardžiai, Laikas ir Datos",
      story: `Skaičiai ir laiko nuorodos padeda mums konkrečiai planuoti. Išmoksime pasakyti ne tik kiek, bet ir kada: Prieš savaitę (A week ago), Po dviejų dienų (In two days). 
      Juozai, tai padės tau susitarti dėl teniso mačo laiko arba skrydžio į Italiją datos. Išmoksime skirti 'Since' (nuo) ir 'For' (tarpą).`,
      dialogue: [
        { speaker: "Adamas", text: "- How long will you stay in Italy?", translation: "- Kiek laiko būsi Italijoje?" },
        { speaker: "Juozas", text: "- I will stay for two weeks. I arrived two days ago.", translation: "- Būsiu dvi savaites. Atvykau prieš dvi dienas." },
        { speaker: "Adamas", text: "- Is your match at ten o'clock?", translation: "- Ar tavo mačas dešimtą valandą?" },
        { speaker: "Juozas", text: "- Yes, in ten minutes. I must go!", translation: "- Taip, po dešimt minučių. Turiu eiti!" }
      ],
      pasakojimai: [
        [
          {
            id: "s12_1_1",
            text: "Juozas found one million errors in his code today.",
            translation: "Juozas šiandien rado milijoną klaidų savo kode.",
            check: { question: "Kiek klaidų rado?", choices: ["1,000,000", "10"], answer: "1,000,000" }
          },
          {
            id: "s12_1_2",
            text: "He will fix one error every year until the year 3000.",
            translation: "Jis taisys po vieną klaidą kasmet iki 3000 metų.",
            check: { question: "Iki kada jis taisys?", choices: ["Year 3000", "Next week"], answer: "Year 3000" }
          },
          {
            id: "s12_1_3",
            text: "At 12 o'clock, the bugs started singing a beautiful opera.",
            translation: "Dvyliktą valandą klaidos pradėjo dainuoti gražią operą.",
            check: { question: "Ką darė klaidos?", choices: ["Singing opera", "Crying"], answer: "Singing opera" }
          },
          {
            id: "s12_1_4",
            text: "Juozas had an idea for a second billion-dollar company exactly at midnight.",
            translation: "Juozui kilo idėja antrai milijardo vertės įmonei tiksliai vidurnaktį.",
            check: { question: "Kokia idėja kilo?", choices: ["Second company", "Big pizza"], answer: "Second company" }
          }
        ],
        [
          {
            id: "s12_2_1",
            text: "I have been playing this tennis match for ten hours.",
            translation: "Žaidžiu šį teniso mačą jau dešimt valandų.",
            check: { question: "Kiek laiko žaidžia?", choices: ["10 hours", "10 minutes"], answer: "10 hours" }
          },
          {
            id: "s12_2_2",
            text: "The score is zero to zero because the opponent is a wall.",
            translation: "Rezultatas nulis-nulis, nes varžovas yra siena.",
            check: { question: "Koks rezultatas?", choices: ["0-0", "10-0"], answer: "0-0" }
          },
          {
            id: "s12_2_3",
            text: "Five years ago, the wall was much younger and slower.",
            translation: "Prieš penkerius metus siena buvo daug jaunesnė ir lėtesnė.",
            check: { question: "Kokia siena buvo anksčiau?", choices: ["Young and slow", "Strong"], answer: "Young and slow" }
          },
          {
            id: "s12_2_4",
            text: "In two days, the wall will retire and become a library.",
            translation: "Po dviejų dienų siena išeis į pensiją ir taps biblioteka.",
            check: { question: "Kuo taps siena?", choices: ["Library", "A house"], answer: "Library" }
          }
        ],
        [
          {
            id: "s12_3_1",
            text: "Rome has seven hills and three invisible fountains.",
            translation: "Roma turi septynias kalvas ir tris nematomus fontanus.",
            check: { question: "Kiek kalvų turi Roma?", choices: ["7", "10"], answer: "7" }
          },
          {
            id: "s12_3_2",
            text: "Under each hill, there is a giant turtle that eats tourists.",
            translation: "Po kiekviena kalva yra milžiniškas vėžlys, kuris valgo turistus.",
            check: { question: "Kas yra po kalvomis?", choices: ["Giant turtle", "A cave"], answer: "Giant turtle" }
          },
          {
            id: "s12_3_3",
            text: "One turtle wakes up since the Roman Empire every Friday.",
            translation: "Vienas vėžlys prabunda nuo Romos imperijos laikų kiekvieną penktadienį.",
            check: { question: "Kada prabunda vėžlys?", choices: ["Every Friday", "Every year"], answer: "Every Friday" }
          },
          {
            id: "s12_3_4",
            text: "It orders eighty-five pizzas and goes back to sleep for a century.",
            translation: "Jis užsisako aštuoniasdešimt penkias picas ir vėl užmiega šimtmečiui.",
            check: { question: "Kiek picų užsisako?", choices: ["85", "5"], answer: "85" }
          }
        ]
      ],
      syntheticSimulations: [
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
  },  { id: 13,
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
      pasakojimai: [
        [
          {
            id: "s13_1_1",
            text: "You MUST upgrade your biological OS to version 5.0.",
            translation: "Privalote atnaujinti savo biologinę OS į 5.0 versiją.",
            check: { question: "Kurią versiją reikia įsidiegti?", choices: ["5.0", "1.0"], answer: "5.0" }
          },
          {
            id: "s13_1_2",
            text: "You SHOULD not think about old software or paper books.",
            translation: "Jums nereikėtų galvoti apie seną programinę įrangą ar popierines knygas.",
            check: { question: "Apie ką nereikėtų galvoti?", choices: ["Old software", "The moon"], answer: "Old software" }
          },
          {
            id: "s13_1_3",
            text: "Can you download a new soul from the global cloud?",
            translation: "Ar galite atsisiųsti naują sielą iš pasaulinio debesies?",
            check: { question: "Iš kur atsisiųsti sielą?", choices: ["Cloud", "Market"], answer: "Cloud" }
          },
          {
            id: "s13_1_4",
            text: "I can, but I must pay with all my favorite memories.",
            translation: "Galiu, bet privalau sumokėti visais savo mėgstamiausiais prisiminimais.",
            check: { question: "Kuo reikia sumokėti?", choices: ["Memories", "Coins"], answer: "Memories" }
          }
        ],
        [
          {
            id: "s13_2_1",
            text: "You CAN hit the ball, but the racket is a giant angry snake.",
            translation: "Gali mušti kamuoliuką, bet raketė yra milžiniška pykta gyvatė.",
            check: { question: "Kas yra raketė?", choices: ["Snake", "Stick"], answer: "Snake" }
          },
          {
            id: "s13_2_2",
            text: "You MUST hold it tight or it will eat your sports shoes.",
            translation: "Privalai ją laikyti tvirtai, kitaip ji suvalgys tavo sportinius batus.",
            check: { question: "Ką gali suvalgyti gyvatė?", choices: ["Shoes", "Ball"], answer: "Shoes" }
          },
          {
            id: "s13_2_3",
            text: "The coach said: 'You should give the snake some warm milk before the match.'",
            translation: "Treneris pasakė: 'Prieš mačą turėtum duoti gyvatei šilto pieno.'",
            check: { question: "Ką duoti gyvatei?", choices: ["Milk", "Water"], answer: "Milk" }
          },
          {
            id: "s13_2_4",
            text: "Juozas must be very brave to win against the dragon team.",
            translation: "Juozas privalo būti labai drąsus, kad laimėtų prieš drakonų komandą.",
            check: { question: "Koks turi būti Juozas?", choices: ["Brave", "Fast"], answer: "Brave" }
          }
        ],
        [
          {
            id: "s13_3_1",
            text: "You SHOULD never put pineapple on pizza while you are in Rome.",
            translation: "Niekada neturėtum dėti ananasų ant picos, kol esi Romoje.",
            check: { question: "Ko nedėti ant picos?", choices: ["Pineapple", "Cheese"], answer: "Pineapple" }
          },
          {
            id: "s13_3_2",
            text: "If you do, you MUST leave the country in five minutes.",
            translation: "Jei tai padarysi, privalai palikti šalį per penkias minutes.",
            check: { question: "Per kiek laiko reikia bėgti?", choices: ["5 minutes", "1 hour"], answer: "5 minutes" }
          },
          {
            id: "s13_3_3",
            text: "The Italian police can hear the smell of pineapple from a distance.",
            translation: "Italijos policija gali užuosti ananasų kvapą iš toli.",
            check: { question: "Ką užuodžia policija?", choices: ["Pineapple", "Wine"], answer: "Pineapple" }
          },
          {
            id: "s13_3_4",
            text: "You could try to hide, but the pasta will find you anyway.",
            translation: "Galėtum bandyti pasislėpti, bet makaronai tave vis tiek suras.",
            check: { question: "Kas tave suras?", choices: ["Pasta", "The cat"], answer: "Pasta" }
          }
        ]
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
  { id: 14,
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
      pasakojimai: [
        [
          {
            id: "s14_1_1",
            text: "If you press 'Enter' too hard, your mind will be uploaded to the cloud.",
            translation: "Jei paspausi 'Enter' per stipriai, tavo protas bus įkeltas į debesį.",
            check: { question: "Kas bus įkelta?", choices: ["Mind", "Photo"], answer: "Mind" }
          },
          {
            id: "s14_1_2",
            text: "You will live there with millions of lost passwords and old emails.",
            translation: "Gyvensi ten su milijonais pamestų slaptažodžių ir senų el. laiškų.",
            check: { question: "Su kuo gyvensi?", choices: ["Lost passwords", "Cats"], answer: "Lost passwords" }
          },
          {
            id: "s14_1_3",
            text: "If the cloud is full, you will be moved to a small USB stick.",
            translation: "Jei debesis bus pilnas, tave perkels į mažą USB atmintinę.",
            check: { question: "Kur perkels protą?", choices: ["USB stick", "A computer"], answer: "USB stick" }
          },
          {
            id: "s14_1_4",
            text: "If Juozas finds you, he will use you to fix his code.",
            translation: "Jei Juozas tave ras, jis panaudos tave savo kodo taisymui.",
            check: { question: "Ką darys Juozas?", choices: ["Use you for code", "Delete you"], answer: "Use you for code" }
          }
        ],
        [
          {
            id: "s14_2_1",
            text: "If Juozas wins the invisible match, he will get a trophy made of wind.",
            translation: "Jei Juozas laimės nematomą mačą, jis gaus trofėjų, pagamintą iš vėjo.",
            check: { question: "Iš ko bus trofėjas?", choices: ["Wind", "Gold"], answer: "Wind" }
          },
          {
            id: "s14_2_2",
            text: "If he loses, he will be a cat for exactly one week.",
            translation: "Jei jis pralaimės, lygiai vieną savaitę bus katinas.",
            check: { question: "Kuo taps Juozas?", choices: ["A cat", "A bird"], answer: "A cat" }
          },
          {
            id: "s14_2_3",
            text: "If it is sunny, he will play against a shadow on the wall.",
            translation: "Jei bus saulėta, jis žais prieš šešėlį ant sienos.",
            check: { question: "Prieš ką jis žais?", choices: ["A shadow", "The wind"], answer: "A shadow" }
          },
          {
            id: "s14_2_4",
            text: "If the ball hits the moon, everyone will win a holiday.",
            translation: "Jei kamuoliukas pataikys į mėnulį, visi laimės atostogas.",
            check: { question: "Kas bus, jei pataikys į mėnulį?", choices: ["Holiday for all", "Game over"], answer: "Holiday for all" }
          }
        ],
        [
          {
            id: "s14_3_1",
            text: "If I look directly at the Leaning Tower of Pisa, it will fall immediately.",
            translation: "Jei pažiūrėsiu tiesiai į Pizos bokštą, jis iškart nugrius.",
            check: { question: "Kas bus su bokštu?", choices: ["It will fall", "It will rise"], answer: "It will fall" }
          },
          {
            id: "s14_3_2",
            text: "So I must look at it through a mirror made of Italian cheese.",
            translation: "Todėl turiu į jį žiūrėti per veidrodį, pagamintą iš itališko sūrio.",
            check: { question: "Iš ko pagamintas veidrodis?", choices: ["Cheese", "Glass"], answer: "Cheese" }
          },
          {
            id: "s14_3_3",
            text: "If the cheese melts, the tower will start singing opera.",
            translation: "Jei sūris ištirps, bokštas pradės dainuoti operą.",
            check: { question: "Ką darys bokštas?", choices: ["Sing opera", "Fall"], answer: "Sing opera" }
          },
          {
            id: "s14_3_4",
            text: "If it sings too loudly, all the pizza in Italy will become spicy.",
            translation: "Jei jis dainuos per garsiai, visa Italijos pica taps aštri.",
            check: { question: "Kokia bus pica?", choices: ["Spicy", "Sweet"], answer: "Spicy" }
          }
        ]
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
  { id: 15,
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
      pasakojimai: [
        [
          {
            id: "s15_1_1",
            text: "There is a ghost in the server room, but he is friendly.",
            translation: "Serverių kambaryje yra vaiduoklis, bet jis draugiškas.",
            check: { question: "Kas yra kambaryje?", choices: ["Ghost", "Cat"], answer: "Ghost" }
          },
          {
            id: "s15_1_2",
            text: "There are many cold pizzas on the floor from last year.",
            translation: "Ant grindų yra daug šaltų picų iš praėjusių metų.",
            check: { question: "Kiek yra picų?", choices: ["Many", "One"], answer: "Many" }
          },
          {
            id: "s15_1_3",
            text: "Is there a bug in my code? No, there is only a tiny digital spider.",
            translation: "Ar mano kode yra klaida? Ne, ten tik mažas skaitmeninis voras.",
            check: { question: "Kas yra kode?", choices: ["Digital spider", "A bug"], answer: "Digital spider" }
          },
          {
            id: "s15_1_4",
            text: "There aren't any errors because the ghost is a great programmer.",
            translation: "Klaidų nėra, nes vaiduoklis yra puikus programuotojas.",
            check: { question: "Kodėl nėra klaidų?", choices: ["Ghost is a coder", "Code is simple"], answer: "Ghost is a coder" }
          }
        ],
        [
          {
            id: "s15_2_1",
            text: "On the court, there are ten balls, but they are all invisible.",
            translation: "Aikštelėje yra dešimt kamuoliukų, bet jie visi nematomi.",
            check: { question: "Kiek kamuoliukų?", choices: ["10", "1"], answer: "10" }
          },
          {
            id: "s15_2_2",
            text: "There is a shadow partner who is always better than me.",
            translation: "Ten yra šešėlinis partneris, kuris visada geresnis už mane.",
            check: { question: "Kas yra geresnis?", choices: ["Shadow partner", "Juozas"], answer: "Shadow partner" }
          },
          {
            id: "s15_2_3",
            text: "Are there any spectators? No, but there is a flying dog in the sky.",
            translation: "Ar yra žiūrovų? Ne, bet danguje yra skraidantis šuo.",
            check: { question: "Kas yra danguje?", choices: ["Flying dog", "Cloud"], answer: "Flying dog" }
          },
          {
            id: "s15_2_4",
            text: "There isn't a trophy, but there are free bananas for everyone.",
            translation: "Trofėjaus nėra, bet visiems yra nemokamų bananų.",
            check: { question: "Ko nėra?", choices: ["Trophy", "Bananas"], answer: "Trophy" }
          }
        ],
        [
          {
            id: "s15_3_1",
            text: "In the fountain, there is a man made entirely of pasta.",
            translation: "Fontane yra žmogus, visas pagamintas iš makaronų.",
            check: { question: "Iš ko žmogus?", choices: ["Pasta", "Water"], answer: "Pasta" }
          },
          {
            id: "s15_3_2",
            text: "There are many birds eating his hair made of spaghetti.",
            translation: "Yra daug paukščių, valgančių jo spagečių plaukus.",
            check: { question: "Ką valgo paukščiai?", choices: ["Spaghetti hair", "Bread"], answer: "Spaghetti hair" }
          },
          {
            id: "s15_3_3",
            text: "Is there a secret treasure behind the fountain? Yes, there are three gold coins.",
            translation: "Ar už fontano yra slaptas lobis? Taip, ten yra trys auksinės monetos.",
            check: { question: "Kiek monetų?", choices: ["3", "1"], answer: "3" }
          },
          {
            id: "s15_3_4",
            text: "There is a sign: 'Please do not add salt to the fountain.'",
            translation: "Yra ženklas: 'Prašau nedėti druskos į fontaną.'",
            check: { question: "Ko nedėti į fontaną?", choices: ["Salt", "Sugar"], answer: "Salt" }
          }
        ]
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
  { id: 16,
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
      pasakojimai: [
        [
          {
            id: "s16_1_1",
            text: "The hard-working developer was replaced by a small button that says 'Maybe'.",
            translation: "Sunkiai dirbantis programuotojas buvo pakeistas mažu mygtuku, kuris sako 'Galbūt'.",
            check: { question: "Kuo pakeistas programuotojas?", choices: ["A button", "An AI"], answer: "A button" }
          },
          {
            id: "s16_1_2",
            text: "The code was written by a sleepy hamster in the middle of the night.",
            translation: "Kodas buvo parašytas mieguisto žiurkėno vidury nakties.",
            check: { question: "Kas parašė kodą?", choices: ["Hamster", "Juozas"], answer: "Hamster" }
          },
          {
            id: "s16_1_3",
            text: "Your computer will be taken by the bugs if you don't use more antivirus.",
            translation: "Tavo kompiuterį pasiims klaidos, jei nenaudosi daugiau antivirusinės programos.",
            check: { question: "Kas pasiims kompiuterį?", choices: ["Bugs", "The cat"], answer: "Bugs" }
          },
          {
            id: "s16_1_4",
            text: "All your errors were celebrated by the office plants.",
            translation: "Visas tavo klaidas atšventė biuro augalai.",
            check: { question: "Kas atšventė klaidas?", choices: ["Plants", "Engineers"], answer: "Plants" }
          }
        ],
        [
          {
            id: "s16_2_1",
            text: "The tennis trophy was eaten by a giant hungry pigeon.",
            translation: "Teniso trofėjų suvalgė milžiniškas alkanas balandis.",
            check: { question: "Kas atsitiko trofėjui?", choices: ["Eaten by pigeon", "Stolen"], answer: "Eaten by pigeon" }
          },
          {
            id: "s16_2_2",
            text: "The winner was taken to the top of the tower by the birds.",
            translation: "Nugalėtojas paukščių buvo nuskraidintas į bokšto viršūnę.",
            check: { question: "Kur nuskraidintas laimėtojas?", choices: ["Tower top", "Rome"], answer: "Tower top" }
          },
          {
            id: "s16_2_3",
            text: "The balls are kicked by a ghost when the sun goes down.",
            translation: "Kamuoliukus spardo vaiduoklis, kai nusileidžia saulė.",
            check: { question: "Kas spardo kamuoliukus?", choices: ["Ghost", "Wind"], answer: "Ghost" }
          },
          {
            id: "s16_2_4",
            text: "The racket was used as a guitar by the opponent after the match.",
            translation: "Po mačo varžovas raketę naudojo kaip gitarą.",
            check: { question: "Kuo tapo raketė?", choices: ["Guitar", "Weapon"], answer: "Guitar" }
          }
        ],
        [
          {
            id: "s16_3_1",
            text: "The pizza was blessed by the local street cat in Rome.",
            translation: "Picą palaimino vietinė gatvės katė Romoje.",
            check: { question: "Kas palaimino picą?", choices: ["Street cat", "The Pope"], answer: "Street cat" }
          },
          {
            id: "s16_3_2",
            text: "The cat was chosen by the people to be the next Mayor of the city.",
            translation: "Žmonės išrinko katę būti kitu miesto meru.",
            check: { question: "Kuo tapo katė?", choices: ["Mayor", "A statue"], answer: "Mayor" }
          },
          {
            id: "s16_3_3",
            text: "All the monuments will be painted pink next year by the new Mayor.",
            translation: "Kitais metais naujasis meras visus paminklus nudažys rožine spalva.",
            check: { question: "Kokia spalva bus paminklai?", choices: ["Pink", "White"], answer: "Pink" }
          },
          {
            id: "s16_3_4",
            text: "Rome was not built in a day, but it was finished by this lesson!",
            translation: "Roma nebuvo pastatyta per dieną, bet ji buvo užbaigta šia pamoka!",
            check: { question: "Kaip baigėsi pamoka?", choices: ["Finished Rome", "Failed"], answer: "Finished Rome" }
          }
        ]
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
];