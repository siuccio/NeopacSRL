# Neopac Srl — Sito Vetrina

Sito statico multilingue per la presentazione di macchine e impianti industriali.

**Live:** https://neopac.it

## 🚀 Quick Start

### Per visualizzare il sito localmente:
1. Non è necessario alcun setup speciale (HTML puro)
2. Apri un browser e vai a `file:///path/to/it/index.html`


---

## 💻 Tecnologie Usate

- **HTML5** - Semantico e accessibile
- **CSS3** - Grid, Flexbox, Variabili CSS
- **JavaScript (Vanilla)** - Zero dipendenze, performance ottimali
- **JSON** - Dati dinamici (video, impianti, prodotti)
- **SVG** - Icone vettoriali (scalabili e leggere)

**Zero framework, Zero librerie esterne** → Sito veloce e leggero!

---

## 🌐 Deployment & Hosting

### Opzioni di hosting alternative:
- **Netlify** (simile a Vercel)
- **GitHub Pages** (gratuito)
- **Server statico qualsiasi** (NGINX, Apache, ecc.)

---

## ⚡ Optimizzazioni di Performance

Il sito include diverse ottimizzazioni:

- **Lazy loading** - Le immagini si caricano solo quando entrano nella viewport
- **CSS containment** - Migliora il rendering su carrelli e sezioni
- **Carousel ottimizzato per chi-siamo** - Carica i dati JSON solo quando visibile (IntersectionObserver)
- **Minified CSS** - Inline per evitare richieste extra
- **Zero dipendenze** - Nessuna libreria, nessuno script blocca il rendering

**Core Web Vitals: Eccellenti** ✅

---

## 🔍 SEO & Meta Tags

Completamente ottimizzato per i motori di ricerca:

- ✅ Meta description e keywords per tutte le pagine
- ✅ Open Graph tags per social sharing (og:title, og:description, og:image, og:url)
- ✅ Hreflang tags per le 3 lingue
- ✅ Canonical URLs
- ✅ Schema.org JSON-LD (Organization)
- ✅ Alt text su tutte le immagini (accessibilità)
- ✅ Favicon presente
- ✅ robots.txt e sitemap.xml configurati
- ✅ Una sola H1 per pagina

---

## 🌈 Favicon e Logo

- **Favicon:** `/assets/Favicon.png` (32×32px)
- **Logo:**  Mostra accanto al brand "NEOPAC" nell'header
- **SVG logo:** `/assets/logo.svg` (per schema.org)

---

## 🖥️ Browser Supportati

- Chrome / Edge (ultime versioni)
- Firefox (ultime versioni)
- Safari (ultime versioni)
- Mobile browsers (iOS Safari, Chrome Android)

**Non supporta:** IE11 e versioni precedenti

---

## 📋 Struttura del sito

```
/it                    → Pagine italiano (Home, Impianti, Chi siamo)
/en                    → Pagine inglese
/fr                    → Pagine francese
/assets                → CSS, JS, Favicon, SVG logo
/img                   → Icone SVG prodotti
/assets_nuovi          → Immagini impianti (organizzate per categoria)
/data                  → JSON dinamici (video, impianti)
/docs                  → PDF (catalogo)
index.html             → Entry point (redirect a /it/)
robots.txt             → Per search engines
sitemap.xml            → Mappa del sito per SEO
.gitignore             → File ignorati da Git
README.md              → Questo file
```

---

## 🎨 Modificare il Codice

### CSS (Stile)
**File:** `/assets/styles.css`

Contiene:
- Variabili CSS (colori, dimensioni, etc.)
- Grid e Flexbox
- Responsive design (media queries)
- Animazioni

**Come modificare:**
1. Apri il file CSS
2. Modifica le variabili `:root` per i colori globali
3. Modifica le classi per il layout
4. Ricaricha il browser per vederi le modifiche

### JavaScript (Funzionalità)
**File:** `/assets/site.js`

Contiene:
- Gestione lingua (hreflang)
- Caricamento JSON dinamico
- Carousel video
- Carousel prodotti
- Caricamento immagini con lazy loading
- Carousel impianti con IntersectionObserver

**Come modificare:**
1. Apri il file JS
2. Le funzioni sono ben commentate
3. Non modificare senza testare bene
4. Ricaricha il browser e apri DevTools (F12) per controllare errori console

---

## 🌍 Lingue

Il sito supporta tre lingue: **Italiano (IT)**, **Inglese (EN)**, **Francese (FR)**.

### Come funziona lo switch lingua

- Cliccando sul link della lingua (IT, EN, FR) in alto a destra, il sito rimane sulla **stessa pagina** nella lingua selezionata
- La lingua corrente è sempre evidenziata

### Pagine disponibili

1. **Home** (`index.html`) — Introduzione, video, prodotti confezionabili
2. **Impianti & Macchine** (`impianti.html`) — Catalogo con filtri di ricerca
3. **Chi siamo** (`chi-siamo.html`) — Presentazione aziendale

## 🎬 Modificare i video in home

I video in home sono gestiti dinamicamente da un file JSON. Per modificarli:

### 📁 File da modificare
**Percorso:** `/data/videos.json`

### 📝 Struttura del file

```json
{
  "videos": [
    {
      "id": "YY2arrh38k8",
      "title": "Precisione al grammo: guarda come dosiamo"
    },
    {
      "id": "jeBDem7qEbU",
      "title": "Altro video"
    }
  ]
}
```

### 📌 Come modificare

1. Apri `/data/videos.json` con un editor di testo
2. Aggiungi o rimuovi video dalla lista
3. Per ogni video, fai il copia-incolla di uno dei video esistenti
4. Sostituisci l'**ID YouTube** (il codice dopo `v=` nell'URL del video)
5. Sostituisci il **titolo** (la descrizione che appare sotto il video)
6. Salva il file e ricarica il sito nel browser

#### 📋 Dove trovare l'ID YouTube

Se il link YouTube è: `https://www.youtube.com/watch?v=YY2arrh38k8`

L'ID è: `YY2arrh38k8` (la parte dopo `v=`)

---

## 📸 Modificare i prodotti e gli impianti

La sezione **Impianti & Macchine** è organizzata in tre categorie dinamiche:
- **Accessori** (con sottocategoria Dosatori)
- **Macchine** (Orizzontali e Verticali)
- **Impianti** (Configurazioni complete)

### 📁 File da modificare
**Percorso:** `/data/impianti.json`

### 🏗️ Struttura del file

Il file è organizzato così:
```json
{
  "sections": [
    {
      "id": "accessori",
      "title_it": "Accessori",
      "title_en": "Accessories",
      "title_fr": "Accessoires",
      "subsections": [
        {
          "id": "dosatori",
          "title_it": "Dosatori",
          "items": [
            {
              "id": "microdos",
              "name_it": "Microdos",
              "name_en": "Microdos",
              "name_fr": "Microdos",
              "image": "../assets_nuovi/1 - DOSATORI/0 - MICRODOS.jpg"
            }
          ]
        }
      ]
    }
  ]
}
```

### 📌 Come modificare

#### Aggiungere un nuovo prodotto:
1. Apri `/data/impianti.json`
2. Trova la sezione desiderata (accessori, macchine, impianti)
3. Trova la sottosezione (es. "dosatori")
4. Aggiungi un nuovo item alla fine della lista `"items"`
5. Esempio di un item:
```json
{
  "id": "nuovo_prodotto",
  "name_it": "Nome Italiano",
  "name_en": "English Name",
  "name_fr": "Nom Français",
  "image": "../assets_nuovi/CARTELLA/NOME_IMMAGINE.jpg"
    }
    ```

#### Per ogni campo:
- **id**: identificativo univoco (usa underscore, non spazi)
- **name_it/en/fr**: nome del prodotto nelle tre lingue
- **image**: percorso relativo all'immagine (deve essere in `/assets_nuovi/`)

### 🎨 Note importanti

- I nomi nella sezione sono **multilingue**: cambiano automaticamente in base alla lingua selezionata
- Le immagini devono essere in `/assets_nuovi/` negli appositi sottocartelle
- Il file è in formato JSON: presta attenzione alle **virgole** e alle **parentesi**
- Se commetti errori di sintassi, la pagina potrebbe non caricarsi

### ⚠️ Validazione

Dopo ogni modifica, **valida il file JSON** usando:
- Online: https://jsonlint.com/
- Oppure ricaricare il sito e controllare che i prodotti siano visibili

---

## 🎨 Colori e Tema

Il sito utilizza una **tavolozza light** con colori professionali:

- **Background**: `#f8f9fa` (grigio molto chiaro)
- **Surface**: `#ffffff` (bianco)
- **Text**: `#1a1a1a` (nero quasi puro)
- **Muted**: `#5a5a5a` (grigio scuro)
- **Primary**: `#213550` (blu navy)
- **Accent**: `#bf8021` (oro)

---

## 🔧 Funzioni principali

### 1. Carousel video (home)
- Video YouTube dinamici dalla sezione "Dal canale YouTube"
- Caricati automaticamente da `/data/videos.json`
- Aggiornamento in tempo reale senza ricaricare il codice

### 2. Immagine hero
- Immagine statica grande in home
- Mostra "Macchine Verticali + Tramoggia"
- Responsive e ottimizzata per il caricamento

### 3. Carousel prodotti (home)
- Lista di prodotti confezionabili che scorre automaticamente
- Aggiornamento ogni 3 secondi
- L'utente può scrollare manualmente

### 4. Filtri impianti (impianti.html)
- Ricerca per parola chiave in tempo reale
- Filtra i prodotti mentre digiti
- Funziona anche con invio o clic sul pulsante "Filtra"

---

## 📱 Responsive

Il sito è completamente responsive e funziona su:
- Desktop
- Tablet
- Mobile

---

## 🌐 Lingue supportate

- 🇮🇹 **Italiano** (IT) — Home
- 🇬🇧 **Inglese** (EN)
- 🇫🇷 **Francese** (FR)

Lo switch lingua è disponibile in alto a destra su ogni pagina.

---

## ❓ Troubleshooting

### Le immagini non si caricano
- Verifica che il percorso sia corretto in `impianti.json`
- Controlla che le immagini siano in `/assets_nuovi/` con il nome esatto
- Apri DevTools (F12) per vederi gli errori nella console

### JSON non valido
- Copia-incolla in https://jsonlint.com/ per validare
- Controlla le virgole: ogni elemento deve essere seguito da `,` tranne l'ultimo
- Usa un editor con syntax highlighting (VS Code)

### Carousel non scorre
- Ricaricha la pagina (Ctrl+F5)
- Controlla che il file JSON si carichi senza errori
- Apri la console (F12) e cerca messaggi di errore

### Lingua non cambia
- Pulisci la cache del browser (Ctrl+Shift+Delete)
- Ricaricha la pagina (F5)
- Verifica che il link lingua sia corretto

---

## 📝 Changelog

### Versione 2.0 (Feb 7, 2026)
- ✅ Pulizia codice (rimosso file inutili)
- ✅ Miglioramenti SEO (og:image, traduzioni)
- ✅ README completamente aggiornato

### Versione 1.0
- ✅ Setup iniziale sito
- ✅ Tre lingue (IT, EN, FR)
- ✅ JSON dinamici per video e impianti

---

## 📄 Licenza

Proprietà di Neopac Srl - Tutti i diritti riservati

---

## 📞 Contatti

Neopac Srl  
Località Roncabone 3 - Frazione Diolo  
29018 Lugagnano Val D'Arda-Piacenza (Italia)  
P.Iva 01104030331  
Tel. ++39 0523/377171  
Email: neopac@neopac.it  
Sito: www.neopac.it

