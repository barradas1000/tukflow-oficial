# Roteiro de Frames para GIF - TukTuk Lisboa

## Descrição Geral
- **Fundo:** Mapa de Lisboa (imagem enviada)
- **Linha animada:** Azul (#0074D9), 4-6px de largura
- **Efeito:** Linha vai sendo desenhada lentamente, simulando o avanço do TukTuk
- **Loop:** Ao completar o trajeto, a linha completa fica visível por 0,5s, depois tudo reinicia
- **Duração total sugerida:** 6-8 segundos
- **FPS sugerido:** 15-20 fps (quanto mais frames, mais suave)

## Pontos de Referência (em ordem)
1. **Madragoa** (Início e fim)
2. **Basílica da Estrela**
3. **Museu de História Natural & Museu da Ciência**
4. **Rossio / Elevador da Bica**
5. **Retorno para Madragoa**

## Coordenadas aproximadas (em pixels, baseando-se na imagem original)
- Você pode ajustar no editor conforme o mapa:
- (x, y) = (coluna, linha) na imagem

- Madragoa:         (110, 670)
- Basílica Estrela: (170, 610)
- Museu História:   (320, 520)
- Rossio/Bica:      (420, 670)
- Madragoa (fim):   (110, 670)

## Sequência de Frames
1. Fundo: mapa sem linha
2. Linha azul começa em Madragoa
3. Linha cresce até Basílica da Estrela
4. Linha cresce até Museu de História Natural
5. Linha cresce até Rossio/Bica
6. Linha retorna para Madragoa (fechando o loop)
7. Linha completa visível por 0,5s
8. Some tudo e reinicia

## Dicas para o Editor GIF
- Use "onion skin" ou "layers" para desenhar a linha crescendo frame a frame
- Cada segmento pode ser dividido em 10-20 frames para suavidade
- Exemplo: 4 trechos x 15 frames = 60 frames + 10 frames linha completa
- Salve cada frame como PNG numerado: `frame_001.png`, `frame_002.png`, ...
- No final, importe todos no seu editor GIF e defina o tempo de exibição do último frame (linha completa) para 0,5s

## Visualização (esquemática)

```
Madragoa ---- Basílica Estrela
     |                |
     |                |
Rossio/Bica ---- Museu História
```

## Observações
- Ajuste os pontos conforme o alinhamento real no seu mapa
- Se quiser, pode adicionar um círculo animado ("tuktuk") avançando junto com a linha
- Para Python: use Pillow, imageio, matplotlib, etc.

---
Dúvidas ou quer o script pronto? Só pedir!
