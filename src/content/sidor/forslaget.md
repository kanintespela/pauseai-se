---
title: PauseAI Förslag
description: Implementera en tillfällig paus för träning av AI-system som är kraftfullare än GPT-4, förbjuda träning på upphovsrättsskyddat material, håll modellskapare ansvariga.
---

**Implementera en paus för träning av AI-system som är kraftfullare än GPT-4**, tills vi vet hur man bygger dem säkert och håller dem under demokratisk kontroll.

Enskilda länder kan och bör implementera denna åtgärd _just nu_.
Speciellt USA (eller Kalifornien, specifikt) bör implementera en paus, eftersom det är hem för praktiskt taget alla ledande AI-företag.
Många forskare och industriledare [håller med om att en paus är nödvändig](https://futureoflife.org/open-letter/pause-giant-ai-experiments/), och (USA) allmänheten stöder också starkt en paus ([64%](https://www.campaignforaisafety.org/usa-ai-x-risk-perception-tracker/) - [69%](https://today.yougov.com/topics/technology/survey-results/daily/2023/04/03/ad825/2)).

Vi kan dock inte förvänta oss att länder eller företag ska riskera sin konkurrensfördel genom att pausa AI-träningskörningar under en lång tid om andra länder eller företag inte gör detsamma.
Det är därför vi behöver en **global paus**.

## Implementering av en global paus

Ett internationellt avtal upprättas vanligtvis genom ett toppmöte, där ledare för länder träffas för att diskutera frågan och fatta ett beslut.
Storbritannien har tagit initiativet och har varit värd för ett AI-säkerhetstoppmöte hösten 2023.
Och två ytterligare toppmöten har tillkännagivits.
[Läs mer om toppmötena](https://pauseai.info/summit).

Det primära målet med toppmötet bör vara ett **fördrag**.
Detta fördrag bör specificera de politiska åtgärder som skyddar oss från [riskerna med AI](/risker).
Detta fördrag måste undertecknas av alla FN-medlemsstater.

- **Inrätta en internationell AI-säkerhetsbyrå**, liknande IAEA. Denna byrå kommer att vara ansvarig för:
  - Bevilja godkännande för _distributioner_. Detta kommer att inkludera rödteamning / modelevalueringar.
  - Bevilja godkännande för _nya träningskörningar_ av AI-modeller över en viss storlek (t.ex. 1 miljard parametrar).
  - Periodiska möten för att diskutera framstegen inom AI-säkerhetsforskning.
- **Tillåt endast träning av generella AI-system som är kraftfullare än GPT-4 om deras säkerhet kan garanteras**.
  - Med kraftfullare än GPT-4 menar vi alla AI-modeller som antingen är 1) större än 10^12 parametrar, 2) har mer än 10^25 FLOPs använda för träning eller 3) förmågor som förväntas överstiga GPT-4.
  - Observera att detta inte riktar sig mot _smala_ AI-system, som bildigenkänning som används för att diagnostisera cancer.
  - Kräva [övervakning under träningskörningar](https://www.alignmentforum.org/posts/Zfk6faYvcf5Ht7xDx/compute-thresholds-proposed-rules-to-mitigate-risk-of-a-lab).
  - Säkerhet kan garanteras om det finns stark vetenskaplig konsensus och [bevis](https://arxiv.org/abs/2309.01933) för att _anpassningsproblemet har lösts_. Just nu är detta inte fallet, så just nu bör vi inte tillåta träning av sådana system.
  - Det kan vara möjligt att AI-anpassningsproblemet _aldrig löses_ - det kan vara olösligt. I så fall bör vi aldrig tillåta träning av sådana system.
  - Även om vi kan bygga kontrollerbara, säkra AI, bör vi endast bygga och distribuera sådan teknik med **stark demokratisk kontroll**. En superintelligens är för kraftfull för att kontrolleras av ett enda företag eller land.
  - [**Spåra försäljningen av GPU:er**](https://arxiv.org/abs/2303.11341) och annan hårdvara som kan användas för AI-träning.
- **Tillåt endast distribution av modeller efter att inga [farliga förmågor](https://pauseai.info/dangerous-capabilities) finns närvarande**.
  - Vi kommer att behöva standarder och oberoende rödteamning för att avgöra om en modell har farliga förmågor.
  - Listan över farliga förmågor kan förändras över tid i takt med att AI-förmågorna växer.
  - Observera att fullständigt förlita sig på modelevalueringar [inte är tillräckligt](https://pauseai.info/4-levels-of-ai-regulation).

Implementering av en paus _kan_ slå tillbaka om det inte görs på rätt sätt.
Läs mer om [hur dessa risker kan mildras](https://pauseai.info/mitigating-pause-failures).

För mer information om hur leveranskedjan för AI-chip kan användas för global tillsyn, läs [Bygga pausknappen](https://pauseai.info/building-the-pause-button).

## Andra åtgärder som effektivt saktar ner

- **Förbjud träning av AI-system på upphovsrättsskyddat material**. Detta hjälper till med upphovsrättsproblem, saktar ner växande ojämlikhet och saktar ner framsteg mot superintelligens.
- **Håll AI-modellskapare ansvariga** för brott som begås med deras AI-system. Detta ger modellskapare fler incitament att säkerställa att deras modeller är säkra.

## Långsiktig policy

Vid tidpunkten för detta skrivande kostar det miljoner dollar att träna en modell i GPT-3-storlek.
Detta gör det mycket svårt att träna sådana modeller, och detta gör det lättare att genomdriva kontrollen av träning med hjälp av GPU-spårning.
Men kostnaden för att träna en modell minskar exponentiellt på grund av hårdvaruförbättringar och nya träningsalgoritmer.

Det kommer att komma en tidpunkt då potentiellt superintelligenta AI-modeller kan tränas för några tusen dollar eller mindre, kanske till och med på konsumenthårdvara.
Vi måste vara förberedda för detta.
Vi bör överväga följande policyer:

- **Begränsa publicering av träningsalgoritmer / förbättringar av körtid**. Ibland publiceras en ny algoritm som gör träningen mycket mer effektiv. Transformer-arkitekturen, till exempel, möjliggjorde praktiskt taget alla senaste framsteg inom AI. Dessa typer av förmågehopp kan hända när som helst, och vi bör överväga att begränsa publiceringen av sådana algoritmer för att minimera risken för ett plötsligt förmågehopp. På samma sätt kan vissa innovationer i körtid drastiskt förändra vad som kan göras med befintliga modeller. Dessa framsteg kan också behöva regleras.
- **Begränsa kapacitetsförbättringar av datorkraft**. Om träning av en superintelligens blir möjligt på konsumenthårdvara, är vi i trubbel. Vi bör överväga att begränsa kapacitetsförbättringar av hårdvara.

## Hjälp till att uppnå detta

[Gå med](/engagera-dig) i rörelsen för att samarbeta eller [vidta åtgärder](/engagera-dig) på egen hand!
