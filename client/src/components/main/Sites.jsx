import React, {useState, useEffect} from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import MaterialIcon from "../../icons/MaterialIcon";
import axios from "axios";
import "./ClientRead.css";

function ClientRead(props) {

    // const baseUrl = process.env.baseURL || "http://localhost:5000";

    const [headerText, setHeaderText] = useState("Vevők összes");
    const [clients, setClients] = useState([]);
    const [search, setSearch] = useState("");
    const [updateID, setUpdateID] = useState("");

    const [companyName, setCompanyName] = useState("");
    const [country, setCountry] = useState("");
    const [zip, setZip] = useState("");
    const [city, setCity] = useState("");
    const [streetName, setHandleStreetname] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [title, setTitle] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [tel, setTel] = useState("");
    const [email, setEmail] = useState("");
    const [notes, setNotes] = useState("");

    const [newClient, setNewClient] = useState({
        companyName: "",
        country: "",
        zip: "",
        city: "",
        streetme: "",
        houseNumber: "",
        title: "",
        lastme: "", 
        firstme: "",
        tel: "",
        email: "",
        notes: ""
    });

    const [updateClient, setUpdateClient] = useState({
        id: "",
        companyName: "",
        country: "",
        zip: "",
        city: "",
        streetme: "",
        houseNumber: "",
        title: "",
        lastme: "", 
        firstme: "",
        tel: "",
        email: "",
        notes: ""
    });

    function resetStates() {
        setCompanyName("");
        setCountry("");
        setZip("");
        setCity("");
        setHandleStreetname("");
        setHouseNumber("");
        setTitle("");
        setLastName("");
        setFirstName("");
        setTel("");
        setEmail("");
        setNotes("");
    }

    /********************READ and FILTER***********************/
    //olivercsillag@gmail.com
    useEffect(() => {
        axios
            .get("https://herokuwimpi.herokuapp.com/clients")
            .then(res => {
                const importedClients = res.data;
                setClients(importedClients);
                console.log("recived all Clients from backend");
            })
            .catch(err => {
                console.log(err)
            })
    }, []); /*clients.length*/

    /********************SEARCH***********************/
    function handleSearch(event){
        setSearch(event.target.value);
    }

    let filteredClients = clients.filter(client => {
        return  client.companyName.toLowerCase().includes(search) ||
                client.country.toLowerCase().includes(search) ||
                client.notes.toLowerCase().includes(search);
    }, []);

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
            case "title": setTitle(event.target.value);
            break;
            case "lastName": setLastName(event.target.value);
            break;
            case "firstName": setFirstName(event.target.value);
            break;
            case "tel": setTel(event.target.value);
            break;
            case "email": setEmail(event.target.value);
            break;
            case "notes": setNotes(event.target.value);
            break;
            default: console.log("no such option");
            break;
        }
        setNewClient({
            companyName: companyName,
            country: country,
            zip: zip,
            city: city,
            streetName: streetName,
            houseNumber: houseNumber,
            title: title,
            lastName: lastName, 
            firstName: firstName,
            tel: tel,
            email: email,
            notes: notes
        });
    }

    function handleCreate() {

        console.log(newClient);

        axios

            .post("https://herokuwimpi.herokuapp.com/clients", newClient)

            .then(res => {

                clients.push(newClient);
                setHeaderText(res.data);
                setTimeout(() => {
                    setShowCreate(false);
                }, 250);
                resetStates();
                setTimeout(() => {
                    setHeaderText("Vevők hozzáadása");
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
        clients.filter(client => {
            if(client._id === updateElementID) {
                setUpdateID(updateElementID);
                setCompanyName(client.companyName)
                setCountry(client.country)
                setZip(client.zip)
                setCity(client.city)
                setHandleStreetname(client.streetName)
                setHouseNumber(client.houseNumber)
                setTitle(client.title)
                setLastName(client.lastName)
                setFirstName(client.firstName)
                setTel(client.tel)
                setEmail(client.email)
                setNotes(client.notes)
            }
        });
        setShowUpdate(true);
    }
    
    function handleUpdate(){

        clients.filter(client => {
            if(client._id === updateID) {
                client.companyName = companyName;
                client.country = country;
                client.zip = zip;
                client.city = city;
                client.streetName = streetName;
                client.houseNumber = houseNumber;
                client.title = title;
                client.lastName = lastName;
                client.firstName = firstName;
                client.tel = tel;
                client.email = email;
                client.notes = notes;

                setUpdateClient({
                    id: updateID,
                    companyName: companyName,
                    country: country,
                    zip: zip,
                    city: city,
                    streetName: streetName,
                    houseNumber: houseNumber,
                    title: title,
                    lastName: lastName, 
                    firstName: firstName,
                    tel: tel,
                    email: email,
                    notes: notes
                });
                console.log(updateClient);
            }
        });
    }
    //https://github.com/react-hook-form/react-hook-form/issues/917
    //https://medium.com/@guptagaruda/react-hooks-understanding-component-re-renders-9708ddee9928
    useEffect(() => {

        console.log("updateClient object inside useEffect: ");
        console.log(updateClient);
        if(updateClient.companyName !== ""){
            console.log("updated clients inside if:");
            console.log(updateClient);

            axios

            .put("https://herokuwimpi.herokuapp.com/clients", updateClient)

            .then(res => {
                setTimeout(() => {
                    setShowUpdate(false);
                }, 250);
                setHeaderText(res.data);
                setTimeout(() => {
                    setHeaderText("Vevők hozzáadása");
                }, 1500);
                
            })
        } else {
            console.log("there is nothing to update!")
        }
    }, [updateClient]);

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
            case "title": setTitle(event.target.value);
            break;
            case "lastName": setLastName(event.target.value);
            break;
            case "firstName": setFirstName(event.target.value);
            break;
            case "tel": setTel(event.target.value);
            break;
            case "email": setEmail(event.target.value);
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
            .delete("https://herokuwimpi.herokuapp.com/clients", {data: {id: targetID}})
            .then(res => {
                var updatedClients = [];
                clients.filter(client => {
                    if(client._id !== targetID){
                        updatedClients.push(client);
                    }           
                });
                setShowDelete(false); 
                setClients(updatedClients);
                setHeaderText(res.data);
                setTimeout(() => {
                    setHeaderText("Vevők összes");
                }, 1500);
            })
    }

    function Table0(props) {
        return(
            <tr>
                <td>{props.companyName}</td>
                <td>{props.country}</td>
                <td>{props.zip}</td>
                <td>{props.city}</td>
                <td>{props.streetName}</td>
                <td>{props.houseNumber}</td>
                <td>{props.title}</td>
                <td>{props.lastName}</td>
                <td>{props.firstName}</td>
                <td>{props.email}</td>
                <td>{props.tel}</td>
                <td>{props.notes}</td>
                <td>
                    <MaterialIcon 
                        iconName="format_italic" 
                        className="delIcon" 
                        onClick={handleShowUpdate} 
                        id={props.id}/>
                </td>
                <td>
                    <MaterialIcon 
                        iconName="delete" 
                        className="delIcon" 
                        onClick={handleShowDelete} 
                        id={props.id}/>
                </td>
            </tr>
        )
    }

    return(
        <div className={`ClientRead ${props.mainContainerClass}`}>

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
                                placeholder="Titulus"
                                className="popup-input-field"
                                value={title}
                                id="title"
                                onChange={handleCreateChange}
                            />
                        </div>
                        <div className="input-row">
                            <MaterialIcon
                                iconName="perm_contact_calendar"
                                className="input-icon"
                            />
                            <input
                                placeholder="Vezetéknév"
                                className="popup-input-field"
                                value={lastName}
                                id="lastName"
                                onChange={handleCreateChange}
                            />
                        </div>
                        <div className="input-row">
                            <MaterialIcon
                                iconName="perm_contact_calendar"
                                className="input-icon"
                            />
                            <input
                                placeholder="Keresztnév"
                                className="popup-input-field"
                                value={firstName}
                                id="firstName"
                                onChange={handleCreateChange}
                            />
                        </div>
                        <div className="input-row">
                            <MaterialIcon
                                iconName="contact_phone"
                                className="input-icon"
                            />
                            <input
                                placeholder="Telefonszám"
                                className="popup-input-field"
                                value={tel}
                                id="tel"
                                onChange={handleCreateChange}
                            />
                        </div>
                        <div className="input-row">
                            <MaterialIcon
                                iconName="contact_mail"
                                className="input-icon"
                            />
                            <input
                                placeholder="Email"
                                className="popup-input-field"
                                value={email}
                                id="email"
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
                                placeholder="Titulus"
                                className="popup-input-field"
                                value={title}
                                id="title"
                                onChange={handleUpdateChange}
                            />
                        </div>
                        <div className="input-row">
                            <MaterialIcon
                                iconName="perm_contact_calendar"
                                className="input-icon"
                            />
                            <input
                                placeholder="Vezetéknév"
                                className="popup-input-field"
                                value={lastName}
                                id="lastName"
                                onChange={handleUpdateChange}
                            />
                        </div>
                        <div className="input-row">
                            <MaterialIcon
                                iconName="perm_contact_calendar"
                                className="input-icon"
                            />
                            <input
                                placeholder="Keresztnév"
                                className="popup-input-field"
                                value={firstName}
                                id="firstName"
                                onChange={handleUpdateChange}
                            />
                        </div>
                        <div className="input-row">
                            <MaterialIcon
                                iconName="contact_phone"
                                className="input-icon"
                            />
                            <input
                                placeholder="Telefonszám"
                                className="popup-input-field"
                                value={tel}
                                id="tel"
                                onChange={handleUpdateChange}
                            />
                        </div>
                        <div className="input-row">
                            <MaterialIcon
                                iconName="contact_mail"
                                className="input-icon"
                            />
                            <input
                                placeholder="Email"
                                className="popup-input-field"
                                value={email}
                                id="email"
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
                <thead>
                    <tr>
                        <td>Cégnév</td>
                        <td>Ország</td>
                        <td>Irányítószám</td>
                        <td>Város</td>
                        <td>Utca</td>
                        <td>Házszám</td>
                        <td>Titulus</td>
                        <td>Vezetéknév</td>
                        <td>Keresztnév</td>
                        <td>Email</td>
                        <td>Telefonszám</td>
                        <td>Megjegyzés</td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        (search ==="" ? clients : filteredClients).map((currentClient, index) => {
                            return(
                                <Table0 
                                    key = {index}
                                    index = {index}
                                    companyName = {currentClient.companyName}
                                    country = {currentClient.country}
                                    zip = {currentClient.zip}
                                    city = {currentClient.city}
                                    streetName = {currentClient.streetName}
                                    houseNumber = {currentClient.houseNumber}
                                    title = {currentClient.title}
                                    lastName = {currentClient.lastName}
                                    firstName = {currentClient.firstName}
                                    email = {currentClient.email}
                                    tel = {currentClient.tel}
                                    notes = {currentClient.notes}
                                    id = {currentClient._id}
                                />
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default ClientRead;