# Snap Camera Kit - WEB
## Comandos NPM úteis no desenvolvimento
Para iniciar servidor local:
```sh
npm start
```

Para reiniciar servidor local (por exemplo ao atualizar .env):
```sh
npm restart
```

Para instalar ou atualizar pacotes listados no package.json:
```sh
npm install
```

Para gerar arquivos finais (não é necessario ao utilizar github actions):
```sh
npm build
```


## Como acessar o servidor local com um device (apenas android) utilizando o Chrome
- conectar device via USB ao PC e liberar a depuração (menu do desenvolvedor)
- no PC, acessar o endereço "chrome://inspect/#devices"
- clicar em "Port forwarding"
- inserir na lista a porta e o endereço completo (incluindo a porta novamente) do servidor local (ex.: 1234 localhost:1234)
- marcar o box "Enable port forwarding"
- no device, acessar o endereço do servidor local normalmente (ex.: localhost:1234)