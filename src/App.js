import React, { Component } from 'react';
import './App.css';

const photoCount=8
const addPhotos=4
const imgURL="https://api.github.com/repos/robchamberspfc/little-one-images/contents/content"
const imgLocation="https://raw.githubusercontent.com/robchamberspfc/little-one-images/master/content/"
const http="https://"
const imgThumbnailBase=".tiny.pictures/main/"
const imgThumbnail0 = "chambersbristol"
const imgThumbnail1 = "chambersbristolextra"
const imgThumbnailwidth="300"
const imgWidth="24%"

class App extends Component {

  constructor(props) {
    super(props);
    this.state={imageFolders:[], imageURLs:[], photoCount: photoCount, imageTumbnails:[] };
    this.viewMorePhotos=this.viewMorePhotos.bind(this);
    this.getPhotos=this.getPhotos.bind(this);
    }
  
  componentWillMount() {
      this.populateImageFolders();
  }

  populateImageFolders() {
        fetch(imgURL, {
            mode: 'cors'
        })
          .then(data => {return data.json()})
          .then(json => {
            const imageFolders=[]
            json.map((data,index) => {
              imageFolders.push({title:data.name,url:data.url});
          });
          this.setState({imageFolders:imageFolders})
        })
  }

  viewMorePhotos () {
    const newPhotos=this.state.photoCount+addPhotos;
    this.setState({photoCount: newPhotos});
  }

  getPhotos (option) {

          fetch(option.target.value, {
            mode: 'cors'
        })
          .then(data => {return data.json()})
          .then(json => {
            //console.log(json)
            const images=[]
            json.map((data,index) => {
              let thumbnail = data.download_url
              let rand = Math.random();
              if (index % 2 == 0){
                thumbnail = thumbnail.replace(imgLocation, http + imgThumbnail0 + imgThumbnailBase);
                console.log(thumbnail)
              } else {
                thumbnail = thumbnail.replace(imgLocation, http + imgThumbnail1 + imgThumbnailBase);
                console.log(thumbnail)
              }
              thumbnail = thumbnail + "?width=" + imgThumbnailwidth
              images.push({size:data.size,url:data.download_url,sha:data.sha, thumbnail:thumbnail});
          });
          this.setState({imageURLs:images})
          this.setState({imageTumbnails:this.state.imagesURLs})
        })
  }

  render() {
    let viewMoreButton = null;
    if (this.state.photoCount < this.state.imageURLs.length) {
      viewMoreButton = <button onClick={this.viewMorePhotos}>View more from this album</button>;
    }

    return (
        <div>
          <div>
          <h1>Albert Stephen Xavier Chambers</h1>
          <h2>Born: Bristol on 20 July 2016 at 23:18, weight; 7lbs 2oz</h2>
          </div>
          <div>
            <select onChange={this.getPhotos} value={this.state.value}>
              <option>Select a photo album</option>
              {this.state.imageFolders.map((item,index) => {
                return <option key={index} value={item.url}>{item.title}</option>})}
              </select> 
          </div>
          <div>
          {
            this.state.imageURLs.slice(0, this.state.photoCount).map((item,index) => {
            return (<div className = {"image"}><a href={"#"+item.sha}><img key={index} src={item.thumbnail} style={{width:imgWidth, height:200}}/></a><div id={item.sha} className={"modalDialog"}><div><img src={item.url} className={"modal"}/><a href= {"#close"} className={"button"}>Close</a></div></div></div>)})}

          </div>
          <div>
          {viewMoreButton}
          </div>
        </div>
    );
  }
}

export default App;
