import "./App.css";
import Header from "./components/Header/Header";
import JournalList from "./components/JournalList/JournalList";
import Body from "./layouts/Body/Body";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";
import { useLocalStorage } from "./hooks/use-localstorage.hook";

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

    const addItem = (item) => {
        setItems([
            ...mapItems(items),
            {
                post: item.post,
                title: item.title,
                date: new Date(item.date),
                id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
            },
        ]);
    };

    return (
        <div className="app">
            <LeftPanel>
                <Header />
                <JournalAddButton />
                <JournalList items={mapItems(items)} />
            </LeftPanel>
            <Body>
                <JournalForm onSubmit={addItem} />
            </Body>
        </div>
    );
}

export default App;
