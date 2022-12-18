// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// import logo from '/logo.svg';

// /* if this Logo hides another component, should set the component css position relative*/ 
// /* free like {width:'30vmax', cursor:'pointer'} */

// interface Props {
//     link: string
// }

// export default function Logo({link, free}: Props) {
//     let to, cN;
//     if(link===undefined) to='/'
//     else to = link;
//     if(free===undefined) cN = `${style.AppLogo}`;
//     else cN = '';
//     let navigate = useNavigate();
//     return (
//             <React.Fragment>
//                 <img src={logo} 
//                 className={`${cN}`} 
//                 style={free}
//                 alt="lifthus logo" 
//                 onClick={()=> {
//                     navigate(to);
//                 }   
//                 }/>
//             </React.Fragment>
//     );
// }


import React from 'react'

const Logo = () => {
  return (
    <div>Logo</div>
  )
}

export default Logo