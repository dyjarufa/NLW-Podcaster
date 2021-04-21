/* 
  - Esse arquivo fica por volta de toda aplicação mas é chamado uma única vez
  - Arquivo para configurar qual é o formato do documento que irá ficar por volta da minha aplicação
*/

import Document, {Html, Head, Main, NextScript} from 'next/document';

//De acordo com a documentação posso usar apenas em formato de classe
export default class MyDocument extends Document {
  render(){
    return (
        <Html>
          <Head> {/* posso colorcar por exemplo as fontes que baixei */}
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap" rel="stylesheet" />
          </Head>
          <body>
            <Main /> {/* Main onde fica a aplicação */}
            <NextScript />{/* scripts que o next injeta na aplicação */}
          </body>
        </Html>
    )
  }

}

