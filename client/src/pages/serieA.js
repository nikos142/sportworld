import React from 'react'
import { FootballMenu } from '../components/submenus/footballmenu'
import TeamsTable from '../components/teamstable';

export default function SerieA (){
   

return(<>
<FootballMenu/>
<div className='container'>
    <div className='row'>
        <div className='col-md-6'>
            <h3>Serie A News</h3>
        </div>
        <div className='col-md-6'>
        <h3>Standings</h3>
           <TeamsTable league="serieA" id="3"/>
        </div>
    </div>
</div>
</>)
}