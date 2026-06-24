# LOTR Roleplaying — Ficha de Personagem

Aplicação React para preencher a ficha oficial de **The Lord of the Rings™ Roleplaying** (Free League / 5E).

## Arquitetura

O projeto segue **Clean Architecture**, **SOLID** e **DDD**:

```
src/
├── domain/           # Entidades, Value Objects, regras de negócio
│   ├── entities/     # Character (Aggregate Root)
│   ├── value-objects/# AbilityScore, SkillProficiency, etc.
│   ├── services/     # CharacterCalculator
│   └── repositories/ # ICharacterRepository (interface)
├── application/      # Casos de uso e mappers
│   ├── use-cases/    # Load, Save, Create, Delete
│   └── mappers/      # CharacterMapper
├── infrastructure/   # Implementações concretas
│   ├── persistence/  # LocalStorageCharacterRepository
│   └── di/           # Injeção de dependências
├── presentation/     # UI React
│   ├── components/
│   ├── context/
│   └── pages/
└── shared/           # Constantes compartilhadas
```

### Princípios SOLID aplicados

- **S** — Cada use case e componente tem uma responsabilidade única
- **O** — `ICharacterRepository` permite trocar localStorage por API sem alterar domínio
- **L** — Repositórios respeitam o contrato da interface
- **I** — Interfaces pequenas e focadas (`ICharacterRepository`)
- **D** — Camadas superiores dependem de abstrações, não de implementações

## Funcionalidades

- Todos os campos da ficha oficial (página 1 e 2)
- Perícias exclusivas de LOTR (Explorar, Caça, Antiga Sabedoria, Enigmas, Viagem…)
- Cálculo automático de modificadores, testes de resistência e Sabedoria Passiva
- Auto-save no `localStorage`
- Layout inspirado no pergaminho medieval
- Suporte a impressão (`Ctrl+P`)

## Tecnologias

- **React 19** + **TypeScript** + **Vite**
- **[Flowbite React](https://flowbite-react.com/)** — componentes UI (TextInput, Checkbox, Button, Badge, Card, Table)
- **Tailwind CSS v4**
- Persistência via `localStorage`

## Como executar

```bash
npm install
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```
