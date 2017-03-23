import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';

import { LOGOUT_LINK } from '../../../routes';
import { searchTwitter, saveSearchTerm } from '../../web-mobile-common/domain/actionGenerators';

class TwitterSearch extends Component {

    constructor(props) {
        super(props);
        this.onSearchTextChange = this.onSearchTextChange.bind(this);
        this.renderSavedSearches = this.renderSavedSearches.bind(this);
        this.renderSearchResults = this.renderSearchResults.bind(this);
        this.onSaveSearchResult = this.onSaveSearchResult.bind(this);
        this.onLucky = this.onLucky.bind(this);
        this.updateSearchWith = this.updateSearchWith.bind(this);
    }

    onSearchTextChange() {
        const searchText = this.refs.searchText.value.trim();
        this.props.searchTwitter(searchText);
    }

    updateSearchWith(searchText) {
        this.refs.searchText.value = searchText;
        this.props.searchTwitter(searchText);
    }

    renderSavedSearches() {
        const { savedSearchTerms } = this.props;
        console.log('savedSearchTerms', savedSearchTerms);
        return savedSearchTerms.map( savedSearchTerm => {
            return (<li key={savedSearchTerm.createdAt} onClick={() => this.updateSearchWith(savedSearchTerm.searchText)}>
                {savedSearchTerm.searchText}
            </li>);
        })
    }

    renderSearchResults() {
        const { searchResults } = this.props;
        console.log('searchResults', searchResults);
        return searchResults.map( searchResult => {
            return (<li key={searchResult.id}>
                <span className="author">{searchResult.author}</span>:
                <span className="tweet">{searchResult.text}</span>
                (<span className="createdAt">{searchResult.createdAt}</span>)
            </li>);
        })
    }

    onSaveSearchResult() {
        const searchTextToSave = this.refs.searchText.value.trim();
        if (searchTextToSave !== '') {
            this.props.saveSearchTerm(searchTextToSave)
        }
    }

    onLucky() {

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h3>Search Twitter</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className={`input-group`}>
                            <span className="input-group-addon"><i className="fa fa-search fa" aria-hidden="true"></i></span>
                            <input type="text" className="form-control" name="searchText" id="searchText" ref="searchText"  placeholder="Enter search term" onChange={this.onSearchTextChange} />
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <button type="button" className="btn btn-primary" onClick={this.onSaveSearchResult}>Save Search</button>
                    </div>
                    <div className="col-lg-4">
                        <button type="button" className="btn btn-info" onClick={this.onLucky}>Feeling Fortunate</button>
                    </div>
                </div>
                <div className="row">
                    <hr/>
                    <div className="col-lg-4">
                        <h3>Saved Searches</h3>
                        <ul>
                            {this.renderSavedSearches()}
                        </ul>
                    </div>
                    <div className="col-lg-8">
                        <h3>Search Results</h3>
                        {this.renderSearchResults()}
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = ({ authentication, twitterSearch }) => {
    const { user } = authentication;
    const { savedSearchTerms, searchResults } = twitterSearch;
    return { user, savedSearchTerms, searchResults }
};

export default connect(mapStateToProps, { searchTwitter, saveSearchTerm })(TwitterSearch)