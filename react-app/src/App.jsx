import "./App.css";
import Header from "./components/Header/Header";
import JournalList from "./components/JournalList/JournalList";
import Body from "./layouts/Body/Body";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import { useState } from "react";
import JournalForm from "./components/JournalForm/JournalForm";

const INITIAL_DATA = [
    // {
    //     id: 1,
    //     title: "Подготовка к обновлению курсов",
    //     post: "Горные походы открывают удивительные природные ландшафты",
    //     date: new Date(),
    // },
    // {
    //     id: 2,
    //     title: "Поход в горы",
    //     post: "Думал, что очень много времени",
    //     date: new Date(),
    // },
];

function App() {
    const [items, setItems] = useState(INITIAL_DATA);

    const addItem = (item) => {
        setItems((oldItems) => [
            ...oldItems,
            {
                post: item.post,
                title: item.title,
                date: new Date(item.date),
                id: oldItems.length > 0 ? Math.max(...oldItems.map((i) => i.id)) + 1: 1,
            },
        ]);
    };

    return (
        <div className="app">
            <LeftPanel>
                <Header />
                <JournalAddButton />
                <JournalList items={items} />
            </LeftPanel>
            <Body>
                <JournalForm onSubmit={addItem} />
            </Body>
        </div>
    );
}

export default App;
