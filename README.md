# Le mie ore

App web per registrare ore di lavoro, calcolare il compenso maturato e tenere traccia di cosa è stato incassato e cosa resta da incassare. Funziona interamente nel browser: nessun server, nessun account, dati salvati solo sul dispositivo (`localStorage`).

## Come metterla su GitHub Pages

1. Crea un repository su GitHub (es. `le-mie-ore`).
2. Carica questi file nella root del repository:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192.png`
   - `icon-512.png`
   - `apple-touch-icon.png`
   - `calendario-condiviso.html`
   - `manifest-condiviso.json`
   - `firebase-config.js`
3. Vai su **Settings → Pages**, scegli come sorgente il branch `main` e cartella `/ (root)`.
4. Dopo qualche minuto l'app sarà raggiungibile su `https://<tuo-utente>.github.io/le-mie-ore/`.

## Come usarla su iPhone

**Da GitHub Pages (consigliato):**
1. Apri il link in Safari.
2. Tocca l'icona di condivisione → **Aggiungi a Home**.
3. L'app si apre a schermo intero come un'app nativa, con il logo dell'autoscuola come icona, e funziona anche offline (grazie al service worker).

**In locale, senza GitHub Pages:**
- Puoi aprire `index.html` direttamente in Safari da File/AirDrop, ma senza `https://` il service worker non si attiva: l'app funziona comunque, i dati restano salvati, ma manca la cache offline. Per usarla davvero offline in modo affidabile è meglio hostarla su GitHub Pages e poi aggiungerla alla Home.

## Dati e backup

Tutti i dati (registrazioni, tariffa oraria, bonus auto) restano solo sul tuo iPhone, dentro Safari. Se cambi telefono o resetti Safari li perdi, quindi:
- **Esporta backup** salva un file `.json` con tutto.
- **Importa backup** ripristina i dati da quel file (sostituisce quelli presenti).

Conviene esportare un backup ogni tanto (es. inviandolo a te stesso via Mail/AirDrop) e prima di ogni cambio dispositivo.

## Condividere il calendario con un'altra persona

Il calendario (gli appuntamenti che inserisci in anticipo) può essere sincronizzato online, così una pagina di sola lettura si aggiorna da sola ogni volta che aggiungi o togli qualcosa. **Le ore lavorate e i guadagni restano sempre solo sul tuo telefono**: non vengono mai sincronizzati, solo il calendario.

**1. Crea un progetto Firebase gratuito** (5 minuti, serve solo un account Google):
1. Vai su [console.firebase.google.com](https://console.firebase.google.com) → **Crea un progetto** (puoi disattivare Google Analytics, non serve).
2. Nella pagina del progetto clicca l'icona **`</>`** ("aggiungi app web"), dai un nome qualsiasi e registra l'app. Ti mostrerà un blocco `firebaseConfig = { ... }`: tienilo a portata di mano.
3. Nel menu a sinistra vai su **Realtime Database** (non "Firestore Database") → **Crea database** → scegli una zona europea → avvia in **modalità test**.
4. Nella scheda **Regole** del Realtime Database sostituisci il contenuto con questo e clicca **Pubblica**:
   ```json
   {
     "rules": {
       "calendario": {
         ".read": true,
         ".write": true
       }
     }
   }
   ```
   Questo lascia leggibile/scrivibile solo il calendario, a chiunque abbia il link della tua app — nessun altro dato è esposto. Non è protetto da password: va bene per un uso familiare, ma non condividere il link pubblicamente.

**2. Incolla la configurazione**: apri `firebase-config.js` e sostituisci i valori segnaposto con quelli del blocco `firebaseConfig` copiato al passo 1. Carica il file aggiornato su GitHub.

**3. Condividi con tua moglie**: dopo aver aggiornato GitHub Pages, mandale il link `https://<tuo-utente>.github.io/le-mie-ore/calendario-condiviso.html`. È una pagina di sola lettura (non può modificare nulla) che si aggiorna da sola in tempo reale — può anche aggiungerla alla Home del suo iPhone come le hai fatto tu.

Finché `firebase-config.js` resta con i valori segnaposto, l'app continua a funzionare normalmente ma solo in locale, come prima. Nota anche che gli appuntamenti aggiunti al calendario *prima* di completare questa configurazione non vengono importati automaticamente nella sincronizzazione: conviene attivarla prima di iniziare a usare il calendario, oppure reinserirli dopo.

## Funzionalità principali

- **Registrazione ore**: timer avvia/ferma, oppure inserimento manuale con data, tipo, sede, auto usata e stato del pagamento.
- **Sede**: Draivo Molassana, Draivo Europa oppure Altro (con nota libera per indicare quale).
- **Calendario**: per segnare in anticipo esami e lezioni al simulatore/commissioni già fissati, con sede e fascia oraria (Mattina/Pomeriggio per gli esami, orario preciso per simulatore/commissione/altro). Dalla lista del calendario, il pulsante "Registra ore" apre il modulo di inserimento manuale già precompilato con data, tipo e sede — una volta salvato, l'appuntamento viene tolto dal calendario.

## Personalizzazione

- **Tariffa oraria** (default 10 €/h), **rimborso auto propria** e **ore previste di default per tipo** (usate dal calendario): modificabili dall'icona ⚙ in alto a destra.
- Le categorie di lavoro (Esame, Simulatore, Commissione, Altro) e le sedi sono fisse nel codice: si possono cambiare modificando i pulsanti dentro `<div class="seg" id="segTipo">` / `id="segSede"` in `index.html`.

## Novità della versione 2

- **Simulatore**: mostra solo la sede Draivo Europa e non chiede l'auto.
- **Altro**: campo nota per annotare cosa è stato fatto (anche nel calendario).
- **Rimborsi**: separati dal guadagno. Contengono il rimborso per l'auto propria e, a piacere, spese inserite a mano con una descrizione. Hanno una casella dedicata tra le statistiche e non entrano in Totale maturato / Incassato / Da incassare.
- **Previsione nel calendario**: ogni impegno ha le ore previste; la sezione calendario mostra impegni, ore e guadagno *ipotetico* del mese, separato dal totale maturato. Quando confermi le ore con "Registra ore", l'impegno esce dalla previsione ed entra nel maturato. Un pallino rosso indica un impegno già passato ancora da confermare.
- Il backup ora include anche il calendario.
- **Aggiornamento**: per installare la v2 sostituisci `index.html`, `calendario-condiviso.html` e `sw.js` su GitHub. **Non sovrascrivere `firebase-config.js`**: contiene la tua configurazione.
