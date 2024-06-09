import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    //this part was direct fetching details through array - articles but further we fetched the details through the hitting the ednpoint url from news.api
    // articles= [
    //     {
    //       "source": {"id": "news24", "name": "News24"},
    //       "author": "Sibusiso Mjikeliso",
    //       "title": "Cricket SA wants to 'get to the bottom' of Nkwe resignation concerns, says CEO | Sport",
    //       "description": "Acting Cricket South Africa CEO Pholetsi Moseki says the board is concerned about the issues former Proteas assistant coach Enoch Nkwe raised in his resignation.",
    //       "url": "https://www.news24.com/sport/Cricket/Proteas/cricket-sa-wants-to-get-to-the-bottom-of-nkwe-resignation-concerns-says-ceo-20210826",
    //       "urlToImage": "https://cdn.24.co.za/files/Cms/General/d/10743/97d776dc91734e98906c0e1b7f3b1afa.jpg",
    //       "publishedAt": "2021-08-26T11:40:16+00:00",
    //       "content": "<ul><li>Cricket South Africa has committed to \"getting to the bottom\" of Enoch Nkwe's sudden resignation as Proteas assistant coach. </li><li>Nkwe voiced concerns with the current culture and working… [+3497 chars]"
    //     },
    //     {
    //       "source": {"id": "abc-news-au", "name": "ABC News (AU)"},
    //       "author": "ABC News",
    //       "title": "England cricket great Ted Dexter dies aged 86",
    //       "description": "The former England captain, nicknamed \"Lord Ted\", is fondly remembered as a giant of the game and one of his country's greatest players.",
    //       "url": "http://www.abc.net.au/news/2021-08-26/england-cricket-great-ted-dexter-dies-aged-86/100411276",
    //       "urlToImage": "https://live-production.wcms.abc-cdn.net.au/1006c7ecf34ec0935eef2aade5017711?impolicy=wcms_crop_resize&cropH=2815&cropW=5004&xPos=0&yPos=223&width=862&height=485",
    //       "publishedAt": "2021-08-26T09:07:52Z",
    //       "content": "Former England captain Ted Dexter has died aged 86 following a recent illness.\r\n<ul><li>Dexter played 62 Tests for England and was captain on 30 occasions</li><li>He was inducted into the ICC Hall of… [+1746 chars]"
    //     },
    //     {
    //       "source": {"id": "espn-cric-info", "name": "ESPN Cric Info"},
    //       "author": null,
    //       "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
    //       "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
    //       "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
    //       "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
    //       "publishedAt": "2020-04-27T11:41:47Z",
    //       "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    //     },
    //     {
    //       "source": {"id": "espn-cric-info", "name": "ESPN Cric Info"},
    //       "author": null,
    //       "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
    //       "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
    //       "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
    //       "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
    //       "publishedAt": "2020-03-30T15:26:05Z",
    //       "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    //     }
    //   ]

    constructor(){
        super();
        this.state =
        {   
            //articles: this.articles,   //for static fetching through array mentioned above
            articles: [],
            loading: false,
            page : 1
        }
    }

    async componentDidMount(){
        let url= "https://newsapi.org/v2/top-headlines?country=in&apiKey=cade54045f614b58b473f9b7fea3ba88&page=1pageSize=20";
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles, 
            totalResults: parsedData.totalResults
        })
    }


    
     handlePrevClick = async ()=>
        {
            console.log("prev");
            let url= `https://newsapi.org/v2/top-headlines?country=in&apiKey=cade54045f614b58b473f9b7fea3ba88&page=${ this.state.page-1}&pageSize=20`;
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData); 
            this.setState({
                pages: this.state.page - 1,
                articles: parsedData.articles

            })


        }

     handleNextClick = async () =>
        {
            console.log("next");

            let url= `https://newsapi.org/v2/top-headlines?country=in&apiKey=cade54045f614b58b473f9b7fea3ba88&page=${ this.state.page+1}&pageSize=20`;
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);

            this.setState({
                pages: this.state.page + 1,
                articles: parsedData.articles

            })


        }



  render() {
    return (
      <div className='container my-3'>
        <h1>NewsMonkey Top headlines</h1>
        <div className="row">

        {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
                 <NewsItem title = {element.title?element.title.slice(0,45):""} description= {element.description?element.description.slice(0,88):""} imageUrl= {element.urlToImage} newsUrl = {element.url}/>
            </div>
        })}
        </div>

        <div className="container d-flex justify-content-between">
        <button disabled= {this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> 

      </div>
    )
  }
}

export default News
