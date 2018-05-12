const React = require('react');
const SearchField = require('search-field/search-field.jsx')

class MainPage extends React.Component{
             
    constructor(props){
        super(props);        
    }
                              
    render() {
        return <SearchField />;
    }
}

module.exports = MainPage;