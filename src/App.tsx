import Header from "./Header/Header";
import SelectionMenu from "./SelectionMenu/SelectionMenu";
import styles from "./App.module.css";
import {Tab} from "./EnumTab/EnumTab";
import { useState } from "react";
import ListOfBlocks from "./ListOfBlocks/ListOfBlocks";
import LinkedRandomDrop from "./LinkedRandomDrop/LinkedRandomDrop";
import DisplayLocalStorage from "./DisplayLocalStorage/DisplayLocalStorage";

function App() {
  const [tabSelected, setTabSelected] = useState<Tab>(Tab.block);
  const [linkedRandomDrop, setLinkedRandomDrop] = useState<string[]>([]);

  return (
    <div>
      <Header></Header>

      <main className={styles.main}>
        <div>
          {/*---------------------------------------------------------*/}
          <SelectionMenu tabSelected={tabSelected} setTabSelected={setTabSelected}></SelectionMenu>
          <div className={styles.containerSelection}>

            {tabSelected !== Tab.bookAndQuill
              ?<div className={styles.listDrop}>
                  <WhatToRender tabSelected={tabSelected} setLinkedRandomDrop={setLinkedRandomDrop}></WhatToRender>
                  <LinkedRandomDrop className={styles.column} linkedRandomDrop={linkedRandomDrop} setLinkedRandomDrop={setLinkedRandomDrop}></LinkedRandomDrop>
                </div>

              : <DisplayLocalStorage setLinkedRandomDrop={setLinkedRandomDrop}></DisplayLocalStorage> /*BOOK AND QUILL*/
            }


          </div>
          {/*---------------------------------------------------------*/}
        </div>
      </main>

    </div>
  );
}

function WhatToRender(props:{tabSelected:Tab, setLinkedRandomDrop:React.Dispatch<React.SetStateAction<string[]>>}){
  if(props.tabSelected === Tab.block){
    return(
      <ListOfBlocks className={styles.column} setLinkedRandomDrop={props.setLinkedRandomDrop} nameJSON="blocks.json"></ListOfBlocks>
    )
  }

  if(props.tabSelected === Tab.item){
    return(
      <ListOfBlocks className={styles.column} setLinkedRandomDrop={props.setLinkedRandomDrop} nameJSON="items.json"></ListOfBlocks>
    )
  }

  if(props.tabSelected === Tab.lootChest){
    return(
      <ListOfBlocks className={styles.column} setLinkedRandomDrop={props.setLinkedRandomDrop} nameJSON="lootChest.json"></ListOfBlocks>
    )
  }

  if(props.tabSelected === Tab.flowerPot){
    return(
      <ListOfBlocks className={styles.column} setLinkedRandomDrop={props.setLinkedRandomDrop} nameJSON="flowerPots.json"></ListOfBlocks>
    )
  }

  if(props.tabSelected === Tab.mob){
    return(
      <ListOfBlocks className={styles.column} setLinkedRandomDrop={props.setLinkedRandomDrop} nameJSON="mobs.json"></ListOfBlocks>
    )
  }

  return(
    <>
    Holy poop this is not normal
    </>
  )
}

export default App;
