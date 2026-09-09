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
    const [vencedorPartida, setVencedorPartida] = useState('')
    const [tema, setTema] = useState(() => {
        const temaSalvo = localStorage.getItem('tema')
        return temaSalvo ? temaSalvo : 'light'
    })


    function alternarTema() {
        const novoTema = tema === 'light' ? 'dark' : 'light'
        setTema(novoTema);
        localStorage.setItem('tema', novoTema)
    }

    // vencedor apenas da rodada, e nãop da partida
    const vencedor = definirVencedor(square)
    // const vencedorJogo = placarX === 3 ? 'X' : placarO === 3 ? 'O' : null
    // Usando every para verificar se todas as posicoes do square foi preenchida
    const empate = square.every((posicao) => posicao !== '') && !vencedor
    let status;

    if (vencedorPartida) {
        status = `🏆 Jogador ${vencedorPartida} venceu o melhor de 5!`
    } else if (vencedor) {
        status = `Vencedor da rodada: ${vencedor}`
    } else if (empate) {
        status = 'Empate. Deu velha!'
    } else {
        status = `Próximo jogador: ${proximo ? 'X' : 'O'}`
    }

    // Preenche os quadrados do tabuleiro com '' e reseta todas as jogadas
    function reiniciarRodada() {
        setSquare(Array(9).fill(''))
        setProximo(true)
    }

    // Define o placar de ambos os jogadores para 0
    function resetarPlacar() {
        setPlacarX(0)
        setPlacarO(0)
        setVencedorPartida('')
        setSquare(Array(9).fill(''))
        setProximo(true)
    }


    function Clicar(i) {

        // Verifica se o quadrado tem algo diferente de nulo e se ja existe um vencedor
        if (square[i] !== '' || vencedor || vencedorPartida) {
            return // caso verdadeiro, interrompe a execução
        }

        const proximoMove = square.slice()

        // Verifica qual é o próximo jogador
        if (proximo) {
            proximoMove[i] = 'X'
        } else {
            proximoMove[i] = 'O'
        }
        setSquare(proximoMove)


        const novoVencedor = definirVencedor(proximoMove)

        if (novoVencedor === 'X') {

            const novoPlacarX = placarX + 1
            setPlacarX(novoPlacarX)

            // X chegou a 3 vitórias
            if (novoPlacarX === 3) {
                setVencedorPartida('X')
            }

        } else if (novoVencedor === 'O') {

            const novoPlacarO = placarO + 1
            setPlacarO(novoPlacarO)

            // O chegou a 3 vitórias
            if (novoPlacarO === 3) {
                setVencedorPartida('O')
            }
        }

        setProximo(!proximo)
    }

    // Aplicamos a classe base 'game' E a classe modificadora 'game--dark' se o tema for 'dark'
    return (
    <main className={`${styles.game} ${tema === 'dark' ? styles['game--dark'] : ''}`}>
        <header className={styles.game__header}>
            <h1 className={styles.game__title}>Jogo da Velha</h1>
            <p className={styles.game__subtitle}>Melhor de 5</p>
        </header>

        <p className={styles.game__status}>Jogador X: {placarX} || Jogador O: {placarO}</p>

        <section className={styles.game__status}><p>{status}</p></section>

        <section className={styles.game__board}><Board square={square} aoClicarSquare={Clicar} /></section>

        {(vencedor || empate) && !vencedorPartida && <button className={`${styles.game__button} ${styles['game__button--primary']}`} onClick={reiniciarRodada}>Próxima Rodada</button>}
        {vencedorPartida && <button className={`${styles.game__button} ${styles['game__button--primary']}`} onClick={resetarPlacar}>Nova Partida</button>}
        {!vencedorPartida && <button className={`${styles.game__button} ${styles['game__button--secondary']}`} onClick={resetarPlacar}>Resetar Placar</button>}

        <footer className={styles.game__settings}>
            <button className={`${styles.game__button} ${styles['game__button--theme']}`} onClick={alternarTema}>{tema === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro'}</button>
        </footer>
    </main>
);

}

export default Game