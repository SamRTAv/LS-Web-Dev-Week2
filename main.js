function uuid() {
    return Math.random().toString(36).substring(2, 15) +
           Math.random().toString(36).substring(2, 15);
  }
  
const Note = ({id,head, text, editHandler, deleteHandler}) => {
    return (
        
      <div className='note container card '>
          <div className='note_head card-title ms-3 mt-3'>{head}</div>
          <hr/>
          <div className='note-body card-body'>{text}</div>
          <div className='note_footer' style={{justifyContent : "flex-end"}}>
          <button className='note_save' onClick={() => deleteHandler(id)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path><path d="M9 8h2v9H9zm4 0h2v9h-2z"></path></svg></button> &nbsp;
          <button className='note_save' onClick={() => editHandler(id, text,head)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.41 4.94l-1.35-1.35c-.78-.78-2.05-.78-2.83 0L13.4 6.41 3 16.82V21h4.18l10.46-10.46 2.77-2.77c.79-.78.79-2.05 0-2.83zm-14 14.12L5 19v-1.36l9.82-9.82 1.41 1.41-9.82 9.83z"></path></svg></button>
          </div>
      </div>
    )
  }
const CreateNote = ({headText,setHeadText,inputText, setInputText, saveHandler}) => {
    const char= 1000;
    const charLimit = char - inputText.length;
  return (
    <div className='note container card text-bg-warning create'>
        <div className= "card-title ms-3 mt-3">
        <textarea
        // className = "card-title ms-3 mt-3"
        cols={100}
        rows={1}
        placeholder='Title'
        value={headText}
        onChange={(e) => setHeadText(e.target.value)}
        maxLength={100}
        >
        </textarea>
        </div>
        <hr/>
        <textarea 
        className="card-body"
        cols={10}
        rows={5}
        placeholder='Take a Note.....'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        maxLength={1000}
        >
        </textarea>
        <div className='note_footer'>
            <span className='label'>{charLimit} Left</span>
            <button className='note_save' onClick={saveHandler}>Save</button>
        </div>
    </div>
  )
}
const Notes = () => {
    const [inputText, setInputText] = React.useState("")
    const [headText, setHeadText] = React.useState("")
    const [notes, setNotes] = React.useState([])
    const [editToggle, setEditToggle] = React.useState(null)

    const editHandler = (id,text,head) => {
        setEditToggle(id)
        setInputText(text)
        setHeadText(head)
    }
    const saveHandler = () => {
        if(editToggle) {
            setNotes(notes.map((note) => (
                note.id === editToggle ?
                {...note, text: inputText,head: headText}
                : note
            )))
        } else {
            setNotes((prevNotes) => [
                ...prevNotes, {
                    id: uuid(),
                    text: inputText,
                    head: headText
                }
            ])
        }
        
        setInputText("")
        setHeadText("")
        setEditToggle(null)
    }

    const deleteHandler = (id) => {
        const newNotes = notes.filter(n => n.id !== id)
        setNotes(newNotes)
    }

    React.useEffect(() => {
        const data = JSON.parse(localStorage.getItem("Notes"));
        if (data) {
          setNotes(data);
        }
      }, []);

  React.useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);
  return (
    <div className='notes container'>
        {
            notes.map((note) => (
                editToggle === note.id ?
                <CreateNote 
                        inputText={inputText}
                        setInputText = {setInputText} 
                        headText={headText}
                        setHeadText = {setHeadText} 
                        saveHandler = {saveHandler}
                        />
                :
                <Note
                    key={note.id}
                    id={note.id}
                    text={note.text}
                    head = {note.head}
                    editHandler = {editHandler}
                    deleteHandler= {deleteHandler}
                >
                </Note>
            ))
        }
        {
            editToggle === null ? 
            <CreateNote 
            inputText={inputText}
            setInputText = {setInputText} 
            headText={headText}
            setHeadText = {setHeadText} 
            saveHandler = {saveHandler}
        /> : <></>
        }
        
    </div>
  )
}
const Header = () => {
    return (
      <div className='header'> 
          <h1 className='title'>Notes</h1>
          </div>
    )
  }
function App() {
const [theme, setTheme] = React.useState('light');

const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light'); 
};

return (
    <div className={"main "+theme}>
    <a href="#" className="form-check form-switch" onClick={changeTheme}>
        {theme === 'light' ? (
        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"></input>
        ) : (
        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked></input>
        )}
    </a>
    
    <Header />
    <Notes />
    </div>
);
}
  

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);


