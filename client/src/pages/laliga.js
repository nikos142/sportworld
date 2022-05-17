
import { FootballMenu } from '../components/submenus/footballmenu'
import TeamsTable from '../components/teamstable';

export default function LaLiga (){
   

return(<>
<FootballMenu/>
<div className='container'>
    <div className='row'>
        <div className='col-md-6'>
            <h3>La Liga News</h3>
        </div>
        <div className='col-md-6'>
        <h3>Standings</h3>
           <TeamsTable league="laliga" id="2"/>
        </div>
    </div>
</div>
</>)
}