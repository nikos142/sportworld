import React from 'react'
import { FootballMenu } from '../components/submenus/footballmenu'
import TeamsTable from '../components/teamstable';

export default function Ligue1 (){
   

return(<>
<FootballMenu/>
<div className='container'>
    <div className='row'>
        <div className='col-md-6'>
            <h3>Ligue 1 News</h3>
        </div>
        <div className='col-md-6'>
        <h3>Standings</h3>
           <TeamsTable league="ligue1" id="4"/>
        </div>
    </div>
</div>
</>)
}