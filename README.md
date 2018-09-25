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

`"schematics": {__
    "@schematics/angular:component": {__
      "styleext": "scss"__
    }__
},`

### 4 - Gerar um novo componente:

Parar gerar novos componentes dentro da biblioteca: `ng generate component teste --project=biblioteca-exemplo`.

### 5 - Usando imagens

Nesse momento o ng-package ainda não copia automaticamente as imagens para o diretorio dist então para conseguir utilizar imagens e distribuí-las com sua biblioteca:

1 - Dentro da pasta 'assets' do projeto, crie uma pasta com o nome de sua biblioteca e coloque os arquivos nela: `src/assets/biblioteca-exemplo/images/minha-imagem.jpg`.

2 - Para referenciar as imagens em seus scss, referencie eles na pasta de sua lib em node_modules por é lá que eles ficarão quando sua lib for instalada: `background-image: url('./node_modules/biblioteca-exemplo/assets/images/minha-imagem.jpg');`

3 - Adicione a instrução para copiar os arquivos da pasta 'assets' para a pasta 'dist' ao fazer o build (passo 9): `"build_lib": "ng build biblioteca-exemplo && cp -r ./src/assets/biblioteca-exemplo ./dist/biblioteca-exemplo/assets"`.

4 - Durante os testes no projeto, para que suas imagens sejam exibidas corretamente, adicionamos uma instrução ao 'angular.json' do projeto dentro do array de 'assets':

`"assets": [<br/>
  "src/favicon.ico",<br/>
  "src/assets",<br/>
  { "glob": "**/*", "input": "./dist/biblioteca-exemplo/assets", "output": "./node_modules/biblioteca-exemplo/assets" }<br/>
]`

### 6 - Exportar o novo componente da biblioteca:

Cada novo componente gerado usando o Angular CLI já é automaticamente adicionado ao array `declarations` no modulo principal da biblioteca, mas ele precisa ser adicionado manualmente ao array `exports` para ser visível.

### 7 - Tornar o novo componente publico na biblioteca:

Adicione uma linha ao arquivo `public_api.ts` para tornar a classe visível: `export * from './lib/teste/teste.component';`.

### 8 - Adicionar dependências:

Caso a biblioteca utilize alguma dependência, no arquivo `projects/biblioteca-exemplo/ng-package.json` adicione e linha `"whitelistedNonPeerDependencies": ["."]`.
No arquivo `projects/biblioteca-exemplo/package.json` adicione as dependências, por ex:

`"dependencies": {<br/>
    "moment": "^2.22.2"<br/>
}`

### 9 - Fazer o build da biblioteca:

Para fazer o build da biblioteca use o comando `ng build biblioteca-exemplo`. Será criado um diretório `dist` na raiz do projeto.

Esse comando pode ser adicionado aos scripts do arquivo `package.json` como `"build_lib": "ng build biblioteca-exemplo"` e chamado com `npm run build_lib`.

### 10 - Testar a biblioteca e os componentes:

O próprio projeto criado serve para testar a biblioteca. No `app.module.ts` importe o modulo da biblioteca `import { BibliotecaExemploModule } from 'biblioteca-exemplo';` e adicione ao array `imports`;

No arquivo `app.component.html` a biblioteca e os componentes podem ser chamados:

`<ble-biblioteca-exemplo></ble-biblioteca-exemplo>

<ble-teste></ble-teste>`

### 11 - Publicando a biblioteca no github:

Crie um novo repositório no github com o mesmo nome da biblioteca.

No arquivo `projects/biblioteca-exemplo/package.json` adicione as informações:

`
"name": "biblioteca-exemplo",<br/>
"version": "1.0.0",<br/>
"repository": "https://github.com/raphaelratuczne/biblioteca-exemplo.git",<br/>
"author": "Raphael Ratuczne <raphaelratuczne@gmail.com>",<br/>
"private": true,<br/>
"peerDependencies": {...
`

Refaça o build da biblioteca com `ng build biblioteca-exemplo` ou `npm run build_lib`.

Copie os arquivos gerados na pasta `dist` para o novo repositório e publique no branch `master` e crie uma tag com o numero da versão publicada na branch (`1.0.0`).

### 12 - Adicionando a biblioteca do github

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
