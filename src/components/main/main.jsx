import React from 'react';
import axios from "axios"
import './main.css';


class Main extends React.Component {

  state = {
    eachPage: 30,
    data: null,
    page: 1,
  };

  loadEmployees = () => {
    axios.get('https://alpha.compport.com/api/v1/employees')
      .then(response => {
        this.setState({
          data: response.data,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  componentDidMount() {
    this.loadEmployees()
  }
  componentWillUnmount() {
    this.loadEmployees = null
  }

  moveBack = () => {
    if (this.state.page <= 1) {
      return false
    }

    let prevPage = this.state.page - 1
    this.setState({
      page: prevPage
    })
    // this.forceUpdate()

  }

  moveForward = () => {
    if (this.state.page >= this.state.pagesNumbers) {

      return false
    }
    let nextPage = this.state.page + 1
    this.setState({
      page: nextPage
    })
    // this.forceUpdate()

  }

  changePage = (e) => {

    let active = document.querySelectorAll(".active")
    active.forEach(elm => {
      elm.classList.remove("active")
    })

    e.target.classList.add("active")

    this.setState({
      page: parseInt(e.target.innerHTML)
    })

  }


 

  render() {
    var slicedata=[];
    var searchData =[];
    
    
    if (this.state.data) {
      // let symbol=this.props.symbol
      let state_data=Object.assign(this.state.data,{});
      searchData = state_data.sort((a, b) => {
        let sort_by=a[this.props.sortBy] < b[this.props.sortBy];
        if(this.props.symbol==='1')
        sort_by=a[this.props.sortBy] > b[this.props.sortBy];
        return  sort_by ? 1 : -1;
      });
      if(this.props.searchVal.length) {
        this.state.page=1;
        searchData = searchData.filter(item => { return item[this.props.sortBy].toString().toLowerCase().includes(this.props.searchVal.toLowerCase());}) 
      }
      
      var i, j, temparray;
      for (i = 0, j = searchData.length; i < j; i += this.state.eachPage) {
        temparray = searchData.slice(i, i + this.state.eachPage);
        slicedata.push(temparray)
      }
    }
    
    var pagesNumbers = Math.ceil(searchData.length / this.state.eachPage)

    var pagination='';
    if (pagesNumbers>1) {
      pagination = <div>
        <ul className="pagination">
          <li
            className="prevButton"
            onClick={this.moveBack} >
            prev </li>

          <li onClick={this.changePage} >{this.state.page === 1 ? parseInt(this.state.page) : parseInt(this.state.page - 1)} </li>
          {pagesNumbers>1 &&
            <li onClick={this.changePage} >{this.state.page === 1 ? parseInt(this.state.page + 1) : this.state.page} </li>
          }
          {pagesNumbers>2 &&
            <li onClick={this.changePage}>{this.state.page === 1 ? parseInt(this.state.page + 2) : parseInt(this.state.page + 1)}</li>
          }
          {this.state.page<pagesNumbers &&
          <li
            onClick={this.moveForward}
            className="nextButton" >
            next </li>
          }
        </ul>
      </div>
    }

    if (this.state.data) {
      return (
        <>
        <div className='biginfo'>
          <div className='info'>
            <table>
              <thead>
                <tr>
                  <th>#id</th>
                  <th>country</th>
                  <th>city</th>
                  <th>currency</th>
                  <th>company name</th>
                  <th>user id</th>
                  <th>gender</th>
                  <th>function</th>
                  <th>final salary</th>
                </tr>
              </thead>
              <tbody>
                {(slicedata[this.state.page-1]||[]).map((employee, index) => {
                  return <tr key={index} >
                    <th>{employee.id} </th>
                    <td>{employee.country}</td>
                    <td>{employee.city}</td>
                    <td>{employee.currency}</td>
                    <td>{employee.company_name}</td>
                    <td>{employee.user_id}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.function}</td>
                    <td>{employee.final_salary}</td>
                  </tr>
                })}

              </tbody>
            </table>
          </div>
          {pagesNumbers && pagination}
          </div>
        </>
      )
    } else {
      return (
        <div className="loading" > Loading ... </div>
      )
    }
  }
}

export default Main;