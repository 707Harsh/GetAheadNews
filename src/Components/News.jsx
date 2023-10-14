import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import propTypes from 'prop-types'
// import Search from './Search';
import NavBar from './NavBar';


export default class News extends Component {

    


    static defaultProps = 
    {
        category : "general",
        country : "in",
        toFind : ""
    }
    static propTypes = 
    {
        category : propTypes.string,
        country : propTypes.string,
        toFind : propTypes.string
    }

    constructor()                    // it is used to set state using this.state
    {
        super();
        this.state =
        {
            articles: [],
            loading: false,
            page: 1,
            TotalResults: 0
        }
    }

    // async updateNews()
    // {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ed7c79a2c22f4176a5f0a730cc143366&page=${this.state.page}&pageSize=18`;
    //     this.setState({loading: true});
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     this.setState({articles: parsedData.articles, TotalResults: parsedData.totalResults, loading: false});
    // }

    async componentDidMount()
    {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ed7c79a2c22f4176a5f0a730cc143366&page=${this.state.page}&pageSize=18`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles: parsedData.articles, TotalResults: parsedData.totalResults, loading: false})
    }

    handleNclick= async ()=>
    {
        // if(this.state.page < Math.ceil(this.state.TotalResults/18))
        // {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ed7c79a2c22f4176a5f0a730cc143366&page=${this.state.page+1}&pageSize=18`;
            this.setState({loading: true});
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({articles: parsedData.articles, page: this.state.page+1, loading:false});
        // }
        // this.setState({page: this.state.page + 1});
        // this.updateNews();
    }

    handlePclick= async ()=>
    {
        // if(this.state.page > 1)
        // {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ed7c79a2c22f4176a5f0a730cc143366&page=${this.state.page-1}&pageSize=18`;
            this.setState({loading: true});
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({articles: parsedData.articles, page: this.state.page-1, loading: false});
        // }
        // this.setState({page: this.state.page - 1});
        // this.updateNews();
    }

    // search = async () =>
    // {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ed7c79a2c22f4176a5f0a730cc143366&page=${this.state.page-1}&pageSize=18`;
    //     // this.setState({loading: true});
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json();
    //     // this.setState({articles: parsedData.articles, page: this.state.page-1, loading: false});
    //     console.log(parsedData.articles)
    // }
    
    render() {
        return (
            <div>
                {/* {
                    ((this.state.articles.map((element1)=> element1.title)).map((element2)=> console.log(element2.search("to"))))
                } */}
                <div style={{display:"none"}}>
                    <NavBar category={this.props.category}/>
                </div>
                <div className="container" style={{position:'relative', top:'60px'}}>
                    <h1 className="my-4 text-center">Top Headlines - {((this.props.category).charAt(0)).toUpperCase() + (this.props.category).slice(1)}</h1>

                    {this.state.loading && <Spinner/>}

                    {!(this.state.loading) && <div className="row my-3 ">
                        {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage?element.urlToImage:"Default_Pic.png"} newsUrl={element.url} author={element.author?element.author:"Unknown"} publishedAt={(new Date(element.publishedAt)).toGMTString()}/>
                                </div>
                        })}
                    </div>}
                    {!(this.state.loading) && <div className="d-flex justify-content-between py-4">
                        <button type="button" disabled={this.state.page===1} className="btn btn-dark" onClick={this.handlePclick}>&larr; Previous</button>
                        <div className='d-flex align-items-center'>Page {this.state.page} of {Math.ceil(this.state.TotalResults/18)}</div>
                        <button type="button" disabled={this.state.page === Math.ceil(this.state.TotalResults/18)} className="btn btn-dark" onClick={this.handleNclick}>Next &rarr;</button>
                    </div>}
                </div>
            </div>
        )
    }
}