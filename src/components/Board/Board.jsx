
import styles from "./Board.module.css"
import Square from '../Square/Square.jsx'


function Board ({square, aoClicarSquare}) {
    

    return(
        <>
            <div className={styles.linha}>
                <Square valor={square[0]} aoClicarSquare={() => aoClicarSquare(0)}/>
                <Square valor={square[1]} aoClicarSquare={() => aoClicarSquare(1)}/>
                <Square valor={square[2]} aoClicarSquare={() => aoClicarSquare(2)}/>
            </div>
            <div className={styles.linha}>
                <Square valor={square[3]} aoClicarSquare={() => aoClicarSquare(3)}/>
                <Square valor={square[4]} aoClicarSquare={() => aoClicarSquare(4)}/>
                <Square valor={square[5]} aoClicarSquare={() => aoClicarSquare(5)}/>
            </div>
            <div className={styles.linha}>
                <Square valor={square[6]} aoClicarSquare={() => aoClicarSquare(6)}/>
                <Square valor={square[7]} aoClicarSquare={() => aoClicarSquare(7)}/>
                <Square valor={square[8]} aoClicarSquare={() => aoClicarSquare(8)}/>
            </div>
            
        </>
    )
}

export default Board