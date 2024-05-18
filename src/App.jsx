import  { useState, useEffect } from "react";

const NoteTakingApp = () => {
  const [videoId, setVideoId] = useState("");
  const [notes, setNotes] = useState([]);

  // Load notes from local storage on component mount
  useEffect(() => {
    if (videoId) {
      const storedNotes = JSON.parse(localStorage.getItem(videoId)) || [];
      setNotes(storedNotes);
    }
  }, [videoId]);

  const addNote = (timestamp, content) => {
    const newNote = {
      date: new Date().toLocaleDateString(),
      timestamp: timestamp,
      content: content,
    };
    setNotes([...notes, newNote]);
    updateLocalStorage([...notes, newNote]);
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    updateLocalStorage(updatedNotes);
  };

  const editNote = (index, updatedNote) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = updatedNote;
    setNotes(updatedNotes);
    updateLocalStorage(updatedNotes);
  };

  const updateLocalStorage = (updatedNotes) => {
    localStorage.setItem(videoId, JSON.stringify(updatedNotes));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
       
        <div className="flex items-center">
          <input
            type="text"
            className="border p-2 rounded mr-2"
            placeholder="Enter video ID"
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setVideoId("")}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Video Player Component */}
      <div className="mb-8">
        {videoId && (
          <iframe
            title="YouTube Video Player"
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        )}
      </div>

      {videoId && (
        <>
         <h1 className="font-bold">My notes</h1>
          <p className="mb-4">
            All your notes at a single place. Click on any note to get to
            specific timestamp in the video.
          </p>
          <hr className="my-8" />

          <div className="w-full mx-auto bg-white p-6 rounded border">
            <div className="space-y-4">
              {notes.map((note, index) => (
                <div
                  key={index}
                  className="flex flex-col p-4 border-gray-200 rounded"
                >
                  <span className="text-sm text-gray-600">{note.date}</span>
                  <div className="flex justify-end ">
            <button
              className="bg-white text-black rounded border px-3 inline-flex items-center"
              onClick={() => {
                const timestamp = prompt("Enter timestamp (in seconds)");
                const content = prompt("Enter note content");
                addNote(timestamp, content);
              }}
            >
              <span>Add new note</span>
            </button>
          </div>
                  <a
                    href={`https://www.youtube.com/embed/${videoId}?t=${note.timestamp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >{`Timestamp at ${note.timestamp}`}</a>
                  <p className="border p-2 rounded">{note.content}</p>
                  <div className="flex justify-end mt-2">
                    <button
                      className="bg-white text-black rounded border px-3 inline-flex items-center"
                      onClick={() => deleteNote(index)}
                    >
                      <span>Delete note</span>
                    </button>
                    <button
                      className="bg-white text-black rounded border px-3 inline-flex items-center ml-4"
                      onClick={() =>
                        editNote(index, {
                          ...note,
                          content: prompt(
                            "Enter new note content",
                            note.content
                          ),
                        })
                      }
                    >
                      <span>Edit note</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
         
        </>
      )}
    </div>
  );
};

export default NoteTakingApp;
