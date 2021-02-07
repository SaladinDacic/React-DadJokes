import React, { Component } from 'react';
import "./JokeList.css"
import "./LikeJoke.css";
import Joke from "./Joke";
import LikeJoke from "./LikeJoke";
import axios from "axios";

 class JokeList extends Component {
    static defaultProps = {
        numOfJokes : 10
    }
    constructor(props){
        super(props);
        this.state = {
            jokes : JSON.parse(window.localStorage.getItem("jokes") || "[]"),
            loading : false
        }
        this.generateJokes=this.generateJokes.bind(this);
        this.setJokes=this.setJokes.bind(this);
        this.likeIt=this.likeIt.bind(this);
    }
    /* async componentDidMount(){
        let jokeData = await axios.get("https://icanhazdadjoke.com/", {headers: {Accept: "application/json"}});
        let {status, joke, id} = jokeData.data;
        let like = 0
        this.setState(st=>{
            return {jokes: [...st.jokes, {status, joke, id, like}]}
        })
        console.log(this.state.jokes);
    } */

    async generateJokes(){
        try{
            async function jokes(){
                let  jokeData =  await axios.get("https://icanhazdadjoke.com/", {headers: {Accept: "application/json"}});
                return jokeData.data;
            }
            let arrOfJokes = Array.from({length: 0})
            while(arrOfJokes.length <this.props.numOfJokes){
                let joke = await jokes();
                if(
                    arrOfJokes.find(val=>{
                    return val.id === joke.id
                    }) !== undefined 
    
                ||   this.state.jokes.find(val=>{
                    return val.id === joke.id
                    }) !== undefined 
    
                ){
                    // console.log(joke)
                    continue
                }
                arrOfJokes.push(joke)
            }
            this.setState({loading: false});
            return arrOfJokes;
        }catch(e){
            alert(e);
            this.setState({loading: false});
        }
    }

    async setJokes(){
        this.setState({loading: true})
        let arr = await this.generateJokes();
        let like = 0
        arr.forEach(val =>{
            val.like = like;
            this.setState((st , i)=>{
                return {jokes: [...st.jokes, val].sort((a,b)=>{return b.like - a.like})}
            })
        })
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        // console.log(this.state.jokes)
    }

    likeIt(isLike, id){
        let joke = this.state.jokes.find(val=>{
            return val.id === id
        })
        isLike? joke.like ++: joke.like --;
        // console.log(joke)
        this.setState(st=>{
            return {jokes: [...st.jokes].map(val=>{
                return val.id === id?joke:val
            }).sort((a,b)=>{return b.like - a.like})}
        }, ()=>{window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))})
    }

    /* sortJokes(){
        this.setState(st=>{
            return {jokes: [...st.jokes, val].sort((a,b)=>{return b.like - a.like})}
        })
    } */

    render() {
        let jokes = this.state.jokes.map(val=>{
            let oneJoke = val;
            return <div key={oneJoke.id} className="JokeList-body-content">
                        <div className="JokeList-body-firstLike">
                            <LikeJoke form={true} likeIt={this.likeIt} key={oneJoke.id} id={oneJoke.id} like={val.like}/>
                        </div>
                        <div className="JokeList-body-jokes">
                            <Joke id={oneJoke.id} key={oneJoke.id} joke={oneJoke.joke} status={oneJoke.status}/>
                        </div>
                        <div className="JokeList-body-secoundLike">
                            <LikeJoke form={false} likeIt={this.likeIt} key={oneJoke.id + 1} id={oneJoke.id} like={val.like}/>
                        </div>
                    </div>
        })
        return (
            <div>
                {this.state.loading
                ?<div class="JokeList-body">
                    <div className="JokeList-body-b">
                        <h1><span className="dad">Dad</span><span className="jokes">JOKES</span></h1>
                        <h1 className="smiley">😂</h1>
                        <button onClick={this.setJokes}>New Jokes</button>
                    </div>
                    <div className="JokeList-body-c">
                        <div className="loader"></div>
                    </div>
                </div>
                :<div className="JokeList-body">
                    <div className="JokeList-body-b">
                        <h1><span className="dad">Dad</span><span className="jokes">JOKES</span></h1>
                        <h1 className="smiley">😂</h1>
                        <button onClick={this.setJokes}>New Jokes</button>
                    </div>
                    <div className="JokeList-body-c">
                        {jokes}
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default JokeList;