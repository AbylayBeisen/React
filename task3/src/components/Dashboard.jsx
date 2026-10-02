import { useState } from "react";
import QuestCard from "./QuestCard";

export default function Dashboard(){
    const [quests, setQuests] = useState([
        {id: 1, title: 'Clear the Goblin Cave', status: 'Active'},
        {id: 2, title: 'Gather Healing Herbs', status: 'Active'},
    ]);

    const [newTitle, setNewTitle] = useState("");
    const [filter, setFilter] = useState('All');

    console.log("dashboard works");

    const Delete = (id) => {
        setQuests((prevQuests) => prevQuests.filter((q) => q.id !== id));
    };

    const addQuest = (e) => {
        e.preventDefault();

        if (!newTitle.trim()) return;

        const newQuest = {
            id: Date.now(),
            title: newTitle,
            status: 'Active',
            // progress: 0,
        };

        setQuests([newQuest, ...quests]);
        setNewTitle("");
    };

    const Status = (id) => {
        setQuests((prevQuests) =>
            prevQuests.map((q) => {
                if (q.id === id) {
                    const newStatus = q.status === "Active" ? "Completed" : "Active";
                    return { ...q, status: newStatus };
                }
                return q;
            })
        );
    };

    // const updateProgress = (id, step) => {
    //     setQuests((prevQuests) =>
    //         prevQuests.map((q) => {
    //             if (q.id === id) {
    //                 const nextProgress = step === 0 ? 0 : Math.min(q.progress + step, 100);
    //                 const nextStatus = nextProgress === 100 ? "Completed" : "Active";
    //                 return { ...q, progress: nextProgress, status: nextStatus };
    //             }
    //             return q;
    //         })
    //     );
    // };

    const Reverse = () => {
        setQuests([...quests].reverse());
    };

    const Filter = quests.filter((q) => {
        if (filter === 'Active') return q.status === 'Active';
        if (filter === 'Completed') return q.status === 'Completed';
        return true;
    });

    return (
        <div className="dashcontainer">
            <form onSubmit={addQuest} className="questform">
                <input 
                    type="text"
                    placeholder="Новый квест"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                <button type="submit">Добавить квест</button>
            </form>

            <div className="buttons">
                <button onClick={Reverse}>Перевернуть</button>
                <button onClick={() => setFilter("All")}>Все</button>
                <button onClick={() => setFilter("Completed")}>Завершенные</button>
                <button onClick={() => setFilter("Active")}>Активные</button>
            </div>
            
            <p>Количество элементов в списке: {Filter.length}</p>
            
            <div className="questlist">
                {Filter.map((quest) => (
                    <QuestCard 
                        key={quest.id}
                        quest={quest}
                        onDelete={Delete}
                        toggleStatus={Status}
                        // onUpdateProgress={updateProgress}
                    />
                ))}
            </div>
        </div>
    );
}