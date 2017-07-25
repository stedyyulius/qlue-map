import React,{Component} from 'react'

class Menubar extends Component{
  render(){
    return(
      <div id='cssmenu'>
      <ul>
         <li><a href='#'><span>Home</span></a></li>
         <li className='active has-sub'><a href='#'><span>Products</span></a>
            <ul>
               <li className='has-sub'><a href='#'><span>Product 1</span></a>
                  <ul>
                     <li><a href='#'><span>Sub Product</span></a></li>
                     <li className='last'><a href='#'><span>Sub Product</span></a></li>
                  </ul>
               </li>
               <li className='has-sub'><a href='#'><span>Product 2</span></a>
                  <ul>
                     <li><a href='#'><span>Sub Product</span></a></li>
                     <li className='last'><a href='#'><span>Sub Product</span></a></li>
                  </ul>
               </li>
            </ul>
         </li>
         <li><a href='#'><span>About</span></a></li>
         <li className='last'><a href='#'><span>Contact</span></a></li>
      </ul>
      </div>
    )
  }
}

export default Menubar