# LOTR Roleplaying — Ficha de Personagem

Aplicação React para preencher a ficha de **The Lord of the Rings™ Roleplaying** (Free League / 5E).

## Funcionalidades

- Criação de personagem (cultura, chamado, virtudes/ofícios, equipamento inicial)
- Ficha editável com auto-save em `localStorage`
- Inventário estruturado, loja e cálculo de carga
- Combate: CA, ataques, dano e integração com virtudes
- Itens mágicos e recompensas (catálogo do Treasure Index)
- Aba História com sugestões do livro (antecedente, comunidade, aparência)
- Ficha final para impressão (`Ctrl+P`)

## Tecnologias

- React 19 + TypeScript + Vite
- Flowbite React + Tailwind CSS v4
- Persistência local (sem backend)

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173).

```bash
npm run build    # produção
npm run preview  # testar o build localmente
```

### Scripts de extração (opcional)

Requer o PDF do livro **apenas na sua máquina** (não versionado):

| Comando | Uso |
|---------|-----|
| `npm run extract:equipment` | Cap. 4 — equipamento |
| `npm run extract:treasure` | Rewards + Treasure Index |
| `npm run parse:treasure` | Rascunho JSON do índice |
| `npm run parse:creation` | Dados de criação |

Coloque o arquivo na raiz: `Lord Of The Rings Roleplay.pdf`

## Deploy na Vercel

1. Envie o repositório para o GitHub (veja checklist abaixo).
2. Em [vercel.com](https://vercel.com) → **Add New Project** → importe o repo.
3. A Vercel detecta Vite automaticamente (`vercel.json` já define build e `dist/`).
4. Não há variáveis de ambiente obrigatórias (app 100% client-side).

Ou via CLI:

```bash
npx vercel
npx vercel --prod
```

## Checklist antes do `git push`

- [ ] PDF do livro **não** está no commit (fica local + `.gitignore`)
- [ ] `npm run build` passa sem erros
- [ ] Repositório remoto configurado: `git remote -v`
- [ ] Primeiro push: `git push -u origin main`

## Arquitetura

```
src/
├── domain/           # Entidades, regras, serviços (combate, inventário, itens mágicos)
├── application/      # Casos de uso
├── infrastructure/   # localStorage
├── presentation/     # UI React
└── shared/data/      # Catálogos (equipamento, virtudes, tesouros)
```

## Aviso legal

Este projeto é uma ferramenta de fãs. *The Lord of the Rings* e *The Lord of the Rings Roleplaying* são marcas da Middle-earth Enterprises / Free League Publishing. Não distribua o PDF oficial do livro no repositório público.
