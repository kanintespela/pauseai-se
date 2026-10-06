# PauseAI Sveriges hemsida

Det här är källkoden till PauseAI Sveriges nya hemsida. Sajten är under uppbyggnad.

- **Förhandsvisning:** https://kanintespela.github.io/pauseai-se/
- **Byggd med:** [Astro](https://astro.build), som gör om textfiler till en vanlig webbplats.
- **Redigeras i:** [Pages CMS](https://app.pagescms.org), ett enkelt webbgränssnitt utan kod.
- **Ligger på:** GitHub Pages. Varje ändring publiceras automatiskt efter ett par minuter.

## Lägga upp en nyhet eller ett evenemang

Du behöver inte kunna koda.

1. Skapa ett gratis konto på [github.com](https://github.com/signup) om du inte har ett.
2. Be någon i webbgruppen att lägga till dig som medarbetare i repot.
3. Gå till [app.pagescms.org](https://app.pagescms.org) och logga in med GitHub.
4. Välj **kanintespela/pauseai-se**.
5. Välj **Nyheter**, **Evenemang** eller **Sidor** i menyn och klicka på **Add an entry** för att skapa något nytt, eller på en befintlig post för att ändra den.
6. Fyll i fälten och klicka **Save**. Ändringen syns på sajten efter ett par minuter.

Bilder laddas upp direkt i formuläret och sparas i `public/bilder/`.

## Ge feedback

Skriv i WhatsApp-gruppen, eller [skapa ett ärende (issue)](https://github.com/kanintespela/pauseai-se/issues/new) här på GitHub.

## Var finns vad?

| Mapp | Innehåll |
| --- | --- |
| `src/content/nyheter/` | Nyheter, en fil per nyhet |
| `src/content/evenemang/` | Evenemang, en fil per evenemang |
| `src/content/sidor/` | Vanliga sidor som Risker, Förslaget och FAQ |
| `src/pages/` | Startsidan och mallar för listor |
| `src/components/` | Meny, sidfot och andra delar som återkommer |
| `src/styles/global.css` | Färger och typsnitt |
| `.pages.yml` | Vilka fält som finns i Pages CMS |

## Köra sajten lokalt (för utvecklare)

Kräver Node.js 22.12 eller senare.

```sh
npm install
npm run dev      # förhandsvisning på http://localhost:4321/pauseai-se/
npm run build    # bygger sajten till dist/
npm run check    # letar efter fel
```

Repot är publikt. Lägg aldrig in lösenord, nycklar eller personuppgifter här.

## När pauseai.se ska peka hit

Ändra `site` till `https://pauseai.se` och ta bort `base` i `astro.config.mjs`, lägg till filen `public/CNAME` med texten `pauseai.se`, och be PauseAI Global (som äger domänen) att peka den till GitHub Pages.

## Licens

Texterna delas under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.sv). Många av dem bygger på [PauseAI:s](https://pauseai.info) texter. Se [LICENSE](LICENSE).
