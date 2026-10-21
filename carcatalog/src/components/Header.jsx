export default function Header(onAddClick){
    return(
        <header style = {{padding: '20px', backgroundColor: '#222', color: '#fff'}}>
            <h2 style = {{margin: 0}}>Auto & Prototype Archive</h2>
            <button onClick={onAddClick} style={{ padding: '8px 16px', cursor: 'pointer' }}>
                 Добавить авто
            </button>
        </header>
    );
}