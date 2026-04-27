# NutriTrack LV — Kaloriju izsekotājs

## Projekta apraksts
NutriTrack LV ir MVP līmeņa web lietotne kaloriju un uztura izsekošanai latviski.
Lietotne ietver pilnu datu apstrādes ciklu: **ievade → apstrāde → glabāšana → attēlošana**.

## Atbilstība uzdevuma kritērijiem

| Prasība | Risinājums |
|---|---|
| Frontend (vizuālā daļa) | Responsīvs HTML/CSS/JS interfeiss, navigācija starp lapām |
| Backend loģika | JS validācija, pieprasījumu apstrāde, kļūdu apstrāde |
| Datu bāze | localStorage abstraction (DB klase) — simulē relāciju DB |
| Autentifikācija | Login/Register, paroles hash, session, ierobežota piekļuve |
| CRUD | Create/Read/Update/Delete ēdienu ierakstiem |
| Datu validācija | Tukši lauki, negatīvas vērtības, formātu pārbaudes |
| Kļūdu apstrāde | Try/catch, kļūdu paziņojumi UI |
| Logging | INFO/ERROR/WARN žurnāls ar laiku un datumu |

## Izmantotās tehnoloģijas
- **Frontend:** HTML5, CSS3 (CSS variables, Grid, Flexbox), Vanilla JavaScript
- **Datu glabāšana:** localStorage (DB abstrakcijas slānis)
- **Arhitektūra:** Single Page Application (SPA)

## Palaišanas instrukcija
1. Lejupielādēt `uzturs_mvp.html`
2. Atvērt jebkurā mūsdienu pārlūkā (Chrome, Firefox, Edge)
3. Nav nepieciešams serveris vai papildu instalācija

## Demo konts
- **E-pasts:** admin@nutritrack.lv
- **Parole:** admin123

## Lietošanas apraksts

### 1. Reģistrācija / Pieteikšanās
- Jauns lietotājs reģistrējas ar vārdu, e-pastu, paroli un kaloriju mērķi
- Esošs lietotājs piesakās ar e-pastu un paroli

### 2. Ēdiena pievienošana
- Lapa "Pievienot ēdienu" — aizpildīt formu vai izmantot ātrās pogas
- Ievadīt nosaukumu, ēdienreizi, daudzumu, kalorijas, makroelementus

### 3. Žurnāls
- Lapa "Ēdienu žurnāls" — filtrēt pēc datuma
- Labot vai dzēst ierakstus

### 4. Pārskats
- Lapa "Pārskats" — kaloriju progress, makroelementi, nedēļas grafiks

### 5. Profils
- Lapa "Profils" — rediģēt vārdu, kaloriju mērķi, aprēķināt BMR

### 6. Padomi
- Lapa "Padomi" — filtrēt pa kategorijām

### 7. Sistēmas žurnāls
- Lapa "Sistēmas žurnāls" — INFO/ERROR/WARN notikumi

## Testēšanas scenāriji

**Scenārijs 1 — Veiksmīga reģistrācija un ēdiena pievienošana:**
1. Reģistrēties ar jaunu e-pastu
2. Pieteikties
3. Iet uz "Pievienot ēdienu"
4. Aizpildīt formu un saglabāt
5. Pārbaudīt "Pārskats" — kaloriju skaitītājs atjaunojies
6. Pārbaudīt "Sistēmas žurnāls" — redzami INFO notikumi

**Scenārijs 2 — Validācija un kļūdu apstrāde:**
1. Mēģināt pieteikties ar nepareizu paroli → kļūdas paziņojums
2. Pievienot ēdienu bez nosaukuma → validācijas brīdinājums
3. Ievadīt negatīvas kalorijas → validācijas kļūda
4. Visas kļūdas tiek reģistrētas žurnālā

## Projekta struktūra
```
uzturs_mvp.html
├── <style>           — dizains un CSS mainīgie
├── Auth screen       — pieteikšanās / reģistrācija
├── App shell         — navigācija, topbar
├── Pages
│   ├── Dashboard     — pārskats, progress, grafiks
│   ├── Food Log      — CRUD tabula
│   ├── Add Food      — forma + ātrā pievienošana
│   ├── Profile       — lietotāja dati, BMR aprēķins
│   ├── Tips          — uztura padomi ar filtru
│   └── System Log    — logging mehānisms
└── <script>
    ├── DB            — localStorage abstrakcija
    ├── Auth          — login/register/logout
    ├── CRUD          — addEntry/deleteEntry/saveEdit
    ├── Dashboard     — renderDashboard/renderWeeklyChart
    ├── Profile       — saveProfile/calcBMR
    └── Logging       — log(level, msg)
```

## Drošības risinājumi
- Paroles tiek hash-otas (nav glabātas atklātā tekstā)
- Lietotāji var piekļūt tikai saviem datiem (attēlots pēc sesijas)
- Datu validācija gan klienta pusē

## Git vēsture (ieteicamie commits)
```
git init
git add .
git commit -m "init: projekta struktūra un auth sistēma"
git commit -m "feat: food entry CRUD un validācija"
git commit -m "feat: dashboard ar progresa joslu un grafiku"
git commit -m "feat: sistēmas logging INFO/ERROR/WARN"
git commit -m "feat: uztura padomi un BMR kalkulators"
git commit -m "fix: datu validācija un kļūdu apstrāde"
git commit -m "docs: README.md pievienots"
```
