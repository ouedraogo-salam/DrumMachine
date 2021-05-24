
const documentRoot = document.getElementById("main");
const btns = document.querySelectorAll(".drum-pad");

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:"",
            left:"50%",
            // playaudio:false,
        }
        this.handleClick = this.handleClick.bind(this);
        // this.buttonToggle = this.buttonToggle.bind(this)

    }
   
    handleClick(e){
        let audio = e.currentTarget.firstChild;
        let filter = audioStreaming.map(function(current){return current}).filter(function(aud){return aud.id===audio.id})
        audio.play();
        this.setState(() => ({ name: filter[0].name }));
    }
    
    render(){
        let regex = /\w+/gi;
        let drumpadHTML = audioStreaming.map((audio) =>{
            let nameRegex = audio.name.match(regex);
            
            let nameRegexJoin = nameRegex.join("-");
            return <div id={nameRegexJoin} key={audio.id} className="drum-pad btn btn-secondary" onClick={this.handleClick}>
                        <audio id={audio.id} className="clip" src={audio.src}></audio>
                        {audio.id}
                    </div>
           
        });
        let states = this.state.playaudio;
        document.addEventListener("keydown",function(e){
            let keyUppercase=e.key.toUpperCase();
            let drumPad = document.querySelectorAll(".drum-pad");
            drumPad.forEach(function(currentPad){
                if (currentPad.firstChild.id === keyUppercase){
                    currentPad.firstChild.play();
                }
            });
        }) ;
        return(
           <div id="drum-machine" className="border row">
                <div id="drum-keybaord" className=" col-7 bg-warning">
                    <div className="mt-4 d-flex justify-content-center align-items-center flex-wrap">
                        {drumpadHTML};                      
                    </div>
                    
              </div>
                <div id="controls-drum" className=" col-5 bg-primary">
                    <div className="d-flex flex-column align-items-center justify-content-center h-100">
                        <div id="display" className="d-flex flex-column justify-content-evenly align-items-center m-4 bg-secondary text-white" >
                           {this.state.name}
                        </div>
                    </div>
              </div>
           </div>
        )
    }
}

ReactDOM.render(<App />,documentRoot);