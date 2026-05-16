// Carrega modulos necessarios:
const http = require('http');
const fs   = require('fs');

// Função para ler um arquivo e escrever no response:
function lerArquivo(response, nomeArquivo, contentType){
    fs.readFile(nomeArquivo, (erro, dados) => {
        if(erro){
            response.writeHead(500, {"Content-Type": "text/plain; charset=utf-8"})
            response.end("Erro ao abrir o arquivo: " + nomeArquivo);
            return;
        }

        response.writeHead(200, {"Content-Type": contentType});
        response.end(dados);
    });
}

//Criar servidor com a implementação de URL direto:
const servidor = http.createServer((request, response) => {
    //Trata as rotas URL (antigo parse):
    const rota = new URL(request.url, "http://localhost:3000").pathname;

    if(rota === "/"){
        lerArquivo(response, "apresentacao.html", "text/html; charset=utf-8");
    }
    else if(rota === "/quemsou"){
        lerArquivo(response, "quemsou.html", "text/html; charset=utf-8");
    }
    else if(rota === "/ofertas"){
        fs.readFile("ofertas.json", "utf-8", (erro, dados) => {

            if (erro) {
                response.end("Erro ao ler ofertas.json");
                return;
            }

            const ofertas = JSON.parse(dados);

            let cards = "";

            ofertas.forEach(oferta => {

                cards += `
                    <div style="border:1px solid #ccc; margin:10px; padding:10px; width:250px;">
                        <h2>${oferta.modelo}</h2>
                        <p><strong>Marca:</strong> ${oferta.marca}</p>
                        <p><strong>Ano:</strong> ${oferta.ano}</p>
                        <p><strong>Preço:</strong> R$ ${oferta.preco}</p>
                    </div>
                `;
            });

            const html = `
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Ofertas</title>
            </head>
            <body>

                <h1>Veículos em Oferta</h1>

                <div style="display:flex; flex-wrap:wrap;">
                    ${cards}
                </div>

                <a href="/">Voltar</a>

            </body>
            </html>
            `;

            response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            response.end(html);
        });
    }
    else if(rota === "/novos"){
        fs.readFile("novos.json", "utf-8", (erro, dados) => {

            if (erro) {
                response.end("Erro ao ler novos.json");
                return;
            }

            const carros = JSON.parse(dados);

            let htmlCarros = "";

            carros.forEach(carro => {

                htmlCarros += `
                    <div style="border:1px solid #ccc; margin:10px; padding:10px; width:300px;">

                        <img src="${carro.foto}" width="250">

                        <h2>${carro.modelo}</h2>

                        <p>${carro.descricao}</p>

                        <p><strong>Preço:</strong> R$ ${carro.preco}</p>

                    </div>
                `;
            });

            const html = `
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Novos</title>
            </head>
            <body>

                <h1>Veículos Zero KM</h1>

                <div style="display:flex; flex-wrap:wrap;">
                    ${htmlCarros}
                </div>

                <a href="/">Voltar</a>

            </body>
            </html>
            `;

            response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            response.end(html);
        });
    }
    else if(rota === "/seminovos"){
         fs.readFile("seminovos.json", "utf-8", (erro, dados) => {

            if (erro) {
                response.end("Erro ao ler seminovos.json");
                return;
            }

            const carros = JSON.parse(dados);

            let htmlCarros = "";

            carros.forEach(carro => {

                htmlCarros += `
                    <div style="border:1px solid #ccc; margin:10px; padding:10px; width:300px;">

                        <h2>${carro.modelo}</h2>

                        <p><strong>Pontos positivos:</strong></p>
                        <ul>
                            <li>${carro.positivo}</li>
                        </ul>

                        <p><strong>Pontos negativos:</strong></p>
                        <ul>
                            <li>${carro.negativo}</li>
                        </ul>

                    </div>
                `;
            });

            const html = `
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Seminovos</title>
            </head>
            <body>

                <h1>Veículos Seminovos</h1>

                <div style="display:flex; flex-wrap:wrap;">
                    ${htmlCarros}
                </div>

                <a href="/">Voltar</a>

            </body>
            </html>
            `;

            response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            response.end(html);
        });
    }
    else if(rota === "/imagens/model_main_webp_comprar-ex-honda-sensing_56c242fe7a.png.png"){
        lerArquivo(response, "imagens/model_main_webp_comprar-ex-honda-sensing_56c242fe7a.png.png", "image/png");
    }
    else if(rota === "/imagens/Toyota.jpeg"){
        lerArquivo(response, "imagens/Toyota.jpeg", "image/jpeg");
    }
    else if(rota === "/imagens/jeep.jpg"){
        lerArquivo(response, "imagens/jeep.jpg", "image/jpg");
    }
    else if(rota === "/imagens/Fiat.jpg"){
        lerArquivo(response, "imagens/Fiat.jpg", "image/jpg");
    }
    else if(rota === "/imagens/chevo.png"){
        lerArquivo(response, "imagens/chevo.png", "image/png");
    }
    else if(rota === "/imagens/volk.jpg"){
        lerArquivo(response, "imagens/volk.jpg", "image/jpg");
    }
    else{
        response.writeHead(404, {"Content-Type": "text/plain; charset=utf-8"});
        response.end("Erro 404 - Rota não encontrada: " + rota); 
    }
})


// Cria e Configura o Servidor:
servidor.listen(6200, () =>{
    console.log("Servidor iniciado em http://localhost:6200")    
});
