# Ng6LibProjectApp

Esse projeto foi criado para testar a criação de bibliotecas do Angular6 (versão 6.2.1 do Angular CLI).

## Passos usados:

Esses são os comando e configurações usados:

### 1 - Criar o projeto:

Para gerar e testar um novo projeto: `ng new ng6-lib-project-app --style=scss & rename ng6-lib-project-app ng6-lib-project & cd ng6-lib-project & ng serve`.

### 2 - Criar a biblioteca:

Para gerar a biblioteca dentro do projeto: `ng generate library biblioteca-exemplo --prefix=ble --style=scss`. É recomendado usar um prefixo para diferenciar a biblioteca do padrão 'lib' usado pelo Angular.

### 3 - Configurar o scss da biblioteca:

A versão atual do Angular CLI ainda não configura corretamente o scss da biblioteca, então é necessário alterar manualmente.
No arquivo `angular.json` na raiz do projeto, copie as seguintes linhas da configuração do 'projeto' e adicione no mesmo local na configuração da 'biblioteca' (logo apos a configuração do 'prefix'):

`"schematics": {
    "@schematics/angular:component": {
      "styleext": "scss"
    }
},`

### 4 - Gerar um novo componente:

Parar gerar novos componentes dentro da biblioteca: `ng generate component teste --project=biblioteca-exemplo`.

### 5 - Exportar o novo componente da biblioteca:

Cada novo componente gerado usando o Angular CLI já é automaticamente adicionado ao array `declarations` no modulo principal da biblioteca, mas ele precisa ser adicionado manualmente ao array `exports` para ser visível.

### 6 - Tornar o novo componente publico na biblioteca:

Adicione uma linha ao arquivo `public_api.ts` para tornar a classe visível: `export * from './lib/teste/teste.component';`.

### 7 - Adicionar dependências:

Caso a biblioteca utilize alguma dependência, no arquivo `projects/biblioteca-exemplo/ng-package.json` adicione e linha `"whitelistedNonPeerDependencies": ["."]`.
No arquivo `projects/biblioteca-exemplo/package.json` adicione as dependências, por ex:

`"dependencies": {
    "moment": "^2.22.2"
}`

### 8 - Fazer o build da biblioteca:

Para fazer o build da biblioteca use o comando `ng build biblioteca-exemplo`. Será criado um diretório `dist` na raiz do projeto.

Esse comando pode ser adicionado aos scripts do arquivo `package.json` como `"build_lib": "ng build biblioteca-exemplo"` e chamado com `npm run build_lib`.

### 9 - Testar a biblioteca e os componentes:

O próprio projeto criado serve para testar a biblioteca. No `app.module.ts` importe o modulo da biblioteca `import { BibliotecaExemploModule } from 'biblioteca-exemplo';` e adicione ao array `imports`;

No arquivo `app.component.html` a biblioteca e os componentes podem ser chamados:

`<ble-biblioteca-exemplo></ble-biblioteca-exemplo>
<ble-teste></ble-teste>`

### 10 - Publicando a biblioteca no github:

Crie um novo repositório no github com o mesmo nome da biblioteca.

No arquivo `projects/biblioteca-exemplo/package.json` adicione as informações:

`
"name": "biblioteca-exemplo",
"version": "1.0.0",
"repository": "https://github.com/raphaelratuczne/biblioteca-exemplo.git",
"author": "Raphael Ratuczne <raphaelratuczne@gmail.com>",
"private": true,
"peerDependencies": {...
`

Refaça o build da biblioteca com `ng build biblioteca-exemplo` ou `npm run build_lib`.

Copie os arquivos gerados na pasta `dist` para o novo repositório e publique no branch `master` e crie uma tag com o numero da versão publicada na branch (`1.0.0`).

### 11 - Adicionando a biblioteca do github

Para importar a sua biblioteca em um novo projeto use `npm i https://github.com/raphaelratuczne/biblioteca-exemplo.git#1.0.0 --save`

#### (Opcional) Adicionando a biblioteca a partir do repositório local

Para importar a biblioteca em outro projeto local crie um pack da dist com `cd dist/biblioteca-exemplo & npm pack`.

Esse comando pode ser adicionado aos scripts do arquivo `package.json` como `"npm_pack": "cd dist/biblioteca-exemplo && npm pack"` e chamado com `npm run npm_pack`.

Você pode adicionar um comando para chamar os dois comandos: `"package": "npm run build_lib && npm run npm_pack"` e chamar com `npm run package`.

Para importar no outro projeto local use `npm install ../ng6-lib-project/dist/biblioteca-exemplo/biblioteca-exemplo-1.0.0.tgz`;



Fontes:

[https://medium.com/@pliniopjn/angular-6-principais-novidades-e824f2a0dc2f](https://medium.com/@pliniopjn/angular-6-principais-novidades-e824f2a0dc2f)

[https://medium.com/@pliniopjn/angular-6-atualizando-um-projeto-existente-a783e23e5b0d](https://medium.com/@pliniopjn/angular-6-atualizando-um-projeto-existente-a783e23e5b0d)

[https://medium.com/@nikolasleblanc/building-an-angular-4-component-library-with-the-angular-cli-and-ng-packagr-53b2ade0701e](https://medium.com/@nikolasleblanc/building-an-angular-4-component-library-with-the-angular-cli-and-ng-packagr-53b2ade0701e)

[https://stackoverflow.com/questions/50818889/angular-cli-generate-library-with-sass](https://stackoverflow.com/questions/50818889/angular-cli-generate-library-with-sass)

[https://blog.angularindepth.com/creating-a-library-in-angular-6-87799552e7e5](https://blog.angularindepth.com/creating-a-library-in-angular-6-87799552e7e5)

[https://blog.angularindepth.com/creating-a-library-in-angular-6-part-2-6e2bc1e14121](https://blog.angularindepth.com/creating-a-library-in-angular-6-part-2-6e2bc1e14121)

[https://blog.angularindepth.com/the-angular-library-series-publishing-ce24bb673275](https://blog.angularindepth.com/the-angular-library-series-publishing-ce24bb673275)

[https://github.com/ng-packagr/ng-packagr/blob/HEAD/docs/dependencies.md](https://github.com/ng-packagr/ng-packagr/blob/HEAD/docs/dependencies.md)

[https://medium.com/@Dor3nz/compiling-css-in-new-angular-6-libraries-26f80274d8e5](https://medium.com/@Dor3nz/compiling-css-in-new-angular-6-libraries-26f80274d8e5)
