# Miguel Tenório — Portfólio

Site de portfólio para videomaker desenvolvido com React, TypeScript, Vite, Tailwind CSS, Motion e componentes no padrão shadcn.

## Executar localmente

```bash
npm install
npm run dev
```

Build de produção e validação:

```bash
npm run build
npm run lint
```

## Estrutura

- Componentes reutilizáveis: `src/components/ui`
- Estilos globais e tokens: `src/index.css`
- Conteúdo e composição principal: `src/App.tsx`
- Alias shadcn: `@/` aponta para `src/`

## Imagens pendentes

Os espaços de mídia foram deixados sem imagens, conforme o briefing:

- Hero: banner 16:9 em `public/images/miguel-tenorio-hero.png`
- Quem sou: banner horizontal em preto e branco em `public/images/miguel-tenorio-about-banner.png`
- Portfólio: mídias individuais nas proporções indicadas em cada card

O formulário possui validação e estado de sucesso no front-end. Para envios reais, conecte o `submit` em `src/App.tsx` ao serviço de formulário ou API escolhido.
