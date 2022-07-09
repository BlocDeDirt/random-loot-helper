import Header from "./Header/Header";
import SelectionMenu from "./SelectionMenu/SelectionMenu";
import styles from "./App.module.css";
import {Tab} from "./EnumTab/EnumTab";
import { useState } from "react";
import ListOfBlocks from "./ListOfBlocks/ListOfBlocks";
import LinkedRandomDrop from "./LinkedRandomDrop/LinkedRandomDrop";

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
            <div>

              <ListOfBlocks className={styles.column} setLinkedRandomDrop={setLinkedRandomDrop} ></ListOfBlocks>
              
              <LinkedRandomDrop className={styles.column} linkedRandomDrop={linkedRandomDrop} setLinkedRandomDrop={setLinkedRandomDrop}></LinkedRandomDrop>

            </div>
          </div>
          {/*---------------------------------------------------------*/}
        </div>
      </main>

    </div>
  );
}

export default App;
