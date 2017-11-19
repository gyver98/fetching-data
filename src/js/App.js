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

    }

    render() {
        const {isLoading } = this.state;
        return (
            <div>
                <header>
                    <img src={image} />
                    <h1>Fetching Data <button className="btn btn-sm btn-danger">Fetch now</button></h1>
                </header>
                <div className={`content ${isLoading ? 'is-loading': ''}`}>
                    <div className="panel-group">
                        <Collapsible title="Tracy Palmer">
                            <p>tracey.palmer@example.com<br />3280 manchester road, ely</p>
                        </Collapsible>
                        <Collapsible title="Jade Dupuis">
                            <p>jade.dupuis@example.com<br />1803 rue pasteur, nanterre</p>
                        </Collapsible>
                        <Collapsible title="Alfred Olsen">
                            <p>alfred.olsen@example.com<br />6598 fjordparken, hirtsals</p>
                        </Collapsible>
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
