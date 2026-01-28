# Neopac Srl — Sito Vetrina

Sito statico multilingue per la presentazione di macchine e impianti industriali.

## 📋 Struttura del sito

```
/it          → Versione italiana (home)
/en          → Versione inglese
/fr          → Versione francese
/assets      → CSS e JavaScript
/img         → Immagini (prodotti e impianti)
/data        → Dati dinamici (video)
/docs        → Documenti (cataloghi PDF)
```

## 🌍 Lingue

Il sito supporta tre lingue: **Italiano (IT)**, **Inglese (EN)**, **Francese (FR)**.

### Come funziona lo switch lingua

- Cliccando sul link della lingua (IT, EN, FR) in alto a destra, il sito rimane sulla **stessa pagina** nella lingua selezionata
- Non verrà mai reindirizzato alla home se sei su una pagina interna
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

## 📞 Contatti

Neopac Srl  
Località Roncabone 3 - Frazione Diolo  
29018 Lugagnano Val D'Arda-Piacenza (Italia)  
P.Iva 01104030331  
Tel. ++39 0523/377171  
Email: neopac@neopac.it  
Sito: www.neopac.it

