import { useState } from "react"

function Square ({valor, aoClicarSquare}) {

    return(
        <button className="square" onClick={aoClicarSquare}>{valor}</button>
    )
}

export default Square