## Catálogo de equipamento (app)

O inventário/loja usa **somente** itens das tabelas do Cap. 4 (Equipment), páginas **71–76** do PDF:

- Fonte no código: `src/shared/data/lotrPdfEquipment.ts`
- OCR: `data/extracted/equipment-ocr.txt`

```bash
node scripts/extract-equipment-ocr.mjs
```

**Inclui:** Adventuring Gear, Armours, Weapons, Tools (artesãos, jogos, instrumentos), Montarias (pôneis/cavalos, p. 76).

**Exclui:** Out-of-pocket Expenses (refeições, estadia em estalagem, etc.) — são serviços, não itens de inventário.

## Tesouros e itens mágicos (OCR)

Páginas **78–85** (Rewards) e **125–140** (Treasure Index):

- Catálogo curado: `src/shared/data/magicalItemsCatalog.ts`
- OCR: `data/extracted/treasure-ocr.txt`

```bash
npm run extract:treasure
npm run parse:treasure
```

O rascunho automático vai para `data/extracted/treasure-index-draft.json` (curadoria manual necessária).

## PDF local (não versionado)

Os scripts de extração esperam o livro em:

`Lord Of The Rings Roleplay.pdf` (raiz do projeto)

Esse arquivo **não** deve ir para o GitHub (tamanho ~30 MB e conteúdo sob direitos autorais da Free League).
