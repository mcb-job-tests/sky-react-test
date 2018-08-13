import React, {Component, Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TablePagination from '@material-ui/core/TablePagination';
import Grid from "@material-ui/core/Grid";
import Divider from '@material-ui/core/Divider';
import { withTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ListSubheader from '@material-ui/core/ListSubheader';

const SKY_HELP_ARTICLE_SEARCH_URL = "https://help-search-api-prod.herokuapp.com/search?query=";

class App extends Component {

    constructor(){
        super();
        this.state = {
            page: 0,
            searchText: '',
            listSubHeader: '',
            results: []
        }
    }

    fetchApiResults(){
        let _this = this;
        fetch(SKY_HELP_ARTICLE_SEARCH_URL + this.state.searchText)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data) {
            _this.setState({
                results: data.results
            })
        });
    }

    handleUpdateTitleState( event ){
        let text = event.target.value;
        this.setState({
            searchText: text,
        });
    }

    handleSearch(){
        this.setState({
            listSubHeader: this.state.searchText,
            searchText: ''
        });
        this.fetchApiResults();
    }

    handleKeyPress(event){
        if (event.key === 'Enter') {
            this.handleSearch();
        }
    }

    handleButtonClick(){
        this.handleSearch();
    }

    handlePageChange(e, page) {
        this.setState({page: page})
    }

    render() {
        const style = {
            height: "2px",
            margin: "8px",
            border: 0,
            boxShadow: "0 6px 6px -6px black inset"
        };
        return (
            <div className="App">
                <CssBaseline />
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Sky React Test!</h1>
                </header>
                <TextField
                    value={this.state.searchText}
                    style={{margin: 12}}
                    onChange={this.handleUpdateTitleState.bind(this)}
                    onKeyPress={this.handleKeyPress.bind(this)}
                    type="text"
                />
                <Button variant="contained"
                        onClick={this.handleButtonClick.bind(this)}
                >
                    Search
                </Button>
                <Grid container spacing={8} alignItems={'center'} justify={'space-between'}>
                    <TablePagination
                        component="div"
                        count={this.state.results.length}
                        rowsPerPage={10}
                        rowsPerPageOptions={[10]}
                        page={this.state.page}
                        onChangePage={this.handlePageChange.bind(this)}
                        onChangeRowsPerPage={()=>{}}
                    />
                </Grid>
                <List component="nav"
                      subheader={<ListSubheader style={{ fontSize: '2em' }} component="div">{this.state.listSubHeader}</ListSubheader>}
                >
                    {this.state.results.slice(this.state.page*10, this.state.page*10 + 10).map( (result, index) => (
                        <Fragment key={index} >
                            <Divider style={ style } />
                            <a target="_blank" href={result.url}>
                                <Button variant="outlined">
                                    {result.title}
                                </Button>
                            </a>
                            <ListItem >
                                <ListItemText primary={result.description} />
                            </ListItem>

                        </Fragment>
                    ) )}
                </List>
            </div>
        );
    }
}

export default withTheme()(App);
