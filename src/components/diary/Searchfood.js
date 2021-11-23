import React,{Component} from 'react';
import Foodinfo from './Foodinfo';

class Searchfood extends Component{

    constructor(){
        super();
    
        this.state={
          search:null
        };
    }

    searchSpace=(event)=>{
        let keyword = event.target.value;
        this.setState({search:keyword})
    }

    render(){
        const styleInfo = {
            paddingRight:'10px'
        }
        const elementStyle = {
            border:'solid',
            borderRadius:'10px',
            position:'relative',
            left:'10vh',
            height:'3vh',
            width:'90vh',
            marginTop:'5vh',
            marginBottom:'10vh'
        }
        const items = Foodinfo.filter((data)=>{
            if(this.state.search == null)
                return data
            else if(data.식품명.toLowerCase().includes(this.state.search.toLowerCase())){
                return data
            }
          }).map((data,key)=>{
        return(
        <div>
            <ul>
                <div key={key} style={{position:'relative',left:'10vh'}}>
                    <span style={styleInfo}>{data.식품명}</span>
                    <span style={styleInfo}>{data.내용량_단위}</span>
                    
                    <div onClick={() => {this.props.history.push({pathname:"/logadd",state:{dd:17,mm:11,yy:21,ff:data.식품명}})}}>추가</div>
                </div>
            </ul>
        </div>
        )
    })

    return (
        
        <div>
        <input type="text" placeholder="Enter item to be searched" style={elementStyle} onChange={(e)=>this.searchSpace(e)} />
        {items}
        </div>

    )
    }       
}

export default Searchfood;