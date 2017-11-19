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

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch('https://randomuser.me/api/?results=30')
        .then(response => response.json())
        .then(parsedJSON => parsedJSON.results.map(user => {
            name: `${user.name.first} ${user.name.last}`,
            username: `${user.login.username}`,
            email: `${user.email}`,
            location: `${user.location.street}, ${user.location.city}`
        }))
        .then(contacts => this.setState({
            contacts,
            isLoading: false
        }))
        .catch(error => console.log(error))
    }

    render() {
        const {isLoading, contacts } = this.state;
        return (
            <div>
                <header>
                    <img src={image} />
                    <h1>Fetching Data <button className="btn btn-sm btn-danger">Fetch now</button></h1>
                </header>
                <div className={`content ${isLoading ? 'is-loading': ''}`}>
                    <div className="panel-group">
                        {
                            !isLoading && contacts.length > 0 ? contacts.map(contact => {
                                return <Collapsible title="Tracy Palmer">
                                        <p>tracey.palmer@example.com<br />3280 manchester road, ely</p>
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
