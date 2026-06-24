## Catálogo de equipamento (app)

O inventário/loja usa **somente** itens das tabelas do Cap. 4 (Equipment), páginas **71–76** do PDF:

- Fonte no código: `src/shared/data/lotrPdfEquipment.ts`
- OCR: `data/extracted/equipment-ocr.txt`

```bash
node scripts/extract-equipment-ocr.mjs
```

**Inclui:** Adventuring Gear, Armours, Weapons, Tools (artesãos, jogos, instrumentos), Montarias (pôneis/cavalos, p. 76).

**Exclui:** Out-of-pocket Expenses (refeições, estadia em estalagem, etc.) — são serviços, não itens de inventário.
