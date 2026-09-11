# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

<Games title="Victoria 3 (2021)" image={vic3} button="Indisponível">
        A Paradox te convida para construir sua sociedade ideal no tulmuto do
        transformativo século 19. Configure os interesses competitivos da sua
        sociedade e ganhe seu lugar no sol do Victoria 3, um dos jogos mais
        esperados na história da Paradox.
      </Games>
      <Games title="Crusader Kings 2 (2012)" image={ck2} button="Indisponível">
        Explore um dos periodos definitivos da historia mundial em uma
        experiência criada pelos mestres dos jogos de estratégia
      </Games>
      <Games title="Hearts of Iron 4 (2016)" image={hoi4} button="Indisponivel">
        A vitória está em suas mãos! A sua habilidade de liderar sua nação é sua
        arma suprema, o jogo de estratégia Hearts of Iron IV deixa você comandar
        qualquer nação na segunda guerra mundial! o conflito mais engajante na
        história mundial
      </Games>
