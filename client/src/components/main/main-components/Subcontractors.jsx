import React, { useState } from "react";
import "./Subcontractors_uc.css";

function Subcontractors(props) {

    const [editModeState, setEditModeState] = useState(false);

    return(
        <div className="Subcontractors">
            <h1>Under construction</h1>
            {/* <div>
                {editModeState ? 
                    (<input 
                        type="text" 
                        placeholder="Type something"
                        autoFocus
                    />
                    ) : 
                    (<span
                        onClick={() => setEditModeState(true)}
                    ><h3>Click for edit</h3></span>)}
                
                
            </div> */}
        </div>
    )
}

export default Subcontractors;