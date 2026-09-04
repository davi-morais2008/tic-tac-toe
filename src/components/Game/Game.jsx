import { useState } from "react"
import styles from "./Game.module.css"
import Board from "../Board/Board"


function definirVencedor(square) {

    const possibilidades = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6],
    ]

    // let i = 0: cria indíce para percorrer a lista de possibilidades, definindo como 0 para começar lendo a primeira linha [0,1,2]
    // i < possibilidades.length: Determina até quando o laço vai percorrer a lista. Continuará rodando enquanto i for menor que 8 (de 0 a 7)
    // i++: Adiciona mais um número apos percorrer uma linha para verificar a próxima
    for (let i = 0; i < possibilidades.length; i++) {
        const [a, b, c] = possibilidades[i]
        if (square[a] && square[a] === square[b] && square[a] === square[c]) {
            return square[a]
        }
    }
}


function Game() {
    const [square, setSquare] = useState(Array(9).fill(''))
    const [proximo, setProximo] = useState(true)
    const [placarX, setPlacarX] = useState(0)
    const [placarO, setPlacarO] = useState(0)
    const [tema, setTema] = useState(() => {
        const temaSalvo = localStorage.getItem('tema')
        return temaSalvo ? temaSalvo : 'light'
    })


    function alternarTema() {
        const novoTema = tema === 'light' ? 'dark' : 'light'
        setTema(novoTema);
        localStorage.setItem('tema', novoTema)
    }


    const vencedor = definirVencedor(square)
    // const vencedorJogo = placarX === 3 ? 'X' : placarO === 3 ? 'O' : null
    // Usando every para verificar se todas as posicoes do square foi preenchida
    const empate = square.every((posicao) => posicao !== '') && !vencedor
    let status;

    if (vencedor) {
        status = `Vencedor: ${vencedor}`
    } else if (empate) {
        status = 'Empate. Deu velha!'
    } else {
        status = `Próximo jogador: ${proximo ? 'X' : 'O'}`
    }

    // Preenche os quadrados do tabuleiro com '' e reseta todas as jogadas
    function reiniciarPartida() {
        setSquare(Array(9).fill(''))
    }

    // Define o placar de ambos os jogadores para 0
    function resetarPlacar() {
        setPlacarX(0)
        setPlacarO(0)
    }


    function Clicar(i) {

        // Verifica se o quadrado tem algo diferente de nulo e se ja existe um vencedor
        if (square[i] !== '' || vencedor) {
            return // caso verdadeiro, interrompe a execução
        }

        const proximoMove = square.slice()


        if (proximo) {
            proximoMove[i] = 'X'
        } else {
            proximoMove[i] = 'O'
        }
        setSquare(proximoMove)

        const novoVencedor = definirVencedor(proximoMove)

        if (novoVencedor === 'X') {
            setPlacarX(placarX + 1)
        } else if (novoVencedor === 'O') {
            setPlacarO(placarO + 1)
        }

        setProximo(!proximo)
    }

    // Aplicamos a classe base 'game' E a classe modificadora 'game--dark' se o tema for 'dark'
    return (
        <main className={`${styles.game} ${tema === 'dark' ? styles['game--dark'] : ''}`}>
            <h2 className={styles.game__title}>Jogo da Velha</h2>
            {/* <h3 className={styles.game__subtitle}>Melhor de 5 - O jogador que ganhar 3 rodadas primeiro, vence o jogo!</h3> */}

            {/* Botão que dispara a função alternarTema */}
            <button
                className={`${styles.game__button} ${styles['game__button--theme']}`}
                onClick={alternarTema}
            >
                Modo {tema === 'light' ? 'Escuro' : 'Claro'}
            </button>

            <p className={styles.game__status}>
                Jogador X: {placarX} | Jogador O: {placarO}
            </p>

            <p className={styles.game__status}>
                {status}
            </p>

            <button className={`${styles.game__button} ${styles['game__button--secondary']}`} onClick={resetarPlacar}>Resetar Placar</button> 
            <Board square={square} aoClicarSquare={Clicar}/>
            <button className={`${styles.game__button} ${styles['game__button--secondary']}`} onClick={reiniciarPartida}>Reiniciar Partida</button>

        </main>
    );

}

export default Game