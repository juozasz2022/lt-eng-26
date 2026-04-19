
## Dirbu su `Antigravity`: Anglai 6

- Su Antigravity kuriu **anglų kalbos mokymosi** sistemą: 6-a diena

Labas diena, Antigravity

Šandien toliau užsiimsime mano svajonių projektu: anglų kalbos mokymosi sistemą LtEng_26.
Turiu dabar jau penkias NotebookLM užrašines: "Petrov: Polyglot". "LTEng: 2026", ZJ ir DP „Poliglotas““ ir ankstesnes "LTITAL: 2026", "LTITAL-Petrov: 2026".

Planuoju, kad: 
- ZJ ir DP „Poliglotas“ bus pagrindinė užrašinė kurioje kaupsiu kūrimo rezultatus (jau pradėjau ...) 
- "Petrov: Polyglot" bus pagrindinė užrašinė rusų poligloto Dmitrij Petrov reikalams (pradžia jau padaryta. Labai svarbu. Remiantis jo metodika bus organizuojamas mokymo kursas)

Projektui sukūriau aplanką "mokausi_kalbas_26"
Jame yra patalpintas aplankas: LtEng_26: 
"D:\2026\bandau_di\ntbklm_antigravity\mokausi_kalbas_26\LtEng_26"
Vakar su Versel bandėme LtEng26 įdiegti į GitHub'ą: Githube: lt-eng-2026
Dabartinė (paskutinė) versija yra patalpinta į aplankąL "lt-eng-app", kuris irgi yra aplanke:
"D:\2026\bandau_di\ntbklm_antigravity\mokausi_kalbas_26\LtEng_26"

Sukūriau naują aplanką "pokalbiai": D:\2026\bandau_di\ntbklm_antigravity\mokausi_kalbas_26\LtEng_26\pokalbiai

Paskutiniai mano pokalbiai su Antigravity (Gemini 3.1 Pro, Gemini 3 Flash).
Rasi juos: D:\2026\bandau_di\ntbklm_antigravity\mokausi_kalbas_26\LtEng_26\pokalbiai 
- "pokalbiai_eng_antigravity_04_2026-04-12.md"
- "pokalbiai_eng_antigravity_05_2026-04-13.md"
- "pokalbiai_eng_gsd_antigravity_01_2026-04-14.md"
- "pokalbiai_eng_gsd_antigravity_02_2026-04-14.md"

Pasitikslink juose, kas buvo padaryta.

**GSD**:

Parengiau detalų 1–16 pamokų ruošimo planą, remdamasis Dmitrijaus Petrovo metodika ir jūsų NotebookLM užrašinėmis.

Svarbiausia išvada: dabartinis pamokų sąrašas projekte šiek tiek skiriasi nuo tikrosios Petrovo 16-os pamokų sekos, todėl siūlau jį suderinti, kad mokymosi patirtis būtų maksimaliai autentiška.

Esminiai klausimai prieš pradedant:
Programos suderinimas: Ar sutinkate, kad perrikiuočiau pamokas pagal tikrąjį Petrovo planą (pvz., perkeliant „To Be“ veiksmažodį į 3-iąją pamoką, o 2-ąją skiriant įvardžiams ir klausiamiesiems žodžiams)? Gerai
Personalizacija (Juozas): Petrovas visada naudoja mokinių asmenines istorijas. Ar norėtumėte, kad simuliacijose (kur mokytojas kreipiasi tiesiai į jus – Juozą) įtraukčiau detalių apie jūsų gyvenimą. Taip. Bet neužmiršk, kad netrukus bus ir kiti studentai (tenisą, programavimą, Italiją)? Tai padėtų geriau „įsisavinti“ kalbą.
0 Pamoka: Ar paliekame „0 Pamoką“ kaip trumpą metodikos įvadą (intro), ar pradedame iškart nuo „1 Pamoka: Matrica“? Paliekam intro ir vėliau ją smsrkiai išplėsime
Kalbos: Ar kol kas fokusuojamės tik į LT -> ENG, ar išlaikome lanksčią struktūrą, kad vėliau galėtume lengvai prijungti LT -> ITAL? Žinoma, reikia galvoti ir apie kitas kalbas
Visą planą galite peržiūrėti čia: implementation_plan.md

Laukiu jūsų patvirtinimo arba pataisymų, ir pradėsime turinio generavimą!



## Toliau dirbu su Vercel 2-a diena





**GSD**:
Išanalizavau jūsų atsiųstą pokalbių žurnalą ir esamą projekto būseną. Panašu, kad „kažkas pasidarė“ dėl to, jog sėkmingai paruošėme programą „Vercel“ debesijai, tačiau tai laikinai sutrikdė darbą jūsų kompiuteryje (lokaliai).

Kas nutiko?

Sujungta struktūra (Monorepo): Perkėlėme serverio kodą į lt-eng-app/api aplanką. „Vercel“ tai supranta puikiai, bet jūsų vietinis kompiuteris šiuo metu „nepaleidžia“ šio serverio automatiškai.
API nuorodų pasikeitimas: Programos kodas dabar ieško duomenų adresu /api/..., bet naršyklė (veikianti 5173 prievadu) nežino, kur jį rasti, kol nesukonfigūravome specialaus „tarpininko“ (Proxy).
Klaida 5001 prievade: Tai senasis serverio prievadas, kuris dabar neveikia, nes visa logika yra naujoje vietoje.



**Aš**: Baigiame dokumentaciją.


Ačiū už nepaprastai rimtą pasistūmėjimą rengiant tikrai sudėtingą programą. Labanakt. Rytoj pratęsime 




