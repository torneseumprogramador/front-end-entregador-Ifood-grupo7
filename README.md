<h1 align="center">
 Telemetria de Entregadores do iFood
</h1>
 
<p align="center">
 <a href="#sobre o projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
 <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
 <a href="#iniciando">Iniciando</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
 <a href="#funcionalidades">Funcionalidades</a>
</p>
 
 
### Sobre o Projeto
<p>Este projeto teve por objetivo manter todo o histórico de telemetria de um entregador para um determinado pedido</p>
 
Para ver a aplicação funcionando, clique aqui: [Kintsugi](https://kintsugi-develop.vercel.app/)</br>
Para acessar o repositório do backend, clique aqui: [Back End](https://github.com/Kintsugi-ifood/apientregador)</br>
Para acessar o repositório do frontend, clique aqui: [Front End](https://github.com/Kintsugi-ifood/front-end-entregador)</br>
 
### Desenvolvedores
- [Carolina Marques](https://github.com/caru-marques)
- [Donovan Társis](https://github.com/DonovanTarsis)
- [Ester Lourenço](https://github.com/elolourenco)
- [Luany de Souza](https://github.com/luanyss)
- [Lucas Kennedy](https://github.com/lucaskfp) 
 
## Tecnologias
 
Tecnologias que utilizamos para desenvolver esta Aplicação:
 
- Java
- SpringBoot
- Postgre
- JWT 
- Becrypt
- Heroku
- ReactJS
- ReactQuery
- Chakra
- Axios
- Vercel
 
## Iniciando
 
- As instruções a seguir irão te guiar para que você crie uma cópia do [backend](https://github.com/Kintsugi-ifood) na sua máquina local.
 
### Pré-requisitos
 
- Configure um banco de dados PostgreSQL na sua máquina e crie um novo banco.
 
**Clone o projeto e acesse a pasta**
 
```bash
$ git clone git@github.com:Kintsugi-ifood/apientregador.git && cd apientregador
```
 
**Siga as etapas abaixo**
 
Renomeie o arquivo "start.sh.sample" para "start.sh" e edite com as configurações do seu banco de dados:
 
```
export USER='seu_usuario'
export PASSWORD='sua_senha'
export DATABASE_URL='url_seu_database' 
```
 
```bash
# Instale as dependências
$ ./build.sh
 
# Inicie a API
$ ./start.sh

# Para parar a API
$ ./stop.sh
```
 
Tudo pronto! Agora, basta acessar a aplicação, disponível em:
localhost:8080

 
Para acessar a API em Deploy, acesse https://drivers-tracking.herokuapp.com/
 
## Funcionalidades
Funcionalidades que o sistema oferece:
 
 
#### BackEnd:
- Recebe a geolocalização do entregador
- Altera status dos pedidos
- Realiza consulta de pedidos
- Realiza consultas de geolocalização por pedido
- Atribui o entregador para o pedido
- Realiza autenticação de entregador
 
 
#### Front End:
- Tela para autenticação do entregador
- Tela para consulta de pedidos
- Tela para atribuição de pedido pelo entregador
- Tela de alteração de status do pedido (Cancelado/Concluído)
