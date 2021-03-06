import React from 'react';
import image from '../images/cloud-upload-download-data-transfer.svg';
import Collapsible from './Collapsible';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            contacts: []
        }
    }

    // fires immediately before the initial render
    componentWillMount() {
        localStorage.getItem('contacts') && this.setState({
            contacts: JSON.parse(localStorage.getItem('contacts')),
            isLoading: false
        })
    }

    // fires immediately after the initial render
    componentDidMount() {

        const date = localStorage.getItem('contactDate');
        const contactsDate = date && new Date(parseInt(date));
        const now = new Date();

        const dataAge = Math.round((now - contactsDate) / (1000 * 60)); // in minutes
        const tooOld = dataAge >= 1;

        if(tooOld) {
            this.fetchData();
        } else {
            console.log(`fetching data from local storage that are ${dataAge} mins old`);
        }
        
    }

    // fetch API is not fully supported by all browser so it might be needed polyfill :
    // Isomorphic WHATWG Fetch API, for Node & Browserify https://github.com/matthew-andrews/isomorphic-fetch
    
    fetchData() {

        this.setState({
            isLoading: true,
            contacts: []
        })

        fetch('https://randomuser.me/api/?results=30&nat=us,dk,fr,gb')
        .then(response => response.json())
        .then(parsedJSON => parsedJSON.results.map(user => (
            {
                name: `${user.name.first} ${user.name.last}`,
                username: `${user.login.username}`,
                email: `${user.email}`,
                location: `${user.location.street}, ${user.location.city}`
            }
        )))
        .then(contacts => this.setState({
            contacts,
            isLoading: false
        }))
        .catch(error => console.log(error))
    }

    // fires immediately before rendering with new props or state
    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('contacts', JSON.stringify(nextState.contacts));
        localStorage.setItem('contactDate', Date.now());
    }

    render() {
        const {isLoading, contacts } = this.state;
        return (
            <div>
                <header>
                    <img src={image} />
                    <h1>Fetching Data <button className="btn btn-sm btn-danger" onClick={(e) => {
                        this.fetchData();
                    }}>Fetch now</button></h1>
                </header>
                <div className={`content ${isLoading ? 'is-loading': ''}`}>
                    <div className="panel-group">
                        {
                            !isLoading && contacts.length > 0 ? contacts.map(contact => {
                                const {name, username, email, location} = contact;
                                return <Collapsible title={name} key={username}>
                                        <p>{email}<br />{location}</p>
                                       </Collapsible>
                            }) : null
                        }
                    </div>
                    <div className="loader">
                        <div className="icon"></div>
                    </div>
                </div>
            </div>
        );
    }
}
export default App;
