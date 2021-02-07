import React, { Component } from 'react';
import "./LikeJoke.css";


class LikeJoke extends Component {
    static defaultProps = {
        like : 0
    }
    constructor(props){
        super(props);
        this.handleLike = this.handleLike.bind(this)
        this.handleDisLike = this.handleDisLike.bind(this)
    }
    handleLike(){
        this.props.likeIt(true, this.props.id);
        this.scale();
    }
    handleDisLike(){
        this.props.likeIt(false, this.props.id);
        this.scale();
    }

    scale(){
        let arr = [-5,-4,-3,-2,-1,0,1,2,3,4];
        let smileys = ["🤬", "😡", "😤", "😠", "😑", "🙂", "😃", "😁", "😂", "🤣"];
        let colors = ["#240000", "#750505", "#b53105", "#de8d1d", "#e0d60d", "#6ad115", "#15d15a", "#15d199", "#15ced1", "#3e9ae6"];
        let smileysMap = new Map()
        let colorsMap = new Map()
        arr.forEach((val, i)=>{
            smileysMap.set(val, smileys[i]);
            colorsMap.set(val, colors[i]);
        })
        return [smileysMap, colorsMap];
    }

    render() {
        let form = this.props.form
        let setScale = this.props.like >= 4? 4 : this.props.like <= -5? -5 : this.props.like;
        // console.log(this.scale()[0].get(setScale))
        // console.log(this.scale()[1].get(setScale))
        return (
            <div className="Like-body">
                {form
                ?<div className="Like-Circle-body">
                    <div onClick={this.handleLike}><i className="fas fa-arrow-up"></i></div>
                    <div style={{border: `5px solid ${this.scale()[1].get(setScale)}`}} className="Like-Circle-number">
                        {this.props.like}
                    </div>
                    <div onClick={this.handleDisLike}><i className="fas fa-arrow-down"></i></div>
                </div>
                :<div className="Like-Smiley-body">
                    <p>{this.scale()[0].get(setScale)}</p>
                </div>
                }
            </div>
        )
    }
}

export default LikeJoke;