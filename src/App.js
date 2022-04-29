import React,{useEffect,useState} from "react";
import { Switch ,Button } from "@mui/material";
import './app.css'
import { tab } from "@testing-library/user-event/dist/tab";


function App() {
   const [Input,setInput] =useState([{a:0,b:0,c:0,s:0},{a:0,b:0,c:0,s:0},{a:0,b:0,c:0,s:0},{a:0,b:0,c:0,s:0}]);
   const [btn,setBtn]=useState(false);
   const [clr,setClr]=useState(false);
   let tableStyle={
     width:'300px',
     padding:'0px',
     display:'grid',
     gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr'
    }

  useEffect(()=>{
    drawCanv("cn0",0);
    drawCanv("cn1",1);
    drawCanv("cn2",2);
    drawCanv("cn3",3);

  })

   //                                       Adder Diagram
  const drawCanv=(id,ind)=>{
    var canvas = document.getElementById(id);
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var color ="black";
   
    ctx.fillStyle = color;

    ctx.fillRect(100,50,2000,60);
    ctx.lineWidth=2.5;
    
    // carry line
    ctx.moveTo(0, 90);
    ctx.lineTo(100, 90);
   
    
    //input line
      //  a
    ctx.strokeStyle = color;
    ctx.moveTo(140,0);
    ctx.lineTo(140,60); 
         
     // b
    ctx.moveTo(260,0);
    ctx.lineTo(260,60);

    // s
    ctx.moveTo(200,80);
    ctx.lineTo(200,500);

    ctx.stroke();

    // text
    
    ctx.font = "15px Arial";

    ctx.fillText(`A${ind}`, 110, 20);
    ctx.fillStyle = color;
    ctx.fillText(Input[ind].a, 115, 40);

    ctx.fillText(`B${ind}`, 230, 20);
    ctx.fillStyle = color;
    ctx.fillText(Input[ind].b, 235, 40);

    ctx.fillText(`C${ind}`, 20, 85);
    ctx.fillStyle = color;
    ctx.fillText(Input[ind].c, 60, 85);

    ctx.fillText(`S${ind}`, 160, 128);
    ctx.fillStyle = color;
    ctx.fillText(Input[ind].s, 165, 145);
   
    ctx.fillStyle = "red";
    ctx.font = "20px Arial";

    ctx.fillText("F.A " + ind, 182, 85);


  }

//                                              Setting Bits
  const takeInput=(ind,inp)=>{
    const input = Input.slice();
    if(inp==0){
      input[ind].a=input[ind].a==1? 0:1;
    }
    else{
      input[ind].b=input[ind].b==1? 0:1;
    }
    setInput(input);
  }

//                                             Addition
const addition=(i)=>{
  if(i==4)  {
    setTimeout(()=>{
      document.getElementById('cn3').style.border="1px solid white";
     setClr(false);
    },1500)
  }
  else{
  setTimeout(()=>{
    if(i!=0) {
      let k=i-1;
      document.getElementById("cn"+k).style.border="1px solid white";}
    document.getElementById("cn"+i).style.border="1px solid green";
     let input =Input.slice();
     let c = i==0?0:input[i-1].c;
     input[i].s=input[i].a^input[i].b^c;
     input[i].c=(input[i].a&input[i].b)|(input[i].a&c)|(input[i].b&c);
     setInput(input);
     addition(i+1);
  },1500)
}
}

//                                           Returning JSX

  return <div className="app">
    <h1 style={{
      position:'absolute',
      color:'blue',
      top: 10
    }}>4-BIT FULL RIPPLE ADDER SIMULATOR</h1>

    <div className="inputs">
    <img src ={require('./image-11.webp')}/>
      <div>
      <div className="input ainp">
      <p>A0 <Switch  onChange={()=>takeInput(0,0)}/></p>
      <p>A1 <Switch  onChange={()=>takeInput(1,0)} /></p>
      <p>A2 <Switch  onChange={()=>takeInput(2,0)} /></p>
      <p>A3 <Switch  onChange={()=>takeInput(3,0)} /></p>
     </div>
     <div className="input binp">
      <p>B0 <Switch   onChange={()=>takeInput(0,1)} /></p>
      <p>B1 <Switch   onChange={()=>takeInput(1,1)} /></p>
      <p>B2 <Switch   onChange={()=>takeInput(2,1)}/></p>
      <p>B3 <Switch   onChange={()=>takeInput(3,1)}/></p>
     </div>
     </div>
          <div style={{marginLeft:'280px',textAlign:'center'}}>
            <h2 style={{margin:'auto'}}>Truth Table</h2>
     <div style={tableStyle} className="tableChart" > <h3>i</h3> <h3>Ai</h3>  <h3>Bi</h3> 
      <h3>Ci</h3>  <h3>Si</h3></div>
     <div style={tableStyle} className="tableChart" > <h3>0</h3> <h3>{Input[0].a}</h3>  <h3>{Input[0].b}</h3> 
      <h3>{Input[0].c}</h3>  <h3>{Input[0].s}</h3></div>
     <div style={tableStyle} className="tableChart" > <h3>1</h3> <h3>{Input[1].a}</h3>  <h3>{Input[1].b}</h3> 
      <h3>{Input[1].c}</h3>  <h3>{Input[1].s}</h3></div> 
     <div style={tableStyle} className="tableChart" > <h3>2</h3> <h3>{Input[2].a}</h3>  <h3>{Input[2].b}</h3>
       <h3>{Input[2].c}</h3>  <h3>{Input[2].s}</h3></div> 
     <div style={tableStyle} className="tableChart" > <h3>3</h3> <h3>{Input[3].a}</h3>  <h3>{Input[3].b}</h3> 
      <h3>{Input[3].c}</h3>  <h3>{Input[3].s}</h3></div>
     </div>
          </div>
    <div className="mainBox">
      <canvas className="canvas" id="cn3"></canvas>
      <canvas className="canvas" id="cn2"></canvas>
      <canvas className="canvas" id="cn1"></canvas>
      <canvas className="canvas" id="cn0"> </canvas>
    </div>
     <div style={{display:'flex'}}>
    <Button variant="outlined" color="secondary" disabled={btn} id='addbtn' style={{marginRight:'20px'}}
      onClick={()=>{
      setBtn(true);
      setClr(true);
       addition(0)}}><b>CALCULATE</b> </Button>
    <Button variant="outlined" color="secondary" id='clrbtn' disabled={clr}
     onClick={()=>{
       document.getElementById('cn3').style.border="1px solid white";
       setBtn(false);
       let input =Input.slice();
       for(var i=0;i<4;i++){
         input[i].c=0;
         input[i].s=0;
       }
       setInput(input);
     }}
    ><b>Reset</b> </Button>
    </div>
    <h3 style={{marginTop:'20px'}}>
      {'Final Output Sum : ' + Input[3].s+' '+ Input[2].s+' '+ Input[1].s+''+' '+ Input[0].s }</h3>
      <h3 style={{marginTop:'0px'}}>{'Final Output Carry : '+Input[3].c}</h3>
  </div>
}

export default App;
