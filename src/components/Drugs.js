import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import ElementsHeader from './ElementsHeader';
import DrugElement from './DrugElement';

export class Drugs extends React.Component
{

	constructor(props)
	{
	  super(props);

	  this.makeDeal = this.makeDeal.bind(this);
	  this.checkDrug = this.checkDrug.bind(this);
	}

	static get propTypes()
    {
        return {
            drugsAvailable: React.PropTypes.array.isRequired,
            drugsCarried: React.PropTypes.array.isRequired
        };
    }

	checkDrug(drug)
	{
		const drugsAvailable = this.props.drugsAvailable;
		const drugsCarried = this.props.drugsCarried;
		let present = false;

		if (drugsCarried.length) {
			for (let i = 0; i < drugsAvailable.length; i++) {
				if (drugsAvailable[i]['name'] === drug) {
					present = true;
					return present;
				}
			}
			// else it's not present
			present = false;
		}
		return present;
	}

    makeDeal(event)
    {
    	const action = event.target.getAttribute("data-action");
    	const name = event.target.getAttribute("data-name");
		const id = Number(event.target.getAttribute("data-id"));
        this.props.dispatch(push(`/game/deal?action=${action}&name=${name}&id=${id}`));
    }

	render()
	{
		return (
			<div className="drugs flex-6 flex-vt flex-stretch row">
				<ElementsHeader text="No." deal={false}/>
				<div className="game-drugs flex-1">
					{this.props.drugsAvailable.map((drug, index) => {
						return (
							<DrugElement key={index} drug={drug} button="Buy" handleClick={this.makeDeal} deal={false} present={true}/>
						);
					})}
				</div>
				<ElementsHeader text="No." deal={false}/>
				<div className="player-drugs flex-1">
					{
						this.props.drugsCarried.length === 0 ?
						<p className="text-center padding-small">You have no drugs.</p>
						:
						this.props.drugsCarried.map((drug, index) => {
							let present = this.checkDrug(drug.name);
							return (
								<DrugElement key={index} drug={drug} button="Sell" handleClick={this.makeDeal} deal={false} present={present}/>
							);
						})
					}
				</div>
        	</div>
		)
	}
}

// export the connected class
function mapStateToProps(state){
	const drugsAvailable = state.main.status.drugsDisplayed;
	const drugStore = state.main.game.drugs;
	let drugsCarried = JSON.stringify(state.main.currentGame.currentDrugs); 
	let copyDrugsCarried = JSON.parse(drugsCarried);
	let temp = JSON.parse(drugsCarried);
	let index;
	let drugName;

	for (let i = 0; i < copyDrugsCarried.length; i++) {
		index = copyDrugsCarried[i].name;
		drugName = drugStore[index].name;
		temp[i]['index'] = temp[i].name;
		temp[i].name = drugName;
	}
	drugsCarried = temp;

    return({
    	drugsCarried,
        drugsAvailable
    });
}
export default connect(mapStateToProps)(Drugs);