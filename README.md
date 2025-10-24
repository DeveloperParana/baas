# BaaS - Banner as a Service

BaaS é um serviço simples que gera banners personalizados a partir de uma única rota HTTP `GET`.
Os dados são enviados via parâmetros de URL, e o servidor retorna uma imagem gerada dinamicamente.

Executando localmente:

1° Clone o repositório

```bash
git clone https://github.com/DeveloperParana/baas.git
cd baas
```

2° Instale as dependências

```bash
npm install
```

3° Compile e inicie o servidor

```bash
npm run dev
```

> o servidor rodará em localhost:3000

---

### Gerando um banner:

Para testar, acesse a URL abaixo no navegador ou em um cliente HTTP

http://localhost:3000/image?title=titulo&subtitle=subtitulo&day=2025&address=ruaexemplo&city=guarapuava

Pronto! A imagem será gerada automaticamente com os parâmetros informados
