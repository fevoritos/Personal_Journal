import './App.css'
import Button from './components/Button/Button'
import Header from './components/Header/Header';
import CardButton from './components/CardButton/CardButton';
import JournalItem from './components/JournalItem/JournalItem';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';

function App() {
	const data = [
		{
			title: 'Подготовка к обновлению курсов',
			text: 'Горные походы открывают удивительные природные ландшафты',
			date: new Date(),

		},
		{
			title: 'Поход в горы',
			text: 'Думал, что очень много времени',
			date: new Date(),

		}
	]

	return (
		<div className='app'>
			<LeftPanel>
				<Header />
				<JournalAddButton></JournalAddButton>
				<JournalList>
					<CardButton>
						<JournalItem
							title={data[0].title}
							text={data[0].text}
							date={data[0].date}
						/>
					</CardButton>
					<CardButton>
						<JournalItem
							title={data[1].title}
							text={data[1].text}
							date={data[1].date}

						/>
					</CardButton>
				</JournalList>
			</LeftPanel>
			<Body>
				body
			</Body>
			{/* <Button /> */}

		</div>
	);
}

export default App
