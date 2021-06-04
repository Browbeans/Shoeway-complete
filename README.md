# Shoeway-complete
Shoeway är en skobutik online, där du definitivt kommer finna ett par skor för dig! Projektet hade en front end del som redan fanns på plats när vi påbörjade projektet men vi har nu lagt till en backend-del. Databasen hostas av mongo-db atlas och samtliga som skapat projektet har tillgång till denna. Som admin användare kan man lägga till, ändra samt ta bort produkter men man har även CRUD-rättigheter på övriga resurser (Användare, ordrar och fraktalternativ). 

Det finns just nu i systemet en admin-användare men går även att begära en admin-roll när man registrerar sig. Produkter, Ordrar och Användare finns redan i databasen men går att lägga till samtliga från gränssnittet (om man är admin, gäller crud på produkter).  

## Start Project

To start the project:

First, type `npm i`, to fetch node modules packages.
Second, type `npm start`, to start the server.
Third, open a new terminal and type `cd client`, to get to the client-side folder.
Fourth, type `npm i`, to fetch node modules packages for client-side.
Fifth, type `npm start`, to view client-side in browser with live server.


## Kravlista

Alla sidor är responsiva:
Med hjälp av media-queries har vi fått till front-end-delen så att den anpassas efter olika skärmstorlekar. 

Arbetet ska implementeras med en React front end och en Express backend: 
Vi har arbetat med express för att skapa vår backend-del i projektet och hanterat datan till databasen med hjälp av mongoose. 

Skapa ett ER diagram och koddiagram, detta ska lämnas in vid idégodkännandet: 
Diagrammen är skapade och har uppdaterats under projektetes gång. 

All data som programmet utnyttjar ska vara sparat  i en mongo-databas:
Detta är gjort, all sorts data som kunden matar in i fält sparas i vår databas (förutom betalningssätt då vi ej vill spara sådana känsliga uppgifter) 

• Man ska kunna logga in som administratör i systemet (G): 
Tack vare arbete med roller i varje användare skapade vi en roll som admin, med denna behörighet kan man utföra crud operationer som inte en vanling användare kan.

• Man ska kunna registrera sig som administratör på sidan, nya användare ska sparas i
databasen (VG): 
När man registrerar sig kan man bocka i för att ansöka om admin, bockar man i denna så får man rollen som "pending" vilket betyder att en admin kan godkänna användaren till att bli admin. 

• En administratör behöver godkännas av en tidigare administratör innan man kan logga
in fösta gången (VG): 
Som det står ovan måste en administratör godkänna användaren som ansökt om admin-rättigheter, detta görs med hjälp av en switch på admin-sidan. 

• Inga Lösenord får sparas i klartext i databasen (G): 
Lösenorden krypteras med hjälp av bcypt i user-modellen precis innan uppgifterna sparas och skickas till databasen. 

• En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i
databasen (G): 
När en produkt beställs ändras lagersaldo för den produkt som har beställts (använder ett extra variant schema för att hantera olika storlekar och lagersaldo). 

• Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan
(G):
Detta görs via att man "går in på add size or stock" på admin sidan, matar man då in en storlek som inte finns på vald produkt skapas ett objekt i vår variant-array med de lagersaldo administratören matat in, men existerar den storlek redan uppdateras endast lagersaldot till det man matat in. 

• Administratörer ska kunna se en lista på alla gjorda beställningar (G):
På admin-sidan ser administratören samtliga beställningar. 

• Administratörer ska kunna markera beställningar som skickade (VG):
Där alla ordrar är listade finns det även en toggleknapp (isSent) där administratören kan fylla i om produkten är skickad eller ej, knappen skickar ett anrop till den specifika ordern och togglar en boolean som ligger i orderdokumentet (isSent true/false). 

• Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori,
men kan tillhöra flera (G):
Det finns tre olika kategorier på vår sida, "mens, womens, unisex", tillhör en sko kategorin unisex tillhör den även mens och womens, men om en sko tillhör mens är det den enda kategorin den tillhör. Detta görs med hjälp av en kategori-array för varje produkt

• Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista
bara dom produkter som tillhör en kategori (G):
Detta görs på produkt sidan, där man kan välja att visa "all, mens, womens, unisex" det värdet som blir i bockat tas emot och filtrerar arrayen baserat på värdet. 

• Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på
klienten (G):
Detta fanns på plats sen innan, så varje gång en produkt läggs till i varukorgen sparas den produkten som en "cart-item" i localstorage. 

• En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in
och måste vara inloggad som kund innan beställningen skapas (G):
Det finns två olika sätta att logga in/registrera sig antingen gör man det vid profilsidan eller vid kundkorgen när man ska skapa sin order. Anledningen till att detta finns på två ställen är just för att vara så användarvänliga som möjligt, ifall en kund endast vill in på sidan för att kolla tidigare ordrar ska man kunna göra det utan att behöva logga in via kundkorgen.

• När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är
skickade eller inte (VG):
Det kan man se på sin profilsida, och tack vare en boolean som existerar på varje order kan man även se om ordern är skickad eller ej. 

• Besökare ska kunna välja ett av flera fraktalternativ (G):
Databasen erbjuder 3 st olika fraktalternativ som har olika pris samt olika leveranstid. 

• Tillgängliga fraktalternativ ska vara hämtade från databasen (G):
Vid början av projektet skapade vi 3 fraktsätt som vi sparade i databasen, med hjälp av rest-client. 

• Administratörer ska kunna redigera vilka kategorier en produkt tillhör (VG):
Detta går att göra på de stället man redigerar produkter dock har man tre val att välja på "mens, womens, unisex".

• Administratörer ska kunna lägga till och ta bort produkter (VG):
Tack vare post, delete och put kan man ändra, lägga till samt ta bort produkter från databasen. Via gränssnittet kommuniceras detta via input-fält.  

• Backendapplikationen måste ha en fungerande global felhantering (VG):
Vi använder oss av en error-middleware som samtliga anrop går genom och stöter servern på ett error skickas detta error-meddelande via denna middleware. 

• Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält (G):
Via regex har vi skrivit olika acceptanskriterier för varje input-fält sen finns det även validering på datan som skickas till servern.

## Admin 
username: admin@live.se
pw: Testing1


