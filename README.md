# D-Guardian Segurança Eletrônica

Este projeto é uma landing page moderna para uma empresa de segurança eletrônica, criada como portfólio para o GitHub. A página apresenta serviço, depoimentos, área de atuação e um CTA direto para contato via WhatsApp.

## O que foi feito

- Criação de uma página única (one page) com seções claras: hero, sobre, serviços, galeria, mapa de atuação, depoimentos e CTA.
- Design focado em conversão de leads, com botões de ação e navegação simples.
- Mapa interativo do Nordeste com cidades clicáveis usando Leaflet.
- Uso de placeholders visuais para fotos, indicando onde inserir imagens reais de instalação e equipe.
- Organização do código em HTML, CSS e JavaScript separados.
- Publicação no GitHub para servir como exemplo de site real e portfólio.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript puro (vanilla JS)
- Leaflet para mapa interativo
- Google Fonts (`Playfair Display` e `Inter`)
- CDN para recursos externos (Leaflet e fontes)

## Organização dos arquivos

- `index.html` - estrutura completa da landing page e navegação por âncoras.
- `css/index.css` - estilos principais, layout em grid, tipografia e responsividade.
- `js/dguardian_v3_fotos_mapa.js` - script de mapa interativo, inicialização do Leaflet, marcadores e seleção de cidades.
- `img/` - pasta reservada para imagens reais do projeto e fotos da empresa.

## Estrutura geral

- `nav` com logo e botões de contato
- `hero` com apresentação do serviço e CTA para WhatsApp
- `sobre` com diferencial da empresa
- `servicos` com cards de soluções oferecidas
- `fotos-sec` com galeria de trabalho
- `mapa-sec` com mapa e lista de cidades
- `depoimentos` com avaliações de clientes
- `cta-sec` com convite para agendar visita
- `footer` com links internos

## Publicação e uso como portfólio

O site foi preparado para ser publicado via GitHub Pages a partir do repositório `dguardian-site`. Isso permite exibir o projeto como um exemplo de trabalho real em um servidor acessível na web.

## Observações

- O mapa usa `Leaflet` e `CartoDB` para a base de mapas.
- O contato principal foi configurado para WhatsApp via link `api.whatsapp.com`.
- A página pode ser facilmente adaptada com imagens reais e conteúdo personalizado.
