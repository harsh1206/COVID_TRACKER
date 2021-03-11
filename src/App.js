import React, { Component } from 'react'
import {Cards,Charts,CountryPicker,Github} from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import coronaImage from '../src/images/image.png';


export default class App extends Component {
    
    state = {
      data:{} ,
      country:''
    }

    async componentDidMount(){
        const fetchedData = await fetchData();
        console.log(fetchedData);
        this.setState({data:fetchedData});
    }

    handleCountryChange = async (country) => {

      const fetchedData = await fetchData(country);

      this.setState({data: fetchedData,country: country});
    }

    render() {

        const {data,country} = this.state;

        return (
          <div className={styles.container}>
            <Github />
            <img
              className={styles.image}
              src={coronaImage}
              alt="COVID-19 IMG"
            />
            <Cards data={data} />
            <CountryPicker handleCountryChange={this.handleCountryChange} />
            <Charts data={data} country={country} />
          </div>
        );
    }
}

