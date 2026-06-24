# Ficha Terra-média — O Senhor dos Anéis RPG

Aplicação web para preencher a ficha de **The Lord of the Rings™ Roleplaying** (Free League).

Repositório sugerido no GitHub: `ficha-terra-media-lotr` (hoje: `lotr-dnd`).

## Abas da ficha

| Aba | Conteúdo |
|-----|----------|
| **Criação** | Cultura, chamado, virtudes e equipamento inicial |
| **Aventura** | Atributos, perícias, combate, equipamento e tesouros |
| **Inventário** | Itens, loja e carga |
| **Resumo** | Visão geral para mesa e impressão |
| **História** | Comunidade, aparência e crônica |

## Desenvolvimento

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

### PDFs locais (pasta `doc/`)

Crie a pasta `doc/` na raiz e coloque os arquivos com estes nomes (não versionados):

| Arquivo | Conteúdo |
|---------|----------|
| `doc/senhor-dos-aneis-rpg-regras.pdf` | Livro de regras (OCR dos scripts) |
| `doc/senhor-dos-aneis-ficha-oficial.pdf` | Ficha oficial em PDF (referência) |

Se você já tinha os PDFs com nomes antigos na raiz, renomeie e mova:

- `Lord Of The Rings Roleplay.pdf` → `doc/senhor-dos-aneis-rpg-regras.pdf`
- `The-Lord-of-the-Rings-Roleplaying-character-sheet.pdf` → `doc/senhor-dos-aneis-ficha-oficial.pdf`

| Comando | Uso |
|---------|-----|
| `npm run extract:equipment` | Equipamento (Cap. 4) |
| `npm run extract:treasure` | Recompensas + Treasure Index |
| `npm run parse:treasure` | Rascunho JSON do índice |

## Deploy na Vercel

1. Importe o repositório em [vercel.com/new](https://vercel.com/new)
2. Framework **Vite** — build `npm run build`, pasta `dist`
3. Sem variáveis de ambiente

```bash
npx vercel --prod
```

## Antes do push

- [ ] `npm run build` ok
- [ ] PDF do livro **fora** do Git (só local)
- [ ] Se o repo for público: considere purgar o PDF do histórico antigo (ver commit anterior ao `853ef36`)

## Stack

React 19 · TypeScript · Vite · Flowbite · Tailwind · localStorage

## Aviso legal

Ferramenta de fãs. Marcas de *The Lord of the Rings* / Free League Publishing. Não publique o PDF oficial no repositório.
