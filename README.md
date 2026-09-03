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

## Funzionalità principali

- **Registrazione ore**: timer avvia/ferma, oppure inserimento manuale con data, tipo, sede, auto usata e stato del pagamento.
- **Sede**: Draivo Molassana, Draivo Europa oppure Altro (con nota libera per indicare quale).
- **Calendario**: per segnare in anticipo esami e lezioni al simulatore/commissioni già fissati, con sede e fascia oraria (Mattina/Pomeriggio per gli esami, orario preciso per simulatore/commissione/altro). Dalla lista del calendario, il pulsante "Registra ore" apre il modulo di inserimento manuale già precompilato con data, tipo e sede — una volta salvato, l'appuntamento viene tolto dal calendario.

## Personalizzazione

- **Tariffa oraria** (default 10 €/h) e **bonus per uso dell'auto propria**: modificabili dall'icona ⚙ in alto a destra.
- Le categorie di lavoro (Esame, Simulatore, Commissione, Altro) e le sedi sono fisse nel codice: si possono cambiare modificando i pulsanti dentro `<div class="seg" id="segTipo">` / `id="segSede"` in `index.html`.
