import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
  
function App() {
    const [isOpen, setIsOpen] = useState(true);
    const handleOk = () => {
        window.open('https://cors-anywhere.herokuapp.com/corsdemo');
        setIsOpen(false);
    }    

    const handleClose = () => {
        setIsOpen(false);
    }
    return (
        <div>
            <SearchBar />
            { isOpen && <div className="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Set Cors Policy</h5>
                            <button type="button" className="btn-close" onClick={() => handleClose()} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            You need to enable CORS for this site. Click 'OK' to go now
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => handleClose()}>Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={() => handleOk()}>OK</button>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    );
}
  

export default App;
