import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  setView(name, params) {
    this.setState = {
      view: { // when user clicks on ProductListItem, App's view gets replaced with
        name: name, // replaced with --> name: 'details'
        params: params // replaced with --> params : { productId: props.key }
      }
    };
  }

  render() {
    const { view } = this.state;
    return this.state.isLoading
      ? <h1>Testing connections...</h1>
      : (
        <React.Fragment>
          <Header title='Wicked Sales' />
          <main className='container p-30' style={{ backgroundColor: '#f2f2f2' }}>
            <div className='row'>
              <div>
                {
                  view.name === 'catalog'
                    ? <ProductList setView={this.setView} />
                    : <ProductDetails setView={this.setView} viewParams={view.params}/>
                }
              </div>
            </div>
          </main>
        </React.Fragment>
      );
  }
}
