import React, {useState, useEffect} from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import MaterialIcon from "../../icons/MaterialIcon";

import "./Sites.css";

function Sites(props) {

    // const baseUrl = process.env.baseURL || "http://localhost:5000";

    const [headerText, setHeaderText] = useState("Telepek összes");
    const [sites, setSites] = useState([]);
    const [filteredSites, setFilteredSites] = useState([]);
    const [search, setSearch] = useState("");
    const [updateID, setUpdateID] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [country, setCountry] = useState("");
    const [zip, setZip] = useState("");
    const [city, setCity] = useState("");
    const [streetName, setHandleStreetname] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [contact, setContact] = useState("");
    const [hours, setHours] = useState("");
    const [gps, setGps] = useState("");
    const [notes, setNotes] = useState("");
    const [next, setNext] = useState(50);
    const [hasMore, setHasMore] = useState(true);

    let editMode = false;

    const [newSite, setNewSite] = useState({
        companyName: "",
        country: "",
        zip: "",
        city: "",
        streetName: "",
        houseNumber: "",
        contact: "",
        hours: "",
        gps: "",
        notes: ""
    });

    const [updateSite, setUpdateSite] = useState({
        id: "",
        companyName: "",
        country: "",
        zip: "",
        city: "",
        streetName: "",
        houseNumber: "",
        contact: "",
        hours: "",
        gps: "",
        notes: ""
    });

    function resetStates() {
        setCompanyName("");
        setCountry("");
        setZip("");
        setCity("");
        setHandleStreetname("");
        setHouseNumber("");
        setContact("");
        setHours("");
        setGps("");
        setNotes("");
    }

    /********************READ and FILTER***********************/

    function fetchData(){
        setNext(next+50);
        console.log("next value is:");
        console.log(next);
    }

    useEffect(() => {
        axios
            .get(`http://localhost:5000/sites?next=${next}`)
            .then(res => {
                const importedSites = res.data.items;
                const numberOfDocuments = res.data.numberOfDocuments;
                if((numberOfDocuments) < next) {
                    console.log(numberOfDocuments-50)
                    setHasMore(false);
                }
                setSites(importedSites);
                console.log("recived all Sites from backend");
            })
            .catch(err => {
                console.log(err)
            })
    }, [next]);

    /********************SEARCH***********************/
    function handleSearch(event){
        setSearch(event.target.value);
        setNext(50);
    }

    useEffect(() => {
        axios
            .get(`http://localhost:5000/sites/:findSite?search=${search}&next=${next}`)
            .then(res => {
                const filteredItems = res.data.filteredItems;
                const numberOfFoundSites = res.data.numberOfFoundSites;

                console.log("number of found sites:");
                console.log(numberOfFoundSites);

                console.log("number of filtered, recived from server items:");
                console.log(filteredItems.length);

                if((numberOfFoundSites) < next) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }

                setFilteredSites(filteredItems);
            })
            .catch(err => {
                console.log(err);
            })
    
    }, [search, next]);

    /********************CREATE MODAL***********************/
    const [showCreate, setShowCreate] = useState(false);

    function handleShowCreate(event) {
        resetStates();
        setShowCreate(true);
    }
    
    function handleCreateChange(event){
        const target = event.target.id;
        switch(target) {
            case "companyName": setCompanyName(event.target.value);
            break;
            case "country": setCountry(event.target.value);
            break;
            case "zip": setZip(event.target.value);
            break;
            case "city": setCity(event.target.value);
            break;
            case "streetName": setHandleStreetname(event.target.value);
            break;
            case "houseNumber": setHouseNumber(event.target.value);
            break;
            case "contact": setContact(event.target.value);
            break;
            case "hours": setHours(event.target.value);
            break;
            case "gps": setGps(event.target.value);
            break;
            case "notes": setNotes(event.target.value);
            break;
            default: console.log("no such option");
            break;
        }
        setNewSite({
            companyName: companyName,
            country: country,
            zip: zip,
            city: city,
            streetName: streetName,
            houseNumber: houseNumber,
            contact: contact,
            hours: hours, 
            gps: gps,
            notes: notes
        });
    }

    function handleCreate() {

        console.log(newSite);

        axios

            .post("https://localhost:5000/sites", newSite)

            .then(res => {

                // sites.push(newSite);
                setSites([...sites, newSite]);
                setHeaderText(res.data);
                setTimeout(() => {
                    setShowCreate(false);
                }, 250);
                resetStates();
                setTimeout(() => {
                    setHeaderText("Telepek hozzáadása");
                }, 1500);
                
            })

            .catch(err => {
                console.log(err);
            })

    }

    function handleCloseCreate(){
        setShowCreate(false);
    }

    /********************UPDATE MODAL***********************/
    const [showUpdate, setShowUpdate] = useState(false);
    
    function handleShowUpdate(event) {
        const updateElementID = event.target.id;
        sites.filter(site => {
            if(site._id === updateElementID) {
                setUpdateID(updateElementID);
                setCompanyName(site.companyName)
                setCountry(site.country)
                setZip(site.zip)
                setCity(site.city)
                setHandleStreetname(site.streetName)
                setHouseNumber(site.houseNumber)
                setContact(site.contact)
                setHours(site.hours)
                setGps(site.gps)
                setNotes(site.notes)
            }
        });
        setShowUpdate(true);
    }
    
    function handleUpdate(){

        sites.filter(site => {
            if(site._id === updateID) {
                site.companyName = companyName;
                site.country = country;
                site.zip = zip;
                site.city = city;
                site.streetName = streetName;
                site.houseNumber = houseNumber;
                site.contact = contact;
                site.hours = hours;
                site.gps = gps;
                site.notes = notes;

                setUpdateSite({
                    id: updateID,
                    companyName: companyName,
                    country: country,
                    zip: zip,
                    city: city,
                    streetName: streetName,
                    houseNumber: houseNumber,
                    contact: contact,
                    hours: hours,
                    gps: gps,
                    notes: notes
                });
                console.log(updateSite);
            }
        });
    }
    //https://github.com/react-hook-form/react-hook-form/issues/917
    //https://medium.com/@guptagaruda/react-hooks-understanding-component-re-renders-9708ddee9928
    useEffect(() => {

        console.log("updateSite object inside useEffect: ");
        console.log(updateSite);
        if(updateSite.companyName !== ""){
            console.log("updated sites inside if:");
            console.log(updateSite);

            axios

            .put("https://localhost:5000/sites", updateSite)

            .then(res => {
                setTimeout(() => {
                    setShowUpdate(false);
                }, 250);
                setHeaderText(res.data);
                setTimeout(() => {
                    setHeaderText("Telepek hozzáadása");
                }, 1500);
                
            })
        } else {
            console.log("there is nothing to update!")
        }
    }, [updateSite]);

    function handleUpdateChange(event){
        const target = event.target.id;

        switch(target) {
            case "companyName": setCompanyName(event.target.value);
            break;
            case "country": setCountry(event.target.value);
            break;
            case "zip": setZip(event.target.value);
            break;
            case "city": setCity(event.target.value);
            break;
            case "streetName": setHandleStreetname(event.target.value);
            break;
            case "houseNumber": setHouseNumber(event.target.value);
            break;
            case "contact": setContact(event.target.value);
            break;
            case "hours": setHours(event.target.value);
            break;
            case "gps": setGps(event.target.value);
            break;
            case "notes": setNotes(event.target.value);
            break;
            default: console.log("no such option");
            break;
             
        }
    }

    function handleCloseUpdate(){
        setShowUpdate(false);
    }

    /********************DELETE MODAL***********************/
    const [showDelete, setShowDelete] = useState(false);
    const [deleteID, setDeleteID] = useState("");

    function handleShowDelete(event) {
        setShowDelete(true);
        setDeleteID(event.target.id);
    }

    function handleCloseDelete() {
        setShowDelete(false);
    }
    /********************DELETE***********************/
    function handleDelete(event){
        const targetID = deleteID;
        axios
            .delete("https://localhost:5000/sites", {
                data: {
                    id: targetID
                }
            })
            .then(res => {
                var updatedSites = [];
                sites.filter(site => {
                    if(site._id !== targetID){
                        updatedSites.push(site);
                    }           
                });
                setShowDelete(false); 
                setSites(updatedSites);
                setHeaderText(res.data);
                setTimeout(() => {
                    setHeaderText("Telepek összes");
                }, 1500);
            })
    }

    function Table0(props) {

        const [companyNameVisibility, setCompanyNameVisibility] = useState(false);
        const [countryVisibility, setCountryVisibility] = useState(false);
        const [zipVisibility, setZipVisibility] = useState(false);
        const [cityVisibility, setCityVisibility] = useState(false);
        const [streetNameVisibility, setHandleStreetnameVisibility] = useState(false);
        const [houseNumberVisibility, setHouseNumberVisibility] = useState(false);
        const [contactVisibility, setContactVisibility] = useState(false);
        const [hoursVisibility, setHoursVisibility] = useState(false);
        const [gpsVisibility, setGpsVisibility] = useState(false);
        const [notesVisibility, setNotesVisibility] = useState(false);
        const [focusVisibility, setFocusVisibility] = useState(false);

        const [companyNameFocus, setCompanyNameFocus] = useState(false);
        const [countryFocus, setCountryFocus] = useState(false);
        const [zipFocus, setZipFocus] = useState(false);
        const [cityFocus, setCityFocus] = useState(false);
        const [streetNameFocus, setHandleStreetnameFocus] = useState(false);
        const [houseNumberFocus, setHouseNumberFocus] = useState(false);
        const [contactFocus, setContactFocus] = useState(false);
        const [hoursFocus, setHoursFocus] = useState(false);
        const [gpsFocus, setGpsFocus] = useState(false);
        const [notesFocus, setNotesFocus] = useState(false);
        const [focusFocus, setFocusFocus] = useState(false);

        const [companyNameT, setCompanyNameT] = useState(props.companyName);
        const [countryT, setCountryT] = useState(props.country);
        const [zipT, setZipT] = useState("");
        const [cityT, setCityT] = useState("");
        const [streetNameT, setHandleStreetnameT] = useState("");
        const [houseNumberT, setHouseNumberT] = useState("");
        const [contactT, setContactT] = useState("");
        const [hoursT, setHoursT] = useState("");
        const [gpsT, setGpsT] = useState("");
        const [notesT, setNotesT] = useState("");

        function handleClick(event){

            const target = event.target.id;

            switch(target) {

                case "companyName": 
                    setCompanyNameVisibility(true);
                    setCompanyNameFocus(true);
                break;

                case "country": 
                    setCountryVisibility(true);
                    setCountryFocus(true);
                break;

                default: console.log("That is not an option");
            }

        }

        function handleBlur(event){

            switch(event.target.className) {

                case "companyName": 
                    setCompanyNameFocus(false);
                    setCompanyNameVisibility(false);
                break;

                case "country": 
                    setCountryFocus(false);
                    setCountryVisibility(false);
                break;

                default: console.log("that is not an option");
            }
        }

        function handleInputChange(event) {

            switch(event.target.className) {

                case "companyName": setCompanyNameT(event.target.value);
                break;

                case "country": setCountryT(event.target.value);
                break;

                default: console.log("that is not an option");        
            }
        }

        return(
            <tr>
                <td>
                    {countryVisibility ? (
                        <input
                            style={{
                                fontSize: "12.5px",
                                padding: "0px",
                            }}
                            type="text" 
                            placeholder={countryT}
                            value={countryT}
                            onClick={handleClick}
                            onChange={handleInputChange}
                            className="country"
                            id={props.id}
                            autoFocus={countryFocus}
                            onBlur={handleBlur}
                            onFocus={event => event.target.select()}

                        />) : (
                        <span
                            onClick={handleClick}
                            id="country"
                        >{countryT}
                        </span>)
                    }
                </td>
                <td>{props.zip}</td>
                <td>{props.city}</td>
                <td>{props.streetName}</td>
                <td>{props.houseNumber}</td>
                <td>
                    {companyNameVisibility ? (
                        <input
                            style={{
                                fontSize: "12.5px",
                                padding: "0px",
                                width: "100%"
                            }}
                            type="text" 
                            placeholder={companyNameT}
                            value={companyNameT}
                            onClick={handleClick}
                            onChange={handleInputChange}
                            className="companyName"
                            id={props.id}
                            autoFocus={companyNameFocus}
                            onBlur={handleBlur}
                            onFocus={event => event.target.select()}
                        />) : (
                        <span
                            onClick={handleClick}
                            id="companyName"
                        >{companyNameT}
                        </span>)
                    }
                </td>
                <td>{props.contact}</td>
                <td>{props.hours}</td>
                <td>{props.gps}</td>
                <td>{props.notes}</td>
                <td>
                    <MaterialIcon 
                        iconName="format_italic" 
                        className="updateIcon" 
                        onClick={handleShowUpdate} 
                        id={props.id}/>
                </td>
                <td>
                    <MaterialIcon 
                        iconName="delete" 
                        className="delIcon" 
                        onClick={handleShowDelete} 
                        id={props.id}
                    />
                </td>
            </tr>
        )
    }


    return(
        <div className={`Sites ${props.mainContainerClass}`}>

            <h1 
                className="searchHeader"
            >
                <MaterialIcon 
                    iconName="search"
                    className="searchIcon"
                />
                <input 
                    type="text" 
                    placeholder={headerText}
                    className="headerInput"
                    value={search}
                    onChange={handleSearch}
                    autoFocus={true}
                >
                </input>
                <MaterialIcon 
                    iconName="add"
                    className="addIcon"
                    onClick={handleShowCreate}
                />
            </h1>
            
            <Modal 
                show={showCreate} 
                onHide={handleCloseCreate}
            >
                <Modal.Header closeButton>
                <Modal.Title>Hozzáadás</Modal.Title>
                </Modal.Header>
                <Modal.Body>                    
                    <form>
                        <div className="input-row">
                            <MaterialIcon
                                iconName="business_center"
                                className="input-icon"
                            />
                            <input
                                placeholder="Cégnév"
                                className="popup-input-field"
                                value={companyName}
                                id="companyName"
                                onChange={handleCreateChange}
                                autoFocus
                            />
                        </div>
                        <div className="input-row">
                            <MaterialIcon
                                iconName="map"
                                className="input-icon"
                            />
                            <input
                                placeholder="Ország"
                                className="popup-input-field"
                                value={country}
                                id="country"
                                onChange={handleCreateChange}
                            />
                        </div>
                        <div className="input-row">
                            <MaterialIcon
                                iconName="map"
                                className="input-icon"
                            />
                            <input
                                placeholder="Irányítószám"
                                className="popup-input-field"
                                value={zip}
                                id="zip"
                                onChange={handleCreateChange}
                            />
                        </div>
                        <div className="input-row">
                            <MaterialIcon
                                iconName="map"
                                className="input-icon"
                            />
                            <input
                                placeholder="Város"
                                className="popup-input-field"
                                value={city}
                                id="city"
                                onChange={handleCreateChange}
                            />
                        </div>
                        <div className="input-row">
                            <MaterialIcon
                                iconName="map"
                                className="input-icon"
                            />
                            <input
                                placeholder="Utca"
                                className="popup-input-field"
                                value={streetName}
                                id="streetName"
                                onChange={handleCreateChange}
                            />
                        </div>
                        <div className="input-row">
                            <MaterialIcon
                                iconName="map"
                                className="input-icon"
                            />
                            <input
                                placeholder="Házszám"
                                className="popup-input-field"
                                value={houseNumber}
                                id="houseNumber"
                                onChange={handleCreateChange}
                            />
                        </div>
                        <div className="input-row">
                            <MaterialIcon
                                iconName="perm_contact_calendar"
                                className="input-icon"
                            />
                            <input
                                placeholder="Kontakt"
                                className="popup-input-field"
                                value={contact}
                                id="contact"
                                onChange={handleCreateChange}
                            />
                        </div>
                        <div className="input-row">
                            <MaterialIcon
                                iconName="perm_contact_calendar"
                                className="input-icon"
                            />
                            <input
                                placeholder="Nyitvatartás"
                                className="popup-input-field"
                                value={hours}
                                id="hours"
                                onChange={handleCreateChange}
                            />
                        </div>
                        <div className="input-row">
                            <MaterialIcon
                                iconName="perm_contact_calendar"
                                className="input-icon"
                            />
                            <input
                                placeholder="GPS"
                                className="popup-input-field"
                                value={gps}
                                id="gps"
                                onChange={handleCreateChange}
                            />
                        </div>
                        <div className="input-row">
                            <MaterialIcon
                                iconName="comment"
                                className="input-icon"
                            />
                            <input
                                placeholder="Megjegyzés"
                                className="popup-input-field"
                                value={notes}
                                id="notes"
                                onChange={handleCreateChange}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCreate}>
                        Mégsem
                    </Button>
                    <Button variant="primary" onClick={handleCreate}>
                        Mentés
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal 
                show={showDelete} 
                onHide={handleCloseDelete} 
            >
                <Modal.Header closeButton>
                <Modal.Title>Végleges törlés</Modal.Title>
                </Modal.Header>
                <Modal.Body>Biztosan el kívánod távolítani az elemet?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Mégsem
                    </Button>
                    <Button variant="warning" onClick={handleDelete}>
                        Eltávolítás
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal 
                show={showUpdate} 
                onHide={handleCloseUpdate}
            >
                <Modal.Header closeButton>
                <Modal.Title>Módosítás</Modal.Title>
                </Modal.Header>
                <Modal.Body>                    
                <form>
                        <div className="input-row">
                            <MaterialIcon
                                iconName="business_center"
                                className="input-icon"
                            />
                            <input
                                placeholder="Cégnév"
                                className="popup-input-field"
                                value={companyName}
                                id="companyName"
                                onChange={handleUpdateChange}
                                autoFocus
                            />
                        </div>
                        <div className="input-row">
                            <MaterialIcon
                                iconName="map"
                                className="input-icon"
                            />
                            <input
                                placeholder="Ország"
                                className="popup-input-field"
                                value={country}
                                id="country"
                                onChange={handleUpdateChange}
                            />
                        </div>
                        <div className="input-row">
                            <MaterialIcon
                                iconName="map"
                                className="input-icon"
                            />
                            <input
                                placeholder="Irányítószám"
                                className="popup-input-field"
                                value={zip}
                                id="zip"
                                onChange={handleUpdateChange}
                            />
                        </div>
                        <div className="input-row">
                            <MaterialIcon
                                iconName="map"
                                className="input-icon"
                            />
                            <input
                                placeholder="Város"
                                className="popup-input-field"
                                value={city}
                                id="city"
                                onChange={handleUpdateChange}
                            />
                        </div>
                        <div className="input-row">
                            <MaterialIcon
                                iconName="map"
                                className="input-icon"
                            />
                            <input
                                placeholder="Utca"
                                className="popup-input-field"
                                value={streetName}
                                id="streetName"
                                onChange={handleUpdateChange}
                            />
                        </div>
                        <div className="input-row">
                            <MaterialIcon
                                iconName="map"
                                className="input-icon"
                            />
                            <input
                                placeholder="Házszám"
                                className="popup-input-field"
                                value={houseNumber}
                                id="houseNumber"
                                onChange={handleUpdateChange}
                            />
                        </div>
                        <div className="input-row">
                            <MaterialIcon
                                iconName="perm_contact_calendar"
                                className="input-icon"
                            />
                            <input
                                placeholder="Kontakt"
                                className="popup-input-field"
                                value={contact}
                                id="contact"
                                onChange={handleUpdateChange}
                            />
                        </div>
                        <div className="input-row">
                            <MaterialIcon
                                iconName="perm_contact_calendar"
                                className="input-icon"
                            />
                            <input
                                placeholder="Nyitvatartás"
                                className="popup-input-field"
                                value={hours}
                                id="hours"
                                onChange={handleUpdateChange}
                            />
                        </div>
                        <div className="input-row">
                            <MaterialIcon
                                iconName="perm_contact_calendar"
                                className="input-icon"
                            />
                            <input
                                placeholder="GPS"
                                className="popup-input-field"
                                value={gps}
                                id="gps"
                                onChange={handleUpdateChange}
                            />
                        </div>
                        <div className="input-row">
                            <MaterialIcon
                                iconName="comment"
                                className="input-icon"
                            />
                            <input
                                placeholder="Megjegyzés"
                                className="popup-input-field"
                                value={notes}
                                id="notes"
                                onChange={handleUpdateChange}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUpdate}>
                        Mégsem
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Frissítés
                    </Button>
                </Modal.Footer>
            </Modal>

            <Table 
                responsive="sm"
                size="sm" 
                borderless 
                hover 
                className="bootstrap-table"
            >

                <InfiniteScroll
                    dataLength={sites.length} //This is important field to render the next data
                    next={fetchData}
                    hasMore={hasMore}
                    height={650}
                    loader={<h4>Adatok betöltése...</h4>}
                    endMessage={
                        <p style={{textAlign: 'center'}}>
                        <b>Lista vége...</b>
                        </p>
                    }
                >
                <thead>
                    <tr>
                        <td>Ország</td>
                        <td>Irányítószám</td>
                        <td>Város</td>
                        <td>Utca</td>
                        <td>Házszám</td>
                        <td>Cégnév</td>
                        <td>Kontakt</td>
                        <td>Nyitvatartás</td>
                        <td>GPS</td>
                        <td>Megjegyzés</td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>       
                    {
                        (search ==="" ? sites : filteredSites).map((currentSite, index) => {
                            return(
                                <Table0 
                                    key = {index}
                                    index = {index}
                                    companyName = {currentSite.companyName}
                                    country = {currentSite.country}
                                    zip = {currentSite.zip}
                                    city = {currentSite.city}
                                    streetName = {currentSite.streetName}
                                    houseNumber = {currentSite.houseNumber}
                                    contact = {currentSite.contact}
                                    hours = {currentSite.hours}
                                    gps = {currentSite.gps}
                                    notes = {currentSite.notes}
                                    id = {currentSite._id}
                                />
                            )
                        })
                    }

                </tbody>
                </InfiniteScroll>
            </Table>
        </div>
    )
}

export default Sites;