# Extração do PDF — Lord Of The Rings Roleplay

O PDF em `d:/Projetos/senhor dos aneis/Lord Of The Rings Roleplay.pdf` é **escaneado** (240 páginas, ~31 MB). A extração nativa de texto retorna apenas **~4.700 caracteres** no total.

## Método usado

**OCR com Tesseract.js** — renderização de cada página via `pdf-parse` + reconhecimento óptico (inglês).

## Arquivos gerados

| Arquivo | Descrição |
|---------|-----------|
| `character-creation-ocr.txt` | Texto completo OCR das páginas 20–75 (~166.000 caracteres) |
| `character-creation-ocr.json` | JSON com texto por página, fonte (`ocr`/`native`) |
| `page-stats.json` | Estatísticas de caracteres por página |

## Intervalo extraído (páginas do PDF)

- **20–75** — Capítulo 3 (Aventures / Criação de Personagem), Culturas Heroicas, Chamados, Equipamento inicial

Conteúdo inclui:
- Passos de criação (Cultura → Chamado → Atributos → Equipamento)
- **6 Culturas:** Bardings, Anões, Elfos de Lindon, Hobbits, Homens de Bree, Patrulheiros
- **6 Chamados:** Captain, Champion, Messenger, Scholar, Treasure Hunter, Warden
- Backgrounds, subculturas, bônus de atributos, perícias, tracos distintivos

## Como reexecutar

```bash
cd lotr-character-sheet
node scripts/extract-pdf-ocr.mjs
```

Para alterar o intervalo de páginas, edite `START_PAGE` e `END_PAGE` em `scripts/extract-pdf-ocr.mjs`.

## Limitações do OCR

- Erros de leitura (`Middle-carth`, `Plaver-heroes`, etc.)
- Layout de colunas pode misturar texto
- Imagens decorativas geram ruído
- Para dados estruturados (dropdowns na ficha), usar o texto OCR + validação manual ou o flipbook oficial

## Próximo passo

Parser em `scripts/parse-character-creation.mjs` para gerar `character-creation-data.json` estruturado a partir do OCR.
