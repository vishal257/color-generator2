import { useEffect, useState } from 'react'
import './App.css'
import {motion} from 'framer-motion';

function App() {

  const [mousePos, setMousePos] = useState({x:0, y:0});
  const [hoverState, setHoverState] = useState(false);
  const [toolTip, setToolTip] = useState(false);
  const [color, setColor] = useState('#fff');
  const cursorPosition = (event:MouseEvent) => {
    setMousePos({x:event.clientX, y:event.clientY});
  };

  const circleSize = hoverState ? 200 : 120;

  useEffect(()=>{
    window.addEventListener('mousemove', cursorPosition);
    return () => window.removeEventListener('mousemove', cursorPosition);
  },[]);

  function componentToHex(c:number) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHex(r:number, g:number, b:number) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  function colorGenerator(){
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    setColor(rgbToHex(r,g,b));
  } 

  function copyColor(state:boolean){
    const temp = color;
    navigator.clipboard.writeText(color);
    setToolTip(true);
    setColor('Copied');
    setTimeout(() => {
      setColor(temp);
      setToolTip(state);
    }, 1000);
  }

  return (
    <>
    <motion.div className='cursor' initial={{x:0, y:0, height:circleSize, width: circleSize, backgroundColor: color}} animate={{x:mousePos.x - circleSize/2, y:mousePos.y - circleSize/2, height:circleSize, width: circleSize, backgroundColor:color}} transition={{type:'tween', ease:'backOut', duration:'.4'}}>
          {
            toolTip ? color :''
          }
    </motion.div>
    <div className='main-container'>

      <div className='left-wrapper'>
        <div className='heading'><h1 style={{color: color, textShadow: `0 0 200px ${color}`}}>Start Creating Colors</h1></div>
        <div className='buttons'  onMouseOver={() => setHoverState(true)} onMouseLeave={() => setHoverState(false)}>
          <div><button id="newColor" onMouseOver={() => setHoverState(true)} onMouseLeave={() => setHoverState(false)} onClick={colorGenerator} style={{boxShadow: `inset 0 0 30px 1px ${color}`}}>Start Generating &gt;</button></div>
          <div><button id="copyButton" onClick={() => copyColor(false)} style={{boxShadow: `inset 0 0 20px 1px ${color}`}}>Copy Color</button></div>
        </div>
      </div>
      <div className='right-wrapper' onMouseEnter={() => setToolTip(true)} onMouseLeave={() => setToolTip(false)} style={{boxShadow:`inset 10px 0 8px -10px ${color}`}} onClick={() => copyColor(true)}>
        <div className='circle' style={{borderColor:color, boxShadow: `inset 0 0 120px 1px ${color}, 0 0 200px 1px ${color}`}}></div>
      </div>
    </div>
    </>
  )
}

export default App
