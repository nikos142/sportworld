import React from 'react'
import { Bottom } from '../components/bottom';
import { FootballMenu } from '../components/submenus/footballmenu'
import TeamsTable from '../components/teamstable';

export default function Bundesliga (){
   

return(<>
<FootballMenu/>
<div className='container'>
    <div className='row'>
        <div className='col-md-6'>
            <h3>Premier League News</h3>
        </div>
        <div className='col-md-6'>
        <h3>Standings</h3>
           <TeamsTable league="bundesliga"/>
        </div>
    </div>
</div>
<Bottom/>
</>)
}