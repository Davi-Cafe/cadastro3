# Sistema de Controle de Veiculos

Sistema web para cadastro e visualizacao de veiculos em tempo real usando Firebase. Funciona em qualquer dispositivo (celular, tablet, TV, computador).

## Funcionalidades
- Cadastro de veiculos (normal ou OFR) com hora de entrada e chegada
- Painel em tempo real mostrando fila, tempos e destaques para OFR
- Interface responsiva e simples de usar
- Sincronizacao imediata via Firebase Realtime Database

## Como publicar no Netlify

### Se for usar drag and drop
- Compacte apenas o conteudo da pasta (index.html, Cadastro.html, Painel.html e README.md) e solte no Netlify. Nao compacte a pasta externa inteira.
- Se preferir enviar a pasta inteira, configure o Publish directory como `cadastro veiculos` em Site settings → Build & deploy → Build settings → Publish directory e depois clique em Trigger deploy para refazer o deploy.

### Se for usar Git ou Netlify CLI
- Publish directory: `.` (a raiz onde estao os arquivos HTML).
- Nao ha comando de build.

## Estrutura
```
cadastro veiculos/
├─ index.html       # Menu inicial (links para cadastro e painel)
├─ Cadastro.html    # Formulario de cadastro
├─ Painel.html      # Painel em tempo real
└─ README.md
```

## Configuracao do Firebase
- As credenciais estao em `firebaseConfig` dentro de Cadastro.html e Painel.html.
- Troque pelos dados do seu projeto se precisar.
- O app faz login anonimo (`firebase.auth().signInAnonymously()`). Se suas regras estiverem como `auth != null`, basta habilitar **Anonymous authentication** no Firebase Auth. Se as regras estiverem totalmente fechadas, ajuste para permitir escrita/leitura em `fila` ou abra temporariamente para testar.

---

Depois de ajustar o publish directory ou enviar apenas os arquivos, abra o link de producao do Netlify e o site deve carregar sem o erro 404.
