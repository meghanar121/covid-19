import React,{ useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Columns from 'react-bootstrap/CardColumns';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Form from "react-bootstrap/Form";
import NumberFormat from 'react-number-format';
import Navbar from 'react-bootstrap/Navbar';

function App() {

  const[latest,setLatest]=useState([]);
  const[results,setResults]=useState([]);
  const[searchCountries, setSearchCountries]=useState("");

  useEffect(()=>{
    axios
    .all([
      axios.get("https://corona.lmao.ninja/v2/all"),
      axios.get("https://corona.lmao.ninja/v2/countries?sort=country")
    ])
    
    .then(responseArr=>{
      setLatest(responseArr[0].data);
      setResults(responseArr[1].data);
  })
  .catch(err=>{console.log(err);
  });
  },[]);

  //date and time parsing 
  const date=new Date(parseInt(latest.updated));
  const lastupdated=date.toString();

  //search country
const filterCountries = results.filter(item => {
return searchCountries !== "" ? item.country.includes(searchCountries):item;
});

  //countries details
  const countries=filterCountries.map((data,i)=>{
    return(
      <Card key={i} bg="light" text="dark" className="text-center"style={{margin:"10px"}}>
    <Card.Img variant="top" src={data.countryInfo.flag} />
    <Card.Body>
      <Card.Title>{data.country}</Card.Title>
      <Card.Text>Cases: <NumberFormat value={data.cases} displayType={'text'} thousandSeparator={true} /></Card.Text>
      <Card.Text>Deaths: <NumberFormat value={data.deaths} displayType={'text'} thousandSeparator={true} /></Card.Text>
      <Card.Text>Recovered: <NumberFormat value={data.recovered} displayType={'text'} thousandSeparator={true} /></Card.Text>
      <Card.Text>Today's Cases: <NumberFormat value={data.todayCases} displayType={'text'} thousandSeparator={true} /></Card.Text>
      <Card.Text>Today's deaths: <NumberFormat value={data.todayDeaths} displayType={'text'} thousandSeparator={true} /></Card.Text>
      <Card.Text>Active: <NumberFormat value={data.active} displayType={'text'} thousandSeparator={true} /></Card.Text>
      <Card.Text>Critical: <NumberFormat value={data.critical} displayType={'text'} thousandSeparator={true} /></Card.Text>
    </Card.Body>
  </Card>
    );
  });

  //Media queries for cards
  var queries = [{
    columns: 2,
    query: 'min-width: 500px'
  }, {
    columns: 3,
    query: 'min-width: 1000px'
  }];
  return (
    <div>
      <br/>
      
      <Navbar className="justify-content-center" bg="dark" variant="dark">
    <Navbar.Brand  href="#home">
      <h1>Covid-19 Live Updates </h1>
    </Navbar.Brand>
  </Navbar>
      <br/>
      <CardDeck>
  <Card bg="info" text="white" className="text-center"style={{margin:"10px"}}>
    <Card.Body>
      <Card.Title>TOTAL CASES</Card.Title>
      <Card.Text>
        <NumberFormat value={latest.cases} displayType={'text'} thousandSeparator={true} />
      </Card.Text>
    </Card.Body>
    <Card.Footer>
  <small text="white">Last updated {lastupdated}</small>
    </Card.Footer>
  </Card>
  <Card bg="success" text={"white"} className="text-center"
  style={{margin:"10px"}}>
    <Card.Body>
      <Card.Title>RECOVERED</Card.Title>
      <Card.Text>
        <NumberFormat value={latest.recovered} displayType={'text'} thousandSeparator={true} />
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small  text={"white"}>Last updated {lastupdated}</small>
    </Card.Footer>
  </Card>
  <Card bg="danger" text={"white"} className="text-center"style={{margin:"10px"}}>
    <Card.Body>
      <Card.Title>DEATH</Card.Title>
      <Card.Text>
       <NumberFormat value= {latest.deaths} displayType={'text'} thousandSeparator={true} />
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small  text={"white"}>Last updated {lastupdated}</small>
    </Card.Footer>
  </Card>
</CardDeck>
<Form>
  <Form.Group controlId="formGroupSearch">
    <Form.Control type="text" placeholder="Enter country name..." 
    onChange={e => setSearchCountries(e.target.value)}/>
  </Form.Group>
</Form>
<Columns queries={queries}>{countries}</Columns>
    </div>
  );
}

export default App;
