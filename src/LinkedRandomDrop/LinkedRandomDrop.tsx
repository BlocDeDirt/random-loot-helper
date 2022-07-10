import { useState } from "react";
import { LocalStorageService } from "../Services/LocalStorage.service";
import SnackBar from "../SnackBar/SnackBar";
import styles from "./LinkedRandomDrop.module.css";
interface ILinkedRandomDrop{
    className:string, 
    linkedRandomDrop:string[], 
    setLinkedRandomDrop:React.Dispatch<React.SetStateAction<string[]>>
}
export default function LinkedRandomDrop(props:ILinkedRandomDrop){

    const[toggleAlert, setToggleAlert] = useState(false);
    const[toggleSnackBar, setToggleSnackBar] = useState(false);

    const[messageSnackBar, setMessageSnackBar] = useState("");
    const[backgroundColor, setBackgroundColor] = useState("");
    const[color, setColor] = useState("");

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

    const tryToSaveToLocalStorage = () => {
        if(props.linkedRandomDrop.length === 0){
            setToggleSnackBar(true);
            setMessageSnackBar("Can't save an empty linked list");
            setBackgroundColor("rgb(28, 28, 28)");
            setColor("rgb(188, 188, 188)");
        }else{
            if(LocalStorageService.IsLinkedListAlreadyInStorage(props.linkedRandomDrop)){
                setToggleSnackBar(true);
                setMessageSnackBar("This list already exist in the book and quill.")
                setBackgroundColor("#b00000");
                setColor("rgb(28, 28, 28)");
            }else{
                if(LocalStorageService.positionOfEdit === -1){
                    setToggleSnackBar(true);
                    setMessageSnackBar("Added linked list to the book and quill");
                    setBackgroundColor("rgb(3, 118, 3)");
                    setColor("rgb(28, 28, 28)");
                    LocalStorageService.AddNewDataToLocalStorage(props.linkedRandomDrop)
                }else{
                    setToggleSnackBar(true);
                    setMessageSnackBar("Edit made !");
                    setBackgroundColor("rgb(3, 118, 3)");
                    setColor("rgb(28, 28, 28)");
                    LocalStorageService.EditDataToLocalStorage(props.linkedRandomDrop);
                }
                props.setLinkedRandomDrop([])
            }
        }
    }

    return(
        <div className={props.className}>
            
            {toggleSnackBar && <SnackBar setToggleSnackBar={setToggleSnackBar} message={messageSnackBar} backgroundColor={backgroundColor} color={color}></SnackBar>}
            {toggleAlert && <AlertDeleteEverything setToggleAlert={setToggleAlert} setLinkedRandomDrop={props.setLinkedRandomDrop}></AlertDeleteEverything>}
            
            <div className={styles.containerButtons}>
                <button onClick={() => tryToSaveToLocalStorage()}>
                    <span className="material-icons">save</span>
                </button>
                <button onClick={() => {setToggleAlert(true)}}>
                    <span className="material-icons">delete</span>
                </button>
            </div>
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

function AlertDeleteEverything(props:{setToggleAlert:React.Dispatch<React.SetStateAction<boolean>>, setLinkedRandomDrop:React.Dispatch<React.SetStateAction<string[]>>}){
    return(
        <div className={styles.deleteEverything}>
            <div>
                <h2>
                    This action will delete everything in you current list 
                    that you are building OR cancel the edit if this list is 
                    coming from the book and quill, proceed ?
                </h2>
                <div>
                    <button onClick={() => {
                        LocalStorageService.positionOfEdit = -1;
                        props.setLinkedRandomDrop([]);
                        props.setToggleAlert(false);}} className={styles.confirm}>
                        YES
                    </button>
                </div>
                <div>
                    <button onClick={() => {props.setToggleAlert(false);}} className={styles.deny}>No take me back (っ °Д °;)っ</button>
                </div>
            </div>
        </div>
    )
}