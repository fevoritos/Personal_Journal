import "./App.css";
import Header from "./components/Header/Header";
import JournalList from "./components/JournalList/JournalList";
import Body from "./layouts/Body/Body";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";
import { useLocalStorage } from "./hooks/use-localstorage.hook";
import { UserContextProvider } from "./context/user.context";
import { useState } from "react";

// const INITIAL_DATA = [
// {
//     "id": 1,
//     "title": "Подготовка к обновлению курсов",
//     "post": "Горные походы открывают удивительные природные ландшафты",
//     "date": "2024/06/05"
// },
// {
//     "id": 2,
//     "title": "Поход в горы",
//     "post": "Думал, что очень много времени",
//     "date": "2024/06/05"
// },
// ];

function mapItems(items) {
    if (!items) {
        return [];
    }
    return items.map((i) => ({
        ...i,
        date: new Date(i.date),
    }));
}

function App() {
    const [items, setItems] = useLocalStorage(["data"]);
    const [selectedItem, setSelectedItem] = useState({});

    const addItem = (item) => {
        if (!item.id) {
            setItems([
                ...mapItems(items),
                {
                    ...item,
                    date: new Date(item.date),
                    id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
                },
            ]);
        } else {
            setItems([
                ...mapItems(items).map((i) => {
                    if (i.id === item.id) {
                        return {
                            ...item,
                        };
                    }
                    return i;
                }),
            ]);
        }
    };

    return (
        <UserContextProvider>
            <div className="app">
                <LeftPanel>
                    <Header />
                    <JournalAddButton />
                    <JournalList items={mapItems(items)} setItem={setSelectedItem} />
                </LeftPanel>
                <Body>
                    <JournalForm onSubmit={addItem} data={selectedItem} />
                </Body>
            </div>
        </UserContextProvider>
    );
}

export default App;
