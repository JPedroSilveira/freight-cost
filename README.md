Projeto para iniciação em testes com ReactJS.

# Custo do Frete 🚚
Cálculo do custo de frete por caminhão baseado na distância de duas cidades brasileiras.

## PWA
#### Progressive Web Application (PWA) é uma metodologia de desenvolvimento de software que utiliza de tecnologias comuns da web (HTML, CSS e JS) para desenvolver aplicativos que funcionam em qualquer dispositivo com acesso a navegadores web padrões. O objetivo é preencher a lacuna de experiência de usuário entre aplicações nativas e aplicações web.

## TypeScript
#### TypeScript é um super-set estritamente sintático para JavaScript e adiciona tipagem estática opcional.
- https://www.typescriptlang.org/

## ReactJS com CRA utilizando template Typescript para PWA
### O ReactJS é uma biblioteca para construção de interfaces de usuário.
- https://reactjs.org/
### Create React App (CRA) é um software para criação e configuração de projetos web com ReactJS. No DinoApp é utilizada a versão 4 com o template "cra-template-pwa-typescript".
- https://github.com/facebook/create-react-app

## IndexedDB
O IndexedDB é uma API padronizada em navegadores web que permite armazenamento de alta performance através do uso de índices.
- https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
Para armazenamento de dados do usuário de forma local é utilizada a biblioteca DexieJS, uma wrapper minimalista para o IndexedDB.
- https://dexie.org/


## Execução
### Instale
yarn install
### Inicie um servidor de desenvolvimento
yarn start
### Visite o app
localhost:3000

## Testes
### Executar todos os testes
yarn test
### Executar testes de um arquivo
yarn test <Nome do arquivo sem extensão>
### Executar testes com cobertura
yarn test --coverage --watchAll
