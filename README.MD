# Snap Camera Kit - WEB
## Comandos NPM úteis no desenvolvimento
Para iniciar servidor local:
```sh
npm start
```

Para encerrar servidor local:
```sh
ctrl + c
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

## TO-DO List
- [x] rear camera
- [ ] favicon
- [ ] minificar js e css
- [ ] no mobile aparece os termos do snap por cima do aviso do bloqueio de camera
- [ ] verificar se lentes diferentes precisam de permissoes diferentes(audio e giroscopio)
- [ ] tirar o loader só quando o retorno do camera kit for ok
- [ ] listar cameras disponiveis / verificar se tem rear camera (deve abrir um stream?)
- [ ] renderizar lente em tamanho menor para resoluçoes grandes e esticar com 100% (desempenho)