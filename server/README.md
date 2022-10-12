# Back-End

- NodeJS
- Database: SQLite
- ORM: Prisma

## Entidades

### Game 

id
title
bannerUrl

### Ad 

id
gameId
name
yearsPlaying
discord
weekDays
hourStart
hourEnd
useVoiceChannel
createdAt

## Caso de Uso

- Listagem de games com contagem de anúncios
- Criação de novo anúncio
- Listagem de anúncios por game
- Buscar discord pelo ID do anúncio