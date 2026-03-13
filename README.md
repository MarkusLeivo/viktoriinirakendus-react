# Viktoriinirakendus
Autor: Markus Leivo

Leht testimiseks: https://markusleivo.github.io/viktoriinirakendus-react/

Playwright testid: https://github.com/MarkusLeivo/viktoriinirakendus-react/blob/main/tests/quiz.spec.js


## Ülevaade
Reacti abil loodud interaktiivne viktoriinirakendus, mis testib kasutaja teadmisi Eesti statistika ja Statistikaameti ajaloo kohta. 
Küsimuste loomisel on kasutatud Statistikaameti lehelt leitavat ajaloo kirjeldust: https://stat.ee/et/statistikaamet/meist/eesti-statistika-ajalugu

Viktoriin koosneb kümnest valikvastustega küsimusest. Kasutaja saab iga küsimuse järel kohest tagasisidet ning viktoriini lõpus kuvatakse tulemuste tabel koos õigete vastustega.

## Funktsionaalsused
- 10 küsimust kolme vastusevariandiga
- Küsimused ja vastusevariandid on iga kord erinevas järjekorras
- Kohene tagasiside pärast küsimusele vastamist
- Skoori arvutamine
- Küsimuste ülevaate tabel viktoriini lõpus 
- Lehe uuendamisel säilib viktoriini olek 
- Pikematel lehtedel "Üles" nupp lehe kerimiseks
- Kujundus on kooskõlas Statistikaameti CVI-ga
- Leht töötab ka mobiilivaates

## Struktuur
- "components" kaustas on UI elemendid nagu footer, header, sidebar ja layout.
- "data" kaustas on viktoriini küsimused
- "utils" kaustas on küsimuste segamise funktsioon
- "public" kaustas on kasutatud logo ja tiitli ikoon
- "tests" kaustas on Playwrighti testid
  
Põhikood on nagu ikka "App.js" ja "App.css" failides. Vähesel määral muudetud ka "index.html" ja "index.css" faile.

## Puudused
- Kuna hetkel on küsimused ja vastused kõik front-endis, siis on väga lihtne leida õiged vastused "inspect element" kaudu üles :)
