import "./App.css";
import Header from "./components/Header/Header";
import CardButton from "./components/CardButton/CardButton";
import JournalItem from "./components/JournalItem/JournalItem";
import JournalList from "./components/JournalList/JournalList";
import Body from "./layouts/Body/Body";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import { useState } from "react";
import JournalForm from "./components/JournalForm/JournalForm";

const INITIAL_DATA = [
    {
        id: 1,
        title: "Подготовка к обновлению курсов",
        text: "Горные походы открывают удивительные природные ландшафты",
        date: new Date(),
    },
    {
        id: 2,
        title: "Поход в горы",
        text: "Думал, что очень много времени",
        date: new Date(),
    },
];

function App() {
    const [items, setItems] = useState(INITIAL_DATA);

    const addItem = (item) => {
        setItems((oldItems) => [
            ...oldItems,
            {
                text: item.text,
                title: item.title,
                date: new Date(item.date),
                id: Math.max(...oldItems.map((i) => i.id)) + 1,
            },
        ]);
    };

    const sortItems = (a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    };

    return (
        <div className="app">
            <LeftPanel>
                <Header />
                <JournalAddButton></JournalAddButton>
                <JournalList>
                    {items.sort(sortItems).map((el) => (
                        <CardButton key={el.id}>
                            <JournalItem
                                title={el.title}
                                text={el.text}
                                date={el.date}
                            />
                        </CardButton>
                    ))}
                </JournalList>
            </LeftPanel>
            <Body>
                <JournalForm onSubmit={addItem} />
            </Body>
        </div>
    );
}

export default App;
