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
        console.log("써치푸드"+this.props.location.state.meal);
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
            else if(data.food.toLowerCase().includes(this.state.search.toLowerCase())){
                return data
            }
          }).map((data,key)=>{
        return(
        <div>
            
            <ul>
                <div key={key} style={{position:'relative',left:'10vh'}}>
                    <span style={styleInfo}>{data.food}</span>
                    <span style={styleInfo}>{data.serve}g</span>
                    <span style={styleInfo}>{data.carbo}g</span>
                    <span style={styleInfo}>{data.protein}g</span>
                    <span style={styleInfo}>{data.fat}g</span>
                    
                    <div onClick={() => {this.props.history.push({pathname:"/logadd",state:{dd:this.props.location.state.dd,mm:this.props.location.state.mm,yy:this.props.location.state.yy,ff:data.food,ee:this.props.location.state.meal,spro:data.protein,sfat:data.fat,scarbo:data.carbo,stotal:data.kcal}})}}>추가</div>
                </div>
            </ul>
        </div>
        )
    })

    return (
        
        <div>
        <input type="text" placeholder="Enter item to be searched" style={elementStyle} onChange={(e)=>this.searchSpace(e)} />
        <ul style={{position:'relative',left: '12vh',top:'7vh',wordSpacing:'10px',fontWeight:'bold'}}>음식 단위량</ul>
        <span style={{position:'relative',left:'34vh',top:'1.5vh',wordSpacing:'20px',fontWeight:'bold'}}>탄 단 지</span>
        <ul style={{position:'relative',left: '10vh'}}>______________________________________________________</ul>
        {items}
        </div>

    )
    }       
}

export default Searchfood;