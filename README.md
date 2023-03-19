# Cypress basico v2 - TAT

Projeto criado para fins de estudo e aplicação de conhecimento do cypress-basico, criado pelo instrutor Walmyr. Este documento visa praticar a aula 39.Documentaçao.

## Pré requisitos
Até o momento da criação desse doc as versões instaladas são:

|          | versão        | observação   |
|----------|---------------|--------------|
|**vs code**   |versão recente |  ---         |
|**node**	   |`18.15.0`      |instalar antes|
|**npm**       |`9.5.0`        |instalar antes|
|**git**       |`2.40.0`       |instalar antes|
|**cypress**   |`12.18.1`      |instalar após clonar projeto|


## Instalação do cypress

Uma vez que já tenha clonado o repositório e instalado o node, npm e git, então dentro da pasta do projeto rodar  `npm install ou npm i` dessa maneira irá instalar as dependencias dev que estão no arquivo package.json e instalar o que tiver na package-lock.json Se ao rodar esse projeto houver novas versoes do cypress para atualizar bata rodar: 
`npm install cypress@colocar-aqui-versaoAtual --save-dev` (ou `npm i cypress@colocar-aqui-versaoAtual -D` para a versão curta).

Logo após, só rodar `npm run cy:open` ou `npx cypress open`.

**Configuração extra**:

Dentro do arquivo cypress.config.js add:

```json
	{
		"pluginsFile": false,
		"viewportHeight": 880,
		"viewportWidth": 1280
	}
```

# Testes
 Está disponível para rodar em modo headless ou para abrir e rodar manualmente. Também disponível uma simulação mobile.

### Mobile
Rodar `npm run cy:open:mobile` para abrir os testes configurados para simular testes mobiles. Ou rodar `npm run cy:run:mobile` para rodar modo headless.

### Desktop
Rodar `npm run cy:open` para abrir os testes. Ou rodar `npm run test` para rodar modo headless.

# Github actions - possível problema
Estou rodando cypress na versao 12.18.1 , entao deu erro quando configurei o arquivo ci.yml. 

> You are attempting to use Cypress with an older config file: cypress.json
When you upgraded to Cypress v10.0 the config file was updated and moved to a new location: cypress.config.js

Para corrigir e passar a rodar o teste corretamente, foi ajustado `github-action@v2` para `github-action@v4.1.0`.

You may need to update any CLI scripts to ensure that they are referring the new version. This would typically look something like:
"cypress open --config-file=cypress.config.js"
___

Recriado por [Patrícia Barcellos](https://github.com/barcellospatriciaa) 👻