import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { Modal } from './hoc/modal';

interface PizzaRecordState {
    pizzaListData: PizzaListData[];
    loading: boolean;
}

export class PizzaListData {
    id: number = 0;
    name: string = "";
    photo: string = "";
    bigPhoto: string = "";
    mediumPhoto: string = "";
    ingredients: string = "";
    smallPrice: string = "";
    mediumPrice: string = "";
    bigPrice: string = "";
}

//Выведение ингредиентов с выбором каждого ингредиента
export class Compot extends React.Component {
    constructor(props) {
        super(props);
        this.addClass = this.addClass.bind(this)
        this.state = {
            active: true
        };
    }
        addClass() {
            this.setState(prev => ({
                active: !prev.active
            }))
        }
    
    public render() {
        let toggleIngredient = this.state.active ? "ingredient" : "ingredient toggle"
        return (
            <a className={toggleIngredient} onClick={this.addClass}>{this.props.text}&times;&nbsp;</a>
            )
    }
}
//Преобразование списка ингредиентов
export class IngredComp extends React.Component {
    constructor(props) {
        super(props);
    }
    public render() {
       let list = () => {
            if (typeof (this.props.thisUp.ingred) === 'undefined') {
                let list = []; 
                return list
            } else {
                let text = this.props.thisUp.ingred.split(';')
                return text
            }
        }
        return (
            <div>
                {
                    list().map((e, i) => (
                        <Compot key={i} text={e}/>
                        ))
                }
            </div>           
            )
    }
}
//Окно выбора

//here declaring the StudentList class. And this StudentList class inherits the abstract class React.Component
export class PizzaList extends React.Component<RouteComponentProps<{}>, PizzaRecordState> {
   
    constructor() {
      
        super();        
        //инициализация state
        this.state = {
            pizzaListData: [],
            loading: true,
            shMd: false,
            smP: '',
            medP: '',
            bigP: '',
            actP: '',
            select: true
            //toggleIng: true
        };
        //запрос на получение данных при помощи api
        fetch('api/Pizza/Index')
            .then(response => response.json() as Promise<PizzaListData[]>)
            .then(data => {
                console.log(data)
                
                this.setState({ pizzaListData: data, loading: false });
            });

        this.chooseFunc = this.chooseFunc.bind(this);       
        
    }
    public onChangeSize(e, i) {
        
        if (e.target.value == 40) {
            
            this.setState({
                actP: this.bigPhoto,
                select: '40'
            })
            
        } else if (e.target.value == 36) {
            
            this.setState({
                actP: this.medPhoto,
                select: '36'
            })
        } else {
            
            this.setState({
                actP: this.smallPhoto,
                select: '28'
            })
        }
    }

    public chooseFunc(e, data) {
        this.medPhoto = e.mediumPhoto;
        this.bigPhoto = e.bigPhoto;
        this.smallPhoto = e.photo;
        this.id = e.id;
        this.photo = e.photo;
        this.ingred = e.ingredients;
        this.bigPhoto = e.bigPhoto; 
        //evt.preventDefault();
        this.setState(data => ({
            shMd: !data.shMd
        }))
        
        if (!this.state.shMd) {
            
            if (this.state.actP === '') {

                this.setState({
                    actP: this.photo
                })
            } else if (this.state.select == '28') {
                this.setState({
                    actP: this.smallPhoto
                })
            } else if (this.state.select == '36') {
                console.log('medium')
            } else if (this.state.select == '40') {
                this.setState({
                    actP: this.bigPhoto
                })
            }
        } else {
           
        }
        
    }

    //
    public render() {
       
        const show  = this.state.shMd;
        const style = show ? "modal display" : "modal";

        
        
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderStudentTable(this.state.pizzaListData);//условие отображения
        return <div>
            
            <h1>Пицца</h1>
      
            {contents}

            <Modal>
                <div id="lil-modal" className={ style }>
                    <div className="modal-content">
                        <div className="modal-header">
                            <span role="button" onClick={this.chooseFunc} className="btn-close">
                                &times;
                            </span>
                            <h2>Описание</h2>
                        </div>
                        <div className="modal-body container">
                            <div className="row">
                                <div className="modal-body_photo col-6 text-center">
                                    <img src={ this.state.actP }/>
                                   
                                </div>
                                <div className="col-6">
                                    <div>
                                        <div className="modal-ingredient">
                                            <IngredComp thisUp={this} />
                                        </div>
                                        <div className="modal-size" >
                                          
                                            <input
                                                type="radio"
                                                name="size"
                                                value="28"
                                                onChange={this.onChangeSize.bind(this)}
                                                checked={this.state.select=='28' }
                                            />
                                            28см.
                                           <input
                                                type="radio"
                                                name="size"
                                                value="36"
                                                onChange={this.onChangeSize.bind(this)}
                                                checked={this.state.select == '36'}
                                            />
                                            36см.
                                           <input
                                                type="radio"
                                                name="size"
                                                value="40"
                                                onChange={this.onChangeSize.bind(this)}
                                                checked={this.state.select == '40'}
                                            />
                                            40см.
                                        </div>
                                    </div>
                                    <div className="busketButton text-center fixed-bottom position-absolute">
                                        <button className="btn-warning">В корзину</button>
                                    </div>
                                </div>
                                
                            </div>                          
     
                            
                        </div>
                        
                    </div>
                </div>
            </Modal>
        </div>
    }
    

    //выведение записи из БД.
    private renderStudentTable(pizzaListData: PizzaListData[]) {
        return (
            <div className="pizza-block">
                <div className="container">
                    <div className="row ">
                        {
                            pizzaListData.map(item =>
                                <div className="col-3 pizza-block_cont" key={item.id}>

                                    <div className="pizza-block_name text-center" >
                                        {item.name}
                                    </div>
                                    <div className="pizza-block_picture">
                                        <img src={item.photo} />
                                    </div>
                                    <div className="pizza-block_ingred text-center">
                                        {item.ingredients.replace(/;/g,',')}
                                    </div>
                                    <div className="pizza-block_price text-center">
                                        <p><b>От&nbsp;{item.smallPrice}</b></p>
                                    </div>
                                    <div className="buy text-center">
                                    <button
                                        className="btn-warning"
                                        onClick={this.chooseFunc.bind(this, item)} id={item.id}
                                    >Выбрать
                                    </button>
                                    </div>
                                </div>
                                )
                        }
                    </div>
                </div>
            </div>
            )
        
       
    }
}

