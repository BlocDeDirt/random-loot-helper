import styles from "./DisplayLocalStorage.module.css";
import { LocalStorageService } from "../Services/LocalStorage.service";
import SnackBar from "../SnackBar/SnackBar";
import React, { useState } from "react";

export default function DisplayLocalStorage(props:{setLinkedRandomDrop:React.Dispatch<React.SetStateAction<string[]>>}){

    const[toggleSnackBar, setToggleSnackBar] = useState(false);
    const[search, setSearch] = useState("");
    const[refresh, setRefresh] = useState(0);

    const editRow = (dataToEdit:string[]) => {
        LocalStorageService.positionOfEdit = LocalStorageService.GetPositionOfWantedRow(dataToEdit);
        setToggleSnackBar(true);
        props.setLinkedRandomDrop([...LocalStorageService.dataLocalStorage[LocalStorageService.positionOfEdit]]);
    }

    const deleteRow = (dataToDelete:string[]) =>{
        LocalStorageService.DeleteDataFromLocalStorage(dataToDelete);
        forceRender();
    }

    //BECAUSE IN THE FUNCTION COMPONENT WE DONT HAVE A RE RENDER FUNCTION LIKE IN CLASS :-(
    const forceRender = () =>{
        setRefresh(refresh + 1);
    }

    return(
        <div>
            {toggleSnackBar && <SnackBar setToggleSnackBar={setToggleSnackBar} message="You can now edit this row in the others tabs." backgroundColor="#5e8091" color="black"></SnackBar>}
            <input type="text" className={styles.input} placeholder="Type your search here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
            <ListFiltered deleteRow={deleteRow} editRow={editRow} searchedValue={search.toUpperCase()}></ListFiltered>
        </div>
    )
}

interface IPropsListFiltered{
    editRow: (dataToEdit:string[]) => void;
    deleteRow: (dataToDelete:string[]) => void;
    searchedValue:string
}

function ListFiltered(props:IPropsListFiltered){
    let listFiltered:string[][] = [];

    const filterWhatsSearched = () => {
        for(let i = 0; i < LocalStorageService.dataLocalStorage.length; i++){
            let j = 0;
            let isFound = false;
             while(j < LocalStorageService.dataLocalStorage[i].length && isFound === false){
                if(LocalStorageService.dataLocalStorage[i][j].indexOf(props.searchedValue) > -1){
                    isFound = true;
                    listFiltered.push(LocalStorageService.dataLocalStorage[i]);
                }             
                j++;
            }
        }
    }

    if(props.searchedValue === ""){
        return (
            <>
            {LocalStorageService.dataLocalStorage.map((rowWithValues, index) => {
                return(
                    <div key={index.toString() + "container"}>
                        <div key={index} className={styles.rowLocalStorage}>
                            {rowWithValues.map((value, indexValue) => {
                                return(
                                    <React.Fragment key={indexValue.toString() + "container"}>
                                        <div key={indexValue} className={styles.valueInsideRow}>
                                            {value}
                                        </div>
                                        {indexValue !== rowWithValues.length-1 &&
                                            <div key={indexValue.toString() + "value"} className={styles.followUp}>
                                                <span key={indexValue.toString() + "doubleRight"} className="material-icons">keyboard_double_arrow_right</span>
                                            </div>
                                        }
                                    </React.Fragment>
                                )
                            })}
                        </div>

                        <div className={styles.containerButton} key={index.toString() + "contButton"}>
                            <button key={index.toString() + "buttDel"}
                            onClick={() => props.deleteRow(rowWithValues)}>
                                <span key={index.toString() + "delete"} className="material-icons">delete</span>
                            </button>
                            <button key={index.toString() + "ButtEdit"}
                            onClick={() => props.editRow(rowWithValues)}>
                                <span key={index.toString() + "edit"} className="material-icons">edit</span>
                            </button>
                        </div>

                    </div>
                )
            })}
            </>
        )
    }else{
        filterWhatsSearched();
        return(
            <>
            {listFiltered.map((rowWithValues, index) => {
                return(
                    <div key={index.toString() + "container"}>
                        <div key={index} className={styles.rowLocalStorage}>
                            {rowWithValues.map((value, indexValue) => {
                                return(
                                    <React.Fragment key={indexValue.toString() + "container"}>
                                        <div key={indexValue} className={styles.valueInsideRow}>
                                            {value}
                                        </div>
                                        {indexValue !== rowWithValues.length-1 &&
                                            <div key={indexValue.toString() + "value"} className={styles.followUp}>
                                                <span key={indexValue.toString() + "doubleRight"} className="material-icons">keyboard_double_arrow_right</span>
                                            </div>
                                        }
                                    </React.Fragment>
                                )
                            })}
                        </div>

                        <div className={styles.containerButton} key={index.toString() + "contButton"}>
                            <button key={index.toString() + "buttDel"}
                            onClick={() => props.deleteRow(rowWithValues)}>
                                <span key={index.toString() + "delete"} className="material-icons">delete</span>
                            </button>
                            <button key={index.toString() + "ButtEdit"}
                            onClick={() => props.editRow(rowWithValues)}>
                                <span key={index.toString() + "edit"} className="material-icons">edit</span>
                            </button>
                        </div>

                    </div>
                )
            })}
            </>
        )
    }
}