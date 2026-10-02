import { useState } from "react";

export default function QuestCard({ quest, onDelete, toggleStatus, onUpdateProgress }) {

    const [progress, setProgress] = useState(0);

    console.log(`[Render] QuestCard ID: ${quest.id} (${quest.title}) rendered!`);

    const handleIncrease = () => {
        if (progress < 100) {
            setProgress(progress + 25);
        }
    };

    const handleReset = () => {
        setProgress(0); 
    };

    return (
        <div className="questcard">
            <div className="questinfo">
                <h4>{quest.title}</h4>
                <div className="quest-meta">
                    <span className={`status-badge ${quest.status.toLowerCase()}`}>
                        {quest.status}
                    </span>
                    <span className="progress-text">{progress}%</span>
                </div>
                <div className="progress-bar-container">
                    <div 
                        className="progress-fill" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
            
            <div className="questaction">
                {/* <button onClick={() => onUpdateProgress(quest.id, 25)}>+25%</button>    
                <button onClick={() => onUpdateProgress(quest.id, 0)}>Сброс</button> */}
                <button onClick={handleIncrease}>+25%</button>
                <button onClick={handleReset}>Сброс</button>
                <button onClick={() => toggleStatus(quest.id)}>
                    {quest.status === 'Active' ? 'Завершить' : 'Активировать'}
                </button>
                <button className="deletebtn" onClick={() => onDelete(quest.id)}>
                    Удалить
                </button>
            </div>
        </div>
    );
}