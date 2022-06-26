import React, {Component} from 'react';
import * as PvWatts from '../api/PvWatts';

class SolarForm extends React.Component<IProps, ISolarFormProps>{

	constructor(props:ISolarFormProps){
		super(props);
		this.state={
			consumptionRadio: true, //boolean
			budgetRadio:false,
			consumptionValue:0,
			plantSizeRadio:false,
			budgetValue:0,
			cost:0,
			plantSize:0,
			plantSizeBudget:0,
			calculateModal:false
		}

	}

    render(){

		const calculate = (e:any) => {
			e.preventDefault();
			this.setState({calculateModal:true})
			let total = this.props.solarValues?.ac_annual
			if(total){
				Math.round(total);
				let x = total/12;
				if(this.state.plantSize!=0 && this.state.plantSize){
					let plantSizeBudget=0;
					if(this.state.plantSize<=10){
						plantSizeBudget = this.state.plantSize*60000;
					}
					else if(this.state.plantSize>10 && this.state.plantSize<=100){
						plantSizeBudget = this.state.plantSize*55000;
					}
					else{
						plantSizeBudget = this.state.plantSize*53000;
					}
					this.setState({plantSizeBudget});
				}
				else if(this.state.consumptionValue!=0 && this.state.consumptionValue){
					let plantSize=(this.state.consumptionValue/x)*8.2;
					this.setState({plantSize});
				}
				else if(this.state.budgetValue!=0 && this.state.budgetValue){
					let plantSize=0;
					if(this.state.budgetValue<=600000){
						plantSize =  this.state.budgetValue/60000;
					}
					else if(this.state.budgetValue>600000 && this.state.budgetValue<=5500000){
						plantSize =  this.state.budgetValue/55000;
					}
					else{
						plantSize =  this.state.budgetValue/53000;
					}
					this.setState({plantSize});
				}
				
			}
		}

		const commonChange = (e:any) => {
			this.setState({
				[e.target.name]:e.target.value
			});
		}

        return(
                <div>
					{
						this.state.calculateModal?
						<div style={{position:'absolute', top:'20vh', bottom:'20vw', width:'300px', height:'300px'}}>
							Hello
						</div>
						:
						null
					}
					<form onSubmit={calculate}>
		  <div className="mb-3">
		    <label  className="form-label">1. Choose any one of the following</label>
		    <div>
				<div className="form-check form-check-inline">
				  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option1" onClick={()=>this.setState({consumptionRadio:false, budgetRadio:false, plantSizeRadio:!this.state.plantSizeRadio})}/>
				  <label className="form-check-label">Plant Size</label>
				</div>
				<div className="form-check form-check-inline">
				  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onClick={()=>this.setState({consumptionRadio:!this.state.consumptionRadio, budgetRadio:false, plantSizeRadio:false})}/>
				  <label className="form-check-label">Monthly Consumption</label>
				</div>
				<div className="form-check form-check-inline">
				  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3"value="option3"  onClick={()=>this.setState({consumptionRadio:false, budgetRadio:!this.state.budgetRadio, plantSizeRadio:false})}/>
				  <label className="form-check-label">Your budget</label>
				</div>
				<div className="row mt-3">
				{
					  this.state.plantSizeRadio?
					  <div className="col">
					  <div id="capacity">
						<div className="input-group mb-3">
							<input type="number" name="plantSize" className="form-control" placeholder="Plant Size (kW)" aria-label="Username" aria-describedby="basic-addon1" onChange={commonChange}/>
						  </div>
					  </div>
					</div>
					  :null
				  }
				  {
					  this.state.consumptionRadio?
					  <div className="col">
					  <div id="capacity">
						<div className="input-group mb-3">
							<input type="number" name="consumptionValue" className="form-control" placeholder="Monthly Consumption (kWh)" aria-label="Username" aria-describedby="basic-addon1" onChange={commonChange}/>
						  </div>
					  </div>
					</div>
					  :null
				  }
				  {
					this.state.budgetRadio?
					<div className="col">
				    <div id="budget">
				      <div className="input-group mb-3">
						  <input type="number" name="budgetValue" className="form-control" placeholder="Your Budget" aria-label="Username" aria-describedby="basic-addon1" onChange={commonChange}/>
						</div>
						</div>
					</div>
				  	:null
				  }
				</div>
		    </div>
		  </div>
		  <div className="mb-3">
		    <label className="form-label">2. What is your average electricity cost? </label>
		    <div>
		    	<div className="input-group mb-3">
				  <input type="number" className="form-control" placeholder="Electricity Cost (in ₹)" aria-label="Username" aria-describedby="basic-addon1" name="cost" onChange={commonChange}/>
				</div>
		    </div>
		  </div> 
		  <button type="submit" className="btn btn-primary" onClick={()=>this.setState({calculateModal:true})}>Calculate</button>
		</form>
		{this.state.plantSize!=0 && this.state.plantSizeBudget==0?
		<div >
			{this.state.plantSize}
		</div>
		:
		null
		}
		{this.state.plantSizeBudget!=0?
			<div >
			{this.state.plantSizeBudget}
		</div>
		:
		null
		}
				</div>
        );
    };
};

interface ISolarFormProps{
	consumptionRadio?:boolean,
	budgetRadio?:boolean,
	plantSizeRadio?:boolean,
	consumptionValue?:number,
	budgetValue?:number,
	cost?:number,
	plantSize?:number,
	plantSizeBudget?:number,
	calculateModal?:boolean,
	solarValues?:PvWatts.ResponseOutput
}

interface IProps{
	solarValues?:PvWatts.ResponseOutput;
}

export default SolarForm;