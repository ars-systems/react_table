import React from 'react';
import Main from "../main/main";
import './header.css';


class Header extends React.Component {
    state = {
        sortBy: 'id',
        searchValue: '',
        symbol: '1'
    }

    sortBy = (event) => {
        this.setState({
            sortBy:event.target.value
        })
    }

    searchBy = (event) => {
        this.setState({
            searchValue:event.target.value
        })
    }
    sortSymbol = (event) => {
        this.setState({
            symbol:event.target.value
        })
    }

    render() {
     
        return (
            <div>
                <div className = "header">        
                <span>
                <p>sort by {this.state.sortBy} </p> 
                <select id="lang" onChange={this.sortBy} value={this.state.sortBy}>
                    <option value="id">id</option>
                    <option value="country">country</option>
                    <option value="city">city</option>
                    <option value="currency">currency</option>
                    <option value="company_name">company name</option>
                    <option value="user_id">user id</option>
                    <option value="gender">gender</option>
                    <option value="function">function</option>
                    <option value="final_salary">final salary</option>
                </select>
                <button onClick={this.sortSymbol} value='1' >ascending <i>&uarr;</i> </button>
                <button onClick={this.sortSymbol} value='0' >descending <i>&darr;</i> </button>
            
                </span>

               <span>
                <p>search {this.state.searchValue}</p>
                <input type="text" className="search" placeholder="search" onChange={this.searchBy} />
               </span>
               </div>
                <Main 
                    sortBy={this.state.sortBy}  
                    searchVal={this.state.searchValue}
                    symbol={this.state.symbol}
                    />
                    
            </div>
        )
    }
}

export default Header

