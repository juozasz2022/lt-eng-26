# 🇬🇧 LtEng_26: Anglų kalbos mokymosi platforma

**LtEng_26** – tai inovatyvi, teatriniu principu pagrįsta anglų kalbos mokymosi platforma, sukurta remiantis Dmitrijaus Petrovo metodika. Projektas yra optimizuotas 50-60+ metų amžiaus auditorijai, pabrėžiant paprastumą, aiškumą ir įtraukiantį turinį.

## 🚀 Greitasis startas komandai

Jei esate testuotojas ar turinio kūrėjas, sekite šiuos žingsnius, kad pasileistumėte projektą savo kompiuteryje:

### 1. Reikalavimai
- Įdiegtas [Node.js](https://nodejs.org/) (rekomenduojama v18 ar naujesnė).
- [Git](https://git-scm.com/) versijų kontrolės sistema.

### 2. Projekto paruošimas
```bash
# Klavijuokite projektą
git clone https://github.com/juozasz2022/lt-eng-26.git
cd lt-eng-26

# Įeikite į aplikacijos aplanką
cd lt-eng-app

# Įdiekite visas bibliotekas
npm install
```

### 3. Paleidimas
```bash
# Paleiskite sistemą (UI + API serverį vienu metu)
npm run dev
```
Aplikacija bus pasiekiama adresu: `http://localhost:5173`

## 📚 Dokumentacija
Išsamius gidus pagal savo rolę rasite `lt-eng-docs` aplanke:
- [**Vartotojo gidas (Studentams)**](./lt-eng-docs/student/01-getting-started.md)
- [**Turinio pildymo gidas (Editors)**](./lt-eng-docs/editor-qa/01-studio-guide.md)
- [**Techninė architektūra (Developers)**](./lt-eng-docs/developer/01-system-architecture.md)

## 🛠️ Technologijų krūva
- **Frontend**: React, Vite, Framer Motion (animacijoms), Tailwind CSS.
- **Backend/API**: Express, Prisma ORM.
- **Duomenų bazė**: PostgreSQL (Produkcijoje) / SQLite (Lokaliai).

---
*LtEng_26 – mokomės kalbų su džiaugsmu!*
