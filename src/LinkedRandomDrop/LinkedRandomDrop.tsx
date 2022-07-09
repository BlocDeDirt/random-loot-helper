import styles from "./LinkedRandomDrop.module.css";
interface ILinkedRandomDrop{
    className:string, 
    linkedRandomDrop:string[], 
    setLinkedRandomDrop:React.Dispatch<React.SetStateAction<string[]>>
}
export default function LinkedRandomDrop(props:ILinkedRandomDrop){

    const moveUp = (indexToMove:number) =>{
        let arrayClone = [...props.linkedRandomDrop]
        if(indexToMove === 0){
            let lastElement = arrayClone[arrayClone.length-1];
            arrayClone[arrayClone.length-1] = arrayClone[0];
            arrayClone[0] = lastElement;
        }else{
            let previousElement = arrayClone[indexToMove-1];
            arrayClone[indexToMove-1] = arrayClone[indexToMove];
            arrayClone[indexToMove] = previousElement;
        }

        props.setLinkedRandomDrop(arrayClone);
    }

    const moveDown = (indexToMove:number) =>{
        let arrayClone = [...props.linkedRandomDrop]
        if(indexToMove === arrayClone.length-1){
            let firstElement = arrayClone[0];
            arrayClone[0] = arrayClone[arrayClone.length-1];
            arrayClone[arrayClone.length-1] = firstElement;
        }else{
            let nextElement = arrayClone[indexToMove+1];
            arrayClone[indexToMove+1] = arrayClone[indexToMove];
            arrayClone[indexToMove] = nextElement;
        }
        props.setLinkedRandomDrop(arrayClone);
    }

    return(
        <div className={props.className}>
            <div className={styles.containerLinked}>
                <div>
                    {
                        props.linkedRandomDrop.map((value, index) => {
                            return(
                                <div key={index.toString() + "main"}>
                                    <div key={index} className={styles.linkedDrop}>
                                        <h3 key={index.toString() + "name"}>{value}</h3>

                                        {/*Weird behavior with Filter, can't filter with the name and if i use
                                            splice, it deletes everything except the first one, wich is weird
                                            but for now it works if i filter with the index xD
                                        */}
                                        <span key={index.toString() + "delete"} className="material-icons"
                                        onClick={() => {props.setLinkedRandomDrop(props.linkedRandomDrop.filter((linkedValue, indexLinked) => indexLinked !== index));}}>
                                            delete
                                        </span>

                                        <div key={index.toString() + "moveUpDown"}>
                                            <div key={index.toString() + "upContainer"}>

                                                <span key={index.toString() + "up"} className="material-icons"
                                                onClick={() => {moveUp(index);}}
                                                >
                                                    keyboard_arrow_up
                                                </span>

                                            </div>
                                            <div key={index.toString() + "downContainer"}>

                                                <span key={index.toString() + "down"} className="material-icons"
                                                onClick={() => {moveDown(index);}}
                                                >
                                                    keyboard_arrow_down
                                                </span>

                                            </div>
                                        </div>
                                    </div>
                                    {index !== props.linkedRandomDrop.length-1 && 
                                        <div key={index.toString() + "followUp"} className={styles.followUp}>
                                            <span key={index.toString() + "doubleDown"} className="material-icons">keyboard_double_arrow_down</span>
                                        </div>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}